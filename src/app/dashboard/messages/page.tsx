'use client';

import React, { useState } from 'react';
import { 
  Send, 
  MessageSquare, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Search,
  Filter,
  Phone
} from 'lucide-react';
import { toast } from 'sonner';

export default function MessagesPage() {
  const [messages, setMessages] = useState([
    { id: 1, name: 'عمر حسن', phone: '01012345678', lastMsg: 'يا كوتش ركبتي ارتاحت جداً على تمرين الهاك سكوات', time: 'منذ 10 دقائق', unread: true },
    { id: 2, name: 'محمود صابر', phone: '01099238411', lastMsg: 'فيديو الديدلفت ارفع على شاشة التكنيك', time: 'منذ 45 دقيقة', unread: true },
    { id: 3, name: 'كريم جلال', phone: '01288334411', lastMsg: 'حولت الاشتراك على إنستاباي يا كوتش', time: 'منذ ساعتين', unread: false },
    { id: 4, name: 'ريم جمال', phone: '01155443322', lastMsg: 'عايزة بديل لمصدر البروتين في وجبة العشاء', time: 'أمس', unread: false }
  ]);

  const [activeChat, setActiveChat] = useState(messages[0]);
  const [text, setText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;
    toast.success('تم إرسال الرسالة إلى المشترك عبر القناة النشطة');
    setText('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans" dir="rtl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
          <Send className="text-[#a78bfa]" /> الرسائل والمتابعة الفردية
        </h1>
        <p className="text-xs text-white/50 mt-1">
          إرسال التعليمات اليومية والملاحظات الصوتية والمكتوبة لكل لاعب مباشرة.
        </p>
      </div>

      <div className="bg-[#111116] border border-white/5 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px] shadow-2xl">
        <div className="md:col-span-4 border-l border-white/5 p-4 space-y-3">
          <input
            type="text"
            placeholder="بحث في الرسائل..."
            className="w-full bg-[#181524] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED]"
          />

          <div className="divide-y divide-white/5">
            {messages.map(m => (
              <div
                key={m.id}
                onClick={() => setActiveChat(m)}
                className={`p-3 rounded-2xl cursor-pointer transition ${
                  activeChat.id === m.id ? 'bg-[#1e1338] border border-[#7C3AED]/40' : 'hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-xs text-white">{m.name}</h4>
                  <span className="text-[10px] text-white/30 font-mono">{m.time}</span>
                </div>
                <p className="text-[11px] text-white/60 truncate mt-1">{m.lastMsg}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-8 flex flex-col justify-between bg-[#0b0a10]">
          <div className="p-4 border-b border-white/5 bg-[#111116] flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-white">{activeChat.name}</h3>
              <p className="text-[11px] text-white/40 font-mono">{activeChat.phone}</p>
            </div>
            <a
              href={`https://wa.me/${activeChat.phone}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1"
            >
              <Phone size={12} /> واتساب
            </a>
          </div>

          <div className="flex-1 p-6 space-y-3 overflow-y-auto">
            <div className="bg-[#181524] border border-white/10 p-3.5 rounded-2xl max-w-md text-xs text-white">
              {activeChat.lastMsg}
            </div>
          </div>

          <form onSubmit={handleSend} className="p-4 border-t border-white/5 bg-[#111116] flex gap-2">
            <input
              type="text"
              placeholder="اكتب رسالتك للكابتن..."
              value={text}
              onChange={e => setText(e.target.value)}
              className="flex-1 bg-[#181524] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
            />
            <button
              type="submit"
              className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-5 py-2.5 rounded-xl text-xs font-bold"
            >
              إرسال
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
