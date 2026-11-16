"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import {
  User,
  Users,
  Plug,
  Key,
  CreditCard,
  Copy,
  Check,
  RefreshCw,
  Send,
  Save,
  Shield,
  ExternalLink,
  MessageSquare,
  FileSpreadsheet,
  AlertCircle
} from "lucide-react";

type TabType = "profile" | "team" | "integrations" | "api" | "billing";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("api");
  const [loading, setLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  // API & Webhook state
  const [apiKey, setApiKey] = useState("pr_live_4a82b998f5f51a843cbb0eb28cb1d8e");
  const [webhookUrl, setWebhookUrl] = useState("https://my-store.com/api/pr-webhook");
  const [webhookEvents, setWebhookEvents] = useState<string[]>([
    "message.received",
    "order.created",
    "payment.verified"
  ]);
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Profile state
  const [storeName, setStoreName] = useState("متجر براند الفاخر");
  const [ownerEmail, setOwnerEmail] = useState("founder@brandstore.com");
  const [ownerPhone, setOwnerPhone] = useState("+20 101 234 5678");

  // Team state
  const [teamMembers, setTeamMembers] = useState([
    { id: "1", name: "أحمد علي", email: "ahmed@brandstore.com", role: "Owner", status: "نشط" },
    { id: "2", name: "سارة خليل", email: "sara.ops@brandstore.com", role: "Ops Lead", status: "نشط" },
    { id: "3", name: "محمود كمال", email: "support@brandstore.com", role: "Customer Support", status: "نشط" }
  ]);

  // Modal State for Integrations
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalKeyInput, setModalKeyInput] = useState("");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleRegenerateKey = async () => {
    if (!confirm("هل أنت متأكد من إعادة توليد مفتاح API؟ المفتاح القديم سيتوقف فوراً عن العمل.")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/settings/api-key/regenerate", { method: "POST" });
      const data = await res.json();
      if (data.apiKey) {
        setApiKey(data.apiKey);
        alert("تم توليد مفتاح API جديد بنجاح! احتفظ به في مكان آمن.");
      }
    } catch {
      alert("تعذر توليد المفتاح، يرجى المحاولة لاحقاً");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveWebhook = async () => {
    setLoading(true);
    setSaveStatus(null);
    try {
      const res = await fetch("/api/settings/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_webhook",
          webhookUrl,
          webhookEvents
        })
      });
      const data = await res.json();
      if (data.success) {
        setSaveStatus("تم حفظ إعدادات الـ Webhook بنجاح ✓");
        setTimeout(() => setSaveStatus(null), 3000);
      }
    } catch {
      setSaveStatus("حدث خطأ أثناء الحفظ");
    } finally {
      setLoading(false);
    }
  };

  const handleTestWebhook = async () => {
    if (!webhookUrl) {
      alert("من فضلك أدخل رابط Webhook أولاً");
      return;
    }
    setTestStatus("جاري إرسال الحدث التجريبي...");
    try {
      const res = await fetch("/api/settings/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "test_webhook",
          webhookUrl
        })
      });
      const data = await res.json();
      if (data.success) {
        setTestStatus(`نجح الإرسال! الرمز المستلم: ${data.status}`);
      } else {
        setTestStatus(`فشل: ${data.error}`);
      }
    } catch (e: any) {
      setTestStatus(`فشل الاتصال بالرابط: ${e.message}`);
    }
  };

  const toggleEvent = (event: string) => {
    setWebhookEvents(prev =>
      prev.includes(event) ? prev.filter(e => e !== event) : [...prev, event]
    );
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#0e0918] text-white font-sans selection:bg-[#8052ff] selection:text-white pb-20">
      
      {/* Top Header */}
      <header className="border-b border-[#251f33] px-6 py-5 max-w-[1280px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo />
          <span className="text-[#3e384f]">/</span>
          <h1 className="text-base font-normal text-gray-300">إعدادات المنصة (Enterprise Settings)</h1>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/inbox" className="text-sm text-gray-400 hover:text-white transition-colors">صندوق المحادثات</Link>
          <Link href="/pipeline" className="text-sm text-gray-400 hover:text-white transition-colors">إدارة المبيعات</Link>
          <Link href="/pricing" className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs px-4 py-2 rounded-xl transition-all">
            الباقات المتاحة
          </Link>
        </div>
      </header>

      {/* Main Settings Body */}
      <main className="max-w-[1280px] mx-auto px-6 pt-10">
        
        {/* Page Title */}
        <div className="mb-8 text-right">
          <h2 className="text-3xl font-light text-white mb-2">إعدادات الحساب والتكاملات التقنية</h2>
          <p className="text-gray-400 text-sm font-extralight">
            إدارة مفاتيح الـ API، نقاط استقبال الأحداث (Webhooks)، وربط قنوات واتساب وإنستجرام.
          </p>
        </div>

        {/* Tab Navigation Strip */}
        <div className="flex items-center gap-2 border-b border-[#251f33] pb-4 mb-8 overflow-x-auto">
          {[
            { id: "api" as TabType, label: "API & Webhooks", icon: Key },
            { id: "integrations" as TabType, label: "التكاملات والقنوات", icon: Plug },
            { id: "profile" as TabType, label: "الملف التجاري", icon: User },
            { id: "team" as TabType, label: "أعضاء الفريق", icon: Users },
            { id: "billing" as TabType, label: "الفواتير والاشتراك", icon: CreditCard }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-900/30"
                  : "bg-[#1a1624] text-gray-400 hover:text-white hover:bg-[#251f33]"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ======================================================== */}
        {/* TAB 1: API & WEBHOOKS (Primary Technical Readiness Tab) */}
        {/* ======================================================== */}
        {activeTab === "api" && (
          <div className="space-y-8 max-w-4xl text-right">
            
            {/* API Key Management Card */}
            <div className="p-8 rounded-3xl bg-[#1a1624] border border-[#3e3a46] space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Key className="w-5 h-5 text-purple-400" />
                    مفتاح API الخاص بمتجرك (API Secret Key)
                  </h3>
                  <p className="text-sm text-gray-400 font-extralight mt-1">
                    استخدم هذا المفتاح للربط البرمجي مع منصتك أو الـ ERP لتوليد الأوردرات والتحقق من العملاء.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                  نشط (Live Production)
                </span>
              </div>

              {/* Key Box */}
              <div className="flex items-center gap-3 bg-[#0e0918] p-3 rounded-2xl border border-[#2b2538]">
                <code className="flex-1 font-mono text-sm text-purple-300 px-3 tracking-wider truncate" dir="ltr">
                  {apiKey}
                </code>
                <button
                  onClick={() => copyToClipboard(apiKey)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs border border-white/10 transition-all"
                >
                  {copiedKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedKey ? "تم النسخ" : "نسخ"}</span>
                </button>
                <button
                  onClick={handleRegenerateKey}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs border border-rose-500/30 transition-all"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                  <span>إعادة توليد</span>
                </button>
              </div>

              <div className="flex items-start gap-2 text-xs text-amber-400/90 font-extralight">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>تحذير: لا تشارك مفتاح الـ Secret Key في الكود المكشوف للمتصفح. تعامل معه ككلمة مرور لخادمك فقط.</span>
              </div>
            </div>

            {/* Webhook Configuration Card */}
            <div className="p-8 rounded-3xl bg-[#1a1624] border border-[#3e3a46] space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <ExternalLink className="w-5 h-5 text-orange-400" />
                  إعدادات الـ Webhooks وإشعارات الأحداث اللحظية
                </h3>
                <p className="text-sm text-gray-400 font-extralight mt-1">
                  سنرسل طلب HTTP POST فوري إلى خادمك عند وقوع أي حدث في المنصة.
                </p>
              </div>

              {/* Webhook URL Input */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-300">رابط الـ Webhook الخاص بك (Endpoint URL)</label>
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={e => setWebhookUrl(e.target.value)}
                  placeholder="https://yourdomain.com/api/webhooks/pr-agent"
                  className="w-full bg-[#0e0918] border border-[#2b2538] rounded-2xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 font-mono"
                  dir="ltr"
                />
              </div>

              {/* Events Selection */}
              <div className="space-y-3">
                <label className="block text-xs font-medium text-gray-300">الأحداث التي ترغب في استقبالها (Subscribed Events)</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "message.received", label: "رسالة واردة من عميل", desc: "WhatsApp & Instagram" },
                    { id: "order.created", label: "طلب جديد تم استخراجه", desc: "Order Dispatcher" },
                    { id: "payment.verified", label: "إيصال إنستاباي معتمد", desc: "Vision AI Verified" }
                  ].map(evt => {
                    const isChecked = webhookEvents.includes(evt.id);
                    return (
                      <div
                        key={evt.id}
                        onClick={() => toggleEvent(evt.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          isChecked
                            ? "bg-purple-600/10 border-purple-500 text-white"
                            : "bg-[#0e0918] border-[#2b2538] text-gray-400 hover:border-gray-600"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <code className="text-xs text-purple-300 font-mono">{evt.id}</code>
                          <input type="checkbox" checked={isChecked} readOnly className="accent-purple-600" />
                        </div>
                        <p className="text-xs font-normal text-white">{evt.label}</p>
                        <p className="text-[11px] text-gray-400 font-extralight mt-0.5">{evt.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSaveWebhook}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-all shadow-lg shadow-purple-900/30"
                  >
                    <Save className="w-4 h-4" />
                    <span>حفظ الإعدادات</span>
                  </button>
                  <button
                    onClick={handleTestWebhook}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm border border-white/10 transition-all"
                  >
                    <Send className="w-4 h-4 text-orange-400" />
                    <span>إرسال حدث تجريبي (Ping Test)</span>
                  </button>
                </div>

                {saveStatus && <span className="text-xs text-emerald-400">{saveStatus}</span>}
                {testStatus && <span className="text-xs text-purple-300 font-mono">{testStatus}</span>}
              </div>

            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: INTEGRATIONS TAB */}
        {/* ======================================================== */}
        {activeTab === "integrations" && (
          <div className="max-w-4xl space-y-6 text-right">
            <h3 className="text-xl font-semibold text-white">القنوات والتطبيقات المتصلة</h3>
            <p className="text-sm text-gray-400 font-extralight -mt-4">
              اربط حسابات واتساب وإنستجرام وجداول جوجل لأتمتة التزامن بشكل كامل.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* WhatsApp Card */}
              <div className="p-6 rounded-3xl bg-[#1a1624] border border-[#3e3a46] flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-white">واتساب (Evolution API / QR)</h4>
                        <span className="text-xs text-emerald-400">متصل (رقم: +20 101 234 5678)</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 font-extralight leading-relaxed">
                    استقبال الرسائل والرد الآلي بإيجنت "سارة طارق" وفحص إيصالات إنستاباي الواردة في الشات.
                  </p>
                </div>
                <button
                  onClick={() => alert("إعدادات جلسة واتساب نشطة وتعمل بكفاءة 100% عبر Evolution API.")}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs border border-white/10 transition-all"
                >
                  إعادة مسح رمز QR
                </button>
              </div>

              {/* Instagram Card */}
              <div className="p-6 rounded-3xl bg-[#1a1624] border border-[#3e3a46] flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-pink-500/10 text-pink-400 border border-pink-500/20 font-bold text-xs flex items-center justify-center w-11 h-11">
                        IG
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-white">إنستجرام (Comment-to-DM)</h4>
                        <span className="text-xs text-purple-400">متصل (@brand_store)</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 font-extralight leading-relaxed">
                    رصد التعليقات على البوستات والريلز وإرسال رد فوري في الـ DM مع كود الخصم.
                  </p>
                </div>
                <button
                  onClick={() => alert("تكامل إنستجرام نشط عبر Meta Graph API.")}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs border border-white/10 transition-all"
                >
                  إدارة الكلمات المفتاحية
                </button>
              </div>

              {/* Google Sheets Card */}
              <div className="p-6 rounded-3xl bg-[#1a1624] border border-[#3e3a46] flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        <FileSpreadsheet className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-white">جداول بيانات جوجل (Sheets)</h4>
                        <span className="text-xs text-gray-400">غير متصل</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 font-extralight leading-relaxed">
                    مزامنة الأوردرات الجديدة تلقائياً في شيت مبيعات منفصل للمخزن والمحاسب.
                  </p>
                </div>
                <button
                  onClick={() => alert("سيتم فتح نافذة تفويض Google OAuth للمزامنة التلقائية.")}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all"
                >
                  ربط الحساب الآن (Connect)
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: PROFILE TAB */}
        {/* ======================================================== */}
        {activeTab === "profile" && (
          <div className="max-w-2xl space-y-6 text-right">
            <div className="p-8 rounded-3xl bg-[#1a1624] border border-[#3e3a46] space-y-6">
              <h3 className="text-xl font-semibold text-white">الملف التعريفي للمتجر</h3>
              
              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-300">اسم المتجر / البراند</label>
                <input
                  type="text"
                  value={storeName}
                  onChange={e => setStoreName(e.target.value)}
                  className="w-full bg-[#0e0918] border border-[#2b2538] rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-300">البريد الإلكتروني للإشعارات</label>
                <input
                  type="email"
                  value={ownerEmail}
                  onChange={e => setOwnerEmail(e.target.value)}
                  className="w-full bg-[#0e0918] border border-[#2b2538] rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-300">رقم الهاتف الأساسي</label>
                <input
                  type="tel"
                  value={ownerPhone}
                  onChange={e => setOwnerPhone(e.target.value)}
                  className="w-full bg-[#0e0918] border border-[#2b2538] rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <button
                onClick={() => alert("تم حفظ الملف التعريفي بنجاح ✓")}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-all"
              >
                تحديث البيانات
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: TEAM TAB */}
        {/* ======================================================== */}
        {activeTab === "team" && (
          <div className="max-w-4xl space-y-6 text-right">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">إدارة صلاحيات الفريق</h3>
                <p className="text-sm text-gray-400 font-extralight">حدد الموظفين المصرح لهم بدخول الـ Inbox والـ Pipeline.</p>
              </div>
              <button
                onClick={() => alert("أدخل البريد الإلكتروني لدعوة عضو جديد إلى لوحة التحكم.")}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all"
              >
                + دعوة عضو جديد
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-[#1a1624] border border-[#3e3a46] overflow-hidden">
              <table className="w-full text-right text-sm">
                <thead>
                  <tr className="border-b border-[#251f33] text-gray-400 text-xs">
                    <th className="pb-3">الاسم</th>
                    <th className="pb-3">البريد الإلكتروني</th>
                    <th className="pb-3">الدور والصلاحية</th>
                    <th className="pb-3">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#251f33]">
                  {teamMembers.map(m => (
                    <tr key={m.id} className="text-gray-200">
                      <td className="py-3.5 font-medium">{m.name}</td>
                      <td className="py-3.5 font-mono text-xs text-gray-400">{m.email}</td>
                      <td className="py-3.5 text-xs text-purple-300">{m.role}</td>
                      <td className="py-3.5"><span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px]">{m.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: BILLING TAB */}
        {/* ======================================================== */}
        {activeTab === "billing" && (
          <div className="max-w-3xl space-y-6 text-right">
            <div className="p-8 rounded-3xl bg-[#1a1624] border border-[#3e3a46] space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">الباقة النشطة الحالية</h3>
                  <p className="text-sm text-purple-300 font-medium mt-1">باقة النمو السريع (Growth Plan) — 1,450 ج.م / شهر</p>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold">
                  مفعلة وتتجدد تلقائياً
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-center">
                <div className="p-4 rounded-2xl bg-[#0e0918] border border-[#2b2538]">
                  <span className="text-xs text-gray-400 block font-extralight">المحادثات المستخدمة</span>
                  <span className="text-xl font-bold text-white mt-1 block">4,280 / 10,000</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#0e0918] border border-[#2b2538]">
                  <span className="text-xs text-gray-400 block font-extralight">الإيجنتس النشطين</span>
                  <span className="text-xl font-bold text-emerald-400 mt-1 block">10 من 10</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#0e0918] border border-[#2b2538]">
                  <span className="text-xs text-gray-400 block font-extralight">موعد الفاتورة القادمة</span>
                  <span className="text-xl font-bold text-orange-400 mt-1 block">15 ديسمبر 2026</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Link
                  href="/pricing"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-orange-500 text-white text-xs font-semibold transition-all hover:scale-105"
                >
                  ترقية أو تعديل الباقة
                </Link>
                <button
                  onClick={() => alert("سيتم إرسال سجل الفواتير الضريبية إلى بريدك الإلكتروني.")}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  تحميل الفواتير السابقة (PDF)
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
