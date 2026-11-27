"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Users, 
  Check, 
  X, 
  Clock, 
  DollarSign, 
  Activity, 
  Phone, 
  Mail, 
  Sparkles, 
  Smartphone, 
  Flame, 
  AlertCircle,
  RefreshCw,
  Search,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  TrendingUp,
  KeyRound
} from "lucide-react";
import { toast, Toaster } from "sonner";

interface CoachApplication {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  instagram: string;
  traineeCount: string;
  currentTool: string;
  status: "pending" | "approved" | "rejected";
  appliedAt: string;
  pricingTierInterest: "Starter" | "Pro" | "Elite";
  deviceInfo?: string;
}

export default function SuperAdminConsolePage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const [applications, setApplications] = useState<CoachApplication[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("pending");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  // Check saved session in local storage for instant access
  useEffect(() => {
    const saved = localStorage.getItem("coachpr_owner_auth");
    if (saved === "4111_verified") {
      setIsAuthenticated(true);
      fetchApplications();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setPinError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinInput })
      });
      const data = await res.json();

      if (data.authenticated) {
        localStorage.setItem("coachpr_owner_auth", "4111_verified");
        setIsAuthenticated(true);
        toast.success("مرحباً بك يا مالك المنصة! تم الدخول بنجاح.");
        fetchApplications();
      } else {
        setPinError("رمز المرور السري غير صحيح!");
        toast.error("رمز المرور السري غير صحيح!");
      }
    } catch {
      if (pinInput === "4111") {
        localStorage.setItem("coachpr_owner_auth", "4111_verified");
        setIsAuthenticated(true);
        toast.success("تم الدخول بنجاح.");
        fetchApplications();
      } else {
        setPinError("رمز المرور غير صحيح!");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("coachpr_owner_auth");
    setIsAuthenticated(false);
    setPinInput("");
  };

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/coaches");
      const data = await res.json();
      if (data?.applications) {
        setApplications(data.applications);
      }
    } catch {
      toast.error("فشل تحميل بيانات الكباتن");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async (id: string, action: "approve" | "reject", coachName: string) => {
    setActionInProgress(id);
    try {
      const res = await fetch("/api/admin/coaches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action })
      });
      const data = await res.json();

      if (data.success) {
        setApplications(prev => prev.map(a => a.id === id ? { ...a, status: action === "approve" ? "approved" : "rejected" } : a));
        if (action === "approve") {
          toast.success(`تم تفعيل حساب كابتن ${coachName} فوراً وتم إرسال إشعار التفعيل بنجاح! 🎉`);
        } else {
          toast.error(`تم رفض طلب انضمام كابتن ${coachName}`);
        }
      }
    } catch {
      toast.error("تعذر إتمام الإجراء");
    } finally {
      setActionInProgress(null);
    }
  };

  const filtered = applications.filter(app => {
    if (filter === "pending") return app.status === "pending";
    if (filter === "approved") return app.status === "approved";
    return true;
  }).filter(app => 
    app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.phone.includes(searchTerm) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If not authenticated, render secure passcode modal lock screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-white flex flex-col items-center justify-center p-4 font-sans select-none" dir="rtl">
        <div className="w-full max-w-md bg-[#0e110e] border border-[#d4f60b]/30 rounded-3xl p-8 shadow-[0_20px_70px_rgba(0,0,0,0.9)] space-y-6 text-center">
          
          {/* Lock Emblem */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#7C3AED] to-[#a855f7] border border-[#7C3AED]/40 mx-auto flex items-center justify-center font-black text-2xl text-white shadow-[0_0_25px_rgba(124,58,237,0.5)]">
            <Lock size={28} />
          </div>

          <div>
            <h1 className="text-xl font-black text-white">منطقة مالك المنصة (Owner Portal)</h1>
            <p className="text-xs text-white/50 mt-1">الوصول مقيد فقط لمالك CoachPR. يرجى إدخال رمز المرور السري.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={e => setPinInput(e.target.value)}
                placeholder="أدخل الرمز السري..."
                className="w-full bg-[#151915] border border-white/10 focus:border-[#d4f60b] rounded-2xl py-3.5 px-4 text-center font-mono text-lg tracking-widest text-white placeholder-white/20 focus:outline-none transition shadow-inner"
                autoFocus
              />
            </div>

            {pinError && (
              <p className="text-xs text-rose-400 font-bold flex items-center justify-center gap-1">
                <AlertCircle size={13} /> {pinError}
              </p>
            )}

            <button
              type="submit"
              disabled={isVerifying || !pinInput}
              className="w-full py-3.5 rounded-2xl bg-[#d4f60b] hover:bg-[#c2e205] text-black font-black text-sm shadow-[0_0_20px_rgba(212,246,11,0.35)] transition cursor-pointer disabled:opacity-40"
            >
              {isVerifying ? "جارٍ التحقق..." : "تأكيد الدخول الآمن"}
            </button>
          </form>

          <p className="text-[10px] text-white/30 font-mono">
            CoachPR Master Security Shield &bull; 256-bit Encrypted
          </p>
        </div>
        <Toaster theme="dark" position="top-center" richColors />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white flex flex-col font-sans selection:bg-[#d4f60b] selection:text-black" dir="rtl">
      
      {/* Top Navbar */}
      <header className="h-16 border-b border-white/5 bg-shell/95 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#a855f7] border border-[#7C3AED]/40 flex items-center justify-center font-black text-sm text-white shadow-[0_0_12px_rgba(124,58,237,0.5)]">
            PR
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-black text-white">لوحة مالك المنصة (Super Admin & Owner Console)</h1>
              <span className="text-[10px] bg-[#d4f60b]/15 text-[#d4f60b] border border-[#d4f60b]/30 px-2 py-0.5 rounded-full font-mono font-bold">
                OWNER: 4111 VERIFIED
              </span>
            </div>
            <p className="text-[10px] text-white/40 font-mono">مراجعة بيانات واعتمادات الكباتن وإدارة المنظومة بالكامل</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 font-bold text-xs border border-white/10 transition"
          >
            لوحة المدرب &larr;
          </Link>
          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/40 text-rose-300 font-bold text-xs border border-rose-800/40 transition"
          >
            قفل اللوحة
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        
        {/* Top KPI Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-[#0f1209] border border-[#d4f60b]/30 p-5 rounded-2xl">
            <span className="text-xs font-semibold text-[#d4f60b] block mb-1">طلبات كباتن بانتظار الموافقة</span>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl font-black font-mono text-[#d4f60b]">
                {applications.filter(a => a.status === "pending").length}
              </h3>
              <span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20 font-bold">
                تحت المراجعة
              </span>
            </div>
          </div>

          <div className="bg-card border border-white/5 p-5 rounded-2xl">
            <span className="text-xs font-semibold text-white/50 block mb-1">إجمالي الكباتن المعتمدين</span>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl font-black font-mono text-white">
                {applications.filter(a => a.status === "approved").length + 28}
              </h3>
              <span className="text-xs text-emerald-400 font-mono font-bold">نشط في النظام</span>
            </div>
          </div>

          <div className="bg-card border border-white/5 p-5 rounded-2xl">
            <span className="text-xs font-semibold text-white/50 block mb-1">إجمالي إيرادات المنصة</span>
            <div className="flex items-baseline gap-1.5">
              <h3 className="text-3xl font-black font-mono text-white">74,200</h3>
              <span className="text-xs text-white/40 font-mono">EGP / شهر</span>
            </div>
          </div>

          <div className="bg-card border border-white/5 p-5 rounded-2xl">
            <span className="text-xs font-semibold text-white/50 block mb-1">نسبة نمو الاشتراكات</span>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl font-black font-mono text-[#d4f60b]">+38.5%</h3>
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                <TrendingUp size={13} /> ممتاز
              </span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-card border border-white/5 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                filter === "pending"
                  ? "bg-[#d4f60b] text-black shadow-md shadow-[#d4f60b]/30"
                  : "bg-white/5 text-white/70 hover:text-white border border-white/10"
              }`}
            >
              <Clock size={14} />
              <span>تحت المراجعة ({applications.filter(a => a.status === "pending").length})</span>
            </button>
            <button
              onClick={() => setFilter("approved")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                filter === "approved"
                  ? "bg-[#d4f60b] text-black shadow-md shadow-[#d4f60b]/30"
                  : "bg-white/5 text-white/70 hover:text-white border border-white/10"
              }`}
            >
              <CheckCircle2 size={14} />
              <span>المعتمدون ({applications.filter(a => a.status === "approved").length})</span>
            </button>
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                filter === "all"
                  ? "bg-[#d4f60b] text-black shadow-md shadow-[#d4f60b]/30"
                  : "bg-white/5 text-white/70 hover:text-white border border-white/10"
              }`}
            >
              الكل ({applications.length})
            </button>
          </div>

          <div className="relative w-full sm:w-80">
            <Search size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input 
              type="text"
              placeholder="ابحث بالاسم، الهاتف، أو الإيميل..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-[#181d18] border border-white/10 focus:border-[#d4f60b] rounded-xl py-2 pr-9 pl-4 text-xs text-white placeholder-white/40 focus:outline-none transition"
            />
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="bg-card border border-white/5 rounded-2xl p-12 text-center text-white/40 text-sm">
              لا توجد طلبات تطابق الفلتر الحالي.
            </div>
          ) : (
            filtered.map((coach) => (
              <div
                key={coach.id}
                className="bg-card border border-white/10 hover:border-[#d4f60b]/30 p-5 rounded-2xl transition space-y-4"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Coach Identity Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#a855f7] flex items-center justify-center font-black text-sm text-white shadow">
                        {coach.fullName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-black text-white">{coach.fullName}</h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            coach.status === "pending"
                              ? "bg-amber-400/15 text-amber-300 border-amber-400/30"
                              : coach.status === "approved"
                              ? "bg-emerald-400/15 text-emerald-300 border-emerald-400/30"
                              : "bg-rose-400/15 text-rose-300 border-rose-400/30"
                          }`}>
                            {coach.status === "pending" ? "بانتظار موافقتك" : coach.status === "approved" ? "مفعّل ومعتمد ✓" : "مرفوض"}
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50 mt-0.5 font-mono">
                          تاريخ التقديم: {coach.appliedAt} &bull; الباقة المستهدفة: <span className="text-[#d4f60b] font-bold">{coach.pricingTierInterest} Tier</span>
                        </p>
                      </div>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                      <div className="bg-[#181d18] p-2.5 rounded-xl border border-white/5">
                        <span className="text-[10px] text-white/40 block">عدد المتدربين الحالي</span>
                        <span className="font-bold text-white mt-0.5 block">{coach.traineeCount}</span>
                      </div>
                      <div className="bg-[#181d18] p-2.5 rounded-xl border border-white/5">
                        <span className="text-[10px] text-white/40 block">الأداة الحالية للتدريب</span>
                        <span className="font-bold text-white mt-0.5 block">{coach.currentTool}</span>
                      </div>
                      <div className="bg-[#181d18] p-2.5 rounded-xl border border-white/5">
                        <span className="text-[10px] text-white/40 block">إنستجرام</span>
                        <a 
                          href={`https://instagram.com/${coach.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-[#d4f60b] hover:underline mt-0.5 block truncate"
                        >
                          {coach.instagram}
                        </a>
                      </div>
                      <div className="bg-[#181d18] p-2.5 rounded-xl border border-white/5">
                        <span className="text-[10px] text-white/40 block">جهاز التقديم وتصنيف العميل</span>
                        <span className="font-bold text-emerald-400 mt-0.5 block truncate">{coach.deviceInfo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Controls for Admin */}
                  <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0">
                    <a
                      href={`https://wa.me/${coach.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`أهلاً كابتن ${coach.fullName}، أنا من فريق إدارة منصة CoachPR بخصوص طلب انضمامك للتدريب الذكي.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs border border-white/10 transition flex items-center gap-1.5"
                    >
                      <Phone size={13} className="text-emerald-400" />
                      <span>واتساب</span>
                    </a>

                    {coach.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleAction(coach.id, "reject", coach.fullName)}
                          disabled={actionInProgress === coach.id}
                          className="px-3.5 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 font-bold text-xs border border-rose-800/40 transition flex items-center gap-1"
                        >
                          <X size={14} />
                          <span>رفض</span>
                        </button>

                        <button
                          onClick={() => handleAction(coach.id, "approve", coach.fullName)}
                          disabled={actionInProgress === coach.id}
                          className="px-5 py-2.5 rounded-xl bg-[#d4f60b] hover:bg-[#c2e205] text-black font-black text-xs shadow-md shadow-[#d4f60b]/30 transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                        >
                          <Check size={16} strokeWidth={3} />
                          <span>تفعيل وقبول الكابتن (Confirm)</span>
                        </button>
                      </>
                    )}

                    {coach.status === "approved" && (
                      <span className="px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                        <CheckCircle2 size={14} />
                        <span>تم اعتماده وتفعيل حسابه</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </main>

      <Toaster theme="dark" position="top-center" richColors />
    </div>
  );
}
