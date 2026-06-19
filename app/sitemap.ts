import { MetadataRoute } from 'next';
import { ARTICLES_DATA } from '@/app/[locale]/(public)/blog/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://islamtebyan.com';
  const locales = ['ar', 'en', 'fr'];
  
  // Base routes that exist in the public layout
  const baseRoutes = [
    '',
    '/about',
    '/book',
    '/contact',
    '/faq',
    '/method',
    '/pricing',
    '/privacy',
    '/terms',
    '/programs',
    '/programs/arabic',
    '/programs/islamic',
    '/programs/quran',
    '/teachers',
    '/blog',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add static routes
  for (const route of baseRoutes) {
    // 1. Canonical route (without locale prefix)
    sitemapEntries.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'daily' : 'monthly',
      priority: route === '' ? 1.0 : 0.8,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar${route}`,
          en: `${baseUrl}/en${route}`,
          fr: `${baseUrl}/fr${route}`,
        },
      },
    });

    // 2. Explicit localized routes
    for (const locale of locales) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'monthly',
        priority: route === '' ? 0.9 : 0.7,
      });
    }
  }

  // Add dynamic blog routes from ARTICLES_DATA
  const articleSlugs = new Set<string>();
  Object.keys(ARTICLES_DATA).forEach((locale) => {
    Object.keys(ARTICLES_DATA[locale]).forEach((slug) => {
      articleSlugs.add(slug);
    });
  });

  for (const slug of articleSlugs) {
    const route = `/blog/${slug}`;

    // 1. Canonical blog route
    sitemapEntries.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar${route}`,
          en: `${baseUrl}/en${route}`,
          fr: `${baseUrl}/fr${route}`,
        },
      },
    });

    // 2. Explicit localized blog routes
    for (const locale of locales) {
      if (ARTICLES_DATA[locale] && ARTICLES_DATA[locale][slug]) {
        sitemapEntries.push({
          url: `${baseUrl}/${locale}${route}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.5,
        });
      }
    }
  }

  return sitemapEntries;
}
