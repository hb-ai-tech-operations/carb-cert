const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

/** Formats a USD amount. Pass `cents: true` when `amount` is Stripe-style integer cents. */
export function formatCurrency(amount: number, cents = false): string {
  if (!Number.isFinite(amount)) {
    throw new TypeError(`Invalid currency amount: ${amount}`);
  }

  const value = cents ? amount / 100 : amount;

  return usdFormatter.format(Number(value.toFixed(2)));
}
