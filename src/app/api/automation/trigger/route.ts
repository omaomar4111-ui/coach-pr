import { NextRequest, NextResponse } from "next/server";
import { supabase, supabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseClient";
import { sendAutomatedNotification, buildAutomationContent, AutomationEvent } from "@/lib/automationEngine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, tenantId, athleteId, data } = body;

    if (!type || !athleteId) {
      return NextResponse.json({ success: false, error: "Missing type or athleteId" }, { status: 400 });
    }

    const event: AutomationEvent = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      type,
      tenantId: tenantId || "coach_master_01",
      athleteId,
      data: data || {},
      createdAt: new Date().toISOString(),
      processed: false
    };

    // 1. Build message content
    const messagePayload = buildAutomationContent(event);

    // 2. Dispatch via abstracted provider (Safeguarded against real customer delivery during tests)
    const result = await sendAutomatedNotification(messagePayload, { isDryRun: true });

    return NextResponse.json({
      success: true,
      eventId: event.id,
      dispatchResult: result,
      message: "تم تسجيل وتشغيل مهمة الأتمتة بنجاح في المنظومة"
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || "Automation error" }, { status: 500 });
  }
}
