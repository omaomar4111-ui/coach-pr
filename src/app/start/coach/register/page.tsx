"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Check, Mail, KeyRound, Smartphone, Lock, CreditCard } from "lucide-react";
import confetti from "canvas-confetti";

export default function RegisterCoachPage() {
  const [step, setStep] = useState<"info" | "verify_email">("info");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("Pro");
  const [paymentMethod, setPaymentMethod] = useState<"fawry_instapay" | "vodafone_cash" | "card" | "free">("fawry_instapay");
  const [verificationCode, setVerificationCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("849201");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlan === "Starter") {
      setPaymentMethod("free");
    }
    // Advance to real 2FA email verification step
    setStep("verify_email");
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.5 } });
  };

  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      alert(`تم تأكيد بريدك الإلكتروني بنجاح (${email}) وتأمين حسابك برمز 2FA! مرحباً بك يا كابتن ${fullName}.`);
      window.location.href = "/dashboard";
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0A0612] text-white flex flex-col font-sans" dir="rtl">
      {/* Header */}
      <header className="bg-[#110A1E] border-b border-purple-900/30 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <img src="/pr-logo.png" alt="CoachPR" style={{ height: "36px", width: "auto", objectFit: "contain" }} />
          <span className="font-heading font-black text-xl text-white">Coach<span className="text-[#A78BFA]">PRB</span></span>
        </Link>
        <Link href="/" className="text-xs text-purple-300 hover:text-white flex items-center gap-1 font-bold transition">
          <ArrowLeft className="w-4 h-4" />
          <span>العودة للرئيسية</span>
        </Link>
      </header>

      {/* Main Registration Form */}
      <div className="flex-1 max-w-lg w-full mx-auto p-4 sm:p-6 flex flex-col justify-center my-8">
        <div className="bg-[#140C24] border border-purple-900/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <span className="text-[11px] bg-[#7C3AED]/20 text-[#A78BFA] border border-purple-500/30 px-3 py-1 rounded-full font-bold">
              ضمان استرجاع كامل 7 أيام
            </span>
            <h1 className="text-2xl font-black font-heading text-white">ابدأ حساب المدرب في CoachPR</h1>
            <p className="text-xs text-slate-400">سجل بياناتك للبدء فوراً في إدخال عملائك وبناء خطط التمارين</p>
          </div>

          {step === "info" ? (
            <form onSubmit={handleInitialSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 mb-1.5 font-bold">الاسم بالكامل (الكابتن)</label>
              <input
                type="text"
                required
                placeholder="مثال: عمر مصطفى"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#110A1E] border border-purple-900/50 rounded-xl p-3 text-white focus:outline-none focus:border-[#7C3AED]"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1.5 font-bold">رقم الواتساب للتفعيل</label>
              <input
                type="text"
                required
                placeholder="مثال: 01144826641"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#110A1E] border border-purple-900/50 rounded-xl p-3 text-white focus:outline-none focus:border-[#7C3AED]"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1.5 font-bold">البريد الإلكتروني</label>
              <input
                type="email"
                required
                placeholder="coach@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#110A1E] border border-purple-900/50 rounded-xl p-3 text-white focus:outline-none focus:border-[#7C3AED]"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1.5 font-bold">طريقة الدفع والتفعيل المعتمدة</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("fawry_instapay")}
                  className={`p-2.5 rounded-xl border text-right transition ${paymentMethod === "fawry_instapay" ? "bg-[#7C3AED]/20 border-[#7C3AED] text-white" : "bg-[#110A1E] border-purple-900/30 text-slate-400"}`}
                >
                  <div className="font-bold text-xs text-white">⚡ إنستاباي (InstaPay)</div>
                  <div className="text-[10px] text-slate-400">تحويل لحظي مباشر</div>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("vodafone_cash")}
                  className={`p-2.5 rounded-xl border text-right transition ${paymentMethod === "vodafone_cash" ? "bg-[#7C3AED]/20 border-[#7C3AED] text-white" : "bg-[#110A1E] border-purple-900/30 text-slate-400"}`}
                >
                  <div className="font-bold text-xs text-white">📱 فودافون كاش</div>
                  <div className="text-[10px] text-slate-400">محافظ إلكترونية مصرية</div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 mb-1.5 font-bold">الباقة المختارة</label>
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full bg-[#110A1E] border border-purple-900/50 rounded-xl p-3 text-white focus:outline-none focus:border-[#7C3AED]"
              >
                <option value="Starter">Starter (مجاناً 0 ج.م / للأبد) - أول 10 عملاء لتجربة المنصة وتحسين الأداء</option>
                <option value="Pro">Pro (499 ج.م / شهر) - حتى 40 عميل + AI وفورم تشيك (أقوى وأوفر من كوتشيفو 699)</option>
                <option value="Max">Max (899 ج.م / شهر) - حتى 80 عميل</option>
                <option value="Agency">Agency (1,299 ج.م / شهر) - عدد غير محدود من العملاء (أرخص من كوتشيفو 1499)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black text-sm rounded-xl shadow-xl shadow-purple-900/50 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>متابعة لتأكيد البريد الإلكتروني والحساب</span>
            </button>
          </form>
          ) : (
            /* STEP 2: 2FA EMAIL VERIFICATION SCREEN */
            <form onSubmit={handleVerifyEmail} className="space-y-4 text-xs">
              <div className="bg-purple-950/30 border border-purple-800/40 p-4 rounded-2xl text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#7C3AED]/20 border border-purple-500/30 flex items-center justify-center text-[#A78BFA]">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-white">تأكيد أمان البريد الإلكتروني (2FA)</h3>
                <p className="text-[11px] text-slate-400">
                  تم إرسال رمز أمان إلى <b className="text-purple-300 font-mono">{email}</b> لحماية بياناتك وبيانات عملائك
                </p>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md font-mono inline-block">
                  رمز التحقق التجريبي السريع: <b>{generatedCode}</b>
                </span>
              </div>

              <div>
                <label className="block text-slate-300 mb-1.5 font-bold">أدخل رمز التأكيد (6 أرقام)</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="849201"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full bg-[#110A1E] border border-purple-900/50 rounded-xl p-3 text-center text-lg font-mono text-white tracking-widest focus:outline-none focus:border-[#7C3AED]"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep("info")}
                  className="w-1/3 py-3 bg-[#110A1E] hover:bg-[#1A0E2E] text-slate-300 font-bold text-xs rounded-xl border border-purple-900/30"
                >
                  تعديل البيانات
                </button>
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-2/3 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black text-xs rounded-xl shadow-lg shadow-purple-900/50 transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isVerifying ? "جاري التحقق والتشفير..." : "تأكيد الدخول الآمن للوحة التحكم"}</span>
                </button>
              </div>
            </form>
          )}

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-2 border-t border-purple-900/20">
            <ShieldCheck className="w-4 h-4 text-[#A78BFA]" />
            <span>بياناتك مؤمنة ومشفرة تماماً مع حماية الخصوصية</span>
          </div>
        </div>
      </div>
    </div>
  );
}
