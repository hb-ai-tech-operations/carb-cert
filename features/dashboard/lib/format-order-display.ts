export function formatOrderCurrency(
  cents: number | null,
  currencyCode = 'USD'
): string {
  if (cents === null) {
    return '--';
  }
  const code =
    currencyCode.length >= 3 ? currencyCode.slice(0, 3).toUpperCase() : 'USD';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: code,
  }).format(cents / 100);
}

export function formatOrderDate(timestamp: number): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(timestamp));
}

export const ORDER_STATUS_BADGE_VARIANT: Record<
  string,
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  paid: 'default',
  pending: 'secondary',
  failed: 'destructive',
};

export function orderStatusBadgeVariant(
  status: string
): 'default' | 'secondary' | 'destructive' | 'outline' {
  return ORDER_STATUS_BADGE_VARIANT[status] ?? 'outline';
}
