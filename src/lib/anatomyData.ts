export interface MuscleGroup {
  id: string;
  nameAr: string;
  nameEn: string;
  view: "front" | "back";
  category: "push" | "pull" | "legs" | "core";
  description: string;
}

export interface AnatomyExercise {
  id: string;
  nameAr: string;
  nameEn: string;
  primaryMuscle: string;
  secondaryMuscles: string[];
  equipment: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  mechanics: "compound" | "isolation";
  tips: string[];
  mistakes: string[];
  view: "front" | "back";
}

export const MUSCLE_GROUPS: MuscleGroup[] = [
  { id: "chest", nameAr: "عضلات الصدر (Pectoralis)", nameEn: "Chest", view: "front", category: "push", description: "الصدر العلوي والأوسط والسفلي لقوة الدفع وحجم الجزء العلوي" },
  { id: "front-delts", nameAr: "الكتف الأمامي (Anterior Deltoid)", nameEn: "Front Delts", view: "front", category: "push", description: "مسؤول عن رفع الذراع للأمام وحركات الدفع العمودي" },
  { id: "side-delts", nameAr: "الكتف الجانبي (Lateral Deltoid)", nameEn: "Side Delts", view: "front", category: "push", description: "يعطي عرض وثلاثية الأبعاد للأكتاف على شكل حرف V" },
  { id: "biceps", nameAr: "البايسبس (Biceps Brachii)", nameEn: "Biceps", view: "front", category: "pull", description: "ثني مفصل الكوع وحركات السحب والتحكم بالساعد" },
  { id: "abs", nameAr: "عضلات البطن (Rectus Abdominis)", nameEn: "Abs & Core", view: "front", category: "core", description: "استقرار الجذع والعمود الفقري والمظهر المقسم" },
  { id: "obliques", nameAr: "عضلات الخواصر (Obliques)", nameEn: "Obliques", view: "front", category: "core", description: "الدوران الجانبي وحماية أسفل الظهر عند الرفع" },
  { id: "quads", nameAr: "الفخذ الأمامي (Quadriceps)", nameEn: "Quads", view: "front", category: "legs", description: "أقوى عضلات الساق لبسط الركبة والاسكوات" },
  { id: "traps", nameAr: "الترابيس (Trapezius)", nameEn: "Traps", view: "back", category: "pull", description: "دعم الرقبة وثبات لوحي الكتف ومظهر الظهر العلوي" },
  { id: "rear-delts", nameAr: "الكتف الخلفي (Posterior Deltoid)", nameEn: "Rear Delts", view: "back", category: "pull", description: "حماية مفصل الكتف وتوازن الجزء العلوي مع الصدر" },
  { id: "lats", nameAr: "عضلات المجنص (Latissimus Dorsi)", nameEn: "Lats", view: "back", category: "pull", description: "تعطي مظهر V-Taper العريض والجاذبية للجسم" },
  { id: "triceps", nameAr: "الترايسبس (Triceps Brachii)", nameEn: "Triceps", view: "back", category: "push", description: "تمثل ثلثي حجم الذراع وهي المحرك الرئيسي لفرد الذراع" },
  { id: "lower-back", nameAr: "أسفل الظهر (Erector Spinae)", nameEn: "Lower Back", view: "back", category: "pull", description: "عمود الأمان للجسم في الديدليفت والاسكوات" },
  { id: "glutes", nameAr: "عضلات المقعدة (Gluteus Maximus)", nameEn: "Glutes", view: "back", category: "legs", description: "أكبر عضلة لتوليد الطاقة الحركية ودفع الحوض" },
  { id: "hamstrings", nameAr: "الفخذ الخلفي (Hamstrings)", nameEn: "Hamstrings", view: "back", category: "legs", description: "ثني الركبة والوقاية من إصابات الرباط الصليبي" },
  { id: "calves", nameAr: "السمانة (Gastrocnemius & Soleus)", nameEn: "Calves", view: "back", category: "legs", description: "قوة الارتكاز والقفز وثبات القدمين" },
];

export const ANATOMY_EXERCISES_DATABASE: AnatomyExercise[] = [
  // CHEST
  {
    id: "ex-1",
    nameAr: "بنش برس مستوي بالبار",
    nameEn: "Flat Barbell Bench Press",
    primaryMuscle: "chest",
    secondaryMuscles: ["front-delts", "triceps"],
    equipment: "بار وأوزان أولمبية",
    difficulty: "intermediate",
    mechanics: "compound",
    tips: ["ضم لوحي الكتف للخلف والأسفل (Retraction & Depression)", "النزول بالبار لمنتصف الصدر مع كوع بزاوية 45-75 درجة"],
    mistakes: ["فتح الكوعين بزاوية 90 درجة مما يضغط أوتار الكتف", "ارتطام البار بعظمة القص"],
    view: "front"
  },
  {
    id: "ex-2",
    nameAr: "تجميع عالي بالدمبلز",
    nameEn: "Incline Dumbbell Press",
    primaryMuscle: "chest",
    secondaryMuscles: ["front-delts", "triceps"],
    equipment: "دمبلز ومقعد مائل 30°",
    difficulty: "beginner",
    mechanics: "compound",
    tips: ["زاوية المقعد المثالية 30 إلى 45 درجة فقط لعزل الجزء العلوي", "دفع الدمبلز بنصف قوس خفيف دون خبطهما بالأعلى"],
    mistakes: ["رفع المقعد لدرجة 60 مما يحول التمرين لتمرين أكتاف", "قوس مبالغ فيه في أسفل الظهر"],
    view: "front"
  },
  {
    id: "ex-3",
    nameAr: "تفتيح كابل سفلي للعلوي",
    nameEn: "Low-to-High Cable Flyes",
    primaryMuscle: "chest",
    secondaryMuscles: ["front-delts"],
    equipment: "كابل كروس",
    difficulty: "intermediate",
    mechanics: "isolation",
    tips: ["عصر الصدر العلوي في نهاية كل عدة لثانية واحدة", "الحفاظ على ثني خفيف وثابت في الكوعين طوال الحركة"],
    mistakes: ["استخدام وزن ثقيل يجبرك على أرجحة الجذع", "تغيير زاوية الكوع كأنه دفع بنش"],
    view: "front"
  },

  // FRONT & SIDE DELTS
  {
    id: "ex-4",
    nameAr: "رفرفة جانبي بالدمبلز",
    nameEn: "Dumbbell Lateral Raise",
    primaryMuscle: "side-delts",
    secondaryMuscles: ["traps"],
    equipment: "دمبلز خفيفة إلى متوسطة",
    difficulty: "beginner",
    mechanics: "isolation",
    tips: ["رفع الكوع بمستوى الكتف أو أعلى قليلاً في زاوية Scaption Plane", "التركيز على الدفع للخارج وليس للأعلى"],
    mistakes: ["استخدام أوزان ثقيلة وهز الوسط", "رفع اليد أعلى بكثير من الكوع"],
    view: "front"
  },
  {
    id: "ex-5",
    nameAr: "ضغط كتف بالدمبلز جالس",
    nameEn: "Seated Dumbbell Shoulder Press",
    primaryMuscle: "front-delts",
    secondaryMuscles: ["side-delts", "triceps"],
    equipment: "دمبلز ومقعد عمودي",
    difficulty: "beginner",
    mechanics: "compound",
    tips: ["إمالة المقعد درجة واحدة للخلف لحماية أوتار الكتف", "النزول حتى يصبح الدمبل بمستوى شحمة الأذن"],
    mistakes: ["الضغط بدون ثبات أسفل الظهر", "قفل الكوعين بقوة وعنف في الأعلى"],
    view: "front"
  },

  // BICEPS
  {
    id: "ex-6",
    nameAr: "بايسبس بار زجزاج واقف",
    nameEn: "EZ-Bar Biceps Curl",
    primaryMuscle: "biceps",
    secondaryMuscles: [],
    equipment: "بار EZ",
    difficulty: "beginner",
    mechanics: "isolation",
    tips: ["تثبيت الكوعين بجانب الجذع تماماً", "الصعود بتحكم مع عصر البايسبس في القمة"],
    mistakes: ["أرجحة الظهر واستخدام عزم الدفع", "تحريك الكوعين للأمام لمسافة كبيرة"],
    view: "front"
  },
  {
    id: "ex-7",
    nameAr: "تبادل دمبلز على مقعد مائل",
    nameEn: "Incline Dumbbell Curl",
    primaryMuscle: "biceps",
    secondaryMuscles: [],
    equipment: "دمبلز ومقعد مائل",
    difficulty: "intermediate",
    mechanics: "isolation",
    tips: ["يضع الرأس الطويل للبايسبس في أقصى إطالة ممكنة", "النزول لأسفل بفرد الذراع بشكل كامل تحت سيطرة"],
    mistakes: ["اختيار أوزان لا تسمح بالمد الحركي الكامل"],
    view: "front"
  },

  // ABS & CORE
  {
    id: "ex-8",
    nameAr: "رفع الأرجل معلق على العقلة",
    nameEn: "Hanging Leg Raise",
    primaryMuscle: "abs",
    secondaryMuscles: ["obliques"],
    equipment: "عقلة حرة",
    difficulty: "advanced",
    mechanics: "isolation",
    tips: ["تدوير الحوض للأعلى (Posterior Pelvic Tilt) وليس مجرد رفع الفخذين", "التحكم في النزول لتجنب المرجحة"],
    mistakes: ["استخدام عضلات الورم الحرقفي (Hip Flexors) فقط دون طي البطن"],
    view: "front"
  },

  // QUADS
  {
    id: "ex-9",
    nameAr: "اسكوات بار حر خلفي",
    nameEn: "Barbell Back Squat",
    primaryMuscle: "quads",
    secondaryMuscles: ["glutes", "hamstrings", "lower-back"],
    equipment: "راك وبار أولمبي",
    difficulty: "advanced",
    mechanics: "compound",
    tips: ["أخذ نفس بطني عميق وكتمه (Bracing / Valsalva)", "النزول مع الحفاظ على الركبتين باتجاه اتجاه أصابع القدم"],
    mistakes: ["دخول الركبتين للداخل (Knee Valgus)", "انحناء أسفل الظهر في قاع العدة (Butt Wink)"],
    view: "front"
  },
  {
    id: "ex-10",
    nameAr: "مد الساقين بالجهاز",
    nameEn: "Leg Extension",
    primaryMuscle: "quads",
    secondaryMuscles: [],
    equipment: "جهاز ليج إكستنشن",
    difficulty: "beginner",
    mechanics: "isolation",
    tips: ["ضبط محور الجهاز بالتوازي التام مع مفصل الركبة", "عصر الكوادز في الأعلى لمدة ثانية كاملة"],
    mistakes: ["النتر السريع بدون سيطرة سلبية في مرحلة النزول"],
    view: "front"
  },

  // BACK (LATS & TRAPS)
  {
    id: "ex-11",
    nameAr: "سحب عالي قبضة واسعة",
    nameEn: "Wide-Grip Lat Pulldown",
    primaryMuscle: "lats",
    secondaryMuscles: ["biceps", "rear-delts"],
    equipment: "جهاز سحب كابل عالي",
    difficulty: "beginner",
    mechanics: "compound",
    tips: ["سحب المقبض باتجاه أعلى الصدر مع إرجاع الكوعين للأسفل والخلف", "تخيل أنك تسحب بكوعك وليس بقبضة يدك"],
    mistakes: ["إرجاع الظهر للخلف بزاوية كبيرة كأنه تمرين تجديف", "سحب البار خلف الرقبة"],
    view: "back"
  },
  {
    id: "ex-12",
    nameAr: "تجديف بالبار منحني",
    nameEn: "Bent-Over Barbell Row",
    primaryMuscle: "lats",
    secondaryMuscles: ["traps", "rear-delts", "lower-back", "biceps"],
    equipment: "بار حر وأوزان",
    difficulty: "intermediate",
    mechanics: "compound",
    tips: ["ثني الجذع بزاوية 45 إلى 70 درجة مع ثبات الظهر مستقيماً", "سحب البار باتجاه السرة لعصر اللاتس"],
    mistakes: ["تقوس الظهر مما يعرض الفقرات القطنية لخطر كبير"],
    view: "back"
  },

  // TRICEPS
  {
    id: "ex-13",
    nameAr: "ترايسبس بالحبل على الكابل",
    nameEn: "Cable Rope Triceps Pushdown",
    primaryMuscle: "triceps",
    secondaryMuscles: [],
    equipment: "كابل وحبل تراي",
    difficulty: "beginner",
    mechanics: "isolation",
    tips: ["فرد الحبل للخارج في أسفل الحركة لعزل الرأس الجانبي", "تثبيت الكوعين بجانب الجسم دون أي تحرك"],
    mistakes: ["الميل بالأكتاف واستخدام وزن الجسم للدفع"],
    view: "back"
  },

  // HAMSTRINGS & GLUTES
  {
    id: "ex-14",
    nameAr: "ديدليفت روماني بالبار",
    nameEn: "Romanian Deadlift (RDL)",
    primaryMuscle: "hamstrings",
    secondaryMuscles: ["glutes", "lower-back"],
    equipment: "بار وأوزان",
    difficulty: "intermediate",
    mechanics: "compound",
    tips: ["دفع الحوض للخلف (Hip Hinge) مع الحفاظ على البار ملامساً للساق", "ثني خفيف جداً وثابت في الركبة"],
    mistakes: ["النزول كأنه اسكوات بدلاً من إرجاع الحوض للخلف", "تقوس العمود الفقري"],
    view: "back"
  },
  {
    id: "ex-15",
    nameAr: "ثني الساقين جالس بالجهاز",
    nameEn: "Seated Leg Curl",
    primaryMuscle: "hamstrings",
    secondaryMuscles: ["calves"],
    equipment: "جهاز ليج كيرل جالس",
    difficulty: "beginner",
    mechanics: "isolation",
    tips: ["الجلوس وثني الحوض للأمام قليلاً لزيادة استطالة الهامسترنج", "النزول البطيء والمقاومة السلبية"],
    mistakes: ["ارتفاع الفخذين عن المقعد أثناء الضغط"],
    view: "back"
  },

  // CALVES
  {
    id: "ex-16",
    nameAr: "رفع السمانة واقف بالجهاز",
    nameEn: "Standing Calf Raise",
    primaryMuscle: "calves",
    secondaryMuscles: [],
    equipment: "جهاز سمانة واقف أو سميث",
    difficulty: "beginner",
    mechanics: "isolation",
    tips: ["النزول في أقصى إطالة ممكنة والثبات ثانية في القاع", "الصعود على مشط القدمين بالكامل"],
    mistakes: ["النط السريع والمرونة المطاطية دون تحميل حقيقي على العضلة"],
    view: "back"
  }
];
