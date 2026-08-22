import { CONTACT_NAME } from '@/constants/app';
import { SITE_SEO } from '@/constants/seo';

/** Must match `siteOrganizationJsonLdId` in `jsonld.ts` (same expression). */
const organizationJsonLdId = `${SITE_SEO.baseUrl}/#organization` as const;

const blogPostUrl = (slug: string): string =>
  `${SITE_SEO.baseUrl}/blog/${slug}`;

export function buildBlogPostingJsonLdHtml({
  dateModified,
  datePublished,
  description,
  slug,
  title,
}: {
  dateModified?: string;
  datePublished: string;
  description: string;
  slug: string;
  title: string;
}): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    author: {
      '@type': 'Organization',
      name: CONTACT_NAME,
      url: SITE_SEO.baseUrl,
    },
    dateModified: dateModified ?? datePublished,
    datePublished,
    description,
    headline: title,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': blogPostUrl(slug),
    },
    publisher: {
      '@id': organizationJsonLdId,
    },
    url: blogPostUrl(slug),
  }).replace(/</g, '\\u003c');
}
