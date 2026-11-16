"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
}

export default function MasterMarketingLandingPage() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showCalModal, setShowCalModal] = useState(false);

  useEffect(() => {
    const colors = ["#8052ff", "#ffb829", "#15846e", "#a855f7", "#38bdf8", "#ffffff"];
    const temp: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      temp.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
      });
    }
    setParticles(temp);
  }, []);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#000000] text-[#ffffff] selection:bg-[#8052ff] selection:text-white relative overflow-hidden font-sans"
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

      {/* 2. Top Navigation Bar */}
      <header className="relative z-20 max-w-[1280px] mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <polygon points="12 2 22 22 2 22" fill="#8052ff" />
            </svg>
          </div>
          <span className="text-[18px] font-normal tracking-tight text-[#ffffff]">PR Agent</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/flows" className="text-[14px] text-[#9a9a9a] hover:text-[#ffffff] tracking-[0.025em] uppercase transition-colors">
            المسارات التفاعلية
          </Link>
          <Link href="/pipeline" className="text-[14px] text-[#9a9a9a] hover:text-[#ffffff] tracking-[0.025em] uppercase transition-colors">
            إدارة المبيعات (CRM)
          </Link>
          <Link href="/fleet" className="text-[14px] text-[#9a9a9a] hover:text-[#ffffff] tracking-[0.025em] uppercase transition-colors">
            أسطول الإيجنتس
          </Link>
          <Link href="/pricing" className="text-[14px] text-[#9a9a9a] hover:text-[#ffffff] tracking-[0.025em] uppercase transition-colors">
            الأسعار
          </Link>
          <Link href="/about" className="text-[14px] text-[#9a9a9a] hover:text-[#ffffff] tracking-[0.025em] uppercase transition-colors">
            عن المنصة
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowCalModal(true)}
            className="hidden sm:inline-flex text-[14px] text-[#ffb829] border border-[#ffb829]/40 hover:bg-[#ffb829]/10 px-5 py-2.5 rounded-[24px] transition-all"
          >
            احجز ديمو 📅
          </button>
          <Link
            href="/inbox"
            className="inline-flex items-center justify-center bg-[#8052ff] hover:bg-[#7042f0] text-[#ffffff] text-[14px] font-medium px-6 py-2.5 rounded-[24px] transition-all hover:scale-[1.02]"
          >
            دخول المنصة
          </Link>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="relative z-10 max-w-[1280px] mx-auto px-6 pt-16 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-7 space-y-8 text-right">
            <div className="inline-block">
              <span className="text-[#ffb829] text-[13px] font-semibold tracking-[0.05em] uppercase">
                ✦ الجيل القادم من التجارة الاجتماعية بالذكاء الاصطناعي
              </span>
            </div>

            <h1 className="text-[46px] sm:text-[64px] lg:text-[76px] font-normal leading-[1.05] tracking-[-0.04em] text-[#ffffff]">
              حوّل كل تعليق ومحادثة إلى مبيعات مؤكدة.
            </h1>

            <p className="text-[18px] lg:text-[20px] font-extralight leading-[1.6] text-[#bdbdbd] max-w-[580px]">
              أسطول متكامل من 10 إيجنتس أذكياء يردون فورياً على تعليقات إنستجرام (Comment-to-DM)،
              يفحصون تحويلات إنستاباي بالرؤية البصرية، ويديرون محادثات واتساب دون توقف.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <Link
                href="/inbox"
                className="bg-[#8052ff] hover:bg-[#7241f3] text-[#ffffff] text-[15px] font-medium px-8 py-4 rounded-[24px] transition-all hover:scale-[1.02]"
              >
                جرب المنصة الآن مجاناً
              </Link>
              <button
                onClick={() => setShowCalModal(true)}
                className="text-[#9a9a9a] hover:text-[#ffffff] text-[15px] transition-colors"
              >
                احجز عرضاً توضيحياً عبر Cal.com ←
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              <div className="absolute w-72 h-72 rounded-full bg-[#8052ff]/10 blur-3xl pointer-events-none animate-pulse" />
              
              <div className="relative z-10 w-full space-y-4">
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

                <div className="p-5 rounded-[24px] bg-[#000000] border border-[#222222] hover:border-[#15846e]/50 transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-[#15846e] uppercase tracking-wider">
                      Open-Source WhatsApp (Evolution API)
                    </span>
                    <span className="text-[11px] text-[#9a9a9a]">ربط مباشر QR</span>
                  </div>
                  <p className="text-[13px] text-[#bdbdbd] font-extralight">
                    بدون تعقيدات توثيق Meta، ربط فوري لأي رقم واتساب محلي.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Features Section */}
      <section className="border-t border-[#141414] py-24 bg-[#030303]">
        <div className="max-w-[1280px] mx-auto px-6 text-right">
          <span className="text-[#8052ff] text-[13px] font-semibold uppercase tracking-wider block mb-3">
            ✦ الميزات الأساسية والقدرات الفائقة
          </span>
          <h2 className="text-[38px] font-normal tracking-tight text-white mb-16">
            كل ما تحتاجه لإدارة التجارة الإلكترونية في مكان واحد
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-[24px] bg-[#000000] border border-[#1a1a1a] hover:border-[#8052ff]/40 transition-all space-y-4">
              <div className="text-[28px]">🤖</div>
              <h3 className="text-[20px] font-normal text-white">أسطول 10 إيجنتس مستقلين</h3>
              <p className="text-[14px] font-extralight text-[#9a9a9a] leading-relaxed">
                لكل مهمة إيجنت متخصص: سارة للمبيعات، منى لإنستجرام، كريم لفحص إنستاباي، وطارق لاسترجاع السلات المتروكة.
              </p>
            </div>

            <div className="p-8 rounded-[24px] bg-[#000000] border border-[#1a1a1a] hover:border-[#ffb829]/40 transition-all space-y-4">
              <div className="text-[28px]">🔍</div>
              <h3 className="text-[20px] font-normal text-white">تدقيق إنستاباي بالرؤية البصرية</h3>
              <p className="text-[14px] font-extralight text-[#9a9a9a] leading-relaxed">
                محرك OCR ورؤية بصرية متقدم يمنع عمليات النصب والإيصالات المعدلة بالفوتوشوب بدقة 99.4%.
              </p>
            </div>

            <div className="p-8 rounded-[24px] bg-[#000000] border border-[#1a1a1a] hover:border-[#15846e]/40 transition-all space-y-4">
              <div className="text-[28px]">📊</div>
              <h3 className="text-[20px] font-normal text-white">لوحة كانبان CRM متكاملة</h3>
              <p className="text-[14px] font-extralight text-[#9a9a9a] leading-relaxed">
                متابعة العملاء من أول تعليق حتى استلام شركة الشحن وتأكيد رضاء العميل، دون فقدان أي عميل محتمل.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section className="py-24 max-w-[1280px] mx-auto px-6 text-right">
        <span className="text-[#ffb829] text-[13px] font-semibold uppercase tracking-wider block mb-3">
          ✦ كيف تعمل المنظومة؟
        </span>
        <h2 className="text-[38px] font-normal tracking-tight text-white mb-16">
          3 خطوات بسيطة لمضاعفة مبيعات متجرك
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <span className="text-[44px] font-mono text-[#8052ff] block">01</span>
            <h3 className="text-[20px] font-normal text-white">اربط حساباتك في دقيقة</h3>
            <p className="text-[14px] font-extralight text-[#9a9a9a] leading-relaxed">
              اربط صفحة إنستجرام ورقم واتساب عبر QR Code مباشر دون اشتراكات إضافية في ManyChat.
            </p>
          </div>

          <div className="space-y-4">
            <span className="text-[44px] font-mono text-[#ffb829] block">02</span>
            <h3 className="text-[20px] font-normal text-white">درّب الإيجنتس على منتجاتك</h3>
            <p className="text-[14px] font-extralight text-[#9a9a9a] leading-relaxed">
              ارفع كتالوج منتجاتك وأسعارك وسياسة الشحن، وسيقوم الإيجنتس بالتحدث بأسلوب علامتك التجارية.
            </p>
          </div>

          <div className="space-y-4">
            <span className="text-[44px] font-mono text-[#15846e] block">03</span>
            <h3 className="text-[20px] font-normal text-white">استقبل الأوردرات المؤكدة</h3>
            <p className="text-[14px] font-extralight text-[#9a9a9a] leading-relaxed">
              تابع في لوحة التحكم وصول الطلبات المؤكدة والمدفوعة عبر إنستاباي جاهزة للتسليم فوراً.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="border-t border-[#141414] py-24 bg-[#030303]">
        <div className="max-w-[1280px] mx-auto px-6 text-right">
          <span className="text-[#15846e] text-[13px] font-semibold uppercase tracking-wider block mb-3">
            ✦ آراء شركاء النجاح
          </span>
          <h2 className="text-[38px] font-normal tracking-tight text-white mb-16">
            ماذا يقول أصحاب المتاجر الإلكترونية عن PR Agent؟
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-[24px] bg-[#000000] border border-[#1a1a1a] space-y-4">
              <p className="text-[14px] font-extralight text-[#bdbdbd] leading-relaxed">
                &quot;كنا بنضيع نص العملاء على إنستجرام بسبب تأخير الرد. بعد تفعيل Comment-to-DM المبيعات زادت بنسبة 45% في أول أسبوعين!&quot;
              </p>
              <div className="pt-4 border-t border-[#141414]">
                <span className="text-[14px] font-normal text-white block">م/ أحمد زهران</span>
                <span className="text-[12px] text-[#9a9a9a] font-extralight block">مؤسس براند ملابس بالقاهرة</span>
              </div>
            </div>

            <div className="p-8 rounded-[24px] bg-[#000000] border border-[#1a1a1a] space-y-4">
              <p className="text-[14px] font-extralight text-[#bdbdbd] leading-relaxed">
                &quot;فحص إيصالات إنستاباي أنقذنا من أكتر من 20 عملية نصب بإيصالات فيك. إيجنت الرؤية البصرية دقيق بشكل لا يصدق.&quot;
              </p>
              <div className="pt-4 border-t border-[#141414]">
                <span className="text-[14px] font-normal text-white block">سارة خليل</span>
                <span className="text-[12px] text-[#9a9a9a] font-extralight block">مديرة مبيعات متجر إلكترونيات</span>
              </div>
            </div>

            <div className="p-8 rounded-[24px] bg-[#000000] border border-[#1a1a1a] space-y-4">
              <p className="text-[14px] font-extralight text-[#bdbdbd] leading-relaxed">
                &quot;وفرنا راتب 3 موظفين خدمة عملاء ليلية، والـ Uptime مستمر 24 ساعة دون أي تأخير أو شكوى.&quot;
              </p>
              <div className="pt-4 border-t border-[#141414]">
                <span className="text-[14px] font-normal text-white block">كريم عثمان</span>
                <span className="text-[12px] text-[#9a9a9a] font-extralight block">صاحب متجر مستحضرات تجميل</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Cal.com Booking Modal / Embed */}
      {showCalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#070707] border border-[#222222] rounded-[28px] max-w-[600px] w-full p-8 text-right relative space-y-6">
            <button
              onClick={() => setShowCalModal(false)}
              className="absolute left-6 top-6 text-[#9a9a9a] hover:text-white text-[20px]"
            >
              ✕
            </button>
            
            <div className="space-y-2">
              <span className="text-[#8052ff] text-[12px] font-semibold uppercase tracking-wider">
                ✦ Cal.com Integration
              </span>
              <h3 className="text-[26px] font-normal text-white">احجز جلسة عرض توضيحي مباشرة (Demo Call)</h3>
              <p className="text-[14px] font-extralight text-[#9a9a9a]">
                اختر الوقت المناسب لك وسيقوم خبير التجارة الإلكترونية بعرض أسطول الإيجنتس معك على متجرك مباشرة.
              </p>
            </div>

            <div className="p-6 rounded-[20px] bg-[#000000] border border-[#171717] space-y-4">
              <div>
                <label className="block text-[12px] text-[#9a9a9a] mb-1 font-extralight">اسمك ورقم الواتساب</label>
                <input
                  type="text"
                  placeholder="010XXXXXXXX"
                  className="w-full bg-[#0a0a0a] border border-[#222222] rounded-[16px] px-4 py-3 text-white placeholder-[#555] text-[13px] focus:outline-none focus:border-[#8052ff]"
                />
              </div>

              <div>
                <label className="block text-[12px] text-[#9a9a9a] mb-1 font-extralight">الموعد المفضل</label>
                <select className="w-full bg-[#0a0a0a] border border-[#222222] rounded-[16px] px-4 py-3 text-white text-[13px] focus:outline-none focus:border-[#8052ff]">
                  <option>اليوم - الساعة 4:00 عصراً</option>
                  <option>اليوم - الساعة 7:00 مساءً</option>
                  <option>غداً - الساعة 12:00 ظهراً</option>
                  <option>غداً - الساعة 5:00 عصراً</option>
                </select>
              </div>

              <button
                onClick={() => {
                  alert("تم تسجيل موعد الديمو عبر Cal.com بنجاح! ستصلك رسالة تأكيد عبر واتساب ورابط Google Meet.");
                  setShowCalModal(false);
                }}
                className="w-full bg-[#8052ff] hover:bg-[#7042f0] text-white text-[14px] font-medium py-3.5 rounded-[20px] transition-all"
              >
                تأكيد حجز الموعد الآن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Comprehensive Footer */}
      <footer className="border-t border-[#141414] py-16 bg-[#000000]">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-right text-[13px]">
          <div className="space-y-4">
            <span className="text-[17px] font-normal text-white block">PR Agent</span>
            <p className="text-[#9a9a9a] font-extralight leading-relaxed">
              المنصة الرائدة لأتمتة خدمة العملاء والتجارة الذكية بالذكاء الاصطناعي في الشرق الأوسط.
            </p>
          </div>

          <div className="space-y-2.5">
            <span className="text-white font-normal block mb-2">المنتج والميزات</span>
            <Link href="/flows" className="text-[#9a9a9a] hover:text-white block transition-colors">المسارات التفاعلية (Typebot)</Link>
            <Link href="/pipeline" className="text-[#9a9a9a] hover:text-white block transition-colors">إدارة المبيعات (CRM)</Link>
            <Link href="/fleet" className="text-[#9a9a9a] hover:text-white block transition-colors">أسطول الـ 10 إيجنتس</Link>
            <Link href="/pricing" className="text-[#9a9a9a] hover:text-white block transition-colors">حساب الـ ROI والأسعار</Link>
          </div>

          <div className="space-y-2.5">
            <span className="text-white font-normal block mb-2">التكاملات والربط</span>
            <span className="text-[#9a9a9a] block">Instagram Graph API</span>
            <span className="text-[#9a9a9a] block">Evolution API (WhatsApp)</span>
            <span className="text-[#9a9a9a] block">InstaPay Vision Audit</span>
            <span className="text-[#9a9a9a] block">Cal.com Scheduler</span>
          </div>

          <div className="space-y-2.5">
            <span className="text-white font-normal block mb-2">الشركة والدعم</span>
            <Link href="/about" className="text-[#9a9a9a] hover:text-white block transition-colors">عن المنصة</Link>
            <Link href="/contact" className="text-[#9a9a9a] hover:text-white block transition-colors">تواصل معنا</Link>
            <Link href="/privacy" className="text-[#9a9a9a] hover:text-white block transition-colors">سياسة الخصوصية</Link>
            <Link href="/terms" className="text-[#9a9a9a] hover:text-white block transition-colors">الشروط والأحكام</Link>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 pt-12 mt-12 border-t border-[#111111] flex flex-col md:flex-row items-center justify-between text-[12px] text-[#666666]">
          <span>© 2026 PR Agent Inc. جميع الحقوق محفوظة.</span>
          <span>صُمم بالذكاء الاصطناعي وهندسة التجارة الإلكترونية الفائقة.</span>
        </div>
      </footer>
    </div>
  );
}
