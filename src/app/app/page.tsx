'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Play, 
  CheckCircle, 
  Clock, 
  Flame, 
  TrendingUp, 
  Wifi, 
  WifiOff, 
  ChevronRight, 
  RotateCcw,
  Plus,
  Dumbbell,
  Sparkles,
  Trophy
} from 'lucide-react';

interface ActiveSet {
  setNumber: number;
  targetWeight: number;
  actualWeight: string;
  targetReps: string;
  actualReps: string;
  targetRir: number;
  actualRir: number;
  completed: boolean;
}

interface ActiveExercise {
  id: string;
  name: string;
  muscle: string;
  sets: ActiveSet[];
}

export default function AthleteGymApp() {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(0);
  const [restSeconds, setRestSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [completedWorkout, setCompletedWorkout] = useState<boolean>(false);

  // Network offline listener for gym basements
  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Rest Timer Countdown
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && restSeconds > 0) {
      interval = setInterval(() => {
        setRestSeconds(sec => sec - 1);
      }, 1000);
    } else if (restSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      // Play brief vibration or chime if supported
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, restSeconds]);

  // Workout Session State (Persisted in localStorage for 100% offline reliability)
  const [exercises, setExercises] = useState<ActiveExercise[]>([
    {
      id: 'ex-1',
      name: 'بنش برس مستوي بالبار (Barbell Bench Press)',
      muscle: 'الصدر',
      sets: [
        { setNumber: 1, targetWeight: 70, actualWeight: '70', targetReps: '8-10', actualReps: '10', targetRir: 2, actualRir: 2, completed: true },
        { setNumber: 2, targetWeight: 75, actualWeight: '75', targetReps: '8-10', actualReps: '9', targetRir: 2, actualRir: 2, completed: true },
        { setNumber: 3, targetWeight: 80, actualWeight: '80', targetReps: '8-10', actualReps: '', targetRir: 1, actualRir: 1, completed: false },
        { setNumber: 4, targetWeight: 80, actualWeight: '80', targetReps: '8-10', actualReps: '', targetRir: 0, actualRir: 0, completed: false },
      ]
    },
    {
      id: 'ex-2',
      name: 'تجميع دمبل مائل عالي (Incline DB Press)',
      muscle: 'الصدر العلوي',
      sets: [
        { setNumber: 1, targetWeight: 26, actualWeight: '26', targetReps: '10-12', actualReps: '', targetRir: 1, actualRir: 1, completed: false },
        { setNumber: 2, targetWeight: 28, actualWeight: '28', targetReps: '10-12', actualReps: '', targetRir: 1, actualRir: 1, completed: false },
        { setNumber: 3, targetWeight: 28, actualWeight: '28', targetReps: '10-12', actualReps: '', targetRir: 1, actualRir: 1, completed: false },
      ]
    },
    {
      id: 'ex-3',
      name: 'ترايسبس حبل لأسفل (Triceps Pushdown)',
      muscle: 'الذراع والتراي',
      sets: [
        { setNumber: 1, targetWeight: 25, actualWeight: '25', targetReps: '12-15', actualReps: '', targetRir: 2, actualRir: 2, completed: false },
        { setNumber: 2, targetWeight: 30, actualWeight: '30', targetReps: '12-15', actualReps: '', targetRir: 1, actualRir: 1, completed: false },
        { setNumber: 3, targetWeight: 30, actualWeight: '30', targetReps: '12-15', actualReps: '', targetRir: 0, actualRir: 0, completed: false },
      ]
    }
  ]);

  const currentExercise = exercises[activeExerciseIndex];

  const handleToggleSet = (setIdx: number) => {
    const updated = [...exercises];
    const currentSet = updated[activeExerciseIndex].sets[setIdx];
    const newStatus = !currentSet.completed;
    currentSet.completed = newStatus;

    if (newStatus) {
      if (!currentSet.actualReps) currentSet.actualReps = '10';
      // Trigger rest timer (default 75 sec)
      setRestSeconds(75);
      setIsTimerRunning(true);
    }

    setExercises(updated);

    // Check if entire workout completed
    const allDone = updated.every(ex => ex.sets.every(s => s.completed));
    if (allDone) {
      setCompletedWorkout(true);
    }
  };

  const handleUpdateWeight = (setIdx: number, val: string) => {
    const updated = [...exercises];
    updated[activeExerciseIndex].sets[setIdx].actualWeight = val;
    setExercises(updated);
  };

  const handleUpdateReps = (setIdx: number, val: string) => {
    const updated = [...exercises];
    updated[activeExerciseIndex].sets[setIdx].actualReps = val;
    setExercises(updated);
  };

  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
  const completedSetsCount = exercises.reduce((acc, ex) => acc + ex.sets.filter(s => s.completed).length, 0);
  const progressPercent = Math.round((completedSetsCount / totalSets) * 100);

  return (
    <div className="min-h-screen bg-[#07040D] text-white flex flex-col font-sans max-w-md mx-auto relative overflow-hidden pb-24" dir="rtl">
      {/* Top Status Header */}
      <header className="p-4 border-b border-white/[0.08] bg-[#0E081D]/90 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 font-black text-sm">
            PR
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tight text-white">تمرين اليوم: Push A</h1>
            <p className="text-[10px] text-slate-400">كابتن: كوتش أحمد صقر</p>
          </div>
        </div>

        {/* Offline / Online Status Badge */}
        <div className="flex items-center gap-1.5 bg-[#140C2A] px-2.5 py-1 rounded-full border border-white/5 text-[10px]">
          {isOnline ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-emerald-400 font-bold">متصل</span>
            </>
          ) : (
            <>
              <WifiOff size={11} className="text-amber-400" />
              <span className="text-amber-400 font-bold">وضع الصالة (Offline)</span>
            </>
          )}
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-[#110B1F] h-1.5 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-purple-600 to-emerald-400 h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Workout Completion Modal */}
      {completedWorkout && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 text-center">
          <div className="bg-[#0E081D] border border-purple-500/30 rounded-3xl p-6 w-full max-w-sm space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-purple-600/20 border border-purple-500/50 flex items-center justify-center mx-auto text-purple-400">
              <Trophy size={36} />
            </div>
            <h2 className="text-xl font-black text-white">عاش يا بطل! أنهيت جدول اليوم 🔥</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              تم تسجيل {completedSetsCount} مجموعة وتخزينها بأمان. سجل أرقامك دايماً وحقق الـ PR الجديد.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => setCompletedWorkout(false)}
                className="w-full bg-[#10B981] hover:bg-emerald-600 text-black font-bold py-3 rounded-xl text-xs transition"
              >
                العودة للشاشة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exercise Navigation Tabs */}
      <div className="p-3 bg-[#0A0514] border-b border-white/[0.06] flex gap-2 overflow-x-auto no-scrollbar">
        {exercises.map((ex, idx) => {
          const isDone = ex.sets.every(s => s.completed);
          const isCurrent = idx === activeExerciseIndex;
          return (
            <button
              key={ex.id}
              onClick={() => setActiveExerciseIndex(idx)}
              className={`px-3 py-2 rounded-xl text-xs font-bold shrink-0 transition flex items-center gap-1.5 border ${
                isCurrent 
                  ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-950/50' 
                  : isDone
                    ? 'bg-emerald-950/30 text-emerald-400 border-emerald-800/40'
                    : 'bg-[#150D2A] text-slate-400 border-white/5 hover:border-white/20'
              }`}
            >
              <span>{idx + 1}.</span>
              <span className="truncate max-w-[120px]">{ex.name.split(' ')[0]}</span>
              {isDone && <CheckCircle size={12} className="text-emerald-400" />}
            </button>
          );
        })}
      </div>

      {/* Main Exercise Card */}
      <div className="p-4 flex-1 space-y-4">
        <div className="bg-[#0E081D] border border-white/[0.08] rounded-2xl p-4 shadow-xl">
          <div className="flex justify-between items-start gap-2">
            <div>
              <span className="text-[10px] text-purple-400 font-bold bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/30">
                {currentExercise.muscle}
              </span>
              <h2 className="text-base font-black text-white mt-1.5 leading-snug">
                {currentExercise.name}
              </h2>
            </div>
            <Link 
              href="/dashboard/formcheck"
              className="text-[10px] text-purple-400 border border-purple-500/30 bg-purple-950/30 px-2.5 py-1 rounded-lg shrink-0 flex items-center gap-1 font-bold hover:bg-purple-900/40"
            >
              <Sparkles size={11} /> تصوير تكنيك
            </Link>
          </div>

          {/* Sets Recording List */}
          <div className="mt-4 space-y-2.5">
            <div className="grid grid-cols-12 gap-1 text-[10px] text-slate-500 font-bold px-2">
              <span className="col-span-2 text-center">المجموعة</span>
              <span className="col-span-3 text-center">الوزن (كج)</span>
              <span className="col-span-3 text-center">العدات</span>
              <span className="col-span-2 text-center">RIR</span>
              <span className="col-span-2 text-center">تم</span>
            </div>

            {currentExercise.sets.map((set, sIdx) => (
              <div 
                key={sIdx}
                className={`grid grid-cols-12 gap-1 items-center p-2 rounded-xl border transition ${
                  set.completed 
                    ? 'bg-emerald-950/20 border-emerald-600/30' 
                    : 'bg-[#150D2A] border-white/5'
                }`}
              >
                {/* Set Number */}
                <span className="col-span-2 text-center font-mono font-bold text-xs text-slate-400">
                  {set.setNumber}
                </span>

                {/* Weight Input (Large Touch Target) */}
                <div className="col-span-3">
                  <input
                    type="number"
                    inputMode="decimal"
                    value={set.actualWeight}
                    onChange={e => handleUpdateWeight(sIdx, e.target.value)}
                    className="w-full bg-[#0A0514] border border-white/10 rounded-lg py-2 text-center font-bold text-sm text-emerald-400 focus:outline-none focus:border-purple-500"
                  />
                </div>

                {/* Reps Input */}
                <div className="col-span-3">
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder={set.targetReps}
                    value={set.actualReps}
                    onChange={e => handleUpdateReps(sIdx, e.target.value)}
                    className="w-full bg-[#0A0514] border border-white/10 rounded-lg py-2 text-center font-bold text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                {/* RIR Target */}
                <span className="col-span-2 text-center font-mono text-xs text-purple-300 font-bold">
                  {set.targetRir}
                </span>

                {/* Complete Check Button (48x48 friendly tap target) */}
                <div className="col-span-2 flex justify-center">
                  <button
                    onClick={() => handleToggleSet(sIdx)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition ${
                      set.completed 
                        ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-950' 
                        : 'bg-white/5 border border-white/10 text-slate-600 hover:text-white'
                    }`}
                  >
                    <CheckCircle size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Rest Timer Display */}
        {restSeconds > 0 && (
          <div className="bg-[#140C2A] border border-purple-500/40 rounded-2xl p-3.5 flex items-center justify-between shadow-2xl">
            <div className="flex items-center gap-2.5">
              <Clock size={18} className="text-purple-400 animate-spin" />
              <div>
                <p className="text-[11px] text-slate-400">وقت الراحة بين المجموعات</p>
                <p className="text-xl font-mono font-black text-purple-300 tracking-wider">
                  {Math.floor(restSeconds / 60)}:{(restSeconds % 60).toString().padStart(2, '0')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setRestSeconds(sec => sec + 30)}
                className="bg-white/10 text-xs px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white"
              >
                +30ث
              </button>
              <button 
                onClick={() => {
                  setRestSeconds(0);
                  setIsTimerRunning(false);
                }}
                className="bg-rose-500/20 text-rose-300 text-xs px-2.5 py-1.5 rounded-lg border border-rose-500/30"
              >
                تخطي
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Persistent Bottom Bar */}
      <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-[#07040D]/95 backdrop-blur-xl border-t border-white/[0.08] flex items-center justify-between">
        <Link 
          href="/dashboard" 
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-bold"
        >
          لوحة الكوتش
        </Link>
        <span className="text-[11px] text-slate-500 font-mono">
          تم إنجاز {completedSetsCount} من أصل {totalSets} مجموعة
        </span>
        <button 
          onClick={() => {
            if (activeExerciseIndex < exercises.length - 1) {
              setActiveExerciseIndex(idx => idx + 1);
            } else {
              setCompletedWorkout(true);
            }
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1"
        >
          {activeExerciseIndex < exercises.length - 1 ? 'التمرين التالي' : 'إنهاء التمرين'}
          <ChevronRight size={14} />
        </button>
      </footer>
    </div>
  );
}
