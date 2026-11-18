import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";

export async function GET() {
  try {
    const { data: tenant } = await supabaseAdmin
      .from("tenants")
      .select("id, name, settings")
      .limit(1)
      .maybeSingle();

    const settings = tenant?.settings || {};
    const apiKey = settings.api_key || "pr_live_demo998f5f51a843cbb0eb28cb1";

    return NextResponse.json({
      success: true,
      tenantId: tenant?.id || null,
      name: tenant?.name || "متجر براند التجريبي",
      maskedKey: `${apiKey.slice(0, 10)}************************${apiKey.slice(-4)}`,
      webhookUrl: settings.webhook_url || "",
      webhookEvents: settings.webhook_events || ["message.received", "order.created"],
      integrations: settings.integrations || {
        whatsapp: { connected: true, phone: "+20 101 234 5678" },
        instagram: { connected: true, username: "@brand_store" },
        sheets: { connected: false },
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, webhookUrl, webhookEvents, integration, integrationData } = body;

    const { data: tenant } = await supabaseAdmin
      .from("tenants")
      .select("id, settings")
      .limit(1)
      .maybeSingle();

    if (!tenant) {
      return NextResponse.json({ error: "No tenant found" }, { status: 404 });
    }

    const currentSettings = tenant.settings || {};

    if (action === "update_webhook") {
      const updatedSettings = {
        ...currentSettings,
        webhook_url: webhookUrl,
        webhook_events: webhookEvents || [],
        webhook_updated_at: new Date().toISOString(),
      };

      await supabaseAdmin
        .from("tenants")
        .update({ settings: updatedSettings })
        .eq("id", tenant.id);

      return NextResponse.json({ success: true, message: "تم حفظ إعدادات الـ Webhook بنجاح" });
    }

    if (action === "test_webhook") {
      if (!webhookUrl) {
        return NextResponse.json({ error: "Webhook URL required" }, { status: 400 });
      }

      try {
        const testPayload = {
          event: "test.ping",
          timestamp: new Date().toISOString(),
          tenant_id: tenant.id,
          data: {
            message: "هذا حدث تجريبي تم إرساله من منصة CoachPRB بنجاح 🚀",
          },
        };

        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(testPayload),
        });

        return NextResponse.json({
          success: true,
          status: res.status,
          statusText: res.statusText,
        });
      } catch (err: any) {
        return NextResponse.json({
          success: false,
          error: `تعذر الوصول إلى الرابط: ${err.message}`,
        });
      }
    }

    if (action === "connect_integration") {
      const integrations = currentSettings.integrations || {};
      integrations[integration] = {
        connected: true,
        ...integrationData,
        connected_at: new Date().toISOString(),
      };

      await supabaseAdmin
        .from("tenants")
        .update({ settings: { ...currentSettings, integrations } })
        .eq("id", tenant.id);

      return NextResponse.json({ success: true, message: `تم ربط ${integration} بنجاح` });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Settings error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
