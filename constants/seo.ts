import { APP_CONFIG } from './app';

const appUrl = APP_CONFIG.url.endsWith('/')
  ? APP_CONFIG.url.slice(0, -1)
  : APP_CONFIG.url;

export const SITE_SEO = {
  siteName: 'Carb Cert',
  appName: 'Carb Cert',
  locale: 'en_US',
  baseUrl: appUrl,
  defaultDescription: APP_CONFIG.description,
  defaultOgImage: '/og/carb-cert.webp',
  titleTemplate: `%s | Carb Cert`,
  defaultTitle: 'Clean Truck Check & CARB Compliance Help | Carb Cert',
} as const;
