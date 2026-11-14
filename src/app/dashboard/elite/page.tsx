"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Flame, 
  Dumbbell, 
  Pill, 
  Award, 
  ArrowLeft, 
  Zap, 
  CheckCircle2, 
  Clock, 
  Droplet, 
  AlertTriangle,
  Sparkles,
  Info
} from "lucide-react";
import { 
  SUPPLEMENTS_DATABASE, 
  HANY_RAMBOD_FST7_SYSTEM, 
  SupplementItem, 
  HanyRambodProtocol 
} from "@/lib/supplementsAndHanyData";

export default function MasterBodybuildingPage() {
  const [activeTab, setActiveTab] = useState<"fst7" | "supplements">("fst7");
  const [selectedProtocol, setSelectedProtocol] = useState<HanyRambodProtocol>(
    HANY_RAMBOD_FST7_SYSTEM[0]
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredSupplements = selectedCategory === "all"
    ? SUPPLEMENTS_DATABASE
    : SUPPLEMENTS_DATABASE.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0A0612] text-white flex flex-col font-sans" dir="rtl">
      {/* Header */}
      <header className="bg-[#110A1E] border-b border-purple-900/30 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2">
            <img src="/pr-logo.png" alt="CoachPR" style={{ height: "34px", width: "auto" }} />
            <span className="font-heading font-black text-xl text-white">Coach<span className="text-[#A78BFA]">PRB</span></span>
          </Link>
          <span className="hidden sm:inline-block px-2.5 py-1 text-[11px] font-bold bg-[#7C3AED]/20 text-[#A78BFA] border border-purple-500/30 rounded-full">
            Elite Bodybuilding Hub · بروتوكولات هاني رامبود وموسوعة المكملات
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard/anatomy" className="text-xs bg-[#17102A] hover:bg-[#7C3AED]/30 text-purple-300 border border-purple-600/30 px-3 py-2 rounded-xl font-bold transition flex items-center gap-1.5">
            <Dumbbell className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">تشريح العضلات</span>
          </Link>
          <Link href="/dashboard" className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-bold transition">
            <ArrowLeft className="w-4 h-4" />
            <span>لوحة التحكم</span>
          </Link>
        </div>
      </header>

      {/* Hero Header */}
      <div className="bg-[#110A1E]/60 border-b border-purple-900/30 py-8 px-6 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/20 border border-purple-500/30 text-[#A78BFA] text-xs font-bold">
          <Award className="w-4 h-4" />
          <span>منهجيات أبطال مستر أولمبيا (Chris Bumstead, Phil Heath, Jay Cutler)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black font-heading text-white">
          منظومة كمال الأجسام الاحترافية: هاني رامبود &amp; المكملات
        </h1>
        <p className="text-xs text-slate-400 max-w-2xl mx-auto">
          تم تصميم هذا الركن بعقلية كابتن وبطل كمال أجسام: تطبيق علمي لأقوى بروتوكول تضخيم في العالم FST-7، مع دليل مكملات غذائية مبني على الدليل العلمي بالجرامات ومواعيد الامتصاص.
        </p>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-2 pt-2">
          <button
            onClick={() => setActiveTab("fst7")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "fst7"
                ? "bg-[#7C3AED] text-white shadow-lg shadow-purple-950/60"
                : "bg-[#140C24] text-slate-400 hover:text-white border border-purple-900/30"
            }`}
          >
            <Flame className="w-4 h-4 text-orange-400" />
            <span>بروتوكولات هاني رامبود (FST-7 System)</span>
          </button>
          <button
            onClick={() => setActiveTab("supplements")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "supplements"
                ? "bg-[#7C3AED] text-white shadow-lg shadow-purple-950/60"
                : "bg-[#140C24] text-slate-400 hover:text-white border border-purple-900/30"
            }`}
          >
            <Pill className="w-4 h-4 text-purple-400" />
            <span>موسوعة المكملات وصورها العلمية (Supplements)</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        
        {/* ===================== TAB 1: HANY RAMBOD FST-7 ===================== */}
        {activeTab === "fst7" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Muscle Selector */}
            <div className="lg:col-span-4 bg-[#140C24] border border-purple-900/30 rounded-3xl p-5 space-y-3">
              <h2 className="text-sm font-black text-white flex items-center gap-2 pb-2 border-b border-purple-900/30">
                <Dumbbell className="w-4 h-4 text-[#A78BFA]" />
                <span>اختر العضلة المستهدفة بالـ FST-7</span>
              </h2>

              <div className="space-y-2">
                {HANY_RAMBOD_FST7_SYSTEM.map(proto => {
                  const isSelected = selectedProtocol.id === proto.id;
                  return (
                    <button
                      key={proto.id}
                      onClick={() => setSelectedProtocol(proto)}
                      className={`w-full text-right p-3.5 rounded-2xl border transition flex flex-col gap-1 text-xs font-bold ${
                        isSelected
                          ? "bg-[#7C3AED]/20 border-[#7C3AED] text-white shadow-lg shadow-purple-950/40"
                          : "bg-[#110A1E] border-purple-900/20 text-slate-300 hover:border-purple-600/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-white">{proto.muscle}</span>
                        <span className="text-[10px] text-purple-300 bg-purple-950/50 px-2 py-0.5 rounded border border-purple-800/40">FST-7</span>
                      </div>
                      <span className="text-[11px] text-slate-400">{proto.nameEn}</span>
                    </button>
                  );
                })}
              </div>

              {/* Hany Rambod Philosophy Card */}
              <div className="p-4 bg-[#0F081D] rounded-2xl border border-purple-900/40 space-y-2 mt-4">
                <div className="flex items-center gap-2 text-xs font-black text-orange-400">
                  <Zap className="w-4 h-4" />
                  <span>سر الـ "7 مجاميع" الفاشية (Fascia):</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  الغشاء الفاشي هو غلاف مطاطي صلب يحيط بالعضلات. تدريب FST-7 يجمع بين رفع الأوزان الثقيلة في البداية لتنشيط الألياف الميكانيكية، ثم إغراق العضلة بالدم في الـ 7 مجاميع الأخيرة مع راحة 30 ثانية فقط لإجبار الغشاء على التمدد وإتاحة مساحة لتضخيم الألياف.
                </p>
              </div>
            </div>

            {/* Right Detailed Workout Breakdown */}
            <div className="lg:col-span-8 bg-[#140C24] border border-purple-900/30 rounded-3xl p-6 space-y-6">
              <div className="border-b border-purple-900/30 pb-4 space-y-1.5">
                <span className="text-[11px] text-[#A78BFA] font-bold">بروتوكول تفصيلي مكتمل للكابتن واللاعب</span>
                <h3 className="text-xl font-black text-white">{selectedProtocol.nameAr}</h3>
                <p className="text-xs text-slate-400">{selectedProtocol.overview}</p>
              </div>

              {/* Phase 1: Heavy Base Lifts */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>المرحلة الأولى: أوزان ثقيلة وكثافة ألياف (Heavy Base Phase)</span>
                </h4>
                <div className="space-y-2">
                  {selectedProtocol.baseHeavyPhase.map((lift, i) => (
                    <div key={i} className="bg-[#110A1E] p-3.5 rounded-2xl border border-purple-900/30 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white text-sm">{lift.exercise}</div>
                        <div className="text-[11px] text-purple-300 font-mono mt-0.5">{lift.setsReps}</div>
                      </div>
                      <div className="text-[11px] text-slate-400 text-left max-w-xs">{lift.notes}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phase 2: The FST-7 Finisher (The Sevens) */}
              <div className="bg-gradient-to-br from-[#1C0F35] to-[#120A21] p-5 rounded-3xl border-2 border-[#7C3AED] space-y-4 shadow-xl shadow-purple-950/60">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-[#7C3AED] text-white">
                      <Flame className="w-5 h-5 text-orange-300" />
                    </span>
                    <div>
                      <h4 className="text-sm font-black text-white">المرحلة القاتلة: The FST-7 Finisher</h4>
                      <p className="text-[11px] text-purple-300 font-mono">7 مجاميع متتالية · راحة {selectedProtocol.fst7Finisher.restSeconds} ثانية فقط</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-purple-500/20 text-[#A78BFA] border border-purple-400/30 rounded-xl text-xs font-bold">
                    إغراق فاشي أقصى
                  </span>
                </div>

                <div className="bg-[#110A1E]/80 p-4 rounded-2xl border border-purple-900/40 space-y-2">
                  <div className="text-sm font-black text-white">{selectedProtocol.fst7Finisher.exercise}</div>
                  <div className="text-xs text-orange-300 font-bold">
                    {selectedProtocol.fst7Finisher.sets} مجموعات × {selectedProtocol.fst7Finisher.reps} (الراحة: {selectedProtocol.fst7Finisher.restSeconds} ثانية)
                  </div>
                  <div className="text-xs text-slate-300 pt-2 border-t border-purple-900/30 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-[#A78BFA] shrink-0 mt-0.5" />
                    <span><b>تكنيك الشدة في فترة الراحة:</b> {selectedProtocol.fst7Finisher.intensityTechnique}</span>
                  </div>
                </div>

                {/* Coach Quote */}
                <div className="text-[11px] italic text-purple-200/90 bg-[#7C3AED]/10 p-3 rounded-xl border border-purple-500/20">
                  {selectedProtocol.fst7Finisher.hanyRambodQuote} — <span className="font-bold text-white not-italic">هاني رامبود (The Pro Creator)</span>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href="/dashboard/builder"
                className="w-full py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black text-xs rounded-xl shadow-lg shadow-purple-900/40 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>إدراج هذا البروتوكول في جدول العميل المختار</span>
              </Link>
            </div>
          </div>
        )}

        {/* ===================== TAB 2: SUPPLEMENTS ENCYCLOPEDIA ===================== */}
        {activeTab === "supplements" && (
          <div className="space-y-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "جميع المكملات" },
                { id: "protein", label: "البروتينات (Protein)" },
                { id: "creatine", label: "الكرياتين (Creatine)" },
                { id: "preworkout", label: "الطاقة والضخ (Pre-Workout)" },
                { id: "intra", label: "الأحماض الأمينية (EAAs)" },
                { id: "health", label: "الصحة والمفاصل (Health)" }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                    selectedCategory === cat.id
                      ? "bg-[#7C3AED] text-white border-purple-500 shadow"
                      : "bg-[#140C24] text-slate-400 hover:text-white border-purple-900/30"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Supplements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSupplements.map(sup => (
                <div key={sup.id} className="bg-[#140C24] border border-purple-900/30 rounded-3xl overflow-hidden flex flex-col hover:border-purple-600/40 transition group">
                  {/* Image Header */}
                  <div className="relative h-44 w-full bg-[#110A1E] overflow-hidden">
                    <img 
                      src={sup.imageUrl} 
                      alt={sup.nameAr}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140C24] via-transparent to-transparent" />
                    <span className="absolute top-3 right-3 bg-[#7C3AED]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md">
                      {sup.category.toUpperCase()}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-base font-black text-white">{sup.nameAr}</h3>
                      <p className="text-[11px] text-purple-300 font-mono">{sup.nameEn}</p>
                      <p className="text-xs text-slate-400 leading-relaxed">{sup.scientificMechanism}</p>
                    </div>

                    <div className="bg-[#110A1E] p-3 rounded-2xl border border-purple-900/30 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Clock className="w-3.5 h-3.5 text-[#A78BFA] shrink-0" />
                        <span><b>التوقيت:</b> {sup.timing}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Droplet className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span><b>الجرعة اليومية:</b> {sup.dosage}</span>
                      </div>
                    </div>

                    {/* Key Benefits */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>الفوائد الرئيسية:</span>
                      </div>
                      <ul className="text-[11px] text-slate-300 space-y-1">
                        {sup.benefits.map((b, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-[#A78BFA]">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Caution Alert & Affiliate / Discount Code Block */}
                    {sup.caution && (
                      <div className="p-2.5 rounded-xl bg-orange-950/20 border border-orange-900/30 text-[10px] text-orange-300 flex items-start gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                        <span>{sup.caution}</span>
                      </div>
                    )}

                    {/* Coach Recommendation, Purchase Link & Copy Discount Code */}
                    {sup.purchaseUrl && (
                      <div className="pt-2 border-t border-purple-900/30 space-y-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#A78BFA] font-bold">كود خصم الكوتش:</span>
                          <span className="text-emerald-400 font-mono font-bold">{sup.discountPercentage || "خصم حصري"}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              if (sup.discountCode) {
                                navigator.clipboard.writeText(sup.discountCode);
                                alert(`تم نسخ كود الخصم: ${sup.discountCode}`);
                              }
                            }}
                            className="flex-1 py-2 px-3 rounded-xl bg-[#1E1238] hover:bg-[#2A184E] border border-purple-500/30 text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition"
                          >
                            <span>نسخ الكود ({sup.discountCode})</span>
                          </button>

                          <a
                            href={sup.purchaseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-3.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition flex items-center gap-1 shadow-md shadow-purple-950/50"
                          >
                            <span>شراء</span>
                            <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
