import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin, isSupabaseConfigured } from '@/lib/supabaseClient';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const traineeId = searchParams.get('traineeId');

    const scoreData = {
      overallCommitment: 86,
      streakDays: 14,
      todayScore: 10,
      breakdown: {
        workoutCompleted: true,
        dietAdherence: 9.5,
        waterTargetLiters: 3.5,
        waterActualLiters: 3.2,
        sleepHours: 7.5,
        stressLevel: 2
      },
      historyLast30Days: Array.from({ length: 30 }).map((_, i) => ({
        day: i + 1,
        score: i === 22 || i === 23 ? 5 : 10,
        date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0]
      }))
    };

    return NextResponse.json({
      success: true,
      data: scoreData
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { traineeId, score, workoutDone, mealsLogged } = body;

    return NextResponse.json({
      success: true,
      message: 'تم تسجيل نقاط يوم 10/10 بنجاح!',
      data: {
        traineeId: traineeId || 'trainee-karim',
        recordedAt: new Date().toISOString(),
        score: score || 10,
        streakDays: 15
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
