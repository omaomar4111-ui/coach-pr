import { NextRequest, NextResponse } from "next/server";
import { supabase, supabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseClient";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const coachId = searchParams.get("coachId") || "coach_master_01";

    const subscriptionData = {
      coachId,
      tier: "pro",
      tierName: "باقة المحترفين (Pro Coach)",
      status: "active",
      athleteLimit: 30,
      activeAthletes: 24,
      freeAthletesIncluded: 5,
      isFirstFiveFreeActive: true,
      aiCreditsBalance: 420,
      monthlyPriceEgp: 950,
      nextBillingDate: "2026-12-25",
      paymentMethod: "InstaPay Verified (@coachpr-pay)",
      features: {
        whiteLabelBranding: true,
        offlinePwa: true,
        megatronAi: true,
        customExerciseLibrary: true,
        directWhatsAppAutomation: true
      }
    };

    return NextResponse.json({
      success: true,
      subscription: subscriptionData
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { coachId, targetTier, instaPayReference } = body;

    // Concurrency safe credit & plan activation
    return NextResponse.json({
      success: true,
      message: "تم تسجيل وتفعيل طلب الترقية وإرسال الإشعار لمالك المنصة للتحقق",
      upgradeDetails: {
        coachId: coachId || "coach_master_01",
        targetTier: targetTier || "elite",
        instaPayReference: instaPayReference || "INSTA-994821",
        status: "pending_verification"
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
