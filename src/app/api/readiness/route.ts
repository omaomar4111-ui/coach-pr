import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export interface ReadinessScoreResult {
  score: number; // 0 to 100
  status: 'optimal' | 'moderate' | 'fatigued';
  statusAr: string;
  originalSets: number;
  recommendedSets: number;
  adjustmentSummary: string;
  reasoning: string;
}

export function calculateReadiness(
  sleepHours: number,
  stressLevel: number, // 1 to 10
  waterLiters: number,
  originalSets: number = 18
): ReadinessScoreResult {
  // 1. Sleep score (optimal >= 7.5 hrs)
  let sleepScore = Math.min(100, (sleepHours / 8) * 100);
  if (sleepHours < 5) sleepScore = 35;

  // 2. Stress impact (lower is better)
  const stressScore = Math.max(0, 100 - (stressLevel - 1) * 11);

  // 3. Hydration (optimal >= 3.0L)
  const hydrationScore = Math.min(100, (waterLiters / 3.0) * 100);

  // Weighted composite score: Sleep (45%), Stress (35%), Hydration (20%)
  const compositeScore = Math.round(
    sleepScore * 0.45 + stressScore * 0.35 + hydrationScore * 0.20
  );

  let status: 'optimal' | 'moderate' | 'fatigued' = 'optimal';
  let statusAr = 'جاهزية قصوى للتمرين';
  let recommendedSets = originalSets;
  let adjustmentSummary = 'لا حاجة لتعديل حجم التمرين - اللاعب بكامل طاقته';
  let reasoning = 'معدلات النوم والترطيب ممتازة، ومستوى الاستشفاء العصبي مرتفع.';

  if (compositeScore < 55 || sleepHours < 5 || stressLevel >= 8) {
    status = 'fatigued';
    statusAr = 'إجهاد عصبي / نوم قليل';
    // Reduce sets by ~25-30% to protect nervous system and prevent joint injuries
    recommendedSets = Math.max(10, Math.round(originalSets * 0.75));
    adjustmentSummary = `اقتراح تقليل الحجم من ${originalSets} سِت إلى ${recommendedSets} سِت`;
    reasoning = `اللاعب نام ${sleepHours} ساعات ونسبة الإجهاد ${stressLevel}/10. تقليل الستات يحمي المفاصل ويمنع الهدم العضلي.`;
  } else if (compositeScore < 75) {
    status = 'moderate';
    statusAr = 'جاهزية متوسطة';
    recommendedSets = Math.max(12, Math.round(originalSets * 0.90));
    adjustmentSummary = `اقتراح تقليل الحجم من ${originalSets} سِت إلى ${recommendedSets} سِت`;
    reasoning = 'استشفاء معقول لكن يُنصح بعدم الوصول للفشل العضلي التام في جميع المجموعات.';
  }

  return {
    score: compositeScore,
    status,
    statusAr,
    originalSets,
    recommendedSets,
    adjustmentSummary,
    reasoning
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      athleteId = 'athlete-1', 
      sleepHours = 7, 
      stressLevel = 4, 
      waterLiters = 2.5, 
      originalSets = 18 
    } = body;

    const result = calculateReadiness(
      Number(sleepHours), 
      Number(stressLevel), 
      Number(waterLiters), 
      Number(originalSets)
    );

    // Persist to Supabase if available
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('athlete_readiness_logs').insert({
          athlete_id: athleteId,
          sleep_hours: sleepHours,
          stress_level: stressLevel,
          water_liters: waterLiters,
          readiness_score: result.score,
          status: result.status,
          recommended_sets: result.recommendedSets,
          created_at: new Date().toISOString()
        });
      } catch (e) {
        console.warn('Readiness log DB insert notice:', e);
      }
    }

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    console.error('Readiness API error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
