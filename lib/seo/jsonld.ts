import type { Organization, WebPage, WithContext } from 'schema-dts';

import {
  CONTACT_EMAIL,
  CONTACT_NAME,
  CONTACT_PHONE_WITHOUT_FORMAT,
} from '@/constants/app';
import { SITE_SEO } from '@/constants/seo';

/** Stable @id for Organization — referenced by WebSite.publisher in the sitewide graph. */
export const siteOrganizationJsonLdId =
  `${SITE_SEO.baseUrl}/#organization` as const;

const organizationGraphNode = {
  '@type': 'Organization' as const,
  '@id': siteOrganizationJsonLdId,
  name: CONTACT_NAME,
  url: SITE_SEO.baseUrl,
  logo: `${SITE_SEO.baseUrl}/logos/carb-cert-dark.png`,
  email: CONTACT_EMAIL,
  telephone: CONTACT_PHONE_WITHOUT_FORMAT,
};

export const buildOrganizationJsonLd = (): WithContext<Organization> => ({
  '@context': 'https://schema.org',
  ...organizationGraphNode,
});

export const buildWebPageJsonLd = ({
  title,
  description,
  path,
}: {
  description: string;
  path: string;
  title: string;
}): WithContext<WebPage> => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: title,
  description,
  url: `${SITE_SEO.baseUrl}${path.startsWith('/') ? path : `/${path}`}`,
  inLanguage: 'en',
});

export const sanitizeJsonLd = (
  data: WithContext<Organization> | WithContext<WebPage>
): string => JSON.stringify(data).replace(/</g, '\\u003c');

/** Organization + WebSite as one JSON-LD graph for `<script type="application/ld+json">`. */
export const buildSiteJsonLdGraphHtml = (): string =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      organizationGraphNode,
      {
        '@type': 'WebSite',
        url: SITE_SEO.baseUrl,
        name: SITE_SEO.siteName,
        publisher: { '@id': siteOrganizationJsonLdId },
      },
    ],
  }).replace(/</g, '\\u003c');
