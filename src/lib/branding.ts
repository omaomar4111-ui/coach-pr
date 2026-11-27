// White-Label Context & Branding System for CoachPR SaaS
// Manages tenant branding resolution, theme tokens, and isolation

export interface TenantBranding {
  tenantId: string;
  brandName: string;
  logoUrl?: string;
  appIconUrl?: string;
  faviconUrl?: string;
  avatarUrl?: string;
  primaryColor: string; // default: #D4F60B
  secondaryColor: string; // default: #7C3AED
  backgroundColor: string; // default: #07060C (Protected platform boundary)
  cardColor: string; // default: #111116 (Protected platform boundary)
  textColor: string; // default: #F5F5F5
  coachName: string;
  coachTitle: string;
  coachAvatar: string;
  welcomeMessage: string;
  supportPhone?: string;
  customDomain?: string;
  customCss?: string;
  appShortName: string;
  locale: 'ar' | 'en';
}

export const DEFAULT_BRANDING: TenantBranding = {
  tenantId: 'coachpr_default',
  brandName: 'CoachPR',
  logoUrl: '/brand-pr-logo.png',
  appIconUrl: '/brand-pr-logo.png',
  faviconUrl: '/favicon.ico',
  avatarUrl: '',
  primaryColor: '#D4F60B',
  secondaryColor: '#7C3AED',
  backgroundColor: '#07060C',
  cardColor: '#111116',
  textColor: '#F5F5F5',
  coachName: 'كابتن تامر سيف',
  coachTitle: 'مدرب لياقة بدنية معتمد NASM & Olympia Coach',
  coachAvatar: 'كأ',
  welcomeMessage: 'عاش يا بطل! جاهز لتمرين اليوم؟',
  supportPhone: '+201012345678',
  appShortName: 'CoachPR',
  locale: 'ar'
};

/**
 * Validates a color string to ensure it's a valid 3 or 6 hex code
 */
export function isValidHexColor(hex: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex.trim());
}

/**
 * Resolves CSS custom properties object for dynamic injection into layout or component
 */
export function getThemeTokens(branding: TenantBranding = DEFAULT_BRANDING): Record<string, string> {
  return {
    '--cpr-brand-primary': branding.primaryColor || '#D4F60B',
    '--cpr-brand-secondary': branding.secondaryColor || '#7C3AED',
    '--cpr-brand-bg': '#07060C', // Enforce immutable platform background
    '--cpr-brand-card': '#111116', // Enforce immutable platform surface
    '--cpr-brand-text': branding.textColor || '#F5F5F5'
  };
}
