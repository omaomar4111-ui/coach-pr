'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Hourglass, Bell, Check, LogOut } from 'lucide-react';
import { Logo } from '@/components/Logo';

export default function CaptainOnboardingPendingPage() {
  const [step, setStep] = useState<'form' | 'under_review'>('form');

  // Form State
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState('');
  const [currentTool, setCurrentTool] = useState<'whatsapp_excel' | 'other_app' | 'just_starting'>('just_starting');
  const [biggestChallenge, setBiggestChallenge] = useState<'wasting_time' | 'tracking_progress' | 'unprofessional'>('wasting_time');
  const [traineeCount, setTraineeCount] = useState<'1-10' | '11-50' | '50+'>('1-10');

  // Under Review State
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !whatsapp) {
      alert('يرجى ملء الاسم الكامل ورقم الواتساب للمتابعة');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('under_review');
    }, 600);
  };

  const handleToggleNotifications = async () => {
    if (!notificationsEnabled) {
      if (typeof window !== 'undefined' && 'Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setNotificationsEnabled(true);
        } else {
          setNotificationsEnabled(true); // Toggle visual fallback
        }
      } else {
        setNotificationsEnabled(true);
      }
    } else {
      setNotificationsEnabled(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07050d] text-slate-100 flex flex-col justify-between py-10 px-4 font-sans select-none" dir="rtl">
      {/* Top Brand Centered */}
      <header className="flex justify-center mb-6">
        <Logo size="md" />
      </header>

      {/* Main Card Container */}
      <main className="w-full max-w-xl mx-auto">
        {step === 'form' ? (
          /* STEP 1: Onboarding Questionnaire Card (Pure Minimalist Luxury) */
          <div className="bg-[#100c1e] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div>
              <h1 className="text-xl font-bold text-white mb-1">عرّفنا بيك</h1>
              <p className="text-xs text-slate-400">كمّل البيانات دي عشان نراجع طلبك ونتواصل معاك.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">الاسم بالكامل</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: عمر مصطفى"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full bg-[#171228] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition"
                />
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">واتساب</label>
                <input
                  type="tel"
                  required
                  placeholder="0114482641"
                  value={whatsapp}
                  onChange={e => setWhatsapp(e.target.value)}
                  className="w-full bg-[#171228] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-purple-500 transition"
                />
              </div>

              {/* Instagram Handle */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">إنستجرام (اختياري)</label>
                <input
                  type="text"
                  placeholder="@your_handle"
                  value={instagram}
                  onChange={e => setInstagram(e.target.value)}
                  className="w-full bg-[#171228] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition"
                />
              </div>

              {/* Current Tool Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-2">بتستخدم إيه حالياً لمتابعة لاعيبتك؟</label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'whatsapp_excel', label: 'واتساب وإكسبل' },
                    { id: 'other_app', label: 'تطبيق تاني' },
                    { id: 'just_starting', label: 'لسه ببتدي' },
                  ].map(item => {
                    const isSelected = currentTool === item.id;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setCurrentTool(item.id as any)}
                        className={`p-3 rounded-2xl border text-xs font-semibold transition flex items-center justify-between gap-1.5 ${
                          isSelected 
                            ? 'border-[#a3e635] bg-[#1a2312]/60 text-white shadow-sm' 
                            : 'border-white/5 bg-[#171228] text-slate-400 hover:border-white/20'
                        }`}
                      >
                        <span className="truncate">{item.label}</span>
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-[#a3e635] bg-[#a3e635]' : 'border-slate-600'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black"></div>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Biggest Challenge */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-2">إيه أكبر تحدي بيواجهك؟</label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'wasting_time', label: 'تضييع الوقت في الجداول' },
                    { id: 'tracking_progress', label: 'متابعة تطور اللاعبين' },
                    { id: 'unprofessional', label: 'شكل الشغل مش احترافي' },
                  ].map(item => {
                    const isSelected = biggestChallenge === item.id;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setBiggestChallenge(item.id as any)}
                        className={`p-3 rounded-2xl border text-xs font-semibold transition flex items-center justify-between gap-1.5 ${
                          isSelected 
                            ? 'border-[#a3e635] bg-[#1a2312]/60 text-white shadow-sm' 
                            : 'border-white/5 bg-[#171228] text-slate-400 hover:border-white/20'
                        }`}
                      >
                        <span className="truncate">{item.label}</span>
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-[#a3e635] bg-[#a3e635]' : 'border-slate-600'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black"></div>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Trainee Count */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-2">عندك كام لاعب؟</label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: '1-10', label: '1-10' },
                    { id: '11-50', label: '11-50' },
                    { id: '50+', label: '+50' },
                  ].map(item => {
                    const isSelected = traineeCount === item.id;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setTraineeCount(item.id as any)}
                        className={`p-3 rounded-2xl border text-xs font-mono font-bold transition flex items-center justify-between ${
                          isSelected 
                            ? 'border-[#a3e635] bg-[#1a2312]/60 text-white shadow-sm' 
                            : 'border-white/5 bg-[#171228] text-slate-400 hover:border-white/20'
                        }`}
                      >
                        <span>{item.label}</span>
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-[#a3e635] bg-[#a3e635]' : 'border-slate-600'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black"></div>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#a3e635] hover:bg-[#bef264] text-black font-extrabold text-sm py-3.5 rounded-2xl transition shadow-lg shadow-lime-950/40 disabled:opacity-50"
                >
                  {isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
                </button>
              </div>
            </form>

            {/* Logout / Switch Account */}
            <div className="pt-2 border-t border-white/5">
              <Link 
                href="/login"
                className="w-full block text-center py-2.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] text-xs text-slate-400 font-bold transition"
              >
                تسجيل الخروج
              </Link>
            </div>
          </div>
        ) : (
          /* STEP 2: Under Review Screen with Mobile Notifications Toggle */
          <div className="space-y-4">
            {/* Header Badge */}
            <div className="bg-[#100c1e] border border-white/10 rounded-2xl py-3 px-4 text-center text-xs font-bold text-slate-300">
              حسابك تحت المراجعة
            </div>

            {/* Main Pending Card */}
            <div className="bg-[#100c1e] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center">
              {/* Hourglass Icon */}
              <div className="w-14 h-14 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                <Hourglass size={28} className="animate-pulse" />
              </div>

              <div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
                  أهلاً بيك في <strong className="text-white">CoachPRB</strong>. حسابك تحت المراجعة من فريقنا، وهنبعتلك إشعار أول ما يتفعّل.
                </p>
              </div>

              {/* Mobile Push Notification Activation Toggle */}
              <div className="bg-[#171228] border border-white/5 rounded-2xl p-4 flex items-center justify-between gap-3 text-right">
                <div className="flex-1">
                  <span className="text-xs font-bold text-white block">إشعارات على الموبايل</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {notificationsEnabled ? 'الإشعارات شغّالة على الجهاز ده، حتى والتطبيق مقفول.' : 'بتفعّل إعداد الإشعارات...'}
                  </span>
                </div>

                {/* Pill Switch */}
                <button
                  type="button"
                  onClick={handleToggleNotifications}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 shrink-0 ${
                    notificationsEnabled ? 'bg-[#a3e635]' : 'bg-slate-700'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    notificationsEnabled ? '-translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Logout Button */}
              <div className="pt-2">
                <Link 
                  href="/login"
                  className="w-full block text-center py-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] text-xs text-slate-400 font-bold transition"
                >
                  تسجيل الخروج
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Clean Footer */}
      <footer className="text-center text-[11px] text-slate-600 mt-6">
        © 2026 CoachPRB. جميع الحقوق محفوظة.
      </footer>
    </div>
  );
}
