// White-Label Context & Branding System for CoachPR SaaS
// Manages tenant branding resolution, theme tokens, and isolation

export interface TenantBranding {
  tenantId: string;
  brandName: string;
  logoUrl?: string;
  faviconUrl?: string;
  primaryColor: string; // default: #D4F60B
  secondaryColor: string; // default: #7C3AED
  backgroundColor: string; // default: #07060C
  cardColor: string; // default: #111116
  textColor: string; // default: #F5F5F5
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
  primaryColor: '#D4F60B',
  secondaryColor: '#7C3AED',
  backgroundColor: '#07060C',
  cardColor: '#111116',
  textColor: '#F5F5F5',
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
    '--cpr-brand-primary': branding.primaryColor || '#D4F60B',
    '--cpr-brand-secondary': branding.secondaryColor || '#7C3AED',
    '--cpr-brand-bg': branding.backgroundColor || '#07060C',
    '--cpr-brand-card': branding.cardColor || '#111116',
    '--cpr-brand-text': branding.textColor || '#F5F5F5'
  };
}
