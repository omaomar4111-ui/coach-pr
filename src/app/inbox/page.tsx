"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface ConversationItem {
  id: string;
  customerName: string;
  phone: string;
  channel: "instagram" | "whatsapp" | "web";
  lastMessage: string;
  time: string;
  unread: boolean;
  activeAgent: string;
}

interface MessageItem {
  id: string;
  senderType: "customer" | "agent" | "system";
  content: string;
  time: string;
  status?: string;
  mediaUrl?: string;
}

export default function OmnichannelInboxPage() {
  const [conversations, setConversations] = useState<ConversationItem[]>([
    {
      id: "conv-1",
      customerName: "@salma_style",
      phone: "ig:ig_user_777",
      channel: "instagram",
      lastMessage: "بكام وسعر الشحن كام؟",
      time: "15:42",
      unread: false,
      activeAgent: "منى زاهر (Instagram Comment-to-DM)"
    },
    {
      id: "conv-2",
      customerName: "عميل واتساب (5678)",
      phone: "+20 101 234 5678",
      channel: "whatsapp",
      lastMessage: "تم تحويل 1,450 ج.م على إنستاباي ومرفق الإيصال",
      time: "15:30",
      unread: true,
      activeAgent: "كريم ممدوح (Vision Auditor)"
    },
    {
      id: "conv-3",
      customerName: "محمد طارق",
      phone: "+20 119 876 5432",
      channel: "whatsapp",
      lastMessage: "عايز كود خصم للطلب الجديد",
      time: "14:15",
      unread: false,
      activeAgent: "سارة طارق (Sales Lead)"
    }
  ]);

  const [activeConvId, setActiveConvId] = useState<string>("conv-1");
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "m-1",
      senderType: "customer",
      content: "[تعليق إنستجرام على ريلز #102]: بكام وسعر الشحن كام؟",
      time: "15:42"
    },
    {
      id: "m-2",
      senderType: "agent",
      content: "أهلاً بيك يا فندم! 🌸 بخصوص الأسعار، كل المنتجات وتفاصيلها وخصومات النهاردة موجودة في الكتالوج هنا، والتوصيل متاح لجميع المحافظات خلال 24 لـ 48 ساعة. تقدري تطلبي فوراً مع كود خصم PR10.",
      time: "15:42",
      status: "تم الإرسال عبر الـ DM"
    }
  ]);

  const [inputText, setInputText] = useState("");
  const [aiEnabled, setAiEnabled] = useState(true);

  const activeConv = conversations.find(c => c.id === activeConvId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: MessageItem = {
      id: `m-${Date.now()}`,
      senderType: "agent",
      content: inputText,
      time: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
      status: "مرسل يدوي"
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText("");
  };

  const handleSimulateInstapayVerify = () => {
    const systemAuditMsg: MessageItem = {
      id: `m-${Date.now()}`,
      senderType: "system",
      content: "🔍 [كريم ممدوح - فحص الرؤية البصرية]: تم تدقيق إيصال إنستاباي بنجاح!\n- رقم العملية: 981244012\n- المبلغ: 1,450.00 ج.م\n- الحالة: معتمد ومطابق للحساب البنكي والرقم المرجعي.",
      time: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })
    };
    setMessages(prev => [...prev, systemAuditMsg]);
  };

  return (
    <div dir="rtl" className="h-screen bg-[#000000] text-white flex flex-col font-sans selection:bg-[#8052ff] selection:text-white overflow-hidden">
      
      {/* Top Header */}
      <header className="border-b border-[#171717] px-6 py-4 flex items-center justify-between shrink-0 bg-[#000000]">
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
          <h1 className="text-[14px] font-normal text-[#9a9a9a]">صندوق المحادثات الموحد (Omnichannel Live Inbox)</h1>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/pipeline" className="text-[13px] text-[#9a9a9a] hover:text-white transition-colors">إدارة المبيعات</Link>
          <Link href="/fleet" className="text-[13px] text-[#9a9a9a] hover:text-white transition-colors">أسطول الإيجنتس</Link>
          <Link href="/settings" className="bg-[#8052ff] hover:bg-[#7042f0] text-white text-[13px] px-5 py-2 rounded-[24px] transition-all">
            إعدادات الـ Webhooks
          </Link>
        </div>
      </header>

      {/* Main Inbox Two-Pane Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Right Conversations Sidebar */}
        <aside className="w-80 md:w-96 border-l border-[#171717] flex flex-col bg-[#050505] shrink-0">
          <div className="p-4 border-b border-[#171717] flex items-center justify-between">
            <span className="text-[13px] font-normal text-white">كل المحادثات</span>
            <span className="text-[11px] text-[#8052ff] bg-[#8052ff]/10 px-2 py-0.5 rounded-full">
              متصل لحظياً (Supabase Realtime)
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#141414]">
            {conversations.map(conv => (
              <div
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                className={`p-4 cursor-pointer transition-all ${
                  activeConvId === conv.id ? "bg-[#111111] border-r-2 border-[#8052ff]" : "hover:bg-[#0a0a0a]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-normal text-white">{conv.customerName}</span>
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full uppercase ${
                        conv.channel === "instagram"
                          ? "bg-[#8052ff]/20 text-[#8052ff]"
                          : "bg-[#15846e]/20 text-[#15846e]"
                      }`}
                    >
                      {conv.channel}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#666666] font-mono">{conv.time}</span>
                </div>

                <p className="text-[12px] text-[#9a9a9a] font-extralight truncate">
                  {conv.lastMessage}
                </p>

                <div className="mt-2 text-[10px] text-[#ffb829] font-extralight flex items-center gap-1">
                  <span>🤖</span>
                  <span>{conv.activeAgent.split(" ")[0]} {conv.activeAgent.split(" ")[1]}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Left Active Chat Thread */}
        <main className="flex-1 flex flex-col bg-[#000000]">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-[#171717] flex items-center justify-between shrink-0 bg-[#050505]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#8052ff]/20 flex items-center justify-center text-white text-[14px]">
                {activeConv?.customerName[0]}
              </div>
              <div>
                <h2 className="text-[15px] font-normal text-white">{activeConv?.customerName}</h2>
                <span className="text-[11px] text-[#9a9a9a] font-extralight">{activeConv?.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Human Takeover / AI Toggle */}
              <div className="flex items-center gap-2 bg-[#111111] px-3 py-1.5 rounded-[20px] border border-[#222222]">
                <span className="text-[11px] text-[#9a9a9a]">الرد الآلي بالذكاء الاصطناعي</span>
                <button
                  onClick={() => setAiEnabled(!aiEnabled)}
                  className={`w-7 h-4 rounded-full p-0.5 transition-colors ${
                    aiEnabled ? "bg-[#15846e]" : "bg-[#333333]"
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full bg-white transition-transform ${
                      aiEnabled ? "translate-x-0" : "-translate-x-3"
                    }`}
                  />
                </button>
              </div>

              {/* InstaPay Vision Quick Action */}
              <button
                onClick={handleSimulateInstapayVerify}
                className="text-[12px] bg-[#ffb829]/10 hover:bg-[#ffb829]/20 text-[#ffb829] border border-[#ffb829]/30 px-3 py-1.5 rounded-[20px] transition-all"
              >
                🔍 فحص إيصال إنستاباي
              </button>
            </div>
          </div>

          {/* Messages Flow Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.senderType === "customer"
                    ? "items-start"
                    : msg.senderType === "system"
                    ? "items-center"
                    : "items-end"
                }`}
              >
                {msg.senderType === "system" ? (
                  <div className="max-w-[500px] w-full p-4 rounded-[20px] bg-[#111111] border border-[#ffb829]/40 text-right text-[13px] text-[#ffb829] whitespace-pre-line leading-relaxed">
                    {msg.content}
                  </div>
                ) : (
                  <div
                    className={`max-w-[550px] p-4 rounded-[22px] text-right text-[14px] leading-relaxed ${
                      msg.senderType === "customer"
                        ? "bg-[#141414] text-[#ffffff] border border-[#222222]"
                        : "bg-[#8052ff] text-white"
                    }`}
                  >
                    <p className="font-extralight">{msg.content}</p>
                    <div className="mt-1 flex items-center justify-between gap-4 text-[10px] opacity-70">
                      <span>{msg.time}</span>
                      {msg.status && <span>{msg.status}</span>}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Message Input Bar */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-[#171717] bg-[#050505] flex items-center gap-3">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="اكتب رداً يدوياً أو دع الإيجنت يرد تلقائياً..."
              className="flex-1 bg-[#111111] border border-[#222222] rounded-[24px] px-5 py-3 text-[14px] text-white placeholder-[#666666] focus:outline-none focus:border-[#8052ff]"
            />
            <button
              type="submit"
              className="bg-[#8052ff] hover:bg-[#7042f0] text-white text-[14px] px-6 py-3 rounded-[24px] transition-all"
            >
              إرسال
            </button>
          </form>

        </main>

      </div>

    </div>
  );
}
