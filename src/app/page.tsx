'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { 
  Sparkles, 
  ArrowLeft, 
  Dumbbell, 
  Video, 
  Zap, 
  Sliders
} from 'lucide-react';
import { Logo } from '@/components/Logo';

export default function CinemaLandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Tactile Director Pills State
  const [activeCamera, setActiveCamera] = useState<string>('orbit');
  const [activeLens, setActiveLens] = useState<string>('35mm');
  const [activeLighting, setActiveLighting] = useState<string>('neon');

  // GSAP Staggered Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stagger-fade', {
        y: 25,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
      });

      gsap.to('.cyber-glow-pulse', {
        boxShadow: '0 0 25px rgba(139, 92, 246, 0.45)',
        repeat: -1,
        yoyo: true,
        duration: 2.2,
        ease: 'sine.inOut'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Tactile Pill Click with GSAP Bounce
  const handlePillClick = (e: React.MouseEvent<HTMLButtonElement>, callback: () => void) => {
    gsap.fromTo(e.currentTarget, 
      { scale: 0.94 }, 
      { scale: 1, duration: 0.35, ease: 'back.out(2)' }
    );
    callback();
  };

  return (
    <div ref={heroRef} className="min-h-screen bg-space-void text-white selection:bg-purple-600 font-sans" dir="rtl">
      {/* Laser Navbar */}
      <nav className="border-b border-purple-500/20 bg-[#07050d]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo size="md" />

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-300">
            <Link href="/dashboard" className="hover:text-purple-300 transition">لوحة الكوتش</Link>
            <Link href="/dashboard/builder" className="hover:text-purple-300 transition">محرر التمارين</Link>
            <Link href="/dashboard/formcheck" className="hover:text-purple-300 transition">مختبر التكنيك</Link>
            <Link href="/app" className="hover:text-emerald-400 transition flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              تطبيق المتدرب (/app)
            </Link>
          </div>

          {/* CTA Action */}
          <div className="flex items-center gap-3">
            <Link 
              href="/dashboard" 
              className="btn-cyber-glow px-5 py-2.5 text-xs font-bold flex items-center gap-1.5"
            >
              <span>دخول المنصة</span>
              <ArrowLeft size={14} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="stagger-fade inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/35 text-purple-300 text-xs font-bold mb-6 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
            <Sparkles size={14} className="text-purple-400" />
            CoachPRB — سجّل رقمك. غيّر جسمك.
          </div>
          
          {/* Hero Headline */}
          <h1 className="stagger-fade text-4xl sm:text-6xl md:text-7xl font-black leading-tight mb-6 tracking-tight">
            سجّل رقمك القياسي. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-emerald-400">
              واصنع جسماً يفرض هيبته.
            </span>
          </h1>
          
          <p className="stagger-fade text-sm sm:text-base text-slate-300 mb-10 max-w-xl mx-auto">
            منصة التدريب الاحترافية للمدربين والرياضيين.
          </p>

          {/* CTA Buttons */}
          <div className="stagger-fade flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link 
              href="/dashboard" 
              className="w-full sm:w-auto btn-cyber-glow px-8 py-3.5 text-sm font-black flex items-center justify-center gap-2"
            >
              دخول لوحة الكوتش <ArrowLeft size={16} />
            </Link>
            <Link 
              href="/app" 
              className="w-full sm:w-auto glass-surface glass-surface-hover text-white px-8 py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2"
            >
              📱 تطبيق المتدرب
            </Link>
          </div>

          {/* Interactive Director HUD Controls Panel */}
          <div className="stagger-fade glass-surface p-5 sm:p-6 rounded-3xl max-w-3xl mx-auto text-right cyber-glow-pulse mb-14">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Sliders size={16} className="text-purple-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  لوحة المخرج (Director HUD)
                </h3>
              </div>
              <span className="text-[10px] hud-badge-green px-2 py-0.5 rounded-full font-mono font-bold">
                HUD ACTIVE
              </span>
            </div>

            {/* Tactile Pills Row */}
            <div className="space-y-3">
              {/* Camera Angle */}
              <div>
                <span className="text-[11px] text-slate-400 block mb-1.5 font-bold">الكاميرا:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'orbit', label: '🎥 Orbit 360' },
                    { id: 'dolly', label: '🎬 Dolly In' },
                    { id: 'fpv', label: '⚡ FPV Drone' },
                    { id: 'bullet', label: '⏱️ Bullet Time' },
                  ].map(c => (
                    <button
                      key={c.id}
                      onClick={(e) => handlePillClick(e, () => setActiveCamera(c.id))}
                      className={`director-pill ${activeCamera === c.id ? 'active' : ''}`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lens & Optics */}
              <div>
                <span className="text-[11px] text-slate-400 block mb-1.5 font-bold">العدسة:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: '35mm', label: '🔍 35mm Master' },
                    { id: '85mm', label: '🎯 85mm Portrait' },
                    { id: 'macro', label: '🔬 Macro' },
                  ].map(l => (
                    <button
                      key={l.id}
                      onClick={(e) => handlePillClick(e, () => setActiveLens(l.id))}
                      className={`director-pill ${activeLens === l.id ? 'active' : ''}`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lighting Palette */}
              <div>
                <span className="text-[11px] text-slate-400 block mb-1.5 font-bold">الإضاءة:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'neon', label: '💡 Cyberpunk Neon' },
                    { id: 'dramatic', label: '🌓 Chiaroscuro' },
                    { id: 'gold', label: '✨ Golden Hour' },
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={(e) => handlePillClick(e, () => setActiveLighting(m.id))}
                      className={`director-pill ${activeLighting === m.id ? 'active' : ''}`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated HUD Output Viewport */}
            <div className="mt-4 p-3 rounded-2xl bg-[#090614] border border-purple-500/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
                <span className="text-slate-300 font-mono text-[11px]">
                  Barbell Deadlift Heavy Set (RIR 1)
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono">
                <span className="hud-badge-green px-2 py-0.5 rounded font-bold">CAM: {activeCamera.toUpperCase()}</span>
                <span className="hud-badge-magenta px-2 py-0.5 rounded font-bold">LENS: {activeLens}</span>
                <span className="hud-badge-amber px-2 py-0.5 rounded font-bold">LIGHT: {activeLighting.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Bento Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6">
          {/* Card 1: Workout Builder */}
          <div className="glass-surface glass-surface-hover p-6 rounded-3xl group">
            <div className="w-11 h-11 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition">
              <Dumbbell className="w-5 h-5" />
            </div>
            <span className="hud-badge-magenta text-[10px] px-2 py-0.5 rounded font-mono font-bold mb-2 inline-block">
              BUILDER PRO
            </span>
            <h3 className="text-base font-black text-white">محرر التمارين واستيراد Excel</h3>
          </div>

          {/* Card 2: Form Check AI Lab */}
          <div className="glass-surface glass-surface-hover p-6 rounded-3xl group">
            <div className="w-11 h-11 rounded-2xl bg-fuchsia-600/20 border border-fuchsia-500/40 flex items-center justify-center text-fuchsia-400 mb-4 group-hover:scale-110 transition">
              <Video className="w-5 h-5" />
            </div>
            <span className="hud-badge-amber text-[10px] px-2 py-0.5 rounded font-mono font-bold mb-2 inline-block">
              VOICE & FORM LAB
            </span>
            <h3 className="text-base font-black text-white">مختبر تقييم التكنيك والملاحظات الصوتية</h3>
          </div>

          {/* Card 3: Offline Gym Mode */}
          <div className="glass-surface glass-surface-hover p-6 rounded-3xl group">
            <div className="w-11 h-11 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition">
              <Zap className="w-5 h-5" />
            </div>
            <span className="hud-badge-green text-[10px] px-2 py-0.5 rounded font-mono font-bold mb-2 inline-block">
              ZERO SIGNAL PWA
            </span>
            <h3 className="text-base font-black text-white">وضع صالة الجيم بدون إنترنت (Offline)</h3>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 bg-[#07050d]/90 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size="sm" />

          <div className="flex gap-6 font-semibold">
            <Link href="/dashboard" className="hover:text-purple-300 transition">لوحة الكوتش</Link>
            <Link href="/dashboard/builder" className="hover:text-purple-300 transition">محرر التمارين</Link>
            <Link href="/dashboard/formcheck" className="hover:text-purple-300 transition">مختبر التكنيك</Link>
            <Link href="/app" className="hover:text-emerald-400 transition">وضع الصالة (/app)</Link>
          </div>

          <div className="text-[11px] text-slate-500">
            © 2026 CoachPRB. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </div>
  );
}
