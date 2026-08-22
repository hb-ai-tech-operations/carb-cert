// Application-wide constants

import { formatCurrency } from '@/lib';

export const ROUTES = {
  HOME: '/',
  SERVICES: '/#services',
  PRICING: '/#pricing',
  TESTERS: '/testers',
  BLOG: '/blog',
  FAQ: '/#faq',
  CONTACT_US: '/#contact-us',
  /** Email preference center (reminder opt-in/out). Prefer `?token=` from signed links. */
  EMAIL_PREFERENCES: '/email/preferences',
  /** Optional marketing / message consent disclosure (shareable, no sign-in). */
  MESSAGE_CONSENT: '/message-consent',
  COMPLIANCE_FORM: '/compliance-form',
  /** Internal tool: reminder sender (dashboard, sign-in required). */
  SEND_REMINDER: '/dashboard/send-reminder',
  /** Internal tool: non-compliant VIN follow-up email (dashboard, sign-in required). */
  SEND_NON_COMPLIANT_FOLLOWUP: '/dashboard/send-non-compliant-followup',
  /** Internal tool: CTC pending compliance follow-up (dashboard, sign-in required). */
  SEND_CTC_PENDING_FOLLOWUP: '/dashboard/send-ctc-pending-followup',
  /** Internal tool: vehicle testing pending reminder (dashboard, sign-in required). */
  SEND_VEHICLE_TESTING_REMINDER: '/dashboard/send-vehicle-testing-reminder',
  /** Internal tool: certified-tester outreach (dashboard, sign-in required). */
  TESTER_OUTREACH: '/dashboard/tester-outreach',
  /** Internal tool: certificate sender with attachment (dashboard, sign-in required). */
  SEND_CERTIFICATE: '/dashboard/send-certificate',
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/** CARB compliance fee (included in PRICE_BASE). Source: California Air Resources Board. */
export const CARB_COMPLIANCE_FEE = 32.13;
export const PRICE_BASE = 76; // base fee per vehicle
export const PRICE_ADDITIONAL = 69; // each additional vehicle

export const CARB_COMPLIANCE_FEE_FORMATTED =
  formatCurrency(CARB_COMPLIANCE_FEE);
export const PRICE_BASE_FORMATTED = formatCurrency(PRICE_BASE);
export const PRICE_ADDITIONAL_FORMATTED = formatCurrency(PRICE_ADDITIONAL);

export const APP_CONFIG = {
  name: 'CA Air',
  description: `Clean Truck Check & CTC-VIS filing help for CA heavy-duty trucks & fleets. ${PRICE_BASE_FORMATTED}/vehicle flat-rate compliance service — CTC-VIS filing, reporting, and certificate delivery handled for you. Third-party service—not CARB; emissions testing at authorized facilities only.`,
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const;

/**
 * Canonical site origin (scheme + host, no path). Use for robots `host` and building absolute URLs.
 */
export function getAppOrigin(): string {
  try {
    return new URL(APP_CONFIG.url).origin;
  } catch {
    return APP_CONFIG.url.replace(/\/+$/, '');
  }
}

/** Absolute URL for a pathname (must start with `/`). Safe with any `APP_CONFIG.url` shape. */
export function absoluteAppUrl(pathname: string): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return new URL(path, `${getAppOrigin()}/`).href;
}

export const WEBSITE_URL = 'www.carbcert.com';
export const CONTACT_EMAIL = 'support@carbcert.com';
export const CONTACT_PHONE = '(888) 282-8755';
export const CONTACT_PHONE_WITHOUT_FORMAT = `+1${CONTACT_PHONE.replace(/\D/g, '')}`;
export const CONTACT_NAME = 'Carb Cert';
export const LEGAL_EFFECTIVE_DATE = '03/19/2026';
