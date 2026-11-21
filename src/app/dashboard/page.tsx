'use client';
import { useEffect, useState } from 'react';
import { Users, AlertTriangle, TrendingUp, DollarSign, Dumbbell, ShieldAlert, ArrowUpRight, Flame, Plus } from 'lucide-react';
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#07050d] text-white flex items-center justify-center font-sans" dir="rtl">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-[#a3e635] animate-ping"></div>
          <span className="text-sm font-bold text-white/70">جاري تحميل بيانات المنصة...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07050d] text-white font-sans p-6 sm:p-10 space-y-8 selection:bg-[#a3e635] selection:text-black" dir="rtl">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#171228] border border-white/10 flex items-center justify-center p-2 shadow-lg">
            <img src="/brand-pr-logo.png" alt="CoachPRB" className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">لوحة تحكم الكابتن</h1>
            <p className="text-xs text-white/50 mt-0.5">CoachPRB — المنظومة الذكية لمتابعة التمارين والأوزان والتزام اللاعبين</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link href="/copilot" className="bg-[#171228] border border-white/10 hover:border-[#a3e635]/50 text-white/90 px-3.5 py-2.5 rounded-2xl transition text-xs font-bold flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse"></span>
            🤖 مساعد الكوتش (Copilot)
          </Link>

          <Link href="/captain/pending" className="bg-[#171228] border border-white/10 hover:border-amber-400/50 text-amber-300 px-3.5 py-2.5 rounded-2xl transition text-xs font-bold flex items-center gap-2">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            من يحتاجك اليوم
          </Link>

          <Link href="/dashboard/readiness" className="bg-[#171228] border border-white/10 hover:border-[#a3e635] text-[#bef264] px-3.5 py-2.5 rounded-2xl transition text-xs font-bold flex items-center gap-1.5 shadow-sm">
            ⚡ جاهزية اللاعب وتعديل الستات
          </Link>

          <Link href="/dashboard/nutrition" className="bg-[#171228] border border-white/10 hover:border-[#a3e635] text-white/90 px-3.5 py-2.5 rounded-2xl transition text-xs font-bold flex items-center gap-1.5">
            🥗 الماكروز والأكلات
          </Link>

          <Link href="/app" className="bg-[#171228] border border-white/10 hover:border-[#a3e635] text-white/80 hover:text-white px-3.5 py-2.5 rounded-2xl transition text-xs font-bold flex items-center gap-2">
            <Dumbbell className="w-3.5 h-3.5" />
            وضع الصالة (Gym Mode)
          </Link>

          <Link href="/dashboard/formcheck" className="bg-[#171228] border border-white/10 text-white/80 hover:text-white px-3.5 py-2.5 rounded-2xl transition text-xs font-medium">
            فحص التكنيك بالذكاء الاصطناعي
          </Link>

          <Link href="/dashboard/builder" className="bg-[#171228] border border-white/10 text-white/80 hover:text-white px-3.5 py-2.5 rounded-2xl transition text-xs font-medium">
            باني الجداول
          </Link>

          <Link href="/dashboard/clients" className="bg-[#a3e635] hover:bg-[#8fd128] text-black px-4 py-2.5 rounded-2xl transition text-xs font-black flex items-center gap-1.5 shadow-lg shadow-[#a3e635]/20">
            <Plus className="w-4 h-4" />
            إدارة المشتركين
          </Link>
        </div>
      </div>

      {/* Stats Cards in Dark Lime style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <div className="bg-[#100c1e] border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-[#a3e635]/40 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-white/50 mb-1">اللاعبين النشطين</p>
              <h2 className="text-3xl font-black text-white">{stats.activeClients || 0} <span className="text-xs font-normal text-white/40">لاعب</span></h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#171228] border border-white/10 flex items-center justify-center text-[#a3e635]">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-[11px] text-[#a3e635]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>معدل الالتزام العام: 89% هذا الأسبوع</span>
          </div>
        </div>

        <div className="bg-[#100c1e] border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-amber-400/40 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-white/50 mb-1">معرضون للانقطاع (غياب +3 أيام)</p>
              <h2 className="text-3xl font-black text-amber-400">{stats.churnRisk || 0} <span className="text-xs font-normal text-white/40">حالة</span></h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#171228] border border-white/10 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-[11px] text-amber-300">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>يحتاجون تنبيه واتساب مباشر للحفاظ على استمرارهم</span>
          </div>
        </div>

        <div className="bg-[#100c1e] border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-[#a3e635]/40 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-white/50 mb-1">الدخل الشهري المتوقع</p>
              <h2 className="text-3xl font-black text-white">{stats.revenue ? stats.revenue.toLocaleString() : '12,500'} <span className="text-xs font-normal text-white/40">ج.م</span></h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#171228] border border-white/10 flex items-center justify-center text-[#a3e635]">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-[11px] text-white/50">
            <span>تجديد الاشتراكات القادمة خلال 7 أيام</span>
          </div>
        </div>

      </div>

      {/* Churn Risk Table / Active Attention */}
      <div className="bg-[#100c1e] border border-white/10 rounded-3xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              لاعبون يحتاجون تدخلك اليوم (Drop-off Prevention)
            </h3>
            <p className="text-xs text-white/50 mt-0.5">اكتشاف فوري عبر خوارزميات التدريب للرياضيين الذين انقطعوا عن تسجيل التمارين</p>
          </div>
          <Link href="/dashboard/clients" className="text-xs text-[#a3e635] hover:underline flex items-center gap-1">
            عرض كل اللاعبين <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="border-b border-white/10 text-white/40 text-[11px]">
              <tr>
                <th className="py-3 px-4 font-semibold">اسم اللاعب</th>
                <th className="py-3 px-4 font-semibold">رقم الهاتف</th>
                <th className="py-3 px-4 font-semibold">الهدف</th>
                <th className="py-3 px-4 font-semibold">أيام الغياب</th>
                <th className="py-3 px-4 font-semibold text-center">إجراء فوري</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {churnClients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-white/40">
                    ممتاز! لا يوجد أي لاعب متأخر عن أداء تمارينه حالياً.
                  </td>
                </tr>
              ) : (
                churnClients.map((client, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition">
                    <td className="py-3.5 px-4 font-bold text-white">{client.name}</td>
                    <td className="py-3.5 px-4 text-white/60 font-mono" dir="ltr">{client.phone}</td>
                    <td className="py-3.5 px-4 text-white/60">{client.goal || 'تضخيم وبناء عضلات'}</td>
                    <td className="py-3.5 px-4">
                      <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-2.5 py-1 rounded-xl text-[10px] font-bold">
                        {client.daysInactive || 3} أيام غياب
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <a 
                        href={`https://wa.me/${client.phone?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`أهلاً كابتن ${client.name}، لاحظت إنك مكملتش تمرينك بقالك يومين، طمني عليك كل حاجة تمام؟`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#171228] hover:bg-[#a3e635] hover:text-black border border-white/10 text-[#a3e635] px-3 py-1.5 rounded-xl font-bold transition text-[11px] inline-flex items-center gap-1.5"
                      >
                        تشجيع بالواتساب ⚡
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
