'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Search, 
  Sparkles, 
  ShoppingBag, 
  ShieldCheck, 
  CheckCheck, 
  Users, 
  CheckCircle, 
  ArrowUpRight 
} from 'lucide-react';
import Link from 'next/link';

export default function InboxPage() {
  const [messages, setMessages] = useState<any[]>([
    { id: '1', sender: 'customer', text: 'مساء الخير، الجاكيت الجلد متوفر مقاس L بلون أسود؟', time: '17:01' },
    { id: '2', sender: 'bot', text: 'مساء النور يا فندم! نعم متوفر مقاس L باللون الأسود الفاخر بضمان سنة كاملة وشحن مجاني للباب. تحب نحجز القطعة لحضرتك؟', time: '17:02' },
    { id: '3', sender: 'customer', text: 'تمام، الأسود. التوصيل هياخد أد إيه للتجمع؟', time: '17:04' },
    { id: '4', sender: 'bot', text: 'التوصيل للتجمع خلال 24 ساعة فقط يا فندم. حجزت القطعة لحضرتك، محتاج بس الاسم ثلاثي ورقم موبايل بديل لتأكيد البوليصة.', time: '17:05' },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [waybill, setWaybill] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const onSend = () => {
    const text = inputVal.trim();
    if (!text) return;

    const time = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    
    // 1. أضف رسالة العميل فوراً
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'customer', text, time }]);
    setInputVal('');
    setIsTyping(true);

    // 2. رد فوري من الإيجنت بعد 700ms
    setTimeout(() => {
      setIsTyping(false);
      let reply = '';
      const q = text.toLowerCase();
      if (q.includes('سعر') || q.includes('بكام') || q.includes('كام')) {
        reply = 'السعر حالياً عليه خصم خاص بـ 1,850 جنيه بدلاً من 2,300 جنيه! والشحن مجاني بالكامل لحد باب بيتك 🚚 تحب نأكد حجز مقاسك؟';
      } else if (q.includes('دفع') || q.includes('انستاباي') || q.includes('كاش')) {
        reply = 'متاح دفع كاش عند الاستلام بعد المعاينة، ومتاح تحويل فوري عبر إنستاباي أو فودافون كاش ❤️ تحب ابعتلك بيانات التحويل؟';
      } else if (q.includes('توصيل') || q.includes('شحن') || q.includes('فين')) {
        reply = 'الشحن بياخد من 24 لـ 48 ساعة فقط بالقاهرة، ومجاني بالكامل لأي مكان في مصر! 📦';
      } else {
        reply = `يا هلا بيك يا فندم! نورتنا في PR Agent ❤️ استفسارك بخصوص (${text}) مسجل عندنا والقطعة جاهزة للحجز والشحن الفوري. تحب نأكد المقاس؟ ✨`;
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: reply,
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 700);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 font-sans text-slate-100" dir="rtl">
      
      {/* Enterprise Header */}
      <header className="h-16 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur px-6 flex items-center justify-between flex-shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-emerald-500/30 flex items-center justify-center p-1.5 shadow-lg shadow-emerald-500/10">
            <img src="/pr-logo.png" alt="PR Agent" className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-white tracking-wide">
                PR Agent &bull; Agency Command Center
              </h1>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
                إرسال واستجابة فورية شغال
              </span>
            </div>
            <p className="text-xs text-slate-400">إدارة اتصالات ومبيعات عملاء الوكالة عبر WhatsApp و Instagram و Messenger و Telegram</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/pricing"
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
          >
            <span>باقات العملاء</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>

          <Link
            href="/fleet"
            className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 hover:bg-emerald-900/60 px-3 py-1.5 rounded-lg border border-emerald-800 transition-colors"
          >
            <Users className="w-3.5 h-3.5" />
            <span>أسطول الـ 65 إيجنت</span>
          </Link>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Column 1: Conversations List */}
        <div className="w-80 border-l border-slate-800/80 flex flex-col bg-slate-900/40 flex-shrink-0">
          <div className="p-3.5 border-b border-slate-800/80">
            <div className="p-3 bg-slate-800/80 rounded-xl border border-emerald-500/30">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-xs font-bold text-white">أحمد محمود</h4>
                <span className="text-[10px] text-slate-400">القاهرة (التجمع)</span>
              </div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-emerald-950 text-emerald-400 border border-emerald-800">
                  واتساب
                </span>
                <span className="text-[9px] text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                  QUALIFIED_LEAD
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">
                {messages[messages.length - 1]?.text}
              </p>
            </div>
          </div>
        </div>

        {/* Column 2: Chat Stream */}
        <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
          <div className="h-16 border-b border-slate-800/80 px-6 flex items-center justify-between bg-slate-900/30 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-sm">
                أ
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">أحمد محمود</h3>
                  <span className="text-xs text-slate-400 font-mono">+201001234567</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-medium">واتساب</span>
                  <span>&bull;</span>
                  <span className="text-slate-300 font-medium">الوكيل: سارة طارق (Senior PR Account Executive)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs text-emerald-400 font-bold">الرد الآلي للإيجنت نشط</span>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((m: any) => {
              const isCust = m.sender === 'customer';

              return (
                <div key={m.id} className={`flex ${isCust ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-md rounded-2xl p-4 text-xs leading-relaxed shadow-sm ${
                    isCust 
                      ? 'bg-slate-800 text-slate-100 rounded-tr-none border border-slate-700/60' 
                      : 'bg-gradient-to-br from-emerald-950/70 to-slate-900 text-emerald-100 rounded-tl-none border border-emerald-500/30'
                  }`}>
                    {!isCust && (
                      <div className="flex items-center gap-1.5 mb-1.5 text-[10px] text-emerald-400 font-bold">
                        <Sparkles className="w-3 h-3" />
                        <span>سارة طارق (PR AI Agent)</span>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{m.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1.5 text-[9px] text-slate-400">
                      <span>{m.time}</span>
                      {!isCust && <CheckCheck className="w-3 h-3 text-emerald-400" />}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-end">
                <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl rounded-tl-none p-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-[10px] text-emerald-400 pr-1">سارة طارق بتكتب الرد البيعي...</span>
                </div>
              </div>
            )}

            <div ref={scrollRef} />
          </div>

          {/* Simple Bulletproof Input */}
          <div className="p-4 border-t border-slate-800/80 bg-slate-900/60 flex gap-2">
            <input
              type="text"
              placeholder="اكتب رسالتك هنا واضغط إرسال أو Enter..."
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  onSend();
                }
              }}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="button"
              onClick={onSend}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-lg shadow-emerald-600/20 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>إرسال</span>
            </button>
          </div>
        </div>

        {/* Column 3: Order Summary */}
        <div className="w-80 border-r border-slate-800/80 bg-slate-900/30 flex flex-col p-4 overflow-y-auto space-y-4 flex-shrink-0">
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/30 rounded-xl p-3.5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                ملخص الصفقة / الأوردر
              </h4>
              <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                أوردر جاهز للتأكيد
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60 space-y-1">
                <p className="text-slate-200 font-bold">جاكيت جلد طبيعي بريميوم (Black Edition)</p>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>المقاس: L</span>
                  <span className="text-emerald-400 font-bold text-xs">1,850 ج.م</span>
                </div>
              </div>
            </div>

            {orderConfirmed ? (
              <div className="bg-emerald-950 border border-emerald-500/40 p-3 rounded-lg text-center space-y-1.5">
                <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" />
                <p className="text-xs font-bold text-white">تم إصدار بوليصة بوسطة الفعلية! 🎉</p>
                <p className="text-xs font-mono font-bold text-emerald-300 bg-emerald-900/80 py-1 rounded border border-emerald-700">
                  {waybill}
                </p>
                <p className="text-[10px] text-slate-300">Carrier: Bosta Express Egypt</p>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setWaybill(`BST-EG-${Math.floor(100000 + Math.random() * 900000)}`);
                  setOrderConfirmed(true);
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-900/40 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>إصدار بوليصة الشحن الرسمية (Bosta)</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
