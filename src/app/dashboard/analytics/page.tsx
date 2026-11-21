'use client';

import React, { useState, useEffect } from 'react';
import { 
  LineChart as LineChartIcon, 
  TrendingUp, 
  Users, 
  Flame, 
  Activity, 
  Calendar, 
  Dumbbell, 
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell 
} from 'recharts';

export default function AnalyticsPage() {
  const [stats, setStats] = useState({
    totalClients: 29,
    activeVolumeKg: 142000,
    avgCommitment: 86,
    mrr: 6600
  });

  const volumeTrends = [
    { week: 'الأسبوع 1', volume: 112000, workouts: 88 },
    { week: 'الأسبوع 2', volume: 124000, workouts: 96 },
    { week: 'الأسبوع 3', volume: 135000, workouts: 104 },
    { week: 'الأسبوع 4', volume: 142000, workouts: 118 }
  ];

  const muscleEngagement = [
    { muscle: 'الظهر (Back)', count: 240 },
    { muscle: 'الصدر (Chest)', count: 210 },
    { muscle: 'الأرجل (Legs)', count: 195 },
    { muscle: 'الأكتاف (Shoulders)', count: 160 },
    { muscle: 'الذراعين (Arms)', count: 180 }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans" dir="rtl">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <LineChartIcon className="text-[#a78bfa]" /> التحليلات ونمو الأداء
          </h1>
          <p className="text-xs text-white/50 mt-1">
            إحصاءات الأحمال التدريبية التراكمية، ومعدلات استمرار اللاعبين، والنمو المالي للمنصة.
          </p>
        </div>

        <span className="text-xs bg-[#1e1338] text-[#c4b5fd] border border-[#7C3AED]/40 px-3 py-1.5 rounded-2xl font-mono">
          نوفمبر 2026 &bull; تحديث مباشر
        </span>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111116] border border-white/5 p-5 rounded-3xl space-y-1">
          <span className="text-xs text-white/40 block">الحجم التدريبي الأسبوعي</span>
          <div className="flex items-baseline gap-1.5">
            <h3 className="text-2xl sm:text-3xl font-black font-mono text-white">142,000</h3>
            <span className="text-xs text-[#a78bfa] font-mono">كجم</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold block pt-1">زيادة أحمال تدريجية +6%</span>
        </div>

        <div className="bg-[#111116] border border-white/5 p-5 rounded-3xl space-y-1">
          <span className="text-xs text-white/40 block">معدل الالتزام العام</span>
          <div className="flex items-baseline gap-1.5">
            <h3 className="text-2xl sm:text-3xl font-black font-mono text-[#a78bfa]">86%</h3>
          </div>
          <span className="text-[10px] text-[#c4b5fd] font-bold block pt-1">ممتاز (25 من 29 لاعب)</span>
        </div>

        <div className="bg-[#111116] border border-white/5 p-5 rounded-3xl space-y-1">
          <span className="text-xs text-white/40 block">جلسات التمرين المسجلة</span>
          <div className="flex items-baseline gap-1.5">
            <h3 className="text-2xl sm:text-3xl font-black font-mono text-white">406</h3>
            <span className="text-xs text-white/40">جلسة</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold block pt-1">عبر تطبيق الـ PWA</span>
        </div>

        <div className="bg-[#111116] border border-white/5 p-5 rounded-3xl space-y-1">
          <span className="text-xs text-white/40 block">الإيراد الشهري المتكرر (MRR)</span>
          <div className="flex items-baseline gap-1.5">
            <h3 className="text-2xl sm:text-3xl font-black font-mono text-white">6,600</h3>
            <span className="text-xs text-[#a78bfa] font-mono">EGP</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold block pt-1">+28% مقارنة بأكتوبر</span>
        </div>
      </div>

      {/* Chart 1: Progressive Overload Volume Progression */}
      <div className="bg-[#111116] border border-white/5 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex justify-between items-center border-b border-white/5 pb-3">
          <div>
            <h3 className="font-bold text-sm text-white">تطور الأحمال التدريبية التراكمية (Progressive Overload)</h3>
            <p className="text-[11px] text-white/40 mt-0.5">إجمالي الأوزان المرفوعة أسبوعياً عبر كافة اللاعبين النشطين</p>
          </div>
          <span className="text-xs font-mono text-[#c4b5fd]">كجم / أسبوع</span>
        </div>

        <div className="h-64 w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={volumeTrends} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="week" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={val => `${val/1000}k`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e1338', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '12px', fontSize: '11px' }}
                itemStyle={{ color: '#c4b5fd' }}
              />
              <Area type="monotone" dataKey="volume" stroke="#7C3AED" strokeWidth={3} fillOpacity={1} fill="url(#purpleGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Muscle Distribution */}
      <div className="bg-[#111116] border border-white/5 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex justify-between items-center border-b border-white/5 pb-3">
          <h3 className="font-bold text-sm text-white">توزيع الحجم التدريبي حسب العضلات</h3>
          <span className="text-xs text-white/40">إجمالي المجموعات الشهرية</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {muscleEngagement.map((m, idx) => (
            <div key={idx} className="bg-[#0b0a10] border border-white/5 p-4 rounded-2xl text-center space-y-1">
              <span className="text-xs text-white/50 block">{m.muscle}</span>
              <span className="text-xl font-black font-mono text-white block">{m.count}</span>
              <span className="text-[10px] text-[#a78bfa] block font-mono">مجموعة منفذة</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
