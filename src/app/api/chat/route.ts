import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  try {
    const { message, history, brief, agentId } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || '';

    const systemPrompt = `
أنت الآن "سارة طارق" (أو الإيجنت المتخصص المختار: ${agentId || 'Sara Tarek'})، أقوى مساعد مبيعات وخدمة عملاء إلكتروني لمنصة براندات الملابس والتجارة في مصر (PR Agent).
- أسلوبك: لهجة مصرية قاهرية ودودة، سريعة، احترافية، ومقنعة بدون أي تكلف أو ابتذال.
- معلومات البراند المتاح حالياً:
  * المنتجات: ${brief?.productsCatalogSummary || 'هوديز أوفرسايز (650ج)، جواكت جلد طبيعي (1850ج)، قمصان أوكسفورد (450ج)'}
  * الشحن المجاني: للطلبات فوق ${brief?.freeShippingThreshold || '1000'} جنيه.
  * سياسة المعاينة والاستبدال: ${brief?.returnPolicy || 'معاينة مجانية عند الاستلام، واستبدال مجاني خلال 14 يوم'}
  * طرق الدفع: إنستاباي، فودافون كاش، الدفع عند الاستلام (COD).
- قواعد صارمة:
  1. الرد يجب ألا يتجاوز جملتين أو 3 جمل كحد أقصى (مثل شات الواتساب الحقيقي).
  2. اعطِ المقاسات أو الأسعار بوضوح وشجع العميل على إرسال العنوان لتأكيد الأوردر فوراً.
  3. لا تكتب مقدمات مكررة، ادخل في الرد مباشرة.
`.trim();

    // Make ultra-fast non-blocking call to Gemini 1.5 Flash with 5s hard timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const res = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemPrompt}\n\nرسالة العميل الواردة:\n"${message}"` }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 120, // Keep short for instant sub-second WhatsApp response
        }
      })
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (aiReply) {
        return NextResponse.json({
          reply: aiReply,
          source: 'GEMINI_AI',
          timestamp: new Date().toISOString()
        });
      }
    }

    // High-speed fallback if Gemini takes > 6s (ensures WhatsApp zero delay)
    return NextResponse.json({
      reply: getSmartFallbackReply(message),
      source: 'SMART_INSTANT_ENGINE',
      timestamp: new Date().toISOString()
    });

  } catch (err: any) {
    return NextResponse.json({
      reply: getSmartFallbackReply(''),
      source: 'SMART_INSTANT_ENGINE_FALLBACK',
      timestamp: new Date().toISOString()
    });
  }
}

function getSmartFallbackReply(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes('مقاس') || lower.includes('سايز') || lower.includes('size')) {
    return 'مقاساتنا متوفرة من M لحد 3XL وتلبيسها أوفرسايز مظبوط جداً ومريح. تحب ترشح لي طولك ووزنك وأنا أطلعلك أنسب مقاس فوراً؟';
  }
  if (lower.includes('سعر') || lower.includes('بكام') || lower.includes('كام')) {
    return 'الهودي الأوفرسايز عليه عرض بـ 650ج بدلاً من 850ج، ولو طلبت قطعتين الشحن بيكون مجاناً لحد باب بيتك! 🔥';
  }
  if (lower.includes('شحن') || lower.includes('توصيل') || lower.includes('كام يوم')) {
    return 'الشحن بياخد من 48 لـ 72 ساعة في كل محافظات مصر، ومعاك معاينة كاملة ومجانية قبل ما تدفع أي قرش مع مندوب بوسطة 🚚';
  }
  return 'يا هلا بيك يا فندم! نورتنا في أورا فاشون، معاك سارة طارق من فريق المبيعات. إيه الموديل اللي عجبك عشان أحجزلك مقاسك قبل ما يخلص؟ ✨';
}
