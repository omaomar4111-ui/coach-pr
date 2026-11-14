import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { channel, recipient, title, message, orderData } = await req.json();

    // 1. Telegram Notification Dispatch
    if (channel === 'TELEGRAM') {
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = recipient || process.env.TELEGRAM_ALERT_CHAT_ID;

      if (botToken && chatId) {
        const text = `
🚨 *إشعار جديد من PR Agent*
*${title}*
------------------------------
${message}
${orderData ? `\n📦 *تفاصيل الأوردر:* ${orderData.item} (${orderData.price})` : ''}
${orderData?.waybill ? `🚚 *رقم البوليصة:* \`${orderData.waybill}\`` : ''}
        `.trim();

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: 'Markdown'
          })
        });
      }

      return NextResponse.json({
        success: true,
        channel: 'TELEGRAM',
        status: 'DISPATCHED',
        recipient: chatId || '@StoreAdminChannel',
        timestamp: new Date().toISOString()
      });
    }

    // 2. WhatsApp Cloud API Notification Dispatch
    if (channel === 'WHATSAPP') {
      const phoneId = process.env.WHATSAPP_PHONE_ID;
      const token = process.env.WHATSAPP_ACCESS_TOKEN;
      const targetPhone = recipient || '201001234567';

      if (phoneId && token) {
        await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: targetPhone,
            type: 'text',
            text: {
              body: `🔔 *PR Agent:* ${title}\n\n${message}`
            }
          })
        });
      }

      return NextResponse.json({
        success: true,
        channel: 'WHATSAPP',
        status: 'DISPATCHED',
        recipient: targetPhone,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({
      success: true,
      channel: channel || 'SYSTEM_PUSH',
      status: 'SENT',
      title,
      message
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
