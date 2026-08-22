'use server';

import React from 'react';

import { render } from '@react-email/components';

import { sendEmail } from '@/actions/email-sender';
import NewOrderEmail, {
  type NewOrderProps,
  type NewOrderVehicle,
} from '@/emails/new-order';

export interface NewOrderNotificationInput {
  applicant: {
    email: string;
    fullName: string;
    phone: string;
  };
  applicationId: string;
  billingAddress: {
    address: string;
    city: string;
    country: string;
    state: string;
    zipCode: string;
  };
  entity: {
    applicationType: string;
    doingBusinessAs?: string;
    entityName?: string;
    entityType: string;
  };
  payment: {
    amountCents: number;
    cardBrand?: string;
    cardLast4?: string;
    paymentIntentId: string;
  };
  physicalAddress: {
    address: string;
    city: string;
    country: string;
    state: string;
    zipCode: string;
  };
  vehicles: NewOrderVehicle[];
}

/**
 * Sends the new-order notification email to your team (NEW_ORDER_NOTIFY_EMAIL).
 * No-op if NEW_ORDER_NOTIFY_EMAIL is not set.
 */
export async function sendNewOrderNotification(
  input: NewOrderNotificationInput
): Promise<{ error?: string; ok: boolean }> {
  const to = process.env.NEW_ORDER_NOTIFY_EMAIL;
  if (!to?.trim()) {
    return { ok: true };
  }

  try {
    const props: NewOrderProps = {
      applicationId: input.applicationId,
      applicant: input.applicant,
      entity: input.entity,
      physicalAddress: input.physicalAddress,
      billingAddress: input.billingAddress,
      payment: input.payment,
      vehicles: input.vehicles,
    };

    const html = await render(React.createElement(NewOrderEmail, props));
    await sendEmail({
      to,
      subject: `[Carb Cert] New order — ${input.applicant.fullName} (${input.vehicles.length} vehicle${input.vehicles.length === 1 ? '' : 's'})`,
      html,
    });

    return { ok: true };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Failed to send new order notification';
    return { ok: false, error: message };
  }
}
