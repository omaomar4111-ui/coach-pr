-- ==============================================================================
-- CoachPRB (كوتش بي آر بي) - Core Fitness SaaS Production Schema
-- Designed for Bodybuilding & Strength Coaches with Row-Level Security (RLS)
-- ==============================================================================

-- 1. جدول المدربين (Coaches)
CREATE TABLE IF NOT EXISTS coaches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'pro' CHECK (subscription_tier IN ('starter', 'pro', 'elite')),
  settings JSONB DEFAULT '{"currency": "EGP", "whatsapp_reminders": true}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. جدول المتدربين (Athletes / Trainees)
CREATE TABLE IF NOT EXISTS athletes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID REFERENCES coaches(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  goal TEXT DEFAULT 'hypertrophy' CHECK (goal IN ('hypertrophy', 'strength', 'fat_loss', 'rehab')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'churn_risk', 'paused', 'expired')),
  current_weight_kg NUMERIC(5,2),
  target_weight_kg NUMERIC(5,2),
  injuries TEXT[] DEFAULT '{}',
  notes TEXT,
  last_checkin_at TIMESTAMPTZ DEFAULT NOW(),
  days_missed INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(coach_id, phone)
);

-- 3. جدول الخطط التدريبية (Workout Plans)
CREATE TABLE IF NOT EXISTS workout_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID REFERENCES coaches(id) ON DELETE CASCADE,
  athlete_id UUID REFERENCES athletes(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  split_type TEXT DEFAULT 'push_pull_legs',
  is_template BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. جدول الأيام التدريبية (Workout Days)
CREATE TABLE IF NOT EXISTS workout_days (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID REFERENCES workout_plans(id) ON DELETE CASCADE,
  day_name TEXT NOT NULL,
  focus_area TEXT NOT NULL,
  day_order INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. جدول التمارين الموصوفة (Prescribed Exercises)
CREATE TABLE IF NOT EXISTS workout_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_id UUID REFERENCES workout_days(id) ON DELETE CASCADE,
  exercise_name TEXT NOT NULL,
  target_muscle TEXT NOT NULL,
  prescribed_sets INT NOT NULL DEFAULT 3,
  prescribed_reps TEXT NOT NULL DEFAULT '8-10',
  target_weight_kg NUMERIC(5,2) DEFAULT 20.0,
  target_rir INT DEFAULT 2,
  rest_seconds INT DEFAULT 90,
  injury_warning TEXT,
  exercise_order INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. جدول سجل أداء التمرين الحي (Workout Execution Logs)
CREATE TABLE IF NOT EXISTS workout_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id UUID REFERENCES athletes(id) ON DELETE CASCADE,
  day_id UUID REFERENCES workout_days(id) ON DELETE SET NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  total_duration_sec INT,
  athlete_feedback TEXT,
  rpe_session INT CHECK (rpe_session BETWEEN 1 AND 10),
  synced_offline BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. تفاصيل المجموعات المسجلة من المتدرب (Logged Sets)
CREATE TABLE IF NOT EXISTS logged_sets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_log_id UUID REFERENCES workout_logs(id) ON DELETE CASCADE,
  exercise_id UUID REFERENCES workout_exercises(id) ON DELETE SET NULL,
  set_number INT NOT NULL,
  actual_weight_kg NUMERIC(5,2) NOT NULL,
  actual_reps INT NOT NULL,
  actual_rir INT DEFAULT 2,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. جدول فحص التكنيك والفورم (Form Checks & Video Cues)
CREATE TABLE IF NOT EXISTS form_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID REFERENCES coaches(id) ON DELETE CASCADE,
  athlete_id UUID REFERENCES athletes(id) ON DELETE CASCADE,
  exercise_name TEXT NOT NULL,
  video_url TEXT NOT NULL,
  video_timestamp_cue NUMERIC(6,2),
  bar_path_status TEXT DEFAULT 'optimal' CHECK (bar_path_status IN ('optimal', 'minor_deviation', 'high_risk')),
  ai_preliminary_notes TEXT,
  coach_written_feedback TEXT,
  coach_voice_note_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);

-- 9. جدول قرارات مساعد الكوتش الذكي (Copilot Approval Decisions)
CREATE TABLE IF NOT EXISTS copilot_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID REFERENCES coaches(id) ON DELETE CASCADE,
  athlete_id UUID REFERENCES athletes(id) ON DELETE CASCADE,
  agent_type TEXT NOT NULL CHECK (agent_type IN ('pr_progression', 'joint_sentinel', 'macro_architect', 'churn_guard')),
  title TEXT NOT NULL,
  analysis_reason TEXT NOT NULL,
  proposed_action TEXT NOT NULL,
  confidence_score INT DEFAULT 95,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  decided_at TIMESTAMPTZ
);

-- تفعيل الـ RLS للحماية الكاملة
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE athletes ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE logged_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE copilot_approvals ENABLE ROW LEVEL SECURITY;
