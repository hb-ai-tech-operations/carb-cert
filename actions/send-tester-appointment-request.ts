'use server';

import React from 'react';

import { render } from '@react-email/components';

import { sendEmail } from '@/actions/email-sender';
import TesterAppointmentRequestEmail, {
  type TesterAppointmentRequestEmailProps,
} from '@/emails/tester-appointment-request';

export interface TesterAppointmentRequestInput {
  address: string;
  appointmentDate: string;
  appointmentTime: string;
  customerEmail: string;
  customerName: string;
  phoneNumber: string;
  testerEmail: string;
  testerName: string;
  testType?: 'obd' | 'ovi';
}

const SUBJECT_PREFIX = '[Carb Cert] New appointment request';

export async function sendTesterAppointmentRequest(
  input: TesterAppointmentRequestInput
): Promise<{ error?: string; ok: boolean }> {
  try {
    const props: TesterAppointmentRequestEmailProps = {
      address: input.address,
      appointmentDate: input.appointmentDate,
      appointmentTime: input.appointmentTime,
      email: input.customerEmail,
      fullName: input.customerName,
      phoneNumber: input.phoneNumber,
      testerName: input.testerName,
      testType: input.testType,
    };

    const html = await render(
      React.createElement(TesterAppointmentRequestEmail, props)
    );

    const subject = `${SUBJECT_PREFIX} — ${input.customerName} on ${input.appointmentDate}`;

    const bcc = process.env.NEW_ORDER_NOTIFY_EMAIL?.trim() ?? undefined;

    await sendEmail({
      to: input.testerEmail,
      subject,
      html,
      bcc,
    });

    return { ok: true };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Failed to send appointment request';
    return { error: message, ok: false };
  }
}
