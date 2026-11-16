import { GoogleGenerativeAI } from "@google/generative-ai";

type LLMProvider = "gemini" | "groq" | "fallback";

interface LLMResponse {
  text: string;
  provider: LLMProvider;
  latencyMs: number;
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GROQ_API_KEY = process.env.GROQ_API_KEY || "";

const gemini = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

export class LLMRouter {
  /**
   * Tier 1: Vision tasks (payment verification, image analysis)
   * Uses Gemini for multimodal capabilities
   */
  static async withVision(
    prompt: string,
    imageBase64: string,
    mimeType: string = "image/png"
  ): Promise<LLMResponse> {
    const start = Date.now();
    if (!gemini) throw new Error("Gemini API key missing");

    const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([
      prompt,
      { inlineData: { data: imageBase64, mimeType } },
    ]);
    return {
      text: result.response.text(),
      provider: "gemini",
      latencyMs: Date.now() - start,
    };
  }

  /**
   * Tier 2: Fast text replies (free tier via Groq or Gemini Flash)
   * Fallback order: Groq -> Gemini Flash -> Static
   */
  static async withText(
    systemPrompt: string,
    history: Array<{ role: "user" | "model"; parts: string }>,
    userMessage: string
  ): Promise<LLMResponse> {
    const start = Date.now();

    // Try Groq first (fast + free)
    if (GROQ_API_KEY) {
      try {
        const response = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${GROQ_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "llama-3.1-8b-instant",
              messages: [
                { role: "system", content: systemPrompt },
                ...history.map((h) => ({
                  role: h.role === "model" ? "assistant" : "user",
                  content: h.parts,
                })),
                { role: "user", content: userMessage },
              ],
              temperature: 0.7,
              max_tokens: 500,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          return {
            text: data.choices[0].message.content,
            provider: "groq",
            latencyMs: Date.now() - start,
          };
        }
      } catch (err) {
        console.warn("Groq failed, trying Gemini:", err);
      }
    }

    // Try Gemini
    if (gemini) {
      try {
        const model = gemini.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: systemPrompt,
        });
        const chat = model.startChat({
          history: history.map((h) => ({
            role: h.role,
            parts: [{ text: h.parts }],
          })),
        });
        const result = await chat.sendMessage(userMessage);
        return {
          text: result.response.text(),
          provider: "gemini",
          latencyMs: Date.now() - start,
        };
      } catch (err) {
        console.warn("Gemini failed, using fallback:", err);
      }
    }

    // Tier 3: Static fallback
    return {
      text: "أهلاً بك! فريقنا سيرد عليك خلال دقائق. 🙏",
      provider: "fallback",
      latencyMs: Date.now() - start,
    };
  }
}

// Backward compatibility function export
export async function routeLLMCompletion(
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  options: { temperature?: number; maxTokens?: number; preferFast?: boolean } = {}
): Promise<{ text: string; provider: string; model: string }> {
  const systemPrompt = messages.find(m => m.role === 'system')?.content || 'أنت سارة طارق، ممثلة خدمة العملاء والمبيعات.';
  const lastUserMsg = messages.filter(m => m.role === 'user').pop()?.content || '';
  const history = messages
    .filter(m => m.role !== 'system')
    .slice(0, -1)
    .map(m => ({
      role: (m.role === 'assistant' ? 'model' : 'user') as 'model' | 'user',
      parts: m.content
    }));

  const res = await LLMRouter.withText(systemPrompt, history, lastUserMsg);
  return {
    text: res.text,
    provider: res.provider,
    model: res.provider === 'groq' ? 'llama-3.1-8b-instant' : (res.provider === 'gemini' ? 'gemini-1.5-flash' : 'static_fallback')
  };
}
