'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  MessageSquare, 
  Calendar, 
  DollarSign, 
  ChevronLeft,
  ArrowRight,
  Filter,
  Search,
  Sparkles,
  Phone,
  Flame,
  Dumbbell
} from 'lucide-react';
import { Logo } from '@/components/Logo';

interface PendingTrainee {
  id: string;
  name: string;
  initials: string;
  category: 'evaluation' | 'churn' | 'renewal' | 'payment';
  title: string;
  detail: string;
  timeAgo: string;
  actionText: string;
  accentColor: string;
  phone?: string;
}

export default function CaptainPendingActionsPage() {
  const [filter, setFilter] = useState<'all' | 'evaluation' | 'churn' | 'renewal' | 'payment'>('all');
  const [search, setSearch] = useState('');

  const [pendingList, setPendingList] = useState<PendingTrainee[]>([
    {
      id: 'p-1',
      name: 'سارة مصطفى',
      initials: 'س م',
      category: 'evaluation',
      title: 'أرسلت التقييم الأسبوعي وفيديو السكوات',
      detail: 'انخفض الوزن 1.2 كجم · أرسلت 4 صور وفيديو 120 كج سكوات',
      timeAgo: 'منذ 5 دقائق',
      actionText: 'مراجعة الفورم والقياسات',
      accentColor: 'border-fuchsia-500/40 text-fuchsia-400 bg-fuchsia-950/40'
    },
    {
      id: 'p-2',
      name: 'عمر خالد',
      initials: 'ع خ',
      category: 'churn',
      title: 'خطر انقطاع: لم يسجّل تمارينه منذ 4 أيام',
      detail: 'آخر تمرين كان تجميع الصدر العلوي. قد يكون مصاباً أو محبطاً.',
      timeAgo: 'متوقف 4 أيام',
      actionText: 'إرسال تذكير واتساب',
      accentColor: 'border-rose-500/40 text-rose-400 bg-rose-950/40',
      phone: '+201012345678'
    },
    {
      id: 'p-3',
      name: 'مريم أحمد',
      initials: 'م أ',
      category: 'renewal',
      title: 'ينتهي الاشتراك الشهري بعد 3 أيام',
      detail: 'باقة تدريب 3 شهور VIP. حققت 90% من هدف خسارة الدهون.',
      timeAgo: 'باقي 3 أيام',
      actionText: 'تجديد الاشتراك',
      accentColor: 'border-amber-500/40 text-amber-400 bg-amber-950/40'
    },
    {
      id: 'p-4',
      name: 'محمد حسن',
      initials: 'م ح',
      category: 'payment',
      title: 'مستحقات معلقة: دفع 1,000 من أصل 2,000 ج.م',
      detail: 'المتبقي 1,000 ج.م عن تجديد شهر نوفمبر.',
      timeAgo: 'متبقي 1,000 ج.م',
      actionText: 'تأكيد استلام إنستاباي',
      accentColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/40'
    },
    {
      id: 'p-5',
      name: 'طارق حسام',
      initials: 'ط ح',
      category: 'evaluation',
      title: 'سجّل رقماً قياسياً جديداً (PR)',
      detail: 'بنش برس بالبار: 100 كجم × 6 عدات (RIR 1)',
      timeAgo: 'منذ ساعة',
      actionText: 'إرسال تشجيع وبصمة صوتية',
      accentColor: 'border-purple-500/40 text-purple-400 bg-purple-950/40'
    }
  ]);

  const filtered = pendingList.filter(item => {
    const matchesFilter = filter === 'all' || item.category === filter;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.detail.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAction = (item: PendingTrainee) => {
    if (item.category === 'churn' && item.phone) {
      window.open(`https://wa.me/${item.phone.replace('+', '')}?text=${encodeURIComponent(`يا بطل إيه الأخبار؟ طمني عليك بقالك 4 أيام مش مسجل تمرينك على CoachPRB!`)}`, '_blank');
    } else if (item.category === 'evaluation') {
      window.location.href = '/dashboard/formcheck';
    } else {
      alert(`تم فتح إجراء: ${item.actionText} للاعب ${item.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-space-void text-white font-sans selection:bg-purple-600" dir="rtl">
      {/* Laser Navbar */}
      <nav className="border-b border-purple-500/20 bg-[#07050d]/85 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo size="md" />

          <div className="flex items-center gap-3">
            <Link 
              href="/dashboard"
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-bold px-3 py-2 rounded-xl bg-white/5 border border-white/10"
            >
              الرئيسية
            </Link>
            <Link 
              href="/dashboard/builder"
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-bold px-3 py-2 rounded-xl bg-white/5 border border-white/10"
            >
              البرامج
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-6 pt-10 pb-24">
        {/* Top Header Card */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
              <span className="text-[11px] hud-badge-magenta px-2.5 py-0.5 rounded-full font-bold">
                مركز مهام الكابتن (Captain Pending Hub)
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">من يحتاجك اليوم؟</h1>
            <p className="text-xs text-slate-400 mt-1">
              اللاعبون الذين ينتظرون ردك، التقييمات المعلقة، وتنبيهات المتوقفين عن التمرين
            </p>
          </div>

          {/* KPI Snapshot Pills */}
          <div className="flex items-center gap-2">
            <div className="px-3.5 py-2 rounded-xl glass-surface border border-purple-500/30 text-center">
              <span className="text-xl font-black text-purple-400 font-mono">14</span>
              <span className="text-[10px] text-slate-400 block">تمرّنوا اليوم</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl glass-surface border border-rose-500/40 text-center">
              <span className="text-xl font-black text-rose-400 font-mono">1</span>
              <span className="text-[10px] text-slate-400 block">خطر توقف</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl glass-surface border border-emerald-500/40 text-center">
              <span className="text-xl font-black text-emerald-400 font-mono">1,000</span>
              <span className="text-[10px] text-slate-400 block">ج.م معلق</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="glass-surface p-4 rounded-2xl mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Categories Pills */}
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {[
              { id: 'all', label: 'الكل' },
              { id: 'evaluation', label: '📸 تقييمات وفورم' },
              { id: 'churn', label: '⚠️ متوقفون (Churn)' },
              { id: 'renewal', label: '⏳ ينتهون قريباً' },
              { id: 'payment', label: '💳 دفعات معلقة' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id as any)}
                className={`director-pill ${filter === cat.id ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute right-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="ابحث بالاسم أو التفاصيل..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#0E081D] border border-white/10 rounded-xl pr-9 pl-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Pending Actions List (Kochivo Clean Architecture in Dark Luxury) */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-16 glass-surface rounded-2xl text-slate-400 text-xs">
              لا توجد مهام معلقة في هذا القسم. كل اللاعبين متابعون ومحدثون! 🔥
            </div>
          ) : (
            filtered.map(item => (
              <div 
                key={item.id}
                className="glass-surface glass-surface-hover p-4 sm:p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                {/* Trainee Avatar & Info */}
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm font-mono border ${item.accentColor} shrink-0`}>
                    {item.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-white truncate">{item.name}</h3>
                      <span className="text-[10px] text-slate-500 font-mono">{item.timeAgo}</span>
                    </div>
                    <p className="text-xs text-purple-300 font-semibold mt-0.5 truncate">{item.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">{item.detail}</p>
                  </div>
                </div>

                {/* Direct Action Button */}
                <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                  <button
                    onClick={() => handleAction(item)}
                    className="btn-cyber-glow px-5 py-2.5 text-xs font-bold flex items-center gap-1.5 w-full md:w-auto justify-center"
                  >
                    <span>{item.actionText}</span>
                    <ChevronLeft size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
