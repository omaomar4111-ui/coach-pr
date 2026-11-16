"use client";

import React, { useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { CheckCircle2, Shield, Smartphone, Users, Zap, ArrowLeft, Trophy } from "lucide-react";

export default function PilotApplicationPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    countryCity: "مصر - القاهرة",
    instagramHandle: "",
    activeClientsCount: "16-35",
    currentWorkflow: ["excel", "whatsapp"] as string[],
    biggestPainPoint: "",
    deviceType: "ios",
    doesFormCheck: "yes_whatsapp",
    readyForPilot: true,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [responseInfo, setResponseInfo] = useState<{ score?: number; message?: string } | null>(null);

  const toggleWorkflow = (item: string) => {
    setFormData((prev) => {
      const exists = prev.currentWorkflow.includes(item);
      return {
        ...prev,
        currentWorkflow: exists
          ? prev.currentWorkflow.filter((w) => w !== item)
          : [...prev.currentWorkflow, item],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/pilot/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        setResponseInfo(data);
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ["#7C3AED", "#A78BFA", "#10B981"],
        });
      } else {
        alert(data.error || "حدث خطأ أثناء الإرسال");
      }
    } catch (err) {
      alert("تعذر الاتصال بالخادم. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07040D] text-white flex flex-col justify-between font-sans selection:bg-purple-900 selection:text-white" dir="rtl">
      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between border-b border-white/[0.06] bg-[#0A0514]/80 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#9333EA] flex items-center justify-center shadow-lg shadow-purple-900/30">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-heading font-black text-lg tracking-wider text-white">
              COACH<span className="text-[#A78BFA]">PRB</span>
            </span>
            <span className="text-[10px] text-purple-300 block -mt-1 font-medium">النسخة التجريبية الأولى (Pilot Cohort)</span>
          </div>
        </Link>
        <Link
          href="/login"
          className="text-xs text-slate-400 hover:text-white transition px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20"
        >
          دخول المدربين
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-10">
        {!submitted ? (
          <div className="space-y-8">
            {/* Hero / Intro */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800/40 text-purple-300 text-xs font-semibold">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                مقاعد مجانية مخصصة لـ 10 مدربين فقط
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                استمارة ترشيح مدربي الدفعة الأولى
              </h1>
              <p className="text-sm text-slate-400 leading-relaxed max-w-lg mx-auto">
                وفر 70% من وقت المتابعة اليومية، تخلص من صداع الإكسيل وتشتت رسائل الواتساب، وانقل إدارتك لنظام ذكي متكامل.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 bg-[#0E081D] border border-white/[0.08] p-6 sm:p-8 rounded-2xl shadow-xl">
              
              {/* Section 1: Coach Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-purple-300 flex items-center gap-2 border-b border-white/[0.06] pb-2">
                  <Users className="w-4 h-4" />
                  1. البيانات الشخصية وحساب التدريب
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1.5 font-medium">الاسم الكامل واللقب التدريبي *</label>
                    <input
                      type="text"
                      required
                      placeholder="كابتن أحمد سامي"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#150D2A] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1.5 font-medium">رقم الواتساب النشط للمتابعة *</label>
                    <input
                      type="tel"
                      required
                      placeholder="010XXXXXXXX أو 966XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#150D2A] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1.5 font-medium">الدولة والمدينة</label>
                    <input
                      type="text"
                      placeholder="مصر - الإسكندرية"
                      value={formData.countryCity}
                      onChange={(e) => setFormData({ ...formData, countryCity: e.target.value })}
                      className="w-full bg-[#150D2A] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1.5 font-medium">رابط حساب إنستجرام / تيك توك *</label>
                    <input
                      type="text"
                      required
                      placeholder="instagram.com/coach.name"
                      value={formData.instagramHandle}
                      onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
                      className="w-full bg-[#150D2A] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Clients and Workflow */}
              <div className="space-y-4 pt-2">
                <h3 className="text-sm font-bold text-purple-300 flex items-center gap-2 border-b border-white/[0.06] pb-2">
                  <Shield className="w-4 h-4" />
                  2. حجم المتابعة وطريقة العمل الحالية
                </h3>

                <div>
                  <label className="block text-xs text-slate-300 mb-2 font-medium">كم عدد المتدربين النشطين معك حالياً؟ *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { id: "<5", label: "أقل من 5" },
                      { id: "5-15", label: "5 إلى 15 لاعب" },
                      { id: "16-35", label: "16 إلى 35 لاعب (مثالي)" },
                      { id: "35+", label: "أكثر من 35 لاعب" },
                    ].map((opt) => (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setFormData({ ...formData, activeClientsCount: opt.id })}
                        className={`py-2 px-3 rounded-xl border text-center transition ${
                          formData.activeClientsCount === opt.id
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
                  <label className="block text-xs text-slate-300 mb-2 font-medium">كيف تدير برامج ومتابعة لاعبيك حالياً؟ (اختر كل ما ينطبق)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    {[
                      { id: "excel", label: "📊 شيتات إكسيل / درايف" },
                      { id: "whatsapp", label: "💬 شات وفويسات واتساب" },
                      { id: "pdf", label: "📄 ملفات PDF ثابتة" },
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => toggleWorkflow(item.id)}
                        className={`py-2.5 px-3 rounded-xl border text-center transition ${
                          formData.currentWorkflow.includes(item.id)
                            ? "bg-purple-600/30 border-purple-500 text-white font-bold"
                            : "bg-[#150D2A] border-white/5 text-slate-400 hover:border-white/20"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1.5 font-medium">ما هو أكبر تحدٍ أو "صداع" يضيع وقتك يومياً؟</label>
                  <textarea
                    rows={2}
                    placeholder="مثال: تعديل الجداول باستمرار، ضياع فيديوهات التكنيك في شات الواتساب، والرد المتكرر على نفس الأسئلة..."
                    value={formData.biggestPainPoint}
                    onChange={(e) => setFormData({ ...formData, biggestPainPoint: e.target.value })}
                    className="w-full bg-[#150D2A] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition"
                  />
                </div>
              </div>

              {/* Section 3: Device & Pilot Readiness */}
              <div className="space-y-4 pt-2">
                <h3 className="text-sm font-bold text-purple-300 flex items-center gap-2 border-b border-white/[0.06] pb-2">
                  <Smartphone className="w-4 h-4" />
                  3. جهازك ومراجعة التكنيك (Form Check)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1.5 font-medium">الموبايل الأساسي اللي بتستخدمه:</label>
                    <select
                      value={formData.deviceType}
                      onChange={(e) => setFormData({ ...formData, deviceType: e.target.value })}
                      className="w-full bg-[#150D2A] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition"
                    >
                      <option value="ios">آيفون (iOS Safari)</option>
                      <option value="android">أندرويد (Samsung / Xiaomi / etc)</option>
                      <option value="desktop">لابتوب / كمبيوتر بشكل أساسي</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1.5 font-medium">هل تراجع فيديوهات تكنيك للاعبين؟</label>
                    <select
                      value={formData.doesFormCheck}
                      onChange={(e) => setFormData({ ...formData, doesFormCheck: e.target.value })}
                      className="w-full bg-[#150D2A] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition"
                    >
                      <option value="yes_whatsapp">نعم، على الواتساب (وده بيملى الموبايل)</option>
                      <option value="yes_irregular">نعم، ولكن ليس بانتظام</option>
                      <option value="no">لا، أعتمد على التوجيه النظري</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#150D2A]/80 p-3.5 rounded-xl border border-white/5">
                  <input
                    type="checkbox"
                    id="pilotReady"
                    checked={formData.readyForPilot}
                    onChange={(e) => setFormData({ ...formData, readyForPilot: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded text-purple-600 focus:ring-purple-500 bg-black/40 border-white/20"
                  />
                  <label htmlFor="pilotReady" className="text-xs text-slate-300 leading-relaxed cursor-pointer">
                    أنا مستعد لتجربة المنصة مع 3 إلى 5 لاعبين مجاناً، ومشاركة ملاحظاتي الأسبوعية مع فريق التطوير لمساعدتهم في جعل النظام الأفضل في الوطن العربي. 🚀
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#7C3AED] to-[#9333EA] hover:from-[#6D28D9] hover:to-[#7E22CE] text-white font-bold py-3.5 px-4 rounded-xl text-sm transition duration-200 shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>جاري تسجيل ترشيحك...</span>
                ) : (
                  <>
                    <span>إرسال استمارة الترشيح للمرحلة التجريبية</span>
                    <ArrowLeft className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center space-y-6 bg-[#0E081D] border border-purple-500/30 p-8 sm:p-12 rounded-3xl shadow-2xl max-w-lg mx-auto">
            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white">تم استلام طلب ترشيحك بنجاح!</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                شكراً ليك يا كابتن {formData.fullName}. استمارة الترشيح مسجلة الآن برقم تقييم أولي ({responseInfo?.score || 85}/100).
              </p>
            </div>

            <div className="bg-[#150D2A] p-4 rounded-xl text-xs text-purple-300 text-right space-y-2 border border-purple-900/40">
              <p className="font-semibold text-white">📌 الخطوة القادمة:</p>
              <p>
                فريق CoachPRB يراجع الملفات حالياً، وسيتم إرسال رسالة القبول وتفاصيل حسابك الجاهز عبر الواتساب على الرقم ({formData.phone}).
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition"
            >
              العودة للصفحة الرئيسية
            </Link>
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
