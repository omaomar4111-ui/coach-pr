'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Utensils, 
  Search, 
  Plus, 
  Trash2, 
  Flame, 
  PieChart, 
  ArrowRight, 
  Sparkles,
  Dumbbell,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface FoodItem {
  id: string;
  name: string;
  category: 'protein' | 'carbs' | 'fats' | 'mixed';
  servingGrams: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface MealItem {
  food: FoodItem;
  amountGrams: number;
}

export default function NutritionMacrosPage() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [mealItems, setMealItems] = useState<MealItem[]>([
    {
      food: { id: 'f-1', name: 'صدور دجاج مخلية مشوية', category: 'protein', servingGrams: 100, calories: 165, protein: 31, carbs: 0, fats: 3.6 },
      amountGrams: 200
    },
    {
      food: { id: 'f-8', name: 'أرز أبيض مصري مطبوخ', category: 'carbs', servingGrams: 100, calories: 130, protein: 2.7, carbs: 28, fats: 0.3 },
      amountGrams: 200
    },
    {
      food: { id: 'f-15', name: 'زيت زيتون بكر ممتاز (ملعقة طعام ~14 جم)', category: 'fats', servingGrams: 14, calories: 119, protein: 0, carbs: 0, fats: 13.5 },
      amountGrams: 14
    }
  ]);

  useEffect(() => {
    fetch('/api/nutrition/foods')
      .then(res => res.json())
      .then(data => {
        if (data.foods) setFoods(data.foods);
      })
      .catch(console.error);
  }, []);

  const filteredFoods = foods.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'all' || f.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const addFoodToMeal = (food: FoodItem) => {
    setMealItems(prev => [...prev, { food, amountGrams: food.servingGrams }]);
  };

  const removeFoodFromMeal = (index: number) => {
    setMealItems(prev => prev.filter((_, i) => i !== index));
  };

  const updateAmount = (index: number, grams: number) => {
    setMealItems(prev => {
      const updated = [...prev];
      updated[index].amountGrams = Math.max(10, grams);
      return updated;
    });
  };

  // Calculations
  const totalCalories = Math.round(
    mealItems.reduce((acc, item) => acc + (item.food.calories * item.amountGrams) / item.food.servingGrams, 0)
  );
  const totalProtein = Math.round(
    mealItems.reduce((acc, item) => acc + (item.food.protein * item.amountGrams) / item.food.servingGrams, 0)
  );
  const totalCarbs = Math.round(
    mealItems.reduce((acc, item) => acc + (item.food.carbs * item.amountGrams) / item.food.servingGrams, 0)
  );
  const totalFats = Math.round(
    mealItems.reduce((acc, item) => acc + (item.food.fats * item.amountGrams) / item.food.servingGrams, 0)
  );

  return (
    <div className="min-h-screen bg-background text-white font-sans p-6 sm:p-10 selection:bg-[#d4f60b] selection:text-black" dir="rtl">
      
      {/* Header */}
      <header className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-white/5 pb-6">
        <div>
          <Link href="/dashboard" className="text-white/40 hover:text-[#d4f60b] mb-2 inline-flex items-center gap-1.5 text-xs font-semibold transition">
            <ArrowRight size={14} /> العودة للوحة التحكم
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white">مكتبة الأكلات والماكروز المصرية</h1>
            <span className="bg-[#161c10] border border-[#d4f60b]/30 text-[#d4f60b] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              Nutrition Builder
            </span>
          </div>
          <p className="text-xs text-white/50 mt-1">
            تصميم وتوزيع الوجبات المحسوبة السعرات والجرامات بدقة لمطابقة أهداف البطل في الضخامة أو التنشيف.
          </p>
        </div>

        <Link
          href="/dashboard/builder"
          className="bg-surface border border-white/10 hover:border-[#d4f60b] text-[#d4f60b] px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
        >
          <Dumbbell size={14} /> باني جداول التمارين
        </Link>
      </header>

      {/* Main Layout */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Current Meal Plan & Total Macros */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Total Macros Summary Card */}
          <div className="bg-card border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div>
                <span className="text-[11px] text-white/40 font-bold block">إجمالي الطاقة المحسوبة</span>
                <span className="text-3xl font-mono font-black text-white">{totalCalories} <span className="text-xs font-normal text-white/50">سعرة حرارية</span></span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-surface border border-white/10 flex items-center justify-center text-[#d4f60b]">
                <Flame size={24} />
              </div>
            </div>

            {/* Macro Bars */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-surface border border-white/10 rounded-2xl p-3 text-center">
                <span className="text-[10px] text-indigo-400 font-bold block">بروتين (Protein)</span>
                <span className="text-xl font-mono font-black text-white">{totalProtein}g</span>
              </div>
              <div className="bg-surface border border-white/10 rounded-2xl p-3 text-center">
                <span className="text-[10px] text-amber-400 font-bold block">كاربوهيدرات (Carbs)</span>
                <span className="text-xl font-mono font-black text-white">{totalCarbs}g</span>
              </div>
              <div className="bg-surface border border-white/10 rounded-2xl p-3 text-center">
                <span className="text-[10px] text-rose-400 font-bold block">دهون صحية (Fats)</span>
                <span className="text-xl font-mono font-black text-white">{totalFats}g</span>
              </div>
            </div>
          </div>

          {/* Active Plate / Ingredients */}
          <div className="bg-card border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Utensils size={15} className="text-[#d4f60b]" /> مكونات وجبة البطل
            </h3>

            <div className="space-y-3">
              {mealItems.length === 0 ? (
                <p className="text-xs text-white/40 text-center py-6">لم يتم إضافة أصناف بعد. اختر من القائمة.</p>
              ) : (
                mealItems.map((item, idx) => {
                  const itemCal = Math.round((item.food.calories * item.amountGrams) / item.food.servingGrams);
                  const itemProt = Math.round((item.food.protein * item.amountGrams) / item.food.servingGrams);
                  return (
                    <div key={idx} className="bg-surface border border-white/10 rounded-2xl p-3.5 flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-white">{item.food.name}</h4>
                        <span className="text-[10px] text-white/40 block mt-0.5">
                          {itemCal} سعرة &bull; {itemProt}g بروتين
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <input 
                          type="number"
                          step="10"
                          value={item.amountGrams}
                          onChange={e => updateAmount(idx, parseFloat(e.target.value) || 0)}
                          className="w-16 bg-card border border-white/10 rounded-xl text-center font-mono font-bold text-xs py-1.5 text-[#d4f60b] focus:outline-none"
                        />
                        <span className="text-[10px] text-white/40">جم</span>

                        <button 
                          onClick={() => removeFoodFromMeal(idx)}
                          className="text-white/30 hover:text-rose-400 transition p-1"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <button className="w-full bg-[#d4f60b] hover:bg-[#c2e205] text-black font-extrabold py-3 rounded-2xl text-xs transition mt-2 shadow-lg shadow-[#d4f60b]/20 cursor-pointer">
              حفظ وتوزيع خطة الوجبة للاعب 🚀
            </button>
          </div>

        </div>

        {/* Right: Egyptian Local Food Database */}
        <div className="lg:col-span-7 bg-card border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h2 className="text-base font-extrabold text-white">قاعدة بيانات الأغذية والماكروز</h2>
              <p className="text-[11px] text-white/40">أكلات مصرية وعربية محسوبة الحصص بدقة بالجرام</p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-1.5 bg-surface p-1 rounded-2xl border border-white/10 text-[11px]">
              {[
                { id: 'all', label: 'الكل' },
                { id: 'protein', label: 'بروتين' },
                { id: 'carbs', label: 'كارب' },
                { id: 'fats', label: 'دهون' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-xl font-bold transition ${
                    selectedCategory === cat.id 
                      ? 'bg-[#d4f60b] text-black' 
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search size={15} className="absolute right-4 top-3.5 text-white/40" />
            <input 
              type="text"
              placeholder="ابحث عن أكلة (دجاج، جبنة قريش، شوفان، بلطي، أرز...)"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-surface border border-white/10 rounded-2xl pr-11 pl-4 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#d4f60b] transition"
            />
          </div>

          {/* Foods Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto no-scrollbar pr-1">
            {filteredFoods.map(food => (
              <div 
                key={food.id}
                className="bg-surface border border-white/10 hover:border-[#d4f60b]/40 rounded-2xl p-4 flex flex-col justify-between gap-3 transition group"
              >
                <div>
                  <div className="flex justify-between items-start gap-1">
                    <h4 className="text-xs font-bold text-white group-hover:text-[#d4f60b] transition leading-tight">
                      {food.name}
                    </h4>
                    <span className="text-[10px] text-white/30 shrink-0 font-mono">
                      لكل {food.servingGrams}جم
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-3 text-[11px] font-mono text-white/60">
                    <span className="text-[#d4f60b] font-bold">{food.calories} cal</span>
                    <span>P: {food.protein}g</span>
                    <span>C: {food.carbs}g</span>
                    <span>F: {food.fats}g</span>
                  </div>
                </div>

                <button 
                  onClick={() => addFoodToMeal(food)}
                  className="w-full bg-card hover:bg-[#d4f60b] hover:text-black border border-white/10 text-white/80 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} /> إضافة للوجبة
                </button>
              </div>
            ))}
          </div>

        </div>

      </main>

    </div>
  );
}
