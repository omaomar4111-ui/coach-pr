import { NextResponse } from "next/server";
import { executeAiWithFailover } from "@/lib/ai-router";

/**
 * Autonomous Plan Periodization & Generator Engine Powered by Smart AI Router
 * Uses Gemini 4 Argon with automatic failover (FreeLLMAPI architecture)
 */
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

    const systemInstruction = `
أنت "كبير مدربي كمال الأجسام والفسيولوجيا الرياضية" في منصة CoachPRB، مدعوم بأحدث أبحاث التحمل العضلي وتفادي الإصابات (Hypertrophy, RIR/RPE, Periodization).
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
          "injuryRisk": "آمن لمفاصل الكتف مع تثبيت لوحي الكتف"
        }
      ]
    }
  ]
}
    `.trim();

    const aiResult = await executeAiWithFailover(prompt, {
      systemInstruction,
      responseFormat: "json",
      preferredModel: "gemini-2.5-flash",
    });

    let planData: any = {};
    try {
      planData = JSON.parse(aiResult.text);
    } catch {
      // Clean markdown code blocks if wrapped
      const cleanJson = aiResult.text.replace(/```json/g, "").replace(/```/g, "").trim();
      planData = JSON.parse(cleanJson);
    }

    return NextResponse.json({
      success: true,
      meta: {
        provider: aiResult.provider,
        model: aiResult.model,
        latencyMs: aiResult.latencyMs,
        failoverTriggered: aiResult.failoverTriggered,
      },
      plan: planData,
    });
  } catch (error: any) {
    console.error("Plan generator route error:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate autonomous plan",
    }, { status: 500 });
  }
}
