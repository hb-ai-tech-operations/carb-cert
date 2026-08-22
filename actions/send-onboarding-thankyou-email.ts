'use server';

import React from 'react';

import { render } from '@react-email/components';

import { sendEmail } from '@/actions/email-sender';
import OnboardingThankYouEmail from '@/emails/onboarding-thankyou';

const SUBJECT = 'Carb Cert — Your tester application has been received';

interface SendOnboardingThankYouArgs {
  businessName: string;
  email: string;
  name: string;
}

export async function sendOnboardingThankYouEmail({
  email,
  name,
  businessName,
}: SendOnboardingThankYouArgs): Promise<{ error?: string; ok: boolean }> {
  try {
    const html = await render(
      React.createElement(OnboardingThankYouEmail, { name, businessName })
    );

    await sendEmail({
      to: email.trim(),
      subject: SUBJECT,
      html,
    });

    return { ok: true };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Failed to send onboarding confirmation email';
    return { error: message, ok: false };
  }
}
