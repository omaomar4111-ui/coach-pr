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
  ExternalLink
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    activeClients: 29,
    monthlyRevenue: 6600,
    commitmentRate: 86,
    awaitingReview: 14,
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
      reason: 'مفيش تمرين ولا وجبة ولا متابعة من 8 أيام، وما ردش على آخر رسالة.',
      phone: '01012345678',
      aiSuggestion: 'رسالة قصيرة وشخصية غالباً بترجع العميل ده.'
    }
  ]);

  const [workQueue, setWorkQueue] = useState<any[]>([
    { id: 'wq-1', name: 'Mahmoud Saber', avatar: 'MS', type: 'طلب انضمام', time: 'منذ ساعتين', status: 'pending' },
    { id: 'wq-2', name: 'Karim Galal', avatar: 'KG', type: 'متابعة أسبوعية', time: 'الآن', status: 'pending' },
    { id: 'wq-3', name: 'Nour Ibrahim', avatar: 'NI', type: 'مراجعة أداء', time: 'الآن', status: 'pending' },
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
            صباح الخير، كابتن Tamer 👋
          </h1>
          <p className="text-xs text-white/40 font-mono mt-0.5">
            السبت، 21 نوفمبر &bull; محاكاة لوحة التحكم الحقيقية
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/readiness"
            className="bg-[#171228] border border-[#a3e635]/30 hover:border-[#a3e635] text-[#bef264] px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
          >
            <Sparkles size={13} /> فحص جاهزية اليوم
          </Link>
        </div>
      </div>

      {/* 4 Top KPI Cards (Matching GymRate Exact Metric Layout) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Active Clients */}
        <div className="bg-[#111116] border border-white/5 p-5 rounded-2xl flex flex-col justify-between">
          <p className="text-xs font-semibold text-white/50 mb-1">العملاء النشطون</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-black font-mono text-white">{stats.activeClients}</h3>
            <span className="text-xs text-white/30 font-normal">لاعب</span>
          </div>
        </div>

        {/* Pending Review */}
        <div className="bg-[#111116] border border-white/5 p-5 rounded-2xl flex flex-col justify-between">
          <p className="text-xs font-semibold text-white/50 mb-1">بانتظار المراجعة</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-black font-mono text-white">{stats.awaitingReview}</h3>
            <span className="text-xs text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded-full">معلق</span>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-[#111116] border border-white/5 p-5 rounded-2xl flex flex-col justify-between">
          <p className="text-xs font-semibold text-white/50 mb-1">إيرادات الشهر</p>
          <div className="flex items-baseline gap-1.5">
            <h3 className="text-3xl font-black font-mono text-white">{stats.monthlyRevenue.toLocaleString()}</h3>
            <span className="text-xs text-white/40 font-mono">EGP</span>
          </div>
        </div>

        {/* Average Commitment */}
        <div className="bg-[#111116] border border-white/5 p-5 rounded-2xl flex flex-col justify-between">
          <p className="text-xs font-semibold text-white/50 mb-1">متوسط الالتزام</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-black font-mono text-[#a3e635]">{stats.commitmentRate}%</h3>
            <span className="text-[11px] text-[#bef264] font-bold">ممتاز 🔥</span>
          </div>
        </div>

      </div>

      {/* Middle Section: Revenue Chart & Needs Attention */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Revenue Last 7 Days (Exact Gymrate Bar Chart & Commitment Radial) */}
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
                    contentStyle={{ backgroundColor: '#171228', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '11px' }}
                    itemStyle={{ color: '#a3e635' }}
                  />
                  <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                    {revenueWeekly.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.revenue > 0 ? '#52525b' : '#27272a'} 
                        className={entry.active ? 'fill-[#a3e635]' : ''}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Circular Gauge for Overall Commitment (86%) */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-3 border-t md:border-t-0 md:border-r border-white/5">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border-4 border-white/5 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full border-4 border-[#a3e635] border-t-transparent -rotate-45"></div>
                  <div className="text-center">
                    <span className="text-2xl font-black font-mono text-white">86%</span>
                  </div>
                </div>
              </div>
              <p className="text-xs font-bold text-white mt-2">الالتزام</p>
              <span className="text-[10px] text-white/40">كل العملاء</span>
            </div>

          </div>

        </div>

        {/* Right: Attention Box (Needs Attention Omar Hassan + Work Queue) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Attention Today Card */}
          <div className="bg-[#111116] border border-white/5 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                <h3 className="text-xs font-extrabold text-white">يحتاج 3 عملاء إلى تدخلك اليوم</h3>
              </div>
              <span className="text-[10px] text-white/40">ميجاترون : مساعد ذكي</span>
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
                  <span className="text-[10px] text-[#a3e635] font-semibold">{client.aiSuggestion}</span>
                  <a 
                    href={`https://wa.me/${client.phone}?text=${encodeURIComponent(`أهلاً كابتن ${client.name}، طمني عليك لاحظت غيابك بقالك كذا يوم، كل حاجة تمام؟`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] bg-[#1a2312] hover:bg-[#a3e635] hover:text-black text-[#a3e635] px-2.5 py-1 rounded-lg border border-[#a3e635]/30 font-bold transition flex items-center gap-1"
                  >
                    واتساب ⚡
                  </a>
                </div>
              </div>
            ))}

            <div className="text-left">
              <Link href="/captain/pending" className="text-[11px] text-[#a3e635] hover:underline font-bold inline-flex items-center gap-1">
                عرض التقرير <ChevronRight size={12} className="rotate-180" />
              </Link>
            </div>
          </div>

          {/* Work Queue (قائمة العمل) */}
          <div className="bg-[#111116] border border-white/5 p-5 rounded-2xl space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-extrabold text-white">قائمة العمل</h3>
              <Link href="/dashboard/inbox" className="text-[11px] text-[#a3e635] hover:underline font-bold">
                افتح الوارد
              </Link>
            </div>

            <div className="space-y-2">
              {workQueue.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#0e0d14] border border-white/5 hover:border-white/10 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#171228] border border-white/10 flex items-center justify-center font-bold text-[11px] text-white/80">
                      {item.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{item.name}</p>
                      <span className="text-[10px] text-white/40 block">{item.type} &bull; {item.time}</span>
                    </div>
                  </div>

                  <Link
                    href="/dashboard/clients"
                    className="text-[10px] bg-white/5 hover:bg-white/10 text-white/80 px-3 py-1 rounded-lg border border-white/10 transition font-semibold"
                  >
                    مراجعة
                  </Link>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </motion.div>
  );
}
