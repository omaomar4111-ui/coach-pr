import { FunnelEventName } from "@/app/api/telemetry/funnel/route";

/**
 * Deduplicated, Client-Safe Commercial Funnel Tracker
 * Prevents duplicate milestone reporting on page reloads or rapid clicks.
 */
export function trackFunnelEvent(
  eventName: FunnelEventName,
  options?: {
    coachId?: string;
    athleteId?: string;
    metadata?: Record<string, any>;
    dedupKey?: string;
  }
) {
  if (typeof window === "undefined") return;

  try {
    // Session deduplication check
    const dedupKey = options?.dedupKey || `coachpr_fnl_${eventName}_${options?.coachId || 'anon'}`;
    const lastTracked = sessionStorage.getItem(dedupKey);
    const now = Date.now();

    // Prevent identical event within 10 minutes unless explicitly bypassed
    if (lastTracked && now - parseInt(lastTracked, 10) < 10 * 60 * 1000) {
      return;
    }

    sessionStorage.setItem(dedupKey, String(now));

    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get("utm_source") || undefined;
    const utmMedium = urlParams.get("utm_medium") || undefined;
    const utmCampaign = urlParams.get("utm_campaign") || undefined;

    fetch("/api/telemetry/funnel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName,
        coachId: options?.coachId,
        athleteId: options?.athleteId,
        metadata: options?.metadata || {},
        utmSource,
        utmMedium,
        utmCampaign,
        path: window.location.pathname,
      }),
    }).catch(() => {
      // Fail silently to never interrupt user interaction
    });
  } catch {
    // Fail silently
  }
}
