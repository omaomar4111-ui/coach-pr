import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { message, history, brief, agentId, modelPreference } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || '';
    const cleanMsg = message.trim();

    // 1. Determine Query Complexity
    // Fast queries: Sizes, Price, Shipping, Hello
    // Complex queries (Routing to 4 Argon / Reasoning Pro): Custom styling, complaints, complex bundle calculation, returns
    const isComplexQuery = 
      modelPreference === '4-argon' ||
      cleanMsg.length > 70 ||
      cleanMsg.includes('مشكلة') ||
      cleanMsg.includes('شكوى') ||
      cleanMsg.includes('استرجاع') ||
      cleanMsg.includes('بدل') ||
      cleanMsg.includes('خامة') ||
      cleanMsg.includes('تنسيق') ||
      cleanMsg.includes('عرض خاص');

    // 2. Persona & System Instructions
    const systemPrompt = `
أنت الآن "سارة طارق" (كبير مديري المبيعات وخدمة العملاء في PR Agent).
الموديل المشغل للرد: ${isComplexQuery ? '4 Argon (Reasoning & Advanced Analysis Engine)' : 'Fast Stream Engine'}
أسلوبك: مصري قاهري راقٍ وذكي ومقنع، بدون مبالغة أو تصنع.
بريف المتجر:
- المنتجات: ${brief?.productsCatalogSummary || 'هوديز أوفرسايز (650ج)، جواكت جلد (1850ج)، قمصان قطن (450ج)'}
- الشحن المجاني: فوق ${brief?.freeShippingThreshold || '1000'} جنيه.
- سياسة المعاينة: معاينة مجانية مع المندوب قبل الدفع واستبدال مجاني خلال 14 يوم.
- طرق الدفع: إنستاباي، فودافون كاش، الدفع عند الاستلام.

القواعد:
1. لو السؤال بسيط: جملة أو جملتين فقط ومباشرة زي شات الواتساب.
2. لو السؤال استفسار عن خامة أو تنسيق أو مشكلة (وضع 4 Argon): قدم حلاً ذكياً احترافياً يطمئن العميل ويقفل معاه الطلب فوراً.
`.trim();

    // 3. If API Key is present, attempt model call with safety abort controller
    if (apiKey) {
      try {
        const targetModel = isComplexQuery ? 'gemini-1.5-pro' : 'gemini-1.5-flash';
        const controller = new AbortController();
        const timeoutMs = isComplexQuery ? 9000 : 4500;
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${apiKey}`;

        const res = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemPrompt}\n\nرسالة العميل:\n"${cleanMsg}"` }]
              }
            ],
            generationConfig: {
              temperature: isComplexQuery ? 0.4 : 0.7,
              maxOutputTokens: isComplexQuery ? 200 : 100,
            }
          })
        });

        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
          if (reply) {
            return NextResponse.json({
              reply,
              source: isComplexQuery ? '4_ARGON_DEEP_REASONING' : 'FAST_AI_STREAM',
              model: isComplexQuery ? '4 Argon (Reasoning)' : 'Fast Flash',
              timestamp: new Date().toISOString()
            });
          }
        }
      } catch (e) {
        console.warn('API call timed out or failed, falling back to smart instant heuristics');
      }
    }

    // 4. Instant Smart Fallback (0ms latency, zero downtime)
    const fallbackReply = generateSmartResponse(cleanMsg, isComplexQuery);

    return NextResponse.json({
      reply: fallbackReply,
      source: isComplexQuery ? '4_ARGON_OFFLINE_LOGIC' : 'INSTANT_SPEED_ENGINE',
      model: isComplexQuery ? '4 Argon (Deterministic Logic)' : 'Instant Flash',
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    return NextResponse.json({
      reply: 'يا فندم نورتنا! معاك سارة طارق، ثواني ومسؤول المبيعات بيتابع طلبك فوراً.',
      source: 'FALLBACK_SAFETY',
      timestamp: new Date().toISOString()
    }, { status: 200 });
  }
}

function generateSmartResponse(text: string, isArgonMode: boolean): string {
  const lower = text.toLowerCase();

  // Advanced 4 Argon Handling for Complex Cases
  if (isArgonMode) {
    if (lower.includes('خامة') || lower.includes('قطن') || lower.includes('جلد') || lower.includes('جودة')) {
      return 'خاماتنا كلها قطن مصري 100% ميلتون تقيل 380 جرام معالج ضد الانكماش والوبرة، والجواكت جلد طبيعي مستورد. وأهم ميزة إن معاك معاينة كاملة ومجانية بتفتح الشحنة وتقيس وتلمس الخامة بنفسك قبل ما تدفع أي جنيه للمندوب 🛡️';
    }
    if (lower.includes('استبدال') || lower.includes('مشكلة') || lower.includes('شكوى') || lower.includes('ضيق') || lower.includes('واسع')) {
      return 'حقك علينا تماماً يا فندم وراحتك أولويتنا! بنبعتلك مندوب استبدال مجاناً لحد عندك بالقطعة والمقاس المظبوط خلال 48 ساعة فقط بدون أي مصاريف شحن إضافية. ممكن تديني رقم تليفونك المسجل به الأوردر؟ 🙏';
    }
    if (lower.includes('تنسيق') || lower.includes('ألوان') || lower.includes('ألبس إيه')) {
      return 'الأوفرسايز هودي باللون الأسود أو الزيتي بيمشي شيك جداً مع بنطلون شينو بيج وسنيكرز أبيض، وبيديك لوك كاجوال فاخر ومريح. تحب أبعتلك تشكيلة صور التنسيق المقترحة؟ 👔✨';
    }
  }

  // Fast Instant WhatsApp Flow
  if (lower.includes('مقاس') || lower.includes('سايز') || lower.includes('size')) {
    return 'المقاسات متوفرة من M لحد 3XL تلبيس أوفرسايز مظبوط جداً ومريح. ابعتلي طولك ووزنك وأنا هحددلك المقاس المثالي فوراً!';
  }
  if (lower.includes('سعر') || lower.includes('بكام') || lower.includes('كام')) {
    return 'الهودي الأوفرسايز عليه خصم حصري بـ 650ج بدلاً من 850ج، ولو طلبت قطعتين الشحن بيكون مجاناً لحد باب بيتك! 🔥';
  }
  if (lower.includes('شحن') || lower.includes('توصيل') || lower.includes('كام يوم')) {
    return 'التوصيل خلال 48 لـ 72 ساعة في كل محافظات مصر، ومعاك معاينة مجانية بالكامل قبل الدفع 🚚';
  }

  return 'أهلاً بحضرتك يا فندم! معاك سارة طارق من PR Agent. إيه الموديل أو القطعة اللي حابب تستفسر عنها عشان أحجزلك مقاسك؟ ✨';
}
