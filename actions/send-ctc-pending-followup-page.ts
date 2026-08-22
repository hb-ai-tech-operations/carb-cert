'use server';

import { sendCtcPendingFollowupEmail } from '@/actions/send-ctc-pending-followup-email';
import { sendCtcPendingFollowupFormSchema } from '@/features/send-ctc-pending-followup-page/schemas/send-ctc-pending-followup.schema';

/**
 * Sends a CTC pending follow-up from the authenticated dashboard.
 * Access is enforced by the dashboard layout (sign-in required).
 */
export async function submitSendCtcPendingFollowupEmail(
  raw: unknown
): Promise<{ error?: string; ok: boolean }> {
  const parsed = sendCtcPendingFollowupFormSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? 'Invalid input';
    return { error: first, ok: false };
  }
  return sendCtcPendingFollowupEmail({
    recipientName: parsed.data.name,
    to: parsed.data.email,
  });
}
