import { z } from 'zod';

export const stepThreeSchema = z.object({
  billingAddress: z
    .string()
    .min(2, { message: 'Billing address is required' })
    .max(200, { message: 'Billing address must be at most 200 characters' }),
  billingCity: z
    .string()
    .min(2, { message: 'City is required' })
    .max(100, { message: 'City must be at most 100 characters' }),
  billingState: z
    .string()
    .min(2, { message: 'State is required' })
    .max(100, { message: 'State must be at most 100 characters' }),
  billingZipCode: z
    .string()
    .min(3, { message: 'Zip code is required' })
    .max(10, { message: 'Zip code must be at most 10 characters' }),
  billingCountry: z
    .string()
    .min(2, { message: 'Country is required' })
    .max(100, { message: 'Country must be at most 100 characters' }),
  acceptTerms: z.boolean().refine(value => Boolean(value), {
    message: 'You must accept the terms and conditions to continue',
  }),
  /** Optional — not required to use the service or complete payment. */
  consentToMarketingMessages: z.boolean().default(false),
});

export type StepThreeSchema = z.infer<typeof stepThreeSchema>;
