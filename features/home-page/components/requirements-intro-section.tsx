import { RequirementsSection } from './requirement-section';

const RequirementsIntroSection = () => (
  <section
    id="requirements"
    aria-labelledby="requirements-title"
    className="mx-auto max-w-6xl space-y-10 md:space-y-12"
  >
    <header className="mx-auto max-w-sm space-y-3 text-center md:max-w-3xl">
      <h2
        id="requirements-title"
        className="text-3xl font-semibold tracking-tight md:text-4xl"
      >
        Clean Truck Check Requirements
      </h2>
      <p className="text-muted-foreground text-lg md:text-xl">
        The California Air Resources Board (CARB) requires heavy-duty vehicles
        over 14,000 lbs GVWR to meet specific testing and compliance rules. Here’s what every truck owner and fleet manager must
        know. Official details:{' '}
        <a
          href="https://ww2.arb.ca.gov/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          ww2.arb.ca.gov
        </a>
        .
      </p>
    </header>

    <RequirementsSection />
  </section>
);

RequirementsIntroSection.displayName = 'RequirementsIntroSection';
export { RequirementsIntroSection };
