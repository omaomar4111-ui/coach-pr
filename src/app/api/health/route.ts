import { NextResponse } from "next/server";

// Hardened Health Check Endpoint for Monitoring & Uptime
// dynamic config omitted for Turbopack cacheComponents compatibility

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const isDetailed = searchParams.get("details") === "true";
  const authHeader = req.headers.get("Authorization");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let dbOk = false;
  let dbLatencyMs = -1;

  if (supabaseUrl && supabaseKey) {
    const start = Date.now();
    try {
      // 2-second strict timeout to prevent hung Serverless Functions
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2000);

      // Raw lightweight REST query to bypass heavy client cold-starts
      const res = await fetch(`${supabaseUrl}/rest/v1/`, {
        method: "HEAD",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        signal: controller.signal,
      });

      clearTimeout(timer);
      dbLatencyMs = Date.now() - start;
      dbOk = res.ok || res.status === 200 || res.status === 404;
    } catch (e) {
      dbOk = false;
      dbLatencyMs = Date.now() - start;
    }
  } else {
    dbOk = process.env.NODE_ENV !== "production";
  }

  // 1. Detailed View Requested
  if (isDetailed) {
    const healthSecret = process.env.HEALTH_CHECK_SECRET;

    // Fail-closed security: if no secret configured or invalid auth token -> 401 Unauthorized
    if (!healthSecret || !authHeader || authHeader !== `Bearer ${healthSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid or missing HEALTH_CHECK_SECRET token" },
        { status: 401, headers: { "Cache-Control": "no-store" } }
      );
    }

    return NextResponse.json(
      {
        status: dbOk ? "healthy" : "degraded",
        timestamp: new Date().toISOString(),
        database: {
          connected: dbOk,
          latencyMs: dbLatencyMs,
        },
        environment: process.env.NODE_ENV || "development",
      },
      {
        status: dbOk ? 200 : 503,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  }

  // 2. Public Clean View (UptimeRobot / External Pingers)
  // Strictly zero internal leak: no latency, no memory usage, no architecture dump
  if (!dbOk && process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        status: "degraded",
        timestamp: new Date().toISOString(),
      },
      {
        status: 503,
        headers: {
          "Retry-After": "30",
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  }

  return NextResponse.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    }
  );
}
