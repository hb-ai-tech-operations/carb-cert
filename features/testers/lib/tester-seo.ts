import type { Metadata } from 'next';

import { SITE_SEO } from '@/constants/seo';
import {
  getTesterCardPath,
  type TesterProfile,
} from '@/features/testers/data/testers';

const siteUrl = SITE_SEO.baseUrl;

/** Default assets from onboarding mapper; use branded OG when still on placeholders. */
const PLACEHOLDER_MEDIA = new Set([
  '/web-app-manifest-192x192.png',
  '/web-app-manifest-512x512.png',
]);

const META_DESCRIPTION_MAX = 155;
const JSON_LD_DESCRIPTION_MAX = 320;

const normalizeAbsoluteUrl = (pathOrUrl: string) => {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }

  const normalizedPath = pathOrUrl.startsWith('/')
    ? pathOrUrl
    : `/${pathOrUrl}`;
  return `${siteUrl}${normalizedPath}`;
};

function truncateMetaDescription(
  text: string,
  max = META_DESCRIPTION_MAX
): string {
  const trimmed = text.trim().replace(/\s+/g, ' ');
  if (trimmed.length <= max) {
    return trimmed;
  }
  return `${trimmed.slice(0, max - 1).trimEnd()}…`;
}

export function buildTesterMetaDescription(tester: TesterProfile): string {
  const locality = `${tester.location.city}, ${tester.location.region}`;
  const orgTrimmed = tester.organizationName?.trim() ?? '';
  const org =
    orgTrimmed.length > 0 ? orgTrimmed : 'Independent testing facility';
  const combined = `${tester.tagline.trim()} ${org} · ${locality}. Book Clean Truck Check–aligned heavy-duty emissions testing.`;
  return truncateMetaDescription(combined);
}

function openGraphImageForTester(tester: TesterProfile): {
  alt: string;
  height?: number;
  url: string;
  width?: number;
} {
  const useBrandedDefault =
    PLACEHOLDER_MEDIA.has(tester.avatarSrc) &&
    PLACEHOLDER_MEDIA.has(tester.bannerSrc);

  if (useBrandedDefault) {
    return {
      url: normalizeAbsoluteUrl(SITE_SEO.defaultOgImage),
      alt: `${tester.name} — Carb Cert certified tester`,
    };
  }

  return {
    url: normalizeAbsoluteUrl(tester.bannerSrc),
    width: 512,
    height: 512,
    alt: `${tester.name} — Clean Truck Check testing services`,
  };
}

export function buildTesterMetadata(tester: TesterProfile): Metadata {
  const path = getTesterCardPath(tester.slug);
  const canonicalUrl = normalizeAbsoluteUrl(path);
  const title = `${tester.name} | Clean Truck Check tester in ${tester.location.city}, ${tester.location.region}`;
  const description = buildTesterMetaDescription(tester);
  const ogImage = openGraphImageForTester(tester);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      locale: 'en_US',
      siteName: SITE_SEO.siteName,
      type: 'profile',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

export function buildTesterJsonLd(tester: TesterProfile) {
  const profileUrl = normalizeAbsoluteUrl(getTesterCardPath(tester.slug));
  const imageUrl = normalizeAbsoluteUrl(tester.avatarSrc);
  const description = truncateMetaDescription(
    tester.tagline,
    JSON_LD_DESCRIPTION_MAX
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: tester.name,
    description,
    jobTitle: tester.jobTitle ?? 'Certified Heavy-Duty Emissions Tester',
    knowsAbout: [
      'Clean Truck Check',
      'California Air Resources Board heavy-duty emissions compliance',
      'Heavy-duty vehicle emissions testing',
      tester.organizationName ?? 'Commercial truck emissions testing',
    ],
    worksFor: {
      '@type': 'Organization',
      name: tester.organizationName ?? 'Independent testing facility',
      description: 'CARB Clean Truck Check testing services',
    },
    areaServed: {
      '@type': 'State',
      name: 'California',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: tester.location.city,
      addressRegion: tester.location.region,
      addressCountry: 'US',
    },
    telephone: tester.phoneTel,
    email: tester.email,
    url: profileUrl,
    image: imageUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': profileUrl,
    },
  };
}

/** ItemList JSON-LD for the public directory (improves discoverability of profile URLs). */
export function buildTestersDirectoryJsonLd(testers: TesterProfile[]) {
  const listUrl = normalizeAbsoluteUrl('/testers');

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Carb Cert certified testers directory',
    description:
      'CARB Clean Truck Check credentialed heavy-duty emissions testers in California. View profiles and contact testers for compliance testing.',
    url: listUrl,
    numberOfItems: testers.length,
    itemListElement: testers.map((tester, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tester.name,
      url: normalizeAbsoluteUrl(getTesterCardPath(tester.slug)),
    })),
  };
}
