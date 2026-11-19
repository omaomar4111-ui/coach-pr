import { NextResponse } from 'next/server';
import { analyzeExerciseFormWithAI } from '@/lib/aiFormCheckService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      exerciseName = 'سكوات بالبار', 
      weightKg = '100', 
      reps = 8, 
      reportedRir = 2, 
      athleteNotes = '', 
      injuries = [] 
    } = body;

    const analysis = await analyzeExerciseFormWithAI({
      exerciseName,
      weightKg,
      reps: Number(reps),
      reportedRir: Number(reportedRir),
      athleteNotes,
      injuries
    });

    return NextResponse.json({
      success: true,
      analysis,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to analyze form' },
      { status: 500 }
    );
  }
}
