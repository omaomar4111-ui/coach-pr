"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Apple, 
  Flame, 
  Sparkles, 
  Plus, 
  Trash2, 
  ShoppingCart, 
  Search, 
  Save, 
  ArrowLeft, 
  Check, 
  Clock, 
  Scale, 
  Repeat,
  AlertTriangle,
  ChevronRight
} from "lucide-react";
import confetti from "canvas-confetti";

interface FoodItem {
  id: string;
  name: string;
  category: "بروتين" | "كاربوهيدرات" | "دهون صحية" | "خضار وفواكه";
  servingUnit: string;
  amount: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
  caloriesPer100g: number;
  alternatives?: string[];
}

interface MealItem {
  id: string;
  name: string;
  timeHint: string;
  foods: FoodItem[];
}

const localFoodBank: FoodItem[] = [
  { id: "f-1", name: "صدور دجاج مخلية (مشوي/مسلوق)", category: "بروتين", servingUnit: "جرام", amount: 150, proteinPer100g: 31, carbsPer100g: 0, fatPer100g: 3.6, caloriesPer100g: 165, alternatives: ["لحم بقري مفروم قليل الدهن", "تونة مصفاة من الزيت"] },
  { id: "f-2", name: "أرز أبيض مسلوق (مصري)", category: "كاربوهيدرات", servingUnit: "جرام", amount: 200, proteinPer100g: 2.7, carbsPer100g: 28, fatPer100g: 0.3, caloriesPer100g: 130, alternatives: ["بطاطس مشوية بالفرن", "شوفان حبوب كاملة", "مكرونة مسلوقة"] },
  { id: "f-3", name: "بيض كامل مسلوق", category: "بروتين", servingUnit: "بيضة (حبة)", amount: 3, proteinPer100g: 13, carbsPer100g: 1.1, fatPer100g: 11, caloriesPer100g: 155, alternatives: ["جبن قريش طبيعي", "بياض بيض"] },
  { id: "f-4", name: "جبن قريش مصري طبيعي", category: "بروتين", servingUnit: "جرام", amount: 150, proteinPer100g: 12, carbsPer100g: 3.4, fatPer100g: 1.5, caloriesPer100g: 78, alternatives: ["زبادي يوناني خالي الدسم"] },
  { id: "f-5", name: "شوفان حبوب كاملة", category: "كاربوهيدرات", servingUnit: "جرام", amount: 60, proteinPer100g: 13.5, carbsPer100g: 68, fatPer100g: 6.9, caloriesPer100g: 389, alternatives: ["خبز بلدي حبة كاملة", "أرز بسمتي"] },
  { id: "f-6", name: "زيت زيتون بكر ممتاز", category: "دهون صحية", servingUnit: "ملعقة (10 جم)", amount: 10, proteinPer100g: 0, carbsPer100g: 0, fatPer100g: 100, caloriesPer100g: 884, alternatives: ["مكسرات لوز أو فول سوداني", "أفوكادو"] },
  { id: "f-7", name: "بطاطا حلوة مشوية", category: "كاربوهيدرات", servingUnit: "جرام", amount: 150, proteinPer100g: 1.6, carbsPer100g: 20, fatPer100g: 0.1, caloriesPer100g: 86, alternatives: ["أرز بني", "كينوا"] },
  { id: "f-8", name: "موز طازج", category: "خضار وفواكه", servingUnit: "حبة متوسطة (100 جم)", amount: 100, proteinPer100g: 1.1, carbsPer100g: 23, fatPer100g: 0.3, caloriesPer100g: 89, alternatives: ["تفاح أخضر", "توت مجمد"] }
];

export default function NutritionDietBuilderPage() {
  const [clientInfo] = useState({
    name: "كريم أحمد مصطفى",
    targetCalories: 2350,
    targetProtein: 180,
    targetCarbs: 250,
    targetFat: 60
  });

  const [meals, setMeals] = useState<MealItem[]>([
    {
      id: "m-1",
      name: "وجبة 1: الإفطار والطاقة",
      timeHint: "9:00 صباحاً",
      foods: [
        { ...localFoodBank[2], amount: 3 }, // 3 eggs
        { ...localFoodBank[4], amount: 60 }, // 60g oats
        { ...localFoodBank[7], amount: 100 } // 1 banana
      ]
    },
    {
      id: "m-2",
      name: "وجبة 2: وجبة ما قبل التمرين (Pre-Workout)",
      timeHint: "1:30 ظهراً",
      foods: [
        { ...localFoodBank[0], amount: 180 }, // 180g chicken
        { ...localFoodBank[1], amount: 200 }, // 200g rice
        { ...localFoodBank[5], amount: 10 } // 10g olive oil
      ]
    }
  ]);

  const [activeMealId, setActiveMealId] = useState<string>("m-1");
  const [showAddFoodModal, setShowAddFoodModal] = useState(false);
  const [foodSearch, setFoodSearch] = useState("");
  const [showGroceryModal, setShowGroceryModal] = useState(false);

  // Compute live macros
  const calculateTotalMacros = () => {
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    meals.forEach(m => {
      m.foods.forEach(f => {
        const factor = f.amount / 100;
        calories += f.caloriesPer100g * factor;
        protein += f.proteinPer100g * factor;
        carbs += f.carbsPer100g * factor;
        fat += f.fatPer100g * factor;
      });
    });

    return {
      calories: Math.round(calories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat)
    };
  };

  const totals = calculateTotalMacros();

  const handleAddFoodToMeal = (food: FoodItem) => {
    setMeals(prev => prev.map(m => {
      if (m.id === activeMealId) {
        return {
          ...m,
          foods: [...m.foods, { ...food, id: `food-${Date.now()}` }]
        };
      }
      return m;
    }));
    setShowAddFoodModal(false);
  };

  const handleDeleteFood = (mealId: string, foodId: string) => {
    setMeals(prev => prev.map(m => {
      if (m.id === mealId) {
        return {
          ...m,
          foods: m.foods.filter(f => f.id !== foodId)
        };
      }
      return m;
    }));
  };

  const handleUpdateAmount = (mealId: string, foodId: string, newAmount: number) => {
    setMeals(prev => prev.map(m => {
      if (m.id === mealId) {
        return {
          ...m,
          foods: m.foods.map(f => f.id === foodId ? { ...f, amount: newAmount } : f)
        };
      }
      return m;
    }));
  };

  const handleAddMeal = () => {
    const mealNum = meals.length + 1;
    const newMeal: MealItem = {
      id: `m-${Date.now()}`,
      name: `وجبة ${mealNum}: وجبة جديدة`,
      timeHint: "حدد الوقت",
      foods: []
    };
    setMeals([...meals, newMeal]);
    setActiveMealId(newMeal.id);
  };

  return (
    <div className="min-h-screen bg-[#0A0612] text-white flex flex-col font-sans" dir="rtl">
      {/* Top Header */}
      <header className="bg-[#110A1E] border-b border-purple-900/30 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-slate-400 hover:text-white flex items-center gap-1.5 text-xs font-bold transition">
            <ArrowLeft className="w-4 h-4" />
            <span>لوحة التحكم</span>
          </Link>
          <div className="h-5 w-[1px] bg-purple-900/40" />
          <div className="flex items-center gap-2">
            <Apple className="w-5 h-5 text-[#A78BFA]" />
            <h1 className="font-heading font-black text-lg text-white">
              بيلدر التغذية والماكروز <span className="text-xs bg-[#7C3AED] text-white px-2 py-0.5 rounded-full font-sans font-bold">Sprint 2</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowGroceryModal(true)}
            className="bg-[#17102A] hover:bg-[#6D28D9]/40 text-purple-200 border border-purple-500/30 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition"
          >
            <ShoppingCart className="w-4 h-4 text-emerald-400" />
            <span>قائمة مشتريات الأسبوع</span>
          </button>

          <button
            onClick={() => {
              confetti({ particleCount: 90, spread: 70, origin: { y: 0.5 } });
              alert("تم حفظ خطة التغذية والماكروز بنجاح وتوليد البدائل للمتدرب!");
            }}
            className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-purple-900/50"
          >
            <Save className="w-4 h-4" />
            <span>حفظ واعتماد الدايت</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: Macros Summary & Targets (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Target vs Actual Progress */}
          <div className="bg-[#140C24] p-5 rounded-2xl border border-purple-900/30 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-purple-900/30">
              <span className="text-xs font-bold text-slate-400">مجموع سعرات الخطة</span>
              <div className="flex items-center gap-1.5 text-amber-400 font-black text-lg">
                <Flame className="w-5 h-5 fill-amber-400" />
                <span>{totals.calories}</span>
                <span className="text-xs text-slate-400 font-normal">/ {clientInfo.targetCalories} kcal</span>
              </div>
            </div>

            {/* Protein */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between font-bold">
                <span className="text-blue-300">البروتين (Protein)</span>
                <span className="text-white">{totals.protein} جم / {clientInfo.targetProtein} جم</span>
              </div>
              <div className="w-full bg-[#110A1E] h-2 rounded-full overflow-hidden border border-purple-900/30">
                <div 
                  className="bg-blue-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (totals.protein / clientInfo.targetProtein) * 100)}%` }}
                />
              </div>
            </div>

            {/* Carbs */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between font-bold">
                <span className="text-amber-300">الكاربوهيدرات (Carbs)</span>
                <span className="text-white">{totals.carbs} جم / {clientInfo.targetCarbs} جم</span>
              </div>
              <div className="w-full bg-[#110A1E] h-2 rounded-full overflow-hidden border border-purple-900/30">
                <div 
                  className="bg-amber-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (totals.carbs / clientInfo.targetCarbs) * 100)}%` }}
                />
              </div>
            </div>

            {/* Fats */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between font-bold">
                <span className="text-rose-300">الدهون الصحية (Fats)</span>
                <span className="text-white">{totals.fat} جم / {clientInfo.targetFat} جم</span>
              </div>
              <div className="w-full bg-[#110A1E] h-2 rounded-full overflow-hidden border border-purple-900/30">
                <div 
                  className="bg-rose-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (totals.fat / clientInfo.targetFat) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* AI Coach Diet Insight */}
          <div className="bg-gradient-to-r from-purple-950/40 via-purple-900/20 to-transparent p-4 rounded-2xl border border-purple-500/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#A78BFA]">
              <Sparkles className="w-4 h-4" />
              <span>تحليل CoachPRB AI للتغذية:</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              توزيع البروتين مثالي على مدار الوجبات (بمعدل 35-45 جم لكل وجبة لتحفيز الـ MPS). تم اقتراح بدائل تلقائية لكل صنف لضمان استمرارية العميل بدون ملل.
            </p>
          </div>
        </div>

        {/* Right Col: Meals Builder (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span>جدول وجبات اليوم</span>
              <span className="text-xs text-purple-400">({meals.length} وجبات رئيسية)</span>
            </h2>

            <button
              onClick={handleAddMeal}
              className="bg-[#7C3AED]/20 hover:bg-[#7C3AED]/30 text-[#A78BFA] border border-[#7C3AED]/40 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة وجبة جديدة</span>
            </button>
          </div>

          {/* Meals List */}
          <div className="space-y-4">
            {meals.map((meal) => (
              <div key={meal.id} className="bg-[#140C24] p-4 rounded-2xl border border-purple-900/30 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-purple-900/20">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{meal.name}</span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 bg-[#110A1E] px-2 py-0.5 rounded-full border border-purple-900/20">
                      <Clock className="w-3 h-3 text-purple-400" />
                      <span>{meal.timeHint}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setActiveMealId(meal.id);
                      setShowAddFoodModal(true);
                    }}
                    className="text-xs bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-3 py-1 rounded-lg font-bold flex items-center gap-1 transition shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة صنف طعام</span>
                  </button>
                </div>

                {/* Foods inside meal */}
                <div className="space-y-2 text-xs">
                  {meal.foods.length === 0 ? (
                    <div className="text-center py-4 text-slate-500 text-xs">لا يوجد أصناف في هذه الوجبة. اضغط "إضافة صنف طعام" للبدء.</div>
                  ) : (
                    meal.foods.map((food) => {
                      const factor = food.amount / 100;
                      const cals = Math.round(food.caloriesPer100g * factor);
                      const p = Math.round(food.proteinPer100g * factor);
                      const c = Math.round(food.carbsPer100g * factor);
                      const f = Math.round(food.fatPer100g * factor);

                      return (
                        <div key={food.id} className="bg-[#110A1E] p-3 rounded-xl border border-purple-900/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="font-bold text-white text-xs">{food.name}</div>
                            {food.alternatives && food.alternatives.length > 0 && (
                              <div className="text-[10px] text-purple-400 flex items-center gap-1 mt-0.5">
                                <Repeat className="w-3 h-3 shrink-0" />
                                <span>البدائل المتاحة: {food.alternatives.join("، ")}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-4">
                            {/* Amount input */}
                            <div className="flex items-center gap-1.5">
                              <input
                                type="number"
                                value={food.amount}
                                onChange={(e) => handleUpdateAmount(meal.id, food.id, parseFloat(e.target.value) || 0)}
                                className="w-16 bg-[#17102A] border border-purple-900/40 rounded-lg px-2 py-1 text-center text-white font-bold text-xs focus:outline-none focus:border-[#7C3AED]"
                              />
                              <span className="text-[11px] text-slate-400">{food.servingUnit}</span>
                            </div>

                            {/* Macros pills */}
                            <div className="flex items-center gap-2 text-[11px] font-mono">
                              <span className="text-amber-300 font-bold">{cals} ك</span>
                              <span className="text-blue-300">P:{p}</span>
                              <span className="text-amber-300">C:{c}</span>
                              <span className="text-rose-300">F:{f}</span>
                            </div>

                            {/* Delete */}
                            <button
                              onClick={() => handleDeleteFood(meal.id, food.id)}
                              className="text-slate-500 hover:text-rose-400 transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Food Modal */}
      {showAddFoodModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#140C24] border border-purple-900/50 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Apple className="w-5 h-5 text-[#A78BFA]" />
                <h3 className="text-base font-bold text-white">كتالوج الأطعمة المصرية والعربية مع الماكروز</h3>
              </div>
              <button onClick={() => setShowAddFoodModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              <input
                type="text"
                placeholder="ابحث عن صنف (فراخ، أرز، بيض، جبن قريش، شوفان...)"
                value={foodSearch}
                onChange={(e) => setFoodSearch(e.target.value)}
                className="w-full bg-[#110A1E] border border-purple-900/40 rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#7C3AED]"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {localFoodBank
                .filter(f => f.name.includes(foodSearch) || f.category.includes(foodSearch))
                .map((food) => (
                  <div key={food.id} className="p-3 bg-[#110A1E] rounded-xl border border-purple-900/20 hover:border-purple-600/40 flex items-center justify-between text-xs transition">
                    <div>
                      <div className="font-bold text-white">{food.name}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>النوع: {food.category}</span>
                        <span>•</span>
                        <span className="font-mono text-slate-300">لكل 100 جم: {food.caloriesPer100g} ك (P:{food.proteinPer100g} C:{food.carbsPer100g} F:{food.fatPer100g})</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddFoodToMeal(food)}
                      className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-3 py-1.5 rounded-lg font-bold text-xs transition"
                    >
                      + إضافة للوجبة
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Grocery Shopping List Modal */}
      {showGroceryModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#140C24] border border-purple-900/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">قائمة مشتريات الأسبوع للمتدرب (Grocery List)</h3>
              </div>
              <button onClick={() => setShowGroceryModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              تم تجميع وحساب الكميات الأسبوعية المطلوبة تلقائياً بناءً على وجبات الخطة ليشتريها العميل من السوبرماركت دفعة واحدة:
            </p>

            <div className="bg-[#110A1E] p-4 rounded-xl border border-purple-900/30 space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-purple-900/20">
                <span className="font-bold text-white">صدور دجاج مخلية:</span>
                <span className="text-[#A78BFA] font-bold font-mono">1.26 كجم / أسبوعياً</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-purple-900/20">
                <span className="font-bold text-white">أرز أبيض مصري:</span>
                <span className="text-[#A78BFA] font-bold font-mono">1.40 كجم / أسبوعياً</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-purple-900/20">
                <span className="font-bold text-white">بيض أحمر / أبيض:</span>
                <span className="text-[#A78BFA] font-bold font-mono">21 بيضة / أسبوعياً</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-purple-900/20">
                <span className="font-bold text-white">شوفان كامل الحبة:</span>
                <span className="text-[#A78BFA] font-bold font-mono">420 جرام / أسبوعياً</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="font-bold text-white">زيت زيتون بكر:</span>
                <span className="text-[#A78BFA] font-bold font-mono">1 زجاجة (250 مل)</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText("قائمة مشتريات أسبوعك من CoachPRB: 1.26 كجم صدور دجاج، 1.4 كجم أرز، 21 بيضة، 420 جم شوفان.");
                  alert("تم نسخ قائمة المشتريات لإرسالها للعميل عبر واتساب!");
                }}
                className="px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-bold transition shadow-md"
              >
                نسخ القائمة لواتساب
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
