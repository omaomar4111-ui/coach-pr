import { NextResponse } from 'next/server';

export interface FoodItem {
  id: string;
  name: string;
  category: 'protein' | 'carbs' | 'fats' | 'mixed';
  servingGrams: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export const EGYPTIAN_ARAB_FOODS: FoodItem[] = [
  { id: 'f-1', name: 'صدور دجاج مخلية مشوية', category: 'protein', servingGrams: 100, calories: 165, protein: 31, carbs: 0, fats: 3.6 },
  { id: 'f-2', name: 'بيض كامل مسلوق (حبة متوسطة ~50 جم)', category: 'protein', servingGrams: 50, calories: 72, protein: 6.3, carbs: 0.4, fats: 4.8 },
  { id: 'f-3', name: 'بياض بيض مسلوق (3 حبات ~100 جم)', category: 'protein', servingGrams: 100, calories: 52, protein: 11, carbs: 0.7, fats: 0.2 },
  { id: 'f-4', name: 'جبنة قريش مصرية قليلة الدسم', category: 'protein', servingGrams: 100, calories: 98, protein: 14, carbs: 3.4, fats: 2 },
  { id: 'f-5', name: 'لحم بقري مفروم أحمر صافي', category: 'protein', servingGrams: 100, calories: 215, protein: 26, carbs: 0, fats: 11 },
  { id: 'f-6', name: 'سمك تونة مصفى من الزيت', category: 'protein', servingGrams: 100, calories: 116, protein: 25.5, carbs: 0, fats: 0.8 },
  { id: 'f-7', name: 'سمك بلطي مشوي على الردة', category: 'protein', servingGrams: 100, calories: 128, protein: 26, carbs: 0, fats: 2.7 },
  { id: 'f-8', name: 'أرز أبيض مصري مطبوخ', category: 'carbs', servingGrams: 100, calories: 130, protein: 2.7, carbs: 28, fats: 0.3 },
  { id: 'f-9', name: 'أرز بسمتي مسلوق', category: 'carbs', servingGrams: 100, calories: 121, protein: 3.5, carbs: 25, fats: 0.4 },
  { id: 'f-10', name: 'بطاطس مسلوقة أو مشوية بالقشر', category: 'carbs', servingGrams: 100, calories: 87, protein: 1.9, carbs: 20, fats: 0.1 },
  { id: 'f-11', name: 'بطاطا حلوة مشوية', category: 'carbs', servingGrams: 100, calories: 90, protein: 2, carbs: 20.7, fats: 0.15 },
  { id: 'f-12', name: 'شوفان خام كامل الحبة', category: 'carbs', servingGrams: 100, calories: 389, protein: 16.9, carbs: 66, fats: 6.9 },
  { id: 'f-13', name: 'خبز بلدي مصري بالردة (رغيف كامل ~100 جم)', category: 'carbs', servingGrams: 100, calories: 255, protein: 9, carbs: 50, fats: 1.5 },
  { id: 'f-14', name: 'فول مدمس مصري بدون زيت', category: 'mixed', servingGrams: 100, calories: 110, protein: 7.6, carbs: 19.8, fats: 0.5 },
  { id: 'f-15', name: 'زيت زيتون بكر ممتاز (ملعقة طعام ~14 جم)', category: 'fats', servingGrams: 14, calories: 119, protein: 0, carbs: 0, fats: 13.5 },
  { id: 'f-16', name: 'زبدة فول سوداني طبيعية بدون سكر', category: 'fats', servingGrams: 30, calories: 188, protein: 8, carbs: 6, fats: 16 },
  { id: 'f-17', name: 'لوز نيء غير مملح', category: 'fats', servingGrams: 30, calories: 173, protein: 6.4, carbs: 6.1, fats: 15 },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('q')?.toLowerCase() || '';
  const category = searchParams.get('category');

  let results = EGYPTIAN_ARAB_FOODS;

  if (category) {
    results = results.filter(f => f.category === category);
  }

  if (search) {
    results = results.filter(f => f.name.toLowerCase().includes(search));
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    foods: results
  });
}
