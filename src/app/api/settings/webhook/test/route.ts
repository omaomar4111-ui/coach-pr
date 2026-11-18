import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { webhookUrl, event, payload } = body;

    const testEvent = {
      event: event || 'messages',
      timestamp: new Date().toISOString(),
      source: 'PR Agent Webhook Simulator',
      data: payload || {
        sender_id: 'test_user_001',
        sender_name: 'عميل تجريبي',
        channel: 'instagram',
        message: 'السلام عليكم، الموديل ده متاح مقاس L؟'
      }
    };

    // If an external target webhookUrl is provided and valid, send a real test payload
    let deliveryStatus = 'simulated';
    let statusCode = 200;

    if (webhookUrl && webhookUrl.startsWith('http')) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);
        const res = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-PR-Agent-Signature': 'sha256=test_signature_mock',
            'User-Agent': 'PR-Agent-Webhook-Tester/1.0'
          },
          body: JSON.stringify(testEvent),
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        deliveryStatus = res.ok ? 'delivered' : 'failed_http';
        statusCode = res.status;
      } catch (err: any) {
        deliveryStatus = 'network_error';
        statusCode = 502;
      }
    }

    return NextResponse.json({
      success: true,
      message: deliveryStatus === 'delivered' ? 'تم إرسال الحدث التجريبي واستلام الرد بنجاح ✓' : 'تمت محاكاة إرسال الحدث التجريبي بنجاح',
      status: deliveryStatus,
      httpStatus: statusCode,
      dispatchedEvent: testEvent
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
