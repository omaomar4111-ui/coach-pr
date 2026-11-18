"use client";

import React, { useState } from "react";
import Link from "next/link";

interface FlowTemplate {
  id: string;
  title: string;
  category: string;
  stepsCount: number;
  trigger: string;
  description: string;
  typebotUrl?: string;
}

export default function InteractiveFlowsPage() {
  const [flows, setFlows] = useState<FlowTemplate[]>([
    {
      id: "flow-1",
      title: "مسار اختيار المقاس ونوع القماش",
      category: "مبيعات أزياء ومتاجر",
      stepsCount: 4,
      trigger: "عند طلب العميل تفاصيل المقاسات",
      description: "مسار تفاعلي يسأل العميل عن الطول والوزن ويعرض جدول المقاسات وصور الألوان المتوفرة.",
      typebotUrl: "https://typebot.io"
    },
    {
      id: "flow-2",
      title: "مسار تأكيد عنوان الشحن ورقم الهاتف البديل",
      category: "تأكيد الطلبات",
      stepsCount: 3,
      trigger: "بعد إتمام إضافة المنتجات للسلة",
      description: "جمع المحافظة والمنطقة ورقم هاتف بديل وملاحظات شركة الشحن بنقرات سريعة.",
      typebotUrl: "https://typebot.io"
    },
    {
      id: "flow-3",
      title: "مسار استرجاع السلة المتروكة بكوبون خصم",
      category: "زيادة التحويلات",
      stepsCount: 2,
      trigger: "بعد 15 دقيقة من عدم إكمال الطلب",
      description: "عرض المنتجات التي اختارها العميل مع كوبون خصم 10% ينتهي خلال ساعتين.",
      typebotUrl: "https://typebot.io"
    },
    {
      id: "flow-4",
      title: "مسار فحص وتقييم تجربة العميل (CSAT)",
      category: "خدمة العملاء",
      stepsCount: 3,
      trigger: "بعد 24 ساعة من تسليم الأوردر",
      description: "تقييم من 1 إلى 5 نجوم مع خيار ترك ملاحظات صوتية أو نصية.",
      typebotUrl: "https://typebot.io"
    }
  ]);

  const [activePreview, setActivePreview] = useState<FlowTemplate>(flows[0]);

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
            <span className="text-[16px] font-normal tracking-tight text-white">CoachPRB</span>
          </Link>
          <span className="text-[#333333]">/</span>
          <h1 className="text-[15px] font-normal text-[#9a9a9a]">المسارات التفاعلية و Typebot Visual Flows</h1>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/inbox" className="text-[13px] text-[#9a9a9a] hover:text-white transition-colors">صندوق المحادثات</Link>
          <Link href="/pipeline" className="text-[13px] text-[#9a9a9a] hover:text-white transition-colors">إدارة المبيعات</Link>
          <Link href="/fleet" className="bg-[#8052ff] hover:bg-[#7042f0] text-white text-[13px] px-5 py-2 rounded-[24px] transition-all">
            أسطول الإيجنتس
          </Link>
        </div>
      </header>

      {/* Main Flow Canvas */}
      <main className="max-w-[1280px] mx-auto px-6 pt-12">
        <div className="mb-10 text-right">
          <span className="text-[#8052ff] text-[13px] font-semibold uppercase tracking-wider block mb-2">
            ✦ التدفقات التفاعلية المرئية (Visual Conversational Flows)
          </span>
          <h2 className="text-[36px] font-normal tracking-tight text-white">
            أتمتة سيناريوهات البيع المعقدة بنقرات مرئية
          </h2>
          <p className="text-[16px] font-extralight text-[#9a9a9a] max-w-[620px] mt-2">
            يمكن لموظف خدمة العملاء أو الإيجنت الذكي إرسال مسار Typebot تفاعلي للعميل في واتساب أو إنستجرام لتسهيل اختيار المقاس أو تأكيد الشحن.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Flow Templates List */}
          <div className="lg:col-span-5 space-y-4">
            {flows.map(flow => (
              <div
                key={flow.id}
                onClick={() => setActivePreview(flow)}
                className={`p-5 rounded-[22px] bg-[#050505] border cursor-pointer transition-all ${
                  activePreview.id === flow.id
                    ? "border-[#8052ff] bg-[#0c0c12]"
                    : "border-[#171717] hover:border-[#333333]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-[#ffb829] font-medium px-2 py-0.5 rounded-full bg-[#ffb829]/10">
                    {flow.category}
                  </span>
                  <span className="text-[11px] text-[#666666] font-mono">{flow.stepsCount} خطوات</span>
                </div>
                <h3 className="text-[16px] font-normal text-white mb-1">{flow.title}</h3>
                <p className="text-[13px] font-extralight text-[#9a9a9a] leading-relaxed">
                  {flow.description}
                </p>
                <div className="mt-3 text-[11px] text-[#8052ff] font-extralight">
                  مشغل: {flow.trigger}
                </div>
              </div>
            ))}
          </div>

          {/* Right Interactive Preview Simulator (Typebot / Visual Container) */}
          <div className="lg:col-span-7 bg-[#070707] border border-[#1f1f1f] rounded-[28px] p-6 flex flex-col h-[580px]">
            <div className="flex items-center justify-between pb-4 border-b border-[#171717]">
              <div>
                <span className="text-[14px] font-normal text-white">{activePreview.title}</span>
                <span className="text-[11px] text-[#15846e] block mt-0.5">● جاهز للإرسال في المحادثات المباشرة</span>
              </div>
              <button
                onClick={() => alert(`تم نسخ رابط المسار التفاعلي (${activePreview.title}) لمشاركته مع العميل!`)}
                className="bg-[#8052ff] hover:bg-[#7042f0] text-white text-[12px] px-4 py-2 rounded-[20px] transition-all"
              >
                نسخ رابط المسار 🔗
              </button>
            </div>

            {/* Simulated Typebot Interactive Frame */}
            <div className="flex-1 bg-[#000000] rounded-[20px] border border-[#171717] mt-4 p-6 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#8052ff]/20 flex items-center justify-center text-white text-[12px]">
                    🤖
                  </div>
                  <div className="bg-[#141414] border border-[#222222] p-4 rounded-[20px] text-[13px] text-white max-w-[420px] leading-relaxed font-extralight">
                    أهلاً بيك يا فندم! 🌸 علشان نختار المقاس المثالي لحضرتك، من فضلك اختر الفئة:
                  </div>
                </div>

                <div className="mr-11 flex flex-wrap gap-2">
                  <span className="bg-[#8052ff]/10 border border-[#8052ff]/40 text-[#8052ff] text-[12px] px-4 py-2 rounded-[16px] cursor-pointer hover:bg-[#8052ff]/20 transition-all">
                    مقاس رجالي (M, L, XL, 2XL)
                  </span>
                  <span className="bg-[#141414] border border-[#222222] text-[#9a9a9a] text-[12px] px-4 py-2 rounded-[16px] cursor-pointer hover:text-white transition-all">
                    مقاس حريمي (S, M, L)
                  </span>
                  <span className="bg-[#141414] border border-[#222222] text-[#9a9a9a] text-[12px] px-4 py-2 rounded-[16px] cursor-pointer hover:text-white transition-all">
                    مقاسات أطفال
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#141414] text-center text-[11px] text-[#666666]">
                Typebot Powered Engine — مدمج مع قاعدة بيانات المتجر عبر Webhook
              </div>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}
