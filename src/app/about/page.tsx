"use client";

import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#000000] text-white font-sans selection:bg-[#8052ff] selection:text-white">
      {/* Header */}
      <header className="border-b border-[#171717] px-6 py-6 max-w-[1280px] mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-5 h-5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <polygon points="12 2 22 22 2 22" fill="#8052ff" />
            </svg>
          </div>
          <span className="text-[16px] font-normal tracking-tight text-white">PR Agent</span>
        </Link>
        <div className="flex items-center gap-6 text-[14px]">
          <Link href="/pricing" className="text-[#9a9a9a] hover:text-white transition-colors">الأسعار</Link>
          <Link href="/contact" className="text-[#9a9a9a] hover:text-white transition-colors">تواصل معنا</Link>
          <Link href="/inbox" className="bg-[#8052ff] text-white px-5 py-2 rounded-[24px]">دخول المنصة</Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-[800px] mx-auto px-6 py-20 text-right space-y-12">
        <div>
          <span className="text-[#ffb829] text-[13px] font-semibold tracking-wider uppercase block mb-3">
            ✦ عن المنصة ورؤيتنا
          </span>
          <h1 className="text-[44px] font-normal tracking-tight text-white leading-tight">
            بناء القوة العاملة الذكية للتجارة الإلكترونية في الشرق الأوسط
          </h1>
        </div>

        <div className="space-y-6 text-[17px] font-extralight text-[#bdbdbd] leading-relaxed">
          <p>
            تأسست <strong>PR Agent</strong> لتغيير قواعد اللعبة في التجارة الاجتماعية (Social Commerce). نعلم حجم المعاناة التي يواجهها أصحاب المتاجر في الرد اليدوي على آلاف تعليقات إنستجرام، وتأخير الرد في واتساب، ومخاطر الاحتيال في إيصالات التحويل البنكي وإنستاباي.
          </p>
          <p>
            بدلاً من بناء روبوتات محادثة تقليدية ومملة، ابتكرنا <strong>أسطولاً مستقلاً من 10 إيجنتس أذكياء</strong>، يتحدثون باللهجة المصرية الحية، ويحللون الصور والإيصالات بالرؤية البصرية، ويردون في أجزاء من الثانية لضمان ألا تضيع أي فرصة بيع.
          </p>
        </div>

        <div className="pt-8 border-t border-[#171717] grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-[20px] bg-[#070707] border border-[#1a1a1a]">
            <span className="text-[32px] font-normal text-[#8052ff] block">3 ثوانٍ</span>
            <span className="text-[13px] text-[#9a9a9a] font-extralight mt-1 block">متوسط زمن الرد على التعليقات</span>
          </div>
          <div className="p-6 rounded-[20px] bg-[#070707] border border-[#1a1a1a]">
            <span className="text-[32px] font-normal text-[#15846e] block">99.4%</span>
            <span className="text-[13px] text-[#9a9a9a] font-extralight mt-1 block">دقة فحص تحويلات إنستاباي</span>
          </div>
          <div className="p-6 rounded-[20px] bg-[#070707] border border-[#1a1a1a]">
            <span className="text-[32px] font-normal text-[#ffb829] block">0$</span>
            <span className="text-[13px] text-[#9a9a9a] font-extralight mt-1 block">تكلفة الـ API مع الـ Router الذكي</span>
          </div>
        </div>
      </main>
    </div>
  );
}
