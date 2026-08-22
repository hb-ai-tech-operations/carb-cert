'use server';

import { sendNonCompliantVinFollowupEmail } from '@/actions/send-non-compliant-vin-followup-email';
import { normalizeVin } from '@/features/compliance-form/utils/vin';
import { sendNonCompliantVinFollowupFormSchema } from '@/features/send-non-compliant-vin-followup-page/schemas/send-non-compliant-vin-followup.schema';

/**
 * Sends the non-compliant VIN follow-up from the authenticated dashboard.
 * Access is enforced by the dashboard layout (sign-in required).
 */
export async function submitSendNonCompliantVinFollowupEmail(
  raw: unknown
): Promise<{ error?: string; ok: boolean }> {
  const parsed = sendNonCompliantVinFollowupFormSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? 'Invalid input';
    return { error: first, ok: false };
  }
  return sendNonCompliantVinFollowupEmail({
    recipientName: parsed.data.name,
    to: parsed.data.email,
    vin: normalizeVin(parsed.data.vin),
  });
}
