import Link from 'next/link';

import { CircleCheckBig } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PRICE_ADDITIONAL_FORMATTED, PRICE_BASE_FORMATTED } from '@/constants/app';

const FEATURES = [
  'Third-party reporting assistance through the official Clean Truck Check Vehicle Inspection System (CTC-VIS).',
  'Fast, secure submission of compliance data; we do not perform emissions testing—testing is done at CARB-authorized facilities.',
  'Confirmation of compliance status delivered to your email after your vehicle passes testing and we file results.',
] as const;

const ServicesSection = () => (
  <section
    id="services"
    aria-labelledby="services-title"
    className="bg-primary/10 relative"
  >
    {/* decorative grid background */}
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 opacity-20"
      style={{
        backgroundImage: `
          linear-gradient(to right, #d1d5db 1px, transparent 1px),
          linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px',
        WebkitMaskImage:
          'radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)',
        maskImage:
          'radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)',
      }}
    />

    <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 md:px-1 md:py-14">
      <div className="grid items-center gap-12 md:grid-cols-2 lg:grid-cols-5">
        {/* Copy + Feature list */}
        <div className="lg:col-span-3">
          <header className="space-y-3 md:pr-6 lg:pr-0">
            <h2
              id="services-title"
              className="text-3xl font-semibold md:text-4xl"
            >
              Our Clean Truck Check Reporting Services
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl">
              We provide third-party CTC-VIS reporting assistance—registration
              in the system, coordination with your testing schedule, and
              certificate filing—so your vehicles stay compliant and
              penalty-free. Emissions testing is completed at CARB-authorized
              facilities.
            </p>
          </header>

          <ul className="mt-6 divide-y border-y">
            {FEATURES.map((text, index) => (
              <li key={index} className="flex items-center gap-2 py-3">
                <CircleCheckBig
                  className="text-primary size-5 shrink-0"
                  strokeWidth={2.5}
                />
                <span className="text-base md:text-lg">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price card */}
        <aside className="relative lg:col-span-2" aria-labelledby="services-price-title">
          <div className="border-primary/45 relative rotate-2 rounded-3xl border p-3 transition-transform duration-300 ease-in-out hover:scale-105 hover:rotate-0">
            <div className="from-primary/60 relative flex aspect-76/59 flex-col items-center justify-center rounded-2xl bg-linear-to-b to-transparent">
              <h3 id="services-price-title" className="sr-only">
                Price per vehicle
              </h3>
              <p className="flex items-center gap-0 text-4xl font-semibold lg:text-5xl">
                <span className="sr-only">Price per vehicle </span>
                {PRICE_BASE_FORMATTED}
              </p>
              <p className="text-muted-foreground text-center text-base font-semibold md:text-lg" aria-label="Per vehicle (CARB fee included)">
                Per vehicle (CARB fee included)
              </p>
              <p className="text-muted-foreground text-center text-base font-medium md:text-lg" aria-label="Additional vehicles">
                {PRICE_ADDITIONAL_FORMATTED} per additional vehicle
              </p>
              <Button asChild className="mt-3 min-h-[48px] px-6 text-base font-semibold md:text-lg">
                <Link href="/compliance-form" prefetch>
                  Get Certificate Now
                </Link>
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>
);

ServicesSection.displayName = 'ServicesSection';
export { ServicesSection };
