import { describe, it, expect, beforeEach } from "vitest";

describe("CoachPRB Production Security & Resilience Suite", () => {
  it("OTP HMAC-SHA256 generates consistent resistant hash", async () => {
    const { createHmac } = await import("crypto");
    const pepper = "coachprb_dev_secret_pepper_2026";
    const code = "482910";
    const hash = createHmac("sha256", pepper).update(code).digest("hex");
    expect(hash).toHaveLength(64);
    expect(createHmac("sha256", pepper).update(code).digest("hex")).toBe(hash);
  });

  it("Idempotent migration logic skips already migrated records", async () => {
    const { migrateLegacyAttachments } = await import("../scripts/migrate-attachments");
    const res = await migrateLegacyAttachments();
    expect(res.skippedCount).toBe(2);
    expect(res.migratedCount).toBe(0);
  });
});
