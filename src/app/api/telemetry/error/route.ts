import { NextRequest, NextResponse } from "next/server";
import { logAudit } from "@/lib/audit";

export interface ErrorReport {
  id: string;
  source: "client" | "server" | "network" | "offline_sw";
  message: string;
  stack?: string;
  url?: string;
  userId?: string;
  role?: string;
  userAgent?: string;
  timestamp: string;
  handled: boolean;
}

// In-memory buffer for immediate operational inspection (capped at 200 items)
const inMemoryErrorBuffer: ErrorReport[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { source = "client", message, stack, url, userId, role, handled = true } = body;

    if (!message) {
      return NextResponse.json({ error: "message is required" }, { status: 400 });
    }

    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "unknown";

    const errorRecord: ErrorReport = {
      id: `err_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      source,
      message: String(message).slice(0, 500),
      stack: stack ? String(stack).slice(0, 2000) : undefined,
      url: url ? String(url).slice(0, 200) : undefined,
      userId: userId || "anonymous",
      role: role || "unauthenticated",
      userAgent,
      timestamp: new Date().toISOString(),
      handled: Boolean(handled),
    };

    // Store in circular buffer
    if (inMemoryErrorBuffer.length >= 200) {
      inMemoryErrorBuffer.shift();
    }
    inMemoryErrorBuffer.push(errorRecord);

    // Operational logging to console
    console.error(`[PROD_ERROR_LOG] [${source.toUpperCase()}] ${errorRecord.message}`, {
      id: errorRecord.id,
      url: errorRecord.url,
      userId: errorRecord.userId,
      ip: clientIp,
    });

    // Fire-and-forget audit log
    await logAudit({
      actorId: errorRecord.userId,
      actorRole: (errorRecord.role as any) || "system",
      action: "system.error_logged",
      resourceType: "system",
      resourceId: errorRecord.id,
      ip: clientIp,
      metadata: {
        source,
        message: errorRecord.message,
        url: errorRecord.url,
        handled,
      },
    });

    return NextResponse.json({
      success: true,
      errorId: errorRecord.id,
      status: "logged",
    });
  } catch (err: any) {
    console.error("Failed to log telemetry error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Return recent errors for operational dashboard
  return NextResponse.json({
    success: true,
    count: inMemoryErrorBuffer.length,
    recentErrors: inMemoryErrorBuffer.slice(-50).reverse(),
  });
}
