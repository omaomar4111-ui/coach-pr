'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FileText, 
  HelpCircle, 
  Phone, 
  Store, 
  Sliders, 
  Users, 
  Mic, 
  Zap, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface Props {
  title: string;
  description: string;
  icon: any;
  category: string;
}

export function GenericDashboardView({ title, description, icon: Icon, category }: Props) {
  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans" dir="rtl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
          <Icon className="text-[#a78bfa]" /> {title}
        </h1>
        <p className="text-xs text-white/50 mt-1">{description}</p>
      </div>

      <div className="bg-[#111116] border border-white/5 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-[#1e1338] border border-[#7C3AED]/40 flex items-center justify-center text-[#c4b5fd] mx-auto shadow-lg shadow-[#7C3AED]/20">
          <Icon size={30} />
        </div>

        <div className="max-w-md mx-auto space-y-2">
          <h2 className="text-xl font-bold text-white">قسم {title} قيد التفعيل في منصتك</h2>
          <p className="text-xs text-white/60 leading-relaxed">
            تم ربط الباك إند بالكامل عبر Supabase PostgreSQL، ويجري استكمال عرض الأدوات المتقدمة لهذا القسم.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <Link
            href="/dashboard"
            className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-2.5 rounded-2xl text-xs font-bold transition shadow-lg shadow-[#7C3AED]/30"
          >
            العودة للرئيسية
          </Link>
          <Link
            href="/dashboard/clients"
            className="bg-[#1e1338] text-[#c4b5fd] border border-[#7C3AED]/40 px-6 py-2.5 rounded-2xl text-xs font-bold transition"
          >
            إدارة العملاء
          </Link>
        </div>
      </div>
    </div>
  );
}
