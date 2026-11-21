'use client';

import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Activity, 
  AlertCircle, 
  ShieldCheck, 
  Search, 
  Plus, 
  CheckCircle2, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

export default function HealthAdjustmentsPage() {
  const [injuries, setInjuries] = useState([
    {
      id: 1,
      clientName: 'عمر حسن',
      condition: 'خشونة خفيفة في صابونة الركبة اليمنى',
      status: 'active',
      restrictions: 'ممنوع السكوات الحر بأوزان قصوى — استبداله بـ Hack Squat و Leg Press',
      lastReview: 'منذ 3 أيام',
      doctorApproved: true
    },
    {
      id: 2,
      clientName: 'محمود صابر',
      condition: 'شد بسيط في العضلة الضامة اليسرى',
      status: 'active',
      restrictions: 'إحماء ديناميكي 10 دقائق + تجنب فتحات الحوض الواسعة في تمرين السومو',
      lastReview: 'منذ 5 أيام',
      doctorApproved: true
    },
    {
      id: 3,
      clientName: 'كريم جلال',
      condition: 'التهاب وتر الكتف (Rotator Cuff)',
      status: 'recovering',
      restrictions: 'تجنب البنش برس العريض — اللعب بالدمبل بزاوية 45 درجة',
      lastReview: 'منذ أسبوع',
      doctorApproved: true
    }
  ]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans" dir="rtl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
          <HeartHandshake className="text-[#a78bfa]" /> التعديلات الصحية وإدارة الإصابات
        </h1>
        <p className="text-xs text-white/50 mt-1">
          رصد الحالات الطبية للاعبين، وتعديل زوايا التمارين آلياً لحماية المفاصل والأوتار وفق التوصيات العلمية.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {injuries.map(item => (
          <div
            key={item.id}
            className="bg-[#111116] border border-white/5 hover:border-[#7C3AED]/40 rounded-3xl p-6 space-y-4 transition shadow-lg"
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-white bg-[#1e1338] border border-[#7C3AED]/30 px-3 py-1 rounded-full text-[#c4b5fd]">
                {item.clientName}
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                <ShieldCheck size={11} /> تحت المتابعة
              </span>
            </div>

            <div>
              <h3 className="font-bold text-sm text-rose-400 flex items-center gap-1.5">
                <AlertCircle size={15} /> {item.condition}
              </h3>
              <p className="text-xs text-white/70 mt-2 bg-[#0b0a10] p-3 rounded-2xl border border-white/5 leading-relaxed">
                <span className="text-amber-400 font-bold block mb-1">البروتوكول الآمن:</span>
                {item.restrictions}
              </p>
            </div>

            <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[11px] text-white/40">
              <span>آخر مراجعة: {item.lastReview}</span>
              <button
                onClick={() => toast.success('تم إرسال بروتوكول التعديل الحركي للاعب')}
                className="text-[#a78bfa] hover:underline font-bold"
              >
                تحديث البروتوكول &larr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
