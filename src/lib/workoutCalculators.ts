/**
 * Workout Utility Helpers:
 * 1. Barbell Plate Calculator (Olympic 20kg bar + 20, 15, 10, 5, 2.5, 1.25 kg plates)
 * 2. Scientific Warmup Sets Calculator (Empty Bar, 50%, 70%, 85%, 100%)
 * 3. Web Audio Synthesizer Beeps (No external mp3 needed, zero latency)
 */

export interface PlateResult {
  plateKg: number;
  countPerSide: number;
  color: string;
}

export function calculatePlates(totalWeightKg: number, barWeightKg: number = 20): PlateResult[] {
  if (totalWeightKg <= barWeightKg) return [];

  let perSide = (totalWeightKg - barWeightKg) / 2;
  const plateConfig: { kg: number; color: string }[] = [
    { kg: 20, color: "#7C3AED" },    // CoachPR Purple
    { kg: 15, color: "#6D28D9" },    // Darker Purple
    { kg: 10, color: "#8B5CF6" },    // Violet
    { kg: 5, color: "#A78BFA" },     // Light Purple
    { kg: 2.5, color: "#C4B5FD" },   // Lavender
    { kg: 1.25, color: "#E9D5FF" },  // Soft White-Purple
  ];

  const result: PlateResult[] = [];

  for (const p of plateConfig) {
    const count = Math.floor(perSide / p.kg);
    if (count > 0) {
      result.push({ plateKg: p.kg, countPerSide: count, color: p.color });
      perSide = Math.round((perSide % p.kg) * 100) / 100;
    }
  }

  return result;
}

export interface WarmupSet {
  percentage: number;
  label: string;
  weightKg: number;
  reps: string;
  restSec: number;
}

export function calculateWarmupSets(workingWeightKg: number): WarmupSet[] {
  const round2_5 = (val: number) => Math.max(20, Math.round(val / 2.5) * 2.5);

  return [
    {
      percentage: 20,
      label: "تسخين مفاصل بالبار الفاضي",
      weightKg: 20,
      reps: "8-10 عدات",
      restSec: 30,
    },
    {
      percentage: 50,
      label: "مجموعة ضخ دم أولي (50%)",
      weightKg: round2_5(workingWeightKg * 0.5),
      reps: "5 عدات",
      restSec: 45,
    },
    {
      percentage: 70,
      label: "تحضير مسار الحركة (70%)",
      weightKg: round2_5(workingWeightKg * 0.7),
      reps: "3 عدات",
      restSec: 60,
    },
    {
      percentage: 85,
      label: "تفعيل الجهاز العصبي (85% Primer)",
      weightKg: round2_5(workingWeightKg * 0.85),
      reps: "1-2 عدات",
      restSec: 90,
    },
    {
      percentage: 100,
      label: "المجموعة الأساسية للوزن (100% Top Set)",
      weightKg: workingWeightKg,
      reps: "الهدف الكامل",
      restSec: 120,
    },
  ];
}

// Zero-latency programmatic audio beeps using Web Audio API
export function playHapticBeep(frequency: number = 600, durationMs: number = 150) {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.02);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + durationMs / 1000);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + durationMs / 1000);
  } catch (err) {
    // Audio context may be restricted by autoplay policy before user gesture
  }
}
