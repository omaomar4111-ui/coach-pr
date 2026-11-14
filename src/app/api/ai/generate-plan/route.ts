import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Autonomous Plan Periodization & Generator Engine Powered by Gemini 4 Argon
export async function POST(req: Request) {
  try {
    const { 
      clientName, 
      goal, 
      daysPerWeek, 
      trainingSplit, 
      experienceLevel, 
      injuries, 
      dietPreference, 
      targetCalories, 
      currentWeightKg, 
      heightCm 
    } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: "GEMINI_API_KEY is not configured",
      }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `
أنت "كبير مدربي كمال الأجسام والفسيولوجيا الرياضية" في منصة CoachPR، مدعوم بأحدث أبحاث التحمل العضلي وتفادي الإصابات (Hypertrophy, RIR/RPE, Periodization).
مهمتك تصميم جدول تدريبي وتغذوي متكامل للاعب بناءً على أهدافه وحالته الصحية.

قواعد صارمة:
1. السلامة أولاً (Biomechanics & Injuries): إذا كان لدى اللاعب أي إصابة (مثل انزلاق غضروفي قطني L4-L5 أو أوتار الكتف)، يُمنع منعاً باتاً وضع أي تمرين يسبب ضغط محوري Axial Compression مباشر، واستبدالها فوراً بتمارين مدعومة الصدر أو أجهزة الكابلات ذات المسار الآمن مع كتابة التبرير العلمي.
2. حجم التمرين والأحمال (Volume & Periodization): تقسيم التمارين بناءً على الـ Split المطلوب، وتحديد مجموعات (Sets)، عدات (Reps)، وزن تقديري، ومعدل جهد RPE و RIR وزمن راحة مدروس بالثانية.
3. التغذية والماكروز: حساب السعرات والماكروز اليومية للهدف (بروتين، كارب، دهون بالجرامات)، مع توزيع وجبات نموذجي.
4. اللهجة: احترافية رياضية مصرية واضحة ومحفزة.
    `.trim();

    const prompt = `
قم بإنشاء خطة تدريب وتغذية كاملة للبيانات التالية:
- اسم اللاعب: ${clientName || "كريم أحمد"}
- الهدف: ${goal || "بناء كتلة عضلية صافية مع حرق دهون (Recomposition)"}
- عدد أيام التمرين في الأسبوع: ${daysPerWeek || 4} أيام
- تقسيم التمرين (Split): ${trainingSplit || "Upper / Lower (علوي وسفلي)"}
- المستوى التدريبي: ${experienceLevel || "متوسط (Intermediate)"}
- الإصابات والتحذيرات الطبية: ${JSON.stringify(injuries || ["غضروف فقرات قطنية L4-L5"])}
- الوزن: ${currentWeightKg || 83} كجم | الطول: ${heightCm || 178} سم
- السعرات المستهدفة: ${targetCalories || "2350 kcal"}

أرجع النتيجة بصيغة JSON نظيفة وصالحة تماماً بهذا التنسيق حصراً:
{
  "coachSummary": "نصائح وتوجيهات الكوتش العامة للخطة وأسلوب التدرج في الأحمال",
  "safetyNotes": ["تحذير 1 لحماية الظهر أو الكتف", "تحذير 2"],
  "nutritionPlan": {
    "targetCalories": 2350,
    "proteinGrams": 180,
    "carbsGrams": 240,
    "fatsGrams": 65,
    "suggestedMeals": [
      { "mealName": "وجبة الإفطار", "items": "100 جم شوفان + 4 بيضات مسلوقة + تفاحة", "macros": "520 kcal | 35g P | 65g C | 14g F" },
      { "mealName": "وجبة الغداء (قبل التمرين)", "items": "200 جم صدور دجاج مشوية + 200 جم أرز بسمتي + خضار سوتيه", "macros": "650 kcal | 55g P | 72g C | 10g F" }
    ]
  },
  "workoutDays": [
    {
      "dayName": "اليوم الأول: علوي (Upper A)",
      "focus": "صدر وظهر وكتف وترايسبس",
      "exercises": [
        {
          "name": "Incline Dumbbell Press (تجميع دمبلز عالي)",
          "targetMuscle": "صدر علوي",
          "sets": 4,
          "reps": "8-10",
          "weightKg": "26",
          "rpe": "8.5",
          "restSec": 90,
          "tempo": "3-0-1-0",
          "safetyReason": "آمن على الكتف مع زاوية 30 درجة ومسار حر"
        }
      ]
    }
  ]
}
    `.trim();

    try {
      // 1. Primary Engine: Gemini 4 Argon
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
            thinkingBudget: 2048,
          },
        },
      });

      const replyText = response.text || "";
      const jsonMatch = replyText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return NextResponse.json({
          success: true,
          model: "gemini-4-argon",
          plan: JSON.parse(jsonMatch[0]),
        });
      }

      return NextResponse.json({
        success: true,
        model: "gemini-4-argon",
        plan: { raw: replyText },
      });
    } catch (argonErr: any) {
      console.warn("Gemini 4 Argon busy, switching to 3.5 Flash-Lite for plan generation:", argonErr?.message);

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
        plan: jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: replyText },
      });
    }

  } catch (error: any) {
    console.error("Plan Generator API Error:", error);
    return NextResponse.json({
      success: false,
      error: error?.message || "Internal plan generation error",
    }, { status: 500 });
  }
}
