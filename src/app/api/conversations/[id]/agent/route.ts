import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseClient';
import { AGENTS } from '@/data/agents';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: conversationId } = await params;
    const body = await req.json();
    const { agent_id } = body;

    if (!agent_id) {
      return NextResponse.json({ error: 'agent_id is required' }, { status: 400 });
    }

    const targetAgent = AGENTS.find(a => a.id === agent_id);
    if (!targetAgent) {
      return NextResponse.json({ error: `Invalid agent_id: ${agent_id}` }, { status: 400 });
    }

    // Update in Supabase
    const { data: updatedConv, error } = await supabaseAdmin
      .from('conversations')
      .update({ active_agent: agent_id })
      .eq('id', conversationId)
      .select()
      .maybeSingle();

    if (error) {
      console.error('[Update Agent Error]:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `تم تحويل المحادثة إلى ${targetAgent.name} (${targetAgent.role}) بنجاح`,
      conversationId,
      agent: targetAgent
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
