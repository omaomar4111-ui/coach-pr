"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Check, MessageSquare, Zap, ShieldCheck } from "lucide-react";

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      id: "starter",
      name: "باقة البداية (Starter)",
      priceMonthly: 650,
      priceYearly: 6500,
      desc: "مثالية للمتاجر الناشئة والصفحات التي تستقبل حتى 1,000 محادثة شهرياً.",
      features: [
        "إيجنت مبيعات وواتساب (سارة طارق)",
        "أتمتة تعليقات إنستجرام (Comment-to-DM)",
        "لوحة CRM كانبان لإدارة الأوردرات",
        "تكامل واتساب عبر QR (Evolution API)",
        "دعم فني سريع عبر واتساب"
      ],
      popular: false,
      ctaText: "ابدأ التجربة المجانية"
    },
    {
      id: "growth",
      name: "باقة النمو السريع (Growth)",
      priceMonthly: 1450,
      priceYearly: 14500,
      desc: "للمتاجر المتوسعة التي تبحث عن أتمتة كاملة للمبيعات وتدقيق المدفوعات.",
      features: [
        "كل ميزات Starter",
        "تدقيق إيصالات إنستاباي بالرؤية البصرية (Vision AI)",
        "أسطول 10 إيجنتس مستقلين بكافة التخصصات",
        "مسارات Typebot تفاعلية لاختيار المقاسات",
        "نظام الـ Multi-LLM Router الذكي (0$ تكلفة تشغيل)",
        "أولوية في معالجة الشات والطلبات"
      ],
      popular: true,
      ctaText: "اشترك الآن وضاعف مبيعاتك"
    },
    {
      id: "enterprise",
      name: "باقة الشركات (Enterprise)",
      priceMonthly: 2900,
      priceYearly: 29000,
      desc: "حل مخصص للبراندات الكبرى والمتاجر ذات الحجم الضخم لعدد محادثات غير محدود.",
      features: [
        "كل ميزات Growth",
        "عدد غير محدود من الإيجنتس والمحادثات",
        "ربط مخصص مع ERP وأنظمة الشحن السريع",
        "مدير حساب مخصص (Account Manager)",
        "تدريب مخصص للذكاء الاصطناعي على نبرة علامتك التجارية",
        "اتفاقية مستوى الخدمة SLA 99.9%"
      ],
      popular: false,
      ctaText: "تواصل مع المبيعات"
    }
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#0e0918] text-white font-sans selection:bg-[#8052ff] selection:text-white pb-24">
      {/* Top Header */}
      <header className="border-b border-[#251f33] px-6 py-6 max-w-[1280px] mx-auto flex items-center justify-between">
        <Logo size="md" />
        <div className="flex items-center gap-6 text-[14px]">
          <Link href="/flows" className="text-[#9a9a9a] hover:text-white transition-colors">المسارات</Link>
          <Link href="/pipeline" className="text-[#9a9a9a] hover:text-white transition-colors">إدارة المبيعات</Link>
          <Link href="/inbox" className="bg-[#8052ff] text-white px-5 py-2 rounded-[24px]">دخول المنصة</Link>
        </div>
      </header>

      {/* Main Pricing Header */}
      <main className="max-w-[1280px] mx-auto px-6 pt-16 text-center">
        <span className="text-purple-400 text-sm font-semibold tracking-wider uppercase inline-block mb-3">
          ✦ باقات وأسعار شفافة
        </span>
        <h1 className="text-4xl md:text-6xl font-light text-white mb-6">
          استثمر في أسطول يوفر لك راتب 3 موظفين
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
          وفر أكثر من 85% من تكاليف خدمة العملاء وتجنب خسائر الإيصالات المزيفة مع CoachPR.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-[#1a1624] border border-[#3e3a46] mb-16">
          <button
            onClick={() => setBillingPeriod("monthly")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              billingPeriod === "monthly" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            دفع شهري
          </button>
          <button
            onClick={() => setBillingPeriod("yearly")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              billingPeriod === "yearly" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            دفع سنوي (وفر شهرين مجاناً 🎁)
          </button>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
          {plans.map(plan => {
            const price = billingPeriod === "monthly" ? plan.priceMonthly : Math.round(plan.priceYearly / 12);
            return (
              <div
                key={plan.id}
                className={`p-8 rounded-3xl bg-[#1a1624] border transition-all flex flex-col justify-between ${
                  plan.popular
                    ? "border-purple-500 shadow-2xl shadow-purple-900/30 scale-105"
                    : "border-[#3e3a46] hover:border-purple-500/50"
                }`}
              >
                <div>
                  {plan.popular && (
                    <span className="inline-block bg-gradient-to-r from-purple-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold mb-4">
                      الأكثر اختياراً من المتاجر
                    </span>
                  )}
                  <h3 className="text-2xl font-light text-white mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">{plan.desc}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">{price} ج.م</span>
                    <span className="text-gray-400 text-sm"> / شهرياً</span>
                  </div>

                  <div className="border-t border-white/10 pt-6 space-y-3 mb-8">
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-purple-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className={`w-full py-4 rounded-xl text-center text-sm font-semibold transition-all ${
                    plan.popular
                      ? "text-white shadow-lg"
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                  }`}
                  style={
                    plan.popular
                      ? { background: "linear-gradient(30deg, #fd8925, #ff0c00)" }
                      : {}
                  }
                >
                  {plan.ctaText}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-20 p-8 rounded-2xl bg-[#140f20] border border-purple-500/30 max-w-3xl mx-auto flex items-center gap-6 text-right">
          <ShieldCheck className="w-12 h-12 text-purple-400 shrink-0" />
          <div>
            <h4 className="text-lg font-semibold text-white mb-1">ضمان استرجاع الأموال بنسبة 100%</h4>
            <p className="text-sm text-gray-400">
              جرب CoachPR لمدة 14 يوماً كاملة، وإذا لم تضاعف سرعة ردودك أو تزيد مبيعاتك، سنعيد لك كامل المبلغ فوراً دون أي شروط.
            </p>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-24 py-8 text-center text-gray-500 text-sm">
        <p>© 2026 CoachPR — جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}
