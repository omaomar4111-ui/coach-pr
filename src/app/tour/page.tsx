"use client";

import React, { useState } from "react";
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
  HelpCircle,
  Smartphone,
  Layers,
  Send,
  Mic,
  Calendar,
  AlertTriangle
} from "lucide-react";
import { playHapticBeep } from "@/lib/workoutCalculators";

interface TourStep {
  stepNumber: number;
  badge: string;
  title: string;
  description: string;
  actionText: string;
  targetFocus: "none" | "megatron_alert" | "inbox_check" | "ai_reply" | "nutrition_calc" | "mobile_sync" | "workout_1010" | "chat_voice" | "analytics_revenue";
}

const TOUR_STEPS: TourStep[] = [
  {
    stepNumber: 1,
    badge: "1/8 · نظرة عامة",
    title: "مساعدك الذكي ميجاترون (AI Copilot)",
    description: "ميجاترون بيفحص بيانات كل اللاعبين لحظياً ويقولك مين اختفى ومين محتاجك ومين وزنه ثابت، وبيرتب يومك بالأهم الأول.",
    actionText: "التالي",
    targetFocus: "megatron_alert",
  },
  {
    stepNumber: 2,
    badge: "2/8 · الوارد اليومي",
    title: "قائمة الشغل والمتابعات المعلقة",
    description: "كل طلبات الانضمام والمتابعات الأسبوعية بتنزل هنا في طابور واحد منظم حسب الأولوية وتاريخ الإرسال.",
    actionText: "افحص متابعة كريم",
    targetFocus: "inbox_check",
  },
  {
    stepNumber: 3,
    badge: "3/8 · صياغة الرد بالـ AI",
    title: "الـ AI يكتب الرد وأنت تراجعه وتعتمد",
    description: "الميزان نزل 100 جم بس الوسط نزل 2 سم؟ الـ AI فاهم الفرق وبيكتبلك رد علمي مشجع ومحدد، تراجعه وتعدل عليه أو تبعته بلمسة واحدة.",
    actionText: "اعتماد الرد وإرساله لكريم",
    targetFocus: "ai_reply",
  },
  {
    stepNumber: 4,
    badge: "4/8 · منشئ خطط الدايت",
    title: "تعديل الماكروز وحساب الجرامات في ثوانٍ",
    description: "كل تعديل في جرامات الأرز أو صدور الدجاج بيحسب السعرات والماكروز تلقائياً وانت بتكتب، مع بدائل محسوبة لكل وجبة.",
    actionText: "حفظ خطة كريم",
    targetFocus: "nutrition_calc",
  },
  {
    stepNumber: 5,
    badge: "5/8 · المزامنة الفورية",
    title: "الخطة وصلت فوراً على موبايل كريم",
    description: "تطبيق كريم بيستقبل التعديل فوراً بدون ما تبعت له PDF أو ملفات واتساب، ويقدر يقارن بين الخطة الحالية والسابقة.",
    actionText: "شوف شاشة كريم",
    targetFocus: "mobile_sync",
  },
  {
    stepNumber: 6,
    badge: "6/8 · نظام يوم 10/10 والستريك",
    title: "تقييم التزام اللاعب وسلسلة الأيام",
    description: "كل لاعب بياخد تقييم من 10 كل يوم بناءً على التمرين، الوجبات، وشرب الماء. انت شايف مين ماشي بانتظام ومين محتاج تشجيع.",
    actionText: "التالي",
    targetFocus: "workout_1010",
  },
  {
    stepNumber: 7,
    badge: "7/8 · الشات المباشر المخصص",
    title: "شات منظم بعيداً عن فوضى الواتساب",
    description: "شات خاص لكل عميل بالصور والڤويس نوتس، متاح فيه ملخص المحادثة بالـ AI والردود السريعة المحفوظة للكوتش.",
    actionText: "التالي",
    targetFocus: "chat_voice",
  },
  {
    stepNumber: 8,
    badge: "8/8 · بيزنس التدريب والأرباح",
    title: "تحليلات الإيرادات والاشتراكات المتوقعة",
    description: "شايف دخلك الشهري كام، مين اشتراكه قرب يخلص لتجديده بضغطة، والتجميد الذكي للاشتراكات في السفر والإصابات.",
    actionText: "ابدأ الآن في CoachPR",
    targetFocus: "analytics_revenue",
  },
];

export default function InteractiveTourPage() {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const currentStep = TOUR_STEPS[currentStepIdx];

  // Simulated Coach State inside Tour
  const [simulatedReplied, setSimulatedReplied] = useState(false);
  const [riceGrams, setRiceGrams] = useState(200);

  const handleNextStep = () => {
    playHapticBeep(650, 120);
    if (currentStepIdx < TOUR_STEPS.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    } else {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    }
  };

  const handlePrevStep = () => {
    playHapticBeep(500, 100);
    if (currentStepIdx > 0) {
      setCurrentStepIdx(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#07040D] text-white font-sans flex flex-col select-none overflow-x-hidden" dir="rtl">
      
      {/* Top Interactive Tour Bar */}
      <header className="h-14 border-b border-white/[0.06] bg-[#0A0514]/90 backdrop-blur sticky top-0 z-50 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <img src="/pr-logo.png" alt="PR" className="h-7 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]" />
            <span className="font-heading font-black text-sm tracking-wide text-white">
              COACH<span className="text-[#A78BFA]">PR</span>
            </span>
          </Link>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#7C3AED]/20 border border-purple-500/40 text-[#A78BFA]">
            جولة محاكاة تفاعلية (Interactive Tour)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentStepIdx(0)}
            className="text-[11px] px-3 py-1 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 transition"
          >
            ابدأ من الأول
          </button>
          <Link
            href="/#pricing"
            className="text-[11px] font-bold px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-lg shadow-purple-950/60 transition"
          >
            اشترك دلوقتي
          </Link>
        </div>
      </header>

      {/* Main Simulation Viewport (Split Desktop Simulator + Mobile Phone Simulator) */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto p-3 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* LEFT COLUMN: Simulated Athlete's Live Mobile Phone (3 Columns) */}
        <div className="hidden lg:flex lg:col-span-4 justify-center sticky top-20">
          <div className="relative w-[310px] h-[640px] bg-[#05020A] rounded-[44px] border-[6px] border-[#1C0F35] shadow-[0_0_40px_rgba(124,58,237,0.25)] p-3 flex flex-col justify-between overflow-hidden">
            {/* Phone Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#1C0F35] rounded-full z-30" />

            {/* Mobile Header */}
            <div className="pt-5 px-3 flex items-center justify-between border-b border-white/[0.04] pb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#7C3AED] flex items-center justify-center text-xs font-bold">
                  ك
                </div>
                <div>
                  <span className="text-[11px] font-bold text-white block">مساء الخير يا كريم</span>
                  <span className="text-[9px] text-slate-400 font-mono">السبت 14 نوفمبر</span>
                </div>
              </div>
              <span className="text-[10px] text-[#A78BFA] font-bold font-mono">10/10 🔥</span>
            </div>

            {/* Mobile Content Display Based on Step */}
            <div className="flex-1 py-3 px-2 space-y-3 overflow-y-auto custom-scrollbar text-xs">
              
              {/* Push Workout Card */}
              <div className="p-3.5 rounded-2xl bg-[#0D061A] border border-purple-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-purple-300 font-mono">تمرينة النهاردة · 45 دقيقة</span>
                  <span className="text-[9px] bg-purple-500/20 text-[#A78BFA] px-1.5 py-0.5 rounded font-bold">FST-7</span>
                </div>
                <h4 className="font-bold text-white text-sm">Push Day (صدر علوي وترايسبس)</h4>
                
                <div className="space-y-1.5 pt-1 text-[11px] font-mono">
                  <div className="flex items-center justify-between bg-black/40 p-1.5 rounded-lg">
                    <span>1. بنش برس بالبار</span>
                    <span className="text-[#A78BFA]">85kg x 8 reps ✓</span>
                  </div>
                  <div className="flex items-center justify-between bg-black/40 p-1.5 rounded-lg">
                    <span>2. تجميع دمبلز عالي</span>
                    <span className="text-slate-400">30kg x 10 reps</span>
                  </div>
                </div>
              </div>

              {/* Diet Macros Card */}
              <div className="p-3.5 rounded-2xl bg-[#0D061A] border border-white/[0.05] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">وجباتك اليومية</span>
                  <span className="font-mono text-purple-300 text-[10px]">2,350 kcal</span>
                </div>

                <div className="grid grid-cols-3 gap-1 text-center font-mono text-[10px]">
                  <div className="bg-black/40 p-1.5 rounded-lg">
                    <span className="text-slate-400 block text-[9px]">بروتين</span>
                    <span className="text-[#A78BFA] font-bold">185g</span>
                  </div>
                  <div className="bg-black/40 p-1.5 rounded-lg">
                    <span className="text-slate-400 block text-[9px]">كارب</span>
                    <span className="text-white font-bold">{Math.round(riceGrams * 0.28 + 150)}g</span>
                  </div>
                  <div className="bg-black/40 p-1.5 rounded-lg">
                    <span className="text-slate-400 block text-[9px]">دهون</span>
                    <span className="text-slate-400 font-bold">55g</span>
                  </div>
                </div>
              </div>

              {/* Coach Chat Notification */}
              <div className="p-3 rounded-2xl bg-[#140A26] border border-purple-500/40 text-[11px] space-y-1">
                <span className="text-[#A78BFA] font-bold flex items-center gap-1 text-[10px]">
                  <span>رسالة الكابتن تامر:</span>
                </span>
                <p className="text-slate-200 leading-relaxed text-[10px]">
                  {simulatedReplied 
                    ? "عاش يا كريم، نزول 2 سم في الوسط مع ثبات الوزن معناه زيادة كثافة عضلية حقيقية! زوّدنا كارب الغدا 50 جم."
                    : "جاهز لتمرينة النهاردة؟ افتح التايمر وركّز في التمبو السلبي."}
                </p>
              </div>

            </div>

            {/* Mobile Footer Status */}
            <div className="text-center py-2 text-[9px] text-slate-500 border-t border-white/[0.04] font-mono">
              CoachPR Athlete App · متزامن فورياً
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Simulated Coach Dashboard (8 Columns) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Dashboard Header Simulator */}
          <div className="p-4 rounded-3xl bg-[#0E071A] border border-white/[0.06] flex items-center justify-between">
            <div>
              <span className="text-[11px] text-purple-300 font-mono block">لوحة تحكم المدرب · Coach Hub</span>
              <h1 className="text-lg font-black text-white mt-0.5">مساء الخير، كابتن تامر منصور</h1>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-[#170B2E] border border-purple-500/30 text-purple-200 text-xs font-bold font-mono">
                29 لاعب نشط · 4,200 EGP هذا الأسبوع
              </span>
            </div>
          </div>

          {/* 1. Megatron Alert Card (Step 1 Highlight) */}
          <div className={`p-4 rounded-3xl transition-all duration-300 border ${
            currentStep.targetFocus === "megatron_alert"
              ? "bg-[#160B2C] border-[#A78BFA] ring-2 ring-purple-500/50 shadow-2xl shadow-purple-950/80 scale-[1.01]"
              : "bg-[#0E071A] border-white/[0.05]"
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-[#7C3AED] flex items-center justify-center shadow-lg shadow-purple-950">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">ميجاترون يلاحظ قبلك (AI Radar)</h3>
                  <span className="text-[11px] text-purple-300">يوجد 3 عملاء يحتاجون لتدخلك اليوم</span>
                </div>
              </div>

              <span className="text-[10px] font-mono bg-purple-950/60 text-[#A78BFA] px-2.5 py-1 rounded-xl border border-purple-500/30">
                تنبيه ذكي فوري
              </span>
            </div>

            <p className="mt-3 text-xs text-slate-300 leading-relaxed bg-[#080310] p-3 rounded-2xl border border-white/[0.04]">
              ⚠️ <b>عمر حسان</b> مختفي بقاله 8 أيام ومفيش ولا وجبة مسجلة. جهزتلك رسالة شخصية قصيرة تبعتهاله على الواتساب بضغطة زر لإعادته للالتزام.
            </p>
          </div>

          {/* 2. Today's Pending Work / Inbox (Step 2 & 3 Highlight) */}
          <div className={`p-4 rounded-3xl transition-all duration-300 border ${
            currentStep.targetFocus === "inbox_check" || currentStep.targetFocus === "ai_reply"
              ? "bg-[#160B2C] border-[#A78BFA] ring-2 ring-purple-500/50 shadow-2xl shadow-purple-950/80 scale-[1.01]"
              : "bg-[#0E071A] border-white/[0.05]"
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#A78BFA]" />
                <h3 className="font-bold text-white text-sm">قائمة العمل والمتابعات المعلقة (Inbox)</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">4 في الانتظار</span>
            </div>

            <div className="space-y-2 mt-3 text-xs">
              
              {/* Karim's Checkin Item */}
              <div className="p-3.5 rounded-2xl bg-[#090412] border border-purple-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold text-white">كريم جلال (متابعة أسبوعية)</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">الوزن: 83.6 كجم (ثبات) · المحيط: -2 سم</span>
                </div>

                {/* AI Drafted Reply Box (Step 3) */}
                <div className="p-3 rounded-xl bg-[#120722] border border-purple-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#A78BFA] font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>صياغة الرد بالذكاء الاصطناعي (AI Draft):</span>
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">جاهز للمراجعة</span>
                  </div>

                  <p className="text-[11px] text-slate-200 leading-relaxed">
                    &ldquo;عاش يا بطل! الميزان ثابت بس محيط الوسط نزل 2 سم، ده معناه إننا بنحرق دهون وبنبني عضلات صافية. هنرفع كارب وجبة الغدا 50 جم رز إضافي عشان نشاطك في التمرين.&rdquo;
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setSimulatedReplied(true);
                        confetti({ particleCount: 30, spread: 50 });
                        playHapticBeep(880, 200);
                      }}
                      className="py-1.5 px-3 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs transition shadow flex items-center gap-1.5"
                    >
                      <Send className="w-3 h-3" />
                      <span>{simulatedReplied ? "تم إرسال الرد لكريم ✓" : "اعتماد وإرسال الرد لكريم"}</span>
                    </button>
                    <button
                      type="button"
                      className="py-1.5 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 text-xs font-bold transition"
                    >
                      تعديل النص
                    </button>
                  </div>
                </div>
              </div>

              {/* Other mock athletes */}
              <div className="p-2.5 rounded-xl bg-[#090412] border border-white/[0.04] flex items-center justify-between opacity-60">
                <span>محمود صابر · طلب انضمام جديد (باقة 3 شهور)</span>
                <span className="text-[10px] text-purple-300">مراجعة ↗</span>
              </div>
            </div>
          </div>

          {/* 3. Nutrition Builder & Auto Macro Calc (Step 4 Highlight) */}
          <div className={`p-4 rounded-3xl transition-all duration-300 border ${
            currentStep.targetFocus === "nutrition_calc"
              ? "bg-[#160B2C] border-[#A78BFA] ring-2 ring-purple-500/50 shadow-2xl shadow-purple-950/80 scale-[1.01]"
              : "bg-[#0E071A] border-white/[0.05]"
          }`}>
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.04]">
              <div className="flex items-center gap-2">
                <Apple className="w-4 h-4 text-[#A78BFA]" />
                <h3 className="font-bold text-white text-sm">منشئ خطة الدايت (Live Macro Engine)</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">وجبة 2: الغداء قبل التمرين</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#090412] border border-white/[0.05] space-y-3 mt-3 text-xs">
              <div className="grid grid-cols-2 gap-3 items-center">
                <div>
                  <span className="text-slate-400 block mb-1">أرز أبيض مسلوق (جرام):</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step={25}
                      value={riceGrams}
                      onChange={(e) => setRiceGrams(Number(e.target.value))}
                      className="bg-[#120724] border border-white/[0.08] rounded-xl px-3 py-1.5 text-white font-mono font-bold w-28 outline-none focus:border-[#7C3AED]"
                    />
                    <span className="text-[11px] text-purple-300">جرام</span>
                  </div>
                </div>

                <div className="bg-[#140A26] p-2.5 rounded-xl border border-purple-500/20 text-center font-mono">
                  <span className="text-[10px] text-slate-400 block">الكارب المحسوب في ثانية:</span>
                  <span className="text-base font-black text-[#A78BFA]">{Math.round(riceGrams * 0.28)}g Carbs</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400">
                💡 كل ما تغير كمية الجرامات، الماكروز الإجمالية بتتحسب وتنعكس في ثوانٍ على شاشة اللاعب.
              </p>
            </div>
          </div>

          {/* 4. Business & Analytics (Step 8 Highlight) */}
          <div className={`p-4 rounded-3xl transition-all duration-300 border ${
            currentStep.targetFocus === "analytics_revenue"
              ? "bg-[#160B2C] border-[#A78BFA] ring-2 ring-purple-500/50 shadow-2xl shadow-purple-950/80 scale-[1.01]"
              : "bg-[#0E071A] border-white/[0.05]"
          }`}>
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.04]">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#A78BFA]" />
                <h3 className="font-bold text-white text-sm">بيزنس المدرب والأرباح المتوقعة</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">نوفمبر 2026</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 mt-3 text-center font-mono text-xs">
              <div className="p-3 bg-[#090412] rounded-2xl border border-white/[0.04]">
                <span className="text-[10px] text-slate-400 block">الإيراد المحصل</span>
                <span className="text-base font-black text-white mt-0.5 block">29,500 EGP</span>
              </div>
              <div className="p-3 bg-[#090412] rounded-2xl border border-white/[0.04]">
                <span className="text-[10px] text-slate-400 block">الاشتراكات النشطة</span>
                <span className="text-base font-black text-[#A78BFA] mt-0.5 block">29 كابتن</span>
              </div>
              <div className="p-3 bg-[#090412] rounded-2xl border border-white/[0.04]">
                <span className="text-[10px] text-slate-400 block">المتوقع نهاية الشهر</span>
                <span className="text-base font-black text-purple-300 mt-0.5 block">42,000 EGP</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Floating Tour Guide Dialogue Box (Bottom Right/Center) */}
      <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:right-6 sm:w-96 z-50 bg-[#140A26]/95 backdrop-blur-md border-2 border-[#7C3AED] rounded-3xl p-5 shadow-2xl shadow-purple-950/90 space-y-3 animate-fadeIn">
        
        {/* Step Badge & Controls */}
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#7C3AED] text-white">
            {currentStep.badge}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIdx === 0}
              className={`p-1.5 rounded-xl border text-xs transition ${
                currentStepIdx === 0 
                  ? "border-white/[0.04] text-slate-600 cursor-not-allowed" 
                  : "border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextStep}
              className="p-1.5 rounded-xl border border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.05] transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div>
          <h3 className="font-bold text-white text-sm">{currentStep.title}</h3>
          <p className="text-xs text-slate-300 leading-relaxed mt-1">
            {currentStep.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between gap-2">
          {currentStepIdx < TOUR_STEPS.length - 1 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-950/60 transition flex items-center justify-center gap-1"
            >
              <span>{currentStep.actionText}</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          ) : (
            <Link
              href="/#pricing"
              className="w-full py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-950/60 transition text-center"
            >
              انضم دلوقتي لـ CoachPR 🚀
            </Link>
          )}
        </div>
      </div>

    </div>
  );
}
