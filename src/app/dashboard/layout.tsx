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
import MegatronModal from '@/components/MegatronModal';

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
      { name: 'الوارد', href: '/dashboard/inbox', icon: Inbox, badge: '15', badgeColor: 'bg-[#d4f60b] text-black font-black' },
      { name: 'الرسائل', href: '/dashboard/messages', icon: Send, badge: '4', badgeColor: 'bg-[#d4f60b] text-black font-black' },
      { name: 'الرسائل الجماعية', href: '/dashboard/broadcast', icon: MessageSquare },
      { name: 'مراجعة الأداء', href: '/dashboard/readiness', icon: Play, badge: '1', badgeColor: 'bg-[#d4f60b] text-black font-black' },
      { name: 'تقييم التمرين', href: '/dashboard/formcheck', icon: CheckSquare },
      { name: 'التعديلات الصحية', href: '/dashboard/health', icon: HeartHandshake },
    ]
  },
  {
    title: 'العملاء',
    items: [
      { name: 'العملاء', href: '/dashboard/clients', icon: Users, badge: '29', badgeColor: 'bg-white/10 text-white' },
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
      { name: 'متجر CoachPR', href: '/dashboard/store', icon: Store },
    ]
  },
  {
    title: 'الهوية والذكاء',
    items: [
      { name: 'الملف والتهيئة', href: '/dashboard/profile', icon: Settings },
      { name: 'تصاميم PDF', href: '/dashboard/pdf-designs', icon: FileText },
      { name: 'المساعد الصوتي AI', href: '/dashboard/voice-ai', icon: Mic },
      { name: 'رصيد الذكاء الاصطناعي', href: '/dashboard/ai-credits', icon: Coins },
      { name: 'الاشتراك', href: '/dashboard/subscription', icon: ShieldCheck },
      { name: 'المساعدة والدعم', href: '/dashboard/help', icon: HelpCircle },
    ]
  }
];

function SidebarNavigation() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6 custom-scrollbar">
      {menuGroups.map((group, idx) => (
        <div key={idx} className="space-y-1">
          <p className="px-3 text-[11px] font-bold text-white/30 tracking-wider">
            {group.title}
          </p>
          <div className="space-y-0.5 mt-1">
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                    isActive 
                      ? 'bg-[#181d16] text-[#d4f60b] border border-[#d4f60b]/30 shadow-sm' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} className={isActive ? 'text-[#d4f60b]' : 'text-white/40 group-hover:text-white/70'} />
                    <span>{item.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
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
  const [isMegatronOpen, setIsMegatronOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background text-white overflow-hidden font-sans selection:bg-[#d4f60b] selection:text-black" dir="rtl">
      
      {/* Enterprise Full-Fledged Luxury Sidebar */}
      <aside className="w-64 border-l border-white/5 bg-shell flex flex-col hidden xl:flex shrink-0 z-30">
        
        {/* Header Logo: Official PR Emblem */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/5">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#a855f7] border border-[#7C3AED]/40 flex items-center justify-center font-black text-sm text-white shadow-[0_0_12px_rgba(124,58,237,0.5)]">
              PR
            </div>
            <span className="text-lg font-black tracking-tight text-white">Coach<span className="text-[#d4f60b]">PR</span></span>
          </Link>
          <span className="text-[10px] font-mono text-[#d4f60b] bg-[#d4f60b]/10 border border-[#d4f60b]/30 px-2 py-0.5 rounded-full font-bold">
            PRO
          </span>
        </div>

        {/* Multi-Section Menu */}
        <Suspense fallback={<div className="p-4 text-xs text-white/30">تحميل القوائم...</div>}>
          <SidebarNavigation />
        </Suspense>

        {/* Bottom Profile Bar */}
        <div className="p-3 border-t border-white/5 bg-background flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#a855f7] border border-[#7C3AED] flex items-center justify-center text-white font-black text-xs shadow-sm shadow-[#7C3AED]/40">
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
        <header className="h-16 border-b border-white/5 bg-shell/95 backdrop-blur-md flex items-center justify-between px-6 z-20 shrink-0">
          
          {/* Search Bar with Keyboard Hint */}
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40" size={15} />
              <input 
                type="text" 
                placeholder="ابحث في الصفحات والإجراءات..." 
                className="w-full bg-card border border-white/10 rounded-full py-2 pr-9 pl-12 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#d4f60b] transition"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white/30 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                Ctrl+K
              </span>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            
            {/* Ask Megatron Top Button (Exact match with glowing yellow-lime badge) */}
            <button 
              onClick={() => setIsMegatronOpen(true)}
              className="bg-[#d4f60b] hover:bg-[#c2e205] text-black font-black text-xs px-4 py-2 rounded-full flex items-center gap-1.5 shadow-[0_0_18px_rgba(212,246,11,0.35)] transition cursor-pointer active:scale-95"
            >
              <Sparkles size={14} className="fill-black" />
              <span>اسأل ميجاترون</span>
            </button>

            <Link 
              href="/app" 
              className="text-xs font-bold text-white/70 hover:text-[#d4f60b] bg-card border border-white/10 px-3 py-2 rounded-full hidden sm:flex items-center gap-1.5 transition"
            >
              <span>تطبيق اللاعب</span>
            </Link>

            <button className="relative p-2 text-white/50 hover:text-white transition">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#d4f60b] rounded-full animate-ping"></span>
            </button>
          </div>

        </header>

        {/* Page Content Scroll Container */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-8 relative bg-gradient-to-b from-background via-shell to-background">
          {children}

          {/* Floating AI Pulse Button triggers Megatron Modal */}
          <button
            onClick={() => setIsMegatronOpen(true)}
            className="fixed bottom-8 left-8 w-14 h-14 bg-card border border-[#d4f60b]/50 text-[#d4f60b] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,246,11,0.35)] hover:scale-110 transition-transform z-40 group cursor-pointer"
            title="المساعد الذكي (ميجاترون AI)"
          >
            <Sparkles size={24} className="group-hover:rotate-12 transition-transform text-[#d4f60b]" />
          </button>
        </div>

      </main>

      {/* Interactive Megatron AI Modal (Exact replica of user screenshot) */}
      <MegatronModal 
        isOpen={isMegatronOpen} 
        onClose={() => setIsMegatronOpen(false)} 
        contextPage="Coach dashboard" 
      />

      {/* Global Notifications */}
      <Toaster 
        theme="dark" 
        position="top-center" 
        richColors 
        toastOptions={{
          style: {
            background: '#111116',
            border: '1px solid rgba(212, 246, 11, 0.3)',
            color: '#fff',
            borderRadius: '1rem',
            fontFamily: 'inherit'
          }
        }}
      />
    </div>
  );
}
