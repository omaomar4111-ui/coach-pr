import { NextRequest, NextResponse } from "next/server";
import { NASM_KNOWLEDGE_BASE, HANY_RAMBOD_FST7_KNOWLEDGE_BASE } from "@/lib/scientificCoachKnowledge";

interface TraineeProfile {
  clientName: string;
  age?: number;
  gender?: "male" | "female";
  trainingExperience: "beginner" | "intermediate" | "advanced";
  primaryGoal: "hypertrophy" | "fat_loss" | "strength" | "rehab_posture";
  daysPerWeek: number; // 3, 4, 5, or 6
  focusMuscle?: string;
  posturalIssues?: string[]; // e.g. "Forward Head & Rounded Shoulders", "Anterior Pelvic Tilt"
  methodology: "FST7_HanyRambod" | "NASM_OPT" | "Hybrid_Science_Pro";
}

export async function POST(req: NextRequest) {
  try {
    const body: TraineeProfile = await req.json();
    const {
      clientName = "متدرب جديد",
      trainingExperience = "intermediate",
      primaryGoal = "hypertrophy",
      daysPerWeek = 4,
      focusMuscle = "الصدر والظهر",
      posturalIssues = [],
      methodology = "Hybrid_Science_Pro"
    } = body;

    // 1. Select NASM Phase
    let selectedPhase = NASM_KNOWLEDGE_BASE.optModelPhases[2]; // Default: Phase 3 Hypertrophy
    if (trainingExperience === "beginner" || primaryGoal === "rehab_posture") {
      selectedPhase = NASM_KNOWLEDGE_BASE.optModelPhases[0]; // Phase 1 Stabilization
    } else if (primaryGoal === "fat_loss" && trainingExperience !== "advanced") {
      selectedPhase = NASM_KNOWLEDGE_BASE.optModelPhases[1]; // Phase 2 Strength Endurance
    } else if (primaryGoal === "strength") {
      selectedPhase = NASM_KNOWLEDGE_BASE.optModelPhases[3]; // Phase 4 Max Strength
    }

    // 2. Select Relevant Postural Fixes (CES)
    const postureFixes = posturalIssues.map((issue) => {
      const fix = (NASM_KNOWLEDGE_BASE.cesCorrectiveRules as any)[issue];
      return {
        issue,
        musclesOveractive: fix ? fix.muscleOveractive : [],
        musclesUnderactive: fix ? fix.muscleUnderactive : [],
        recommendedWarmupProtocol: fix ? fix.solution : "إحماء مفصلي ديناميكي 5-7 دقائق + تفعيل الكور"
      };
    });

    // 3. Assemble Days Split & Exercises integrating FST-7
    const splitDays = [];
    
    if (daysPerWeek === 4) {
      splitDays.push(
        {
          dayTitle: "اليوم الأول: الصدر والترايسبس (Chest & Triceps + FST-7)",
          warmup: postureFixes.length > 0 ? postureFixes[0].recommendedWarmupProtocol : "إحماء ديناميكي للروتيتور كف والصدر بالفوم رولر 5 دقائق",
          exercises: [
            {
              name: "Incline Dumbbell Press (تجميع علوي دمبلز)",
              sets: 4,
              reps: "8-10",
              tempo: selectedPhase.tempo,
              rest: "90s",
              notes: "التركيز على النزول المتحكم بزاوية 30 درجة لتفعيل ألياف الصدر العلوية (Clavicular Head)"
            },
            {
              name: "Flat Barbell Bench Press (بنش بريس بار مستوي)",
              sets: 3,
              reps: "8-10",
              tempo: "2-0-1",
              rest: "90s",
              notes: "تثبيت لوحي الكتف Retracted & Depressed لعزل الصدر ومنع ضغط المفصل"
            },
            {
              name: "Dips / Machine Chest Press (غطس أو جهاز دفع الصدر)",
              sets: 3,
              reps: "10-12",
              tempo: "2-1-2",
              rest: "60s",
              notes: "عصر العضلة مع ميل الجذع للأمام قليلاً"
            },
            {
              name: "FST-7 Cable Crossover Finisher (سيفن كابل كروس أوفر - هاني رامبود)",
              sets: 7,
              reps: "10-12",
              tempo: "2-1-2",
              rest: "35s",
              notes: "★ هاني رامبود FST-7: راحة 35 ثانية فقط، عصر العضلة والشَّد الإيزومتري (Iso-Tension) لمدة 10 ثوانٍ في فترة الراحة وشرب رشفة ماء بين كل جولة."
            },
            {
              name: "FST-7 Rope Tricep Pushdown (سيفن ترايسبس بالحبل)",
              sets: 7,
              reps: "10-12",
              tempo: "2-0-2",
              rest: "30s",
              notes: "فتح الحبل في الأسفل لعصر الرأس الخارجي والطويل للترايسبس."
            }
          ]
        },
        {
          dayTitle: "اليوم الثاني: الظهر والبايسبس (Back Width & Biceps + FST-7)",
          warmup: "إطالة اللاتس وتفعيل عضلات Rhomboids عبر Band Pull-Aparts",
          exercises: [
            {
              name: "Lat Pulldown Wide Grip (سحب عريض للجهاز)",
              sets: 4,
              reps: "8-10",
              tempo: "2-1-2",
              rest: "90s",
              notes: "سحب الكوعين نحو الحوض لتفعيل أسفل اللاتس والابتعاد عن الشد بالذراع"
            },
            {
              name: "Barbell Bent-Over Row (سحب بار حر مقلوب)",
              sets: 4,
              reps: "6-8",
              tempo: "2-0-1",
              rest: "90s",
              notes: "الحفاظ على ثبات الحوض والعمود الفقري المحايد (NASM Kinetic Chain)"
            },
            {
              name: "Seated Cable Row Close-Grip (سحب أرضي قبضة ضيقة)",
              sets: 3,
              reps: "10-12",
              tempo: "2-1-2",
              rest: "60s",
              notes: "فرد اللوحين في الأمام وتجميعهما بالخلف لعصر منتصف الظهر"
            },
            {
              name: "FST-7 Straight-Arm Rope Cable Pulldown (سيفن سحب ذراع مفرود)",
              sets: 7,
              reps: "10-12",
              tempo: "2-1-2",
              rest: "40s",
              notes: "★ هاني رامبود FST-7: إمساك قائم الكيبل وتمديد عريضة الظهر (Lat Spread Stretch) 10 ثوانٍ في فترة الراحة لتمديد اللفافة العضلية."
            },
            {
              name: "FST-7 EZ-Bar Cable Preacher Curl (سيفن بايسبس لاري سكوت)",
              sets: 7,
              reps: "10-12",
              tempo: "2-0-2",
              rest: "30s",
              notes: "عصر البايسبس في القمة مع عصر متواصل لقبضة اليد."
            }
          ]
        },
        {
          dayTitle: "اليوم الثالث: راحة استشفاء وتغذية (Active Recovery & Mobility)",
          warmup: "فوم رولر لكامل الجسم 15 دقيقة + مشي 30 دقيقة على معدة مرتاحة",
          exercises: [
            {
              name: "Foam Rolling SMR (تدليك ذاتي بالأفلات)",
              sets: 1,
              reps: "10 دقائق",
              tempo: "بطيء",
              rest: "-",
              notes: "التركيز على عضلة السمانة، الفخذ الخارجي TFL، وأعلى الظهر"
            },
            {
              name: "Core Stabilization - Plank & Bird Dog",
              sets: 3,
              reps: "45 ثانية ثبات",
              tempo: "إيزومتري",
              rest: "45s",
              notes: "تفعيل البطن العميقة Transverse Abdominis حسب كود NASM"
            }
          ]
        },
        {
          dayTitle: "اليوم الرابع: الأرجل والسمانة (Wheels & Calves + FST-7)",
          warmup: "إحماء الهيب فليكسورز والجلوتس بريدج بـ Mini-Band",
          exercises: [
            {
              name: "Barbell Back Squat (اسكوات بار حر)",
              sets: 4,
              reps: "8-10",
              tempo: "3-1-1",
              rest: "120s",
              notes: "نزول موازي تحت مفصل الركبة مع فتح الركبتين للخارج منعاً للـ Knee Valgus"
            },
            {
              name: "Romanian Deadlift (ديدليفت روماني للهامسترينج)",
              sets: 4,
              reps: "8-10",
              tempo: "3-0-1",
              rest: "90s",
              notes: "دفع الحوض للخلف والحفاظ على استقامة الظهر حتى أقصى شد في الفخذ الخلفي"
            },
            {
              name: "Leg Press (دفع رجل على الجهاز)",
              sets: 3,
              reps: "10-12",
              tempo: "2-0-2",
              rest: "90s",
              notes: "قدمان في المنتصف بزاوية عرض الأكتاف"
            },
            {
              name: "FST-7 Leg Extension (سيفن رفرفة رجل أمامي)",
              sets: 7,
              reps: "12-15",
              tempo: "2-1-2",
              rest: "45s",
              notes: "★ هاني رامبود FST-7: تمديد الفاشيا بالوقوف وشد الكعب للمؤخرة بين الجولات لضخ أقصى كمية دم في الكوادز."
            },
            {
              name: "Standing Calf Raises (سمانة واقف)",
              sets: 4,
              reps: "15-20",
              tempo: "2-2-1",
              rest: "45s",
              notes: "ثانيتان ثبات كامل في أسفل التمدد وثانية ثبات في قمة الانقباض"
            }
          ]
        },
        {
          dayTitle: "اليوم الخامس: الأكتاف والترابيس والبطن (3D Boulder Delts + FST-7)",
          warmup: "Face Pulls خفيف بالحبل + حركات دوران الكتف 5 دقائق",
          exercises: [
            {
              name: "Seated Dumbbell Shoulder Press (ضغط كتف بالدمبلز جالس)",
              sets: 4,
              reps: "8-10",
              tempo: "2-0-1",
              rest: "90s",
              notes: "عدم إغلاق مفصل الكوع بالكامل بالقمة للإبقاء على التوتر المستمر في العضلة"
            },
            {
              name: "Bent-Over Rear Delt Cable Flye (رفرفة كتف خلفي بالكيبل)",
              sets: 4,
              reps: "12-15",
              tempo: "2-1-2",
              rest: "60s",
              notes: "التركيز على الرأس الخلفي للأكتاف لتحقيق التوازن مع الصدر"
            },
            {
              name: "FST-7 Standing Dumbbell Lateral Raises (سيفن رفرفة جانبي دمبلز)",
              sets: 7,
              reps: "12-15",
              tempo: "2-0-2",
              rest: "30s",
              notes: "★ هاني رامبود FST-7: راحة 30 ثانية صارمة، مع ثبات إيزومتري جانبي بالذراعين لعصر الرأس الأوسط للكتف."
            },
            {
              name: "Cable Woodchoppers & Hanging Leg Raises (بطن وجوانب)",
              sets: 3,
              reps: "15",
              tempo: "2-1-2",
              rest: "45s",
              notes: "تحكم كامل بدون أرجحة"
            }
          ]
        }
      );
    } else {
      // 3 or 5 days fallback template structured around Push / Pull / Legs
      splitDays.push(
        {
          dayTitle: "اليوم الأول: دفع (Push - الصدر، الكتف الأمامي والجانبي، الترايسبس) + FST-7",
          warmup: "إحماء مفاصل وتفعيل الروتيتور كف 5 دقائق",
          exercises: [
            { name: "Incline Barbell Bench Press", sets: 4, reps: "8-10", tempo: "2-1-1", rest: "90s", notes: "التركيز على الصدر العلوي" },
            { name: "Flat Dumbbell Press", sets: 3, reps: "8-10", tempo: "2-0-1", rest: "90s", notes: "مدى حركي كامل" },
            { name: "Overhead Dumbbell Press", sets: 3, reps: "10-12", tempo: "2-0-2", rest: "60s", notes: "أكتاف أمامية وجانبية" },
            { name: "FST-7 Cable Flyes (هاني رامبود)", sets: 7, reps: "10-12", tempo: "2-1-2", rest: "35s", notes: "عصر العضلة 10 ثوانٍ في الراحة" },
            { name: "FST-7 Cable Triceps Pushdown", sets: 7, reps: "10-12", tempo: "2-0-2", rest: "30s", notes: "حبس الدم وعصر الترايسبس" }
          ]
        },
        {
          dayTitle: "اليوم الثاني: سحب (Pull - الظهر، المجنص، الكتف الخلفي، البايسبس) + FST-7",
          warmup: "إطالات ديناميكية وسحب باند خفيف",
          exercises: [
            { name: "Deadlift / Rack Pulls", sets: 3, reps: "6-8", tempo: "2-1-1", rest: "120s", notes: "كثافة الظهر والعمود الفقري" },
            { name: "Lat Pulldown Wide Grip", sets: 4, reps: "8-10", tempo: "2-1-2", rest: "90s", notes: "عرض الظهر والمجنص" },
            { name: "Seated Cable Row", sets: 3, reps: "10-12", tempo: "2-1-2", rest: "60s", notes: "سمك منتصف الظهر" },
            { name: "FST-7 Rope Straight-Arm Pulldown (هاني رامبود)", sets: 7, reps: "10-12", tempo: "2-1-2", rest: "40s", notes: "إطالة الفاشيا Lat Spread Stretch" },
            { name: "FST-7 Cable Bicep Curl", sets: 7, reps: "10-12", tempo: "2-0-2", rest: "30s", notes: "بمب دموي أقصى للبايسبس" }
          ]
        },
        {
          dayTitle: "اليوم الثالث: أرجل وبطن (Legs & Core Wheels) + FST-7",
          warmup: "إحماء الركبة والحوض 7 دقائق",
          exercises: [
            { name: "Barbell Squats", sets: 4, reps: "8-10", tempo: "3-1-1", rest: "120s", notes: "عمق موازي متزن" },
            { name: "Romanian Deadlift", sets: 4, reps: "8-10", tempo: "3-0-1", rest: "90s", notes: "إطالة الفخذ الخلفي" },
            { name: "Leg Press", sets: 3, reps: "10-12", tempo: "2-0-2", rest: "90s", notes: "دفع متزن" },
            { name: "FST-7 Leg Extension / Curl (هاني رامبود)", sets: 7, reps: "12-15", tempo: "2-1-2", rest: "45s", notes: "إطالة الكوادز والهامسترينج في الراحة" },
            { name: "Hanging Leg Raises & Plank", sets: 3, reps: "15-20", tempo: "2-1-2", rest: "45s", notes: "تثبيت الكور والعمود الفقري" }
          ]
        }
      );
    }

    // 4. Construct Full Scientific Report for the Coach
    const generatedProgram = {
      clientName,
      generatedAt: new Date().toISOString(),
      metadata: {
        scientificFramework: "NASM OPT™ (Optimum Performance Training) + Hany Rambod FST-7 Olympia Elite System",
        optPhase: selectedPhase.phaseName,
        tempoNotation: selectedPhase.tempo,
        restInterval: selectedPhase.restInterval,
        methodologyUsed: methodology,
        postureAssessment: postureFixes
      },
      nutritionGuidelines: {
        proteinRecommendation: primaryGoal === "fat_loss" 
          ? NASM_KNOWLEDGE_BASE.nutritionCNC.proteinGramsPerKg.cutting 
          : NASM_KNOWLEDGE_BASE.nutritionCNC.proteinGramsPerKg.bulking,
        hydrationFormula: NASM_KNOWLEDGE_BASE.nutritionCNC.hydrationRules,
        periWorkoutTiming: NASM_KNOWLEDGE_BASE.nutritionCNC.periWorkoutNutrientTiming,
        electrolyteStrategy: "إضافة 1 جرام ملح هيمالايا أو صوديوم للتر ماء أثناء تمرين FST-7 لضمان أقصى حجم وضخ دموي بالخلايا."
      },
      hanyRambodFST7Rules: HANY_RAMBOD_FST7_KNOWLEDGE_BASE.goldenRules,
      weeklySplit: splitDays,
      coachExecutiveSummary: `تم إنشاء هذا البرنامج التدريبي خصيصاً للمتدرب (${clientName}) بناءً على معايير أكاديمية NASM الدولية في تصحيح التوازن الحركي والقوة العضلية، مع دمج بروتوكول FST-7 الختامي للمدرب العالمي هاني رامبود لتوسيع اللفافة العضلية وتحفيز أقصى ضخ دموي وبناء عضلي في أقل فترة زمنية ممكنة.`
    };

    return NextResponse.json({
      success: true,
      program: generatedProgram
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
