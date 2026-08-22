import { z } from 'zod';

import { isAllowedDashboardSignInEmail } from '@/convex/lib/dashboardSignInAllowlist';

export const SIGN_IN_EMAIL_MAX_LEN = 254;
export const SIGN_IN_PASSWORD_MAX_LEN = 256;

export const signInFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Enter a valid email address')
    .max(SIGN_IN_EMAIL_MAX_LEN)
    .refine(isAllowedDashboardSignInEmail, {
      message: 'Unauthorized',
    }),
  password: z
    .string()
    .min(1, 'Password is required')
    .max(SIGN_IN_PASSWORD_MAX_LEN, 'Password is too long'),
});

export type SignInFormValues = z.infer<typeof signInFormSchema>;
