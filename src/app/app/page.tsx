'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Play, 
  CheckCircle2, 
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
  Trophy,
  RefreshCw,
  Check,
  Smartphone,
  ShieldCheck,
  ChevronLeft
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

const LOCAL_STORAGE_KEY = 'coachprb_athlete_workout_v2';
const PENDING_SYNC_KEY = 'coachprb_pending_sync_queue';

export default function AthleteGymApp() {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(0);
  const [restSeconds, setRestSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [completedWorkout, setCompletedWorkout] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'pending' | 'offline'>('synced');
  const [pwaPrompt, setPwaPrompt] = useState<any>(null);

  // 1. Initial State
  const defaultExercises: ActiveExercise[] = [
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
      name: 'تجميع دمبل عالي مائل (Incline DB Press)',
      muscle: 'الصدر العلوي',
      sets: [
        { setNumber: 1, targetWeight: 26, actualWeight: '26', targetReps: '10-12', actualReps: '', targetRir: 1, actualRir: 1, completed: false },
        { setNumber: 2, targetWeight: 28, actualWeight: '28', targetReps: '10-12', actualReps: '', targetRir: 1, actualRir: 1, completed: false },
        { setNumber: 3, targetWeight: 28, actualWeight: '28', targetReps: '10-12', actualReps: '', targetRir: 1, actualRir: 1, completed: false },
      ]
    },
    {
      id: 'ex-3',
      name: 'ترايسبس حبل لأسفل (Triceps Cable Pushdown)',
      muscle: 'الذراع والتراي',
      sets: [
        { setNumber: 1, targetWeight: 25, actualWeight: '25', targetReps: '12-15', actualReps: '', targetRir: 2, actualRir: 2, completed: false },
        { setNumber: 2, targetWeight: 30, actualWeight: '30', targetReps: '12-15', actualReps: '', targetRir: 1, actualRir: 1, completed: false },
        { setNumber: 3, targetWeight: 30, actualWeight: '30', targetReps: '12-15', actualReps: '', targetRir: 0, actualRir: 0, completed: false },
      ]
    }
  ];

  const [exercises, setExercises] = useState<ActiveExercise[]>(defaultExercises);

  // 2. Load cached workout from LocalStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setExercises(parsed);
          }
        }
      } catch (err) {
        console.warn('Error reading cached workout:', err);
      }

      // Capture PWA install prompt
      window.addEventListener('beforeinstallprompt', (e: any) => {
        e.preventDefault();
        setPwaPrompt(e);
      });
    }
  }, []);

  // 3. Sync changes to LocalStorage instantly
  const saveToLocalStorage = (data: ActiveExercise[]) => {
    setExercises(data);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        // Flag pending sync queue
        localStorage.setItem(PENDING_SYNC_KEY, JSON.stringify({
          data,
          updatedAt: new Date().toISOString()
        }));
        if (!navigator.onLine) {
          setSyncStatus('offline');
        } else {
          setSyncStatus('pending');
        }
      } catch (e) {
        console.warn('LocalStorage save failed:', e);
      }
    }
  };

  // 4. Background Sync Function
  const syncWithServer = async (dataToSync?: ActiveExercise[]) => {
    const payload = dataToSync || exercises;
    if (!navigator.onLine) {
      setSyncStatus('offline');
      return;
    }

    try {
      setIsSyncing(true);
      const res = await fetch('/api/workout/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          athleteId: 'athlete-pr-1',
          workoutName: 'Push Day A (كمال أجسام وقوة)',
          logs: payload,
          syncedAt: new Date().toISOString()
        })
      });

      if (res.ok) {
        setSyncStatus('synced');
        localStorage.removeItem(PENDING_SYNC_KEY);
      } else {
        setSyncStatus('pending');
      }
    } catch (err) {
      setSyncStatus('offline');
    } finally {
      setIsSyncing(false);
    }
  };

  // 5. Offline / Online Connectivity Listeners & Auto-Sync on Reconnect
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Auto-sync pending logs immediately when connection returns
      syncWithServer();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setSyncStatus('offline');
    };

    setIsOnline(navigator.onLine);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial sync check
    if (navigator.onLine && typeof window !== 'undefined' && localStorage.getItem(PENDING_SYNC_KEY)) {
      syncWithServer();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 6. Rest Timer Countdown
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && restSeconds > 0) {
      interval = setInterval(() => {
        setRestSeconds(sec => sec - 1);
      }, 1000);
    } else if (restSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, restSeconds]);

  const currentExercise = exercises[activeExerciseIndex] || exercises[0];

  const handleToggleSet = (setIdx: number) => {
    const updated = [...exercises];
    const currentSet = updated[activeExerciseIndex].sets[setIdx];
    const newStatus = !currentSet.completed;
    currentSet.completed = newStatus;

    if (newStatus) {
      if (!currentSet.actualReps) currentSet.actualReps = '10';
      setRestSeconds(75);
      setIsTimerRunning(true);
    }

    saveToLocalStorage(updated);

    // Attempt background sync
    if (navigator.onLine) {
      syncWithServer(updated);
    }

    // Check if entire workout completed
    const allDone = updated.every(ex => ex.sets.every(s => s.completed));
    if (allDone) {
      setCompletedWorkout(true);
    }
  };

  const handleUpdateWeight = (setIdx: number, val: string) => {
    const updated = [...exercises];
    updated[activeExerciseIndex].sets[setIdx].actualWeight = val;
    saveToLocalStorage(updated);
  };

  const handleUpdateReps = (setIdx: number, val: string) => {
    const updated = [...exercises];
    updated[activeExerciseIndex].sets[setIdx].actualReps = val;
    saveToLocalStorage(updated);
  };

  const handleInstallPwa = () => {
    if (pwaPrompt) {
      pwaPrompt.prompt();
      pwaPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          setPwaPrompt(null);
        }
      });
    }
  };

  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
  const completedSetsCount = exercises.reduce((acc, ex) => acc + ex.sets.filter(s => s.completed).length, 0);
  const progressPercent = Math.round((completedSetsCount / totalSets) * 100);

  return (
    <div className="min-h-screen bg-[#07050d] text-white flex flex-col font-sans max-w-md mx-auto relative pb-28 selection:bg-[#a3e635] selection:text-black" dir="rtl">
      
      {/* Top Header - In-Gym Status */}
      <header className="p-4 border-b border-white/10 bg-[#100c1e]/90 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-[#171228] border border-white/10 flex items-center justify-center p-1.5 shadow-md">
            <img src="/brand-pr-logo.png" alt="PR" className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]" />
          </div>
          <div>
            <h1 className="text-sm font-black text-white leading-tight">تمرين اليوم: Push A</h1>
            <p className="text-[10px] text-[#a3e635] font-semibold">كمال أجسام وقوة عضلية</p>
          </div>
        </div>

        {/* Sync & Offline Status Indicator */}
        <div className="flex items-center gap-2">
          {pwaPrompt && (
            <button 
              onClick={handleInstallPwa}
              className="bg-[#171228] border border-[#a3e635]/40 text-[#a3e635] px-2 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1 shadow-sm"
            >
              <Smartphone size={11} /> تثبيت
            </button>
          )}

          <div 
            onClick={() => syncWithServer()}
            className="flex items-center gap-1.5 bg-[#171228] px-2.5 py-1 rounded-xl border border-white/10 text-[10px] cursor-pointer hover:border-white/20 transition"
            title="حالة المزامنة والاتصال"
          >
            {isOnline ? (
              syncStatus === 'synced' ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#a3e635]"></span>
                  <span className="text-[#a3e635] font-bold">متصل ومزامن</span>
                </>
              ) : (
                <>
                  <RefreshCw size={11} className={`text-amber-400 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span className="text-amber-400 font-bold">{isSyncing ? 'مزامنة...' : 'معلّق للمزامنة'}</span>
                </>
              )
            ) : (
              <>
                <WifiOff size={11} className="text-amber-400 animate-pulse" />
                <span className="text-amber-400 font-bold">أوفلاين (محفوظ محلياً)</span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Progress Line */}
      <div className="w-full bg-[#171228] h-1.5 overflow-hidden">
        <div 
          className="bg-[#a3e635] h-full transition-all duration-300 shadow-[0_0_8px_#a3e635]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Offline Alert Banner if Internet Drops */}
      {!isOnline && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-center text-[11px] text-amber-300 flex items-center justify-center gap-2">
          <WifiOff size={13} />
          <span>الشبكة ضعيفة في الجيم؟ لا تقلق، كل عدة ووزن تُحفظ فورياً وتتزامن تلقائياً أول ما ترجع الشبكة!</span>
        </div>
      )}

      {/* Workout Completion Modal */}
      {completedWorkout && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 text-center">
          <div className="bg-[#100c1e] border border-white/10 rounded-3xl p-6 w-full max-w-sm space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-[#171228] border border-[#a3e635]/40 flex items-center justify-center mx-auto text-[#a3e635] shadow-lg shadow-[#a3e635]/10">
              <Trophy size={36} />
            </div>
            <h2 className="text-xl font-black text-white">عاش يا بطل! أنهيت جدول اليوم 🔥</h2>
            <p className="text-xs text-white/60 leading-relaxed">
              تم تسجيل {completedSetsCount} مجموعة بنجاح وحساب الـ Progressive Overload لتمرينك القادم.
            </p>
            <div className="pt-2 space-y-2">
              <button 
                onClick={() => setCompletedWorkout(false)}
                className="w-full bg-[#a3e635] hover:bg-[#8fd128] text-black font-extrabold py-3.5 rounded-2xl text-xs transition"
              >
                العودة ومراجعة التمرين
              </button>
              <Link 
                href="/dashboard"
                className="w-full block bg-[#171228] border border-white/10 text-white/70 py-3 rounded-2xl text-xs font-bold hover:text-white transition"
              >
                الذهاب للوحة التحكم
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Exercise Navigation Pills */}
      <div className="p-3 bg-[#07050d] border-b border-white/5 flex gap-2 overflow-x-auto no-scrollbar">
        {exercises.map((ex, idx) => {
          const isDone = ex.sets.every(s => s.completed);
          const isCurrent = idx === activeExerciseIndex;
          return (
            <button
              key={ex.id}
              onClick={() => setActiveExerciseIndex(idx)}
              className={`px-3 py-2 rounded-2xl text-xs font-extrabold shrink-0 transition flex items-center gap-1.5 border ${
                isCurrent 
                  ? 'bg-[#a3e635] text-black border-[#a3e635] shadow-lg shadow-[#a3e635]/20' 
                  : isDone
                    ? 'bg-[#1a2312] text-[#bef264] border-[#a3e635]/30'
                    : 'bg-[#100c1e] text-white/50 border-white/10 hover:border-white/20'
              }`}
            >
              <span>{idx + 1}.</span>
              <span className="truncate max-w-[120px]">{ex.name.split(' ')[0]}</span>
              {isDone && <Check size={12} className={isCurrent ? 'text-black' : 'text-[#a3e635]'} />}
            </button>
          );
        })}
      </div>

      {/* Main Exercise View */}
      <div className="p-4 flex-1 space-y-4">
        
        {/* Exercise Card */}
        <div className="bg-[#100c1e] border border-white/10 rounded-3xl p-5 shadow-2xl space-y-4">
          <div className="flex justify-between items-start gap-2">
            <div>
              <span className="text-[10px] text-[#bef264] font-bold bg-[#1a2312] px-2.5 py-1 rounded-xl border border-[#a3e635]/30 inline-block">
                {currentExercise.muscle}
              </span>
              <h2 className="text-base font-black text-white mt-2 leading-snug">
                {currentExercise.name}
              </h2>
            </div>

            <Link 
              href="/dashboard/formcheck"
              className="text-[11px] text-[#a3e635] border border-[#a3e635]/30 bg-[#171228] px-3 py-1.5 rounded-xl shrink-0 flex items-center gap-1.5 font-bold hover:bg-[#a3e635] hover:text-black transition"
            >
              <Sparkles size={13} /> فحص التكنيك بالذكاء الاصطناعي
            </Link>
          </div>

          {/* Sets Recording Table */}
          <div className="space-y-2.5 pt-2">
            <div className="grid grid-cols-12 gap-1 text-[11px] text-white/40 font-bold px-2">
              <span className="col-span-2 text-center">المجموعة</span>
              <span className="col-span-3 text-center">الوزن (كج)</span>
              <span className="col-span-3 text-center">العدات</span>
              <span className="col-span-2 text-center">RIR</span>
              <span className="col-span-2 text-center">تم</span>
            </div>

            {currentExercise.sets.map((set, sIdx) => (
              <div 
                key={sIdx}
                className={`grid grid-cols-12 gap-2 items-center p-2.5 rounded-2xl border transition ${
                  set.completed 
                    ? 'bg-[#1a2312]/80 border-[#a3e635]/40' 
                    : 'bg-[#171228] border-white/10'
                }`}
              >
                {/* Set Number */}
                <span className="col-span-2 text-center font-mono font-black text-xs text-white/50">
                  #{set.setNumber}
                </span>

                {/* Weight Input (Touch friendly) */}
                <div className="col-span-3">
                  <input
                    type="number"
                    inputMode="decimal"
                    value={set.actualWeight}
                    onChange={e => handleUpdateWeight(sIdx, e.target.value)}
                    className="w-full bg-[#100c1e] border border-white/10 focus:border-[#a3e635] rounded-xl py-2 text-center font-black text-sm text-[#a3e635] focus:outline-none transition shadow-inner"
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
                    className="w-full bg-[#100c1e] border border-white/10 focus:border-[#a3e635] rounded-xl py-2 text-center font-black text-sm text-white focus:outline-none transition shadow-inner"
                  />
                </div>

                {/* Target RIR */}
                <span className="col-span-2 text-center font-mono text-xs text-white/60 font-bold">
                  {set.targetRir}
                </span>

                {/* Complete Toggle Button */}
                <div className="col-span-2 flex justify-center">
                  <button
                    onClick={() => handleToggleSet(sIdx)}
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center transition cursor-pointer ${
                      set.completed 
                        ? 'bg-[#a3e635] text-black shadow-lg shadow-[#a3e635]/20 font-black' 
                        : 'bg-[#100c1e] border border-white/10 text-white/30 hover:text-white hover:border-[#a3e635]'
                    }`}
                  >
                    <Check size={18} strokeWidth={set.completed ? 3 : 2} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Rest Timer Panel */}
        {restSeconds > 0 && (
          <div className="bg-[#100c1e] border border-[#a3e635]/30 rounded-3xl p-4 flex items-center justify-between shadow-2xl animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#171228] border border-white/10 flex items-center justify-center text-[#a3e635]">
                <Clock size={20} className="animate-spin" />
              </div>
              <div>
                <p className="text-[11px] text-white/50">وقت الراحة بين المجموعات</p>
                <p className="text-2xl font-mono font-black text-[#bef264] tracking-wider">
                  {Math.floor(restSeconds / 60)}:{(restSeconds % 60).toString().padStart(2, '0')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setRestSeconds(sec => sec + 30)}
                className="bg-[#171228] text-xs px-3 py-2 rounded-xl text-white/70 hover:text-white border border-white/10"
              >
                +30ث
              </button>
              <button 
                onClick={() => {
                  setRestSeconds(0);
                  setIsTimerRunning(false);
                }}
                className="bg-rose-500/10 text-rose-300 text-xs px-3 py-2 rounded-xl border border-rose-500/30"
              >
                تخطي
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Sticky Bottom Controls */}
      <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-[#100c1e]/95 backdrop-blur-xl border-t border-white/10 flex items-center justify-between z-40">
        <Link 
          href="/dashboard" 
          className="text-xs text-white/40 hover:text-white flex items-center gap-1 font-bold"
        >
          <ChevronRight size={14} /> لوحة الكابتن
        </Link>
        <span className="text-[11px] text-white/50 font-mono">
          {completedSetsCount} / {totalSets} مجموعة
        </span>
        <button 
          onClick={() => {
            if (activeExerciseIndex < exercises.length - 1) {
              setActiveExerciseIndex(idx => idx + 1);
            } else {
              setCompletedWorkout(true);
            }
          }}
          className="bg-[#a3e635] hover:bg-[#8fd128] text-black font-black text-xs px-4 py-2.5 rounded-2xl transition flex items-center gap-1.5 shadow-lg shadow-[#a3e635]/20 cursor-pointer"
        >
          {activeExerciseIndex < exercises.length - 1 ? 'التمرين التالي' : 'إنهاء التمرين'}
          <ChevronLeft size={16} />
        </button>
      </footer>

    </div>
  );
}
