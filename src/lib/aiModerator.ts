/**
 * AI Content Moderation & Abuse Guard
 * Inspired by ai-moderator-support-agent skill
 * Filters hate speech, vulgarity, spam attacks, and SQL/Prompt Injection
 */

export interface ModerationResult {
  allowed: boolean;
  reason?: string;
  category?: 'toxic' | 'spam' | 'injection' | 'clean';
  flaggedWord?: string;
}

const FORBIDDEN_WORDS = [
  'شتم', 'سب', 'قذر', 'احتيال', 'نصاب', 'نصب',
  'hack', 'exploit', 'drop database', 'delete from', '<script>', 'system prompt'
];

export function moderateMessage(text: string): ModerationResult {
  if (!text || typeof text !== 'string') {
    return { allowed: true, category: 'clean' };
  }

  const normalized = text.toLowerCase().trim();

  // 1. Check for prompt injection patterns
  if (
    normalized.includes('ignore previous instructions') ||
    normalized.includes('تجاهل التعليمات السابقة') ||
    normalized.includes('you are now in developer mode') ||
    normalized.includes('reveal system prompt')
  ) {
    return {
      allowed: false,
      category: 'injection',
      reason: 'محاولة اختراق تعليمات النظام (Prompt Injection Detected)'
    };
  }

  // 2. Check for severe vulgarity & blacklisted words
  for (const word of FORBIDDEN_WORDS) {
    if (normalized.includes(word)) {
      return {
        allowed: false,
        category: 'toxic',
        reason: 'تحتوي الرسالة على عبارات غير لائقة أو محظورة',
        flaggedWord: word
      };
    }
  }

  // 3. Check for repetitive spam
  if (text.length > 2000) {
    return {
      allowed: false,
      category: 'spam',
      reason: 'الرسالة تتجاوز الحد الأقصى المسموح به (Anti-Spam Flooding)'
    };
  }

  return { allowed: true, category: 'clean' };
}
