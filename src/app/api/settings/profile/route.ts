import { NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabaseClient';

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, avatarUrl, tenantId } = body;

    const targetTenantId = tenantId || 'default-tenant';

    if (isSupabaseConfigured()) {
      const { data: tenant, error: fetchErr } = await supabaseAdmin
        .from('tenants')
        .select('settings')
        .eq('id', targetTenantId)
        .single();

      const existingSettings = tenant?.settings || {};
      const updatedSettings = {
        ...existingSettings,
        profile: {
          name,
          email,
          phone,
          avatarUrl,
          updatedAt: new Date().toISOString()
        }
      };

      const { error: updateErr } = await supabaseAdmin
        .from('tenants')
        .update({
          name: name || undefined,
          settings: updatedSettings
        })
        .eq('id', targetTenantId);

      if (updateErr) {
        console.warn('Profile DB update warning:', updateErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'تم تحديث الملف الشخصي بنجاح',
      profile: { name, email, phone, avatarUrl }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'خطأ أثناء تحديث الملف الشخصي' },
      { status: 500 }
    );
  }
}
