/**
 * Tester digital card types and URL helpers. Live directory data is loaded from Convex
 * (`loadPublicTesterProfiles` / `loadPublicTesterProfileBySlug`) for approved, opted-in testers.
 */

export interface TesterPricingRow {
  label: string;
  value: string;
}

export interface TesterProfile {
  avatarSrc: string;
  bannerSrc: string;
  /** If set, "Book an appointment" opens this URL */
  bookingUrl?: string;
  /** Coverage / service area blurb */
  coverageDescription: string;
  /** Short pill on directory cards (defaults to "Clean Truck Check") */
  directoryBadge?: string;
  email: string;
  hours: {
    /** e.g. "Mon-Fri · 7:00 a.m.-5:00 p.m." */
    lines: string[];
  };
  /** Section subtitle under "Hours & service area" */
  hoursAreaBlurb?: string;
  jobTitle?: string;
  location: {
    city: string;
    /** Usually "CA" */
    region: string;
  };
  name: string;
  /** JSON-LD */
  organizationName?: string;
  phoneDisplay: string;
  /** E.164 or tel:-safe, e.g. +12135551234 */
  phoneTel: string;
  pricingRows: TesterPricingRow[];
  /** Shown next to CARB badge (e.g. "Certified tester") */
  roleBadge: string;
  /** Raw service area / ZIP coverage text from onboarding */
  serviceArea: string;
  /** URL segment: /testers/{slug} */
  slug: string;
  /** Hero intro paragraph */
  tagline: string;
  /** Optional; defaults to shared checklist in the card component */
  visitChecklist?: string[];
}

export const TESTER_CARD_BASE_PATH = '/testers' as const;

export function getTesterCardPath(slug: string): string {
  return `${TESTER_CARD_BASE_PATH}/${slug}`;
}
