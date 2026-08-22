import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PRICE_ADDITIONAL_FORMATTED, PRICE_BASE_FORMATTED } from '@/constants/app';
import { cn } from '@/lib/utils';

const STEPS = [
  {
    number: 1,
    title: 'Submit Vehicle Details',
    desc: 'Provide your VIN, license plate, and engine info. We create your CTC-VIS record securely.',
  },
  {
    number: 2,
    title: 'Secure Your Order',
    desc: `Pay the flat compliance service fee — ${PRICE_BASE_FORMATTED} per vehicle. We handle all required regulatory filings and submissions on your behalf. Additional vehicles are ${PRICE_ADDITIONAL_FORMATTED} each.`,
  },
  {
    number: 3,
    title: 'Pass Emissions Inspection',
    desc: 'Complete testing at a CARB-authorized facility (OBD or opacity test, depending on your engine). We do not perform testing—only reporting through CTC-VIS.',
  },
  {
    number: 4,
    title: 'Get Certified',
    desc: 'We submit your results through CTC-VIS and email your official compliance certificate instantly.',
  },
] as const;

const CompliantStepsSection = () => (
  <section
    id="carb-steps"
    aria-labelledby="carb-steps-title"
    className="bg-background/65 mx-2 max-w-6xl space-y-10 rounded-3xl px-4 pt-8 backdrop-blur-2xl md:mx-auto md:space-y-8 md:px-8"
  >
    <header className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
      <h2 id="carb-steps-title" className="text-3xl font-semibold md:text-4xl">
        4 Steps to Your Clean Truck Check Certificate
      </h2>
      <p className="text-lg md:text-xl">
        Our process is designed to be quick, transparent, and stress-free. In
        just four steps, your vehicle will be fully compliant with CARB’s Clean
        Truck Check requirements.
      </p>
    </header>

    <ol className="grid w-full grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5">
      {STEPS.map(step => (
        <li
          key={step.number}
          className={cn(
            // responsive widths (visual parity with your original)
            'md:col-span-1 lg:col-span-2',
            (step.number === 1 || step.number === 4) &&
            'md:col-span-2 lg:col-span-3'
          )}
        >
          <Card className="border-primary/40 relative h-full w-full items-baseline overflow-hidden rounded-3xl border bg-transparent p-2">
            <div className="from-primary/40 relative z-10 flex h-full w-full flex-col items-baseline justify-start rounded-2xl bg-linear-to-b to-transparent p-4">
              {/* Decorative step numeral */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-1 -bottom-2.5 text-[140px] leading-none font-normal text-white select-none"
              >
                {step.number}
              </span>

              <CardHeader className="w-full bg-transparent p-0">
                <CardTitle>
                  <h3 className="text-xl font-semibold text-slate-900 md:text-2xl">
                    {step.title}
                  </h3>
                </CardTitle>
                <CardDescription className="pr-10 text-base text-slate-800 md:text-lg">
                  {step.desc}
                </CardDescription>
              </CardHeader>
            </div>
          </Card>
        </li>
      ))}
    </ol>
  </section>
);

CompliantStepsSection.displayName = 'CompliantStepsSection';
export { CompliantStepsSection };
