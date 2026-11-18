"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#000000] text-white font-sans selection:bg-[#8052ff] selection:text-white pb-20">
      {/* Header */}
      <header className="border-b border-[#171717] px-6 py-6 max-w-[1280px] mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-5 h-5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <polygon points="12 2 22 22 2 22" fill="#8052ff" />
            </svg>
          </div>
          <span className="text-[16px] font-normal tracking-tight text-white">CoachPRB</span>
        </Link>
        <div className="flex items-center gap-6 text-[14px]">
          <Link href="/about" className="text-[#9a9a9a] hover:text-white transition-colors">عن المنصة</Link>
          <Link href="/pricing" className="text-[#9a9a9a] hover:text-white transition-colors">الأسعار</Link>
          <Link href="/inbox" className="bg-[#8052ff] text-white px-5 py-2 rounded-[24px]">دخول المنصة</Link>
        </div>
      </header>

      {/* Main Form */}
      <main className="max-w-[650px] mx-auto px-6 py-16 text-right">
        <span className="text-[#8052ff] text-[13px] font-semibold tracking-wider uppercase block mb-3">
          ✦ تواصل مع فريق المبيعات والاستشارات
        </span>
        <h1 className="text-[40px] font-normal tracking-tight text-white mb-4">
          كيف يمكننا مساعدة متجرك في النمو؟
        </h1>
        <p className="text-[16px] font-extralight text-[#9a9a9a] mb-10 leading-relaxed">
          سواء كنت تريد ربط واتساب أو إنستجرام، أو تحتاج حلاً مخصصاً للشركات الكبرى، فريقنا جاهز للتواصل معك خلال ساعتين.
        </p>

        {submitted ? (
          <div className="p-8 rounded-[24px] bg-[#070707] border border-[#15846e]/40 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#15846e]/20 text-[#15846e] text-[24px] mx-auto flex items-center justify-center">
              ✓
            </div>
            <h3 className="text-[20px] font-normal text-white">تم استلام رسالتك بنجاح!</h3>
            <p className="text-[14px] font-extralight text-[#9a9a9a]">
              سيقوم أحد مستشارينا بالتواصل معك عبر واتساب لتحديد موعد العرض التجريبي وتفعيل حسابك.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[13px] text-[#9a9a9a] mb-2 font-extralight">اسمك أو اسم المتجر</label>
              <input
                required
                type="text"
                placeholder="مثال: متجر لافندر"
                className="w-full bg-[#0a0a0a] border border-[#222222] rounded-[18px] px-5 py-3.5 text-white placeholder-[#555] focus:outline-none focus:border-[#8052ff]"
              />
            </div>

            <div>
              <label className="block text-[13px] text-[#9a9a9a] mb-2 font-extralight">رقم الواتساب للتواصل</label>
              <input
                required
                type="tel"
                placeholder="010XXXXXXXX"
                className="w-full bg-[#0a0a0a] border border-[#222222] rounded-[18px] px-5 py-3.5 text-white placeholder-[#555] focus:outline-none focus:border-[#8052ff]"
              />
            </div>

            <div>
              <label className="block text-[13px] text-[#9a9a9a] mb-2 font-extralight">حجم المحادثات الشهرية التقديري</label>
              <select className="w-full bg-[#0a0a0a] border border-[#222222] rounded-[18px] px-5 py-3.5 text-white focus:outline-none focus:border-[#8052ff]">
                <option value="1">أقل من 1,000 محادثة شهرياً</option>
                <option value="2">من 1,000 إلى 5,000 محادثة</option>
                <option value="3">أكثر من 10,000 محادثة شهرياً</option>
              </select>
            </div>

            <div>
              <label className="block text-[13px] text-[#9a9a9a] mb-2 font-extralight">رسالتك أو استفسارك</label>
              <textarea
                rows={4}
                placeholder="أخبرنا عن التحديات التي تواجهها في خدمة العملاء أو تحويلات إنستاباي..."
                className="w-full bg-[#0a0a0a] border border-[#222222] rounded-[18px] px-5 py-3.5 text-white placeholder-[#555] focus:outline-none focus:border-[#8052ff]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#8052ff] hover:bg-[#7042f0] text-white text-[15px] font-medium py-4 rounded-[22px] transition-all hover:scale-[1.01]"
            >
              إرسال الطلب وحجز استشارة سريعة
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
