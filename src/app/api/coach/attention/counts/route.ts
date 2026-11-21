import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({
    success: true,
    data: {
      totalNeedingAttention: 3,
      delayedCheckIns: 1,
      injuryAlerts: 1,
      expiringSoon: 1,
      unreviewedForms: 2,
      pendingIntakes: 1
    }
  });
}
