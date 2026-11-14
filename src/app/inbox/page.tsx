'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Search, 
  MessageCircle, 
  User, 
  Sparkles, 
  Phone, 
  MapPin, 
  Clock, 
  ShoppingBag, 
  ShieldCheck, 
  CheckCheck, 
  Radio, 
  BarChart3,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';

export default function InboxPage() {
  const [activeId, setActiveId] = useState<string>('conv-1');
  const [searchTerm, setSearchTerm] = useState('');
  const [replyText, setReplyText] = useState('');
  const [isAiActive, setIsAiActive] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial State: محادثات واقعية حية لمتجر ملابس مصري
  const [conversations, setConversations] = useState<any[]>([
    {
      id: 'conv-1',
      customer: { name: 'أحمد محمود', phone: '+201001234567', initials: 'أ' },
      channel: 'واتساب',
      aiEnabled: true,
      lastMessage: 'الشحن مجاني للطلبات فوق 1000 جنيه 🚚',
      lastTime: '16:45',
      order: {
        item: 'جاكيت جلد طبيعي (أسود)',
        size: 'L',
        price: '1,850 ج.م',
        status: 'مسودة طلب',
      },
      messages: [
        { id: '1', sender: 'customer', text: 'السلام عليكم، الجاكيت الجلد متوفر مقاس L؟', time: '16:40' },
        { id: '2', sender: 'bot', text: 'وعليكم السلام! أهلاً بك في متجر ديمو 👋 نعم، الجاكيت الجلد متوفر بمقاس L بالألوان الأسود والبني. السعر 1850 جنيه. تحب أحجزلك واحد؟', time: '16:40' },
        { id: '3', sender: 'customer', text: 'تمام، الأسود. بس عايز أعرف الشحن بكام لمصر الجديدة؟', time: '16:44' },
        { id: '4', sender: 'bot', text: 'الشحن مجاني للطلبات فوق 1000 جنيه 🚚 طلبك هيوصلك مجاناً خلال 48 ساعة. العنوان هيوصلك عليه، تحب نأكد الطلب؟', time: '16:45' },
      ]
    },
    {
      id: 'conv-2',
      customer: { name: 'سارة علي', phone: '+201112345678', initials: 'س' },
      channel: 'واتساب',
      aiEnabled: false,
      lastMessage: 'ممكن أكلم حد من خدمة العملاء؟',
      lastTime: '16:30',
      order: {
        item: 'قميص قطن أوكسفورد (أبيض)',
        size: 'M',
        price: '450 ج.م',
        status: 'قيد الاستفسار',
      },
      messages: [
        { id: '1', sender: 'customer', text: 'ممكن أعرف مقاسات القميص الأوكسفورد؟', time: '16:28' },
        { id: '2', sender: 'bot', text: 'أهلاً سارة 🌸 متوفر مقاسات S / M / L / XL بألوان الأبيض والأزرق بسعر 450 جنيه.', time: '16:29' },
        { id: '3', sender: 'customer', text: 'ممكن أكلم حد من خدمة العملاء؟', time: '16:30' },
        { id: '4', sender: 'system', text: '🔔 تم تحويل المحادثة لموظف بشري (Human Takeover)', time: '16:30' },
      ]
    },
    {
      id: 'conv-3',
      customer: { name: 'محمد حسن', phone: '+201223456789', initials: 'م' },
      channel: 'إنستغرام',
      aiEnabled: true,
      lastMessage: 'البنطلون الشينو البيج متاح مقاس 34؟',
      lastTime: '15:15',
      order: {
        item: 'بنطلون شينو كلاسيك',
        size: '34',
        price: '620 ج.م',
        status: 'مسودة طلب',
      },
      messages: [
        { id: '1', sender: 'customer', text: 'البنطلون الشينو البيج متاح مقاس 34؟', time: '15:15' },
        { id: '2', sender: 'bot', text: 'أهلاً محمد! نعم مقاس 34 متاح باللون البيج والكحلي بسعر 620 جنيه وخصم 10% للقطعتين 🛍️', time: '15:15' },
      ]
    }
  ]);

  const activeConv = conversations.find(c => c.id === activeId) || conversations[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv.messages]);

  // إرسال رد يدوي من الموظف
  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      sender: 'agent',
      text: replyText.trim(),
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(prev => prev.map(c => {
      if (c.id === activeId) {
        return {
          ...c,
          aiEnabled: false, // تعطيل الـ AI تلقائياً لتدخل الموظف
          lastMessage: replyText.trim(),
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    }));

    setIsAiActive(false);
    setReplyText('');
  };

  // تبديل وضع الذكاء الاصطناعي
  const toggleAi = () => {
    const nextState = !isAiActive;
    setIsAiActive(nextState);
    setConversations(prev => prev.map(c => c.id === activeId ? { ...c, aiEnabled: nextState } : c));
  };

  // تحديث فوري
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const filtered = conversations.filter(c => 
    c.customer.name.includes(searchTerm) || c.customer.phone.includes(searchTerm)
  );

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 font-sans text-slate-100" dir="rtl">
      {/* Top Navbar */}
      <header className="h-14 border-b border-slate-800 bg-slate-900/90 backdrop-blur px-6 flex items-center justify-between flex-shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide">
              Social Inbox & AI Commerce
            </h1>
            <p className="text-[11px] text-slate-400">منصة إدارة خدمة العملاء والطلبات الذكية</p>
          </div>
        </div>

        {/* Live Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800/60 px-2.5 py-1.5 rounded-lg border border-slate-700/50 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
            <span>تحديث</span>
          </button>

          <Link
            href="/analytics"
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
          >
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
            <span>لوحة التحليلات والمبيعات</span>
          </Link>

          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-full border border-slate-800 text-xs">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-medium">الاتصال السحابي متصل (Live)</span>
          </div>
        </div>
      </header>

      {/* 3-Column Layout */}
      <main className="flex-1 grid grid-cols-[340px_1fr_320px] overflow-hidden">
        
        {/* Column 1: Conversations List */}
        <section className="flex flex-col h-full bg-slate-900 border-l border-slate-800">
          <div className="p-4 border-b border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                صندوق الوارد
              </h2>
              <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full font-medium border border-emerald-500/20">
                {conversations.length} نشطة
              </span>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              <input
                type="text"
                placeholder="بحث بالاسم أو الهاتف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/50">
            {filtered.map(conv => {
              const isSelected = conv.id === activeId;
              return (
                <button
                  key={conv.id}
                  onClick={() => {
                    setActiveId(conv.id);
                    setIsAiActive(conv.aiEnabled);
                  }}
                  className={`w-full text-right p-3.5 flex items-start gap-3 transition-colors ${
                    isSelected ? 'bg-slate-800/90 border-r-4 border-r-emerald-500' : 'hover:bg-slate-800/40'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center font-bold text-sm border border-slate-700 flex-shrink-0">
                    {conv.customer.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-white truncate">{conv.customer.name}</span>
                      <span className="text-[10px] text-slate-400">{conv.lastTime}</span>
                    </div>
                    <p className="text-xs text-slate-400 truncate mb-1.5">{conv.lastMessage}</p>
                    <div className="flex items-center gap-1.5">
                      {conv.aiEnabled ? (
                        <span className="inline-flex items-center gap-1 text-[9px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">
                          <Bot className="w-2.5 h-2.5" /> AI فعال
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[9px] bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20">
                          بشري
                        </span>
                      )}
                      <span className="text-[9px] text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                        {conv.channel}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Column 2: Message Thread */}
        <section className="flex flex-col h-full bg-slate-950">
          {/* Thread Header */}
          <div className="p-3.5 border-b border-slate-800 bg-slate-900/60 backdrop-blur flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-500/30">
                {activeConv.customer.initials}
              </div>
              <div>
                <h3 className="font-bold text-white text-xs">{activeConv.customer.name}</h3>
                <p className="text-[11px] text-slate-400">{activeConv.customer.phone}</p>
              </div>
            </div>

            {/* AI Toggle Switch */}
            <div className="flex items-center gap-2.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1.5">
                <Sparkles className={`w-3.5 h-3.5 ${isAiActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span className="text-xs font-medium text-slate-300">
                  {isAiActive ? 'الـ AI يرد آلياً' : 'تدخل بشري'}
                </span>
              </div>
              <button
                onClick={toggleAi}
                className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                  isAiActive ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    isAiActive ? 'translate-x-0' : '-translate-x-5'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {activeConv.messages.map((msg: any) => {
              const isCustomer = msg.sender === 'customer';
              const isBot = msg.sender === 'bot';
              const isSystem = msg.sender === 'system';

              if (isSystem) {
                return (
                  <div key={msg.id} className="text-center my-2">
                    <span className="inline-block text-[11px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-3 py-1 rounded-full">
                      {msg.text}
                    </span>
                  </div>
                );
              }

              return (
                <div key={msg.id} className={`flex flex-col ${isCustomer ? 'items-start' : 'items-end'}`}>
                  <div className="flex items-end gap-2 max-w-[75%]">
                    {isCustomer && (
                      <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-xs flex-shrink-0">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                        isCustomer
                          ? 'bg-slate-800 text-slate-100 rounded-bl-sm border border-slate-700/60'
                          : isBot
                          ? 'bg-emerald-600/20 text-emerald-100 rounded-br-sm border border-emerald-500/30'
                          : 'bg-blue-600 text-white rounded-br-sm'
                      }`}
                    >
                      {isBot && (
                        <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 mb-1 border-b border-emerald-500/20 pb-1">
                          <Bot className="w-3 h-3" /> رد الذكاء الاصطناعي (Gemini)
                        </div>
                      )}
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                  <div className={`text-[10px] text-slate-500 mt-1 flex items-center gap-1 ${isCustomer ? 'mr-8' : 'ml-1'}`}>
                    <span>{msg.time}</span>
                    {!isCustomer && <CheckCheck className="w-3 h-3 text-emerald-400" />}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Reply Form */}
          <form onSubmit={handleSendReply} className="p-3 border-t border-slate-800 bg-slate-900/40 flex items-center gap-2">
            <input
              type="text"
              placeholder="اكتب رداً للمتابعة يدوياً (سيتوقف الـ AI تلقائياً عند إرسالك)..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!replyText.trim()}
              className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 text-white px-4 py-2.5 rounded-xl font-medium text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>إرسال</span>
            </button>
          </form>
        </section>

        {/* Column 3: Customer & AI Order Panel */}
        <section className="flex flex-col h-full bg-slate-900 border-r border-slate-800 p-4 space-y-5 overflow-y-auto">
          {/* Customer Header */}
          <div className="text-center pb-4 border-b border-slate-800">
            <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center font-bold text-lg mb-2">
              {activeConv.customer.initials}
            </div>
            <h3 className="text-sm font-bold text-white">{activeConv.customer.name}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{activeConv.customer.phone}</p>
            <span className="inline-block mt-2 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              عميل موثق عبر {activeConv.channel}
            </span>
          </div>

          {/* Details */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              بيانات التواصل والتسليم
            </h4>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{activeConv.customer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>القاهرة، مصر (تحديد تلقائي بالـ AI)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>آخر نشاط: اليوم {activeConv.lastTime}</span>
              </div>
            </div>
          </div>

          {/* AI Extracted Order */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                الطلب المكتشف (AI Order)
              </h4>
              <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">
                {activeConv.order.status}
              </span>
            </div>

            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 text-emerald-400">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-white">{activeConv.order.item}</p>
                  <p className="text-[11px] text-slate-400">المقاس: {activeConv.order.size}</p>
                  <p className="text-xs font-bold text-emerald-400 mt-1">{activeConv.order.price}</p>
                </div>
              </div>

              <button
                onClick={() => alert(`تم تأكيد طلب ${activeConv.order.item} بنجاح وإرسال الفاتورة للعميل!`)}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs py-2 rounded-lg font-medium transition-colors shadow-sm"
              >
                تأكيد الطلب وإنشاء الفاتورة
              </button>
            </div>
          </div>

          {/* Meta 24-Hour Window Badge */}
          <div className="pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> نافذة WhatsApp
              </span>
              <span className="text-emerald-400 text-[11px] font-medium">مفتوحة (24 ساعة)</span>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
