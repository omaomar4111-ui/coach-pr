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
  ShieldCheck,
  FileSpreadsheet,
  ClipboardPaste,
  HelpCircle,
  Zap,
  Award,
  BookOpen,
  Flame,
  Check
} from 'lucide-react';
import { toast } from 'sonner';

// Curated Exercise Library with Muscle Groups & Equipment
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
  { id: 'ex-cable-crossover', name: 'سيفن كابل كروس أوفر (FST-7 Cable Flyes)', muscle: 'chest', equipment: 'cable', defaultSets: 7, defaultReps: '10-12', defaultRir: 0, injuryNotice: 'هاني رامبود FST-7 راحة 35 ثانية وشَد إيزومتري' },
  { id: 'ex-chest-press-machine', name: 'دفع صدر بالجهاز (Chest Press Machine)', muscle: 'chest', equipment: 'machine', defaultSets: 4, defaultReps: '10-12', defaultRir: 2 },
  
  // Back
  { id: 'ex-lat-pulldown', name: 'سحب عالي واسع (Wide Lat Pulldown)', muscle: 'back', equipment: 'cable', defaultSets: 4, defaultReps: '8-10', defaultRir: 1 },
  { id: 'ex-cable-row', name: 'سحب أرضي كابل (Seated Cable Row)', muscle: 'back', equipment: 'cable', defaultSets: 3, defaultReps: '10-12', defaultRir: 2 },
  { id: 'ex-db-row', name: 'منشار دمبل فردي (One-Arm Dumbbell Row)', muscle: 'back', equipment: 'dumbbell', defaultSets: 3, defaultReps: '10-12', defaultRir: 2 },
  { id: 'ex-fst7-pulldown', name: 'سيفن سحب ذراع مفرود (FST-7 Straight-Arm Pulldown)', muscle: 'back', equipment: 'cable', defaultSets: 7, defaultReps: '10-12', defaultRir: 0, injuryNotice: 'هاني رامبود FST-7 إطالة الفاشيا Lat Spread 10 ثوانٍ' },

  // Legs
  { id: 'ex-squat', name: 'اسكوات بالبار الحر (Barbell Back Squat)', muscle: 'legs', equipment: 'barbell', defaultSets: 4, defaultReps: '8-10', defaultRir: 2, injuryNotice: 'NASM: الحفاظ على استقامة العمود الفقري والركبة للخارج' },
  { id: 'ex-leg-press', name: 'دفع أرجل بالجهاز (Leg Press 45°)', muscle: 'legs', equipment: 'machine', defaultSets: 4, defaultReps: '10-12', defaultRir: 2 },
  { id: 'ex-leg-extension', name: 'سيفن رفرفة كوادز (FST-7 Leg Extension)', muscle: 'legs', equipment: 'machine', defaultSets: 7, defaultReps: '12-15', defaultRir: 0, injuryNotice: 'هاني رامبود FST-7 ضخ دموي أقصى وإطالة الفخذ بالراحة' },
  { id: 'ex-rdl-db', name: 'ديدليفت روماني (Romanian Deadlift RDL)', muscle: 'legs', equipment: 'dumbbell', defaultSets: 4, defaultReps: '8-10', defaultRir: 2 },

  // Shoulders
  { id: 'ex-ohp-db', name: 'ضغط أكتاف بالدمبل جالساً (Seated DB Shoulder Press)', muscle: 'shoulders', equipment: 'dumbbell', defaultSets: 4, defaultReps: '8-10', defaultRir: 2 },
  { id: 'ex-lateral-raise', name: 'سيفن رفرفة جانبي دمبلز (FST-7 Lateral Raises)', muscle: 'shoulders', equipment: 'dumbbell', defaultSets: 7, defaultReps: '12-15', defaultRir: 0, injuryNotice: 'هاني رامبود 3D Boulder Delts راحة 30 ثانية' },
  { id: 'ex-face-pull', name: 'فيس بول كابل (Rope Face Pull - NASM CES)', muscle: 'shoulders', equipment: 'cable', defaultSets: 3, defaultReps: '15-18', defaultRir: 2 },

  // Arms
  { id: 'ex-biceps-ez', name: 'بايسبس بار زجزاج (EZ-Bar Biceps Curl)', muscle: 'arms', equipment: 'barbell', defaultSets: 3, defaultReps: '10-12', defaultRir: 1 },
  { id: 'ex-triceps-rope', name: 'سيفن ترايسبس حبل (FST-7 Triceps Cable Pushdown)', muscle: 'arms', equipment: 'cable', defaultSets: 7, defaultReps: '10-12', defaultRir: 0 },
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
  notes?: string;
}

export interface WorkoutPlanDay {
  id: string;
  name: string;
  focus: string;
  warmup?: string;
  exercises: WorkoutPlanExercise[];
}

export default function WorkoutBuilder() {
  const [days, setDays] = useState<WorkoutPlanDay[]>([
    { 
      id: 'day-1', 
      name: 'اليوم الأول - دفع وتضخيم الصدر (Push & Chest FST-7)', 
      focus: 'صدر وتراي وأكتاف أمامية',
      warmup: 'إحماء ديناميكي + تفعيل الروتيتور كف واللوحين بالـ Face Pulls',
      exercises: [
        { id: '1', name: 'بنش برس مستوي بالبار (Barbell Bench Press)', sets: 4, reps: '8-10', weightKg: '75', rir: 2, restSec: 90 },
        { id: '2', name: 'تجميع دمبل مائل عالي (Incline Dumbbell Press)', sets: 3, reps: '10-12', weightKg: '28', rir: 1, restSec: 75 },
        { id: '3', name: 'سيفن كابل كروس أوفر (FST-7 Cable Flyes - هاني رامبود)', sets: 7, reps: '10-12', weightKg: '15', rir: 0, restSec: 35, injuryNotice: 'شد إيزومتري 10 ثوانٍ في الراحة' },
      ] 
    },
    {
      id: 'day-2',
      name: 'اليوم الثاني - سحب وضهر ولاتس (Pull & Back FST-7)',
      focus: 'عضلات الظهر ولاتس وبايسبس',
      warmup: 'إطالة اللاتس بالفوم رولر + تفعيل الكور والعمود الفقري المحايد',
      exercises: [
        { id: '4', name: 'سحب عالي واسع (Wide Lat Pulldown)', sets: 4, reps: '8-10', weightKg: '60', rir: 1, restSec: 90 },
        { id: '5', name: 'سحب أرضي كابل (Seated Cable Row)', sets: 3, reps: '10-12', weightKg: '55', rir: 2, restSec: 75 },
        { id: '6', name: 'سيفن سحب ذراع مفرود (FST-7 Straight-Arm Pulldown - هاني رامبود)', sets: 7, reps: '10-12', weightKg: '20', rir: 0, restSec: 40, injuryNotice: 'تمديد الفاشيا Lat Spread Stretch' },
      ]
    }
  ]);

  // AI 1-Click Generator State
  const [showAiModal, setShowAiModal] = useState(false);
  const [clientNameInput, setClientNameInput] = useState('');
  const [trainingExperience, setTrainingExperience] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [primaryGoal, setPrimaryGoal] = useState<'hypertrophy' | 'fat_loss' | 'strength' | 'rehab_posture'>('hypertrophy');
  const [splitDaysCount, setSplitDaysCount] = useState<number>(4);
  const [postureIssue, setPostureIssue] = useState<string>('Forward Head & Rounded Shoulders (الأكتاف المستديرة وبروز الرقبة)');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<any | null>(null);

  const [activeDayIdForPicker, setActiveDayIdForPicker] = useState<string | null>(null);
  const [activeDayIdForExcel, setActiveDayIdForExcel] = useState<string | null>(null);
  const [excelRawInput, setExcelRawInput] = useState<string>('');
  const [excelParsedPreview, setExcelParsedPreview] = useState<WorkoutPlanExercise[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('all');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Day Handlers
  const addDay = () => {
    const newDayId = `day-${Date.now()}`;
    setDays([...days, {
      id: newDayId,
      name: `اليوم التدريبي رقم ${days.length + 1}`,
      focus: 'تركيز عام',
      exercises: []
    }]);
  };

  const removeDay = (dayId: string) => {
    setDays(days.filter(d => d.id !== dayId));
  };

  // AI 1-Click Generation Trigger
  const handleGenerateAiPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/program-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: clientNameInput || 'بطل جديد',
          trainingExperience,
          primaryGoal,
          daysPerWeek: splitDaysCount,
          posturalIssues: postureIssue ? [postureIssue] : [],
          methodology: 'FST7_HanyRambod'
        })
      });
      const data = await res.json();
      if (data?.success && data?.program) {
        setGeneratedReport(data.program);
        
        // Convert returned weeklySplit to Builder Days
        const newDays: WorkoutPlanDay[] = data.program.weeklySplit.map((split: any, idx: number) => ({
          id: `ai-day-${idx + 1}-${Date.now()}`,
          name: split.dayTitle,
          focus: split.dayTitle,
          warmup: split.warmup,
          exercises: split.exercises.map((ex: any, exIdx: number) => ({
            id: `ai-ex-${idx}-${exIdx}`,
            name: ex.name,
            sets: ex.sets || 3,
            reps: ex.reps || '10-12',
            weightKg: '50',
            rir: 1,
            restSec: parseInt(ex.rest) || 60,
            notes: ex.notes,
            injuryNotice: ex.notes?.includes('FST-7') ? 'بروتوكول هاني رامبود الختامي FST-7' : undefined
          }))
        }));

        setDays(newDays);
        toast.success(`تم توليد البرنامج التدريبي والتقرير العلمي للمتدرب (${clientNameInput || 'البطل'}) بنجاح بضغطة زر!`);
      } else {
        toast.error('حدث خطأ أثناء التوليد');
      }
    } catch {
      toast.error('تعذر الاتصال بالسيرفر');
    } finally {
      setIsGenerating(false);
    }
  };

  // Exercise Handlers
  const updateExercise = (dayId: string, exId: string, field: keyof WorkoutPlanExercise, val: any) => {
    setDays(days.map(d => {
      if (d.id !== dayId) return d;
      return {
        ...d,
        exercises: d.exercises.map(ex => ex.id === exId ? { ...ex, [field]: val } : ex)
      };
    }));
  };

  const handleSelectFromLibrary = (ex: ExerciseDefinition) => {
    if (!activeDayIdForPicker) return;
    const newEx: WorkoutPlanExercise = {
      id: `ex-${Date.now()}`,
      name: ex.name,
      sets: ex.defaultSets,
      reps: ex.defaultReps,
      weightKg: '40',
      rir: ex.defaultRir,
      restSec: ex.defaultSets === 7 ? 35 : 75,
      injuryNotice: ex.injuryNotice
    };

    setDays(days.map(d => {
      if (d.id !== activeDayIdForPicker) return d;
      return { ...d, exercises: [...d.exercises, newEx] };
    }));

    setActiveDayIdForPicker(null);
    toast.success(`تمت إضافة (${ex.name})`);
  };

  const removeExercise = (dayId: string, exId: string) => {
    setDays(days.map(d => d.id === dayId ? { ...d, exercises: d.exercises.filter(ex => ex.id !== exId) } : d));
  };

  const handleSave = () => {
    setSaveSuccess(true);
    toast.success('تم حفظ الخطة التدريبية بنجاح في ملف المتدرب!');
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
          <Link href="/dashboard" className="text-[#d4f60b] hover:underline mb-2 inline-block text-sm flex items-center gap-1 font-bold">
            <ChevronLeft size={16} /> العودة للوحة التحكم
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">محرر البرامج التدريبية المتقدم (Workout Builder AI)</h1>
            <span className="text-[11px] bg-gradient-to-r from-[#7C3AED] to-[#d4f60b] text-black font-black px-2.5 py-0.5 rounded-full">
              NASM OPT™ + FST-7 هاني رامبود
            </span>
          </div>
          <p className="text-xs text-white/50 mt-1">
            صمم جداولك يدوياً أو دع الذكاء الاصطناعي يبني برنامجاً كاملاً للمتدرب بضغطة زر واحدة شاملاً التكنيك والتقرير الفني.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* 1-Click AI Program Generator Button */}
          <button
            onClick={() => setShowAiModal(true)}
            className="bg-gradient-to-r from-[#7C3AED] to-[#ec4899] hover:opacity-90 px-5 py-2.5 rounded-2xl flex items-center gap-2 transition text-white font-black text-xs shadow-lg shadow-[#7C3AED]/30 cursor-pointer"
          >
            <Sparkles size={16} className="text-[#d4f60b]" />
            <span>توليد برنامج بضغطة زر (NASM + FST-7)</span>
          </button>

          <button 
            onClick={handleSave} 
            className="bg-[#d4f60b] hover:bg-[#c2e207] px-6 py-2.5 rounded-2xl flex items-center gap-2 transition text-black font-black text-xs shadow-lg shadow-[#d4f60b]/20 cursor-pointer"
          >
            <Save size={16} /> حفظ الخطة
          </button>
        </div>
      </div>

      {/* Scientific Framework Banner */}
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#140C2A] to-[#1a1136] border border-[#7C3AED]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED] flex items-center justify-center text-[#d4f60b]">
            <Award size={20} />
          </div>
          <div>
            <h4 className="text-xs font-black text-white">الذكاء التدريبي المعتمد (Scientific Engine)</h4>
            <p className="text-[11px] text-white/60">
              مدمج بكامل مبادئ أكاديمية <strong>NASM</strong> (التثبيت الحركي، تصحيح الانحناءات CES، التغذية CNC) + نظام <strong>FST-7</strong> لهاني رامبود لتفجير اللفافة العضلية.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-[#d4f60b] font-mono">
            NASM OPT Phase 3
          </span>
          <span className="text-[10px] bg-[#ec4899]/10 border border-[#ec4899]/30 px-2.5 py-1 rounded-lg text-[#ec4899] font-mono">
            Hany Rambod FST-7
          </span>
        </div>
      </div>

      {/* Generated Scientific Report View (If available) */}
      {generatedReport && (
        <div className="mb-8 p-6 rounded-3xl bg-[#111116] border border-[#d4f60b]/40 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-[#d4f60b]" />
              <h3 className="text-sm font-black text-white">
                التقرير الفني للمتدرب: <span className="text-[#d4f60b]">{generatedReport.clientName}</span>
              </h3>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(generatedReport, null, 2));
                toast.success('تم نسخ التقرير الكامل!');
              }}
              className="text-[11px] text-white/60 hover:text-white"
            >
              نسخ نص التقرير للواتساب 📋
            </button>
          </div>

          <p className="text-xs text-white/80 leading-relaxed bg-[#15121e] p-3.5 rounded-xl border border-white/5">
            {generatedReport.coachExecutiveSummary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-1.5">
              <h5 className="font-bold text-purple-300 flex items-center gap-1.5">
                <Flame size={14} /> تعليمات هاني رامبود الذهبية لـ FST-7:
              </h5>
              <ul className="space-y-1 text-white/70 text-[11px] list-disc list-inside">
                {generatedReport.hanyRambodFST7Rules?.slice(0, 3).map((r: string, i: number) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1.5">
              <h5 className="font-bold text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 size={14} /> إرشادات التغذية الرياضية (NASM CNC):
              </h5>
              <p className="text-white/70 text-[11px]">
                <strong>البروتين:</strong> {generatedReport.nutritionGuidelines?.proteinRecommendation}
              </p>
              <p className="text-white/70 text-[11px]">
                <strong>الترطيب:</strong> {generatedReport.nutritionGuidelines?.hydrationFormula}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Days Workout List */}
      <div className="space-y-6">
        {days.map((day) => (
          <div key={day.id} className="bg-[#0E081D] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
            {/* Day Header */}
            <div className="p-4 bg-[#140C2A] border-b border-white/[0.06] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1 max-w-md">
                <input 
                  type="text" 
                  value={day.name} 
                  onChange={e => {
                    const val = e.target.value;
                    setDays(days.map(d => d.id === day.id ? { ...d, name: val } : d));
                  }}
                  className="bg-transparent font-black text-sm text-white focus:outline-none focus:border-b border-purple-500 w-full"
                />
                {day.warmup && (
                  <p className="text-[11px] text-[#d4f60b] mt-1 flex items-center gap-1">
                    ⚡ <strong>الإحماء والتصحيح:</strong> {day.warmup}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveDayIdForPicker(day.id)}
                  className="bg-[#7C3AED]/20 hover:bg-[#7C3AED]/30 text-purple-300 px-3 py-1.5 rounded-xl text-xs font-bold border border-[#7C3AED]/30 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Plus size={14} /> إضافة تمرين
                </button>
                <button
                  onClick={() => removeDay(day.id)}
                  className="text-white/30 hover:text-rose-400 p-1.5 rounded-lg transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Exercises Table */}
            <div className="p-4 space-y-3">
              {day.exercises.map((ex, exIdx) => (
                <div 
                  key={ex.id} 
                  className={`p-3.5 rounded-xl bg-[#140C2A]/60 border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition ${
                    ex.name.includes('FST-7') || ex.injuryNotice?.includes('هاني رامبود')
                      ? 'border-[#ec4899]/40 bg-[#ec4899]/5'
                      : 'border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center font-mono font-bold text-white/50 text-[11px]">
                      {exIdx + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-white flex items-center gap-2">
                        {ex.name}
                        {ex.name.includes('FST-7') && (
                          <span className="text-[9px] bg-[#ec4899] text-white px-2 py-0.2 rounded-full font-extrabold">
                            FST-7 FINISHER 💥
                          </span>
                        )}
                      </h4>
                      {ex.injuryNotice && (
                        <p className="text-[10px] text-amber-300 mt-0.5">⚠️ {ex.injuryNotice}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto font-mono text-white/80">
                    <div className="flex items-center gap-1 bg-[#1A1033] px-2.5 py-1 rounded-lg border border-white/5">
                      <span className="text-[10px] text-white/40">مجموعات:</span>
                      <span className="font-bold text-[#d4f60b]">{ex.sets}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-[#1A1033] px-2.5 py-1 rounded-lg border border-white/5">
                      <span className="text-[10px] text-white/40">تكرار:</span>
                      <span className="font-bold">{ex.reps}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-[#1A1033] px-2.5 py-1 rounded-lg border border-white/5">
                      <span className="text-[10px] text-white/40">راحة:</span>
                      <span className="font-bold">{ex.restSec}s</span>
                    </div>
                    <button
                      onClick={() => removeExercise(day.id, ex.id)}
                      className="text-white/30 hover:text-rose-400 p-1 transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Add Day Button */}
        <button
          onClick={addDay}
          className="w-full py-4 rounded-2xl border-2 border-dashed border-white/10 hover:border-[#7C3AED] text-white/60 hover:text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus size={16} /> إضافة يوم تدريبي إضافي
        </button>
      </div>

      {/* 1-Click AI Generator Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111116] border border-[#7C3AED]/40 rounded-3xl max-w-lg w-full p-6 text-right space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowAiModal(false)}
              className="absolute top-5 left-5 text-white/40 hover:text-white text-sm"
            >
              ✕ إغلاق
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#ec4899] flex items-center justify-center text-white">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-base font-black text-white">مساعد التدريب الذكي (1-Click AI Builder)</h3>
                <p className="text-[11px] text-white/50">توليد جدول كامل وفق شهادات NASM وتقنيات هاني رامبود FST-7</p>
              </div>
            </div>

            <form onSubmit={handleGenerateAiPlan} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white/80 block mb-1">اسم المتدرب / اللاعب:</label>
                <input
                  type="text"
                  required
                  value={clientNameInput}
                  onChange={(e) => setClientNameInput(e.target.value)}
                  placeholder="مثال: عمر مصطفى (بطولة كمال أجسام أو فيتنس)"
                  className="w-full bg-[#181524] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 focus:border-[#d4f60b] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-white/80 block mb-1">المستوى التدريبي:</label>
                  <select
                    value={trainingExperience}
                    onChange={(e: any) => setTrainingExperience(e.target.value)}
                    className="w-full bg-[#181524] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#d4f60b] outline-none"
                  >
                    <option value="beginner">مبتدئ (Phase 1 Stabilization)</option>
                    <option value="intermediate">متوسط (Phase 2-3 Hypertrophy)</option>
                    <option value="advanced">متقدم (FST-7 Olympia Pro)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-white/80 block mb-1">الهدف الأساسي:</label>
                  <select
                    value={primaryGoal}
                    onChange={(e: any) => setPrimaryGoal(e.target.value)}
                    className="w-full bg-[#181524] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#d4f60b] outline-none"
                  >
                    <option value="hypertrophy">بناء وتضخيم عضلي (Hypertrophy)</option>
                    <option value="fat_loss">تنشيف وخسارة دهون (Fat Loss)</option>
                    <option value="strength">زيادة القوة القصوى (Max Strength)</option>
                    <option value="rehab_posture">تصحيح القوام وعلاج الانحناءات</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-white/80 block mb-1">عدد أيام التدريب أسبوعياً:</label>
                  <select
                    value={splitDaysCount}
                    onChange={(e) => setSplitDaysCount(Number(e.target.value))}
                    className="w-full bg-[#181524] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#d4f60b] outline-none"
                  >
                    <option value={3}>3 أيام (Full Body / Push-Pull-Legs)</option>
                    <option value={4}>4 أيام (Upper / Lower أو FST-7 Split)</option>
                    <option value={5}>5 أيام (Pro Bodybuilder Split)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-white/80 block mb-1">الفحص القوامي (NASM CES):</label>
                  <select
                    value={postureIssue}
                    onChange={(e) => setPostureIssue(e.target.value)}
                    className="w-full bg-[#181524] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#d4f60b] outline-none"
                  >
                    <option value="Forward Head & Rounded Shoulders (الأكتاف المستديرة وبروز الرقبة)">أكتاف مستديرة وبروز رقبة</option>
                    <option value="Anterior Pelvic Tilt (ميل الحوض الأمامي - لوردوز القطنية)">ميل حوض أمامي (لوردوز)</option>
                    <option value="Knee Valgus (دخول الركبتين للداخل أثناء الاسكوات)">دخول الركبتين للداخل (Valgus)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#d4f60b] text-black font-black text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#7C3AED]/20 mt-2"
              >
                {isGenerating ? (
                  <span>جارِ تطبيق خوارزميات NASM و FST-7... ⏳</span>
                ) : (
                  <>
                    <Zap size={15} />
                    <span>توليد البرنامج التدريبي والتقرير الآن بضغطة زر 🚀</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Exercise Picker Modal */}
      {activeDayIdForPicker && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111116] border border-white/10 rounded-3xl max-w-lg w-full p-6 text-right space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="text-sm font-black text-white">اختر تمريناً من بنك التمارين الذكي</h3>
              <button onClick={() => setActiveDayIdForPicker(null)} className="text-white/40 hover:text-white text-xs">
                إغلاق ✕
              </button>
            </div>

            <div className="relative">
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="ابحث باسم التمرين أو التكنيك..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#181524] border border-white/10 rounded-xl pr-9 pl-3 py-2 text-xs text-white focus:border-[#d4f60b] outline-none"
              />
            </div>

            {/* Muscle Filters */}
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {['all', 'chest', 'back', 'legs', 'shoulders', 'arms'].map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMuscle(m)}
                  className={`px-3 py-1 rounded-lg border text-xs transition ${
                    selectedMuscle === m
                      ? 'bg-[#7C3AED] border-[#7C3AED] text-white font-bold'
                      : 'bg-[#181524] border-white/5 text-white/50 hover:text-white'
                  }`}
                >
                  {m === 'all' ? 'الكل' : m}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {filteredExercises.map((ex) => (
                <div
                  key={ex.id}
                  onClick={() => handleSelectFromLibrary(ex)}
                  className="p-3 rounded-xl bg-[#181524] border border-white/5 hover:border-[#d4f60b]/50 cursor-pointer transition flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-white">{ex.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-[#d4f60b] bg-white/5 px-2 py-0.5 rounded font-mono">
                        {ex.muscle}
                      </span>
                      <span className="text-[10px] text-white/40">{ex.equipment}</span>
                      {ex.injuryNotice && (
                        <span className="text-[10px] text-[#ec4899]">★ FST-7 / NASM</span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-[#d4f60b] font-bold">+ إضافة</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
