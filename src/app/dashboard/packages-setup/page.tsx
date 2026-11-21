'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Package, 
  Check, 
  Trash2, 
  Clock, 
  Sparkles, 
  FileCheck, 
  CreditCard,
  Edit3
} from 'lucide-react';
import { toast } from 'sonner';

export default function PackagesSetupPage() {
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: 'باقة التحول البدني الشامل (3 شهور)',
      price: 2200,
      duration: '3 شهور',
      description: 'جدول تدريب مخصص يتغير كل 4 أسابيع + دايت تفصيلي بالجرامات + مراجعة تكنيك أسبوعية.',
      features: ['جدول تمرين كامل PWA', 'دايت بالماكروز وبدائل الأغذية', 'فحص تكنيك أسبوعي', 'دعم واتساب مباشر']
    },
    {
      id: 2,
      name: 'باقة المتابعة الشهرية (VIP Monthly)',
      price: 900,
      duration: 'شهر واحد',
      description: 'متابعة أسبوعية دقيقة مع تقييم مؤشرات الجاهزية والنوم والاستشفاء.',
      features: ['خطة تدريب وتغذية', 'Check-in أسبوعي بالصور والمقاسات', 'تعديل مستمر للأحمال التدريبية']
    },
    {
      id: 3,
      name: 'باقة تحضير البطولات والقوة القصوى (6 شهور)',
      price: 4500,
      duration: '6 شهور',
      description: 'إشراف كامل على بروتوكولات القوة وPeak Week وتفاصيل التغذية التنافسية.',
      features: ['Peak Week Protocol', 'متابعة يومية بالواتساب', 'تحليل فيديوهات Form Check بلا حدود']
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('شهر واحد');
  const [desc, setDesc] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) {
      toast.error('يرجى ملء الاسم والسعر');
      return;
    }

    setPackages([...packages, {
      id: Date.now(),
      name,
      price: Number(price),
      duration,
      description: desc || 'باقة تدريب ومتابعة متكاملة.',
      features: ['تطبيق لاعب PWA أوفلاين', 'دايت وماكروز مخصصة', 'متابعة تكنيك']
    }]);

    toast.success('تمت إضافة حزمة التدريب بنجاح!');
    setShowModal(false);
    setName('');
    setPrice('');
    setDesc('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans" dir="rtl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <Package className="text-[#a78bfa]" /> حزم وباقات التهيئة (Packages Setup)
          </h1>
          <p className="text-xs text-white/50 mt-1">
            إعداد باقات التدريب الخاصة بك، وتحديد الأسعار وفترات الاشتراك التي تظهر للاعبين في فورم الاستقبال وروابط الدفع.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-5 py-2.5 rounded-2xl text-xs font-extrabold transition flex items-center gap-1.5 shadow-lg shadow-[#7C3AED]/30 cursor-pointer"
        >
          <Plus size={16} /> إنشاء باقة جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {packages.map(pkg => (
          <div
            key={pkg.id}
            className="bg-[#111116] border border-white/5 hover:border-[#7C3AED]/40 rounded-3xl p-6 space-y-4 transition flex flex-col justify-between group shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono font-bold bg-[#1e1338] text-[#c4b5fd] border border-[#7C3AED]/30 px-2.5 py-1 rounded-full">
                  {pkg.duration}
                </span>
                <span className="text-xs text-white/40 font-mono">
                  EGP
                </span>
              </div>

              <h3 className="font-bold text-white text-base group-hover:text-[#c4b5fd] transition leading-snug">
                {pkg.name}
              </h3>

              <div className="flex items-baseline gap-1 py-1">
                <span className="text-3xl font-black font-mono text-white">{pkg.price.toLocaleString()}</span>
                <span className="text-xs text-white/40 font-bold">جنيه مصري</span>
              </div>

              <p className="text-xs text-white/50 leading-relaxed">
                {pkg.description}
              </p>

              <div className="space-y-1.5 pt-2 border-t border-white/5">
                {pkg.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/70">
                    <Check size={13} className="text-[#a78bfa] shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <button
                onClick={() => toast.success('تم نسخ رابط الاشتراك الخاص بالباقة')}
                className="bg-[#1e1338] hover:bg-[#7C3AED] hover:text-white text-[#c4b5fd] border border-[#7C3AED]/30 px-3.5 py-1.5 rounded-xl text-xs font-bold transition"
              >
                نسخ رابط الاشتراك 🔗
              </button>

              <button
                onClick={() => {
                  setPackages(packages.filter(p => p.id !== pkg.id));
                  toast.success('تم حذف الباقة');
                }}
                className="text-white/30 hover:text-rose-400 transition p-1.5"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111116] border border-[#7C3AED]/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl animate-in fade-in">
            <h2 className="text-lg font-black text-white">إضافة باقة تدريبية جديدة</h2>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white/60 block mb-1.5">اسم الباقة</label>
                <input
                  type="text"
                  placeholder="مثال: باقة الأبطال 3 شهور"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-[#181524] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-white/60 block mb-1.5">السعر (جنيه مصري)</label>
                  <input
                    type="number"
                    placeholder="1500"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    className="w-full bg-[#181524] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-white/60 block mb-1.5">مدة الاشتراك</label>
                  <select
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                    className="w-full bg-[#181524] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
                  >
                    <option value="شهر واحد">شهر واحد</option>
                    <option value="3 شهور">3 شهور</option>
                    <option value="6 شهور">6 شهور</option>
                    <option value="سنة كاملة">سنة كاملة</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-white/60 block mb-1.5">وصف ومميزات الباقة</label>
                <textarea
                  rows={3}
                  placeholder="ملاحظات المتابعة وعدد الـ Check-ins..."
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  className="w-full bg-[#181524] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-white/50 hover:text-white"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-lg shadow-[#7C3AED]/30"
                >
                  حفظ الباقة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
