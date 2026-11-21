'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Maximize2, 
  Send, 
  Bot, 
  ArrowUp, 
  Flame, 
  Activity, 
  Users, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  FileText
} from 'lucide-react';

interface MegatronModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextPage?: string;
}

export default function MegatronModal({ isOpen, onClose, contextPage = "Coach dashboard" }: MegatronModalProps) {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const q = textToSend || query;
    if (!q.trim()) return;

    const newMsgs = [...messages, { role: 'user' as const, content: q }];
    setMessages(newMsgs);
    setQuery('');
    setIsLoading(true);

    try {
      // In production calls /api/ai or fallback smart response
      setTimeout(() => {
        let reply = "";
        if (q.includes("انتباهي") || q.includes("اليوم")) {
          reply = "🔍 بحسب تحليل الذكاء الاصطناعي اليوم:\n• اللاعب عمر حسن لم يسجل تمارينه منذ 8 أيام (مقترح إرسال رسالة تخفيف الأحمال عبر واتساب).\n• 3 متدربين أكملوا التشيك إن بانتظار مراجعتك (كريم جلال، نور إبراهيم، ومحمود صابر).\n• نسبة التزام المشتركين العامة مستقرة عند 86%.";
        } else if (q.includes("لخص") || q.includes("مساحة")) {
          reply = "📊 ملخص مساحة عملك اليوم:\n• لديك 29 عميل نشط، وإيرادات الشهر بلغت 6,600 EGP.\n• 15 إجراء بانتظار المراجعة (Form Checks و Check-ins).\n• متوسط الالتزام 86% بمستوى 'ممتاز' لهذا الأسبوع.";
        } else {
          reply = `أهلاً كابتن تامر! أنا ميغاتروين مساعدك الذكي في CoachPR. قمت بتحليل استفسارك بخصوص (${q})، ومستعد لتوليد خطط تدريبية، مراجعة فيديوهات التكنيك، أو صياغة ردود فورية للاعبين.`;
        }
        setMessages([...newMsgs, { role: 'assistant', content: reply }]);
        setIsLoading(false);
      }, 700);
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" dir="rtl">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-3xl h-[600px] max-h-[90vh] bg-[#0c0e0c] border border-white/10 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden text-white font-sans">
        
        {/* Top Header */}
        <div className="h-16 px-6 border-b border-white/5 flex items-center justify-between bg-[#111411]">
          {/* Right Header Title with Glowing Megatron Icon */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1b2216] border border-[#d4f60b]/40 flex items-center justify-center text-[#d4f60b] shadow-[0_0_15px_rgba(212,246,11,0.25)]">
              <Sparkles size={18} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-sm text-white tracking-wide">ميجاترون</h3>
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4f60b]"></span>
              </div>
              <p className="text-[11px] text-[#d4f60b] font-medium">مساعدك الذكي في التدريب</p>
            </div>
          </div>

          {/* Context Badge & Window Controls */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#171c14] border border-[#d4f60b]/30 text-[11px] text-[#d4f60b] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4f60b] animate-ping"></span>
              <span>أستخدم سياق الصفحة: {contextPage}</span>
            </div>

            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white flex items-center justify-center transition"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Body / Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 flex flex-col justify-between">
          
          {messages.length === 0 ? (
            /* Empty State: Exactly matching the uploaded screenshot */
            <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-6">
              
              {/* Centered Pulsing Sparkle Icon */}
              <div className="w-12 h-12 rounded-2xl bg-[#141a12] border border-[#d4f60b]/30 flex items-center justify-center text-[#d4f60b] shadow-[0_0_20px_rgba(212,246,11,0.2)]">
                <Sparkles size={24} />
              </div>

              {/* Headline & Subtitle */}
              <div className="space-y-2">
                <h2 className="text-xl font-black text-white">
                  ما الذي تريد من ميجاترون مساعدتك في إنجازه؟
                </h2>
                <p className="text-xs text-white/50 leading-relaxed max-w-sm mx-auto">
                  يمكنني مساعدتك في العملاء، والخطط، والمتابعات، والرسائل، والمدفوعات، والبحث الموثّق.
                </p>
              </div>

              {/* Quick Action Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => handleSend("ما الذي يحتاج انتباهي اليوم؟")}
                  className="px-4 py-2 rounded-full bg-[#151914] hover:bg-[#1f261d] border border-white/10 hover:border-[#d4f60b]/40 text-xs font-semibold text-white/90 transition shadow-sm"
                >
                  ما الذي يحتاج انتباهي اليوم؟
                </button>
                <button
                  onClick={() => handleSend("لخّص مساحة عملي")}
                  className="px-4 py-2 rounded-full bg-[#151914] hover:bg-[#1f261d] border border-white/10 hover:border-[#d4f60b]/40 text-xs font-semibold text-white/90 transition shadow-sm"
                >
                  لخّص مساحة عملي
                </button>
              </div>

            </div>
          ) : (
            /* Chat Stream */
            <div className="space-y-4 flex-1">
              {messages.map((m, idx) => (
                <div 
                  key={idx} 
                  className={`flex gap-3 ${m.role === 'user' ? 'justify-start' : 'justify-start'}`}
                >
                  {m.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-[#1b2216] border border-[#d4f60b]/40 flex items-center justify-center text-[#d4f60b] shrink-0 text-xs mt-1">
                      <Sparkles size={13} />
                    </div>
                  )}
                  <div className={`p-4 rounded-2xl text-xs leading-relaxed max-w-[85%] whitespace-pre-line ${
                    m.role === 'user' 
                      ? 'bg-[#181d16] border border-[#d4f60b]/30 text-white font-medium mr-auto'
                      : 'bg-[#111411] border border-white/10 text-white/90 shadow'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-[#d4f60b] font-mono">
                  <Sparkles size={14} className="animate-spin" />
                  <span>ميجاترون يحلل بيانات اللاعبين...</span>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Bottom Input Area matching the screenshot */}
        <div className="p-4 px-6 border-t border-white/5 bg-[#090b09]">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="relative flex items-center"
          >
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="اسأل ميجاترون عن أي شيء..."
              className="w-full bg-[#131713] border border-white/10 hover:border-[#d4f60b]/30 focus:border-[#d4f60b] rounded-2xl py-3.5 pr-5 pl-14 text-xs text-white placeholder-white/35 focus:outline-none transition shadow-inner"
            />

            {/* Send Circle Button */}
            <button
              type="submit"
              disabled={!query.trim() || isLoading}
              className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition shadow-md ${
                query.trim() && !isLoading
                  ? 'bg-[#d4f60b] text-black hover:bg-[#c3e404] shadow-[0_0_12px_rgba(212,246,11,0.4)]'
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              <ArrowUp size={16} strokeWidth={2.5} />
            </button>
          </form>

          <p className="text-[10px] text-center text-white/30 mt-2 font-mono">
            مساعدك الذكي في التدريب &bull; CoachPR Megatron Copilot v3.0
          </p>
        </div>

      </div>

    </div>
  );
}
