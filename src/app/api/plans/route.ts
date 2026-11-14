import { NextResponse } from "next/server";
import { globalStore } from "@/lib/db";

// GET /api/plans?clientId=...
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("clientId") || "client-1";

  const plan = globalStore.plans[clientId];
  if (!plan) {
    // Return empty starter plan
    return NextResponse.json({
      success: true,
      plan: {
        id: `plan-${clientId}`,
        coachId: "coach-demo",
        clientId,
        title: "برنامج تدريبي مخصص",
        updatedAt: new Date().toISOString(),
        days: [
          {
            id: "day-1",
            dayName: "يوم 1: سحب وضهر",
            focus: "ظهر وبايسبس",
            exercises: []
          }
        ]
      }
    });
  }

  return NextResponse.json({ success: true, plan });
}

// POST /api/plans - Save or update plan
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clientId, title, days } = body;

    if (!clientId) {
      return NextResponse.json({ error: "Missing clientId" }, { status: 400 });
    }

    const updatedPlan = {
      id: globalStore.plans[clientId]?.id || `plan-${Date.now()}`,
      coachId: "coach-demo",
      clientId,
      title: title || "الخطة التدريبية المعتمدة",
      days: days || [],
      updatedAt: new Date().toISOString()
    };

    globalStore.plans[clientId] = updatedPlan;

    return NextResponse.json({ success: true, plan: updatedPlan });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save plan" }, { status: 500 });
  }
}
