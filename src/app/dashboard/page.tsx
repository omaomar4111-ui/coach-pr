'use client';
import { useEffect, useState } from 'react';
import { Users, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function CoachDashboard() {
  const [stats, setStats] = useState({ activeClients: 0, churnRisk: 0, revenue: 0 });
  const [churnClients, setChurnClients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/coach/dashboard')
      .then(res => res.json())
      .then(data => {
        if (data?.stats) {
          setStats(data.stats);
        }
        if (data?.churnClients) {
          setChurnClients(data.churnClients);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="p-8 text-white min-h-screen bg-[#07040D]" dir="rtl">جاري تحميل البيانات...</div>;

  return (
    <div className="p-8 space-y-8 bg-[#07040D] min-h-screen text-white font-sans" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">لوحة تحكم الكوتش</h1>
          <p className="text-xs text-slate-400 mt-1">CoachPRB — متابعة نشاط الأبطال ومعدلات الالتزام</p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Link href="/captain/pending" className="bg-rose-500/15 border border-rose-500/40 text-rose-300 px-3.5 py-2 rounded-lg hover:bg-rose-500/25 transition text-sm font-bold flex items-center gap-1.5 shadow-md shadow-rose-950/40">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
            من يحتاجك اليوم (Pending)
          </Link>
          <Link href="/app" className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-3.5 py-2 rounded-lg hover:bg-emerald-500/20 transition text-sm font-bold flex items-center gap-1.5">
            📱 وضع الصالة (/app)
          </Link>
          <Link href="/dashboard/formcheck" className="bg-purple-950/40 border border-purple-500/30 text-purple-300 px-3.5 py-2 rounded-lg hover:bg-purple-900/40 transition text-sm font-bold flex items-center gap-1.5">
            🎥 مختبر التكنيك
          </Link>
          <Link href="/dashboard/builder" className="bg-[#150D2A] border border-white/10 px-4 py-2 rounded-lg hover:border-white/20 transition text-sm">
            مُنشئ الجداول
          </Link>
          <Link href="/dashboard/clients" className="bg-[#7C3AED] px-4 py-2 rounded-lg hover:bg-purple-700 transition text-sm font-bold">
            + المشتركين
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111] p-6 rounded-xl border border-gray-800 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg"><Users size={24} /></div>
          <div>
            <p className="text-gray-400 text-sm">العملاء النشطين</p>
            <p className="text-2xl font-bold">{stats.activeClients}</p>
          </div>
        </div>
        <div className="bg-[#111] p-6 rounded-xl border border-gray-800 flex items-center gap-4">
          <div className="p-3 bg-red-500/10 text-red-400 rounded-lg"><AlertTriangle size={24} /></div>
          <div>
            <p className="text-gray-400 text-sm">في خطر التوقف (Churn)</p>
            <p className="text-2xl font-bold">{stats.churnRisk}</p>
          </div>
        </div>
        <div className="bg-[#111] p-6 rounded-xl border border-gray-800 flex items-center gap-4">
          <div className="p-3 bg-green-500/10 text-green-400 rounded-lg"><DollarSign size={24} /></div>
          <div>
            <p className="text-gray-400 text-sm">الإيراد الشهري</p>
            <p className="text-2xl font-bold">{stats.revenue} ج.م</p>
          </div>
        </div>
      </div>

      {/* Churn Alert List */}
      <div className="bg-[#111] rounded-xl border border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-800 flex items-center gap-2">
          <AlertTriangle className="text-red-400" size={20} />
          <h2 className="font-bold">تنبيهات: عملاء لم يسجلوا حضورهم مؤخراً</h2>
        </div>
        <div className="divide-y divide-gray-800">
          {churnClients.length === 0 ? (
            <p className="p-4 text-gray-500 text-sm">كل العملاء ملتزمين! استمر.</p>
          ) : (
            churnClients.map(client => (
              <div key={client.id} className="p-4 flex justify-between items-center hover:bg-white/5 transition">
                <div>
                  <p className="font-bold">{client.name}</p>
                  <p className="text-sm text-gray-400">آخر تسجيل: {client.lastCheckIn} ({client.daysMissed} أيام)</p>
                </div>
                <Link href={`/dashboard/clients/${client.id}`} className="text-[#7C3AED] text-sm hover:underline font-bold">
                  مراجعة الملف ←
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
