'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  AlertTriangle, 
  Clock, 
  Send, 
  CheckCircle2, 
  Zap, 
  Activity, 
  TrendingUp, 
  ShieldAlert, 
  MessageSquare,
  Bot,
  RefreshCw,
  Phone,
  ArrowRight,
  Flame,
  Check
} from 'lucide-react';
import { toast } from 'sonner';

interface TriggerItem {
  id: string;
  type: 'INACTIVITY' | 'CHECKIN_OVERDUE' | 'SUBSCRIPTION_EXPIRING' | 'HIGH_FATIGUE' | 'PLATEAU';
  severity: 'critical' | 'high' | 'medium' | 'low';
  clientName: string;
  clientPhone: string;
  description: string;
  recommendedAction: string;
  suggestedMessage: string;
  autoExecutable: boolean;
  executed?: boolean;
}

export default function ProactiveAgentFeed() {
  const [triggers, setTriggers] = useState<TriggerItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [executingId, setExecutingId] = useState<string | null>(null);
  const [autopilotMode, setAutopilotMode] = useState<boolean>(false);

  const fetchTriggers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/proactive');
      const data = await res.json();
      if (data?.triggers) {
        setTriggers(data.triggers);
      }
    } catch {
      // Fallback local triggers
      setTriggers([
        {
          id: 'trig-001',
          type: 'INACTIVITY',
          severity: 'critical',
          clientName: 'عمر حسن (Omar Hassan)',
          clientPhone: '+201209876543',
          description: 'اللاعب لم يفتح التطبيق أو يسجل أي وجبة أو تمرين منذ 8 أيام متتالية.',
          recommendedAction: 'إرسال رسالة تخفيف أوزان وكسر الروتين عبر واتساب لاستعادة الالتزام.',
          suggestedMessage: 'أهلاً يا عمر! لاحظت إنك مجهد شوية الأيام اللي فاتت، إيه رأيك ننزل بأحمال التمرين شوية الأسبوع ده عشان نكسر الإرهاق ونرجع أقوى؟',
          autoExecutable: true
        },
        {
          id: 'trig-002',
          type: 'CHECKIN_OVERDUE',
          severity: 'high',
          clientName: 'أحمد مجدي (Ahmed Magdy)',
          clientPhone: '+201123456789',
          description: 'موعد التشيك إن الأسبوعي كان أمس الجمعة ولم يتم رفع صور الوزن والقياسات.',
          recommendedAction: 'إرسال تذكير التشيك إن التلقائي بصوت كابتن تامر وتجهيز مسودة التقرير.',
          suggestedMessage: 'صباح الورد يا أحمد! مستني صور الوزن والقياسات بتاعتك عشان نراجع تطور الأسبوع ونحدد خطة الأسبوع الجديد.',
          autoExecutable: true
        },
        {
          id: 'trig-003',
          type: 'SUBSCRIPTION_EXPIRING',
          severity: 'medium',
          clientName: 'ريم جمال (Reem Gamal)',
          clientPhone: '+201019876543',
          description: 'الاشتراك ينتهي خلال 3 أيام (المتبقي في الباقة: 3 أيام).',
          recommendedAction: 'إرسال رابط تجديد باقة 3 شهور مع كود خصم الالتزام السريع.',
          suggestedMessage: 'عاش يا ريم، استمرارك الشهر ده كان مبهر! باقتك هتنتهي بعد 3 أيام، وده رابط التجديد السريع بخصم تجديد المشتركين الدائمين.',
          autoExecutable: false
        },
        {
          id: 'trig-004',
          type: 'HIGH_FATIGUE',
          severity: 'medium',
          clientName: 'كريم جلال (Karim Galal)',
          clientPhone: '+201012345678',
          description: 'مؤشر الجاهزية والاستشفاء نزل إلى 45% بعد كسر رقم قياسي في السكوات والبنش.',
          recommendedAction: 'جدولة يوم راحة إضافي (Active Recovery) وتنبيه الكوتش بزيادة ساعات النوم.',
          suggestedMessage: 'كريم يا بطل، أرقامك في السكوات كانت جبارة! جسمك محتاج استشفاء كامل، خد النهاردة راحة وهنزود الكارب 50 جم لتعويض الجليكوجين.',
          autoExecutable: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTriggers();
  }, []);

  const handleExecute = async (trigger: TriggerItem) => {
    setExecutingId(trigger.id);
    try {
      await fetch('/api/ai/proactive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ triggerId: trigger.id, action: trigger.recommendedAction })
      });

      setTriggers(prev => prev.map(t => t.id === trigger.id ? { ...t, executed: true } : t));
      toast.success(`تم تنفيذ الإجراء الاستباقي بنجاح وإرسال الإشعار لـ ${trigger.clientName}`);
    } catch {
      toast.error('حدث خطأ أثناء التنفيذ');
    } finally {
      setExecutingId(null);
    }
  };

  const handleExecuteAll = async () => {
    setIsLoading(true);
    for (const t of triggers.filter(t => !t.executed)) {
      await handleExecute(t);
    }
    setIsLoading(false);
    toast.success('تم تنفيذ كافة الإجراءات الاستباقية بنجاح ⚡');
  };

  return (
    <div className="bg-[#0f130f] border border-[#d4f60b]/30 rounded-3xl p-6 space-y-6 shadow-[0_10px_40px_rgba(0,0,0,0.6)] font-sans" dir="rtl">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#1a2315] border border-[#d4f60b]/50 flex items-center justify-center text-[#d4f60b] shadow-[0_0_20px_rgba(212,246,11,0.25)]">
            <Zap size={22} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white">الوكيل الذكي الاستباقي (Proactive AI Agent)</h2>
              <span className="w-2 h-2 rounded-full bg-[#d4f60b] animate-ping"></span>
            </div>
            <p className="text-xs text-white/50 mt-0.5">
              مراقبة ذاتية حية لكافة المتدربين &bull; اتخاذ إجراءات وقائية ومنع انقطاع اللاعبين
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={() => setAutopilotMode(!autopilotMode)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
              autopilotMode 
                ? 'bg-[#d4f60b] text-black border-[#d4f60b] shadow-[0_0_15px_rgba(212,246,11,0.4)]' 
                : 'bg-white/5 text-white/70 border-white/10 hover:border-white/20'
            }`}
          >
            <Bot size={14} />
            <span>الطيار الآلي (Autopilot): {autopilotMode ? 'مفعّل' : 'معطّل'}</span>
          </button>

          <button
            onClick={fetchTriggers}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 transition"
            title="تحديث الرادار"
          >
            <RefreshCw size={15} className={isLoading ? 'animate-spin text-[#d4f60b]' : ''} />
          </button>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#141a13] p-3 rounded-2xl border border-white/5">
          <span className="text-[10px] text-white/40 block">المتدربون تحت الرقابة</span>
          <span className="text-lg font-black font-mono text-white mt-0.5">30 لاعب</span>
        </div>
        <div className="bg-[#141a13] p-3 rounded-2xl border border-white/5">
          <span className="text-[10px] text-white/40 block">تنبيهات حرجة (Critical)</span>
          <span className="text-lg font-black font-mono text-rose-400 mt-0.5">1 متدرب</span>
        </div>
        <div className="bg-[#141a13] p-3 rounded-2xl border border-white/5">
          <span className="text-[10px] text-white/40 block">معدل التدخل التلقائي</span>
          <span className="text-lg font-black font-mono text-[#d4f60b] mt-0.5">94.2%</span>
        </div>
        <div className="bg-[#141a13] p-3 rounded-2xl border border-white/5 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-white/40 block">إجراءات جاهزة</span>
            <span className="text-lg font-black font-mono text-[#d4f60b] mt-0.5">{triggers.filter(t => !t.executed).length} إجراء</span>
          </div>
          <button
            onClick={handleExecuteAll}
            disabled={triggers.filter(t => !t.executed).length === 0}
            className="px-3 py-1.5 rounded-xl bg-[#d4f60b] hover:bg-[#c2e205] text-black font-black text-xs shadow-md shadow-[#d4f60b]/30 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            تنفيذ الكل ⚡
          </button>
        </div>
      </div>

      {/* Trigger Feed List */}
      <div className="space-y-3">
        {triggers.map((trigger) => (
          <div 
            key={trigger.id}
            className={`p-4 rounded-2xl border transition-all ${
              trigger.executed
                ? 'bg-black/30 border-white/5 opacity-50'
                : trigger.severity === 'critical'
                ? 'bg-[#181215] border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.08)]'
                : 'bg-[#121612] border-white/10 hover:border-[#d4f60b]/30'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    trigger.severity === 'critical'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                      : trigger.severity === 'high'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-[#d4f60b]/15 text-[#d4f60b] border-[#d4f60b]/30'
                  }`}>
                    {trigger.severity === 'critical' ? 'خطر انقطاع حرج' : trigger.severity === 'high' ? 'أولوية قصوى' : 'تنبيه استباقي'}
                  </span>
                  <h4 className="text-sm font-black text-white">{trigger.clientName}</h4>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">{trigger.description}</p>
                <div className="bg-black/40 p-2.5 rounded-xl border border-white/5 text-[11px] text-[#d4f60b]">
                  <span className="font-bold text-white/60 ml-1">المسودة المقترحة:</span>
                  &quot;{trigger.suggestedMessage}&quot;
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0">
                <a
                  href={`https://wa.me/${trigger.clientPhone}?text=${encodeURIComponent(trigger.suggestedMessage)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs border border-white/10 transition flex items-center gap-1.5"
                >
                  <Phone size={13} className="text-emerald-400" />
                  <span>فتح واتساب</span>
                </a>

                <button
                  onClick={() => handleExecute(trigger)}
                  disabled={trigger.executed || executingId === trigger.id}
                  className={`px-4 py-2 rounded-xl font-black text-xs transition flex items-center gap-1.5 shadow-md ${
                    trigger.executed
                      ? 'bg-white/5 text-white/40 border border-white/10 cursor-not-allowed'
                      : 'bg-[#d4f60b] hover:bg-[#c2e205] text-black shadow-[0_0_15px_rgba(212,246,11,0.3)]'
                  }`}
                >
                  {trigger.executed ? (
                    <>
                      <Check size={14} />
                      <span>تم التدخل</span>
                    </>
                  ) : executingId === trigger.id ? (
                    <span>جارٍ الإرسال...</span>
                  ) : (
                    <>
                      <Zap size={14} className="fill-black" />
                      <span>تدخل استباقي الآن</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
