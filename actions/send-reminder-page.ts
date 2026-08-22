'use server';

import { sendReminderEmail } from '@/actions/send-reminder-email';
import {
  sendReminderEmailFormSchema,
} from '@/features/send-reminder-page/schemas/send-reminder.schema';

/**
 * Sends a compliance reminder from the authenticated dashboard.
 * Access is enforced by the dashboard layout (sign-in required).
 */
export async function submitSendReminderEmail(
  raw: unknown
): Promise<{ error?: string; ok: boolean }> {
  const parsed = sendReminderEmailFormSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? 'Invalid input';
    return { error: first, ok: false };
  }
  return sendReminderEmail({
    recipientName: parsed.data.name,
    to: parsed.data.email,
  });
}
