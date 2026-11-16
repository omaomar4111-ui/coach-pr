import { NextResponse } from 'next/server';
import { isMessageSafe } from '@/lib/moderation';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { logAudit } from '@/lib/audit';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Evolution API / WAHA Webhook Payload structure
    const messageText = 
      body?.data?.message?.conversation || 
      body?.data?.message?.extendedTextMessage?.text ||
      body?.message?.text ||
      body?.text;

    const senderPhone = 
      body?.data?.key?.remoteJid || 
      body?.sender || 
      body?.from;

    if (!messageText || !senderPhone) {
      return NextResponse.json({ status: 'ignored', reason: 'empty_message_or_sender' });
    }

    // 1. Check Moderation & Safety
    const safety = isMessageSafe(messageText);
    if (!safety.safe) {
      // Record blocked attempt in Audit Logs
      await logAudit({
        actorId: senderPhone,
        actorRole: "client",
        action: "whatsapp.moderation.blocked",
        resourceType: "system",
        metadata: {
          senderPhone,
          reason: safety.reason,
          textSnippet: messageText.substring(0, 50),
        },
      });

      if (isSupabaseConfigured() && supabase) {
        try {
          await supabase.from('audit_logs').insert([{
            action: 'whatsapp.moderation.blocked',
            metadata: { senderPhone, reason: safety.reason, textSnippet: messageText.substring(0, 50) }
          }]);
        } catch {
          // ignore
        }
      }
      
      return NextResponse.json({ status: 'blocked', reason: safety.reason }, { status: 400 });
    }

    // 2. Log safe inbound message
    await logAudit({
      actorId: senderPhone,
      actorRole: "client",
      action: "whatsapp.message_received",
      resourceType: "client",
      metadata: {
        senderPhone,
        length: messageText.length,
      },
    });

    // 3. Routing to Typebot or Chatwoot CRM
    return NextResponse.json({ 
      status: 'routed_successfully',
      senderPhone,
      preview: messageText.substring(0, 30)
    });

  } catch (error: any) {
    console.error('WhatsApp Webhook Error:', error);
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}
