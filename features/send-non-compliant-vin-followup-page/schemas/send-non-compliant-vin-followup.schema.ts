import { z } from 'zod';

import {
  isValidVinFormat,
  normalizeVin,
  VIN_LENGTH,
} from '@/features/compliance-form/utils/vin';

/** RFC-friendly upper bound for email length. */
export const SEND_NON_COMPLIANT_FOLLOWUP_EMAIL_MAX_LEN = 254;
export const SEND_NON_COMPLIANT_FOLLOWUP_NAME_MAX_LEN = 120;

export const sendNonCompliantVinFollowupFormSchema = z
  .object({
    email: z
      .string()
      .trim()
      .email('Enter a valid email')
      .max(SEND_NON_COMPLIANT_FOLLOWUP_EMAIL_MAX_LEN),
    name: z
      .string()
      .trim()
      .min(1, 'Name is required')
      .max(SEND_NON_COMPLIANT_FOLLOWUP_NAME_MAX_LEN),
    vin: z.string().trim().min(1, 'VIN is required'),
  })
  .superRefine((data, context) => {
    const normalized = normalizeVin(data.vin);
    if (normalized.length !== VIN_LENGTH) {
      context.addIssue({
        code: 'custom',
        message: 'VIN must be exactly 17 characters',
        path: ['vin'],
      });
      return;
    }
    if (!isValidVinFormat(normalized)) {
      context.addIssue({
        code: 'custom',
        message: 'Invalid VIN format',
        path: ['vin'],
      });
    }
  });

export type SendNonCompliantVinFollowupFormValues = z.infer<
  typeof sendNonCompliantVinFollowupFormSchema
>;
