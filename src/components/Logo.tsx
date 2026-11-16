import React from 'react';
import Link from 'next/link';
import { Bot, Sparkles } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export function Logo({ className = '', size = 'md', showSubtitle = false }: LogoProps) {
  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group transition-transform hover:scale-[1.02] ${className}`}>
      <div className="relative flex items-center justify-center p-2 rounded-xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-orange-500/20 border border-purple-500/30 shadow-lg shadow-purple-950/40">
        <Bot className={`${iconSizes[size]} text-purple-400 group-hover:text-purple-300 transition-colors`} />
        <Sparkles className="w-3 h-3 text-orange-400 absolute -top-1 -right-1 animate-pulse" />
      </div>
      <div className="flex flex-col">
        <span className={`font-bold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-300 to-orange-400 bg-clip-text text-transparent ${textSizes[size]}`}>
          PR Agent
        </span>
        {showSubtitle && (
          <span className="text-[10px] text-gray-400 font-normal tracking-wide -mt-1">
            Social Commerce Intelligence
          </span>
        )}
      </div>
    </Link>
  );
}
