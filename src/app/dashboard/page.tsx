"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";

interface Athlete {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  plan: string;
  monthlyFee: number;
  paymentStatus: "paid" | "unpaid" | "pending";
  lastCheckIn: string; // date or human
  daysAbsent: number;
  attendanceStreak: number;
  status: "active" | "inactive";
  totalCheckInsMonth: number;
  workoutPlan: string;
  dietFile?: string;
  dietStatus: "uploaded" | "missing";
  waterIntakeLiters: number;
  waterGoalLiters: number;
  meals: {
    id: string;
    name: string;
    time: string;
    status: "completed" | "delayed" | "pending";
  }[];
}

const mockAthletes: Athlete[] = [
  {
    id: "ath-1",
    name: "كريم أحمد مصطفى",
    phone: "01144826641",
    avatar: "KA",
    plan: "FST-7 تضخيم VIP",
    monthlyFee: 1500,
    paymentStatus: "paid",
    lastCheckIn: "اليوم 05:30 م (Push Day)",
    daysAbsent: 0,
    attendanceStreak: 19,
    status: "active",
    totalCheckInsMonth: 22,
    workoutPlan: "FST-7 هاني رامبود المتقدم",
    dietFile: "كريم_دايت_3200_كالوري.pdf",
    dietStatus: "uploaded",
    waterIntakeLiters: 3.2,
    waterGoalLiters: 4.0,
    meals: [
      { id: "m1", name: "شوفان + واي بروتين + مكسرات", time: "09:00 ص", status: "completed" },
      { id: "m2", name: "صدور دجاج + أرز بسمتي", time: "01:30 م", status: "completed" },
      { id: "m3", name: "وجبة ما قبل التمرين (بطاطا)", time: "05:00 م", status: "completed" },
      { id: "m4", name: "لحم بقري + بطاطس بيوريه", time: "08:30 م", status: "pending" },
    ],
  },
  {
    id: "ath-2",
    name: "محمود حسن السيد",
    phone: "01099238411",
    avatar: "MH",
    plan: "تنشيف وخسارة دهون",
    monthlyFee: 1000,
    paymentStatus: "unpaid",
    lastCheckIn: "منذ 7 أيام (2026-11-07)",
    daysAbsent: 7,
    attendanceStreak: 0,
    status: "inactive",
    totalCheckInsMonth: 6,
    workoutPlan: "Upper / Lower Split",
    dietFile: undefined,
    dietStatus: "missing",
    waterIntakeLiters: 1.0,
    waterGoalLiters: 3.5,
    meals: [
      { id: "m21", name: "بياض بيض + توست", time: "09:00 ص", status: "delayed" },
      { id: "m22", name: "تونة + سلطة خضراء", time: "02:00 م", status: "delayed" },
    ],
  },
  {
    id: "ath-3",
    name: "عمر فاروق عبد الله",
    phone: "01288334412",
    avatar: "OF",
    plan: "بطولات كلاسيك فيزيك",
    monthlyFee: 2000,
    paymentStatus: "paid",
    lastCheckIn: "اليوم 02:00 م (Leg Day)",
    daysAbsent: 0,
    attendanceStreak: 32,
    status: "active",
    totalCheckInsMonth: 26,
    workoutPlan: "Classic Physique Pro",
    dietFile: "دايت_بطولة_كلاسيك_2026.pdf",
    dietStatus: "uploaded",
    waterIntakeLiters: 4.8,
    waterGoalLiters: 5.0,
    meals: [
      { id: "m31", name: "وجبة الإفطار العضلي", time: "07:30 ص", status: "completed" },
      { id: "m32", name: "وجبة السلمون والأرز", time: "11:30 ص", status: "completed" },
      { id: "m33", name: "لحم مفروم + كينوا", time: "03:30 م", status: "completed" },
    ],
  },
  {
    id: "ath-4",
    name: "طارق سليم الديب",
    phone: "01555123984",
    avatar: "TS",
    plan: "قوة بدنية وتأهيل",
    monthlyFee: 1200,
    paymentStatus: "unpaid",
    lastCheckIn: "منذ 3 أيام (2026-11-11)",
    daysAbsent: 3,
    attendanceStreak: 0,
    status: "inactive",
    totalCheckInsMonth: 12,
    workoutPlan: "تأهيل أوتار الكتف",
    dietFile: "نظام_مضادات_الالتهاب.xlsx",
    dietStatus: "uploaded",
    waterIntakeLiters: 1.8,
    waterGoalLiters: 3.5,
    meals: [
      { id: "m41", name: "وجبة الصباح", time: "08:30 ص", status: "completed" },
      { id: "m42", name: "وجبة الغداء", time: "02:30 م", status: "delayed" },
    ],
  },
];

export default function MasterCoachCommandCenter() {
  const [athletes, setAthletes] = useState<Athlete[]>(mockAthletes);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete>(mockAthletes[0]);
  const [filterMode, setFilterMode] = useState<"all" | "active" | "inactive" | "unpaid" | "absent">("all");
  const [pushSupported, setPushSupported] = useState(false);
  const [pushPermission, setPushPermission] = useState<NotificationPermission>("default");
  const [activeTab, setActiveTab] = useState<"tracking" | "diet_manager" | "financials">("tracking");
  const [uploadingDiet, setUploadingDiet] = useState(false);

  // Initialize Web Push Notifications
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPushSupported(true);
      setPushPermission(Notification.permission);
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js").catch(console.error);
      }
    }
  }, []);

  // Request Native Push Notification Permission
  const requestPushPermission = async () => {
    if (!("Notification" in window)) {
      alert("متصفحك لا يدعم الإشعارات المباشرة.");
      return;
    }
    const permission = await Notification.requestPermission();
    setPushPermission(permission);
    if (permission === "granted") {
      sendNativePush(
        "تم تفعيل إشعارات CoachPR المباشرة 🔔",
        "ستصلك الآن تنبيهات الوجبات المتأخرة، غياب اللاعبين، ودفعات الاشتراكات كرسالة فورية على شاشتك."
      );
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
  };

  // Dispatch Real Desktop / Phone Notification
  const sendNativePush = (title: string, body: string) => {
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
      new Notification(title, {
        body,
        icon: "/pr-logo.png",
        badge: "/pr-logo.png",
      });
    } else {
      alert(`${title}\n${body}`);
    }
  };

  // Check-In Athlete Action (Attendance)
  const handleCheckIn = (athId: string) => {
    const updated = athletes.map(a => {
      if (a.id === athId) {
        return {
          ...a,
          lastCheckIn: "الآن (Check-in ناجح)",
          daysAbsent: 0,
          attendanceStreak: a.attendanceStreak + 1,
          totalCheckInsMonth: a.totalCheckInsMonth + 1,
          status: "active" as const,
        };
      }
      return a;
    });
    setAthletes(updated);
    const curr = updated.find(a => a.id === athId);
    if (curr) setSelectedAthlete(curr);

    sendNativePush(
      "تسجيل حضور جديد (Check-In) ✅",
      `سجل اللاعب ${curr?.name} حضوره اليومي للتمرين بنجاح. ستريك الالتزام: ${curr?.attendanceStreak} يوم.`
    );
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
  };

  // WhatsApp Sender
  const openWhatsApp = (phone: string, text: string) => {
    const clean = phone.replace(/[^0-9]/g, "");
    const full = clean.startsWith("0") ? "2" + clean : clean;
    window.open(`https://wa.me/${full}?text=${encodeURIComponent(text)}`, "_blank");
  };

  // Financial Stats
  const totalRevenue = athletes.reduce((sum, a) => sum + (a.paymentStatus === "paid" ? a.monthlyFee : 0), 0);
  const pendingRevenue = athletes.reduce((sum, a) => sum + (a.paymentStatus === "unpaid" ? a.monthlyFee : 0), 0);
  const activeCount = athletes.filter(a => a.status === "active").length;
  const inactiveCount = athletes.filter(a => a.status === "inactive").length;
  const unpaidCount = athletes.filter(a => a.paymentStatus === "unpaid").length;

  // Filtered List
  const filteredAthletes = athletes.filter(a => {
    if (filterMode === "active") return a.status === "active";
    if (filterMode === "inactive") return a.status === "inactive";
    if (filterMode === "unpaid") return a.paymentStatus === "unpaid";
    if (filterMode === "absent") return a.daysAbsent >= 3;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#07040D] text-white flex flex-col font-sans selection:bg-[#7C3AED] selection:text-white" dir="rtl">
      
      {/* 1. Header with Official Brand Identity & Push Permission Trigger */}
      <header className="border-b border-white/[0.04] px-6 py-4 flex items-center justify-between sticky top-0 z-40 bg-[#07040D]/95 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5">
            <img 
              src="/pr-logo.png" 
              alt="PR" 
              className="h-8 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(167,139,250,0.3)]" 
            />
            <span className="font-heading font-black text-lg tracking-wider text-white">
              COACH<span className="text-[#A78BFA]">PR</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center bg-[#10091E] border border-white/[0.06] rounded-2xl p-1 text-xs font-medium">
            <button
              onClick={() => setActiveTab("tracking")}
              className={`px-3.5 py-1.5 rounded-xl transition ${
                activeTab === "tracking" ? "bg-[#1E1238] text-white shadow-sm border border-purple-500/20 font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              متابعة اللاعبين والغياب
            </button>
            <button
              onClick={() => setActiveTab("diet_manager")}
              className={`px-3.5 py-1.5 rounded-xl transition ${
                activeTab === "diet_manager" ? "bg-[#1E1238] text-white shadow-sm border border-purple-500/20 font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              رفع وإدارة أنظمة الأكل
            </button>
            <button
              onClick={() => setActiveTab("financials")}
              className={`px-3.5 py-1.5 rounded-xl transition ${
                activeTab === "financials" ? "bg-[#1E1238] text-white shadow-sm border border-purple-500/20 font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              حسبة الفلوس والاشتراكات
            </button>
            <Link
              href="/dashboard/templates"
              className="px-3.5 py-1.5 rounded-xl transition text-slate-400 hover:text-white hover:bg-[#1E1238] border border-transparent hover:border-purple-500/20 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]" />
              أنظمة كمال الأجسام &amp; FST-7
            </Link>
          </nav>
        </div>

        {/* Real Native Push Toggle on Device */}
        <div className="flex items-center gap-3">
          {pushPermission !== "granted" ? (
            <button
              type="button"
              onClick={requestPushPermission}
              className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED]/20 hover:bg-[#7C3AED]/30 border border-[#7C3AED] text-white text-xs font-bold transition flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#A78BFA] animate-ping" />
              تفعيل التنبيهات المباشرة على اللابتوب والموبايل
            </button>
          ) : (
            <div className="px-3 py-1 rounded-xl bg-[#120A24] border border-white/[0.08] text-[11px] text-[#A78BFA] flex items-center gap-1.5 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]" />
              الإشعارات المباشرة نشطة
            </div>
          )}

          <Link 
            href="/app"
            className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition shadow-md shadow-purple-950/50"
          >
            تطبيق اللاعب (PWA)
          </Link>
        </div>
      </header>

      {/* 2. Top Executive Business Metrics (Strictly Unified Colors) */}
      <section className="max-w-7xl w-full mx-auto px-6 pt-6 grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
        <div className="p-4 rounded-2xl bg-[#0C0618] border border-white/[0.05]">
          <span className="text-[11px] text-slate-400 block mb-1">دخل اشتراكات الكوتش</span>
          <span className="text-xl font-mono font-black text-white">{totalRevenue.toLocaleString()} ج.م</span>
        </div>
        <div className="p-4 rounded-2xl bg-[#0C0618] border border-white/[0.05]">
          <span className="text-[11px] text-slate-400 block mb-1">مبالغ معلقة لم تدفع</span>
          <span className="text-xl font-mono font-black text-[#A78BFA]">{pendingRevenue.toLocaleString()} ج.م</span>
        </div>
        <div className="p-4 rounded-2xl bg-[#0C0618] border border-white/[0.05]">
          <span className="text-[11px] text-slate-400 block mb-1">إجمالي اللاعبين</span>
          <span className="text-xl font-mono font-black text-white">{athletes.length}</span>
        </div>
        <div className="p-4 rounded-2xl bg-[#0C0618] border border-white/[0.05]">
          <span className="text-[11px] text-slate-400 block mb-1">اللاعبين النشطين (Active)</span>
          <span className="text-xl font-mono font-black text-white">{activeCount}</span>
        </div>
        <div className="p-4 rounded-2xl bg-[#0C0618] border border-white/[0.05]">
          <span className="text-[11px] text-slate-400 block mb-1">متوقفين / غير ملتزمين</span>
          <span className="text-xl font-mono font-black text-[#A78BFA]">{inactiveCount}</span>
        </div>
      </section>

      {/* 3. Main Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Filterable Athletes Attendance & Inactivity List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Smart Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
            <button
              onClick={() => setFilterMode("all")}
              className={`px-3 py-1.5 rounded-xl border transition ${
                filterMode === "all" ? "bg-[#1E1238] border-purple-500/30 text-white font-bold" : "bg-[#0B0616] border-white/[0.04] text-slate-400"
              }`}
            >
              الكل ({athletes.length})
            </button>
            <button
              onClick={() => setFilterMode("active")}
              className={`px-3 py-1.5 rounded-xl border transition ${
                filterMode === "active" ? "bg-[#1E1238] border-purple-500/30 text-white font-bold" : "bg-[#0B0616] border-white/[0.04] text-slate-400"
              }`}
            >
              نشطين ({activeCount})
            </button>
            <button
              onClick={() => setFilterMode("absent")}
              className={`px-3 py-1.5 rounded-xl border transition ${
                filterMode === "absent" ? "bg-[#1E1238] border-[#7C3AED] text-[#A78BFA] font-bold" : "bg-[#0B0616] border-white/[0.04] text-slate-400"
              }`}
            >
              غائبين +3 أيام ({athletes.filter(a => a.daysAbsent >= 3).length})
            </button>
            <button
              onClick={() => setFilterMode("unpaid")}
              className={`px-3 py-1.5 rounded-xl border transition ${
                filterMode === "unpaid" ? "bg-[#1E1238] border-[#7C3AED] text-[#A78BFA] font-bold" : "bg-[#0B0616] border-white/[0.04] text-slate-400"
              }`}
            >
              لم يدفعوا ({unpaidCount})
            </button>
          </div>

          {/* Athletes Roster Cards */}
          <div className="space-y-2.5">
            {filteredAthletes.map(ath => {
              const isSelected = selectedAthlete.id === ath.id;

              return (
                <div
                  key={ath.id}
                  onClick={() => setSelectedAthlete(ath)}
                  className={`p-4 rounded-2xl border transition cursor-pointer text-xs ${
                    isSelected
                      ? "bg-[#120A24] border-[#7C3AED] shadow-lg shadow-purple-950/50"
                      : "bg-[#0B0616] border-white/[0.04] hover:bg-[#0F081C] hover:border-white/[0.08]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#1A1030] border border-purple-500/20 text-[#A78BFA] font-bold flex items-center justify-center font-mono">
                        {ath.avatar}
                      </div>
                      <div>
                        <span className="font-bold text-white text-sm block">{ath.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{ath.phone}</span>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <div className="text-left space-y-0.5">
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-lg border font-medium block ${
                        ath.daysAbsent > 0
                          ? "bg-[#1A0E2A] border-[#7C3AED]/40 text-[#A78BFA]"
                          : "bg-[#120A20] border-white/[0.06] text-slate-300"
                      }`}>
                        {ath.daysAbsent > 0 ? `غائب ${ath.daysAbsent} أيام` : "ملتزم اليوم"}
                      </span>
                    </div>
                  </div>

                  {/* Attendance & Payment Row */}
                  <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-300 border-t border-white/[0.04] pt-2.5 mt-2">
                    <div>
                      <span className="text-slate-500 block">آخر تمرين</span>
                      <span className="font-mono text-white truncate block">{ath.lastCheckIn}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">ستريك الالتزام</span>
                      <span className="font-mono font-bold text-[#A78BFA]">{ath.attendanceStreak} يوم</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">الاشتراك الشهري</span>
                      <span className={`font-mono font-bold ${ath.paymentStatus === "paid" ? "text-white" : "text-[#A78BFA]"}`}>
                        {ath.paymentStatus === "paid" ? "مدفوع ✓" : "مستحق الدفع"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Deep Tracking, Diet Manager & Push Automation (7 cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Athlete Profile Header with Instant Check-In & Action Bar */}
          <div className="p-6 rounded-3xl bg-[#0E071A] border border-purple-500/20 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-block px-2.5 py-1 rounded-lg bg-[#1D1136] border border-purple-500/30 text-[10px] text-[#A78BFA] font-mono mb-2">
                  {selectedAthlete.plan} · {selectedAthlete.monthlyFee} ج.م / شهر
                </div>
                <h1 className="text-2xl font-black text-white">{selectedAthlete.name}</h1>
                <p className="text-xs text-slate-400 mt-1">
                  آخر تسجيل حضور: {selectedAthlete.lastCheckIn}
                </p>
              </div>

              {/* Action Buttons: Check-in & Native Notification test */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCheckIn(selectedAthlete.id)}
                  className="px-4 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition shadow-lg shadow-purple-950/60"
                >
                  تسجيل تمرين اليوم (Check-In)
                </button>
              </div>
            </div>

            {/* Smart Reminder Triggers (Message to Phone / Laptop / WhatsApp) */}
            <div className="p-4 rounded-2xl bg-[#120A24] border border-white/[0.05] space-y-3">
              <div className="text-xs font-bold text-white">إرسال تنبيه مباشر للمتدرب على تليفونه</div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {/* 1. Payment Reminder */}
                <button
                  type="button"
                  onClick={() => {
                    const msg = `مساء الخير يا كابتن ${selectedAthlete.name}، حابين نذكرك بتجديد اشتراكك الشهري (${selectedAthlete.monthlyFee} ج.م) لمواصلة خطتك بدون انقطاع 💪`;
                    sendNativePush("تذكير اشتراك مرسل 💳", `تم إرسال تذكير تجديد الاشتراك للمتدرب ${selectedAthlete.name}`);
                    openWhatsApp(selectedAthlete.phone, msg);
                  }}
                  className="py-2.5 px-3 bg-[#1A1030] hover:bg-[#251445] border border-white/[0.08] text-slate-200 rounded-xl font-medium transition text-center"
                >
                  تذكير بالدفع والاشتراك
                </button>

                {/* 2. Absence Reminder (3 Days) */}
                <button
                  type="button"
                  onClick={() => {
                    const msg = `يا بطل بقالك 3 أيام مش بتسجل تمرينك أو غايب عن الجيم، طمنا عليك محتاجين نرجع للستريك بتاعنا تاني!`;
                    sendNativePush("تنبيه غياب 3 أيام ⚠️", `تم إرسال رسالة تفقد للاعب ${selectedAthlete.name}`);
                    openWhatsApp(selectedAthlete.phone, msg);
                  }}
                  className="py-2.5 px-3 bg-[#1A1030] hover:bg-[#251445] border border-white/[0.08] text-slate-200 rounded-xl font-medium transition text-center"
                >
                  تنبيه غياب 3 أيام
                </button>

                {/* 3. Absence Reminder (1 Week) */}
                <button
                  type="button"
                  onClick={() => {
                    const msg = `يا بطل، بقالك أسبوع غايب! جسمك ومستواك اللي بنيناه أمانة، محتاجين نجدد الحماس وننزل التمرين بكرة ضروري.`;
                    sendNativePush("إنذار غياب أسبوع كامل 🚨", `تم إرسال إنذار أسبوع للمتدرب ${selectedAthlete.name}`);
                    openWhatsApp(selectedAthlete.phone, msg);
                  }}
                  className="py-2.5 px-3 bg-[#1A1030] hover:bg-[#251445] border border-white/[0.08] text-slate-200 rounded-xl font-medium transition text-center"
                >
                  إنذار غياب أسبوع
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content 1: Tracking & Meals */}
          {activeTab === "tracking" && (
            <div className="space-y-4">
              
              {/* Daily Meal Schedule & Delayed Alert */}
              <div className="p-5 rounded-2xl bg-[#0B0616] border border-white/[0.05] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">متابعة وجبات اليوم وتنبيهات التأخير</h3>
                  <span className="text-[11px] text-slate-400 font-mono">
                    شرب الماء: {selectedAthlete.waterIntakeLiters} / {selectedAthlete.waterGoalLiters} L
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {selectedAthlete.meals.map(meal => (
                    <div 
                      key={meal.id}
                      className={`p-3.5 rounded-xl border flex items-center justify-between transition ${
                        meal.status === "completed"
                          ? "bg-[#0E081A] border-white/[0.04] opacity-80"
                          : meal.status === "delayed"
                          ? "bg-[#1A0E2A] border-[#7C3AED]"
                          : "bg-[#110A1E] border-white/[0.06]"
                      }`}
                    >
                      <div>
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>{meal.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({meal.time})</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {meal.status === "completed" ? "تم تناولها في الوقت المحدد" : meal.status === "delayed" ? "متأخرة عن الموعد! تم تنبيه الكوتش" : "موعد قادم"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {meal.status === "delayed" && (
                          <button
                            type="button"
                            onClick={() => {
                              sendNativePush(
                                "تنبيه وجبة متأخرة ⏱️",
                                `وجبة ${meal.name} للاعب ${selectedAthlete.name} متأخرة عن موعدها المحدد (${meal.time}).`
                              );
                              openWhatsApp(selectedAthlete.phone, `يا بطل وجبتك (${meal.name}) ميعادها فات من ${meal.time}، متنساش تسجلها دلوقتي.`);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[11px] font-bold"
                          >
                            إرسال رسالة تذكير فورية
                          </button>
                        )}
                        <span className={`text-[10px] px-2 py-1 rounded-lg border font-medium ${
                          meal.status === "completed"
                            ? "bg-[#140B24] border-white/[0.06] text-slate-300"
                            : meal.status === "delayed"
                            ? "bg-[#251245] border-[#7C3AED] text-[#A78BFA]"
                            : "bg-[#10091E] border-white/[0.04] text-slate-400"
                        }`}>
                          {meal.status === "completed" ? "مكتملة ✓" : meal.status === "delayed" ? "متأخرة" : "في الانتظار"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Tab Content 2: Diet File Upload Manager */}
          {activeTab === "diet_manager" && (
            <div className="p-6 rounded-2xl bg-[#0B0616] border border-white/[0.05] space-y-4">
              <div>
                <h3 className="text-base font-bold text-white">رفع نظام الأكل للاعب ({selectedAthlete.name})</h3>
                <p className="text-xs text-slate-400 mt-1">
                  ارفع ملف الدايت (PDF أو Excel أو Word). بمجرد الرفع يصل إشعار مباشر للاعب على جهازه ليفتح ويتبع النظام فوراً.
                </p>
              </div>

              {/* Upload Zone */}
              <div className="border-2 border-dashed border-white/[0.1] hover:border-[#7C3AED] p-8 rounded-2xl text-center space-y-3 transition">
                <input
                  type="file"
                  id="diet-upload-input"
                  className="hidden"
                  accept=".pdf,.xlsx,.xls,.docx,.txt"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setUploadingDiet(true);
                      setTimeout(() => {
                        setUploadingDiet(false);
                        const updated = {
                          ...selectedAthlete,
                          dietFile: file.name,
                          dietStatus: "uploaded" as const,
                        };
                        setSelectedAthlete(updated);
                        setAthletes(athletes.map(a => a.id === updated.id ? updated : a));
                        sendNativePush(
                          "تم رفع نظام أكل جديد بنجاح 📋",
                          `تم رفع ${file.name} للمتدرب ${selectedAthlete.name} وإرسال إشعار التحديث إليه.`
                        );
                        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
                      }, 1000);
                    }
                  }}
                />
                
                <div className="text-xs text-slate-300">
                  {selectedAthlete.dietFile ? (
                    <div>
                      <span className="text-[#A78BFA] font-bold block text-sm mb-1">
                        الملف المرفوع حالياً: {selectedAthlete.dietFile}
                      </span>
                      <span className="text-slate-500 text-[11px]">اضغط أدناه لاستبدال الملف بملف أحدث</span>
                    </div>
                  ) : (
                    <span>لم يتم رفع نظام أكل لهذا اللاعب حتى الآن</span>
                  )}
                </div>

                <label
                  htmlFor="diet-upload-input"
                  className="inline-block px-5 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold rounded-xl cursor-pointer transition shadow-lg shadow-purple-950/60"
                >
                  {uploadingDiet ? "جاري الرفع والمعالجة..." : "اختر ملف الدايت من جهازك (PDF / Excel)"}
                </label>
              </div>

              {selectedAthlete.dietFile && (
                <div className="p-4 rounded-xl bg-[#120A24] border border-white/[0.06] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{selectedAthlete.dietFile}</span>
                    <span className="text-[10px] text-slate-400 font-mono">جاهز ومفعل على تطبيق المتدرب PWA</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => openWhatsApp(selectedAthlete.phone, `يا بطل، تم رفع وتحديث نظام الأكل الجديد الخاص بيك على المنصة. ادخل شوفه دلوقتي!`)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#1D1136] hover:bg-[#2B184F] text-[#A78BFA] border border-purple-500/30 text-[11px] font-bold"
                  >
                    إرسال إشعار استلام على واتساب
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tab Content 3: Financials & Debt Breakdown */}
          {activeTab === "financials" && (
            <div className="p-6 rounded-2xl bg-[#0B0616] border border-white/[0.05] space-y-4">
              <h3 className="text-base font-bold text-white">تفصيل الحسابات والاشتراكات الشهرية</h3>
              
              <div className="space-y-2.5 text-xs">
                {athletes.map(ath => (
                  <div key={ath.id} className="p-4 rounded-xl bg-[#0E081A] border border-white/[0.04] flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block text-sm">{ath.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{ath.plan}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-mono font-bold text-white text-sm">{ath.monthlyFee} ج.م</span>
                      <span className={`text-[10px] px-2.5 py-1 rounded-lg border font-medium ${
                        ath.paymentStatus === "paid"
                          ? "bg-[#140B24] border-white/[0.08] text-slate-300"
                          : "bg-[#251245] border-[#7C3AED] text-[#A78BFA]"
                      }`}>
                        {ath.paymentStatus === "paid" ? "تم التحصيل" : "مستحق الدفع"}
                      </span>
                      {ath.paymentStatus === "unpaid" && (
                        <button
                          type="button"
                          onClick={() => openWhatsApp(ath.phone, `كابتن ${ath.name}، تذكير بدفع الاشتراك الشهري بقيمة ${ath.monthlyFee} ج.م لتجديد الخطة.`)}
                          className="px-3 py-1 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[11px] font-bold"
                        >
                          مطالبة بالدفع
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-[10px] text-slate-600 border-t border-white/[0.03]">
        CoachPR Platform · نظام متابعة الحضور والاشتراكات الحقيقي · 2026
      </footer>

    </div>
  );
}
