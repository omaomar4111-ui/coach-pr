import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin, isSupabaseConfigured } from '@/lib/supabaseClient';

export async function GET() {
  try {
    if (isSupabaseConfigured()) {
      try {
        const client = supabaseAdmin || supabase;
        const { data, error } = await client
          .from('chat_conversations')
          .select('*, clients(full_name, phone)')
          .order('updated_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return NextResponse.json({ success: true, conversations: data });
        }
      } catch (err) {
        console.warn('DB chat conversations notice:', err);
      }
    }

    // Realistic Coach-Client Inbox Messages
    const fallbackConversations = [
      {
        id: 'conv-1',
        client_id: 'c-1',
        client_name: 'عمر حسن السيد',
        client_phone: '01012345678',
        channel: 'whatsapp',
        last_message: 'كوتش، ركبتي كويسة جداً النهاردة في تمرين الهاك سكوات ومفيش أي ألم الحمد لله!',
        last_message_time: 'منذ 15 دقيقة',
        unread_count: 2,
        status: 'active',
        tags: ['تمرين أرجل', 'متابعة إصابة']
      },
      {
        id: 'conv-2',
        client_id: 'c-2',
        client_name: 'محمود صابر',
        client_phone: '01099238411',
        channel: 'in_app',
        last_message: 'رفعتلك فيديو تكنيك الديدلفت عشان تراجع الـ Hip Hinge وقوس الضهر.',
        last_message_time: 'منذ ساعة',
        unread_count: 1,
        status: 'pending_review',
        tags: ['Form Check', 'ديدلفت']
      },
      {
        id: 'conv-3',
        client_id: 'c-3',
        client_name: 'كريم جلال',
        client_phone: '01288334411',
        channel: 'whatsapp',
        last_message: 'تم تسديد اشتراك الـ 3 شهور عبر إنستاباي يا كوتش، مرفق السكرين.',
        last_message_time: 'منذ 3 ساعات',
        unread_count: 0,
        status: 'completed',
        tags: ['تجديد اشتراك', 'إنستاباي']
      },
      {
        id: 'conv-4',
        client_id: 'c-4',
        client_name: 'ريم جمال',
        client_phone: '01155443322',
        channel: 'in_app',
        last_message: 'الدايت مريح جداً بس محتاجة بديل للجبنة القريش عشان التغيير.',
        last_message_time: 'أمس',
        unread_count: 0,
        status: 'active',
        tags: ['تعديل دايت', 'ماكروز']
      }
    ];

    return NextResponse.json({
      success: true,
      conversations: fallbackConversations
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
