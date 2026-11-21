import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin, isSupabaseConfigured } from '@/lib/supabaseClient';

export async function GET() {
  try {
    let clientsCount = 29;
    let attentionClients: any[] = [];

    if (isSupabaseConfigured()) {
      try {
        const client = supabaseAdmin || supabase;
        const { data, count } = await client.from('clients').select('*');
        if (data && data.length > 0) {
          clientsCount = data.length;
          attentionClients = data.filter((c: any) => c.at_risk || c.streak_days === 0).map((c: any) => ({
            id: c.id,
            name: c.full_name || c.name,
            reason: c.injuries ? `متابعة إصابة: ${c.injuries}` : 'متوقف عن تسجيل الوجبات والتمرين من 8 أيام',
            daysInactive: 8,
            phone: c.phone
          }));
        }
      } catch (err) {
        console.warn('DB attention notice:', err);
      }
    }

    if (attentionClients.length === 0) {
      attentionClients = [
        {
          id: 'c-1',
          name: 'عمر حسن السيد',
          reason: 'مفيش تمرين ولا وجبة مسجلة من 8 أيام، ولم يرد على آخر رسالة متابعة.',
          daysInactive: 8,
          phone: '01012345678',
          aiSuggestion: 'رسالة قصيرة وودية تقترح ضبط أوزان التمرين لاستعادة الشغف.'
        },
        {
          id: 'c-2',
          name: 'محمود صابر',
          reason: 'تراجع درجة الالتزام اليومي إلى 5/10 بسبب ضغط العمل.',
          daysInactive: 3,
          phone: '01099238411',
          aiSuggestion: 'اقتراح تقليص مدة التمرينة إلى 30 دقيقة Express Workout.'
        }
      ];
    }

    return NextResponse.json({
      success: true,
      counts: {
        totalAttention: attentionClients.length,
        pendingReview: 14,
        expiringSoon: 4,
        atRisk: attentionClients.length
      },
      clients: attentionClients
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
