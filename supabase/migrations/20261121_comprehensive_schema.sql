-- ==============================================================================
-- CoachPR Production Comprehensive Database Schema
-- Multi-Tenant Fitness & Strength Coaching SaaS (Supabase PostgreSQL)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. COACHES & TENANTS
CREATE TABLE IF NOT EXISTS public.coaches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE, -- linked to supabase auth.users
  full_name TEXT NOT NULL,
  brand_name TEXT DEFAULT 'CoachPR',
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  avatar_url TEXT,
  tier TEXT DEFAULT 'pro' CHECK (tier IN ('starter', 'pro', 'max', 'agency')),
  ai_credits_balance INT DEFAULT 250,
  currency TEXT DEFAULT 'EGP',
  settings JSONB DEFAULT '{"theme": "dark_luxury", "notifications_enabled": true, "whatsapp_auto_welcome": true}'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ATHLETES / CLIENTS
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID REFERENCES public.coaches(id) ON DELETE CASCADE,
  user_id UUID UNIQUE, -- athlete app login
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
  medical_notes TEXT,
  subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'pending_renewal', 'frozen', 'expired', 'lead')),
  subscription_start TIMESTAMPTZ DEFAULT NOW(),
  subscription_end TIMESTAMPTZ,
  monthly_fee NUMERIC(10,2) DEFAULT 1200.00,
  daily_score NUMERIC(3,1) DEFAULT 8.5,
  streak_days INT DEFAULT 0,
  at_risk BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. EXERCISE CATALOG
CREATE TABLE IF NOT EXISTS public.exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID REFERENCES public.coaches(id) ON DELETE SET NULL, -- Null if global exercise
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  target_muscle TEXT NOT NULL,
  secondary_muscles TEXT[] DEFAULT '{}',
  equipment TEXT DEFAULT 'barbell',
  video_url TEXT,
  thumbnail_url TEXT,
  cues_ar TEXT,
  knee_friendly BOOLEAN DEFAULT TRUE,
  lower_back_safe BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. WORKOUT PLANS & TEMPLATES
CREATE TABLE IF NOT EXISTS public.workout_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID NOT NULL REFERENCES public.coaches(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  days_per_week INT DEFAULT 4,
  is_template BOOLEAN DEFAULT FALSE,
  category TEXT DEFAULT 'hypertrophy' CHECK (category IN ('hypertrophy', 'strength', 'fat_loss', 'powerlifting', 'rehab')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. WORKOUT ROUTINE ITEMS / SESSIONS
CREATE TABLE IF NOT EXISTS public.workout_routine_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES public.workout_plans(id) ON DELETE CASCADE,
  day_number INT NOT NULL,
  day_name TEXT NOT NULL,
  exercise_id UUID NOT NULL REFERENCES public.exercises(id) ON DELETE CASCADE,
  order_index INT DEFAULT 0,
  sets INT DEFAULT 3,
  reps_range TEXT DEFAULT '8-12',
  target_rpe NUMERIC(3,1) DEFAULT 8.0,
  rest_seconds INT DEFAULT 90,
  tempo TEXT DEFAULT '3-0-1-0',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. WORKOUT LOGS & SET TRACKING (OFFLINE PWA SYNC TARGET)
CREATE TABLE IF NOT EXISTS public.workout_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES public.workout_plans(id) ON DELETE SET NULL,
  day_name TEXT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ,
  duration_minutes INT,
  total_volume_kg NUMERIC(10,2) DEFAULT 0,
  total_sets INT DEFAULT 0,
  notes TEXT,
  synced_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.logged_sets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  log_id UUID NOT NULL REFERENCES public.workout_logs(id) ON DELETE CASCADE,
  exercise_name TEXT NOT NULL,
  set_number INT NOT NULL,
  weight_kg NUMERIC(6,2) NOT NULL,
  reps INT NOT NULL,
  rpe NUMERIC(3,1),
  completed BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. PERSONAL RECORDS (PR SYSTEM)
CREATE TABLE IF NOT EXISTS public.personal_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  exercise_name TEXT NOT NULL,
  weight_kg NUMERIC(6,2) NOT NULL,
  reps INT NOT NULL,
  estimated_1rm NUMERIC(6,2) GENERATED ALWAYS AS (weight_kg * (1 + reps / 30.0)) STORED,
  achieved_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ATHLETE READINESS AUTOPILOT
CREATE TABLE IF NOT EXISTS public.readiness_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  sleep_hours NUMERIC(3,1) NOT NULL,
  soreness_level INT CHECK (soreness_level BETWEEN 1 AND 5),
  stress_level INT CHECK (stress_level BETWEEN 1 AND 5),
  water_liters NUMERIC(3,1),
  score INT NOT NULL,
  recommendation TEXT NOT NULL,
  sets_adjustment TEXT NOT NULL,
  log_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. NUTRITION PLANS & FOOD LOGS
CREATE TABLE IF NOT EXISTS public.nutrition_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID NOT NULL REFERENCES public.coaches(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  calories INT NOT NULL,
  protein_g INT NOT NULL,
  carbs_g INT NOT NULL,
  fats_g INT NOT NULL,
  water_target_l NUMERIC(3,1) DEFAULT 3.5,
  meals_count INT DEFAULT 4,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. PAYMENTS & SUBSCRIPTION BILLING
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID NOT NULL REFERENCES public.coaches(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  amount NUMERIC(10,2) NOT NULL,
  currency TEXT DEFAULT 'EGP',
  provider TEXT DEFAULT 'instapay' CHECK (provider IN ('instapay', 'vodafone_cash', 'fawry', 'paymob', 'card', 'cash')),
  reference_number TEXT,
  status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'refunded', 'failed')),
  period_months INT DEFAULT 1,
  paid_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. INBOX & UNIFIED CHAT (COACH-CLIENT-AI)
CREATE TABLE IF NOT EXISTS public.chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID NOT NULL REFERENCES public.coaches(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  channel TEXT DEFAULT 'in_app' CHECK (channel IN ('in_app', 'whatsapp', 'telegram')),
  last_message TEXT,
  unread_coach INT DEFAULT 0,
  unread_client INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('coach', 'client', 'ai_assistant')),
  content TEXT NOT NULL,
  attachment_url TEXT,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. AI COPILOT AUDIT & PROMPTS
CREATE TABLE IF NOT EXISTS public.ai_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID NOT NULL REFERENCES public.coaches(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  model TEXT DEFAULT 'gemini-1.5-pro',
  task_type TEXT NOT NULL CHECK (task_type IN ('workout_generation', 'nutrition_calc', 'form_check_critique', 'client_retention_msg')),
  prompt TEXT NOT NULL,
  response TEXT NOT NULL,
  credits_used INT DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_clients_coach ON public.clients(coach_id);
CREATE INDEX IF NOT EXISTS idx_workout_plans_client ON public.workout_plans(client_id);
CREATE INDEX IF NOT EXISTS idx_workout_logs_client ON public.workout_logs(client_id);
CREATE INDEX IF NOT EXISTS idx_payments_coach ON public.payments(coach_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conv ON public.chat_messages(conversation_id);
