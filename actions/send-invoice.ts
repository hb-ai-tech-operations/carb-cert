'use server';

import React from 'react';

import { sendWithResend } from '@/actions/email-sender';
import { PRICE_ADDITIONAL, PRICE_BASE } from '@/constants/app';
import InvoiceEmail, { type InvoiceLineItem } from '@/emails/invoice';

/** Billing address as collected on the form (flat fields). */
export interface InvoiceBillingInput {
  address: string;
  city: string;
  country: string;
  state: string;
  zip: string;
}

export interface SendInvoiceInput {
  billingAddress: InvoiceBillingInput;
  customerName?: string;
  invoiceNumber?: string;
  paymentIntentId?: string;
  to: string;
  vehicleCount: number;
}

/**
 * Builds order summary line items from vehicle count.
 * First vehicle: PRICE_BASE, each additional: PRICE_ADDITIONAL (prices in dollars, converted to cents for storage).
 */
function buildOrderSummary(vehicleCount: number): InvoiceLineItem[] {
  const lines: InvoiceLineItem[] = [];
  if (vehicleCount <= 0) {
    return lines;
  }

  const baseCents = PRICE_BASE * 100;
  const additionalCents = PRICE_ADDITIONAL * 100;

  lines.push({
    item: 'First vehicle — emissions certification',
    quantity: 1,
    unitPrice: baseCents,
  });

  if (vehicleCount > 1) {
    lines.push({
      item: 'Additional vehicle(s) — emissions certification',
      quantity: vehicleCount - 1,
      unitPrice: additionalCents,
    });
  }

  return lines;
}

function formatInvoiceDate(): string {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Sends the invoice email after payment success.
 * Uses Resend; ensure RESEND_API_KEY is set.
 */
export async function sendInvoiceEmail(
  input: SendInvoiceInput
): Promise<{ error?: string; ok: boolean }> {
  try {
    const {
      to,
      customerName,
      billingAddress,
      vehicleCount,
      paymentIntentId,
      invoiceNumber: providedInvoiceNumber,
    } = input;

    const orderSummary = buildOrderSummary(vehicleCount);
    if (orderSummary.length === 0) {
      return { ok: false, error: 'No order lines for vehicle count' };
    }

    const invoiceNumber =
      providedInvoiceNumber ?? paymentIntentId ?? `INV-${Date.now()}`;
    const invoiceDate = formatInvoiceDate();

    await sendWithResend({
      to,
      subject: `Your Carb Cert Invoice #${invoiceNumber}`,
      html: React.createElement(InvoiceEmail, {
        invoiceNumber,
        invoiceDate,
        billingAddress: {
          address: billingAddress.address,
          city: billingAddress.city,
          country: billingAddress.country,
          state: billingAddress.state,
          zip: billingAddress.zip,
        },
        orderSummary,
        customerName,
        paymentIntentId,
      }),
    });

    return { ok: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to send invoice email';
    return { ok: false, error: message };
  }
}
