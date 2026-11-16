"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

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
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 rounded-2xl bg-[#1a1624] border border-purple-500/40 p-4 shadow-2xl shadow-purple-900/50">
      <button
        onClick={() => setShow(false)}
        className="absolute top-2 left-2 text-gray-400 hover:text-white"
        aria-label="إغلاق"
      >
        <X className="w-4 h-4" />
      </button>
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-purple-500/20">
          <Download className="w-5 h-5 text-purple-400" />
        </div>
        <div className="flex-1">
          <p className="text-white text-sm font-semibold">ثبّت PR Agent</p>
          <p className="text-gray-400 text-xs">استخدم المنصة كتطبيق مباشر بدون متصفح</p>
        </div>
        <button
          onClick={handleInstall}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-orange-500 text-white text-sm font-semibold hover:scale-105 transition-all"
        >
          تثبيت
        </button>
      </div>
    </div>
  );
}
