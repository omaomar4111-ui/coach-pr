import { NextRequest, NextResponse } from 'next/server';

// In-memory persistent store per serverless execution lifecycle + Local storage sync
// In production with Supabase/KV, this writes directly to the client's record.
let tenantSettingsMemory: Record<string, any> = {
  default: {
    brandName: 'أورا فاشون (Aura Fashion)',
    industry: 'الملابس والأزياء الفاخرة',
    targetAudience: 'الشباب والفتيات من سن 18 لـ 35 سنة في مصر',
    toneOfVoice: 'ودودة، تجارية حاسمة، لهجة قاهرية راقية بدون ابتذال',
    freeShippingThreshold: '1000',
    returnPolicy: 'معاينة مجانية عند الاستلام، واستبدال خلال 14 يوم بدون أي مصاريف إضافية',
    paymentMethods: ['INSTAPAY', 'VODAFONE_CASH', 'COD'],
    productsCatalogSummary: 'هوديز أوفرسايز (650ج)، جواكت جلد طبيعي (1850ج)، بناطيل شينو (620ج)، قمصان أوكسفورد قطن (450ج)',
    integrations: {
      whatsapp: { connected: false, phoneNumberId: '', wabaId: '', accessToken: '' },
      instagram: { connected: false, instagramAccountId: '', pageAccessToken: '' },
      facebook: { connected: false, pageId: '', pageAccessToken: '' },
      telegram: { connected: false, botToken: '' },
      bostaShipping: { connected: false, apiKey: '', businessId: '' }
    },
    activeAgents: ['agent-1', 'agent-2', 'agent-3'],
    updatedAt: new Date().toISOString()
  }
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tenantId = searchParams.get('tenantId') || 'default';

  const data = tenantSettingsMemory[tenantId] || tenantSettingsMemory.default;
  return NextResponse.json({ success: true, tenantId, settings: data });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const tenantId = body.tenantId || 'default';

    tenantSettingsMemory[tenantId] = {
      ...(tenantSettingsMemory[tenantId] || {}),
      ...body,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: 'تم حفظ إعدادات البراند والتوكينز بنجاح وجاهزة للتفعيل الفوري',
      tenantId,
      settings: tenantSettingsMemory[tenantId]
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
