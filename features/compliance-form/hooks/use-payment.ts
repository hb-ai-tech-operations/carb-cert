import { useCallback, useEffect, useRef, useState } from 'react';

import { createPaymentIntent } from '../actions/create-payment-intent';

import type {
  Stripe,
  StripeCardElement,
  StripeCardNumberElement,
} from '@stripe/stripe-js';

interface BillingDetails {
  address: {
    city: string;
    country: string;
    line1: string;
    line2?: string;
    postal_code: string;
    state: string;
  };
  name: string;
}

/** Stripe error with nested payment_intent / payment_method (e.g. card_declined) */
interface StripeErrorWithDetails {
  payment_intent?: { amount: number; id: string };
  payment_method?: { card?: { brand?: string; last4?: string } };
}

export interface PaymentResult {
  amount?: number;
  cardBrand?: string;
  cardLast4?: string;
  declineCode?: string;
  error?: string;
  errorCode?: string;
  paymentIntentId?: string;
  success: boolean;
}

function buildFailureResult(
  result: {
    error: { code?: string; decline_code?: string; message?: string };
    paymentIntent?: { amount?: number; id?: string };
  },
  errorPayload: StripeErrorWithDetails | undefined,
  fallbackAmount: number
): PaymentResult {
  const intent = result.paymentIntent;
  const intentFromError = errorPayload?.payment_intent;
  const methodFromError = errorPayload?.payment_method;
  return {
    success: false,
    paymentIntentId: intent?.id ?? intentFromError?.id,
    amount: intent?.amount ?? intentFromError?.amount ?? fallbackAmount,
    error: result.error.message ?? 'Payment failed',
    errorCode: result.error.code,
    declineCode: result.error.decline_code,
    cardBrand: methodFromError?.card?.brand,
    cardLast4: methodFromError?.card?.last4,
  };
}

interface UsePaymentReturn {
  amount: number;
  clientSecret: string | null;
  confirmPayment: (
    stripe: Stripe,
    cardElement: StripeCardElement | StripeCardNumberElement,
    billingDetails: BillingDetails
  ) => Promise<PaymentResult>;
  error: string | null;
  isLoading: boolean;
}

export function usePayment(vehicleCount: number): UsePaymentReturn {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lastFetchedCount = useRef<number>(0);

  useEffect(() => {
    if (vehicleCount <= 0 || vehicleCount === lastFetchedCount.current) {
      return;
    }

    let cancelled = false;

    const fetchIntent = async () => {
      setIsLoading(true);
      setError(null);

      const result = await createPaymentIntent(vehicleCount);

      if (cancelled) {
        return;
      }

      if ('error' in result) {
        setError(result.error);
        setIsLoading(false);
        return;
      }

      lastFetchedCount.current = vehicleCount;
      setClientSecret(result.clientSecret);
      setAmount(result.amount);
      setIsLoading(false);
    };

    void fetchIntent();

    return () => {
      cancelled = true;
    };
  }, [vehicleCount]);

  const confirmPayment = useCallback(
    async (
      stripe: Stripe,
      cardElement: StripeCardElement | StripeCardNumberElement,
      billingDetails: BillingDetails
    ): Promise<PaymentResult> => {
      if (!clientSecret) {
        return { success: false, error: 'Payment not initialized' };
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: billingDetails,
        },
      });

      const intent = result.paymentIntent;
      const errorPayload = result.error as
        | ((typeof result.error) & StripeErrorWithDetails)
        | undefined;

      if (result.error) {
        return buildFailureResult(result, errorPayload, amount);
      }

      if (intent?.status === 'succeeded') {
        return {
          success: true,
          paymentIntentId: intent.id,
          amount: intent.amount,
        };
      }

      return { success: false, error: 'Payment was not completed' };
    },
    [clientSecret, amount]
  );

  return {
    clientSecret,
    amount,
    isLoading,
    error,
    confirmPayment,
  };
}
