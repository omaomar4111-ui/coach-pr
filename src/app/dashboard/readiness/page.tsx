'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Flame, 
  Activity, 
  Moon, 
  Droplet, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Sliders, 
  Dumbbell, 
  RefreshCw,
  Zap,
  TrendingDown,
  ShieldCheck
} from 'lucide-react';

interface ReadinessResult {
  score: number;
  status: 'optimal' | 'moderate' | 'fatigued';
  statusAr: string;
  originalSets: number;
  recommendedSets: number;
  adjustmentSummary: string;
  reasoning: string;
}

export default function ReadinessAutopilotPage() {
  const [sleepHours, setSleepHours] = useState<number>(6.5);
  const [stressLevel, setStressLevel] = useState<number>(5);
  const [waterLiters, setWaterLiters] = useState<number>(2.5);
  const [originalSets, setOriginalSets] = useState<number>(18);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [result, setResult] = useState<ReadinessResult | null>(null);
  const [appliedSets, setAppliedSets] = useState<number | null>(null);

  const calculate = async () => {
    setIsCalculating(true);
    try {
      const res = await fetch('/api/readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sleepHours,
          stressLevel,
          waterLiters,
          originalSets
        })
      });
      const data = await res.json();
      if (data?.data) {
        setResult(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    calculate();
  }, [sleepHours, stressLevel, waterLiters, originalSets]);

  const handleApplyAdjustment = () => {
    if (result) {
      setAppliedSets(result.recommendedSets);
    }
  };

  return (
    <div className="min-h-screen bg-[#07050d] text-white font-sans p-6 sm:p-10 selection:bg-[#a3e635] selection:text-black" dir="rtl">
      
      {/* Top Header */}
      <header className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-white/5 pb-6">
        <div>
          <Link href="/dashboard" className="text-white/40 hover:text-[#a3e635] mb-2 inline-flex items-center gap-1.5 text-xs font-semibold transition">
            <ArrowRight size={14} /> العودة للوحة التحكم
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white">مؤشر جاهزية اللاعب والتعديل الذكي</h1>
            <span className="bg-[#1a2312] border border-[#a3e635]/30 text-[#bef264] text-[10px] font-bold px-2 py-0.5 rounded-full">
              Autopilot ⚡
            </span>
          </div>
          <p className="text-xs text-white/50 mt-1">
            تقييم يومي فوري لجودة الاستشفاء وتعديل حجم المجموعات التدريبية لحماية المفاصل وزيادة البناء العضلي.
          </p>
        </div>

        <Link
          href="/app"
          className="bg-[#171228] border border-white/10 hover:border-[#a3e635] text-[#a3e635] px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
        >
          <Dumbbell size={14} /> فتح وضع الصالة (Gym Mode)
        </Link>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left / Input Controls: Questions of the morning */}
        <div className="md:col-span-6 bg-[#100c1e] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center gap-2 text-[#a3e635] border-b border-white/5 pb-4">
            <Sliders size={18} />
            <h2 className="text-base font-extrabold text-white">بيانات الصباح للاعب (سؤالان صباحيان)</h2>
          </div>

          {/* Sleep Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-1.5 text-white/70 font-bold">
                <Moon size={14} className="text-indigo-400" /> ساعات النوم الفعلية:
              </span>
              <span className="font-mono font-black text-white text-sm bg-[#171228] px-2.5 py-1 rounded-xl border border-white/10">
                {sleepHours} ساعات
              </span>
            </div>
            <input 
              type="range" 
              min="3" 
              max="10" 
              step="0.5" 
              value={sleepHours}
              onChange={e => setSleepHours(parseFloat(e.target.value))}
              className="w-full accent-[#a3e635] cursor-pointer bg-[#171228]" 
            />
            <p className="text-[10px] text-white/40">النوم الأقل من 5 ساعات يضعف الجهاز العصبي المركزي (CNS).</p>
          </div>

          {/* Stress Level */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-1.5 text-white/70 font-bold">
                <Flame size={14} className="text-amber-400" /> نسبة إجهاد وتوتر العضلات:
              </span>
              <span className="font-mono font-black text-amber-300 text-sm bg-[#171228] px-2.5 py-1 rounded-xl border border-white/10">
                {stressLevel} / 10
              </span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="10" 
              step="1" 
              value={stressLevel}
              onChange={e => setStressLevel(parseInt(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer bg-[#171228]" 
            />
            <div className="flex justify-between text-[9px] text-white/30">
              <span>نشيط جداً (1)</span>
              <span>متوسط (5)</span>
              <span>إجهاد وتكسير كامل (10)</span>
            </div>
          </div>

          {/* Water Intake */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-1.5 text-white/70 font-bold">
                <Droplet size={14} className="text-cyan-400" /> كمية شرب الماء حتى الآن:
              </span>
              <span className="font-mono font-black text-cyan-300 text-sm bg-[#171228] px-2.5 py-1 rounded-xl border border-white/10">
                {waterLiters} لتر
              </span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="5" 
              step="0.5" 
              value={waterLiters}
              onChange={e => setWaterLiters(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer bg-[#171228]" 
            />
          </div>

          {/* Original Plan Sets */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-white/70 font-bold">مجموع سِتات الجدول المخطط الأصلي لليوم:</span>
              <input 
                type="number"
                value={originalSets}
                onChange={e => setOriginalSets(parseInt(e.target.value) || 12)}
                className="w-16 bg-[#171228] border border-white/10 text-center font-bold text-sm text-white rounded-xl py-1 focus:outline-none focus:border-[#a3e635]"
              />
            </div>
          </div>

        </div>

        {/* Right / AI Decision Card (Kochivo Style) */}
        <div className="md:col-span-6 space-y-6">
          
          {result && (
            <div className="bg-[#100c1e] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-semibold text-white/40 block">مؤشر الجاهزية الرقمي</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-5xl font-black text-white font-mono">{result.score}%</span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-xl border ${
                      result.status === 'optimal' 
                        ? 'bg-[#1a2312] border-[#a3e635]/30 text-[#a3e635]' 
                        : result.status === 'moderate'
                          ? 'bg-amber-950/40 border-amber-500/30 text-amber-300'
                          : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
                    }`}>
                      {result.statusAr}
                    </span>
                  </div>
                </div>

                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${
                  result.status === 'optimal'
                    ? 'bg-[#171228] border-[#a3e635]/40 text-[#a3e635]'
                    : result.status === 'moderate'
                      ? 'bg-[#171228] border-amber-500/40 text-amber-400'
                      : 'bg-[#171228] border-rose-500/40 text-rose-400'
                }`}>
                  <Zap size={28} />
                </div>
              </div>

              {/* Dynamic Sets Proposal Comparison */}
              <div className="bg-[#171228] rounded-2xl p-5 border border-white/10 space-y-3">
                <div className="flex justify-between items-center text-xs text-white/50 border-b border-white/5 pb-2">
                  <span>الخطة التدريبية</span>
                  <span>القرار التلقائي المقترح</span>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[11px] text-white/40 block">الجدول الأصلي</span>
                    <span className="text-xl font-mono font-bold text-white/70 line-through">
                      {result.originalSets} سِت
                    </span>
                  </div>

                  <div className="text-center">
                    <ArrowRight size={18} className="text-[#a3e635] rotate-180" />
                  </div>

                  <div className="text-left">
                    <span className="text-[11px] text-[#a3e635] font-bold block">المقترح الآمن الذكي</span>
                    <span className="text-2xl font-mono font-black text-[#a3e635]">
                      {result.recommendedSets} سِت
                    </span>
                  </div>
                </div>

                <div className="bg-black/30 rounded-xl p-3 text-xs text-white/70 leading-relaxed border border-white/5">
                  <p className="font-semibold text-white mb-1 flex items-center gap-1.5">
                    <Sparkles size={13} className="text-[#a3e635]" /> تحليل السبب العلمي:
                  </p>
                  {result.reasoning}
                </div>
              </div>

              {/* Decision Action Buttons */}
              <div className="space-y-2 pt-2">
                {appliedSets === result.recommendedSets ? (
                  <div className="w-full bg-[#1a2312] border border-[#a3e635]/40 text-[#bef264] py-3.5 rounded-2xl font-black text-xs flex items-center justify-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>تم اعتماد وتطبيق {result.recommendedSets} سِت في جدول اللاعب بنجاح!</span>
                  </div>
                ) : (
                  <button 
                    onClick={handleApplyAdjustment}
                    className="w-full bg-[#a3e635] hover:bg-[#8fd128] text-black font-extrabold py-3.5 rounded-2xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#a3e635]/20"
                  >
                    <CheckCircle2 size={16} />
                    <span>تطبيق التعديل المقترح ({result.recommendedSets} سِت) بضغطة واحدة</span>
                  </button>
                )}

                <button 
                  onClick={() => setAppliedSets(result.originalSets)}
                  className="w-full bg-[#171228] hover:bg-white/5 border border-white/10 text-white/60 py-3 rounded-2xl text-xs font-semibold transition"
                >
                  الإبقاء على التمرين الأصلي ({result.originalSets} سِت)
                </button>
              </div>

            </div>
          )}

        </div>

      </main>

    </div>
  );
}
