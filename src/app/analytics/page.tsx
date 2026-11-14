'use client';

import { 
  TrendingUp, 
  MessageSquare, 
  ShoppingBag, 
  Bot, 
  Clock, 
  CheckCircle2, 
  ArrowLeft 
} from 'lucide-react';
import Link from 'next/link';

export default function AnalyticsPage() {
  const stats = {
    totalSales: 2470,
    aiAutomationRate: '87%',
    totalConversations: 3,
    avgResponseTimeSeconds: 2.1
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-8" dir="rtl">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <TrendingUp className="w-7 h-7 text-emerald-400" />
            لوحة التحليلات ومؤشرات الأداء
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            متابعة فورية لأداء خدمة العملاء، نسبة ردود الـ AI، وإجمالي مبيعات السوشيال ميديا
          </p>
        </div>

        <Link
          href="/inbox"
          className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>العودة لصندوق الوارد</span>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Card 1: Total Sales */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-medium">إجمالي المبيعات المؤكدة</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {stats.totalSales.toLocaleString()} ج.م
          </div>
          <span className="text-[11px] text-emerald-400 mt-2 block">
            من طلبات المحادثات المباشرة
          </span>
        </div>

        {/* Card 2: AI Automation Rate */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-medium">نسبة المعالجة الآلية (AI)</span>
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {stats.aiAutomationRate}
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block">
            تمت معالجتها بالكامل دون تدخل بشري
          </span>
        </div>

        {/* Card 3: Total Conversations */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-medium">إجمالي المحادثات</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {stats.totalConversations}
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block">
            عبر WhatsApp Business
          </span>
        </div>

        {/* Card 4: Avg Response Time */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-medium">متوسط سرعة الاستجابة</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {stats.avgResponseTimeSeconds} ثانية
          </div>
          <span className="text-[11px] text-purple-400 mt-2 block">
            فوري عبر Gemini 3.8 Flash
          </span>
        </div>
      </div>

      {/* Feature Breakdown Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            حالة القنوات والبنية التحتية
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-sm font-medium text-slate-200">WhatsApp Cloud API</span>
              </div>
              <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                متصل ونشط
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-sm font-medium text-slate-200">Redis Queue & BullMQ</span>
              </div>
              <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                0 Delayed | Healthy
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-sm font-medium text-slate-200">PostgreSQL + pgvector</span>
              </div>
              <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                جاهز للمطابقة الدلالية
              </span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-2">أمان وعزل بيانات المتاجر</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              تعتمد المنصة معمارية Multi-Tenancy تضمن عزل المحادثات وبيانات العملاء وفواتير كل متجر بشكل مستقل تماماً مع حماية الـ Idempotency من تكرار رسائل Webhook الخاصة بـ Meta.
            </p>
          </div>

          <div className="mt-6 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-xs text-emerald-300">
            ✅ تم تفعيل استدعاء الأدوات (AI Tool Calling) لتسجيل مسودات الطلبات آلياً بمجرد تأكيد العميل في المحادثة.
          </div>
        </div>
      </div>
    </div>
  );
}
