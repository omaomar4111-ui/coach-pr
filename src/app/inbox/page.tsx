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
  Filter,
  CheckCircle,
  RefreshCw,
  PlusCircle,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

// قائمة الإيجنتس الحية المتصلين بالمنظومة (65 إيجنت)
const AGENTS_LIST = [
  { id: 'ag-01', name: 'سارة طارق', role: 'مبيعات واتساب VIP', platform: 'واتساب', status: 'ONLINE', rating: 4.95, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150' },
  { id: 'ag-02', name: 'عمر خالد', role: 'كاشير وتأكيد إنستاباي', platform: 'واتساب', status: 'ONLINE', rating: 4.92, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
  { id: 'ag-03', name: 'ياسمين ممدوح', role: 'فاشون إنستغرام ومقاسات', platform: 'إنستغرام', status: 'ONLINE', rating: 4.98, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
  { id: 'ag-04', name: 'محمود الصاوي', role: 'كلوزينج ومبيعات ماسنجر', platform: 'ماسنجر', status: 'ONLINE', rating: 4.88, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
  { id: 'ag-05', name: 'هند الجوهري', role: 'استرجاع واستبدال فوري', platform: 'واتساب', status: 'ONLINE', rating: 4.91, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150' },
  { id: 'ag-06', name: 'كريم علام', role: 'مبيعات تليجرام وجملة', platform: 'تليجرام', status: 'ONLINE', rating: 4.85, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150' },
];

export default function InboxPage() {
  const [conversations, setConversations] = useState<any[]>([
    {
      id: 'conv-1',
      customer: { name: 'أحمد محمود', phone: '+201001234567', initials: 'أ' },
      channel: 'واتساب',
      aiEnabled: true,
      assignedAgent: AGENTS_LIST[0],
      lastMessage: 'ألف مبروك يا فندم! حجزتلك الجاكيت مقاس L والشحن مجاني 🚚',
      lastTime: '17:05',
      order: {
        item: 'جاكيت جلد طبيعي (أسود)',
        size: 'L',
        price: '1,850 ج.م',
        status: 'مسودة طلب آلي',
        payment: 'INSTAPAY',
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
      aiEnabled: true,
      assignedAgent: AGENTS_LIST[2],
      lastMessage: 'ممكن أكلم حد من خدمة العملاء؟',
      lastTime: '16:50',
      order: {
        item: 'فستان صيفي خامة ليكرا مستوردة',
        size: 'M',
        price: '750 ج.م',
        status: 'قيد الاستفسار',
        payment: 'COD',
      },
      messages: [
        { id: '1', sender: 'customer', text: 'ممكن أعرف مقاسات الفستان وخامته إيه؟', time: '16:48' },
        { id: '2', sender: 'bot', text: 'أهلاً بحضرتك يا سارة 🌸 الفستان خامة ليكرا مستوردة ناعمة جداً معالجة ضد الانكماش، متوفر بمقاسات M و L بسعر 750 جنيه بس. والشحن مجاني لو طلبتي معاه أي قطعة تانية 🛍️', time: '16:49' },
        { id: '3', sender: 'customer', text: 'تحفة، عايزة أطلبه مقاس M كاش عند الاستلام في المنصورة.', time: '16:50' },
      ]
    },
    {
      id: 'conv-3',
      customer: { name: 'محمد حسن', phone: '+201223456789', initials: 'م' },
      channel: 'ماسنجر',
      aiEnabled: true,
      assignedAgent: AGENTS_LIST[3],
      lastMessage: 'البنطلون الشينو البيج متاح مقاس 34؟',
      lastTime: '16:30',
      order: {
        item: 'بنطلون شينو كلاسيك (بيج)',
        size: '34',
        price: '620 ج.م',
        status: 'مسودة طلب آلي',
        payment: 'VODAFONE_CASH',
      },
      messages: [
        { id: '1', sender: 'customer', text: 'البنطلون الشينو البيج متاح مقاس 34؟', time: '16:30' },
        { id: '2', sender: 'bot', text: 'يا هلا بحضرتك يا فندم! نعم مقاس 34 متاح حالياً باللون البيج والكحلي بسعر 620 جنيه، وخامته ليكرا قطن مريحة جداً. تحب أحجزلك القطعة ونبعتهالك مع هدية شراب قطن؟', time: '16:31' },
      ]
    },
    {
      id: 'conv-4',
      customer: { name: 'طارق يوسف (شركة الدلتا)', phone: '+201099887766', initials: 'ط' },
      channel: 'تليجرام',
      aiEnabled: true,
      assignedAgent: AGENTS_LIST[5],
      lastMessage: 'عايز أطلب 5 أطقم يونيفورم للشركة',
      lastTime: '16:15',
      order: {
        item: '5 أطقم يونيفورم رجالي كامل (جملة VIP)',
        size: 'L, XL',
        price: '4,200 ج.م',
        status: 'طلب VIP معتمد',
        payment: 'INSTAPAY',
      },
      messages: [
        { id: '1', sender: 'customer', text: 'مساء الخير، محتاج 5 أطقم يونيفورم للشركة مقاسات مختلفة، في خصم للشركات؟', time: '16:14' },
        { id: '2', sender: 'bot', text: 'مساء النور يا باشا! نورتنا وشرفتنا 👑 لحضرتك خصم خاص 20% على إجمالي الطلب مع إصدار فاتورة ضريبية رسمية وشحن VIP مجاني لباب مقر الشركة. إجمالي المبلغ بعد الخصم 4,200ج فقط. تحب ابعتلك بيانات التحويل البنكي أو إنستاباي؟', time: '16:15' },
      ]
    }
  ]);

  const [activeId, setActiveId] = useState<string>('conv-1');
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState('ALL');
  const [replyText, setReplyText] = useState('');
  const [isAiActive, setIsAiActive] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [testInput, setTestInput] = useState('');
  const [testPlatform, setTestPlatform] = useState('واتساب');
  const [isSimulating, setIsSimulating] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeConv = conversations.find(c => c.id === activeId) || conversations[0];

  useEffect(() => {
    setIsAiActive(activeConv?.aiEnabled ?? true);
    setOrderConfirmed(false);
  }, [activeId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages, isTyping]);

  // محاكاة وصول رسالة حقيقية من العميل والرد التلقائي عليها فوراً من الإيجنت المسؤول
  const handleSimulateIncoming = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = testInput.trim() || 'السلام عليكم، عايز أعرف السعر وطريقة الدفع لوسمحت؟';
    setIsSimulating(true);

    const currentTime = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    const newMsgId = Date.now().toString();

    // 1. إضافة رسالة العميل فوراً في المحادثة الحالية
    const customerMsg = {
      id: newMsgId,
      sender: 'customer',
      text: query,
      time: currentTime,
    };

    setConversations(prev => prev.map(c => {
      if (c.id === activeId) {
        return {
          ...c,
          lastMessage: query,
          lastTime: currentTime,
          messages: [...c.messages, customerMsg]
        };
      }
      return c;
    }));

    setTestInput('');
    setIsTyping(true);

    // 2. رد فوري واقعي من الإيجنت الذكي بلهجة مصرية تجارية حاسمة خلال ثانية ونصف
    setTimeout(() => {
      setIsTyping(false);
      setIsSimulating(false);

      let reply = '';
      let detectedItem = 'منتج بريميوم مميز';
      let detectedPrice = '550 ج.م';

      if (query.includes('سعر') || query.includes('بكام') || query.includes('كام')) {
        reply = `يا هلا بيك يا فندم! 🌸 السعر حالياً عليه خصم 20% وبـ 550 جنيه بس بدلاً من 690 جنيه! والشحن مجاني بالكامل لو طلبت قطعتين لأي مكان في مصر 🚚 تحب نحجز لحضرتك قبل انتهاء كمية العرض؟`;
      } else if (query.includes('دفع') || query.includes('انستاباي') || query.includes('كاش') || query.includes('فودافون')) {
        reply = `متاح دفع كاش عند الاستلام مع المعاينة براحتك تماماً قبل ما تدفع قرش، ومتاح كمان تحويل فوري عبر إنستاباي أو فودافون كاش زي ما يناسبك يا فندم ❤️ تحب ابعتلك رقم التحويل؟`;
      } else if (query.includes('مقاس') || query.includes('ألوان') || query.includes('لون')) {
        reply = `المقاسات المتاحة حالياً من M لحد 3XL، والتلبيس مرتاح جداً ومطابق لجدول المقاسات. لو حابب قولي وزنك وطولك تقريباً وأنا هختارلك أنسب مقاس بالضبط! 👔`;
      } else {
        reply = `تحت أمرك يا فندم في أي وقت! معاك ${activeConv.assignedAgent?.name || 'إيجنت المبيعات'}، وكل منتجاتنا بضمان استبدال ومعاينة فورية مجانية. أقدر أساعد حضرتك إزاي في اختيار طلبك؟ ✨`;
      }

      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: reply,
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      };

      setConversations(prev => prev.map(c => {
        if (c.id === activeId) {
          return {
            ...c,
            lastMessage: reply,
            lastTime: botMsg.time,
            order: c.order || { item: detectedItem, size: 'L', price: detectedPrice, status: 'مسودة طلب آلي' },
            messages: [...c.messages, botMsg]
          };
        }
        return c;
      }));
    }, 1200);
  };

  // إرسال رد يدوي من الموظف
  const handleSendManualReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const manualMsg = {
      id: Date.now().toString(),
      sender: 'agent',
      text: replyText.trim(),
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(prev => prev.map(c => {
      if (c.id === activeId) {
        return {
          ...c,
          lastMessage: replyText.trim(),
          messages: [...c.messages, manualMsg]
        };
      }
      return c;
    }));

    setReplyText('');
  };

  const toggleAi = () => {
    const next = !isAiActive;
    setIsAiActive(next);
    setConversations(prev => prev.map(c => c.id === activeId ? { ...c, aiEnabled: next } : c));
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
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-white tracking-wide">
                Social Inbox & Live Fleet Orchestrator
              </h1>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                65 إيجنت متصلين وبيردو حالاً
              </span>
            </div>
            <p className="text-[11px] text-slate-400">إدارة مركزية لردود ومبيعات WhatsApp و Instagram و Messenger و Telegram</p>
          </div>
        </div>

        {/* Live Controls */}
        <div className="flex items-center gap-3">
          <Link
            href="/fleet"
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
          >
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>أسطول الـ 65 إيجنت</span>
          </Link>

          <Link
            href="/analytics"
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
          >
            <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
            <span>لوحة الـ 1000 عميل</span>
          </Link>
        </div>
      </header>

      {/* Main 3-Column Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* COLUMN 1: Conversation List */}
        <div className="w-80 border-l border-slate-800 flex flex-col bg-slate-900/50 flex-shrink-0">
          
          {/* Search & Channel Tabs */}
          <div className="p-3 border-b border-slate-800 space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-2.5" />
              <input 
                type="text" 
                placeholder="بحث بالاسم أو الهاتف..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pr-9 pl-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Platform Filter Buttons */}
            <div className="grid grid-cols-5 gap-1 text-[11px] font-medium text-slate-400">
              {['ALL', 'واتساب', 'إنستغرام', 'ماسنجر', 'تليجرام'].map(p => (
                <button
                  key={p}
                  onClick={() => setPlatformFilter(p)}
                  className={`py-1 rounded text-center transition-colors ${
                    platformFilter === p 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'hover:bg-slate-800 text-slate-400'
                  }`}
                >
                  {p === 'ALL' ? 'الكل' : p}
                </button>
              ))}
            </div>
          </div>

          {/* Conversations Scrollable List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
            {filtered.map(c => {
              const isSelected = c.id === activeId;
              return (
                <div 
                  key={c.id} 
                  onClick={() => setActiveId(c.id)}
                  className={`p-3.5 cursor-pointer transition-colors relative flex items-start gap-3 ${
                    isSelected ? 'bg-slate-800/80' : 'hover:bg-slate-800/40'
                  }`}
                >
                  {isSelected && <div className="absolute right-0 top-0 bottom-0 w-1 bg-emerald-500"></div>}

                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white flex-shrink-0 text-sm">
                    {c.customer.initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-semibold text-white truncate">{c.customer.name}</h4>
                      <span className="text-[10px] text-slate-500">{c.lastTime}</span>
                    </div>

                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                        c.channel === 'واتساب' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        c.channel === 'إنستغرام' ? 'bg-pink-950 text-pink-400 border border-pink-800' :
                        c.channel === 'ماسنجر' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                        'bg-sky-950 text-sky-400 border border-sky-800'
                      }`}>
                        {c.channel}
                      </span>
                      {c.aiEnabled && (
                        <span className="flex items-center gap-0.5 text-[9px] text-emerald-400 bg-emerald-950/60 px-1 py-0.5 rounded border border-emerald-800">
                          <Bot className="w-2.5 h-2.5" /> AI نشط
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-400 truncate">{c.lastMessage}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Simulation Bar (Live Client Simulator) */}
          <div className="p-3 border-t border-slate-800 bg-slate-950">
            <div className="text-[10px] text-emerald-400 font-bold mb-1.5 flex items-center justify-between">
              <span>⚡ محاكي رسالة عميل حقيقي:</span>
              <span className="text-slate-500 text-[9px]">اختبر رد الإيجنت فوراً</span>
            </div>
            <form onSubmit={handleSimulateIncoming} className="space-y-1.5">
              <input
                type="text"
                placeholder="اكتب سؤال عميل (مثل: السعر بكام؟)"
                value={testInput}
                onChange={e => setTestInput(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={isSimulating}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs py-1.5 rounded font-medium transition-all flex items-center justify-center gap-1 shadow-md shadow-emerald-900/30"
              >
                {isSimulating ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                <span>إرسال رسالة العميل وشوف رد الإيجنت</span>
              </button>
            </form>
          </div>
        </div>

        {/* COLUMN 2: Chat Thread */}
        <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
          
          {/* Chat Header */}
          <div className="h-14 border-b border-slate-800 px-6 flex items-center justify-between bg-slate-900/30 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-sm">
                {activeConv.customer.initials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">{activeConv.customer.name}</h3>
                  <span className="text-[10px] text-slate-400">{activeConv.customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-medium">المنصة: {activeConv.channel}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <User className="w-3 h-3 text-emerald-400" />
                    المسؤول: {activeConv.assignedAgent?.name || 'إيجنت المبيعات الآلي'}
                  </span>
                </div>
              </div>
            </div>

            {/* Auto AI Switch */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                  <Bot className={`w-3.5 h-3.5 ${isAiActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                  رد الإيجنت التلقائي
                </span>
                <button
                  type="button"
                  onClick={toggleAi}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isAiActive ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                      isAiActive ? '-translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {activeConv.messages.map((m: any) => {
              const isCust = m.sender === 'customer';
              const isBot = m.sender === 'bot';

              if (m.sender === 'system') {
                return (
                  <div key={m.id} className="flex justify-center my-2">
                    <span className="bg-slate-800/80 text-amber-300 border border-amber-500/20 text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
                      {m.text}
                    </span>
                  </div>
                );
              }

              return (
                <div key={m.id} className={`flex ${isCust ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-md rounded-2xl p-4 text-xs leading-relaxed shadow-sm ${
                    isCust 
                      ? 'bg-slate-800 text-slate-100 rounded-tr-none border border-slate-700/60' 
                      : isBot 
                        ? 'bg-gradient-to-br from-emerald-900/60 to-slate-900 text-emerald-100 rounded-tl-none border border-emerald-500/30' 
                        : 'bg-emerald-600 text-white rounded-tl-none'
                  }`}>
                    {!isCust && (
                      <div className="flex items-center gap-1.5 mb-1.5 text-[10px] text-emerald-400 font-bold">
                        <Sparkles className="w-3 h-3" />
                        <span>{activeConv.assignedAgent?.name || 'إيجنت المبيعات الذكي'}</span>
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

            {/* Live Typing Indicator */}
            {isTyping && (
              <div className="flex justify-end">
                <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl rounded-tl-none p-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-[10px] text-emerald-400 pr-1">{activeConv.assignedAgent?.name || 'الإيجنت'} بيكتب الرد بلهجة مصرية...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Smart Egyptian Action Chips */}
          <div className="px-6 py-2 border-t border-slate-800/80 bg-slate-900/40 flex items-center gap-2 overflow-x-auto text-[11px]">
            <span className="text-slate-500 text-[10px] flex-shrink-0">ردود سريعة:</span>
            {[
              'السعر والشحن مجاني للقطعتين 🚚',
              'بيانات إنستاباي للدفع الفوري 💳',
              'تأكيد حجز مقاس L مع المندوب 📦',
              'جدول المقاسات والألوان المتاحة 👔'
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => setReplyText(chip)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700 flex-shrink-0 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Reply Form */}
          <div className="p-4 border-t border-slate-800 bg-slate-900/60">
            <form onSubmit={handleSendManualReply} className="flex gap-2">
              <input
                type="text"
                placeholder="اكتب ردك اليدوي هنا كخدمة عملاء..."
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-emerald-600/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>إرسال</span>
              </button>
            </form>
          </div>
        </div>

        {/* COLUMN 3: Customer Details & Live Order Builder */}
        <div className="w-80 border-r border-slate-800 bg-slate-900/30 flex flex-col p-4 overflow-y-auto space-y-4 flex-shrink-0">
          
          {/* Active Assigned Agent Card */}
          <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-3.5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">الإيجنت المسؤول حالياً</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <div className="flex items-center gap-3">
              <img 
                src={activeConv.assignedAgent?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'} 
                alt="Agent" 
                className="w-10 h-10 rounded-full object-cover border border-emerald-500/30"
              />
              <div>
                <h4 className="text-xs font-bold text-white">{activeConv.assignedAgent?.name || 'سارة طارق'}</h4>
                <p className="text-[10px] text-slate-400">{activeConv.assignedAgent?.role || 'مبيعات واتساب VIP'}</p>
                <span className="text-[9px] text-amber-400">★ {activeConv.assignedAgent?.rating || '4.95'} / 5.0 تقييم العملاء</span>
              </div>
            </div>
          </div>

          {/* Customer CRM Summary */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              بيانات العميل (CRM)
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">الاسم:</span>
                <span className="text-white font-medium">{activeConv.customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">الهاتف:</span>
                <span className="text-white font-mono">{activeConv.customer.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">المنصة:</span>
                <span className="text-emerald-400 font-medium">{activeConv.channel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">حالة العميل:</span>
                <span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded text-[10px] border border-emerald-800">عميل نشط ومهتم</span>
              </div>
            </div>
          </div>

          {/* Live Order Confirmation Card */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/30 rounded-xl p-3.5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                مسودة الأوردر المكتشف
              </h4>
              <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                {activeConv.order?.status || 'جاهز للاعتماد'}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60 space-y-1">
                <p className="text-slate-200 font-bold">{activeConv.order?.item || 'جاكيت جلد طبيعي'}</p>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>المقاس: {activeConv.order?.size || 'L'}</span>
                  <span className="text-emerald-400 font-bold text-xs">{activeConv.order?.price || '1,850 ج.م'}</span>
                </div>
              </div>

              <div className="space-y-1 pt-1 text-[11px] border-t border-slate-800 text-slate-400">
                <div className="flex justify-between">
                  <span>الشحن:</span>
                  <span className="text-emerald-400 font-bold">مجاني (عرض 🚚)</span>
                </div>
                <div className="flex justify-between">
                  <span>طريقة الدفع:</span>
                  <span className="text-slate-300">{activeConv.order?.payment || 'إنستاباي / كاش'}</span>
                </div>
              </div>
            </div>

            {orderConfirmed ? (
              <div className="bg-emerald-950 border border-emerald-500/40 p-2.5 rounded-lg text-center space-y-1">
                <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" />
                <p className="text-xs font-bold text-white">تم اعتماد الأوردر بنجاح! 🎉</p>
                <p className="text-[10px] text-emerald-300">تم إنشاء بوليصة الشحن وإرسالها للعميل</p>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setOrderConfirmed(true)}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-900/40"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>اعتماد الطلب وإصدار البوليصة</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
