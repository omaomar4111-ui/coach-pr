/**
 * AI Moderator - Filters spam, offensive content, and prompt injection
 * before reaching the main LLM
 */

const BANNED_PATTERNS = [
  // Prompt injection attempts
  /ignore\s+(previous|all)\s+instructions/i,
  /forget\s+(everything|your\s+rules)/i,
  /you\s+are\s+now\s+(?!سارة|عمر|مروة)/i,
  /system\s*:\s*/i,

  // Spam patterns
  /(https?:\/\/[^\s]+){3,}/i, // 3+ links
  /(.)\1{10,}/i, // 10+ repeated chars

  // Offensive (basic Arabic + English)
  /(كلب|حمار|غبي|تافه)/i,
  /\b(stupid|idiot|dumb|f+u+c+k)\b/i,
];

export interface ModerationResult {
  allowed: boolean;
  reason?: string;
  autoReply?: string;
  category?: 'toxic' | 'spam' | 'injection' | 'clean';
}

export function moderateMessage(content: string): ModerationResult {
  if (!content || content.trim().length === 0) {
    return { allowed: false, reason: "empty_message", category: 'clean' };
  }

  if (content.length > 4000) {
    return {
      allowed: false,
      reason: "too_long",
      category: 'spam',
      autoReply: "رسالتك طويلة جداً، ممكن تختصرها؟ 🙏",
    };
  }

  for (const pattern of BANNED_PATTERNS) {
    if (pattern.test(content)) {
      return {
        allowed: false,
        reason: "flagged_content",
        category: 'toxic',
        autoReply:
          "عذراً، لا يمكنني الرد على هذه الرسالة. يرجى الالتزام بآداب الحوار. 🙏",
      };
    }
  }

  return { allowed: true, category: 'clean' };
}
