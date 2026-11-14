-- ==============================================================================
-- CoachPRB - OTP Verifications & Security Rate-Limiting Schema
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.otp_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT NOT NULL, -- normalized phone or email
  identifier_type TEXT NOT NULL CHECK (identifier_type IN ('phone', 'email')),
  code_hash TEXT NOT NULL,  -- SHA-256 hash of the 6-digit OTP (never plain text)
  attempts_count INT DEFAULT 0,
  max_attempts INT DEFAULT 5,
  expires_at TIMESTAMPTZ NOT NULL,
  cooldown_until TIMESTAMPTZ,
  locked_until TIMESTAMPTZ,
  verified BOOLEAN DEFAULT FALSE,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for lightning fast lookup and rate-limiting inspection
CREATE INDEX IF NOT EXISTS idx_otp_identifier_time ON public.otp_verifications(identifier, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_otp_ip_time ON public.otp_verifications(ip_address, created_at DESC);

-- Restrict direct access; accessible only through service role / secured backend route
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Disallow public access to otp_verifications"
ON public.otp_verifications
FOR ALL
TO anon, authenticated
USING (false);
