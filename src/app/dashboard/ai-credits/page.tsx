'use client';

import React, { useState } from 'react';
import { 
  Coins, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  Bot, 
  History, 
  ArrowUpRight 
} from 'lucide-react';
import { toast } from 'sonner';

export default function AiCreditsPage() {
  const [balance, setBalance] = useState(250);

  const packages = [
    { id: 1, credits: 100, price: '150 EGP', bonus: '' },
    { id: 2, credits: 300, price: '380 EGP', bonus: '+50 نقطة مجانية 🔥', popular: true },
    { id: 3, credits: 1000, price: '990 EGP', bonus: '+200 نقطة مجانية' }
  ];

  const handleRecharge = (pkg: any) => {
    toast.success(`تم اختيار شحن باقة ${pkg.credits} نقطة ذكاء اصطناعي عبر InstaPay`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans" dir="rtl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
          <Coins className="text-[#a78bfa]" /> رصيد الذكاء الاصطناعي (ميغاتروين AI)
        </h1>
        <p className="text-xs text-white/50 mt-1">
          يُستخدم الرصيد لتوليد الجداول التدريبية الذكية، وتحليل فيديوهات التكنيك، وصياغة الردود المخصصة للمشتركين.
        </p>
      </div>

      <div className="bg-[#111116] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/5">
          <div>
            <span className="text-xs text-white/40 block">الرصيد المتاح حالياً</span>
            <div className="flex items-baseline gap-2 mt-1">
              <h2 className="text-4xl font-black font-mono text-[#a78bfa]">{balance}</h2>
              <span className="text-xs text-white/50 font-bold">نقطة ذكية (Credits)</span>
            </div>
          </div>

          <div className="bg-[#1e1338] border border-[#7C3AED]/30 p-3.5 rounded-2xl text-xs text-white/80 max-w-sm">
            <span className="text-[#c4b5fd] font-bold block mb-1 flex items-center gap-1">
              <Sparkles size={13} /> استهلاك العمليات:
            </span>
            &bull; توليد خطة كاملة: 5 نقاط &bull; فحص فيديو التكنيك: 3 نقاط &bull; الرد الذكي: 1 نقطة.
          </div>
        </div>

        <div>
          <h3 className="font-bold text-sm text-white mb-4">باقات شحن رصيد الذكاء الإضافي</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {packages.map(pkg => (
              <div
                key={pkg.id}
                className={`bg-[#0b0a10] border rounded-3xl p-6 space-y-4 text-center transition relative ${
                  pkg.popular ? 'border-[#7C3AED] shadow-lg shadow-[#7C3AED]/20' : 'border-white/5'
                }`}
              >
                {pkg.bonus && (
                  <span className="absolute -top-3 right-1/2 translate-x-1/2 bg-[#7C3AED] text-white text-[10px] font-bold px-3 py-0.5 rounded-full">
                    {pkg.bonus}
                  </span>
                )}

                <div className="space-y-1">
                  <h4 className="text-2xl font-black font-mono text-white">{pkg.credits}</h4>
                  <span className="text-[11px] text-white/40 block">نقطة ميغاتروين</span>
                </div>

                <div className="pt-2">
                  <span className="text-lg font-bold font-mono text-[#c4b5fd]">{pkg.price}</span>
                </div>

                <button
                  onClick={() => handleRecharge(pkg)}
                  className="w-full bg-[#1e1338] hover:bg-[#7C3AED] hover:text-white text-[#c4b5fd] border border-[#7C3AED]/40 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer"
                >
                  شحن الرصيد ⚡
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
