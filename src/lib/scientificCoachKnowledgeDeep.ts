/**
 * CoachPR Deep Scientific Knowledge Base
 * -------------------------------------------------------------
 * Comprehensive synthesis of:
 * 1. NASM (National Academy of Sports Medicine) CPT 7th Ed, CES, PES, CNC.
 *    - 5 Kinetic Chain Checkpoints (Foot/Ankle, Knee, LPHC, Shoulders, Head/Cervical).
 *    - Full 4-Step Corrective Exercise Continuum (CEx): Inhibit (SMR), Lengthen, Activate, Integrate.
 *    - 3 Levels, 5 Phases of OPT Model with exact Tempo notation (Eccentric/Isometric/Concentric).
 *    - Certified Nutrition Coach (CNC) macronutrient partition & peri-workout guidelines.
 * 2. Hany Rambod "The Pro Creator" FST-7 Complete Manual (24 Olympia Titles).
 *    - Fascia Anatomy & Hyperemia mechanics.
 *    - 7s Finisher Protocol (8-12 reps, strict 30-45s rest).
 *    - Inter-set actions: Active Iso-Tension Flexing vs Deep Fascial Stretch.
 *    - Hydration, Sodium/Electrolyte osmotic balance & Intra-workout fueling.
 */

export interface KineticChainCheckpoint {
  checkpoint: "Foot and Ankle" | "Knee Complex" | "Lumbo-Pelvic-Hip Complex (LPHC)" | "Shoulder Girdle" | "Head and Cervical Spine";
  commonDistortions: string[];
  overactiveMuscles: string[];
  underactiveMuscles: string[];
  correctiveStrategy: {
    inhibitSMR: string[];
    lengthenStretch: string[];
    activateIsolated: string[];
    integrateMovement: string[];
  };
}

export interface DeepNASMPhase {
  phase: number;
  level: "Stabilization" | "Strength" | "Power";
  name: string;
  nameAr: string;
  focusAndPhysiology: string;
  tempo: string; // e.g. "4-2-1"
  reps: string;
  sets: string;
  intensity: string;
  restSeconds: string;
  frequencyDaysPerWeek: string;
  progressionRule: string;
}

export interface FST7MuscleExerciseBlueprint {
  muscleGroup: string;
  muscleGroupAr: string;
  olympiaChampionsShowcase: string; // e.g. "Phil Heath, Derek Lunsford, Hadi Choopan"
  primaryCompoundExercises: {
    name: string;
    sets: number;
    reps: string;
    rir: number;
    rest: string;
    executionCue: string;
  }[];
  fst7Finisher: {
    exerciseName: string;
    whyThisExercise: string; // mechanical advantage, isolated line of pull
    sets: number; // 7
    reps: string; // 8-12
    restSeconds: number; // 30-45s
    interSetProtocol: {
      seconds0to10: string; // Water sip + intra workout
      seconds10to25: string; // Static flex (Iso-Tension) or Deep Fascia Stretch
      seconds25to35: string; // Mental focus and deep diaphragmatic breathing
    };
    intensityTechniqueLastSets: string; // Partials or Forced reps on sets 6-7
  };
}

// ==========================================
// 1. NASM DEEP SCIENTIFIC KNOWLEDGE BASE
// ==========================================
export const NASM_DEEP_KNOWLEDGE: {
  kineticChainCheckpoints: KineticChainCheckpoint[];
  optModelPhases: DeepNASMPhase[];
  posturalSyndromes: Record<string, {
    description: string;
    assessmentKey: string;
    inhibitProtocol: string;
    lengthenProtocol: string;
    activateProtocol: string;
    integrateProtocol: string;
  }>;
  nutritionScienceCNC: {
    proteinMetabolism: {
      hypertrophyTarget: string;
      deficitPreservation: string;
      leucineThreshold: string;
    };
    carbohydratePeriodization: {
      highOutputDays: string;
      recoveryDays: string;
      glycogenResynthesisWindow: string;
    };
    hydrationAndElectrolytes: {
      baselineCalculation: string;
      trainingSweatRateCompensation: string;
      sodiumPotassiumPumps: string;
    };
  };
} = {
  kineticChainCheckpoints: [
    {
      checkpoint: "Foot and Ankle",
      commonDistortions: ["Pronation Distortion Syndrome", "Pes Planus (تسطح القدم)", "Feet Turn Out (دوران القدمين للخارج)"],
      overactiveMuscles: ["Gastrocnemius (السمانة السطحية)", "Soleus (السمانة العميقة)", "Peroneals", "Biceps Femoris (Short Head)"],
      underactiveMuscles: ["Anterior Tibialis (عضلة القصبة الأمامية)", "Posterior Tibialis", "Gluteus Medius", "Gluteus Maximus"],
      correctiveStrategy: {
        inhibitSMR: ["فوم رولر على عضلة السمانة Gastrocnemius و Soleus لمدة 30-60 ثانية على نقاط الزناد (Trigger Points)"],
        lengthenStretch: ["إطالة وتر أكيليس وعضلة السمانة بالوقوف على حافة الدرج مع ثبات 30 ثانية"],
        activateIsolated: ["تمرين Tibialis Dorsiflexion بالباند وتفعيل عضلات باطن القدم المقوسة"],
        integrateMovement: ["Single-Leg Balance Reach مع مراقبة ثبات القوس الحركي للقدم"]
      }
    },
    {
      checkpoint: "Knee Complex",
      commonDistortions: ["Knee Valgus (دخول الركبة للداخل)", "Knee Varus (تقوس الركبة للخارج)", "Hyperextension"],
      overactiveMuscles: ["Adductor Complex (العضلات الضامة)", "Tensor Fasciae Latae (TFL)", "Vastus Lateralis", "Biceps Femoris"],
      underactiveMuscles: ["Gluteus Medius (المثبتة الأساسية للحوض)", "Gluteus Maximus", "Vastus Medialis Oblique (VMO)"],
      correctiveStrategy: {
        inhibitSMR: ["تدليك عضلات الفخذ الداخلية Adductors والـ TFL بالفوم رولر"],
        lengthenStretch: ["إطالة الفراشة والضامة الثابتة 30 ثانية"],
        activateIsolated: ["Side-Lying Clamshells و Lateral Band Walk بشريط مطاطي أعلى الركبتين"],
        integrateMovement: ["Squat to Box with Mini-Band لتعليم الركبة مسار التوازي للخارج"]
      }
    },
    {
      checkpoint: "Lumbo-Pelvic-Hip Complex (LPHC)",
      commonDistortions: ["Anterior Pelvic Tilt (ميل الحوض الأمامي - لوردوز القطنية)", "Posterior Pelvic Tilt (تسطح أسفل الظهر)", "Asymmetric Weight Shift"],
      overactiveMuscles: ["Psoas & Iliacus (مفصل الفخذ)", "Rectus Femoris", "Tensor Fasciae Latae", "Erector Spinae"],
      underactiveMuscles: ["Gluteus Maximus", "Hamstrings", "Rectus Abdominis", "Transverse Abdominis (البطن العميقة)"],
      correctiveStrategy: {
        inhibitSMR: ["فوم رولر لعضلات الفخذ الأمامية ومفصل الحوض TFL/Psoas"],
        lengthenStretch: ["إطالة Half-Kneeling Hip Flexor Stretch مع شد المؤخرة"],
        activateIsolated: ["Glute Bridge مع ثبات ثانيتين بالقمة وتمرين Dead Bug لعضلات الكور"],
        integrateMovement: ["Single-Leg Romanian Deadlift (RDL) لدمج التوازن مع قوة السلسلة الخلفية"]
      }
    },
    {
      checkpoint: "Shoulder Girdle",
      commonDistortions: ["Upper Crossed Syndrome", "Rounded Shoulders (الأكتاف المستديرة)", "Scapular Winging (بروز لوح الكتف)"],
      overactiveMuscles: ["Pectoralis Major & Minor (الصدر الصغير والكبير)", "Upper Trapezius (أعلى الترابيس)", "Levator Scapulae", "Latissimus Dorsi"],
      underactiveMuscles: ["Middle and Lower Trapezius", "Rhomboids", "Serratus Anterior (المنشارية الأمامية)", "Infraspinatus & Teres Minor"],
      correctiveStrategy: {
        inhibitSMR: ["كرة مساج صغيرة على الصدر وعضلات الظهر العريضة Latissimus Dorsi"],
        lengthenStretch: ["إطالة الصدر على زاوية الحائط Doorway Stretch لمدة 30 ثانية"],
        activateIsolated: ["Rope Face Pulls مع دوران خارجي وتمرين Y-T-W على بنش مائل"],
        integrateMovement: ["Push-Up Plus و Standing Cable Row to External Rotation"]
      }
    },
    {
      checkpoint: "Head and Cervical Spine",
      commonDistortions: ["Forward Head Posture (بروز الرأس للأمام - Text Neck)"],
      overactiveMuscles: ["Upper Trapezius", "Sternocleidomastoid (عضلات الرقبة الجانبية)", "Levator Scapulae", "Suboccipitals"],
      underactiveMuscles: ["Deep Cervical Flexors (عضلات الرقبة العميقة)"],
      correctiveStrategy: {
        inhibitSMR: ["تدليك خفيف لنقاط ارتكاز الجمجمة الخلفية والترابيز العلوية"],
        lengthenStretch: ["إطالة الرقبة الجانبية باليد المعاكسة بلطف"],
        activateIsolated: ["Chin Tucks (سحب الذقن للخلف برفق مع استقامة الرقبة 10 ثوانٍ)"],
        integrateMovement: ["Prone Cobra مع تثبيت الذقن المحايد وضغط اللوحين"]
      }
    }
  ],
  optModelPhases: [
    {
      phase: 1,
      level: "Stabilization",
      name: "Stabilization Endurance",
      nameAr: "المرحلة الأولى: التحمل التثبيتي وضبط التوافق العصبي الحركي",
      focusAndPhysiology: "إعادة برمجة الجهاز العصبي المركزي (Neuromuscular Efficiency)، تقوية الأربطة وأوتار المفاصل، وبناء قاعدة ارتكاز صلبة للكور لتفادي التمزقات.",
      tempo: "4-2-1 (4 ثوانٍ هبوط سلبي، ثانيتان ثبات إيزومتري في أقصى تمدد، ثانية صعود مركز)",
      reps: "12 - 20 تكرار",
      sets: "1 - 3 مجموعات",
      intensity: "50% - 70% من 1RM",
      restSeconds: "0 - 90 ثانية",
      frequencyDaysPerWeek: "2 - 4 أيام أسبوعياً",
      progressionRule: "التطور عبر زيادة عدم الاستقرار (Proprioceptive Progression) مثل الانتقال من الأرض إلى Bossu Ball أو تمرين بساق واحدة، بدلاً من زيادة الوزن فقط."
    },
    {
      phase: 2,
      level: "Strength",
      name: "Strength Endurance",
      nameAr: "المرحلة الثانية: تحمل القوة العضلية بنظام السوبر سيت الهجين",
      focusAndPhysiology: "دمج رفع الأوزان الثقيلة مع تمرين استقرار لنفس العضلة في سوبر سيت مباشر (Superset) لإجبار العضلة على التثبيت وهي مجهدة.",
      tempo: "2-0-2 للتمرين الأول المركب و 4-2-1 لتمرين التثبيت الثاني",
      reps: "8 - 12 تكرار لكلا التمرينين",
      sets: "2 - 4 مجموعات سوبر سيت",
      intensity: "70% - 80% للتمرين الأول",
      restSeconds: "60 ثانية بعد إنهاء زوج السوبر سيت",
      frequencyDaysPerWeek: "3 - 4 أيام أسبوعياً",
      progressionRule: "زيادة طفيفة في الحمل الميكانيكي مع الحفاظ التام على أداء تمرين التثبيت الثاني بدون فقدان التوازن."
    },
    {
      phase: 3,
      level: "Strength",
      name: "Muscular Development / Hypertrophy",
      nameAr: "المرحلة الثالثة: البناء والتضخيم العضلي الخلوي المتقدم",
      focusAndPhysiology: "تعظيم التمزقات الميكروسكوبية الخاضعة للسيطرة وإفراز عوامل النمو الخلوية (IGF-1 و mTOR) وتضخيم الألياف العضلية السريعة والبطيئة.",
      tempo: "2-0-2 (ثانيتان نزول سلبي، صفر ثبات، ثانيتان صعود إيجابي متحكم)",
      reps: "6 - 12 تكرار",
      sets: "3 - 5 مجموعات لكل حركة",
      intensity: "75% - 85% من 1RM",
      restSeconds: "60 - 90 ثانية",
      frequencyDaysPerWeek: "4 - 6 أيام أسبوعياً (Push-Pull-Legs أو FST-7 Split)",
      progressionRule: "الحمل التدريجي الزائد (Progressive Overload) بإضافة وزن (1-2 كجم) أو تكرار إضافي في نفس النطاق أسبوعياً."
    },
    {
      phase: 4,
      level: "Strength",
      name: "Maximal Strength",
      nameAr: "المرحلة الرابعة: القوة القصوى وتجنيد الألياف العصبية العالية",
      focusAndPhysiology: "إجبار الجهاز العصبي على إرسال إشارات حركية عالية التردد لتجنيد أكبر عدد من الوحدات الحركية من النوع الثاني (Type IIb) مع زيادة كثافة العظام والأوتار.",
      tempo: "انفجاري في الصعود بأقصى عزم، وتحكم تام في النزول السلبي (X-1-1)",
      reps: "1 - 5 تكرارات",
      sets: "4 - 6 مجموعات",
      intensity: "85% - 100% من 1RM",
      restSeconds: "120 - 240 ثانية (2 إلى 4 دقائق راحة لاستعادة كامل مخزون ATP-CP)",
      frequencyDaysPerWeek: "3 - 4 أيام أسبوعياً",
      progressionRule: "زيادة الأوزان المرفوعة تدريجياً مع فترات راحة كافية بين الجولات لتفادي إجهاد الجهاز العصبي المركزي (CNS Fatigue)."
    },
    {
      phase: 5,
      level: "Power",
      name: "Power",
      nameAr: "المرحلة الخامسة: القدرة الانفجارية ومعدل توليد القوة (RFD)",
      focusAndPhysiology: "دمج رفع وزن ثقيل (85-100% 1RM) يليه مباشرة تمرين بليومتريك انفجاري سريع (30-45% 1RM أو وزن الجسم) لتسريع رد الفعل العصبي العضلي.",
      tempo: "انفجاري بأقصى سرعة ممكنة دون توقف",
      reps: "1 - 5 تكرارات للتمرين الأول + 8 - 10 تكرارات للتمرين الانفجاري",
      sets: "3 - 5 مجموعات",
      intensity: "85-100% للتمرين الأول المركب، 30-45% للتمرين الانفجاري",
      restSeconds: "1 - 2 دقيقة بين التمرينين، و 3-5 دقائق بين المجموعات",
      frequencyDaysPerWeek: "2 - 4 أيام أسبوعياً",
      progressionRule: "تحسين سرعة إتمام التكرار وسرعة انطلاق الحركة وتوليد القوة اللحظية."
    }
  ],
  posturalSyndromes: {
    "Upper Crossed Syndrome (متلازمة التقاطع العلوي)": {
      description: "تقوس الكتفين للأمام، دوران داخلي للذراعين، وبروز الرأس للأمام بسبب الجلوس الطويل واستخدام الشاشات.",
      assessmentKey: "Overhead Squat Assessment: الذراعين تسقط للأمام (Arms Fall Forward) وبروز الرأس.",
      inhibitProtocol: "SMR بالفوم رولر على عضلات Pectoralis Minor والـ Latissimus Dorsi والـ Upper Traps لمدة 45 ثانية.",
      lengthenProtocol: "Static Doorway Chest Stretch + Corner Lat Stretch لمدة 30 ثانية ثبات.",
      activateProtocol: "Isolated Face Pulls بالكيبل مع تدوير خارجي + Cobra على الأرض مع ثبات ثانيتين لعضلات الظهر الوسطى.",
      integrateProtocol: "Standing Cable Row with Retraction and Scapular Depression."
    },
    "Lower Crossed Syndrome (متلازمة التقاطع السفلي)": {
      description: "ميل الحوض للأمام (Anterior Pelvic Tilt) مع زيادة تقوس أسفل الظهر وبروز البطن بسبب قصر عضلات الفخذ الأمامية وضعف عضلات البطن والمؤخرة.",
      assessmentKey: "Overhead Squat Assessment: زيادة تقوس القطنية (Excessive Forward Lean / Low Back Arches).",
      inhibitProtocol: "SMR بالفوم رولر لعضلات الفخذ الأمامية TFL و Psoas والـ Rectus Femoris.",
      lengthenProtocol: "Static Kneeling Hip Flexor Stretch مع شد المؤخرة للداخل 30 ثانية لكل ساق.",
      activateProtocol: "Glute Bridges بوزن الجسم مع عصر كامل في القمة + Dead Bug لتفعيل Transverse Abdominis.",
      integrateProtocol: "Squat to Overhead Press بالدمبل مع الحفاظ على الحوض المحايد."
    },
    "Pronation Distortion Syndrome (متلازمة تشوه الكب للقدم والركبة)": {
      description: "تسطح بطن القدم (Flat Feet) ودخول مفصل الركبتين للداخل أثناء النزول مع دوران داخلي لعظام الفخذ.",
      assessmentKey: "Overhead Squat Assessment: القدم تلف للخارج وتسطح، والركبة تدخل للداخل (Knee Valgus).",
      inhibitProtocol: "SMR بالفوم رولر على عضلات السمانة Gastrocnemius/Soleus والضامة Adductor Complex.",
      lengthenProtocol: "Static Gastroc/Soleus Stretch على الحائط + إطالة الضامة 30 ثانية.",
      activateProtocol: "Resisted Tibialis Anterior Dorsiflexion + Side-Lying Clamshells لعضلة Gluteus Medius.",
      integrateProtocol: "Single-Leg Squat with Mini-Band أو Multiplanar Step-up Balance."
    }
  },
  nutritionScienceCNC: {
    proteinMetabolism: {
      hypertrophyTarget: "1.8 - 2.2 جم لكل كجم من وزن الجسم الإجمالي لضمان تحفيز مسار mTOR وتخليق البروتين العضلي (MPS).",
      deficitPreservation: "2.3 - 2.8 جم لكل كجم من وزن الجسم الخالي من الدهون (LBM) أثناء التنشيف وعجز السعرات لحماية العضلات من الهدم.",
      leucineThreshold: "ضرورة احتواء كل وجبة رئيسية على 2.5 - 3.5 جرام من حمض الليوسين (Leucine) لتفعيل زر البدء في بناء الألياف العضلية."
    },
    carbohydratePeriodization: {
      highOutputDays: "4 - 7 جم / كجم في أيام التمارين الشاقة (الأرجل والظهر و FST-7) لتعبئة مخازن الجليكوجين العضلي والكبد.",
      recoveryDays: "2 - 3 جم / كجم في أيام الراحة والاستشفاء لضبط حساسية الإنسولين وحرق الدهون.",
      glycogenResynthesisWindow: "تناول كارب سريع الامتصاص (أرز أبيض، كريم أوف رايس) مع بروتين مصل اللبن في غضون 45 دقيقة بعد الحصة التدريبية."
    },
    hydrationAndElectrolytes: {
      baselineCalculation: "35 إلى 45 مل ماء لكل كجم من وزن الجسم يومياً (مثال: لاعب 80 كجم يحتاج 3.2 إلى 3.6 لتر ماء نقي يومياً).",
      trainingSweatRateCompensation: "إضافة 500 إلى 750 مل ماء لكل ساعة تمرين شاقة لتعويض الفاقد في العرق.",
      sodiumPotassiumPumps: "ضرورة استهلاك 3 - 5 جم صوديوم مع 3.5 - 4.5 جم بوتاسيوم يومياً لضمان كفاءة مضخات الصوديوم-بوتاسيوم في جدران الخلايا العضلية وتفادي الشد العضلي وتحقيق أقصى بمب."
    }
  }
};

// ==========================================
// 2. HANY RAMBOD FST-7 COMPLETE OLYMPIA MANUAL
// ==========================================
export const HANY_RAMBOD_DEEP_FST7_MANUAL: {
  creatorBio: string;
  olympiaTitlesCount: number;
  corePhysiologicalMechanism: string;
  rulesOfExecution: string[];
  hydrationAndSodiumMandate: string;
  intraSet30SecondsProtocol: string;
  muscleBlueprints: FST7MuscleExerciseBlueprint[];
} = {
  creatorBio: "هاني رامبود (The Pro Creator) مؤسس نظام FST-7 والمدرب الأكثر تتويجاً في تاريخ كمال الأجسام بمستر أولمبيا (24 تمثال ساندو) درب أساطير مثل فيل هيث (7 ألقاب)، جاي كتلر، ديريك لونسفورد، هادي شوبان، وجيريمي بوينديا.",
  olympiaTitlesCount: 24,
  corePhysiologicalMechanism: "اللفافة العضلية (Fascia) هي غشاء ليفي كثيف من الكولاجين يحيط بكل حزمة عضلية ويحدد حجمها وإمكانية تمددها. نظام FST-7 يجمع بين رفع الأوزان المركبة الثقيلة في البداية لتشغيل ألياف القوة، ثم ضخ كميات هائلة من الدم المحمل بالأحماض الأمينية والإلكتروليتات في العضلة في 7 مجموعات نهائية مع راحة قصيرة جداً (30-45 ثانية). هذا الضغط المائي العالي (Hyperemia & Cellular Swelling) يمدد الغشاء الفاشيالي من الداخل ويسمح بنمو وتفرع ألياف جديدة لم تكن قادرة على النمو سابقاً.",
  rulesOfExecution: [
    "قاعدة 1: ابدأ بالتمارين المركبة الثقيلة أولاً (Heavy Compound Movements) مثل الاسكوات، البنش، أو التجديف، لبناء الكثافة والعمق العضلي.",
    "قاعدة 2: مجموعات الـ 7 الختامية (The 7s) تنفذ في نهاية الحصة لكل عضلة، ويُفضل استخدام أجهزة الكابلات أو الماكينات المعزولة لتفادي اختلال التوازن والتركيز الكامل على العصر العضلي.",
    "قاعدة 3: الراحة بين مجموعات الـ 7 صارمة للغاية: من 30 إلى 45 ثانية كحد أقصى. ممنوع تصفح الهاتف أو الحديث؛ الهدف هو حبس الدم داخل الخلية العضلية.",
    "قاعدة 4: التبديل في فترة الراحة بين الشد الإيزومتري (Iso-Tension Flexing) لعصر العضلة 10 ثوانٍ وحبس الدم، وتمديد اللفافة العميقة (Deep Fascial Stretch) لتوسيع الغشاء.",
    "قاعدة 5: ارتشاف رشفات منتظمة من مشروب التمرين (ماء + إلكتروليتات + أحماض أمينية EAA) بين كل مجموعة ومجموعة لتغذية الخلية المنتفخة."
  ],
  hydrationAndSodiumMandate: "يشدد هاني رامبود على تناول ما لا يقل عن 1 إلى 1.5 جالون ماء يومياً (4 إلى 6 لترات). الصوديوم غير ممنوع نهائياً في FST-7، بل يوصى بإضافة رشة ملح صخري أو ملح هيمالايا لمشروب التمرين لتعزيز الامتلاء الخلوي؛ فالعضلة الجافة الخالية من الصوديوم لن تضخ دماً ولن تتمدد فاشياتها أبداً.",
  intraSet30SecondsProtocol: "الثواني الـ 30 في راحة الـ 7s مقسمة كالتالي: (0-10 ثوانٍ: ارتشاف ماء وإلكتروليت)، (10-20 ثانية: عصر إيزومتري جبار Iso-Tension أو إطالة عميقة للفاشيا)، (20-30 ثانية: تنفس بطني عميق والاستعداد للمجموعة التالية).",
  muscleBlueprints: [
    {
      muscleGroup: "Chest",
      muscleGroupAr: "الصدر والتكثيف العلوي (Chest Fullness & Upper Clavicular Thickness)",
      olympiaChampionsShowcase: "فيل هيث وهادي شوبان وديريك لونسفورد",
      primaryCompoundExercises: [
        {
          name: "Incline Dumbbell Press (تجميع دمبل مائل عالي بزاوية 30°)",
          sets: 4,
          reps: "8-10",
          rir: 1,
          rest: "90s",
          executionCue: "نزول ببطء ثانيتين حتى موازاة الصدر العلوي ودفع للأعلى مع الحفاظ على لوحي الكتف مثبتين بالخلف Retracted & Depressed."
        },
        {
          name: "Flat Barbell Bench Press (بنش بريس مستوي بار حر)",
          sets: 3,
          reps: "8-10",
          rir: 2,
          rest: "90s",
          executionCue: "لمس خفيف لأسفل عظمة القص ودفع مع عصر الصدر في الأعلى دون قفل الكوع بعنف."
        },
        {
          name: "Weighted Chest Dips أو Machine Chest Press",
          sets: 3,
          reps: "10-12",
          rir: 1,
          rest: "75s",
          executionCue: "ميل الجذع 15 درجة للأمام لعزل الصدر السفلي والوسطى عن الترايسبس."
        }
      ],
      fst7Finisher: {
        exerciseName: "Cable Crossover (سيفن كابل كروس أوفر) أو Incline Dumbbell Flye",
        whyThisExercise: "يوفر شداً وتوتراً مستمراً (Constant Tension) طوال مسار الحركة مع زاوية عصر لا تتيحها الأوزان الحرة في قمة الانقباض.",
        sets: 7,
        reps: "10-12",
        restSeconds: 35,
        interSetProtocol: {
          seconds0to10: "رشفة ماء مع إلكتروليتات للحفاظ على الامتلاء الوريدي.",
          seconds10to25: "شد إيزومتري لوضعية Most Muscular Flex لعصر الصدر بكل قوة لمدة 10 ثوانٍ.",
          seconds25to35: "أخذ نفس عميق والاستعداد للمجموعة التالية فوراً."
        },
        intensityTechniqueLastSets: "في المجموعتين 6 و 7: تنفيذ 3 إلى 5 تكرارات جزئية (Partials) عند الوصول للفشل الكامل."
      }
    },
    {
      muscleGroup: "Back",
      muscleGroupAr: "الظهر وعرض المجنص والكثافة (Back Width & Lat Thickness)",
      olympiaChampionsShowcase: "ديريك لونسفورد (بطل مستر أولمبيا للوزن المفتوح) وفيل هيث",
      primaryCompoundExercises: [
        {
          name: "Wide-Grip Lat Pulldown أو Weighted Pull-ups",
          sets: 4,
          reps: "8-10",
          rir: 1,
          rest: "90s",
          executionCue: "بدء الحركة بخفض لوحي الكتف (Scapular Depression) ثم سحب الكوعين نحو الحوض لعصر اللاتس وليس بالذراعين."
        },
        {
          name: "Barbell Bent-Over Row (تجديف بار مقلوب)",
          sets: 4,
          reps: "6-8",
          rir: 1,
          rest: "90s",
          executionCue: "زاوية جذع 45 درجة مع ثبات الحوض القطني المحايد وسحب البار نحو السرة."
        },
        {
          name: "Close-Grip Seated Cable Row (سحب أرضي قبضة ضيقة)",
          sets: 3,
          reps: "10-12",
          rir: 1,
          rest: "75s",
          executionCue: "فرد اللوحين للأمام في التمدد السلبي وتجميعهما بالكامل في الخلف لعصر منتصف الظهر."
        }
      ],
      fst7Finisher: {
        exerciseName: "Straight-Arm Rope Cable Pulldown (سيفن سحب ذراع مفرود بالحبل)",
        whyThisExercise: "يعزل عضلات اللاتس تماماً عن عضلة البايسبس، مما يتيح استهداف الفاشيا حتى الإجهاد التام دون تعب الذراعين.",
        sets: 7,
        reps: "10-12",
        restSeconds: 40,
        interSetProtocol: {
          seconds0to10: "شرب رشفة ماء مع التنفس المنتظم.",
          seconds10to25: "الإمساك بقائم جهاز الكيبل والرجوع للخلف لتمديد اللاتس (Lat Spread Fascia Stretch) لمدة 10 ثوانٍ لكل جانب.",
          seconds25to35: "ثبات ذهني واستعداد للمجموعة التالية."
        },
        intensityTechniqueLastSets: "ثبات إيزومتري لمدة ثانيتين في نهاية كل تكرار في الجولة الأخيرة."
      }
    },
    {
      muscleGroup: "Legs",
      muscleGroupAr: "الأرجل والفخذ الرباعي والخلفيات (Wheels, Quads & Hamstrings)",
      olympiaChampionsShowcase: "جاي كتلر وهادي شوبان وديريك لونسفورد",
      primaryCompoundExercises: [
        {
          name: "Barbell Back Squat أو Safety Bar Squat",
          sets: 4,
          reps: "8-10",
          rir: 2,
          rest: "120s",
          executionCue: "نزول موازي ببطء 3 ثوانٍ مع تباعد الركبتين لمسار أصابع القدم، وفرد الحوض والصدر كاملاً."
        },
        {
          name: "Leg Press 45° (دفع رجل على الجهاز)",
          sets: 4,
          reps: "10-12",
          rir: 1,
          rest: "90s",
          executionCue: "قدمان في منتصف المنصة بعرض الكتفين والنزول حتى زاوية 90 درجة دون رفع أسفل الظهر عن الكرسي."
        },
        {
          name: "Romanian Deadlift (RDL بالدمبل أو البار)",
          sets: 4,
          reps: "8-10",
          rir: 1,
          rest: "90s",
          executionCue: "دفع الحوض للخلف كأنك تغلق باباً بمؤخرتك، مع ثني طفيف في الركبة حتى أقصى تمدد في عضلات الهامسترينج."
        }
      ],
      fst7Finisher: {
        exerciseName: "Leg Extension (سيفن رفرفة كوادز) أو Lying Leg Curl (للفخذ الخلفي)",
        whyThisExercise: "عزل كامل لمفصل الركبة وضخ دموي غير مسبوق في ألياف الكوادز دون تحميل على العمود الفقري.",
        sets: 7,
        reps: "12-15",
        restSeconds: 45,
        interSetProtocol: {
          seconds0to10: "شرب كمية كافية من الماء لتعويض التعرق الشديد في تمرين الأرجل.",
          seconds10to25: "الوقوف على ساق واحدة وإمساك الكاحل وسحبه للخلف لتمديد الفاشيا الأمامية للفخذ (Quad Stretch) 10 ثوانٍ لكل رجل.",
          seconds25to35: "الجلوس على الجهاز والاستعداد للانطلاق."
        },
        intensityTechniqueLastSets: "في الجولة السابعة: عصر الكوادز في القمة لمدة 5 ثوانٍ بعد آخر عدة."
      }
    },
    {
      muscleGroup: "Shoulders",
      muscleGroupAr: "الأكتاف ثلاثية الأبعاد (3D Boulder Delts)",
      olympiaChampionsShowcase: "جيريمي بوينديا وفيل هيث",
      primaryCompoundExercises: [
        {
          name: "Seated Dumbbell Shoulder Press (ضغط دمبل جالس)",
          sets: 4,
          reps: "8-10",
          rir: 1,
          rest: "90s",
          executionCue: "زاوية كوع 75 درجة للأمام قليلاً لحماية المفصل، ودفع حتى قبل قفل الكوع للحفاظ على التوتر."
        },
        {
          name: "Bent-Over Rear Delt Cable Flye (رفرفة خلفي بالكيبل)",
          sets: 4,
          reps: "12-15",
          rir: 1,
          rest: "60s",
          executionCue: "سحب بالكتف الخلفي واللوحين مع إبقاء الكوعين مثنيين قليلاً."
        },
        {
          name: "Barbell Upright Row بقبضة مريحة واسعة",
          sets: 3,
          reps: "10-12",
          rir: 2,
          rest: "75s",
          executionCue: "رفع الكوعين للأعلى وتثبيت المعصم لتحفيز الكتف الجانبي."
        }
      ],
      fst7Finisher: {
        exerciseName: "Standing Dumbbell Lateral Raise أو Cable Lateral Raise خلف الظهر",
        whyThisExercise: "الرافعة المثالية لبناء الرأس الجانبي وعرض الكتف ثلاثي الأبعاد المميز لأبطال Men's Physique و Classic.",
        sets: 7,
        reps: "12-15",
        restSeconds: 30,
        interSetProtocol: {
          seconds0to10: "رشفة ماء سريعة؛ عضلة الكتف تحترق بسرعة باللاكتيك أسيد.",
          seconds10to25: "رفع الذراعين جانباً في الهواء وثبات إيزومتري مع عصر الرأس الجانبي لمدة 10 ثوانٍ.",
          seconds25to35: "إسقاط الذراعين والتقاط الأوزان فوراً."
        },
        intensityTechniqueLastSets: "تقنية Drop-set سريعة في المجموعة الأخيرة بإسقاط 30% من الوزن وإكمال 6 تكرارات إضافية."
      }
    },
    {
      muscleGroup: "Arms",
      muscleGroupAr: "الذراعين - البايسبس والترايسبس (Guns & Horseshoe Triceps)",
      olympiaChampionsShowcase: "فيل هيث (صاحب أفضل ذراعين في تاريخ مستر أولمبيا)",
      primaryCompoundExercises: [
        {
          name: "Close-Grip Bench Press أو Weighted Parallel Dips",
          sets: 4,
          reps: "8-10",
          rir: 1,
          rest: "90s",
          executionCue: "قبضة بعرض الكتفين مع لصق الكوعين بجانب القفص الصدري لتوجيه كل الحمل للترايسبس."
        },
        {
          name: "Barbell Standing EZ-Curl (بايسبس بار زجزاج)",
          sets: 4,
          reps: "8-10",
          rir: 1,
          rest: "75s",
          executionCue: "تثبيت الكوعين بجانب الجسم تماماً وعدم أرجحة الجذع."
        },
        {
          name: "Incline Dumbbell Curl (بايسبس على بنش مائل للخلف)",
          sets: 3,
          reps: "10-12",
          rir: 1,
          rest: "60s",
          executionCue: "أقصى تمدد للرأس الطويل في الأسفل مع لفة المعصم Supination في الصعود."
        }
      ],
      fst7Finisher: {
        exerciseName: "Cable Rope Pushdown (تراي) + Machine Preacher Curl (باي) سيفن متتابع",
        whyThisExercise: "حبس الدم بالكامل داخل الذراع ومنع أي مهرب للأكسجين، مما ينتج عنه أقصى انتفاخ خلوي ممكن.",
        sets: 7,
        reps: "10-12",
        restSeconds: 30,
        interSetProtocol: {
          seconds0to10: "رشفة ماء وإلكتروليت سريعة.",
          seconds10to25: "عصر الذراعين في وضعية Front Double Biceps مع شد الترايسبس والبايسبس معاً لمدة 10 ثوانٍ متصلة.",
          seconds25to35: "أخذ نفس عميق وبدء المجموعة التالية."
        },
        intensityTechniqueLastSets: "عصر مستمر لمدة ثانيتين في قمة كل تكرار بالجولتين 6 و 7."
      }
    }
  ]
};
