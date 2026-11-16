"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Calendar, ArrowRight, ShieldCheck, Dumbbell, Zap } from "lucide-react";

export default function BookingPage() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        styles: {
          branding: { brandColor: "#7C3AED" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="min-h-screen bg-[#07040D] text-white flex flex-col justify-between font-sans selection:bg-purple-900 selection:text-white" dir="rtl">
      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between border-b border-white/[0.06] bg-[#0A0514]/80 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#9333EA] flex items-center justify-center shadow-lg shadow-purple-900/30">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-heading font-black text-lg tracking-wider text-white">
              COACH<span className="text-[#A78BFA]">PRB</span>
            </span>
            <span className="text-[10px] text-purple-300 block -mt-1 font-medium">حجز مكالمة التقييم الرياضي</span>
          </div>
        </Link>
        <Link
          href="/quiz"
          className="text-xs text-slate-400 hover:text-white transition px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 flex items-center gap-1.5"
        >
          <span>استبيان التقييم</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </header>

      {/* Main Booking Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="text-center space-y-2 max-w-lg mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800/40 text-purple-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            مكالمة تقييم مجانية (15 دقيقة عبر Google Meet / واتساب)
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            اختر الموعد الأنسب لمحادثة الكابتن
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            اختر اليوم والساعة المتاحة لك لمراجعة تفاصيل تدريبك ونظامك الغذائي والإجابة عن أي استفسار قبل الاشتراك.
          </p>
        </div>

        {/* Cal.com Embedded Booker */}
        <div className="bg-[#0E081D] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl p-2 sm:p-4 min-h-[550px]">
          <Cal
            calLink="coachprb/assessment-15min"
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{ layout: "month_view", theme: "dark" }}
          />
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs text-slate-400">
          <div className="bg-[#150D2A] p-3 rounded-xl border border-white/5 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>مراجعة شخصية مباشرة من الكابتن</span>
          </div>
          <div className="bg-[#150D2A] p-3 rounded-xl border border-white/5 flex items-center justify-center gap-2">
            <Dumbbell className="w-4 h-4 text-purple-400" />
            <span>برنامج مخصص حسب إصاباتك وهدفك</span>
          </div>
          <div className="bg-[#150D2A] p-3 rounded-xl border border-white/5 flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>بدون أي التزام بالدفع أثناء المكالمة</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-white/[0.04] text-center text-[11px] text-slate-500">
        CoachPRB — سجّل رقمك. غيّر جسمك. © 2026 جميع الحقوق محفوظة.
      </footer>
    </div>
  );
}
