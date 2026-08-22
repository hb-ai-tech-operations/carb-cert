import { loadStripe, type Stripe as StripeClient } from '@stripe/stripe-js';

let stripePromise: Promise<StripeClient | null> | null = null;

export const getStripe = () => {
  stripePromise ??= loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
  );
  return stripePromise;
};
