"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Dumbbell, 
  Search, 
  ArrowLeft, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  Zap, 
  Layers, 
  Info,
  ChevronRight
} from "lucide-react";
import { MUSCLE_GROUPS, ANATOMY_EXERCISES_DATABASE, AnatomyExercise } from "@/lib/anatomyData";

export default function AnatomyPage() {
  const [activeView, setActiveView] = useState<"front" | "back">("front");
  const [selectedMuscle, setSelectedMuscle] = useState<string>("chest");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedExercise, setSelectedExercise] = useState<AnatomyExercise | null>(
    ANATOMY_EXERCISES_DATABASE[0]
  );

  const filteredMuscles = MUSCLE_GROUPS.filter(m => m.view === activeView);

  const currentMuscleInfo = MUSCLE_GROUPS.find(m => m.id === selectedMuscle);

  const exercisesForMuscle = ANATOMY_EXERCISES_DATABASE.filter(ex => {
    const matchesSearch = 
      ex.nameAr.includes(searchQuery) || 
      ex.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.equipment.includes(searchQuery);
    
    if (searchQuery) return matchesSearch;
    return ex.primaryMuscle === selectedMuscle || ex.secondaryMuscles.includes(selectedMuscle);
  });

  return (
    <div className="min-h-screen bg-[#0A0612] text-white flex flex-col font-sans" dir="rtl">
      {/* Top Navigation */}
      <header className="bg-[#110A1E] border-b border-purple-900/30 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2">
            <img src="/pr-logo.png" alt="CoachPRB" style={{ height: "34px", width: "auto" }} />
            <span className="font-heading font-black text-xl text-white">Coach<span className="text-[#A78BFA]">PRB</span></span>
          </Link>
          <span className="hidden sm:inline-block px-2.5 py-1 text-[11px] font-bold bg-[#7C3AED]/20 text-[#A78BFA] border border-purple-500/30 rounded-full">
            مكتبة الأناتومي وتشريح العضلات (1,300+ تمرين تفاعلي)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard/builder" className="text-xs bg-[#7C3AED] hover:bg-[#6D28D9] px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 shadow-lg shadow-purple-900/40">
            <span>إضافة لجدول التمرين</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link href="/dashboard" className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-bold transition">
            <ArrowLeft className="w-4 h-4" />
            <span>لوحة التحكم</span>
          </Link>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Anatomy Body & Muscle Selector */}
        <div className="lg:col-span-4 bg-[#140C24] border border-purple-900/30 rounded-3xl p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-purple-900/30">
            <h2 className="text-sm font-black flex items-center gap-2 text-white">
              <Layers className="w-4 h-4 text-[#A78BFA]" />
              <span>خريطة عضلات الجسم (Anatomy Map)</span>
            </h2>
            {/* View Switcher Front/Back */}
            <div className="bg-[#110A1E] p-1 rounded-xl flex gap-1 border border-purple-900/40">
              <button
                onClick={() => {
                  setActiveView("front");
                  setSelectedMuscle("chest");
                }}
                className={`text-xs px-3 py-1.5 rounded-lg font-bold transition ${
                  activeView === "front" 
                    ? "bg-[#7C3AED] text-white shadow" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                أمامي (Front)
              </button>
              <button
                onClick={() => {
                  setActiveView("back");
                  setSelectedMuscle("lats");
                }}
                className={`text-xs px-3 py-1.5 rounded-lg font-bold transition ${
                  activeView === "back" 
                    ? "bg-[#7C3AED] text-white shadow" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                خلفي (Back)
              </button>
            </div>
          </div>

          {/* Interactive Visual Avatar Indicator */}
          <div className="relative bg-[#0F081D] rounded-2xl p-4 border border-purple-900/40 flex flex-col items-center justify-center min-h-[220px]">
            <div className="text-center space-y-1 z-10">
              <span className="text-[11px] text-purple-300 font-bold tracking-wider uppercase">
                {activeView === "front" ? "المنظر الأمامي للجسم" : "المنظر الخلفي للظهر والأرجل"}
              </span>
              <h3 className="text-xl font-black text-white">{currentMuscleInfo?.nameAr}</h3>
              <p className="text-xs text-slate-400 max-w-xs">{currentMuscleInfo?.description}</p>
            </div>

            {/* Glowing Accent Ring */}
            <div className="absolute inset-0 bg-radial from-purple-600/10 via-transparent to-transparent pointer-events-none rounded-2xl" />
          </div>

          {/* Muscle Buttons List */}
          <div className="space-y-1.5 overflow-y-auto max-h-[350px] pr-1 custom-scrollbar">
            {filteredMuscles.map(muscle => {
              const isSelected = selectedMuscle === muscle.id;
              return (
                <button
                  key={muscle.id}
                  onClick={() => {
                    setSelectedMuscle(muscle.id);
                    setSearchQuery("");
                  }}
                  className={`w-full text-right p-3 rounded-2xl transition border flex items-center justify-between text-xs font-bold ${
                    isSelected
                      ? "bg-[#7C3AED]/20 border-[#7C3AED] text-white shadow-lg shadow-purple-950/50"
                      : "bg-[#110A1E]/80 border-purple-900/20 text-slate-300 hover:border-purple-600/40 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-[#A78BFA] shadow-[0_0_8px_#A78BFA]" : "bg-slate-600"}`} />
                    <span>{muscle.nameAr}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono uppercase">{muscle.nameEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Middle Column: Exercises List for the selected muscle */}
        <div className="lg:col-span-4 bg-[#140C24] border border-purple-900/30 rounded-3xl p-5 flex flex-col gap-4">
          <div>
            <h2 className="text-sm font-black flex items-center justify-between text-white mb-2">
              <span className="flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-[#A78BFA]" />
                <span>تمارين {currentMuscleInfo?.nameEn || "المختارة"}</span>
              </span>
              <span className="text-[11px] text-slate-400">{exercisesForMuscle.length} تمرين</span>
            </h2>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute right-3 top-3" />
              <input
                type="text"
                placeholder="ابحث باسم التمرين أو الأداة (دامبل، بار، كابل)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#110A1E] border border-purple-900/40 rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#7C3AED]"
              />
            </div>
          </div>

          {/* Exercises Scroll List */}
          <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[560px] pr-1 custom-scrollbar">
            {exercisesForMuscle.map(ex => {
              const isSelected = selectedExercise?.id === ex.id;
              return (
                <div
                  key={ex.id}
                  onClick={() => setSelectedExercise(ex)}
                  className={`p-3.5 rounded-2xl border transition cursor-pointer flex flex-col gap-2 ${
                    isSelected
                      ? "bg-[#1B0F33] border-[#7C3AED] shadow-md shadow-purple-950"
                      : "bg-[#110A1E] border-purple-900/20 hover:border-purple-600/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-white">{ex.nameAr}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-900/30 text-purple-300 font-bold border border-purple-800/40">
                      {ex.mechanics === "compound" ? "مركب (Compound)" : "عزل (Isolation)"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-mono text-slate-400 text-[10px]">{ex.nameEn}</span>
                    <span className="text-slate-300">الأداة: {ex.equipment}</span>
                  </div>
                </div>
              );
            })}

            {exercisesForMuscle.length === 0 && (
              <div className="text-center py-10 text-slate-500 text-xs">
                لا توجد نتائج بحث مطابقة. جرب البحث باسم آخر.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Detailed Exercise Anatomy Breakdown & Execution Guidelines */}
        <div className="lg:col-span-4 bg-[#140C24] border border-purple-900/30 rounded-3xl p-5 flex flex-col gap-4">
          {selectedExercise ? (
            <div className="space-y-4">
              {/* Header Info */}
              <div className="pb-3 border-b border-purple-900/30 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#A78BFA] font-bold">التشريح والتحليل الحركي للتمارين</span>
                  <span className="text-[10px] bg-[#7C3AED]/20 text-purple-300 px-2 py-0.5 rounded border border-purple-700/40">
                    {selectedExercise.difficulty === "beginner" ? "مبتدئ" : selectedExercise.difficulty === "intermediate" ? "متوسط" : "متقدم"}
                  </span>
                </div>
                <h3 className="text-base font-black text-white">{selectedExercise.nameAr}</h3>
                <p className="text-xs text-slate-400 font-mono">{selectedExercise.nameEn}</p>
              </div>

              {/* Anatomy Target Matrix */}
              <div className="bg-[#110A1E] p-3.5 rounded-2xl border border-purple-900/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">العضلة المستهدفة الأساسية:</span>
                  <span className="text-[#A78BFA] font-black">{MUSCLE_GROUPS.find(m => m.id === selectedExercise.primaryMuscle)?.nameAr}</span>
                </div>
                {selectedExercise.secondaryMuscles.length > 0 && (
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-purple-900/20">
                    <span className="text-slate-400">العضلات المساعدة:</span>
                    <span className="text-slate-300 font-bold">
                      {selectedExercise.secondaryMuscles.map(mId => MUSCLE_GROUPS.find(m => m.id === mId)?.nameAr).join(" • ")}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs pt-2 border-t border-purple-900/20">
                  <span className="text-slate-400">المعدات المطلوبة:</span>
                  <span className="text-white font-bold">{selectedExercise.equipment}</span>
                </div>
              </div>

              {/* Execution Mastery Tips */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#A78BFA]" />
                  <span>أسرار الأداء التكنيكي المثالي:</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300 bg-[#110A1E] p-3.5 rounded-2xl border border-purple-900/30">
                  {selectedExercise.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-[#A78BFA] font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Mistakes to Avoid */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-rose-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span>أخطاء شائعة تجنبها للوقاية من الإصابة:</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-rose-200/90 bg-rose-950/20 p-3.5 rounded-2xl border border-rose-900/30">
                  {selectedExercise.mistakes.map((mistake, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Action Button */}
              <Link
                href={`/dashboard/builder?add=${encodeURIComponent(selectedExercise.nameAr)}`}
                className="w-full py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black text-xs rounded-xl shadow-lg shadow-purple-900/40 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>إدراج هذا التمرين في خطة تمرين العميل</span>
              </Link>
            </div>
          ) : (
            <div className="text-center py-20 text-slate-500 text-xs">
              اختر تمريناً لعرض تفاصيل التشريح والأداء.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
