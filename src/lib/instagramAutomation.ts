/**
 * Instagram Automation Engine (Comment-to-DM & Mention Automation)
 * Inspired by LordVayron/dmland (Zero-dependency ManyChat alternative via Meta Graph API)
 */

import { supabaseAdmin } from './supabaseClient';
import { routeLLMCompletion } from './llmRouter';

export interface InstagramCommentPayload {
  comment_id: string;
  from: {
    id: string;
    username: string;
  };
  post_id: string;
  text: string;
  created_time: number;
}

export interface SendIgDmParams {
  recipientId: string;
  message: string;
  quickReplyLink?: string;
}

/**
 * Send an automated Direct Message (DM) to an Instagram user via Meta Graph API
 */
export async function sendInstagramDirectMessage({ recipientId, message, quickReplyLink }: SendIgDmParams): Promise<{ success: boolean; data?: any; error?: any }> {
  const pageAccessToken = process.env.INSTAGRAM_ACCESS_TOKEN || process.env.WHATSAPP_ACCESS_TOKEN;

  if (!pageAccessToken) {
    console.warn('[Instagram Automation] Missing INSTAGRAM_ACCESS_TOKEN. Mocking DM dispatch in development.');
    return { success: true, data: { mock: true, recipientId, message } };
  }

  const payload: any = {
    recipient: { id: recipientId },
    message: {
      text: quickReplyLink ? `${message}\n\n🔗 ${quickReplyLink}` : message
    }
  };

  try {
    const res = await fetch(`https://graph.facebook.com/v21.0/me/messages?access_token=${pageAccessToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('[Instagram Graph API Error]:', data);
      return { success: false, error: data };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('[Instagram DM Fetch Exception]:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Process an incoming Instagram Comment, check keywords, generate AI response,
 * send DM to user, and persist conversation in Supabase.
 */
export async function handleInstagramComment(comment: InstagramCommentPayload) {
  const { id: commenterId, username } = comment.from;
  const commentText = comment.text;
  const commentId = comment.comment_id;

  console.log(`[Instagram Automation] New comment from @${username}: "${commentText}"`);

  // 1. Check idempotency to prevent duplicate responses
  const { data: existingMsg } = await supabaseAdmin
    .from('messages')
    .select('id')
    .eq('provider_message_id', `ig_comment_${commentId}`)
    .maybeSingle();

  if (existingMsg) {
    console.log(`[Instagram Automation] Comment ${commentId} already processed. Skipping.`);
    return { skipped: true, reason: 'ALREADY_PROCESSED' };
  }

  // 2. Fetch or create tenant
  let tenantId: string | null = null;
  const { data: tenant } = await supabaseAdmin
    .from('tenants')
    .select('id')
    .limit(1)
    .maybeSingle();

  if (tenant) tenantId = tenant.id;

  // 3. Find or Create Instagram Customer
  let customerId: string | null = null;
  const { data: existingCustomer } = await supabaseAdmin
    .from('customers')
    .select('id')
    .eq('phone', `ig:${commenterId}`)
    .maybeSingle();

  if (existingCustomer) {
    customerId = existingCustomer.id;
  } else if (tenantId) {
    const { data: newCustomer } = await supabaseAdmin
      .from('customers')
      .insert({
        tenant_id: tenantId,
        phone: `ig:${commenterId}`,
        name: `@${username}`,
        channel: 'instagram'
      })
      .select('id')
      .maybeSingle();

    customerId = newCustomer?.id || null;
  }

  // 4. Find or Create Conversation
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

  // 5. Store Comment in Messages table
  if (conversationId) {
    await supabaseAdmin
      .from('messages')
      .insert({
        conversation_id: conversationId,
        provider_message_id: `ig_comment_${commentId}`,
        direction: 'inbound',
        sender_type: 'customer',
        sender_id: commenterId,
        content: `[تعليق على البوست]: ${commentText}`,
        metadata: { ig_post_id: comment.post_id, username }
      });
  }

  // 6. Generate Personalized DM response via Smart LLM Router
  const aiPrompt = [
    {
      role: 'system' as const,
      content: `أنتِ "سارة طارق"، مسؤولة المبيعات وخدمة العملاء في متجر إلكتروني مصري راقٍ.
العميل علّق على بوست/ريلز بالآتي: "${commentText}".
مهمتك كتابة رسالة خاصة (DM) مهذبة وسريعة وجذابة باللهجة المصرية، تحييه باسمه (@${username})، وتخبره بتفاصيل السعر أو تدعوه لشراء المنتج مع كود خصم ترحيبي، وتطلب منه رقم الهاتف لتأكيد الأوردر عبر واتساب فوراً.`
    },
    {
      role: 'user' as const,
      content: commentText
    }
  ];

  const llmResult = await routeLLMCompletion(aiPrompt, { preferFast: true });
  const replyText = llmResult.text;

  // 7. Dispatch the Instagram Direct Message
  const dmResult = await sendInstagramDirectMessage({
    recipientId: commenterId,
    message: replyText,
    quickReplyLink: 'https://pr-agent-ai.vercel.app'
  });

  // 8. Record outgoing AI message in Supabase
  if (conversationId) {
    await supabaseAdmin
      .from('messages')
      .insert({
        conversation_id: conversationId,
        provider_message_id: dmResult.data?.message_id || `ig_dm_${Date.now()}`,
        direction: 'outbound',
        sender_type: 'agent',
        sender_id: 'sara_tarek',
        content: replyText,
        metadata: {
          provider: llmResult.provider,
          model: llmResult.model,
          dm_status: dmResult.success ? 'sent' : 'failed'
        }
      });
  }

  return {
    success: true,
    commentId,
    username,
    replyText,
    dmStatus: dmResult.success ? 'SENT' : 'LOGGED'
  };
}
