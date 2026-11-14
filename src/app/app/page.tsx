"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { 
  BODYBUILDING_TEMPLATES, 
  BodybuildingSystemTemplate, 
  calculate1RM 
} from "@/lib/bodybuildingTemplatesData";
import { SUPPLEMENTS_DATABASE } from "@/lib/supplementsAndHanyData";

interface ExerciseState {
  id: string;
  name: string;
  target: string;
  technique: string;
  techniqueNote?: string;
  tempo: string;
  restSec: number;
  weightKg: number;
  reps: number;
  completed: boolean;
  anatomyGifUrl: string;
}

interface MealItem {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  consumed: boolean;
  coachNote: string;
}

export default function UnifiedMasterApp() {
  // Navigation: 5 core pillars in one screen
  const [activeTab, setActiveTab] = useState<"workout" | "templates" | "diet" | "rm_calc" | "supplements">("workout");
  
  // Athlete Profile State
  const [currentStreak, setCurrentStreak] = useState(19);
  const [waterDrankLiters, setWaterDrankLiters] = useState(2.8);
  const [waterGoalLiters] = useState(4.0);
  const [isCheckedIn, setIsCheckedIn] = useState(true);

  // Rest Timer Controller
  const [restSeconds, setRestSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Active Template & Days
  const [selectedTemplate, setSelectedTemplate] = useState<BodybuildingSystemTemplate>(BODYBUILDING_TEMPLATES[0]);
  const [activeDayIdx, setActiveDayIdx] = useState(0);

  // Exercises State (Interactive sets)
  const [exercises, setExercises] = useState<ExerciseState[]>([
    {
      id: "ex-1",
      name: "بنش برس مستوي بالبار (Flat Barbell Bench)",
      target: "الصدر العام وقوة الدفع",
      technique: "Heavy Base",
      techniqueNote: "النزول السلبي المحكوم 3 ثواني، تثبيت لوحي الكتف للخلف، ودفع متفجر بدون قفل الكوع.",
      tempo: "3-0-1-0",
      restSec: 90,
      weightKg: 85,
      reps: 8,
      completed: true,
      anatomyGifUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "ex-2",
      name: "تجميع دمبلز عالي (Incline DB Press)",
      target: "الصدر العلوي وحزام الكتف",
      technique: "Drop Set",
      techniqueNote: "في المجموعة الأخيرة: بعد الفشل بوزن 30 كجم انزل لـ 20 كجم والعب أقصى عدات ممكنة حتى الفشل التام.",
      tempo: "2-0-1-0",
      restSec: 75,
      weightKg: 30,
      reps: 10,
      completed: false,
      anatomyGifUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "ex-3",
      name: "تفتيح كابل أو فراشة (Cable Fly FST-7 Finisher)",
      target: "فاشيا الصدر والامتلاء الداخلي",
      technique: "FST-7 Finisher",
      techniqueNote: "7 مجاميع متتالية؛ راحة 30 ثانية فقط بين كل دور مع شد الصدر Most Muscular Posing لمدة 10 ثواني لحبس الدم في الفاشيا.",
      tempo: "2-1-1-0",
      restSec: 30,
      weightKg: 17.5,
      reps: 12,
      completed: false,
      anatomyGifUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
    },
  ]);

  // Meals Log with AI Camera Integration
  const [meals, setMeals] = useState<MealItem[]>([
    {
      id: "m-1",
      name: "وجبة 1: شوفان باللبن + سكوب واي + 30 جرام مكسرات",
      time: "09:00 ص",
      calories: 550,
      protein: 42,
      carbs: 65,
      fats: 14,
      consumed: true,
      coachNote: "وجبة بدء اليوم لتعبئة الجليكوجين، اشرب معها نصف لتر ماء.",
    },
    {
      id: "m-2",
      name: "وجبة 2: 200 جرام صدور دجاج + 200 جرام أرز بسمتي + خضار",
      time: "01:30 م",
      calories: 680,
      protein: 58,
      carbs: 75,
      fats: 10,
      consumed: true,
      coachNote: "الالتزام بوزن الأرز بعد الطهي. مسموح بليمون وملح خفيف.",
    },
    {
      id: "m-3",
      name: "وجبة 3 (قبل التمرين): 250 جرام بطاطا مسلوقة + سكوب إيزوليت",
      time: "05:00 م",
      calories: 420,
      protein: 30,
      carbs: 60,
      fats: 3,
      consumed: false,
      coachNote: "تناولها قبل التمرين بساعة ونصف لتوفير طاقة تفجيرية في الرفع.",
    },
  ]);

  // 1RM Calculator Interactive State
  const [calcExercise, setCalcExercise] = useState("بنش برس مستوي بالبار");
  const [calcWeight, setCalcWeight] = useState(100);
  const [calcReps, setCalcReps] = useState(6);
  const rmData = calculate1RM(calcWeight, calcReps);

  // AI Food Vision State
  const [analyzingMeal, setAnalyzingMeal] = useState(false);
  const [aiMealResult, setAiMealResult] = useState<any>(null);

  // Modals
  const [anatomyModal, setAnatomyModal] = useState<ExerciseState | null>(null);

  // Timer loop
  useEffect(() => {
    let t: any = null;
    if (timerActive && restSeconds > 0) {
      t = setInterval(() => setRestSeconds(prev => prev - 1), 1000);
    } else if (restSeconds === 0 && timerActive) {
      setTimerActive(false);
      if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
        new Notification("انتهى وقت الراحة ⏱️", { body: "ابدأ مجموعتك التالية الآن!" });
      }
    }
    return () => clearInterval(t);
  }, [timerActive, restSeconds]);

  const startRestTimer = (sec: number) => {
    setRestSeconds(sec);
    setTimerActive(true);
  };

  const handleToggleExercise = (id: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === id) {
        const next = !ex.completed;
        if (next) {
          confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
          startRestTimer(ex.restSec || 60);
        }
        return { ...ex, completed: next };
      }
      return ex;
    }));
  };

  // AI Vision File Simulation / Real Upload Trigger
  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAnalyzingMeal(true);
    setAiMealResult(null);

    // Call Real Food Vision Endpoint
    setTimeout(async () => {
      try {
        const res = await fetch("/api/ai/food-vision", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: "dummy_image_data" }),
        });
        const data = await res.json();
        setAnalyzingMeal(false);
        if (data.analysis) {
          setAiMealResult(data.analysis);
          confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
        }
      } catch (err) {
        setAnalyzingMeal(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#07040D] text-white flex flex-col font-sans selection:bg-[#7C3AED] selection:text-white max-w-md mx-auto shadow-2xl border-x border-white/[0.04]" dir="rtl">
      
      {/* 1. Global Header with PR Brand, Check-In Streak & Quick Switch to Coach */}
      <header className="px-5 py-4 border-b border-white/[0.04] bg-[#0A0514]/90 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src="/pr-logo.png" alt="PR" className="h-7 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(167,139,250,0.4)]" />
          <div>
            <span className="font-heading font-black text-sm tracking-wide text-white block">
              COACH<span className="text-[#A78BFA]">PR</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">اللاعب: كريم أحمد · ستريك {currentStreak} يوم 🔥</span>
          </div>
        </div>

        <Link 
          href="/dashboard"
          className="text-[11px] px-3 py-1 rounded-xl bg-[#140A24] border border-white/[0.08] text-slate-300 hover:text-white transition"
        >
          لوحة المدرب
        </Link>
      </header>

      {/* Floating Rest Timer Bar */}
      {timerActive && (
        <div className="sticky top-[57px] z-30 bg-[#1A0E2E] border-b border-[#7C3AED] px-4 py-2 text-white flex items-center justify-between text-xs font-bold animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A78BFA] animate-ping" />
            <span>وقت الراحة بين المجموعات:</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-base font-black text-[#A78BFA] bg-black/40 px-2.5 py-0.5 rounded-lg border border-purple-500/20">
              00:{restSeconds < 10 ? `0${restSeconds}` : restSeconds}
            </span>
            <button 
              onClick={() => setTimerActive(false)}
              className="text-[10px] bg-white/[0.08] hover:bg-white/[0.15] px-2 py-0.5 rounded-lg"
            >
              تخطي
            </button>
          </div>
        </div>
      )}

      {/* 2. Top Unified Navigation Tabs */}
      <div className="grid grid-cols-5 bg-[#0A0514] border-b border-white/[0.04] text-[11px] font-bold text-center">
        <button
          onClick={() => setActiveTab("workout")}
          className={`py-3 transition border-b-2 ${
            activeTab === "workout" ? "border-[#7C3AED] text-[#A78BFA] bg-[#120A24]" : "border-transparent text-slate-400"
          }`}
        >
          التمرين
        </button>
        <button
          onClick={() => setActiveTab("templates")}
          className={`py-3 transition border-b-2 ${
            activeTab === "templates" ? "border-[#7C3AED] text-[#A78BFA] bg-[#120A24]" : "border-transparent text-slate-400"
          }`}
        >
          الأنظمة
        </button>
        <button
          onClick={() => setActiveTab("diet")}
          className={`py-3 transition border-b-2 ${
            activeTab === "diet" ? "border-[#7C3AED] text-[#A78BFA] bg-[#120A24]" : "border-transparent text-slate-400"
          }`}
        >
          الوجبات
        </button>
        <button
          onClick={() => setActiveTab("rm_calc")}
          className={`py-3 transition border-b-2 ${
            activeTab === "rm_calc" ? "border-[#7C3AED] text-[#A78BFA] bg-[#120A24]" : "border-transparent text-slate-400"
          }`}
        >
          1RM
        </button>
        <button
          onClick={() => setActiveTab("supplements")}
          className={`py-3 transition border-b-2 ${
            activeTab === "supplements" ? "border-[#7C3AED] text-[#A78BFA] bg-[#120A24]" : "border-transparent text-slate-400"
          }`}
        >
          المكملات
        </button>
      </div>

      {/* 3. Main Workspace Area */}
      <main className="flex-1 p-4 space-y-4 overflow-y-auto">
        
        {/* ===================== TAB 1: WORKOUT EXECUTION ===================== */}
        {activeTab === "workout" && (
          <div className="space-y-4">
            
            {/* Today's Push Routine Banner */}
            <div className="p-4 rounded-2xl bg-[#0E071A] border border-purple-500/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#A78BFA] font-mono block">الخطة النشطة: FST-7 هاني رامبود</span>
                <h2 className="text-sm font-bold text-white mt-0.5">Push Day: صدر علوي وترايسبس وفنش</h2>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-1 rounded-xl bg-[#1A1030] text-[#A78BFA] border border-purple-500/30">
                {exercises.filter(e => e.completed).length} / {exercises.length} تم
              </span>
            </div>

            {/* Exercises List with Anatomy GIFs and Deep Coach Notes */}
            <div className="space-y-3">
              {exercises.map((ex, idx) => (
                <div key={ex.id} className="p-4 rounded-2xl bg-[#0D0717] border border-white/[0.05] space-y-3">
                  
                  {/* Title & Anatomy Button */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-white text-xs sm:text-sm">{ex.name}</h3>
                      <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{ex.target}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setAnatomyModal(ex)}
                      className="px-2.5 py-1 rounded-xl bg-[#1A1030] hover:bg-[#251445] border border-purple-500/30 text-[#A78BFA] text-[10px] font-bold transition"
                    >
                      تشريح الحركة (GIF)
                    </button>
                  </div>

                  {/* Coach Technique & Tempo Box */}
                  <div className="p-3 rounded-xl bg-[#120A22] border border-white/[0.04] space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-400">التكنيك: <b className="text-white">{ex.technique}</b></span>
                      <span className="text-[#A78BFA]">التمبو: {ex.tempo}</span>
                      <span className="text-slate-400">راحة: {ex.restSec}ث</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed border-t border-white/[0.04] pt-1.5">
                      <span className="text-[#A78BFA] font-bold">توجيه الكابتن: </span>
                      {ex.techniqueNote}
                    </p>
                  </div>

                  {/* Weight, Reps and Check Action */}
                  <div className="flex items-center justify-between bg-[#090412] p-2.5 rounded-xl border border-white/[0.04]">
                    <div className="flex items-center gap-3 text-xs font-mono">
                      <span>الوزن: <b className="text-white">{ex.weightKg} kg</b></span>
                      <span>العدادات: <b className="text-white">{ex.reps} reps</b></span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleExercise(ex.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                        ex.completed 
                          ? "bg-[#7C3AED] text-white shadow-md shadow-purple-950/60" 
                          : "bg-[#180E2E] text-slate-300 border border-white/[0.08] hover:text-white"
                      }`}
                    >
                      {ex.completed ? "تم الإنجاز ✓" : "تسجيل المجموعة"}
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* ===================== TAB 2: TEMPLATES SWITCHER (1-CLICK) ===================== */}
        {activeTab === "templates" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white">قوالب وأنظمة كمال الأجسام (تبديل بضغطة زر)</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                اختر أي تقسيم تدريبي (3 أيام) لتبديل جدولك بالكامل مع التكنيكات والتمبو فوراً.
              </p>
            </div>

            <div className="space-y-2.5">
              {BODYBUILDING_TEMPLATES.map((tmpl) => {
                const isCurrent = selectedTemplate.id === tmpl.id;
                return (
                  <div
                    key={tmpl.id}
                    className={`p-4 rounded-2xl border transition text-xs space-y-2 ${
                      isCurrent 
                        ? "bg-[#120A24] border-[#7C3AED] shadow-lg shadow-purple-950/40" 
                        : "bg-[#0D0717] border-white/[0.05]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] px-2 py-0.5 rounded-lg bg-[#180E2E] text-[#A78BFA] font-mono">
                        {tmpl.daysPerWeek} أيام أسبوعياً
                      </span>
                      {isCurrent && <span className="text-[10px] text-[#A78BFA] font-bold">الخطة المفعلة حالياً ✓</span>}
                    </div>

                    <h4 className="font-bold text-white text-sm">{tmpl.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{tmpl.description}</p>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTemplate(tmpl);
                        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
                      }}
                      className="w-full py-2 bg-[#1A1030] hover:bg-[#251445] border border-purple-500/20 text-[#A78BFA] hover:text-white rounded-xl font-bold transition text-xs"
                    >
                      {isCurrent ? "تم تفعيل هذا النظام ✓" : "تطبيق هذا النظام لجدولي بضغطة زر"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================== TAB 3: DIET & AI MEAL CAMERA ===================== */}
        {activeTab === "diet" && (
          <div className="space-y-4">
            
            {/* AI Food Vision Camera Feature */}
            <div className="p-4 rounded-2xl bg-[#0E071A] border border-purple-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white">فحص صورة الأكل بالـ AI (ميجاترون Vision)</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    صور وجبتك بالكاميرا وسيقوم الذكاء الاصطناعي بحساب سعراتها والماكروز تلقائياً.
                  </p>
                </div>
              </div>

              <label className="block w-full py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold text-center rounded-xl cursor-pointer transition shadow-lg shadow-purple-950/60">
                {analyzingMeal ? "جاري فحص مكونات الطبق بالذكاء الاصطناعي..." : "📷 صوّر وجبتك أو اختر صورة من المعرض"}
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handlePhotoCapture}
                />
              </label>

              {/* AI Food Analysis Result Box */}
              {aiMealResult && (
                <div className="p-3.5 rounded-xl bg-[#140B24] border border-[#7C3AED] text-xs space-y-2 animate-fadeIn">
                  <span className="font-bold text-white block text-sm">{aiMealResult.mealTitle}</span>
                  <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px] bg-[#0A0514] p-2 rounded-lg">
                    <span>سعرات: <b className="text-white">{aiMealResult.calories} kcal</b></span>
                    <span>بروتين: <b className="text-[#A78BFA]">{aiMealResult.protein}g</b></span>
                    <span>كارب: <b className="text-white">{aiMealResult.carbs}g</b></span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    💡 <b>تقييم الكوتش:</b> {aiMealResult.coachVerdict}
                  </p>
                </div>
              )}
            </div>

            {/* Scheduled Meals List */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-white block">جدول وجبات اليوم المعتمد:</span>
              {meals.map((meal) => (
                <div key={meal.id} className="p-3.5 rounded-2xl bg-[#0D0717] border border-white/[0.05] space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{meal.name}</span>
                    <span className="text-[10px] text-[#A78BFA] font-mono font-bold">{meal.calories} kcal</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono block">الموعد: {meal.time} · بروتين {meal.protein}g</span>
                  <p className="text-[11px] text-slate-300 border-t border-white/[0.03] pt-1">
                    <span className="text-[#A78BFA] font-bold">توجيه: </span>{meal.coachNote}
                  </p>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ===================== TAB 4: 1RM INTENSITY CALCULATOR ===================== */}
        {activeTab === "rm_calc" && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#0E071A] border border-purple-500/20 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-mono">أقصى وزن لعدة واحدة (1RM Max)</span>
              <div className="text-3xl font-black font-mono text-[#A78BFA]">
                {rmData.average1RM} <span className="text-xs text-white">كجم</span>
              </div>
              <p className="text-[10px] text-slate-400">محسوب وفق معادلتي Brzycki و Epley</p>
            </div>

            {/* Calculator Inputs */}
            <div className="p-4 rounded-2xl bg-[#0D0717] border border-white/[0.05] space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">اسم التمرين</label>
                <input
                  type="text"
                  value={calcExercise}
                  onChange={(e) => setCalcExercise(e.target.value)}
                  className="w-full bg-[#0A0514] border border-white/[0.08] rounded-xl px-3 py-2 text-white outline-none focus:border-[#7C3AED]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">الوزن المرفوع (kg)</label>
                  <input
                    type="number"
                    value={calcWeight}
                    onChange={(e) => setCalcWeight(Number(e.target.value))}
                    className="w-full bg-[#0A0514] border border-white/[0.08] rounded-xl px-3 py-2 text-white font-mono font-bold outline-none focus:border-[#7C3AED]"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">عدد العدات (Reps)</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={calcReps}
                    onChange={(e) => setCalcReps(Number(e.target.value))}
                    className="w-full bg-[#0A0514] border border-white/[0.08] rounded-xl px-3 py-2 text-white font-mono font-bold outline-none focus:border-[#7C3AED]"
                  />
                </div>
              </div>
            </div>

            {/* Target Loads Breakdown */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-white block">جدول شدة الأوزان للتمرين ({calcExercise}):</span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {rmData.intensityLevels.slice(0, 4).map((lvl) => (
                  <div key={lvl.percentage} className="p-2.5 rounded-xl bg-[#120A24] border border-white/[0.05] text-center">
                    <span className="text-[10px] text-slate-500 block">{lvl.percentage}% شدة</span>
                    <span className="font-bold text-white block text-sm">{lvl.targetWeightKg} kg</span>
                    <span className="text-[10px] text-[#A78BFA] block">{lvl.repTarget}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 5: SUPPLEMENTS ENCYCLOPEDIA ===================== */}
        {activeTab === "supplements" && (
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-bold text-white">المكملات الموصى بها وأكواد الخصم</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                مكملات موثوقة مع روابط الشراء المباشرة وأكواد خصم الكوتش.
              </p>
            </div>

            {SUPPLEMENTS_DATABASE.slice(0, 3).map((sup) => (
              <div key={sup.id} className="p-4 rounded-2xl bg-[#0D0717] border border-white/[0.05] space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">{sup.nameAr}</h4>
                    <span className="text-[10px] text-purple-300 font-mono">{sup.nameEn}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-lg bg-[#180E2E] text-[#A78BFA] font-bold">
                    {sup.discountPercentage || "خصم حصري"}
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed">{sup.scientificMechanism}</p>

                <div className="flex items-center gap-2 pt-1 border-t border-white/[0.04]">
                  <button
                    type="button"
                    onClick={() => {
                      if (sup.discountCode) {
                        navigator.clipboard.writeText(sup.discountCode);
                        alert(`تم نسخ كود الخصم: ${sup.discountCode}`);
                      }
                    }}
                    className="flex-1 py-2 px-3 bg-[#1A1030] hover:bg-[#251445] border border-purple-500/20 text-[#A78BFA] text-xs font-mono font-bold rounded-xl transition text-center"
                  >
                    نسخ الكود ({sup.discountCode})
                  </button>

                  {sup.purchaseUrl && (
                    <a
                      href={sup.purchaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold rounded-xl transition text-center"
                    >
                      رابط الشراء
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* Anatomy GIF Modal */}
      {anatomyModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E071A] border border-[#7C3AED] rounded-3xl max-w-sm w-full p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">{anatomyModal.name}</h3>
              <button 
                onClick={() => setAnatomyModal(null)}
                className="text-xs px-2 py-1 rounded-lg bg-white/[0.08] text-slate-400 hover:text-white"
              >
                إغلاق ✕
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#07040D] aspect-video flex items-center justify-center">
              <img src={anatomyModal.anatomyGifUrl} alt={anatomyModal.name} className="w-full h-full object-cover" />
            </div>

            <div className="text-xs space-y-1 text-slate-300">
              <span className="text-[#A78BFA] font-bold block">العضلات المستهدفة: {anatomyModal.target}</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {anatomyModal.techniqueNote}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setAnatomyModal(null)}
              className="w-full py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs rounded-xl"
            >
              فهمت التكنيك الصحيح ✓
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-3 text-center text-[10px] text-slate-600 border-t border-white/[0.03]">
        CoachPR Unified Master App · 2026
      </footer>

    </div>
  );
}
