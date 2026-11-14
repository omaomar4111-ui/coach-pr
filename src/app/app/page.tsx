"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";

interface WorkoutExercise {
  id: string;
  name: string;
  target: string;
  previousBest: string;
  techniqueType: "FST-7 Finisher" | "Super Set" | "Drop Set" | "Rest-Pause" | "Normal";
  coachNotes: string;
  tempo: string; // e.g. "3-0-1-0"
  restSeconds: number;
  // GIF / Illustration representing accurate anatomy execution
  anatomyGifUrl: string;
  sets: {
    setNum: number;
    weight: string;
    reps: string;
    completed: boolean;
  }[];
}

interface MealItem {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  targetWaterMl: number;
  consumed: boolean;
  coachNote: string;
}

export default function ClientExperienceApp() {
  const [activeTab, setActiveTab] = useState<"workout" | "diet" | "checkin">("workout");
  const [dailyScore, setDailyScore] = useState(8);
  const [waterGlasses, setWaterGlasses] = useState(7);
  const [restSeconds, setRestSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [showGifModal, setShowGifModal] = useState<WorkoutExercise | null>(null);

  // Exercises with Anatomy Visual Execution & Deep Coach Sets & Techniques
  const [exercises, setExercises] = useState<WorkoutExercise[]>([
    {
      id: "e-1",
      name: "بنش برس مستوي بالبار (Barbell Bench Press)",
      target: "عضلات الصدر العام وقوة الدفع",
      previousBest: "85 kg × 8 عدات",
      techniqueType: "Normal",
      tempo: "3-0-1-0 (نزول سلبي بطيء 3 ثواني)",
      restSeconds: 90,
      coachNotes: "التحكم في النزول السلبي، ثبت لوحي الكتف للخلف والأسفل (Scapular Retraction)، ودفع قوي للأعلى بدون قفل الكوعين تماماً.",
      anatomyGifUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80",
      sets: [
        { setNum: 1, weight: "80", reps: "10", completed: true },
        { setNum: 2, weight: "85", reps: "8", completed: false },
        { setNum: 3, weight: "85", reps: "8", completed: false },
      ],
    },
    {
      id: "e-2",
      name: "تجميع دمبلز عالي (Incline Dumbbell Press)",
      target: "الصدر العلوي وحزام الكتف",
      previousBest: "30 kg × 10 عدات",
      techniqueType: "Drop Set",
      tempo: "2-0-1-0",
      restSeconds: 75,
      coachNotes: "المجموعة الأخيرة Drop Set: بعد الفشل بوزن 30 كجم، انزل فوراً لـ 20 كجم والعب أقصى عدات ممكنة حتى الفشل التام.",
      anatomyGifUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
      sets: [
        { setNum: 1, weight: "30", reps: "10", completed: false },
        { setNum: 2, weight: "30", reps: "10", completed: false },
        { setNum: 3, weight: "30", reps: "8+Drop", completed: false },
      ],
    },
    {
      id: "e-3",
      name: "تفتيح كابل أو فراشة (Cable Fly FST-7)",
      target: "فاشيا الصدر والامتلاء الداخلي",
      previousBest: "17.5 kg × 12 عدة",
      techniqueType: "FST-7 Finisher",
      tempo: "2-1-1-0 (ثبات ثانية في القمة)",
      restSeconds: 30,
      coachNotes: "بروتوكول هاني رامبود FST-7: 7 مجاميع متتالية؛ راحة 30 ثانية فقط بين كل دور مع شد الصدر ووقفة Most Muscular Posing لمدة 10 ثواني لحبس الدم في الفاشيا.",
      anatomyGifUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
      sets: [
        { setNum: 1, weight: "17.5", reps: "12", completed: false },
        { setNum: 2, weight: "17.5", reps: "12", completed: false },
        { setNum: 3, weight: "17.5", reps: "12", completed: false },
        { setNum: 4, weight: "17.5", reps: "12", completed: false },
        { setNum: 5, weight: "17.5", reps: "12", completed: false },
        { setNum: 6, weight: "17.5", reps: "12", completed: false },
        { setNum: 7, weight: "17.5", reps: "12", completed: false },
      ],
    },
  ]);

  // Meals with Calories, Macros, and Strict Coach Timing
  const [meals, setMeals] = useState<MealItem[]>([
    {
      id: "m-1",
      name: "وجبة 1: شوفان باللبن + سكوب واي + 30 جرام مكسرات",
      time: "09:00 ص",
      calories: 550,
      protein: 42,
      carbs: 65,
      fats: 14,
      targetWaterMl: 500,
      consumed: true,
      coachNote: "وجبة بدء اليوم لتعبئة الجليكوجين، اشرب معها نصف لتر ماء.",
    },
    {
      id: "m-2",
      name: "وجبة 2: 200 جرام صدور دجاج مشوية + 200 جرام أرز بسمتي + طبق سلطة",
      time: "01:30 م",
      calories: 680,
      protein: 58,
      carbs: 75,
      fats: 10,
      targetWaterMl: 750,
      consumed: true,
      coachNote: "الالتزام بوزن الأرز بعد الطهي. مسموح بليمون وملح خفيف.",
    },
    {
      id: "m-3",
      name: "وجبة 3 (وجبة ما قبل التمرين): 250 جرام بطاطا مسلوقة + سكوب إيزوليت",
      time: "05:00 م",
      calories: 420,
      protein: 30,
      carbs: 60,
      fats: 3,
      targetWaterMl: 500,
      consumed: false,
      coachNote: "تناولها قبل التمرين بساعة ونصف لتوفير طاقة تفجيرية في الرفع.",
    },
  ]);

  // Rest Timer Controller
  useEffect(() => {
    let interval: any = null;
    if (timerActive && restSeconds > 0) {
      interval = setInterval(() => setRestSeconds(prev => prev - 1), 1000);
    } else if (restSeconds === 0 && timerActive) {
      setTimerActive(false);
      if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
        new Notification("انتهى وقت الراحة ⏱️", { body: "ابدأ مجموعتك التالية الآن للحفاظ على شدة التمرين!" });
      }
    }
    return () => clearInterval(interval);
  }, [timerActive, restSeconds]);

  const startRestTimer = (sec: number) => {
    setRestSeconds(sec);
    setTimerActive(true);
  };

  const handleToggleSet = (exId: string, setNum: number) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exId) {
        return {
          ...ex,
          sets: ex.sets.map(s => {
            if (s.setNum === setNum) {
              const nextState = !s.completed;
              if (nextState) {
                confetti({ particleCount: 30, spread: 45, origin: { y: 0.8 } });
                startRestTimer(ex.restSeconds || 60);
              }
              return { ...s, completed: nextState };
            }
            return s;
          }),
        };
      }
      return ex;
    }));
  };

  const totalCalories = meals.reduce((sum, m) => sum + (m.consumed ? m.calories : 0), 0);
  const targetCalories = meals.reduce((sum, m) => sum + m.calories, 0);

  return (
    <div className="min-h-screen bg-[#07040D] text-white flex flex-col font-sans selection:bg-[#7C3AED] selection:text-white max-w-lg mx-auto shadow-2xl border-x border-white/[0.04]" dir="rtl">
      
      {/* Mobile-First App Header */}
      <header className="px-5 py-4 border-b border-white/[0.04] bg-[#0A0514]/90 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src="/pr-logo.png" alt="PR" className="h-7 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(167,139,250,0.4)]" />
          <div>
            <span className="font-heading font-black text-sm tracking-wide text-white block">
              COACH<span className="text-[#A78BFA]">PR</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">كابتن كريم أحمد (VIP)</span>
          </div>
        </div>

        <Link 
          href="/dashboard"
          className="text-[11px] px-3 py-1 rounded-xl bg-[#140A24] border border-white/[0.08] text-slate-300 hover:text-white transition"
        >
          لوحة المدرب
        </Link>
      </header>

      {/* Floating Rest Timer Alert Bar */}
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

      {/* Navigation Tabs */}
      <div className="grid grid-cols-3 bg-[#0A0514] border-b border-white/[0.04] text-xs font-bold text-center">
        <button
          onClick={() => setActiveTab("workout")}
          className={`py-3 transition border-b-2 ${
            activeTab === "workout" ? "border-[#7C3AED] text-[#A78BFA] bg-[#120A24]" : "border-transparent text-slate-400"
          }`}
        >
          تمرينة اليوم
        </button>
        <button
          onClick={() => setActiveTab("diet")}
          className={`py-3 transition border-b-2 ${
            activeTab === "diet" ? "border-[#7C3AED] text-[#A78BFA] bg-[#120A24]" : "border-transparent text-slate-400"
          }`}
        >
          وجباتي والماكروز
        </button>
        <button
          onClick={() => setActiveTab("checkin")}
          className={`py-3 transition border-b-2 ${
            activeTab === "checkin" ? "border-[#7C3AED] text-[#A78BFA] bg-[#120A24]" : "border-transparent text-slate-400"
          }`}
        >
          ستريك الالتزام
        </button>
      </div>

      {/* Body Viewport */}
      <main className="flex-1 p-4 space-y-4 overflow-y-auto">
        
        {/* VIEW 1: WORKOUT */}
        {activeTab === "workout" && (
          <div className="space-y-4">
            
            {/* Day Header Banner */}
            <div className="p-4 rounded-2xl bg-[#0E071A] border border-purple-500/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#A78BFA] font-mono block">اليوم 2: عضلات الدفع (Push Day)</span>
                <h2 className="text-base font-bold text-white mt-0.5">صدر عالي + بنش مستوي + فنش FST-7</h2>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-[#1A1030] border border-purple-500/30 text-[#A78BFA]">
                3 تمارين
              </span>
            </div>

            {/* Exercises List with Anatomy GIFs & Deep Set Logic */}
            <div className="space-y-3">
              {exercises.map((ex, exIdx) => (
                <div key={ex.id} className="p-4 rounded-2xl bg-[#0D0717] border border-white/[0.05] space-y-3">
                  
                  {/* Title & Anatomy Visual Trigger */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-white text-sm">{ex.name}</h3>
                      <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{ex.target}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowGifModal(ex)}
                      className="px-2.5 py-1 rounded-xl bg-[#1A1030] hover:bg-[#251445] border border-purple-500/30 text-[#A78BFA] text-[11px] font-bold flex items-center gap-1 transition"
                    >
                      <span>تشريح وحركة التمرين (GIF)</span>
                    </button>
                  </div>

                  {/* Coach Detailed Techniques Box (Tempo, Super Sets, Drop Sets) */}
                  <div className="p-3 rounded-xl bg-[#120A22] border border-white/[0.04] space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-400">التكنيك: <b className="text-white">{ex.techniqueType}</b></span>
                      <span className="text-[#A78BFA]">التمبو: {ex.tempo}</span>
                      <span className="text-slate-400">راحة: {ex.restSeconds}ث</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed border-t border-white/[0.04] pt-1.5">
                      <span className="text-[#A78BFA] font-bold">تعليمات الكوتش: </span>
                      {ex.coachNotes}
                    </p>
                  </div>

                  {/* Sets Log Table (Weight / Reps / Checkbox) */}
                  <div className="space-y-1.5 text-xs">
                    <div className="grid grid-cols-4 text-[10px] text-slate-500 font-mono px-2">
                      <span>المجموعة</span>
                      <span>الوزن (kg)</span>
                      <span>العدادات</span>
                      <span className="text-left">الحالة</span>
                    </div>

                    {ex.sets.map((set) => (
                      <div 
                        key={set.setNum}
                        onClick={() => handleToggleSet(ex.id, set.setNum)}
                        className={`grid grid-cols-4 items-center p-2 rounded-xl border transition cursor-pointer text-xs font-mono ${
                          set.completed 
                            ? "bg-[#180E2E] border-[#7C3AED] text-white" 
                            : "bg-[#090412] border-white/[0.04] text-slate-300 hover:border-white/[0.08]"
                        }`}
                      >
                        <span className="font-bold">Set {set.setNum}</span>
                        <span>{set.weight} kg</span>
                        <span>{set.reps} reps</span>
                        <div className="text-left">
                          <span className={`text-[10px] px-2 py-0.5 rounded-lg border font-bold ${
                            set.completed ? "bg-[#7C3AED] text-white border-transparent" : "border-white/[0.08] text-slate-500"
                          }`}>
                            {set.completed ? "تم ✓" : "سجّل"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* VIEW 2: DIET & CALORIES */}
        {activeTab === "diet" && (
          <div className="space-y-4">
            
            {/* Calories Progress Card */}
            <div className="p-4 rounded-2xl bg-[#0E071A] border border-purple-500/20 text-center space-y-2">
              <span className="text-[10px] text-slate-400 font-mono">السعرات الحرارية المستهلكة اليوم</span>
              <div className="text-2xl font-black font-mono text-white">
                {totalCalories} <span className="text-xs text-[#A78BFA]">/ {targetCalories} kcal</span>
              </div>
              <div className="w-full bg-[#140B24] h-2 rounded-full overflow-hidden max-w-xs mx-auto">
                <div 
                  className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] h-full"
                  style={{ width: `${Math.min(100, (totalCalories / targetCalories) * 100)}%` }}
                />
              </div>
            </div>

            {/* Meals List */}
            <div className="space-y-3">
              {meals.map((meal) => (
                <div key={meal.id} className="p-4 rounded-2xl bg-[#0D0717] border border-white/[0.05] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm">{meal.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono block mt-0.5">موعد الوجبة: {meal.time}</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#A78BFA] font-bold">{meal.calories} kcal</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-slate-400 bg-[#0A0514] p-2 rounded-xl">
                    <span>بروتين: <b className="text-white">{meal.protein}g</b></span>
                    <span>كاربوهيدرات: <b className="text-white">{meal.carbs}g</b></span>
                    <span>دهون: <b className="text-white">{meal.fats}g</b></span>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed border-t border-white/[0.03] pt-1.5">
                    <span className="text-[#A78BFA] font-bold">توجيه الكابتن: </span>
                    {meal.coachNote}
                  </p>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* VIEW 3: CHECK-IN */}
        {activeTab === "checkin" && (
          <div className="p-6 rounded-3xl bg-[#0D0717] border border-white/[0.05] text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#1A1030] border border-purple-500/30 text-[#A78BFA] text-2xl font-black font-mono mx-auto flex items-center justify-center">
              19
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">ستريك الالتزام: 19 يوم متواصل 🔥</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                استمرارك بدون انقطاع ينعكس فوراً على رانك حسابك ويظهر في لوحة تحكم مدربك.
              </p>
            </div>
          </div>
        )}

      </main>

      {/* Anatomy Execution GIF Modal (Clean visual guidance without video errors) */}
      {showGifModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E071A] border border-[#7C3AED] rounded-3xl max-w-sm w-full p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">{showGifModal.name}</h3>
              <button 
                onClick={() => setShowGifModal(null)}
                className="text-xs px-2 py-1 rounded-lg bg-white/[0.08] text-slate-400 hover:text-white"
              >
                إغلاق ✕
              </button>
            </div>

            {/* Visual Anatomy Execution Image/GIF */}
            <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#07040D] aspect-video flex items-center justify-center">
              <img 
                src={showGifModal.anatomyGifUrl} 
                alt={showGifModal.name} 
                className="w-full h-full object-cover" 
              />
            </div>

            <div className="text-xs space-y-1.5 text-slate-300">
              <span className="text-[#A78BFA] font-bold block">العضلات المستهدفة: {showGifModal.target}</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {showGifModal.coachNotes}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowGifModal(null)}
              className="w-full py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs rounded-xl"
            >
              فهمت التكنيك الصحيح ✓
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-3 text-center text-[10px] text-slate-600 border-t border-white/[0.03]">
        CoachPR Athlete Interface · 2026
      </footer>

    </div>
  );
}
