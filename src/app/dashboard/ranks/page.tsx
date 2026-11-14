"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Trophy, 
  Award, 
  ShieldCheck, 
  Flame, 
  ArrowLeft, 
  Star, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  Zap,
  Globe,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { GAMIFIED_RANKS, CoachCertificate } from "@/lib/ranksAndCertifications";
import confetti from "canvas-confetti";

export default function RanksAndCertificationsPage() {
  const [activeTab, setActiveTab] = useState<"ranks" | "certs">("ranks");

  // Coach profile ranking state
  const [coachPoints, setCoachPoints] = useState(6450); // Diamond
  const [clientPoints, setClientPoints] = useState(2800); // Platinum

  const [certificates, setCertificates] = useState<CoachCertificate[]>([
    {
      id: "cert-1",
      title: "ISSA Certified Personal Trainer (CPT)",
      issuingBody: "International Sports Sciences Association (USA)",
      year: 2023,
      verificationBadge: "VERIFIED-ISSA-88392",
      verified: true,
      publicClientInquiries: 38
    },
    {
      id: "cert-2",
      title: "NASM Fitness Nutrition Specialist (FNS)",
      issuingBody: "National Academy of Sports Medicine",
      year: 2024,
      verificationBadge: "VERIFIED-NASM-41092",
      verified: true,
      publicClientInquiries: 24
    },
    {
      id: "cert-3",
      title: "FST-7 Master Trainer Certified",
      issuingBody: "Hany Rambod Evogen Elite Academy",
      year: 2025,
      verificationBadge: "EVOGEN-FST7-ELITE",
      verified: true,
      publicClientInquiries: 52
    }
  ]);

  const [newCertTitle, setNewCertTitle] = useState("");
  const [newCertBody, setNewCertBody] = useState("");

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertTitle.trim()) return;

    setCertificates(prev => [
      ...prev,
      {
        id: `cert-${Date.now()}`,
        title: newCertTitle,
        issuingBody: newCertBody || "جهة رياضية دولية معتمدة",
        year: 2026,
        verificationBadge: `PRB-CERT-${Math.floor(10000 + Math.random() * 90000)}`,
        verified: true,
        publicClientInquiries: 1
      }
    ]);

    setNewCertTitle("");
    setNewCertBody("");
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    alert("تم توثيق الشهادة بنجاح! سيتم إبراز بروفايلك في دليل المدربين المعتمدين لجلب عملاء خارجيين جدد.");
  };

  const getRankForPoints = (pts: number) => {
    for (let i = GAMIFIED_RANKS.length - 1; i >= 0; i--) {
      if (pts >= GAMIFIED_RANKS[i].minPoints) return GAMIFIED_RANKS[i];
    }
    return GAMIFIED_RANKS[0];
  };

  const currentCoachRank = getRankForPoints(coachPoints);
  const currentClientRank = getRankForPoints(clientPoints);

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
            نظام رانكات ببجي (PUBG Ranks) · توثيق الشهادات واستقطاب العملاء
          </span>
        </div>

        <Link href="/dashboard" className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-bold transition">
          <ArrowLeft className="w-4 h-4" />
          <span>لوحة التحكم</span>
        </Link>
      </header>

      {/* Hero */}
      <div className="bg-[#110A1E]/70 border-b border-purple-900/30 py-8 px-6 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/20 border border-purple-500/30 text-[#A78BFA] text-xs font-bold">
          <Trophy className="w-4 h-4 text-yellow-400" />
          <span>منظومة الحوافز التنافسية وتوثيق المدربين المعتمدين</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black font-heading text-white">
          رانك البطولات والشهادات المعتمدة (Ranks &amp; Client Influx)
        </h1>
        <p className="text-xs text-slate-400 max-w-2xl mx-auto">
          ارتقِ برانك حسابك وحساب متدربك من البرونز حتى الكونكورر! بالإضافة إلى توثيق شهاداتك الدولية (ISSA, NASM, FST-7) في دليل CoachPR العام لتستقبل عملاء جدد مباشرة دون الحاجة لحملات إعلانية.
        </p>

        {/* Tab Controls */}
        <div className="flex justify-center gap-2 pt-2">
          <button
            onClick={() => setActiveTab("ranks")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "ranks"
                ? "bg-[#7C3AED] text-white shadow-lg shadow-purple-950/60"
                : "bg-[#140C24] text-slate-400 hover:text-white border border-purple-900/30"
            }`}
          >
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span>نظام رانكات المدرب والمتدرب (Tier System)</span>
          </button>
          <button
            onClick={() => setActiveTab("certs")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "certs"
                ? "bg-[#7C3AED] text-white shadow-lg shadow-purple-950/60"
                : "bg-[#140C24] text-slate-400 hover:text-white border border-purple-900/30"
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>توثيق شهادات الكابتن واستقطاب عملاء جدد ({certificates.length})</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        
        {/* ===================== TAB 1: GAMIFIED RANKS ===================== */}
        {activeTab === "ranks" && (
          <div className="space-y-6">
            {/* Current Active Ranks Live Status Banner */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Coach Current Rank Card */}
              <div className="bg-[#140C24] p-5 rounded-3xl border-2 border-purple-700/60 flex items-center justify-between shadow-xl">
                <div className="space-y-1">
                  <span className="text-[11px] text-purple-300 font-bold uppercase">رانك الكابتن (Coach Tier):</span>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{currentCoachRank.icon}</span>
                    <h3 className="text-xl font-black text-white">{currentCoachRank.nameAr}</h3>
                  </div>
                  <p className="text-xs text-slate-400">النقاط: <b className="text-purple-300 font-mono">{coachPoints.toLocaleString()} XP</b></p>
                </div>
                <div className="text-left space-y-1">
                  <span className="text-[10px] bg-purple-500/20 text-[#A78BFA] border border-purple-500/30 px-2.5 py-1 rounded-full font-bold">
                    أعلى 5% في مصر
                  </span>
                  <div className="text-[11px] text-slate-500">الرانك التالي: كراون (10,000 XP)</div>
                </div>
              </div>

              {/* Client Sample Current Rank Card */}
              <div className="bg-[#140C24] p-5 rounded-3xl border border-cyan-700/50 flex items-center justify-between shadow-xl">
                <div className="space-y-1">
                  <span className="text-[11px] text-cyan-300 font-bold uppercase">رانك المتدرب (كريم أحمد):</span>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{currentClientRank.icon}</span>
                    <h3 className="text-xl font-black text-white">{currentClientRank.nameAr}</h3>
                  </div>
                  <p className="text-xs text-slate-400">النقاط: <b className="text-cyan-300 font-mono">{clientPoints.toLocaleString()} XP</b></p>
                </div>
                <div className="text-left space-y-1">
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2.5 py-1 rounded-full font-bold">
                    19 يوم Streak متصل
                  </span>
                  <div className="text-[11px] text-slate-500">الرانك التالي: دايموند (5,000 XP)</div>
                </div>
              </div>
            </div>

            {/* All Ranks Ladder Grid */}
            <div className="space-y-3">
              <h2 className="text-sm font-black text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <span>سلّم مستويات الرانك (مثل ببجي موبايل PUBG Mobile Ladder)</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {GAMIFIED_RANKS.map(rank => (
                  <div
                    key={rank.id}
                    className={`bg-[#140C24] p-4 rounded-3xl border transition hover:scale-[1.02] flex flex-col justify-between space-y-3 ${rank.borderGlow}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{rank.icon}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${rank.badgeBg}`}>
                        {rank.minPoints}+ XP
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-base font-black text-white">{rank.nameAr}</h4>
                      <p className="text-[11px] font-mono text-slate-400">{rank.nameEn}</p>
                    </div>

                    <div className="bg-[#110A1E] p-2.5 rounded-2xl border border-purple-900/30 space-y-1 text-xs">
                      <div className="text-[10px] text-purple-300 font-bold">مزايا الرانك الحصرية:</div>
                      <ul className="text-[10px] text-slate-300 space-y-0.5">
                        {rank.perksAr.map((p, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-[#A78BFA]">•</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 2: CERTIFICATIONS & CLIENT INFLUX ===================== */}
        {activeTab === "certs" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Certs List & Client Lead Generation stats */}
            <div className="lg:col-span-8 space-y-5">
              <div className="bg-[#140C24] p-5 rounded-3xl border border-purple-900/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-base font-black text-white">الشهادات المعتمدة الموثقة</h3>
                  </div>
                  <span className="text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">
                    موثق رسمياً في دليل CoachPR
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  شهاداتك المعتمدة تظهر في صفحة الكباتن العامة على المنصة، مما يسمح للعملاء الباحثين عن مدربين محترفين بالتواصل المباشر معك والاشتراك في باقاتك دون تدخل طرف ثالث.
                </p>
              </div>

              {/* Certified Badges List */}
              <div className="space-y-3">
                {certificates.map(cert => (
                  <div
                    key={cert.id}
                    className="bg-[#140C24] p-4 rounded-3xl border border-purple-900/30 flex items-center justify-between text-xs hover:border-emerald-500/40 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <Award className="w-6 h-6" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-white text-sm">{cert.title}</span>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono font-bold">
                            ✓ {cert.verificationBadge}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400">{cert.issuingBody} · سنة الاعتماد {cert.year}</div>
                      </div>
                    </div>

                    <div className="text-left bg-[#110A1E] px-3.5 py-2 rounded-2xl border border-purple-900/30 space-y-0.5">
                      <div className="text-xs font-black text-[#A78BFA] flex items-center gap-1 justify-end">
                        <Users className="w-3.5 h-3.5" />
                        <span>+{cert.publicClientInquiries} عميل جديد</span>
                      </div>
                      <div className="text-[10px] text-slate-500">تم جلبهم بفضل هذه الشهادة</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Add New Certificate & Verification Form */}
            <div className="lg:col-span-4 bg-[#140C24] border border-purple-900/30 rounded-3xl p-5 space-y-4">
              <div className="pb-3 border-b border-purple-900/30 space-y-1">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#A78BFA]" />
                  <span>إضافة وتوثيق شهادة تدريبية جديدة</span>
                </h3>
                <p className="text-[11px] text-slate-400">ارفع بيانات شهاداتك لزيادة ثقة العملاء ومضاعفة اشتراكاتك</p>
              </div>

              <form onSubmit={handleAddCert} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">اسم الشهادة الرياضية</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: ISSA Certified Strength & Conditioning"
                    value={newCertTitle}
                    onChange={(e) => setNewCertTitle(e.target.value)}
                    className="w-full bg-[#110A1E] border border-purple-900/40 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#7C3AED]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">الجهة المانحة للاعتماد</label>
                  <input
                    type="text"
                    placeholder="مثال: ACE, IFBB, NASM, وزارة الشباب والرياضة"
                    value={newCertBody}
                    onChange={(e) => setNewCertBody(e.target.value)}
                    className="w-full bg-[#110A1E] border border-purple-900/40 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#7C3AED]"
                  />
                </div>

                <div className="p-3 bg-[#0F081D] rounded-2xl border border-purple-900/40 text-[11px] text-slate-400 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>ميزة الجذب الحصري للعملاء:</span>
                  </div>
                  <p className="leading-relaxed">
                    المدربين الموثقين يحصلون على بايدج التوثيق الأزرق/الذهبي ويتم إدراجهم في الصفحة الرئيسية للمنصة ليستقبلوا طلبات اشتراك مباشرة على الواتساب المعتمد.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black text-xs rounded-xl shadow-lg shadow-purple-950 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>توثيق الشهادة وتفعيل استقطاب المتدربين</span>
                </button>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
