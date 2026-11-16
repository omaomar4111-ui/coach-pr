/**
 * Intelligent Multi-Provider LLM Router (FreeLLM Gateway / Local Failover)
 * Inspired by tashfeenahmed/freellmapi
 * 
 * Strategy:
 * 1. Primary: Google Gemini (High accuracy, visual receipt audit, native tool calls)
 * 2. Failover Tier 1: FreeLLM / OpenRouter / Groq compatible endpoint (Ultra-fast, zero-cost Llama 3 / DeepSeek / Mistral)
 * 3. Failover Tier 2: Built-in Rule-Based Heuristic Agent (guarantees 100% uptime even if offline)
 */

export interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface RouterOptions {
  temperature?: number;
  maxTokens?: number;
  preferFast?: boolean;
}

export async function routeLLMCompletion(
  messages: LLMMessage[],
  options: RouterOptions = {}
): Promise<{ text: string; provider: string; model: string }> {
  const geminiKey = process.env.GEMINI_API_KEY;
  const freeLlmEndpoint = process.env.FREE_LLM_API_ENDPOINT || 'https://api.groq.com/openai/v1';
  const freeLlmKey = process.env.FREE_LLM_API_KEY || process.env.GROQ_API_KEY;

  // 1. Try Gemini if configured and not explicitly forcing fast text
  if (geminiKey && !options.preferFast) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: messages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
          })),
          generationConfig: {
            temperature: options.temperature ?? 0.7,
            maxOutputTokens: options.maxTokens ?? 500,
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return { text: text.trim(), provider: 'gemini', model: 'gemini-1.5-flash' };
        }
      }
    } catch (err) {
      console.warn('[LLM Router] Gemini failed, falling back to secondary tier:', err);
    }
  }

  // 2. Try FreeLLM / Groq / OpenAI-compatible endpoint
  if (freeLlmKey) {
    try {
      const response = await fetch(`${freeLlmEndpoint}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${freeLlmKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: messages,
          temperature: options.temperature ?? 0.7,
          max_tokens: options.maxTokens ?? 500
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.choices?.[0]?.message?.content;
        if (text) {
          return { text: text.trim(), provider: 'freellm_openai_compatible', model: 'llama-3.1-8b-instant' };
        }
      }
    } catch (err) {
      console.warn('[LLM Router] FreeLLM secondary endpoint failed:', err);
    }
  }

  // 3. Ultra-resilient local fallback (Rule-based Sara Tarek Agent)
  const lastUserMsg = messages.filter(m => m.role === 'user').pop()?.content || '';
  const fallbackReply = generateSaraLocalFallback(lastUserMsg);

  return {
    text: fallbackReply,
    provider: 'local_resilient_rules',
    model: 'sara_v1_rules'
  };
}

function generateSaraLocalFallback(input: string): string {
  const text = input.toLowerCase();

  if (text.includes('سعر') || text.includes('بكام') || text.includes('price')) {
    return 'أهلاً بيك يا فندم! 🌸 بخصوص الأسعار، كل المنتجات وتفاصيلها وخصومات النهاردة موجودة في الكتالوج هنا، وتقدر تطلب فوراً.';
  }
  if (text.includes('انستاباي') || text.includes('instapay') || text.includes('تحويل') || text.includes('كاش')) {
    return 'تمام يا فندم! تقدر تحول على حساب إنستاباي، وابعتلي سكرين شوت الإيصال هنا علشان أفحصه فوراً وأأكد حجز الأوردر بتاعك. ⚡';
  }
  if (text.includes('توصيل') || text.includes('شحن') || text.includes('كام يوم')) {
    return 'الشحن متاح لجميع محافظات مصر والدول العربية، والتوصيل بيوصلك خلال 24 لـ 48 ساعة لحد باب البيت. 🚚';
  }

  return 'أهلاً بحضرتك في PR Agent! 🌟 معاك سارة من خدمة العملاء، إزاي أقدر أساعدك النهاردة؟';
}
