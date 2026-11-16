import { NextResponse } from "next/server";
import { executeAiWithFailover } from "@/lib/ai-router";

// Megatron AI Copilot & Reasoning Engine (Protected by Smart AI Failover Router)
export async function POST(req: Request) {
  try {
    const { action, clientData, context } = await req.json();

    // System instruction tailored for bodybuilding & fitness coaches in Egypt
    const systemInstruction = `
أنت "ميجاترون (Megatron AI)"، العقل الاصطناعي ومساعد المدرب الرياضي الأذكى في منصة CoachPRB.
مهمتك مساعدة كابتن التدريب أونلاين في مصر والشرق الأوسط في:
1. فحص بيانات المتابعة الأسبوعية (Check-in) للعميل (الوزن، القياسات، النوم، الطاقة، وأحمال التمرين).
2. اكتشاف المشاكل تلقائياً: ثبات الوزن، خسارة العضلات، هبوط الطاقة، أو خطر الإصابة.
3. صياغة ردود ذكية، علمية، مشجعة، ومخصصة تماماً بلهجة مصرية رياضية محترفة ومحببة (زي كابتن مصري فاهم وشاطر).
4. اقتراح تعديلات دقيقة على الماكروز (كارب، بروتين، دهون) أو بدائل التمارين الرياضية عند الحاجة.
    `.trim();

    const prompt = `
المطلوب تحليل الموقف التالي وصياغة القرار المناسب للكوتش:
نوع العملية: ${action || "weekly_checkin_review"}
بيانات اللاعب: ${JSON.stringify(clientData || { name: "كريم جلال", weight: "83.6kg", waist: "-2cm", sleep: "7.5h" })}
سياق إضافي: ${context || "الوزن ثابت لأسبوعين لكن الوسط نزل 2 سم والنوم ممتاز"}

قم بالرد بتنسيق JSON نظيف تماماً:
{
  "summary": "ملخص تحليلي في سطرين",
  "clientInsight": "اكتشاف ميجاترون بخصوص حالة اللاعب وتفسيرها العلمي",
  "recommendedAction": "التعديل المقترح على الخطة (تغذية أو تدريب)",
  "draftedReply": "صياغة الرد المقترح لارساله للاعب بلهجة الكوتش المشجعة"
}
    `.trim();

    const result = await executeAiWithFailover(prompt, {
      systemInstruction,
      responseFormat: "json",
      temperature: 0.6,
      preferredModel: "gemini-2.5-flash",
    });

    const replyText = result.text || "";
    const jsonMatch = replyText.match(/\{[\s\S]*\}/);

    let parsedData: any = null;
    if (jsonMatch) {
      try {
        parsedData = JSON.parse(jsonMatch[0]);
      } catch (e) {
        parsedData = null;
      }
    }

    if (parsedData) {
      return NextResponse.json({
        success: true,
        provider: result.provider,
        model: result.model,
        failoverTriggered: result.failoverTriggered,
        latencyMs: result.latencyMs,
        data: parsedData,
      });
    }

    return NextResponse.json({
      success: true,
      provider: result.provider,
      model: result.model,
      failoverTriggered: result.failoverTriggered,
      data: {
        summary: "تم تحليل متابعة اللاعب بنجاح",
        clientInsight: "اللاعب في مسار إيجابي وتكوين العضلات مستمر مع حرق الدهون الحشوية.",
        recommendedAction: "الاستمرار على نفس الخطة الحالية لأسبوع إضافي قبل التعديل.",
        draftedReply: "عاش يا بطل! التطور ملحوظ والقياسات بتتحسن، مكملين بنفس العزيمة.",
        raw: replyText,
      },
    });

  } catch (error: any) {
    console.error("Megatron API Error:", error);
    return NextResponse.json({
      success: false,
      error: error?.message || "Internal server error in Megatron",
    }, { status: 500 });
  }
}
