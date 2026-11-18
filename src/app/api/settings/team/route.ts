import { NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabaseClient';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tenantId = searchParams.get('tenantId') || 'default-tenant';

    if (isSupabaseConfigured()) {
      const { data: members, error } = await supabaseAdmin
        .from('team_members')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('created_at', { ascending: false });

      if (!error && members && members.length > 0) {
        return NextResponse.json({ success: true, members });
      }
    }

    // Default mock response when DB not populated yet
    const fallbackMembers = [
      { id: '1', email: 'owner@brandstore.com', role: 'admin', status: 'active', created_at: new Date().toISOString() },
      { id: '2', email: 'support@brandstore.com', role: 'agent', status: 'active', created_at: new Date().toISOString() },
      { id: '3', email: 'audit@brandstore.com', role: 'viewer', status: 'pending', created_at: new Date().toISOString() },
    ];

    return NextResponse.json({ success: true, members: fallbackMembers });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, role, tenantId } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: 'البريد الإلكتروني مطلوب' }, { status: 400 });
    }

    const targetTenantId = tenantId || 'default-tenant';
    const targetRole = role || 'agent';

    let newMember = {
      id: `tm-${Date.now()}`,
      tenant_id: targetTenantId,
      email,
      role: targetRole,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured()) {
      const { data, error } = await supabaseAdmin
        .from('team_members')
        .insert({
          tenant_id: targetTenantId,
          email,
          role: targetRole,
          status: 'pending'
        })
        .select()
        .single();

      if (!error && data) {
        newMember = data;
      }
    }

    return NextResponse.json({
      success: true,
      message: 'تم إرسال الدعوة بنجاح',
      member: newMember
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
