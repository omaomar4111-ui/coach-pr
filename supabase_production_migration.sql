-- ============================================
-- coach-pr Production Schema
-- ============================================

-- 1. المتاجر / الـ Tenants
CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  phone_number_id TEXT,
  access_token TEXT,
  active_agent TEXT DEFAULT 'sara_tarek',
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. العملاء
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT,
  phone TEXT NOT NULL,
  channel TEXT DEFAULT 'whatsapp',
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, phone)
);

-- 3. المحادثات
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'open',
  ai_enabled BOOLEAN DEFAULT TRUE,
  active_agent TEXT DEFAULT 'sara_tarek',
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. الرسائل
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  provider_message_id TEXT UNIQUE, -- Idempotency
  direction TEXT CHECK (direction IN ('inbound', 'outbound')),
  sender_type TEXT CHECK (sender_type IN ('customer', 'agent', 'bot', 'system')),
  sender_id TEXT,
  content TEXT NOT NULL,
  media_url TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. الأوردرات — 🔑 الأهم
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES conversations(id),
  customer_id UUID REFERENCES customers(id),
  order_number TEXT UNIQUE,
  customer_name TEXT,
  phone TEXT,
  address TEXT,
  product TEXT,
  size TEXT,
  color TEXT,
  quantity INT DEFAULT 1,
  total_amount NUMERIC(10,2),
  payment_method TEXT,
  payment_verified BOOLEAN DEFAULT FALSE,
  payment_reference TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  tracking_number TEXT,
  raw_ai_extraction JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. المدفوعات — 🔑 للـ Vision
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  screenshot_url TEXT,
  extracted_amount NUMERIC(10,2),
  extracted_reference TEXT,
  extracted_method TEXT,
  ai_confidence NUMERIC(3,2),
  verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Indexes للأداء
-- ============================================
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_tenant ON conversations(tenant_id, last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_tenant ON orders(tenant_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders(phone);
CREATE INDEX IF NOT EXISTS idx_payments_order ON payments(order_id);

-- ============================================
-- Trigger لتحديث updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_tenants_updated ON tenants;
CREATE TRIGGER trg_tenants_updated BEFORE UPDATE ON tenants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_orders_updated ON orders;
CREATE TRIGGER trg_orders_updated BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- Demo Tenant (للتطوير)
-- ============================================
INSERT INTO tenants (name, slug, active_agent, phone_number_id)
VALUES ('متجر ديمو', 'demo-store', 'sara_tarek', 'MOCK_PHONE_ID')
ON CONFLICT (slug) DO NOTHING;
