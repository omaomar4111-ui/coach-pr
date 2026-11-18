import { NextResponse } from 'next/server';
import * as webpush from 'web-push';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { logAudit } from '@/lib/audit';

// Fallback VAPID credentials for development / test verification
const vapidPublicKey = process.env.VAPID_PUBLIC_KEY || 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U';
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY || 'UUxI28smgPz9pm9nwTf-vJvL3lQYv29Tj0mNk9eY14g';

try {
  webpush.setVapidDetails(
    'mailto:support@pragent.com',
    vapidPublicKey,
    vapidPrivateKey
  );
} catch (e) {
  console.warn('VAPID initialization notice:', e);
}

export async function POST(req: Request) {
  try {
    const { clientId, title, body, url } = await req.json();

    if (!clientId || !title) {
      return NextResponse.json({ error: 'clientId and title are required' }, { status: 400 });
    }

    // 1. Fetch push subscription from database if Supabase configured
    let subscription: any = null;

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('push_subscriptions')
        .select('subscription')
        .eq('client_id', clientId)
        .single();

      if (!error && data) {
        subscription = data.subscription;
      }
    }

    // 2. Dispatch Web Push notification
    const payload = JSON.stringify({
      title: title || 'CoachPRB - تنبيه التدريب',
      body: body || 'لديك تحديث جديد في خطتك التدريبية اليوم.',
      url: url || '/app',
      icon: '/pr-logo.png',
      badge: '/pr-logo.png',
    });

    if (subscription) {
      await webpush.sendNotification(subscription, payload);
    }

    // 3. Log Audit
    await logAudit({
      actorId: clientId,
      actorRole: 'agent',
      action: 'push_notification.dispatched',
      resourceType: 'client',
      resourceId: clientId,
      metadata: { title, url, deliveredViaPush: !!subscription },
    });

    return NextResponse.json({
      success: true,
      delivered: !!subscription,
      notice: subscription ? 'Push sent to device' : 'Logged to notifications (simulation mode)',
    });
  } catch (error: any) {
    console.error('Push notification error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to send push' }, { status: 500 });
  }
}
