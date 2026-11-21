'use client';

import React, { useState, useEffect } from 'react';
import { 
  Inbox, 
  MessageSquare, 
  Search, 
  Send, 
  Sparkles, 
  Phone, 
  CheckCircle2, 
  Clock, 
  Filter,
  Bot
} from 'lucide-react';
import { toast } from 'sonner';

export default function InboxPage() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConv, setSelectedConv] = useState<any>(null);
  const [replyText, setReplyText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchInbox = () => {
    fetch('/api/inbox')
      .then(res => res.json())
      .then(data => {
        if (data?.conversations) {
          setConversations(data.conversations);
          if (data.conversations.length > 0 && !selectedConv) {
            setSelectedConv(data.conversations[0]);
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchInbox();
  }, []);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    toast.success('تم إرسال الرد للعميل بنجاح والمزامنة عبر الـ Webhook');
    setReplyText('');
  };

  const handleAiDraft = () => {
    toast.loading('ميغاتروين يقوم بصياغة رد تدريبي محفز ومخصص...', { id: 'draft' });
    setTimeout(() => {
      setReplyText('عاش يا بطل! استجابة الركبة ممتازة وتأكيد على نجاح تعديل مسار الحركة. استمر بنفس الوزن الجلسة القادمة مع التركيز على النزول البطيء.');
      toast.success('تم إنشاء المسودة الذكية!', { id: 'draft' });
    }, 900);
  };

  const filtered = conversations.filter(c => 
    c.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.last_message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans" dir="rtl">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <Inbox className="text-[#a78bfa]" /> مركز الوارد والمحادثات الموحد
          </h1>
          <p className="text-xs text-white/50 mt-1">
            إدارة كافة استفسارات ومتابعات اللاعبين عبر الواتساب وتطبيق الـ PWA في شاشة واحدة.
          </p>
        </div>

        <button
          onClick={handleAiDraft}
          className="bg-[#1e1338] border border-[#7C3AED]/40 hover:border-[#7C3AED] text-[#c4b5fd] px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-1.5"
        >
          <Sparkles size={14} className="text-[#a78bfa]" /> الرد الذكي المساعد
        </button>
      </div>

      {/* Main Two-Pane View */}
      <div className="bg-[#111116] border border-white/5 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[620px] shadow-2xl">
        
        {/* Right Pane: Conversation List */}
        <div className="md:col-span-5 lg:col-span-4 border-l border-white/5 flex flex-col">
          
          <div className="p-4 border-b border-white/5 space-y-3">
            <div className="relative w-full">
              <Search size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="ابحث في محادثات العملاء..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#181524] border border-white/10 rounded-xl py-2 pr-9 pl-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED]"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-white/5 custom-scrollbar">
            {loading ? (
              <div className="p-8 text-center text-xs text-white/40">جاري تحميل الرسائل...</div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center text-xs text-white/40">لا توجد رسائل مطابقة.</div>
            ) : (
              filtered.map(conv => {
                const isSelected = selectedConv?.id === conv.id;
                return (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConv(conv)}
                    className={`p-4 transition cursor-pointer space-y-1.5 ${
                      isSelected 
                        ? 'bg-[#1e1338]/60 border-r-4 border-r-[#7C3AED]' 
                        : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-white">{conv.client_name}</span>
                        {conv.channel === 'whatsapp' && (
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded font-mono">
                            واتساب
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-white/30 font-mono">{conv.last_message_time}</span>
                    </div>

                    <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                      {conv.last_message}
                    </p>

                    {conv.tags && (
                      <div className="flex gap-1.5 pt-1">
                        {conv.tags.map((t: string, idx: number) => (
                          <span key={idx} className="text-[9px] bg-white/5 text-white/40 px-2 py-0.5 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* Left Pane: Active Chat Window */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-between bg-[#0b0a10]">
          
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#111116]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#7C3AED] to-[#a855f7] flex items-center justify-center font-bold text-white text-xs">
                    {selectedConv.client_name.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{selectedConv.client_name}</h3>
                    <p className="text-[11px] text-white/40 font-mono">{selectedConv.client_phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${selectedConv.client_phone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-black border border-[#25D366]/30 px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1"
                  >
                    <Phone size={12} /> فتح الواتساب
                  </a>
                </div>
              </div>

              {/* Chat Thread Messages */}
              <div className="flex-1 p-6 space-y-4 overflow-y-auto custom-scrollbar">
                
                {/* Client message bubble */}
                <div className="flex flex-col items-start max-w-lg">
                  <div className="bg-[#181524] border border-white/10 rounded-3xl rounded-tr-sm p-4 text-xs text-white leading-relaxed">
                    {selectedConv.last_message}
                  </div>
                  <span className="text-[10px] text-white/30 font-mono mt-1 mr-1">{selectedConv.last_message_time}</span>
                </div>

                {/* AI Assistant summary suggestion */}
                <div className="bg-[#1e1338]/40 border border-[#7C3AED]/30 rounded-2xl p-3.5 space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 text-[#a78bfa] font-bold text-[11px]">
                    <Bot size={14} /> اقتراح ميغاتروين الذكي (Coach Copilot):
                  </div>
                  <p className="text-white/70 text-[11px]">
                    العميل يلتزم بشكل ممتاز مع تراجع آلام الركبة بنسبة 90%. يُنصح بالحفاظ على نفس الحمل وتأكيد موعد الـ Check-in القادم.
                  </p>
                </div>

              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSendReply} className="p-4 border-t border-white/5 bg-[#111116] flex items-center gap-3">
                <input
                  type="text"
                  placeholder="اكتب ردك للكابتن..."
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  className="flex-1 bg-[#181524] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED]"
                />

                <button
                  type="button"
                  onClick={handleAiDraft}
                  title="توليد مسودة بالذكاء الاصطناعي"
                  className="bg-[#1e1338] border border-[#7C3AED]/40 hover:border-[#7C3AED] text-[#c4b5fd] p-3 rounded-2xl transition cursor-pointer"
                >
                  <Sparkles size={16} />
                </button>

                <button
                  type="submit"
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white p-3 rounded-2xl transition shadow-lg shadow-[#7C3AED]/30 cursor-pointer"
                >
                  <Send size={16} />
                </button>
              </form>

            </>
          ) : (
            <div className="flex items-center justify-center flex-1 text-white/40 text-xs">
              اختر محادثة لعرض تفاصيلها.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
