/**
 * CoachPR Client-Side Error & Crash Reporting Hook
 * Transparently captures unhandled window errors and promise rejections
 * and forwards them to /api/telemetry/error
 */

export function reportClientError(error: Error | string, context?: Record<string, any>) {
  if (typeof window === "undefined") return;

  const message = typeof error === "string" ? error : error.message || "Unknown client error";
  const stack = typeof error === "object" && error ? error.stack : undefined;

  fetch("/api/telemetry/error", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: "client",
      message,
      stack,
      url: window.location.href,
      handled: true,
      ...context,
    }),
  }).catch(() => {
    // Fail silently in telemetry
  });
}

export function initGlobalErrorMonitoring() {
  if (typeof window === "undefined") return;

  // Global uncaught error
  window.addEventListener("error", (event) => {
    reportClientError(event.error || event.message, {
      handled: false,
      lineno: event.lineno,
      colno: event.colno,
      filename: event.filename,
    });
  });

  // Global unhandled promise rejection
  window.addEventListener("unhandledrejection", (event) => {
    reportClientError(event.reason || "Unhandled Promise Rejection", {
      handled: false,
      type: "unhandledrejection",
    });
  });
}
