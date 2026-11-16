-- Add instagram channel support to customers
ALTER TABLE customers 
ADD COLUMN IF NOT EXISTS channel TEXT DEFAULT 'whatsapp';

-- Ensure provider_message_id unique (idempotency)
ALTER TABLE messages
DROP CONSTRAINT IF EXISTS messages_provider_message_id_key;

ALTER TABLE messages
ADD CONSTRAINT messages_provider_message_id_key UNIQUE (provider_message_id);

-- Add ai_enabled to conversations if missing
ALTER TABLE conversations
ADD COLUMN IF NOT EXISTS ai_enabled BOOLEAN DEFAULT TRUE;

-- Index for faster agent lookup
CREATE INDEX IF NOT EXISTS idx_conversations_agent 
ON conversations(active_agent, status);

-- Index for faster message lookup by provider id
CREATE INDEX IF NOT EXISTS idx_messages_provider 
ON messages(provider_message_id);
