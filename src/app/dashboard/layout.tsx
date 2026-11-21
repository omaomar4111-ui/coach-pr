'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Dumbbell, 
  Activity, 
  Utensils, 
  Sparkles, 
  Flame, 
  Smartphone, 
  Bot,
  LogOut,
  ChevronLeft
} from 'lucide-react';
import { Toaster } from 'sonner';

const navItems = [
  { name: 'الرئيسية', href: '/dashboard', icon: LayoutDashboard },
  { name: 'اللاعبين والمشتركين', href: '/dashboard/clients', icon: Users },
  { name: 'باني الجداول', href: '/dashboard/builder', icon: Dumbbell },
  { name: 'جاهزية وتعديل الستات', href: '/dashboard/readiness', icon: Activity, badge: 'Autopilot' },
  { name: 'الماكروز والتغذية', href: '/dashboard/nutrition', icon: Utensils },
  { name: 'فحص التكنيك (AI)', href: '/dashboard/formcheck', icon: Sparkles },
  { name: 'مساعد الكوتش (Copilot)', href: '/copilot', icon: Bot, badge: 'AI' },
  { name: 'من يحتاجك اليوم', href: '/captain/pending', icon: Flame },
];

function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto no-scrollbar">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.name} href={item.href} className="block relative">
            <div
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-all duration-200 ${
                isActive 
                  ? 'bg-[#1a2312] text-[#bef264] border border-[#a3e635]/40 font-bold shadow-lg shadow-[#a3e635]/10' 
                  : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} className={isActive ? 'text-[#a3e635]' : 'text-white/50'} />
                <span className="text-xs font-semibold">{item.name}</span>
              </div>

              {item.badge && (
                <span className="bg-[#171228] border border-white/10 text-[9px] font-bold px-2 py-0.5 rounded-lg text-[#a3e635]">
                  {item.badge}
                </span>
              )}
            </div>
          </Link>
        );
      })}
    </nav>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#07050d] text-white overflow-hidden selection:bg-[#a3e635] selection:text-black font-sans" dir="rtl">
      
      {/* Premium Dark Glassmorphic Sidebar */}
      <aside className="w-64 border-l border-white/10 bg-[#100c1e]/80 backdrop-blur-2xl flex flex-col hidden lg:flex shrink-0 z-30">
        
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#171228] border border-white/10 flex items-center justify-center p-2 shadow-lg">
              <img src="/brand-pr-logo.png" alt="CoachPRB" className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white block">CoachPRB</span>
              <span className="text-[10px] text-[#a3e635] font-semibold block -mt-1">منصة الكوتش الذكية</span>
            </div>
          </Link>
        </div>

        {/* Navigation wrapped in Suspense for Next.js 16 SSR */}
        <Suspense fallback={<div className="flex-1 p-4 text-xs text-white/30">تحميل القوائم...</div>}>
          <SidebarNav />
        </Suspense>

        {/* Gym Mode Shortcut */}
        <div className="px-4 py-2">
          <Link 
            href="/app"
            className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-[#171228] to-[#100c1e] border border-[#a3e635]/30 hover:border-[#a3e635] text-white transition-all shadow-md group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-[#1a2312] flex items-center justify-center text-[#a3e635]">
                <Smartphone size={14} />
              </div>
              <div>
                <span className="text-xs font-bold block text-white">وضع الصالة PWA</span>
                <span className="text-[10px] text-[#a3e635] block">تسجيل أوفلاين بالجيم</span>
              </div>
            </div>
            <ChevronLeft size={14} className="text-white/40 group-hover:translate-x-[-2px] transition" />
          </Link>
        </div>

        {/* Footer Logout */}
        <div className="p-4 border-t border-white/5">
          <Link 
            href="/login"
            className="flex items-center gap-3 px-3.5 py-2.5 w-full text-white/50 hover:text-rose-400 hover:bg-rose-500/10 rounded-2xl transition-all text-xs font-bold"
          >
            <LogOut size={16} />
            <span>تسجيل الخروج</span>
          </Link>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Top Header Navbar */}
        <header className="h-20 border-b border-white/10 bg-[#07050d]/80 backdrop-blur-xl flex items-center justify-between px-6 sm:px-10 z-20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#171228] border border-white/10 flex items-center justify-center lg:hidden p-1.5">
              <img src="/brand-pr-logo.png" alt="PR" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                مرحباً بك مجدداً، كابتن 👋
              </h1>
              <p className="text-[11px] text-white/40 hidden sm:block">CoachPRB &bull; نظام قيادة أبطال اللياقة وكمال الأجسام</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/app"
              className="bg-[#171228] hover:border-[#a3e635] border border-white/10 text-[#a3e635] px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition"
            >
              <Dumbbell size={14} />
              <span className="hidden sm:inline">تجربة الجيم</span>
            </Link>

            <div className="flex items-center gap-2.5 bg-[#100c1e] border border-white/10 p-1.5 pr-3 rounded-2xl">
              <span className="text-xs font-bold text-white hidden sm:inline">كوتش المنظومة</span>
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#a3e635] to-emerald-400 border border-[#a3e635] flex items-center justify-center text-black font-black text-xs shadow-md">
                PR
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Container with Framer Motion Entrance */}
        <div className="flex-1 overflow-y-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="min-h-full"
          >
            {children}
          </motion.div>
        </div>

      </main>

      {/* Global Dark Luxury Toast Notifications */}
      <Toaster 
        theme="dark" 
        position="top-center" 
        richColors 
        toastOptions={{
          style: {
            background: '#100c1e',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#fff',
            borderRadius: '1rem',
            fontFamily: 'inherit'
          }
        }}
      />
    </div>
  );
}
