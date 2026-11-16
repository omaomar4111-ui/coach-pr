// src/lib/moderation.ts
const BLOCKED_WORDS = [
  'سبام', 
  'كلمات مسيئة', 
  'دعارة', 
  'مخدرات',
  'نصاب',
  'احتيال',
  'منشطات غير قانونية'
];

const SPAM_REGEX = /(http[s]?:\/\/[^\s]+){3,}/g; // 3 links or more = spam

export function isMessageSafe(text: string): { safe: boolean; reason?: string } {
  if (!text) return { safe: true };
  const lowerText = text.toLowerCase();
  
  for (const word of BLOCKED_WORDS) {
    if (lowerText.includes(word)) {
      return { safe: false, reason: 'abusive_language' };
    }
  }

  if (SPAM_REGEX.test(text)) {
    return { safe: false, reason: 'spam_links' };
  }

  return { safe: true };
}
