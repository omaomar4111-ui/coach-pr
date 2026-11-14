'use client';

import { useState } from 'react';
import { 
  Check, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Building2 
} from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'باقة الانطلاق (Starter)',
      price: billingCycle === 'monthly' ? 650 : 520,
      description: 'مناسبة للمتاجر والصفحات الواعدة لأتمتة الردود والمبيعات.',
      features: [
        'ربط صفحة إنستغرام + فيسبوك',
        '2 إيجنت ذكاء اصطناعي بلهجة مصرية',
        'حتى 1,500 محادثة شهرياً',
        'تأكيد الدفع عبر إنستاباي وفودافون كاش',
        'دعم فني عبر الواتساب'
      ],
      cta: 'ابدأ تجربتك المجانية',
      popular: false
    },
    {
      name: 'باقة النمو (Growth Pro)',
      price: billingCycle === 'monthly' ? 1450 : 1150,
      description: 'الحل الشامل للبراندات ذات الحجم المتوسط مع أتمتة كاملة.',
      features: [
        'ربط شامل: واتساب + إنستغرام + ماسنجر + تليجرام',
        'أسطول 10 إيجنتس مخصصين',
        'حتى 10,000 محادثة شهرياً',
        'بريف الـ 360 الكامل لكل عميل',
        'إصدار بوالص الشحن التلقائية (Bosta)',
        'استرجاع السلات المتروكة آلياً'
      ],
      cta: 'اشترك الآن',
      popular: true
    },
    {
      name: 'باقة الشركات (Enterprise)',
      price: billingCycle === 'monthly' ? 3200 : 2550,
      description: 'لوكلات الـ PR وسلاسل المتاجر الكبرى مع دعم VIP.',
      features: [
        'ربط قنوات غير محدودة وحسابات متعددة',
        'أسطول كامل 65+ إيجنت مبيعات ودعم فني',
        'محادثات غير محدودة شهرياً',
        'تدريب مخصص للذكاء الاصطناعي على نبرة علامتك',
        'ربط مباشر مع Shopify / سلة / زد',
        'دعم هاتفي 24/7'
      ],
      cta: 'احجز باقة الشركات',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6" dir="rtl">
      <header className="max-w-7xl mx-auto flex items-center justify-between pb-8 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-emerald-500/30 flex items-center justify-center p-1.5">
            <img src="/pr-logo.png" alt="PR" className="w-full h-full object-contain" />
          </div>
          <span className="text-base font-extrabold text-white">PR Agent</span>
        </div>
        <Link 
          href="/inbox" 
          className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-4 py-2 rounded-xl transition-all"
        >
          العودة لصندوق الوارد
        </Link>
      </header>

      <main className="max-w-7xl mx-auto py-12 text-center space-y-8">
        <div className="space-y-3">
          <h1 className="text-3xl md:text-5xl font-black text-white">باقات اشتراك PR Agent</h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">اختر الباقة المناسبة لحجم أعمالك مع تسعير شفاف بالجنيه المصري وبدون تكاليف مخفية.</p>
          
          <div className="inline-flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 mt-4">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg ${billingCycle === 'monthly' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
            >
              شهرياً
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg ${billingCycle === 'yearly' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
            >
              سنوياً (خصم 20%)
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-right">
          {plans.map((p, idx) => (
            <div 
              key={idx} 
              className={`p-6 rounded-2xl border flex flex-col justify-between ${
                p.popular ? 'bg-slate-900/90 border-emerald-500' : 'bg-slate-900/40 border-slate-800'
              }`}
            >
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">{p.name}</h3>
                <p className="text-xs text-slate-400">{p.description}</p>
                <div className="py-2 border-y border-slate-800">
                  <span className="text-3xl font-black text-white">{p.price.toLocaleString()}</span>
                  <span className="text-xs text-slate-400 pr-1">ج.م / شهرياً</span>
                </div>
                <div className="space-y-2 pt-2">
                  {p.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-6">
                <Link
                  href="/inbox"
                  className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 ${
                    p.popular ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  <span>{p.cta}</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
