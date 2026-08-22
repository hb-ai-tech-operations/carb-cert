import type { MetadataRoute } from 'next';

import { absoluteAppUrl } from '@/constants/app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/sign-in'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
          'cohere-ai',
        ],
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/dashboard', '/sign-in'],
      },
    ],
    sitemap: absoluteAppUrl('/sitemap.xml'),
  };
}
