export interface SupplementItem {
  id: string;
  nameAr: string;
  nameEn: string;
  category: "protein" | "creatine" | "preworkout" | "health" | "fatburn" | "intra";
  timing: string;
  dosage: string;
  benefits: string[];
  scientificMechanism: string;
  imageUrl: string;
  caution: string;
}

export const SUPPLEMENTS_DATABASE: SupplementItem[] = [
  {
    id: "whey-isolate",
    nameAr: "واي بروتين أيزوليت (Whey Isolate)",
    nameEn: "100% Whey Protein Isolate",
    category: "protein",
    timing: "مباشرة بعد التمرين أو بين الوجبات لرفع حصة البروتين",
    dosage: "سكوب واحد (25 - 30 جرام بروتين)",
    benefits: [
      "أسرع امتصاص بروتيني لدعم تخليق البروتين العضلي (MPS)",
      "شبه خالي من اللاكتوز والدهون والسكريات",
      "غني بالأحماض الأمينية متفرعة السلسلة BCAA و Leucine"
    ],
    scientificMechanism: "يتحلل بروتين مصل اللبن المعزول سريعاً لرفع مستويات الأحماض الأمينية في الدم إلى ذروتها خلال 45-60 دقيقة مما يحفز مسار mTOR للبناء العضلي.",
    imageUrl: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=600&q=80",
    caution: "لا يغني عن البروتين الطبيعي من الطعام، وهو وسيلة ملائمة لإكمال احتياجك اليومي."
  },
  {
    id: "creatine-monohydrate",
    nameAr: "كرياتين مونوهيدرات (Creatine Monohydrate)",
    nameEn: "Micronized Creatine Monohydrate",
    category: "creatine",
    timing: "أي وقت في اليوم بثبات يومي (مع مصدر كارب أو بروتين لزيادة الامتصاص)",
    dosage: "5 جرام يومياً (لا داعي لفترة التحميل، أو 20 جرام لمدة 5 أيام للتشبع السريع)",
    benefits: [
      "زيادة مخزون الفوسفوكرياتين لتجديد طاقة ATP السريعة",
      "زيادة القوة التفجيرية والرفع العضلي بنسبة 10-15%",
      "سحب المياه داخل الخلايا العضلية (Intracellular Hydration) مما يعطي حجماً وقوة"
    ],
    scientificMechanism: "الكرياتين هو المكمل الأكثر خضوعاً للأبحاث العلمية عالمياً، يزيد تركيز الفوسفوكرياتين في الألياف العضلية مما يسرع إعادة تصنيع أدينوسين ثلاثي الفوسفات (ATP) أثناء المجاميع عالية الكثافة.",
    imageUrl: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=600&q=80",
    caution: "احرص على شرب ما لا يقل عن 3.5 إلى 4 لتر ماء يومياً."
  },
  {
    id: "pre-workout",
    nameAr: "بري وورك آوت عالي التحفيز (Pre-Workout)",
    nameEn: "High-Stim Pre-Workout Matrix",
    category: "preworkout",
    timing: "20 - 30 دقيقة قبل بدء التمرين",
    dosage: "سكوب واحد (يحتوي 200 - 350mg كافيين + 6-8g سيترولين)",
    benefits: [
      "طاقة وتركيز ذهني عالي بفضل الكافيين والـ L-Tyrosine",
      "بمب وتدفق دم عنيف عبر توسيع الأوعية الدموية بالسيترولين مالات",
      "تأخير حمض اللاكتيك والتعب العضلي بواسطة البيتا ألانين (Beta-Alanine)"
    ],
    scientificMechanism: "L-Citrulline يحفز إنتاج أكسيد النيتريك (NO) مما يوسع الشرايين ويضخ الدم والأكسجين للعضلات، بينما يغلق الكافيين مستقبلات الأدينوزين العصبية لمقاومة الشعور بالإرهاق.",
    imageUrl: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=600&q=80",
    caution: "تجنب تناوله قبل النوم بـ 6 ساعات لتفادي الأرق، ولا تضاعف الجرعة تجنباً لخفقان القلب."
  },
  {
    id: "eaa-bcaa",
    nameAr: "أحماض أمينية أساسية (EAA & Intra-Workout)",
    nameEn: "Essential Amino Acids (EAAs)",
    category: "intra",
    timing: "أثناء جلسة التمرين (Intra-Workout) مذابة في ماء مثلج",
    dosage: "10 - 15 جرام أثناء التمرين",
    benefits: [
      "منع الهدم العضلي أثناء جلسات التمرين الطويلة والشاقة",
      "ترطيب العضلات مع إضافة الكهارل (Sodium & Potassium Electrolytes)",
      "تسريع الاستشفاء الفوري أثناء التمرين"
    ],
    scientificMechanism: "تحتوي على الأحماض الأمينية التسعة الأساسية التي لا يستطيع الجسم تخليقها داخلياً، مما يمنع تحلل النسيج العضلي للحصول على الطاقة.",
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
    caution: "مفيد جداً أثناء التنشيف والتمارين الصباحية على الريق."
  },
  {
    id: "omega3-fishoil",
    nameAr: "أوميجا 3 عالي التركيز (Omega-3 Fish Oil)",
    nameEn: "Triple Strength Omega-3 (EPA/DHA)",
    category: "health",
    timing: "مع وجبة دسمة تحتوي دهون صحية (مثل الفطور أو الغداء)",
    dosage: "2000 - 3000mg زيت سمك (تحتوي على الأقل 1000mg EPA و 500mg DHA)",
    benefits: [
      "تقليل التهابات المفاصل والأوتار الناتجة عن الأوزان الثقيلة",
      "دعم صحة القلب وخفض الدهون الثلاثية",
      "تحسين حساسية الإنسولين لامتصاص المغذيات داخل الخلايا العضلية"
    ],
    scientificMechanism: "أحماض EPA و DHA الدهنية تدخل في غشاء الخلية وتقلل إنتاج السيتوكينات المحفزة للالتهاب مثل TNF-alpha و IL-6.",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    caution: "اختر نوعيات نقية مفحوصة من المعادن الثقيلة (Molecularly Distilled)."
  },
  {
    id: "multivitamin-minerals",
    nameAr: "ملتي فيتامين ومعادن للرياضيين (Athlete Multi)",
    nameEn: "High-Potency Athlete Multi-Nutrient",
    category: "health",
    timing: "صباحاً بعد وجبة الإفطار",
    dosage: "حبة أو حبتين حسب تعليمات العلبة",
    benefits: [
      "سد أي نقص ميكروني في الدايت القاسي",
      "دعم المناعة مع فيتامين C، D3، والزنك",
      "تحسين إنتاج الطاقة الحيوية عبر مجموعة فيتامينات B المركبة"
    ],
    scientificMechanism: "تعمل الفيتامينات كعوامل مساعدة (Co-enzymes) لآلاف التفاعلات الكيميائية الحيوية داخل الخلايا لإنتاج الطاقة وإصلاح الأنسجة.",
    imageUrl: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=600&q=80",
    caution: "تناوله دائماً بعد الطعام لتفادي أي غثيان ناتج عن الزنك على معدة فارغة."
  }
];

export interface HanyRambodProtocol {
  id: string;
  muscle: string;
  nameAr: string;
  nameEn: string;
  overview: string;
  baseHeavyPhase: {
    exercise: string;
    setsReps: string;
    notes: string;
  }[];
  fst7Finisher: {
    exercise: string;
    sets: number;
    reps: string;
    restSeconds: number;
    intensityTechnique: string;
    hanyRambodQuote: string;
  };
}

export const HANY_RAMBOD_FST7_SYSTEM: HanyRambodProtocol[] = [
  {
    id: "fst7-chest",
    muscle: "الصدر (Chest)",
    nameAr: "بروتوكول FST-7 لتفجير عضلات الصدر وبناء الامتلاء",
    nameEn: "FST-7 Chest Annihilation",
    overview: "يبدأ بالدفع الثقيل لتكثيف الألياف العضلية، وينتهي بـ 7 مجاميع إطالة متتالية للغشاء الفاشي على جهاز الكابل أو الفراشة مع حبس الدم.",
    baseHeavyPhase: [
      { exercise: "تجميع عالي بالدمبلز (Incline DB Press)", setsReps: "3-4 مجموعات × 8-10 عدات", notes: "التحكم في النزول السلبي لـ 3 ثواني، ودفع متفجر" },
      { exercise: "بنش برس مستوي بالبار (Flat Barbell Bench)", setsReps: "3 مجموعات × 6-8 عدات", notes: "أوزان ثقيلة لزيادة الكثافة الميكانيكية" },
      { exercise: "متوازي بالوزن (Weighted Chest Dips)", setsReps: "3 مجموعات × 8-10 عدات", notes: "الميل للأمام للتركيز على عضلات الصدر السفلية" }
    ],
    fst7Finisher: {
      exercise: "تفتيح كابل أو جهاز الفراشة (Cable Crossover / Pec Deck)",
      sets: 7,
      reps: "10 - 12 تكرار",
      restSeconds: 30,
      intensityTechnique: "أثناء الـ 30 ثانية راحة: شد الصدر وثبات في وضعية Most Muscular Posing لمدة 10 ثواني لحبس الدم في الفاشيا.",
      hanyRambodQuote: "\"الفاشيا مثل البالونة المطاطية المشدودة، مجاميع الـ 7 مع الراحة القصيرة تملؤها بالدم حتى تجبرها على التمدد والنمو.\""
    }
  },
  {
    id: "fst7-back",
    muscle: "الظهر والمجنص (Back & Lats)",
    nameAr: "بروتوكول FST-7 لعرض الظهر والـ V-Taper الخارق",
    nameEn: "FST-7 3D Back Expansion",
    overview: "تركيز على سمك الظهر بالديدليفت والتجديف، ثم إنهاء الظهر بسحب الكابل ذراع مستقيمة أو السحب العالي لمد الفاشيا العريضة.",
    baseHeavyPhase: [
      { exercise: "عقلة بالوزن قبضة واسعة (Weighted Pull-ups)", setsReps: "3-4 مجموعات × 8-10 عدات", notes: "المد الكامل في القاع مع ثني الكوع للخلف" },
      { exercise: "تجديف بالبار قبضة مقلوبة (Reverse Grip Barbell Row)", setsReps: "3 مجموعات × 8-10 عدات", notes: "استهداف الجزء السفلي من اللاتس" },
      { exercise: "سحب أرضي كابل فردي (Single Arm Low Row)", setsReps: "3 مجموعات × 10-12 عدة", notes: "عصر اللاتس والوصول لأقصى انقباض" }
    ],
    fst7Finisher: {
      exercise: "سحب كابل ذراع مستقيمة (Straight-Arm Cable Pulldown)",
      sets: 7,
      reps: "10 - 12 تكرار",
      restSeconds: 30,
      intensityTechnique: "بين كل مجموعة والأخرى: إمساك عمود الراك وعمل إطالة عميقة للاتس (Lat Hang Stretch) لمدة 15 ثانية.",
      hanyRambodQuote: "\"الظهر يحتاج إلى تدفق دم مستمر؛ إذا لم تشعر بأن قميصك يكاد يتمزق من عرض اللاتس، فأنت لم تطبق الـ 7 بشكل صحيح!\""
    }
  },
  {
    id: "fst7-arms",
    muscle: "الذراعين (Biceps & Triceps)",
    nameAr: "بروتوكول FST-7 لتضخيم الباي والتراي",
    nameEn: "FST-7 Arm Hyper-Growth",
    overview: "سوپر سيت بين حركات التراي الثقيلة والباي، ثم 7 مجاميع متتالية لكل رأس عضلي لعزل الذراع كلياً.",
    baseHeavyPhase: [
      { exercise: "بنش قبضة ضيقة (Close Grip Bench Press)", setsReps: "3-4 مجموعات × 8 عدات", notes: "بناء كتلة الترايسبس الأساسية" },
      { exercise: "تبادل دمبلز واقف (Alternating DB Curls)", setsReps: "3-4 مجموعات × 8-10 عدات", notes: "تدوير المعصم (Supination) في قمة العدة" }
    ],
    fst7Finisher: {
      exercise: "ترايسبس بالحبل على الكابل (Rope Pushdown) + بايسبس كابل مزدوج (Overhead Cable Curl)",
      sets: 7,
      reps: "10 - 12 تكرار",
      restSeconds: 35,
      intensityTechnique: "عصر العضلة وثبات إيزومتري في القمة لثانيتين في كل عدة بدون أي راحة سلبية.",
      hanyRambodQuote: "\"الذراعين تستجيب للضغط الأسموزي وتدفق الدم الهائل أكثر من أي عضلة أخرى.\""
    }
  },
  {
    id: "fst7-legs",
    muscle: "الأرجل (Quads & Hamstrings)",
    nameAr: "بروتوكول FST-7 لفصل عضلات الفخذ وضخامة الأرجل",
    nameEn: "FST-7 Quad Separation",
    overview: "يبدأ بالاسكوات والهاك اسكوات الثقيل، ثم 7 مجاميع على جهاز فرد الأرجل (Leg Extension) لحرق الألياف ونحت التقسيمات.",
    baseHeavyPhase: [
      { exercise: "هاك اسكوات بالجهاز (Hack Squat)", setsReps: "3-4 مجموعات × 8-10 عدات", notes: "النزول لعمق 90 درجة مع دفع الكعبين" },
      { exercise: "ليج برس أقدام منخفضة (Leg Press Quads Focus)", setsReps: "3 مجموعات × 10-12 عدة", notes: "استمرار الشد بدون إقفال الركبة بالأعلى" },
      { exercise: "ديدليفت روماني بالدمبلز (Dumbbell RDL)", setsReps: "3 مجموعات × 10-12 عدة", notes: "إطالة الفخذ الخلفي والجلوتس" }
    ],
    fst7Finisher: {
      exercise: "فرد الأرجل بالجهاز (Leg Extension)",
      sets: 7,
      reps: "12 تكرار",
      restSeconds: 40,
      intensityTechnique: "بين كل مجموعة: شد الكوادز والوقوف في وضعية الفخذ الأمامي (Front Quad Pose) والتحمل.",
      hanyRambodQuote: "\"الـ FST-7 في الأرجل اختبار حقيقي للشخصية والقدرة العقلية على تحمل الألم البناء.\""
    }
  }
];
