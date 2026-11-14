"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  Dumbbell, 
  Activity, 
  TrendingUp, 
  Award, 
  Video, 
  Apple,
  CreditCard,
  Calendar, 
  Search, 
  Plus, 
  Phone, 
  ChevronRight, 
  Sparkles, 
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ExternalLink,
  Flame,
  LayoutDashboard
} from "lucide-react";
import confetti from "canvas-confetti";

interface Client {
  id: string;
  name: string;
  phone: string;
  currentWeight: number;
  startWeight: number;
  goal: string;
  adherence: number;
  dailyStreak: number;
  lastActive: string;
  atRisk: boolean;
  status: "active" | "warning" | "frozen";
}

const initialClients: Client[] = [
  {
    id: "1",
    name: "كريم أحمد مصطفى",
    phone: "01099238411",
    currentWeight: 76.2,
    startWeight: 84.0,
    goal: "تنشيف وبناء عضلات",
    adherence: 94,
    dailyStreak: 18,
    lastActive: "منذ ساعتين",
    atRisk: false,
    status: "active"
  },
  {
    id: "2",
    name: "محمود حسن السيد",
    phone: "01155829910",
    currentWeight: 89.5,
    startWeight: 90.0,
    goal: "خسارة دهون وزن زائد",
    adherence: 48,
    dailyStreak: 0,
    lastActive: "منذ 4 أيام",
    atRisk: true,
    status: "warning"
  },
  {
    id: "3",
    name: "عمر فاروق عبد الله",
    phone: "01288334412",
    currentWeight: 71.0,
    startWeight: 65.0,
    goal: "زيادة وزن وتضخيم (Bulk)",
    adherence: 88,
    dailyStreak: 12,
    lastActive: "منذ 5 ساعات",
    atRisk: false,
    status: "active"
  },
  {
    id: "4",
    name: "يوسف إبراهيم",
    phone: "01011883390",
    currentWeight: 82.0,
    startWeight: 82.0,
    goal: "لياقة بدنية وقوة",
    adherence: 70,
    dailyStreak: 5,
    lastActive: "أمس",
    atRisk: false,
    status: "frozen"
  }
];

export default function DashboardPage() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [selectedClient, setSelectedClient] = useState<Client | null>(initialClients[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [newClientGoal, setNewClientGoal] = useState("تنشيف");
  const [newClientWeight, setNewClientWeight] = useState("80");

  const filteredClients = clients.filter(c => 
    c.name.includes(searchTerm) || c.phone.includes(searchTerm)
  );

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newClientPhone) return;

    const newClient: Client = {
      id: String(Date.now()),
      name: newClientName,
      phone: newClientPhone,
      currentWeight: parseFloat(newClientWeight) || 80,
      startWeight: parseFloat(newClientWeight) || 80,
      goal: newClientGoal,
      adherence: 100,
      dailyStreak: 1,
      lastActive: "الآن",
      atRisk: false,
      status: "active"
    };

    setClients([newClient, ...clients]);
    setSelectedClient(newClient);
    setShowAddModal(false);
    setNewClientName("");
    setNewClientPhone("");

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0612] text-slate-100 flex flex-col font-sans" dir="rtl">
      {/* Top Navigation */}
      <header className="bg-[#110A1E] border-b border-purple-900/30 px-6 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/pr-logo.png" alt="CoachPRB Logo" className="h-9 w-auto object-contain" />
            <span className="font-heading font-black text-xl text-white">Coach<span className="text-[#A78BFA]">PRB</span></span>
          </Link>
          <span className="text-xs font-semibold px-2.5 py-1 bg-[#17102A] text-purple-300 border border-purple-500/30 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-300 animate-pulse" />
            لوحة تحكم المدربين
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold text-white">كابتن عمر مصطفى</div>
            <div className="text-[11px] text-purple-400">باقة Pro · 50 عميل</div>
          </div>
          <Link 
            href="/dashboard/formcheck"
            className="text-xs bg-[#17102A] hover:bg-[#6D28D9]/40 text-purple-200 border border-purple-500/30 px-3 py-2 rounded-xl transition flex items-center gap-1.5 font-bold"
          >
            <Video className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">فورم تشيك و AI</span>
          </Link>
          <Link 
            href="/dashboard/business"
            className="text-xs bg-[#17102A] hover:bg-[#6D28D9]/40 text-purple-200 border border-purple-500/30 px-3 py-2 rounded-xl transition flex items-center gap-1.5 font-bold"
          >
            <CreditCard className="w-3.5 h-3.5 text-purple-300" />
            <span className="hidden sm:inline">الاشتراكات والجدولة</span>
          </Link>
          <Link 
            href="/app"
            className="text-xs bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-3 py-2 rounded-xl transition flex items-center gap-1.5 font-bold shadow-md shadow-purple-900/40"
          >
            <span>تطبيق المتدرب PWA</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Stats & Clients List) - 5 Cols */}
        <div className="lg:col-span-5 space-y-4 flex flex-col">
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#140C24] p-3.5 rounded-2xl border border-purple-900/30 text-center">
              <div className="text-[11px] text-slate-400 mb-1">العملاء النشطين</div>
              <div className="text-2xl font-black text-white">{clients.length}</div>
            </div>
            <div className="bg-[#140C24] p-3.5 rounded-2xl border border-purple-900/30 text-center">
              <div className="text-[11px] text-slate-400 mb-1">متوسط الالتزام</div>
              <div className="text-2xl font-black text-[#A78BFA]">84%</div>
            </div>
            <div className="bg-[#140C24] p-3.5 rounded-2xl border border-rose-900/30 text-center">
              <div className="text-[11px] text-rose-300 mb-1">بحاجة لمتابعة</div>
              <div className="text-2xl font-black text-rose-400">
                {clients.filter(c => c.atRisk).length}
              </div>
            </div>
          </div>

          {/* Search & Add Action */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              <input
                type="text"
                placeholder="ابحث بالاسم أو رقم الهاتف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#140C24] border border-purple-900/30 rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#7C3AED]"
              />
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition shadow-lg shadow-purple-900/40"
            >
              <Plus className="w-4 h-4" />
              <span>عميل جديد</span>
            </button>
          </div>

          {/* Clients Scrollable List */}
          <div className="bg-[#110A1E] border border-purple-900/30 rounded-2xl p-2 space-y-2 flex-1 overflow-y-auto max-h-[600px]">
            {filteredClients.map((client) => {
              const isSelected = selectedClient?.id === client.id;
              return (
                <div
                  key={client.id}
                  onClick={() => setSelectedClient(client)}
                  className={`p-3.5 rounded-xl cursor-pointer transition border flex items-center justify-between ${
                    isSelected
                      ? "bg-[#1C1133] border-[#7C3AED] shadow-md shadow-purple-900/30"
                      : "bg-[#140C24] border-purple-900/20 hover:border-purple-600/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-800 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{client.name}</span>
                        {client.atRisk && (
                          <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded border border-rose-500/30 flex items-center gap-1 font-bold">
                            <AlertTriangle className="w-2.5 h-2.5" /> تنبيه
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>{client.goal}</span>
                        <span>•</span>
                        <span>{client.currentWeight} كجم</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left">
                    <div className="text-xs font-bold text-purple-300">{client.adherence}% التزام</div>
                    <div className="text-[10px] text-slate-500">{client.lastActive}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (Client Profile & Real Actions) - 7 Cols */}
        <div className="lg:col-span-7">
          {selectedClient ? (
            <div className="bg-[#140C24] border border-purple-900/30 rounded-2xl p-6 space-y-6">
              {/* Header profile info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-purple-900/30 gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-black font-heading text-white">{selectedClient.name}</h2>
                    <span className="text-xs bg-purple-600/10 text-purple-300 border border-purple-600/20 px-2 py-0.5 rounded-full font-bold">
                      مشترك نشط
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                    <span>الهاتف: {selectedClient.phone}</span>
                    <span>الهدف: {selectedClient.goal}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/2${selectedClient.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>مراسلة واتساب</span>
                  </a>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#110A1E] p-3.5 rounded-xl border border-purple-900/20">
                  <div className="text-[11px] text-slate-400 mb-1">الوزن الحالي</div>
                  <div className="text-xl font-bold text-white">{selectedClient.currentWeight} كجم</div>
                  <div className="text-[10px] text-purple-300 mt-0.5">
                    {selectedClient.currentWeight < selectedClient.startWeight 
                      ? `نزول ${Math.abs(selectedClient.startWeight - selectedClient.currentWeight).toFixed(1)} كجم` 
                      : "بداية الرحلة"}
                  </div>
                </div>

                <div className="bg-[#110A1E] p-3.5 rounded-xl border border-purple-900/20">
                  <div className="text-[11px] text-slate-400 mb-1">سلسلة الـ 10/10</div>
                  <div className="text-xl font-bold text-[#A78BFA] flex items-center gap-1">
                    <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                    <span>{selectedClient.dailyStreak} يوم متتالي</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">درجة اليوم: 10/10</div>
                </div>

                <div className="bg-[#110A1E] p-3.5 rounded-xl border border-purple-900/20">
                  <div className="text-[11px] text-slate-400 mb-1">الرقم القياسي (PR)</div>
                  <div className="text-xl font-bold text-amber-300 flex items-center gap-1">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>140 kg</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Deadlift</div>
                </div>
              </div>

              {/* AI Assistant Insight */}
              <div className="bg-gradient-to-r from-purple-950/40 via-purple-900/20 to-transparent p-4 rounded-xl border border-purple-500/30">
                <div className="flex items-center gap-2 text-xs font-bold text-[#A78BFA] mb-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>توصية CoachPRB الذكية:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedClient.atRisk 
                    ? "العميل لم يسجل وجباته أو تمارينه منذ 4 أيام وهناك احتمالية 75% لتسربه. ننصح بإرسال رسالة تحفيزية عبر واتساب فوراً." 
                    : `العميل ملتزم بمعدل ${selectedClient.adherence}% وحقق زيادة ملحوظة في أوزان تمارين الدفع. يمكنك رفع أوزان الأسبوع القادم بنسبة 5%.`}
                </p>
              </div>

              {/* Action Tabs (Workout / Diet / Form Check) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <Dumbbell className="w-4 h-4 text-[#A78BFA]" />
                    <span>جدول تمارين العميل النشط</span>
                  </h3>
                  <div className="flex items-center gap-2">
                    <Link 
                      href="/dashboard/nutrition"
                      className="text-xs text-purple-300 hover:text-white bg-purple-950/40 border border-purple-600/30 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 transition"
                    >
                      <Apple className="w-3.5 h-3.5" />
                      <span>خطة الدايت والماكروز</span>
                    </Link>
                    <Link 
                      href="/dashboard/builder"
                      className="text-xs text-[#A78BFA] hover:text-white bg-purple-900/30 border border-purple-500/30 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 transition"
                    >
                      <span>فتح بيلدر التمارين</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="bg-[#110A1E] p-3 rounded-xl border border-purple-900/20 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white">Barbell Bench Press (صدر مستوي بالبار)</span>
                      <div className="text-slate-400 text-[11px]">4 مجموعات × 8-10 عدات | الراحة: 90 ثانية</div>
                    </div>
                    <span className="bg-purple-900/30 text-purple-300 px-2.5 py-1 rounded-lg font-mono font-bold">85 kg</span>
                  </div>

                  <div className="bg-[#110A1E] p-3 rounded-xl border border-purple-900/20 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white">Incline Dumbbell Press (تجميع دمبلز عالي)</span>
                      <div className="text-slate-400 text-[11px]">3 مجموعات × 10-12 عدة | الراحة: 60 ثانية</div>
                    </div>
                    <span className="bg-purple-900/30 text-purple-300 px-2.5 py-1 rounded-lg font-mono font-bold">30 kg</span>
                  </div>

                  <div className="bg-[#110A1E] p-3 rounded-xl border border-purple-900/20 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white">Cable Triceps Pushdown (ترايسبس كابل مسطرة)</span>
                      <div className="text-slate-400 text-[11px]">4 مجموعات × 12-15 عدة | تمبو: 2-0-1</div>
                    </div>
                    <span className="bg-purple-900/30 text-purple-300 px-2.5 py-1 rounded-lg font-mono font-bold">35 kg</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-12 text-slate-500 border border-dashed border-purple-900/30 rounded-2xl">
              اختر عميلاً من القائمة لعرض تفاصيله ومتابعته
            </div>
          )}
        </div>
      </div>

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#140C24] border border-purple-900/50 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">إضافة متدرب جديد</h3>
            <form onSubmit={handleAddClient} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">اسم المتدرب</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: أحمد محمد"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full bg-[#110A1E] border border-purple-900/40 rounded-xl p-3 text-white focus:outline-none focus:border-[#7C3AED]"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">رقم الواتساب</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: 01144826641"
                  value={newClientPhone}
                  onChange={(e) => setNewClientPhone(e.target.value)}
                  className="w-full bg-[#110A1E] border border-purple-900/40 rounded-xl p-3 text-white focus:outline-none focus:border-[#7C3AED]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">الوزن الحالي (كجم)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newClientWeight}
                    onChange={(e) => setNewClientWeight(e.target.value)}
                    className="w-full bg-[#110A1E] border border-purple-900/40 rounded-xl p-3 text-white focus:outline-none focus:border-[#7C3AED]"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">الهدف التدريبي</label>
                  <select
                    value={newClientGoal}
                    onChange={(e) => setNewClientGoal(e.target.value)}
                    className="w-full bg-[#110A1E] border border-purple-900/40 rounded-xl p-3 text-white focus:outline-none focus:border-[#7C3AED]"
                  >
                    <option value="تنشيف وخسارة دهون">تنشيف وخسارة دهون</option>
                    <option value="تضخيم وبناء عضلات">تضخيم وبناء عضلات</option>
                    <option value="تحسين القوة واللياقة">تحسين القوة واللياقة</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold hover:bg-slate-700 transition"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl font-bold transition shadow-lg shadow-purple-900/40"
                >
                  حفظ وإضافة العميل
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
