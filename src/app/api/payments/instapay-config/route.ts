import { NextRequest, NextResponse } from "next/server";

// In-memory store for InstaPay & wallet configuration (can be backed by Supabase/DB)
let instapayConfig = {
  instapayUsername: "coach.alex@instapay",
  instapayPhone: "01012345678",
  accountHolderName: "كابتن أحمد علي - CoachPR",
  vodafoneCash: "01012345678",
  activeBank: "البنك الأهلي المصري (NBE)",
  notes: "يرجى كتابة اسم المتدرب أو كود الاشتراك في خانة الملاحظات أثناء التحويل لتفعيل الحساب فوراً."
};

export async function GET() {
  return NextResponse.json({
    success: true,
    config: instapayConfig
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    instapayConfig = {
      instapayUsername: body.instapayUsername || instapayConfig.instapayUsername,
      instapayPhone: body.instapayPhone || instapayConfig.instapayPhone,
      accountHolderName: body.accountHolderName || instapayConfig.accountHolderName,
      vodafoneCash: body.vodafoneCash || instapayConfig.vodafoneCash,
      activeBank: body.activeBank || instapayConfig.activeBank,
      notes: body.notes || instapayConfig.notes
    };

    return NextResponse.json({
      success: true,
      message: "تم تحديث بيانات استقبال إنستاباي بنجاح!",
      config: instapayConfig
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
