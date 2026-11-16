import { supabaseAdmin } from "./supabaseClient";

interface IGCommentEvent {
  instagram_user_id: string;
  username: string;
  comment_id: string;
  comment_text: string;
  media_id: string;
}

/**
 * Handles Instagram comment -> automatic DM
 */
export async function handleInstagramComment(
  event: IGCommentEvent
): Promise<{ success: boolean; customerId?: string; conversationId?: string; error?: any }> {
  try {
    const { instagram_user_id, username, comment_text } = event;

    // 1. Find or create customer
    let { data: customer } = await supabaseAdmin
      .from("customers")
      .select("id")
      .eq("phone", `ig_${instagram_user_id}`)
      .maybeSingle();

    if (!customer) {
      const { data: newCustomer, error: custErr } = await supabaseAdmin
        .from("customers")
        .insert({
          phone: `ig_${instagram_user_id}`,
          name: `@${username}`,
          channel: "instagram",
          metadata: { instagram_user_id, username },
        })
        .select("id")
        .single();
      if (custErr) throw custErr;
      customer = newCustomer;
    }

    if (!customer?.id) {
      throw new Error("Failed to resolve customer for Instagram user");
    }

    // 2. Find or create conversation
    let { data: conversation } = await supabaseAdmin
      .from("conversations")
      .select("id")
      .eq("customer_id", customer.id)
      .eq("status", "open")
      .maybeSingle();

    if (!conversation) {
      let tenantId: string | null = process.env.DEMO_TENANT_ID || null;
      if (!tenantId) {
        const { data: tenant } = await supabaseAdmin.from("tenants").select("id").limit(1).maybeSingle();
        tenantId = tenant?.id || null;
      }

      const { data: newConv, error: convErr } = await supabaseAdmin
        .from("conversations")
        .insert({
          customer_id: customer.id,
          tenant_id: tenantId,
          active_agent: "sara_tarek",
          status: "open",
          ai_enabled: true,
        })
        .select("id")
        .single();
      if (convErr) throw convErr;
      conversation = newConv;
    }

    if (!conversation?.id) {
      throw new Error("Failed to resolve conversation for Instagram user");
    }

    // 3. Save the comment as an inbound message
    await supabaseAdmin.from("messages").insert({
      conversation_id: conversation.id,
      provider_message_id: event.comment_id,
      direction: "inbound",
      sender_type: "customer",
      content: `[تعليق إنستجرام] ${comment_text}`,
      metadata: event,
    });

    // 4. Trigger auto-DM response
    const dmText = `أهلاً @${username}! شكراً لتعليقك 💜 شوف الكتالوج والخصم الحصري: https://pr-agent-ai.vercel.app/pricing`;

    await supabaseAdmin.from("messages").insert({
      conversation_id: conversation.id,
      direction: "outbound",
      sender_type: "agent",
      content: dmText,
    });

    return {
      success: true,
      customerId: customer.id,
      conversationId: conversation.id,
    };
  } catch (error) {
    console.error("Instagram comment handler error:", error);
    return { success: false, error };
  }
}
