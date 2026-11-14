"use client";

import React, { useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { 
  BODYBUILDING_TEMPLATES, 
  BodybuildingSystemTemplate, 
  calculate1RM 
} from "@/lib/bodybuildingTemplatesData";

export default function TemplatesAndRambodSystemsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<BodybuildingSystemTemplate>(BODYBUILDING_TEMPLATES[0]);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [selectedAthlete, setSelectedAthlete] = useState("كريم أحمد مصطفى");
  const [assignedSuccess, setAssignedSuccess] = useState(false);

  // 1RM Interactive Calculator State
  const [calcExerciseName, setCalcExerciseName] = useState("بنش برس مستوي بالبار (Bench Press)");
  const [calcWeight, setCalcWeight] = useState(100);
  const [calcReps, setCalcReps] = useState(6);

  const rmResults = calculate1RM(calcWeight, calcReps);

  // One-click Assign Template to Athlete
  const handleAssignTemplate = () => {
    setAssignedSuccess(true);
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => setAssignedSuccess(false), 3500);
  };

  const activeDay = selectedTemplate.days[activeDayIndex] || selectedTemplate.days[0];

  return (
    <div className="min-h-screen bg-[#07040D] text-white flex flex-col font-sans selection:bg-[#7C3AED] selection:text-white" dir="rtl">
      
      {/* Top Quiet Minimal Header */}
      <header className="border-b border-white/[0.04] px-6 py-4 flex items-center justify-between sticky top-0 z-40 bg-[#07040D]/95 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <img 
              src="/pr-logo.png" 
              alt="PR" 
              className="h-8 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(167,139,250,0.3)]" 
            />
            <span className="font-heading font-black text-lg tracking-wider text-white">
              COACH<span className="text-[#A78BFA]">PR</span>
            </span>
          </Link>

          <span className="text-xs text-slate-400 border-r border-white/[0.08] pr-4 hidden sm:inline">
            موسوعة أنظمة كمال الأجسام &amp; تمبلت هاني رامبود
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link 
            href="/dashboard"
            className="px-3.5 py-1.5 rounded-xl bg-[#10091E] hover:bg-[#160D2A] border border-white/[0.08] text-slate-300 hover:text-white text-xs transition"
          >
            ← العودة للداشبورد
          </Link>
          <Link 
            href="/dashboard/builder"
            className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition shadow-md shadow-purple-950/50"
          >
            بيلدر التمارين
          </Link>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-8">
        
        {/* Banner Section */}
        <div className="p-6 rounded-3xl bg-[#0D0717] border border-purple-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-block px-2.5 py-1 rounded-lg bg-[#1D1136] border border-purple-500/30 text-[10px] text-[#A78BFA] font-mono mb-2">
              FST-7 &amp; 3-Day Pro Splits
            </div>
            <h1 className="text-2xl font-black text-white">مكتبة أنظمة كمال الأجسام والتمبلتس الجاهزة</h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              اختر أي نظام تدريبي (3 أيام FST-7 هاني رامبود، Full Body القوة، أو Push Pull Legs) وطبقه للمتدرب بضغطة زر واحدة تشمل التكنيكات، العدادات، الراحة، وحسبة 1RM لشدة التمرين.
            </p>
          </div>

          {/* Quick Assign Action */}
          <div className="bg-[#120A24] p-4 rounded-2xl border border-white/[0.06] space-y-2 min-w-[260px]">
            <label className="text-[11px] text-slate-400 block">اختر المتدرب لتطبيق التمبلت عليه:</label>
            <select
              value={selectedAthlete}
              onChange={(e) => setSelectedAthlete(e.target.value)}
              className="w-full bg-[#0A0514] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#7C3AED]"
            >
              <option value="كريم أحمد مصطفى">كريم أحمد مصطفى (FST-7 تضخيم)</option>
              <option value="محمود حسن السيد">محمود حسن السيد (تنشيف عالي)</option>
              <option value="عمر فاروق عبد الله">عمر فاروق عبد الله (كلاسيك فيزيك)</option>
              <option value="طارق سليم الديب">طارق سليم الديب (قوة وتأهيل)</option>
            </select>
            <button
              type="button"
              onClick={handleAssignTemplate}
              className="w-full py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold rounded-xl transition shadow-lg shadow-purple-950/60"
            >
              {assignedSuccess ? "تم تطبيق التمبلت للاعب بنجاح ✓" : "تطبيق هذا النظام للاعب بضغطة زر"}
            </button>
          </div>
        </div>

        {/* 1. Template Selectors (3 Different 3-Day Splits Switcher) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white tracking-wide">اختر التمبلت المناسب (تبديل بضغطة واحدة)</h2>
            <span className="text-[11px] text-slate-400 font-mono">3 أنظمة تدريبية احترافية</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {BODYBUILDING_TEMPLATES.map((tmpl) => {
              const isSelected = selectedTemplate.id === tmpl.id;
              return (
                <div
                  key={tmpl.id}
                  onClick={() => {
                    setSelectedTemplate(tmpl);
                    setActiveDayIndex(0);
                  }}
                  className={`p-5 rounded-2xl border transition cursor-pointer text-xs space-y-2.5 ${
                    isSelected
                      ? "bg-[#120A24] border-[#7C3AED] shadow-lg shadow-purple-950/50"
                      : "bg-[#0B0616] border-white/[0.04] hover:bg-[#0F081C] hover:border-white/[0.08]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] px-2 py-0.5 rounded-lg bg-[#180E2E] border border-purple-500/30 text-[#A78BFA] font-mono">
                      {tmpl.daysPerWeek} أيام أسبوعياً
                    </span>
                    {isSelected && (
                      <span className="text-[10px] text-[#A78BFA] font-bold">التمبلت النشط ✓</span>
                    )}
                  </div>
                  <h3 className="font-bold text-white text-sm">{tmpl.title}</h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {tmpl.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Days Tabs for the Selected Template */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {selectedTemplate.days.map((day, idx) => (
              <button
                key={day.dayNumber}
                onClick={() => setActiveDayIndex(idx)}
                className={`px-4 py-2.5 rounded-xl border transition font-medium ${
                  activeDayIndex === idx
                    ? "bg-[#1E1238] border-[#7C3AED] text-white font-bold shadow-md shadow-purple-950/40"
                    : "bg-[#0B0616] border-white/[0.04] text-slate-400 hover:text-white"
                }`}
              >
                {day.dayTitle}
              </button>
            ))}
          </div>

          {/* Exercises in the Active Day */}
          <div className="p-6 rounded-3xl bg-[#0B0616] border border-white/[0.05] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.04]">
              <div>
                <h3 className="text-base font-bold text-white">{activeDay.dayTitle}</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  العضلات المستهدفة: {activeDay.focusMuscles}
                </p>
              </div>
              <span className="text-xs font-mono text-[#A78BFA] font-bold">
                {activeDay.exercises.length} تمارين مجهزة بالتكنيك
              </span>
            </div>

            {/* Exercises Grid */}
            <div className="space-y-3">
              {activeDay.exercises.map((ex, index) => (
                <div 
                  key={ex.id}
                  className="p-4 rounded-2xl bg-[#0E081A] border border-white/[0.05] hover:border-purple-500/30 transition text-xs space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-xl bg-[#1A1030] border border-purple-500/20 text-[#A78BFA] font-bold flex items-center justify-center font-mono text-[11px]">
                        {index + 1}
                      </span>
                      <span className="font-bold text-white text-sm">{ex.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">({ex.targetMuscle})</span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-mono">
                      <span className="px-2.5 py-1 rounded-lg bg-[#140B24] border border-white/[0.06] text-white font-bold">
                        {ex.sets} مجموعات × {ex.reps} عدات
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-[#140B24] border border-white/[0.06] text-slate-300">
                        راحة: {ex.restSec}ث
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-[#140B24] border border-white/[0.06] text-slate-300">
                        تمبو: {ex.tempo}
                      </span>
                    </div>
                  </div>

                  {/* Technique Notes & FST-7 Guidance */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-white/[0.03]">
                    <div className="text-[11px] text-slate-300">
                      <span className="text-[#A78BFA] font-bold ml-1.5">التكنيك المطلوب:</span>
                      <span className="font-medium">{ex.technique}</span>
                      {ex.techniqueNote && (
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                          💡 {ex.techniqueNote}
                        </p>
                      )}
                    </div>

                    {/* Weight Input for 1RM Tracking */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500">وزن اللاعب الحالي:</span>
                      <input
                        type="number"
                        defaultValue={ex.defaultWeightKg}
                        className="w-16 bg-[#07040D] border border-white/[0.08] rounded-lg px-2 py-1 text-center font-mono font-bold text-white text-xs outline-none focus:border-[#7C3AED]"
                      />
                      <span className="text-[10px] text-slate-400 font-mono">كجم</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Real 1RM (One-Rep Max) Intensity & Load Calculator Engine */}
        <div className="p-6 rounded-3xl bg-[#0D0717] border border-purple-500/20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/[0.04]">
            <div>
              <h2 className="text-base font-bold text-white">حاسبة 1RM Max وشدة أوزان اللاعب الدقيقة</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                حساب أقصى وزن يستطيع اللاعب رفعه لعدة واحدة (1RM) بناءً على أوزانه وتكراراته الفعلية (معادلات Brzycki &amp; Epley) لمعرفة شدة التمرين.
              </p>
            </div>
            <div className="text-left font-mono">
              <span className="text-xs text-slate-500 block">أقصى وزن تقديري (1RM):</span>
              <span className="text-2xl font-black text-[#A78BFA]">{rmResults.average1RM} كجم</span>
            </div>
          </div>

          {/* Interactive Calculator Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">اسم التمرين</label>
              <input
                type="text"
                value={calcExerciseName}
                onChange={(e) => setCalcExerciseName(e.target.value)}
                className="w-full bg-[#0A0514] border border-white/[0.08] rounded-xl px-3 py-2.5 text-white outline-none focus:border-[#7C3AED]"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">الوزن المرفوع (كجم)</label>
              <input
                type="number"
                value={calcWeight}
                onChange={(e) => setCalcWeight(Number(e.target.value))}
                className="w-full bg-[#0A0514] border border-white/[0.08] rounded-xl px-3 py-2.5 text-white font-mono font-bold outline-none focus:border-[#7C3AED]"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">عدد العدات المنجزة به (Reps)</label>
              <input
                type="number"
                min={1}
                max={30}
                value={calcReps}
                onChange={(e) => setCalcReps(Number(e.target.value))}
                className="w-full bg-[#0A0514] border border-white/[0.08] rounded-xl px-3 py-2.5 text-white font-mono font-bold outline-none focus:border-[#7C3AED]"
              />
            </div>
          </div>

          {/* Intensity Percentages Breakdown Table */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-white block">جدول شدة الأوزان التدريبية للاعب ({calcExerciseName}):</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-xs">
              {rmResults.intensityLevels.map((lvl) => (
                <div key={lvl.percentage} className="p-3 rounded-xl bg-[#120A24] border border-white/[0.05] text-center space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono block">{lvl.percentage}% شدة</span>
                  <span className="text-base font-black font-mono text-white block">{lvl.targetWeightKg} kg</span>
                  <span className="text-[10px] text-[#A78BFA] block">{lvl.repTarget}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-[10px] text-slate-600 border-t border-white/[0.03]">
        CoachPR Platform · محرك أنظمة وتكنيكات كمال الأجسام 2026
      </footer>

    </div>
  );
}
