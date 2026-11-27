import { NextRequest, NextResponse } from "next/server";
import { logAudit } from "@/lib/audit";

export type FunnelEventName =
  | "landing_page_view"
  | "demo_booked"
  | "coach_signup"
  | "coach_activated"
  | "athlete_invited"
  | "first_workout_completed"
  | "subscription_started";

export interface FunnelEventPayload {
  id: string;
  eventName: FunnelEventName;
  coachId?: string;
  athleteId?: string;
  metadata?: Record<string, any>;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  path?: string;
  ip?: string;
  timestamp: string;
}

// In-memory circular buffer for commercial funnel events (capped at 500 records)
const inMemoryFunnelEvents: FunnelEventPayload[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      eventName,
      coachId,
      athleteId,
      metadata = {},
      utmSource,
      utmMedium,
      utmCampaign,
      path,
    } = body;

    const validEvents: FunnelEventName[] = [
      "landing_page_view",
      "demo_booked",
      "coach_signup",
      "coach_activated",
      "athlete_invited",
      "first_workout_completed",
      "subscription_started",
    ];

    if (!eventName || !validEvents.includes(eventName)) {
      return NextResponse.json(
        { error: `حدث غير صالح. الأحداث المعتمدة: ${validEvents.join(", ")}` },
        { status: 400 }
      );
    }

    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";

    const eventRecord: FunnelEventPayload = {
      id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      eventName,
      coachId: coachId || "anonymous",
      athleteId,
      metadata,
      utmSource: utmSource || metadata?.utm_source,
      utmMedium: utmMedium || metadata?.utm_medium,
      utmCampaign: utmCampaign || metadata?.utm_campaign,
      path: path || "/",
      ip: clientIp,
      timestamp: new Date().toISOString(),
    };

    if (inMemoryFunnelEvents.length >= 500) {
      inMemoryFunnelEvents.shift();
    }
    inMemoryFunnelEvents.push(eventRecord);

    console.log(`[GTM_FUNNEL_EVENT] [${eventRecord.eventName}]`, {
      id: eventRecord.id,
      coachId: eventRecord.coachId,
      source: eventRecord.utmSource || "direct",
    });

    // Fire-and-forget audit log for business funnel
    await logAudit({
      actorId: eventRecord.coachId,
      actorRole: "system",
      action: `funnel.${eventRecord.eventName}`,
      resourceType: "system",
      resourceId: eventRecord.id,
      ip: clientIp,
      metadata: {
        eventName: eventRecord.eventName,
        utmSource: eventRecord.utmSource,
        ...metadata,
      },
    });

    return NextResponse.json({
      success: true,
      eventId: eventRecord.id,
      eventName: eventRecord.eventName,
    });
  } catch (err: any) {
    console.error("Funnel event error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Aggregate conversion funnel metrics for Platform Owner
  const counts: Record<FunnelEventName, number> = {
    landing_page_view: 0,
    demo_booked: 0,
    coach_signup: 0,
    coach_activated: 0,
    athlete_invited: 0,
    first_workout_completed: 0,
    subscription_started: 0,
  };

  for (const ev of inMemoryFunnelEvents) {
    if (counts[ev.eventName] !== undefined) {
      counts[ev.eventName]++;
    }
  }

  // Calculate high-level conversion rates safely
  const landingViews = counts.landing_page_view || 1;
  const signups = counts.coach_signup || 0;
  const subscriptions = counts.subscription_started || 0;

  const signupConversionRate = `${((signups / landingViews) * 100).toFixed(1)}%`;
  const paidConversionRate = signups > 0 ? `${((subscriptions / signups) * 100).toFixed(1)}%` : "0.0%";

  return NextResponse.json({
    success: true,
    funnelCounts: counts,
    metrics: {
      totalEventsTracked: inMemoryFunnelEvents.length,
      signupConversionRate,
      paidConversionRate,
    },
    recentEvents: inMemoryFunnelEvents.slice(-30).reverse(),
  });
}
