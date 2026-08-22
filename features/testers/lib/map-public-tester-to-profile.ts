import type { PublicListedTesterApplication } from '@/features/testers/data/public-listed-tester';
import type { TesterProfile } from '@/features/testers/data/testers';

const DEFAULT_AVATAR = '/web-app-manifest-192x192.png';
const DEFAULT_BANNER = '/web-app-manifest-512x512.png';

function titleCaseWords(value: string): string {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

function formatList(items: string[]): string {
  return items.map(s => titleCaseWords(s.replace(/_/g, ' '))).join(', ');
}

function parseServiceArea(serviceArea: string): {
  city: string;
  region: string;
} {
  const parts = serviceArea
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  if (parts.length >= 2) {
    const last = parts.at(-1) ?? '';
    const region = last.length <= 3 ? last.toUpperCase() : 'CA';
    const city = parts.slice(0, -1).join(', ');
    return { city: city || parts[0], region };
  }
  return { city: parts[0] ?? 'California', region: 'CA' };
}

function phoneToTel(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  const usLocalNumberLength = 10;
  const nanpWithCountryCodeLength = 11;
  if (digits.length === usLocalNumberLength) {
    return `+1${digits}`;
  }
  if (digits.length === nanpWithCountryCodeLength && digits.startsWith('1')) {
    return `+${digits}`;
  }
  return digits ? `+${digits}` : phone.trim();
}

function buildTagline(
  record: PublicListedTesterApplication,
  city: string
): string {
  const tests = formatList(record.testsPerformed);
  const vehicles = formatList(record.vehicleTypes);
  const mobile =
    record.mobileTestingAvailable === 'yes'
      ? ' Mobile and on-site coordination available where applicable.'
      : '';
  return `Heavy-duty emissions testing for ${vehicles || 'qualified vehicles'} in the ${city} area — ${tests || 'Clean Truck Check–aligned testing'}.${mobile}`;
}

export function mapPublicListedTesterToProfile(
  record: PublicListedTesterApplication
): TesterProfile {
  const location = parseServiceArea(record.serviceArea);
  const workingDaysLabel = formatList(record.workingDays);
  const response = record.responseTime.replace(/_/g, ' ');
  const radiusNote = record.serviceRadius?.trim()
    ? ` Service radius: ${record.serviceRadius.trim()}.`
    : '';

  const pricingRows = record.averageTestingPrice?.trim()
    ? [
        {
          label: 'Typical testing price (as stated on application)',
          value: record.averageTestingPrice.trim(),
        },
        {
          label: 'Clean Truck Check emissions test',
          value: 'Contact to confirm',
        },
      ]
    : [
        {
          label: 'Clean Truck Check emissions test',
          value: 'Contact for pricing',
        },
      ];

  return {
    slug: record.slug,
    name:
      record.publicNamePreference === 'business_name'
        ? record.businessName.trim()
        : record.fullName.trim(),
    roleBadge:
      record.carbCredentialed === 'yes'
        ? 'CARB credentialed tester'
        : 'Certified emissions tester',
    tagline: buildTagline(record, location.city),
    location,
    phoneDisplay: record.phone.trim(),
    phoneTel: phoneToTel(record.phone),
    email: record.email.trim(),
    avatarSrc: record.avatarSrc ?? DEFAULT_AVATAR,
    bannerSrc: DEFAULT_BANNER,
    hours: {
      lines: [workingDaysLabel, record.workingHours.trim()].filter(Boolean),
    },
    serviceArea: record.serviceArea.trim(),
    coverageDescription: `${record.serviceArea.trim()}${record.mobileTestingAvailable === 'yes' ? ' · Mobile testing available' : ''}`,
    hoursAreaBlurb: `${record.serviceArea.trim()}.${radiusNote} Typical response: ${response}.`,
    pricingRows,
    organizationName: record.businessName.trim(),
    jobTitle: 'Certified Heavy-Duty Emissions Tester',
    directoryBadge: record.vehicleTypes[0]
      ? titleCaseWords(record.vehicleTypes[0].replace(/_/g, ' '))
      : 'Clean Truck Check',
  };
}
