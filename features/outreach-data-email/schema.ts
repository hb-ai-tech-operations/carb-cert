import { z } from 'zod';

import { normalizeVin } from '@/features/compliance-form/utils/vin';

/** Last 4 VIN chars: alphanumeric (A–Z, 0–9). */
const LAST4_VIN_FORMAT_REGEX = /^[\dA-Z]{4}$/;

/** RFC-friendly upper bound for email length. */
export const OUTREACH_DATA_EMAIL_MAX_LEN = 254;
export const OUTREACH_DATA_NAME_MAX_LEN = 120;
export const OUTREACH_DATA_LAST4_VIN_LEN = 4;

export const outreachDataEmailFormSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Enter a valid email')
    .max(OUTREACH_DATA_EMAIL_MAX_LEN),
  last4VIN: z
    .string()
    .trim()
    .transform(normalizeVin)
    .pipe(
      z
        .string()
        .length(
          OUTREACH_DATA_LAST4_VIN_LEN,
          'Enter the last 4 VIN characters'
        )
        .refine(
          value => LAST4_VIN_FORMAT_REGEX.test(value),
          'Enter a valid VIN ending'
        )
    ),
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(OUTREACH_DATA_NAME_MAX_LEN),
});

export type OutreachDataEmailFormValues = z.infer<
  typeof outreachDataEmailFormSchema
>;
