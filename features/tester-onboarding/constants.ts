// ── Max lengths ──────────────────────────────────────────────────────────────
export const TESTER_FULL_NAME_MAX = 120;
export const TESTER_BUSINESS_NAME_MAX = 160;
export const TESTER_EMAIL_MAX = 254;
export const TESTER_PHONE_MAX = 20;
export const TESTER_SERVICE_AREA_MAX = 500;
export const TESTER_SERVICE_RADIUS_MAX = 50;
export const TESTER_GVWR_MAX = 50;
export const TESTER_WORKING_HOURS_MAX = 80;
export const TESTER_PRICING_MAX = 80;

// ── Option constants ─────────────────────────────────────────────────────────
export const PREFERRED_CONTACT_OPTIONS = [
  { label: 'Call', value: 'call' },
  { label: 'Text', value: 'text' },
  { label: 'Email', value: 'email' },
  { label: 'Both', value: 'both' },
] as const;

export const PUBLIC_NAME_PREFERENCE_OPTIONS = [
  { label: 'Real name (full name)', value: 'full_name' },
  { label: 'Business name', value: 'business_name' },
] as const;

export const MOBILE_TESTING_OPTIONS = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
] as const;

export const TESTS_PERFORMED_OPTIONS = [
  { label: 'OBD (On-Board Diagnostics)', value: 'obd' },
  { label: 'OVI (Opacity & Visual Inspection)', value: 'ovi' },
] as const;

export const VEHICLE_TYPE_OPTIONS = [
  { label: 'Trucks', value: 'trucks' },
  { label: 'RVs', value: 'rvs' },
  { label: 'Buses', value: 'buses' },
  { label: 'All', value: 'all' },
] as const;

export const CARB_CREDENTIALED_OPTIONS = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
] as const;

export const WORKING_DAY_OPTIONS = [
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
  { label: 'Friday', value: 'friday' },
  { label: 'Saturday', value: 'saturday' },
  { label: 'Sunday', value: 'sunday' },
] as const;

export const RESPONSE_TIME_OPTIONS = [
  { label: 'Same day', value: 'same_day' },
  { label: 'Within 24 hours', value: 'within_24_hours' },
  { label: '2–3 days', value: '2_3_days' },
] as const;

export const PROMOTE_SERVICES_OPTIONS = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
] as const;

export const LIST_ON_WEBSITE_OPTIONS = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
] as const;

export const YES_NO_OPTIONS = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
] as const;
