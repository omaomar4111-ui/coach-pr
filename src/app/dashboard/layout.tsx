'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  PlaySquare, 
  Inbox, 
  MessageSquare, 
  Send, 
  Play, 
  CheckSquare, 
  HeartHandshake, 
  Users, 
  FileText, 
  PhoneCall, 
  Dumbbell, 
  Apple, 
  Sliders, 
  Zap, 
  Store, 
  Wallet, 
  LineChart, 
  Bot, 
  FileCheck, 
  Mic, 
  Coins, 
  ShieldCheck, 
  Settings, 
  HelpCircle, 
  Search, 
  Bell, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { Toaster } from 'sonner';

interface MenuItem {
  name: string;
  href: string;
  icon: any;
  badge?: string;
  badgeColor?: string;
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

const menuGroups: MenuGroup[] = [
  {
    title: 'الرئيسية',
    items: [
      { name: 'نظرة عامة', href: '/dashboard', icon: LayoutDashboard },
    ]
  },
  {
    title: 'العمل اليومي',
    items: [
      { name: 'الوارد', href: '/dashboard/inbox', icon: Inbox, badge: '14', badgeColor: 'bg-[#a3e635] text-black' },
      { name: 'الرسائل', href: '/dashboard/messages', icon: Send, badge: '4', badgeColor: 'bg-[#a3e635] text-black' },
      { name: 'الرسائل الجماعية', href: '/dashboard/broadcast', icon: MessageSquare },
      { name: 'مراجعة الأداء', href: '/dashboard/readiness', icon: Play, badge: '1', badgeColor: 'bg-[#a3e635] text-black' },
      { name: 'تقييم التمرين', href: '/dashboard/formcheck', icon: CheckSquare },
      { name: 'التعديلات الصحية', href: '/dashboard/health', icon: HeartHandshake },
    ]
  },
  {
    title: 'العملاء',
    items: [
      { name: 'العملاء', href: '/dashboard/clients', icon: Users, badge: '1', badgeColor: 'bg-[#a3e635] text-black' },
      { name: 'مركز الاستيراد', href: '/dashboard/import', icon: FileText },
      { name: 'العملاء المحتملون', href: '/captain/pending', icon: PhoneCall },
    ]
  },
  {
    title: 'الخطط',
    items: [
      { name: 'مكتبة الخطط', href: '/dashboard/plans', icon: FileText },
      { name: 'الخطط الأساسية', href: '/dashboard/builder', icon: Dumbbell },
      { name: 'التمارين', href: '/dashboard/exercises', icon: Sliders },
      { name: 'الأطعمة والماكروز', href: '/dashboard/nutrition', icon: Apple },
      { name: 'منشئ بروتوكول التحسين', href: '/dashboard/protocols', icon: Zap },
      { name: 'حزم التهيئة', href: '/dashboard/packages-setup', icon: Sliders },
    ]
  },
  {
    title: 'الأعمال',
    items: [
      { name: 'الباقات', href: '/pricing', icon: Store },
      { name: 'المدفوعات', href: '/dashboard/payments', icon: Wallet },
      { name: 'التحليلات', href: '/dashboard/analytics', icon: LineChart },
      { name: 'الأتمتة', href: '/copilot', icon: Bot },
      { name: 'نماذج الاستقبال', href: '/captain/pending', icon: FileCheck },
      { name: 'التحدي', href: '/dashboard/challenges', icon: Zap },
      { name: 'الإحالات', href: '/dashboard/referrals', icon: Users },
      { name: 'برنامج الشركاء', href: '/dashboard/partners', icon: Store },
      { name: 'متجر CoachPRB', href: '/dashboard/store', icon: Store },
    ]
  },
  {
    title: 'الهوية والذكاء',
    items: [
      { name: 'الملف والهوية', href: '/dashboard/profile', icon: Users },
      { name: 'تصاميم PDF', href: '/dashboard/pdf-designs', icon: FileText },
      { name: 'صوت الذكاء', href: '/dashboard/voice-ai', icon: Mic },
      { name: 'رصيد الذكاء', href: '/dashboard/ai-credits', icon: Coins },
    ]
  },
  {
    title: 'الإعدادات والاشتراك',
    items: [
      { name: 'اشتراكي في CoachPRB', href: '/dashboard/subscription', icon: ShieldCheck },
      { name: 'الإعدادات', href: '/settings', icon: Settings },
      { name: 'المساعدة', href: '/dashboard/help', icon: HelpCircle },
    ]
  }
];

function SidebarNavigation() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-5 text-xs">
      {menuGroups.map((group, gIdx) => (
        <div key={gIdx} className="space-y-1">
          <h3 className="text-[11px] font-bold text-white/40 px-3 py-1 tracking-wide">
            {group.title}
          </h3>
          <div className="space-y-0.5">
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href} className="block">
                  <div
                    className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-150 ${
                      isActive 
                        ? 'bg-[#171228] text-white font-bold border border-white/10 shadow-sm' 
                        : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon size={16} className={isActive ? 'text-[#a3e635]' : 'text-white/40'} />
                      <span className="truncate max-w-[145px]">{item.name}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[10px] font-mono font-extrabold px-1.5 py-0.2 rounded-full leading-tight ${item.badgeColor || 'bg-white/10 text-white'}`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#07050d] text-white overflow-hidden font-sans selection:bg-[#a3e635] selection:text-black" dir="rtl">
      
      {/* Enterprise Full-Fledged Gymrate-Style Sidebar */}
      <aside className="w-64 border-l border-white/5 bg-[#0a0a0a] flex flex-col hidden xl:flex shrink-0 z-30">
        
        {/* Header Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/5">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#171228] border border-white/10 flex items-center justify-center p-1.5">
              <img src="/brand-pr-logo.png" alt="PR" className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]" />
            </div>
            <span className="text-lg font-black tracking-tighter text-white">Coach<span className="text-[#a3e635]">PRB</span></span>
          </Link>
          <span className="text-[10px] font-mono text-[#a3e635] bg-[#1a2312] border border-[#a3e635]/30 px-2 py-0.5 rounded-full font-bold">
            PRO
          </span>
        </div>

        {/* Multi-Section Menu */}
        <Suspense fallback={<div className="p-4 text-xs text-white/30">تحميل القوائم...</div>}>
          <SidebarNavigation />
        </Suspense>

        {/* Bottom Profile Bar */}
        <div className="p-3 border-t border-white/5 bg-[#07050d] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#a3e635] to-emerald-400 border border-[#a3e635] flex items-center justify-center text-black font-black text-xs">
              PR
            </div>
            <div>
              <p className="text-xs font-bold text-white truncate max-w-[120px]">كوتش تامر</p>
              <p className="text-[10px] text-white/40">مدرب معتمد</p>
            </div>
          </div>
          <Link href="/login" className="text-white/40 hover:text-rose-400 text-xs">
            خروج
          </Link>
        </div>

      </aside>

      {/* Main Content View */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Top Navbar */}
        <header className="h-16 border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-md flex items-center justify-between px-6 z-20 shrink-0">
          
          {/* Search Bar with Keyboard Hint */}
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40" size={15} />
              <input 
                type="text" 
                placeholder="ابحث في الصفحات والإجراءات..." 
                className="w-full bg-[#111116] border border-white/10 rounded-full py-2 pr-9 pl-12 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#a3e635] transition"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white/30 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                Ctrl+K
              </span>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            
            {/* Ask AI Top Button (Gymrate Megatron Style) */}
            <Link 
              href="/copilot"
              className="bg-[#a3e635] hover:bg-[#8fd128] text-black font-extrabold text-xs px-4 py-2 rounded-full flex items-center gap-1.5 shadow-md shadow-[#a3e635]/20 transition"
            >
              <Sparkles size={14} />
              <span>اسأل ميجاترون (AI)</span>
            </Link>

            <Link 
              href="/app" 
              className="text-xs font-bold text-white/70 hover:text-[#a3e635] bg-[#111116] border border-white/10 px-3 py-2 rounded-full hidden sm:flex items-center gap-1.5 transition"
            >
              <span>تطبيق اللاعب</span>
            </Link>

            <button className="relative p-2 text-white/50 hover:text-white transition">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#a3e635] rounded-full animate-ping"></span>
            </button>
          </div>

        </header>

        {/* Page Content Scroll Container */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-8 relative">
          {children}

          {/* Floating AI Pulse Button */}
          <Link
            href="/copilot"
            className="fixed bottom-8 left-8 w-14 h-14 bg-[#171228] border border-[#a3e635]/50 text-[#a3e635] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(163,230,53,0.35)] hover:scale-110 transition-transform z-50 group"
            title="المساعد الذكي (Coach Copilot)"
          >
            <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
          </Link>
        </div>

      </main>

      {/* Global Notifications */}
      <Toaster 
        theme="dark" 
        position="top-center" 
        richColors 
        toastOptions={{
          style: {
            background: '#111116',
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
