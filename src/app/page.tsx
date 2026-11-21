'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Play, 
  ArrowLeft, 
  ShieldCheck, 
  Users, 
  Dumbbell, 
  Utensils, 
  Activity, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Plus, 
  ChevronDown, 
  Send,
  Smartphone,
  CreditCard,
  MessageSquare,
  Check
} from 'lucide-react';
import { Logo } from '@/components/Logo';

export default function GymRateStyleLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');

  const faqs = [
    {
      q: 'عملائي هيدفعوا حاجة لـ CoachPR؟',
      a: 'لأ خالص. التطبيق مجاني تماماً لعملاءك عبر الـ PWA ويعمل أوفلاين. إنت بتدفع اشتراك المنصة، وعملاءك بيدفعولك إنت أتعاب التدريب بالكامل زي ما متفقين.'
    },
    {
      q: 'محتاج خبرة في التكنولوجيا؟',
      a: 'نهائياً. لو بتعرف تستخدم واتساب هتعرف تستخدم CoachPR بكل بساطة وسلاسة. كل خطوة مشروحة خطوة بخطوة مع قوالب جاهزة ومساعد ذكي يوجهك.'
    },
    {
      q: 'عندي عملاء دلوقتي على PDF وشيتات إكسيل وواتساب. أنقلهم إزاي؟',
      a: 'ابعتلهم كود الدعوة بتاعك، أو استوردهم من مركز الاستيراد بضغطة زر واحدة. تقدر تلصق يوم كامل من شيت إكسيل (تمرين في كل سطر) في منشئ التمارين فوراً.'
    },
    {
      q: 'بيشتغل على الموبايل ولا اللابتوب؟',
      a: 'الاثنين معاً. لوحة التحكم تعمل بكفاءة فائقة على اللابتوب والكمبيوتر، وتطبيق المدرب واللاعب متاحان على الموبايل كـ PWA يعمل حتى بدون إنترنت في صالة الجيم.'
    },
    {
      q: 'إيه الفرق بين الباقات؟',
      a: 'باقة Starter Free تمنحك إدارة أول 5 متدربين مجاناً مدى الحياة (0 ج.م). باقة Coach Pro بسعر 390 ج.م فقط تتيح حتى 30 لاعباً مع مساعد ميجاترون ورادار الغياب، وباقة Elite تتيح عدداً غير محدود من اللاعبين.'
    },
    {
      q: 'بدفع إزاي؟',
      a: 'عبر إنستاباي InstaPay، أو محافظ الموبايل كاش (فودافون كاش، أورنج، اتصالات)، أو فوري والكروت البنكية، وبدون أي عقود احتكارية.'
    }
  ];

  const plans = [
    {
      name: 'Starter Free',
      price: 0,
      seats: 'أول 5 متدربين مجاناً 100%',
      credits: 'أساسيات المتابعة وتطبيق PWA',
      features: ['أول 5 متدربين مجاناً مدى الحياة', 'بنك تمارين بـ 450+ تمريناً', 'تطبيق المتدرب PWA أوفلاين', 'متابعة الأوزان والقياسات والـ PRs'],
      popular: false
    },
    {
      name: 'Coach Pro',
      price: billingPeriod === 'yearly' ? 325 : 390,
      seats: 'حتى 30 متدرباً نشطاً',
      credits: 'مساعد ميجاترون AI كامل',
      features: ['كل مميزات Starter Free', 'مساعد ميغاتروين AI للردود الذكية', 'مختبر التكنيك (Form Check بالفيديو)', 'رادار المتابعة الاستباقي للغياب', 'تصدير PDF بهويتك وشعارك'],
      popular: true
    },
    {
      name: 'Elite Unlimited',
      price: billingPeriod === 'yearly' ? 658 : 790,
      seats: 'عدد غير محدود من اللاعبين',
      credits: 'أولوية قصوى ودعم VIP',
      features: ['كل مميزات Coach Pro', 'عدد متدربين غير محدود (Unlimited)', 'مسودات التشيك إن التلقائية', 'تحليلات الإيرادات ونمو الـ MRR', 'إضافة حسابات لكباتن مساعدين'],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#07050d] text-white font-sans selection:bg-[#7C3AED] selection:text-white" dir="rtl">
      
      {/* Top Laser Navbar */}
      <header className="border-b border-white/5 bg-[#07050d]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#1e1338] border border-[#7C3AED]/40 flex items-center justify-center p-1.5 shadow-sm shadow-[#7C3AED]/30">
                <img src="/brand-pr-logo.png" alt="PR" className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(124,58,237,0.7)]" />
              </div>
              <span className="text-xl font-black tracking-tighter text-white">Coach<span className="text-[#a78bfa]">PR</span></span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-white/60">
              <a href="#why" className="hover:text-white transition">اللي بيفرّقنا</a>
              <a href="#features" className="hover:text-white transition">المميزات (+60)</a>
              <a href="#how" className="hover:text-white transition">كيف يعمل</a>
              <a href="#pricing" className="hover:text-white transition">الأسعار</a>
              <a href="#faq" className="hover:text-white transition">الأسئلة الشائعة</a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-bold text-white/70 hover:text-white px-3 py-2 transition"
            >
              دخول المدربين
            </Link>

            <Link
              href="/dashboard"
              className="bg-[#1e1338] hover:bg-[#281b4d] text-[#c4b5fd] border border-[#7C3AED]/40 px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <Play size={12} className="fill-[#c4b5fd]" /> جرّب بنفسك
            </Link>

            <Link
              href="/captain/pending"
              className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-5 py-2 rounded-2xl text-xs font-extrabold transition shadow-lg shadow-[#7C3AED]/30"
            >
              ابدأ دلوقتي
            </Link>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden border-b border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#7C3AED]/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Right: Text Pitch */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 bg-[#1e1338] border border-[#7C3AED]/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#c4b5fd]">
                <Sparkles size={13} className="text-[#a78bfa]" /> للمدربين الأونلاين وكمال الأجسام في مصر والوطن العربي
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight">
                The <span className="text-[#a78bfa] underline decoration-[#7C3AED]/50">Next Level</span> of Online Coaching
              </h1>

              <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl">
                ابعت خطة التمرين والدايت لعميلك <b className="text-white">في تطبيق بدل الـ PDF</b>، وتابعه كل أسبوع <b className="text-white">من مكان واحد بدل تشتت الواتساب</b>.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/captain/pending"
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8 py-4 rounded-2xl text-sm font-extrabold transition shadow-xl shadow-[#7C3AED]/30 flex items-center gap-2"
                >
                  ابدأ دلوقتي مجاناً &larr;
                </Link>

                <Link
                  href="/dashboard"
                  className="bg-[#111116] hover:bg-[#181524] text-white border border-white/10 px-6 py-4 rounded-2xl text-sm font-bold transition flex items-center gap-2"
                >
                  <Play size={14} className="fill-white" /> جرّب الحساب التجريبي الحي
                </Link>
              </div>

              {/* 3 Metrics Badge */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5 max-w-lg">
                <div>
                  <h4 className="text-2xl sm:text-3xl font-black font-mono text-white">+60</h4>
                  <p className="text-xs text-white/40 mt-0.5">ميزة في مكان واحد</p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-black font-mono text-white">+800</h4>
                  <p className="text-xs text-white/40 mt-0.5">تمرين بالفيديو والتكنيك</p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-black font-mono text-[#a78bfa]">0</h4>
                  <p className="text-xs text-white/40 mt-0.5">جنيه يدفعها عميلك</p>
                </div>
              </div>

            </div>

            {/* Left: Dual Preview (Dashboard + Athlete PWA) */}
            <div className="lg:col-span-5 relative">
              
              {/* Dashboard Frame */}
              <div className="bg-[#111116] border border-white/10 rounded-3xl p-3 shadow-2xl overflow-hidden group hover:border-[#7C3AED]/40 transition">
                <div className="bg-[#0b0a10] rounded-2xl p-4 space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span> لوحة تحكم CoachPR الحقيقية
                    </span>
                    <span className="text-[10px] font-mono text-[#c4b5fd] bg-[#7C3AED]/20 px-2 py-0.5 rounded-full">PRO</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[#171228] p-3 rounded-xl border border-white/5">
                      <span className="text-[10px] text-white/40 block">العملاء النشطون</span>
                      <span className="text-lg font-black font-mono text-white">29 لاعب</span>
                    </div>
                    <div className="bg-[#171228] p-3 rounded-xl border border-white/5">
                      <span className="text-[10px] text-white/40 block">الالتزام اليومي</span>
                      <span className="text-lg font-black font-mono text-[#a78bfa]">86%</span>
                    </div>
                  </div>

                  <div className="bg-[#171228] p-3 rounded-xl border border-white/5 text-xs text-white/70 space-y-1">
                    <span className="text-[#a78bfa] font-bold block flex items-center gap-1">
                      <Sparkles size={12} /> تنبيه ميغاتروين الصباحي:
                    </span>
                    يحتاج عمر حسن إلى مراجعة تمرين الهاك سكوات وحماية أوتار الركبة اليوم.
                  </div>
                </div>
              </div>

              {/* Floating Mobile Athlete Frame */}
              <div className="absolute -bottom-8 -left-6 w-48 bg-[#0b0a10] border-2 border-[#7C3AED]/50 rounded-3xl p-3 shadow-2xl hidden sm:block animate-bounce-slow">
                <div className="bg-[#181524] rounded-2xl p-3 text-center space-y-2">
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full block">
                    تمرينة النهارده ⚡
                  </span>
                  <p className="text-xs font-bold text-white">سحب وظهر (Pull A)</p>
                  <span className="text-[10px] text-white/40 font-mono block">شغال من غير نت في الجيم</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Section 2: What makes CoachPR different (#why) */}
      <section id="why" className="py-24 border-b border-white/5 bg-[#090712]/50">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              اللي بيفرّق <span className="text-[#a78bfa]">CoachPR</span>
            </h2>
            <p className="text-sm text-white/50">
              الخطة في تطبيق والشات أساسيات في كل مكان. دي الميزات الحقيقية اللي هتفرق في يومك وفي نتائج عملاءك.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#111116] border border-white/5 hover:border-[#7C3AED]/40 rounded-3xl p-6 space-y-4 transition shadow-xl group">
              <div className="w-12 h-12 rounded-2xl bg-[#1e1338] border border-[#7C3AED]/30 flex items-center justify-center text-[#c4b5fd]">
                <Sparkles size={22} />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#c4b5fd] transition flex items-center justify-between">
                <span>ميغاتروين، مساعدك الذكي</span>
                <span className="text-[10px] font-mono bg-[#7C3AED]/20 text-[#c4b5fd] px-2 py-0.5 rounded-full">AI</span>
              </h3>
              <p className="text-xs text-white/60 leading-relaxed">
                بيتابع عملاءك كل صباح ويقولك مين محتاجك ومحتاج إيه، ويراجع خطط كل عملاءك مرة واحدة وأنت صاحب القرار.
              </p>
            </div>

            <div className="bg-[#111116] border border-white/5 hover:border-[#7C3AED]/40 rounded-3xl p-6 space-y-4 transition shadow-xl group">
              <div className="w-12 h-12 rounded-2xl bg-[#1e1338] border border-[#7C3AED]/30 flex items-center justify-center text-[#c4b5fd]">
                <Activity size={22} />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#c4b5fd] transition flex items-center justify-between">
                <span>يوم 10/10 وسلسلة الالتزام</span>
                <span className="text-[10px] font-bold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full">جديد 🔥</span>
              </h3>
              <p className="text-xs text-white/60 leading-relaxed">
                كل عميل بياخد درجة من 10 كل يوم بناءً على نومه ومياهه وتمرينه، وسلسلة أيام بتشجعه يكمل ويستمر معاك شهور.
              </p>
            </div>

            <div className="bg-[#111116] border border-white/5 hover:border-[#7C3AED]/40 rounded-3xl p-6 space-y-4 transition shadow-xl group">
              <div className="w-12 h-12 rounded-2xl bg-[#1e1338] border border-[#7C3AED]/30 flex items-center justify-center text-[#c4b5fd]">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#c4b5fd] transition">
                <span>خطة آمنة وتحذير الإصابات</span>
              </h3>
              <p className="text-xs text-white/60 leading-relaxed">
                لو تمرين ممكن يجهد ركبة العميل أو أسفل ظهره، أو صنف أكل عنده حساسية منه، بيظهرلك تحذير أحمر قبل ما تبعت.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Section 3: 60+ Features Grid (#features) */}
      <section id="features" className="py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-3xl sm:text-4xl font-black font-mono text-[#a78bfa] block">+60 ميزة</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">في مكان واحد، متفصلة لمدربين كمال الأجسام</h2>
            <p className="text-sm text-white/50">
              كل الأدوات اللي تحتاجها في تدريب الأونلاين بدون الحاجة لشراء أو ربط 5 برامج خارجية مختلفة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Group 1 */}
            <div className="bg-[#111116] border border-white/5 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                <Dumbbell className="text-[#a78bfa]" size={20} />
                <h3 className="font-bold text-white text-base">خطط وبيلدر التمرين</h3>
              </div>
              <ul className="space-y-2 text-xs text-white/70">
                <li className="flex items-center gap-2"><Check size={14} className="text-[#a78bfa]" /> أكثر من 800 تمرين بالفيديو والتكنيك</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#a78bfa]" /> نسخ ولصق يوم كامل من شيت إكسيل بضغطة</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#a78bfa]" /> التحكم في RIR و RPE والراحة والتمبو</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#a78bfa]" /> تحذير فوري إذا تعارض التمرين مع إصابة العميل</li>
              </ul>
            </div>

            {/* Group 2 */}
            <div className="bg-[#111116] border border-white/5 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                <Utensils className="text-[#a78bfa]" size={20} />
                <h3 className="font-bold text-white text-base">خطط التغذية والماكروز</h3>
              </div>
              <ul className="space-y-2 text-xs text-white/70">
                <li className="flex items-center gap-2"><Check size={14} className="text-[#a78bfa]" /> كتالوج الأطعمة المصرية والعربية بالماكروز</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#a78bfa]" /> الماكروز بتتحسب فوراً وأنت بتكتب الجرامات</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#a78bfa]" /> بدائل الوجبات وتحذير حساسية اللاكتوز والجلوتين</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#a78bfa]" /> نظام الكارب سايكلينج (Carb Cycling) التلقائي</li>
              </ul>
            </div>

            {/* Group 3 */}
            <div className="bg-[#111116] border border-white/5 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                <Smartphone className="text-[#a78bfa]" size={20} />
                <h3 className="font-bold text-white text-base">تطبيق العميل المجاني (PWA)</h3>
              </div>
              <ul className="space-y-2 text-xs text-white/70">
                <li className="flex items-center gap-2"><Check size={14} className="text-[#a78bfa]" /> مجاني تماماً على iOS و Android</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#a78bfa]" /> شغال 100% من غير نت داخل صالة الجيم</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#a78bfa]" /> تايمر راحة تلقائي مع اهتزاز بالموبايل</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#a78bfa]" /> تسجيل أرقام الـ PR والاحتفال التفاعلي بها</li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* Section 4: Pricing Table (#pricing) */}
      <section id="pricing" className="py-24 border-b border-white/5 bg-[#090712]/50">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-white">خطط وأسعار شفافة وبسيطة</h2>
            <p className="text-sm text-white/50">
              كل الباقات تحتوي على الأساسيات كاملة. الفارق الوحيد هو عدد عملائك ورصيد الـ AI المتاح.
            </p>

            {/* Toggle Billing Period */}
            <div className="pt-4 flex justify-center">
              <div className="bg-[#111116] border border-white/10 p-1.5 rounded-2xl flex items-center gap-1">
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
                    billingPeriod === 'monthly' ? 'bg-[#7C3AED] text-white shadow-sm' : 'text-white/50 hover:text-white'
                  }`}
                >
                  شهري
                </button>
                <button
                  onClick={() => setBillingPeriod('yearly')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                    billingPeriod === 'yearly' ? 'bg-[#7C3AED] text-white shadow-sm' : 'text-white/50 hover:text-white'
                  }`}
                >
                  <span>سنوي</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-mono">وفر 20%</span>
                </button>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p, idx) => (
              <div
                key={idx}
                className={`bg-[#111116] rounded-3xl p-6 space-y-5 transition flex flex-col justify-between relative shadow-xl ${
                  p.popular ? 'border-2 border-[#7C3AED] shadow-[#7C3AED]/20 scale-105 z-10' : 'border border-white/5'
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3.5 right-1/2 translate-x-1/2 bg-[#7C3AED] text-white text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                    الأكثر اختياراً للمدربين
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-white">{p.name}</h3>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-3xl font-black font-mono text-white">{p.price}</span>
                      <span className="text-xs text-white/40">جنيه / شهر</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-white/50 pb-3 border-b border-white/5 font-mono">
                    <p className="flex items-center gap-1.5 text-white font-bold"><Users size={13} className="text-[#a78bfa]" /> {p.seats}</p>
                    <p className="flex items-center gap-1.5"><Sparkles size={13} className="text-[#a78bfa]" /> {p.credits}</p>
                  </div>

                  <div className="space-y-2">
                    {p.features.map((f, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-white/70">
                        <Check size={13} className="text-[#a78bfa] shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/captain/pending"
                  className={`w-full py-3 rounded-2xl text-xs font-black transition text-center block ${
                    p.popular 
                      ? 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-lg shadow-[#7C3AED]/30' 
                      : 'bg-[#1e1338] hover:bg-[#7C3AED] text-[#c4b5fd] hover:text-white border border-[#7C3AED]/30'
                  }`}
                >
                  ابدأ بـ {p.name}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <span className="text-xs text-white/40 flex items-center justify-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-400" /> مش مناسبك؟ فلوسك ترجعلك كاملة بدون أسئلة خلال أول 7 أيام من اشتراكك.
            </span>
          </div>

        </div>
      </section>

      {/* Section 5: FAQ Accordion (#faq) */}
      <section id="faq" className="py-24 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black text-white">الأسئلة الشائعة</h2>
            <p className="text-xs text-white/50">كل ما تحتاج لمعرفته قبل بدء استخدام CoachPR.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#111116] border border-white/5 rounded-2xl overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-right font-bold text-sm text-white flex justify-between items-center cursor-pointer hover:text-[#c4b5fd] transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={16} className={`transition-transform duration-200 text-white/40 ${isOpen ? 'rotate-180 text-[#a78bfa]' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-white/60 leading-relaxed border-t border-white/5 pt-3 animate-in fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#05040a]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">CoachPR</span> &bull; منصة التدريب الأونلاين للمدربين المحترفين في مصر
          </div>
          <p>© 2026 CoachPR. صُنع بعناية للمدرب العربي.</p>
        </div>
      </footer>

    </div>
  );
}
