"use client";

import { useEffect } from "react";
import { initGlobalErrorMonitoring } from "@/lib/errorMonitoring";
import { trackFunnelEvent } from "@/lib/funnelTracker";

export default function DeviceTracker() {
  useEffect(() => {
    // 1. Initialize client-side error monitoring
    initGlobalErrorMonitoring();

    // 2. Track landing page view on first mount if home page
    if (typeof window !== "undefined" && (window.location.pathname === "/" || window.location.pathname === "")) {
      trackFunnelEvent("landing_page_view");
    }

    // 3. Telemetry ping
    try {
      const screenResolution = `${window.screen.width}x${window.screen.height} (DPR: ${window.devicePixelRatio || 1})`;
      
      // Fire-and-forget telemetry ping
      fetch("/api/telemetry/device", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          screenResolution,
          path: window.location.pathname,
          referrer: document.referrer || "Direct"
        })
      }).catch(() => {});
    } catch {
      // ignore
    }
  }, []);

  return null;
}
