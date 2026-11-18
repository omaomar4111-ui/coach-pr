"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface LeadCard {
  id: string;
  name: string;
  phone: string;
  channel: "instagram" | "whatsapp" | "web";
  amount?: number;
  lastMessage: string;
  agent: string;
  stage: "new" | "contacted" | "awaiting_payment" | "verified" | "fulfilled";
  updatedAt: string;
}

export default function PipelinePage() {
  const [leads, setLeads] = useState<LeadCard[]>([
    {
      id: "lead-1",
      name: "@salma_style",
      phone: "ig:ig_user_777",
      channel: "instagram",
      amount: 1450,
      lastMessage: "بكام وسعر الشحن كام؟",
      agent: "منى زاهر (Instagram Agent)",
      stage: "contacted",
      updatedAt: "منذ 5 دقائق"
    },
    {
      id: "lead-2",
      name: "عميل واتساب (5678)",
      phone: "201012345678",
      channel: "whatsapp",
      amount: 2200,
      lastMessage: "تم تحويل المبلغ عبر إنستاباي ومرفق الإيصال",
      agent: "كريم ممدوح (Vision Auditor)",
      stage: "awaiting_payment",
      updatedAt: "منذ 12 دقيقة"
    },
    {
      id: "lead-3",
      name: "محمود إبراهيم",
      phone: "201198765432",
      channel: "whatsapp",
      amount: 850,
      lastMessage: "تم تأكيد عملية التحويل والإيصال معتمد ✓",
      agent: "سارة طارق (Sales Lead)",
      stage: "verified",
      updatedAt: "منذ نصف ساعة"
    },
    {
      id: "lead-4",
      name: "@ahmed_fashion",
      phone: "ig:ig_user_882",
      channel: "instagram",
      amount: 3100,
      lastMessage: "عايز كود خصم للباقة الكاملة",
      agent: "ليلى حسام (Promotions)",
      stage: "new",
      updatedAt: "منذ ساعة"
    },
    {
      id: "lead-5",
      name: "رانيا مصطفى",
      phone: "201244556677",
      channel: "whatsapp",
      amount: 1950,
      lastMessage: "الأوردر خرج مع شركة الشحن وبوليسة التتبع جاهزة",
      agent: "هاني فؤاد (Dispatcher)",
      stage: "fulfilled",
      updatedAt: "منذ ساعتين"
    }
  ]);

  const stages = [
    { id: "new", title: "عملاء جدد", color: "#8052ff", count: leads.filter(l => l.stage === "new").length },
    { id: "contacted", title: "تم التواصل (DM/شات)", color: "#38bdf8", count: leads.filter(l => l.stage === "contacted").length },
    { id: "awaiting_payment", title: "بانتظار إنستاباي", color: "#ffb829", count: leads.filter(l => l.stage === "awaiting_payment").length },
    { id: "verified", title: "تم التحقق من الدفع", color: "#15846e", count: leads.filter(l => l.stage === "verified").length },
    { id: "fulfilled", title: "تم الشحن والتسليم", color: "#a855f7", count: leads.filter(l => l.stage === "fulfilled").length },
  ];

  const moveStage = (leadId: string, direction: "next" | "prev") => {
    const stageOrder: LeadCard["stage"][] = ["new", "contacted", "awaiting_payment", "verified", "fulfilled"];
    setLeads(prev => prev.map(lead => {
      if (lead.id !== leadId) return lead;
      const currentIndex = stageOrder.indexOf(lead.stage);
      const nextIndex = direction === "next" 
        ? Math.min(currentIndex + 1, stageOrder.length - 1)
        : Math.max(currentIndex - 1, 0);
      return { ...lead, stage: stageOrder[nextIndex] };
    }));
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#000000] text-[#ffffff] font-sans selection:bg-[#8052ff] selection:text-white pb-16">
      
      {/* Top Header */}
      <header className="border-b border-[#171717] px-6 py-6 max-w-[1440px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-5 h-5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <polygon points="12 2 22 22 2 22" fill="#8052ff" />
              </svg>
            </div>
            <span className="text-[16px] font-normal tracking-tight text-white">CoachPRB</span>
          </Link>
          <span className="text-[#333333]">/</span>
          <h1 className="text-[15px] font-normal text-[#9a9a9a]">إدارة المبيعات والطلبات (Pipeline CRM)</h1>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/inbox"
            className="text-[13px] text-[#9a9a9a] hover:text-white px-3 py-1.5 transition-colors"
          >
            صندوق المحادثات
          </Link>
          <Link
            href="/fleet"
            className="text-[13px] text-[#9a9a9a] hover:text-white px-3 py-1.5 transition-colors"
          >
            أسطول الإيجنتس
          </Link>
          <Link
            href="/settings"
            className="bg-[#8052ff] hover:bg-[#7042f0] text-white text-[13px] px-5 py-2 rounded-[24px] transition-all"
          >
            إعدادات القنوات
          </Link>
        </div>
      </header>

      {/* Main Kanban Content */}
      <main className="max-w-[1440px] mx-auto px-6 pt-8">
        
        {/* KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-[20px] bg-[#000000] border border-[#1a1a1a]">
            <span className="text-[12px] text-[#9a9a9a] block font-extralight">إجمالي المبيعات النشطة</span>
            <span className="text-[24px] font-normal text-white mt-1 block">9,550 ج.م</span>
          </div>
          <div className="p-4 rounded-[20px] bg-[#000000] border border-[#1a1a1a]">
            <span className="text-[12px] text-[#ffb829] block font-extralight">بانتظار فحص إنستاباي</span>
            <span className="text-[24px] font-normal text-white mt-1 block">2,200 ج.م</span>
          </div>
          <div className="p-4 rounded-[20px] bg-[#000000] border border-[#1a1a1a]">
            <span className="text-[12px] text-[#15846e] block font-extralight">مبيعات تم تأكيدها</span>
            <span className="text-[24px] font-normal text-white mt-1 block">850 ج.م</span>
          </div>
          <div className="p-4 rounded-[20px] bg-[#000000] border border-[#1a1a1a]">
            <span className="text-[12px] text-[#8052ff] block font-extralight">معدل تحويل الإيجنتس</span>
            <span className="text-[24px] font-normal text-white mt-1 block">68.4%</span>
          </div>
        </div>

        {/* 5-Column Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto">
          {stages.map(stage => {
            const stageLeads = leads.filter(l => l.stage === stage.id);
            return (
              <div key={stage.id} className="min-w-[250px] bg-[#070707] rounded-[24px] border border-[#171717] p-4 flex flex-col">
                
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#171717]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: stage.color }} />
                    <span className="text-[13px] font-normal text-white">{stage.title}</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#9a9a9a] px-2 py-0.5 rounded-full bg-[#141414]">
                    {stageLeads.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 flex-1">
                  {stageLeads.map(lead => (
                    <div
                      key={lead.id}
                      className="p-4 rounded-[18px] bg-[#000000] border border-[#1f1f1f] hover:border-[#8052ff]/40 transition-all space-y-2.5"
                    >
                      {/* Customer & Channel Badge */}
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-normal text-white truncate max-w-[130px]">
                          {lead.name}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full uppercase ${
                            lead.channel === "instagram"
                              ? "bg-[#8052ff]/10 text-[#8052ff] border border-[#8052ff]/30"
                              : "bg-[#15846e]/10 text-[#15846e] border border-[#15846e]/30"
                          }`}
                        >
                          {lead.channel}
                        </span>
                      </div>

                      {/* Last Message Snippet */}
                      <p className="text-[12px] text-[#bdbdbd] font-extralight line-clamp-2">
                        {lead.lastMessage}
                      </p>

                      {/* Meta Footer */}
                      <div className="pt-2 border-t border-[#141414] flex items-center justify-between text-[11px] text-[#9a9a9a]">
                        <span>{lead.amount ? `${lead.amount} ج.م` : "—"}</span>
                        <span>{lead.updatedAt}</span>
                      </div>

                      {/* Active Agent Badge */}
                      <div className="text-[10px] text-[#8052ff] font-extralight truncate">
                        🤖 {lead.agent}
                      </div>

                      {/* Stage Shift Controls */}
                      <div className="flex items-center justify-between pt-1 gap-1">
                        <button
                          onClick={() => moveStage(lead.id, "prev")}
                          disabled={lead.stage === "new"}
                          className="flex-1 py-1 text-[11px] rounded bg-[#111111] hover:bg-[#1a1a1a] disabled:opacity-20 text-[#9a9a9a] transition-all"
                        >
                          → للخلف
                        </button>
                        <button
                          onClick={() => moveStage(lead.id, "next")}
                          disabled={lead.stage === "fulfilled"}
                          className="flex-1 py-1 text-[11px] rounded bg-[#8052ff]/20 hover:bg-[#8052ff]/40 disabled:opacity-20 text-[#8052ff] transition-all"
                        >
                          للأمام ←
                        </button>
                      </div>
                    </div>
                  ))}

                  {stageLeads.length === 0 && (
                    <div className="py-8 text-center text-[12px] text-[#444444] font-extralight">
                      لا توجد طلبات في هذه المرحلة
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </main>

    </div>
  );
}
