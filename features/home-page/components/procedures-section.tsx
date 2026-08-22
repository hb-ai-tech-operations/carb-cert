import Image from 'next/image';

import { InfoIcon } from 'lucide-react';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { Highlighter } from '@/components/ui/highlighter';

const ProceduresSection = () => (
  <section
    id="testing-requirements"
    aria-labelledby="procedures-title"
    className="mx-auto max-w-6xl space-y-10 px-2 md:space-y-12 md:px-0"
  >
    <header className="mx-auto max-w-sm space-y-3 text-center md:max-w-3xl">
      <h2
        id="procedures-title"
        className="text-3xl font-semibold tracking-tight md:text-4xl"
      >
        Testing Requirements with Credentialed Testers
      </h2>
      <p className="text-muted-foreground text-lg md:text-xl">
        The{' '}
        <Highlighter action="highlight" color="#FF9800" padding={2}>
          California Air Resources Board (CARB)
        </Highlighter>{' '}
        requires emissions testing for certain vehicles to meet air quality
        standards. These requirements ensure vehicles comply with regulations
        aimed at reducing harmful emissions.
      </p>
    </header>

    <div className="grid gap-4 md:grid-cols-3">
      {/* Vehicle Eligibility */}
      <article className="relative z-10 space-y-3 rounded-3xl p-6 text-white md:p-8">
        <div className="absolute inset-0 z-0 rounded-3xl bg-black/40" />
        <Image
          src="/images/bg-cc-sparks.webp"
          alt="Testing procedures"
          className="absolute inset-0 z-0 rounded-3xl bg-cover bg-center bg-no-repeat"
          fill
          style={{ objectFit: 'cover' }}
          loading="lazy"
          title="Vehicle Eligibility"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
        />
        <h3 className="relative z-10 text-xl font-semibold md:text-2xl">
          Vehicle Eligibility
        </h3>
        <h4 className="relative z-10 text-lg font-semibold md:text-xl">
          Who Needs Testing?
        </h4>
        <p className="relative z-10 text-base text-white md:text-lg">
          Diesel and alternative-fuel vehicles with a Gross Vehicle Weight
          Rating (GVWR) over 14,000 pounds must undergo emissions testing as
          part of CARB&apos;s Clean Truck Check program.
        </p>
      </article>

      {/* Testing Frequency */}
      <article className="relative space-y-3 rounded-3xl p-6 text-white md:col-span-2 md:p-8">
        <Image
          src="/images/bg-cc-sparks.webp"
          alt="Testing procedures"
          className="absolute inset-0 z-0 rounded-3xl bg-cover bg-center bg-no-repeat"
          fill
          style={{ objectFit: 'cover' }}
          loading="lazy"
          title="Testing Frequency"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
        />
        <h3 className="relative z-10 text-xl font-semibold md:text-2xl">
          Testing Frequency
        </h3>
        <div>
          <h4 className="relative z-10 text-lg font-semibold md:text-xl">
            Semi-Annual Testing
          </h4>
          <p className="relative z-10 text-base text-white md:text-lg">
            Most heavy-duty vehicles must complete emissions testing twice per
            year.
          </p>
        </div>
        <div>
          <h4 className="relative z-10 text-lg font-semibold md:text-xl">
            Annual Testing
          </h4>
          <p className="relative z-10 text-base text-white md:text-lg">
            Some vehicles, such as specific agricultural vehicles and
            California-registered motorhomes, may qualify for annual testing.
          </p>
        </div>
        <div>
          <h4 className="relative z-10 text-lg font-semibold md:text-xl">
            Quarterly Testing
          </h4>
          <p className="relative z-10 text-base text-white md:text-lg">
            Beginning October 2027, vehicles equipped with On-Board Diagnostics
            (OBD) systems will transition to quarterly emissions testing.
          </p>
        </div>
      </article>

      {/* Testing Procedures */}
      <article className="relative space-y-4 rounded-3xl p-6 text-white md:col-span-3 md:p-8">
        <Image
          src="/images/bg-cc-sparks.webp"
          alt="Testing procedures"
          className="absolute inset-0 rounded-3xl bg-cover bg-center bg-no-repeat"
          fill
          style={{ objectFit: 'cover' }}
          loading="lazy"
          title="Testing Procedures"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
        />
        <h3 className="relative z-10 text-xl font-semibold md:text-2xl">
          Testing Procedures
        </h3>

        <div>
          <h4 className="relative z-10 text-lg font-semibold md:text-xl">
            On-Board Diagnostics (OBD) Testing
          </h4>
          <p className="relative z-10 text-base text-white md:text-lg">
            For vehicles with OBD systems, emissions data is collected directly
            from the onboard computer to verify that emissions controls are
            functioning correctly.
          </p>
        </div>

        <div>
          <h4 className="relative z-10 text-lg font-semibold md:text-xl">
            Opacity Testing
          </h4>
          <p className="relative z-10 text-base text-white md:text-lg">
            For older vehicles without OBD systems, a smoke opacity test
            measures exhaust smoke density to evaluate particulate emissions.
          </p>
        </div>

        <Alert className="relative z-10 border-none bg-blue-500/30 text-white dark:bg-blue-600/50">
          <InfoIcon className="h-4 w-4 text-blue-400" aria-hidden="true" />
          <AlertTitle className="text-base md:text-lg">
            <strong>Note:</strong> Emissions testing must be completed at
            CARB-authorized facilities. We are not CARB and do not perform
            testing; we provide third-party reporting assistance through
            CTC-VIS. For official program and testing locations, visit{' '}
            <a
              href="https://ww2.arb.ca.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-white"
            >
              ww2.arb.ca.gov
            </a>
            .
          </AlertTitle>
        </Alert>
      </article>
    </div>
  </section>
);

ProceduresSection.displayName = 'ProceduresSection';
export { ProceduresSection };
