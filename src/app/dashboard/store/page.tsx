'use client';

import React, { useState } from 'react';
import { 
  Store, 
  Plus, 
  ShoppingBag, 
  Download, 
  ExternalLink, 
  Sparkles, 
  DollarSign, 
  Eye, 
  Copy,
  Tag
} from 'lucide-react';
import { toast } from 'sonner';

export default function StorePage() {
  const [products, setPackages] = useState([
    {
      id: 1,
      title: 'كتاب ومخطط التضخيم العضلي الخالي من إصابات المفاصل (E-Book)',
      type: 'كتاب إلكتروني PDF',
      price: 250,
      salesCount: 48,
      status: 'active',
      desc: 'دليل شامل لضبط زوايا التمارين والتغذية التضخيمية النظيفة مع جداول جاهزة للتطبيق الفوري.'
    },
    {
      id: 2,
      title: 'برنامج Push/Pull/Legs 6 Days المتقدم',
      type: 'خطة تدريبية جاهزة',
      price: 450,
      salesCount: 62,
      status: 'active',
      desc: 'جدول تدريب احترافي لتكرار العضلة مرتين أسبوعياً مع فيديوهات توضيحية لجميع التمارين.'
    },
    {
      id: 3,
      title: 'حاسبة الماكروز والدايت التفاعلية الذكية (Smart Sheet)',
      type: 'أداة تفاعلية',
      price: 180,
      salesCount: 110,
      status: 'active',
      desc: 'شيت متقدم لحساب السعرات ومصادر البروتين والكارب مع تعديل الكميات تلقائياً.'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('خطة تدريبية جاهزة');
  const [desc, setDesc] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) {
      toast.error('يرجى ملء العنوان والسعر');
      return;
    }

    setPackages([...products, {
      id: Date.now(),
      title,
      price: Number(price),
      type,
      salesCount: 0,
      status: 'active',
      desc: desc || 'منتج تدريبي رقمي احترافي.'
    }]);

    toast.success('تم نشر المنتج التدريبي في متجرك الخاص بنجاح!');
    setShowModal(false);
    setTitle('');
    setPrice('');
    setDesc('');
  };

  const totalSales = products.reduce((acc, p) => acc + (p.price * p.salesCount), 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans" dir="rtl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <Store className="text-[#a78bfa]" /> متجر CoachPR الرقمي
          </h1>
          <p className="text-xs text-white/50 mt-1">
            بيع البرامج التدريبية الجاهزة، والكتب الإلكترونية، واستشارات الـ Form Check لمتابعيك بدون وسيط.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-5 py-2.5 rounded-2xl text-xs font-extrabold transition flex items-center gap-1.5 shadow-lg shadow-[#7C3AED]/30 cursor-pointer"
        >
          <Plus size={16} /> إضافة منتج تدريبي
        </button>
      </div>

      {/* Sales Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#111116] border border-white/5 p-5 rounded-3xl space-y-1">
          <span className="text-xs text-white/40 block">مبيعات المتجر التراكمية</span>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-black font-mono text-white">{totalSales.toLocaleString()}</h2>
            <span className="text-xs text-[#a78bfa] font-mono">EGP</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold block pt-1">تحصيل فوري عبر InstaPay & Vodafone Cash</span>
        </div>

        <div className="bg-[#111116] border border-white/5 p-5 rounded-3xl space-y-1">
          <span className="text-xs text-white/40 block">إجمالي المنتجات المباعة</span>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-black font-mono text-white">220</h2>
            <span className="text-xs text-white/40 font-bold">نسخة محملة</span>
          </div>
        </div>

        <div className="bg-[#111116] border border-white/5 p-5 rounded-3xl space-y-1">
          <span className="text-xs text-white/40 block">رابط متجرك العام</span>
          <button
            onClick={() => toast.success('تم نسخ رابط متجرك لمشاركته على إنستجرام وفيسبوك')}
            className="text-xs text-[#c4b5fd] hover:text-white bg-[#1e1338] border border-[#7C3AED]/30 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 mt-2 transition"
          >
            <Copy size={13} /> نسخ رابط المتجر العام
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {products.map(p => (
          <div
            key={p.id}
            className="bg-[#111116] border border-white/5 hover:border-[#7C3AED]/40 rounded-3xl p-6 space-y-4 transition flex flex-col justify-between group shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono font-bold bg-[#1e1338] text-[#c4b5fd] border border-[#7C3AED]/30 px-2.5 py-1 rounded-full">
                  {p.type}
                </span>
                <span className="text-xs text-emerald-400 font-mono">
                  {p.salesCount} مبيعة
                </span>
              </div>

              <h3 className="font-bold text-white text-base group-hover:text-[#c4b5fd] transition leading-snug">
                {p.title}
              </h3>

              <div className="flex items-baseline gap-1 py-1">
                <span className="text-3xl font-black font-mono text-white">{p.price}</span>
                <span className="text-xs text-white/40 font-bold">EGP</span>
              </div>

              <p className="text-xs text-white/50 leading-relaxed">
                {p.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <button
                onClick={() => toast.success('تم نسخ رابط شراء المنتج')}
                className="bg-[#1e1338] hover:bg-[#7C3AED] hover:text-white text-[#c4b5fd] border border-[#7C3AED]/30 px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1"
              >
                <ShoppingBag size={13} /> رابط الشراء المباشر
              </button>

              <button
                onClick={() => toast.info('معاينة المنتج متاحة للمشترين')}
                className="text-white/40 hover:text-white text-xs font-bold p-1"
              >
                <Eye size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111116] border border-[#7C3AED]/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl animate-in fade-in">
            <h2 className="text-lg font-black text-white">إضافة منتج تدريبي لمتجرك</h2>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white/60 block mb-1.5">عنوان المنتج أو الخطة</label>
                <input
                  type="text"
                  placeholder="مثال: نظام الـ Upper/Lower المطور"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-[#181524] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-white/60 block mb-1.5">السعر (جنيه مصري)</label>
                  <input
                    type="number"
                    placeholder="350"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    className="w-full bg-[#181524] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-white/60 block mb-1.5">نوع المنتج</label>
                  <select
                    value={type}
                    onChange={e => setType(e.target.value)}
                    className="w-full bg-[#181524] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
                  >
                    <option value="خطة تدريبية جاهزة">خطة تدريبية جاهزة</option>
                    <option value="كتاب إلكتروني PDF">كتاب إلكتروني PDF</option>
                    <option value="شيت تفاعلي ماكروز">شيت تفاعلي ماكروز</option>
                    <option value="جلسة فحص تكنيك فيديو">جلسة فحص تكنيك فيديو</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-white/60 block mb-1.5">وصف ومحتوى المنتج</label>
                <textarea
                  rows={3}
                  placeholder="ما الذي سيحصل عليه المشتري بالتفصيل..."
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
                  نشر في المتجر
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
