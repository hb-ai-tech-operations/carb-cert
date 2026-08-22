'use server';

import { PRICE_ADDITIONAL, PRICE_BASE } from '@/constants/app';
import { stripe } from '@/lib/stripe';

interface CreatePaymentIntentResult {
  amount: number;
  clientSecret: string;
}

interface CreatePaymentIntentError {
  error: string;
}

/**
 * Calculates the total amount in cents based on vehicle count.
 * First vehicle: $80 (8000 cents), each additional: $70 (7000 cents).
 */
function calculateAmount(vehicleCount: number): number {
  if (vehicleCount <= 0) {
    return 0;
  }
  if (vehicleCount === 1) {
    return PRICE_BASE * 100;
  }
  return PRICE_BASE * 100 + (vehicleCount - 1) * PRICE_ADDITIONAL * 100;
}

export async function createPaymentIntent(
  vehicleCount: number
): Promise<CreatePaymentIntentResult | CreatePaymentIntentError> {
  try {
    if (vehicleCount <= 0) {
      return { error: 'At least one vehicle is required' };
    }

    const amount = calculateAmount(vehicleCount);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    if (!paymentIntent.client_secret) {
      return { error: 'Failed to create payment intent' };
    }

    return {
      clientSecret: paymentIntent.client_secret,
      amount,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return { error: message };
  }
}
