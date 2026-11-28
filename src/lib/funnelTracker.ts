import { FunnelEventName } from "@/app/api/telemetry/funnel/route";

/**
 * Lightweight Client-Side Commercial Funnel Tracker
 * Tracks 7 critical business milestones with zero marketing SDK dependencies.
 */
export function trackFunnelEvent(
  eventName: FunnelEventName,
  options?: {
    coachId?: string;
    athleteId?: string;
    metadata?: Record<string, any>;
  }
) {
  if (typeof window === "undefined") return;

  try {
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
