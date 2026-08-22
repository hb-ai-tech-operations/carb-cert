'use server';

import React from 'react';

import { render } from '@react-email/components';

import { sendEmail } from '@/actions/email-sender';
import VehicleTestingReminderEmail from '@/emails/vehicle-testing-reminder-email';
import { signEmailPreferenceToken } from '@/features/email-preferences';

export interface SendVehicleTestingReminderEmailInput {
  recipientName: string;
  to: string;
}

const VEHICLE_TESTING_REMINDER_SUBJECT =
  'Reminder: vehicle testing required to complete registration';

/**
 * Sends {@link VehicleTestingReminderEmail} via SMTP ({@link sendEmail}).
 * Sets `preferencesToken` when `EMAIL_PREFERENCES_SECRET` is configured.
 */
export async function sendVehicleTestingReminderEmail(
  input: SendVehicleTestingReminderEmailInput
): Promise<{ error?: string; ok: boolean }> {
  const { recipientName, to } = input;
  const trimmedTo = to.trim();
  const trimmedName = recipientName.trim();
  if (!trimmedTo || !trimmedName) {
    return { error: 'Email and recipient name are required', ok: false };
  }

  let preferencesToken: string | undefined;
  try {
    preferencesToken = signEmailPreferenceToken(trimmedTo);
  } catch {
    // Missing or invalid secret (e.g. local dev): send without signed prefs URL.
  }

  try {
    const html = await render(
      React.createElement(VehicleTestingReminderEmail, {
        preferencesToken,
        recipientName: trimmedName,
      })
    );

    await sendEmail({
      to: trimmedTo,
      subject: VEHICLE_TESTING_REMINDER_SUBJECT,
      html,
    });

    return { ok: true };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Failed to send vehicle testing reminder email';
    return { error: message, ok: false };
  }
}
