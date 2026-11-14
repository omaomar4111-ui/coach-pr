"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, ShieldCheck, Sparkles, CreditCard } from "lucide-react";
import confetti from "canvas-confetti";

export default function RegisterCoachPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("Pro");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    alert(`أهلاً بك يا كابتن ${fullName}! تم إنشاء حسابك في CoachPRB بنجاح. جاري نقلك إلى لوحة التحكم.`);
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-[#0A0612] text-white flex flex-col font-sans" dir="rtl">
      {/* Header */}
      <header className="bg-[#110A1E] border-b border-purple-900/30 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/pr-logo.png" alt="CoachPRB Logo" className="h-9 w-auto object-contain" />
          <span className="font-heading font-black text-xl text-white">Coach<span className="text-[#A78BFA]">PRB</span></span>
        </Link>
        <Link href="/" className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-bold">
          <ArrowLeft className="w-4 h-4" />
          <span>العودة للرئيسية</span>
        </Link>
      </header>

      {/* Main Registration Form */}
      <div className="flex-1 max-w-lg w-full mx-auto p-4 sm:p-6 flex flex-col justify-center">
        <div className="bg-[#140C24] border border-purple-900/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <span className="text-xs bg-[#7C3AED]/20 text-[#A78BFA] border border-purple-500/30 px-3 py-1 rounded-full font-bold">
              ضمان استرجاع كامل 7 أيام
            </span>
            <h1 className="text-2xl font-black font-heading text-white">ابدأ حساب المدرب في CoachPRB</h1>
            <p className="text-xs text-slate-400">سجل بياناتك للبدء فوراً في إدخال عملائك وبناء خطط التمارين</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-bold">الاسم بالكامل (الكابتن)</label>
              <input
                type="text"
                required
                placeholder="مثال: عمر مصطفى"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#110A1E] border border-purple-900/40 rounded-xl p-3 text-white focus:outline-none focus:border-[#7C3AED]"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-bold">رقم الواتساب للتفعيل</label>
              <input
                type="text"
                required
                placeholder="مثال: 01144826641"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#110A1E] border border-purple-900/40 rounded-xl p-3 text-white focus:outline-none focus:border-[#7C3AED]"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-bold">البريد الإلكتروني</label>
              <input
                type="email"
                required
                placeholder="coach@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#110A1E] border border-purple-900/40 rounded-xl p-3 text-white focus:outline-none focus:border-[#7C3AED]"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-bold">الباقة المختارة</label>
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full bg-[#110A1E] border border-purple-900/40 rounded-xl p-3 text-white focus:outline-none focus:border-[#7C3AED]"
              >
                <option value="Starter">Starter (299 ج.م / شهر) - حتى 10 عملاء</option>
                <option value="Pro">Pro (999 ج.م / شهر) - حتى 30 عميل + AI وفورم تشيك</option>
                <option value="Max">Max (1,999 ج.م / شهر) - حتى 60 عميل</option>
                <option value="Agency">Agency (3,999 ج.م / شهر) - عدد مفتوح من العملاء</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white font-black text-sm rounded-xl shadow-xl shadow-purple-900/50 hover:opacity-95 transition"
            >
              تأكيد التسجيل والدخول للوحة التحكم
            </button>
          </form>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-[#A78BFA]" />
            <span>بياناتك مؤمنة ومشفرة تماماً مع حماية الخصوصية</span>
          </div>
        </div>
      </div>
    </div>
  );
}
