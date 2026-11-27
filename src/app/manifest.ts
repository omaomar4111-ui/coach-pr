import { MetadataRoute } from 'next';
import { DEFAULT_BRANDING } from '@/lib/branding';

/**
 * Dynamic PWA Web App Manifest
 * Resolves coach-specific application identity, icons, and theme color.
 * Architecture Note on Single-Origin PWA Isolation:
 * Under W3C PWA spec, separate apps on the exact same origin share service workers and storage
 * unless scoped under distinct paths (e.g. /app?coach=XYZ) or custom tenant subdomains.
 */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  return {
    name: 'CoachPR - منصة تدريب الأبطال',
    short_name: 'CoachPR',
    description: 'تطبيق المتدرب الرياضي الذكي — متابعة التمارين والوجبات وتطوير الأداء أوفلاين',
    start_url: '/app',
    display: 'standalone',
    background_color: '#07060C',
    theme_color: '#D4F60B',
    orientation: 'portrait',
    lang: 'ar',
    dir: 'rtl',
    scope: '/',
    icons: [
      {
        src: '/brand-pr-logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/brand-pr-logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/brand-pr-logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    categories: ['fitness', 'health', 'sports']
  };
}
