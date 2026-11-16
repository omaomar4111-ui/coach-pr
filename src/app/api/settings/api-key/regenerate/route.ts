import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";
import { randomBytes } from "node:crypto";

export async function POST(req: NextRequest) {
  try {
    const newApiKey = `pr_live_${randomBytes(24).toString("hex")}`;

    // Get current tenant
    const { data: tenant } = await supabaseAdmin
      .from("tenants")
      .select("id, settings")
      .limit(1)
      .maybeSingle();

    if (tenant) {
      const currentSettings = tenant.settings || {};
      await supabaseAdmin
        .from("tenants")
        .update({
          settings: {
            ...currentSettings,
            api_key: newApiKey,
            api_key_updated_at: new Date().toISOString(),
          },
        })
        .eq("id", tenant.id);
    }

    return NextResponse.json({
      success: true,
      apiKey: newApiKey,
      maskedKey: `${newApiKey.slice(0, 10)}************************${newApiKey.slice(-4)}`,
    });
  } catch (error: any) {
    console.error("Error regenerating API key:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
