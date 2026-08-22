import type { MetadataRoute } from 'next';

import { absoluteAppUrl } from '@/constants/app';
import { loadPublicTesterProfiles } from '@/features/testers/data/load-public-testers';
import { getTesterCardPath } from '@/features/testers/data/testers';
import { getBlogSlugs, getPostBySlug } from '@/lib/blog/posts';

/**
 * Public, indexable routes only. Do not list hash fragments (`/#section`); crawlers
 * treat them as the same URL as `/` and they add noise to sitemap.xml.
 */
const PUBLIC_SITEMAP_CONFIG = [
  { path: '/', changeFrequency: 'weekly' as const, priority: 1 },
  {
    path: '/clean-truck-check',
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  },
  {
    path: '/compliance-form',
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  },
  {
    path: '/blog',
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  },
  {
    path: '/testers',
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  },
  {
    path: '/carb-truck-tester-partnership',
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    path: '/privacy-policy',
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  },
  {
    path: '/terms-and-conditions',
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  },
  {
    path: '/message-consent',
    changeFrequency: 'yearly' as const,
    priority: 0.45,
  },
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticEntries = PUBLIC_SITEMAP_CONFIG.map(entry => ({
    url: absoluteAppUrl(entry.path),
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));

  const blogPostEntries: MetadataRoute.Sitemap = getBlogSlugs().map(slug => {
    const post = getPostBySlug(slug);
    const rawDate = post?.updated ?? post?.date;
    return {
      url: absoluteAppUrl(`/blog/${slug}`),
      lastModified: rawDate ? new Date(rawDate) : lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    };
  });

  const publicTesters = await loadPublicTesterProfiles();
  const testerProfileEntries: MetadataRoute.Sitemap = publicTesters.map(
    tester => ({
      url: absoluteAppUrl(getTesterCardPath(tester.slug)),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.72,
    })
  );

  return [
    ...staticEntries,
    ...blogPostEntries,
    ...testerProfileEntries,
  ];
}
