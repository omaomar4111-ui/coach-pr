"use client";

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

function ClientProfileContent() {
  const params = useParams();
  const clientId = (params?.id as string) || "client-1";

  const [client, setClient] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/clients?id=${clientId}`)
      .then(res => res.json())
      .then(data => {
        if (data?.client) {
          setClient(data.client);
        } else {
          setClient({
            id: clientId,
            name: "محمود حسن السيد",
            phone: "01099238411",
            goal: "تنشيف وخسارة دهون وإبراز عضلات البطن",
            injuries: ["خشونة خفيفة في الركبة اليمنى - تجنب السكوات الحر بأوزان قصوى"],
            medicalNotes: "حساسية من اللاكتوز (يفضل وي آيسوليت أو بروتين نباتي)",
            attachments: []
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setClient({
          id: clientId,
          name: "محمود حسن السيد",
          phone: "01099238411",
          goal: "تنشيف وخسارة دهون وإبراز عضلات البطن",
          injuries: ["خشونة خفيفة في الركبة اليمنى - تجنب السكوات الحر بأوزان قصوى"],
          medicalNotes: "حساسية من اللاكتوز (يفضل وي آيسوليت أو بروتين نباتي)",
          attachments: []
        });
        setLoading(false);
      });
  }, [clientId]);

  if (loading) {
    return <div className="p-8 text-white">جاري تحميل ملف العميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Link href="/dashboard" className="text-[#7C3AED] hover:underline mb-4 inline-block text-sm font-bold">
          &rarr; العودة للوحة التحكم
        </Link>
        <h1 className="text-3xl font-bold">{client.name}</h1>
        <p className="text-gray-400 mt-1 text-sm">الهدف: {client.goal || 'غير محدد'} | الهاتف: {client.phone}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#111] p-6 rounded-xl border border-gray-800 space-y-2">
          <h2 className="text-lg font-bold text-red-400">التاريخ الطبي وحماية المفاصل</h2>
          <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
            {typeof client.injuries === 'string' ? client.injuries : (Array.isArray(client.injuries) ? client.injuries.join(', ') : 'لا توجد إصابات مسجلة')}
          </p>
          {(client.medicalNotes || client.medical_notes) && (
            <div className="pt-2 border-t border-gray-800 text-xs text-amber-400">
              ملاحظة الكابتن: {client.medicalNotes || client.medical_notes}
            </div>
          )}
        </div>
        
        <div className="bg-[#111] p-6 rounded-xl border border-gray-800 space-y-2">
          <h2 className="text-lg font-bold text-blue-400">الملفات المرفقة وفحص التكنيك</h2>
          <p className="text-gray-400 text-sm">
            {client.attachments && client.attachments.length > 0 
              ? `${client.attachments.length} ملفات وتحاليل مرفوعة في الخزنة الطبية المشفرة`
              : 'لا توجد ملفات مرفوعة حالياً.'}
          </p>
          <div className="pt-2">
            <Link href="/dashboard/formcheck" className="text-xs text-purple-400 hover:underline">
              فتح شاشة مراجعة الفيديوهات (Form Check) ←
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <Link href="/dashboard/builder" className="bg-[#7C3AED] px-6 py-2.5 rounded-lg font-bold hover:bg-purple-700 transition text-sm">
          فتح وتعديل خطة التمرين
        </Link>
        <Link href="/dashboard/nutrition" className="bg-gray-800 px-6 py-2.5 rounded-lg font-bold hover:bg-gray-700 transition text-sm">
          فتح خطة الدايت والماكروز
        </Link>
      </div>
    </div>
  );
}

export default function ClientProfilePage() {
  return (
    <div className="p-8 bg-[#07040D] min-h-screen text-white font-sans" dir="rtl">
      <Suspense fallback={<div className="p-8 text-white">جاري تحميل ملف العميل...</div>}>
        <ClientProfileContent />
      </Suspense>
    </div>
  );
}
