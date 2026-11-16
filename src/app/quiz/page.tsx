"use client";

import React, { useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { 
  Dumbbell, 
  Target, 
  Activity, 
  Calendar, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Flame, 
  Scale, 
  HeartPulse, 
  Clock 
} from "lucide-react";

interface QuizState {
  // Step 1: Goal
  primaryGoal: "hypertrophy" | "fat_loss" | "strength" | "rehab";
  targetTimeframe: "3_months" | "6_months" | "competition";
  
  // Step 2: Body & Level
  currentWeightKg: string;
  heightCm: string;
  trainingExperience: "beginner" | "intermediate" | "advanced";
  trainingDaysPerWeek: number;

  // Step 3: Health & Injuries
  jointInjuries: string[];
  medicalConditions: string;

  // Step 4: Contact & Booking
  fullName: string;
  phone: string;
  preferredConsultationTime: string;
}

export default function AthleteIntakeQuizPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [quiz, setQuiz] = useState<QuizState>({
    primaryGoal: "hypertrophy",
    targetTimeframe: "3_months",
    currentWeightKg: "80",
    heightCm: "178",
    trainingExperience: "intermediate",
    trainingDaysPerWeek: 5,
    jointInjuries: [],
    medicalConditions: "",
    fullName: "",
    phone: "",
    preferredConsultationTime: "evening",
  });

  const toggleInjury = (injury: string) => {
    setQuiz((prev) => {
      const exists = prev.jointInjuries.includes(injury);
      return {
        ...prev,
        jointInjuries: exists
          ? prev.jointInjuries.filter((i) => i !== injury)
          : [...prev.jointInjuries, injury],
      };
    });
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quiz.fullName || !quiz.phone) {
      alert("يرجى كتابة الاسم ورقم الواتساب للتواصل");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/funnel/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quiz),
      });

      if (res.ok) {
        setIsCompleted(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#7C3AED", "#10B981", "#F59E0B"],
        });
      } else {
        setIsCompleted(true); // Graceful fallback
      }
    } catch (err) {
      setIsCompleted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <span className="text-[10px] text-purple-300 block -mt-1 font-medium">استبيان التقييم الرياضي المباشر</span>
          </div>
        </Link>
        <Link
          href="/pricing"
          className="text-xs text-slate-400 hover:text-white transition px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20"
        >
          الباقات والأسعار
        </Link>
      </header>

      {/* Main Form Container */}
      <main className="flex-1 max-w-xl w-full mx-auto px-4 sm:px-6 py-10 flex flex-col justify-center">
        {!isCompleted ? (
          <div className="space-y-6">
            {/* Step Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>الخطوة {currentStep} من 4</span>
                <span>
                  {currentStep === 1 && "الهدف الرياضي"}
                  {currentStep === 2 && "القياسات ومستوى التدريب"}
                  {currentStep === 3 && "سجل الإصابات والمفاصل"}
                  {currentStep === 4 && "حجز موعد الاستشارة"}
                </span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 transition-all duration-300 rounded-full"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Step 1: Goal */}
            {currentStep === 1 && (
              <div className="bg-[#0E081D] border border-white/[0.08] p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-400" />
                    ما هو هدفك الرياضي الأساسي؟
                  </h2>
                  <p className="text-xs text-slate-400">حدد وجهتك ليتم تصميم البرنامج التدريبي والغذائي المناسب لك تماماً.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: "hypertrophy", label: "تضخيم وبناء عضلات صافية", icon: Flame, desc: "زيادة الحجم العضلي مع الحفاظ على نسبة دهون منخفضة" },
                    { id: "fat_loss", label: "تنشيف وخسارة دهون حشوية", icon: Scale, desc: "إبراز تفاصيل العضلات وتقليل محيط الخصر" },
                    { id: "strength", label: "قوة بدنية وزيادة أوزان (Power)", icon: Dumbbell, desc: "رفع أرقام السكوات والبنش ديدليفت" },
                    { id: "rehab", label: "تأهيل وإصلاح قوام (Posture)", icon: HeartPulse, desc: "تقوية الظهر وعلاج الانحناءات وضعف المفاصل" },
                  ].map((item) => {
                    const Icon = item.icon;
                    const selected = quiz.primaryGoal === item.id;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setQuiz({ ...quiz, primaryGoal: item.id as any })}
                        className={`p-4 rounded-xl border text-right transition flex flex-col justify-between gap-2 ${
                          selected
                            ? "bg-purple-600/25 border-purple-500 shadow-lg shadow-purple-900/30"
                            : "bg-[#150D2A] border-white/5 hover:border-white/15"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className={`text-sm font-bold ${selected ? "text-white" : "text-slate-200"}`}>{item.label}</span>
                          <Icon className={`w-4 h-4 ${selected ? "text-purple-400" : "text-slate-500"}`} />
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-2 pt-2">
                  <label className="block text-xs text-slate-300 font-medium">المدى الزمني المتوقع للوصول للهدف:</label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {[
                      { id: "3_months", label: "3 شهور (تحول سريع)" },
                      { id: "6_months", label: "6 شهور (تغيير جذري)" },
                      { id: "competition", label: "بطولة / سيزون كامل" },
                    ].map((opt) => (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setQuiz({ ...quiz, targetTimeframe: opt.id as any })}
                        className={`py-2 px-2.5 rounded-xl border text-center transition ${
                          quiz.targetTimeframe === opt.id
                            ? "bg-purple-600/30 border-purple-500 text-white font-bold"
                            : "bg-[#150D2A] border-white/5 text-slate-400 hover:border-white/20"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Body & Training Experience */}
            {currentStep === 2 && (
              <div className="bg-[#0E081D] border border-white/[0.08] p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-purple-400" />
                    القياسات الحالية والخبرة التدريبية
                  </h2>
                  <p className="text-xs text-slate-400">تساعدنا هذه البيانات في ضبط حجم التمرين ومعدل السعرات والماكروز اليومي.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1.5 font-medium">الوزن الحالي (كجم)</label>
                    <input
                      type="number"
                      value={quiz.currentWeightKg}
                      onChange={(e) => setQuiz({ ...quiz, currentWeightKg: e.target.value })}
                      className="w-full bg-[#150D2A] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition"
                      placeholder="80"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1.5 font-medium">الطول (سم)</label>
                    <input
                      type="number"
                      value={quiz.heightCm}
                      onChange={(e) => setQuiz({ ...quiz, heightCm: e.target.value })}
                      className="w-full bg-[#150D2A] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition"
                      placeholder="178"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-2 font-medium">مستواك الحالي في تمارين الجيم والحديد:</label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {[
                      { id: "beginner", label: "مبتدئ (< 6 شهور)" },
                      { id: "intermediate", label: "متوسط (1-3 سنوات)" },
                      { id: "advanced", label: "متقدم (3+ سنوات)" },
                    ].map((opt) => (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setQuiz({ ...quiz, trainingExperience: opt.id as any })}
                        className={`py-2.5 px-2 rounded-xl border text-center transition ${
                          quiz.trainingExperience === opt.id
                            ? "bg-purple-600/30 border-purple-500 text-white font-bold"
                            : "bg-[#150D2A] border-white/5 text-slate-400 hover:border-white/20"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-2 font-medium">عدد الأيام المتاحة للتمرين في الأسبوع: ({quiz.trainingDaysPerWeek} أيام)</label>
                  <input
                    type="range"
                    min={3}
                    max={6}
                    value={quiz.trainingDaysPerWeek}
                    onChange={(e) => setQuiz({ ...quiz, trainingDaysPerWeek: Number(e.target.value) })}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>3 أيام (Full Body)</span>
                    <span>4 أيام (Upper/Lower)</span>
                    <span>5-6 أيام (Push/Pull/Legs)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Health & Joint Protection */}
            {currentStep === 3 && (
              <div className="bg-[#0E081D] border border-white/[0.08] p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    حماية المفاصل وسجل الإصابات
                  </h2>
                  <p className="text-xs text-slate-400">نظام CoachPRB الذكي يستبعد تلقائياً أي تمارين تضع حملاً ضاراً على مفاصلك المصابة.</p>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-2 font-medium">هل تعاني من آلام أو إصابات في أي من هذه المناطق؟ (اختر كل ما ينطبق)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                    {[
                      { id: "lower_back", label: "أسفل الظهر (انزلاق غضروفي)" },
                      { id: "knee", label: "الركبة (غضروف / رباط)" },
                      { id: "shoulder", label: "الكتف (Rotator Cuff)" },
                      { id: "elbow", label: "الكوع (تنس إلبو)" },
                      { id: "neck", label: "الرقبة والفقرات العنقية" },
                      { id: "none", label: "لا توجد أي إصابات بفضل الله" },
                    ].map((item) => {
                      const isChecked = quiz.jointInjuries.includes(item.id);
                      return (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => {
                            if (item.id === "none") {
                              setQuiz({ ...quiz, jointInjuries: ["none"] });
                            } else {
                              const cleaned = quiz.jointInjuries.filter((i) => i !== "none");
                              const exists = cleaned.includes(item.id);
                              setQuiz({
                                ...quiz,
                                jointInjuries: exists ? cleaned.filter((i) => i !== item.id) : [...cleaned, item.id],
                              });
                            }
                          }}
                          className={`p-3 rounded-xl border text-center transition ${
                            isChecked
                              ? "bg-purple-600/30 border-purple-500 text-white font-bold"
                              : "bg-[#150D2A] border-white/5 text-slate-400 hover:border-white/20"
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1.5 font-medium">ملاحظات طبية إضافية (حساسية طعام، ضغط، سكر... إن وجد)</label>
                  <textarea
                    rows={2}
                    value={quiz.medicalConditions}
                    onChange={(e) => setQuiz({ ...quiz, medicalConditions: e.target.value })}
                    placeholder="اكتب أي ملاحظة يهم الكابتن معرفتها قبل وضع نظامك..."
                    className="w-full bg-[#150D2A] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Contact & Booking */}
            {currentStep === 4 && (
              <form onSubmit={handleSubmit} className="bg-[#0E081D] border border-white/[0.08] p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    حجز موعد الاستشارة ومراجعة الخطة
                  </h2>
                  <p className="text-xs text-slate-400">سيتواصل معك الكابتن عبر الواتساب لتأكيد موعد المكالمة وشرح تفاصيل الباقة المناسبة.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1.5 font-medium">اسمك بالكامل *</label>
                    <input
                      type="text"
                      required
                      value={quiz.fullName}
                      onChange={(e) => setQuiz({ ...quiz, fullName: e.target.value })}
                      placeholder="محمد إبراهيم"
                      className="w-full bg-[#150D2A] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1.5 font-medium">رقم الواتساب النشط *</label>
                    <input
                      type="tel"
                      required
                      value={quiz.phone}
                      onChange={(e) => setQuiz({ ...quiz, phone: e.target.value })}
                      placeholder="010XXXXXXXX أو 05XXXXXXXX"
                      className="w-full bg-[#150D2A] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1.5 font-medium">الوقت المفضل للمكالمة الاستشارية:</label>
                    <select
                      value={quiz.preferredConsultationTime}
                      onChange={(e) => setQuiz({ ...quiz, preferredConsultationTime: e.target.value })}
                      className="w-full bg-[#150D2A] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition"
                    >
                      <option value="morning">صباحاً (10 ص - 2 م)</option>
                      <option value="evening">مساءً (6 م - 10 م) - الأكثر تفضيلاً</option>
                      <option value="anytime">أي وقت مناسب للكابتن</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#7C3AED] to-[#9333EA] hover:from-[#6D28D9] hover:to-[#7E22CE] text-white font-bold py-3.5 px-4 rounded-xl text-sm transition duration-200 shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>جاري إرسال بياناتك وحجز المكالمة...</span>
                  ) : (
                    <>
                      <span>تأكيد حجز الاستشارة المجانية</span>
                      <ArrowLeft className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Navigation Buttons for Steps 1-3 */}
            {currentStep < 4 && (
              <div className="flex items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-xs text-slate-400 hover:text-white hover:border-white/20 transition disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  السابق
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-xs font-bold text-white transition flex items-center gap-1.5 shadow-md shadow-purple-900/30"
                >
                  التالي
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Confirmation & Cal.com Embed Screen */
          <div className="bg-[#0E081D] border border-purple-500/30 p-8 rounded-3xl shadow-2xl text-center space-y-6 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white">تم استلام تقييمك الرياضي بنجاح!</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                شكراً ليك يا بطل ({quiz.fullName}). تم تحليل هدفك ({quiz.primaryGoal}) وتجهيز ملفك الاستشاري للكابتن.
              </p>
            </div>

            {/* Action Card */}
            <div className="bg-[#150D2A] p-4 rounded-xl text-xs text-purple-300 text-right space-y-2 border border-purple-900/40">
              <p className="font-semibold text-white flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-purple-400" />
                الخطوة القادمة (مكالمة الاستشارة):
              </p>
              <p className="text-slate-300 leading-relaxed">
                ستصلك رسالة عبر الواتساب على الرقم ({quiz.phone}) لتأكيد موعد مكالمة الفيديو/الصوت وتحديد الباقة والبرنامج التدريبي الأنسب.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/book"
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2"
              >
                <span>اختيار وقت دقيق من التقويم المباشر</span>
                <Calendar className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="px-4 py-3 rounded-xl border border-white/10 text-xs text-slate-400 hover:text-white hover:border-white/20 transition flex items-center justify-center"
              >
                الصفحة الرئيسية
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-white/[0.04] text-center text-[11px] text-slate-500">
        CoachPRB — سجّل رقمك. غيّر جسمك. © 2026 جميع الحقوق محفوظة.
      </footer>
    </div>
  );
}
