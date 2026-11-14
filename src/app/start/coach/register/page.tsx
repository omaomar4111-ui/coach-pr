"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Check } from "lucide-react";
import confetti from "canvas-confetti";

export default function RegisterCoachPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("Pro");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    alert(`أهلاً بك يا كابتن ${fullName}! تم إنشاء حسابك بنجاح.`);
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-[#0A0612] text-white flex flex-col font-sans" dir="rtl">
      {/* Header */}
      <header className="bg-[#110A1E] border-b border-purple-900/30 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <img src="/pr-logo.png" alt="CoachPRB" style={{ height: "36px", width: "auto", objectFit: "contain" }} />
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
            <h1 className="text-2xl font-black font-heading text-white">ابدأ حساب المدرب في CoachPRB</h1>
            <p className="text-xs text-slate-400">سجل بياناتك للبدء فوراً في إدخال عملائك وبناء خطط التمارين</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
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
              <label className="block text-slate-300 mb-1.5 font-bold">الباقة المختارة</label>
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full bg-[#110A1E] border border-purple-900/50 rounded-xl p-3 text-white focus:outline-none focus:border-[#7C3AED]"
              >
                <option value="Starter">Starter (199 ج.م / شهر) - حتى 15 عميل (أقل من كوتشيفو)</option>
                <option value="Pro">Pro (499 ج.م / شهر) - حتى 40 عميل + AI وفورم تشيك (أقوى وأوفر من كوتشيفو 699)</option>
                <option value="Max">Max (899 ج.م / شهر) - حتى 80 عميل</option>
                <option value="Agency">Agency (1,299 ج.م / شهر) - عدد غير محدود من العملاء (أرخص من كوتشيفو 1499)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black text-sm rounded-xl shadow-xl shadow-purple-900/50 transition cursor-pointer"
            >
              تأكيد التسجيل والدخول للوحة التحكم
            </button>
          </form>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-2 border-t border-purple-900/20">
            <ShieldCheck className="w-4 h-4 text-[#A78BFA]" />
            <span>بياناتك مؤمنة ومشفرة تماماً مع حماية الخصوصية</span>
          </div>
        </div>
      </div>
    </div>
  );
}
