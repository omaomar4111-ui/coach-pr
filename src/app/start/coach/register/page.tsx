"use client";

import React, { useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";

export default function RegisterCoachPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("Pro");
  const [paymentMethod, setPaymentMethod] = useState<"instapay" | "vodafone_cash">("instapay");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Save coach registration in persistence DB
      await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          phone,
          email,
          goal: `كابتن مسجل باقة ${selectedPlan}`,
          medicalNotes: `طريقة الدفع: ${paymentMethod}`
        })
      });
    } catch (err) {
      console.log("Registered locally");
    }

    confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#07040D] text-white flex flex-col justify-between font-sans selection:bg-purple-900 selection:text-white" dir="rtl">
      {/* Minimal Cinematic Header */}
      <header className="px-8 py-6 flex items-center justify-between border-b border-white/[0.04]">
        <Link href="/" className="flex items-center gap-3 group">
          <img 
            src="/pr-logo.png" 
            alt="PR" 
            className="h-8 w-auto object-contain opacity-90 group-hover:opacity-100 transition duration-300" 
          />
          <span className="font-heading font-black text-lg tracking-wider text-white">
            COACH<span className="text-[#A78BFA]">PR</span>
          </span>
        </Link>
        <Link 
          href="/" 
          className="text-xs text-slate-400 hover:text-white transition duration-200"
        >
          الرئيسية
        </Link>
      </header>

      {/* Main Container - Ultra Clean, Quiet, Minimal */}
      <main className="flex-1 max-w-md w-full mx-auto px-6 py-12 flex flex-col justify-center">
        <div className="space-y-8">
          
          {/* Header titles without clutter */}
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-black tracking-tight text-white">
              ابدأ كمدرب معتمد
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
              سجل حسابك وانقل إدارة متدربيك لبيئة احترافية متكاملة
            </p>
          </div>

          {/* Direct Streamlined Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-300 font-medium">الاسم الكامل</label>
              <input
                type="text"
                required
                placeholder="كابتن عمر مصطفى"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#0F0A1C] border border-white/[0.08] focus:border-[#7C3AED] rounded-xl px-3.5 py-3 text-white placeholder-slate-600 outline-none transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-300 font-medium">رقم الواتساب للتفعيل</label>
              <input
                type="text"
                required
                placeholder="01144826641"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#0F0A1C] border border-white/[0.08] focus:border-[#7C3AED] rounded-xl px-3.5 py-3 text-white placeholder-slate-600 outline-none transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-300 font-medium">البريد الإلكتروني</label>
              <input
                type="email"
                required
                placeholder="coach@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0F0A1C] border border-white/[0.08] focus:border-[#7C3AED] rounded-xl px-3.5 py-3 text-white placeholder-slate-600 outline-none transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-300 font-medium">الباقة المختارة</label>
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full bg-[#0F0A1C] border border-white/[0.08] focus:border-[#7C3AED] rounded-xl px-3.5 py-3 text-white outline-none transition cursor-pointer"
              >
                <option value="Starter">Starter (0 ج.م مجاناً) — لأول 10 عملاء لتجربة النظام</option>
                <option value="Pro">Pro (499 ج.م / شهر) — حتى 40 عميل + فورم تشيك وذكاء اصطناعي</option>
                <option value="Max">Max (899 ج.م / شهر) — حتى 80 عميل</option>
                <option value="Agency">Agency (1,299 ج.م / شهر) — عدد غير محدود من العملاء</option>
              </select>
            </div>

            <div className="space-y-1.5 pt-1">
              <label className="text-[11px] text-slate-300 font-medium">وسيلة الدفع المفضلة</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("instapay")}
                  className={`py-2.5 px-3 rounded-xl border text-center transition ${
                    paymentMethod === "instapay"
                      ? "bg-[#7C3AED]/20 border-[#7C3AED] text-white"
                      : "bg-[#0F0A1C] border-white/[0.06] text-slate-400 hover:text-white"
                  }`}
                >
                  إنستاباي (InstaPay)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("vodafone_cash")}
                  className={`py-2.5 px-3 rounded-xl border text-center transition ${
                    paymentMethod === "vodafone_cash"
                      ? "bg-[#7C3AED]/20 border-[#7C3AED] text-white"
                      : "bg-[#0F0A1C] border-white/[0.06] text-slate-400 hover:text-white"
                  }`}
                >
                  فودافون كاش
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-950/50 transition cursor-pointer"
              >
                {isLoading ? "جاري تجهيز حسابك..." : "إنشاء الحساب والدخول للوحة التحكم"}
              </button>
            </div>

          </form>

          <p className="text-[11px] text-center text-slate-500">
            ضمان استرجاع كامل 7 أيام · دعم فني مباشر على الواتساب
          </p>

        </div>
      </main>

      {/* Subtle Minimal Footer */}
      <footer className="py-6 text-center text-[10px] text-slate-600 border-t border-white/[0.03]">
        CoachPR Platform · جميع الحقوق محفوظة 2026
      </footer>
    </div>
  );
}
