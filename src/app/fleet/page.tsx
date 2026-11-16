"use client";

import React, { useState } from "react";
import Link from "next/link";

interface AgentProfile {
  id: string;
  name: string;
  role: string;
  channel: string;
  active: boolean;
  avatarColor: string;
  successRate: string;
  handledCount: number;
  description: string;
}

export default function FleetPage() {
  const [agents, setAgents] = useState<AgentProfile[]>([
    {
      id: "agent-1",
      name: "سارة طارق",
      role: "Sales & WhatsApp Lead",
      channel: "WhatsApp & Web",
      active: true,
      avatarColor: "#8052ff",
      successRate: "94.2%",
      handledCount: 1240,
      description: "المتخصصة في قيادة عمليات البيع والترحيب بالعملاء وعرض المنتجات وتأكيد رغبة الشراء باللهجة المصرية اللطيفة."
    },
    {
      id: "agent-2",
      name: "منى زاهر",
      role: "Instagram Comment-to-DM Specialist",
      channel: "Instagram (Reels & Posts)",
      active: true,
      avatarColor: "#a855f7",
      successRate: "96.8%",
      handledCount: 890,
      description: "الرد الفوري على تعليقات المنشورات والريلز وإرسال رسائل خاصة بالأسعار وكوبونات الخصم فورياً."
    },
    {
      id: "agent-3",
      name: "كريم ممدوح",
      role: "InstaPay Receipt Vision Auditor",
      channel: "OCR / Vision Engine",
      active: true,
      avatarColor: "#ffb829",
      successRate: "99.4%",
      handledCount: 540,
      description: "فحص صور سكرين شوت تحويلات إنستاباي، مطابقة رقم العملية وتاريخها والمبلغ لمنع الاحتيال وتأكيد الطلب."
    },
    {
      id: "agent-4",
      name: "عمر شريف",
      role: "Lead Qualification & Follow-up",
      channel: "WhatsApp",
      active: true,
      avatarColor: "#38bdf8",
      successRate: "88.5%",
      handledCount: 420,
      description: "متابعة العملاء المترددين وإعادة استهدافهم في الوقت المثالي لزيادة معدل إتمام الصفقات."
    },
    {
      id: "agent-5",
      name: "نورهان علي",
      role: "Customer Care & Complaints",
      channel: "Omnichannel",
      active: true,
      avatarColor: "#ec4899",
      successRate: "92.0%",
      handledCount: 310,
      description: "التعامل مع الاستفسارات المعقدة وحل مشاكل ما بعد البيع والتنسيق مع فريق الدعم البشري عند الحاجة."
    },
    {
      id: "agent-6",
      name: "هاني فؤاد",
      role: "Order Dispatcher & Shipping",
      channel: "System / SMS / WhatsApp",
      active: true,
      avatarColor: "#15846e",
      successRate: "98.1%",
      handledCount: 760,
      description: "تنسيق خروج الشحنات مع شركات الشحن المصرية، وإرسال بوالص الشحن وأرقام التتبع للعملاء."
    },
    {
      id: "agent-7",
      name: "ليلى حسام",
      role: "Promotions & Dynamic Discounting",
      channel: "Instagram & WhatsApp",
      active: true,
      avatarColor: "#f97316",
      successRate: "91.3%",
      handledCount: 380,
      description: "تقديم عروض الخصم التفاعلية ومضاعفة متوسط قيمة سلة الشراء (Upselling / Cross-selling)."
    },
    {
      id: "agent-8",
      name: "طارق منصور",
      role: "Cart Abandonment Recovery",
      channel: "WhatsApp & SMS",
      active: true,
      avatarColor: "#eab308",
      successRate: "41.2%",
      handledCount: 290,
      description: "استرجاع السلات المتروكة وتذكير العملاء بالمنتجات قبل نفاذ الكميات بحوافز شراء مخصصة."
    },
    {
      id: "agent-9",
      name: "دينا سامي",
      role: "Review & Feedback Collector",
      channel: "WhatsApp",
      active: true,
      avatarColor: "#06b6d4",
      successRate: "85.7%",
      handledCount: 450,
      description: "جمع تقييمات العملاء الإيجابية بعد استلام الأوردر لتعزيز الثقة في المتجر ونشر التقييمات."
    },
    {
      id: "agent-10",
      name: "حازم إبراهيم",
      role: "Operations & Analytics Watchdog",
      channel: "Internal Dashboard",
      active: true,
      avatarColor: "#64748b",
      successRate: "99.9%",
      handledCount: 5280,
      description: "مراقبة سلامة أداء الأسطول، تحليل معدلات التحويل وتكاليف الـ API وإرسال تقارير الأداء للمالك."
    }
  ]);

  const toggleAgent = (id: string) => {
    setAgents(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#000000] text-white font-sans selection:bg-[#8052ff] selection:text-white pb-20">
      
      {/* Top Header */}
      <header className="border-b border-[#171717] px-6 py-6 max-w-[1280px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-5 h-5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <polygon points="12 2 22 22 2 22" fill="#8052ff" />
              </svg>
            </div>
            <span className="text-[16px] font-normal tracking-tight text-white">PR Agent</span>
          </Link>
          <span className="text-[#333333]">/</span>
          <h1 className="text-[15px] font-normal text-[#9a9a9a]">قيادة أسطول الإيجنتس (Agent Fleet)</h1>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/inbox" className="text-[13px] text-[#9a9a9a] hover:text-white px-3 py-1.5 transition-colors">صندوق المحادثات</Link>
          <Link href="/pipeline" className="text-[13px] text-[#9a9a9a] hover:text-white px-3 py-1.5 transition-colors">إدارة المبيعات</Link>
          <Link href="/settings" className="bg-[#8052ff] hover:bg-[#7042f0] text-white text-[13px] px-5 py-2 rounded-[24px] transition-all">
            تخصيص سلوك الإيجنتس
          </Link>
        </div>
      </header>

      {/* Fleet Hero & Stats */}
      <main className="max-w-[1280px] mx-auto px-6 pt-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[#8052ff] text-[13px] font-semibold tracking-wider uppercase block mb-2">
              ✦ الأسطول الرقمي المستقل (Autonomous Workforce)
            </span>
            <h2 className="text-[36px] font-normal tracking-tight text-white">
              10 إيجنتس أذكياء يديرون تجارتك على مدار الساعة
            </h2>
            <p className="text-[16px] font-extralight text-[#9a9a9a] max-w-[620px] mt-2">
              يعمل كل إيجنت كعضو متخصص في فريقك: استقبال الطلبات، فحص المدفوعات، التنسيق مع الشحن، واستعادة السلات المتروكة.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-5 py-3 rounded-[20px] bg-[#070707] border border-[#1a1a1a] text-center">
              <span className="text-[11px] text-[#9a9a9a] block">الإيجنتس النشطين</span>
              <span className="text-[20px] font-normal text-[#15846e]">{agents.filter(a => a.active).length} / 10</span>
            </div>
            <div className="px-5 py-3 rounded-[20px] bg-[#070707] border border-[#1a1a1a] text-center">
              <span className="text-[11px] text-[#9a9a9a] block">محادثات ناجحة</span>
              <span className="text-[20px] font-normal text-white">10,160</span>
            </div>
          </div>
        </div>

        {/* 10 Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map(agent => (
            <div
              key={agent.id}
              className={`p-6 rounded-[24px] bg-[#050505] border transition-all flex flex-col justify-between ${
                agent.active ? "border-[#222222] hover:border-[#8052ff]/50" : "border-[#141414] opacity-50"
              }`}
            >
              <div>
                {/* Agent Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-medium text-white"
                      style={{ backgroundColor: `${agent.avatarColor}25`, border: `1px solid ${agent.avatarColor}60` }}
                    >
                      {agent.name.split(" ")[0][0]}
                    </div>
                    <div>
                      <h3 className="text-[16px] font-normal text-white">{agent.name}</h3>
                      <span className="text-[11px] text-[#9a9a9a] font-extralight block">{agent.role}</span>
                    </div>
                  </div>

                  {/* Active Toggle */}
                  <button
                    onClick={() => toggleAgent(agent.id)}
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                      agent.active ? "bg-[#8052ff]" : "bg-[#222222]"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        agent.active ? "translate-x-0" : "-translate-x-4"
                      }`}
                    />
                  </button>
                </div>

                {/* Description */}
                <p className="text-[13px] font-extralight text-[#bdbdbd] leading-relaxed mb-6">
                  {agent.description}
                </p>
              </div>

              {/* Stats Footer */}
              <div className="pt-4 border-t border-[#141414] grid grid-cols-3 gap-2 text-center text-[11px]">
                <div>
                  <span className="text-[#9a9a9a] block font-extralight">القناة</span>
                  <span className="text-white truncate block mt-0.5">{agent.channel.split(" ")[0]}</span>
                </div>
                <div>
                  <span className="text-[#9a9a9a] block font-extralight">معدل الدقة</span>
                  <span className="text-[#15846e] block mt-0.5">{agent.successRate}</span>
                </div>
                <div>
                  <span className="text-[#9a9a9a] block font-extralight">العمليات</span>
                  <span className="text-white block mt-0.5">{agent.handledCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
}
