-- CoachPRB Pilot Applications Table Migration
-- Idempotent schema definition for onboarding first 10 coaches cohort

CREATE TABLE IF NOT EXISTS pilot_applications (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    country_city TEXT,
    instagram TEXT NOT NULL,
    active_clients TEXT,
    workflow TEXT,
    pain_point TEXT,
    device TEXT,
    form_check TEXT,
    score INTEGER DEFAULT 0,
    status TEXT DEFAULT 'shortlisted',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pilot_applications_score ON pilot_applications(score DESC);
CREATE INDEX IF NOT EXISTS idx_pilot_applications_phone ON pilot_applications(phone);
