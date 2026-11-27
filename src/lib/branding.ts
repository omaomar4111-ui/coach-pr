// White-Label Context & Branding System for CoachPR SaaS
// Manages tenant branding resolution, theme tokens, and isolation

export interface TenantBranding {
  tenantId: string;
  brandName: string;
  logoUrl?: string;
  faviconUrl?: string;
  primaryColor: string; // default: #d4f60b
  secondaryColor: string; // default: #7C3AED
  backgroundColor: string; // default: #08090b
  cardColor: string; // default: #11141a
  textColor: string; // default: #f2f4f6
  coachName: string;
  coachTitle: string;
  coachAvatar: string;
  supportPhone?: string;
  customDomain?: string;
  customCss?: string;
  appShortName: string;
  locale: 'ar' | 'en';
}

export const DEFAULT_BRANDING: TenantBranding = {
  tenantId: 'coachpr_default',
  brandName: 'CoachPR',
  primaryColor: '#d4f60b',
  secondaryColor: '#7C3AED',
  backgroundColor: '#08090b',
  cardColor: '#11141a',
  textColor: '#f2f4f6',
  coachName: 'كابتن تامر سيف',
  coachTitle: 'مدرب لياقة بدنية معتمد NASM & Olympia Coach',
  coachAvatar: 'كأ',
  supportPhone: '+201012345678',
  appShortName: 'CoachPR',
  locale: 'ar'
};

/**
 * Resolves CSS custom properties object for dynamic injection into layout or component
 */
export function getThemeTokens(branding: TenantBranding = DEFAULT_BRANDING): Record<string, string> {
  return {
    '--cpr-brand-primary': branding.primaryColor || '#d4f60b',
    '--cpr-brand-secondary': branding.secondaryColor || '#7C3AED',
    '--cpr-brand-bg': branding.backgroundColor || '#08090b',
    '--cpr-brand-card': branding.cardColor || '#11141a',
    '--cpr-brand-text': branding.textColor || '#f2f4f6'
  };
}
