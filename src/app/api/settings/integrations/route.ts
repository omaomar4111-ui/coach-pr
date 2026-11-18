import { NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabaseClient';

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { whatsapp, instagram, chatwoot, tenantId } = body;

    const targetTenantId = tenantId || 'default-tenant';

    if (isSupabaseConfigured()) {
      const { data: tenant } = await supabaseAdmin
        .from('tenants')
        .select('settings')
        .eq('id', targetTenantId)
        .single();

      const existingSettings = tenant?.settings || {};
      const updatedSettings = {
        ...existingSettings,
        integrations: {
          ...(existingSettings.integrations || {}),
          ...(whatsapp ? { whatsapp } : {}),
          ...(instagram ? { instagram } : {}),
          ...(chatwoot ? { chatwoot } : {}),
          updatedAt: new Date().toISOString()
        }
      };

      await supabaseAdmin
        .from('tenants')
        .update({ settings: updatedSettings })
        .eq('id', targetTenantId);
    }

    return NextResponse.json({
      success: true,
      message: 'تم حفظ مفاتيح التكامل بنجاح',
      integrations: { whatsapp, instagram, chatwoot }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
