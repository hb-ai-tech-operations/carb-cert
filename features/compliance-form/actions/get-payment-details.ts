'use server';

import { stripe } from '@/lib/stripe';

interface PaymentDetails {
  cardBrand?: string;
  cardLast4?: string;
}

export async function getPaymentDetails(
  paymentIntentId: string,
): Promise<PaymentDetails> {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId,
      { expand: ['payment_method'] },
    );

    const pm =
      typeof paymentIntent.payment_method === 'object'
        ? paymentIntent.payment_method
        : null;

    return {
      cardBrand: pm?.card?.brand ?? undefined,
      cardLast4: pm?.card?.last4 ?? undefined,
    };
  } catch {
    return {};
  }
}
