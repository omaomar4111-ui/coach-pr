'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sliders, 
  Search, 
  Plus, 
  Dumbbell, 
  Check, 
  ShieldAlert, 
  ShieldCheck, 
  Video, 
  Info,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

export default function ExercisesCatalogPage() {
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [muscle, setMuscle] = useState('chest');
  const [equipment, setEquipment] = useState('barbell');
  const [cues, setCues] = useState('');
  const [kneeFriendly, setKneeFriendly] = useState(true);

  const fetchExercises = () => {
    fetch('/api/exercises')
      .then(res => res.json())
      .then(data => {
        if (data?.exercises) setExercises(data.exercises);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const handleCreateExercise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameAr) {
      toast.error('اسم التمرين بالعربي مطلوب');
      return;
    }

    fetch('/api/exercises', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name_ar: nameAr,
        name_en: nameEn || nameAr,
        target_muscle: muscle,
        equipment,
        cues_ar: cues,
        knee_friendly: kneeFriendly
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data?.success) {
          toast.success('تمت إضافة التمرين إلى بنك التمارين بنجاح!');
          setShowAddModal(false);
          setNameAr('');
          setNameEn('');
          setCues('');
          fetchExercises();
        }
      })
      .catch(() => toast.error('حدث خطأ أثناء الإضافة'));
  };

  const filteredExercises = exercises.filter(ex => {
    const matchesMuscle = selectedMuscle === 'all' || ex.target_muscle === selectedMuscle;
    const matchesSearch = ex.name_ar.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (ex.name_en && ex.name_en.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesMuscle && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans" dir="rtl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <Sliders className="text-[#a78bfa]" /> بنك التمارين والمفكرة الحركية
          </h1>
          <p className="text-xs text-white/50 mt-1">
            أكثر من 150+ تمرين معتمد مع تعليمات الأداء الصحيح ومؤشرات حماية مفاصل الركبة وأسفل الظهر.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-5 py-2.5 rounded-2xl text-xs font-extrabold transition flex items-center gap-1.5 shadow-lg shadow-[#7C3AED]/30 cursor-pointer"
        >
          <Plus size={16} /> إضافة تمرين مخصص
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-[#111116] border border-white/5 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-80">
          <Search size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="ابحث باسم التمرين أو الجهاز..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#181524] border border-white/10 rounded-xl py-2 pr-9 pl-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'all', label: 'كافة العضلات' },
            { id: 'chest', label: 'الصدر' },
            { id: 'back', label: 'الظهر' },
            { id: 'legs', label: 'الأرجل' },
            { id: 'shoulders', label: 'الأكتاف' },
            { id: 'arms', label: 'الذراعين' }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedMuscle(m.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedMuscle === m.id
                  ? 'bg-[#7C3AED] text-white shadow-sm shadow-[#7C3AED]/30'
                  : 'bg-[#181524] text-white/50 hover:text-white border border-white/5'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Exercises Table / List */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-[#7C3AED] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredExercises.length === 0 ? (
        <div className="bg-[#111116] border border-white/5 rounded-3xl p-12 text-center text-white/40 text-xs">
          لا توجد تمارين تطابق البحث الحالي.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredExercises.map(ex => (
            <div
              key={ex.id}
              className="bg-[#111116] border border-white/5 hover:border-[#7C3AED]/40 rounded-3xl p-5 space-y-3 transition group"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#1e1338] border border-[#7C3AED]/30 flex items-center justify-center text-[#c4b5fd]">
                    <Dumbbell size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm group-hover:text-[#c4b5fd] transition">
                      {ex.name_ar}
                    </h3>
                    <p className="text-[11px] text-white/40 font-mono">{ex.name_en}</p>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold bg-white/5 text-white/60 px-2.5 py-1 rounded-full">
                  {ex.equipment}
                </span>
              </div>

              {ex.cues_ar && (
                <div className="bg-[#0e0d14] p-3 rounded-2xl border border-white/5 text-xs text-white/70 leading-relaxed">
                  <span className="text-[#a78bfa] font-bold block mb-0.5">تعليمات الأداء الحركي (Cues):</span>
                  {ex.cues_ar}
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                <div className="flex items-center gap-2">
                  {ex.knee_friendly && (
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck size={11} /> آمن للركبة
                    </span>
                  )}
                  {ex.lower_back_safe && (
                    <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck size={11} /> آمن للظهر
                    </span>
                  )}
                </div>

                <button
                  onClick={() => toast.success(`تمت إضافة ${ex.name_ar} إلى خطة اليوم`)}
                  className="text-xs font-bold text-[#c4b5fd] hover:text-white bg-[#1e1338] border border-[#7C3AED]/30 px-3 py-1 rounded-xl transition"
                >
                  + إضافة للجلسة
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Exercise Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111116] border border-[#7C3AED]/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl animate-in fade-in">
            <h2 className="text-lg font-black text-white">إضافة تمرين جديد للبنك</h2>

            <form onSubmit={handleCreateExercise} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white/60 block mb-1.5">اسم التمرين بالعربي</label>
                <input
                  type="text"
                  placeholder="مثال: رفرفة كابل سفلي جانبي للكتف"
                  value={nameAr}
                  onChange={e => setNameAr(e.target.value)}
                  className="w-full bg-[#181524] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-white/60 block mb-1.5">الاسم بالإنجليزي (اختياري)</label>
                <input
                  type="text"
                  placeholder="Cable Lateral Raise"
                  value={nameEn}
                  onChange={e => setNameEn(e.target.value)}
                  className="w-full bg-[#181524] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-white/60 block mb-1.5">العضلة المستهدفة</label>
                  <select
                    value={muscle}
                    onChange={e => setMuscle(e.target.value)}
                    className="w-full bg-[#181524] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
                  >
                    <option value="chest">الصدر</option>
                    <option value="back">الظهر</option>
                    <option value="legs">الأرجل</option>
                    <option value="shoulders">الأكتاف</option>
                    <option value="arms">الذراعين</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-white/60 block mb-1.5">الجهاز / الأداة</label>
                  <select
                    value={equipment}
                    onChange={e => setEquipment(e.target.value)}
                    className="w-full bg-[#181524] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
                  >
                    <option value="barbell">بار حر (Barbell)</option>
                    <option value="dumbbell">دمبلز (Dumbbell)</option>
                    <option value="cable">كابل (Cable)</option>
                    <option value="machine">جهاز (Machine)</option>
                    <option value="bodyweight">وزن الجسم</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-white/60 block mb-1.5">تعليمات التكنيك وضبط المفاصل</label>
                <textarea
                  rows={2}
                  placeholder="تثبيت الكوع، مسار النزول، التنفس..."
                  value={cues}
                  onChange={e => setCues(e.target.value)}
                  className="w-full bg-[#181524] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="kneeCheck"
                  checked={kneeFriendly}
                  onChange={e => setKneeFriendly(e.target.checked)}
                  className="rounded border-white/20 text-[#7C3AED] focus:ring-0"
                />
                <label htmlFor="kneeCheck" className="text-xs text-white/70 cursor-pointer">
                  تمرين آمن على أوتار وصابونة الركبة
                </label>
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
                  حفظ التمرين
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
