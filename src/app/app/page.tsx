"use client";

import React, { useState, useEffect } from 'react';
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
  Award
} from 'lucide-react';

export default function AthleteMobileApp() {
  const [activeTab, setActiveTab] = useState<'today' | 'workout' | 'diet' | 'progress' | 'coach'>('today');
  const [completedSets, setCompletedSets] = useState<number[]>([0, 1]);
  const [isResting, setIsResting] = useState<boolean>(false);
  const [restTime, setRestTime] = useState<number>(60);
  const [mealsChecked, setMealsChecked] = useState<number[]>([0, 1]);

  useEffect(() => {
    let timer: any;
    if (isResting && restTime > 0) {
      timer = setInterval(() => setRestTime(t => t - 1), 1000);
    } else if (restTime === 0) {
      setIsResting(false);
      setRestTime(60);
    }
    return () => clearInterval(timer);
  }, [isResting, restTime]);

  const toggleSet = (idx: number) => {
    if (completedSets.includes(idx)) {
      setCompletedSets(completedSets.filter(i => i !== idx));
    } else {
      setCompletedSets([...completedSets, idx]);
      setIsResting(true);
      setRestTime(60);
    }
  };

  const toggleMeal = (idx: number) => {
    if (mealsChecked.includes(idx)) {
      setMealsChecked(mealsChecked.filter(i => i !== idx));
    } else {
      setMealsChecked([...mealsChecked, idx]);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col font-sans select-none overflow-x-hidden" dir="rtl">
      
      {/* Top Mobile Bar */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between border-b border-white/5 bg-[#090a09]/90 sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#d4f60b] text-black font-extrabold flex items-center justify-center text-xs shadow-[0_0_12px_rgba(212,246,11,0.4)]">
            ك
          </div>
          <div>
            <h1 className="text-xs font-bold text-white flex items-center gap-1.5">
              مساء الخير، كريم 👋
            </h1>
            <p className="text-[10px] text-white/40 font-mono">السبت، 21 نوفمبر</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#d4f60b] animate-pulse"></span>
          <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60">
            <Bell size={13} />
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 p-4 pb-20 space-y-4 overflow-y-auto">
        
        {/* TAB 1: TODAY (Exact GymRate 10/10 Score & Workout Hero Card) */}
        {activeTab === 'today' && (
          <>
            {/* 10/10 Score Widget */}
            <div className="bg-[#0f1209] border border-[#d4f60b]/30 rounded-2xl p-4 flex items-center justify-between shadow-[0_0_20px_rgba(212,246,11,0.08)]">
              <div>
                <span className="text-[10px] text-[#d4f60b] font-bold block mb-0.5">يومك 10/10</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black font-mono text-[#d4f60b]">3</span>
                  <span className="text-xs text-white/40 font-mono">/ 10</span>
                </div>
                <p className="text-[10px] text-white/60 mt-1">فاضل 3: تمرينة ووجبتين</p>
              </div>

              {/* Radial Adherence */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full border-4 border-white/10 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full border-4 border-[#d4f60b] border-t-transparent -rotate-45 shadow-[0_0_10px_rgba(212,246,11,0.4)]"></div>
                  <Flame size={18} className="text-[#d4f60b]" />
                </div>
              </div>
            </div>

            {/* Today Workout Hero Card */}
            <div className="bg-[#111411] border border-white/10 rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-white/40 tracking-wider">تمرينة النهاردة</span>
                  <h2 className="text-xl font-black text-white mt-0.5">Push Day</h2>
                  <p className="text-xs text-white/50 mt-1">5 تمارين &bull; 39 دقيقة</p>
                </div>
                <span className="text-[10px] bg-[#d4f60b]/10 text-[#d4f60b] border border-[#d4f60b]/30 px-2 py-0.5 rounded-full font-bold">
                  جدول كابتن تامر
                </span>
              </div>

              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab('workout')}
                  className="w-full py-3 rounded-xl bg-[#d4f60b] hover:bg-[#c2e205] text-black font-black text-xs flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(212,246,11,0.3)] transition active:scale-95"
                >
                  <Play size={14} className="fill-black" />
                  ابدأ التمرينة
                </button>

                <button className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 font-semibold text-xs border border-white/10 transition">
                  خد النهاردة راحة
                </button>
              </div>
            </div>

            {/* Today Nutrition Tracker Card */}
            <div className="bg-[#111411] border border-white/10 rounded-2xl p-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-white">أكل النهاردة</span>
                <span className="text-[10px] text-white/40 font-mono">هدف: 2800 سعرة</span>
              </div>

              <div className="flex items-baseline justify-between bg-black/40 p-3 rounded-xl border border-white/5">
                <div>
                  <span className="text-xs text-white/40 block">المتبقي</span>
                  <span className="text-2xl font-black font-mono text-[#d4f60b]">2,834</span>
                  <span className="text-[10px] text-white/40 font-mono mr-1">KCAL</span>
                </div>
                <div className="text-left">
                  <span className="text-xs text-white/40 block">بروتين</span>
                  <span className="text-lg font-black font-mono text-white">230</span>
                  <span className="text-[10px] text-white/40 font-mono"> / 184 جم</span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                {[
                  { name: "وجبة 1: شوفان وبيض وموز", cals: "650 kcal", protein: "45g" },
                  { name: "وجبة 2: صدور دجاج وأرز وخضار", cals: "850 kcal", protein: "60g" },
                  { name: "وجبة 3: تونة وبطاطس مسلوقة", cals: "500 kcal", protein: "40g" },
                ].map((meal, idx) => (
                  <div 
                    key={idx}
                    onClick={() => toggleMeal(idx)}
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                      mealsChecked.includes(idx)
                        ? "bg-[#0f1209] border-[#d4f60b]/40 text-[#d4f60b]"
                        : "bg-white/5 border-white/5 text-white/80"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center text-[10px] ${
                        mealsChecked.includes(idx) ? "bg-[#d4f60b] border-[#d4f60b] text-black" : "border-white/20"
                      }`}>
                        {mealsChecked.includes(idx) && <Check size={11} strokeWidth={3} />}
                      </div>
                      <span className="text-xs font-medium">{meal.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-white/40">{meal.cals}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* TAB 2: WORKOUT (Live Exercise Logging, Sets, Reps & Rest Timer) */}
        {activeTab === 'workout' && (
          <div className="space-y-4">
            <div className="bg-[#111411] border border-white/10 rounded-2xl p-4">
              <span className="text-[10px] text-[#d4f60b] font-bold block mb-1">التمرين 1 من 5</span>
              <h3 className="text-base font-black text-white">Barbell Bench Press (بنش مستوي)</h3>
              <p className="text-[11px] text-white/50 mt-0.5">راحة 90 ثانية &bull; RIR 1-2</p>

              {/* Set Matrix */}
              <div className="mt-4 space-y-2">
                <div className="grid grid-cols-4 text-[10px] text-white/40 font-mono px-2">
                  <span>المجموعة</span>
                  <span>الوزن (كجم)</span>
                  <span>العدات</span>
                  <span className="text-left">تأكيد</span>
                </div>

                {[
                  { set: 1, weight: "70", reps: "10" },
                  { set: 2, weight: "75", reps: "9" },
                  { set: 3, weight: "80", reps: "8" },
                  { set: 4, weight: "80", reps: "7" },
                ].map((s, idx) => (
                  <div 
                    key={idx}
                    onClick={() => toggleSet(idx)}
                    className={`grid grid-cols-4 items-center p-2 rounded-xl border cursor-pointer transition ${
                      completedSets.includes(idx)
                        ? "bg-[#0f1209] border-[#d4f60b]/40 text-[#d4f60b]"
                        : "bg-white/5 border-white/5 text-white"
                    }`}
                  >
                    <span className="font-mono text-xs font-bold">#{s.set}</span>
                    <span className="font-mono text-xs">{s.weight}</span>
                    <span className="font-mono text-xs">{s.reps}</span>
                    <div className="flex justify-end">
                      <div className={`w-5 h-5 rounded-lg border flex items-center justify-center ${
                        completedSets.includes(idx)
                          ? "bg-[#d4f60b] border-[#d4f60b] text-black"
                          : "border-white/20"
                      }`}>
                        {completedSets.includes(idx) && <Check size={12} strokeWidth={3} />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rest Timer Banner */}
              {isResting && (
                <div className="mt-4 bg-[#0f1209] border border-[#d4f60b]/40 p-3 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-[#d4f60b] animate-spin" />
                    <div>
                      <span className="text-xs font-bold text-white block">مؤقت الراحة</span>
                      <span className="text-[10px] text-white/40">استعد للمجموعة القادمة</span>
                    </div>
                  </div>
                  <span className="text-xl font-black font-mono text-[#d4f60b]">{restTime}s</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: DIET */}
        {activeTab === 'diet' && (
          <div className="space-y-3">
            <div className="bg-[#111411] border border-white/10 rounded-2xl p-4">
              <h3 className="text-sm font-bold text-white mb-2">خطة التغذية اليومية</h3>
              <p className="text-xs text-white/60">مخصصة من كابتن تامر: 2,800 سعرة حرارية، 200 جم بروتين.</p>
            </div>
          </div>
        )}

        {/* TAB 4: PROGRESS */}
        {activeTab === 'progress' && (
          <div className="space-y-3">
            <div className="bg-[#111411] border border-white/10 rounded-2xl p-4">
              <h3 className="text-sm font-bold text-white mb-2">تطور الأوزان والأداء</h3>
              <p className="text-xs text-white/60">Bench Press PR: 120 kg (+15 kg هذا الشهر)</p>
            </div>
          </div>
        )}

        {/* TAB 5: COACH */}
        {activeTab === 'coach' && (
          <div className="space-y-3">
            <div className="bg-[#111411] border border-white/10 rounded-2xl p-4">
              <h3 className="text-sm font-bold text-white mb-2">محادثة كابتن تامر</h3>
              <p className="text-xs text-white/60">آخر رسالة: عاش يا وحش، التكنيك في السكوات ممتاز!</p>
            </div>
          </div>
        )}

      </div>

      {/* Mobile Bottom Navigation (Identical GymRate Tabs) */}
      <div className="h-14 bg-[#0a0c0a] border-t border-white/10 px-4 flex items-center justify-around fixed bottom-0 left-0 right-0 z-30">
        <button 
          onClick={() => setActiveTab('today')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'today' ? 'text-[#d4f60b]' : 'text-white/40'}`}
        >
          <Flame size={16} />
          <span className="text-[10px] font-bold">النهاردة</span>
        </button>

        <button 
          onClick={() => setActiveTab('workout')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'workout' ? 'text-[#d4f60b]' : 'text-white/40'}`}
        >
          <Dumbbell size={16} />
          <span className="text-[10px] font-bold">التمرينة</span>
        </button>

        <button 
          onClick={() => setActiveTab('diet')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'diet' ? 'text-[#d4f60b]' : 'text-white/40'}`}
        >
          <Utensils size={16} />
          <span className="text-[10px] font-bold">الأكل</span>
        </button>

        <button 
          onClick={() => setActiveTab('progress')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'progress' ? 'text-[#d4f60b]' : 'text-white/40'}`}
        >
          <TrendingUp size={16} />
          <span className="text-[10px] font-bold">تقدمك</span>
        </button>

        <button 
          onClick={() => setActiveTab('coach')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'coach' ? 'text-[#d4f60b]' : 'text-white/40'}`}
        >
          <MessageSquare size={16} />
          <span className="text-[10px] font-bold">الكوتش</span>
        </button>
      </div>

    </div>
  );
}
