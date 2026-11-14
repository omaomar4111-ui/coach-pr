'use client';

import { useState, useEffect } from 'react';
import { Download, Smartphone, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // 1. Detect if running standalone (already installed)
    const isStandaloneMode = 
      window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone === true;
    
    setIsStandalone(isStandaloneMode);

    // 2. Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // 3. Listen for Android/Chrome beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (!isStandaloneMode) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // If iOS and not standalone, show prompt
    if (isIosDevice && !isStandaloneMode) {
      const dismissed = localStorage.getItem('coachprb_pwa_ios_dismissed');
      if (!dismissed) {
        setShowPrompt(true);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    } else if (isIos) {
      alert("لتثبيت CoachPRB على آيفون:\n1. اضغط على زر المشاركة (Share) أسفل المتصفح\n2. اختر 'إضافة إلى الصفحة الرئيسية' (Add to Home Screen) 📲");
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    if (isIos) {
      localStorage.setItem('coachprb_pwa_ios_dismissed', 'true');
    }
  };

  if (isStandalone || !showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-[#140C24]/95 backdrop-blur-md border border-[#7C3AED]/50 p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-3 text-white transition-all animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-[#7C3AED]/20 border border-[#7C3AED]/40 rounded-xl text-[#A78BFA]">
          <Smartphone className="w-5 h-5 text-[#A78BFA]" />
        </div>
        <div>
          <div className="text-xs font-bold font-heading">تطبيق CoachPRB السريع</div>
          <p className="text-[11px] text-slate-300">تثبيت المنصة كتطبيق مباشر بدون متصفح</p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleInstallClick}
          className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition shadow-md shadow-purple-900/50 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>تثبيت</span>
        </button>

        <button
          onClick={handleDismiss}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition"
          aria-label="إغلاق"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
