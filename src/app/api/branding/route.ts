import { NextRequest, NextResponse } from "next/server";
import { supabase, supabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseClient";
import { DEFAULT_BRANDING, TenantBranding, isValidHexColor } from "@/lib/branding";

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

// In-memory tenant branding cache for mock mode or quick fallback
const localTenantBrandingCache = new Map<string, TenantBranding>();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tenantSlug = searchParams.get("slug") || searchParams.get("coachId");
    const sessionUser = resolveSessionCoach(req);

    // Prioritize authenticated tenant ID or fallback to slug
    const targetCoachId = sessionUser?.role === "COACH" ? sessionUser.id : (tenantSlug || "coach_master_01");

    if (localTenantBrandingCache.has(targetCoachId)) {
      return NextResponse.json({ success: true, branding: localTenantBrandingCache.get(targetCoachId) });
    }

    if (isSupabaseConfigured()) {
      try {
        const client = supabaseAdmin || supabase;
        const { data: coachRecord } = await client
          .from("coaches")
          .select("*")
          .or(`id.eq.${targetCoachId},brand_name.ilike.%${targetCoachId}%`)
          .maybeSingle();

        if (coachRecord) {
          const settings = coachRecord.settings || {};
          const branding: TenantBranding = {
            tenantId: coachRecord.id,
            brandName: coachRecord.brand_name || DEFAULT_BRANDING.brandName,
            logoUrl: settings.logoUrl || DEFAULT_BRANDING.logoUrl,
            appIconUrl: settings.appIconUrl || DEFAULT_BRANDING.appIconUrl,
            faviconUrl: settings.faviconUrl || DEFAULT_BRANDING.faviconUrl,
            avatarUrl: coachRecord.avatar_url || settings.avatarUrl || DEFAULT_BRANDING.avatarUrl,
            primaryColor: settings.primaryColor || DEFAULT_BRANDING.primaryColor,
            secondaryColor: settings.secondaryColor || DEFAULT_BRANDING.secondaryColor,
            backgroundColor: DEFAULT_BRANDING.backgroundColor, // platform boundary enforced
            cardColor: DEFAULT_BRANDING.cardColor, // platform boundary enforced
            textColor: DEFAULT_BRANDING.textColor,
            coachName: coachRecord.full_name || DEFAULT_BRANDING.coachName,
            coachTitle: settings.coachTitle || DEFAULT_BRANDING.coachTitle,
            coachAvatar: coachRecord.avatar_url || DEFAULT_BRANDING.coachAvatar,
            welcomeMessage: settings.welcomeMessage || DEFAULT_BRANDING.welcomeMessage,
            supportPhone: coachRecord.phone || DEFAULT_BRANDING.supportPhone,
            appShortName: coachRecord.brand_name || DEFAULT_BRANDING.appShortName,
            locale: (settings.locale as 'ar' | 'en') || 'ar'
          };
          return NextResponse.json({ success: true, branding });
        }
      } catch (err) {
        console.warn("DB branding lookup notice:", err);
      }
    }

    return NextResponse.json({
      success: true,
      branding: DEFAULT_BRANDING
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const sessionUser = resolveSessionCoach(req);
    const body = await req.json();

    // Zero-trust: Coaches can ONLY update their own branding
    const targetCoachId = sessionUser?.id || "coach_master_01";

    // Validate Colors
    const primaryColor = isValidHexColor(body.primaryColor) ? body.primaryColor : DEFAULT_BRANDING.primaryColor;
    const secondaryColor = isValidHexColor(body.secondaryColor) ? body.secondaryColor : DEFAULT_BRANDING.secondaryColor;

    const brandName = (body.brandName || "CoachPR").trim().slice(0, 50);
    const welcomeMessage = (body.welcomeMessage || DEFAULT_BRANDING.welcomeMessage).trim().slice(0, 150);

    const updatedBranding: TenantBranding = {
      tenantId: targetCoachId,
      brandName,
      logoUrl: body.logoUrl || DEFAULT_BRANDING.logoUrl,
      appIconUrl: body.appIconUrl || DEFAULT_BRANDING.appIconUrl,
      faviconUrl: body.faviconUrl || DEFAULT_BRANDING.faviconUrl,
      avatarUrl: body.avatarUrl || "",
      primaryColor,
      secondaryColor,
      backgroundColor: DEFAULT_BRANDING.backgroundColor, // Protected boundary
      cardColor: DEFAULT_BRANDING.cardColor, // Protected boundary
      textColor: DEFAULT_BRANDING.textColor,
      coachName: body.coachName || DEFAULT_BRANDING.coachName,
      coachTitle: body.coachTitle || DEFAULT_BRANDING.coachTitle,
      coachAvatar: body.coachAvatar || DEFAULT_BRANDING.coachAvatar,
      welcomeMessage,
      supportPhone: body.supportPhone || DEFAULT_BRANDING.supportPhone,
      appShortName: brandName,
      locale: body.locale === "en" ? "en" : "ar"
    };

    localTenantBrandingCache.set(targetCoachId, updatedBranding);

    if (isSupabaseConfigured()) {
      try {
        const client = supabaseAdmin || supabase;
        const { data: updated, error } = await client
          .from("coaches")
          .update({
            brand_name: brandName,
            avatar_url: body.avatarUrl || null,
            settings: {
              logoUrl: body.logoUrl,
              appIconUrl: body.appIconUrl,
              primaryColor,
              secondaryColor,
              welcomeMessage,
              coachTitle: body.coachTitle,
              locale: updatedBranding.locale
            },
            updated_at: new Date().toISOString()
          })
          .eq("id", targetCoachId)
          .select()
          .maybeSingle();

        if (!error && updated) {
          return NextResponse.json({
            success: true,
            branding: updatedBranding
          });
        }
      } catch (dbErr) {
        console.warn("DB branding update notice:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      branding: updatedBranding,
      cached: true
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Server error" }, { status: 500 });
  }
}
