"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { 
  Dumbbell, 
  Utensils, 
  User, 
  TrendingUp, 
  MessageSquare, 
  Check, 
  Play, 
  Flame, 
  ChevronRight, 
  ChevronLeft,
  Bell,
  Clock,
  Sparkles,
  Award,
  Wifi,
  WifiOff,
  RefreshCw,
  Info,
  Calendar,
  AlertTriangle,
  RotateCcw,
  Zap,
  CheckCircle2,
  Trophy,
  Activity,
  Send,
  Plus
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  cacheWorkoutOffline, 
  getCachedWorkout, 
  queueOfflineOperation, 
  syncPendingOperations,
  getPendingSyncOperations,
  clearAthleteOfflineData,
  StoredWorkout 
} from '@/lib/athleteStorage';
import './athlete.css';

type ActiveTab = 'today' | 'workout' | 'diet' | 'progress' | 'coach';

export default function AthleteMobileApp() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('today');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Athlete & Coach Live State
  const [homeData, setHomeData] = useState<any>(null);
  const [workoutSession, setWorkoutSession] = useState<any>(null);
  
  // Workout Execution State
  const [isResting, setIsResting] = useState<boolean>(false);
  const [restTime, setRestTime] = useState<number>(90);
  const [restInitial, setRestInitial] = useState<number>(90);
  const [workoutCompletedModal, setWorkoutCompletedModal] = useState<boolean>(false);
  const [summaryStats, setSummaryStats] = useState<{ volume: number; sets: number; prs: number }>({ volume: 0, sets: 0, prs: 0 });

  // Coach Chat State
  const [chatMessages, setChatMessages] = useState<any[]>([
    { sender: 'coach', text: 'مساء الخير يا كابتن كريم! شفت أداءك في السكوات الأخير ممتاز جداً. ركز النهاردة في تمرين الصدر على التحكم في النزول السلبي.', time: '02:30 م' }
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [currentDateStr, setCurrentDateStr] = useState<string>('السبت، 21 نوفمبر');

  useEffect(() => {
    setCurrentDateStr(new Date().toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' }));
  }, []);

  // 1. Connectivity & Background Sync Listeners
  const triggerSync = useCallback(async () => {
    if (!navigator.onLine) return;
    setIsSyncing(true);
    try {
      const { synced, failed } = await syncPendingOperations();
      if (synced > 0) {
        toast.success(`تمت مزامنة ${synced} عمليات بنجاح مع السيرفر!`);
      }
      const pending = await getPendingSyncOperations();
      setPendingSyncCount(pending.length);
    } catch (e) {
      console.warn('Sync notice:', e);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => {
      setIsOnline(true);
      toast.info('تمت استعادة الاتصال بالإنترنت — جاري مزامنة بياناتك...');
      triggerSync();
    };
    const handleOffline = () => {
      setIsOnline(false);
      toast.warning('أنت الآن أوفلاين. سيتم حفظ مجموعاتك وتمارينك محلياً بدقة.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial sync count check
    getPendingSyncOperations().then(items => setPendingSyncCount(items.length));

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [triggerSync]);

  // 2. Load Athlete Live State (Cache First + Network Stale-While-Revalidate)
  const fetchAthleteHome = useCallback(async () => {
    setIsLoading(true);
    try {
      // 1. Try local cache first
      const cached = await getCachedWorkout('workout-push-01');
      if (cached && !homeData) {
        setWorkoutSession(cached);
      }

      // 2. Fetch fresh network data
      const res = await fetch('/api/athlete/home?athleteId=trainee_karim');
      const json = await res.json();
      if (json.success && json.data) {
        setHomeData(json.data);
        setWorkoutSession(json.data.todayWorkout);

        // Cache assigned workout in IndexedDB for offline gym sessions
        if (json.data.todayWorkout) {
          await cacheWorkoutOffline({
            id: json.data.todayWorkout.id,
            athleteId: json.data.athlete.id,
            dayName: 'السبت',
            workoutName: json.data.todayWorkout.name,
            exercises: json.data.todayWorkout.exercises,
            cachedAt: new Date().toISOString()
          });
        }
      }
    } catch (err) {
      console.warn('Failed to load online data, running in cached mode:', err);
    } finally {
      setIsLoading(false);
    }
  }, [homeData]);

  useEffect(() => {
    fetchAthleteHome();
  }, [fetchAthleteHome]);

  // 3. Rest Timer Hook
  useEffect(() => {
    let timer: any;
    if (isResting && restTime > 0) {
      timer = setInterval(() => setRestTime(t => t - 1), 1000);
    } else if (restTime === 0) {
      setIsResting(false);
      // Haptic vibration feedback on completion if supported
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }
    }
    return () => clearInterval(timer);
  }, [isResting, restTime]);

  // 4. Toggle Set Completion & Autosave / Offline Queue
  const handleToggleSet = async (exIndex: number, setIndex: number) => {
    if (!workoutSession) return;

    const updated = JSON.parse(JSON.stringify(workoutSession));
    const targetSet = updated.exercises[exIndex].sets[setIndex];
    targetSet.completed = !targetSet.completed;

    setWorkoutSession(updated);

    // If marked as completed, trigger rest timer
    if (targetSet.completed) {
      const restSecs = updated.exercises[exIndex].restSeconds || 90;
      setRestInitial(restSecs);
      setRestTime(restSecs);
      setIsResting(true);
    }

    // Update local cache
    await cacheWorkoutOffline({
      id: updated.id,
      athleteId: homeData?.athlete?.id || 'trainee_karim',
      dayName: 'السبت',
      workoutName: updated.name,
      exercises: updated.exercises,
      cachedAt: new Date().toISOString()
    });
  };

  // 5. Update Set Weight / Reps / RPE
  const handleSetChange = (exIndex: number, setIndex: number, field: string, value: any) => {
    if (!workoutSession) return;
    const updated = JSON.parse(JSON.stringify(workoutSession));
    updated.exercises[exIndex].sets[setIndex][field] = value;
    setWorkoutSession(updated);
  };

  // 6. Complete Workout Session
  const handleFinishWorkout = async () => {
    if (!workoutSession) return;

    let totalVolume = 0;
    let completedSetsCount = 0;

    workoutSession.exercises.forEach((ex: any) => {
      ex.sets.forEach((s: any) => {
        if (s.completed) {
          completedSetsCount++;
          const w = parseFloat(s.actualWeight || s.targetWeight) || 0;
          const r = parseInt(s.actualReps || s.targetReps) || 0;
          totalVolume += w * r;
        }
      });
    });

    const idempotencyKey = `workout_${workoutSession.id}_${Date.now()}`;
    const payload = {
      athleteId: homeData?.athlete?.id || 'trainee_karim',
      workoutName: workoutSession.name,
      logs: workoutSession.exercises,
      syncedAt: new Date().toISOString()
    };

    setSummaryStats({
      volume: totalVolume,
      sets: completedSetsCount,
      prs: 1
    });
    setWorkoutCompletedModal(true);

    if (navigator.onLine) {
      try {
        const res = await fetch('/api/workout/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, idempotencyKey })
        });
        if (res.ok) {
          toast.success('عاش يا بطل! تم تسجيل وحفظ تمرينك بالكامل في قاعدة البيانات.');
          return;
        }
      } catch (e) {
        console.warn('Network sync failed, queuing offline:', e);
      }
    }

    // Fallback: Queue operation for reliable offline replay
    await queueOfflineOperation({
      idempotencyKey,
      athleteId: homeData?.athlete?.id || 'trainee_karim',
      type: 'WORKOUT_COMPLETION',
      payload
    });
    const pending = await getPendingSyncOperations();
    setPendingSyncCount(pending.length);
    toast.info('تم حفظ التمرين محلياً (أوفلاين) وسيتم إرساله تلقائياً فور عودة الإنترنت.');
  };

  // 7. Toggle Nutrition Meal Checked
  const handleToggleMeal = (mealIndex: number) => {
    if (!homeData?.nutrition?.meals) return;
    const updated = JSON.parse(JSON.stringify(homeData));
    updated.nutrition.meals[mealIndex].checked = !updated.nutrition.meals[mealIndex].checked;
    setHomeData(updated);
    toast.success('تم تحديث وجباتك اليومية.');
  };

  // 8. Send Coach Message
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const newMsg = {
      sender: 'athlete',
      text: chatInput,
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, newMsg]);
    setChatInput('');
    toast.success('تم إرسال رسالتك لكابتن تامر.');
  };

  return (
    <div className="cpr-app-container select-none" dir="rtl">
      
      {/* TOP PWA APP HEADER */}
      <header className="cpr-app-header px-4 py-3 sticky top-0 z-40 flex items-center justify-between">
        
        {/* User Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#d4f60b] text-[#07080a] font-black flex items-center justify-center text-xs shadow-[0_0_15px_rgba(212,246,11,0.4)]">
            {homeData?.athlete?.avatar || 'كأ'}
          </div>
          <div>
            <h1 className="text-xs font-black text-white flex items-center gap-1.5">
              <span>مساء الخير، {homeData?.athlete?.name?.split(' ')[0] || 'كريم'}</span>
              <span className="text-[10px] bg-[#d4f60b]/15 text-[#d4f60b] px-1.5 py-0.5 rounded-full border border-[#d4f60b]/30">
                PRO
              </span>
            </h1>
            <p className="text-[10px] text-white/50 font-mono">
              {currentDateStr}
            </p>
          </div>
        </div>

        {/* Sync & Connectivity Status Pill */}
        <div className="flex items-center gap-2">
          {pendingSyncCount > 0 && (
            <button 
              onClick={triggerSync}
              className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full flex items-center gap-1"
              title="عمليات في انتظار المزامنة"
            >
              <RefreshCw size={10} className={isSyncing ? "animate-spin" : ""} />
              <span>{pendingSyncCount} معلقة</span>
            </button>
          )}

          <div 
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border transition ${
              isOnline 
                ? 'bg-[#d4f60b]/10 text-[#d4f60b] border-[#d4f60b]/30' 
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}
          >
            {isOnline ? <Wifi size={11} /> : <WifiOff size={11} />}
            <span>{isOnline ? 'متصل' : 'أوفلاين'}</span>
          </div>

          <Link 
            href="/dashboard"
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white"
            title="لوحة المدرب"
          >
            <Activity size={14} />
          </Link>
        </div>
      </header>

      {/* MAIN VIEWPORT BODY */}
      <main className="flex-1 p-4 pb-24 space-y-4 max-w-lg mx-auto w-full overflow-y-auto">
        
        {/* ============================================================ */}
        {/* TAB 1: TODAY (Score 10/10, Hero Workout, Nutrition, Coach)    */}
        {/* ============================================================ */}
        {activeTab === 'today' && (
          <>
            {/* 10/10 RADIAL ADHERENCE WIDGET */}
            <div className="cpr-card cpr-card-glow p-4 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Flame size={14} className="text-[#d4f60b]" />
                  <span className="text-[11px] text-[#d4f60b] font-bold tracking-wide">
                    درجة التزام اليوم 10/10
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black font-mono text-[#d4f60b]">
                    {homeData?.tenOfTen?.score || 8}
                  </span>
                  <span className="text-xs text-white/40 font-mono">/ 10</span>
                </div>
                <p className="text-[10px] text-white/60 max-w-[200px]">
                  {homeData?.tenOfTen?.statusText || "فاضل تمرين الصدر ووجبة العشاء لتكتمل الـ 10/10 اليوم!"}
                </p>
              </div>

              {/* Radial Progress Ring */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div 
                  className="w-16 h-16 rounded-full cpr-radial-ring flex items-center justify-center p-1.5"
                  style={{ '--adherence-percent': ((homeData?.tenOfTen?.score || 8) / 10) * 100 } as any}
                >
                  <div className="w-full h-full rounded-full bg-[#07080a] flex items-center justify-center">
                    <span className="text-xs font-black font-mono text-[#d4f60b]">
                      {((homeData?.tenOfTen?.score || 8) * 10)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* TODAY'S WORKOUT HERO CARD */}
            <div className="cpr-card p-5 space-y-4 border-l-4 border-l-[#d4f60b]">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-white/40 tracking-wider block">
                    تمرينة النهاردة المخصصة
                  </span>
                  <h2 className="text-lg font-black text-white mt-0.5">
                    {workoutSession?.name || "Push Day — الصدر والترايسبس"}
                  </h2>
                  <p className="text-[11px] text-white/50 mt-1 flex items-center gap-2">
                    <span>{workoutSession?.totalExercises || 5} تمارين</span>
                    <span>&bull;</span>
                    <span>~{workoutSession?.estimatedDurationMinutes || 42} دقيقة</span>
                    <span>&bull;</span>
                    <span className="text-[#d4f60b]">FST-7 مدمج</span>
                  </p>
                </div>
                <span className="text-[10px] bg-[#d4f60b]/10 text-[#d4f60b] border border-[#d4f60b]/30 px-2.5 py-0.5 rounded-full font-bold">
                  جدول كابتن تامر
                </span>
              </div>

              <div className="space-y-2 pt-1">
                <button 
                  onClick={() => setActiveTab('workout')}
                  className="w-full py-3.5 cpr-btn-primary text-xs flex items-center justify-center gap-2"
                >
                  <Play size={15} className="fill-black" />
                  <span>ابدأ تسجيل التمرينة الحية</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setActiveTab('progress')}
                    className="py-2.5 cpr-btn-secondary text-[11px] flex items-center justify-center gap-1.5"
                  >
                    <Trophy size={13} />
                    <span>أرقامك القياسية (PR)</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('coach')}
                    className="py-2.5 bg-white/5 hover:bg-white/10 text-white/80 font-bold text-[11px] rounded-xl border border-white/10 flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare size={13} />
                    <span>استشر الكوتش</span>
                  </button>
                </div>
              </div>
            </div>

            {/* WEEKLY SCHEDULE STRIP */}
            <div className="cpr-card p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Calendar size={13} className="text-[#d4f60b]" />
                  <span>جدول الأسبوع الحالي</span>
                </span>
                <span className="text-[10px] text-white/40">5 أيام تمرين / 2 راحة</span>
              </div>

              <div className="grid grid-cols-7 gap-1.5 pt-1">
                {(homeData?.weeklySchedule || [
                  { day: "سبت", status: "today", active: true },
                  { day: "أحد", status: "upcoming", active: false },
                  { day: "اثنين", status: "upcoming", active: false },
                  { day: "ثلاثاء", status: "rest", active: false },
                  { day: "أربعاء", status: "upcoming", active: false },
                  { day: "خميس", status: "upcoming", active: false },
                  { day: "جمعة", status: "rest", active: false }
                ]).map((d: any, idx: number) => (
                  <div 
                    key={idx}
                    className={`py-2 px-1 rounded-xl text-center border flex flex-col items-center justify-center transition ${
                      d.status === 'today'
                        ? 'bg-[#d4f60b]/15 border-[#d4f60b] text-[#d4f60b]'
                        : d.status === 'rest'
                        ? 'bg-white/[0.02] border-white/5 text-white/30'
                        : 'bg-white/5 border-white/10 text-white/70'
                    }`}
                  >
                    <span className="text-[10px] font-bold block">{d.day.slice(0, 3)}</span>
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5" style={{
                      backgroundColor: d.status === 'today' ? '#d4f60b' : d.status === 'rest' ? '#4b5563' : '#a855f7'
                    }} />
                  </div>
                ))}
              </div>
            </div>

            {/* COACH ANNOUNCEMENT */}
            <div className="cpr-card p-4 bg-gradient-to-l from-[#11141a] to-[#161224] border border-[#7C3AED]/30 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center shrink-0 text-[#c4b5fd]">
                <Sparkles size={16} />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-[#c4b5fd] block">توجيه كابتن تامر اليومي</span>
                <p className="text-xs text-white/80 leading-relaxed">
                  {homeData?.coach?.announcement || "عاش يا وحش! ركز في التمرين على التحكم في النزول السلبي لتوليد أقصى استجابة عضلية."}
                </p>
              </div>
            </div>

            {/* SUBSCRIPTION STATUS PILL */}
            <div className="cpr-card p-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-white/60">حالة الاشتراك:</span>
                <span className="font-bold text-white">{homeData?.athlete?.subscriptionPlan || "باقة النخبة (Elite)"}</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#d4f60b] bg-[#d4f60b]/10 px-2 py-0.5 rounded-md border border-[#d4f60b]/20">
                متبقي {homeData?.athlete?.subscriptionDaysLeft || 19} يوم
              </span>
            </div>
          </>
        )}

        {/* ============================================================ */}
        {/* TAB 2: WORKOUT EXECUTION (Gym Floor Mode, Sets, Timer)         */}
        {/* ============================================================ */}
        {activeTab === 'workout' && (
          <div className="space-y-4">
            
            {/* Active Rest Timer Banner (Floating when active) */}
            {isResting && (
              <div className="cpr-card cpr-timer-active p-4 bg-[#0e140a] border-2 border-[#d4f60b] flex items-center justify-between sticky top-16 z-30 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#d4f60b] text-black flex items-center justify-center font-black">
                    <Clock size={20} className="animate-spin" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-white block">مؤقت الراحة قيد التشغيل</span>
                    <span className="text-[10px] text-white/50">تنفس بعمق واستعد للمجموعة القادمة</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black font-mono text-[#d4f60b]">
                    {restTime}s
                  </span>
                  <button 
                    onClick={() => setRestTime(t => t + 30)}
                    className="text-[10px] bg-white/10 text-white font-mono px-2 py-1 rounded-md hover:bg-white/20"
                    title="+30 ثانية"
                  >
                    +30s
                  </button>
                  <button 
                    onClick={() => setIsResting(false)}
                    className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-1 rounded-md"
                  >
                    تخطي
                  </button>
                </div>
              </div>
            )}

            {/* Workout Header Info */}
            <div className="cpr-card p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#d4f60b] font-bold block">جلسة التمرين الحالية</span>
                <h2 className="text-base font-black text-white">{workoutSession?.name || "Push Day"}</h2>
              </div>
              <button 
                onClick={handleFinishWorkout}
                className="cpr-btn-primary px-3.5 py-2 text-xs flex items-center gap-1.5"
              >
                <CheckCircle2 size={14} />
                <span>إنهاء التمرين</span>
              </button>
            </div>

            {/* Exercise Matrix List */}
            {workoutSession?.exercises?.map((exercise: any, exIdx: number) => (
              <div key={exercise.id || exIdx} className="cpr-card p-4 space-y-3">
                <div className="flex justify-between items-start border-b border-white/5 pb-2.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold bg-white/10 text-white px-2 py-0.5 rounded-md">
                        #{exIdx + 1}
                      </span>
                      <h3 className="text-sm font-black text-white">{exercise.name}</h3>
                    </div>
                    <p className="text-[11px] text-white/50 mt-1">
                      {exercise.targetMuscle} &bull; {exercise.equipment} &bull; راحة {exercise.restSeconds}ث
                    </p>
                  </div>
                  <span className="text-[10px] bg-[#7C3AED]/20 text-[#c4b5fd] border border-[#7C3AED]/30 px-2 py-0.5 rounded-full font-bold">
                    {exercise.sets.length} مجموعات
                  </span>
                </div>

                {exercise.cues && (
                  <p className="text-[10px] text-white/60 bg-white/[0.02] p-2 rounded-lg border border-white/5 leading-relaxed">
                    💡 <strong className="text-white/80">تكنيك الكوتش:</strong> {exercise.cues}
                  </p>
                )}

                {/* Sets Header */}
                <div className="grid grid-cols-5 text-[10px] font-mono text-white/40 px-2">
                  <span>المجموعة</span>
                  <span>الهدف</span>
                  <span>الوزن (كجم)</span>
                  <span>العدات</span>
                  <span className="text-left">تأكيد</span>
                </div>

                {/* Sets Rows */}
                <div className="space-y-1.5">
                  {exercise.sets.map((set: any, sIdx: number) => (
                    <div 
                      key={sIdx}
                      className={`cpr-set-row grid grid-cols-5 items-center p-2 rounded-xl border ${
                        set.completed ? 'is-completed' : 'bg-white/[0.02] border-white/5'
                      }`}
                    >
                      <span className="text-xs font-mono font-bold text-white/70">
                        {set.setNumber}
                      </span>

                      <span className="text-[11px] font-mono text-white/40">
                        {set.targetReps}
                      </span>

                      {/* Weight Input */}
                      <div>
                        <input 
                          type="number"
                          value={set.actualWeight ?? set.targetWeight}
                          onChange={(e) => handleSetChange(exIdx, sIdx, 'actualWeight', e.target.value)}
                          className="w-14 bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-xs font-mono text-center text-white focus:border-[#d4f60b] outline-none"
                        />
                      </div>

                      {/* Reps Input */}
                      <div>
                        <input 
                          type="number"
                          value={set.actualReps ?? 10}
                          onChange={(e) => handleSetChange(exIdx, sIdx, 'actualReps', e.target.value)}
                          className="w-12 bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-xs font-mono text-center text-white focus:border-[#d4f60b] outline-none"
                        />
                      </div>

                      {/* Complete Checkbox */}
                      <div className="flex justify-end">
                        <button 
                          onClick={() => handleToggleSet(exIdx, sIdx)}
                          className={`w-6 h-6 rounded-lg border flex items-center justify-center transition active:scale-90 ${
                            set.completed 
                              ? 'bg-[#d4f60b] border-[#d4f60b] text-black shadow-[0_0_10px_rgba(212,246,11,0.5)]' 
                              : 'border-white/20 hover:border-white/40 text-transparent'
                          }`}
                        >
                          <Check size={14} strokeWidth={3} className={set.completed ? "text-black" : "opacity-0"} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Bottom Finish Button */}
            <button 
              onClick={handleFinishWorkout}
              className="w-full py-4 cpr-btn-primary text-sm font-black flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={16} />
              <span>تسجيل وإنهاء تمرين اليوم بالكامل</span>
            </button>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: DIET (Nutrition, Macros & Daily Meals Tracking)        */}
        {/* ============================================================ */}
        {activeTab === 'diet' && (
          <div className="space-y-4">
            
            {/* Calories & Macros Overview */}
            <div className="cpr-card p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-white">السعرات والماكروز اليومية</span>
                <span className="text-[10px] text-white/40 font-mono">الهدف: 2,800 KCAL</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                  <span className="text-[10px] text-white/40 block">بروتين</span>
                  <span className="text-base font-black font-mono text-[#d4f60b]">145g</span>
                  <span className="text-[9px] text-white/30 block">/ 190g</span>
                </div>
                <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                  <span className="text-[10px] text-white/40 block">كاربوهيدرات</span>
                  <span className="text-base font-black font-mono text-white">210g</span>
                  <span className="text-[9px] text-white/30 block">/ 320g</span>
                </div>
                <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                  <span className="text-[10px] text-white/40 block">دهون صحية</span>
                  <span className="text-base font-black font-mono text-[#c4b5fd]">48g</span>
                  <span className="text-[9px] text-white/30 block">/ 70g</span>
                </div>
              </div>
            </div>

            {/* Daily Meals Checklist */}
            <div className="cpr-card p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-white">قائمة الوجبات المقررة</span>
                <span className="text-[10px] text-[#d4f60b] font-bold">اضغط لتأكيد الأكل</span>
              </div>

              <div className="space-y-2 pt-1">
                {(homeData?.nutrition?.meals || []).map((meal: any, idx: number) => (
                  <div 
                    key={meal.id || idx}
                    onClick={() => handleToggleMeal(idx)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                      meal.checked 
                        ? 'bg-[#d4f60b]/10 border-[#d4f60b]/30 text-white' 
                        : 'bg-white/[0.02] border-white/5 text-white/70'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-lg border flex items-center justify-center ${
                        meal.checked ? 'bg-[#d4f60b] border-[#d4f60b] text-black' : 'border-white/20'
                      }`}>
                        {meal.checked && <Check size={12} strokeWidth={3} />}
                      </div>
                      <div>
                        <span className={`text-xs font-bold block ${meal.checked ? 'line-through text-white/50' : 'text-white'}`}>
                          {meal.name}
                        </span>
                        <span className="text-[10px] text-white/40 font-mono">
                          {meal.calories} kcal &bull; {meal.protein}g بروتين
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: PROGRESS (Personal Records, 1RM, Volume Streak)        */}
        {/* ============================================================ */}
        {activeTab === 'progress' && (
          <div className="space-y-4">
            
            {/* PR Trophy Hero Card */}
            <div className="cpr-card p-4 bg-gradient-to-r from-[#11141a] via-[#151c11] to-[#11141a] border border-[#d4f60b]/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#d4f60b] font-bold block mb-0.5">لوحة الأرقام القياسية</span>
                <h2 className="text-base font-black text-white">Personal Records (PR)</h2>
                <p className="text-[11px] text-white/50 mt-1">تم تحقيق 4 أرقام قياسية جديدة هذا الشهر</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#d4f60b]/10 border border-[#d4f60b]/30 flex items-center justify-center text-[#d4f60b]">
                <Trophy size={24} />
              </div>
            </div>

            {/* PR Cards Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {(homeData?.personalRecords || []).map((pr: any, idx: number) => (
                <div key={idx} className="cpr-card p-3.5 space-y-1">
                  <span className="text-[10px] font-bold text-white/40 block">{pr.exerciseName}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black font-mono text-[#d4f60b]">{pr.weightKg}</span>
                    <span className="text-[10px] font-mono text-white/40">KG &times; {pr.reps}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-white/5 text-[9px] font-mono text-white/40">
                    <span>1RM: ~{Math.round(pr.estimated1rm || pr.weightKg * 1.15)} كجم</span>
                    <span>{pr.date || 'مؤكد'}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Consistency & Streak */}
            <div className="cpr-card p-4 space-y-2">
              <span className="text-xs font-bold text-white block">الاستمرارية والالتزام</span>
              <div className="flex items-center justify-between bg-black/30 p-3 rounded-xl border border-white/5">
                <div className="flex items-center gap-2">
                  <Flame size={18} className="text-[#d4f60b]" />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {homeData?.athlete?.streakDays || 14} يوم متواصل بدون انقطاع
                    </span>
                    <span className="text-[10px] text-white/40">أعلى استمرارية سابقة: 21 يوم</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#d4f60b]">🔥 مستمر</span>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 5: COACH CHAT (Direct Messenger & Form Check Inquiries)    */}
        {/* ============================================================ */}
        {activeTab === 'coach' && (
          <div className="cpr-card p-4 flex flex-col h-[70vh]">
            
            {/* Coach Chat Top */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#7C3AED] text-white font-black flex items-center justify-center text-xs">
                  كت
                </div>
                <div>
                  <h3 className="text-xs font-black text-white">{homeData?.coach?.name || "كابتن تامر"}</h3>
                  <span className="text-[10px] text-emerald-400">متصل الآن</span>
                </div>
              </div>
              <span className="text-[10px] text-white/40 font-mono">مدرب معتمد NASM</span>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto py-3 space-y-2.5">
              {chatMessages.map((msg, idx) => (
                <div 
                  key={idx}
                  className={`flex flex-col ${msg.sender === 'athlete' ? 'items-start' : 'items-end'}`}
                >
                  <div className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                    msg.sender === 'athlete' 
                      ? 'bg-[#d4f60b] text-black font-semibold rounded-br-none' 
                      : 'bg-white/10 text-white rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] font-mono text-white/30 px-1 mt-0.5">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="pt-2 flex items-center gap-2 border-t border-white/10">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="اكتب استفسارك أو ملحوظتك لكابتن تامر..."
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#d4f60b] outline-none"
              />
              <button 
                onClick={handleSendMessage}
                className="w-9 h-9 rounded-xl bg-[#d4f60b] text-black flex items-center justify-center hover:bg-[#c2e205] transition active:scale-95"
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        )}

      </main>

      {/* ============================================================ */}
      {/* WORKOUT COMPLETION CELEBRATION MODAL                           */}
      {/* ============================================================ */}
      {workoutCompletedModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="cpr-card p-6 max-w-sm w-full text-center space-y-4 border-2 border-[#d4f60b] shadow-[0_0_40px_rgba(212,246,11,0.3)] animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-3xl bg-[#d4f60b]/20 border border-[#d4f60b]/40 text-[#d4f60b] mx-auto flex items-center justify-center">
              <Trophy size={32} />
            </div>

            <div>
              <h2 className="text-xl font-black text-white">عاش يا بطل! تمرين مكتمل 🔥</h2>
              <p className="text-xs text-white/60 mt-1">تم تسجيل جميع المجموعات وحساب الحجم التدريبي بنجاح.</p>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-black/40 p-3 rounded-xl border border-white/10">
              <div>
                <span className="text-[10px] text-white/40 block">إجمالي الحجم</span>
                <span className="text-base font-black font-mono text-[#d4f60b]">{summaryStats.volume.toLocaleString()} KG</span>
              </div>
              <div>
                <span className="text-[10px] text-white/40 block">المجموعات المنجزة</span>
                <span className="text-base font-black font-mono text-white">{summaryStats.sets} مجاميع</span>
              </div>
            </div>

            <button 
              onClick={() => {
                setWorkoutCompletedModal(false);
                setActiveTab('today');
              }}
              className="w-full py-3 cpr-btn-primary text-xs font-black"
            >
              العودة للرئيسية ومتابعة يومك
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MOBILE BOTTOM NAVIGATION BAR (GymRate Inspired Ergonomics)     */}
      {/* ============================================================ */}
      <nav className="cpr-bottom-nav h-16 fixed bottom-0 left-0 right-0 z-40 px-4 flex items-center justify-around max-w-lg mx-auto">
        
        <button 
          onClick={() => setActiveTab('today')}
          className={`flex flex-col items-center gap-1 transition ${
            activeTab === 'today' ? 'text-[#d4f60b]' : 'text-white/40 hover:text-white/70'
          }`}
        >
          <Flame size={18} className={activeTab === 'today' ? "animate-pulse" : ""} />
          <span className="text-[10px] font-bold">النهاردة</span>
        </button>

        <button 
          onClick={() => setActiveTab('workout')}
          className={`flex flex-col items-center gap-1 transition ${
            activeTab === 'workout' ? 'text-[#d4f60b]' : 'text-white/40 hover:text-white/70'
          }`}
        >
          <Dumbbell size={18} />
          <span className="text-[10px] font-bold">التمرينة</span>
        </button>

        <button 
          onClick={() => setActiveTab('diet')}
          className={`flex flex-col items-center gap-1 transition ${
            activeTab === 'diet' ? 'text-[#d4f60b]' : 'text-white/40 hover:text-white/70'
          }`}
        >
          <Utensils size={18} />
          <span className="text-[10px] font-bold">الأكل</span>
        </button>

        <button 
          onClick={() => setActiveTab('progress')}
          className={`flex flex-col items-center gap-1 transition ${
            activeTab === 'progress' ? 'text-[#d4f60b]' : 'text-white/40 hover:text-white/70'
          }`}
        >
          <TrendingUp size={18} />
          <span className="text-[10px] font-bold">تقدمك (PR)</span>
        </button>

        <button 
          onClick={() => setActiveTab('coach')}
          className={`flex flex-col items-center gap-1 transition ${
            activeTab === 'coach' ? 'text-[#d4f60b]' : 'text-white/40 hover:text-white/70'
          }`}
        >
          <MessageSquare size={18} />
          <span className="text-[10px] font-bold">الكوتش</span>
        </button>

      </nav>

    </div>
  );
}
