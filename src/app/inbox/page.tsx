'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
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
    { id: '2', sender: 'bot', text: 'مساء النور يا فندم! نعم متوفر مقاس L باللون الأسود بضمان سنة وشحن مجاني للباب 🚚 تحب نحجز القطعة لحضرتك؟', time: '17:02' },
    { id: '3', sender: 'customer', text: 'تمام، الأسود. التوصيل هياخد أد إيه للتجمع؟', time: '17:04' },
    { id: '4', sender: 'bot', text: 'التوصيل للتجمع خلال 24 ساعة فقط يا فندم. حجزت القطعة لحضرتك، محتاج بس الاسم ثلاثي ورقم موبايل بديل لتأكيد البوليصة.', time: '17:05' },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [waybill, setWaybill] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    const text = inputVal.trim();
    if (!text) return;

    const time = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    
    // إرسال فوري بدون أي تأخير
    setMessages(prev => [...prev, { id: String(Date.now()), sender: 'customer', text, time }]);
    setInputVal('');
    setIsTyping(true);

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
        reply = `يا هلا بيك يا فندم! نورتنا في PR Agent ❤️ تم استلام رسالتك: (${text})، وجاري تأكيد طلبك مع إيجنت المبيعات المسؤول. تحب نأكد الحجز؟ ✨`;
      }

      setMessages(prev => [...prev, {
        id: String(Date.now() + 1),
        sender: 'bot',
        text: reply,
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 600);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 font-sans text-slate-100" dir="rtl">
      
      {/* Header Clean - No unnecessary description */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/90 px-6 flex items-center justify-between flex-shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-emerald-500/30 flex items-center justify-center p-1.5 shadow-lg shadow-emerald-500/10">
            <img src="/pr-logo.png" alt="PR Agent" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white">PR Agent</h1>
            <span className="text-[10px] text-emerald-400 font-bold block">متصل &bull; 65 إيجنت نشط</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/pricing"
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-xl border border-slate-700 transition-colors"
          >
            <span>باقات العملاء</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/fleet"
            className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 hover:bg-emerald-900/60 px-3.5 py-2 rounded-xl border border-emerald-800 transition-colors"
          >
            <Users className="w-3.5 h-3.5" />
            <span>أسطول الـ 65 إيجنت</span>
          </Link>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Column 1: Conversations List */}
        <div className="w-72 border-l border-slate-800 flex flex-col bg-slate-900/40 flex-shrink-0">
          <div className="p-3 border-b border-slate-800">
            <div className="p-3 bg-slate-800 rounded-xl border border-emerald-500/30">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-xs font-bold text-white">أحمد محمود</h4>
                <span className="text-[10px] text-slate-400">التجمع</span>
              </div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-emerald-950 text-emerald-400 border border-emerald-800">
                  واتساب
                </span>
                <span className="text-[9px] text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                  عميل مميز
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
          <div className="h-14 border-b border-slate-800 px-6 flex items-center justify-between bg-slate-900/30 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-xs">
                أ
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">أحمد محمود (+201001234567)</h3>
                <span className="text-[10px] text-slate-400">الوكيل: سارة طارق (Senior PR Executive)</span>
              </div>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              متصل
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((m: any) => {
              const isCust = m.sender === 'customer';
              return (
                <div key={m.id} className={`flex ${isCust ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-md rounded-2xl p-3.5 text-xs leading-relaxed shadow-sm ${
                    isCust 
                      ? 'bg-slate-800 text-slate-100 rounded-tr-none border border-slate-700' 
                      : 'bg-emerald-950/80 text-emerald-100 rounded-tl-none border border-emerald-500/40'
                  }`}>
                    {!isCust && (
                      <div className="flex items-center gap-1.5 mb-1 text-[10px] text-emerald-400 font-bold">
                        <Sparkles className="w-3 h-3" />
                        <span>سارة طارق (PR Agent)</span>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{m.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-400">
                      <span>{m.time}</span>
                      {!isCust && <CheckCheck className="w-3 h-3 text-emerald-400" />}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-end">
                <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl rounded-tl-none p-2.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-[10px] text-emerald-400 pr-1">سارة طارق بتكتب الرد...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Guaranteed Working Input Bar */}
          <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center gap-2">
            <input
              type="text"
              placeholder="اكتب رسالتك واضغط إرسال أو Enter..."
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="button"
              onClick={handleSend}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-lg shadow-emerald-600/20 cursor-pointer active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>إرسال</span>
            </button>
          </div>
        </div>

        {/* Column 3: Order Summary & Real Button */}
        <div className="w-80 border-r border-slate-800 bg-slate-900/30 flex flex-col p-4 overflow-y-auto space-y-4 flex-shrink-0">
          <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                ملخص الطلب
              </h4>
              <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                جاهز للتأكيد
              </span>
            </div>

            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 space-y-1 text-xs">
              <p className="text-white font-bold">جاكيت جلد طبيعي بريميوم (Black)</p>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>المقاس: L</span>
                <span className="text-emerald-400 font-bold">1,850 ج.م</span>
              </div>
            </div>

            {orderConfirmed ? (
              <div className="bg-emerald-950 border border-emerald-500/50 p-3 rounded-lg text-center space-y-1">
                <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" />
                <p className="text-xs font-bold text-white">تم إصدار بوليصة الشحن بنجاح!</p>
                <p className="text-xs font-mono font-bold text-emerald-300 bg-emerald-900 py-1 rounded">
                  {waybill}
                </p>
                <p className="text-[10px] text-slate-400">Carrier: Bosta Express</p>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setWaybill(`BST-EG-${Math.floor(100000 + Math.random() * 900000)}`);
                  setOrderConfirmed(true);
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-900/40 cursor-pointer active:scale-95"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>إصدار بوليصة الشحن الرسمية</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
