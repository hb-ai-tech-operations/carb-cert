import { z } from 'zod';

const MAX_NAME_LENGTH = 50;
const MAX_EMAIL_LENGTH = 100;
const MAX_PHONE_LENGTH = 15;
const MAX_MESSAGE_LENGTH = 500;
const MIN_MESSAGE_LENGTH = 20;

export const contactUsFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters' })
    .max(MAX_NAME_LENGTH, {
      message: `Full name must be at most ${MAX_NAME_LENGTH} characters`,
    }),
  email: z
    .email({ message: 'Please enter a valid email address' })
    .max(MAX_EMAIL_LENGTH, {
      message: `Email must be at most ${MAX_EMAIL_LENGTH} characters`,
    }),
  phone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 characters' })
    .max(MAX_PHONE_LENGTH, {
      message: `Phone number must be at most ${MAX_PHONE_LENGTH} characters`,
    })
    .regex(/^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, {
      message: 'Please enter a valid phone number',
    }),
  companyName: z
    .string()
    .min(2, { message: 'Company name must be at least 2 characters' })
    .max(MAX_NAME_LENGTH, {
      message: `Company name must be at most ${MAX_NAME_LENGTH} characters`,
    }),
  message: z
    .string()
    .min(MIN_MESSAGE_LENGTH, {
      message: 'Message must be at least 20 characters',
    })
    .max(MAX_MESSAGE_LENGTH, {
      message: `Message must be at most ${MAX_MESSAGE_LENGTH} characters`,
    }),
});

export type ContactUsFormValues = z.infer<typeof contactUsFormSchema>;
