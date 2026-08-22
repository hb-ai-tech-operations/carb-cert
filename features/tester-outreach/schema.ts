import { z } from 'zod';

/** RFC-friendly upper bound for email length. */
export const TESTER_OUTREACH_EMAIL_MAX_LEN = 254;
export const TESTER_OUTREACH_NAME_MAX_LEN = 120;

export const testerOutreachFormSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Enter a valid email')
    .max(TESTER_OUTREACH_EMAIL_MAX_LEN),
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(TESTER_OUTREACH_NAME_MAX_LEN),
});

export type TesterOutreachFormValues = z.infer<typeof testerOutreachFormSchema>;
