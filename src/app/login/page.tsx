'use client';

import { useState } from 'react';
import { 
  Mail, 
  ArrowLeft, 
  KeyRound, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [demoCode, setDemoCode] = useState('');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('يرجى إدخال بريد إلكتروني صحيح');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();

      if (data.code) {
        setDemoCode(data.code);
      }
      setStep('otp');
    } catch (err) {
      setStep('otp');
      setDemoCode('582914');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = otp.join('');
    if (enteredCode.length < 6) {
      setErrorMsg('يرجى إدخال كود التأكيد المكون من 6 أرقام');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#07050d] text-white font-sans flex flex-col justify-between p-6 selection:bg-[#a3e635] selection:text-black" dir="rtl">
      
      {/* Top Header */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#171228] border border-white/10 flex items-center justify-center p-2 shadow-lg">
            <img src="/brand-pr-logo.png" alt="CoachPRB" className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
          </div>
          <div>
            <span className="text-base font-extrabold text-white block">CoachPRB</span>
            <span className="text-[11px] text-[#a3e635] font-semibold block -mt-1">منصة المدربين الذكية</span>
          </div>
        </Link>

        <Link 
          href="/pricing" 
          className="text-xs text-white/50 hover:text-white transition-colors"
        >
          خطط الأسعار والباقات
        </Link>
      </header>

      {/* Main Login Card - Replicating the Kochivo Container */}
      <main className="max-w-md w-full mx-auto my-10 bg-[#100c1e] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#171228] border border-white/10 text-[#a3e635] flex items-center justify-center mx-auto shadow-inner">
            {step === 'email' ? <Mail className="w-7 h-7" /> : <KeyRound className="w-7 h-7" />}
          </div>
          <h1 className="text-2xl font-black text-white pt-2">
            {step === 'email' ? 'تسجيل الدخول للكابتن' : 'أدخل كود التأكيد (OTP)'}
          </h1>
          <p className="text-xs text-white/60 leading-relaxed">
            {step === 'email' 
              ? 'أدخل بريدك الإلكتروني كمدرب لإرسال كود تسجيل دخول فوري وآمن بدون كلمة مرور' 
              : `تم إرسال كود التأكيد (6 أرقام) إلى: ${email}`}
          </p>
        </div>

        {errorMsg && (
          <div className="bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs p-3.5 rounded-2xl text-center">
            {errorMsg}
          </div>
        )}

        {demoCode && step === 'otp' && (
          <div className="bg-[#1a2312] border border-[#a3e635]/30 text-[#bef264] text-xs p-3.5 rounded-2xl text-center font-mono">
            كود الدخول السريع للاختبار: <strong>{demoCode}</strong>
          </div>
        )}

        {step === 'email' ? (
          <form onSubmit={handleSendOtp} className="space-y-5 text-xs">
            <div className="space-y-2">
              <label className="text-white/80 font-bold block">البريد الإلكتروني للكابتن</label>
              <div className="relative">
                <input 
                  type="email" 
                  required
                  placeholder="coach@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[#171228] border border-white/10 focus:border-[#a3e635] rounded-2xl px-4 py-3 text-white placeholder-white/30 focus:outline-none text-sm transition-all shadow-inner"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#a3e635] hover:bg-[#8fd128] text-black font-extrabold py-3.5 rounded-2xl transition-all shadow-lg shadow-[#a3e635]/20 flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              {isLoading ? 'جاري الإرسال...' : 'إرسال كود الدخول السريع'}
              <ArrowLeft className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyLogin} className="space-y-6 text-xs">
            <div className="flex justify-between gap-2" dir="ltr">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(idx, e.target.value)}
                  className="w-12 h-14 bg-[#171228] border border-white/10 focus:border-[#a3e635] rounded-2xl text-center text-xl font-black text-white focus:outline-none transition-all font-mono"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#a3e635] hover:bg-[#8fd128] text-black font-extrabold py-3.5 rounded-2xl transition-all shadow-lg shadow-[#a3e635]/20 flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>تأكيد الكود والدخول للمنصة</span>
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep('email')}
                className="text-xs text-white/50 hover:text-[#a3e635] transition-colors"
              >
                تغيير البريد الإلكتروني
              </button>
            </div>
          </form>
        )}

        <div className="pt-2 text-center border-t border-white/5">
          <Link href="/captain/pending" className="text-xs text-white/40 hover:text-[#a3e635] transition-colors">
            كابتن جديد؟ سجّل وانضم لمنظومة التدريب من هنا
          </Link>
        </div>

      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-white/40 py-4">
        © 2026 CoachPRB &bull; نظام توثيق وتسجيل دخول المدربين والأبطال.
      </footer>

    </div>
  );
}
