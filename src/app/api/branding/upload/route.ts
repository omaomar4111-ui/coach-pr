import { NextRequest, NextResponse } from "next/server";
import { supabase, supabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseClient";

// Maximum allowed image size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];

function resolveSessionCoach(req: NextRequest): { id: string; role: string; coachId?: string } | null {
  const sessionCookie = req.cookies.get("coachpr_session");
  if (sessionCookie) {
    try {
      const parsed = JSON.parse(sessionCookie.value);
      if (parsed?.user?.id) return parsed.user;
    } catch {
      // ignore
    }
  }
  return null;
}

/**
 * Validates actual binary file signatures (Magic Bytes)
 */
function validateMagicBytes(buffer: Buffer, mimeType: string): boolean {
  if (mimeType === "image/png") {
    // PNG starts with 89 50 4E 47 0D 0A 1A 0A
    return (
      buffer.length >= 8 &&
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47
    );
  }
  if (mimeType === "image/jpeg") {
    // JPEG starts with FF D8 FF
    return (
      buffer.length >= 3 &&
      buffer[0] === 0xff &&
      buffer[1] === 0xd8 &&
      buffer[2] === 0xff
    );
  }
  if (mimeType === "image/webp") {
    // WEBP: RIFF....WEBP
    return (
      buffer.length >= 12 &&
      buffer.toString("ascii", 0, 4) === "RIFF" &&
      buffer.toString("ascii", 8, 12) === "WEBP"
    );
  }
  if (mimeType === "image/svg+xml") {
    // SVG text inspection
    const start = buffer.toString("utf8", 0, Math.min(buffer.length, 256)).trim().toLowerCase();
    return start.includes("<svg") || start.includes("<?xml");
  }
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const sessionUser = resolveSessionCoach(req);
    if (!sessionUser || sessionUser.role !== "COACH") {
      // In development fallback to coach_master_01 if session cookie isn't set
      if (!sessionUser && process.env.NODE_ENV !== "production") {
        // permitted in local testing
      } else {
        return NextResponse.json({ error: "Unauthorized: Only authenticated coaches can upload branding assets" }, { status: 401 });
      }
    }

    const coachId = sessionUser?.id || "coach_master_01";
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const assetType = (formData.get("type") as string) || "logo"; // logo | icon | avatar

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File size exceeds 5MB limit" }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Invalid image type. Allowed: PNG, JPEG, WEBP, SVG" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Deep contents validation via Magic Bytes
    if (!validateMagicBytes(buffer, file.type)) {
      return NextResponse.json({ error: "File content does not match MIME type signature" }, { status: 400 });
    }

    // Tenant-isolated storage path: tenant-branding/{coachId}/{assetType}-{timestamp}.ext
    const ext = file.name.split(".").pop()?.toLowerCase() || "png";
    const fileName = `${assetType}-${Date.now()}.${ext}`;
    const storagePath = `${coachId}/${fileName}`;

    let publicUrl = "";

    if (isSupabaseConfigured()) {
      const client = supabaseAdmin || supabase;
      const { data: uploadData, error: uploadError } = await client.storage
        .from("tenant-branding")
        .upload(storagePath, buffer, {
          contentType: file.type,
          upsert: true
        });

      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        return NextResponse.json({ error: "Failed to upload asset to storage" }, { status: 500 });
      }

      const { data: urlData } = client.storage
        .from("tenant-branding")
        .getPublicUrl(storagePath);

      publicUrl = urlData.publicUrl;
    } else {
      // Local fallback mock public URL with base64 for instant preview in mock mode
      const base64Data = buffer.toString("base64");
      publicUrl = `data:${file.type};base64,${base64Data}`;
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      path: storagePath,
      assetType
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}
