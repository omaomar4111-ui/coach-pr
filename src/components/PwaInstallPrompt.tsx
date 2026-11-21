"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setShow(false);
    setDeferredPrompt(null);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 rounded-2xl bg-[#0b0816]/95 backdrop-blur-xl border border-purple-500/30 p-3.5 shadow-2xl shadow-purple-950/80 font-sans" dir="rtl">
      <button
        onClick={() => setShow(false)}
        className="absolute top-2 left-2 text-slate-500 hover:text-white p-1"
        aria-label="إغلاق"
      >
        <X className="w-3.5 h-3.5" />
      </button>
      <div className="flex items-center gap-3">
        {/* Official Pure White PR Logo */}
        <div className="w-10 h-10 rounded-xl bg-purple-950/50 border border-purple-500/40 flex items-center justify-center p-1 shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.4)]">
          <Image
            src="/brand-pr-logo.png"
            alt="CoachPR Logo"
            width={28}
            height={28}
            className="object-contain filter drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs font-black truncate">CoachPR</p>
        </div>
        <button
          onClick={handleInstall}
          className="px-4 py-2 rounded-xl btn-cyber-glow text-white text-xs font-bold shrink-0"
        >
          تثبيت
        </button>
      </div>
    </div>
  );
}
