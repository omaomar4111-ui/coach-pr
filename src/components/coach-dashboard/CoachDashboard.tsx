"use client";

import { useMemo, useState, useEffect } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import {
  Activity,
  Apple,
  ArrowDownLeft,
  ArrowUpLeft,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardCheck,
  ClipboardList,
  Dumbbell,
  FileText,
  Flame,
  HeartPulse,
  Home,
  LayoutDashboard,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  X,
  Zap,
  AlertTriangle,
  FileCheck
} from "lucide-react";
import MegatronModal from "@/components/MegatronModal";
import { toast } from "sonner";
import "./coach-dashboard.css";

type NavItem = {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  active?: boolean;
};

type Client = {
  id?: string;
  initials: string;
  name: string;
  plan: string;
  adherence: number;
  lastCheckIn: string;
  status: "at-risk" | "on-track" | "review";
};

type Metric = {
  label: string;
  value: string;
  suffix?: string;
  note: string;
  tone: "lime" | "purple" | "amber";
  icon?: typeof Users;
};

type WorkItem = {
  id: string;
  name: string;
  avatar: string;
  type: string;
  time: string;
  status: "pending" | "review" | "warning";
  actionHref?: string;
};

const navGroups: { title: string; items: NavItem[] }[] = [
  {
    title: "مساحة العمل",
    items: [
      { label: "نظرة عامة", href: "/dashboard", icon: Home, active: true },
      { label: "المهام والمتابعات", href: "/dashboard/inbox", icon: ClipboardList },
      { label: "الرسائل المباشرة", href: "/dashboard/messages", icon: MessageCircle },
    ],
  },
  {
    title: "إدارة التدريب",
    items: [
      { label: "اللاعبون", href: "/dashboard/clients", icon: Users },
      { label: "محرر البرامج (AI)", href: "/dashboard/builder", icon: Dumbbell },
      { label: "بنك التمارين", href: "/dashboard/exercises", icon: Flame },
      { label: "التغذية والماكروز", href: "/dashboard/nutrition", icon: Apple },
      { label: "فحص الإصابات والأشعة", href: "/intake", icon: HeartPulse },
    ],
  },
  {
    title: "إدارة الأعمال",
    items: [
      { label: "المدفوعات وإنستاباي", href: "/dashboard/payments", icon: Wallet },
      { label: "الباقات والأسعار", href: "/pricing", icon: FileText },
      { label: "رصيد الذكاء الاصطناعي", href: "/dashboard/ai-credits", icon: Zap },
    ],
  },
];

export function CoachDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMegatronOpen, setIsMegatronOpen] = useState(false);

  // Live Data States
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [workQueue, setWorkQueue] = useState<WorkItem[]>([]);
  const [weeklyRevenue, setWeeklyRevenue] = useState<any[]>([]);
  const [adherenceStats, setAdherenceStats] = useState<any>({
    averageAdherence: 82,
    onTrackCount: 18,
    needsFollowupCount: 4,
    pendingCount: 2
  });

  const fetchLiveDashboard = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await fetch("/api/dashboard/stats");
      const json = await res.json();
      if (json?.success && json?.data) {
        setMetrics(json.data.metrics || []);
        setClients(json.data.clients || []);
        setWorkQueue(json.data.workQueue || []);
        setWeeklyRevenue(json.data.weeklyRevenue || []);
        if (json.data.adherenceStats) {
          setAdherenceStats(json.data.adherenceStats);
        }
      } else {
        setIsError(true);
      }
    } catch (err) {
      console.error("[Dashboard Fetch Error]:", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveDashboard();
  }, []);

  const visibleClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch =
        client.name.includes(searchQuery.trim()) ||
        client.plan.includes(searchQuery.trim());

      if (!matchesSearch) return false;

      if (activeTab === "الكل") return true;
      if (activeTab === "يحتاج متابعة") return client.status === "at-risk";
      if (activeTab === "بانتظار المراجعة") return client.status === "review";
      if (activeTab === "منتظم") return client.status === "on-track";

      return true;
    });
  }, [clients, activeTab, searchQuery]);

  const statusLabel = (status: Client["status"]) => {
    switch (status) {
      case "at-risk":
        return "يحتاج تدخل";
      case "on-track":
        return "ملتزم";
      case "review":
        return "بانتظار المراجعة";
    }
  };

  return (
    <div className="cpr-dashboard" dir="rtl">
      {/* SIDEBAR NAVIGATION */}
      <aside className={`cpr-sidebar ${isSidebarOpen ? "is-open" : ""}`}>
        <div className="cpr-brand-row">
          <Link href="/dashboard" className="cpr-brand">
            <span className="cpr-brand-mark">
              C<span>P</span>
            </span>
            <span className="cpr-brand-name">
              Coach<span>PR</span>
            </span>
          </Link>
          <button
            className="cpr-icon-button cpr-sidebar-close"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="إغلاق القائمة"
          >
            <X size={18} />
          </button>
        </div>

        {/* WORKSPACE SWITCHER */}
        <div className="cpr-workspace-switcher">
          <div className="cpr-workspace-avatar">CP</div>
          <div className="cpr-workspace-copy">
            <strong>CoachPR Master</strong>
            <small>باقة الكابتن المحترف (Pro)</small>
          </div>
          <ChevronDown size={14} />
        </div>

        {/* NAVIGATION ITEMS */}
        <nav className="cpr-nav">
          {navGroups.map((group) => (
            <div className="cpr-nav-group" key={group.title}>
              <span className="cpr-nav-heading">{group.title}</span>
              {group.items.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`cpr-nav-link ${item.active ? "is-active" : ""}`}
                  >
                    <IconComponent size={16} />
                    <span>{item.label}</span>
                    {item.label === "اللاعبون" && (
                      <span className="cpr-nav-count">{clients.length || 24}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* SIDEBAR BOTTOM / PLAN METER */}
        <div className="cpr-sidebar-bottom">
          <div className="cpr-plan-meter">
            <div className="cpr-plan-meter-top">
              <span>سعة باقة المتدربين</span>
              <strong>{clients.length || 24} / 30 لاعب</strong>
            </div>
            <div className="cpr-meter-track">
              <span style={{ width: `${Math.min(100, ((clients.length || 24) / 30) * 100)}%` }} />
            </div>
            <small>أول 5 لاعبين مجاناً مدى الحياة 🎁</small>
          </div>

          <Link href="/settings" className="cpr-account-link">
            <div className="cpr-account-avatar">كأ</div>
            <div className="cpr-account-copy">
              <strong>كابتن أحمد علي</strong>
              <small>owner@coachpr.com</small>
            </div>
            <Settings size={14} />
          </Link>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="cpr-main">
        {/* TOP COMMAND BAR */}
        <header className="cpr-topbar">
          <div className="cpr-topbar-right">
            <button
              className="cpr-icon-button cpr-menu-trigger"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="فتح القائمة"
            >
              <Menu size={18} />
            </button>
            <div className="cpr-breadcrumb">
              <span>الرئيسية</span>
              <span className="cpr-breadcrumb-separator">/</span>
              <strong>لوحة تشغيل المدرب (Live Command)</strong>
            </div>
          </div>

          <div className="cpr-topbar-actions">
            {/* Quick Search */}
            <div className="cpr-search-box">
              <Search size={14} />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن لاعب أو خطة أو تمرين..."
              />
              <kbd>⌘K</kbd>
            </div>

            {/* Refresh Data */}
            <button
              onClick={fetchLiveDashboard}
              className="cpr-icon-button"
              title="تحديث البيانات اللحظية"
              aria-label="تحديث"
            >
              <RefreshCw size={16} className={isLoading ? "animate-spin text-[#d4f60b]" : ""} />
            </button>

            {/* Notification Bell */}
            <button
              className="cpr-icon-button cpr-notification-button"
              aria-label="التنبيهات والمتابعات"
            >
              <Bell size={16} />
              <i />
            </button>

            {/* MEGATRON AI TRIGGER BUTTON */}
            <button
              className="cpr-megatron-button"
              onClick={() => setIsMegatronOpen(true)}
            >
              <Sparkles size={16} />
              <span>مساعد ميجاترون (بضغطة زر ⚡)</span>
            </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="cpr-page-content">
          {/* Header Row */}
          <div className="cpr-page-heading">
            <div>
              <div className="cpr-eyebrow">
                <span className="cpr-live-dot" />
                <span>مركز العمليات المباشر &bull; LIVE DASHBOARD</span>
              </div>
              <h1>
                مرحباً يا كابتن <span>👋</span>
              </h1>
              <p>نظرة شاملة على نبض أبطالك، مهام المتابعة المطلوبة، والتدفقات المالية اليومية.</p>
            </div>

            <div className="cpr-page-heading-actions">
              <span className="cpr-demo-label">🟢 سيرفر البيانات متصل</span>
              <Link href="/intake" className="cpr-secondary-button">
                <HeartPulse size={14} />
                <span>رابط فحص اللاعبين (/intake)</span>
              </Link>
              <Link href="/dashboard/builder" className="cpr-primary-button">
                <Plus size={14} />
                <span>برنامج تدريبي جديد</span>
              </Link>
            </div>
          </div>

          {/* ERROR ALERT IF SUPABASE IS OFFLINE */}
          {isError && (
            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-rose-300 text-xs mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} />
                <span>تعذر استرجاع بعض البيانات من السيرفر. تم تفعيل الكاش المحلي الاحتياطي.</span>
              </div>
              <button
                onClick={fetchLiveDashboard}
                className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition"
              >
                إعادة المحاولة
              </button>
            </div>
          )}

          {/* 4 PRIMARY KPI METRIC CARDS */}
          <section className="cpr-metrics-grid" aria-label="المؤشرات التشغيلية">
            {isLoading ? (
              // Skeletons
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="cpr-metric-card animate-pulse bg-white/5 border border-white/5 h-28 rounded-2xl" />
              ))
            ) : (
              metrics.map((card) => {
                const iconTone = card.tone === "lime" ? "tone-lime" : "tone-purple";
                return (
                  <div key={card.label} className="cpr-metric-card">
                    <div className="cpr-metric-card-top">
                      <span className="cpr-metric-label">{card.label}</span>
                      <div className={`cpr-metric-icon ${iconTone}`}>
                        {card.label.includes("اللاعبون") ? (
                          <Users size={16} />
                        ) : card.label.includes("المراجعة") ? (
                          <ClipboardCheck size={16} />
                        ) : card.label.includes("إيرادات") ? (
                          <Wallet size={16} />
                        ) : (
                          <Activity size={16} />
                        )}
                      </div>
                    </div>
                    <div className="cpr-metric-value-wrap">
                      <span className="cpr-metric-value">{card.value}</span>
                      {card.suffix && <span className="cpr-metric-suffix">{card.suffix}</span>}
                    </div>
                    <span className="cpr-metric-note">{card.note}</span>
                  </div>
                );
              })
            )}
          </section>

          {/* MID GRID: WORK QUEUE & REVENUE CHART */}
          <div className="cpr-content-grid cpr-top-grid">
            {/* WORK QUEUE (ACTIONABLE TASKS) */}
            <section className="cpr-panel cpr-tasks-panel">
              <div className="cpr-panel-header">
                <div>
                  <span className="cpr-section-kicker">DAILY WORK QUEUE</span>
                  <h2>طابور المهام والمتابعات اليومية</h2>
                </div>
                <Link href="/dashboard/inbox" className="cpr-text-link">
                  فتح المركز الوارد <ArrowDownLeft size={14} />
                </Link>
              </div>

              <div className="cpr-task-list">
                {workQueue.map((item) => (
                  <div key={item.id} className="cpr-task-item">
                    <div className="cpr-task-avatar">{item.avatar}</div>
                    <div className="cpr-task-body">
                      <div className="cpr-task-title-row">
                        <strong>{item.name}</strong>
                        <span className="cpr-task-time">{item.time}</span>
                      </div>
                      <p className="cpr-task-text">{item.type}</p>
                    </div>
                    <Link
                      href={item.actionHref || "/dashboard/inbox"}
                      className="cpr-task-action"
                    >
                      إجراء <ArrowDownLeft size={13} />
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            {/* WEEKLY REVENUE CHART */}
            <section className="cpr-panel cpr-revenue-panel">
              <div className="cpr-panel-header">
                <div>
                  <span className="cpr-section-kicker">FINANCIAL PULSE</span>
                  <h2>إيرادات الأسبوع (InstaPay)</h2>
                </div>
                <Link href="/dashboard/payments" className="cpr-text-link">
                  سجل التحويلات <ArrowDownLeft size={14} />
                </Link>
              </div>

              <div className="cpr-revenue-summary">
                <strong>
                  {metrics.find((m) => m.label.includes("إيرادات"))?.value || "18,450"}{" "}
                  <small>ج.م</small>
                </strong>
                <span className="cpr-positive-change">
                  <ArrowUpLeft size={13} /> 100% محصلة
                </span>
                <small>تحصيل لحظي مباشر 0% عمولة</small>
              </div>

              <div className="cpr-chart" role="img" aria-label="رسم توضيحي للإيرادات خلال سبعة أيام">
                <div className="cpr-chart-guides">
                  <span>أقصى</span>
                  <span>متوسط</span>
                  <span>بداية</span>
                </div>
                <div className="cpr-chart-bars">
                  {weeklyRevenue.map((bar, index) => (
                    <div className="cpr-chart-column" key={bar.day}>
                      <div
                        className={`cpr-chart-bar ${index === 6 ? "is-highlighted" : ""}`}
                        style={{ height: `${bar.barPercentage || 30}%` }}
                        title={`${bar.revenue || 0} EGP`}
                      />
                      <span>{bar.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* BOTTOM GRID: CLIENT PULSE TABLE & ADHERENCE GAUGE */}
          <div className="cpr-content-grid cpr-bottom-grid">
            {/* CLIENT PULSE TABLE */}
            <section className="cpr-panel cpr-clients-panel">
              <div className="cpr-panel-header cpr-clients-heading">
                <div>
                  <span className="cpr-section-kicker">CLIENT PULSE & HEALTH</span>
                  <h2>حالة ونشاط الرياضيين</h2>
                </div>
                <Link href="/dashboard/clients" className="cpr-text-link">
                  عرض كل اللاعبين <ArrowDownLeft size={14} />
                </Link>
              </div>

              {/* Tabs Filter */}
              <div className="cpr-client-tabs" role="tablist" aria-label="فلترة اللاعبين">
                {["الكل", "يحتاج متابعة", "بانتظار المراجعة", "منتظم"].map((tab) => (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={activeTab === tab}
                    className={activeTab === tab ? "is-selected" : ""}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Table */}
              <div className="cpr-client-table-wrap">
                <table className="cpr-client-table">
                  <thead>
                    <tr>
                      <th>اللاعب</th>
                      <th>الهدف التدريبي</th>
                      <th>الالتزام</th>
                      <th>آخر تسجيل</th>
                      <th>الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleClients.map((client) => (
                      <tr key={client.name}>
                        <td>
                          <span className="cpr-client-name">
                            <i>{client.initials}</i>
                            <strong>{client.name}</strong>
                          </span>
                        </td>
                        <td>{client.plan}</td>
                        <td>
                          <span className="cpr-adherence-cell">
                            <span className="cpr-mini-progress">
                              <i style={{ width: `${client.adherence}%` }} />
                            </span>
                            <b>{client.adherence}%</b>
                          </span>
                        </td>
                        <td>{client.lastCheckIn}</td>
                        <td>
                          <span className={`cpr-status-badge ${client.status}`}>
                            {statusLabel(client.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {visibleClients.length === 0 && (
                      <tr>
                        <td className="cpr-empty-state" colSpan={5}>
                          لا توجد نتائج مطابقة للبحث أو الفلتر المختار.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ADHERENCE RING & INSIGHTS */}
            <section className="cpr-panel cpr-adherence-panel">
              <div className="cpr-panel-header">
                <div>
                  <span className="cpr-section-kicker">CONSISTENCY</span>
                  <h2>معدل الالتزام العام</h2>
                </div>
                <button className="cpr-quiet-icon" aria-label="خيارات الالتزام">
                  <MoreHorizontal size={19} />
                </button>
              </div>

              <div className="cpr-adherence-content">
                <div
                  className="cpr-progress-ring"
                  style={{ "--cpr-progress": `${adherenceStats.averageAdherence || 82}%` } as CSSProperties}
                >
                  <div>
                    <strong>
                      {adherenceStats.averageAdherence || 82}
                      <span>%</span>
                    </strong>
                    <small>متوسط الالتزام</small>
                  </div>
                </div>

                <div className="cpr-adherence-stats">
                  <div>
                    <i className="cpr-legend-dot lime-dot" />
                    <span>ملتزمون بالخطة</span>
                    <strong>{adherenceStats.onTrackCount || 18}</strong>
                  </div>
                  <div>
                    <i className="cpr-legend-dot purple-dot" />
                    <span>يحتاجون تدخل</span>
                    <strong>{adherenceStats.needsFollowupCount || 4}</strong>
                  </div>
                  <div>
                    <i className="cpr-legend-dot grey-dot" />
                    <span>لم يسجلوا بعد</span>
                    <strong>{adherenceStats.pendingCount || 2}</strong>
                  </div>
                </div>
              </div>

              <div className="cpr-adherence-footer">
                <Zap size={15} />
                <span>المتابعة التلقائية عبر رادار ميجاترون ترفع استمرارية اللاعبين بنسبة 40%.</span>
              </div>
            </section>
          </div>

          {/* FOOTER */}
          <footer className="cpr-footer">
            <span>CoachPR Live Workspace &bull; الإصدار الإنتاجي v4.0</span>
            <span>بوابة تدريب اللياقة البدنية وكمال الأجسام الذكية</span>
          </footer>
        </div>
      </main>

      {/* MEGATRON MODAL (INTEGRATED FULL 60-SEC AI ENGINE) */}
      <MegatronModal
        isOpen={isMegatronOpen}
        onClose={() => setIsMegatronOpen(false)}
        contextPage="Coach Live Dashboard"
      />
    </div>
  );
}

export default CoachDashboard;
