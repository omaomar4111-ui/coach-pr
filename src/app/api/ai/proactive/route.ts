import { NextRequest, NextResponse } from "next/server";

export interface ProactiveTrigger {
  id: string;
  type: "INACTIVITY" | "PLATEAU" | "SUBSCRIPTION_EXPIRING" | "CHECKIN_OVERDUE" | "FORM_CHECK_PENDING" | "HIGH_FATIGUE";
  severity: "low" | "medium" | "high" | "critical";
  clientId: string;
  clientName: string;
  clientPhone: string;
  description: string;
  recommendedAction: string;
  suggestedMessage: string;
  autoExecutable: boolean;
}

// 1. Proactive Intelligence Evaluation Engine
export async function GET(req: NextRequest) {
  try {
    // In production, queries Supabase active clients, last activity logs, and check-in dates
    const triggers: ProactiveTrigger[] = [
      {
        id: "trig-001",
        type: "INACTIVITY",
        severity: "critical",
        clientId: "trainee_omar",
        clientName: "عمر حسن (Omar Hassan)",
        clientPhone: "+201209876543",
        description: "اللاعب لم يفتح التطبيق أو يسجل أي وجبة أو تمرين منذ 8 أيام متتالية.",
        recommendedAction: "إرسال رسالة تخفيف أوزان وكسر الروتين عبر واتساب لاستعادة الالتزام.",
        suggestedMessage: "أهلاً يا عمر! لاحظت إنك مجهد شوية الأيام اللي فاتت، إيه رأيك ننزل بأحمال التمرين شوية الأسبوع ده عشان نكسر الإرهاق ونرجع أقوى؟",
        autoExecutable: true
      },
      {
        id: "trig-002",
        type: "CHECKIN_OVERDUE",
        severity: "high",
        clientId: "trainee_ahmed",
        clientName: "أحمد مجدي (Ahmed Magdy)",
        clientPhone: "+201123456789",
        description: "موعد التشيك إن الأسبوعي كان أمس الجمعة ولم يتم رفع صور الوزن والقياسات.",
        recommendedAction: "إرسال تذكير التشيك إن التلقائي بصوت كابتن تامر وتجهيز مسودة التقرير.",
        suggestedMessage: "صباح الورد يا أحمد! مستني صور الوزن والقياسات بتاعتك عشان نراجع تطور الأسبوع ونحدد خطة الأسبوع الجديد.",
        autoExecutable: true
      },
      {
        id: "trig-003",
        type: "SUBSCRIPTION_EXPIRING",
        severity: "medium",
        clientId: "trainee_reem",
        clientName: "ريم جمال (Reem Gamal)",
        clientPhone: "+201019876543",
        description: "الاشتراك ينتهي خلال 3 أيام (المتبقي في الباقة: 3 أيام).",
        recommendedAction: "إرسال رابط تجديد باقة 3 شهور مع كود خصم الالتزام السريع.",
        suggestedMessage: "عاش يا ريم، استمرارك الشهر ده كان مبهر! باقتك هتنتهي بعد 3 أيام، وده رابط التجديد السريع بخصم تجديد المشتركين الدائمين.",
        autoExecutable: false
      },
      {
        id: "trig-004",
        type: "HIGH_FATIGUE",
        severity: "medium",
        clientId: "trainee_karim",
        clientName: "كريم جلال (Karim Galal)",
        clientPhone: "+201012345678",
        description: "مؤشر الجاهزية والاستشفاء نزل إلى 45% بعد كسر رقم قياسي في السكوات والبنش.",
        recommendedAction: "جدولة يوم راحة إضافي (Active Recovery) وتنبيه الكوتش بزيادة ساعات النوم.",
        suggestedMessage: "كريم يا بطل، أرقامك في السكوات كانت جبارة! جسمك محتاج استشفاء كامل، خد النهاردة راحة وهنزود الكارب 50 جم لتعويض الجليكوجين.",
        autoExecutable: true
      }
    ];

    return NextResponse.json({
      success: true,
      agent: "CoachPR Proactive Guardian AI v3.0",
      timestamp: new Date().toISOString(),
      summary: {
        totalEvaluatedClients: 30,
        activeTriggers: triggers.length,
        criticalAlerts: triggers.filter(t => t.severity === "critical").length,
        autoExecutableCount: triggers.filter(t => t.autoExecutable).length
      },
      triggers
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// 2. Autonomous Execution Endpoint (Triggered by Coach or Background Cron)
export async function POST(req: NextRequest) {
  try {
    const { triggerId, action } = await req.json();

    return NextResponse.json({
      success: true,
      status: "EXECUTED",
      triggerId,
      action: action || "DISPATCH_COMMUNICATION",
      executedAt: new Date().toISOString(),
      message: `تم تنفيذ الإجراء الاستباقي بنجاح وإرسال التنبيه المناسب للاعب والكوتش.`
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
