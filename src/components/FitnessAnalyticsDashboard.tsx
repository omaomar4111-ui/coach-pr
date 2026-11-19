'use client';

import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  CartesianGrid
} from 'recharts';
import { 
  TrendingUp, 
  Flame, 
  Dumbbell, 
  ShieldCheck, 
  Sparkles, 
  ChevronUp, 
  ChevronDown,
  Award
} from 'lucide-react';

interface FitnessChartProps {
  athleteName?: string;
}

const STRENGTH_PROGRESSION_DATA = [
  { week: 'أسبوع 1', bench: 70, squat: 100, deadlift: 120 },
  { week: 'أسبوع 2', bench: 72.5, squat: 105, deadlift: 125 },
  { week: 'أسبوع 3', bench: 75, squat: 110, deadlift: 130 },
  { week: 'أسبوع 4', bench: 77.5, squat: 112.5, deadlift: 135 },
  { week: 'أسبوع 5', bench: 80, squat: 117.5, deadlift: 140 },
  { week: 'أسبوع 6 (PR)', bench: 82.5, squat: 120, deadlift: 145 },
];

const WEEKLY_VOLUME_DATA = [
  { day: 'سبت', sets: 18, intensity: 'عالية' },
  { day: 'أحد', sets: 16, intensity: 'متوسطة' },
  { day: 'اثنين', sets: 0, intensity: 'راحة' },
  { day: 'ثلاثاء', sets: 20, intensity: 'عالية جداً' },
  { day: 'أربعاء', sets: 14, intensity: 'متوسطة' },
  { day: 'خميس', sets: 22, intensity: 'أرجل / PR' },
  { day: 'جمعة', sets: 0, intensity: 'راحة' },
];

export function FitnessAnalyticsDashboard({ athleteName = 'طارق حسام' }: FitnessChartProps) {
  const [metric, setMetric] = useState<'squat' | 'bench' | 'deadlift'>('bench');

  return (
    <div className="space-y-6 text-white font-sans" dir="rtl">
      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="glass-surface p-4 rounded-2xl border border-purple-500/30">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>الـ PR الحالي (بنش)</span>
            <Award size={15} className="text-purple-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-white font-mono">82.5</span>
            <span className="text-xs text-purple-300 font-bold">كجم</span>
            <span className="text-[10px] text-emerald-400 font-bold flex items-center mr-auto">
              <ChevronUp size={12} /> +12.5 كجم
            </span>
          </div>
        </div>

        <div className="glass-surface p-4 rounded-2xl border border-emerald-500/30">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>معدل الالتزام (Consistency)</span>
            <Flame size={15} className="text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-emerald-400 font-mono">94%</span>
            <span className="text-[10px] text-slate-400">آخر 30 يوم</span>
          </div>
        </div>

        <div className="glass-surface p-4 rounded-2xl border border-amber-500/30">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>متوسط الـ RIR المحقق</span>
            <Dumbbell size={15} className="text-amber-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-amber-300 font-mono">1.8</span>
            <span className="text-[10px] text-emerald-400 font-bold">قريب من الفشل الآمن</span>
          </div>
        </div>

        <div className="glass-surface p-4 rounded-2xl border border-fuchsia-500/30">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>مؤشر أمان المفاصل</span>
            <ShieldCheck size={15} className="text-fuchsia-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-white font-mono">100%</span>
            <span className="text-[10px] hud-badge-green px-1.5 py-0.5 rounded font-bold">زوايا سليمة</span>
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Progressive Overload Chart */}
        <div className="lg:col-span-8 glass-surface p-5 sm:p-6 rounded-3xl border border-purple-500/25 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/5 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-purple-400" />
                <h3 className="text-base font-black text-white">منحنى التطور التدريبي الفعلي (Progressive Overload)</h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">معدل زيادة الأوزان الحقيقية المحققة للاعب {athleteName}</p>
            </div>

            {/* Exercise Pill Switcher */}
            <div className="flex gap-1.5 bg-[#090614] p-1 rounded-xl border border-white/10 text-xs">
              <button
                onClick={() => setMetric('bench')}
                className={`px-3 py-1 rounded-lg font-bold transition ${
                  metric === 'bench' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                بنش برس
              </button>
              <button
                onClick={() => setMetric('squat')}
                className={`px-3 py-1 rounded-lg font-bold transition ${
                  metric === 'squat' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                سكوات
              </button>
              <button
                onClick={() => setMetric('deadlift')}
                className={`px-3 py-1 rounded-lg font-bold transition ${
                  metric === 'deadlift' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                ديدليفت
              </button>
            </div>
          </div>

          {/* Recharts Area Container */}
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={STRENGTH_PROGRESSION_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={['dataMin - 10', 'dataMax + 10']} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0E081D', 
                    borderColor: 'rgba(139, 92, 246, 0.4)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                  formatter={(val: any) => [`${val} كجم`, 'الوزن الفعلي']}
                />
                <Area 
                  type="monotone" 
                  dataKey={metric} 
                  stroke="#a78bfa" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#purpleGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Weekly Volume Bar Chart */}
        <div className="lg:col-span-4 glass-surface p-5 sm:p-6 rounded-3xl border border-purple-500/25 space-y-4">
          <div className="border-b border-white/5 pb-3">
            <h3 className="text-base font-black text-white">حجم المجموعات الأسبوعي (Volume)</h3>
            <p className="text-xs text-slate-400 mt-0.5">عدد المجموعات الفعالة لكل يوم</p>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_VOLUME_DATA} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0E081D', 
                    borderColor: 'rgba(16, 185, 129, 0.4)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                  formatter={(val: any) => [`${val} مجموعة`, 'الحجم التدريبي']}
                />
                <Bar dataKey="sets" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
