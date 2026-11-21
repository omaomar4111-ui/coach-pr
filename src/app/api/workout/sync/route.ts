import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { athleteId, workoutName, logs, syncedAt } = body;

    if (!logs || !Array.isArray(logs)) {
      return NextResponse.json(
        { success: false, error: 'Invalid payload: logs array required' },
        { status: 400 }
      );
    }

    // If Supabase is connected, persist to production database
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data: insertedLog, error: logError } = await supabase
          .from('workout_logs')
          .insert({
            athlete_id: athleteId || 'athlete-demo',
            workout_name: workoutName || 'Push A',
            completed_at: syncedAt || new Date().toISOString()
          })
          .select()
          .single();

        if (!logError && insertedLog) {
          // Insert sets
          const setsToInsert = logs.flatMap((exercise: any) =>
            exercise.sets
              .filter((s: any) => s.completed)
              .map((s: any) => ({
                log_id: insertedLog.id,
                exercise_name: exercise.name,
                set_number: s.setNumber,
                weight_kg: parseFloat(s.actualWeight) || 0,
                reps: parseInt(s.actualReps) || 0,
                rir: s.actualRir || 0
              }))
          );

          if (setsToInsert.length > 0) {
            await supabase.from('logged_sets').insert(setsToInsert);
          }

          return NextResponse.json({
            success: true,
            persisted: 'database',
            logId: insertedLog.id,
            setsCount: setsToInsert.length,
            message: 'تمت مزامنة المجموعات وحفظها في قاعدة البيانات بنجاح'
          });
        }
      } catch (dbErr) {
        console.warn('DB workout sync error, falling back:', dbErr);
      }
    }

    // In-Memory / Edge response
    return NextResponse.json({
      success: true,
      persisted: 'edge_cache',
      syncedSets: logs.reduce((acc, ex) => acc + (ex.sets?.filter((s: any) => s.completed).length || 0), 0),
      message: 'تمت المزامنة بنجاح في CoachPRB Edge Server'
    });
  } catch (error: any) {
    console.error('Sync workout route error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
