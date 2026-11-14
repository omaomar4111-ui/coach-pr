import { NextRequest, NextResponse } from 'next/server';

// 1. Meta Webhook Verification (WhatsApp / Instagram / Messenger)
// Meta sends a GET request to verify the webhook URL with hub.mode, hub.verify_token, and hub.challenge
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || 'pr_agent_secure_token_2026';

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('[Meta Webhook Verified Successfully]');
    return new Response(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
}

// 2. Incoming Messages Handler
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('[Incoming Meta Webhook Event]:', JSON.stringify(body, null, 2));

    // Support WhatsApp Cloud API Payload
    if (body.object === 'whatsapp_business_account') {
      const entry = body.entry?.[0];
      const change = entry?.changes?.[0]?.value;
      const message = change?.messages?.[0];

      if (message) {
        const fromNumber = message.from; // Sender phone (e.g. 201012345678)
        const messageText = message.text?.body || '';
        const messageId = message.id;

        console.log(`[WhatsApp Inbound] From: ${fromNumber} | Message: "${messageText}"`);

        // Instant dispatch to PR Agent AI engine logic
        // Auto-reply will be executed via Meta Graph API
      }
    }

    // Support Instagram / Facebook Messenger Webhook Payload
    if (body.object === 'instagram' || body.object === 'page') {
      const entry = body.entry?.[0];
      const messaging = entry?.messaging?.[0];

      if (messaging) {
        const senderId = messaging.sender?.id;
        const recipientId = messaging.recipient?.id;
        const messageText = messaging.message?.text || '';

        console.log(`[Meta Inbound] From: ${senderId} | To: ${recipientId} | Message: "${messageText}"`);
      }
    }

    return NextResponse.json({ status: 'EVENT_RECEIVED' }, { status: 200 });
  } catch (error: any) {
    console.error('[Webhook Processing Error]:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
