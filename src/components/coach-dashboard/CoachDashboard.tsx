"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
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
  Search,
  Settings,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import "./coach-dashboard.css";

type NavItem = {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  active?: boolean;
};

type Client = {
  initials: string;
  name: string;
  plan: string;
  adherence: number;
  lastCheckIn: string;
  status: "at-risk" | "on-track" | "review";
};

// Replace these preview values with tenant-scoped Supabase data when integrating.
const previewMetrics = [
  { label: "اللاعبون النشطون", value: "24", note: "+ 3 هذا الشهر", icon: Users, tone: "lime" },
  { label: "بانتظار المراجعة", value: "06", note: "تحتاج إلى إجراء", icon: ClipboardCheck, tone: "purple" },
  { label: "إيرادات الشهر", value: "18,450", suffix: "ج.م", note: "+ 12% عن الشهر السابق", icon: Wallet, tone: "lime" },
  { label: "متوسط الالتزام", value: "82", suffix: "%", note: "آخر 30 يوم", icon: Activity, tone: "purple" },
];

const weeklyRevenue = [
  { day: "السبت", amount: 34 },
  { day: "الأحد", amount: 52 },
  { day: "الإثنين", amount: 43 },
  { day: "الثلاثاء", amount: 68 },
  { day: "الأربعاء", amount: 48 },
  { day: "الخميس", amount: 78 },
  { day: "الجمعة", amount: 92 },
];

const initialClients: Client[] = [
  { initials: "أع", name: "أحمد علي", plan: "تحول جسماني", adherence: 29, lastCheckIn: "منذ 7 أيام", status: "at-risk" },
  { initials: "مح", name: "مريم حسن", plan: "تدريب وتغذية", adherence: 38, lastCheckIn: "منذ 6 أيام", status: "at-risk" },
  { initials: "يو", name: "يوسف عمر", plan: "زيادة كتلة عضلية", adherence: 66, lastCheckIn: "منذ يومين", status: "review" },
  { initials: "سك", name: "سارة خالد", plan: "تحول جسماني", adherence: 86, lastCheckIn: "اليوم", status: "on-track" },
];

const navGroups: { title: string; items: NavItem[] }[] = [
  {
    title: "مساحة العمل",
    items: [
      { label: "نظرة عامة", href: "/dashboard", icon: Home, active: true },
      { label: "المهام والمتابعات", href: "/dashboard/tasks", icon: ClipboardList },
      { label: "الرسائل", href: "/dashboard/messages", icon: MessageCircle },
    ],
  },
  {
    title: "إدارة التدريب",
    items: [
      { label: "اللاعبون", href: "/dashboard/clients", icon: Users },
      { label: "البرامج التدريبية", href: "/dashboard/builder", icon: Dumbbell },
      { label: "بنك التمارين", href: "/dashboard/exercises", icon: Flame },
      { label: "التغذية", href: "/dashboard/nutrition", icon: Apple },
      { label: "الفحص والمتابعة", href: "/intake", icon: HeartPulse },
    ],
  },
  {
    title: "إدارة الأعمال",
    items: [
      { label: "المدفوعات", href: "/dashboard/payments", icon: Wallet },
      { label: "التقارير", href: "/dashboard/reports", icon: TrendingUp },
      { label: "الإعدادات", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

function statusLabel(status: Client["status"]) {
  if (status === "at-risk") return "يحتاج متابعة";
  if (status === "review") return "بانتظار المراجعة";
  return "منتظم";
}

export default function CoachDashboard() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("الكل");
  const [isMegatronOpen, setIsMegatronOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [showAllTasks, setShowAllTasks] = useState(false);

  const visibleClients = useMemo(() => {
    const q = search.trim().toLowerCase();
    return initialClients.filter((client) => {
      const matchesSearch = !q || client.name.toLowerCase().includes(q) || client.plan.toLowerCase().includes(q);
      const matchesTab =
        activeTab === "الكل" ||
        (activeTab === "يحتاج متابعة" && client.status === "at-risk") ||
        (activeTab === "بانتظار المراجعة" && client.status === "review") ||
        (activeTab === "منتظم" && client.status === "on-track");
      return matchesSearch && matchesTab;
    });
  }, [activeTab, search]);

  const tasks = [
    { initials: "أع", name: "أحمد علي", detail: "أبلغ عن ألم بعد التمرين", time: "منذ 3 ساعات", type: "danger", action: "مراجعة" },
    { initials: "مح", name: "مريم حسن", detail: "طلب تعديل الخطة التدريبية", time: "منذ 5 ساعات", type: "warning", action: "فتح الطلب" },
    { initials: "يو", name: "يوسف عمر", detail: "المتابعة الأسبوعية", time: "منذ 8 ساعات", type: "success", action: "مراجعة" },
    { initials: "سك", name: "سارة خالد", detail: "رسالة جديدة من اللاعب", time: "منذ 9 ساعات", type: "success", action: "فتح الرسالة" },
    { initials: "مف", name: "محمد فؤاد", detail: "موعد تجديد الاشتراك اقترب", time: "أمس", type: "warning", action: "عرض الحساب" },
  ];

  const tasksToShow = showAllTasks ? tasks : tasks.slice(0, 4);

  return (
    <div className="cpr-dashboard" dir="rtl">
      <aside className={`cpr-sidebar ${isMobileNavOpen ? "cpr-sidebar-open" : ""}`}>
        <div className="cpr-brand-row">
          <a className="cpr-brand" href="/dashboard" aria-label="CoachPR الرئيسية">
            <span className="cpr-brand-mark">C<span>+</span></span>
            <span className="cpr-brand-name">Coach<span>PR</span></span>
          </a>
          <button className="cpr-icon-button cpr-sidebar-close" onClick={() => setIsMobileNavOpen(false)} aria-label="إغلاق القائمة">
            <X size={18} />
          </button>
        </div>

        <div className="cpr-workspace-switcher">
          <span className="cpr-workspace-avatar">CP</span>
          <span className="cpr-workspace-copy"><strong>مساحة المدرب</strong><small>CoachPR Workspace</small></span>
          <ChevronDown size={15} />
        </div>

        <nav className="cpr-nav" aria-label="القائمة الرئيسية">
          {navGroups.map((group) => (
            <div className="cpr-nav-group" key={group.title}>
              <p className="cpr-nav-heading">{group.title}</p>
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`cpr-nav-link ${item.active ? "is-active" : ""}`}
                    aria-current={item.active ? "page" : undefined}
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <Icon size={17} strokeWidth={1.8} />
                    <span>{item.label}</span>
                    {item.label === "الرسائل" && <span className="cpr-nav-count">3</span>}
                  </a>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="cpr-sidebar-bottom">
          <div className="cpr-plan-meter">
            <div className="cpr-plan-meter-top"><span>الباقة الحالية</span><strong>PRO</strong></div>
            <div className="cpr-meter-track"><span style={{ width: "68%" }} /></div>
            <small>17 من 25 لاعباً</small>
          </div>
          <a href="/dashboard/settings" className="cpr-account-link">
            <span className="cpr-account-avatar">م</span>
            <span className="cpr-account-copy"><strong>حساب المدرب</strong><small>إدارة الحساب</small></span>
            <MoreHorizontal size={18} />
          </a>
        </div>
      </aside>

      {isMobileNavOpen && <button className="cpr-mobile-backdrop" onClick={() => setIsMobileNavOpen(false)} aria-label="إغلاق القائمة" />}

      <main className="cpr-main">
        <header className="cpr-topbar">
          <div className="cpr-topbar-right">
            <button className="cpr-icon-button cpr-menu-trigger" onClick={() => setIsMobileNavOpen(true)} aria-label="فتح القائمة"><Menu size={20} /></button>
            <div className="cpr-breadcrumb"><span>مساحة العمل</span><span className="cpr-breadcrumb-separator">/</span><strong>نظرة عامة</strong></div>
          </div>
          <div className="cpr-topbar-actions">
            <label className="cpr-search-box">
              <Search size={17} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ابحث عن لاعب أو خطة..." aria-label="ابحث عن لاعب أو خطة" />
              <kbd>⌘ K</kbd>
            </label>
            <button className="cpr-icon-button cpr-notification-button" aria-label="الإشعارات"><Bell size={18} /><i /></button>
            <button className="cpr-megatron-button" onClick={() => setIsMegatronOpen(true)}><Sparkles size={17} /><span>ميجاترون AI</span></button>
          </div>
        </header>

        <div className="cpr-page-content">
          <div className="cpr-page-heading">
            <div>
              <div className="cpr-eyebrow"><span className="cpr-live-dot" /> مساحة عملك اليوم</div>
              <h1>صباح النشاط، كابتن <span>👋</span></h1>
              <p>دي أهم التحديثات والمهام اللي محتاجة تركيزك النهارده.</p>
            </div>
            <div className="cpr-page-heading-actions">
              <span className="cpr-demo-label">بيانات تجريبية للمعاينة</span>
              <button className="cpr-secondary-button"><CalendarDays size={16} /> آخر 30 يوم <ChevronDown size={14} /></button>
              <a className="cpr-primary-button" href="/intake"><Plus size={17} /> إضافة لاعب</a>
            </div>
          </div>

          <section className="cpr-metrics-grid" aria-label="مؤشرات الأداء">
            {previewMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <article className="cpr-metric-card" key={metric.label}>
                  <div className="cpr-metric-top"><span className={`cpr-metric-icon ${metric.tone}`}><Icon size={18} /></span><button className="cpr-quiet-icon" aria-label={`خيارات ${metric.label}`}><MoreHorizontal size={18} /></button></div>
                  <p className="cpr-metric-label">{metric.label}</p>
                  <div className="cpr-metric-value-row"><strong>{metric.value}</strong>{metric.suffix && <span>{metric.suffix}</span>}</div>
                  <div className="cpr-metric-note"><span className="cpr-trend-icon"><ArrowUpLeft size={13} /></span>{metric.note}</div>
                </article>
              );
            })}
          </section>

          <section className="cpr-megatron-insight">
            <div className="cpr-megatron-emblem"><Sparkles size={22} /></div>
            <div className="cpr-megatron-copy">
              <div className="cpr-inline-title"><strong>ميجاترون راجع نشاط اللاعبين</strong><span className="cpr-ai-pill">AI INSIGHT</span></div>
              <p>فيه 3 لاعبين محتاجين متابعة النهارده، منهم لاعب أبلغ عن ألم بعد التمرين ولازم تراجع حالته قبل تعديل برنامجه.</p>
            </div>
            <button className="cpr-megatron-open" onClick={() => setIsMegatronOpen(true)}>افتح ميجاترون <ArrowDownLeft size={16} /></button>
          </section>

          <div className="cpr-content-grid">
            <section className="cpr-panel cpr-work-panel">
              <div className="cpr-panel-header">
                <div><span className="cpr-section-kicker">DAILY WORK</span><h2>المهام اللي محتاجة شغلك</h2></div>
                <a href="/dashboard/tasks" className="cpr-text-link">كل المهام <ArrowDownLeft size={14} /></a>
              </div>
              <div className="cpr-task-list">
                {tasksToShow.map((task, index) => (
                  <div className="cpr-task-row" key={`${task.name}-${task.detail}`}>
                    <div className="cpr-task-avatar">{task.initials}</div>
                    <div className="cpr-task-copy"><strong>{task.name}</strong><span><i className={`cpr-task-dot ${task.type}`} />{task.detail}</span></div>
                    <span className="cpr-task-time">{task.time}</span>
                    <a href={index === 3 ? "/dashboard/messages" : "/dashboard/clients"} className="cpr-task-action">{task.action}</a>
                  </div>
                ))}
              </div>
              <button className="cpr-show-more" onClick={() => setShowAllTasks((value) => !value)}>{showAllTasks ? "عرض أقل" : "عرض كل المهام"}<ChevronDown className={showAllTasks ? "is-rotated" : ""} size={15} /></button>
            </section>

            <section className="cpr-panel cpr-revenue-panel">
              <div className="cpr-panel-header">
                <div><span className="cpr-section-kicker">REVENUE OVERVIEW</span><h2>الإيرادات خلال الأسبوع</h2></div>
                <button className="cpr-quiet-icon" aria-label="خيارات الإيرادات"><MoreHorizontal size={19} /></button>
              </div>
              <div className="cpr-revenue-summary"><strong>8,650 <small>ج.م</small></strong><span className="cpr-positive-change"><ArrowUpLeft size={13} /> 8.4%</span><small>مقارنة بالأسبوع السابق</small></div>
              <div className="cpr-chart" role="img" aria-label="رسم توضيحي للإيرادات خلال سبعة أيام">
                <div className="cpr-chart-guides"><span>10k</span><span>7.5k</span><span>5k</span><span>2.5k</span></div>
                <div className="cpr-chart-bars">
                  {weeklyRevenue.map((bar, index) => <div className="cpr-chart-column" key={bar.day}><div className={`cpr-chart-bar ${index === 6 ? "is-highlighted" : ""}`} style={{ height: `${bar.amount}%` }} /><span>{bar.day}</span></div>)}
                </div>
              </div>
            </section>
          </div>

          <div className="cpr-content-grid cpr-bottom-grid">
            <section className="cpr-panel cpr-clients-panel">
              <div className="cpr-panel-header cpr-clients-heading">
                <div><span className="cpr-section-kicker">CLIENT PULSE</span><h2>حالة اللاعبين</h2></div>
                <a href="/dashboard/clients" className="cpr-text-link">عرض اللاعبين <ArrowDownLeft size={14} /></a>
              </div>
              <div className="cpr-client-tabs" role="tablist" aria-label="فلترة اللاعبين">
                {["الكل", "يحتاج متابعة", "بانتظار المراجعة", "منتظم"].map((tab) => <button key={tab} role="tab" aria-selected={activeTab === tab} className={activeTab === tab ? "is-selected" : ""} onClick={() => setActiveTab(tab)}>{tab}</button>)}
              </div>
              <div className="cpr-client-table-wrap">
                <table className="cpr-client-table">
                  <thead><tr><th>اللاعب</th><th>البرنامج</th><th>الالتزام</th><th>آخر متابعة</th><th>الحالة</th></tr></thead>
                  <tbody>
                    {visibleClients.map((client) => <tr key={client.name}>
                      <td><span className="cpr-client-name"><i>{client.initials}</i><strong>{client.name}</strong></span></td>
                      <td>{client.plan}</td>
                      <td><span className="cpr-adherence-cell"><span className="cpr-mini-progress"><i style={{ width: `${client.adherence}%` }} /></span><b>{client.adherence}%</b></span></td>
                      <td>{client.lastCheckIn}</td>
                      <td><span className={`cpr-status-badge ${client.status}`}>{statusLabel(client.status)}</span></td>
                    </tr>)}
                    {visibleClients.length === 0 && <tr><td className="cpr-empty-state" colSpan={5}>مفيش نتائج مطابقة للبحث أو الفلتر.</td></tr>}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="cpr-panel cpr-adherence-panel">
              <div className="cpr-panel-header"><div><span className="cpr-section-kicker">CONSISTENCY</span><h2>معدل الالتزام</h2></div><button className="cpr-quiet-icon" aria-label="خيارات الالتزام"><MoreHorizontal size={19} /></button></div>
              <div className="cpr-adherence-content">
                <div className="cpr-progress-ring" style={{ "--cpr-progress": "82%" } as CSSProperties}><div><strong>82<span>%</span></strong><small>متوسط الالتزام</small></div></div>
                <div className="cpr-adherence-stats">
                  <div><i className="cpr-legend-dot lime-dot" /><span>ملتزمون بالخطة</span><strong>18</strong></div>
                  <div><i className="cpr-legend-dot purple-dot" /><span>يحتاجون متابعة</span><strong>4</strong></div>
                  <div><i className="cpr-legend-dot grey-dot" /><span>لم يبدأوا بعد</span><strong>2</strong></div>
                </div>
              </div>
              <div className="cpr-adherence-footer"><Zap size={15} /><span>المتابعة المنتظمة ترفع فرص استمرار اللاعبين.</span></div>
            </section>
          </div>

          <footer className="cpr-footer"><span>CoachPR Workspace</span><span>واجهة معاينة — البيانات المعروضة تجريبية</span></footer>
        </div>
      </main>

      {isMegatronOpen && (
        <div className="cpr-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsMegatronOpen(false); }}>
          <section className="cpr-megatron-modal" role="dialog" aria-modal="true" aria-labelledby="cpr-megatron-title">
            <div className="cpr-modal-top"><span className="cpr-modal-icon"><Sparkles size={21} /></span><button className="cpr-icon-button" onClick={() => setIsMegatronOpen(false)} aria-label="إغلاق ميجاترون"><X size={18} /></button></div>
            <span className="cpr-section-kicker">COACHPR AI ASSISTANT</span>
            <h2 id="cpr-megatron-title">ميجاترون جاهز يساعدك</h2>
            <p>دي نافذة المعاينة الخاصة بالمساعد. عند الدمج النهائي هنربطها بمسار Megatron الحالي ومحرك توليد البرامج الموجود في CoachPR.</p>
            <div className="cpr-modal-insight"><Sparkles size={17} /><span>ابدأ بمراجعة اللاعب صاحب بلاغ الألم، ثم راجع طلب تعديل الخطة والمتابعة الأسبوعية.</span></div>
            <div className="cpr-modal-actions"><a className="cpr-primary-button" href="/dashboard/builder">فتح محرر البرامج <ArrowDownLeft size={16} /></a><button className="cpr-secondary-button" onClick={() => setIsMegatronOpen(false)}>إغلاق</button></div>
          </section>
        </div>
      )}
    </div>
  );
}
