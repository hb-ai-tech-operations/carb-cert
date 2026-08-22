import { z } from 'zod';

/** RFC-friendly upper bound for email length. */
export const SEND_CTC_PENDING_FOLLOWUP_EMAIL_MAX_LEN = 254;
export const SEND_CTC_PENDING_FOLLOWUP_NAME_MAX_LEN = 120;

export const sendCtcPendingFollowupFormSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Enter a valid email')
    .max(SEND_CTC_PENDING_FOLLOWUP_EMAIL_MAX_LEN),
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(SEND_CTC_PENDING_FOLLOWUP_NAME_MAX_LEN),
});

export type SendCtcPendingFollowupFormValues = z.infer<
  typeof sendCtcPendingFollowupFormSchema
>;
