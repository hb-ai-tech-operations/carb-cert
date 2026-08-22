import type { MetadataRoute } from 'next';

import { SITE_SEO } from '@/constants/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_SEO.siteName,
    short_name: 'CarbCert',
    description: SITE_SEO.defaultDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#d0fde7',
    theme_color: '#d0fde7',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
