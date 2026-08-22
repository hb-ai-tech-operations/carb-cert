import Link from 'next/link';

import { CheckCircle } from 'lucide-react';

import { CompliantStepsSection } from './compliant-steps-section';

import { GradientBackground } from '@/components/providers/gradient-bg';
import { Button } from '@/components/ui/button';
import { Highlighter } from '@/components/ui/highlighter';

const HeroSection = () => (
  <GradientBackground>
    <section
      className="text-foreground relative mx-auto flex max-w-6xl flex-col items-center justify-center overflow-hidden rounded-lg py-8 pt-32 md:py-14 md:pt-36"
      aria-labelledby="hero-heading"
    >
      <div className="relative z-10 mx-auto w-full space-y-3 px-2 text-center md:space-y-4 md:px-0">
        <h1
          id="hero-heading"
          className="animate-fade-in text-4xl leading-tight font-semibold sm:text-5xl md:text-6xl"
        >
          California Clean Truck Check Compliance{" "}
          <Highlighter action="highlight" color="#72e3ad">
            <span className="block bg-linear-to-r from-neutral-900 via-slate-600 to-neutral-500 bg-size-[200%_auto] bg-clip-text text-transparent transition-all duration-300">
              Fast, Simple, Secure
            </span>
          </Highlighter>
        </h1>

        <p className="animate-fade-in mx-auto max-w-3xl text-lg font-medium text-slate-700 md:text-xl dark:text-slate-300">
          Third-party CTC-VIS reporting assistance for California’s Clean Truck
          Check program. We help heavy-duty vehicle owners and fleets meet
          California CARB compliance—registration, test coordination, and
          certificate filing—so you avoid fines, DMV holds, and downtime.
        </p>

        <p className="animate-fade-in mx-auto max-w-3xl text-base text-slate-600 md:text-lg dark:text-slate-400">
          Stay road-ready with zero stress. Emissions testing is performed at
          CARB-authorized facilities; we handle the paperwork and submissions
          through the official Clean Truck Check Vehicle Inspection System
          (CTC-VIS).
        </p>

        <div className="mx-auto w-full max-w-xl space-y-3">
          <Link href="/compliance-form" prefetch>
            <Button
              variant="default"
              size="lg"
              className="w-full rounded-lg bg-slate-800 p-8 text-lg font-semibold text-white hover:bg-slate-900"
            >
              Get My Compliance Certificate Now
            </Button>
          </Link>

          <div className="h-1" />

          <div className="relative mx-auto flex w-full max-w-xl justify-center gap-6 text-sm text-slate-700">
            <span className="flex items-center gap-2 text-base font-medium md:text-lg">
              <CheckCircle className="size-4" />
              Same-day filings
            </span>
            <span className="flex items-center gap-2 text-base font-medium md:text-lg">
              <CheckCircle className="size-4" />
              Encrypted data
            </span>
          </div>
        </div>
      </div>
    </section>

    <CompliantStepsSection />
  </GradientBackground>
);

HeroSection.displayName = 'HeroSection';
export { HeroSection };
