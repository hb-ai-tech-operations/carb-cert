'use server';

import React from 'react';

import { render } from '@react-email/components';

import { sendEmail } from '@/actions/email-sender';
import NonCompliantVinFollowupEmail from '@/emails/non-compliant-vin-followup-email';
import { signEmailPreferenceToken } from '@/features/email-preferences';

export interface SendNonCompliantVinFollowupEmailInput {
  recipientName: string;
  to: string;
  vin: string;
}

const NON_COMPLIANT_FOLLOWUP_SUBJECT =
  'Clean Truck Check: your vehicle shows non-compliant in CARB';

/**
 * Sends {@link NonCompliantVinFollowupEmail} via SMTP ({@link sendEmail}).
 * Sets `preferencesToken` when `EMAIL_PREFERENCES_SECRET` is configured.
 */
export async function sendNonCompliantVinFollowupEmail(
  input: SendNonCompliantVinFollowupEmailInput
): Promise<{ error?: string; ok: boolean }> {
  const { recipientName, to, vin } = input;
  const trimmedTo = to.trim();
  const trimmedName = recipientName.trim();
  const trimmedVin = vin.trim().toUpperCase();
  if (!trimmedTo || !trimmedName || !trimmedVin) {
    return {
      error: 'Email, recipient name, and VIN are required',
      ok: false,
    };
  }

  let preferencesToken: string | undefined;
  try {
    preferencesToken = signEmailPreferenceToken(trimmedTo);
  } catch {
    // Missing or invalid secret (e.g. local dev): send without signed prefs URL.
  }

  try {
    const html = await render(
      React.createElement(NonCompliantVinFollowupEmail, {
        preferencesToken,
        recipientName: trimmedName,
        vin: trimmedVin,
      })
    );

    await sendEmail({
      to: trimmedTo,
      subject: NON_COMPLIANT_FOLLOWUP_SUBJECT,
      html,
    });

    return { ok: true };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Failed to send non-compliant follow-up email';
    return { error: message, ok: false };
  }
}
