import { z } from 'zod';

export const RECIPIENT_EMAIL_MAX_LEN = 254;
export const CUSTOMER_NAME_MAX_LEN = 120;
export const ENTITY_ID_MAX_LEN = 32;
export const VIN_MAX_LEN = 190;
export const TESTING_TYPE_MAX_LEN = 200;
export const TESTERS_URL_MAX_LEN = 2000;

export const accountCreatedEmailFormSchema = z
  .object({
    customerName: z
      .string()
      .trim()
      .min(1, 'Customer name is required')
      .max(CUSTOMER_NAME_MAX_LEN),
    entityId: z
      .string()
      .trim()
      .min(1, 'Entity ID is required')
      .max(ENTITY_ID_MAX_LEN),
    recipientEmail: z
      .string()
      .trim()
      .email('Enter a valid email')
      .max(RECIPIENT_EMAIL_MAX_LEN),
    testersSearchUrl: z.string().trim().max(TESTERS_URL_MAX_LEN),
    testingType: z
      .string()
      .trim()
      .min(1, 'Testing type is required')
      .max(TESTING_TYPE_MAX_LEN),
    vin: z.string().trim().min(1, 'VIN is required').max(VIN_MAX_LEN),
  })
  .superRefine((data, context) => {
    if (data.testersSearchUrl.length === 0) {
      return;
    }
    const parsed = z.string().url().safeParse(data.testersSearchUrl);
    if (!parsed.success) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Enter a valid URL',
        path: ['testersSearchUrl'],
      });
    }
  });

export type AccountCreatedEmailFormValues = z.infer<
  typeof accountCreatedEmailFormSchema
>;
