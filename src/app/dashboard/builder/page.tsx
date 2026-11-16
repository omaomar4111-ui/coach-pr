'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Plus, Trash2, Save } from 'lucide-react';

export default function WorkoutBuilder() {
  const [days, setDays] = useState([
    { 
      id: 1, 
      name: 'اليوم الأول - دفع (Push)', 
      exercises: [
        { id: 1, name: 'بنش برس بالبار (Barbell Bench Press)', sets: 4, reps: '8-10' },
        { id: 2, name: 'تجميع دمبل مائل عالي (Incline Dumbbell Press)', sets: 3, reps: '10-12' },
        { id: 3, name: 'ترايسبس حبل (Triceps Rope Pushdown)', sets: 4, reps: '12-15' },
      ] 
    },
    {
      id: 2,
      name: 'اليوم الثاني - سحب (Pull)',
      exercises: [
        { id: 4, name: 'سحب عالي واسع (Lat Pulldown)', sets: 4, reps: '8-10' },
        { id: 5, name: 'سحب أرضي كابل (Seated Cable Row)', sets: 3, reps: '10-12' },
        { id: 6, name: 'تبادل بايسبس دمبل (Incline DB Curl)', sets: 4, reps: '10-12' },
      ]
    }
  ]);

  const addDay = () => {
    setDays([...days, { id: Date.now(), name: `اليوم ${days.length + 1}`, exercises: [] }]);
  };

  const removeDay = (dayId: number) => {
    setDays(days.filter(d => d.id !== dayId));
  };

  const addExercise = (dayId: number) => {
    setDays(days.map(d => d.id === dayId ? { ...d, exercises: [...d.exercises, { id: Date.now(), name: 'تمرين جديد', sets: 3, reps: '10-12' }] } : d));
  };

  const removeExercise = (dayId: number, exerciseId: number) => {
    setDays(days.map(d => d.id === dayId ? { ...d, exercises: d.exercises.filter(ex => ex.id !== exerciseId) } : d));
  };

  const handleSave = () => {
    alert('تم حفظ الخطة التدريبية بنجاح للكابتن!');
  };

  return (
    <div className="p-8 bg-[#07040D] min-h-screen text-white max-w-5xl mx-auto font-sans" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link href="/dashboard" className="text-[#7C3AED] hover:underline mb-2 inline-block text-sm flex items-center gap-1 font-bold">
            <ChevronLeft size={16} /> العودة للوحة التحكم
          </Link>
          <h1 className="text-3xl font-bold">محرر التمارين (Workout Builder)</h1>
          <p className="text-xs text-slate-400 mt-1">تصميم وتخصيص الجداول التدريبية والأحمال للأبطال</p>
        </div>
        <button onClick={handleSave} className="bg-[#10B981] px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-emerald-600 transition text-black font-bold text-sm shadow-lg shadow-emerald-950">
          <Save size={18} /> حفظ الخطة التدريبية
        </button>
      </div>

      <div className="space-y-6">
        {days.map(day => (
          <div key={day.id} className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden shadow-xl">
            <div className="p-4 bg-black/40 border-b border-gray-800 flex justify-between items-center">
              <input 
                type="text" 
                value={day.name} 
                onChange={e => {
                  const val = e.target.value;
                  setDays(days.map(d => d.id === day.id ? { ...d, name: val } : d));
                }}
                className="bg-transparent font-bold text-lg text-[#a78bfa] focus:outline-none" 
              />
              <button onClick={() => removeDay(day.id)} className="text-red-400 hover:text-red-300 transition" title="حذف اليوم">
                <Trash2 size={18} />
              </button>
            </div>
            <div className="p-4 space-y-3">
              {day.exercises.map((ex, index) => (
                <div key={ex.id} className="flex gap-4 items-center bg-[#1a1a1a] p-3 rounded-lg border border-gray-800/50">
                  <span className="text-gray-500 font-mono text-sm">{index + 1}</span>
                  <input 
                    type="text" 
                    value={ex.name} 
                    onChange={e => {
                      const val = e.target.value;
                      setDays(days.map(d => d.id === day.id ? { ...d, exercises: d.exercises.map(item => item.id === ex.id ? { ...item, name: val } : item) } : d));
                    }}
                    className="flex-1 bg-transparent font-medium focus:outline-none text-sm text-white" 
                  />
                  <input 
                    type="number" 
                    value={ex.sets} 
                    onChange={e => {
                      const val = Number(e.target.value);
                      setDays(days.map(d => d.id === day.id ? { ...d, exercises: d.exercises.map(item => item.id === ex.id ? { ...item, sets: val } : item) } : d));
                    }}
                    className="w-16 bg-black/50 border border-gray-700 rounded p-2 text-center text-sm text-white" 
                  />
                  <span className="text-gray-400 text-xs">مجموعات</span>
                  <input 
                    type="text" 
                    value={ex.reps} 
                    onChange={e => {
                      const val = e.target.value;
                      setDays(days.map(d => d.id === day.id ? { ...d, exercises: d.exercises.map(item => item.id === ex.id ? { ...item, reps: val } : item) } : d));
                    }}
                    className="w-20 bg-black/50 border border-gray-700 rounded p-2 text-center text-sm text-white" 
                  />
                  <span className="text-gray-400 text-xs">تكرار</span>
                  <button onClick={() => removeExercise(day.id, ex.id)} className="text-slate-500 hover:text-rose-400 text-xs px-2 py-1">
                    ✕
                  </button>
                </div>
              ))}
              <button onClick={() => addExercise(day.id)} className="text-xs text-[#a78bfa] hover:text-white flex items-center gap-1.5 mt-3 font-semibold">
                <Plus size={16} /> إضافة تمرين جديد
              </button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={addDay} className="w-full mt-6 py-4 border-2 border-dashed border-gray-800 rounded-xl text-gray-400 hover:text-[#7C3AED] hover:border-[#7C3AED] transition flex justify-center items-center gap-2 font-bold text-sm bg-white/[0.02]">
        <Plus size={20} /> إضافة يوم تدريبي جديد
      </button>
    </div>
  );
}
