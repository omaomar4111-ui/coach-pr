/**
 * Comprehensive Bodybuilding Systems & Templates Database
 * Includes all classic splits, Hany Rambod FST-7 variations, 3-day templates, and 1RM calculators.
 */

export interface ExerciseDefinition {
  id: string;
  name: string;
  targetMuscle: string;
  sets: number;
  reps: string;
  restSec: number;
  technique: "Normal" | "FST-7 Finisher" | "Drop Set" | "Rest-Pause" | "Super Set" | "Isometric Flex";
  techniqueNote?: string;
  tempo: string;
  defaultWeightKg: number;
}

export interface TrainingDay {
  dayNumber: number;
  dayTitle: string;
  focusMuscles: string;
  exercises: ExerciseDefinition[];
}

export interface BodybuildingSystemTemplate {
  id: string;
  title: string;
  category: "3-day" | "4-day" | "5-day" | "fst7";
  daysPerWeek: number;
  description: string;
  idealFor: string;
  systemPhilosophy: string;
  days: TrainingDay[];
}

export const BODYBUILDING_TEMPLATES: BodybuildingSystemTemplate[] = [
  // 1. Template: 3-Day FST-7 Rambod Hypertrophy
  {
    id: "fst7-3day-classic",
    title: "نظام FST-7 هاني رامبود (3 أيام مكثفة للمحترفين)",
    category: "3-day",
    daysPerWeek: 3,
    description: "أقوى نظام تضخيم عضلي وتوسيع الغشاء الفاشي للمتدربين الذين يتمرنون 3 أيام في الأسبوع مع راحة كافية للاستشفاء.",
    idealFor: "المتدربين متوسطي ومتقدمي المستوى الذين يبحثون عن أقصى امتلاء عضلي وضخامة في 3 أيام فقط.",
    systemPhilosophy: "يعتمد على الجمع بين الرفعات المركبة الثقيلة لبناء كثافة الألياف، والإنهاء بـ 7 مجاميع فاشيال (FST-7) مع راحة 30-45 ثانية وعصر إيزومتري متواصل.",
    days: [
      {
        dayNumber: 1,
        dayTitle: "يوم 1: سحب علوي وسفلي + بايسبس (Pull + Biceps FST-7)",
        focusMuscles: "الظهر، المجنص، البايسبس، والكتف الخلفي",
        exercises: [
          {
            id: "p1-1",
            name: "سحب عالي بالبار قبضة واسعة (Lat Pulldown)",
            targetMuscle: "عضلات الظهر العريضة (Lats)",
            sets: 4,
            reps: "8-10",
            restSec: 90,
            technique: "Normal",
            tempo: "3-0-1-0",
            defaultWeightKg: 65,
          },
          {
            id: "p1-2",
            name: "تجديف بالبار قبضة مقلوبة (Barbell Row - Underhand)",
            targetMuscle: "سماكة الظهر وأسفل اللاتس",
            sets: 3,
            reps: "8-10",
            restSec: 75,
            technique: "Normal",
            tempo: "2-0-1-0",
            defaultWeightKg: 70,
          },
          {
            id: "p1-3",
            name: "سحب كابل ذراع مستقيمة (Straight-Arm Pulldown)",
            targetMuscle: "عزل اللاتس وتوسيع الفاشيا",
            sets: 7,
            reps: "10-12",
            restSec: 30,
            technique: "FST-7 Finisher",
            techniqueNote: "7 مجاميع متتالية؛ راحة 30 ثانية فقط بين كل مجموعة مع شد وعصر اللاتس (Lat Spread) لمدة 10 ثواني أثناء الراحة.",
            tempo: "2-1-1-0",
            defaultWeightKg: 35,
          },
          {
            id: "p1-4",
            name: "تبادل دمبلز للبايسبس جالساً (Seated DB Curls)",
            targetMuscle: "البايسبس (Biceps)",
            sets: 3,
            reps: "10-12",
            restSec: 60,
            technique: "Drop Set",
            techniqueNote: "في آخر مجموعة إسقاط الوزن 30% وأداء أقصى عدات ممكنة حتى الفشل التام.",
            tempo: "3-0-1-1",
            defaultWeightKg: 16,
          },
          {
            id: "p1-5",
            name: "بايسبس كابل مزدوج على الجهاز (Dual Cable Curl)",
            targetMuscle: "قمة البايسبس (Biceps Peak)",
            sets: 7,
            reps: "12",
            restSec: 30,
            technique: "FST-7 Finisher",
            techniqueNote: "فنش FST-7 فاشيال: ثبات وانقباض إيزومتري في القمة في كل عدة.",
            tempo: "2-1-1-0",
            defaultWeightKg: 20,
          },
        ],
      },
      {
        dayNumber: 2,
        dayTitle: "يوم 2: دفع وصدر وأكتاف + ترايسبس (Push + Shoulders + Triceps FST-7)",
        focusMuscles: "الصدر، الكتف الأمامي والجانبي، والترايسبس",
        exercises: [
          {
            id: "p2-1",
            name: "تجميع دمبلز عالي (Incline DB Press)",
            targetMuscle: "الصدر العلوي",
            sets: 4,
            reps: "8-10",
            restSec: 90,
            technique: "Normal",
            tempo: "3-0-1-0",
            defaultWeightKg: 32,
          },
          {
            id: "p2-2",
            name: "بنش برس مستوي بالبار (Flat Barbell Bench)",
            targetMuscle: "وسط الصدر والقوة العامة",
            sets: 3,
            reps: "6-8",
            restSec: 90,
            technique: "Normal",
            tempo: "3-0-1-0",
            defaultWeightKg: 85,
          },
          {
            id: "p2-3",
            name: "تفتيح كابل من الأسفل للأعلى (Low-to-High Cable Fly)",
            targetMuscle: "فاشيا الصدر العلوي والداخلي",
            sets: 7,
            reps: "10-12",
            restSec: 30,
            technique: "FST-7 Finisher",
            techniqueNote: "7 مجاميع إطالة فاشيا الصدر، مع وقفة Most Muscular Posing لمدة 10 ثواني بين كل دور.",
            tempo: "2-1-1-0",
            defaultWeightKg: 17.5,
          },
          {
            id: "p2-4",
            name: "رفرفة جانبي كابل فردي (Single Arm Lateral Raise)",
            targetMuscle: "الكتف الجانبي (3D Delts)",
            sets: 4,
            reps: "12-15",
            restSec: 45,
            technique: "Normal",
            tempo: "2-0-1-0",
            defaultWeightKg: 10,
          },
          {
            id: "p2-5",
            name: "ترايسبس حبل على الكابل (Rope Pushdown)",
            targetMuscle: "الرأس الخارجي للترايسبس",
            sets: 7,
            reps: "12",
            restSec: 30,
            technique: "FST-7 Finisher",
            techniqueNote: "فتح طرفي الحبل بالكامل في الأسفل مع تثبيت الكوعين تماماً.",
            tempo: "2-1-1-0",
            defaultWeightKg: 30,
          },
        ],
      },
      {
        dayNumber: 3,
        dayTitle: "يوم 3: أرجل كاملة وبطن وسِمانة (Legs + Core FST-7)",
        focusMuscles: "الفخذ الأمامي والخلفي، السمانة، والجلوتس",
        exercises: [
          {
            id: "p3-1",
            name: "هاك اسكوات بالجهاز (Hack Squat)",
            targetMuscle: "الفخذ الأمامي (Quads)",
            sets: 4,
            reps: "8-10",
            restSec: 90,
            technique: "Normal",
            tempo: "3-0-1-0",
            defaultWeightKg: 120,
          },
          {
            id: "p3-2",
            name: "ديدليفت روماني بالدمبلز (Dumbbell RDL)",
            targetMuscle: "الفخذ الخلفي والجلوتس (Hamstrings)",
            sets: 4,
            reps: "10-12",
            restSec: 75,
            technique: "Normal",
            tempo: "3-1-1-0",
            defaultWeightKg: 30,
          },
          {
            id: "p3-3",
            name: "فرد أرجل أمامي بالجهاز (Leg Extension)",
            targetMuscle: "عزل وتقسيم الكوادز",
            sets: 7,
            reps: "12",
            restSec: 35,
            technique: "FST-7 Finisher",
            techniqueNote: "فنش هاني رامبود للأرجل: ثبات وقفل الركبة لثانية ونصف في كل تكرار، والوقوف وعصر الفخذ بين المجموعات.",
            tempo: "2-1-1-0",
            defaultWeightKg: 60,
          },
          {
            id: "p3-4",
            name: "سمانة واقف بالجهاز (Standing Calf Raise)",
            targetMuscle: "السمانة (Gastrocnemius)",
            sets: 5,
            reps: "15",
            restSec: 45,
            technique: "Isometric Flex",
            techniqueNote: "النزول لأقصى استطالة والطلوع مع ثبات ثانيتين في القمة.",
            tempo: "2-2-1-0",
            defaultWeightKg: 80,
          },
        ],
      },
    ],
  },

  // 2. Template: 3-Day Full Body Power Hypertrophy
  {
    id: "fullbody-3day-power",
    title: "نظام Full Body (3 أيام قوة وبناء شامل)",
    category: "3-day",
    daysPerWeek: 3,
    description: "تمرين كامل عضلات الجسم 3 مرات أسبوعياً بمعدل تكرار تردد عالي (High Frequency) لتحفيز تخليق البروتين العضلي باستمرار.",
    idealFor: "الرياضيين والمبتدئين والمتوسطين، وأصحاب الأوقات المحدودة الراغبين في بناء قوة هائلة وكتلة نقية.",
    systemPhilosophy: "توزيع الحجم التدريبي على مدار الأسبوع بتكرار العضلة 3 مرات أسبوعياً، مع التركيز على الرفعات الكبرى (Squat, Bench, Deadlift, OHP).",
    days: [
      {
        dayNumber: 1,
        dayTitle: "يوم 1: Full Body A (تركيز سكوات وبنش)",
        focusMuscles: "أرجل أمامية، صدر، ظهر، كتف جانبي",
        exercises: [
          { id: "fb1-1", name: "اسكوات بار حر (Barbell Back Squat)", targetMuscle: "الأرجل الأمامية", sets: 4, reps: "6-8", restSec: 120, technique: "Normal", tempo: "3-0-1-0", defaultWeightKg: 100 },
          { id: "fb1-2", name: "بنش برس بار مستوي (Flat Bench Press)", targetMuscle: "الصدر", sets: 4, reps: "6-8", restSec: 90, technique: "Normal", tempo: "3-0-1-0", defaultWeightKg: 80 },
          { id: "fb1-3", name: "سحب أرضي بالبار (Barbell Bent-Over Row)", targetMuscle: "عضلات الظهر", sets: 3, reps: "8-10", restSec: 75, technique: "Normal", tempo: "2-0-1-0", defaultWeightKg: 75 },
          { id: "fb1-4", name: "رفرفة جانبي بالدمبلز (DB Lateral Raise)", targetMuscle: "الأكتاف", sets: 4, reps: "12-15", restSec: 45, technique: "Drop Set", tempo: "2-0-1-0", defaultWeightKg: 12 },
        ],
      },
      {
        dayNumber: 2,
        dayTitle: "يوم 2: Full Body B (تركيز ديدليفت وضغط أكتاف)",
        focusMuscles: "فخذ خلفي، كتف أمامي، عقلة ظهر، ذراعين",
        exercises: [
          { id: "fb2-1", name: "ديدليفت تقليدي (Conventional Deadlift)", targetMuscle: "السلسلة الخلفية والظهر", sets: 3, reps: "5", restSec: 150, technique: "Normal", tempo: "2-1-1-0", defaultWeightKg: 130 },
          { id: "fb2-2", name: "ضغط أكتاف بالبار واقف (Overhead Press)", targetMuscle: "الكتف الأمامي والتراي", sets: 4, reps: "6-8", restSec: 90, technique: "Normal", tempo: "2-0-1-0", defaultWeightKg: 50 },
          { id: "fb2-3", name: "عقلة بالوزن أو بالوزن الحر (Pull-ups)", targetMuscle: "عرض الظهر", sets: 3, reps: "8-10", restSec: 75, technique: "Normal", tempo: "2-1-1-0", defaultWeightKg: 0 },
          { id: "fb2-4", name: "سوپر سيت باي وتراي كابل (Arm Superset)", targetMuscle: "الذراعين", sets: 3, reps: "12", restSec: 60, technique: "Super Set", tempo: "2-0-1-0", defaultWeightKg: 25 },
        ],
      },
      {
        dayNumber: 3,
        dayTitle: "يوم 3: Full Body C (تجميع عالي وليج برس وعزل)",
        focusMuscles: "صدر علوي، كوادز وجلوتس، مجنص، بطن",
        exercises: [
          { id: "fb3-1", name: "ليج برس أوزان ثقيلة (Leg Press)", targetMuscle: "الأرجل بالكامل", sets: 4, reps: "10-12", restSec: 90, technique: "Normal", tempo: "3-0-1-0", defaultWeightKg: 200 },
          { id: "fb3-2", name: "تجميع دمبلز عالي (Incline DB Press)", targetMuscle: "الصدر العلوي", sets: 4, reps: "8-10", restSec: 75, technique: "Normal", tempo: "3-0-1-0", defaultWeightKg: 30 },
          { id: "fb3-3", name: "سحب كابل جالس قبضة ضيقة (Seated Cable Row)", targetMuscle: "وسط الظهر واللاتس", sets: 3, reps: "10-12", restSec: 60, technique: "Rest-Pause", tempo: "2-0-1-0", defaultWeightKg: 65 },
          { id: "fb3-4", name: "بلانك ورفع أرجل للبطن (Hanging Leg Raise)", targetMuscle: "عضلات البطن والكور", sets: 3, reps: "15", restSec: 45, technique: "Isometric Flex", tempo: "2-1-1-0", defaultWeightKg: 0 },
        ],
      },
    ],
  },

  // 3. Template: 3-Day Push / Pull / Legs Classic Split
  {
    id: "ppl-3day-traditional",
    title: "نظام Push / Pull / Legs الكلاسيكي (3 أيام)",
    category: "3-day",
    daysPerWeek: 3,
    description: "النظام الأكثر انتشاراً وشهرة في كمال الأجسام؛ يعزل عضلات الدفع في يوم، السحب في يوم، وعضلات الأرجل في يوم منفصل.",
    idealFor: "أي لاعب كمال أجسام يريد تقسيماً كلاسيكياً مريحاً للمفاصل وممتعاً في الأداء.",
    systemPhilosophy: "عزل العضلات المتآزرة معاً لمنع التداخل والإرهاق المفصلي وضمان 48-72 ساعة استشفاء كامل لكل عضلة.",
    days: [
      {
        dayNumber: 1,
        dayTitle: "يوم 1: دفع (Push Day - صدر وأكتاف وتراي)",
        focusMuscles: "الصدر، الكتف الجانبي والأمامي، الترايسبس",
        exercises: [
          { id: "ppl1-1", name: "بنش برس دمبلز مستوي (Flat DB Press)", targetMuscle: "الصدر", sets: 4, reps: "8-10", restSec: 90, technique: "Normal", tempo: "3-0-1-0", defaultWeightKg: 34 },
          { id: "ppl1-2", name: "ضغط دمبلز للأكتاف جالساً (Seated DB Shoulder Press)", targetMuscle: "الأكتاف", sets: 3, reps: "8-10", restSec: 75, technique: "Normal", tempo: "2-0-1-0", defaultWeightKg: 24 },
          { id: "ppl1-3", name: "تفتيح كابل للصدر (Cable Crossover)", targetMuscle: "الصدر الداخلي", sets: 3, reps: "12-15", restSec: 60, technique: "Drop Set", tempo: "2-1-1-0", defaultWeightKg: 15 },
          { id: "ppl1-4", name: "رفرفة جانبي كابل (Cable Lateral Raise)", targetMuscle: "الكتف الجانبي", sets: 4, reps: "12-15", restSec: 45, technique: "Normal", tempo: "2-0-1-0", defaultWeightKg: 9 },
          { id: "ppl1-5", name: "ترايسبس كابل مسطرة (Straight Bar Pushdown)", targetMuscle: "الترايسبس", sets: 3, reps: "10-12", restSec: 45, technique: "Rest-Pause", tempo: "2-0-1-0", defaultWeightKg: 35 },
        ],
      },
      {
        dayNumber: 2,
        dayTitle: "يوم 2: سحب (Pull Day - ظهر وكتف خلفي وباي)",
        focusMuscles: "الظهر، المجنص، الكتف الخلفي، البايسبس",
        exercises: [
          { id: "ppl2-1", name: "سحب عالي قبضة محايدة (Neutral Grip Lat Pulldown)", targetMuscle: "المجنص", sets: 4, reps: "8-10", restSec: 90, technique: "Normal", tempo: "3-0-1-0", defaultWeightKg: 70 },
          { id: "ppl2-2", name: "تجديف دمبل فردي (One-Arm DB Row)", targetMuscle: "سماكة الظهر", sets: 3, reps: "8-10", restSec: 75, technique: "Normal", tempo: "2-1-1-0", defaultWeightKg: 36 },
          { id: "ppl2-3", name: "فيس بول بالحبل (Face Pulls)", targetMuscle: "الكتف الخلفي والترابيس العلوية", sets: 4, reps: "15", restSec: 45, technique: "Isometric Flex", tempo: "2-1-1-0", defaultWeightKg: 25 },
          { id: "ppl2-4", name: "بايسبس بار زجزاج (EZ-Bar Preacher Curl)", targetMuscle: "البايسبس وعزل الرأس القصير", sets: 3, reps: "10-12", restSec: 60, technique: "Drop Set", tempo: "3-0-1-0", defaultWeightKg: 30 },
          { id: "ppl2-5", name: "هامر كيرل بالدمبلز (DB Hammer Curl)", targetMuscle: "عضلة البراكياليس والساعد", sets: 3, reps: "10-12", restSec: 45, technique: "Normal", tempo: "2-0-1-0", defaultWeightKg: 18 },
        ],
      },
      {
        dayNumber: 3,
        dayTitle: "يوم 3: أرجل (Legs Day - كوادز وخلفيات وبطن)",
        focusMuscles: "الفخذ الأمامي والخلفي والسمانة والكور",
        exercises: [
          { id: "ppl3-1", name: "اسكوات بالجهاز أو البار (Squat)", targetMuscle: "الفخذ الأمامي", sets: 4, reps: "8-10", restSec: 90, technique: "Normal", tempo: "3-0-1-0", defaultWeightKg: 110 },
          { id: "ppl3-2", name: "ثني أرجل خلفي نائم (Lying Leg Curl)", targetMuscle: "الفخذ الخلفي", sets: 4, reps: "10-12", restSec: 60, technique: "Normal", tempo: "3-0-1-0", defaultWeightKg: 50 },
          { id: "ppl3-3", name: "خطوة طعن بالدمبلز (Walking DB Lunges)", targetMuscle: "الجلوتس والكوادز", sets: 3, reps: "12 خطوة لكل رجل", restSec: 60, technique: "Normal", tempo: "2-0-1-0", defaultWeightKg: 16 },
          { id: "ppl3-4", name: "سمانة جالس (Seated Calf Raise)", targetMuscle: "السمانة العميقة (Soleus)", sets: 4, reps: "15", restSec: 45, technique: "Isometric Flex", tempo: "2-2-1-0", defaultWeightKg: 45 },
        ],
      },
    ],
  },
];

/**
 * 1-Rep Max Calculator (Brzycki & Epley Formula)
 * Calculates true 1RM and percentage intensity loads (60%, 70%, 80%, 85%, 90%)
 */
export function calculate1RM(weightKg: number, reps: number): {
  oneRepMaxBrzycki: number;
  oneRepMaxEpley: number;
  average1RM: number;
  intensityLevels: { percentage: number; targetWeightKg: number; repTarget: string }[];
} {
  if (reps <= 1) {
    const direct = weightKg;
    return {
      oneRepMaxBrzycki: direct,
      oneRepMaxEpley: direct,
      average1RM: direct,
      intensityLevels: [
        { percentage: 95, targetWeightKg: Math.round(direct * 0.95), repTarget: "2 عدات" },
        { percentage: 90, targetWeightKg: Math.round(direct * 0.90), repTarget: "3-4 عدات" },
        { percentage: 85, targetWeightKg: Math.round(direct * 0.85), repTarget: "5-6 عدات" },
        { percentage: 80, targetWeightKg: Math.round(direct * 0.80), repTarget: "7-8 عدات" },
        { percentage: 75, targetWeightKg: Math.round(direct * 0.75), repTarget: "9-10 عدات" },
        { percentage: 70, targetWeightKg: Math.round(direct * 0.70), repTarget: "11-12 عدة" },
      ],
    };
  }

  // Brzycki Formula: Weight / (1.0278 - (0.0278 * Reps))
  const brzycki = weightKg / (1.0278 - 0.0278 * reps);

  // Epley Formula: Weight * (1 + 0.0333 * Reps)
  const epley = weightKg * (1 + 0.0333 * reps);

  const avg = Math.round((brzycki + epley) / 2);

  return {
    oneRepMaxBrzycki: Math.round(brzycki),
    oneRepMaxEpley: Math.round(epley),
    average1RM: avg,
    intensityLevels: [
      { percentage: 95, targetWeightKg: Math.round(avg * 0.95), repTarget: "2 عدات (أقصى قوة)" },
      { percentage: 90, targetWeightKg: Math.round(avg * 0.90), repTarget: "3-4 عدات (قوة عضلية)" },
      { percentage: 85, targetWeightKg: Math.round(avg * 0.85), repTarget: "5-6 عدات (كثافة ميكانيكية)" },
      { percentage: 80, targetWeightKg: Math.round(avg * 0.80), repTarget: "7-8 عدات (تضخيم مكثف)" },
      { percentage: 75, targetWeightKg: Math.round(avg * 0.75), repTarget: "9-10 عدات (تضخيم مثالي)" },
      { percentage: 70, targetWeightKg: Math.round(avg * 0.70), repTarget: "11-12 عدة (ضخ دم وأوعية)" },
      { percentage: 65, targetWeightKg: Math.round(avg * 0.65), repTarget: "15+ عدة (تحمل وحرق)" },
    ],
  };
}
