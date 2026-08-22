import type { Metadata, Viewport } from 'next';

import { SITE_SEO } from '@/constants/seo';

interface BuildPageMetadataParams {
  canonicalPath?: string;
  description?: string;
  image?: string;
  index?: boolean;
  keywords?: string[];
  title: string;
}

const asAbsoluteUrl = (pathOrUrl: string): string => {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }

  const normalizedPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_SEO.baseUrl}${normalizedPath}`;
};

export const buildRootMetadata = (): Metadata => ({
  metadataBase: new URL(SITE_SEO.baseUrl),
  title: {
    default: SITE_SEO.defaultTitle,
    template: SITE_SEO.titleTemplate,
  },
  description: SITE_SEO.defaultDescription,
  applicationName: SITE_SEO.appName,
  appleWebApp: { title: SITE_SEO.appName },
});

/** Dashboard, auth, and other non-marketing app surfaces — do not index in search. */
export const privateAreaMetadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export const buildPageMetadata = ({
  title,
  description = SITE_SEO.defaultDescription,
  canonicalPath = '/',
  image = SITE_SEO.defaultOgImage,
  keywords,
  index = true,
}: BuildPageMetadataParams): Metadata => {
  const canonicalUrl = asAbsoluteUrl(canonicalPath);
  const imageUrl = asAbsoluteUrl(image);

  return {
    title,
    description,
    keywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_SEO.siteName,
      locale: SITE_SEO.locale,
      type: 'website',
      images: [
        {
          url: imageUrl,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index,
      follow: index,
      googleBot: {
        index,
        follow: index,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
};

export const buildViewport = (): Viewport => ({
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
});
