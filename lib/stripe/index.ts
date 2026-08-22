import Stripe from 'stripe';

// ─── Server-side Stripe instance ────────────────────────────────────────
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  typescript: true,
});
