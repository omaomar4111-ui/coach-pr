'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Users, 
  Wallet, 
  Activity, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowUpRight, 
  Sparkles, 
  Send, 
  ChevronRight, 
  Clock, 
  Smartphone,
  ExternalLink,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell
} from 'recharts';
import ProactiveAgentFeed from '@/components/ProactiveAgentFeed';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    activeClients: 29,
    monthlyRevenue: 6600,
    commitmentRate: 86,
    awaitingReview: 15,
    currency: 'EGP'
  });

  const [revenueWeekly, setRevenueWeekly] = useState<any[]>([
    { day: 'السبت', revenue: 0, active: true },
    { day: 'الأحد', revenue: 0, active: false },
    { day: 'الاثنين', revenue: 4400, active: false },
    { day: 'الثلاثاء', revenue: 2200, active: false },
    { day: 'الأربعاء', revenue: 0, active: false },
    { day: 'الخميس', revenue: 0, active: false },
    { day: 'الجمعة', revenue: 0, active: false }
  ]);

  const [attentionClients, setAttentionClients] = useState<any[]>([
    {
      id: 'c-1',
      name: 'Omar Hassan',
      daysInactive: 8,
      reason: 'مفيش تمرين ولا وجبة مسجلة من 8 أيام، وما ردش على آخر رسالة.',
      phone: '01012345678',
      aiSuggestion: 'رسالة قصيرة وودية من ميغاتروين تقترح ضبط أوزان التمرين لاستعادة الشغف.'
    }
  ]);

  const [workQueue, setWorkQueue] = useState<any[]>([
    { id: 'wq-1', name: 'Mahmoud Saber', avatar: 'MS', type: 'طلب انضمام جديد', time: 'منذ ساعتين', status: 'pending' },
    { id: 'wq-2', name: 'Karim Galal', avatar: 'KG', type: 'متابعة أسبوعية (Check-in)', time: 'منذ 7 ساعات', status: 'pending' },
    { id: 'wq-3', name: 'Nour Ibrahim', avatar: 'NI', type: 'مراجعة أداء وتكنيك (Form Check)', time: 'منذ 6 ساعات', status: 'pending' },
    { id: 'wq-4', name: 'Reem Gamal', avatar: 'RG', type: 'اشتراك قارب على الانتهاء', time: 'منذ ساعة', status: 'warning' }
  ]);

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then(res => res.json())
      .then(data => {
        if (data?.stats) setStats(data.stats);
        if (data?.revenueWeekly) setRevenueWeekly(data.revenueWeekly);
        if (data?.attentionClients) setAttentionClients(data.attentionClients);
        if (data?.workQueue) setWorkQueue(data.workQueue);
      })
      .catch(console.error);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.3 }}
      className="space-y-6 max-w-7xl mx-auto"
    >
      
      {/* Top Greeting Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            مساء الخير، كابتن Tamer
          </h1>
          <p className="text-xs text-white/40 font-mono mt-0.5">
            السبت، 21 نوفمبر
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/readiness"
            className="bg-[#1e1338] border border-[#7C3AED]/40 hover:border-[#7C3AED] text-[#c4b5fd] px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm shadow-[#7C3AED]/20"
          >
            <Sparkles size={13} className="text-[#d4f60b]" /> فحص جاهزية اليوم
          </Link>
        </div>
      </div>

      {/* 4 Top KPI Cards (Matching Exact Metric Layout with Neon Lime & Luxury Dark) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Active Clients */}
        <div className="bg-[#111116] border border-white/5 p-5 rounded-2xl flex flex-col justify-between hover:border-[#7C3AED]/30 transition group">
          <p className="text-xs font-semibold text-white/50 mb-1">العملاء النشطون</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-black font-mono text-white group-hover:text-[#c4b5fd] transition">{stats.activeClients}</h3>
            <span className="text-xs text-white/30 font-normal">لاعب</span>
          </div>
        </div>

        {/* Pending Review */}
        <div className="bg-[#111116] border border-white/5 p-5 rounded-2xl flex flex-col justify-between hover:border-amber-500/30 transition">
          <p className="text-xs font-semibold text-white/50 mb-1">بانتظار المراجعة</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-black font-mono text-white">{stats.awaitingReview}</h3>
            <span className="text-xs text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">معلق</span>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-[#111116] border border-white/5 p-5 rounded-2xl flex flex-col justify-between hover:border-[#d4f60b]/30 transition group">
          <p className="text-xs font-semibold text-white/50 mb-1">إيرادات الشهر</p>
          <div className="flex items-baseline gap-1.5">
            <h3 className="text-3xl font-black font-mono text-[#d4f60b] transition">{stats.monthlyRevenue.toLocaleString()}</h3>
            <span className="text-xs text-white/40 font-mono">EGP</span>
          </div>
        </div>

        {/* Average Commitment */}
        <div className="bg-[#111116] border border-white/5 p-5 rounded-2xl flex flex-col justify-between hover:border-[#d4f60b]/30 transition">
          <p className="text-xs font-semibold text-white/50 mb-1">متوسط الالتزام</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-black font-mono text-[#d4f60b]">{stats.commitmentRate}%</h3>
            <span className="text-[11px] text-[#d4f60b] font-bold flex items-center gap-1">
              <Flame size={12} className="text-[#d4f60b]" /> ممتاز
            </span>
          </div>
        </div>

      </div>

      {/* Middle Section: Revenue Chart & Needs Attention */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Revenue Last 7 Days (Bar Chart & Lime Commitment Radial) */}
        <div className="lg:col-span-7 bg-[#111116] border border-white/5 p-6 rounded-2xl space-y-6">
          
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <h2 className="font-bold text-sm text-white">الإيرادات — آخر 7 أيام</h2>
            <span className="text-xs font-mono text-white/40">EGP</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Bar Chart Container */}
            <div className="md:col-span-8 h-48 w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueWeekly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis 
                    dataKey="day" 
                    stroke="#52525b" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#52525b" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={val => `${val}`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111411', border: '1px solid rgba(212,246,11,0.3)', borderRadius: '12px', fontSize: '11px' }}
                    itemStyle={{ color: '#d4f60b' }}
                  />
                  <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                    {revenueWeekly.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.active ? '#d4f60b' : (entry.revenue > 0 ? '#3f4438' : '#27272a')} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Circular Gauge for Overall Commitment (86%) with Neon Lime Hue */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-3 border-t md:border-t-0 md:border-r border-white/5">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border-4 border-white/5 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full border-4 border-[#d4f60b] border-t-transparent -rotate-45 shadow-[0_0_15px_rgba(212,246,11,0.4)]"></div>
                  <div className="text-center">
                    <span className="text-2xl font-black font-mono text-[#d4f60b]">86%</span>
                  </div>
                </div>
              </div>
              <p className="text-xs font-bold text-white mt-2">الالتزام العام</p>
              <span className="text-[10px] text-white/40">لكافة المشتركين</span>
            </div>

          </div>

        </div>

        {/* Right: Attention Box (Needs Attention Omar Hassan + Work Queue) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Attention Today Card */}
          <div className="bg-[#111116] border border-white/5 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#d4f60b] animate-ping"></span>
                <h3 className="text-xs font-extrabold text-white">يحتاج 3 عملاء إلى تدخلك اليوم</h3>
              </div>
              <span className="text-[10px] text-[#d4f60b] bg-[#d4f60b]/10 border border-[#d4f60b]/30 px-2 py-0.5 rounded-full font-bold">ميغاتروين AI</span>
            </div>

            {attentionClients.map((client, idx) => (
              <div key={idx} className="bg-[#0e0d14] border border-white/5 rounded-xl p-3.5 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-white">{client.name}</h4>
                    <p className="text-[11px] text-white/60 mt-0.5">{client.reason}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-[10px] text-[#d4f60b] font-semibold">{client.aiSuggestion}</span>
                  <a 
                    href={`https://wa.me/${client.phone}?text=${encodeURIComponent(`أهلاً كابتن ${client.name}، طمني عليك لاحظت غيابك بقالك كذا يوم، كل حاجة تمام؟`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] bg-[#d4f60b] hover:bg-[#c2e205] text-black px-3 py-1 rounded-lg border border-[#d4f60b]/40 font-bold transition flex items-center gap-1 shadow-sm shadow-[#d4f60b]/30"
                  >
                    واتساب ⚡
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Bottom Section: Work Queue */}
      <div className="bg-[#111116] border border-white/5 p-6 rounded-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-white/5 pb-3">
          <h2 className="font-bold text-sm text-white">قائمة العمل اليومي (Work Queue)</h2>
          <Link href="/dashboard/inbox" className="text-xs text-[#d4f60b] hover:underline font-bold">
            فتح الوارد &larr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {workQueue.map((item) => (
            <div key={item.id} className="bg-[#0d0c12] border border-white/5 p-3.5 rounded-xl flex items-center justify-between hover:border-white/10 transition">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-white">
                  {item.avatar}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{item.name}</h4>
                  <p className="text-[10px] text-white/40 mt-0.5">{item.type}</p>
                </div>
              </div>
              <Link 
                href="/dashboard/inbox"
                className="text-[10px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#d4f60b] hover:text-black border border-white/10 text-white/70 font-semibold transition"
              >
                مراجعة
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Proactive AI Agent Live Feed Section */}
      <ProactiveAgentFeed />

    </motion.div>
  );
}
