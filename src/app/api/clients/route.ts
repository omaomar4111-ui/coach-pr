import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { logAudit } from '@/lib/audit';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('id');

    // 1. Fetch single client if id query param provided
    if (clientId) {
      if (isSupabaseConfigured() && supabase) {
        try {
          const { data: client, error } = await supabase
            .from('clients')
            .select('*')
            .eq('id', clientId)
            .single();

          if (!error && client) {
            return NextResponse.json({ success: true, client });
          }
        } catch (dbErr) {
          console.warn('DB fetch single client notice:', dbErr);
        }
      }

      // Fallback demo mock
      return NextResponse.json({
        success: true,
        client: {
          id: clientId,
          name: "محمود حسن السيد",
          phone: "01099238411",
          goal: "تنشيف وخسارة دهون وإبراز عضلات البطن",
          injuries: "خشونة خفيفة في الركبة اليمنى - تجنب السكوات العميق الحر بأوزان قصوى",
          subscription_status: "active",
          created_at: new Date().toISOString()
        }
      });
    }

    // 2. Fetch all clients
    let clientsList: any[] = [];

    if (isSupabaseConfigured() && supabase) {
      try {
        const { data: clients, error } = await supabase
          .from('clients')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && clients && clients.length > 0) {
          clientsList = clients;
        }
      } catch (err) {
        console.warn('DB fetch all clients notice:', err);
      }
    }

    // Fallback list of pilot clients
    if (clientsList.length === 0) {
      clientsList = [
        {
          id: "ath-1",
          name: "محمود حسن السيد",
          phone: "01099238411",
          goal: "تنشيف عالي وخسارة دهون",
          injuries: "خشونة الركبة اليمنى",
          subscription_status: "active",
          created_at: new Date(Date.now() - 7 * 86400000).toISOString()
        },
        {
          id: "ath-2",
          name: "سامي عبد الرحمن",
          phone: "01122334455",
          goal: "تضخيم وبناء عضلات صافية",
          injuries: "التهاب وتر الكتف الأيمن",
          subscription_status: "active",
          created_at: new Date(Date.now() - 5 * 86400000).toISOString()
        },
        {
          id: "ath-3",
          name: "كريم أحمد مصطفى",
          phone: "01234567890",
          goal: "تجهيز بطولة كمال أجسام",
          injuries: "لا توجد إصابات",
          subscription_status: "active",
          created_at: new Date(Date.now() - 2 * 86400000).toISOString()
        }
      ];
    }

    return NextResponse.json({ success: true, clients: clientsList });
  } catch (error: any) {
    console.error('Failed to fetch clients:', error);
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.phone) {
      return NextResponse.json({ error: 'الاسم ورقم الهاتف مطلوبان' }, { status: 400 });
    }

    const newClientId = `client-${Date.now()}`;
    const newClientRecord = {
      id: newClientId,
      name: body.name,
      phone: body.phone,
      goal: body.goal || 'تضخيم وبناء عضلات',
      injuries: body.injuries || 'لا توجد إصابات',
      subscription_status: 'active',
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured() && supabase) {
      try {
        const { data: client, error } = await supabase
          .from('clients')
          .insert([newClientRecord])
          .select()
          .single();

        if (error) {
          console.warn('Supabase insert notice:', error.message);
        }
      } catch (dbErr) {
        console.warn('DB insert error in clients POST:', dbErr);
      }
    }

    // Audit Log
    await logAudit({
      actorId: newClientId,
      actorRole: 'system',
      action: 'client.created',
      resourceType: 'client',
      resourceId: newClientId,
      metadata: { name: body.name, phone: body.phone }
    });

    return NextResponse.json({ success: true, client: newClientRecord });
  } catch (error: any) {
    console.error('Failed to create client:', error);
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
  }
}
