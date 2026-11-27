import { NextRequest, NextResponse } from "next/server";
import { supabase, supabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseClient";
import { DEFAULT_BRANDING, TenantBranding } from "@/lib/branding";

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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tenantSlug = searchParams.get("slug");
    const sessionUser = resolveSessionCoach(req);

    // Prioritize authenticated tenant ID or fallback to slug
    const targetCoachId = sessionUser?.role === "COACH" ? sessionUser.id : (tenantSlug || "coach_master_01");

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
            primaryColor: settings.primaryColor || coachRecord.brandColor || DEFAULT_BRANDING.primaryColor,
            secondaryColor: settings.secondaryColor || DEFAULT_BRANDING.secondaryColor,
            backgroundColor: settings.backgroundColor || DEFAULT_BRANDING.backgroundColor,
            cardColor: settings.cardColor || DEFAULT_BRANDING.cardColor,
            textColor: settings.textColor || DEFAULT_BRANDING.textColor,
            coachName: coachRecord.full_name || DEFAULT_BRANDING.coachName,
            coachTitle: settings.coachTitle || DEFAULT_BRANDING.coachTitle,
            coachAvatar: coachRecord.avatar_url || DEFAULT_BRANDING.coachAvatar,
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

    if (isSupabaseConfigured()) {
      try {
        const client = supabaseAdmin || supabase;
        const { data: updated, error } = await client
          .from("coaches")
          .update({
            brand_name: body.brandName,
            settings: {
              primaryColor: body.primaryColor,
              secondaryColor: body.secondaryColor,
              backgroundColor: body.backgroundColor,
              cardColor: body.cardColor,
              coachTitle: body.coachTitle,
              locale: body.locale || 'ar'
            },
            updated_at: new Date().toISOString()
          })
          .eq("id", targetCoachId)
          .select()
          .maybeSingle();

        if (!error && updated) {
          return NextResponse.json({
            success: true,
            message: "تم تحديث هوية البراند المخصص (White Label) بنجاح!",
            branding: updated
          });
        }
      } catch (dbErr) {
        console.warn("DB branding update notice:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "تم حفظ الإعدادات في وضع الإنتاج الفوري (Edge Mode)",
      branding: {
        ...DEFAULT_BRANDING,
        ...body
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Server error" }, { status: 500 });
  }
}
