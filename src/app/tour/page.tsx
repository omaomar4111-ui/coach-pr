"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { 
  Bot, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  Check, 
  ArrowLeft, 
  Flame, 
  MessageSquare, 
  Dumbbell, 
  Apple, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle2, 
  X, 
  RotateCcw,
  Smartphone,
  Layers,
  Send,
  Mic,
  Calendar,
  AlertTriangle
} from "lucide-react";
import { playHapticBeep } from "@/lib/workoutCalculators";

interface TourStep {
  id: string;
  stepNum: number;
  totalSteps: number;
  view: "dash" | "phone";
  title: string;
  text: string;
  waitHint?: string;
  actionButtonText: string;
  spotlightRect?: {
    top: number | string;
    left: number | string;
    width: number | string;
    height: number | string;
  };
}

const STEPS: TourStep[] = [
  {
    id: "hello",
    stepNum: 1,
    totalSteps: 12,
    view: "dash",
    title: "أهلاً! ده يوم كابتن تامر",
    text: "ده حساب تجريبي فيه <b>30 عميل</b> ببيانات تجريبية: على اليمين لوحة التحكم الحقيقية، وعلى الشمال موبايل <b>كريم</b>، واحد من عملاءه، بالتطبيق الحقيقي. هوريك يوم مدرب في 3 دقايق، وتقدر تدوس وتعدّل في أي حاجة.",
    actionButtonText: "التالي",
  },
  {
    id: "queue",
    stepNum: 2,
    totalSteps: 12,
    view: "dash",
    title: "اليوم بيبدأ بقايمة واحدة",
    text: "بدل 147 رسالة واتساب: لوحة التحكم بتقولك كام حاجة مستنياك النهارده، الأهم الأول. متابعات، طلبات انضمام، فورم تشيك، ورسايل.",
    actionButtonText: "التالي",
    spotlightRect: { top: 220, left: "4%", width: "92%", height: 260 },
  },
  {
    id: "megatron",
    stepNum: 3,
    totalSteps: 12,
    view: "dash",
    title: "ميجاترون بيلاحظ قبلك",
    text: "مساعدك الذكي لاحظ إن <b>عمر</b> اختفى 8 أيام، وإن وزن <b>كريم</b> ثابت أسبوعين. وكاتبلك الرسالة كمان، وانت اللي بتقرر.",
    actionButtonText: "التالي",
    spotlightRect: { top: 70, left: "4%", width: "92%", height: 135 },
  },
  {
    id: "checkin-open",
    stepNum: 4,
    totalSteps: 12,
    view: "dash",
    title: "متابعة كريم وصلت الصبح",
    text: "كل عميل بيبعت متابعته الأسبوعية من التطبيق: الوزن والنوم والطاقة والمقاسات وكلامه هو. <b>دوس على متابعة كريم</b>.",
    waitHint: "دوس على متابعة كريم",
    actionButtonText: "متابعة كريم",
    spotlightRect: { top: 280, left: "4%", width: "92%", height: 55 },
  },
  {
    id: "checkin-reply",
    stepNum: 5,
    totalSteps: 12,
    view: "dash",
    title: "الـ AI بيكتب الرد… وانت بتراجعه",
    text: "الميزان ثابت بس الوسط نزل، يعني بيخسر دهون. دوس <b>«صياغة بالذكاء الاصطناعي»</b> يكتبلك رد على قد كلامه، عدّل فيه زي ما تحب، وبعدين <b>ابعته لكريم</b>.",
    waitHint: "ابعت الرد لكريم",
    actionButtonText: "ابعت الرد لكريم",
    spotlightRect: { top: 350, left: "6%", width: "88%", height: 170 },
  },
  {
    id: "plan-edit",
    stepNum: 6,
    totalSteps: 12,
    view: "dash",
    title: "عدّل خطة كريم في ثواني",
    text: "دي نسخة كريم الخاصة من خطة الدايت، والماكروز بتتحسب وانت بتكتب. قلّل الرز في <b>الغدا</b> شوية، وبعدين دوس <b>«احفظ وعيّن»</b>.",
    waitHint: "احفظ خطة كريم",
    actionButtonText: "احفظ خطة كريم",
    spotlightRect: { top: 120, left: "4%", width: "92%", height: 380 },
  },
  {
    id: "phone-update",
    stepNum: 7,
    totalSteps: 12,
    view: "phone",
    title: "وصلت على موبايل كريم",
    text: "ده التطبيق الحقيقي اللي عميلك بيستخدمه. أي تعديل في الخطة بيوصل لكريم على طول، وبيشوف إيه اللي اتغيّر بالظبط: الكمية قبل وبعد، ومين عدّل وإمتى.",
    actionButtonText: "التالي",
  },
  {
    id: "phone-log",
    stepNum: 8,
    totalSteps: 12,
    view: "phone",
    title: "جرّب كأنك كريم",
    text: "ده تمرين كريم النهارده في التطبيق. اختار مدة الجلسة وسجّل <b>أول مجموعة</b>: الوزن والعدّات بضغطة، وكل مجموعة بتوصل لوحة التحكم على طول.",
    waitHint: "سجّل مجموعة من الموبايل",
    actionButtonText: "سجّل المجموعة الأولى",
  },
  {
    id: "ten",
    stepNum: 9,
    totalSteps: 12,
    view: "dash",
    title: "يوم 10/10: درجة لكل يوم",
    text: "كل عميل بياخد درجة من 10 كل يوم، نصها تمرين ونصها أكل، والأيام الكاملة بتعمل سلسلة. دي آخر 30 يوم لـ<b>سارة</b>: ماشية 12 يوم كامل ورا بعض.",
    actionButtonText: "التالي",
    spotlightRect: { top: 220, left: "4%", width: "92%", height: 280 },
  },
  {
    id: "chat",
    stepNum: 10,
    totalSteps: 12,
    view: "dash",
    title: "الشات بعيد عن واتساب بتاعك",
    text: "كل عميل ليه شات بالڤويس نوت والصور. <b>ياسمين</b> بتسأل عن الرز. ردّ عليها من هنا، والرد بيوصلها في التطبيق.",
    waitHint: "ابعت رسالة لياسمين",
    actionButtonText: "ابعت رسالة لياسمين",
    spotlightRect: { top: 460, left: "10%", width: "80%", height: 60 },
  },
  {
    id: "money",
    stepNum: 11,
    totalSteps: 12,
    view: "dash",
    title: "والبيزنس كمان",
    text: "الالتزام والنشاط والإيراد المتوقع من باقاتك، والاشتراكات اللي قربت تخلص قبل ما العميل يمشي. (الأرقام هنا تجريبية.)",
    actionButtonText: "التالي",
    spotlightRect: { top: 260, left: "4%", width: "92%", height: 260 },
  },
  {
    id: "end",
    stepNum: 12,
    totalSteps: 12,
    view: "dash",
    title: "ده CoachPR",
    text: "شغل التدريب كله في مكان واحد: لوحة تحكم ليك، وتطبيق مجاني لكل عميل. كمّل استكشاف براحتك، أو ابدأ دلوقتي.",
    actionButtonText: "ابدأ دلوقتي 🚀",
  },
];

export default function ExactGymRateTourEngine() {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const currentStep = STEPS[currentStepIdx];
  const [activePaneView, setActivePaneView] = useState<"dash" | "phone">("dash");

  // Simulated Interactions
  const [karimReplied, setKarimReplied] = useState(false);
  const [riceGrams, setRiceGrams] = useState(200);
  const [firstSetLogged, setFirstSetLogged] = useState(false);
  const [chatMessageSent, setChatMessageSent] = useState(false);
  const [activeTabSub, setActiveTabSub] = useState<"overview" | "queue" | "plan" | "ten" | "chat" | "money">("overview");

  // Sync pane view with step
  useEffect(() => {
    if (currentStep.view) {
      setActivePaneView(currentStep.view);
    }
    // Contextual dashboard view switching
    if (currentStep.id === "hello" || currentStep.id === "queue" || currentStep.id === "megatron" || currentStep.id === "checkin-open") {
      setActiveTabSub("queue");
    } else if (currentStep.id === "checkin-reply") {
      setActiveTabSub("overview");
    } else if (currentStep.id === "plan-edit") {
      setActiveTabSub("plan");
    } else if (currentStep.id === "ten") {
      setActiveTabSub("ten");
    } else if (currentStep.id === "chat") {
      setActiveTabSub("chat");
    } else if (currentStep.id === "money") {
      setActiveTabSub("money");
    }
  }, [currentStepIdx]);

  const handleNext = () => {
    playHapticBeep(700, 100);
    if (currentStepIdx < STEPS.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    } else {
      confetti({ particleCount: 80, spread: 90, origin: { y: 0.6 } });
    }
  };

  const handlePrev = () => {
    playHapticBeep(500, 100);
    if (currentStepIdx > 0) {
      setCurrentStepIdx(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#090A09] text-[#F1F3EE] font-sans overflow-hidden select-none" dir="rtl">
      
      {/* 1. TOP BAR (Exact Header from Screenshot 1 & 2) */}
      <header className="fixed inset-x-0 top-0 h-[60px] z-30 flex items-center justify-between px-4 sm:px-6 bg-[#090A09]/95 border-b border-white/10 backdrop-blur-md">
        
        {/* Brand & Live Badge */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <img src="/pr-logo.png" alt="PR" className="h-7 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]" />
            <span className="font-heading font-black text-lg tracking-wider text-white">
              COACH<span className="text-[#A78BFA]">PR</span>
            </span>
          </Link>

          <span className="inline-flex items-center gap-1.5 h-6 px-2.5 rounded-lg border border-purple-500/40 text-[#A78BFA] font-bold text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-ping" />
            <span>تجريبي</span>
          </span>

          <span className="hidden md:inline text-xs text-slate-400 font-medium">
            كل لمسة وتغيير تجريبية · مفيش أي بيانات حقيقية
          </span>
        </div>

        {/* Action Chips */}
        <div className="flex items-center gap-2">
          <Link 
            href="/en"
            className="h-9 px-3 rounded-xl border border-white/15 text-xs font-bold hover:border-purple-400 text-slate-300 transition flex items-center"
          >
            EN
          </Link>

          <button
            onClick={() => {
              setCurrentStepIdx(0);
              setKarimReplied(false);
              setFirstSetLogged(false);
              playHapticBeep(440, 150);
            }}
            className="h-9 px-3 rounded-xl border border-white/15 text-xs font-bold hover:border-purple-400 text-slate-300 transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ابدأ من الأول</span>
          </button>

          <Link
            href="/#pricing"
            className="h-9 px-4 rounded-xl border border-[#7C3AED] bg-[#1A0E2E] hover:bg-[#251445] text-[#A78BFA] text-xs font-bold transition shadow-lg shadow-purple-950/60 flex items-center"
          >
            ابدأ دلوقتي
          </Link>
        </div>
      </header>

      {/* 2. STAGE: Split Layout (Dashboard Left/Main + Phone Right/Mirror) */}
      <main className="fixed inset-x-0 top-[60px] bottom-0 grid grid-cols-1 lg:grid-cols-[1fr_390px] gap-4 p-4 overflow-hidden">
        
        {/* ==================== LEFT / MAIN PANE: COACH DESKTOP DASHBOARD ==================== */}
        <section className={`relative rounded-2xl border border-white/10 bg-[#0F081D] overflow-hidden flex flex-col ${
          activePaneView === "dash" ? "block" : "hidden lg:flex"
        }`}>
          {/* Label Header */}
          <div className="h-10 px-4 bg-[#140C24] border-b border-white/10 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
              <span>لوحة التحكم · محاكاة لوحة التحكم الحقيقية</span>
            </span>
            <div className="flex items-center gap-2 text-[11px] font-mono text-purple-300">
              <span className="bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/30">كابتن تامر منصور</span>
            </div>
          </div>

          {/* Inner Dashboard Viewport */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 relative custom-scrollbar">
            
            {/* Top Stat Ribbon (Screenshot 2) */}
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-[#110A1E] rounded-xl border border-white/5">
                <span className="text-[10px] text-slate-400 block">العملاء النشطون</span>
                <span className="text-xl font-black text-white font-mono mt-0.5 block">29</span>
              </div>
              <div className="p-3 bg-[#110A1E] rounded-xl border border-white/5">
                <span className="text-[10px] text-slate-400 block">بانتظار المراجعة</span>
                <span className="text-xl font-black text-[#A78BFA] font-mono mt-0.5 block">15</span>
              </div>
              <div className="p-3 bg-[#110A1E] rounded-xl border border-white/5">
                <span className="text-[10px] text-slate-400 block">إيرادات الشهر</span>
                <span className="text-xl font-black text-white font-mono mt-0.5 block">4,200 <small className="text-xs font-normal">EGP</small></span>
              </div>
              <div className="p-3 bg-[#110A1E] rounded-xl border border-white/5">
                <span className="text-[10px] text-slate-400 block">متوسط الالتزام</span>
                <span className="text-xl font-black text-emerald-400 font-mono mt-0.5 block">86%</span>
              </div>
            </div>

            {/* Megatron Alert Card (Screenshot 2) */}
            <div className="p-4 rounded-2xl bg-[#140A26] border border-purple-500/40 flex items-start justify-between relative shadow-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#A78BFA] animate-ping" />
                  <h4 className="font-bold text-white text-xs">يحتاج 3 عملاء إلى تدخلك اليوم (ميجاترون: مساعد ذكي)</h4>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed max-w-xl">
                  مفيش تمرين ولا وجبة ولا متابعة من 8 أيام لـ <b>عمر حسان</b>، وما ردش على آخر رسالة. رسالة قصيرة شخصية غالباً بترجع العميل ده.
                </p>
              </div>
              <span className="text-[10px] bg-purple-900/60 text-purple-200 px-2 py-1 rounded-lg border border-purple-500/30 font-bold whitespace-nowrap">
                عرض التقرير ↗
              </span>
            </div>

            {/* Sub-Tab 1: Work Queue (Screenshot 1 & 3) */}
            {activeTabSub === "queue" && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between pb-1">
                  <h3 className="font-bold text-white text-xs">قائمة العمل (المتابعات وطلبات الانضمام)</h3>
                  <span className="text-[10px] text-[#A78BFA] font-bold">افتح الوارد ↗</span>
                </div>

                <div className="space-y-2 text-xs">
                  {/* Item 1: Mahmoud */}
                  <div className="p-3 rounded-xl bg-[#110A1E] border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[11px] text-slate-300">
                        MS
                      </div>
                      <div>
                        <span className="font-bold text-white block">Mahmoud Saber</span>
                        <span className="text-[10px] text-slate-400 font-mono">طلب انضمام · منذ ساعتين</span>
                      </div>
                    </div>
                    <button className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold">
                      مراجعة
                    </button>
                  </div>

                  {/* Item 2: Karim Galal (Highlighted in Screenshot 1 & 3) */}
                  <div className={`p-3 rounded-xl border transition-all ${
                    currentStep.id === "checkin-open"
                      ? "bg-[#1C0F35] border-[#A78BFA] shadow-[0_0_20px_rgba(167,139,250,0.3)] ring-1 ring-purple-400"
                      : "bg-[#110A1E] border-white/5"
                  } flex items-center justify-between`}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#7C3AED] flex items-center justify-center font-bold text-[11px] text-white">
                        KG
                      </div>
                      <div>
                        <span className="font-bold text-white block">Karim Galal (الأسبوع 13)</span>
                        <span className="text-[10px] text-emerald-400 font-mono">متابعة أسبوعية · الوزن 83.6 كجم (ثبات)</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setActiveTabSub("overview");
                        setCurrentStepIdx(4);
                        playHapticBeep(880, 200);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition shadow"
                    >
                      مراجعة ↗
                    </button>
                  </div>

                  {/* Item 3: Nour */}
                  <div className="p-3 rounded-xl bg-[#110A1E] border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[11px] text-slate-300">
                        NI
                      </div>
                      <div>
                        <span className="font-bold text-white block">Nour Ibrahim</span>
                        <span className="text-[10px] text-slate-400 font-mono">مراجعة أداء · منذ 10 ساعات</span>
                      </div>
                    </div>
                    <button className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold">
                      مراجعة
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-Tab 2: AI Reply Review (Screenshot 4) */}
            {activeTabSub === "overview" && (
              <div className="p-4 rounded-2xl bg-[#130B24] border border-purple-500/30 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="font-bold text-white text-sm">متابعة كريم جلال (الأسبوع 13)</span>
                  <span className="text-[10px] bg-purple-900/60 text-purple-200 px-2 py-0.5 rounded">ثبات وزن + حرق دهون</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
                  <div className="bg-black/40 p-2 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">الوزن الحالي</span>
                    <span className="text-white font-bold">83.6 كجم</span>
                  </div>
                  <div className="bg-black/40 p-2 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">الوسط</span>
                    <span className="text-emerald-400 font-bold">89.2 سم (-2سم)</span>
                  </div>
                  <div className="bg-black/40 p-2 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">النوم والطاقة</span>
                    <span className="text-[#A78BFA] font-bold">7.5 س · ممتاز</span>
                  </div>
                </div>

                {/* AI Draft Box (Exact Screenshot 4) */}
                <div className="p-3.5 rounded-xl bg-[#090412] border border-purple-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#A78BFA] font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>صياغة بالذكاء الاصطناعي (AI Draft):</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">ثبات وزن</span>
                  </div>

                  <p className="text-[11px] text-slate-200 leading-relaxed bg-[#140A26] p-2.5 rounded-lg border border-white/5">
                    &ldquo;عاش يا كريم، الميزان ثابت بس الوسط نزل، يعني بنخسر دهون وبنزود ألياف عضلية. زوّدنا كارب الغدا 50 جم رز عشان يديك طاقة تفجيرية في تمرين البنش النهارده.&rdquo;
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setKarimReplied(true);
                      confetti({ particleCount: 30, spread: 60 });
                      playHapticBeep(880, 200);
                      setCurrentStepIdx(5); // Go to plan edit
                    }}
                    className="w-full py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-950/60 transition"
                  >
                    {karimReplied ? "تم إرسال الرد لكريم بنجاح ✓" : "إبعت الرد لكريم"}
                  </button>
                </div>
              </div>
            )}

            {/* Sub-Tab 3: Diet Plan Editor (Screenshot 5 & 6) */}
            {activeTabSub === "plan" && (
              <div className="p-4 rounded-2xl bg-[#130B24] border border-purple-500/30 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="font-bold text-white text-sm">تعديل خطة دايت كريم (Lunch · وجبة الغداء)</span>
                  <span className="text-[10px] text-purple-300 font-mono">543 سعر · بروتين 74g · كارب 51g</span>
                </div>

                <div className="space-y-2 font-mono">
                  <div className="p-2.5 rounded-xl bg-black/40 flex items-center justify-between">
                    <span>صدور دجاج مشوية (Grilled Chicken)</span>
                    <span className="text-white font-bold">220 جم</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 flex items-center justify-between border border-purple-500/30">
                    <div>
                      <span className="block text-white">أرز أبيض مسلوق (Egyptian Rice)</span>
                      <span className="text-[10px] text-slate-400">كاربوهيدرات أساسية</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={riceGrams}
                        onChange={(e) => setRiceGrams(Number(e.target.value))}
                        className="w-20 bg-[#1A0E2E] border border-purple-500/50 rounded-lg px-2 py-1 text-center font-bold text-white outline-none"
                      />
                      <span className="text-[11px] text-slate-400">جم</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    confetti({ particleCount: 30, spread: 60 });
                    playHapticBeep(880, 200);
                    setCurrentStepIdx(6); // Go to phone update
                  }}
                  className="w-full py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs rounded-xl shadow-lg transition"
                >
                  احفظ خطة كريم وعيّن ↗
                </button>
              </div>
            )}

            {/* Sub-Tab 4: 10/10 Streak Grid (Screenshot 9) */}
            {activeTabSub === "ten" && (
              <div className="p-4 rounded-2xl bg-[#130B24] border border-purple-500/30 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <h4 className="font-bold text-white text-xs">أيام 10/10 · آخر 30 يوم (اللاعبة سارة أحمد)</h4>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">12 يوم متواصل 🔥</span>
                </div>

                <div className="grid grid-cols-10 gap-1 text-center font-mono text-[10px]">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div 
                      key={i}
                      className={`p-1.5 rounded-lg border ${
                        i < 12 
                          ? "bg-purple-950/80 border-[#7C3AED] text-[#A78BFA] font-bold" 
                          : "bg-black/30 border-white/5 text-slate-600"
                      }`}
                    >
                      {i < 12 ? "10" : i === 12 ? "8" : "10"}
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400">
                  كل يوم اللاعب بيأخذ تقييم من 10 بناءً على التزامه بالتمرين والسعرات وشرب الماء.
                </p>
              </div>
            )}

            {/* Sub-Tab 5: Chat (Screenshot 10) */}
            {activeTabSub === "chat" && (
              <div className="p-4 rounded-2xl bg-[#130B24] border border-purple-500/30 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="font-bold text-white text-xs">شات اللاعبة ياسمين طارق</span>
                  <span className="text-[10px] text-emerald-400 font-bold">متصل الآن 🟢</span>
                </div>

                <div className="p-3 bg-black/40 rounded-xl space-y-2 font-sans text-[11px]">
                  <div className="bg-[#1C0F35] p-2 rounded-lg max-w-xs text-slate-200">
                    مساء الخير كابتن، ينفع أبدل الرز بالبطاطس في الغدا النهارده؟
                  </div>
                  {chatMessageSent && (
                    <div className="bg-[#7C3AED] p-2 rounded-lg max-w-xs mr-auto text-white">
                      أكيد يا ياسمين، بدلي كل 100 جم رز بـ 150 جم بطاطس مسلوقة لنفس الماكروز!
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    defaultValue="أكيد يا ياسمين، بدلي كل 100 جم رز بـ 150 جم بطاطس مسلوقة..."
                    className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-purple-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setChatMessageSent(true);
                      playHapticBeep(880, 200);
                      setCurrentStepIdx(10); // Go to money
                    }}
                    className="px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold rounded-xl transition"
                  >
                    إرسال
                  </button>
                </div>
              </div>
            )}

            {/* Sub-Tab 6: Business Revenue (Screenshot 11 & 12) */}
            {activeTabSub === "money" && (
              <div className="p-4 rounded-2xl bg-[#130B24] border border-purple-500/30 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="font-bold text-white text-xs">تحليلات الإيراد المتوقع من الباقات النشطة</span>
                  <span className="text-[10px] text-[#A78BFA] font-mono">نوفمبر 2026</span>
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono text-center">
                  <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-slate-400 block text-[10px]">الإيراد الشهري</span>
                    <span className="text-lg font-black text-white mt-1 block">EGP 29,500</span>
                  </div>
                  <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-slate-400 block text-[10px]">الاشتراكات النشطة</span>
                    <span className="text-lg font-black text-[#A78BFA] mt-1 block">29 كابتن</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Dynamic Spotlight Overlay (Exact yellow/purple outline from screenshots) */}
          {currentStep.spotlightRect && (
            <div 
              className="absolute z-20 pointer-events-none rounded-2xl border-2 border-[#A78BFA] shadow-[0_0_0_9999px_rgba(0,0,0,0.55),0_0_25px_rgba(167,139,250,0.5)] transition-all duration-300 animate-pulse"
              style={{
                top: currentStep.spotlightRect.top,
                left: currentStep.spotlightRect.left,
                width: currentStep.spotlightRect.width,
                height: currentStep.spotlightRect.height,
              }}
            />
          )}
        </section>

        {/* ==================== RIGHT PANE: TRAINEE KARIM'S REAL PHONE (Screenshot 2, 7 & 8) ==================== */}
        <section className={`relative flex flex-col items-center justify-center ${
          activePaneView === "phone" ? "block" : "hidden lg:flex"
        }`}>
          {/* Label Header */}
          <div className="w-full text-center pb-2 text-xs font-mono text-slate-400">
            تطبيق كريم · محاكاة تطبيق المتدرب الحقيقي
          </div>

          {/* iPhone 15 Bezel & Hardware Simulation */}
          <div className="relative w-[340px] h-[660px] bg-[#050605] rounded-[52px] border-[7px] border-[#1C0F35] shadow-[0_0_50px_rgba(124,58,237,0.3)] p-3 flex flex-col justify-between overflow-hidden">
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#000000] rounded-full z-30" />

            {/* iOS Status Bar */}
            <div className="pt-4 px-4 flex items-center justify-between text-[11px] font-mono text-white/80 z-20">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2 rounded-xs border border-white/60 inline-block" />
              </div>
            </div>

            {/* App Viewport inside Phone */}
            <div className="flex-1 py-3 px-2 space-y-3 overflow-y-auto custom-scrollbar text-xs">
              
              {/* Phone Step 7: Plan Updates Received Alert (Screenshot 7) */}
              {currentStep.id === "phone-update" ? (
                <div className="p-3.5 rounded-2xl bg-[#140A26] border border-[#7C3AED] space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#A78BFA] font-bold">تحديثات الخطة (الآن)</span>
                    <span className="text-[9px] bg-purple-950 px-1.5 py-0.5 rounded text-slate-300">عدلها مدربك</span>
                  </div>
                  <h4 className="font-bold text-white text-xs">2 نوفمبر 2026 (الحالي)</h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    تم تعديل كمية أرز الغداء إلى <b>{riceGrams} جم</b> لزيادة الكاربوهيدرات بعد ملاحظة انخفاض محيط الوسط!
                  </p>
                </div>
              ) : (
                /* Phone Step 8: Workout Execution Logging (Screenshot 8) */
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-[#0E071A] border border-purple-500/30 space-y-2">
                    <span className="text-[10px] text-purple-300 font-mono block">Push Day · تمرين 1 من 6</span>
                    <h4 className="font-bold text-white text-xs">بنش برس مستوي بالبار</h4>
                    <span className="text-[10px] text-slate-400 font-mono block">الهدف: 85 كجم × 8 عدات</span>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setFirstSetLogged(!firstSetLogged);
                        confetti({ particleCount: 35, spread: 60 });
                        playHapticBeep(880, 200);
                        if (!firstSetLogged) {
                          setCurrentStepIdx(8); // Go to 10/10 step
                        }
                      }}
                      className={`w-full py-2 rounded-xl font-bold text-xs transition ${
                        firstSetLogged
                          ? "bg-[#7C3AED] text-white shadow"
                          : "bg-[#1A0E2E] border border-purple-500/40 text-[#A78BFA]"
                      }`}
                    >
                      {firstSetLogged ? "تم تسجيل المجموعة الأولى ✓" : "سجّل أول مجموعة بضغطة"}
                    </button>
                  </div>

                  {/* Daily 10/10 Status */}
                  <div className="p-3 rounded-2xl bg-[#0E071A] border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block text-xs">يومك 10/10</span>
                      <span className="text-[10px] text-slate-400">فاضل 2 تمرينة ووجبة</span>
                    </div>
                    <span className="text-sm font-black font-mono text-[#A78BFA]">4/10</span>
                  </div>
                </div>
              )}

            </div>

            {/* iOS Home Bar */}
            <div className="w-32 h-1 bg-white/40 rounded-full mx-auto my-1 z-20" />
          </div>
        </section>

      </main>

      {/* 3. Mobile Navigation Tabs (for small screens) */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 h-12 bg-[#090A09] border-t border-white/10 grid grid-cols-2 z-30">
        <button
          onClick={() => setActivePaneView("dash")}
          className={`font-bold text-xs transition ${
            activePaneView === "dash" ? "text-[#A78BFA] bg-purple-950/30" : "text-slate-400"
          }`}
        >
          لوحة التحكم (Coach)
        </button>
        <button
          onClick={() => setActivePaneView("phone")}
          className={`font-bold text-xs transition ${
            activePaneView === "phone" ? "text-[#A78BFA] bg-purple-950/30" : "text-slate-400"
          }`}
        >
          تطبيق كريم (App)
        </button>
      </nav>

      {/* 4. FLOATING GUIDE DIALOGUE BOX (Exact Layout from Screenshot 2) */}
      <aside className="fixed bottom-14 lg:bottom-6 left-4 lg:left-6 w-[calc(100vw-32px)] sm:w-[410px] z-40 bg-[#120B24]/95 border-2 border-[#7C3AED] rounded-3xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-md space-y-3 animate-fadeIn">
        
        {/* Header: Coach Avatar + Step Counter */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#1C0F35] border-2 border-[#A78BFA] overflow-hidden flex items-center justify-center shadow">
              <img src="/pr-logo.png" alt="CoachPR" className="w-6 h-6 object-contain" />
            </div>
            <div>
              <b className="font-bold text-white text-sm block">دليلك في CoachPR</b>
              <small className="text-[11px] text-purple-300 font-mono">جولة 3 دقائق</small>
            </div>
          </div>

          <span className="font-mono text-xs text-slate-400 font-bold">
            {currentStep.stepNum}/{currentStep.totalSteps}
          </span>
        </div>

        {/* Title & Body Text */}
        <div className="space-y-1">
          <h3 className="font-bold text-white text-base leading-snug">{currentStep.title}</h3>
          <p 
            className="text-xs text-slate-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: currentStep.text }}
          />
        </div>

        {/* Wait Hint if user needs to click something */}
        {currentStep.waitHint && (
          <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-500/30 text-[11px] text-[#A78BFA] font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A78BFA] animate-ping" />
            <span>المطلوب: {currentStep.waitHint}</span>
          </div>
        )}

        {/* Navigation Actions (Previous / Next) */}
        <div className="pt-2 border-t border-white/10 flex items-center gap-2">
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs shadow-lg shadow-purple-950/60 transition text-center"
          >
            {currentStep.actionButtonText}
          </button>

          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStepIdx === 0}
            className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition ${
              currentStepIdx === 0 
                ? "border-white/5 text-slate-600 cursor-not-allowed" 
                : "border-white/15 text-slate-300 hover:text-white"
            }`}
          >
            السابق
          </button>
        </div>

      </aside>

    </div>
  );
}
