"use client";

import React, { useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";

interface ClientMeal {
  id: string;
  name: string;
  time: string;
  status: "done" | "pending" | "delayed";
  calories: number;
  protein: number;
  waterTargetMl: number;
  waterCurrentMl: number;
}

interface ClientCycle {
  id: string;
  name: string;
  phone: string;
  email: string;
  plan: string;
  currentDay: string;
  waterDrankLiters: number;
  waterGoalLiters: number;
  adherenceRate: number;
  status: "active" | "delayed" | "completed";
  meals: ClientMeal[];
  lastUpdate: string;
}

interface NotificationItem {
  id: string;
  audience: "athlete" | "coach" | "admin";
  title: string;
  message: string;
  time: string;
  type: "water" | "meal" | "cycle" | "security";
  isRead: boolean;
}

const initialClientsData: ClientCycle[] = [
  {
    id: "cl-1",
    name: "كريم أحمد مصطفى",
    phone: "01144826641",
    email: "kareem@example.com",
    plan: "FST-7 تضخيم وقوة عضلية",
    currentDay: "اليوم 18 من 90",
    waterDrankLiters: 2.5,
    waterGoalLiters: 4.0,
    adherenceRate: 94,
    status: "active",
    lastUpdate: "منذ 15 دقيقة",
    meals: [
      { id: "m1", name: "وجبة 1: شوفان + سكوب واي + مكسرات", time: "09:00 ص", status: "done", calories: 550, protein: 42, waterTargetMl: 500, waterCurrentMl: 500 },
      { id: "m2", name: "وجبة 2: صدور دجاج مشوي + رز بسمتي + خضار سوتيه", time: "01:30 م", status: "done", calories: 650, protein: 55, waterTargetMl: 750, waterCurrentMl: 750 },
      { id: "m3", name: "وجبة 3 (قبل التمرين): بطاطا مسلوقة + عصير برتقال طبيعي", time: "05:00 م", status: "delayed", calories: 380, protein: 12, waterTargetMl: 750, waterCurrentMl: 250 },
      { id: "m4", name: "وجبة 4 (بعد التمرين): لحم بقري صافي + بطاطس بيوريه", time: "08:30 م", status: "pending", calories: 600, protein: 50, waterTargetMl: 1000, waterCurrentMl: 0 },
    ],
  },
  {
    id: "cl-2",
    name: "محمود حسن السيد",
    phone: "01099238411",
    email: "mahmoud@example.com",
    plan: "تنشيف عالي وخسارة دهون",
    currentDay: "اليوم 4 من 60",
    waterDrankLiters: 1.2,
    waterGoalLiters: 3.5,
    adherenceRate: 68,
    status: "delayed",
    lastUpdate: "منذ 3 ساعات",
    meals: [
      { id: "m21", name: "وجبة 1: 4 بياض بيض + توست بني + خيار", time: "08:30 ص", status: "done", calories: 320, protein: 32, waterTargetMl: 500, waterCurrentMl: 500 },
      { id: "m22", name: "وجبة 2: تونة مصفاة + سلطة خضراء ليمون", time: "01:00 م", status: "delayed", calories: 280, protein: 35, waterTargetMl: 750, waterCurrentMl: 200 },
      { id: "m23", name: "وجبة 3: صدور رومي مدخن + أرز بني", time: "05:30 م", status: "pending", calories: 450, protein: 40, waterTargetMl: 750, waterCurrentMl: 0 },
    ],
  },
  {
    id: "cl-3",
    name: "عمر فاروق عبد الله",
    phone: "01288334412",
    email: "omar.f@example.com",
    plan: "تحضير بطولة كلاسيك فيزيك",
    currentDay: "اليوم 42 من 120",
    waterDrankLiters: 4.8,
    waterGoalLiters: 5.0,
    adherenceRate: 99,
    status: "active",
    lastUpdate: "الآن",
    meals: [
      { id: "m31", name: "وجبة 1: بياض بيض + دقيق شوفان + زبدة فول سوداني", time: "07:30 ص", status: "done", calories: 620, protein: 48, waterTargetMl: 800, waterCurrentMl: 800 },
      { id: "m32", name: "وجبة 2: سلمون مشوي + كينوا + أسباراجوس", time: "11:30 ص", status: "done", calories: 580, protein: 45, waterTargetMl: 1000, waterCurrentMl: 1000 },
      { id: "m33", name: "وجبة 3: لحمة مفرومة 5% دهون + أرز أبيض", time: "03:30 م", status: "done", calories: 680, protein: 52, waterTargetMl: 1000, waterCurrentMl: 1000 },
    ],
  },
];

const initialNotifications: NotificationItem[] = [
  {
    id: "n1",
    audience: "athlete",
    title: "تذكير بشرب الماء 💧",
    message: "باقي لك 1.5 لتر للوصول لهدفك اليومي. اشرب كوبين ماء الآن للحفاظ على ضخ الدم العضلي.",
    time: "منذ 10 دقائق",
    type: "water",
    isRead: false,
  },
  {
    id: "n2",
    audience: "coach",
    title: "وجبة متأخرة للمتدرب كريم أحمد",
    message: "تأخرت وجبة قبل التمرين 45 دقيقة عن موعدها المحدد (05:00 م). تم إرسال تنبيه بالواتساب للاعب.",
    time: "منذ 35 دقيقة",
    type: "meal",
    isRead: false,
  },
  {
    id: "n3",
    audience: "admin",
    title: "تقرير دورة التدريب اليومية (Cycle Monitor)",
    message: "إجمالي 3 متدربين نشطين، تم تأكيد 7 وجبات، وجبة واحدة متأخرة، معدل شرب الماء العام 76%.",
    time: "منذ ساعة",
    type: "cycle",
    isRead: true,
  },
  {
    id: "n4",
    audience: "coach",
    title: "فيديو فورمتشيك جديد في الانتظار",
    message: "رفع اللاعب كريم فيديو سكوات للمراجعة قبل انتهاء مدة التخزين المؤقتة (متبقي 10 ساعات).",
    time: "منذ ساعتين",
    type: "security",
    isRead: true,
  },
];

export default function LuxuryMinimalDashboard() {
  const [clients, setClients] = useState<ClientCycle[]>(initialClientsData);
  const [selectedClient, setSelectedClient] = useState<ClientCycle>(initialClientsData[0]);
  const [activeTab, setActiveTab] = useState<"cycles" | "meals" | "water" | "notifications" | "settings">("cycles");
  const [notifRole, setNotifRole] = useState<"all" | "athlete" | "coach" | "admin">("all");
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [showAddMealModal, setShowAddMealModal] = useState(false);
  const [newMealName, setNewMealName] = useState("");
  const [newMealTime, setNewMealTime] = useState("06:00 م");
  const [newMealCal, setNewMealCal] = useState("450");
  const [newMealProt, setNewMealProt] = useState("40");
  const [waterAmountInput, setWaterAmountInput] = useState(250);

  // Send WhatsApp Reminder
  const sendWhatsAppReminder = (client: ClientCycle, msg: string) => {
    const cleanPhone = client.phone.replace(/[^0-9]/g, "");
    const formattedPhone = cleanPhone.startsWith("0") ? "2" + cleanPhone : cleanPhone;
    const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  // Add Water Log
  const handleAddWater = () => {
    const updated = {
      ...selectedClient,
      waterDrankLiters: Math.min(selectedClient.waterGoalLiters, Number((selectedClient.waterDrankLiters + waterAmountInput / 1000).toFixed(2))),
    };
    setSelectedClient(updated);
    setClients(clients.map(c => c.id === updated.id ? updated : c));

    // Push notification to athlete & coach
    const newNotif: NotificationItem = {
      id: String(Date.now()),
      audience: "athlete",
      title: "تم تسجيل شرب الماء",
      message: `أضاف ${selectedClient.name} كمية ${waterAmountInput} مل من الماء. الإجمالي: ${updated.waterDrankLiters} لتر.`,
      time: "الآن",
      type: "water",
      isRead: false,
    };
    setNotifications([newNotif, ...notifications]);
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
  };

  // Mark Meal as Done
  const handleToggleMeal = (mealId: string) => {
    const updatedMeals = selectedClient.meals.map(m => {
      if (m.id === mealId) {
        const nextStatus = m.status === "done" ? "pending" : "done";
        return { ...m, status: nextStatus };
      }
      return m;
    });

    const updated = { ...selectedClient, meals: updatedMeals as ClientMeal[] };
    setSelectedClient(updated);
    setClients(clients.map(c => c.id === updated.id ? updated : c));

    // Admin & Coach Notification
    const notif: NotificationItem = {
      id: String(Date.now()),
      audience: "admin",
      title: "تحديث وجبة لاعب",
      message: `قام الكابتن بتحديث حالة وجبة للمتدرب ${selectedClient.name}.`,
      time: "الآن",
      type: "meal",
      isRead: false,
    };
    setNotifications([notif, ...notifications]);
  };

  // Filtered Notifications
  const filteredNotifications = notifications.filter(n => notifRole === "all" || n.audience === notifRole);

  return (
    <div className="min-h-screen bg-[#07040D] text-white flex flex-col font-sans selection:bg-[#7C3AED] selection:text-white" dir="rtl">
      
      {/* 1. Quiet Cinematic Navigation Header (Zero Noise, PR Identity Only) */}
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

          {/* Clean Segment Tabs */}
          <nav className="hidden md:flex items-center bg-[#10091E] border border-white/[0.06] rounded-2xl p-1 text-xs font-medium">
            <button
              onClick={() => setActiveTab("cycles")}
              className={`px-3.5 py-1.5 rounded-xl transition ${
                activeTab === "cycles" ? "bg-[#1E1238] text-white shadow-sm border border-purple-500/20 font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              دورة اللاعبين والتمارين
            </button>
            <button
              onClick={() => setActiveTab("meals")}
              className={`px-3.5 py-1.5 rounded-xl transition ${
                activeTab === "meals" ? "bg-[#1E1238] text-white shadow-sm border border-purple-500/20 font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              جدول الوجبات والتنبيهات
            </button>
            <button
              onClick={() => setActiveTab("water")}
              className={`px-3.5 py-1.5 rounded-xl transition ${
                activeTab === "water" ? "bg-[#1E1238] text-white shadow-sm border border-purple-500/20 font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              متابعة شرب الماء
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`px-3.5 py-1.5 rounded-xl transition flex items-center gap-2 ${
                activeTab === "notifications" ? "bg-[#1E1238] text-white shadow-sm border border-purple-500/20 font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              <span>مركز الإشعارات</span>
              {notifications.some(n => !n.isRead) && (
                <span className="w-2 h-2 rounded-full bg-[#A78BFA] animate-pulse" />
              )}
            </button>
          </nav>
        </div>

        {/* Coach & Admin Quick Status */}
        <div className="flex items-center gap-3 text-xs">
          <Link 
            href="/dashboard/builder"
            className="px-3 py-1.5 rounded-xl bg-[#10091E] hover:bg-[#160D2A] border border-white/[0.08] text-slate-300 hover:text-white transition"
          >
            بيلدر التمارين
          </Link>
          <Link 
            href="/dashboard/formcheck"
            className="px-3 py-1.5 rounded-xl bg-[#10091E] hover:bg-[#160D2A] border border-white/[0.08] text-slate-300 hover:text-white transition"
          >
            فورمتشيك (12h)
          </Link>
          <Link 
            href="/app"
            className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold transition shadow-md shadow-purple-950/50"
          >
            تجربة المتدرب (PWA)
          </Link>
        </div>
      </header>

      {/* 2. Workspace Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Client Selector & Overall Cycle (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="flex items-center justify-between pb-1">
            <h2 className="text-sm font-bold text-white tracking-wide">قائمة المتدربين النشطين</h2>
            <span className="text-[11px] text-slate-400 font-mono">{clients.length} لاعبين</span>
          </div>

          <div className="space-y-2.5">
            {clients.map(client => {
              const isSelected = selectedClient.id === client.id;
              const hasDelayedMeal = client.meals.some(m => m.status === "delayed");

              return (
                <div
                  key={client.id}
                  onClick={() => setSelectedClient(client)}
                  className={`p-4 rounded-2xl border transition cursor-pointer text-xs ${
                    isSelected
                      ? "bg-[#120A22] border-[#7C3AED] shadow-lg shadow-purple-950/40"
                      : "bg-[#0B0616] border-white/[0.04] hover:border-white/[0.1] hover:bg-[#0F081C]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white text-sm">{client.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-lg border font-medium ${
                      hasDelayedMeal 
                        ? "bg-purple-950/80 border-purple-500/40 text-purple-200" 
                        : "bg-[#180E2E] border-white/[0.08] text-slate-300"
                    }`}>
                      {hasDelayedMeal ? "وجبة متأخرة" : "ملتزم بالجدول"}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 mb-3">{client.plan}</p>

                  {/* Progress indicators: Water & Meals */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300 border-t border-white/[0.04] pt-2.5">
                    <div>
                      <span className="text-slate-500 block">شرب الماء</span>
                      <span className="font-mono font-bold text-white">{client.waterDrankLiters} / {client.waterGoalLiters} L</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">نسبة الالتزام</span>
                      <span className="font-mono font-bold text-[#A78BFA]">{client.adherenceRate}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick WhatsApp Alert for Coach to Client */}
          <div className="p-4 rounded-2xl bg-[#0B0616] border border-white/[0.05] space-y-3">
            <div className="text-xs font-bold text-white">تنبيه فوري عبر واتساب للعميل</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              إرسال إشعار فوري للاعب {selectedClient.name} لتذكيره بشرب الماء أو موعد الوجبة القادمة.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => sendWhatsAppReminder(
                  selectedClient, 
                  `يا بطل، كابتنك بيفكرك تشرب مية دلوقتي، باقيلك ${(selectedClient.waterGoalLiters - selectedClient.waterDrankLiters).toFixed(1)} لتر على هدف النهاردة 💪`
                )}
                className="py-2.5 px-3 bg-[#120A22] hover:bg-[#1C0F35] border border-white/[0.08] text-slate-200 rounded-xl font-medium transition text-center"
              >
                تذكير شرب المية
              </button>
              <button
                type="button"
                onClick={() => sendWhatsAppReminder(
                  selectedClient, 
                  `يا بطل، متنساش تسجل وجبتك في معادها على المنصة عشان نحافظ على معدل حرق عالي والتزامك التدريبي 💪`
                )}
                className="py-2.5 px-3 bg-[#120A22] hover:bg-[#1C0F35] border border-white/[0.08] text-slate-200 rounded-xl font-medium transition text-center"
              >
                تذكير الوجبة
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Detailed Cycle, Meals, Water & Notification Systems (8 cols) */}
        <div className="lg:col-span-8 space-y-6">

          {/* Tab 1: Cycles & Overview */}
          {activeTab === "cycles" && (
            <div className="space-y-6">
              
              {/* Client Hero Banner */}
              <div className="p-6 rounded-3xl bg-[#0E071A] border border-purple-500/20 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="inline-block px-2.5 py-1 rounded-lg bg-[#1D1136] border border-purple-500/30 text-[10px] text-[#A78BFA] font-mono mb-2">
                      {selectedClient.currentDay}
                    </div>
                    <h1 className="text-2xl font-black text-white">{selectedClient.name}</h1>
                    <p className="text-xs text-slate-400 mt-1">{selectedClient.plan} · هاتف: {selectedClient.phone}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => sendWhatsAppReminder(selectedClient, "مساء الخير يا بطل، بتابع معاك الدورة التدريبية ومواعيد وجباتك اليوم.")}
                      className="px-4 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition shadow-lg shadow-purple-950/60"
                    >
                      مراسلة المتدرب مباشرة
                    </button>
                  </div>
                </div>

                {/* 3 Metric Cards with Unified Purple/White Palette */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                  <div className="bg-[#120A22] p-3.5 rounded-2xl border border-white/[0.05]">
                    <span className="text-[11px] text-slate-400 block mb-1">الالتزام العام</span>
                    <span className="text-xl font-mono font-black text-[#A78BFA]">{selectedClient.adherenceRate}%</span>
                  </div>
                  <div className="bg-[#120A22] p-3.5 rounded-2xl border border-white/[0.05]">
                    <span className="text-[11px] text-slate-400 block mb-1">لترات الماء اليوم</span>
                    <span className="text-xl font-mono font-black text-white">{selectedClient.waterDrankLiters} L</span>
                  </div>
                  <div className="bg-[#120A22] p-3.5 rounded-2xl border border-white/[0.05]">
                    <span className="text-[11px] text-slate-400 block mb-1">الوجبات المكتملة</span>
                    <span className="text-xl font-mono font-black text-white">
                      {selectedClient.meals.filter(m => m.status === "done").length} / {selectedClient.meals.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Meals Schedule inside Cycle */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">جدول ومواعيد وجبات اليوم</h3>
                  <button
                    onClick={() => setActiveTab("meals")}
                    className="text-xs text-[#A78BFA] hover:underline"
                  >
                    تعديل خطة التغذية
                  </button>
                </div>

                <div className="space-y-2">
                  {selectedClient.meals.map(meal => (
                    <div 
                      key={meal.id} 
                      className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs transition ${
                        meal.status === "done" 
                          ? "bg-[#0D0717] border-white/[0.05] opacity-80" 
                          : meal.status === "delayed" 
                          ? "bg-[#180E2B] border-[#7C3AED]/50" 
                          : "bg-[#0F081C] border-white/[0.06]"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{meal.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({meal.time})</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {meal.calories} سعرة حرارية · {meal.protein}g بروتين · هدف ماء: {meal.waterTargetMl} مل
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] px-2 py-1 rounded-lg border font-medium ${
                          meal.status === "done"
                            ? "bg-[#160E2A] text-slate-300 border-white/[0.08]"
                            : meal.status === "delayed"
                            ? "bg-[#251245] text-purple-200 border-[#7C3AED]"
                            : "bg-[#110A1E] text-slate-400 border-white/[0.05]"
                        }`}>
                          {meal.status === "done" ? "تم تناولها" : meal.status === "delayed" ? "متأخرة عن الموعد" : "قادمة"}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleToggleMeal(meal.id)}
                          className="px-3 py-1.5 rounded-xl bg-[#1A1030] hover:bg-[#251445] text-white border border-white/[0.08] text-[11px] transition"
                        >
                          {meal.status === "done" ? "إلغاء التأكيد" : "تأكيد التناول"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Tab 2: Meals Manager (Coach adds/sets meals) */}
          {activeTab === "meals" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.04]">
                <div>
                  <h2 className="text-base font-bold text-white">خطة وجبات المتدرب ({selectedClient.name})</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    النظام يرسل تنبيهاً تلقائياً للمتدرب والكوتش والأدمن إذا تأخرت الوجبة أكثر من 30 دقيقة عن موعدها.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddMealModal(true)}
                  className="px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold rounded-xl transition"
                >
                  + إضافة وجبة جديدة
                </button>
              </div>

              {/* Meals List */}
              <div className="space-y-3">
                {selectedClient.meals.map((meal, index) => (
                  <div key={meal.id} className="p-4 rounded-2xl bg-[#0D0717] border border-white/[0.05] flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-5 h-5 rounded-full bg-[#1A1030] border border-purple-500/30 text-[10px] text-[#A78BFA] flex items-center justify-center font-mono">
                          {index + 1}
                        </span>
                        <span className="font-bold text-white text-sm">{meal.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 space-x-3 space-x-reverse font-mono">
                        <span>الموعد: {meal.time}</span>
                        <span>·</span>
                        <span>السعرات: {meal.calories} kcal</span>
                        <span>·</span>
                        <span>البروتين: {meal.protein}g</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleMeal(meal.id)}
                        className="px-3.5 py-2 rounded-xl bg-[#1A1030] hover:bg-[#251445] border border-white/[0.08] text-white text-xs font-medium transition"
                      >
                        {meal.status === "done" ? "إلغاء المكتمل" : "تحديد كمكتمل"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Meal Simple Inline Modal */}
              {showAddMealModal && (
                <div className="p-5 rounded-2xl bg-[#120A24] border border-[#7C3AED] space-y-4">
                  <h3 className="text-xs font-bold text-white">إضافة وجبة وتوقيتها لنظام التنبيه</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-slate-400 block mb-1">اسم ومحتوى الوجبة</label>
                      <input
                        type="text"
                        placeholder="مثال: 200 جرام صدور مشوية + 150 جرام أرز"
                        value={newMealName}
                        onChange={(e) => setNewMealName(e.target.value)}
                        className="w-full bg-[#0A0514] border border-white/[0.08] rounded-xl px-3 py-2.5 text-white outline-none focus:border-[#7C3AED]"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">الموعد المحدد للتذكير</label>
                      <input
                        type="text"
                        placeholder="مثال: 07:00 م"
                        value={newMealTime}
                        onChange={(e) => setNewMealTime(e.target.value)}
                        className="w-full bg-[#0A0514] border border-white/[0.08] rounded-xl px-3 py-2.5 text-white outline-none focus:border-[#7C3AED]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setShowAddMealModal(false)}
                      className="px-3 py-2 bg-[#1A1030] text-slate-300 rounded-xl"
                    >
                      إلغاء
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!newMealName) return;
                        const newMeal: ClientMeal = {
                          id: String(Date.now()),
                          name: newMealName,
                          time: newMealTime,
                          calories: parseInt(newMealCal) || 400,
                          protein: parseInt(newMealProt) || 35,
                          waterTargetMl: 500,
                          waterCurrentMl: 0,
                          status: "pending",
                        };
                        const updated = { ...selectedClient, meals: [...selectedClient.meals, newMeal] };
                        setSelectedClient(updated);
                        setClients(clients.map(c => c.id === updated.id ? updated : c));
                        setShowAddMealModal(false);
                        setNewMealName("");
                      }}
                      className="px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl font-bold"
                    >
                      حفظ وتفعيل التنبيه
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Tab 3: Water Tracker & Hydration Cycle */}
          {activeTab === "water" && (
            <div className="space-y-6">
              
              <div className="p-6 rounded-3xl bg-[#0D0717] border border-white/[0.06] text-center space-y-4">
                <div className="inline-block p-3 rounded-2xl bg-[#1A1030] border border-purple-500/20 text-[#A78BFA] text-2xl font-mono">
                  {selectedClient.waterDrankLiters} / {selectedClient.waterGoalLiters} L
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">متابعة شرب الماء لـ {selectedClient.name}</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                    ترطيب الجسم أساس تخليق البروتين العضلي ومنع التقلصات. يتم إرسال تنبيهات تلقائية كل ساعتين حتى يكتمل الهدف.
                  </p>
                </div>

                {/* Visual Water Fill Bar */}
                <div className="w-full bg-[#140B24] h-4 rounded-full border border-white/[0.05] overflow-hidden max-w-md mx-auto">
                  <div 
                    className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] h-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, (selectedClient.waterDrankLiters / selectedClient.waterGoalLiters) * 100)}%` }}
                  />
                </div>

                {/* Add Quick Intake Buttons */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => { setWaterAmountInput(250); handleAddWater(); }}
                    className="px-4 py-2 bg-[#170E2C] hover:bg-[#241344] border border-white/[0.08] text-white text-xs rounded-xl transition font-mono"
                  >
                    + 250 مل (كوب)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setWaterAmountInput(500); handleAddWater(); }}
                    className="px-4 py-2 bg-[#170E2C] hover:bg-[#241344] border border-white/[0.08] text-white text-xs rounded-xl transition font-mono"
                  >
                    + 500 مل (زجاجة صغيرة)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setWaterAmountInput(1000); handleAddWater(); }}
                    className="px-4 py-2 bg-[#170E2C] hover:bg-[#241344] border border-white/[0.08] text-white text-xs rounded-xl transition font-mono"
                  >
                    + 1000 مل (1 لتر)
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* Tab 4: 360 Notifications Center (Athlete + Coach + Admin Cycles) */}
          {activeTab === "notifications" && (
            <div className="space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/[0.04]">
                <div>
                  <h2 className="text-base font-bold text-white">مركز الإشعارات والتحكم الشامل (Cycle Monitor)</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    تتبع كل ما يدور بين اللاعب والمدرب والنظام لضمان أعلى انضباط.
                  </p>
                </div>

                {/* Audience Filter Pills */}
                <div className="inline-flex items-center bg-[#10091E] border border-white/[0.06] rounded-xl p-1 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setNotifRole("all")}
                    className={`px-3 py-1 rounded-lg transition ${notifRole === "all" ? "bg-[#1E1238] text-white font-bold" : "text-slate-400 hover:text-white"}`}
                  >
                    الكل
                  </button>
                  <button
                    type="button"
                    onClick={() => setNotifRole("athlete")}
                    className={`px-3 py-1 rounded-lg transition ${notifRole === "athlete" ? "bg-[#1E1238] text-white font-bold" : "text-slate-400 hover:text-white"}`}
                  >
                    إشعارات المتدربين
                  </button>
                  <button
                    type="button"
                    onClick={() => setNotifRole("coach")}
                    className={`px-3 py-1 rounded-lg transition ${notifRole === "coach" ? "bg-[#1E1238] text-white font-bold" : "text-slate-400 hover:text-white"}`}
                  >
                    إشعارات المدرب
                  </button>
                  <button
                    type="button"
                    onClick={() => setNotifRole("admin")}
                    className={`px-3 py-1 rounded-lg transition ${notifRole === "admin" ? "bg-[#1E1238] text-white font-bold" : "text-slate-400 hover:text-white"}`}
                  >
                    تقارير الأدمن
                  </button>
                </div>
              </div>

              {/* Notification Cards */}
              <div className="space-y-2.5">
                {filteredNotifications.map(item => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-[#0D0717] border border-white/[0.05] hover:border-[#7C3AED]/30 transition space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-lg border font-mono ${
                          item.audience === "admin" 
                            ? "bg-purple-950/70 border-purple-500/40 text-purple-200" 
                            : item.audience === "coach"
                            ? "bg-[#170E2C] border-white/[0.08] text-slate-300"
                            : "bg-[#140B24] border-[#7C3AED]/40 text-[#A78BFA]"
                        }`}>
                          {item.audience === "admin" ? "أدمن" : item.audience === "coach" ? "المدرب" : "المتدرب"}
                        </span>
                        <span className="font-bold text-white text-sm">{item.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{item.time}</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.message}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

      </main>

      {/* Subtle Minimal Footer */}
      <footer className="py-4 text-center text-[10px] text-slate-600 border-t border-white/[0.03]">
        CoachPR Platform · لوحة تحكم وإدارة موحدة · 2026
      </footer>

    </div>
  );
}
