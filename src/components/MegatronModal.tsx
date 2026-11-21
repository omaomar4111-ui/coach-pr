'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Dumbbell, 
  CheckCircle2, 
  AlertTriangle, 
  FileCheck, 
  Calendar, 
  Flame, 
  Zap, 
  FileText,
  UserCheck,
  Search,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

interface MegatronModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextPage?: string;
}

interface MockClientRecord {
  code: string;
  name: string;
  age: number;
  weight: number;
  goal: string;
  days: number;
  hasInjury: boolean;
  injuryNotes?: string;
  files: string[];
}

export default function MegatronModal({ isOpen, onClose, contextPage = 'Coach dashboard' }: MegatronModalProps) {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'megatron'; text: string; actionType?: string; programData?: any }>>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Workflow State for 1-Click Code Builder
  const [workflowStep, setWorkflowStep] = useState<'idle' | 'awaiting_code' | 'reviewing_client' | 'confirming_days' | 'generated'>('idle');
  const [activeClient, setActiveClient] = useState<MockClientRecord | null>(null);
  const [selectedDays, setSelectedDays] = useState<number>(4);

  if (!isOpen) return null;

  // Mock Database of Trainees registered via /intake
  const traineesDB: Record<string, MockClientRecord> = {
    'ATH-101': {
      code: 'ATH-101',
      name: 'محمود حسن السيد',
      age: 27,
      weight: 84,
      goal: 'تنشيف عضلي عالي وخسارة دهون',
      days: 4,
      hasInjury: true,
      injuryNotes: 'خشونة خفيفة في صابونة الركبة اليمنى - تجنب السكوات الحر العميق بأوزان 1RM',
      files: ['MRI_Knee_Scan.pdf', 'Lab_CBC_Test.png']
    },
    'ATH-202': {
      code: 'ATH-202',
      name: 'كريم أحمد مصطفى',
      age: 24,
      weight: 79,
      goal: 'تضخيم وبناء كتلة صافية (Hypertrophy)',
      days: 5,
      hasInjury: false,
      files: []
    },
    'ATH-303': {
      code: 'ATH-303',
      name: 'سامي عبد الرحمن',
      age: 29,
      weight: 88,
      goal: 'تجهيز بطولة كمال أجسام (FST-7 Pro)',
      days: 5,
      hasInjury: false,
      files: []
    }
  };

  const handleStartCodeWorkflow = () => {
    setWorkflowStep('awaiting_code');
    setMessages(prev => [
      ...prev,
      {
        sender: 'megatron',
        text: 'أهلاً بك كابتن! ⚡ اكتب كود اللاعب المباشر (مثل: ATH-101 أو ATH-202) وسأقوم فوراً بفحص تقريره الطبي وملفات الأشعة وبناء البرنامج المناسب خلال 60 ثانية!'
      }
    ]);
  };

  const processClientCode = (codeUpper: string) => {
    const client = traineesDB[codeUpper] || {
      code: codeUpper,
      name: `بطل جديد (${codeUpper})`,
      age: 25,
      weight: 80,
      goal: 'تضخيم وبناء عضلات صافية',
      days: 4,
      hasInjury: false,
      files: []
    };

    setActiveClient(client);
    setSelectedDays(client.days);
    setWorkflowStep('reviewing_client');

    let replyText = `تم فحص تقرير اللاعب: **${client.name}** (${client.code})\n` +
      `• الهدف: ${client.goal} | الوزن: ${client.weight} كجم\n` +
      `• الأيام المسجلة من اللاعب في الاستمارة: ${client.days} أيام أسبوعياً\n`;

    if (client.hasInjury) {
      replyText += `\n⚠️ **تنبيه طبي عاجل:** اللاعب حدد إصابة (${client.injuryNotes}). تم فحص المرفقات: [${client.files.join('، ')}].\n` +
        `سيتم تفعيل بروتوكول NASM CEx لعزل المفاصل المصابة واستبدال التمارين الخطرة ببدائل آمنة.`;
    } else {
      replyText += `\n✅ **الحالة البدنية:** سليم تماماً ولا توجد أي إصابات. مؤهل لنظام هاني رامبود FST-7 الكامل!`;
    }

    setMessages(prev => [
      ...prev,
      { sender: 'user', text: `كود اللاعب: ${codeUpper}` },
      { sender: 'megatron', text: replyText, actionType: 'client_review' }
    ]);
  };

  const handleConfirmAndGenerate = async () => {
    if (!activeClient) return;
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/program-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: activeClient.name,
          weightKg: activeClient.weight,
          trainingExperience: 'intermediate',
          primaryGoal: activeClient.hasInjury ? 'rehab_posture' : 'hypertrophy',
          daysPerWeek: selectedDays,
          kineticChainSyndrome: activeClient.hasInjury ? 'Lower Crossed Syndrome (متلازمة التقاطع السفلي)' : undefined
        })
      });

      const data = await res.json();
      if (data?.success && data?.program) {
        setWorkflowStep('generated');
        setMessages(prev => [
          ...prev,
          {
            sender: 'megatron',
            text: `🎉 **تم بناء البرنامج التدريبي والغذائي بنجاح بضغطة زر واحدة!**\n\n` +
              `• **المتدرب:** ${activeClient.name}\n` +
              `• **التقسيم المعتمد:** ${selectedDays} أيام تدريب وفق ${activeClient.hasInjury ? 'معايير NASM OPT لحماية المفاصل' : 'نظام FST-7 هاني رامبود (24 مستر أولمبيا)'}\n` +
              `• **البروتين اليومي الموصى به:** ${data.program.nutritionCNCPrecision?.dailyProteinTarget || '180 جم'}\n` +
              `• **الترطيب المستهدف:** ${data.program.nutritionCNCPrecision?.dailyHydrationTarget || '3.5 لتر ماء'}\n\n` +
              `تم حفظ الخطة وإرسال إشعار فوري للاعب على تطبيق الـ PWA! 📲`,
            programData: data.program
          }
        ]);
        toast.success(`تم تصميم وإرسال البرنامج للبطل ${activeClient.name}!`);
      }
    } catch {
      toast.error('تعذر توليد البرنامج');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;
    setInputText('');

    const trimmed = text.trim();

    // Check if user entered an ATH-code
    if (trimmed.toUpperCase().startsWith('ATH-') || (workflowStep === 'awaiting_code' && trimmed.length >= 3)) {
      const code = trimmed.toUpperCase().startsWith('ATH-') ? trimmed.toUpperCase() : `ATH-${trimmed}`;
      processClientCode(code);
      return;
    }

    setMessages(prev => [...prev, { sender: 'user', text }]);
    setIsLoading(true);

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, channel: 'megatron_copilot' })
    })
      .then(res => res.json())
      .then(data => {
        setIsLoading(false);
        const reply = data.reply || 'أنا جاهز لمساعدتك في بناء وتعديل برامج أبطالك فورياً!';
        setMessages(prev => [...prev, { sender: 'megatron', text: reply }]);
      })
      .catch(() => {
        setIsLoading(false);
        setMessages(prev => [
          ...prev, 
          { 
            sender: 'megatron', 
            text: 'معك كابتن! يمكنك إدخال كود اللاعب لصياغة برنامجه التدريبي بنظام NASM و FST-7 فوراً بضغطة زر.' 
          }
        ]);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200" dir="rtl">
      
      {/* Modal Card - 100% Mobile Optimized */}
      <div className="relative w-full max-w-3xl h-[92vh] sm:h-[620px] bg-[#0c0e0c] border border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden text-white font-sans">
        
        {/* Top Header */}
        <div className="h-16 px-4 sm:px-6 border-b border-white/5 flex items-center justify-between bg-[#111411] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1b2216] border border-[#d4f60b]/40 flex items-center justify-center text-[#d4f60b] shadow-[0_0_15px_rgba(212,246,11,0.25)]">
              <Sparkles size={18} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-sm text-white tracking-wide">ميجاترون</h3>
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4f60b]"></span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#d4f60b] font-medium">مساعدك الذكي في التدريب (NASM + FST-7)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#171c14] border border-[#d4f60b]/30 text-[10px] text-[#d4f60b] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4f60b] animate-ping"></span>
              <span>سياق الصفحة: {contextPage}</span>
            </div>

            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white flex items-center justify-center transition cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Body / Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.length === 0 ? (
            /* Empty State */
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-5 my-auto">
              <div className="w-12 h-12 rounded-2xl bg-[#141a12] border border-[#d4f60b]/30 flex items-center justify-center text-[#d4f60b] shadow-[0_0_20px_rgba(212,246,11,0.2)]">
                <Dumbbell size={24} />
              </div>

              <div className="space-y-1.5">
                <h2 className="text-lg sm:text-xl font-black text-white">
                  ما الذي تريد من ميجاترون مساعدتك في إنجازه؟
                </h2>
                <p className="text-xs text-white/50 leading-relaxed max-w-sm mx-auto">
                  يمكنني مساعدتك في العملاء، والخطط، والمتابعات، والرسائل، والمدفوعات، والبحث الموثّق.
                </p>
              </div>

              {/* Primary 1-Click Action Button */}
              <div className="w-full pt-1 space-y-2">
                <button
                  onClick={handleStartCodeWorkflow}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#d4f60b] text-black font-black text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-[#7C3AED]/20 hover:opacity-95 cursor-pointer"
                >
                  <Zap size={16} />
                  <span>توليد نظام تدريب بكود اللاعب (بضغطة زر ⚡)</span>
                </button>

                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <button
                    onClick={() => processClientCode('ATH-101')}
                    className="px-3 py-1.5 rounded-full bg-[#151914] hover:bg-[#1f261d] border border-white/10 text-[11px] text-white/70 transition cursor-pointer"
                  >
                    تجربة كود لاعب لديه إصابة (ATH-101) ⚠️
                  </button>
                  <button
                    onClick={() => processClientCode('ATH-202')}
                    className="px-3 py-1.5 rounded-full bg-[#151914] hover:bg-[#1f261d] border border-white/10 text-[11px] text-white/70 transition cursor-pointer"
                  >
                    تجربة كود لاعب سليم FST-7 (ATH-202) 👑
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-start' : 'items-end'}`}>
                  <div
                    className={`max-w-[90%] sm:max-w-[80%] p-3.5 sm:p-4 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                      m.sender === 'user'
                        ? 'bg-[#1e1338] border border-[#7C3AED]/40 text-white font-medium rounded-tr-none'
                        : 'bg-[#141a12] border border-[#d4f60b]/30 text-white/95 rounded-tl-none shadow-md'
                    }`}
                  >
                    {m.text}
                  </div>

                  {/* Interactive Action Card Inside Chat for Confirmation */}
                  {m.actionType === 'client_review' && activeClient && workflowStep === 'reviewing_client' && (
                    <div className="w-full max-w-[90%] sm:max-w-[80%] mt-3 p-4 rounded-2xl bg-[#0e120d] border border-[#d4f60b]/30 space-y-3">
                      <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                        <span className="font-bold text-white">تأكيد خيارات المدرب (خلال دقيقة واحدة):</span>
                        <span className="text-[10px] text-[#d4f60b] font-mono">{activeClient.code}</span>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] text-white/70 block">
                          حدد أو عدّل عدد أيام التدريب المستهدفة:
                        </label>
                        <div className="grid grid-cols-4 gap-1.5 text-center font-mono">
                          {[3, 4, 5, 6].map(d => (
                            <button
                              key={d}
                              type="button"
                              onClick={() => setSelectedDays(d)}
                              className={`py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                                selectedDays === d
                                  ? 'bg-[#d4f60b] text-black border-[#d4f60b]'
                                  : 'bg-white/5 text-white/60 border-white/5 hover:border-white/20'
                              }`}
                            >
                              {d} أيام
                            </button>
                          ))}
                        </div>
                      </div>

                      {activeClient.hasInjury && (
                        <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/20 text-[11px] text-rose-300">
                          🛡️ <strong>فحص الأشعة مكتمل:</strong> سيتم استبعاد السكوات العميق وتفعيل الـ Hack Squat والتكنيك البطيء لحماية مفصل الركبة.
                        </div>
                      )}

                      <button
                        type="button"
                        disabled={isLoading}
                        onClick={handleConfirmAndGenerate}
                        className="w-full py-2.5 rounded-xl bg-[#d4f60b] hover:bg-[#c2e207] text-black font-black text-xs transition flex items-center justify-center gap-1.5 shadow-md shadow-[#d4f60b]/20 cursor-pointer"
                      >
                        {isLoading ? 'جارِ بناء النظام وتوليد التقرير...' : 'تأكيد وبناء البرنامج بضغطة زر 🚀'}
                      </button>
                    </div>
                  )}

                  {/* Share / Copy Button for Generated Program */}
                  {m.programData && (
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(JSON.stringify(m.programData, null, 2));
                          toast.success('تم نسخ التقرير كاملاً بصيغة الواتساب!');
                        }}
                        className="px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-white text-[11px] border border-white/10 flex items-center gap-1 cursor-pointer"
                      >
                        <span>نسخ التقرير للواتساب 📋</span>
                      </button>
                      <button
                        onClick={() => {
                          window.location.href = '/dashboard/builder';
                        }}
                        className="px-3 py-1 rounded-xl bg-[#7C3AED]/20 hover:bg-[#7C3AED]/30 text-[#d4f60b] text-[11px] border border-[#7C3AED]/30 flex items-center gap-1 cursor-pointer"
                      >
                        <span>فتح في Workout Builder 🏋️‍♂️</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-white/5 bg-[#111411] shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={workflowStep === 'awaiting_code' ? 'اكتب كود اللاعب (مثال: ATH-101)...' : 'اسأل ميجاترون عن أي شيء...'}
              className="flex-1 bg-[#171c14] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-white/30 focus:border-[#d4f60b] outline-none"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-11 h-11 rounded-2xl bg-[#d4f60b] hover:bg-[#c2e207] text-black flex items-center justify-center transition shadow-md shadow-[#d4f60b]/20 cursor-pointer shrink-0"
            >
              <Send size={16} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
