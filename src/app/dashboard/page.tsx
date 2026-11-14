'use client';

import { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Check, 
  ArrowLeft, 
  Share2, 
  Layers, 
  ShieldCheck, 
  FileText, 
  Key, 
  MessageCircle, 
  Send, 
  CheckCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Database,
  Building2
} from 'lucide-react';
import Link from 'next/link';

export default function ClientOnboardingDashboard() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // 1. Business Brief State
  const [businessProfile, setBusinessProfile] = useState({
    brandName: 'أورا فاشون (Aura Fashion)',
    industry: 'الملابس والأزياء الفاخرة',
    targetAudience: 'الشباب والفتيات من سن 18 لـ 35 سنة في مصر',
    toneOfVoice: 'ودودة، تجارية حاسمة، لهجة قاهرية راقية بدون ابتذال',
    freeShippingThreshold: '1000',
    returnPolicy: 'معاينة مجانية عند الاستلام، واستبدال خلال 14 يوم بدون أي مصاريف إضافية',
    paymentMethods: ['INSTAPAY', 'VODAFONE_CASH', 'COD'],
    productsCatalogSummary: 'هوديز أوفرسايز (650ج)، جواكت جلد طبيعي (1850ج)، بناطيل شينو (620ج)، قمصان أوكسفورد قطن (450ج)'
  });

  // 2. Integrations & API Credentials State
  const [integrations, setIntegrations] = useState({
    whatsapp: {
      connected: false,
      phoneNumberId: '',
      wabaId: '',
      accessToken: '',
    },
    instagram: {
      connected: false,
      instagramAccountId: '',
      pageAccessToken: '',
    },
    facebook: {
      connected: false,
      pageId: '',
      pageAccessToken: '',
    },
    telegram: {
      connected: false,
      botToken: '',
    },
    bostaShipping: {
      connected: false,
      apiKey: '',
      businessId: '',
    }
  });

  const handleSaveBrief = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
      setActiveStep(2);
    }, 600);
  };

  const toggleConnect = (platform: keyof typeof integrations) => {
    setIntegrations(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        connected: !prev[platform].connected
      }
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white" dir="rtl">
      
      {/* Top Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50 h-16 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-emerald-500/30 flex items-center justify-center p-1.5 shadow-lg shadow-emerald-500/10">
            <img src="/pr-logo.png" alt="PR Agent" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-white">PR Agent &bull; بوابة إعدادات العميل</span>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
                Client Workspace
              </span>
            </div>
            <p className="text-[11px] text-slate-400">إدارة بريف البراند وربط الـ APIs مع منصات السوشيال والشحن</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link 
            href="/inbox" 
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-1.5"
          >
            <span>دخول صندوق الوارد (Inbox)</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto py-8 px-6 space-y-8">
        
        {/* Step Progress Tracker */}
        <div className="grid grid-cols-3 gap-4">
          <button 
            onClick={() => setActiveStep(1)}
            className={`p-4 rounded-2xl border text-right transition-all flex items-center gap-3 ${
              activeStep === 1 
                ? 'bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-500/10' 
                : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
              activeStep === 1 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}>
              1
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">بريف البراند والذكاء الاصطناعي</h4>
              <p className="text-[10px] text-slate-400">نبرة الصوت، المنتجات، وسياسة الشحن</p>
            </div>
          </button>

          <button 
            onClick={() => setActiveStep(2)}
            className={`p-4 rounded-2xl border text-right transition-all flex items-center gap-3 ${
              activeStep === 2 
                ? 'bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-500/10' 
                : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
              activeStep === 2 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}>
              2
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">ربط القنوات والـ APIs</h4>
              <p className="text-[10px] text-slate-400">WhatsApp, Instagram, Messenger, Telegram</p>
            </div>
          </button>

          <button 
            onClick={() => setActiveStep(3)}
            className={`p-4 rounded-2xl border text-right transition-all flex items-center gap-3 ${
              activeStep === 3 
                ? 'bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-500/10' 
                : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
              activeStep === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}>
              3
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">تخصيص أسطول الـ 65 إيجنت</h4>
              <p className="text-[10px] text-slate-400">توزيع أدوار المبيعات والدفع والشحن</p>
            </div>
          </button>
        </div>

        {/* STEP 1: Full Business & Brand Brief */}
        {activeStep === 1 && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  بريف البراند الشامل (Brand & Commerce Intelligence Brief)
                </h2>
                <p className="text-xs text-slate-400 mt-1">البيانات التي يعتمد عليها الـ Moderator الذكي لفهم متجرك والرد مثل أمهر بائع مصري في فريقك.</p>
              </div>
              <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs px-3 py-1 rounded-full font-bold">
                خطوة 1 من 3
              </span>
            </div>

            <form onSubmit={handleSaveBrief} className="grid md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <label className="font-bold text-slate-200">اسم البراند أو الشركة</label>
                <input 
                  type="text" 
                  value={businessProfile.brandName}
                  onChange={e => setBusinessProfile({ ...businessProfile, brandName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-200">المجال والصناعة (Industry)</label>
                <input 
                  type="text" 
                  value={businessProfile.industry}
                  onChange={e => setBusinessProfile({ ...businessProfile, industry: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="font-bold text-slate-200">نبرة الصوت واللهجة المطلوبة (Tone of Voice)</label>
                <input 
                  type="text" 
                  value={businessProfile.toneOfVoice}
                  onChange={e => setBusinessProfile({ ...businessProfile, toneOfVoice: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
                <span className="text-[10px] text-slate-500">مثال: لهجة مصرية تجارية ودودة وراقية، إقناع العميل بلطف، وتطبيق عروض الشحن.</span>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="font-bold text-slate-200">ملخص المنتجات والأسعار والمخزن (Product Catalog)</label>
                <textarea 
                  rows={3}
                  value={businessProfile.productsCatalogSummary}
                  onChange={e => setBusinessProfile({ ...businessProfile, productsCatalogSummary: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-200">حد الشحن المجاني التلقائي (بالجنيه)</label>
                <input 
                  type="text" 
                  value={businessProfile.freeShippingThreshold}
                  onChange={e => setBusinessProfile({ ...businessProfile, freeShippingThreshold: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-200">سياسة المعاينة والاسترجاع (Return Policy)</label>
                <input 
                  type="text" 
                  value={businessProfile.returnPolicy}
                  onChange={e => setBusinessProfile({ ...businessProfile, returnPolicy: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="md:col-span-2 pt-4 flex items-center justify-between border-t border-slate-800">
                {savedSuccess ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    تم حفظ وتدريب الذكاء الاصطناعي على بريف البراند بنجاح!
                  </span>
                ) : <div></div>}

                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2 cursor-pointer"
                >
                  <span>حفظ البريف والانتقال لربط الـ APIs</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: Channel Connectors & API Gateways */}
        {activeStep === 2 && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Key className="w-5 h-5 text-emerald-400" />
                  مركز ربط الـ APIs وقنوات التواصل (Official APIs Gateway)
                </h2>
                <p className="text-xs text-slate-400 mt-1">الربط الرسمي المباشر مع Meta و Telegram وشركات الشحن ليعمل الـ Moderator على حساباتك الحقيقية.</p>
              </div>
              <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs px-3 py-1 rounded-full font-bold">
                خطوة 2 من 3
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              
              {/* WhatsApp Card */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 font-bold">
                      WA
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">WhatsApp Business Cloud API</h4>
                      <span className="text-[10px] text-emerald-400">Meta Official API (أول 1000 محادثة مجاناً)</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleConnect('whatsapp')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      integrations.whatsapp.connected 
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    {integrations.whatsapp.connected ? 'متصل بنجاح ✓' : 'اتصال'}
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Phone Number ID</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 109827364521092"
                      value={integrations.whatsapp.phoneNumberId}
                      onChange={e => setIntegrations({ ...integrations, whatsapp: { ...integrations.whatsapp, phoneNumberId: e.target.value } })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Permanent Access Token</label>
                    <input 
                      type="password" 
                      placeholder="EAAG...."
                      value={integrations.whatsapp.accessToken}
                      onChange={e => setIntegrations({ ...integrations, whatsapp: { ...integrations.whatsapp, accessToken: e.target.value } })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500 font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Instagram Direct Card */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-950 border border-pink-800 flex items-center justify-center text-pink-400 font-bold">
                      IG
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Instagram Messaging API</h4>
                      <span className="text-[10px] text-pink-400">Meta Graph API (الخاص + الستوري)</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleConnect('instagram')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      integrations.instagram.connected 
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    {integrations.instagram.connected ? 'متصل بنجاح ✓' : 'اتصال'}
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Instagram Business Account ID</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 1784140029384729"
                      value={integrations.instagram.instagramAccountId}
                      onChange={e => setIntegrations({ ...integrations, instagram: { ...integrations.instagram, instagramAccountId: e.target.value } })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Page Access Token</label>
                    <input 
                      type="password" 
                      placeholder="EAAG...."
                      value={integrations.instagram.pageAccessToken}
                      onChange={e => setIntegrations({ ...integrations, instagram: { ...integrations.instagram, pageAccessToken: e.target.value } })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500 font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Telegram Bot Card */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-950 border border-sky-800 flex items-center justify-center text-sky-400 font-bold">
                      TG
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Telegram Bot API</h4>
                      <span className="text-[10px] text-sky-400">مجاني 100% بدون حدود من @BotFather</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleConnect('telegram')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      integrations.telegram.connected 
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    {integrations.telegram.connected ? 'متصل بنجاح ✓' : 'اتصال'}
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Bot HTTP API Token</label>
                    <input 
                      type="password" 
                      placeholder="718293847:AAH..."
                      value={integrations.telegram.botToken}
                      onChange={e => setIntegrations({ ...integrations, telegram: { ...integrations.telegram, botToken: e.target.value } })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500 font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Bosta Shipping API Card */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-950 border border-orange-800 flex items-center justify-center text-orange-400 font-bold">
                      BS
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Bosta Express Logistics API</h4>
                      <span className="text-[10px] text-orange-400">إصدار بوالص الشحن التلقائية بمصر</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleConnect('bostaShipping')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      integrations.bostaShipping.connected 
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    {integrations.bostaShipping.connected ? 'متصل بنجاح ✓' : 'اتصال'}
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Bosta API Key</label>
                    <input 
                      type="password" 
                      placeholder="Live_Api_Key_..."
                      value={integrations.bostaShipping.apiKey}
                      onChange={e => setIntegrations({ ...integrations, bostaShipping: { ...integrations.bostaShipping, apiKey: e.target.value } })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500 font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-800">
              <button
                type="button"
                onClick={() => setActiveStep(1)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ← العودة لبريف البراند
              </button>

              <button
                type="button"
                onClick={() => setActiveStep(3)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2 cursor-pointer"
              >
                <span>الانتقال لتوزيع أسطول الإيجنتس</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: 65 Agents Assignment */}
        {activeStep === 3 && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Bot className="w-5 h-5 text-emerald-400" />
                  أسطول الـ 65 إيجنت المخصص لحسابك
                </h2>
                <p className="text-xs text-slate-400 mt-1">تم تدريب وتوزيع الإيجنتس للرد على قنواتك بحسب تخصص كل قسم.</p>
              </div>
              <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs px-3 py-1 rounded-full font-bold">
                جاهز للتشغيل الحي ✓
              </span>
            </div>

            <div className="grid md:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                <span className="text-emerald-400 font-bold block">مبيعات سريعة (20 إيجنت)</span>
                <p className="text-slate-400 text-[11px]">الرد خلال 3 ثوانٍ على أسعار الهوديز والجواكت والشحن المجاني وإغلاق الأوردر.</p>
                <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded block text-center border border-slate-800">نشط على WhatsApp & IG</span>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                <span className="text-teal-400 font-bold block">كاشير ومدفوعات (15 إيجنت)</span>
                <p className="text-slate-400 text-[11px]">مراجعة سكرينات إنستاباي، فودافون كاش، وتأكيد الدفع في النظام.</p>
                <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded block text-center border border-slate-800">تأكيد فوري للمعاملات</span>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                <span className="text-cyan-400 font-bold block">شحن وبوالص (15 إيجنت)</span>
                <p className="text-slate-400 text-[11px]">توليد رقم بوليصة Bosta التلقائية ومتابعة التوصيل للعميل.</p>
                <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded block text-center border border-slate-800">ربط Bosta Express API</span>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                <span className="text-amber-400 font-bold block">استبدال ودعم (15 إيجنت)</span>
                <p className="text-slate-400 text-[11px]">معالجة المقاسات والاستبدال المجاني بأسلوب مصري راقٍ يمتص غضب العميل.</p>
                <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded block text-center border border-slate-800">حماية التقييم ورضا العميل</span>
              </div>
            </div>

            {/* Notification Center Automation Test */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Send className="w-4 h-4 text-emerald-400" />
                    نظام الإشعارات الآلي الفوري (Telegram & WhatsApp Notifications)
                  </h4>
                  <p className="text-[11px] text-slate-400">تنبيه صاحب المتجر أو العميل فور حدوث أي حركة (طلب جديد، استلام تحويل إنستاباي، خروج بوليصة شحن).</p>
                </div>
                <span className="bg-emerald-950 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-800">
                  Realtime Dispatcher
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sky-400">إشعارات تليجرام (Telegram Alerts)</span>
                    <span className="text-[10px] text-emerald-400 font-bold">مفعل تلقائياً ✓</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">يصل لجروب إدارة المتجر إشعار فوري: *تم إغلاق أوردر جديد بقيمة 1,850ج مع رقم بوليصة الشحن.*</p>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400">إشعارات واتساب (WhatsApp Customer Status)</span>
                    <span className="text-[10px] text-emerald-400 font-bold">مفعل تلقائياً ✓</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">يصل العميل على واتسابه رسالة آلية: *ألف مبروك! أوردرك خرج مع مندوب بوسطة ورقم تتبع شحنتك هو BST-EG-XXXX.*</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">المنظومة متصلة بالكامل بحسابك الآن! 🎉</h4>
                <p className="text-xs text-slate-300 mt-0.5">يمكنك الدخول مباشرة لصندوق الوارد ومتابعة الردود الحية للـ Moderator.</p>
              </div>
              <Link
                href="/inbox"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-600/30"
              >
                دخول صندوق الوارد المباشر
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
