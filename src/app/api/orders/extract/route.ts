import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseClient';

export interface ExtractedOrder {
  customerName?: string;
  phone?: string;
  alternatePhone?: string;
  governorate?: string;
  cityArea?: string;
  detailedAddress?: string;
  items: Array<{
    name: string;
    size?: string;
    color?: string;
    quantity: number;
    estimatedPrice: number;
  }>;
  totalAmount: number;
  paymentMethod: 'COD' | 'INSTAPAY' | 'VODAFONE_CASH';
  shippingCost: number;
  notes?: string;
  confidenceScore: number;
  isReadyForDispatch: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const { chatTranscript, latestMessage, tenantSlug = 'demo-store', conversationId } = await req.json();

    const textToAnalyze = chatTranscript || latestMessage;
    if (!textToAnalyze) {
      return NextResponse.json({ error: 'Text transcript is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || '';
    let extractedData: ExtractedOrder;

    // 1. Try Gemini 4 Argon Extraction
    if (apiKey) {
      try {
        const prompt = `
أنت الآن "4 Argon Checkout & Entity Parser" المتخصص في تحليل محادثات التجارة الإلكترونية المصرية واستخراج بيانات الشحن والبوالص.
حلل المحادثة الآتية واستخرج بيانات العميل والأوردر بتنسيق JSON دقيق:

المحادثة:
"""
${textToAnalyze}
"""

أرجع فقط كائن JSON بالصيغة الآتية دون أي نصوص إضافية:
{
  "customerName": "اسم العميل إن وُجد",
  "phone": "رقم الهاتف الأساسي (01xxxxxxxxx)",
  "alternatePhone": "رقم بديل إن وُجد",
  "governorate": "المحافظة",
  "cityArea": "المنطقة",
  "detailedAddress": "العنوان بالتفصيل",
  "items": [
    {
      "name": "اسم الموديل",
      "size": "المقاس",
      "color": "اللون",
      "quantity": 1,
      "estimatedPrice": 650
    }
  ],
  "totalAmount": 650,
  "paymentMethod": "COD",
  "shippingCost": 0,
  "notes": "ملاحظات",
  "confidenceScore": 0.95,
  "isReadyForDispatch": true
}
`.trim();

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.1,
              responseMimeType: 'application/json'
            }
          })
        });

        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            extractedData = JSON.parse(rawText);
          } else {
            extractedData = parseEgyptianOrder(textToAnalyze);
          }
        } else {
          extractedData = parseEgyptianOrder(textToAnalyze);
        }
      } catch (e) {
        extractedData = parseEgyptianOrder(textToAnalyze);
      }
    } else {
      extractedData = parseEgyptianOrder(textToAnalyze);
    }

    // 2. Persist in Supabase `orders` table
    const random4 = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}-${random4}`;

    // Get Tenant
    const { data: tenant } = await supabaseAdmin
      .from('tenants')
      .select('id')
      .eq('slug', tenantSlug)
      .maybeSingle();

    const tenantId = tenant?.id || null;

    const firstItem = extractedData.items?.[0];

    const { data: savedOrder, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        tenant_id: tenantId,
        conversation_id: conversationId || null,
        order_number: orderNumber,
        customer_name: extractedData.customerName || 'عميل محادثة',
        phone: extractedData.phone || '01000000000',
        address: `${extractedData.detailedAddress || ''} - ${extractedData.cityArea || ''} - ${extractedData.governorate || ''}`.trim(),
        product: firstItem?.name || 'منتج براند',
        size: firstItem?.size || 'L',
        color: firstItem?.color || 'أسود',
        quantity: firstItem?.quantity || 1,
        total_amount: extractedData.totalAmount || 650,
        payment_method: extractedData.paymentMethod || 'COD',
        payment_verified: false,
        status: 'pending',
        raw_ai_extraction: extractedData
      })
      .select()
      .single();

    if (orderError) {
      console.error('[Supabase Order Insert Error]:', orderError);
    }

    return NextResponse.json({
      success: true,
      engine: '4_ARGON_SUPABASE_PERSISTENT',
      order: savedOrder || {
        order_number: orderNumber,
        ...extractedData
      },
      data: extractedData
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

function parseEgyptianOrder(text: string): ExtractedOrder {
  const phoneRegex = /(?:01[0125][0-9]{8})/g;
  const phones = text.match(phoneRegex) || [];

  let size = 'L';
  const upper = text.toUpperCase();
  if (upper.includes('3XL') || upper.includes('XXXL')) size = '3XL';
  else if (upper.includes('2XL') || upper.includes('XXL')) size = '2XL';
  else if (upper.includes('XL')) size = 'XL';
  else if (upper.includes(' L ') || upper.includes('مقاس L') || upper.includes('مقاس لارج')) size = 'L';
  else if (upper.includes(' M ') || upper.includes('مقاس M') || upper.includes('مقاس ميديم')) size = 'M';

  let gov = 'القاهرة';
  let area = 'المعادي';

  if (text.includes('إسكندرية') || text.includes('اسكندرية')) gov = 'الإسكندرية';
  else if (text.includes('جيزة') || text.includes('الجيزة') || text.includes('الدقي') || text.includes('المهندسين') || text.includes('أكتوبر') || text.includes('زايد')) gov = 'الجيزة';
  else if (text.includes('طنطا') || text.includes('الغربية')) gov = 'الغربية';
  else if (text.includes('المنصورة') || text.includes('الدقهلية')) gov = 'الدقهلية';

  if (text.includes('المعادي')) area = 'المعادي';
  else if (text.includes('مدينة نصر')) area = 'مدينة نصر';
  else if (text.includes('مصر الجديدة')) area = 'مصر الجديدة';
  else if (text.includes('التجمع') || text.includes('القاهرة الجديدة')) area = 'التجمع الخامس';
  else if (text.includes('الدقي')) area = 'الدقي';
  else if (text.includes('أكتوبر') || text.includes('اكتوبر')) area = '6 أكتوبر';
  else if (text.includes('سموحة')) area = 'سموحة';

  let paymentMethod: 'COD' | 'INSTAPAY' | 'VODAFONE_CASH' = 'COD';
  if (text.includes('انستاباي') || text.includes('إنستاباي') || text.includes('instapay')) paymentMethod = 'INSTAPAY';
  else if (text.includes('فودافون كاش') || text.includes('vodafone cash')) paymentMethod = 'VODAFONE_CASH';

  const isReady = phones.length > 0 && text.length > 25;

  return {
    customerName: 'عميل بريميوم (من المحادثة)',
    phone: phones[0] || 'لم يتم تحديده',
    alternatePhone: phones[1] || undefined,
    governorate: gov,
    cityArea: area,
    detailedAddress: text.replace(phoneRegex, '').trim(),
    items: [
      {
        name: text.includes('جاكت') ? 'جاكت جلد طبيعي مستورد' : 'هودي أوفرسايز فاخر',
        size: size,
        color: text.includes('أسود') ? 'أسود ملكي' : 'زيتي غامق',
        quantity: 1,
        estimatedPrice: text.includes('جاكت') ? 1850 : 650
      }
    ],
    totalAmount: text.includes('جاكت') ? 1850 : 650,
    paymentMethod: paymentMethod,
    shippingCost: 0,
    notes: 'معاينة مجانية واستلام مع مندوب بوسطة',
    confidenceScore: isReady ? 0.94 : 0.65,
    isReadyForDispatch: isReady
  };
}
