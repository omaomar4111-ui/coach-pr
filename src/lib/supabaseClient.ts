import { createClient, SupabaseClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export function isSupabaseConfigured(): boolean {
  return !!url && !!anonKey && !!serviceKey;
}

// للاستخدام في Client Components
export const supabaseBrowser: SupabaseClient = createClient(url || 'https://placeholder.supabase.co', anonKey || 'placeholder');
export const supabase = supabaseBrowser;

// للاستخدام في API Routes فقط — يتجاوز RLS
function getAdminClient(): SupabaseClient {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase not configured. Set SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in env.');
  }
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getAdminClient();
    return (client as any)[prop];
  },
});
