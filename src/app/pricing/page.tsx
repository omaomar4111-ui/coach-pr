"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ArrowLeft, ShieldCheck, Zap, Dumbbell, Star, MessageSquare } from "lucide-react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly">("monthly");

  const plans = [
    {
      name: "باقة الانطلاق (Starter Athlete)",
      price: billingCycle === "monthly" ? "650" : "1,650",
      cycleLabel: billingCycle === "monthly" ? "/ شهرياً" : "/ 3 شهور",
      description: "برنامج تدريبي وتغذوي مخصص بالكامل مع متابعة أسبوعية مباشرة من الكابتن.",
      features: [
        "جدول تمارين مخصص حسب هدفك وأيام تفرغك",
        "نظام غذائي محسوب السعرات والماكروز بدقة",
        "متابعة أسبوعية (Check-in) وتعديل الخطة",
        "فحص تكنيك التمارين (Form Check) بالفيديو",
        "تطبيق PWA مثبت على هاتفك لتسجيل أوزانك",
      ],
      cta: "احجز مكانك في الباقة",
      popular: false,
      href: "/quiz?plan=starter",
    },
    {
      name: "باقة النخبة (VIP 1-on-1 Coaching)",
      price: billingCycle === "monthly" ? "1,200" : "2,990",
      cycleLabel: billingCycle === "monthly" ? "/ شهرياً" : "/ 3 شهور",
      description: "المتابعة الاحترافية المتكاملة مع شات مباشر واستجابة سريعة وتأهيل الإصابات.",
      features: [
        "كل مزايا باقة Starter بالكامل",
        "دعم وشات مباشر يومي مع الكابتن للرد على استفساراتك",
        "نظام حماية وتأهيل آلام أسفل الظهر والمفاصل",
        "مكالمة استشارية نصف شهرية لتقييم التطور",
        "تحليل صور الوجبات بالذكاء الاصطناعي (Food Vision)",
        "أولوية المتابعة وتعديل الجدول في أي وقت",
      ],
      cta: "ابدأ تدريب الـ VIP الآن",
      popular: true,
      href: "/quiz?plan=vip",
    },
    {
      name: "باقة البطولات وتجهيز الستيج (Contest Prep)",
      price: billingCycle === "monthly" ? "2,500" : "6,200",
      cycleLabel: billingCycle === "monthly" ? "/ شهرياً" : "/ 3 شهور",
      description: "بروتوكول احترافي للاعبي بطولات كمال الأجسام والفيتنس والـ Powerlifting.",
      features: [
        "خطة Peak Week مفصلة ساعة بساعة قبل البطولة",
        "إدارة المياه والصوديوم والكارب ديلود ولود",
        "تعديل يومي للأحمال والكارديو ونسب الدهون",
        "توجيه وضعيات البوزينج (Posing Coaching) أسبوعياً",
        "خط اتصال مباشر مفتوح على مدار 24 ساعة",
      ],
      cta: "تقديم طلب تجهيز بطولة",
      popular: false,
      href: "/quiz?plan=contest",
    },
  ];

  return (
    <div className="min-h-screen bg-[#07040D] text-white flex flex-col justify-between font-sans selection:bg-purple-900 selection:text-white" dir="rtl">
      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between border-b border-white/[0.06] bg-[#0A0514]/80 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#9333EA] flex items-center justify-center shadow-lg shadow-purple-900/30">
            <Dumbbell className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-heading font-black text-lg tracking-wider text-white">
              COACH<span className="text-[#A78BFA]">PRB</span>
            </span>
            <span className="text-[10px] text-purple-300 block -mt-1 font-medium">باقات التدريب والمتابعة الأونلاين</span>
          </div>
        </Link>
        <Link
          href="/quiz"
          className="text-xs text-purple-400 hover:text-white transition px-3.5 py-1.5 rounded-lg border border-purple-500/30 hover:border-purple-500/60 flex items-center gap-1.5"
        >
          <span>استبيان التقييم</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* Title & Billing Toggle */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800/40 text-purple-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            استثمارك في صحتك وقوتك وجسمك المثالي
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            اختر الباقة الأنسب لمرحلتك التدريبية
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            جميع الباقات تشمل برامج علمية مخصصة، متابعة دورية مستمرة، وحماية كاملة للمفاصل بدون أي نسخ ولصق.
          </p>

          {/* Switcher */}
          <div className="inline-flex items-center p-1 bg-[#150D2A] border border-white/10 rounded-xl text-xs">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-lg font-bold transition ${
                billingCycle === "monthly"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-900/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              اشتراك شهري
            </button>
            <button
              onClick={() => setBillingCycle("quarterly")}
              className={`px-4 py-2 rounded-lg font-bold transition flex items-center gap-1.5 ${
                billingCycle === "quarterly"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-900/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>3 شهور (خصم 20%)</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full font-black">وفر</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? "bg-[#110A24] border-2 border-purple-500 shadow-2xl shadow-purple-950/60 scale-[1.02]"
                  : "bg-[#0E081D] border border-white/[0.08] hover:border-white/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[11px] font-black px-3.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                  الأكثر طلباً واختياراً
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed min-h-[36px]">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-xs text-slate-400 font-bold">جنيه مصري</span>
                  <span className="text-xs text-purple-300 font-medium">{plan.cycleLabel}</span>
                </div>

                <div className="w-full h-px bg-white/[0.06]" />

                <ul className="space-y-3 text-xs text-slate-300">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href={plan.href}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg ${
                    plan.popular
                      ? "bg-gradient-to-r from-[#7C3AED] to-[#9333EA] hover:from-[#6D28D9] hover:to-[#7E22CE] text-white shadow-purple-900/40"
                      : "bg-[#150D2A] hover:bg-[#1E133D] text-white border border-white/10 hover:border-white/20"
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials / Social Proof Section */}
        <div className="space-y-6 pt-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-black text-white">آراء أبطال ورياضيي CoachPRB</h2>
            <p className="text-xs text-slate-400">تجارب حقيقية لمتدربين تخلصوا من عشوائية الجداول ووصلوا لأفضل فورمة في حياتهم.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                name: "كريم م. (مهندس برمجيات)",
                loss: "خسارة 12 كجم دهون وزيادة عضلات صافية",
                quote: "أكبر ميزة في CoachPRB هي الالتزام. الكابتن كان بيعدلي أوزان التمرين وبيفحص فيديوهات التكنيك أول بأول، وعرفت أتمرن بدون أي وجع في الركبة.",
                rating: 5,
              },
              {
                name: "عمر ف. (لاعب فيتنس)",
                loss: "تنشيف وخصر -8 سم في 90 يوم",
                quote: "كنت دايماً بقع في شيتات الإكسيل والواتساب بيبقى تايه، تطبيق PWA على الآيفون مخليني أسجل وجباتي وأوزاني في الجيم بضغطة واحدة.",
                rating: 5,
              },
              {
                name: "د. طارق ح. (طبيب أسنان)",
                loss: "تحسن آلام أسفل الظهر وزيادة أوزان السكوات",
                quote: "نظام استبعاد التمارين اللي بتضغط على الفقرات خلاني أرجع للحديد بأمان بعد انقطاع سنتين بسبب الانزلاق الغضروفي. كوتشينج احترافي ومحترم جداً.",
                rating: 5,
              },
            ].map((t, idx) => (
              <div key={idx} className="bg-[#0E081D] border border-white/[0.06] p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-purple-400 font-semibold bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-800/40">
                    مشترك معتمد
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="pt-2 border-t border-white/[0.04]">
                  <p className="text-xs font-bold text-white">{t.name}</p>
                  <p className="text-[10px] text-emerald-400 font-medium">{t.loss}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instant WhatsApp Support Bar (Chatwoot & Evolution API Ready) */}
        <div className="bg-[#110A24] border border-purple-900/40 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <MessageSquare className="w-4 h-4 text-purple-400" />
              محتار بين الباقات أو عندك استفسار خاص بإصابتك؟
            </h3>
            <p className="text-xs text-slate-400">تحدث مع فريق الاستشارات مباشرة على الواتساب وسنساعدك في اختيار الخطة الأنسب.</p>
          </div>
          <a
            href="https://wa.me/201012345678?text=%D8%A3%D9%87%D9%84%D8%A7%D9%8B%20CoachPRB%D8%8C%20%D9%85%D8%AD%D8%AA%D8%A7%D8%AC%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%A8%D8%AE%D8%B5%D9%88%D8%B5%20%D8%A7%D9%84%D8%A8%D8%A7%D9%82%D8%A9%20%D8%A7%D9%84%D9%85%D9%86%D8%A7%D8%B3%D8%A8%D8%A9%20%D9%84%D9%8A%D8%A7"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs transition shadow-md shadow-emerald-950 flex items-center gap-2 shrink-0"
          >
            <span>استشارة سريعة عبر الواتساب</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-white/[0.04] text-center text-[11px] text-slate-500">
        CoachPRB — سجّل رقمك. غيّر جسمك. © 2026 جميع الحقوق محفوظة.
      </footer>
    </div>
  );
}
