import { NextResponse } from "next/server";
import { executeWithRetry } from "@/lib/db";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { logAudit } from "@/lib/audit";

interface AthleteIntakePayload {
  primaryGoal: string;
  targetTimeframe: string;
  currentWeightKg: string;
  heightCm: string;
  trainingExperience: string;
  trainingDaysPerWeek: number;
  jointInjuries: string[];
  medicalConditions?: string;
  fullName: string;
  phone: string;
  preferredConsultationTime: string;
}

export async function POST(req: Request) {
  try {
    const body: AthleteIntakePayload = await req.json();

    if (!body.fullName || !body.phone) {
      return NextResponse.json(
        { error: "الاسم الكامل ورقم الواتساب مطلوبان" },
        { status: 400 }
      );
    }

    const leadId = `lead-${Date.now()}`;
    const intakeRecord = {
      id: leadId,
      name: body.fullName,
      phone: body.phone,
      goal: body.primaryGoal,
      timeframe: body.targetTimeframe,
      weight_kg: body.currentWeightKg,
      height_cm: body.heightCm,
      experience: body.trainingExperience,
      training_days: body.trainingDaysPerWeek,
      injuries: JSON.stringify(body.jointInjuries || []),
      medical_notes: body.medicalConditions || "",
      preferred_time: body.preferredConsultationTime,
      source: "athlete_intake_quiz",
      status: "consultation_pending",
      created_at: new Date().toISOString(),
    };

    // 1. Persist to clients table if Supabase is available
    if (isSupabaseConfigured() && supabase) {
      try {
        await executeWithRetry(async () => {
          const { error } = await supabase
            .from("clients")
            .insert([{
              id: leadId,
              name: body.fullName,
              phone: body.phone,
              goal: `${body.primaryGoal} (${body.targetTimeframe})`,
              injuries: body.jointInjuries || [],
              medical_notes: body.medicalConditions || "",
              subscription_status: "trial",
              created_at: new Date().toISOString(),
            }]);
          if (error) {
            console.warn("Client intake DB notice:", error.message);
          }
        }, false, leadId);
      } catch (dbErr) {
        console.warn("Client intake saved to audit fallback:", dbErr);
      }
    }

    // 2. Log Audit Trail
    await logAudit({
      actorId: leadId,
      actorRole: "client",
      action: "athlete.intake_quiz_completed",
      resourceType: "client",
      resourceId: leadId,
      metadata: {
        goal: body.primaryGoal,
        name: body.fullName,
        phone: body.phone,
        injuriesCount: body.jointInjuries?.length || 0,
      },
    });

    return NextResponse.json({
      success: true,
      leadId,
      message: "تم تسجيل استبيان التقييم بنجاح وجاري تجهيز حجز المكالمة.",
    });
  } catch (err: any) {
    console.error("Error in athlete intake submission:", err);
    return NextResponse.json(
      { error: "حدث خطأ أثناء معالجة استبيان التقييم" },
      { status: 500 }
    );
  }
}
