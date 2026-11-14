-- Schema for Coach PR (PostgreSQL / Supabase)

-- 1. Coaches Profiles
CREATE TABLE IF NOT EXISTS public.coaches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  brand_name TEXT DEFAULT 'Coach PR',
  tier TEXT DEFAULT 'pro' CHECK (tier IN ('starter', 'pro', 'max', 'agency')),
  ai_credits_balance INT DEFAULT 100,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Clients
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID NOT NULL REFERENCES public.coaches(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  gender TEXT CHECK (gender IN ('male', 'female')),
  age INT,
  height NUMERIC(5,2),
  start_weight NUMERIC(5,2),
  current_weight NUMERIC(5,2),
  target_weight NUMERIC(5,2),
  goal TEXT,
  injuries TEXT,
  allergies TEXT,
  subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'pending_renewal', 'frozen', 'expired')),
  subscription_start TIMESTAMPTZ DEFAULT NOW(),
  subscription_end TIMESTAMPTZ,
  daily_score INT DEFAULT 10,
  streak_days INT DEFAULT 0,
  at_risk BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Exercise Database
CREATE TABLE IF NOT EXISTS public.exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  target_muscle TEXT NOT NULL,
  secondary_muscles TEXT[],
  equipment TEXT,
  video_url TEXT,
  instructions_ar TEXT,
  tips TEXT,
  coach_id UUID REFERENCES public.coaches(id) ON DELETE SET NULL, -- Null if global exercise
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Workout Plans
CREATE TABLE IF NOT EXISTS public.workout_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID NOT NULL REFERENCES public.coaches(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  days_per_week INT DEFAULT 4,
  is_template BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Workout Days & Exercises
CREATE TABLE IF NOT EXISTS public.workout_routine_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES public.workout_plans(id) ON DELETE CASCADE,
  day_number INT NOT NULL,
  day_name TEXT NOT NULL,
  exercise_id UUID NOT NULL REFERENCES public.exercises(id),
  sets INT DEFAULT 3,
  reps_range TEXT DEFAULT '8-12',
  rpe NUMERIC(3,1),
  rest_seconds INT DEFAULT 90,
  notes TEXT,
  order_index INT DEFAULT 0
);

-- 6. Personal Records (PR System)
CREATE TABLE IF NOT EXISTS public.personal_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  exercise_id UUID NOT NULL REFERENCES public.exercises(id),
  weight_kg NUMERIC(6,2) NOT NULL,
  reps INT NOT NULL,
  estimated_one_rep_max NUMERIC(6,2),
  achieved_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Form Checks (Video & Voice Reviews)
CREATE TABLE IF NOT EXISTS public.form_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  coach_id UUID NOT NULL REFERENCES public.coaches(id) ON DELETE CASCADE,
  exercise_id UUID NOT NULL REFERENCES public.exercises(id),
  video_url TEXT NOT NULL,
  client_notes TEXT,
  coach_audio_feedback_url TEXT,
  coach_text_feedback TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);
