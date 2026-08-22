import { memo } from 'react';

import { ShieldCheck } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PRICE_ADDITIONAL, PRICE_ADDITIONAL_FORMATTED, PRICE_BASE, PRICE_BASE_FORMATTED } from '@/constants/app';
import { formatCurrency } from '@/lib';
import { cn } from '@/lib/utils';

interface OrderSummaryProps {
  className?: string;
  vehicleCount: number;
}

const OrderSummary = memo(({ vehicleCount, className }: OrderSummaryProps) => {
  const total =
    vehicleCount <= 1
      ? PRICE_BASE
      : PRICE_BASE + (vehicleCount - 1) * PRICE_ADDITIONAL;

  return (
    <Card className={cn("border-dashed border-blue-400 bg-blue-400/10 shadow-none", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg text-blue-600">
          <ShieldCheck className="size-5" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {vehicleCount === 1 ? (
          <div className="flex justify-between">
            <span>1 Vehicle</span>
            <span className="font-medium">{PRICE_BASE_FORMATTED}</span>
          </div>
        ) : (
          <>
            <div className="flex justify-between">
              <span>First vehicle</span>
              <span className="font-medium">{PRICE_BASE_FORMATTED}</span>
            </div>
            <div className="flex justify-between">
              <span>
                {vehicleCount - 1} additional vehicle
                {vehicleCount - 1 > 1 ? 's' : ''} &times; {PRICE_ADDITIONAL_FORMATTED}
              </span>
              <span className="font-medium">
                {formatCurrency((vehicleCount - 1) * PRICE_ADDITIONAL)}
              </span>
            </div>
          </>
        )}
        <div className="flex justify-between border-t pt-2 text-lg font-semibold">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </CardContent>
    </Card>
  );
});

OrderSummary.displayName = 'OrderSummary';
export { OrderSummary };