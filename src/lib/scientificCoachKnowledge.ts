/**
 * Comprehensive Knowledge Base:
 * 1. NASM OPT Model (Optimum Performance Training) & Specializations (CES, PES, CNC).
 * 2. Hany Rambod's FST-7 System (Fascia Stretch Training) & Elite Olympia Protocols.
 */

export interface NASMPhase {
  phaseNumber: number;
  phaseName: string;
  category: "Stabilization" | "Strength" | "Power";
  goal: string;
  tempo: string;
  repRange: string;
  setRange: string;
  intensity: string;
  restInterval: string;
  idealFor: string;
  assessmentFocus: string[];
}

export interface FST7Protocol {
  targetMuscle: string;
  primaryCompoundLifts: string[];
  fst7FinisherExercise: string;
  setsReps: string; // e.g. "7 sets of 10-12 reps"
  restPeriodSeconds: number; // 30-45 seconds
  intraSetAction: "Intra-set Static Flexing / Iso-Tension" | "Deep Fascia Stretch";
  waterIntakeNote: string;
  executionCues: string[];
}

export const NASM_KNOWLEDGE_BASE: {
  optModelPhases: NASMPhase[];
  cesCorrectiveRules: Record<string, { muscleOveractive: string[]; muscleUnderactive: string[]; solution: string }>;
  nutritionCNC: {
    proteinGramsPerKg: { cutting: string; maintenance: string; bulking: string };
    hydrationRules: string;
    periWorkoutNutrientTiming: string;
  };
} = {
  optModelPhases: [
    {
      phaseNumber: 1,
      phaseName: "Stabilization Endurance (تثبيت وقوة التحمل الحركي)",
      category: "Stabilization",
      goal: "زيادة التوافق العصبي العضلي، ثبات المفاصل، وتقوية عضلات الكور العميقة لتفادي الإصابات.",
      tempo: "4-2-1 (بطيء جداً في النزول السلبي، ثانيتان ثبات، ثانية صعود)",
      repRange: "12 - 20 تكرار",
      setRange: "1 - 3 مجموعات",
      intensity: "50% - 70% من 1RM",
      restInterval: "0 - 90 ثانية",
      idealFor: "المبتدئون، العائدون من إصابة، أو تصحيح مسار الحركة.",
      assessmentFocus: ["Overhead Squat Assessment (OHSA)", "Single-leg balance test"]
    },
    {
      phaseNumber: 2,
      phaseName: "Strength Endurance (قوة التحمل العضلي - Supersets)",
      category: "Strength",
      goal: "تعزيز كفاءة التثبيت أثناء رفع أوزان أثقل من خلال نظام السوبر سيت (تمرين مركب ثقيل يليه تمرين ثبات لنفس العضلة).",
      tempo: "2-0-2 للتمرين الأول و 4-2-1 للتمرين الثاني",
      repRange: "8 - 12 تكرار",
      setRange: "2 - 4 مجموعات سوبر سيت",
      intensity: "70% - 80% من 1RM",
      restInterval: "60 ثانية بعد السوبر سيت",
      idealFor: "المتدربون الساعون لحرق الدهون وبناء الكثافة العضلية مع الحفاظ على التوازن.",
      assessmentFocus: ["Postural alignment under load", "Push/Pull kinetic chain tests"]
    },
    {
      phaseNumber: 3,
      phaseName: "Muscular Development / Hypertrophy (البناء والتضخيم العضلي)",
      category: "Strength",
      goal: "تحفيز أقصى قدر من التضخيم العضلي الخلوي (Sarcoplasmic & Myofibrillar Hypertrophy).",
      tempo: "2-0-2 (تحكم إيجابي وسلبي قياسي)",
      repRange: "6 - 12 تكرار",
      setRange: "3 - 5 مجموعات",
      intensity: "75% - 85% من 1RM",
      restInterval: "60 - 90 ثانية",
      idealFor: "لاعبي كمال الأجسام واللياقة البدنية الراغبين في زيادة الحجم العضلي الصافي.",
      assessmentFocus: ["Progressive overload tracking", "Muscle recovery rate"]
    },
    {
      phaseNumber: 4,
      phaseName: "Maximal Strength (القوة القصوى وتجنيد الألياف العصبية)",
      category: "Strength",
      goal: "تجنيد الوحدات الحركية عالية العتبة (High-threshold Motor Units) وزيادة كثافة العظام والأوتار.",
      tempo: "انفجاري في الصعود مع تحكم في النزول (X-1-1 أو 1-1-1)",
      repRange: "1 - 5 تكرارات",
      setRange: "4 - 6 مجموعات",
      intensity: "85% - 100% من 1RM",
      restInterval: "2 - 4 دقائق",
      idealFor: "زيادة القوة الخالصة في الاسكوات والبنش بريس والديدليفت.",
      assessmentFocus: ["1RM testing", "Joint stability during max strain"]
    },
    {
      phaseNumber: 5,
      phaseName: "Power (القدرة الانفجارية والسرعة)",
      category: "Power",
      goal: "إنتاج أقصى قوة في أقل زمن ممكن (Rate of Force Development - RFD).",
      tempo: "انفجاري بأقصى سرعة ممكنة",
      repRange: "1 - 5 تكرارات للقوة متبوعة بـ 8 - 10 بليومتريك انفجاري",
      setRange: "3 - 5 مجموعات",
      intensity: "85-100% للتمرين الأول و 30-45% للتمرين الانفجاري",
      restInterval: "1 - 2 دقيقة بين التمارين و 3-5 دقائق بين المجموعات",
      idealFor: "الرياضيون المحترفون، لاعبو الفنون القتالية وكرة القدم.",
      assessmentFocus: ["Vertical jump", "Medicine ball chest pass test"]
    }
  ],
  cesCorrectiveRules: {
    "Forward Head & Rounded Shoulders (الأكتاف المستديرة وبروز الرقبة)": {
      muscleOveractive: ["Pectoralis Major/Minor", "Upper Trapezius", "Levator Scapulae", "Latissimus Dorsi"],
      muscleUnderactive: ["Middle & Lower Trapezius", "Rhomboids", "Deep Cervical Flexors", "Serratus Anterior"],
      solution: "إطالة وتدليك الفوم رولر لعضلات الصدر واللاتس، مع تقوية الـ Face Pulls و Wall Slides و Chin Tucks."
    },
    "Anterior Pelvic Tilt (ميل الحوض الأمامي - لوردوز القطنية)": {
      muscleOveractive: ["Hip Flexors (Psoas)", "Tensor Fasciae Latae", "Rectus Femoris", "Erector Spinae"],
      muscleUnderactive: ["Gluteus Maximus", "Hamstrings", "Rectus Abdominis", "Transverse Abdominis"],
      solution: "إطالة عضلات مفصل الفك والفخذ الأمامي مع تمارين تقوية الجلوت بريدج وتفعيل البطن العميقة (Dead Bug)."
    },
    "Knee Valgus (دخول الركبتين للداخل أثناء الاسكوات)": {
      muscleOveractive: ["Adductor Complex", "Biceps Femoris (Short Head)", "TFL", "Vastus Lateralis"],
      muscleUnderactive: ["Gluteus Medius", "Gluteus Maximus", "Vastus Medialis Oblique (VMO)"],
      solution: "تمرين Mini-Band Clamshells و Lateral Band Walk وتثبيت الركبة للخارج بمسار متوازن."
    }
  },
  nutritionCNC: {
    proteinGramsPerKg: {
      cutting: "2.2 - 2.6 جم / كجم (لحماية الكتلة العضلية في عجز السعرات)",
      maintenance: "1.8 - 2.2 جم / كجم",
      bulking: "1.6 - 2.0 جم / كجم"
    },
    hydrationRules: "35 - 45 مل ماء لكل كجم من وزن الجسم + 500 مل لكل ساعة تمرين شاقة.",
    periWorkoutNutrientTiming: "وجبة قبل التمرين بـ 90-120 دقيقة (كارب معقد + بروتين سريع وسهل الهضم وقليل الدهون). وجبة بعد التمرين مباشرة غنية بالجليكوجين والأحماض الأمينية EAA."
  }
};

export const HANY_RAMBOD_FST7_KNOWLEDGE_BASE: {
  philosophy: string;
  goldenRules: string[];
  protocols: FST7Protocol[];
} = {
  philosophy: "نظام FST-7 (Fascia Stretch Training) ابتكره المدرب العالمي هاني رامبود وصنع به 24 لقباً في مستر أولمبيا (فيل هيث، ديريك لونسفورد، هادي شوبان، وجيريمي بوينديا). يعتمد على تمديد اللفافة العضلية (Fascia) المحيطة بالألياف عبر ضخ دموي أقصى (Maximal Hyperemia) في 7 مجموعات نهائية.",
  goldenRules: [
    "ابدأ بالتمرينات المركبة الثقيلة (Compound Heavy Movements) لبناء الكثافة والقوة وتجنيد الألياف العضلية البيضاء.",
    "مجموعة الـ 7 الختامية (The FST-7 Finisher) تكون في نهاية الحصة العضلية غالباً على جهاز معزول أو كيبل لتفادي اختلال التوازن أو الإصابة.",
    "الراحة بين مجموعات الـ 7 صارمة جداً: 30 إلى 45 ثانية فقط لا غير.",
    "خلال فترة الراحة: التبديل بين الشد الإيزومتري (Iso-Tension Flexing) لعصر العضلة وحبس الدم، والتمديد العميق الفاشيالي (Deep Fascia Stretch) لتوسيع الغشاء الليفي.",
    "ارتشاف رشفات ماء مع إلكتروليتات بين المجموعات لضمان وصول ترطيب الخلية العضلية لأعلى درجة انتفاخ."
  ],
  protocols: [
    {
      targetMuscle: "الصدر (Chest Expansion)",
      primaryCompoundLifts: [
        "Incline Dumbbell Press (3-4 sets x 8-10 reps) - تركيز علوي بزاوية 30 درجة",
        "Flat Barbell Bench Press (3 sets x 8-10 reps) - نزول متحكم 2 ثانية ولمس الصدر برفق",
        "Weighted Dips / Machine Chest Press (3 sets x 10 reps)"
      ],
      fst7FinisherExercise: "Cable Crossover أو Pec Deck Flye",
      setsReps: "7 مجموعات × 10-12 تكرار",
      restPeriodSeconds: 35,
      intraSetAction: "Intra-set Static Flexing / Iso-Tension",
      waterIntakeNote: "شرب رشفة ماء مع ملح صخري أو إلكتروليت لتعظيم البمب الدموي.",
      executionCues: [
        "عصر عضلات الصدر في ذروة الانقباض لثانية كاملة",
        "في فترة الراحة: شد الصدر بقبضة اليدين (Most Muscular pose flex) لمدة 10 ثوانٍ",
        "المجموعتان 6 و 7: إمكانية إدخال 3-4 Partial reps عند الوصول للفشل الكامل"
      ]
    },
    {
      targetMuscle: "الظهر وعرض المجنص (Back Lat Width & Density)",
      primaryCompoundLifts: [
        "Wide-Grip Pull-ups أو Lat Pulldown (3-4 sets x 8-10 reps) - سحب بالكتف أولاً لا بالبايسبس",
        "Barbell Bent-Over Rows أو Pendlay Rows (3-4 sets x 6-8 reps) - ثبات الجذع وزاوية 45 درجة",
        "Close-Grip Seated Cable Row (3 sets x 8-10 reps)"
      ],
      fst7FinisherExercise: "Straight-Arm Rope Cable Pulldown أو Machine Lat Pulldown",
      setsReps: "7 مجموعات × 10-12 تكرار",
      restPeriodSeconds: 40,
      intraSetAction: "Deep Fascia Stretch",
      waterIntakeNote: "حافظ على تدفق السوائل لمنع تقلص عضلات أسفل الظهر.",
      executionCues: [
        "تثبيت الكوعين وقوس الظهر خفيفاً لعزل اللاتس تماماً عن الذراعين",
        "أثناء الراحة: الإمساك بقائم الجهاز وتمديد عريضة الظهر (Lat spread stretch) 10 ثوانٍ لكل جانب"
      ]
    },
    {
      targetMuscle: "الأكتاف ثلاثية الأبعاد (3D Boulder Delts)",
      primaryCompoundLifts: [
        "Seated Dumbbell Overhead Shoulder Press (4 sets x 8-10 reps) - عدم فرد الكوع كاملاً بالقمة للحفاظ على التوتر",
        "Barbell / Dumbbell Upright Row (3 sets x 10-12 reps)",
        "Bent-Over Rear Delt Flye (3-4 sets x 12-15 reps)"
      ],
      fst7FinisherExercise: "Standing Dumbbell Lateral Raises أو Cable Lateral Raise خلف الظهر",
      setsReps: "7 مجموعات × 12-15 تكرار",
      restPeriodSeconds: 30,
      intraSetAction: "Intra-set Static Flexing / Iso-Tension",
      waterIntakeNote: "الكتف يحتاج ترطيباً عالياً لتحمل حرق اللاكتيك أسيد العالي.",
      executionCues: [
        "رفع الدمبلز بالكتف الجانبي وليس بالترابيز (تثبيت لوحي الكتف للأسفل)",
        "في فترة الـ 30 ثانية: فرد الذراعين جانباً في وضع الثبات والضغط على الرأس الجانبي"
      ]
    },
    {
      targetMuscle: "الذراعين - البايسبس والترايسبس (Guns & Horseshoe Triceps)",
      primaryCompoundLifts: [
        "Close Grip Bench Press أو Weighted Dips (3-4 sets x 8-10 reps)",
        "Barbell Standing EZ-Curl (3-4 sets x 8-10 reps)",
        "Incline Dumbbell Curl (3 sets x 10-12 reps) - تمديد كامل في أسفل الحركة"
      ],
      fst7FinisherExercise: "Cable Rope Tricep Pushdown + EZ Bar Cable Curl (Super-set 7s)",
      setsReps: "7 مجموعات × 10-12 تكرار",
      restPeriodSeconds: 30,
      intraSetAction: "Intra-set Static Flexing / Iso-Tension",
      waterIntakeNote: "شرب كمية وفيرة، فالذراعين هما أسرع العضلات استجابة للبمب الضاغط.",
      executionCues: [
        "عصر الترايسبس بفتح الحبل في الأسفل، وثني البايسبس مع لفة المعصم Supination",
        "في الراحة: شد الباي والتراي في وضعية Front Double Biceps لمدة 8 ثوانٍ"
      ]
    },
    {
      targetMuscle: "الأرجل والفخذ الرباعي والخلفيات (Legs Wheels & Hamstrings)",
      primaryCompoundLifts: [
        "Barbell Back Squat أو Safety Bar Squat (4 sets x 8-10 reps) - عمق موازي وفرد صدر كامل",
        "Leg Press (3-4 sets x 10-12 reps) - وضعية القدمين في منتصف البلاتفورم",
        "Romanian Deadlift (RDL) (3-4 sets x 8-10 reps) - تحكم فائق في إطالة الهامسترينج"
      ],
      fst7FinisherExercise: "Leg Extension (للأماميات) أو Lying Leg Curl (للخلفيات)",
      setsReps: "7 مجموعات × 12-15 تكرار",
      restPeriodSeconds: 45,
      intraSetAction: "Deep Fascia Stretch",
      waterIntakeNote: "ضرورة تعويض الصوديوم والمغنيسيوم لتجنب الشد العضلي الحاد.",
      executionCues: [
        "عصر الكوادز لثانية في قمة الحركة بدون قفل مفصل الركبة بعنف",
        "في الراحة: إطالة الكواد بالوقوف على ساق واحدة وشد الكاحل نحو المؤخرة لتمديد الفاشيا"
      ]
    }
  ]
};
