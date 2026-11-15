import { NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseClient";
import { logAudit } from "@/lib/audit";

export const dynamic = "force-dynamic";

/**
 * GET /api/attachments/signed-url?path=client-1/mri.pdf&clientId=client-1
 * Generates a strictly time-limited (15-minute max = 900s) Signed URL for medical attachments
 * Logs audit trail with actor, resource, and timestamp.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const storagePath = searchParams.get("path");
    const clientId = searchParams.get("clientId") || "client-1";
    const attachmentId = searchParams.get("attachmentId") || "att-unknown";

    if (!storagePath) {
      return NextResponse.json({ error: "Missing required query param: path" }, { status: 400 });
    }

    // Security check: Path traversal prevention
    if (storagePath.includes("..") || storagePath.startsWith("/")) {
      return NextResponse.json({ error: "Invalid storage path detected" }, { status: 400 });
    }

    // 15 minutes = 900 seconds
    const EXPIRES_IN_SEC = 15 * 60;

    let signedUrl = "";

    if (isSupabaseConfigured()) {
      const { data, error } = await supabaseAdmin.storage
        .from("medical-vault")
        .createSignedUrl(storagePath, EXPIRES_IN_SEC);

      if (error || !data?.signedUrl) {
        console.error("[medical_vault_signed_url_error]", error);
        return NextResponse.json({ error: "Failed to generate signed URL" }, { status: 500 });
      }

      signedUrl = data.signedUrl;
    } else {
      // Non-production simulated signed url
      signedUrl = `https://mock-storage.coachprb.internal/medical-vault/${storagePath}?token=mock_signed_15m_${Date.now()}`;
    }

    // Mandatory Audit Log: Who viewed which medical file at what time
    await logAudit({
      actorId: "coach-demo",
      actorRole: "coach",
      action: "medical.view_attachment",
      resourceType: "attachment",
      resourceId: attachmentId,
      metadata: {
        clientId,
        storagePath,
        expiresInSeconds: EXPIRES_IN_SEC,
      },
    });

    return NextResponse.json({
      success: true,
      signedUrl,
      expiresIn: EXPIRES_IN_SEC,
      expiresAt: new Date(Date.now() + EXPIRES_IN_SEC * 1000).toISOString(),
    });
  } catch (err: any) {
    console.error("[signed_url_handler_error]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
