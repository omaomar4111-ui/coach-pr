import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dimensions = {
    sm: { width: 32, height: 32, text: 'text-lg', badge: 'text-[9px] px-1.5 py-0.2' },
    md: { width: 40, height: 40, text: 'text-xl', badge: 'text-[10px] px-2 py-0.5' },
    lg: { width: 52, height: 52, text: 'text-2xl', badge: 'text-xs px-2.5 py-0.5' }
  }[size];

  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      {/* Official Geometric PR Emblem with Cyber Laser Glow */}
      <div className="relative flex items-center justify-center p-1.5 rounded-xl bg-purple-950/40 border border-purple-500/30 group-hover:border-purple-400/80 transition-all shadow-[0_0_20px_rgba(139,92,246,0.35)]">
        <Image
          src="/brand-pr-logo.png"
          alt="CoachPR Official PR Emblem"
          width={dimensions.width}
          height={dimensions.height}
          priority
          className="object-contain filter drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-black tracking-tight text-white ${dimensions.text}`}>
            CoachPR
          </span>
          <span className={`font-mono font-bold rounded-full hud-badge-magenta ${dimensions.badge}`}>
            PRO
          </span>
        </div>
        <span className="text-[10px] text-slate-400 font-medium tracking-wide">
          سجّل رقمك. غيّر جسمك.
        </span>
      </div>
    </Link>
  );
}
