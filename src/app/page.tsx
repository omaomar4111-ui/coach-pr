"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  rotation: number;
}

export default function DalaDarkLandingPage() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Colors matching Dala tokens: Electric Iris (#8052ff), Saffron Spark (#ffb829), Deep Verdant (#15846e), White (#ffffff)
    const colors = ["#8052ff", "#ffb829", "#15846e", "#a855f7", "#38bdf8", "#ffffff"];
    const temp: Particle[] = [];
    for (let i = 0; i < 45; i++) {
      temp.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 0.05,
        speedY: (Math.random() - 0.5) * 0.05,
        rotation: Math.random() * 360,
      });
    }
    setParticles(temp);
  }, []);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#000000] text-[#ffffff] selection:bg-[#8052ff] selection:text-white relative overflow-hidden font-sans"
      style={{
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* 1. Ambient Floating Particle Constellation Background (Dala signature) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        {particles.map((p, idx) => (
          <div
            key={idx}
            className="absolute transition-transform duration-1000"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: `rotate(${p.rotation}deg)`,
            }}
          >
            {/* Outlined tiny triangular glyph */}
            <svg
              width={p.size * 2}
              height={p.size * 2}
              viewBox="0 0 24 24"
              fill="none"
              stroke={p.color}
              strokeWidth="1.5"
            >
              <polygon points="12 2 22 22 2 22" />
            </svg>
          </div>
        ))}
      </div>

      {/* 2. Minimalist Dala Navigation Bar */}
      <header className="relative z-20 max-w-[1280px] mx-auto px-6 py-8 flex items-center justify-between">
        {/* Brand Logo Lockup */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <polygon
                points="12 2 22 22 2 22"
                fill="url(#dalaLogoGradient)"
              />
              <defs>
                <linearGradient id="dalaLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8052ff" />
                  <stop offset="100%" stopColor="#15846e" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="text-[17px] font-normal tracking-tight text-[#ffffff]">
            PR Agent
          </span>
        </div>

        {/* Ghost Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/inbox"
            className="text-[14px] text-[#9a9a9a] hover:text-[#ffffff] tracking-[0.025em] uppercase transition-colors"
          >
            صندوق المحادثات
          </Link>
          <Link
            href="/pipeline"
            className="text-[14px] text-[#9a9a9a] hover:text-[#ffffff] tracking-[0.025em] uppercase transition-colors"
          >
            إدارة المبيعات (CRM)
          </Link>
          <Link
            href="/fleet"
            className="text-[14px] text-[#9a9a9a] hover:text-[#ffffff] tracking-[0.025em] uppercase transition-colors"
          >
            أسطول الإيجنتس
          </Link>
          <Link
            href="/pricing"
            className="text-[14px] text-[#9a9a9a] hover:text-[#ffffff] tracking-[0.025em] uppercase transition-colors"
          >
            الباقات والأسعار
          </Link>
        </nav>

        {/* Primary Action Violet Pill Button */}
        <div>
          <Link
            href="/inbox"
            className="inline-flex items-center justify-center bg-[#8052ff] hover:bg-[#7042f0] text-[#ffffff] text-[14px] font-medium tracking-[0.025em] px-6 py-3 rounded-[24px] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            دخول المنصة
          </Link>
        </div>
      </header>

      {/* 3. Hero Section (Two-Column Asymmetric Void Canvas) */}
      <main className="relative z-10 max-w-[1280px] mx-auto px-6 pt-16 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (Text & CTAs) */}
          <div className="lg:col-span-7 space-y-8 text-right">
            {/* Amber Spark Label */}
            <div className="inline-block">
              <span className="text-[#ffb829] text-[13px] font-semibold tracking-[0.05em] uppercase">
                ✦ ذكاء التجارة الإلكترونية وخدمة العملاء
              </span>
            </div>

            {/* Giant Monolithic Sculptural Headline (Weight 400 - Scale creates hierarchy) */}
            <h1 className="text-[46px] sm:text-[64px] lg:text-[76px] font-normal leading-[1.05] tracking-[-0.04em] text-[#ffffff]">
              ضاعف مبيعاتك مع أسطول إيجنتس أذكياء.
            </h1>

            {/* Airy Ultra-light Body Copy */}
            <p className="text-[18px] lg:text-[20px] font-extralight leading-[1.6] text-[#bdbdbd] max-w-[580px]">
              تحويل تلقائي لتعليقات إنستجرام إلى مبيعات عبر الرسائل الخاصة (Comment-to-DM)،
              فحص فوري لإيصالات إنستاباي بالرؤية البصرية، وأتمتة كاملة لطلبات واتساب
              بأقل تكلفة تشغيل.
            </p>

            {/* Single Violet Pill Action + Secondary Ghost Link */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <Link
                href="/settings"
                className="bg-[#8052ff] hover:bg-[#7241f3] text-[#ffffff] text-[15px] font-medium px-8 py-4 rounded-[24px] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                ابدأ تجربتك المجانية
              </Link>
              <Link
                href="/pricing"
                className="text-[#9a9a9a] hover:text-[#ffffff] text-[15px] transition-colors"
              >
                حساب العائد على الاستثمار (ROI) ←
              </Link>
            </div>
          </div>

          {/* Right Column (The Procedural Constellation & Intelligence Core) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              
              {/* Central Glowing Void Core */}
              <div className="absolute w-72 h-72 rounded-full bg-[#8052ff]/10 blur-3xl pointer-events-none animate-pulse" />
              
              {/* Visualized Neural Cluster Cards floating on black */}
              <div className="relative z-10 w-full space-y-4">
                
                {/* Floating Node 1: Instagram Comment-to-DM Live */}
                <div className="p-5 rounded-[24px] bg-[#000000] border border-[#222222] hover:border-[#8052ff]/50 transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-[#8052ff] uppercase tracking-wider">
                      Instagram Comment-to-DM
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#15846e] animate-ping" />
                  </div>
                  <p className="text-[14px] text-[#ffffff] font-normal">
                    &quot;بكام وسعر الشحن كام؟&quot;
                  </p>
                  <p className="text-[13px] text-[#9a9a9a] font-extralight">
                    ← تم إرسال رد فوري في الـ DM مع كود الخصم ورابط الطلب.
                  </p>
                </div>

                {/* Floating Node 2: InstaPay Vision Audit */}
                <div className="p-5 rounded-[24px] bg-[#000000] border border-[#222222] hover:border-[#ffb829]/50 transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-[#ffb829] uppercase tracking-wider">
                      InstaPay Receipt Vision
                    </span>
                    <span className="text-[11px] text-[#bdbdbd]">دقة 99.4%</span>
                  </div>
                  <p className="text-[14px] text-[#ffffff] font-normal">
                    تحقق تلقائي من رقم المعاملة والمبلغ (1,450 ج.م)
                  </p>
                  <p className="text-[13px] text-[#15846e] font-extralight">
                    ✓ إيصال حقيقي معتمد، وتحديث حالة الأوردر للمخزن.
                  </p>
                </div>

                {/* Floating Node 3: Smart Multi-LLM Router */}
                <div className="p-5 rounded-[24px] bg-[#000000] border border-[#222222] hover:border-[#15846e]/50 transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-[#15846e] uppercase tracking-wider">
                      Smart LLM Router (0$ Cost)
                    </span>
                    <span className="text-[11px] text-[#9a9a9a]">Llama 3.1 & Gemini</span>
                  </div>
                  <p className="text-[13px] text-[#bdbdbd] font-extralight">
                    توجيه ذكي وفوري بين النماذج المجانية والمتقدمة مع 100% Uptime.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* 4. Asymmetric Secondary Section (Dala Zigzag Rhythm) */}
        <div className="mt-32 pt-20 border-t border-[#111111] grid grid-cols-1 md:grid-cols-3 gap-12 text-right">
          <div className="space-y-3">
            <span className="text-[#8052ff] text-[13px] font-semibold uppercase tracking-wider">01. الاستحواذ اللحظي</span>
            <h3 className="text-[24px] font-normal text-[#ffffff] tracking-tight">تحويل التعليقات لمبيعات</h3>
            <p className="text-[15px] font-extralight text-[#9a9a9a] leading-relaxed">
              لا تفوت أي عميل علّق على ريلز أو بوست. المنصة ترد عليه في الـ DM خلال 3 ثوانٍ برابط الدفع السريع.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-[#ffb829] text-[13px] font-semibold uppercase tracking-wider">02. الرؤية البصرية</span>
            <h3 className="text-[24px] font-normal text-[#ffffff] tracking-tight">كشف إيصالات إنستاباي المزيفة</h3>
            <p className="text-[15px] font-extralight text-[#9a9a9a] leading-relaxed">
              إيجنت الرؤية البصرية يفحص مئات الإيصالات ويطابق الأرقام والحسابات ويمنع الاحتيال بدقة بالغة.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-[#15846e] text-[13px] font-semibold uppercase tracking-wider">03. إدارة الأسطول</span>
            <h3 className="text-[24px] font-normal text-[#ffffff] tracking-tight">10 إيجنتس متخصصين</h3>
            <p className="text-[15px] font-extralight text-[#9a9a9a] leading-relaxed">
              فريق عمل متكامل يعمل على مدار 24 ساعة: سارة للمبيعات، طارق للتحصيلات، وكريم للمتابعة والتأكيد.
            </p>
          </div>
        </div>
      </main>

      {/* 5. Clean Footer on Void */}
      <footer className="border-t border-[#111111] py-12 px-6 max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between text-[13px] text-[#9a9a9a] gap-4">
        <div>
          © 2026 PR Agent. جميع الحقوق محفوظة.
        </div>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
          <Link href="/terms" className="hover:text-white transition-colors">الشروط والأحكام</Link>
          <Link href="/inbox" className="hover:text-white transition-colors">لوحة التحكم</Link>
        </div>
      </footer>
    </div>
  );
}
