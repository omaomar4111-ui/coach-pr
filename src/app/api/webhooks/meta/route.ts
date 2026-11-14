import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseClient';

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Support WhatsApp Cloud API Payload
    if (body.object === 'whatsapp_business_account') {
      const entry = body.entry?.[0];
      const change = entry?.changes?.[0]?.value;
      const message = change?.messages?.[0];

      if (message) {
        const providerMessageId = message.id;
        const fromNumber = message.from; // e.g. 201012345678
        const messageText = message.text?.body || '';

        // 1. Idempotency Check: Don't process the same message twice
        const { data: existingMsg } = await supabaseAdmin
          .from('messages')
          .select('id')
          .eq('provider_message_id', providerMessageId)
          .maybeSingle();

        if (existingMsg) {
          console.log(`[Idempotency] Duplicate message ${providerMessageId} skipped.`);
          return NextResponse.json({ skipped: true, reason: 'DUPLICATE_MESSAGE' });
        }

        // 2. Resolve or Create Demo Tenant
        let tenantId: string | null = null;
        const { data: tenant } = await supabaseAdmin
          .from('tenants')
          .select('id')
          .limit(1)
          .maybeSingle();

        if (tenant) {
          tenantId = tenant.id;
        }

        // 3. Find or Create Customer
        let customerId: string | null = null;
        const { data: existingCustomer } = await supabaseAdmin
          .from('customers')
          .select('id')
          .eq('phone', fromNumber)
          .maybeSingle();

        if (existingCustomer) {
          customerId = existingCustomer.id;
        } else if (tenantId) {
          const { data: newCustomer } = await supabaseAdmin
            .from('customers')
            .insert({
              tenant_id: tenantId,
              phone: fromNumber,
              name: `عميل واتساب (${fromNumber.slice(-4)})`,
              channel: 'whatsapp'
            })
            .select('id')
            .maybeSingle();

          customerId = newCustomer?.id || null;
        }

        // 4. Find or Create Open Conversation
        let conversationId: string | null = null;
        if (customerId && tenantId) {
          const { data: existingConv } = await supabaseAdmin
            .from('conversations')
            .select('id')
            .eq('customer_id', customerId)
            .eq('status', 'open')
            .maybeSingle();

          if (existingConv) {
            conversationId = existingConv.id;
            await supabaseAdmin
              .from('conversations')
              .update({ last_message_at: new Date().toISOString() })
              .eq('id', conversationId);
          } else {
            const { data: newConv } = await supabaseAdmin
              .from('conversations')
              .insert({
                tenant_id: tenantId,
                customer_id: customerId,
                status: 'open',
                ai_enabled: true,
                active_agent: 'sara_tarek'
              })
              .select('id')
              .maybeSingle();

            conversationId = newConv?.id || null;
          }
        }

        // 5. Save Incoming Message to Supabase
        if (conversationId) {
          await supabaseAdmin
            .from('messages')
            .insert({
              conversation_id: conversationId,
              provider_message_id: providerMessageId,
              direction: 'inbound',
              sender_type: 'customer',
              sender_id: fromNumber,
              content: messageText,
              metadata: { raw: message }
            });
        }
      }
    }

    return NextResponse.json({ status: 'EVENT_RECEIVED_AND_PERSISTED' }, { status: 200 });
  } catch (error: any) {
    console.error('[Webhook Processing Error]:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
