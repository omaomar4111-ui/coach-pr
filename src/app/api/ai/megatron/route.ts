import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Megatron AI Copilot & Reasoning Engine (Powered by Gemini 4 Argon)
export async function POST(req: Request) {
  try {
    const { action, clientData, context } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: "GEMINI_API_KEY is not configured",
      }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });

    // System instruction tailored for bodybuilding & fitness coaches in Egypt
    const systemInstruction = `
أنت "ميجاترون (Megatron AI)"، العقل الاصطناعي ومساعد المدرب الرياضي الأذكى في منصة CoachPR.
مهمتك مساعدة كابتن التدريب أونلاين في مصر في:
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

قم بالرد بتنسيق JSON نظيف:
{
  "summary": "ملخص تحليلي في سطرين",
  "clientInsight": "اكتشاف ميجاترون بخصوص حالة اللاعب وتفسيرها العلمي",
  "recommendedAction": "التعديل المقترح على الخطة (تغذية أو تدريب)",
  "draftedReply": "صياغة الرد المقترح لارساله للاعب بلهجة الكوتش المشجعة"
}
    `.trim();

    try {
      // 1. Primary Engine: Gemini 4 Argon (Advanced Reasoning & Deep Knowledge)
      const response = await ai.models.generateContent({
        model: "gemini-4-argon",
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemInstruction}\n\n${prompt}` }],
          },
        ],
        config: {
          thinkingConfig: {
            thinkingBudget: 2048, // Enable thinking for reasoning
          },
        },
      });

      const replyText = response.text || "";
      const jsonMatch = replyText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return NextResponse.json({
          success: true,
          model: "gemini-4-argon",
          data: JSON.parse(jsonMatch[0]),
        });
      }

      return NextResponse.json({
        success: true,
        model: "gemini-4-argon",
        data: {
          summary: "تم تحليل متابعة اللاعب بنجاح بواسطة Gemini 4 Argon",
          raw: replyText,
        },
      });
    } catch (primaryError: any) {
      console.warn("Gemini 4 Argon rate-limited or unavailable, falling back to 3.5 Flash-Lite:", primaryError?.message);

      // 2. High-Speed Fallback: Gemini 3.5 Flash-Lite
      const fallbackResponse = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemInstruction}\n\n${prompt}` }],
          },
        ],
      });

      const replyText = fallbackResponse.text || "";
      const jsonMatch = replyText.match(/\{[\s\S]*\}/);
      return NextResponse.json({
        success: true,
        model: "gemini-3.5-flash-lite (fallback)",
        data: jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: replyText },
      });
    }

  } catch (error: any) {
    console.error("Megatron API Error:", error);
    return NextResponse.json({
      success: false,
      error: error?.message || "Internal server error in Megatron",
    }, { status: 500 });
  }
}
