import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseClient';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug') || 'demo-store';

    const { data: tenant, error } = await supabaseAdmin
      .from('tenants')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      console.error('[Tenant GET Error]:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!tenant) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, tenant });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const slug = body.slug || 'demo-store';

    const { data, error } = await supabaseAdmin
      .from('tenants')
      .upsert({
        name: body.brandName || body.name || 'متجر ديمو',
        slug: slug,
        phone_number_id: body.integrations?.whatsapp?.phoneNumberId || body.phoneNumberId || 'MOCK_PHONE_ID',
        access_token: body.integrations?.whatsapp?.accessToken || body.accessToken || null,
        active_agent: body.activeAgent || 'sara_tarek',
        settings: body
      }, { onConflict: 'slug' })
      .select()
      .single();

    if (error) {
      console.error('[Tenant Upsert Error]:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'تم حفظ إعدادات البراند والتوكينز سحابياً في Supabase بنجاح',
      tenant: data
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
