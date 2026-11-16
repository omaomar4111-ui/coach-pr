'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, 
  Plus, 
  Trash2, 
  Save, 
  Dumbbell, 
  Layers, 
  Search, 
  Filter, 
  GripVertical, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Clock,
  ShieldCheck
} from 'lucide-react';

// Curated Exercise Library with Muscle Groups & Equipment (Inspired by Workout.cool)
export interface ExerciseDefinition {
  id: string;
  name: string;
  muscle: 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core';
  equipment: 'barbell' | 'dumbbell' | 'cable' | 'machine' | 'bodyweight';
  defaultSets: number;
  defaultReps: string;
  defaultRir: number;
  injuryNotice?: string;
}

export const EXERCISE_LIBRARY: ExerciseDefinition[] = [
  // Chest
  { id: 'ex-bench-barbell', name: 'بنش برس مستوي بالبار (Barbell Bench Press)', muscle: 'chest', equipment: 'barbell', defaultSets: 4, defaultReps: '8-10', defaultRir: 2 },
  { id: 'ex-incline-db', name: 'تجميع دمبل مائل عالي (Incline Dumbbell Press)', muscle: 'chest', equipment: 'dumbbell', defaultSets: 3, defaultReps: '10-12', defaultRir: 1 },
  { id: 'ex-cable-crossover', name: 'تفتيح كابل عالي إلى منخفض (High Cable Flyes)', muscle: 'chest', equipment: 'cable', defaultSets: 3, defaultReps: '12-15', defaultRir: 1 },
  { id: 'ex-chest-press-machine', name: 'دفع صدر بالجهاز (Chest Press Machine)', muscle: 'chest', equipment: 'machine', defaultSets: 4, defaultReps: '10-12', defaultRir: 2 },
  
  // Back
  { id: 'ex-lat-pulldown', name: 'سحب عالي واسع (Wide Lat Pulldown)', muscle: 'back', equipment: 'cable', defaultSets: 4, defaultReps: '10-12', defaultRir: 1 },
  { id: 'ex-cable-row', name: 'سحب أرضي كابل (Seated Cable Row)', muscle: 'back', equipment: 'cable', defaultSets: 3, defaultReps: '10-12', defaultRir: 2 },
  { id: 'ex-db-row', name: 'منشار دمبل فردي (One-Arm Dumbbell Row)', muscle: 'back', equipment: 'dumbbell', defaultSets: 3, defaultReps: '10-12', defaultRir: 2 },
  { id: 'ex-rdl-db', name: 'ديدليفت روماني بالدمبل (Romanian Deadlift DB)', muscle: 'back', equipment: 'dumbbell', defaultSets: 4, defaultReps: '8-10', defaultRir: 2, injuryNotice: 'احذر التقوس في أسفل الظهر' },

  // Legs
  { id: 'ex-leg-press', name: 'دفع أرجل بالجهاز (Leg Press 45°)', muscle: 'legs', equipment: 'machine', defaultSets: 4, defaultReps: '10-12', defaultRir: 2 },
  { id: 'ex-leg-extension', name: 'تمديد أمامي للجهاز (Leg Extension)', muscle: 'legs', equipment: 'machine', defaultSets: 3, defaultReps: '12-15', defaultRir: 1 },
  { id: 'ex-leg-curl', name: 'ثني خلفي نائم (Lying Leg Curl)', muscle: 'legs', equipment: 'machine', defaultSets: 3, defaultReps: '12-15', defaultRir: 1 },
  { id: 'ex-calf-raise', name: 'سمانة وقوفاً بالجهاز (Standing Calf Raise)', muscle: 'legs', equipment: 'machine', defaultSets: 4, defaultReps: '15-20', defaultRir: 0 },

  // Shoulders
  { id: 'ex-ohp-db', name: 'ضغط أكتاف بالدمبل جالساً (Seated DB Shoulder Press)', muscle: 'shoulders', equipment: 'dumbbell', defaultSets: 4, defaultReps: '8-10', defaultRir: 2 },
  { id: 'ex-lateral-raise', name: 'رفرفة جانبي بالدمبل (DB Lateral Raise)', muscle: 'shoulders', equipment: 'dumbbell', defaultSets: 4, defaultReps: '12-15', defaultRir: 1 },
  { id: 'ex-face-pull', name: 'فيس بول كابل (Rope Face Pull)', muscle: 'shoulders', equipment: 'cable', defaultSets: 3, defaultReps: '15-18', defaultRir: 2 },

  // Arms
  { id: 'ex-biceps-ez', name: 'بايسبس بالبار الزجزاج (EZ-Bar Biceps Curl)', muscle: 'arms', equipment: 'barbell', defaultSets: 3, defaultReps: '10-12', defaultRir: 1 },
  { id: 'ex-triceps-rope', name: 'ترايسبس حبل لأسفل (Triceps Cable Pushdown)', muscle: 'arms', equipment: 'cable', defaultSets: 4, defaultReps: '12-15', defaultRir: 1 },
  { id: 'ex-hammer-curl', name: 'شاكوش دمبل للذراع (Hammer Curls)', muscle: 'arms', equipment: 'dumbbell', defaultSets: 3, defaultReps: '10-12', defaultRir: 1 },
];

export interface WorkoutPlanExercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weightKg: string;
  rir: number;
  restSec: number;
  injuryNotice?: string;
}

export interface WorkoutPlanDay {
  id: string;
  name: string;
  focus: string;
  exercises: WorkoutPlanExercise[];
}

export default function WorkoutBuilder() {
  const [days, setDays] = useState<WorkoutPlanDay[]>([
    { 
      id: 'day-1', 
      name: 'اليوم الأول - دفع وتضخيم الصدر (Push A)', 
      focus: 'صدر وتراي وأكتاف أمامية',
      exercises: [
        { id: '1', name: 'بنش برس مستوي بالبار (Barbell Bench Press)', sets: 4, reps: '8-10', weightKg: '75', rir: 2, restSec: 90 },
        { id: '2', name: 'تجميع دمبل مائل عالي (Incline Dumbbell Press)', sets: 3, reps: '10-12', weightKg: '28', rir: 1, restSec: 75 },
        { id: '3', name: 'ترايسبس حبل لأسفل (Triceps Cable Pushdown)', sets: 4, reps: '12-15', weightKg: '25', rir: 1, restSec: 60 },
      ] 
    },
    {
      id: 'day-2',
      name: 'اليوم الثاني - سحب وضهر ولاتس (Pull A)',
      focus: 'عضلات الظهر ولاتس وبايسبس',
      exercises: [
        { id: '4', name: 'سحب عالي واسع (Wide Lat Pulldown)', sets: 4, reps: '10-12', weightKg: '65', rir: 1, restSec: 90 },
        { id: '5', name: 'سحب أرضي كابل (Seated Cable Row)', sets: 3, reps: '10-12', weightKg: '60', rir: 2, restSec: 75 },
        { id: '6', name: 'بايسبس بالبار الزجزاج (EZ-Bar Biceps Curl)', sets: 3, reps: '10-12', weightKg: '30', rir: 1, restSec: 60 },
      ]
    }
  ]);

  // Exercise Library Modal Search & Filter States
  const [activeDayIdForPicker, setActiveDayIdForPicker] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('all');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Day Operations
  const addDay = () => {
    const newDayId = `day-${Date.now()}`;
    setDays([...days, {
      id: newDayId,
      name: `اليوم ${days.length + 1} - تمرين مخصص`,
      focus: 'توزيع العضلات المستهدفة',
      exercises: []
    }]);
  };

  const removeDay = (dayId: string) => {
    setDays(days.filter(d => d.id !== dayId));
  };

  // Exercise Reorder (Move Up / Down)
  const moveExercise = (dayId: string, exIndex: number, direction: 'up' | 'down') => {
    setDays(days.map(d => {
      if (d.id !== dayId) return d;
      const newExercises = [...d.exercises];
      const targetIndex = direction === 'up' ? exIndex - 1 : exIndex + 1;
      if (targetIndex < 0 || targetIndex >= newExercises.length) return d;
      
      const temp = newExercises[exIndex];
      newExercises[exIndex] = newExercises[targetIndex];
      newExercises[targetIndex] = temp;

      return { ...d, exercises: newExercises };
    }));
  };

  // Add Exercise from Library to Day
  const handleSelectFromLibrary = (ex: ExerciseDefinition) => {
    if (!activeDayIdForPicker) return;

    setDays(days.map(d => {
      if (d.id !== activeDayIdForPicker) return d;
      return {
        ...d,
        exercises: [
          ...d.exercises,
          {
            id: `ex-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            name: ex.name,
            sets: ex.defaultSets,
            reps: ex.defaultReps,
            weightKg: '20',
            rir: ex.defaultRir,
            restSec: 75,
            injuryNotice: ex.injuryNotice
          }
        ]
      };
    }));

    setActiveDayIdForPicker(null);
  };

  const removeExercise = (dayId: string, exId: string) => {
    setDays(days.map(d => d.id === dayId ? { ...d, exercises: d.exercises.filter(ex => ex.id !== exId) } : d));
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Filter Exercises
  const filteredExercises = EXERCISE_LIBRARY.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscle = selectedMuscle === 'all' || ex.muscle === selectedMuscle;
    const matchesEquipment = selectedEquipment === 'all' || ex.equipment === selectedEquipment;
    return matchesSearch && matchesMuscle && matchesEquipment;
  });

  return (
    <div className="p-6 sm:p-8 bg-[#07040D] min-h-screen text-white max-w-6xl mx-auto font-sans" dir="rtl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <Link href="/dashboard" className="text-[#7C3AED] hover:underline mb-2 inline-block text-sm flex items-center gap-1 font-bold">
            <ChevronLeft size={16} /> العودة للوحة التحكم
          </Link>
          <h1 className="text-3xl font-black tracking-tight">محرر التمارين (Workout Builder Pro)</h1>
          <p className="text-xs text-slate-400 mt-1">تصميم وتخصيص الجداول التدريبية بمكتبة تمارين ذكية وحسابات RIR والأوزان</p>
        </div>
        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 size={16} /> تم الحفظ في المنظومة!
            </span>
          )}
          <button onClick={handleSave} className="bg-[#10B981] px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-emerald-600 transition text-black font-bold text-sm shadow-lg shadow-emerald-950">
            <Save size={18} /> حفظ الخطة التدريبية
          </button>
        </div>
      </div>

      {/* Days Workout List */}
      <div className="space-y-6">
        {days.map((day) => (
          <div key={day.id} className="bg-[#0E081D] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
            {/* Day Header */}
            <div className="p-4 bg-[#140C2A] border-b border-white/[0.06] flex justify-between items-center">
              <div className="flex-1 max-w-md">
                <input 
                  type="text" 
                  value={day.name} 
                  onChange={e => {
                    const val = e.target.value;
                    setDays(days.map(d => d.id === day.id ? { ...d, name: val } : d));
                  }}
                  className="bg-transparent font-bold text-base sm:text-lg text-[#a78bfa] focus:outline-none w-full" 
                />
                <input
                  type="text"
                  value={day.focus}
                  onChange={e => {
                    const val = e.target.value;
                    setDays(days.map(d => d.id === day.id ? { ...d, focus: val } : d));
                  }}
                  placeholder="التركيز العضلي..."
                  className="bg-transparent text-xs text-slate-400 focus:outline-none w-full mt-0.5"
                />
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setActiveDayIdForPicker(day.id)}
                  className="bg-[#7C3AED]/20 hover:bg-[#7C3AED]/30 text-[#a78bfa] border border-[#7C3AED]/30 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Plus size={14} /> إضافة من المكتبة
                </button>
                <button onClick={() => removeDay(day.id)} className="text-slate-500 hover:text-rose-400 transition" title="حذف اليوم">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Exercises Table in Day */}
            <div className="p-4 space-y-2.5">
              {day.exercises.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-500 border border-dashed border-white/5 rounded-xl">
                  لا توجد تمارين مضافة في هذا اليوم بعد. اضغط على &quot;إضافة من المكتبة&quot; لتسريع البناء.
                </div>
              ) : (
                day.exercises.map((ex, index) => (
                  <div key={ex.id} className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 items-start sm:items-center bg-[#150D2A] p-3.5 rounded-xl border border-white/5 hover:border-white/15 transition">
                    {/* Index & Reorder Handles */}
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col text-slate-500">
                        <button 
                          onClick={() => moveExercise(day.id, index, 'up')}
                          disabled={index === 0}
                          className="hover:text-purple-400 disabled:opacity-20"
                          title="تحريك لأعلى"
                        >
                          <ArrowUp size={12} />
                        </button>
                        <button 
                          onClick={() => moveExercise(day.id, index, 'down')}
                          disabled={index === day.exercises.length - 1}
                          className="hover:text-purple-400 disabled:opacity-20"
                          title="تحريك لأسفل"
                        >
                          <ArrowDown size={12} />
                        </button>
                      </div>
                      <span className="text-xs font-mono font-bold text-purple-400 w-5">{index + 1}</span>
                    </div>

                    {/* Exercise Name */}
                    <div className="flex-1 w-full">
                      <input 
                        type="text" 
                        value={ex.name} 
                        onChange={e => {
                          const val = e.target.value;
                          setDays(days.map(d => d.id === day.id ? { ...d, exercises: d.exercises.map(item => item.id === ex.id ? { ...item, name: val } : item) } : d));
                        }}
                        className="bg-transparent font-medium text-xs sm:text-sm text-white focus:outline-none w-full" 
                      />
                      {ex.injuryNotice && (
                        <span className="text-[10px] text-amber-400 flex items-center gap-1 mt-0.5">
                          <AlertTriangle size={11} /> {ex.injuryNotice}
                        </span>
                      )}
                    </div>

                    {/* Sets, Reps, Weight, RIR Metrics */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      {/* Sets */}
                      <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg border border-white/5">
                        <span className="text-[10px] text-slate-400">مجموعات:</span>
                        <input 
                          type="number" 
                          value={ex.sets} 
                          onChange={e => {
                            const val = Number(e.target.value);
                            setDays(days.map(d => d.id === day.id ? { ...d, exercises: d.exercises.map(item => item.id === ex.id ? { ...item, sets: val } : item) } : d));
                          }}
                          className="w-8 bg-transparent text-center font-bold text-white focus:outline-none" 
                        />
                      </div>

                      {/* Reps */}
                      <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg border border-white/5">
                        <span className="text-[10px] text-slate-400">تكرار:</span>
                        <input 
                          type="text" 
                          value={ex.reps} 
                          onChange={e => {
                            const val = e.target.value;
                            setDays(days.map(d => d.id === day.id ? { ...d, exercises: d.exercises.map(item => item.id === ex.id ? { ...item, reps: val } : item) } : d));
                          }}
                          className="w-12 bg-transparent text-center font-bold text-white focus:outline-none" 
                        />
                      </div>

                      {/* Weight Kg */}
                      <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg border border-white/5">
                        <span className="text-[10px] text-slate-400">كجم:</span>
                        <input 
                          type="text" 
                          value={ex.weightKg} 
                          onChange={e => {
                            const val = e.target.value;
                            setDays(days.map(d => d.id === day.id ? { ...d, exercises: d.exercises.map(item => item.id === ex.id ? { ...item, weightKg: val } : item) } : d));
                          }}
                          className="w-10 bg-transparent text-center font-bold text-white focus:outline-none" 
                        />
                      </div>

                      {/* RIR (Reps in Reserve - inspired by Gymcoach) */}
                      <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg border border-white/5" title="الشدة المتبقية RIR">
                        <span className="text-[10px] text-purple-300">RIR:</span>
                        <input 
                          type="number" 
                          min={0}
                          max={4}
                          value={ex.rir} 
                          onChange={e => {
                            const val = Number(e.target.value);
                            setDays(days.map(d => d.id === day.id ? { ...d, exercises: d.exercises.map(item => item.id === ex.id ? { ...item, rir: val } : item) } : d));
                          }}
                          className="w-7 bg-transparent text-center font-bold text-purple-400 focus:outline-none" 
                        />
                      </div>

                      {/* Rest Seconds */}
                      <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg border border-white/5">
                        <Clock size={11} className="text-slate-400" />
                        <input 
                          type="number" 
                          step={15}
                          value={ex.restSec} 
                          onChange={e => {
                            const val = Number(e.target.value);
                            setDays(days.map(d => d.id === day.id ? { ...d, exercises: d.exercises.map(item => item.id === ex.id ? { ...item, restSec: val } : item) } : d));
                          }}
                          className="w-9 bg-transparent text-center text-slate-300 focus:outline-none" 
                        />
                        <span className="text-[10px] text-slate-500">ث</span>
                      </div>

                      {/* Delete Exercise */}
                      <button 
                        onClick={() => removeExercise(day.id, ex.id)} 
                        className="text-slate-500 hover:text-rose-400 p-1 transition"
                        title="حذف الحركة"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Day Button */}
      <button 
        onClick={addDay} 
        className="w-full mt-6 py-4 border-2 border-dashed border-gray-800 rounded-2xl text-gray-400 hover:text-[#7C3AED] hover:border-[#7C3AED] transition flex justify-center items-center gap-2 font-bold text-sm bg-white/[0.01]"
      >
        <Plus size={20} /> إضافة يوم تدريبي جديد للخطة
      </button>

      {/* Exercise Library Modal Picker (Workout.cool Architecture) */}
      {activeDayIdForPicker && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E081D] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-[#140C2A]">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-white">مكتبة التمارين الرياضية (Exercise Library)</h3>
                <p className="text-[11px] text-slate-400">اختر التمرين لإضافته فورياً لليوم التدريبي مع القيم المقترحة</p>
              </div>
              <button 
                onClick={() => setActiveDayIdForPicker(null)}
                className="text-xs px-2.5 py-1 rounded-lg bg-white/10 text-slate-400 hover:text-white"
              >
                إغلاق ✕
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 border-b border-white/[0.06] space-y-3 bg-[#0A0514]">
              <div className="relative">
                <Search size={16} className="absolute right-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="ابحث باسم التمرين (عربي أو إنجليزي)..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-[#150D2A] border border-white/10 rounded-xl pr-9 pl-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Muscle Filters */}
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                {[
                  { id: 'all', label: 'الكل' },
                  { id: 'chest', label: 'الصدر' },
                  { id: 'back', label: 'الظهر' },
                  { id: 'legs', label: 'الأرجل' },
                  { id: 'shoulders', label: 'الأكتاف' },
                  { id: 'arms', label: 'الذراعين' },
                ].map(m => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMuscle(m.id)}
                    className={`px-2.5 py-1 rounded-lg border transition ${
                      selectedMuscle === m.id
                        ? 'bg-purple-600/30 border-purple-500 text-white font-bold'
                        : 'bg-[#150D2A] border-white/5 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Exercises Results List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {filteredExercises.length === 0 ? (
                <p className="text-center py-8 text-xs text-slate-500">لا توجد تمارين تطابق معايير البحث.</p>
              ) : (
                filteredExercises.map(ex => (
                  <div
                    key={ex.id}
                    onClick={() => handleSelectFromLibrary(ex)}
                    className="p-3 rounded-xl bg-[#150D2A] border border-white/5 hover:border-purple-500/50 hover:bg-[#1C1236] cursor-pointer transition flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-white">{ex.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40 font-medium">
                          {ex.muscle}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {ex.equipment}
                        </span>
                        {ex.injuryNotice && (
                          <span className="text-[10px] text-amber-400 flex items-center gap-0.5">
                            <ShieldCheck size={10} /> تنبيه مفصلي
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-[#a78bfa] font-bold">+ إضافة</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
