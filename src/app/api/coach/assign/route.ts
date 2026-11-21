import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin, isSupabaseConfigured } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { traineeId, workoutPlanId, dietPlanId } = body;

    if (!traineeId) {
      return NextResponse.json({ error: 'traineeId is required' }, { status: 400 });
    }

    if (isSupabaseConfigured()) {
      try {
        const client = supabaseAdmin || supabase;
        await client.from('clients').update({
          workout_plan_id: workoutPlanId || null,
          diet_plan_id: dietPlanId || null,
          updated_at: new Date().toISOString()
        }).eq('id', traineeId);
      } catch (err) {
        console.warn('DB assign notice:', err);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        id: `assign-${Date.now()}`,
        traineeId,
        workoutPlanId,
        dietPlanId,
        assignedAt: new Date().toISOString(),
        injuryWarnings: []
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
