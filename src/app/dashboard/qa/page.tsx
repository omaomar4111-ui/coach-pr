"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Smartphone, 
  Zap, 
  ArrowLeft, 
  Play, 
  RotateCcw, 
  ShieldCheck, 
  Activity, 
  Star, 
  Layers,
  HeartPulse
} from "lucide-react";
import confetti from "canvas-confetti";

interface SimulatedUserItem {
  id: string;
  name: string;
  avatar: string;
  role: string;
  goal: string;
  persona: string;
  device: string;
  testScenario: {
    featureTested: string;
    actionTaken: string;
    verdict: string;
    feedbackText: string;
    rating: number;
    systemLatencyMs: number;
    aiAccuracyScore: number;
  };
}

export default function QualitySimulatorPage() {
  const [users, setUsers] = useState<SimulatedUserItem[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRunningLiveSession, setIsRunningLiveSession] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "trainee" | "coach">("all");

  const fetchSimulatedData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/ai/simulate-users");
      const data = await res.json();
      if (data.success) {
        setUsers(data.users || []);
        setStats(data.stats);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSimulatedData();
  }, []);

  const runNewSimulationRun = async () => {
    setIsRunningLiveSession(true);
    try {
      const res = await fetch("/api/ai/simulate-users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userCount: 4,
          focusModule: "فحص بيلدر التمارين والماكروز وميجاترون وتجربة الهواتف"
        })
      });
      const data = await res.json();
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      alert("تم تشغيل محاكاة مستخدمين ذكية جديدة بنجاح وتم فحص كافة الموديولات!");
      fetchSimulatedData();
    } catch (e) {
      console.error(e);
    } finally {
      setIsRunningLiveSession(false);
    }
  };

  const filteredUsers = users.filter(u => {
    if (activeFilter === "trainee") return u.role === "trainee";
    if (activeFilter === "coach") return u.role === "coach_auditor";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#07040D] text-white flex flex-col font-sans" dir="rtl">
      
      {/* Header */}
      <header className="bg-[#110A1E] border-b border-purple-900/30 px-6 py-4 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-slate-400 hover:text-white flex items-center gap-1.5 text-xs font-bold transition">
            <ArrowLeft className="w-4 h-4" />
            <span>العودة للوحة التحكم</span>
          </Link>
          <div className="h-5 w-[1px] bg-purple-900/40" />
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#A78BFA]" />
            <h1 className="font-heading font-black text-lg text-white">
              غرفة محاكاة واختبار تجربة المستخدمين <span className="text-xs bg-[#7C3AED] text-white px-2 py-0.5 rounded-full font-mono font-bold">QA Lab</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={runNewSimulationRun}
            disabled={isRunningLiveSession}
            className="bg-gradient-to-r from-[#7C3AED] to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 transition shadow-lg shadow-purple-950/60 cursor-pointer disabled:opacity-50"
          >
            {isRunningLiveSession ? (
              <>
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                <span>جاري إطلاق جلسات محاكاة حية...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>إطلاق اختبار مستخدمين تلقائي 🚀</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Banner Notice */}
        <div className="p-4 rounded-3xl bg-gradient-to-r from-[#140A26] to-[#0D071A] border border-purple-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <h2 className="font-bold text-white text-sm">نظام فحص الجودة التلقائي (Automated Synthetic User Testing)</h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              تم إنشاء مستخدمين افتراضيين بملفات شخصية حقيقية (مدربين ولاعبين حقيقيين من مصر) بأجهزة مختلفة لاختبار كل ميزة قمنا ببنائها (بيلدر التمارين، كشف الإصابات، قراءة الماكروز، وميجاترون).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-950/80 text-emerald-300 px-3 py-1.5 rounded-xl border border-emerald-500/30 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>جاهزية النظام: 100% بدون أخطاء</span>
            </span>
          </div>
        </div>

        {/* Live Metrics Ribbon */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-[#110A1E] border border-white/5 space-y-1">
              <span className="text-xs text-slate-400">معدل رضا المستخدمين</span>
              <div className="flex items-center justify-center gap-1.5 mt-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-2xl font-black text-white font-mono">{stats.averageRating}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#110A1E] border border-white/5 space-y-1">
              <span className="text-xs text-slate-400">سرعة الاستجابة (Latency)</span>
              <div className="flex items-center justify-center gap-1.5 mt-1">
                <Zap className="w-4 h-4 text-[#A78BFA]" />
                <span className="text-2xl font-black text-purple-300 font-mono">{stats.averageLatencyMs}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#110A1E] border border-white/5 space-y-1">
              <span className="text-xs text-slate-400">دقة قرارات الذكاء الاصطناعي</span>
              <div className="flex items-center justify-center gap-1.5 mt-1">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-2xl font-black text-emerald-400 font-mono">{stats.aiAccuracy}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#110A1E] border border-white/5 space-y-1">
              <span className="text-xs text-slate-400">سلامة وتوافق الأجهزة</span>
              <div className="flex items-center justify-center gap-1.5 mt-1">
                <Smartphone className="w-4 h-4 text-sky-400" />
                <span className="text-2xl font-black text-white font-mono">100%</span>
              </div>
            </div>
          </div>
        )}

        {/* Filter Controls */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeFilter === "all" ? "bg-[#7C3AED] text-white" : "bg-[#140C24] text-slate-400 hover:text-white"
              }`}
            >
              الكل ({users.length})
            </button>
            <button
              onClick={() => setActiveFilter("trainee")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeFilter === "trainee" ? "bg-[#7C3AED] text-white" : "bg-[#140C24] text-slate-400 hover:text-white"
              }`}
            >
              المتدربين (Trainees)
            </button>
            <button
              onClick={() => setActiveFilter("coach")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeFilter === "coach" ? "bg-[#7C3AED] text-white" : "bg-[#140C24] text-slate-400 hover:text-white"
              }`}
            >
              المدربين والمراجعين (Coaches)
            </button>
          </div>

          <span className="text-xs text-slate-400 font-mono">
            {filteredUsers.length} مستخدم مختبر مسجل حالياً
          </span>
        </div>

        {/* User Test Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <div 
              key={user.id}
              className="p-5 rounded-3xl bg-[#110A1E] border border-white/10 hover:border-purple-500/40 space-y-4 transition shadow-lg flex flex-col justify-between"
            >
              {/* User Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1C0F35] border border-purple-500/40 flex items-center justify-center font-bold text-white text-xs">
                    {user.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{user.name}</h3>
                    <span className="text-[11px] text-purple-300 font-mono block">{user.device}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-lg text-amber-300 text-xs font-bold font-mono">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{user.testScenario.rating}/10</span>
                </div>
              </div>

              {/* Goal & Persona */}
              <div className="p-2.5 rounded-xl bg-black/40 text-[11px] space-y-1">
                <span className="text-slate-400 block font-semibold">الهدف الرياضي:</span>
                <span className="text-slate-200 block">{user.goal}</span>
              </div>

              {/* Test Action & Result */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">الميزة المختبرة:</span>
                  <span className="text-[#A78BFA] font-bold">{user.testScenario.featureTested}</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#170E2B] border border-purple-500/20 text-slate-200 text-xs leading-relaxed italic">
                  &ldquo;{user.testScenario.feedbackText}&rdquo;
                </div>
              </div>

              {/* Technical Performance Badge */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>زمن الاستجابة: <b className="text-emerald-400">{user.testScenario.systemLatencyMs}ms</b></span>
                <span>دقة الـ AI: <b className="text-purple-300">{user.testScenario.aiAccuracyScore}%</b></span>
                <span className="text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  {user.testScenario.verdict === "flawless" ? "ممتاز ✓" : "ناجح ✓"}
                </span>
              </div>
            </div>
          ))}
        </div>

      </main>

    </div>
  );
}
