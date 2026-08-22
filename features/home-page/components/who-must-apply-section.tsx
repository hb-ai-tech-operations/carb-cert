import Image from 'next/image';

const WhoMustApplySection = () => (
  <section
    id="who-must-apply"
    aria-labelledby="who-apply-title"
    className="relative mx-1 max-w-6xl overflow-hidden rounded-2xl px-4 py-10 text-white md:mx-auto md:px-10 md:py-12"
  >
    <Image
      src="/images/bg-cc-sparks.webp"
      className="absolute inset-0 rounded-2xl bg-cover bg-center bg-no-repeat"
      alt="Testing procedures"
      fill
      style={{ objectFit: 'cover' }}
      loading="lazy"
      title="Who Must Comply with CARB’s Clean Truck Check?"
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
    />
    {/* contrast overlay (decorative) */}
    <div aria-hidden="true" className="absolute inset-0 bg-black/40" />

    <div className="relative z-10 space-y-8 rounded-2xl md:space-y-10">
      <header className="space-y-3">
        <h2
          id="who-apply-title"
          className="text-center text-3xl font-semibold md:text-4xl"
        >
          Who Must Comply with CARB’s Clean Truck Check?
        </h2>
        <p className="mx-auto max-w-3xl text-center text-lg text-slate-200 md:text-xl">
          Most heavy-duty vehicles operating in California must register and
          comply with CARB’s Clean Truck Check program—even if they are
          registered outside the state.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Left column: eligible vehicle types */}
        <aside className="flex flex-col gap-3 md:col-span-1 md:border-r md:border-white/20 md:pr-10">
          <h3 className="text-xl font-semibold">Eligible Vehicle Types</h3>
          <p className="text-slate-200">
            Diesel, hybrid, and alternative-fuel vehicles over 14,000 lbs GVWR,
            including:
          </p>
          <ul className="list-inside list-disc space-y-1 text-slate-100">
            <li>Heavy-duty trucks</li>
            <li>Tractor-trailers</li>
            <li>Buses (school, transit, charter)</li>
            <li>Motorhomes (over 14,000 lbs)</li>
            <li>Service and utility trucks</li>
            <li>Yard trucks and concrete mixers</li>
            <li>Refuse and dump trucks</li>
          </ul>
        </aside>

        {/* Right column: jurisdiction rules */}
        <div className="flex flex-col gap-4 md:col-span-2 md:pl-10">
          <article className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">
              California-Registered Vehicles
            </h3>
            <p className="text-base text-slate-200">
              All heavy-duty vehicles with CA plates must test, pay annual fees,
              and submit results via CTC-VIS.
            </p>
          </article>

          <hr className="border-white/20" />

          <article className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Out-of-State Vehicles</h3>
            <p className="text-base text-slate-200">
              Any truck over 14,000 lbs GVWR entering California must register
              in CTC-VIS and comply before operating in the state.
            </p>
          </article>

          <hr className="border-white/20" />

          <article className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">
              Agricultural & Motorhome Vehicles
            </h3>
            <p className="text-base text-slate-200">
              Agricultural vehicles and motorhomes over 14,000 lbs GVWR are
              included but only require annual testing instead of semi-annual.
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
);

WhoMustApplySection.displayName = 'WhoMustApplySection';
export { WhoMustApplySection };
