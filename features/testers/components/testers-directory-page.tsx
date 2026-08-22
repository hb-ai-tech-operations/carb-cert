import Link from 'next/link';

import type { TesterProfile } from '@/features/testers/data/testers';

import { TestersDirectoryClient } from '@/features/testers/components/testers-directory-client';

export const TestersDirectoryPage = ({
  testers,
}: {
  testers: TesterProfile[];
}) => (
  <div className="mt-20 flex min-h-full flex-1 flex-col bg-zinc-50 pb-16 text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900">
    <a
      href="#directory"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-lg focus:bg-emerald-700 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
    >
      Skip to directory
    </a>
    <section
      id="directory"
      aria-labelledby="testers-directory-heading"
      className="mx-auto w-full max-w-4xl px-4 pt-12 motion-safe:animate-in motion-safe:duration-300 motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 sm:px-6 lg:px-8"
    >
      <header className="mb-8">
        <h1
          id="testers-directory-heading"
          className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl"
        >
          Certified Testers Directory
        </h1>
        <p className="mt-2 max-w-2xl text-base text-zinc-600">
          Select a certified tester to view their credentials, available
          services, and book an appointment for your heavy-duty emissions
          compliance.
        </p>
      </header>

      {testers.length === 0 ? (
        <div className="rounded-4xl border border-dashed border-zinc-200 bg-white p-10 text-center shadow-sm">
          <p className="text-base font-medium text-zinc-900">
            No public listings yet
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            Approved testers who opt in to appear on our site will show up here.
            If you are a CARB-credentialed tester, you can apply to join the
            network — we&apos;ll review your application and follow up.
          </p>
          <Link
            href="/carb-truck-tester-partnership"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700"
          >
            Apply to the tester network
          </Link>
        </div>
      ) : (
        <TestersDirectoryClient testers={testers} />
      )}
    </section>
  </div>
);
