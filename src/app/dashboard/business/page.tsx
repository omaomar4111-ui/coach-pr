"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  CreditCard, 
  Calendar as CalendarIcon, 
  Users, 
  Clock, 
  Check, 
  PauseCircle, 
  PlayCircle, 
  AlertCircle, 
  ArrowLeft,
  Smartphone,
  Copy,
  Plus,
  Send,
  MessageCircle,
  FileText
} from "lucide-react";
import confetti from "canvas-confetti";

interface Subscription {
  id: string;
  clientName: string;
  phone: string;
  planName: string;
  amountEgp: number;
  startDate: string;
  endDate: string;
  daysRemaining: number;
  status: "active" | "expiring_soon" | "frozen";
}

interface BookingSlot {
  id: string;
  clientName: string;
  date: string;
  time: string;
  type: "مكالمة متابعة أسبوعية" | "استشارة تقييم دايت" | "مراجعة هدف وبطولة";
  status: "confirmed" | "completed";
}

export default function BusinessAndSchedulingPage() {
  const [activeTab, setActiveTab] = useState<"subs" | "bookings" | "payments">("subs");

  // Subscriptions State
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: "sub-1",
      clientName: "كريم أحمد مصطفى",
      phone: "01099238411",
      planName: "باقة الـ 3 شهور تدريب ومتابعة خاصة",
      amountEgp: 2400,
      startDate: "2026-09-01",
      endDate: "2026-11-30",
      daysRemaining: 16,
      status: "active"
    },
    {
      id: "sub-2",
      clientName: "محمود حسن السيد",
      phone: "01155829910",
      planName: "اشتراك شهري عادي",
      amountEgp: 900,
      startDate: "2026-10-18",
      endDate: "2026-11-17",
      daysRemaining: 3,
      status: "expiring_soon"
    },
    {
      id: "sub-3",
      clientName: "يوسف إبراهيم",
      phone: "01011883390",
      planName: "باقة 6 شهور تجهيز فورمة",
      amountEgp: 4500,
      startDate: "2026-08-01",
      endDate: "2027-02-01",
      daysRemaining: 78,
      status: "frozen"
    }
  ]);

  // Bookings State (Fitexpert style)
  const [bookings, setBookings] = useState<BookingSlot[]>([
    {
      id: "bk-1",
      clientName: "كريم أحمد مصطفى",
      date: "غداً · الأحد",
      time: "7:00 مساءً",
      type: "مكالمة متابعة أسبوعية",
      status: "confirmed"
    },
    {
      id: "bk-2",
      clientName: "عمر فاروق عبد الله",
      date: "الثلاثاء القادم",
      time: "8:30 مساءً",
      type: "استشارة تقييم دايت",
      status: "confirmed"
    }
  ]);

  const [bookingClientName, setBookingClientName] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [showAddBookingModal, setShowAddBookingModal] = useState(false);

  // Toggle freeze subscription
  const handleToggleFreeze = (subId: string) => {
    setSubscriptions(prev => prev.map(s => {
      if (s.id === subId) {
        const isFrozen = s.status === "frozen";
        return {
          ...s,
          status: isFrozen ? "active" : "frozen"
        };
      }
      return s;
    }));
    alert("تم تعديل حالة تجميد الاشتراك بنجاح دون ضياع الأيام المتبقية للعميل!");
  };

  const handleAddBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingClientName || !bookingTime || !bookingDate) return;

    const newBooking: BookingSlot = {
      id: `bk-${Date.now()}`,
      clientName: bookingClientName,
      date: bookingDate,
      time: bookingTime,
      type: "مكالمة متابعة أسبوعية",
      status: "confirmed"
    };

    setBookings([newBooking, ...bookings]);
    setShowAddBookingModal(false);
    setBookingClientName("");
    setBookingTime("");
    setBookingDate("");
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
  };

  return (
    <div className="min-h-screen bg-[#0A0612] text-white flex flex-col font-sans" dir="rtl">
      {/* Top Header */}
      <header className="bg-[#110A1E] border-b border-purple-900/30 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-slate-400 hover:text-white flex items-center gap-1.5 text-xs font-bold transition">
            <ArrowLeft className="w-4 h-4" />
            <span>لوحة التحكم</span>
          </Link>
          <div className="h-5 w-[1px] bg-purple-900/40" />
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#A78BFA]" />
            <h1 className="font-heading font-black text-lg text-white">
              إدارة الاشتراكات والمدفوعات والمواعيد <span className="text-xs bg-[#7C3AED] text-white px-2 py-0.5 rounded-full font-sans font-bold">Sprint 5</span>
            </h1>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 bg-[#140C24] p-1 rounded-xl border border-purple-900/40">
          <button
            onClick={() => setActiveTab("subs")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === "subs" ? "bg-[#7C3AED] text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            الاشتراكات والتجميد
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === "bookings" ? "bg-[#7C3AED] text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            جدول المواعيد والمكالمات
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === "payments" ? "bg-[#7C3AED] text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            بوابات الدفع (فودافون كاش / إنستاباي)
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        
        {/* VIEW 1: SUBSCRIPTIONS & FREEZE */}
        {activeTab === "subs" && (
          <div className="space-y-4">
            <div className="bg-[#140C24] p-4 rounded-2xl border border-purple-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white">إدارة اشتراكات المتدربين النشطة ({subscriptions.length})</h3>
                <p className="text-xs text-slate-400 mt-0.5">تتبع مواعيد الانتهاء، تجميد الاشتراكات، وإرسال تنبيهات التجديد عبر واتساب</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-purple-300 bg-purple-950/60 border border-purple-500/30 px-3 py-1.5 rounded-xl font-bold">
                  إجمالي الإيراد النشط: 7,800 ج.م
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {subscriptions.map((sub) => (
                <div key={sub.id} className="bg-[#140C24] p-4 rounded-2xl border border-purple-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h4 className="font-bold text-white text-sm">{sub.clientName}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        sub.status === "active" 
                          ? "bg-purple-600/20 text-purple-300 border border-purple-600/30"
                          : sub.status === "expiring_soon"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      }`}>
                        {sub.status === "active" ? "اشتراك نشط" : sub.status === "expiring_soon" ? "ينتهي خلال 3 أيام ⚠️" : "اشتراك مجمد (Frozen) ❄️"}
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 flex items-center gap-3">
                      <span>{sub.planName}</span>
                      <span>•</span>
                      <span className="text-[#A78BFA] font-bold">{sub.amountEgp} ج.م</span>
                      <span>•</span>
                      <span>المتبقي: {sub.daysRemaining} يوم</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {/* Send WhatsApp Renewal Reminder */}
                    <a
                      href={`https://wa.me/2${sub.phone}?text=أهلاً يا ${encodeURIComponent(sub.clientName)}، حابب أطمنك إن اشتراكك الحالي في CoachPRB قرب يخلص (متبقي ${sub.daysRemaining} أيام). لو حابب تجدد وتستمر في كسر أرقامك القياسية كلمني هنا مباشرة!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>تنبيه تجديد واتساب</span>
                    </a>

                    {/* Toggle Freeze */}
                    <button
                      onClick={() => handleToggleFreeze(sub.id)}
                      className={`text-xs px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 transition border ${
                        sub.status === "frozen"
                          ? "bg-purple-700/30 text-purple-200 border-purple-600/40"
                          : "bg-blue-600/20 text-blue-300 border-blue-500/30 hover:bg-blue-600/30"
                      }`}
                    >
                      {sub.status === "frozen" ? <PlayCircle className="w-3.5 h-3.5" /> : <PauseCircle className="w-3.5 h-3.5" />}
                      <span>{sub.status === "frozen" ? "إلغاء التجميد" : "تجميد الاشتراك"}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: BOOKINGS & SCHEDULING (FITEXPERT STYLE) */}
        {activeTab === "bookings" && (
          <div className="space-y-4">
            <div className="bg-[#140C24] p-4 rounded-2xl border border-purple-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white">جدول مكالمات واستشارات المتابعة (1-on-1 Calls)</h3>
                <p className="text-xs text-slate-400 mt-0.5">تنظيم أوقات المتابعة الأسبوعية وحجز المواعيد مع المتدربين</p>
              </div>
              <button
                onClick={() => setShowAddBookingModal(true)}
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-purple-900/40"
              >
                <Plus className="w-4 h-4" />
                <span>حجز موعد استشارة جديد</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookings.map((bk) => (
                <div key={bk.id} className="bg-[#140C24] p-4 rounded-2xl border border-purple-900/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{bk.clientName}</span>
                    <span className="text-[10px] bg-purple-900/40 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-bold">
                      {bk.status === "confirmed" ? "موعد مؤكد ✓" : "مكتمل"}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-[#A78BFA]" />
                    <span>{bk.date}</span>
                    <span>•</span>
                    <Clock className="w-4 h-4 text-[#A78BFA]" />
                    <span>{bk.time}</span>
                  </div>

                  <div className="text-[11px] text-slate-400">{bk.type}</div>

                  <div className="pt-2 border-t border-purple-900/20 flex justify-end gap-2">
                    <a
                      href="https://meet.google.com/new"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#17102A] hover:bg-[#6D28D9]/40 border border-purple-500/30 text-purple-200 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
                    >
                      بدء مكالمة الفيديو
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: PAYMENTS (VODAFONE CASH / INSTAPAY) */}
        {activeTab === "payments" && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-[#140C24] p-6 rounded-2xl border border-purple-900/30 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-purple-900/20">
                <Smartphone className="w-5 h-5 text-purple-300" />
                <h3 className="text-base font-bold text-white">طرق الدفع المحلية المعتمدة في CoachPRB</h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                يقوم عملاؤك بالتحويل على حسابك مباشرة عبر وسائل الدفع الأكثر استخداماً في مصر والوطن العربي، مع توليد إيصال وفاتورة رسمية:
              </p>

              {/* Vodafone Cash Card */}
              <div className="bg-[#110A1E] p-4 rounded-xl border border-rose-900/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span>فودافون كاش والمحافظ الإلكترونية (Vodafone Cash)</span>
                  </div>
                  <div className="text-xs text-[#A78BFA] font-mono font-bold mt-1">رقم المحفظة: 01144826641</div>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("01144826641");
                    alert("تم نسخ رقم فودافون كاش 01144826641!");
                  }}
                  className="text-xs bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>نسخ الرقم</span>
                </button>
              </div>

              {/* InstaPay Card */}
              <div className="bg-[#110A1E] p-4 rounded-xl border border-purple-900/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                    <span>إنستاباي (InstaPay التحويل اللحظي)</span>
                  </div>
                  <div className="text-xs text-[#A78BFA] font-mono font-bold mt-1">عنوان الدفع (IPA): coachprb@instapay</div>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("coachprb@instapay");
                    alert("تم نسخ معرف إنستاباي coachprb@instapay!");
                  }}
                  className="text-xs bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>نسخ المعرف</span>
                </button>
              </div>

              {/* Paymob Gateway Card */}
              <div className="bg-[#110A1E] p-4 rounded-xl border border-blue-900/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span>بوابة Paymob (فيزا / ماستركارد / كروت ميزة)</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">جاهزة للربط بمفتاح الـ API وتأكيد الاشتراكات أوتوماتيكياً عبر الـ Webhook</div>
                </div>
                <span className="text-[10px] bg-purple-600/20 text-purple-300 border border-purple-600/30 px-2 py-1 rounded font-bold">
                  مفعلة
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Booking Modal */}
      {showAddBookingModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#140C24] border border-purple-900/50 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">حجز جلسة استشارة جديدة</h3>
            <form onSubmit={handleAddBooking} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">اسم المتدرب</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: كريم أحمد"
                  value={bookingClientName}
                  onChange={(e) => setBookingClientName(e.target.value)}
                  className="w-full bg-[#110A1E] border border-purple-900/40 rounded-xl p-3 text-white focus:outline-none focus:border-[#7C3AED]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">اليوم</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: الأحد القادم"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-[#110A1E] border border-purple-900/40 rounded-xl p-3 text-white focus:outline-none focus:border-[#7C3AED]"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">الوقت</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: 8:00 مساءً"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full bg-[#110A1E] border border-purple-900/40 rounded-xl p-3 text-white focus:outline-none focus:border-[#7C3AED]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddBookingModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl font-bold"
                >
                  تأكيد الحجز
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
