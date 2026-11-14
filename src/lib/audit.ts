import { supabase } from "@/lib/supabaseClient";

export interface AuditLogInput {
  actorId?: string;
  actorRole?: "coach" | "client" | "system";
  action: string;
  resourceType?: "client" | "attachment" | "session" | "plan";
  resourceId?: string;
  metadata?: Record<string, any>;
  ip?: string;
  userAgent?: string;
}

/**
 * Sanitizes metadata to strictly ensure NO plain OTP codes or full phone numbers are logged.
 */
function sanitizeMetadata(metadata?: Record<string, any>): Record<string, any> {
  if (!metadata) return {};
  const clean = { ...metadata };

  // Scrub sensitive OTP codes
  if ("otp" in clean) delete clean.otp;
  if ("code" in clean) delete clean.code;

  // Mask full phone numbers to last 4 digits
  if (typeof clean.phone === "string" && clean.phone.length > 4) {
    clean.phone_masked = `***${clean.phone.slice(-4)}`;
    delete clean.phone;
  }

  return clean;
}

/**
 * Fire-and-forget audit logger.
 * Catches all errors internally and NEVER throws exceptions to prevent breaking the primary business operation.
 */
export async function logAudit(input: AuditLogInput): Promise<void> {
  try {
    const cleanMetadata = sanitizeMetadata(input.metadata);

    const payload = {
      actor_id: input.actorId || null,
      actor_role: input.actorRole || "system",
      action: input.action,
      resource_type: input.resourceType || null,
      resource_id: input.resourceId || null,
      metadata: cleanMetadata,
      ip: input.ip || null,
      user_agent: input.userAgent || null,
      created_at: new Date().toISOString(),
    };

    // If supabase client is available, persist to audit_logs table
    if (supabase) {
      const { error } = await supabase.from("audit_logs").insert([payload]);
      if (error) {
        console.error("[audit_log_write_error]", {
          message: error.message,
          action: input.action,
        });
      }
    } else {
      // Local fallback log in dev
      console.log("[local_audit_log]", payload);
    }
  } catch (err) {
    // Non-blocking: Audit failure must never halt critical auth or transaction flows
    console.error("[audit_failed]", { err, action: input.action });
  }
}
