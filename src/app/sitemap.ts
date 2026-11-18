import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://pr-agent-ai.vercel.app';
  return [
    { url: base, lastModified: new Date(), priority: 1.0 },
    { url: `${base}/pricing`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), priority: 0.7 },
  ];
}
