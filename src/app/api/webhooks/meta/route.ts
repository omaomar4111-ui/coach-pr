import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { supabaseAdmin } from "@/lib/supabaseClient";
import { LLMRouter } from "@/lib/llmRouter";
import { moderateMessage } from "@/lib/aiModerator";
import { handleInstagramComment } from "@/lib/instagramAutomation";
import { AGENTS } from "@/data/agents";

// GET: Webhook verification
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const mode = params.get("hub.mode");
  const token = params.get("hub.verify_token");
  const challenge = params.get("hub.challenge");

  const verifyToken =
    process.env.META_VERIFY_TOKEN || process.env.WHATSAPP_VERIFY_TOKEN || "pr_agent_secure_token_2026";

  if (mode === "subscribe" && token === verifyToken) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "verification_failed" }, { status: 403 });
}

// POST: Receive webhook events (WhatsApp + Instagram)
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-hub-signature-256");
    const appSecret = process.env.META_APP_SECRET || process.env.WHATSAPP_APP_SECRET;

    // HMAC verification (if secret configured)
    if (appSecret && signature) {
      const expected =
        "sha256=" +
        createHmac("sha256", appSecret).update(rawBody).digest("hex");
      const sigBuf = Buffer.from(signature);
      const expBuf = Buffer.from(expected);
      if (
        sigBuf.length !== expBuf.length ||
        !timingSafeEqual(sigBuf, expBuf)
      ) {
        return NextResponse.json({ error: "invalid_signature" }, { status: 401 });
      }
    }

    const json = JSON.parse(rawBody);
    const object = json.object; // "whatsapp_business_account" or "instagram"

    for (const entry of json.entry || []) {
      // Instagram comments
      if (object === "instagram" && entry.changes) {
        for (const change of entry.changes) {
          if (change.field === "comments") {
            const c = change.value;
            await handleInstagramComment({
              instagram_user_id: c.from?.id || "",
              username: c.from?.username || "user",
              comment_id: c.id,
              comment_text: c.text || "",
              media_id: c.media?.id || "",
            });
          }
        }
      }

      // WhatsApp messages
      if (entry.changes) {
        for (const change of entry.changes) {
          const value = change.value;
          if (value?.messages) {
            for (const msg of value.messages) {
              await handleWhatsAppMessage(msg);
            }
          }
        }
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Meta webhook error:", error);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}

async function handleWhatsAppMessage(message: any) {
  const from = message.from;
  const messageId = message.id;
  const text = message.text?.body || "";

  if (!text || message.type !== "text") return;

  // Moderate
  const mod = moderateMessage(text);
  if (!mod.allowed) return;

  // Find/create customer
  let { data: customer } = await supabaseAdmin
    .from("customers")
    .select("id")
    .eq("phone", from)
    .maybeSingle();

  if (!customer) {
    const { data: newCust } = await supabaseAdmin
      .from("customers")
      .insert({ phone: from, name: `Customer ${from}`, channel: 'whatsapp' })
      .select()
      .single();
    customer = newCust;
  }

  // Find/create conversation
  let { data: conversation } = await supabaseAdmin
    .from("conversations")
    .select("id, active_agent, ai_enabled")
    .eq("customer_id", customer!.id)
    .eq("status", "open")
    .maybeSingle();

  if (!conversation) {
    let tenantId: string | null = process.env.DEMO_TENANT_ID || null;
    if (!tenantId) {
      const { data: t } = await supabaseAdmin.from("tenants").select("id").limit(1).maybeSingle();
      tenantId = t?.id || null;
    }

    const { data: newConv } = await supabaseAdmin
      .from("conversations")
      .insert({
        customer_id: customer!.id,
        tenant_id: tenantId,
        active_agent: "sara_tarek",
        status: "open",
        ai_enabled: true,
      })
      .select()
      .single();
    conversation = newConv;
  }

  // Save inbound (idempotency via unique provider_message_id)
  const { error: insertErr } = await supabaseAdmin.from("messages").insert({
    conversation_id: conversation!.id,
    provider_message_id: messageId,
    direction: "inbound",
    sender_type: "customer",
    content: text,
    metadata: message,
  });

  if (insertErr?.code === "23505") return; // duplicate

  // AI reply
  if (conversation!.ai_enabled) {
    const agent = AGENTS.find((a) => a.id === conversation!.active_agent);
    const systemPrompt =
      agent?.system_prompt || "أنت مساعد خدمة عملاء ودود لمتجر إلكتروني.";

    const { text: reply } = await LLMRouter.withText(systemPrompt, [], text);

    await supabaseAdmin.from("messages").insert({
      conversation_id: conversation!.id,
      direction: "outbound",
      sender_type: "agent",
      content: reply,
    });

    await sendWhatsApp(from, reply, messageId);
  }

  await supabaseAdmin
    .from("conversations")
    .update({ last_message_at: new Date().toISOString() })
    .eq("id", conversation!.id);
}

async function sendWhatsApp(to: string, body: string, replyTo?: string) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneId) return;

  const payload: any = {
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: { body },
  };
  if (replyTo) payload.context = { message_id: replyTo };

  await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).catch((err) => console.error("WhatsApp send failed:", err));
}
