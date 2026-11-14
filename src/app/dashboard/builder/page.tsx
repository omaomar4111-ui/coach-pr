"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Dumbbell, 
  Sparkles, 
  Plus, 
  Trash2, 
  Copy, 
  FileSpreadsheet, 
  AlertTriangle, 
  Play, 
  Search, 
  Check, 
  ArrowLeft,
  ChevronDown,
  Layers,
  Save,
  RotateCcw
} from "lucide-react";
import confetti from "canvas-confetti";

interface ExerciseItem {
  id: string;
  name: string;
  targetMuscle: string;
  sets: number;
  reps: string;
  weightKg: string;
  rpe: string;
  restSec: number;
  tempo: string;
  videoUrl?: string;
  injuryRisk?: string; // e.g. "إصابة أسفل الظهر"
}

interface WorkoutDay {
  id: string;
  dayName: string;
  focus: string;
  exercises: ExerciseItem[];
}

const exerciseBank = [
  { name: "Barbell Bench Press (بنش برس بالبار)", muscle: "صدر (Chest)", tools: "بار حر", risk: "كتف أمامي" },
  { name: "Incline Dumbbell Press (تجميع دمبلز عالي)", muscle: "صدر علوي (Upper Chest)", tools: "دمبلز", risk: "" },
  { name: "Barbell Back Squat (اسكوات خلفي بالبار)", muscle: "أرجل كوادز (Quads)", tools: "بار حر", risk: "ركبة وأسفل الظهر" },
  { name: "Romanian Deadlift (ديدليفت روماني)", muscle: "خلفيات وهامسترنج (Hamstrings)", tools: "بار أو دمبلز", risk: "غضروف وأسفل الظهر" },
  { name: "Lat Pulldown (سحب عالي قبضة واسعة)", muscle: "ظهر ولاتس (Lats)", tools: "كابل", risk: "" },
  { name: "Dumbbell Lateral Raise (رفرفة جانبي بالدمبلز)", muscle: "أكتاف جانبية (Side Delts)", tools: "دمبلز", risk: "الوتر الدوار" },
  { name: "Triceps Rope Pushdown (ترايسبس بالحبل)", muscle: "ترايسبس (Triceps)", tools: "كابل", risk: "كوع" },
  { name: "Barbell Biceps Curl (بايسبس بار زجزاج)", muscle: "بايسبس (Biceps)", tools: "بار EZ", risk: "معصم اليد" }
];

export default function WorkoutBuilderPage() {
  const [clientProfile, setClientProfile] = useState({
    name: "كريم أحمد مصطفى",
    goal: "تنشيف عالي وبناء عضلات",
    knownInjuries: ["غضروف وأسفل الظهر"]
  });

  const [days, setDays] = useState<WorkoutDay[]>([
    {
      id: "day-1",
      dayName: "يوم 1: سحب (Pull Day)",
      focus: "ظهر وبايسبس وخلفيات",
      exercises: [
        {
          id: "ex-1",
          name: "Lat Pulldown (سحب عالي قبضة واسعة)",
          targetMuscle: "ظهر ولاتس (Lats)",
          sets: 4,
          reps: "8-10",
          weightKg: "70",
          rpe: "8.5",
          restSec: 90,
          tempo: "3-0-1-0"
        },
        {
          id: "ex-2",
          name: "Barbell Biceps Curl (بايسبس بار زجزاج)",
          targetMuscle: "بايسبس (Biceps)",
          sets: 3,
          reps: "10-12",
          weightKg: "30",
          rpe: "8.0",
          restSec: 60,
          tempo: "2-0-1-0"
        }
      ]
    }
  ]);

  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [showExcelModal, setShowExcelModal] = useState(false);
  const [excelText, setExcelText] = useState("");
  const [showBankModal, setShowBankModal] = useState(false);
  const [bankSearch, setBankSearch] = useState("");

  // Handle Excel paste parsing
  const handleParseExcel = () => {
    if (!excelText.trim()) return;

    // Split by lines
    const lines = excelText.split("\n").filter(l => l.trim().length > 0);
    const parsedExercises: ExerciseItem[] = lines.map((line, idx) => {
      // Split by tab (Excel copy) or comma
      const parts = line.includes("\t") ? line.split("\t") : line.split(",");
      const name = parts[0]?.trim() || `تمرين ${idx + 1}`;
      const sets = parseInt(parts[1]?.trim()) || 3;
      const reps = parts[2]?.trim() || "10-12";
      const weight = parts[3]?.trim() || "0";
      const rest = parseInt(parts[4]?.trim()) || 60;

      // Check injury risk
      const riskMatch = clientProfile.knownInjuries.some(inj => 
        name.includes("Deadlift") || name.includes("ديدليفت") || name.includes("Squat") || name.includes("اسكوات")
      );

      return {
        id: `excel-${Date.now()}-${idx}`,
        name,
        targetMuscle: "تمرين مستورد",
        sets,
        reps,
        weightKg: weight,
        rpe: "8.0",
        restSec: rest,
        tempo: "2-0-1",
        injuryRisk: riskMatch ? "غضروف وأسفل الظهر" : undefined
      };
    });

    const updated = [...days];
    updated[activeDayIndex].exercises.push(...parsedExercises);
    setDays(updated);
    setExcelText("");
    setShowExcelModal(false);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleAddFromBank = (bankItem: typeof exerciseBank[0]) => {
    const isRisky = clientProfile.knownInjuries.some(inj => bankItem.risk.includes(inj));
    const newEx: ExerciseItem = {
      id: `bank-${Date.now()}`,
      name: bankItem.name,
      targetMuscle: bankItem.muscle,
      sets: 3,
      reps: "10-12",
      weightKg: "40",
      rpe: "8.0",
      restSec: 90,
      tempo: "3-0-1",
      injuryRisk: isRisky ? bankItem.risk : undefined
    };

    const updated = [...days];
    updated[activeDayIndex].exercises.push(newEx);
    setDays(updated);
    setShowBankModal(false);
  };

  const handleDeleteExercise = (exId: string) => {
    const updated = [...days];
    updated[activeDayIndex].exercises = updated[activeDayIndex].exercises.filter(e => e.id !== exId);
    setDays(updated);
  };

  const handleAddNewDay = () => {
    const newDayNumber = days.length + 1;
    const newDay: WorkoutDay = {
      id: `day-${Date.now()}`,
      dayName: `يوم ${newDayNumber}: تمرين جديد`,
      focus: "تخصيص",
      exercises: []
    };
    setDays([...days, newDay]);
    setActiveDayIndex(days.length);
  };

  return (
    <div className="min-h-screen bg-[#0A0612] text-white flex flex-col font-sans" dir="rtl">
      {/* Header */}
      <header className="bg-[#110A1E] border-b border-purple-900/30 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-slate-400 hover:text-white flex items-center gap-1.5 text-xs font-bold transition">
            <ArrowLeft className="w-4 h-4" />
            <span>العودة للوحة التحكم</span>
          </Link>
          <div className="h-5 w-[1px] bg-purple-900/40" />
          <div className="flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-[#A78BFA]" />
            <h1 className="font-heading font-black text-lg text-white">
              بيلدر التمارين الذكي <span className="text-xs bg-[#7C3AED] text-white px-2 py-0.5 rounded-full font-sans font-bold">CoachPRB 2.0</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
              alert("تم حفظ واعتماد الخطة بنجاح وإرسال إشعار للعميل عبر التطبيق!");
            }}
            className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-purple-900/50"
          >
            <Save className="w-4 h-4" />
            <span>حفظ واعتماد الخطة</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Client Context & Days Tabs (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Client Bio Banner */}
          <div className="bg-[#140C24] p-4 rounded-2xl border border-purple-900/30 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">العميل الحالي:</span>
              <span className="font-bold text-white text-sm">{clientProfile.name}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">الهدف:</span>
              <span className="text-purple-300 font-semibold">{clientProfile.goal}</span>
            </div>

            {/* Injury Alert Warning Badge */}
            <div className="bg-rose-950/40 border border-rose-500/40 p-2.5 rounded-xl text-xs text-rose-300 flex items-start gap-2 mt-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">تحذير إصابة مسجلة: </span>
                <span>{clientProfile.knownInjuries.join("، ")}. البيلدر سينبهك تلقائياً عند إضافة أي تمرين يضغط على هذه المنطقة.</span>
              </div>
            </div>
          </div>

          {/* Days List Selector */}
          <div className="bg-[#110A1E] p-3 rounded-2xl border border-purple-900/30 space-y-2">
            <div className="flex items-center justify-between px-2 py-1">
              <span className="text-xs font-bold text-slate-400">أيام الجدول ({days.length})</span>
              <button
                onClick={handleAddNewDay}
                className="text-xs text-[#A78BFA] hover:text-white font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة يوم</span>
              </button>
            </div>

            <div className="space-y-1.5">
              {days.map((day, idx) => {
                const isActive = activeDayIndex === idx;
                return (
                  <div
                    key={day.id}
                    onClick={() => setActiveDayIndex(idx)}
                    className={`p-3 rounded-xl cursor-pointer transition border flex items-center justify-between text-xs ${
                      isActive
                        ? "bg-[#1C1133] border-[#7C3AED] text-white font-bold shadow-md shadow-purple-900/30"
                        : "bg-[#140C24] border-purple-900/20 text-slate-300 hover:border-purple-600/40"
                    }`}
                  >
                    <div>
                      <div>{day.dayName}</div>
                      <div className="text-[10px] text-slate-400 font-normal mt-0.5">{day.exercises.length} تمارين مضافة</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/20">
                      Day {idx + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Exercise Grid & Import Actions (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Action Toolbar */}
          <div className="bg-[#140C24] p-3.5 rounded-2xl border border-purple-900/30 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">{days[activeDayIndex]?.dayName}</span>
              <span className="text-xs text-purple-400">({days[activeDayIndex]?.exercises.length} تمرين)</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Paste from Excel Button */}
              <button
                onClick={() => setShowExcelModal(true)}
                className="bg-[#7C3AED]/20 hover:bg-[#7C3AED]/30 text-[#A78BFA] border border-[#7C3AED]/40 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>لصق من Excel (Paste)</span>
              </button>

              {/* Add from Video Bank */}
              <button
                onClick={() => setShowBankModal(true)}
                className="bg-[#7C3AED]/20 hover:bg-[#7C3AED]/30 text-[#A78BFA] border border-[#7C3AED]/40 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>مكتبة الفيديوهات (+800)</span>
              </button>
            </div>
          </div>

          {/* Exercises Detailed Grid */}
          <div className="space-y-3">
            {days[activeDayIndex]?.exercises.length === 0 ? (
              <div className="p-12 text-center border-2 border-dashed border-purple-900/30 rounded-2xl text-slate-500 space-y-3">
                <Dumbbell className="w-10 h-10 mx-auto text-purple-800" />
                <p className="text-sm">لا توجد تمارين مضافة في هذا اليوم بعد.</p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setShowExcelModal(true)}
                    className="text-xs text-purple-300 hover:underline font-bold"
                  >
                    + الصق من إكسيل الآن
                  </button>
                  <span className="text-slate-600">أو</span>
                  <button
                    onClick={() => setShowBankModal(true)}
                    className="text-xs text-purple-400 hover:underline font-bold"
                  >
                    + اختر من بنك التمارين المصورة
                  </button>
                </div>
              </div>
            ) : (
              days[activeDayIndex]?.exercises.map((ex, idx) => (
                <div
                  key={ex.id}
                  className="bg-[#140C24] p-4 rounded-2xl border border-purple-900/30 hover:border-purple-600/40 transition space-y-3 relative group"
                >
                  {/* Top exercise bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-purple-900/40 text-purple-300 flex items-center justify-center font-bold text-xs">
                        {idx + 1}
                      </span>
                      <h4 className="font-bold text-white text-sm">{ex.name}</h4>
                      <span className="text-[10px] bg-purple-950 px-2 py-0.5 rounded text-purple-300 border border-purple-500/20">
                        {ex.targetMuscle}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDeleteExercise(ex.id)}
                      className="text-slate-500 hover:text-rose-400 transition p-1"
                      title="حذف التمرين"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Automatic Injury Alert on Exercise Card */}
                  {ex.injuryRisk && (
                    <div className="bg-rose-950/30 border border-rose-500/30 px-3 py-1.5 rounded-lg text-rose-300 text-xs flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>تنبيه إصابة: هذا التمرين قد يتعارض مع ({ex.injuryRisk}). تأكد من ملاءمة الحمل أو استبداله بتمرين بديل.</span>
                    </div>
                  )}

                  {/* Parameters Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-xs">
                    <div className="bg-[#110A1E] p-2 rounded-xl border border-purple-900/20">
                      <label className="text-[10px] text-slate-400 block mb-0.5">المجموعات (Sets)</label>
                      <input
                        type="number"
                        value={ex.sets}
                        onChange={(e) => {
                          const updated = [...days];
                          updated[activeDayIndex].exercises[idx].sets = parseInt(e.target.value) || 0;
                          setDays(updated);
                        }}
                        className="w-full bg-transparent text-white font-bold focus:outline-none"
                      />
                    </div>

                    <div className="bg-[#110A1E] p-2 rounded-xl border border-purple-900/20">
                      <label className="text-[10px] text-slate-400 block mb-0.5">التكرار (Reps)</label>
                      <input
                        type="text"
                        value={ex.reps}
                        onChange={(e) => {
                          const updated = [...days];
                          updated[activeDayIndex].exercises[idx].reps = e.target.value;
                          setDays(updated);
                        }}
                        className="w-full bg-transparent text-white font-bold focus:outline-none"
                      />
                    </div>

                    <div className="bg-[#110A1E] p-2 rounded-xl border border-purple-900/20">
                      <label className="text-[10px] text-slate-400 block mb-0.5">الوزن (kg)</label>
                      <input
                        type="text"
                        value={ex.weightKg}
                        onChange={(e) => {
                          const updated = [...days];
                          updated[activeDayIndex].exercises[idx].weightKg = e.target.value;
                          setDays(updated);
                        }}
                        className="w-full bg-transparent text-white font-bold focus:outline-none"
                      />
                    </div>

                    <div className="bg-[#110A1E] p-2 rounded-xl border border-purple-900/20">
                      <label className="text-[10px] text-slate-400 block mb-0.5">مقياس الجهد (RPE)</label>
                      <input
                        type="text"
                        value={ex.rpe}
                        onChange={(e) => {
                          const updated = [...days];
                          updated[activeDayIndex].exercises[idx].rpe = e.target.value;
                          setDays(updated);
                        }}
                        className="w-full bg-transparent text-white font-bold focus:outline-none"
                      />
                    </div>

                    <div className="bg-[#110A1E] p-2 rounded-xl border border-purple-900/20">
                      <label className="text-[10px] text-slate-400 block mb-0.5">الراحة (ثانية)</label>
                      <input
                        type="number"
                        value={ex.restSec}
                        onChange={(e) => {
                          const updated = [...days];
                          updated[activeDayIndex].exercises[idx].restSec = parseInt(e.target.value) || 0;
                          setDays(updated);
                        }}
                        className="w-full bg-transparent text-white font-bold focus:outline-none"
                      />
                    </div>

                    <div className="bg-[#110A1E] p-2 rounded-xl border border-purple-900/20">
                      <label className="text-[10px] text-slate-400 block mb-0.5">التمبو (Tempo)</label>
                      <input
                        type="text"
                        value={ex.tempo}
                        onChange={(e) => {
                          const updated = [...days];
                          updated[activeDayIndex].exercises[idx].tempo = e.target.value;
                          setDays(updated);
                        }}
                        className="w-full bg-transparent text-white font-bold focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Excel Paste Modal (PRB-104) */}
      {showExcelModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#140C24] border border-purple-900/50 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-purple-300" />
                <h3 className="text-base font-bold text-white">لصق تمارين من شيت Excel في ثوانٍ</h3>
              </div>
              <button onClick={() => setShowExcelModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              انسخ الصفوف من جدول الإكسيل بتاعك والصقها هنا مباشرة. النظام هيفكك الأعمدة تلقائياً (اسم التمرين، المجموعات، التكرار، والوزن) ويضيفها لجدول اليوم:
            </p>

            <textarea
              rows={6}
              value={excelText}
              onChange={(e) => setExcelText(e.target.value)}
              placeholder="مثال على النسخ:&#10;Barbell Bench Press	4	8-10	80	90&#10;Incline Dumbbell Press	3	12	28	60&#10;Dips	3	15	0	60"
              className="w-full bg-[#110A1E] border border-purple-900/40 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#7C3AED] font-mono"
            />

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-500">يدعم النسخ من Excel و Google Sheets</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowExcelModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleParseExcel}
                  className="px-5 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-emerald-900/40"
                >
                  تحويل وإضافة التمارين الآن
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Bank Modal (PRB-105) */}
      {showBankModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#140C24] border border-purple-900/50 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-[#A78BFA]" />
                <h3 className="text-base font-bold text-white">مكتبة التمارين المصورة (+800 تمرين بالفيديو)</h3>
              </div>
              <button onClick={() => setShowBankModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              <input
                type="text"
                placeholder="ابحث باسم التمرين أو العضلة المستهدفة..."
                value={bankSearch}
                onChange={(e) => setBankSearch(e.target.value)}
                className="w-full bg-[#110A1E] border border-purple-900/40 rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#7C3AED]"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {exerciseBank
                .filter(b => b.name.includes(bankSearch) || b.muscle.includes(bankSearch))
                .map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#110A1E] rounded-xl border border-purple-900/20 hover:border-purple-600/40 flex items-center justify-between text-xs transition"
                  >
                    <div>
                      <div className="font-bold text-white">{item.name}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>العضلة: {item.muscle}</span>
                        <span>•</span>
                        <span>الأداة: {item.tools}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddFromBank(item)}
                      className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-3 py-1.5 rounded-lg font-bold text-xs transition"
                    >
                      + إضافة للخطة
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
