import { supabase } from "./supabase";
import { logAudit } from "./audit";

/**
 * Custom Database Errors
 */
export class DatabaseConnectionError extends Error {
  public code: string;
  public retryable: boolean;

  constructor(message: string, code: string = "DB_CONN_ERR", retryable: boolean = true) {
    super(message);
    this.name = "DatabaseConnectionError";
    this.code = code;
    this.retryable = retryable;
  }
}

export class DatabaseUnavailableError extends Error {
  public code: string;
  public retryAfterSec: number;

  constructor(message: string = "Database circuit open due to consecutive failures", retryAfterSec: number = 30) {
    super(message);
    this.name = "DatabaseUnavailableError";
    this.code = "DB_CIRCUIT_OPEN";
    this.retryAfterSec = retryAfterSec;
  }
}

/**
 * Module-scoped In-Memory Circuit Breaker State (Instance level)
 * Trip condition: 5 consecutive failures
 * Recovery: Half-open after 30 seconds
 */
let consecutiveFailures = 0;
const FAILURE_THRESHOLD = 5;
const CIRCUIT_RESET_MS = 30000;
let circuitOpenedAt: number | null = null;

export function getCircuitBreakerStatus() {
  const isOpen = consecutiveFailures >= FAILURE_THRESHOLD;
  return {
    isOpen,
    consecutiveFailures,
    circuitOpenedAt,
  };
}

export function resetCircuitBreaker() {
  consecutiveFailures = 0;
  circuitOpenedAt = null;
}

function recordSuccess() {
  consecutiveFailures = 0;
  circuitOpenedAt = null;
}

function recordFailure(err: any) {
  consecutiveFailures++;
  if (consecutiveFailures >= FAILURE_THRESHOLD && !circuitOpenedAt) {
    circuitOpenedAt = Date.now();
    logAudit({
      action: "system.circuit_breaker_opened",
      resourceType: "system",
      metadata: {
        consecutiveFailures,
        error: String(err?.message || err),
      },
    });
  }
}

/**
 * Exponential Backoff with Jitter for Read Operations
 * Delays: ~100ms, ~500ms, ~2000ms (+ 0-50ms random jitter)
 */
const RETRY_DELAYS = [100, 500, 2000];

export async function executeWithRetry<T>(
  operation: (signal?: AbortSignal) => Promise<T>,
  isReadOperation: boolean = false,
  idempotencyKey?: string
): Promise<T> {
  const now = Date.now();
  if (consecutiveFailures >= FAILURE_THRESHOLD) {
    if (circuitOpenedAt && now - circuitOpenedAt > CIRCUIT_RESET_MS) {
      // Half-open trial state: allow one attempt
      circuitOpenedAt = null;
    } else {
      throw new DatabaseUnavailableError();
    }
  }

  // Non-read operations without idempotency key are strictly NOT retried
  const allowRetry = isReadOperation || !!idempotencyKey;
  const maxAttempts = allowRetry ? 3 : 1;

  let lastError: any = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    try {
      const result = await operation(controller.signal);
      clearTimeout(timeout);
      recordSuccess();
      return result;
    } catch (err: any) {
      clearTimeout(timeout);
      lastError = err;

      // Check if 4xx client / constraint violation error (Do not retry 4xx errors)
      const isClientError = err?.status >= 400 && err?.status < 500;
      const isConstraintViolation = err?.code === "23505" || err?.code === "23503";

      if (isClientError || isConstraintViolation) {
        throw err;
      }

      if (attempt < maxAttempts) {
        const baseDelay = RETRY_DELAYS[attempt - 1] || 1000;
        const jitter = Math.floor(Math.random() * 50);
        await new Promise((res) => setTimeout(res, baseDelay + jitter));
      }
    }
  }

  // All attempts exhausted
  recordFailure(lastError);

  if (process.env.NODE_ENV === "production") {
    throw new DatabaseConnectionError(
      lastError?.message || "Failed to execute database operation after retries"
    );
  }

  throw lastError;
}

export interface CoachRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  tier: string;
  createdAt: string;
}

export interface ClientRecord {
  id: string;
  coachId: string;
  name: string;
  phone: string;
  email: string;
  goal: string;
  injuries: string[];
  medicalNotes: string;
  subscriptionStatus: "active" | "pending_renewal" | "frozen" | "expired";
  subscriptionEnd: string;
  streakDays: number;
  dailyScore: number;
  attachments: {
    id: string;
    name: string;
    type: "xray" | "lab";
    date: string;
    size: string;
    storagePath?: string;
    dataUrl?: string;
  }[];
}

export interface ExerciseEntry {
  id: string;
  name: string;
  targetMuscle: string;
  sets: number;
  reps: string;
  weightKg: string;
  rpe: string;
  restSec: number;
  tempo: string;
  injuryRisk?: string;
}

export interface WorkoutDayRecord {
  id: string;
  dayName: string;
  focus: string;
  exercises: ExerciseEntry[];
}

export interface WorkoutPlanRecord {
  id: string;
  coachId: string;
  clientId: string;
  title: string;
  days: WorkoutDayRecord[];
  updatedAt: string;
}

export interface FormCheckVideoRecord {
  id: string;
  clientId: string;
  clientName: string;
  exerciseName: string;
  videoDurationSec: number;
  status: "pending" | "approved" | "needs_fix";
  createdAt: string;
  expiresAt: string; // ISO timestamp 12h later
  coachFeedback?: string;
  videoDataUrl?: string;
  storagePath?: string;
  notesAtSeconds: {
    second: number;
    text: string;
    hasVoiceNote: boolean;
  }[];
}

// Development / Non-Production In-Memory Fallback
class CoachStore {
  private static instance: CoachStore;

  public clients: ClientRecord[] = [
    {
      id: "client-1",
      coachId: "coach-demo",
      name: "كريم أحمد مصطفى",
      phone: "01144826641",
      email: "kareem@example.com",
      goal: "تنشيف عالي وبناء عضلات",
      injuries: ["غضروف فقرات قطنية L4-L5", "التهاب وتر الكتف الأيمن"],
      medicalNotes: "يمنع تحميل الأوزان المحورية المباشرة على العمود الفقري. استبدال الاسكوات بالهاك أو الليج برس.",
      subscriptionStatus: "active",
      subscriptionEnd: "2026-12-15",
      streakDays: 19,
      dailyScore: 8,
      attachments: [
        { id: "att-1", name: "رنين مغناطيسي MRI - فقرات قطنية.pdf", type: "xray", date: "2026-10-12", size: "2.4 MB" },
        { id: "att-2", name: "تحليل دم شامل CBC ومؤشرات التهاب CRP.pdf", type: "lab", date: "2026-11-01", size: "1.1 MB" }
      ]
    },
    {
      id: "client-2",
      coachId: "coach-demo",
      name: "عمر فاروق عبد الله",
      phone: "01099887766",
      email: "omar.f@example.com",
      goal: "زيادة الحجم العضلي والقوة",
      injuries: [],
      medicalNotes: "لا توجد إصابات مسجلة.",
      subscriptionStatus: "pending_renewal",
      subscriptionEnd: "2026-11-18",
      streakDays: 12,
      dailyScore: 9,
      attachments: []
    }
  ];

  public plans: Record<string, WorkoutPlanRecord> = {
    "client-1": {
      id: "plan-kareem",
      coachId: "coach-demo",
      clientId: "client-1",
      title: "برنامج كابتن كريم أحمد (تضخيم وقوة مع حماية الظهر)",
      updatedAt: new Date().toISOString(),
      days: [
        {
          id: "day-1",
          dayName: "يوم 1: سحب وضهر (Pull Day)",
          focus: "ظهر ولاتس وبايسبس",
          exercises: [
            {
              id: "ex-1",
              name: "Lat Pulldown (سحب عالي قبضة واسعة)",
              targetMuscle: "ظهر ولاتس (Lats)",
              sets: 4,
              reps: "8-10",
              weightKg: "70",
              rpe: "8.5",
              restSec: 90,
              tempo: "3-0-1-0"
            },
            {
              id: "ex-2",
              name: "Barbell Biceps Curl (بايسبس بار زجزاج)",
              targetMuscle: "بايسبس (Biceps)",
              sets: 3,
              reps: "10-12",
              weightKg: "30",
              rpe: "8.0",
              restSec: 60,
              tempo: "2-0-1-0"
            }
          ]
        },
        {
          id: "day-2",
          dayName: "يوم 2: دفع وصدر (Push Day)",
          focus: "صدر وأكتاف وترايسبس",
          exercises: [
            {
              id: "ex-3",
              name: "Incline Dumbbell Press (تجميع دمبلز عالي)",
              targetMuscle: "صدر علوي",
              sets: 4,
              reps: "8-10",
              weightKg: "28",
              rpe: "8.0",
              restSec: 75,
              tempo: "3-0-1-0"
            }
          ]
        }
      ]
    }
  };

  public formCheckVideos: FormCheckVideoRecord[] = [
    {
      id: "fc-1",
      clientId: "client-1",
      clientName: "كريم أحمد مصطفى",
      exerciseName: "Barbell Back Squat (اسكوات خلفي)",
      videoDurationSec: 18,
      status: "pending",
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 10 * 3600 * 1000).toISOString(),
      notesAtSeconds: [
        { second: 4, text: "الركبتين بتقفل للداخل خفيف عند الصعود. حاول تفتح ركبتيك لبرة وتضغط بكامل باطن رجلك.", hasVoiceNote: true }
      ]
    },
    {
      id: "fc-2",
      clientId: "client-2",
      clientName: "عمر فاروق عبد الله",
      exerciseName: "Romanian Deadlift (ديدليفت روماني)",
      videoDurationSec: 15,
      status: "approved",
      createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
      expiresAt: new Date(Date.now() + 8 * 3600 * 1000).toISOString(),
      coachFeedback: "تكنيك معتمد وممتاز! استمر بنفس الزوايا.",
      notesAtSeconds: [
        { second: 6, text: "تكنيك ممتاز ومستقيم، بس حافظ على رقبتك في خط مستقيم مع عمودك الفقري.", hasVoiceNote: false }
      ]
    }
  ];

  public static getInstance(): CoachStore {
    if (!CoachStore.instance) {
      CoachStore.instance = new CoachStore();
    }
    return CoachStore.instance;
  }

  public purgeExpiredVideos(): number {
    const now = new Date().getTime();
    const initialCount = this.formCheckVideos.length;
    this.formCheckVideos = this.formCheckVideos.filter(v => new Date(v.expiresAt).getTime() > now);
    return initialCount - this.formCheckVideos.length;
  }
}

/**
 * Proxy for globalStore to guard against memory persistence in production.
 * In production: accessing globalStore throws DatabaseUnavailableError to prevent silent data loss.
 */
export const globalStore = new Proxy({} as CoachStore, {
  get(_target, prop) {
    if (process.env.NODE_ENV === "production") {
      throw new DatabaseUnavailableError(
        "In-Memory CoachStore fallback is strictly prohibited in production. Configure Supabase credentials."
      );
    }
    const store = CoachStore.getInstance();
    const val = (store as any)[prop];
    if (typeof val === "function") {
      return val.bind(store);
    }
    return val;
  },
  set(_target, prop, value) {
    if (process.env.NODE_ENV === "production") {
      throw new DatabaseUnavailableError(
        "In-Memory CoachStore fallback is strictly prohibited in production. Configure Supabase credentials."
      );
    }
    const store = CoachStore.getInstance();
    (store as any)[prop] = value;
    return true;
  }
});
