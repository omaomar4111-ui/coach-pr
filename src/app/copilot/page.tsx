'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  X, 
  ChevronLeft, 
  ShieldCheck, 
  Dumbbell, 
  Utensils, 
  Flame, 
  TrendingUp, 
  Send, 
  Activity, 
  Terminal,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Logo } from '@/components/Logo';

interface AgentCard {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'processing' | 'idle';
  avatarColor: string;
  description: string;
  lastAction: string;
}

interface ActionApprovalCard {
  id: string;
  agentId: string;
  agentName: string;
  traineeName: string;
  title: string;
  reason: string;
  proposedAction: string;
  type: 'progression' | 'deload' | 'nutrition' | 'churn';
  status: 'pending' | 'approved' | 'rejected';
  confidence: number;
}

export default function CopilotFleetPage() {
  const [activeTab, setActiveTab] = useState<'approvals' | 'fleet' | 'live-terminal'>('approvals');
  const [selectedAgent, setSelectedAgent] = useState<string>('all');

  // OpenMausBot-style Agent Roster
  const agents: AgentCard[] = [
    {
      id: 'agent-pr',
      name: 'PR Progression Scout',
      role: 'محلل الأوزان والـ RIR',
      status: 'active',
      avatarColor: 'border-purple-500/40 text-purple-400 bg-purple-950/40',
      description: 'يراقب مجموعات اللاعبين، ويكتشف سهولة الأوزان (RIR >= 3) ليقترح زيادة الأوزان تلقائياً.',
      lastAction: 'اكتشف جاهزية طارق لزيادة 2.5 كج في البنش برس'
    },
    {
      id: 'agent-form',
      name: 'Form & Joint Sentinel',
      role: 'حارس التكنيك والمفاصل',
      status: 'processing',
      avatarColor: 'border-rose-500/40 text-rose-400 bg-rose-950/40',
      description: 'يفحص مسار البار في فيديوهات السكوات والدادليفت لتنبيه الكوتش قبل حدوث إصابات أسفل الظهر.',
      lastAction: 'تحليل فيديو سكوات سارة مصطفى (120 كج)'
    },
    {
      id: 'agent-diet',
      name: 'Macro Architect',
      role: 'مهندس الماكروز والتغذية',
      status: 'idle',
      avatarColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/40',
      description: 'يعدل الكربوهيدرات والبروتين أسبوعياً بناءً على متوسط الوزن اليومي ومعدل الحرق.',
      lastAction: 'اقتراح تعديل كربوهيدرات مريم أحمد (+30 جرام في أيام الأرجل)'
    }
  ];

  // OpenMausBot Question & Approval Cards
  const [cards, setCards] = useState<ActionApprovalCard[]>([
    {
      id: 'appr-1',
      agentId: 'agent-pr',
      agentName: 'PR Progression Scout',
      traineeName: 'طارق حسام',
      title: 'زيادة الحمل التدريبي (Progressive Overload)',
      reason: 'اللاعب أنهى 4 مجموعات بنش برس بوزن 80 كج وكان الـ RIR = 3 في المجموعة الأخيرة.',
      proposedAction: 'تحديث وزنه في الجدول التدريبي القادم ليصبح 82.5 كج × 8 عدات.',
      type: 'progression',
      status: 'pending',
      confidence: 96
    },
    {
      id: 'appr-2',
      agentId: 'agent-form',
      agentName: 'Form & Joint Sentinel',
      traineeName: 'سارة مصطفى',
      title: 'تنبيه أمان مفصلي: تخفيف عمق السكوات',
      reason: 'رصد ميلان طفيف في الجذع للأمام في أدنى نقطة (Butt Wink) مع وزن 120 كج.',
      proposedAction: 'إرسال ملاحظة توجيهية للكابتن وتثبيت الوزن الحالي لمدة أسبوعين مع زيادة التركيز على إحماء عضلات الحوض.',
      type: 'deload',
      status: 'pending',
      confidence: 91
    },
    {
      id: 'appr-3',
      agentId: 'agent-diet',
      agentName: 'Macro Architect',
      traineeName: 'عمر خالد',
      title: 'تعديل السعرات: زيادة الكارب في أيام التمرين الشاق',
      reason: 'اللاعب فقد 1.8 كجم في أسبوع واحد (أسرع من المعدل الآمن المستهدف وهو 0.7 كجم).',
      proposedAction: 'إضافة 250 سعر حراري (50 جم شوفان/أرز) لمنع خسارة الكتلة العضلية الصافية.',
      type: 'nutrition',
      status: 'pending',
      confidence: 94
    }
  ]);

  const handleApprove = (id: string) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, status: 'approved' } : c));
  };

  const handleReject = (id: string) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, status: 'rejected' } : c));
  };

  const pendingCount = cards.filter(c => c.status === 'pending').length;

  return (
    <div className="min-h-screen bg-space-void text-white font-sans selection:bg-purple-600" dir="rtl">
      {/* Top Navbar */}
      <nav className="border-b border-purple-500/20 bg-[#07050d]/85 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo size="md" />

          <div className="flex items-center gap-3">
            <Link 
              href="/dashboard"
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-bold px-3.5 py-2 rounded-xl bg-white/5 border border-white/10"
            >
              الرئيسية
            </Link>
            <Link 
              href="/captain/pending"
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-bold px-3.5 py-2 rounded-xl bg-white/5 border border-white/10"
            >
              من يحتاجك اليوم
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-6 pt-10 pb-24">
        {/* Header with OpenMausBot Badge */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse"></span>
              <span className="text-[11px] hud-badge-magenta px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                <Cpu size={12} /> أسطول الذكاء الاصطناعي (CoachPRB Copilot Engine)
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">بطاقات قرارات الكوتش (Action Approvals)</h1>
            <p className="text-xs text-slate-400 mt-1">
              يراقب الوكلاء أرقام وتكنيك اللاعبين في الخلفية، ويقترحون القرارات لتعتمدها بنقرة واحدة.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-2">
            <div className="px-4 py-2.5 rounded-xl glass-surface border border-purple-500/40 text-center">
              <span className="text-xl font-black text-purple-400 font-mono">{pendingCount}</span>
              <span className="text-[10px] text-slate-400 block font-bold">قرارات معلقة</span>
            </div>
            <div className="px-4 py-2.5 rounded-xl glass-surface border border-emerald-500/40 text-center">
              <span className="text-xl font-black text-emerald-400 font-mono">3</span>
              <span className="text-[10px] text-slate-400 block font-bold">وكلاء نشطين</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-purple-500/20 pb-3 mb-6">
          <button
            onClick={() => setActiveTab('approvals')}
            className={`director-pill ${activeTab === 'approvals' ? 'active' : ''}`}
          >
            ⚡ قرارات تحتاج اعتمادك ({pendingCount})
          </button>
          <button
            onClick={() => setActiveTab('fleet')}
            className={`director-pill ${activeTab === 'fleet' ? 'active' : ''}`}
          >
            🤖 أسطول الوكلاء (Copilot Agents)
          </button>
        </div>

        {/* Section 1: Approval Cards (OpenMausBot Architecture) */}
        {activeTab === 'approvals' && (
          <div className="space-y-4">
            {cards.map(card => {
              const isPending = card.status === 'pending';
              const isApproved = card.status === 'approved';
              const isRejected = card.status === 'rejected';

              return (
                <div 
                  key={card.id}
                  className={`glass-surface p-5 sm:p-6 rounded-3xl border transition-all ${
                    isPending 
                      ? 'border-purple-500/30 hover:border-purple-500/60' 
                      : isApproved
                        ? 'border-emerald-500/40 bg-emerald-950/20'
                        : 'border-rose-500/30 opacity-60 bg-rose-950/10'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/5 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="hud-badge-green text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                        ثقة: {card.confidence}%
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        اقتراح بواسطة: <strong className="text-purple-300">{card.agentName}</strong>
                      </span>
                    </div>
                    <span className="text-xs text-white bg-purple-950/60 border border-purple-800/40 px-2.5 py-1 rounded-lg font-bold">
                      المتدرب: {card.traineeName}
                    </span>
                  </div>

                  <div className="space-y-2 mb-5">
                    <h3 className="text-base font-black text-white">{card.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-slate-400">السبب التحليلي: </strong> 
                      {card.reason}
                    </p>
                    <div className="p-3 rounded-xl bg-[#090614] border border-purple-500/20 text-xs">
                      <span className="text-purple-400 font-bold block mb-0.5">الإجراء المقترح تنفيذه تلقائياً:</span>
                      <p className="text-emerald-300 font-mono text-[11px] font-bold">{card.proposedAction}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-2">
                    {isPending ? (
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                          onClick={() => handleApprove(card.id)}
                          className="btn-cyber-glow px-6 py-2.5 text-xs font-black flex items-center gap-1.5 shadow-lg shadow-emerald-950/60"
                        >
                          <CheckCircle2 size={15} />
                          اعتماد وتطبيق في جدول المتدرب
                        </button>
                        <button
                          onClick={() => handleReject(card.id)}
                          className="px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-rose-400 rounded-xl bg-white/5 border border-white/10 hover:border-rose-500/40 transition"
                        >
                          تجاهل
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs font-bold">
                        {isApproved && (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 size={16} /> تم الاعتماد وتطبيق التعديل بنجاح في المنظومة.
                          </span>
                        )}
                        {isRejected && (
                          <span className="text-rose-400 flex items-center gap-1">
                            <X size={16} /> تم رفض الإجراء.
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Section 2: Fleet Roster */}
        {activeTab === 'fleet' && (
          <div className="grid md:grid-cols-3 gap-6">
            {agents.map(ag => (
              <div key={ag.id} className="glass-surface glass-surface-hover p-6 rounded-3xl space-y-4">
                <div className="flex justify-between items-start">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm border ${ag.avatarColor}`}>
                    <Bot size={22} />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    ag.status === 'active' ? 'hud-badge-green' : ag.status === 'processing' ? 'hud-badge-magenta' : 'hud-badge-amber'
                  }`}>
                    {ag.status.toUpperCase()}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black text-white">{ag.name}</h3>
                  <p className="text-xs text-purple-300 font-semibold">{ag.role}</p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {ag.description}
                </p>

                <div className="pt-2 border-t border-white/5">
                  <span className="text-[10px] text-slate-500 block mb-0.5 font-bold">آخر نشاط مسجل:</span>
                  <p className="text-[11px] text-slate-300 font-mono truncate">{ag.lastAction}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
