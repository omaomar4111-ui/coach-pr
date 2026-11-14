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
  Users,
  Filter
} from 'lucide-react';
import Link from 'next/link';

export default function InboxPage() {
  const [activeId, setActiveId] = useState<string>('conv-1');
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState('ALL');
  const [replyText, setReplyText] = useState('');
  const [isAiActive, setIsAiActive] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // واقعي ومضبوط بلهجة مصرية تجارية متقنة
  const [conversations, setConversations] = useState<any[]>([
    {
      id: 'conv-1',
      customer: { name: 'أحمد محمود', phone: '+201001234567', initials: 'أ' },
      channel: 'واتساب',
      aiEnabled: true,
      lastMessage: 'ألف مبروك يا فندم! حجزتلك الجاكيت مقاس L والشحن مجاني 🚚',
      lastTime: '17:05',
      order: {
        item: 'جاكيت جلد طبيعي (أسود)',
        size: 'L',
        price: '1,850 ج.م',
        status: 'مسودة طلب آلي',
      },
      messages: [
        { id: '1', sender: 'customer', text: 'السلام عليكم، الجاكيت الجلد متوفر مقاس L؟', time: '17:01' },
        { id: '2', sender: 'bot', text: 'وعليكم السلام يا فندم! منورنا في متجر ديمو 🌸 نعم يا فندم الجاكيت الجلد الطبيعي متوفر مقاس L بلونيه الأسود الفاخر والبني. سعره 1850 جنيه بضمان سنة كاملة، والشحن مجاني بالكامل لحد باب بيتك 🚚 تحب أحجزلك القطعة ونشحنها بكرة؟', time: '17:02' },
        { id: '3', sender: 'customer', text: 'تمام، الأسود. بس عايز أعرف الشحن هياخد وقت أد إيه لمصر الجديدة؟', time: '17:04' },
        { id: '4', sender: 'bot', text: 'ألف مبروك مقدماً يا فندم 🎉 التوصيل لمصر الجديدة بياخد من 24 لـ 48 ساعة بالكتير. حجزتلك القطعة أهو في السيستم! محتاج من حضرتك بس: الاسم ثلاثي ورقم موبايل بديل والعنوان بالتفصيل عشان مندوب الشحن يوصلك بأسرع وقت.', time: '17:05' },
      ]
    },
    {
      id: 'conv-2',
      customer: { name: 'سارة علي', phone: '+201112345678', initials: 'س' },
      channel: 'إنستغرام',
      aiEnabled: false,
      lastMessage: 'ممكن أكلم حد من خدمة العملاء؟',
      lastTime: '16:50',
      order: {
        item: 'قميص قطن أوكسفورد (أبيض)',
        size: 'M',
        price: '450 ج.م',
        status: 'قيد الاستفسار',
      },
      messages: [
        { id: '1', sender: 'customer', text: 'ممكن أعرف مقاسات القميص الأوكسفورد وخامته إيه؟', time: '16:48' },
        { id: '2', sender: 'bot', text: 'أهلاً بحضرتك يا سارة 🌸 القميص قطن مصري أوكسفورد 100% معالج ضد الانكماش، متوفر بمقاسات S / M / L / XL بألوان الأبيض والأزرق بسعر 450 جنيه بس. ولو أخدتي قطعتين عليه خصم فوري 10% 🛍️', time: '16:49' },
        { id: '3', sender: 'customer', text: 'عايزة أكلم حد من خدمة العملاء بخصوص الأوردر اللي فات.', time: '16:50' },
        { id: '4', sender: 'system', text: '🔔 تم تحويل المحادثة فوراً للأستاذ زياد بدر (رئيس قسم الشكاوى والاسترجاع)', time: '16:50' },
      ]
    },
    {
      id: 'conv-3',
      customer: { name: 'محمد حسن', phone: '+201223456789', initials: 'م' },
      channel: 'ماسنجر',
      aiEnabled: true,
      lastMessage: 'البنطلون الشينو البيج متاح مقاس 34؟',
      lastTime: '16:30',
      order: {
        item: 'بنطلون شينو كلاسيك',
        size: '34',
        price: '620 ج.م',
        status: 'مسودة طلب آلي',
      },
      messages: [
        { id: '1', sender: 'customer', text: 'البنطلون الشينو البيج متاح مقاس 34؟', time: '16:30' },
        { id: '2', sender: 'bot', text: 'يا هلا بحضرتك يا فندم! نعم مقاس 34 متاح حالياً باللون البيج والكحلي بسعر 620 جنيه، وخامته ليكرا قطن مريحة جداً في الحركة. تحب ننسق معاه قميص أوكسفورد أبيض وتستفيد بالشحن المجاني؟', time: '16:31' },
      ]
    },
    {
      id: 'conv-4',
      customer: { name: 'طارق يوسف (عميل VIP)', phone: '+201099887766', initials: 'ط' },
      channel: 'تليجرام',
      aiEnabled: true,
      lastMessage: 'عايز أطلب 3 جواكت للشركة',
      lastTime: '16:15',
      order: {
        item: '3 جواكت جلد طبيعي (جملة VIP)',
        size: 'L, XL, XXL',
        price: '5,550 ج.م',
        status: 'طلب VIP معتمد',
      },
      messages: [
        { id: '1', sender: 'customer', text: 'مساء الخير، محتاج أطلب 3 جواكت للشركة مقاسات مختلفة، في خصم للشركات؟', time: '16:14' },
        { id: '2', sender: 'bot', text: 'مساء النور يا فندم! نورتنا وشرفتنا 👑 لحضرتك خصم خاص 15% على إجمالي الطلب مع إصدار فاتورة ضريبية رسمية وشحن VIP سريع لباب الشركة. تحب أربط حضرتك بمدير مبيعات الشركات أ / أشرف عبد الرحيم فوراً؟', time: '16:15' },
      ]
    }
  ]);

  const activeConv = conversations.find(c => c.id === activeId) || conversations[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv.messages]);

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
          aiEnabled: false,
          lastMessage: replyText.trim(),
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    }));

    setIsAiActive(false);
    setReplyText('');
  };

  const toggleAi = () => {
    const nextState = !isAiActive;
    setIsAiActive(nextState);
    setConversations(prev => prev.map(c => c.id === activeId ? { ...c, aiEnabled: nextState } : c));
  };

  const filtered = conversations.filter(c => {
    const matchesSearch = c.customer.name.includes(searchTerm) || c.customer.phone.includes(searchTerm);
    const matchesPlatform = platformFilter === 'ALL' || c.channel === platformFilter;
    return matchesSearch && matchesPlatform;
  });

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
              Social Inbox & AI Commerce (Omnichannel)
            </h1>
            <p className="text-[11px] text-slate-400">إدارة مركزية لـ 65 إيجنت وبوت عبر WhatsApp و IG و Messenger و Telegram</p>
          </div>
        </div>

        {/* Live Controls */}
        <div className="flex items-center gap-3">
          <Link
            href="/fleet"
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
          >
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>أسطول الإيجنتس (65 Agent)</span>
          </Link>

          <Link
            href="/analytics"
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
          >
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
            <span>لوحة المبيعات والتحليلات</span>
          </Link>

          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-full border border-slate-800 text-xs">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-medium">الربط السحابي متصل (Live)</span>
          </div>
        </div>
      </header>

      {/* 3-Column Layout */}
      <main className="flex-1 grid grid-cols-[360px_1fr_330px] overflow-hidden">
        
        {/* Column 1: Conversations List with Omnichannel Filter */}
        <section className="flex flex-col h-full bg-slate-900 border-l border-slate-800">
          <div className="p-4 border-b border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                صندوق الوارد الموحد
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

            {/* Platform Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px]">
              {['ALL', 'واتساب', 'إنستغرام', 'ماسنجر', 'تليجرام'].map(plat => (
                <button
                  key={plat}
                  onClick={() => setPlatformFilter(plat)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors whitespace-nowrap ${
                    platformFilter === plat
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {plat === 'ALL' ? 'الكل' : plat}
                </button>
              ))}
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
                          <Bot className="w-2.5 h-2.5" /> رد مصري ذكي
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[9px] bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20">
                          تدخل بشري
                        </span>
                      )}
                      <span className="text-[9px] text-slate-300 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 font-medium">
                        {conv.channel}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Column 2: Message Thread with Natural Arabic Flow */}
        <section className="flex flex-col h-full bg-slate-950">
          <div className="p-3.5 border-b border-slate-800 bg-slate-900/60 backdrop-blur flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-500/30">
                {activeConv.customer.initials}
              </div>
              <div>
                <h3 className="font-bold text-white text-xs">{activeConv.customer.name}</h3>
                <p className="text-[11px] text-slate-400">{activeConv.customer.phone} • عبر {activeConv.channel}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1.5">
                <Sparkles className={`w-3.5 h-3.5 ${isAiActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span className="text-xs font-medium text-slate-300">
                  {isAiActive ? 'مساعد المبيعات الآلي نشط' : 'التحكم اليدوي للموظف'}
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
                  <div className="flex items-end gap-2 max-w-[78%]">
                    {isCustomer && (
                      <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-xs flex-shrink-0">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                        isCustomer
                          ? 'bg-slate-800 text-slate-100 rounded-bl-sm border border-slate-700/60'
                          : isBot
                          ? 'bg-emerald-600/20 text-emerald-100 rounded-br-sm border border-emerald-500/30'
                          : 'bg-blue-600 text-white rounded-br-sm'
                      }`}
                    >
                      {isBot && (
                        <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 mb-1 border-b border-emerald-500/20 pb-1">
                          <Bot className="w-3 h-3" /> المساعد الذكي (Gemini 3.8 Flash)
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

          <form onSubmit={handleSendReply} className="p-3 border-t border-slate-800 bg-slate-900/40 flex items-center gap-2">
            <input
              type="text"
              placeholder="اكتب ردك للمتابعة اليدوية (سيتوقف الـ AI تلقائياً لمنع أي تداخل)..."
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
          <div className="text-center pb-4 border-b border-slate-800">
            <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center font-bold text-lg mb-2">
              {activeConv.customer.initials}
            </div>
            <h3 className="text-sm font-bold text-white">{activeConv.customer.name}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{activeConv.customer.phone}</p>
            <span className="inline-block mt-2 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">
              عميل موثق عبر {activeConv.channel}
            </span>
          </div>

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
                <span>القاهرة، مصر (استخراج ذكي بالـ AI)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>آخر تفاعل: اليوم {activeConv.lastTime}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                الطلب المكتشف (Smart Order)
              </h4>
              <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 font-medium">
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
                اعتماد الطلب وإصدار البوليصة
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> نافذة المراسلة
              </span>
              <span className="text-emerald-400 text-[11px] font-medium">مفتوحة ونشطة</span>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
