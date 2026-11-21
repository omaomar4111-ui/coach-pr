import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export async function GET() {
  try {
    let activeClientsCount = 29;
    let awaitingReviewCount = 14;

    if (isSupabaseConfigured() && supabase) {
      try {
        const { count } = await supabase
          .from('clients')
          .select('*', { count: 'exact', head: true });
        if (count && count > 0) activeClientsCount = count;
      } catch (e) {
        console.warn('DB clients count fallback:', e);
      }
    }

    const stats = {
      activeClients: activeClientsCount,
      monthlyRevenue: 6600,
      commitmentRate: 86,
      awaitingReview: awaitingReviewCount,
      currency: 'EGP'
    };

    const revenueWeekly = [
      { day: 'السبت', revenue: 0, active: true },
      { day: 'الأحد', revenue: 0, active: false },
      { day: 'الاثنين', revenue: 4400, active: false },
      { day: 'الثلاثاء', revenue: 2200, active: false },
      { day: 'الأربعاء', revenue: 0, active: false },
      { day: 'الخميس', revenue: 0, active: false },
      { day: 'الجمعة', revenue: 0, active: false }
    ];

    const attentionClients = [
      {
        id: 'c-1',
        name: 'Omar Hassan',
        avatar: 'OH',
        daysInactive: 8,
        reason: 'مفيش تمرين ولا وجبة ولا متابعة من 8 أيام، وما ردش على آخر رسالة.',
        phone: '01012345678',
        aiSuggestion: 'رسالة قصيرة مخصصة وودية غالباً بترجع العميل ده.'
      }
    ];

    const workQueue = [
      { id: 'wq-1', name: 'Mahmoud Saber', avatar: 'MS', type: 'طلب انضمام', time: 'منذ ساعتين', status: 'pending' },
      { id: 'wq-2', name: 'Karim Galal', avatar: 'KG', type: 'متابعة أسبوعية', time: 'الآن', status: 'pending' },
      { id: 'wq-3', name: 'Nour Ibrahim', avatar: 'NI', type: 'مراجعة أداء', time: 'الآن', status: 'pending' },
      { id: 'wq-4', name: 'Reem Gamal', avatar: 'RG', type: 'اشتراك قارب على الانتهاء', time: 'منذ ساعة', status: 'warning' }
    ];

    return NextResponse.json({
      success: true,
      stats,
      revenueWeekly,
      attentionClients,
      workQueue
    });
  } catch (error: any) {
    console.error('Gymrate stats API error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
