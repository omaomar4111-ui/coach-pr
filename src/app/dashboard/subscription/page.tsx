'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Check, 
  Zap, 
  Sparkles, 
  CreditCard, 
  TrendingUp,
  Building,
  Star
} from 'lucide-react';
import { toast } from 'sonner';

export default function SubscriptionPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans" dir="rtl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
          <ShieldCheck className="text-[#a78bfa]" /> اشتراكي في CoachPR
        </h1>
        <p className="text-xs text-white/50 mt-1">
          إدارة باقتك الحالية في المنصة، وترقية سعة المتدربين، ورصيد الذكاء الاصطناعي لميغاتروين.
        </p>
      </div>

      {/* Current Active Plan Card */}
      <div className="bg-[#111116] border border-[#7C3AED]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#7C3AED]/15 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10"></div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
          <div>
            <span className="text-[10px] font-mono font-bold bg-[#7C3AED] text-white px-3 py-1 rounded-full uppercase tracking-wider">
              الخطة النشطة الحالية
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">باقة المدرب المحترف (CoachPR PRO)</h2>
            <p className="text-xs text-white/60 mt-1">
              تتيح لك إدارة حتى 50 لاعباً نشطاً مع كامل ميزات الـ PWA وبوت الذكاء الاصطناعي.
            </p>
          </div>

          <div className="text-left">
            <span className="text-3xl font-black font-mono text-white">990 <span className="text-xs text-white/40 font-normal">جنيه / شهر</span></span>
            <p className="text-[11px] text-emerald-400 font-bold mt-1">التجديد القادم: 15 ديسمبر 2026</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/5 relative z-10">
          <div className="bg-[#0b0a10] border border-white/5 p-4 rounded-2xl">
            <span className="text-xs text-white/40 block">اللاعبين المستخدمين</span>
            <span className="text-xl font-black font-mono text-white mt-1 block">29 / 50</span>
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#7C3AED] h-full w-[58%] rounded-full"></div>
            </div>
          </div>

          <div className="bg-[#0b0a10] border border-white/5 p-4 rounded-2xl">
            <span className="text-xs text-white/40 block">رصيد ميغاتروين AI</span>
            <span className="text-xl font-black font-mono text-[#a78bfa] mt-1 block">250 نقطة</span>
            <span className="text-[10px] text-white/30 block mt-1">تجدد تلقائياً شهرياً</span>
          </div>

          <div className="bg-[#0b0a10] border border-white/5 p-4 rounded-2xl">
            <span className="text-xs text-white/40 block">نطاق تطبيق الـ PWA</span>
            <span className="text-xs font-bold text-white mt-1 block">متاح بلا حدود (Offline)</span>
            <span className="text-[10px] text-emerald-400 block mt-1">مفعل على كافة أجهزة اللاعبين</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5 relative z-10">
          <button
            onClick={() => toast.success('تم تفعيل خصم السداد السنوي (وفر 20%)')}
            className="text-xs text-[#c4b5fd] hover:underline font-bold"
          >
            التحويل للاشتراك السنوي وتوفير شهرين مجاناً &larr;
          </button>

          <button
            onClick={() => toast.info('أنت مشترك بالفعل في أعلى باقة فردية احترافية')}
            className="bg-[#1e1338] border border-[#7C3AED]/40 hover:border-[#7C3AED] text-[#c4b5fd] px-5 py-2.5 rounded-2xl text-xs font-bold transition"
          >
            إدارة الفواتير والوسائل
          </button>
        </div>
      </div>
    </div>
  );
}
