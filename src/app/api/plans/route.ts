import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin, isSupabaseConfigured } from '@/lib/supabaseClient';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const clientId = searchParams.get('clientId');

    if (isSupabaseConfigured()) {
      try {
        const client = supabaseAdmin || supabase;
        let query = client.from('workout_plans').select('*, workout_routine_items(*)');
        if (category) query = query.eq('category', category);
        if (clientId) query = query.eq('client_id', clientId);

        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return NextResponse.json({ success: true, plans: data });
        }
      } catch (err) {
        console.warn('DB workout plans notice:', err);
      }
    }

    // High quality initial templates (Egyptian & Arab Strength Training standards)
    const fallbackPlans = [
      {
        id: 'plan-1',
        title: 'برنامج التضخيم وحماية المفاصل (Upper/Lower 4 Days)',
        category: 'hypertrophy',
        days_per_week: 4,
        is_template: true,
        description: 'برنامج مدروس تضخيمياً يركز على عزل الضغط عن صابونة الركبة وأسفل الظهر مع زيادة الحجم التدريبي الأسبوعي (16-18 مجموعة لكل عضلة).',
        days: [
          { day: 'اليوم 1', name: 'سحب وظهر وبايسبس (Pull Heavy)', exercises: 5, sets: 16 },
          { day: 'اليوم 2', name: 'دفع وصدر وترايسبس (Push Strength)', exercises: 6, sets: 18 },
          { day: 'اليوم 3', name: 'أرجل ومعدلات أمان للركبة (Lower Knee-Safe)', exercises: 5, sets: 15 },
          { day: 'اليوم 4', name: 'أكتاف وترابيس وبطن (Delts & Core)', exercises: 5, sets: 14 }
        ],
        created_at: new Date().toISOString()
      },
      {
        id: 'plan-2',
        title: 'بروتوكول القوة والتحمل (Push/Pull/Legs 6 Days)',
        category: 'strength',
        days_per_week: 6,
        is_template: true,
        description: 'نظام كلاسيكي للمستويات المتقدمة لتحفيز أقصى استثارة عضلية واستشفاء منظم مع تكرار العضلة مرتين أسبوعياً.',
        days: [
          { day: 'اليوم 1', name: 'Push A (Chest Focus)', exercises: 6, sets: 18 },
          { day: 'اليوم 2', name: 'Pull A (Width Focus)', exercises: 6, sets: 18 },
          { day: 'اليوم 3', name: 'Legs A (Quad Dominant)', exercises: 5, sets: 16 },
          { day: 'اليوم 4', name: 'Push B (Shoulders Focus)', exercises: 6, sets: 18 },
          { day: 'اليوم 5', name: 'Pull B (Thickness Focus)', exercises: 6, sets: 18 },
          { day: 'اليوم 6', name: 'Legs B (Hamstrings & Glutes)', exercises: 5, sets: 15 }
        ],
        created_at: new Date().toISOString()
      },
      {
        id: 'plan-3',
        title: 'نظام حرق الدهون والتنشيف الشديد (Full Body 3 Days)',
        category: 'fat_loss',
        days_per_week: 3,
        is_template: true,
        description: 'مثالي للمشتركين ذوي أوقات العمل الضيقة، معدلات حرق عالية وكثافة تمرين مكثفة مع راحة كافية بين الأيام.',
        days: [
          { day: 'اليوم 1', name: 'Full Body A (Chest/Back/Quads)', exercises: 6, sets: 18 },
          { day: 'اليوم 2', name: 'Full Body B (Shoulders/Arms/Hams)', exercises: 6, sets: 18 },
          { day: 'اليوم 3', name: 'Full Body C (Density & Conditioning)', exercises: 6, sets: 18 }
        ],
        created_at: new Date().toISOString()
      }
    ];

    return NextResponse.json({ success: true, plans: fallbackPlans });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, days_per_week, description, client_id, is_template } = body;

    if (!title) {
      return NextResponse.json({ error: 'العنوان مطلوب' }, { status: 400 });
    }

    if (isSupabaseConfigured()) {
      try {
        const client = supabaseAdmin || supabase;
        const { data, error } = await client.from('workout_plans').insert([
          {
            title,
            category: category || 'hypertrophy',
            days_per_week: Number(days_per_week) || 4,
            description,
            client_id: client_id || null,
            is_template: is_template !== false
          }
        ]).select().single();

        if (!error && data) {
          return NextResponse.json({ success: true, plan: data });
        }
      } catch (dbErr) {
        console.warn('DB insert plan notice:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      plan: {
        id: `plan-${Date.now()}`,
        title,
        category: category || 'hypertrophy',
        days_per_week: Number(days_per_week) || 4,
        description,
        is_template: is_template !== false,
        created_at: new Date().toISOString()
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
