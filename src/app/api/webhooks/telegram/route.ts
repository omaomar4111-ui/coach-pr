import { NextRequest, NextResponse } from 'next/server';

// Telegram Webhook Handler
export async function POST(req: NextRequest) {
  try {
    const update = await req.json();
    console.log('[Telegram Update Received]:', update);

    if (update.message) {
      const chatId = update.message.chat?.id;
      const userText = update.message.text || '';
      const senderName = update.message.from?.first_name || 'عميل';

      console.log(`[Telegram Msg] ChatId: ${chatId} | From: ${senderName} | Text: "${userText}"`);

      // If Bot Token is configured, we can reply directly
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      if (botToken && chatId) {
        let replyText = `أهلاً يا فندم! شكراً لتواصلك مع CoachPR. جاري معالجة طلبك بخصوص "${userText}" بواسطة إيجنت المبيعات المخصص.`;

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: replyText
          })
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('[Telegram Webhook Error]:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
