'use client';

import { memo, useCallback, useState } from 'react';

import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from '@stripe/react-stripe-js';
import { Calendar, CreditCard, Lock } from 'lucide-react';

import type {
  StripeCardCvcElementChangeEvent,
  StripeCardExpiryElementChangeEvent,
  StripeCardNumberElementChangeEvent,
} from '@stripe/stripe-js';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

// ─── Types ──────────────────────────────────────────────────────────────────
interface CardFieldState {
  complete: boolean;
  error: string | null;
  focused: boolean;
}

interface StripeCardFieldsProps {
  onComplete: (complete: boolean) => void;
  onError: (error: string | null) => void;
}

// Match .input-carb-cert: h-12, text-lg (18px). Stripe runs in iframe so use hex.
const ELEMENT_BASE_STYLE = {
  base: {
    fontSize: '18px',
    fontFamily: 'inherit',
    color: '#1e293b',
    '::placeholder': { color: '#64748b' },
  },
  invalid: { color: '#ef4444', iconColor: '#ef4444' },
} as const;

const CARD_NUMBER_OPTIONS = {
  style: ELEMENT_BASE_STYLE,
  showIcon: true,
  placeholder: '1234 1234 1234 1234',
} as const;

const CARD_EXPIRY_OPTIONS = {
  style: ELEMENT_BASE_STYLE,
  placeholder: 'MM / YY',
} as const;

const CARD_CVC_OPTIONS = {
  style: ELEMENT_BASE_STYLE,
  placeholder: 'CVC',
} as const;

// ─── Component ──────────────────────────────────────────────────────────────
const StripeCardFields = memo(({ onComplete, onError }: StripeCardFieldsProps) => {
  const [cardNumber, setCardNumber] = useState<CardFieldState>({
    complete: false,
    error: null,
    focused: false,
  });
  const [cardExpiry, setCardExpiry] = useState<CardFieldState>({
    complete: false,
    error: null,
    focused: false,
  });
  const [cardCvc, setCardCvc] = useState<CardFieldState>({
    complete: false,
    error: null,
    focused: false,
  });

  const updateState = useCallback(
    (
      field: 'number' | 'expiry' | 'cvc',
      event: { complete: boolean; error?: { message: string; }; }
    ) => {
      const error = event.error?.message ?? null;
      const { complete } = event;

      const setterMap = {
        number: setCardNumber,
        expiry: setCardExpiry,
        cvc: setCardCvc,
      };
      const setter = setterMap[field];

      setter((previous) => ({ ...previous, complete, error }));

      onError(error);

      const states = {
        number: field === 'number' ? complete : cardNumber.complete,
        expiry: field === 'expiry' ? complete : cardExpiry.complete,
        cvc: field === 'cvc' ? complete : cardCvc.complete,
      };
      onComplete(states.number && states.expiry && states.cvc);
    },
    [cardNumber.complete, cardExpiry.complete, cardCvc.complete, onComplete, onError]
  );

  const handleNumberChange = useCallback(
    (event: StripeCardNumberElementChangeEvent) => updateState('number', event),
    [updateState]
  );
  const handleExpiryChange = useCallback(
    (event: StripeCardExpiryElementChangeEvent) => updateState('expiry', event),
    [updateState]
  );
  const handleCvcChange = useCallback(
    (event: StripeCardCvcElementChangeEvent) => updateState('cvc', event),
    [updateState]
  );

  // Wrapper must let Stripe's inner div/iframe fill space so the iframe is clickable.
  // relative z-10 keeps the Stripe iframe above overlays; [&>div] targets Stripe's root.
  const fieldClass = (state: CardFieldState) =>
    cn(
      'relative z-10 h-12 rounded-md border px-3 py-2.5 transition-colors flex items-center w-full',
      '[&>div]:flex-1 [&>div]:w-full [&>div]:min-w-0 [&>div]:min-h-full [&>div]:relative',
      state.focused && !state.error && 'border-ring ring-ring/50 ring-[3px]',
      state.error ? 'border-destructive' : 'border-gray-400',
      !state.focused && !state.error && 'hover:border-gray-500'
    );

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Card Details</h3>

      {/* Card Number */}
      <div className="space-y-1.5">
        <Label className="flex items-center gap-2 text-base">
          <CreditCard className="size-4 text-muted-foreground" />
          Card Number
        </Label>
        <div className={fieldClass(cardNumber)}>
          <CardNumberElement
            options={CARD_NUMBER_OPTIONS}
            onChange={handleNumberChange}
            onFocus={() => setCardNumber((p) => ({ ...p, focused: true }))}
            onBlur={() => setCardNumber((p) => ({ ...p, focused: false }))}
          />
        </div>
        {cardNumber.error ? <p className="text-xs text-red-500">{cardNumber.error}</p> : null}
      </div>

      {/* Expiry + CVC row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Expiry */}
        <div className="space-y-1.5">
          <Label className="flex items-center gap-2 text-base">
            <Calendar className="size-4 text-muted-foreground" />
            Expiry Date
          </Label>
          <div className={fieldClass(cardExpiry)}>
            <CardExpiryElement
              options={CARD_EXPIRY_OPTIONS}
              onChange={handleExpiryChange}
              onFocus={() => setCardExpiry((p) => ({ ...p, focused: true }))}
              onBlur={() => setCardExpiry((p) => ({ ...p, focused: false }))}
            />
          </div>
          {cardExpiry.error ? <p className="text-xs text-red-500">{cardExpiry.error}</p> : null}
        </div>

        {/* CVC */}
        <div className="space-y-1.5">
          <Label className="flex items-center gap-2 text-base">
            <Lock className="size-4 text-muted-foreground" />
            CVC
          </Label>
          <div className={fieldClass(cardCvc)}>
            <CardCvcElement
              options={CARD_CVC_OPTIONS}
              onChange={handleCvcChange}
              onFocus={() => setCardCvc((p) => ({ ...p, focused: true }))}
              onBlur={() => setCardCvc((p) => ({ ...p, focused: false }))}
            />
          </div>
          {cardCvc.error ? <p className="text-xs text-red-500">{cardCvc.error}</p> : null}
        </div>
      </div>
    </div>
  );
});

StripeCardFields.displayName = 'StripeCardFields';

export { StripeCardFields };
export type { StripeCardFieldsProps };
