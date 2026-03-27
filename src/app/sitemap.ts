import type { MetadataRoute } from 'next';
import { locales } from './i18n';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://daily-games.fr';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${APP_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: locale === 'fr' ? 1.0 : 0.9,
    });

    entries.push({
      url: `${APP_URL}/${locale}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  }

  return entries;
}
