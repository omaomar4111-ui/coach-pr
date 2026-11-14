-- Migration: Create audit_logs table with indexes and strict RLS
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID,                          -- NULL if System
  actor_role TEXT,                        -- 'coach' | 'client' | 'system'
  action TEXT NOT NULL,                   -- 'otp.send' | 'otp.verify.fail' | 'medical.view' | 'plan.save'
  resource_type TEXT,                     -- 'client' | 'attachment' | 'session' | 'plan'
  resource_id UUID,
  metadata JSONB DEFAULT '{}',            -- Strictly scrubbed: NO OTP codes, NO full phone numbers
  ip INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance and Query Optimization Indexes
CREATE INDEX IF NOT EXISTS idx_audit_actor_time ON audit_logs (actor_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_action_time ON audit_logs (action, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_resource ON audit_logs (resource_type, resource_id);

-- Strict RLS: Anon cannot read or write directly; only Service Role or backend API
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Deny public access by default
DROP POLICY IF EXISTS "Deny all public access to audit_logs" ON audit_logs;
CREATE POLICY "Deny all public access to audit_logs" ON audit_logs
  FOR ALL
  TO anon, authenticated
  USING (false);
