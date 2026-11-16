import { NextResponse } from "next/server";
import { executeWithRetry } from "@/lib/db";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { logAudit } from "@/lib/audit";

interface PilotApplicationPayload {
  fullName: string;
  phone: string;
  countryCity?: string;
  instagramHandle: string;
  activeClientsCount: string;
  currentWorkflow: string[];
  biggestPainPoint: string;
  deviceType: string;
  doesFormCheck: string;
  readyForPilot: boolean;
}

export async function POST(req: Request) {
  try {
    const body: PilotApplicationPayload = await req.json();

    if (!body.fullName || !body.phone || !body.instagramHandle) {
      return NextResponse.json(
        { error: "الاسم ورقم الواتساب ورابط الانستجرام حقول إجبارية" },
        { status: 400 }
      );
    }

    // 1. Calculate Coach Qualification Score (Out of 100 based on Pilot Rubric)
    let score = 0;

    // Active Clients (30 pts)
    if (body.activeClientsCount === "16-35") score += 30; // Ideal cohort
    else if (body.activeClientsCount === "5-15") score += 25;
    else if (body.activeClientsCount === "35+") score += 20;
    else score += 10;

    // Current Workflow Pain (25 pts)
    const workflow = body.currentWorkflow || [];
    if (workflow.includes("excel") || workflow.includes("whatsapp")) score += 25;
    else if (workflow.length > 0) score += 15;

    // Device Diversity (15 pts)
    if (body.deviceType === "ios" || body.deviceType === "android") score += 15;
    else score += 10;

    // Commitment & Form Check (30 pts)
    if (body.readyForPilot) score += 20;
    if (body.doesFormCheck === "yes_whatsapp") score += 10;
    else if (body.doesFormCheck === "yes_irregular") score += 5;

    const applicationId = `pilot-${Date.now()}`;
    const applicationRecord = {
      id: applicationId,
      name: body.fullName,
      phone: body.phone,
      country_city: body.countryCity || "مصر",
      instagram: body.instagramHandle,
      active_clients: body.activeClientsCount,
      workflow: JSON.stringify(body.currentWorkflow || []),
      pain_point: body.biggestPainPoint || "",
      device: body.deviceType || "ios",
      form_check: body.doesFormCheck,
      score,
      status: score >= 70 ? "shortlisted" : "waitlisted",
      created_at: new Date().toISOString(),
    };

    // 2. Persist to Supabase if fully configured
    if (isSupabaseConfigured() && supabase) {
      try {
        await executeWithRetry(async () => {
          const { error } = await supabase
            .from("pilot_applications")
            .insert([applicationRecord]);
          if (error) {
            console.warn("pilot_applications insert notice:", error.message);
          }
        }, false, applicationId);
      } catch (dbErr) {
        console.warn("DB insert deferred, fallback to audit logging:", dbErr);
      }
    }

    // 3. Log Audit Record
    await logAudit({
      actorId: applicationId,
      actorRole: "coach",
      action: "coach.pilot_application_submitted",
      resourceType: "client",
      resourceId: applicationId,
      metadata: {
        score,
        name: body.fullName,
        phone: body.phone,
        status: applicationRecord.status,
      },
    });

    return NextResponse.json({
      success: true,
      applicationId,
      score,
      status: applicationRecord.status,
      message:
        "شكراً ليك يا كابتن! استلمنا ترشيحك بنجاح. فريق CoachPRB بيراجع الطلبات دلوقتي، وهنتواصل مع الـ 10 مدربين المقبولين على الواتساب مباشرة لتسليم الحسابات والبدء فوراً.",
    });
  } catch (err: any) {
    console.error("Error in pilot application submission:", err);
    return NextResponse.json(
      { error: "حدث خطأ أثناء تسجيل طلب الانضمام", details: err?.message || String(err) },
      { status: 500 }
    );
  }
}
