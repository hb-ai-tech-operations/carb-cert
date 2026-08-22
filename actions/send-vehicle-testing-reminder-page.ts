'use server';

import { sendVehicleTestingReminderEmail } from '@/actions/send-vehicle-testing-reminder-email';
import { sendVehicleTestingReminderFormSchema } from '@/features/send-vehicle-testing-reminder-page/schemas/send-vehicle-testing-reminder.schema';

/**
 * Sends a vehicle testing reminder from the authenticated dashboard.
 * Access is enforced by the dashboard layout (sign-in required).
 */
export async function submitSendVehicleTestingReminderEmail(
  raw: unknown
): Promise<{ error?: string; ok: boolean }> {
  const parsed = sendVehicleTestingReminderFormSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? 'Invalid input';
    return { error: first, ok: false };
  }
  return sendVehicleTestingReminderEmail({
    recipientName: parsed.data.name,
    to: parsed.data.email,
  });
}
