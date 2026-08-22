import { z } from 'zod';

/** RFC-friendly upper bound for email length. */
export const SEND_REMINDER_EMAIL_MAX_LEN = 254;
export const SEND_REMINDER_NAME_MAX_LEN = 120;

export const sendReminderEmailFormSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Enter a valid email')
    .max(SEND_REMINDER_EMAIL_MAX_LEN),
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(SEND_REMINDER_NAME_MAX_LEN),
});

export type SendReminderEmailFormValues = z.infer<
  typeof sendReminderEmailFormSchema
>;
