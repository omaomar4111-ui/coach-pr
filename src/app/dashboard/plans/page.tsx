'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Plus, 
  Dumbbell, 
  Calendar, 
  Users, 
  ChevronRight, 
  Sparkles, 
  Search, 
  Copy, 
  Trash2, 
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { toast } from 'sonner';

export default function PlansLibraryPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('hypertrophy');
  const [newDays, setNewDays] = useState('4');
  const [newDesc, setNewDesc] = useState('');

  const fetchPlans = () => {
    fetch('/api/plans')
      .then(res => res.json())
      .then(data => {
        if (data?.plans) setPlans(data.plans);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) {
      toast.error('يرجى كتابة عنوان للخطة');
      return;
    }

    fetch('/api/plans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newTitle,
        category: newCategory,
        days_per_week: Number(newDays),
        description: newDesc
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data?.success) {
          toast.success('تم إنشاء الخطة التدريبية بنجاح!');
          setShowAddModal(false);
          setNewTitle('');
          setNewDesc('');
          fetchPlans();
        }
      })
      .catch(() => toast.error('حدث خطأ أثناء الإنشاء'));
  };

  const filteredPlans = plans.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans" dir="rtl">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <FileText className="text-[#a78bfa]" /> مكتبة الخطط التدريبية
          </h1>
          <p className="text-xs text-white/50 mt-1">
            إدارة النماذج التدريبية الأساسية، وتعيين الجداول للاعبين بضغطة زر واحدة.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/builder"
            className="bg-[#1e1338] border border-[#7C3AED]/40 hover:border-[#7C3AED] text-[#c4b5fd] px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-1.5"
          >
            <Sliders size={14} /> فتح منشئ الجلسات
          </Link>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-5 py-2.5 rounded-2xl text-xs font-extrabold transition flex items-center gap-1.5 shadow-lg shadow-[#7C3AED]/30 cursor-pointer"
          >
            <Plus size={16} /> إضافة خطة جديدة
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#111116] border border-white/5 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-80">
          <Search size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="ابحث في الخطط أو العضلات المستهدفة..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#181524] border border-white/10 rounded-xl py-2 pr-9 pl-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'hypertrophy', label: 'تضخيم عضلي' },
            { id: 'strength', label: 'قوة بدنية' },
            { id: 'fat_loss', label: 'تنشيف وحرق' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === tab.id
                  ? 'bg-[#7C3AED] text-white shadow-sm shadow-[#7C3AED]/30'
                  : 'bg-[#181524] text-white/50 hover:text-white border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Plans Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-[#7C3AED] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredPlans.length === 0 ? (
        <div className="bg-[#111116] border border-white/5 rounded-3xl p-12 text-center text-white/40 text-xs">
          لا توجد خطط تطابق البحث.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPlans.map(plan => (
            <div
              key={plan.id}
              className="bg-[#111116] border border-white/5 hover:border-[#7C3AED]/40 rounded-3xl p-6 space-y-4 transition flex flex-col justify-between group shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono font-bold bg-[#7C3AED]/20 text-[#c4b5fd] border border-[#7C3AED]/30 px-2.5 py-1 rounded-full">
                    {plan.days_per_week || 4} أيام / أسبوع
                  </span>
                  <span className="text-[10px] text-white/40 font-mono">
                    {plan.category === 'hypertrophy' ? 'تضخيم' : plan.category === 'strength' ? 'قوة' : 'تنشيف'}
                  </span>
                </div>

                <h3 className="font-bold text-white text-base group-hover:text-[#c4b5fd] transition leading-snug">
                  {plan.title}
                </h3>

                <p className="text-white/50 text-xs leading-relaxed line-clamp-3">
                  {plan.description || 'خطة تدريبية متوازنة لزيادة الأحمال وضمان استشفاء الألياف العضلية.'}
                </p>

                {plan.days && plan.days.length > 0 && (
                  <div className="pt-2 border-t border-white/5 space-y-1.5">
                    {plan.days.slice(0, 3).map((d: any, idx: number) => (
                      <div key={idx} className="flex justify-between text-[11px] text-white/60">
                        <span>{d.name}</span>
                        <span className="font-mono text-white/30">{d.sets} مجموعة</span>
                      </div>
                    ))}
                    {plan.days.length > 3 && (
                      <p className="text-[10px] text-[#a78bfa] pt-1">+ {plan.days.length - 3} أيام تدريبية أخرى</p>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <Link
                  href="/dashboard/builder"
                  className="bg-[#1e1338] hover:bg-[#7C3AED] hover:text-white text-[#c4b5fd] border border-[#7C3AED]/40 px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1"
                >
                  <Dumbbell size={13} /> تخصيص وتعديل
                </Link>

                <button
                  onClick={() => toast.success('تم نسخ الخطة وإضافتها للاعب المحدد')}
                  className="text-white/40 hover:text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Copy size={13} /> تعيين للاعب
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Plan Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111116] border border-[#7C3AED]/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl animate-in fade-in">
            <h2 className="text-lg font-black text-white">إضافة خطة تدريب جديدة</h2>

            <form onSubmit={handleCreatePlan} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white/60 block mb-1.5">عنوان الخطة</label>
                <input
                  type="text"
                  placeholder="مثال: بروتوكول تضخيم الصدر والأكتاف 5 أيام"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full bg-[#181524] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-white/60 block mb-1.5">التصنيف</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full bg-[#181524] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
                  >
                    <option value="hypertrophy">تضخيم عضلي</option>
                    <option value="strength">قوة بدنية</option>
                    <option value="fat_loss">تنشيف وحرق</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-white/60 block mb-1.5">أيام التمرين أسبوعياً</label>
                  <select
                    value={newDays}
                    onChange={e => setNewDays(e.target.value)}
                    className="w-full bg-[#181524] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
                  >
                    <option value="3">3 أيام</option>
                    <option value="4">4 أيام</option>
                    <option value="5">5 أيام</option>
                    <option value="6">6 أيام</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-white/60 block mb-1.5">وصف الخطة وملاحظات التحميل</label>
                <textarea
                  rows={3}
                  placeholder="ملاحظات المجموعات وتكرار العضلة..."
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  className="w-full bg-[#181524] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-white/50 hover:text-white"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-lg shadow-[#7C3AED]/30"
                >
                  حفظ الخطة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
