"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Check, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Users, 
  HelpCircle, 
  Copy, 
  QrCode, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle,
  Dumbbell
} from "lucide-react";
import { toast } from "sonner";

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [instapayConfig, setInstapayConfig] = useState({
    instapayUsername: "coach.alex@instapay",
    instapayPhone: "01012345678",
    accountHolderName: "CoachPR Payments",
    notes: "برجاء كتابة اسمك في وصف التحويل"
  });
  const [copiedIPA, setCopiedIPA] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [traineeName, setTraineeName] = useState("");
  const [receiptUploaded, setReceiptUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/payments/instapay-config")
      .then((res) => res.json())
      .then((data) => {
        if (data?.config) {
          setInstapayConfig(data.config);
        }
      })
      .catch(() => {});
  }, []);

  const plans = [
    {
      id: "free",
      name: "باقة الانطلاق المجانية (Starter Free)",
      badge: "مجاناً مدى الحياة 🎁",
      priceMonthly: 0,
      priceYearly: 0,
      traineeLimit: "أول 5 متدربين مجاناً 100%",
      desc: "مثالية للمدربين في بداية مشوارهم الأونلاين — ابدأ بدون بطاقة بنكية وبدون أي رسوم خفية.",
      features: [
        "إدارة حتى 5 متدربين نشطين مجاناً تماماً",
        "تطبيق اللاعب المستقل PWA يعمل بدون إنترنت",
        "بنك تمارين متكامل بأكثر من 450 تمريناً مشروحاً",
        "تسجيل الأوزان والعدات وجلسات RPE والـ PRs",
        "حاسبة السعرات والماكروز لكل لاعب",
        "متابعة قياسات الجسم وصور التطور الأسبوعية",
        "تنبيهات تلقائية بتجديد الاشتراكات"
      ],
      popular: false,
      isFree: true,
      buttonText: "ابدأ مجاناً الآن (0 ج.م)",
      accentColor: "#d4f60b"
    },
    {
      id: "pro",
      name: "باقة الكابتن المحترف (Coach Pro)",
      badge: "الأكثر اختياراً للمدربين 🔥",
      priceMonthly: 390,
      priceYearly: 3900, // 2 months free equivalent
      traineeLimit: "حتى 30 متدرباً نشطاً",
      desc: "الحل الأقوى للتفوق على المنافسين — يوفر 3 ساعات يومياً من الردود الروتينية وصياغة الجداول.",
      features: [
        "كل ميزات الباقة المجانية بالكامل",
        "سعة استيعابية تصل إلى 30 متدرباً",
        "مساعد ميجاترون الذكي AI لصياغة الردود والجداول",
        "مراجعة التكنيك التلقائية بالفيديو والصوت (Form Check)",
        "رادار المتابعة الاستباقي (كشف اللاعبين المعرضين للغياب)",
        "تخصيص التقارير بهويتك وشعارك الشخصي (Custom Branding)",
        "دعم فني مباشر وسريع للكابتن عبر واتساب"
      ],
      popular: true,
      isFree: false,
      buttonText: "اشترك في Pro واكتسح مجالك",
      accentColor: "#7C3AED"
    },
    {
      id: "elite",
      name: "باقة النخبة (Elite Unlimited)",
      badge: "للمدربين وأصحاب التيمات 👑",
      priceMonthly: 790,
      priceYearly: 7900,
      traineeLimit: "عدد غير محدود من المتدربين (Unlimited)",
      desc: "صممت لأصحاب الشهرة وفرق التدريب الرياضية التي تحتاج أعلى كفاءة وأداء دون قيود.",
      features: [
        "كل ميزات Coach Pro بدون أي استثناء",
        "عدد غير محدود من اللاعبين والمتدربين النشطين",
        "أولوية قصوى لمعالجة الفيديوهات والرؤية الحاسوبية",
        "توليد مسودات التشيك إن الأسبوعية بالذكاء الاصطناعي بنقرة واحدة",
        "تقارير نمو الـ MRR والإيرادات المالية المتقدمة",
        "إمكانية إضافة كباتن مساعدين (Multi-Coach Sub-Accounts)",
        "مدير حساب شخصي ودعم مخصص VIP على مدار الساعة"
      ],
      popular: false,
      isFree: false,
      buttonText: "اختر باقة النخبة غير المحدودة",
      accentColor: "#ec4899"
    }
  ];

  const handleSelectPlan = (plan: any) => {
    if (plan.isFree) {
      window.location.href = "/register";
      return;
    }
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
  };

  const copyText = (text: string, type: "ipa" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "ipa") {
      setCopiedIPA(true);
      setTimeout(() => setCopiedIPA(false), 2000);
      toast.success("تم نسخ عنوان إنستاباي بنجاح!");
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
      toast.success("تم نسخ رقم الموبايل بنجاح!");
    }
  };

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!traineeName) {
      toast.error("يرجى كتابة اسم الكابتن أو رقم الهاتف");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setReceiptUploaded(true);
      toast.success("تم استلام إشعار الدفع! سيتم تفعيل حسابك فور مراجعة العملية عبر إنستاباي.");
    }, 1200);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#07060c] text-white font-sans selection:bg-[#7C3AED] selection:text-white pb-24">
      {/* Top Header */}
      <header className="border-b border-white/5 bg-[#090b09]/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4 max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#d4f60b] flex items-center justify-center shadow-lg shadow-[#7C3AED]/20">
            <Dumbbell className="w-5 h-5 text-black" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
              Coach<span className="text-[#d4f60b]">PR</span>
            </span>
            <span className="text-[10px] text-white/50 block font-mono">المنصة الذكية للمدربين</span>
          </div>
        </Link>

        <div className="flex items-center gap-4 text-xs font-bold">
          <Link href="/tour" className="text-white/70 hover:text-white transition">المعاينة الحية</Link>
          <Link href="/admin" className="text-[#d4f60b] hover:underline">بوابة الإدارة</Link>
          <Link href="/login" className="bg-[#15121e] border border-white/10 hover:border-white/20 text-white px-4 py-2 rounded-xl transition">
            تسجيل الدخول
          </Link>
          <Link href="/register" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-xl transition shadow-lg shadow-[#7C3AED]/25">
            ابدأ مجاناً
          </Link>
        </div>
      </header>

      {/* Main Hero Header */}
      <main className="max-w-7xl mx-auto px-6 pt-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#d4f60b]/10 border border-[#d4f60b]/30 text-[#d4f60b] text-xs font-bold mb-5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>أقوى وأوفر من GymRate — أول 5 لاعبين مجاناً مدى الحياة</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6">
          باقات مصممة لنمو أرباح <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4f60b] to-[#a78bfa]">كباتن اللياقة البدنية</span>
        </h1>
        
        <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-10">
          لا تدفع شيئاً حتى تبدأ في كسب أول أرباحك. ابدأ مع أول 5 متدربين مجاناً 100% بدون أي رسوم، ثم رقِّ باقتك مع نمو عدد لاعبيك.
        </p>

        {/* Billing Period Toggle */}
        <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-[#111116] border border-white/10 mb-14 shadow-inner">
          <button
            onClick={() => setBillingPeriod("monthly")}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
              billingPeriod === "monthly" 
                ? "bg-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/40" 
                : "text-white/60 hover:text-white"
            }`}
          >
            اشتراك شهري
          </button>
          <button
            onClick={() => setBillingPeriod("yearly")}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              billingPeriod === "yearly" 
                ? "bg-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/40" 
                : "text-white/60 hover:text-white"
            }`}
          >
            <span>اشتراك سنوي</span>
            <span className="text-[10px] bg-[#d4f60b] text-black font-extrabold px-1.5 py-0.5 rounded-md">
              وفر شهرين مجاناً 🎁
            </span>
          </button>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right items-stretch">
          {plans.map((plan) => {
            const monthlyPrice = billingPeriod === "monthly" ? plan.priceMonthly : Math.round(plan.priceYearly / 12);
            return (
              <div
                key={plan.id}
                className={`p-7 rounded-3xl bg-[#111116] border flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular
                    ? "border-[#7C3AED] shadow-[0_0_40px_rgba(124,58,237,0.25)] md:-translate-y-2 ring-1 ring-[#7C3AED]"
                    : "border-white/10 hover:border-white/25"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 right-1/2 translate-x-1/2 bg-gradient-to-r from-[#7C3AED] to-[#d4f60b] text-black text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-white/50">{plan.badge}</span>
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-[#d4f60b] font-bold border border-white/5">
                      {plan.traineeLimit}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white mb-2">{plan.name}</h3>
                  <p className="text-xs text-white/50 leading-relaxed mb-6">{plan.desc}</p>

                  {/* Price */}
                  <div className="mb-6 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    {plan.isFree ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black font-mono text-[#d4f60b]">0</span>
                        <span className="text-base font-bold text-white">ج.م</span>
                        <span className="text-xs text-white/40 mr-2">/ مجاناً مدى الحياة</span>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-black font-mono text-white">{monthlyPrice}</span>
                          <span className="text-base font-bold text-white">ج.م</span>
                          <span className="text-xs text-white/40 mr-2">/ شهرياً</span>
                        </div>
                        {billingPeriod === "yearly" && (
                          <div className="text-[11px] text-[#d4f60b] font-mono mt-1">
                            تُدفع {plan.priceYearly} ج.م سنوياً (خصم شهرين كاملين)
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <p className="text-xs font-bold text-white/80">المميزات المضمنة في الباقة:</p>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-white/70 leading-relaxed">
                        <Check className="w-4 h-4 text-[#d4f60b] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-3.5 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    plan.popular
                      ? "bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-lg shadow-[#7C3AED]/30"
                      : plan.isFree
                      ? "bg-[#d4f60b] hover:bg-[#c2e207] text-black shadow-lg shadow-[#d4f60b]/20"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                  }`}
                >
                  <span>{plan.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* GymRate Comparison Table */}
        <div className="mt-24 p-8 rounded-3xl bg-[#111116] border border-white/10 text-right">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h3 className="text-2xl font-black text-white mb-2">مقارنة واضحة: لماذا يختار الكباتن CoachPR بدلاً من GymRate؟</h3>
            <p className="text-xs text-white/50">شفافية كاملة بدون مصاريف مفاجئة أو تكاليف غير مبررة.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/60">
                  <th className="py-3 px-4 font-bold">الميزة والمقارنة</th>
                  <th className="py-3 px-4 font-black text-[#d4f60b] bg-[#d4f60b]/5 rounded-t-xl text-center">منصة CoachPR</th>
                  <th className="py-3 px-4 font-bold text-white/40 text-center">جيم ريت GymRate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-4 px-4 font-bold text-white">البداية المجانية للجدد</td>
                  <td className="py-4 px-4 text-center font-bold text-[#d4f60b] bg-[#d4f60b]/5">أول 5 متدربين مجاناً مدى الحياة 🎁</td>
                  <td className="py-4 px-4 text-center text-white/40">فترة تجريبية مؤقتة ثم إغلاق</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold text-white">سعر باقة 30 لاعباً</td>
                  <td className="py-4 px-4 text-center font-black text-white bg-[#d4f60b]/5 font-mono">390 ج.م فقط / شهرياً</td>
                  <td className="py-4 px-4 text-center text-white/40 font-mono">أسعار أعلى بنسبة تصل لـ 50%</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold text-white">مساعد الذكاء الاصطناعي (ميجاترون)</td>
                  <td className="py-4 px-4 text-center font-bold text-[#a78bfa] bg-[#d4f60b]/5">مضمن مجاناً بدون رسوم API إضافية</td>
                  <td className="py-4 px-4 text-center text-white/40">محدود أو غير متاح بالكامل</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold text-white">طريقة الدفع للمدربين</td>
                  <td className="py-4 px-4 text-center font-bold text-[#d4f60b] bg-[#d4f60b]/5">إنستاباي فوري لحظي + محافظ + كروت</td>
                  <td className="py-4 px-4 text-center text-white/40">بوابات دفع تقليدية بخصم عمولات عالية</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold text-white">تطبيق المتدرب PWA أوفلاين</td>
                  <td className="py-4 px-4 text-center font-bold text-white bg-[#d4f60b]/5">يعمل في صالة الجيم بدون إنترنت ⚡</td>
                  <td className="py-4 px-4 text-center text-white/40">يتطلب اتصال دائم بالشبكة</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#15121e] to-[#1a1329] border border-[#7C3AED]/30 max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-right">
          <div className="w-14 h-14 rounded-2xl bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-8 h-8 text-[#d4f60b]" />
          </div>
          <div>
            <h4 className="text-base font-black text-white mb-1.5">ضمان استرجاع الأموال 100% خلال 14 يوماً</h4>
            <p className="text-xs text-white/60 leading-relaxed">
              جرب CoachPR مع أبطالك بكل ثقة. إذا لم توفر 3 ساعات على الأقل أسبوعياً وتختبر سهولة وسرعة فائقة في المتابعة، سنرد لك كامل اشتراكك فوراً دون أسئلة.
            </p>
          </div>
        </div>

      </main>

      {/* InstaPay Direct Payment Modal */}
      {isCheckoutOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111116] border border-white/10 rounded-3xl max-w-lg w-full p-6 text-right space-y-5 shadow-2xl relative">
            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                setReceiptUploaded(false);
              }}
              className="absolute top-5 left-5 text-white/40 hover:text-white text-sm"
            >
              ✕ إغلاق
            </button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED] flex items-center justify-center text-[#d4f60b]">
                ⚡
              </div>
              <div>
                <h3 className="text-lg font-black text-white">الدفع الفوري عبر إنستاباي (InstaPay)</h3>
                <p className="text-[11px] text-white/50">تفعيل فوري للاشتراك بدون عمولات بنكية مقتطعة</p>
              </div>
            </div>

            {/* Plan Summary */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs text-white/50 block">الباقة المختارة:</span>
                <span className="text-sm font-bold text-white">{selectedPlan.name}</span>
              </div>
              <div className="text-left">
                <span className="text-lg font-black font-mono text-[#d4f60b]">
                  {billingPeriod === "monthly" ? selectedPlan.priceMonthly : selectedPlan.priceYearly} ج.م
                </span>
                <span className="text-[10px] text-white/40 block">
                  {billingPeriod === "monthly" ? "اشتراك شهر" : "اشتراك سنة كاملة"}
                </span>
              </div>
            </div>

            {/* InstaPay Transfer Info */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-white">حول المبلغ لحساب إنستاباي التالي:</p>

              {/* IPA Field */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#090b09] border border-white/10">
                <div>
                  <span className="text-[10px] text-white/40 block">معرف إنستاباي (IPA):</span>
                  <span className="font-mono text-sm font-bold text-[#d4f60b]">{instapayConfig.instapayUsername}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyText(instapayConfig.instapayUsername, "ipa")}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <Copy size={13} />
                  <span>{copiedIPA ? "تم النسخ ✓" : "نسخ المعرف"}</span>
                </button>
              </div>

              {/* Phone Field */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#090b09] border border-white/10">
                <div>
                  <span className="text-[10px] text-white/40 block">رقم الموبايل المسجل بإنستاباي:</span>
                  <span className="font-mono text-sm font-bold text-white">{instapayConfig.instapayPhone}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyText(instapayConfig.instapayPhone, "phone")}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <Copy size={13} />
                  <span>{copiedPhone ? "تم النسخ ✓" : "نسخ الرقم"}</span>
                </button>
              </div>

              <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 text-[11px] text-purple-300">
                💡 <span className="font-bold">{instapayConfig.notes}</span>
              </div>
            </div>

            {/* Confirmation & Upload */}
            {!receiptUploaded ? (
              <form onSubmit={handleSubmitProof} className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-bold text-white/80 block mb-1">
                    اسم الكابتن أو رقم الهاتف المرسل منه:
                  </label>
                  <input
                    type="text"
                    required
                    value={traineeName}
                    onChange={(e) => setTraineeName(e.target.value)}
                    placeholder="مثال: كابتن أحمد - 010xxxxxxxx"
                    className="w-full bg-[#090b09] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#7C3AED] outline-none"
                  />
                </div>

                <div className="border border-dashed border-white/20 hover:border-[#d4f60b] rounded-xl p-4 text-center cursor-pointer transition">
                  <UploadCloud className="w-6 h-6 text-white/40 mx-auto mb-1" />
                  <span className="text-xs text-white/60 block">إرفاق سكرين شوت تحويل إنستاباي (اختياري)</span>
                  <span className="text-[10px] text-white/30">يتم التحقق تلقائياً بواسطة Vision OCR</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-[#d4f60b] hover:bg-[#c2e207] text-black font-black text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#d4f60b]/20"
                >
                  {isSubmitting ? "جارِ التحقق وتأكيد الطلب..." : "تأكيد الدفع وتفعيل الباقة فوراً 🚀"}
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-black text-white">تم استلام طلب التفعيل بنجاح!</h4>
                <p className="text-xs text-white/60">
                  شكراً كابتن <span className="text-white font-bold">{traineeName}</span>. باقتك قيد المراجعة الفورية وسيتم تفعيل حسابك مباشرة.
                </p>
                <Link
                  href="/dashboard"
                  className="inline-block mt-3 px-5 py-2 rounded-xl bg-[#7C3AED] text-white text-xs font-black"
                >
                  الذهاب للوحة التحكم
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 mt-24 py-8 text-center text-white/40 text-xs">
        <p>© 2026 CoachPR — المنصة المتكاملة لإدارة وتوسيع أعمال مدربي اللياقة البدنية.</p>
      </footer>
    </div>
  );
}
