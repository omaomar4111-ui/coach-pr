"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Dumbbell, 
  Flame, 
  Award, 
  Check, 
  Play, 
  Clock, 
  Apple, 
  Droplet, 
  Video, 
  MessageCircle, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  RotateCcw,
  Volume2
} from "lucide-react";
import confetti from "canvas-confetti";

interface WorkoutExercise {
  id: string;
  name: string;
  target: string;
  previousBest: string;
  sets: {
    setNum: number;
    weight: string;
    reps: string;
    completed: boolean;
  }[];
}

export default function ClientAppPage() {
  const [activeTab, setActiveTab] = useState<"workout" | "diet" | "checkin">("workout");
  
  // Daily 10/10 metrics
  const [dailyScore, setDailyScore] = useState(7);
  const [waterGlasses, setWaterGlasses] = useState(6); // target 8
  const [mealsLogged, setMealsLogged] = useState(2); // target 3
  const [streakDays, setStreakDays] = useState(19);

  // Rest Timer State
  const [restSeconds, setRestSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Exercises
  const [exercises, setExercises] = useState<WorkoutExercise[]>([
    {
      id: "e-1",
      name: "Barbell Bench Press (صدر مستوي)",
      target: "صدر عام وقوة دفع",
      previousBest: "82.5 kg × 8 عدات",
      sets: [
        { setNum: 1, weight: "80", reps: "10", completed: true },
        { setNum: 2, weight: "85", reps: "8", completed: false },
        { setNum: 3, weight: "85", reps: "8", completed: false }
      ]
    },
    {
      id: "e-2",
      name: "Incline Dumbbell Press (تجميع عالي)",
      target: "صدر علوي",
      previousBest: "28 kg × 10 عدات",
      sets: [
        { setNum: 1, weight: "30", reps: "10", completed: false },
        { setNum: 2, weight: "30", reps: "10", completed: false }
      ]
    },
    {
      id: "e-3",
      name: "Triceps Rope Pushdown (تراي كابل)",
      target: "ترايسبس",
      previousBest: "35 kg × 12 عدة",
      sets: [
        { setNum: 1, weight: "35", reps: "12", completed: false },
        { setNum: 2, weight: "40", reps: "10", completed: false }
      ]
    }
  ]);

  // Handle rest timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && restSeconds > 0) {
      interval = setInterval(() => {
        setRestSeconds((prev) => prev - 1);
      }, 1000);
    } else if (restSeconds === 0 && timerActive) {
      setTimerActive(false);
      // Play brief sound or vibrate if supported
      if (typeof window !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
    }
    return () => clearInterval(interval);
  }, [timerActive, restSeconds]);

  const startRestTimer = (seconds: number) => {
    setRestSeconds(seconds);
    setTimerActive(true);
  };

  const handleCompleteSet = (exerciseIdx: number, setIdx: number) => {
    const updated = [...exercises];
    const currentSet = updated[exerciseIdx].sets[setIdx];
    const isNowCompleted = !currentSet.completed;
    currentSet.completed = isNowCompleted;
    setExercises(updated);

    if (isNowCompleted) {
      // Check if PR (e.g. weight >= 85 on bench press)
      const weightNum = parseFloat(currentSet.weight) || 0;
      if (weightNum >= 85) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.7 }
        });
        alert("🔥 كفو يا كابتن! حققت رقم شخصي جديد (PR) في هذه التمرينة! تم تسجيل الإنجاز وإخطار الكوتش.");
      }

      // Start automatic 60s rest timer
      startRestTimer(60);
    }
  };

  return (
    <div className="min-h-screen bg-[#07040D] text-slate-100 flex flex-col font-sans max-w-md mx-auto shadow-2xl border-x border-purple-950/40 selection:bg-[#7C3AED]" dir="rtl">
      
      {/* Client Header */}
      <header className="bg-[#110A1E] border-b border-purple-900/30 p-4 sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src="/pr-logo.png" alt="CoachPR" className="h-8 w-auto object-contain" />
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>كريم أحمد</span>
              <span className="text-[10px] bg-purple-900/60 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30">CoachPR</span>
            </div>
            <div className="text-[10px] text-slate-400">المدرب: كابتن عمر مصطفى</div>
          </div>
        </div>

        {/* Daily Streak Badge */}
        <div className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/40 px-2.5 py-1 rounded-full">
          <Flame className="w-4 h-4 text-orange-400 fill-orange-400 animate-pulse" />
          <span className="text-xs font-black text-orange-300 font-mono">{streakDays} يوم</span>
        </div>
      </header>

      {/* Floating Rest Timer Bar (When Active) */}
      {timerActive && (
        <div className="sticky top-[61px] z-30 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] px-4 py-2 text-white flex items-center justify-between shadow-lg text-xs font-bold animate-fadeIn">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 animate-spin" />
            <span>وقت الراحة بين المجموعات:</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-base font-black bg-black/30 px-2.5 py-0.5 rounded-lg">
              00:{restSeconds < 10 ? `0${restSeconds}` : restSeconds}
            </span>
            <button 
              onClick={() => setTimerActive(false)}
              className="text-[11px] bg-black/40 hover:bg-black/60 px-2 py-0.5 rounded"
            >
              تخطي
            </button>
          </div>
        </div>
      )}

      {/* Top Tabs */}
      <div className="grid grid-cols-3 bg-[#110A1E] border-b border-purple-900/30 text-xs font-bold text-center">
        <button
          onClick={() => setActiveTab("workout")}
          className={`py-3 transition flex items-center justify-center gap-1.5 border-b-2 ${
            activeTab === "workout" ? "border-[#A78BFA] text-[#A78BFA] bg-purple-950/20" : "border-transparent text-slate-400"
          }`}
        >
          <Dumbbell className="w-3.5 h-3.5" />
          <span>تمرينة اليوم</span>
        </button>

        <button
          onClick={() => setActiveTab("diet")}
          className={`py-3 transition flex items-center justify-center gap-1.5 border-b-2 ${
            activeTab === "diet" ? "border-[#A78BFA] text-[#A78BFA] bg-purple-950/20" : "border-transparent text-slate-400"
          }`}
        >
          <Apple className="w-3.5 h-3.5" />
          <span>وجباتي</span>
        </button>

        <button
          onClick={() => setActiveTab("checkin")}
          className={`py-3 transition flex items-center justify-center gap-1.5 border-b-2 ${
            activeTab === "checkin" ? "border-[#A78BFA] text-[#A78BFA] bg-purple-950/20" : "border-transparent text-slate-400"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>الـ 10/10 وفورم</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        
        {/* TAB 1: WORKOUT */}
        {activeTab === "workout" && (
          <div className="space-y-4">
            {/* Workout Day Banner */}
            <div className="bg-gradient-to-r from-[#17102A] to-[#120A21] p-4 rounded-2xl border border-purple-900/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">الجدول المخصص · اليوم 2</span>
                <h2 className="text-base font-black font-heading text-white mt-0.5">Push Day: عضلات الصدر والتراي</h2>
                <p className="text-xs text-slate-400 mt-1">3 تمارين · 7 مجموعات متبقية</p>
              </div>
              <button 
                onClick={() => startRestTimer(90)}
                className="bg-[#1C1133] border border-purple-500/30 text-purple-300 p-2.5 rounded-xl hover:text-white transition"
                title="تايمر يدوي"
              >
                <Clock className="w-4 h-4" />
              </button>
            </div>

            {/* Exercises List */}
            {exercises.map((ex, exIdx) => (
              <div key={ex.id} className="bg-[#140C24] p-4 rounded-2xl border border-purple-900/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-xs sm:text-sm">{ex.name}</h3>
                    <div className="text-[10px] text-purple-400 mt-0.5">{ex.target}</div>
                  </div>
                  <button 
                    onClick={() => alert(`تشغيل فيديو التكنيك الصحيح لـ ${ex.name}`)}
                    className="flex items-center gap-1 text-[10px] bg-purple-900/40 text-purple-300 border border-purple-500/30 px-2 py-1 rounded-lg hover:text-white"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>فيديو التكنيك</span>
                  </button>
                </div>

                {/* Previous record badge */}
                <div className="bg-[#110A1E] px-2.5 py-1 rounded-lg text-[10px] text-slate-400 flex items-center justify-between border border-purple-900/20">
                  <span>أفضل أداء سابق (PR):</span>
                  <span className="text-[#A78BFA] font-bold font-mono">{ex.previousBest}</span>
                </div>

                {/* Sets Grid */}
                <div className="space-y-1.5">
                  <div className="grid grid-cols-4 text-[10px] text-slate-400 font-bold text-center px-1">
                    <span>المجموعة</span>
                    <span>الوزن (kg)</span>
                    <span>العدات</span>
                    <span>تم؟</span>
                  </div>

                  {ex.sets.map((set, setIdx) => (
                    <div 
                      key={set.setNum}
                      className={`grid grid-cols-4 items-center text-center p-2 rounded-xl text-xs transition border ${
                        set.completed 
                          ? "bg-purple-950/20 border-purple-600/30 text-purple-200"
                          : "bg-[#110A1E] border-purple-900/20 text-white"
                      }`}
                    >
                      <span className="font-mono font-bold">#{set.setNum}</span>
                      <input
                        type="text"
                        value={set.weight}
                        onChange={(e) => {
                          const updated = [...exercises];
                          updated[exIdx].sets[setIdx].weight = e.target.value;
                          setExercises(updated);
                        }}
                        className="w-14 mx-auto bg-[#17102A] border border-purple-900/40 rounded py-0.5 text-center font-bold text-white focus:outline-none focus:border-[#7C3AED]"
                      />
                      <input
                        type="text"
                        value={set.reps}
                        onChange={(e) => {
                          const updated = [...exercises];
                          updated[exIdx].sets[setIdx].reps = e.target.value;
                          setExercises(updated);
                        }}
                        className="w-12 mx-auto bg-[#17102A] border border-purple-900/40 rounded py-0.5 text-center font-bold text-white focus:outline-none focus:border-[#7C3AED]"
                      />
                      <button
                        onClick={() => handleCompleteSet(exIdx, setIdx)}
                        className={`w-7 h-7 mx-auto rounded-lg flex items-center justify-center transition ${
                          set.completed 
                            ? "bg-purple-600 text-black shadow-md shadow-purple-600/30"
                            : "bg-[#1C1133] border border-purple-500/30 text-purple-300 hover:border-purple-400"
                        }`}
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Complete Workout CTA */}
            <button
              onClick={() => {
                confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
                setDailyScore(10);
                alert("عاش يا وحش! أتممت تمرينة اليوم بنجاح وحصلت على علامة 10/10 في الالتزام!");
              }}
              className="w-full py-3.5 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white font-black text-sm rounded-2xl shadow-xl shadow-purple-900/50 hover:opacity-95 transition flex items-center justify-center gap-2"
            >
              <Award className="w-5 h-5" />
              <span>إنهاء تمرينة اليوم وتسجيل الأداء</span>
            </button>
          </div>
        )}

        {/* TAB 2: DIET */}
        {activeTab === "diet" && (
          <div className="space-y-4">
            <div className="bg-[#140C24] p-4 rounded-2xl border border-purple-900/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-300">السعرات المتبقية اليوم</span>
                <span className="text-sm font-black text-amber-400 font-mono">650 / 2350 kcal</span>
              </div>
              <div className="w-full bg-[#110A1E] h-2.5 rounded-full overflow-hidden border border-purple-900/20">
                <div className="bg-gradient-to-r from-purple-500 to-amber-500 h-full rounded-full" style={{ width: "72%" }} />
              </div>
            </div>

            <div className="space-y-2.5">
              {[
                { name: "وجبة 1: الإفطار", items: "3 بيضات مسلوقة + 60 جم شوفان + موزة", done: true },
                { name: "وجبة 2: الغداء (قبل التمرين)", items: "180 جم صدور فراخ + 200 جم أرز أبيض + سلطة خضراء", done: true },
                { name: "وجبة 3: العشاء (الاستشفاء)", items: "150 جم جبن قريش + ملعقة زيت زيتون + رغيف بلدي", done: false }
              ].map((m, idx) => (
                <div key={idx} className="bg-[#140C24] p-3.5 rounded-2xl border border-purple-900/30 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{m.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{m.items}</div>
                  </div>
                  <button 
                    onClick={() => alert("تم تسجيل الوجبة بنجاح!")}
                    className={`text-xs px-3 py-1.5 rounded-xl font-bold transition ${
                      m.done 
                        ? "bg-purple-600/20 text-purple-300 border border-purple-600/30" 
                        : "bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
                    }`}
                  >
                    {m.done ? "أكلتها ✓" : "سجل الآن"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CHECKIN & 10/10 SCORE */}
        {activeTab === "checkin" && (
          <div className="space-y-4">
            {/* Daily 10/10 Score Gauge */}
            <div className="bg-[#140C24] p-5 rounded-2xl border border-purple-900/30 text-center space-y-2">
              <span className="text-xs text-slate-400 font-bold">تقييم الالتزام اليومي</span>
              <div className="text-4xl font-black font-heading text-[#A78BFA] flex items-center justify-center gap-1">
                <span>{dailyScore}</span>
                <span className="text-xl text-slate-500 font-sans">/ 10</span>
              </div>
              <p className="text-xs text-slate-300">أتممت تمرينك وسجلت وجبتين. استمر للحفاظ على سلسلة الـ {streakDays} يوماً!</p>
            </div>

            {/* Water Tracker */}
            <div className="bg-[#140C24] p-4 rounded-2xl border border-purple-900/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl">
                  <Droplet className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">شرب المياه اليومي</div>
                  <div className="text-[11px] text-slate-400">{waterGlasses} أكواب من 8 (2.5 لتر)</div>
                </div>
              </div>
              <button
                onClick={() => setWaterGlasses(prev => Math.min(8, prev + 1))}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition"
              >
                + شربت كوب
              </button>
            </div>

            {/* Form Check Video Upload */}
            <div className="bg-[#140C24] p-4 rounded-2xl border border-purple-900/30 space-y-3">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-purple-400" />
                <h3 className="text-xs font-bold text-white">إرسال فيديو فورم تشيك للكوتش</h3>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                صوّر آخر مجموعة في تمرين اليوم وارفعها هنا. الكابتن هيشوف الفيديو ويرد عليك بفويس نوت وملاحظات دقيقة على التكنيك.
              </p>
              <button
                onClick={() => alert("تم فتح الكاميرا لتصوير الرفعة وإرسالها للكابتن")}
                className="w-full py-2.5 bg-[#17102A] hover:bg-[#6D28D9]/40 border border-purple-500/30 text-purple-200 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition"
              >
                <Video className="w-4 h-4 text-purple-300" />
                <span>تصوير أو رفع فيديو (Form Check)</span>
              </button>
            </div>

            {/* WhatsApp Coach Chat */}
            <a
              href="https://wa.me/201144826641?text=كابتن أنا في الجيم ومحتاج استفسار عن تمرين اليوم"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>محادثة الكابتن على واتساب</span>
            </a>
          </div>
        )}
      </div>

      {/* Footer Navigation Switcher */}
      <footer className="bg-[#110A1E] border-t border-purple-900/30 p-2.5 text-center text-xs text-slate-500">
        <Link href="/dashboard" className="text-purple-400 hover:text-white font-bold transition">
          ← تبديل لواجهة المدرب (Coach Dashboard)
        </Link>
      </footer>
    </div>
  );
}
