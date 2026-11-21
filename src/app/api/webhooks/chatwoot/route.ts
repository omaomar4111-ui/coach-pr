import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabaseClient';

/**
 * Chatwoot Webhook Bridge:
 * Receives events from Chatwoot (e.g. message_created, conversation_created)
 * If message is from customer -> Trigger CoachPR LLM & Order Extractor
 * Then post the response back into Chatwoot conversation via Chatwoot API.
 */

const CHATWOOT_URL = process.env.CHATWOOT_BASE_URL || 'http://localhost:3000';
const CHATWOOT_BOT_TOKEN = process.env.CHATWOOT_API_TOKEN || '';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const event = payload.event;

    // We are interested when a customer creates a message
    if (event === 'message_created') {
      const messageType = payload.message_type; // 0 = incoming from contact, 1 = outgoing from agent
      const content = payload.content;
      const conversationId = payload.conversation?.id;
      const accountId = payload.account?.id;
      const contact = payload.sender;

      // Only respond to incoming customer messages (message_type === 0 or 'incoming')
      if (messageType === 0 || messageType === 'incoming') {
        const customerName = contact?.name || 'Customer';
        const customerPhone = contact?.phone_number || '';

        // 1. Call CoachPR LLM Router
        let aiReply = "أهلاً بك يا فندم! 🌸 فريق CoachPR في خدمتك. جاري مراجعة طلبك والرد فوراً.";
        try {
          const chatRes = await fetch(`${req.nextUrl.origin}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: content,
              conversationId: `cw-${conversationId}`,
              channel: 'chatwoot'
            })
          });
          const chatData = await chatRes.json();
          if (chatData?.reply) {
            aiReply = chatData.reply;
          }
        } catch (llmErr) {
          console.warn('[Chatwoot Bridge] LLM fallback triggered:', llmErr);
        }

        // 2. Post reply back to Chatwoot Conversation if API token is configured
        if (CHATWOOT_BOT_TOKEN && conversationId && accountId) {
          try {
            await fetch(`${CHATWOOT_URL}/api/v1/accounts/${accountId}/conversations/${conversationId}/messages`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'api_access_token': CHATWOOT_BOT_TOKEN
              },
              body: JSON.stringify({
                content: aiReply,
                message_type: 'outgoing',
                private: false
              })
            });
          } catch (cwErr) {
            console.error('[Chatwoot Bridge] Failed to post message to Chatwoot:', cwErr);
          }
        }

        // 3. Save to Supabase if configured
        if (isSupabaseConfigured()) {
          try {
            await supabaseAdmin.from('messages').insert({
              conversation_id: `cw-${conversationId}`,
              sender_type: 'customer',
              content: content,
              metadata: { source: 'chatwoot', accountId, contact }
            });
          } catch (dbErr) {
            console.warn('[Chatwoot Bridge] DB insert warning:', dbErr);
          }
        }

        return NextResponse.json({
          success: true,
          action: 'replied',
          aiReply,
          conversationId
        });
      }
    }

    return NextResponse.json({ success: true, message: 'Event ignored or processed' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'online',
    bridge: 'CoachPR <-> Chatwoot Core Bridge',
    configuredUrl: CHATWOOT_URL
  });
}
