"use client";

import React from "react";
import Link from "next/link";

export default function EnglishHomePage() {
  return (
    <div className="min-h-screen bg-[#07040D] text-white flex flex-col font-sans selection:bg-[#7C3AED] selection:text-white" dir="ltr">
      {/* Top Navigation */}
      <header className="px-8 py-5 flex items-center justify-between border-b border-white/[0.04] sticky top-0 bg-[#07040D]/90 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/pr-logo.png" alt="PR" className="h-8 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]" />
            <span className="font-heading font-black text-xl tracking-wider text-white">
              COACH<span className="text-[#A78BFA]">PR</span>
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs text-slate-300">
          <Link href="/dashboard" className="hover:text-white transition">Coach Dashboard</Link>
          <Link href="/dashboard/templates" className="hover:text-white transition">Bodybuilding Splits</Link>
          <Link href="/dashboard/elite" className="hover:text-white transition">Supplements</Link>
          <Link href="/app" className="hover:text-white transition">Athlete PWA</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/" className="text-xs px-3 py-1.5 rounded-xl border border-white/[0.08] text-slate-300 hover:text-white transition">
            العربية (ع)
          </Link>
          <Link href="/login" className="text-xs px-4 py-2 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] font-bold text-white transition shadow-lg shadow-purple-950/60">
            Sign In / Register
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-20 flex flex-col items-center text-center space-y-8">
        <div className="inline-block px-3.5 py-1.5 rounded-full bg-[#180E2E] border border-purple-500/30 text-xs text-[#A78BFA] font-mono">
          The Next Generation Bodybuilding &amp; Online Coaching Platform
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white font-heading max-w-3xl leading-tight">
          Manage Athletes, Nutrition &amp; FST-7 Workouts with Precision.
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
          High-end minimal coaching platform built for serious bodybuilding coaches. 3-day templates, automated absence &amp; water alerts, and client 1RM tracking.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <Link 
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm rounded-2xl shadow-xl shadow-purple-950/70 transition"
          >
            Launch Coach Dashboard
          </Link>
          <Link 
            href="/app"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#120A24] hover:bg-[#1A0E32] border border-white/[0.08] text-slate-200 font-bold text-sm rounded-2xl transition"
          >
            Experience Athlete App (PWA)
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-16 text-left w-full">
          <div className="p-6 rounded-3xl bg-[#0D0717] border border-white/[0.05] space-y-2">
            <span className="text-[#A78BFA] font-mono text-xs font-bold">01 / HYPERTROPHY</span>
            <h3 className="font-bold text-white text-base">Hany Rambod FST-7</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Official fascial stretch hypertrophy protocols with 7-set finishers, tempo, and isometric posing locks.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0D0717] border border-white/[0.05] space-y-2">
            <span className="text-[#A78BFA] font-mono text-xs font-bold">02 / TRACKING</span>
            <h3 className="font-bold text-white text-base">Check-In &amp; Absence Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real desktop and phone push messages whenever an athlete skips workouts or delays designated meal times.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0D0717] border border-white/[0.05] space-y-2">
            <span className="text-[#A78BFA] font-mono text-xs font-bold">03 / METRICS</span>
            <h3 className="font-bold text-white text-base">1RM Max Intensity</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Scientific 1-rep maximum calculations (Brzycki &amp; Epley) tracking true mechanical load for all sets.
            </p>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-slate-600 border-t border-white/[0.03]">
        CoachPR Platform · All rights reserved 2026
      </footer>
    </div>
  );
}
