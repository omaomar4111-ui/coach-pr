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
  ArrowUpRight,
  Truck,
  MapPin,
  Phone,
  CreditCard,
  FileCheck,
  Upload,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default function InboxPage() {
  const [messages, setMessages] = useState<any[]>([
    { id: '1', sender: 'customer', text: 'مساء الخير، الهودي الأوفرسايز الأسود متوفر مقاس L؟', time: '17:01' },
    { id: '2', sender: 'bot', text: 'مساء النور يا فندم! نعم متوفر مقاس L قطن ميلتون 380 جرام تقيل، وعليه خصم خاص بـ 650ج بدلاً من 850ج ومعاك معاينة مجانية عند الاستلام 🚚 تحب نحجز لحضرتك؟', time: '17:02' },
    { id: '3', sender: 'customer', text: 'تمام ابعتلي مقاس L في المعادي شارع 9 عمارة 14 الدور التاني ورقمي 01012345678 والدفع عند الاستلام', time: '17:04' },
    { id: '4', sender: 'bot', text: 'يا هلا بيك يا فندم! تم تسجيل بيانات الشحن بنجاح في المعادي، ورقمك المعتمد 01012345678. جاري تجهيز بوليصة الشحن مع مندوب بوسطة فوراً ✨', time: '17:05' },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [waybill, setWaybill] = useState('');
  const [activeModel, setActiveModel] = useState<'4-argon' | 'fast-flash'>('4-argon');

  // 4 Argon Extracted State
  const [extractedData, setExtractedData] = useState({
    customerName: 'أحمد محمود (عميل محادثة)',
    phone: '01012345678',
    governorate: 'القاهرة',
    cityArea: 'المعادي',
    detailedAddress: 'شارع 9، عمارة 14، الدور التاني',
    itemName: 'هودي أوفرسايز قطن ميلتون (Black)',
    size: 'L',
    price: 650,
    paymentMethod: 'COD',
    isReady: true
  });

  const [verifyingPayment, setVerifyingPayment] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    const text = inputVal.trim();
    if (!text) return;

    const time = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    
    setMessages(prev => [...prev, { id: String(Date.now()), sender: 'customer', text, time }]);
    setInputVal('');
    setIsTyping(true);

    try {
      // 1. Call Backend Chat with 4 Argon Support
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          modelPreference: activeModel
        })
      });
      const data = await res.json();

      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: String(Date.now() + 1),
        sender: 'bot',
        text: data.reply || 'تم استلام طلبك وجاري تأكيده مع إيجنت المبيعات فوراً.',
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      }]);

      // 2. Automatically Run 4 Argon Entity Extraction if address/phone is mentioned
      if (text.includes('01') || text.includes('شارع') || text.includes('مقاس') || text.includes('ابعت')) {
        const extractRes = await fetch('/api/orders/extract', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chatTranscript: text })
        });
        const ext = await extractRes.json();
        if (ext.success && ext.data) {
          setExtractedData(prev => ({
            ...prev,
            phone: ext.data.phone || prev.phone,
            governorate: ext.data.governorate || prev.governorate,
            cityArea: ext.data.cityArea || prev.cityArea,
            detailedAddress: ext.data.detailedAddress || prev.detailedAddress,
            size: ext.data.items?.[0]?.size || prev.size,
            itemName: ext.data.items?.[0]?.name || prev.itemName,
            price: ext.data.totalAmount || prev.price,
            paymentMethod: ext.data.paymentMethod || prev.paymentMethod,
            isReady: ext.data.isReadyForDispatch
          }));
        }
      }

    } catch (e) {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: String(Date.now() + 1),
        sender: 'bot',
        text: 'أهلاً بك يا فندم! تم استلام رسالتك وجاري المتابعة معك لحظياً.',
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  };

  const handleSimulatePaymentScan = async () => {
    setVerifyingPayment(true);
    try {
      const res = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: 'fake_base64_screenshot',
          expectedAmount: extractedData.price
        })
      });
      const data = await res.json();
      setVerifyingPayment(false);
      if (data.success && data.verification.isValid) {
        setPaymentVerified(true);
        setExtractedData(prev => ({ ...prev, paymentMethod: 'INSTAPAY' }));
        setMessages(prev => [...prev, {
          id: String(Date.now() + 2),
          sender: 'bot',
          text: `🎉 تم فحص سكرين التحويل عبر 4 Argon بنجاح! تم استلام ${extractedData.price}ج برقم مرجعي معتمد (${data.verification.transactionReference})، والأوردر الآن مدفوع ومؤكد للشحن فوراً 🚀`,
          time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
        }]);
      }
    } catch (e) {
      setVerifyingPayment(false);
    }
  };

  const handleIssueWaybill = () => {
    const generatedWaybill = `BST-EG-${Math.floor(100000 + Math.random() * 900000)}`;
    setWaybill(generatedWaybill);
    setOrderConfirmed(true);

    // Notify Customer in Chat
    setMessages(prev => [...prev, {
      id: String(Date.now() + 3),
      sender: 'bot',
      text: `📦 تم إصدار بوليصة الشحن الرسمية بنجاح عبر بوسطة إكسبريس!\nرقم التتبع: ${generatedWaybill}\nالمندوب هيتواصل معاك خلال 24 ساعة، ومعاك حق المعاينة المجانية قبل الدفع 🚚`,
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white" dir="rtl">
      
      {/* Column 1: Channels & Active Chats */}
      <div className="w-72 border-l border-slate-800 bg-slate-900/40 flex flex-col hidden md:flex flex-shrink-0">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-emerald-500/30 flex items-center justify-center p-1 shadow-md shadow-emerald-500/10">
              <img src="/pr-logo.png" alt="PR Agent" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-sm font-black text-white">PR Agent &bull; الإنبوكس الموحد</h2>
              <span className="text-[10px] text-emerald-400 font-bold block">65 إيجنت نشط</span>
            </div>
          </div>
          <Link href="/settings" className="text-slate-400 hover:text-emerald-400 text-xs transition-colors" title="إعدادات الربط">
            ⚙️
          </Link>
        </div>

        <div className="p-2 border-b border-slate-800/60 bg-slate-900/60">
          <div className="flex items-center justify-between text-[11px] px-2 py-1 bg-slate-950 rounded-lg border border-slate-800">
            <span className="text-slate-400">محرك الذكاء الاصطناعي:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              4 Argon Active
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1 text-xs">
          <div className="p-3 rounded-xl bg-slate-800/80 border border-emerald-500/30 text-white space-y-1 cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                أحمد محمود (واتساب)
              </span>
              <span className="text-[10px] text-slate-400">17:05</span>
            </div>
            <p className="text-[11px] text-slate-400 truncate">تمام ابعتلي مقاس L في المعادي شارع 9...</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[9px] px-1.5 py-0.5 rounded">
                جاهز للبوليصة
              </span>
              <span className="bg-slate-900 text-slate-400 text-[9px] px-1.5 py-0.5 rounded">
                WhatsApp Cloud
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl hover:bg-slate-900/50 text-slate-400 space-y-1 cursor-pointer opacity-70">
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-200">مريم كمال (إنستجرام)</span>
              <span className="text-[10px]">16:45</span>
            </div>
            <p className="text-[11px] truncate">هو الجاكيت الجلد عليه شحن مجاني؟</p>
          </div>

          <div className="p-3 rounded-xl hover:bg-slate-900/50 text-slate-400 space-y-1 cursor-pointer opacity-70">
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-200">كريم سامي (تليجرام)</span>
              <span className="text-[10px]">16:20</span>
            </div>
            <p className="text-[11px] truncate">بعتلك سكرين التحويل على إنستاباي</p>
          </div>
        </div>
      </div>

      {/* Column 2: Live Chat Thread */}
      <div className="flex-1 flex flex-col bg-slate-950">
        
        {/* Chat Header */}
        <div className="h-16 border-b border-slate-800 bg-slate-900/60 backdrop-blur px-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center font-bold text-emerald-400 text-sm">
              أح
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">أحمد محمود</h3>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                  متصل الآن (WhatsApp)
                </span>
              </div>
              <p className="text-[11px] text-slate-400">المودريتور المسؤول: <strong className="text-slate-200">سارة طارق (Sales Lead)</strong></p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveModel(prev => prev === '4-argon' ? 'fast-flash' : '4-argon')}
              className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                activeModel === '4-argon'
                  ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/50 shadow-lg shadow-emerald-950'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>الموديل: {activeModel === '4-argon' ? '4 Argon (Reasoning)' : 'Fast Flash'}</span>
            </button>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map(msg => (
            <div 
              key={msg.id} 
              className={`flex flex-col ${msg.sender === 'customer' ? 'items-start' : 'items-end'}`}
            >
              <div 
                className={`max-w-[75%] rounded-2xl p-4 text-xs leading-relaxed whitespace-pre-line shadow-md ${
                  msg.sender === 'customer' 
                    ? 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tr-none' 
                    : 'bg-emerald-600 text-white rounded-tl-none font-medium'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-slate-500 mt-1 px-1">
                {msg.time}
              </span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>سارة طارق (4 Argon) بتكتب الرد فوراً...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center gap-3 flex-shrink-0">
          <input
            type="text"
            placeholder="اكتب ردك أو سؤال العميل واضغط Enter (يدعم 4 Argon)..."
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <button
            type="button"
            onClick={handleSend}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-emerald-600/30 cursor-pointer active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>إرسال</span>
          </button>
        </div>

      </div>

      {/* Column 3: 4 Argon Live Dispatch & Payment Drawer */}
      <div className="w-84 border-r border-slate-800 bg-slate-900/40 flex flex-col p-4 overflow-y-auto space-y-4 flex-shrink-0">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-black text-white">كارت الأوردر الذكي (4 Argon)</h3>
          </div>
          <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full font-bold">
            مستخرج آلياً
          </span>
        </div>

        {/* Product Details */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">المنتج:</span>
            <span className="text-white font-bold">{extractedData.itemName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">المقاس:</span>
            <span className="text-emerald-400 font-bold">{extractedData.size} (أوفرسايز)</span>
          </div>
          <div className="flex items-center justify-between border-t border-slate-900 pt-1.5">
            <span className="text-slate-400">إجمالي المبلغ:</span>
            <span className="text-emerald-400 font-extrabold text-sm">{extractedData.price} ج.م</span>
          </div>
        </div>

        {/* Extracted Shipping Data */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2.5 text-xs">
          <div className="flex items-center gap-2 text-slate-300 font-bold border-b border-slate-900 pb-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>بيانات الشحن والعنوان</span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
              <Phone className="w-3 h-3 text-slate-500" />
              <span>الموبايل: <strong className="text-slate-200">{extractedData.phone}</strong></span>
            </div>
            <div className="flex items-start gap-1.5 text-slate-400 text-[11px]">
              <MapPin className="w-3 h-3 text-slate-500 mt-0.5" />
              <span>العنوان: <strong className="text-slate-200">{extractedData.detailedAddress} - {extractedData.cityArea}</strong></span>
            </div>
          </div>
        </div>

        {/* Payment Verification Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2 text-xs">
          <div className="flex items-center justify-between border-b border-slate-900 pb-1.5">
            <span className="text-slate-300 font-bold flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-teal-400" />
              طريقة الدفع
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
              paymentVerified 
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                : 'bg-amber-950 text-amber-400 border border-amber-800'
            }`}>
              {paymentVerified ? 'تم الدفع (PAID)' : 'الدفع عند الاستلام (COD)'}
            </span>
          </div>

          {!paymentVerified ? (
            <button
              onClick={handleSimulatePaymentScan}
              disabled={verifyingPayment}
              className="w-full bg-slate-900 hover:bg-slate-800 text-teal-400 border border-teal-500/30 rounded-lg py-2 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Upload className="w-3 h-3" />
              <span>{verifyingPayment ? 'جاري فحص الإيصال عبر 4 Argon...' : 'فحص سكرين إنستاباي / كاش'}</span>
            </button>
          ) : (
            <div className="text-[10px] text-emerald-400 bg-emerald-950/40 p-1.5 rounded border border-emerald-900 text-center">
              ✓ تم مطابقة سكرين إنستاباي بالكامل
            </div>
          )}
        </div>

        {/* One-Click Dispatch Action */}
        <div className="pt-2">
          {orderConfirmed ? (
            <div className="bg-emerald-950 border border-emerald-500/50 p-4 rounded-xl text-center space-y-2 shadow-xl shadow-emerald-950">
              <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto" />
              <p className="text-xs font-bold text-white">تم إصدار بوليصة الشحن بنجاح!</p>
              <div className="bg-slate-950 p-2 rounded-lg border border-emerald-900 font-mono text-emerald-300 font-bold text-xs">
                {waybill}
              </div>
              <p className="text-[10px] text-slate-400">Carrier: Bosta Express (معاينة مجانية)</p>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleIssueWaybill}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer active:scale-95"
            >
              <Truck className="w-4 h-4" />
              <span>إصدار بوليصة بوسطة بضغطة زر 🚚</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
