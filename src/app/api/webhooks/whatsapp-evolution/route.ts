import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";
import { routeLLMCompletion } from "@/lib/llmRouter";

/**
 * Evolution API / WAHA WhatsApp Open-Source Webhook Handler
 * Bypasses Meta Cloud API business verification bottlenecks.
 * Direct QR-code session binding with local WhatsApp numbers.
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Evolution API payload format
    // event: "messages.upsert" or "message"
    const event = body.event || body.type;
    const data = body.data || body;

    // Check if incoming text message
    const messageInfo = data.message || data;
    const isFromMe = data.key?.fromMe || messageInfo.fromMe || false;

    if (isFromMe) {
      return NextResponse.json({ status: "IGNORED_OUTBOUND" }, { status: 200 });
    }

    // Extract sender phone & content
    const remoteJid = data.key?.remoteJid || data.from || "";
    const fromNumber = remoteJid.replace("@s.whatsapp.net", "").replace(/\D/g, "");
    
    // Support text, conversation, and extendedTextMessage
    const messageText = 
      messageInfo.conversation ||
      messageInfo.extendedTextMessage?.text ||
      data.body ||
      "";

    const providerMessageId = data.key?.id || `evo_${Date.now()}`;

    if (!fromNumber || !messageText) {
      return NextResponse.json({ status: "NO_MESSAGE_TEXT" }, { status: 200 });
    }

    console.log(`[Evolution API] Incoming message from +${fromNumber}: "${messageText}"`);

    // 1. Idempotency Check
    const { data: existingMsg } = await supabaseAdmin
      .from("messages")
      .select("id")
      .eq("provider_message_id", providerMessageId)
      .maybeSingle();

    if (existingMsg) {
      return NextResponse.json({ status: "ALREADY_EXISTS" }, { status: 200 });
    }

    // 2. Resolve Tenant
    let tenantId: string | null = null;
    const { data: tenant } = await supabaseAdmin
      .from("tenants")
      .select("id")
      .limit(1)
      .maybeSingle();

    if (tenant) tenantId = tenant.id;

    // 3. Find or Create Customer
    let customerId: string | null = null;
    const { data: existingCustomer } = await supabaseAdmin
      .from("customers")
      .select("id")
      .eq("phone", fromNumber)
      .maybeSingle();

    if (existingCustomer) {
      customerId = existingCustomer.id;
    } else if (tenantId) {
      const { data: newCustomer } = await supabaseAdmin
        .from("customers")
        .insert({
          tenant_id: tenantId,
          phone: fromNumber,
          name: `عميل واتساب (${fromNumber.slice(-4)})`,
          channel: "whatsapp_evolution"
        })
        .select("id")
        .maybeSingle();

      customerId = newCustomer?.id || null;
    }

    // 4. Find or Create Conversation
    let conversationId: string | null = null;
    if (customerId && tenantId) {
      const { data: existingConv } = await supabaseAdmin
        .from("conversations")
        .select("id")
        .eq("customer_id", customerId)
        .eq("status", "open")
        .maybeSingle();

      if (existingConv) {
        conversationId = existingConv.id;
        await supabaseAdmin
          .from("conversations")
          .update({ last_message_at: new Date().toISOString() })
          .eq("id", conversationId);
      } else {
        const { data: newConv } = await supabaseAdmin
          .from("conversations")
          .insert({
            tenant_id: tenantId,
            customer_id: customerId,
            status: "open",
            ai_enabled: true,
            active_agent: "sara_tarek"
          })
          .select("id")
          .maybeSingle();

        conversationId = newConv?.id || null;
      }
    }

    // 5. Store Inbound Message
    if (conversationId) {
      await supabaseAdmin.from("messages").insert({
        conversation_id: conversationId,
        provider_message_id: providerMessageId,
        direction: "inbound",
        sender_type: "customer",
        sender_id: fromNumber,
        content: messageText,
        metadata: { raw: body, source: "evolution_api" }
      });

      // 6. Generate AI response using Smart LLM Router
      const aiPrompt = [
        {
          role: "system" as const,
          content: "أنتِ سارة طارق، خبيرة المبيعات وخدمة العملاء في متجر إلكتروني مصري راقٍ. أجيبي بترحيب فوري باللهجة المصرية المهذبة والمختصرة، وقدمي العروض وأكدي إمكانية الدفع عبر إنستاباي أو عند الاستلام."
        },
        {
          role: "user" as const,
          content: messageText
        }
      ];

      const llmResult = await routeLLMCompletion(aiPrompt);

      // Store outbound message
      await supabaseAdmin.from("messages").insert({
        conversation_id: conversationId,
        provider_message_id: `evo_reply_${Date.now()}`,
        direction: "outbound",
        sender_type: "agent",
        sender_id: "sara_tarek",
        content: llmResult.text,
        metadata: {
          provider: llmResult.provider,
          model: llmResult.model,
          source: "evolution_api_reply"
        }
      });

      // 7. Send message back to WhatsApp via Evolution API endpoint if configured
      const evoApiUrl = process.env.EVOLUTION_API_URL;
      const evoApiKey = process.env.EVOLUTION_API_KEY;
      const evoInstance = process.env.EVOLUTION_INSTANCE || "pr_agent_main";

      if (evoApiUrl && evoApiKey) {
        try {
          await fetch(`${evoApiUrl}/message/sendText/${evoInstance}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: evoApiKey
            },
            body: JSON.stringify({
              number: fromNumber,
              text: llmResult.text
            })
          });
        } catch (evoErr) {
          console.error("[Evolution API Send Error]:", evoErr);
        }
      }
    }

    return NextResponse.json({
      status: "SUCCESS",
      from: fromNumber,
      handledBy: "sara_tarek"
    });
  } catch (error: any) {
    console.error("[Evolution Webhook Error]:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
