"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Smartphone, 
  Monitor, 
  RotateCcw, 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Users, 
  Dumbbell, 
  Utensils, 
  Activity, 
  Sparkles, 
  MessageSquare, 
  ShieldCheck, 
  Video, 
  Flame,
  Check,
  ChevronRight,
  TrendingUp,
  Award
} from "lucide-react";

interface Step {
  id: string;
  view: "dash" | "phone" | "split";
  title: string;
  badge: string;
  description: string;
  coachAction: string;
  traineeAction: string;
}

const tourSteps: Step[] = [
  {
    id: "welcome",
    view: "split",
    badge: "نظرة عامة على النظام",
    title: "مرحباً بك في CoachPR — محاكاة تفاعلية حية",
    description: "شاهد كيف تبدو تجربة التدريب الاحترافية المتكاملة: على اليمين لوحة تحكم الكوتش لإدارة كل تفاصيل التدريب، وعلى اليسار تطبيق المتدرب (الموبايل) بتجربة فائقة الفخامة.",
    coachAction: "لوحة تحكم الكوتش (Dark Luxury) مدمجة بالذكاء الاصطناعي وبنك التمارين والأغذية الكامل.",
    traineeAction: "تطبيق موبايل تفاعلي وسهل للمتدرب لتسجيل التمارين وتناول الوجبات ورفع فيديوهات التكنيك."
  },
  {
    id: "workout_builder",
    view: "dash",
    badge: "بناء الجداول التدريبية",
    title: "إنشاء الخطة التدريبية وتخصيص الأحمال",
    description: "اختر التمارين من بنك يضم أكثر من 150 تمريناً ثلاثي الأبعاد أو فيديوهات حقيقية. حدد الـ Sets, Reps, RPE وفترات الراحة بكل سهولة وانسخها فوراً للمشتركين.",
    coachAction: "الكوتش يصمم جدول Push-Pull-Legs ويرسله لكريم بضغطة زر واحدة.",
    traineeAction: "يصل إشعار فوري على موبايل كريم بالجدول الجديد جاهزاً للتنفيذ في الجيم."
  },
  {
    id: "trainee_execution",
    view: "phone",
    badge: "تجربة المتدرب في الجيم",
    title: "متابعة تمرين اليوم وتدوين الأوزان",
    description: "يدخل المتدرب الجيم، يشاهد توجيهات الكوتش، ويسجل الأوزان والعدات فعلياً مع مؤقت راحة ذكي مدمج يسجل تقدمه (PRs) تلقائياً.",
    coachAction: "الكوتش يشاهد فوراً على لوحة التحكم إتمام المتدرب للتمرين وتحقيق رقم قياسي جديد.",
    traineeAction: "كريم سجل بنش برس 120 كجم لـ 6 عدات، ورفع نسبة الالتزام لليوم."
  },
  {
    id: "form_check",
    view: "split",
    badge: "الذكاء الاصطناعي ومراجعة التكنيك",
    title: "تصحيح الأداء وملاحظات الفيديو الصوتية",
    description: "يرفع المتدرب فيديو أدائه لتمرين معقد (مثل السكوات)، ليقوم الكوتش بالتعليق عليه صوتياً أو بنقاط زمنية محددة لضمان أقصى سلامة وتطور.",
    coachAction: "تسجيل فويس نوت للكوتش على التكنيك: 'ممتاز يا كريم، بس ركّز على دفع الركبتين للخارج في آخر النزول'.",
    traineeAction: "يستمع كريم لملاحظة الكوتش الصوتية عند الثانية 0:04 من الفيديو مباشرة."
  },
  {
    id: "nutrition_proofs",
    view: "phone",
    badge: "الالتزام الغذائي والصور",
    title: "متابعة الماكروز وبطاقات إثبات الوجبات",
    description: "لا حاجة لرسائل واتساب عشوائية؛ المتدرب يرفع صورة وجبته فوراً مع تسجيل الماكروز، وتظهر داخل ملفه الصحي المنظم.",
    coachAction: "لوحة التحكم تحتسب تلقائياً نسبة التزام كريم بالدايت لليوم (10/10).",
    traineeAction: "كريم يصور وجبة الغداء: صدور دجاج وأرز وخضار، ويؤكد الالتزام بالسعرات."
  },
  {
    id: "client_attention",
    view: "dash",
    badge: "رادار المتابعة والذكاء الاصطناعي",
    title: "قائمة الانتباه السريع (Coach Attention Queue)",
    description: "النظام ينبهك تلقائياً لمن يحتاج انتباهك: من تأخر في التشيك إن، من واجه إصابة أو ألم بالمفاصل، ومن اقترب اشتراكه من الانتهاء لتجديده.",
    coachAction: "إرسال مسودة رد جاهزة بضغطة واحدة تم إنشاؤها عبر الذكاء الاصطناعي.",
    traineeAction: "تلقي تذكير ودود يضمن عدم انقطاعه عن التدريب واستمرارية اشتراكه."
  }
];

export default function InteractiveTourPage() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"both" | "coach" | "trainee">("both");
  const [simulatedScore, setSimulatedScore] = useState(94);
  const [completedActions, setCompletedActions] = useState<string[]>([]);

  const currentStep = tourSteps[activeStepIndex];

  const handleNext = () => {
    if (activeStepIndex < tourSteps.length - 1) {
      setActiveStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setActiveStepIndex(0);
    setCompletedActions([]);
  };

  return (
    <div className="min-h-screen bg-[#07050d] text-white flex flex-col font-sans selection:bg-purple-600 selection:text-white" dir="rtl">
      {/* Top Bar */}
      <header className="h-16 border-b border-purple-900/30 bg-[#0e0c15]/90 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center font-bold text-lg shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform">
              PR
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-300 to-white">
                COACH<span className="text-purple-400">PR</span>
              </span>
              <span className="text-[10px] text-purple-400/80 -mt-1 font-mono tracking-widest">LIVE SIMULATION TOUR</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-xs text-purple-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            محاكاة حساب تجريبي حي (CoachPR Sandbox)
          </div>
        </div>

        {/* View Switchers */}
        <div className="flex items-center gap-2 bg-[#171324] p-1 rounded-xl border border-purple-900/40">
          <button
            onClick={() => setActiveTab("both")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === "both" ? "bg-purple-600 text-white shadow" : "text-gray-400 hover:text-white"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">شاشة مزدوجة</span>
          </button>
          <button
            onClick={() => setActiveTab("coach")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === "coach" ? "bg-purple-600 text-white shadow" : "text-gray-400 hover:text-white"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">لوحة الكوتش</span>
          </button>
          <button
            onClick={() => setActiveTab("trainee")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === "trainee" ? "bg-purple-600 text-white shadow" : "text-gray-400 hover:text-white"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">موبايل المتدرب</span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-purple-950/40 hover:bg-purple-900/40 text-purple-300 border border-purple-800/40 text-xs flex items-center gap-1 transition"
            title="إعادة تشغيل الجولة"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">إعادة</span>
          </button>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs shadow-lg shadow-purple-600/30 flex items-center gap-1.5 transition"
          >
            <span>دخول لوحة التحكم</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Main Tour Canvas */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side (or Top on mobile): Dual Interactive Viewports */}
        <div className="flex-1 p-4 lg:p-6 flex flex-col md:flex-row gap-6 items-stretch justify-center overflow-y-auto">
          {/* Coach Viewport (Monitor) */}
          {(activeTab === "both" || activeTab === "coach") && (
            <div className={`flex-1 flex flex-col bg-[#0e0c15] border border-purple-900/30 rounded-2xl overflow-hidden shadow-2xl transition-all ${
              activeTab === "coach" ? "max-w-5xl mx-auto w-full" : ""
            }`}>
              {/* Monitor Header */}
              <div className="h-10 bg-[#141120] border-b border-purple-900/30 px-4 flex items-center justify-between text-xs text-purple-300">
                <div className="flex items-center gap-2 font-medium">
                  <Monitor className="w-4 h-4 text-purple-400" />
                  <span>لوحة تحكم الكوتش (CoachPR Admin Console)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-[11px] text-gray-400">30 متدرب نشط</span>
                </div>
              </div>

              {/* Monitor Content Area */}
              <div className="flex-1 p-5 flex flex-col gap-4 overflow-y-auto bg-gradient-to-b from-[#0e0c15] to-[#07050d]">
                {/* Dynamic Content based on step */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#151221] p-3 rounded-xl border border-purple-900/30 flex items-center justify-between">
                    <div>
                      <span className="text-gray-400 text-xs">نسبة الالتزام العامة</span>
                      <p className="text-lg font-bold text-white mt-0.5">92.4%</p>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-purple-900/30 flex items-center justify-center text-purple-400">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="bg-[#151221] p-3 rounded-xl border border-purple-900/30 flex items-center justify-between">
                    <div>
                      <span className="text-gray-400 text-xs">تسليمات اليوم</span>
                      <p className="text-lg font-bold text-purple-300 mt-0.5">18 / 22</p>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-indigo-900/30 flex items-center justify-center text-indigo-400">
                      <Award className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="bg-[#151221] p-3 rounded-xl border border-purple-900/30 flex items-center justify-between">
                    <div>
                      <span className="text-gray-400 text-xs">تنبيهات الانتباه</span>
                      <p className="text-lg font-bold text-amber-400 mt-0.5">3 متدربين</p>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-amber-900/20 flex items-center justify-center text-amber-400">
                      <Flame className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Simulated Interactive Widget inside Coach Screen */}
                <div className="bg-[#13101e] border border-purple-900/30 rounded-xl p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between border-b border-purple-900/20 pb-2">
                    <span className="text-xs font-semibold text-purple-200">العميل الحالي قيد المراجعة: كريم جلال (Karim Galal)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40">خطة نشطة</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center bg-[#191528] p-2.5 rounded-lg border border-purple-900/20">
                      <div className="flex items-center gap-2">
                        <Dumbbell className="w-4 h-4 text-purple-400" />
                        <span>الجدول الحالي: Push Pull Legs (المرحلة 2)</span>
                      </div>
                      <span className="text-purple-300 font-mono">5 أيام / أسبوع</span>
                    </div>

                    <div className="flex justify-between items-center bg-[#191528] p-2.5 rounded-lg border border-purple-900/20">
                      <div className="flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-indigo-400" />
                        <span>الخطة الغذائية: High Protein Muscle Gain</span>
                      </div>
                      <span className="text-indigo-300 font-mono">3,000 Kcal</span>
                    </div>

                    <div className="bg-[#181329] p-3 rounded-lg border border-purple-800/30 text-purple-200">
                      <div className="flex items-center gap-1.5 text-purple-400 font-medium mb-1">
                        <Sparkles className="w-4 h-4" />
                        <span>اقتراح ذكاء اصطناعي للتشيك إن (AI Co-Pilot):</span>
                      </div>
                      <p className="text-gray-300 text-[11px] leading-relaxed">
                        &quot;كريم كسر وزنه القياسي في تمرين السكوات اليوم (160 كجم x 5). مقترح زيادة الماكروز بـ 150 سعر حراري في أيام الأرجل لتعزيز الاستشفاء العضلي.&quot;
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action in Coach Console */}
                <div className="mt-auto bg-purple-950/20 border border-purple-800/30 rounded-xl p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping"></span>
                    <span className="text-gray-300">{currentStep.coachAction}</span>
                  </div>
                  <button 
                    onClick={() => {
                      if (!completedActions.includes(currentStep.id)) {
                        setCompletedActions(prev => [...prev, currentStep.id]);
                        setSimulatedScore(s => Math.min(100, s + 1));
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg font-medium transition ${
                      completedActions.includes(currentStep.id)
                        ? "bg-emerald-600/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/30"
                    }`}
                  >
                    {completedActions.includes(currentStep.id) ? "تم التنفيذ ✓" : "تطبيق الإجراء الآن"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Trainee Viewport (Mobile Phone Frame) */}
          {(activeTab === "both" || activeTab === "trainee") && (
            <div className={`w-full max-w-[340px] mx-auto flex flex-col items-center justify-center transition-all`}>
              {/* Phone Frame */}
              <div className="w-full bg-[#12101b] border-4 border-[#2a243d] rounded-[36px] overflow-hidden shadow-2xl relative flex flex-col aspect-[9/18.5] max-h-[640px]">
                {/* Dynamic Island / Notch */}
                <div className="h-6 bg-[#0a0812] flex items-center justify-between px-6 text-[10px] text-gray-400 font-mono">
                  <span>9:41</span>
                  <div className="w-16 h-3.5 bg-black rounded-full"></div>
                  <span>5G 100%</span>
                </div>

                {/* Mobile App Header */}
                <div className="px-4 py-3 bg-[#161226] border-b border-purple-900/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold">
                      ك
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">تطبيق كريم (Karim)</h4>
                      <p className="text-[10px] text-purple-400">CoachPR Athlete App</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded-full font-mono">
                    10/10 Score
                  </span>
                </div>

                {/* Mobile Screen Content */}
                <div className="flex-1 p-3.5 flex flex-col gap-3 overflow-y-auto bg-gradient-to-b from-[#0c0a14] to-[#07050d] text-xs">
                  {/* Today's Workout Card */}
                  <div className="bg-[#171329] p-3 rounded-2xl border border-purple-900/30 shadow">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[11px] text-purple-300 font-semibold">تمرين اليوم: Push Focus</span>
                      <span className="text-[10px] text-gray-400 font-mono">Day 1</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="bg-[#110e1c] p-2 rounded-xl flex items-center justify-between text-[11px]">
                        <span>1. Barbell Bench Press</span>
                        <span className="text-purple-400 font-mono">4 Sets x 8 Reps</span>
                      </div>
                      <div className="bg-[#110e1c] p-2 rounded-xl flex items-center justify-between text-[11px]">
                        <span>2. Incline DB Press</span>
                        <span className="text-purple-400 font-mono">3 Sets x 10 Reps</span>
                      </div>
                    </div>
                    <button className="w-full mt-2.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-[11px] flex items-center justify-center gap-1">
                      <Play className="w-3 h-3 fill-white" />
                      <span>بدء جلسة التمرين</span>
                    </button>
                  </div>

                  {/* Form Check Video Preview */}
                  <div className="bg-[#171329] p-3 rounded-2xl border border-purple-900/30">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-semibold text-purple-300 flex items-center gap-1">
                        <Video className="w-3.5 h-3.5 text-purple-400" />
                        فيديو تكنيك السكوات
                      </span>
                      <span className="text-[9px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded">تمت المراجعة</span>
                    </div>
                    <div className="bg-black/60 rounded-xl p-2.5 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-900/50 flex items-center justify-center text-purple-300">
                        ▶
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] text-gray-300">ملاحظة الكوتش الصوتية (0:18)</p>
                        <div className="w-full h-1 bg-purple-950 rounded-full mt-1 overflow-hidden">
                          <div className="w-3/4 h-full bg-purple-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Daily Adherence Metric */}
                  <div className="bg-[#171329] p-3 rounded-2xl border border-purple-900/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400">التزام اليوم بالوجبات والمياه</span>
                      <p className="text-sm font-bold text-emerald-400">10 / 10 مكتمل ✓</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Check className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Mobile Bottom Navigation */}
                <div className="h-12 bg-[#120f1f] border-t border-purple-900/30 px-6 flex items-center justify-around text-gray-400 text-[10px]">
                  <span className="text-purple-400 font-bold flex flex-col items-center">
                    <Dumbbell className="w-3.5 h-3.5" />
                    اليوم
                  </span>
                  <span className="flex flex-col items-center">
                    <Utensils className="w-3.5 h-3.5" />
                    الدايت
                  </span>
                  <span className="flex flex-col items-center">
                    <MessageSquare className="w-3.5 h-3.5" />
                    الكوتش
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Interactive Walkthrough Control Deck */}
        <div className="w-full lg:w-96 bg-[#0e0c15] border-t lg:border-t-0 lg:border-r border-purple-900/30 p-6 flex flex-col justify-between">
          <div>
            {/* Step Counter */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-purple-400 tracking-wider">
                خطوة {activeStepIndex + 1} من {tourSteps.length}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-950 border border-purple-800/40 text-purple-300 font-medium">
                {currentStep.badge}
              </span>
            </div>

            {/* Step Details */}
            <h3 className="text-xl font-bold text-white mb-2 leading-snug">
              {currentStep.title}
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
              {currentStep.description}
            </p>

            {/* Coach & Trainee Direct Impact Box */}
            <div className="space-y-3 bg-[#13101e] p-4 rounded-2xl border border-purple-900/30">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-purple-900/60 flex items-center justify-center text-purple-300 shrink-0 text-xs mt-0.5">
                  ✓
                </div>
                <div>
                  <span className="text-xs font-semibold text-purple-300 block">تأثير الكوتش:</span>
                  <span className="text-[11px] text-gray-400 leading-normal">{currentStep.coachAction}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 border-t border-purple-900/20 pt-2.5">
                <div className="w-5 h-5 rounded-full bg-indigo-900/60 flex items-center justify-center text-indigo-300 shrink-0 text-xs mt-0.5">
                  ✓
                </div>
                <div>
                  <span className="text-xs font-semibold text-indigo-300 block">تأثير المتدرب:</span>
                  <span className="text-[11px] text-gray-400 leading-normal">{currentStep.traineeAction}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="mt-8 pt-4 border-t border-purple-900/30 flex items-center justify-between gap-3">
            <button
              onClick={handlePrev}
              disabled={activeStepIndex === 0}
              className={`px-4 py-2.5 rounded-xl border border-purple-900/40 text-xs font-medium flex items-center gap-1.5 transition ${
                activeStepIndex === 0 ? "opacity-30 cursor-not-allowed text-gray-500" : "text-purple-300 hover:bg-purple-950"
              }`}
            >
              <ArrowRight className="w-4 h-4" />
              <span>السابق</span>
            </button>

            {activeStepIndex === tourSteps.length - 1 ? (
              <Link
                href="/dashboard"
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs shadow-lg shadow-purple-600/30 flex items-center justify-center gap-1.5 transition"
              >
                <span>ابدأ استخدام CoachPR الآن</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs shadow-lg shadow-purple-600/30 flex items-center justify-center gap-1.5 transition"
              >
                <span>الخطوة التالية</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
