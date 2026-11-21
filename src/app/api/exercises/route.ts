import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin, isSupabaseConfigured } from '@/lib/supabaseClient';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const muscle = searchParams.get('muscle');
    const query = searchParams.get('q');

    if (isSupabaseConfigured()) {
      try {
        const client = supabaseAdmin || supabase;
        let dbQuery = client.from('exercises').select('*');
        if (muscle) dbQuery = dbQuery.eq('target_muscle', muscle);
        if (query) dbQuery = dbQuery.ilike('name_ar', `%${query}%`);

        const { data, error } = await dbQuery;
        if (!error && data && data.length > 0) {
          return NextResponse.json({ success: true, exercises: data });
        }
      } catch (err) {
        console.warn('DB exercises notice:', err);
      }
    }

    // Comprehensive Built-in Exercise Library (Bilingual & Cues)
    const fallbackExercises = [
      {
        id: 'ex-1',
        name_ar: 'ضغط بنش بار مستوي (Barbell Flat Bench Press)',
        name_en: 'Barbell Flat Bench Press',
        target_muscle: 'chest',
        equipment: 'barbell',
        knee_friendly: true,
        lower_back_safe: true,
        cues_ar: 'تثبيت لوحي الكتف للخلف، نزول متحكم 3 ثواني حتى لمس منتصف الصدر مع كوع بزاوية 45-60 درجة.'
      },
      {
        id: 'ex-2',
        name_ar: 'تجميع صدر دمبل مائل (Incline Dumbbell Press)',
        name_en: 'Incline Dumbbell Press',
        target_muscle: 'chest',
        equipment: 'dumbbell',
        knee_friendly: true,
        lower_back_safe: true,
        cues_ar: 'زاوية الدكة 30 درجة لاستهداف الألياف العلوية للصدر، دفع مع عدم قفل المرفق بالكامل لحفظ الضغط.'
      },
      {
        id: 'ex-3',
        name_ar: 'سحب أرضي جهاز كابل واسع (Seated Cable Row)',
        name_en: 'Seated Cable Row',
        target_muscle: 'back',
        equipment: 'cable',
        knee_friendly: true,
        lower_back_safe: true,
        cues_ar: 'سحب بالمرفقين باتجاه الحوض، اعتصار كامل لعضلات الظهر العريضة (Lats) لثانية عند الانقباض.'
      },
      {
        id: 'ex-4',
        name_ar: 'سحب عالي كابل أمامي (Lat Pulldown)',
        name_en: 'Lat Pulldown',
        target_muscle: 'back',
        equipment: 'cable',
        knee_friendly: true,
        lower_back_safe: true,
        cues_ar: 'نزول حتى أعلى الصدر مع إبقاء الصدر مرفوعاً، تفادي التأرجح للخلف.'
      },
      {
        id: 'ex-5',
        name_ar: 'هاك سكوات جهاز آمن الركبة (Hack Squat Machine)',
        name_en: 'Hack Squat Machine',
        target_muscle: 'legs',
        equipment: 'machine',
        knee_friendly: true,
        lower_back_safe: true,
        cues_ar: 'قدمين متقدمين للأمام قليلاً لتقليل الضغط على صابونة الركبة، نزول بطيء حتى زاوية 90 درجة.'
      },
      {
        id: 'ex-6',
        name_ar: 'دفع رجلين جهاز (45° Leg Press)',
        name_en: 'Leg Press',
        target_muscle: 'legs',
        equipment: 'machine',
        knee_friendly: true,
        lower_back_safe: true,
        cues_ar: 'ثبات أسفل الظهر في المقعد تماماً، تفادي قفل مفصل الركبة في أعلى الحركة.'
      },
      {
        id: 'ex-7',
        name_ar: 'مرجحة خلفية جهاز (Seated Hamstring Curl)',
        name_en: 'Seated Hamstring Curl',
        target_muscle: 'legs',
        equipment: 'machine',
        knee_friendly: true,
        lower_back_safe: true,
        cues_ar: 'أفضل تمرين لعزل أوتار الركبة بدون تحميل على العمود الفقري.'
      },
      {
        id: 'ex-8',
        name_ar: 'رفرفة جانبي دمبل للكتف (Dumbbell Lateral Raise)',
        name_en: 'Dumbbell Lateral Raise',
        target_muscle: 'shoulders',
        equipment: 'dumbbell',
        knee_friendly: true,
        lower_back_safe: true,
        cues_ar: 'ميلان خفيف للأمام، قيادة الحركة بالمرفقين لصنع عرض الكتف الجانبي 3D.'
      },
      {
        id: 'ex-9',
        name_ar: 'مرجحة بايسبس بار زجزاج (EZ-Bar Bicep Curl)',
        name_en: 'EZ-Bar Bicep Curl',
        target_muscle: 'arms',
        equipment: 'barbell',
        knee_friendly: true,
        lower_back_safe: true,
        cues_ar: 'ثبات الكوع بجانب الجسم، تركيز كامل على قمة العضلة.'
      },
      {
        id: 'ex-10',
        name_ar: 'ترايسبس بالحبل على الكابل (Rope Pushdown)',
        name_en: 'Tricep Rope Pushdown',
        target_muscle: 'arms',
        equipment: 'cable',
        knee_friendly: true,
        lower_back_safe: true,
        cues_ar: 'فرد الحبل للخارج في نهاية الحركة لعزل الرأس الجانبي للترايسبس.'
      }
    ];

    let result = fallbackExercises;
    if (muscle) result = result.filter(ex => ex.target_muscle === muscle);
    if (query) result = result.filter(ex => ex.name_ar.includes(query) || ex.name_en.toLowerCase().includes(query.toLowerCase()));

    return NextResponse.json({ success: true, exercises: result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name_ar, name_en, target_muscle, equipment, cues_ar, knee_friendly, lower_back_safe } = body;

    if (!name_ar || !target_muscle) {
      return NextResponse.json({ error: 'اسم التمرين والعضلة المستهدفة حقول إلزامية' }, { status: 400 });
    }

    if (isSupabaseConfigured()) {
      try {
        const client = supabaseAdmin || supabase;
        const { data, error } = await client.from('exercises').insert([
          {
            name_ar,
            name_en: name_en || name_ar,
            target_muscle,
            equipment: equipment || 'barbell',
            cues_ar: cues_ar || '',
            knee_friendly: knee_friendly !== false,
            lower_back_safe: lower_back_safe !== false
          }
        ]).select().single();

        if (!error && data) {
          return NextResponse.json({ success: true, exercise: data });
        }
      } catch (dbErr) {
        console.warn('DB insert exercise notice:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      exercise: {
        id: `ex-${Date.now()}`,
        name_ar,
        name_en: name_en || name_ar,
        target_muscle,
        equipment: equipment || 'barbell',
        cues_ar,
        knee_friendly: knee_friendly !== false,
        lower_back_safe: lower_back_safe !== false,
        created_at: new Date().toISOString()
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
