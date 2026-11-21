import { NextRequest, NextResponse } from "next/server";
import { 
  NASM_DEEP_KNOWLEDGE, 
  HANY_RAMBOD_DEEP_FST7_MANUAL, 
  FST7MuscleExerciseBlueprint 
} from "@/lib/scientificCoachKnowledgeDeep";

interface AdvancedProgramRequest {
  clientName: string;
  age?: number;
  weightKg?: number;
  heightCm?: number;
  trainingExperience: "beginner" | "intermediate" | "advanced";
  primaryGoal: "hypertrophy" | "fat_loss" | "strength" | "power" | "rehab_posture";
  daysPerWeek: number; // 3, 4, 5, or 6
  kineticChainSyndrome?: "Upper Crossed Syndrome (متلازمة التقاطع العلوي)" | "Lower Crossed Syndrome (متلازمة التقاطع السفلي)" | "Pronation Distortion Syndrome (متلازمة تشوه الكب للقدم والركبة)";
  specialFocus?: "Chest" | "Back" | "Legs" | "Shoulders" | "Arms" | "Balanced";
}

export async function POST(req: NextRequest) {
  try {
    const body: AdvancedProgramRequest = await req.json();
    const {
      clientName = "البطل الرياضي",
      weightKg = 80,
      trainingExperience = "intermediate",
      primaryGoal = "hypertrophy",
      daysPerWeek = 5,
      kineticChainSyndrome = "Upper Crossed Syndrome (متلازمة التقاطع العلوي)",
      specialFocus = "Balanced"
    } = body;

    // 1. Determine Exact NASM OPT Phase
    let optPhase = NASM_DEEP_KNOWLEDGE.optModelPhases[2]; // Phase 3 Hypertrophy default
    if (trainingExperience === "beginner" || primaryGoal === "rehab_posture") {
      optPhase = NASM_DEEP_KNOWLEDGE.optModelPhases[0]; // Phase 1 Stabilization Endurance
    } else if (primaryGoal === "fat_loss" && trainingExperience !== "advanced") {
      optPhase = NASM_DEEP_KNOWLEDGE.optModelPhases[1]; // Phase 2 Strength Endurance
    } else if (primaryGoal === "strength") {
      optPhase = NASM_DEEP_KNOWLEDGE.optModelPhases[3]; // Phase 4 Max Strength
    } else if (primaryGoal === "power") {
      optPhase = NASM_DEEP_KNOWLEDGE.optModelPhases[4]; // Phase 5 Power
    }

    // 2. Extract Full NASM 4-Step Corrective Exercise Continuum (CEx) for the Chosen Syndrome
    const posturalData = (NASM_DEEP_KNOWLEDGE.posturalSyndromes as any)[kineticChainSyndrome] || 
      NASM_DEEP_KNOWLEDGE.posturalSyndromes["Upper Crossed Syndrome (متلازمة التقاطع العلوي)"];

    // 3. Assemble Days using Hany Rambod's Elite Muscle Blueprints
    const blueprints = HANY_RAMBOD_DEEP_FST7_MANUAL.muscleBlueprints;
    const chestBP = blueprints.find(b => b.muscleGroup === "Chest")!;
    const backBP = blueprints.find(b => b.muscleGroup === "Back")!;
    const legsBP = blueprints.find(b => b.muscleGroup === "Legs")!;
    const shouldersBP = blueprints.find(b => b.muscleGroup === "Shoulders")!;
    const armsBP = blueprints.find(b => b.muscleGroup === "Arms")!;

    const weeklyDaysPlan = [];

    // Format Day helper
    const buildDay = (title: string, bp: FST7MuscleExerciseBlueprint, extraExercises: any[] = []) => {
      return {
        dayTitle: title,
        olympiaChampionsInspiration: bp.olympiaChampionsShowcase,
        warmupAndCExProtocol: {
          step1_Inhibit: posturalData.inhibitProtocol,
          step2_Lengthen: posturalData.lengthenProtocol,
          step3_Activate: posturalData.activateProtocol,
          step4_Integrate: posturalData.integrateProtocol
        },
        exercises: [
          ...bp.primaryCompoundExercises.map((c) => ({
            name: c.name,
            type: "Compound Heavy Strength (بناء الكثافة)",
            sets: c.sets,
            reps: c.reps,
            tempo: optPhase.tempo,
            rir: c.rir,
            rest: c.rest,
            executionCue: c.executionCue
          })),
          ...extraExercises,
          {
            name: bp.fst7Finisher.exerciseName,
            type: "FST-7 Fascia Stretch Finisher (مجموعة السيفن الختامية)",
            sets: bp.fst7Finisher.sets,
            reps: bp.fst7Finisher.reps,
            tempo: "2-1-2 (عصر كامل بالقمة)",
            rir: 0,
            rest: `${bp.fst7Finisher.restSeconds}s (صارمة)`,
            whyThisExercise: bp.fst7Finisher.whyThisExercise,
            interSet30SecondsAction: bp.fst7Finisher.interSetProtocol,
            lastSetsIntensityTechnique: bp.fst7Finisher.intensityTechniqueLastSets,
            executionCue: `★ بروتوكول هاني رامبود: راحة ${bp.fst7Finisher.restSeconds} ثانية فقط. ارتشاف ماء + شد إيزومتري 10 ثوانٍ بين كل جولة.`
          }
        ]
      };
    };

    if (daysPerWeek >= 5) {
      // 5-Day Classic Olympia FST-7 Split
      weeklyDaysPlan.push(
        buildDay("اليوم الأول: الصدر والتكثيف العلوي (Chest Expansion & Upper Clavicular) + FST-7", chestBP),
        buildDay("اليوم الثاني: الظهر وعرض المجنص والكثافة (Back Width & Lat Thickness) + FST-7", backBP),
        buildDay("اليوم الثالث: الذراعين - البايسبس والترايسبس (Guns & Horseshoe Triceps) + FST-7", armsBP),
        buildDay("اليوم الرابع: الأكتاف ثلاثية الأبعاد والترابيس (3D Boulder Delts) + FST-7", shouldersBP),
        buildDay("اليوم الخامس: الأرجل والفخذ الرباعي والخلفيات (Wheels & Calves) + FST-7", legsBP)
      );
    } else {
      // 4-Day Push / Pull / Legs / Upper FST-7 Split
      weeklyDaysPlan.push(
        buildDay("اليوم الأول: دفع الصدر والترايسبس (Push Day A) + FST-7", chestBP, [
          {
            name: "Cable Rope Triceps Pushdown",
            type: "Secondary Compound",
            sets: 3,
            reps: "10-12",
            tempo: "2-0-2",
            rir: 1,
            rest: "60s",
            executionCue: "فتح الحبل في الأسفل لعصر الرأس الخارجي للترايسبس."
          }
        ]),
        buildDay("اليوم الثاني: سحب الظهر والبايسبس (Pull Day A) + FST-7", backBP, [
          {
            name: "EZ-Bar Standing Biceps Curl",
            type: "Secondary Compound",
            sets: 3,
            reps: "10-12",
            tempo: "2-0-2",
            rir: 1,
            rest: "60s",
            executionCue: "تثبيت الكوعين بجانب الجذع وعصر قمة البايسبس."
          }
        ]),
        buildDay("اليوم الثالث: الأرجل والسمانة (Legs & Calves) + FST-7", legsBP),
        buildDay("اليوم الرابع: الأكتاف والترابيس والبطن (Shoulders & Core) + FST-7", shouldersBP)
      );
    }

    // 4. Construct Full Scientific Report & Nutritional Blueprint
    const estimatedDailyWaterLiters = (weightKg * 0.045).toFixed(1);
    const estimatedProteinGrams = primaryGoal === "fat_loss" 
      ? Math.round(weightKg * 2.4) 
      : Math.round(weightKg * 2.0);

    const fullScientificReport = {
      clientOverview: {
        name: clientName,
        weightKg,
        primaryGoal,
        trainingExperience,
        daysPerWeek,
        generatedAt: new Date().toISOString()
      },
      nasmScientificFramework: {
        optPhaseName: optPhase.nameAr,
        optPhaseLevel: optPhase.level,
        tempoCode: optPhase.tempo,
        targetIntensity: optPhase.intensity,
        restIntervals: optPhase.restSeconds,
        progressionRule: optPhase.progressionRule,
        kineticChainAssessment: {
          syndromeIdentified: kineticChainSyndrome,
          clinicalDescription: posturalData.description,
          ohsaKeyFinding: posturalData.assessmentKey,
          correctiveExerciseContinuum4Steps: {
            step1_Inhibit_SMR: posturalData.inhibitProtocol,
            step2_Lengthen_Static: posturalData.lengthenProtocol,
            step3_Activate_Isolated: posturalData.activateProtocol,
            step4_Integrate_Dynamic: posturalData.integrateProtocol
          }
        }
      },
      hanyRambodFST7MasterManual: {
        philosophy: HANY_RAMBOD_DEEP_FST7_MANUAL.corePhysiologicalMechanism,
        olympiaTitlesLegacy: HANY_RAMBOD_DEEP_FST7_MANUAL.olympiaTitlesCount,
        hydrationMandate: HANY_RAMBOD_DEEP_FST7_MANUAL.hydrationAndSodiumMandate,
        thirtySecondsProtocol: HANY_RAMBOD_DEEP_FST7_MANUAL.intraSet30SecondsProtocol,
        goldenRules: HANY_RAMBOD_DEEP_FST7_MANUAL.rulesOfExecution
      },
      nutritionCNCPrecision: {
        dailyProteinTarget: `${estimatedProteinGrams} جرام بروتين نقي يومياً (${primaryGoal === 'fat_loss' ? '2.4' : '2.0'} جم/كجم)`,
        leucineRequirement: NASM_DEEP_KNOWLEDGE.nutritionScienceCNC.proteinMetabolism.leucineThreshold,
        dailyHydrationTarget: `${estimatedDailyWaterLiters} إلى 5 لتر ماء نقي يومياً + 750 مل أثناء حصة التمرين`,
        intraWorkoutStrategy: "شرب ماء ممزوج بـ 10 جرام EAA/BCAAs مع ربع ملعقة ملح صخري (صوديوم) لتعزيز تدفق الدم ومنع الشد العضلي أثناء مجموعات الـ 7 الختامية.",
        periWorkoutTiming: "وجبة قبل التمرين بساعتين (أرز بسمتي + صدور دجاج وقليل الدهون) + وجبة بعد التمرين مباشرة غنية بالجليكوجين سريع الهضم وبروتين معزول (Whey Isolate)."
      },
      weeklySchedule: weeklyDaysPlan,
      coachExecutiveReportMarkdown: `### 📋 تقرير الإعداد الفني للرياضي (${clientName})
* **الإطار الأكاديمي:** NASM OPT Model (${optPhase.nameAr})
* **نظام البناء المتقدم:** Hany Rambod FST-7 Olympia Blueprint
* **التصحيح الحركي:** ${kineticChainSyndrome} وفق بروتوكول CEx الرباعي (Inhibit, Lengthen, Activate, Integrate).
* **إرشادات الإيقاع (Tempo):** (${optPhase.tempo}) لضبط التوتر الميكانيكي المستمر (TUT).
* **احتياج التغذية المبرمج:** ${estimatedProteinGrams} جم بروتين، و ${estimatedDailyWaterLiters} لتر ماء يومياً.`
    };

    return NextResponse.json({
      success: true,
      program: fullScientificReport
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
