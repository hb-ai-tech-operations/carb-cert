'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

import { Counter } from '@/components/animate-ui/components/counter';
import { SlidingNumber } from '@/components/animate-ui/text/sliding-number';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Highlighter } from '@/components/ui/highlighter';
import {
  PRICE_ADDITIONAL,
  PRICE_ADDITIONAL_FORMATTED,
  PRICE_BASE,
  PRICE_BASE_FORMATTED,
} from '@/constants/app';

const PricingSection = () => {
  const [vehicleCount, setVehicleCount] = useState(1);

  const totalPrice = useMemo(
    () =>
      vehicleCount > 1
        ? PRICE_BASE + PRICE_ADDITIONAL * (vehicleCount - 1)
        : PRICE_BASE,
    [vehicleCount]
  );

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="border-primary/65 mx-auto w-full max-w-6xl rounded-4xl border border-dashed p-2 text-slate-800 md:p-2"
    >
      <div className="border-primary/35 shadow-primary/75 grid gap-6 rounded-3xl border p-6 shadow-sm md:grid-cols-5">
        {/* Left: calculator + CTA */}
        <div className="space-y-3 md:col-span-3 md:space-y-4">
          {/* Intro */}
          <header className="space-y-3 text-start">
            <h2
              id="pricing-title"
              className="text-3xl font-semibold tracking-tight md:text-4xl"
            >
              Simple, Transparent Pricing
            </h2>
            <p className="mx-auto max-w-prose text-lg md:text-xl">
              {PRICE_BASE_FORMATTED} per vehicle covers our complete CTC-VIS
              compliance management service — registration, reporting, and
              certificate delivery. Additional vehicles in the same order are{' '}
              {PRICE_ADDITIONAL_FORMATTED} each. Emissions testing is done at
              CARB-authorized facilities (separate from this fee).
            </p>
          </header>
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold md:text-3xl">
              Price Calculator
            </h3>
            <p id="vehicle-help" className="text-lg text-slate-900/90">
              Choose how many vehicles need compliance reporting. Pricing:
            </p>
            <ul className="list-inside list-disc text-lg text-slate-900/90">
              <li>
                <span className="font-medium">{PRICE_BASE_FORMATTED}</span> per
                vehicle
              </li>
              <li>
                <span className="font-medium">{PRICE_ADDITIONAL_FORMATTED}</span> per
                additional vehicle
              </li>
            </ul>
          </div>

          {/* Counter control */}
          <div
            role="group"
            aria-labelledby="vehicle-label"
            aria-describedby="vehicle-help"
          >
            <span id="vehicle-label" className="sr-only">
              Number of vehicles
            </span>
            <Counter
              className="bg-primary w-fit gap-4 p-3 text-slate-900"
              number={vehicleCount}
              setNumber={(value: number) => setVehicleCount(Math.max(1, value))}
              buttonProps={{
                variant: 'outline',
                size: 'lg',
                className:
                  'bg-slate-900/20 text-slate-900 hover:bg-slate-900/30 border-slate-900 border-dashed text-2xl min-w-[44px] min-h-[44px]',
              }}
              slidingNumberProps={{
                className: 'text-4xl font-bold px-4',
                'aria-live': 'polite',
                'aria-atomic': 'true',
              }}
            />
          </div>
        </div>

        {/* Right: total price summary */}
        <aside
          className="flex h-full w-full flex-col items-center justify-center md:col-span-2"
          aria-labelledby="total-title"
        >
          <div className="border-primary/45 relative h-fit w-full rotate-1 rounded-3xl border p-3">
            <div className="from-primary/60 relative flex aspect-76/59 flex-col items-center justify-center space-y-2 rounded-2xl bg-linear-to-b to-transparent p-px">
              <h3
                id="total-title"
                className="text-2xl font-semibold md:text-3xl"
              >
                Total Price
              </h3>
              <p
                className="flex items-baseline justify-center gap-1 text-4xl font-semibold lg:text-5xl"
                aria-live="polite"
                aria-atomic="true"
              >
                <span className="sr-only">Total Price: </span>
                {/* 
                $ symbol is hidden from screen readers
                we did like this slider not support $ symbol
                */}
                <span aria-hidden>$</span>
                <SlidingNumber number={totalPrice} className="text-4xl font-semibold lg:text-5xl" decimalPlaces={2}
                />
              </p>
              <p className="text-center text-lg text-slate-900/90 md:text-xl">
                for {vehicleCount} {vehicleCount === 1 ? 'vehicle' : 'vehicles'}
              </p>

              {vehicleCount > 1 ? (
                <div className="text-center text-base text-slate-900/90 md:text-lg">
                  <Highlighter action="underline" color="#FF9800" padding={2}>
                    Includes {vehicleCount - 1} additional{' '}
                    {vehicleCount - 1 === 1 ? 'vehicle' : 'vehicles'} at{' '}
                    {PRICE_ADDITIONAL_FORMATTED} each
                  </Highlighter>
                </div>
              ) : null}

              <Link
                href="/compliance-form"
                prefetch
                aria-label="Get your Clean Truck Check compliance certificate"
                className="mt-4"
              >
                <Button
                  size="lg"
                  type="button"
                  className="bg-primary hover:bg-primary/90 min-h-[44px] w-full text-lg font-semibold text-slate-800 md:text-xl"
                >
                  Get Certificate Now
                </Button>
              </Link>
            </div>
          </div>
        </aside>

        {/* Compliance note */}
        <Alert className="border-none bg-amber-500/10 text-sm text-amber-900 md:col-span-full">
          <AlertTitle>
            <h3 className="text-xl font-semibold text-amber-900 md:text-2xl">
              Penalties for Non‑Compliance
            </h3>
          </AlertTitle>
          <AlertDescription className="text-base text-amber-900 md:text-lg">
            Failing to meet testing requirements can result in fines,
            registration holds, and other enforcement actions. Ensure compliance
            to avoid disruptions to vehicle operations.
          </AlertDescription>
        </Alert>
      </div>
    </section>
  );
};

PricingSection.displayName = 'PricingSection';

export { PricingSection };
