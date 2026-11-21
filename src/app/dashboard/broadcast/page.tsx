'use client';

import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  Filter, 
  AlertCircle 
} from 'lucide-react';
import { toast } from 'sonner';

export default function BroadcastPage() {
  const [targetGroup, setTargetGroup] = useState('all');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) {
      toast.error('يرجى كتابة نص الرسالة الجماعية');
      return;
    }

    setSending(true);
    toast.loading('جاري بث الرسالة لجميع اللاعبين المحددين عبر قنوات الواتساب وتطبيق الـ PWA...', { id: 'b-send' });
    setTimeout(() => {
      setSending(false);
      toast.success('تم إرسال الرسالة الجماعية بنجاح إلى 29 مشتركاً!', { id: 'b-send' });
      setMessage('');
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans" dir="rtl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
          <MessageSquare className="text-[#a78bfa]" /> الرسائل الجماعية (Broadcast)
        </h1>
        <p className="text-xs text-white/50 mt-1">
          إرسال تحديثات الجداول، والتحفيز الأسبوعي، ومواعيد الـ Check-ins لكافة المشتركين بضغطة زر واحدة.
        </p>
      </div>

      <div className="bg-[#111116] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <form onSubmit={handleBroadcast} className="space-y-5">
          <div>
            <label className="text-xs font-bold text-white/60 block mb-2">الفئة المستهدفة</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'all', label: 'كافة العملاء النشطين (29 لاعب)' },
                { id: 'at_risk', label: 'العملاء المتأخرين عن المتابعة (3 لاعبين)' },
                { id: 'renewals', label: 'الاشتراكات المنتهية قريباً (4 لاعبين)' }
              ].map(item => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setTargetGroup(item.id)}
                  className={`p-3.5 rounded-2xl text-xs font-bold transition text-right border ${
                    targetGroup === item.id
                      ? 'bg-[#1e1338] border-[#7C3AED] text-white shadow-sm shadow-[#7C3AED]/30'
                      : 'bg-[#181524] border-white/5 text-white/50 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-white/60">نص الرسالة الجماعية</label>
              <button
                type="button"
                onClick={() => setMessage('صباح الفل يا أبطال! تذكير سريع بموعد إرسال وزن الصباح وفيديو التمرين اليوم لمراجعة التكنيك وضبط الأوزان للأسبوع الجديد ⚡')}
                className="text-[11px] text-[#a78bfa] hover:underline flex items-center gap-1"
              >
                <Sparkles size={12} /> قالب تذكير أسبوعي جاهز
              </button>
            </div>

            <textarea
              rows={5}
              placeholder="اكتب رسالتك هنا..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full bg-[#181524] border border-white/10 rounded-2xl p-4 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED]"
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-[11px] text-white/40">
              سيتم الإرسال عبر الباك إند الموحد لـ WhatsApp Cloud API وإشعارات الـ PWA.
            </span>

            <button
              type="submit"
              disabled={sending}
              className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-3 rounded-2xl text-xs font-extrabold transition flex items-center gap-2 shadow-lg shadow-[#7C3AED]/30 cursor-pointer disabled:opacity-50"
            >
              <Send size={14} /> {sending ? 'جاري الإرسال...' : 'إرسال البث الجماعي الآن'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
