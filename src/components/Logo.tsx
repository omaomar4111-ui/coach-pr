import React from 'react';
import Link from 'next/link';
import { Bot } from 'lucide-react';

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  }[size];

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }[size];

  return (
    <Link href="/" className={`flex items-center gap-2 font-bold tracking-tight ${sizeClasses} hover:opacity-90 transition-opacity`}>
      <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md shadow-indigo-500/20">
        <Bot className={`${iconSizes} text-white`} />
      </div>
      <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-extrabold">
        PR Agent
      </span>
    </Link>
  );
}
