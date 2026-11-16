import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";
import { LLMRouter } from "@/lib/llmRouter";
import { moderateMessage } from "@/lib/aiModerator";
import { AGENTS } from "@/data/agents";

/**
 * Evolution API Webhook Handler
 * Receives messages from self-hosted Evolution API (WhatsApp via QR)
 */

// GET: Health check
export async function GET() {
  return NextResponse.json({ status: "evolution_webhook_active" });
}

// POST: Receive Evolution API events
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Evolution API event structure
    const { event, data } = body;

    if (event && event !== "messages.upsert" && event !== "messages.update") {
      return NextResponse.json({ status: "ignored", event });
    }

    const message = data?.messages?.[0] || data?.message || data;
    if (!message) return NextResponse.json({ status: "no_message" });

    // Skip if from self (bot)
    if (message.key?.fromMe) {
      return NextResponse.json({ status: "from_bot" });
    }

    const from = message.key?.remoteJid?.split("@")[0] || message.from?.split("@")[0] || "";
    const messageId = message.key?.id || message.id || `evo_${Date.now()}`;
    const text =
      message.message?.conversation ||
      message.message?.extendedTextMessage?.text ||
      message.body ||
      "";

    if (!from || !text) {
      return NextResponse.json({ status: "missing_fields" });
    }

    // 1. Moderate the message
    const moderation = moderateMessage(text);
    if (!moderation.allowed) {
      return NextResponse.json({
        status: "blocked",
        reason: moderation.reason,
      });
    }

    // 2. Find or create customer
    let { data: customer } = await supabaseAdmin
      .from("customers")
      .select("id")
      .eq("phone", from)
      .maybeSingle();

    if (!customer) {
      const { data: newCust, error } = await supabaseAdmin
        .from("customers")
        .insert({ phone: from, name: `Customer ${from}`, channel: 'whatsapp_evolution' })
        .select("id")
        .single();
      if (error) throw error;
      customer = newCust;
    }

    if (!customer?.id) {
      return NextResponse.json({ status: "customer_creation_failed" }, { status: 500 });
    }

    // 3. Find or create conversation
    let { data: conversation } = await supabaseAdmin
      .from("conversations")
      .select("id, active_agent, ai_enabled")
      .eq("customer_id", customer.id)
      .eq("status", "open")
      .maybeSingle();

    if (!conversation) {
      let tenantId: string | null = process.env.DEMO_TENANT_ID || null;
      if (!tenantId) {
        const { data: t } = await supabaseAdmin.from("tenants").select("id").limit(1).maybeSingle();
        tenantId = t?.id || null;
      }

      const { data: newConv, error } = await supabaseAdmin
        .from("conversations")
        .insert({
          customer_id: customer.id,
          tenant_id: tenantId,
          active_agent: "sara_tarek",
          status: "open",
          ai_enabled: true,
        })
        .select("id, active_agent, ai_enabled")
        .single();
      if (error) throw error;
      conversation = newConv;
    }

    if (!conversation?.id) {
      return NextResponse.json({ status: "conversation_creation_failed" }, { status: 500 });
    }

    // 4. Save inbound message (with idempotency)
    const { error: msgErr } = await supabaseAdmin.from("messages").insert({
      conversation_id: conversation.id,
      provider_message_id: messageId,
      direction: "inbound",
      sender_type: "customer",
      content: text,
      metadata: message,
    });

    // Skip duplicate
    if (msgErr?.code === "23505") {
      return NextResponse.json({ status: "duplicate" });
    }

    // 5. Generate AI reply if enabled
    if (conversation.ai_enabled) {
      const agent = AGENTS.find((a) => a.id === conversation!.active_agent);
      const systemPrompt =
        agent?.system_prompt ||
        "أنت مساعد خدمة عملاء ودود لمتجر إلكتروني.";

      const { data: history } = await supabaseAdmin
        .from("messages")
        .select("direction, content, sender_type")
        .eq("conversation_id", conversation.id)
        .order("created_at", { ascending: false })
        .limit(10);

      const formattedHistory = (history || [])
        .reverse()
        .map((m) => ({
          role: (m.direction === "inbound" ? "user" : "model") as
            | "user"
            | "model",
          parts: m.content,
        }));

      const { text: replyText } = await LLMRouter.withText(
        systemPrompt,
        formattedHistory,
        text
      );

      // Save AI reply
      await supabaseAdmin.from("messages").insert({
        conversation_id: conversation.id,
        direction: "outbound",
        sender_type: "agent",
        content: replyText,
      });

      // Send via Evolution API
      await sendEvolutionMessage(from, replyText);
    }

    // Update conversation
    await supabaseAdmin
      .from("conversations")
      .update({ last_message_at: new Date().toISOString() })
      .eq("id", conversation.id);

    return NextResponse.json({ status: "processed" });
  } catch (error) {
    console.error("Evolution webhook error:", error);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}

async function sendEvolutionMessage(to: string, text: string) {
  const apiUrl = process.env.EVOLUTION_API_URL;
  const apiKey = process.env.EVOLUTION_API_KEY;
  const instance = process.env.EVOLUTION_INSTANCE_NAME || process.env.EVOLUTION_INSTANCE;

  if (!apiUrl || !apiKey || !instance) {
    console.warn("Evolution API not configured");
    return;
  }

  try {
    await fetch(`${apiUrl}/message/sendText/${instance}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
      },
      body: JSON.stringify({
        number: to,
        text,
      }),
    });
  } catch (error) {
    console.error("Send Evolution message failed:", error);
  }
}
