'use client';

import {
  forwardRef, useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import Link from 'next/link';

import {
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { AlertCircle, Loader2 } from 'lucide-react';

import { BillingAddressFields } from './billing-address-fields';
import { OrderSummary } from './order-summary';
import { StripeCardFields } from './stripe-card-fields';

import type { FormSchema } from '@/features/compliance-form/schemas';
import type { Stripe, StripeCardNumberElement } from '@stripe/stripe-js';
import type { UseFormReturn } from 'react-hook-form';

import { InputCheckbox } from '@/components/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ROUTES } from '@/constants/app';
import {
  type PaymentResult,
  usePayment,
} from '@/features/compliance-form/hooks/use-payment';
import { getStripe } from '@/lib/stripe/client';

// ─── Types ──────────────────────────────────────────────────────────────────
export interface FormStepThreeHandle {
  confirmPayment: () => Promise<PaymentResult>;
}

interface FormStepThreeProps {
  form: UseFormReturn<FormSchema>;
  onPaymentFormReady?: (ready: boolean) => void;
}

interface PaymentFormInnerProps extends FormStepThreeProps {
  onConfirmPayment: (
    stripe: Stripe,
    cardElement: StripeCardNumberElement,
    billingDetails: {
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
  ) => Promise<PaymentResult>;
  paymentError: string | null;
  vehicleCount: number;
}

// ─── Inner form (must be inside <Elements>) ─────────────────────────────────
// Uses useStripe/useElements which require the Elements provider context.
// Receives confirmPayment from the parent to ensure a single PaymentIntent.
const PaymentFormInner = forwardRef<FormStepThreeHandle, PaymentFormInnerProps>(
  ({ form, vehicleCount, onConfirmPayment, paymentError, onPaymentFormReady }, ref) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState<string | null>(null);
    const [cardComplete, setCardComplete] = useState(false);

    useEffect(() => {
      onPaymentFormReady?.(true);
      return () => {
        onPaymentFormReady?.(false);
      };
    }, [onPaymentFormReady]);

    const handleCardComplete = useCallback((complete: boolean) => {
      setCardComplete(complete);
    }, []);

    const handleCardError = useCallback((error: string | null) => {
      setCardError(error);
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        confirmPayment: async () => {
          if (!stripe || !elements) {
            return { success: false, error: 'Stripe has not loaded yet' };
          }

          const cardNumberElement = elements.getElement(CardNumberElement);
          if (!cardNumberElement) {
            return { success: false, error: 'Card element not found' };
          }

          if (!cardComplete) {
            return {
              success: false,
              error: 'Please complete your card details',
            };
          }

          const values = form.getValues();
          const billing = values as unknown as {
            billingAddress: string;
            billingCity: string;
            billingCountry: string;
            billingState: string;
            billingZipCode: string;
          };

          //  2-character alphanumeric country code
          switch (billing.billingCountry) {
            case 'Canada':
              billing.billingCountry = 'CA';
              break;
            case 'Mexico':
              billing.billingCountry = 'MX';
              break;
            default:
              billing.billingCountry = 'US';
              break;
          }
          return onConfirmPayment(stripe, cardNumberElement, {
            name: '',
            address: {
              line1: billing.billingAddress ?? '',
              city: billing.billingCity ?? '',
              state: billing.billingState ?? '',
              postal_code: billing.billingZipCode ?? '',
              country: billing.billingCountry ?? '',
            },
          });
        },
      }),
      [stripe, elements, cardComplete, form, onConfirmPayment]
    );

    const displayError = cardError ?? paymentError;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-3">
          <div className="col-span-full sm:col-span-2">
            {/* Card Details */}
            <StripeCardFields
              onComplete={handleCardComplete}
              onError={handleCardError}
            />
          </div>
          {/* Order Summary */}
          <OrderSummary vehicleCount={vehicleCount} className="col-span-full sm:col-span-1" />
        </div>
        {/* Billing Address */}
        <BillingAddressFields form={form} />

        <div className="space-y-5 rounded-lg border border-border/80 bg-muted/20 p-4 sm:p-5">
          <InputCheckbox
            control={form.control}
            name="acceptTerms"
            label={(
              <>
                I accept the{' '}
                <Link
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2 hover:no-underline"
                >
                  Terms and Conditions
                </Link>
              </>
            )}
            required
            description="By checking this box, you agree to the terms and conditions. Required to pay and submit your filing."
          />

          <InputCheckbox
            control={form.control}
            name="consentToMarketingMessages"
            label={(
              <span className="block space-y-2 leading-snug">
                <span className="block font-medium text-foreground">
                  I agree to receive text messages (SMS) from Carb Cert about
                  my application, filing reminders, and related updates.
                </span>
                <span className="text-muted-foreground block text-sm font-normal">
                  <strong className="text-foreground">Optional.</strong> You do not
                  need to check this box to use our service or complete your
                  purchase. Message frequency varies. Message and data rates
                  may apply. Text HELP for help. Text STOP to cancel.{' '}
                  <Link
                    href={ROUTES.MESSAGE_CONSENT}
                    className="text-primary underline underline-offset-2 hover:no-underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    More about message consent
                  </Link>
                  .
                </span>
              </span>
            )}
          />
        </div>

        {/* Error display */}
        {displayError ? (
          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertDescription>{displayError}</AlertDescription>
          </Alert>
        ) : null}
      </div>
    );
  }
);

PaymentFormInner.displayName = 'PaymentFormInner';

// ─── Main export: wraps inner form in Stripe <Elements> ────────────────────
// Single usePayment call here — clientSecret feeds <Elements>, confirmPayment
// is passed down so the inner component uses the SAME PaymentIntent.
const FormStepThree = forwardRef<FormStepThreeHandle, FormStepThreeProps>(
  ({ form, onPaymentFormReady }, ref) => {
    const vehicleCount: number =
      (form.watch('vehicles') as unknown[])?.length ?? 0;

    const { clientSecret, isLoading, error, confirmPayment } =
      usePayment(vehicleCount);

    const stripePromise = useMemo(() => getStripe(), []);
    const innerRef = useRef<FormStepThreeHandle>(null);

    useEffect(() => {
      if (isLoading || !clientSecret) {
        onPaymentFormReady?.(false);
      }
    }, [isLoading, clientSecret, onPaymentFormReady]);

    useImperativeHandle(
      ref,
      () => ({
        confirmPayment: async () => {
          if (!innerRef.current) {
            return { success: false, error: 'Payment form not ready' };
          }
          return innerRef.current.confirmPayment();
        },
      }),
      []
    );

    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-16">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Preparing payment...
          </p>
        </div>
      );
    }

    if (error && !clientSecret) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      );
    }

    if (!clientSecret) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-16">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Initializing payment...
          </p>
        </div>
      );
    }

    return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentFormInner
          ref={innerRef}
          form={form}
          vehicleCount={vehicleCount}
          onConfirmPayment={confirmPayment}
          paymentError={error}
          onPaymentFormReady={onPaymentFormReady}
        />
      </Elements>
    );
  }
);

FormStepThree.displayName = 'FormStepThree';

export { FormStepThree };
