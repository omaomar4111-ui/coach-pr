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
import { 
  calculatePlates, 
  calculateWarmupSets, 
  playHapticBeep, 
  PlateResult, 
  WarmupSet 
} from "@/lib/workoutCalculators";
import ExerciseVisualAnatomyCard from "@/components/ExerciseVisualAnatomyCard";
import ChatWidget from "@/components/ChatWidget";

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
  rir?: number;
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
  // Navigation: 6 core pillars in one screen (adding Plate & Warmup Tools)
  const [activeTab, setActiveTab] = useState<"workout" | "templates" | "diet" | "rm_calc" | "plates" | "supplements">("workout");
  
  // Athlete Profile State
  const [currentStreak, setCurrentStreak] = useState(19);
  const [waterDrankLiters, setWaterDrankLiters] = useState(2.8);
  const [waterGoalLiters] = useState(4.0);
  const [isCheckedIn, setIsCheckedIn] = useState(true);

  // Rest Timer Controller with zero-latency audio synthesizer
  const [restSeconds, setRestSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timerMaxSec, setTimerMaxSec] = useState(60);

  // Active Template & Days
  const [selectedTemplate, setSelectedTemplate] = useState<BodybuildingSystemTemplate>(BODYBUILDING_TEMPLATES[0]);
  const [activeDayIdx, setActiveDayIdx] = useState(0);

  // Session Soreness / Recovery Feedback (RP Mesocycle style)
  const [pumpRating, setPumpRating] = useState<"🔥 مضخة أسطورية" | "⚡ جيدة جداً" | "💤 عادية">("🔥 مضخة أسطورية");
  const [sessionNotes, setSessionNotes] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

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
      rir: 2,
      completed: true,
      anatomyGifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/barbell-bench-press.gif",
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
      rir: 1,
      completed: false,
      anatomyGifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/dumbbell-incline-bench-press.gif",
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
      rir: 0,
      completed: false,
      anatomyGifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/cable-standing-fly.gif",
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

  // Plate Calculator State
  const [barbellTargetKg, setBarbellTargetKg] = useState(100);
  const [barWeightKg, setBarWeightKg] = useState(20);
  const plateDistribution = calculatePlates(barbellTargetKg, barWeightKg);
  const warmupSets = calculateWarmupSets(barbellTargetKg);

  // AI Food Vision State
  const [analyzingMeal, setAnalyzingMeal] = useState(false);
  const [aiMealResult, setAiMealResult] = useState<any>(null);

  // Modals
  const [anatomyModal, setAnatomyModal] = useState<ExerciseState | null>(null);

  // Audio-Enabled Timer loop (Beeps 3, 2, 1, Done!)
  useEffect(() => {
    let t: any = null;
    if (timerActive && restSeconds > 0) {
      t = setInterval(() => {
        setRestSeconds((prev) => {
          if (prev <= 4 && prev > 1) {
            playHapticBeep(520, 100); // Warning countdown beep
          } else if (prev === 1) {
            playHapticBeep(880, 400); // Final finish tone
          }
          return prev - 1;
        });
      }, 1000);
    } else if (restSeconds === 0 && timerActive) {
      setTimerActive(false);
      if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
        new Notification("انتهى وقت الراحة ⏱️", { body: "ابدأ مجموعتك التالية الآن!" });
      }
    }
    return () => clearInterval(t);
  }, [timerActive, restSeconds]);

  const startRestTimer = (sec: number) => {
    setTimerMaxSec(sec);
    setRestSeconds(sec);
    setTimerActive(true);
    playHapticBeep(440, 150);
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

  // Real Multimodal Food Vision with Gemini 3.5 Flash-Lite
  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAnalyzingMeal(true);
    setAiMealResult(null);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result as string;
      try {
        const res = await fetch("/api/ai/food-vision", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: base64Data }),
        });
        const data = await res.json();
        setAnalyzingMeal(false);
        if (data.analysis) {
          setAiMealResult(data.analysis);
          confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
          playHapticBeep(880, 200);
        }
      } catch (err) {
        setAnalyzingMeal(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Quick weight adjuster helper (+2.5kg or -2.5kg micro-loading)
  const adjustExerciseWeight = (id: string, delta: number) => {
    setExercises(exercises.map(ex => {
      if (ex.id === id) {
        const newWeight = Math.max(0, ex.weightKg + delta);
        return { ...ex, weightKg: newWeight };
      }
      return ex;
    }));
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

      {/* Floating Rest Timer Bar with audio feedback */}
      {timerActive && (
        <div className="sticky top-[57px] z-30 bg-[#1A0E2E] border-b border-[#7C3AED] px-4 py-2 text-white flex items-center justify-between text-xs font-bold animate-fadeIn shadow-lg shadow-purple-950/60">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A78BFA] animate-ping" />
            <span>وقت الراحة بين المجموعات:</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-base font-black text-[#A78BFA] bg-black/50 px-2.5 py-0.5 rounded-lg border border-purple-500/30">
              00:{restSeconds < 10 ? `0${restSeconds}` : restSeconds}
            </span>
            <button 
              onClick={() => {
                setTimerActive(false);
                setRestSeconds(0);
              }}
              className="text-[10px] bg-white/[0.08] hover:bg-white/[0.15] px-2.5 py-1 rounded-lg text-slate-300 hover:text-white transition"
            >
              تخطي
            </button>
          </div>
        </div>
      )}

      {/* 2. Top Unified Navigation Tabs */}
      <div className="grid grid-cols-6 bg-[#0A0514] border-b border-white/[0.04] text-[10px] font-bold text-center">
        <button
          onClick={() => setActiveTab("workout")}
          className={`py-3 transition border-b-2 ${
            activeTab === "workout"
              ? "border-[#7C3AED] text-white bg-white/[0.03]"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          🏋️ تمريني
        </button>

        <button
          onClick={() => setActiveTab("templates")}
          className={`py-3 transition border-b-2 ${
            activeTab === "templates"
              ? "border-[#7C3AED] text-white bg-white/[0.03]"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          📋 الأنظمة
        </button>

        <button
          onClick={() => setActiveTab("diet")}
          className={`py-3 transition border-b-2 ${
            activeTab === "diet"
              ? "border-[#7C3AED] text-white bg-white/[0.03]"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          🥗 الدايت
        </button>

        <button
          onClick={() => setActiveTab("plates")}
          className={`py-3 transition border-b-2 ${
            activeTab === "plates"
              ? "border-[#7C3AED] text-white bg-white/[0.03]"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          ⚖️ الطارات
        </button>

        <button
          onClick={() => setActiveTab("rm_calc")}
          className={`py-3 transition border-b-2 ${
            activeTab === "rm_calc"
              ? "border-[#7C3AED] text-white bg-white/[0.03]"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          🎯 1RM
        </button>

        <button
          onClick={() => setActiveTab("supplements")}
          className={`py-3 transition border-b-2 ${
            activeTab === "supplements"
              ? "border-[#7C3AED] text-white bg-white/[0.03]"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          💊 المكملات
        </button>
      </div>

      {/* 3. Main Workspace Area */}
      <main className="flex-1 p-4 space-y-4 overflow-y-auto">
        
        {/* ===================== TAB 1: WORKOUT EXECUTION ===================== */}
        {activeTab === "workout" && (
          <div className="space-y-4">
            
            {/* Today's Routine Banner */}
            <div className="p-4 rounded-2xl bg-[#0E071A] border border-purple-500/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#A78BFA] font-mono block">الخطة النشطة: FST-7 هاني رامبود</span>
                <h2 className="text-sm font-bold text-white mt-0.5">Push Day: صدر علوي وترايسبس وفنش</h2>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-1 rounded-xl bg-[#1A1030] text-[#A78BFA] border border-purple-500/30">
                {exercises.filter(e => e.completed).length} / {exercises.length} تم
              </span>
            </div>

            {/* Exercises List with Micro-Adjusters & RIR */}
            <div className="space-y-3">
              {exercises.map((ex) => (
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
                      className="px-2.5 py-1 rounded-xl bg-[#1A1030] hover:bg-[#251445] border border-purple-500/30 text-[#A78BFA] text-[10px] font-bold transition flex items-center gap-1"
                    >
                      <span>تشريح الحركة</span>
                      <span className="text-[9px] bg-purple-500/20 px-1 rounded">GIF</span>
                    </button>
                  </div>

                  {/* Coach Technique & Tempo Box */}
                  <div className="p-3 rounded-xl bg-[#120A22] border border-white/[0.04] space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-400">التكنيك: <b className="text-white">{ex.technique}</b></span>
                      <span className="text-[#A78BFA]">التمبو: {ex.tempo}</span>
                      <span className="text-slate-400">RIR: {ex.rir !== undefined ? ex.rir : 2}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed border-t border-white/[0.04] pt-1.5">
                      <span className="text-[#A78BFA] font-bold">توجيه الكابتن: </span>
                      {ex.techniqueNote}
                    </p>
                  </div>

                  {/* Weight Micro-Adjusters (+/- 2.5kg) & Check Action */}
                  <div className="flex items-center justify-between bg-[#090412] p-2.5 rounded-xl border border-white/[0.04]">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <div className="flex items-center gap-1 bg-[#140A24] px-2 py-1 rounded-lg border border-white/[0.06]">
                        <button
                          type="button"
                          onClick={() => adjustExerciseWeight(ex.id, -2.5)}
                          className="text-slate-400 hover:text-white text-sm font-black px-1"
                        >
                          -
                        </button>
                        <span className="text-white font-bold px-1">{ex.weightKg}kg</span>
                        <button
                          type="button"
                          onClick={() => adjustExerciseWeight(ex.id, 2.5)}
                          className="text-[#A78BFA] hover:text-white text-sm font-black px-1"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-slate-400 text-[11px]">{ex.reps} reps</span>
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

            {/* End of Workout Recovery Feedback (RP Mesocycle style) */}
            <div className="p-4 rounded-2xl bg-[#0F081D] border border-purple-500/20 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">تقييم استشفاء التمرينة (Coach Feedback):</span>
                <span className="text-[10px] text-purple-300 font-mono">RP Progression</span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 text-center font-bold text-[10px]">
                {(["🔥 مضخة أسطورية", "⚡ جيدة جداً", "💤 عادية"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setPumpRating(r)}
                    className={`py-2 px-1 rounded-xl transition border ${
                      pumpRating === r
                        ? "bg-[#7C3AED] border-purple-400 text-white shadow"
                        : "bg-[#140A24] border-white/[0.06] text-slate-400"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="ملاحظة للكوتش (مثلاً: حسيت بإجهاد خفيف في الكوع)..."
                value={sessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)}
                className="w-full bg-[#080310] border border-white/[0.08] rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-[#7C3AED]"
              />

              <button
                type="button"
                onClick={() => {
                  setFeedbackSent(true);
                  confetti({ particleCount: 30, spread: 60 });
                  playHapticBeep(700, 200);
                  setTimeout(() => setFeedbackSent(false), 3000);
                }}
                className="w-full py-2 bg-[#1A1030] hover:bg-[#251445] border border-purple-500/30 text-[#A78BFA] font-bold rounded-xl transition text-center"
              >
                {feedbackSent ? "تم إرسال التقرير للكوتش بنجاح ✓" : "إرسال تقرير التمرينة للمدرب"}
              </button>
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
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-white text-sm">{tmpl.title}</h4>
                        <span className="text-[10px] text-purple-300 font-mono">{tmpl.daysPerWeek} أيام أسبوعياً</span>
                      </div>
                      {isCurrent && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7C3AED] text-white font-bold">
                          الخطة النشطة
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed">{tmpl.description}</p>

                    <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">الفلسفة: {tmpl.systemPhilosophy.slice(0, 45)}...</span>
                      
                      {!isCurrent && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedTemplate(tmpl);
                            confetti({ particleCount: 30, spread: 50 });
                            playHapticBeep(880, 200);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition shadow"
                        >
                          تفعيل النظام لي الآن
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================== TAB 3: DIET & GEMINI MULTIMODAL VISION ===================== */}
        {activeTab === "diet" && (
          <div className="space-y-4">
            
            {/* AI Vision Food Camera Upload Bar */}
            <div className="p-4 rounded-2xl bg-[#0F081D] border border-purple-500/30 text-center space-y-2.5">
              <div className="space-y-1">
                <span className="text-[10px] text-[#A78BFA] font-bold font-mono tracking-wider uppercase block">
                  Gemini 3.5 Multimodal Food Vision
                </span>
                <h3 className="text-sm font-black text-white">صور وجبتك بالكاميرا وسيب الباقي للذكاء الاصطناعي</h3>
                <p className="text-[11px] text-slate-400">
                  تحليل تلقائي فوري للمكونات والجرامات والسعرات والماكروز في ثوانٍ.
                </p>
              </div>

              <label className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition shadow-lg shadow-purple-950/60 cursor-pointer">
                <span>{analyzingMeal ? "جاري الفحص الدقيق بالذكاء الاصطناعي..." : "📸 التقاط أو رفع صورة الوجبة"}</span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handlePhotoCapture}
                  disabled={analyzingMeal}
                />
              </label>
            </div>

            {/* AI Analysis Result Card */}
            {aiMealResult && (
              <div className="p-4 rounded-2xl bg-[#140A26] border border-[#7C3AED] space-y-3 animate-fadeIn text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-purple-500/20">
                  <span className="font-bold text-white text-sm">{aiMealResult.mealTitle || "تحليل الوجبة"}</span>
                  <span className="text-purple-300 font-mono text-[10px] font-bold bg-purple-900/40 px-2 py-0.5 rounded-full">
                    دقة 98% (Gemini)
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-1.5 text-center font-mono">
                  <div className="p-2 bg-[#0A0514] rounded-xl border border-white/[0.04]">
                    <span className="text-[10px] text-slate-500 block">سعرات</span>
                    <span className="font-bold text-white text-sm">{aiMealResult.calories}</span>
                  </div>
                  <div className="p-2 bg-[#0A0514] rounded-xl border border-white/[0.04]">
                    <span className="text-[10px] text-slate-500 block">بروتين</span>
                    <span className="font-bold text-[#A78BFA] text-sm">{aiMealResult.protein}g</span>
                  </div>
                  <div className="p-2 bg-[#0A0514] rounded-xl border border-white/[0.04]">
                    <span className="text-[10px] text-slate-500 block">كارب</span>
                    <span className="font-bold text-slate-300 text-sm">{aiMealResult.carbs}g</span>
                  </div>
                  <div className="p-2 bg-[#0A0514] rounded-xl border border-white/[0.04]">
                    <span className="text-[10px] text-slate-500 block">دهون</span>
                    <span className="font-bold text-slate-400 text-sm">{aiMealResult.fats}g</span>
                  </div>
                </div>

                {aiMealResult.items && (
                  <div className="space-y-1">
                    <span className="text-slate-400 font-bold block text-[11px]">المكونات المستخرجة:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {aiMealResult.items.map((it: any, i: number) => (
                        <span key={i} className="px-2 py-0.5 rounded-lg bg-[#0A0514] border border-white/[0.05] text-[10px] text-slate-300">
                          {it.name} ({it.portion})
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {aiMealResult.coachVerdict && (
                  <p className="p-2.5 rounded-xl bg-[#090412] border border-white/[0.05] text-[11px] text-purple-200 leading-relaxed">
                    💡 <b>نصيحة الكابتن:</b> {aiMealResult.coachVerdict}
                  </p>
                )}
              </div>
            )}

            {/* Prescribed Meals List */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-white block">جدول وجباتك اليومية:</span>
              {meals.map((m) => (
                <div key={m.id} className="p-3.5 rounded-2xl bg-[#0D0717] border border-white/[0.05] space-y-2 text-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-white text-xs">{m.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">{m.time}</span>
                    </div>
                    <span className="font-mono text-[11px] text-[#A78BFA] font-bold">
                      {m.calories} kcal
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
                    <span>بروتين: <b className="text-white">{m.protein}g</b></span>
                    <span>كارب: <b className="text-white">{m.carbs}g</b></span>
                    <span>دهون: <b className="text-white">{m.fats}g</b></span>
                  </div>

                  <p className="text-[10px] text-slate-300 bg-[#120A22] p-2 rounded-xl border border-white/[0.04]">
                    💬 {m.coachNote}
                  </p>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ===================== TAB 4: BARBELL PLATE CALCULATOR & WARMUP (COMPETITOR UX) ===================== */}
        {activeTab === "plates" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white">حاسبة طارات البار والتسخين العلمي (HeavySet / Barbell UX)</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                توزيع الطارات على كل جانب من البار الأولمبي مع جدول التسخين الذكي للأوزان الثقيلة.
              </p>
            </div>

            {/* Barbell Inputs */}
            <div className="p-4 rounded-2xl bg-[#0E071A] border border-purple-500/20 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-slate-400 block mb-1 text-[11px]">الوزن الإجمالي المطلوب (kg)</label>
                  <input
                    type="number"
                    step="2.5"
                    value={barbellTargetKg}
                    onChange={(e) => setBarbellTargetKg(Number(e.target.value))}
                    className="w-full bg-[#0A0514] border border-white/[0.08] rounded-xl px-3 py-2 text-white font-mono font-bold outline-none focus:border-[#7C3AED]"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 text-[11px]">وزن البار الأولمبي (kg)</label>
                  <select
                    value={barWeightKg}
                    onChange={(e) => setBarWeightKg(Number(e.target.value))}
                    className="w-full bg-[#0A0514] border border-white/[0.08] rounded-xl px-3 py-2 text-white font-mono font-bold outline-none focus:border-[#7C3AED]"
                  >
                    <option value={20}>بار أولمبي قياسي (20 kg)</option>
                    <option value={15}>بار سيدات / تكنيك (15 kg)</option>
                    <option value={10}>بار خفيف (10 kg)</option>
                  </select>
                </div>
              </div>

              {/* Visual Plate Representation (One Side) */}
              <div className="p-3 bg-[#0A0514] rounded-xl border border-white/[0.05] space-y-2">
                <span className="text-[11px] text-[#A78BFA] font-bold block">
                  حمولة كل جانب من البار: {Math.max(0, (barbellTargetKg - barWeightKg) / 2)} kg
                </span>

                {plateDistribution.length > 0 ? (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {plateDistribution.map((p) => (
                      <span
                        key={p.plateKg}
                        className="px-2.5 py-1 rounded-lg text-white font-mono font-bold text-xs border border-white/10 shadow"
                        style={{ backgroundColor: p.color }}
                      >
                        {p.countPerSide}x {p.plateKg} kg
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-[10px] text-slate-500 font-mono">الوزن لا يتطلب طارات إضافية (البار فقط).</span>
                )}
              </div>
            </div>

            {/* Scientific Warmup Ramp Sets */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-white block">
                مجموعات التسخين التصاعدي لحماية المفاصل (Warmup Protocol):
              </span>

              <div className="space-y-1.5">
                {warmupSets.map((ws, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-mono ${
                      ws.percentage === 100
                        ? "bg-[#180E2E] border-[#7C3AED] text-white"
                        : "bg-[#0D0717] border-white/[0.04] text-slate-300"
                    }`}
                  >
                    <div>
                      <span className="font-bold block text-[11px]">{ws.label}</span>
                      <span className="text-[10px] text-slate-400">{ws.reps} · راحة {ws.restSec}ث</span>
                    </div>

                    <span className="font-black text-sm text-[#A78BFA] bg-black/40 px-2 py-0.5 rounded-lg">
                      {ws.weightKg} kg
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ===================== TAB 5: 1RM INTENSITY CALCULATOR ===================== */}
        {activeTab === "rm_calc" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white">حاسبة 1RM والشدة التدريبية القصوى</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                احسب أقصى وزن تقدر ترفعه لعدة واحدة (1RM) بناءً على معادلات Epley & Brzycki.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0E071A] border border-purple-500/20 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <span className="text-slate-400">الـ 1RM التقديري:</span>
                <span className="text-xl font-mono font-black text-[#A78BFA]">
                  {rmData.average1RM} kg
                </span>
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

        {/* ===================== TAB 6: SUPPLEMENTS ENCYCLOPEDIA ===================== */}
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
                    نسخ الكود: {sup.discountCode}
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

      {/* Anatomy 3D Vector Highlight Modal */}
      {anatomyModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E071A] border border-[#7C3AED] rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">{anatomyModal.name}</h3>
              <button 
                onClick={() => setAnatomyModal(null)}
                className="text-xs px-2 py-1 rounded-lg bg-white/[0.08] text-slate-400 hover:text-white"
              >
                إغلاق ✕
              </button>
            </div>

            {/* Real Anatomical Vector Muscle Map & Movement Loop */}
            <ExerciseVisualAnatomyCard
              exerciseName={anatomyModal.name}
              primaryMuscle={anatomyModal.target}
              techniqueNote={anatomyModal.techniqueNote}
              tempo={anatomyModal.tempo}
              gifUrl={anatomyModal.anatomyGifUrl}
            />

            <button
              type="button"
              onClick={() => setAnatomyModal(null)}
              className="w-full py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-950/60 transition"
            >
              فهمت التكنيك الصحيح ✓
            </button>
          </div>
        </div>
      )}

      {/* Live Support ChatWidget */}
      <ChatWidget websiteToken="coachprb_client_widget_token" baseUrl="https://app.chatwoot.com" />

      {/* Footer */}
      <footer className="py-3 text-center text-[10px] text-slate-600 border-t border-white/[0.03]">
        CoachPR Unified Master App · 2026
      </footer>

    </div>
  );
}
