import type { Metadata } from 'next';

import { TesterOnboardingForm } from '@/features/tester-onboarding';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Become a Certified Tester — Join the Carb Cert Network',
  description:
    'Apply to join the Carb Cert tester network. Receive testing leads, get listed on our platform, and grow your CARB-certified emissions testing business in California.',
  canonicalPath: '/carb-truck-tester-partnership',
  index: true,
  keywords: [
    'CARB tester onboarding',
    'become a CARB tester',
    'emissions testing partnership',
    'Clean Truck Check tester',
    'CARB credentialed tester application',
    'truck emissions testing leads',
    'California truck tester',
  ],
});

const benefits = [
  {
    title: 'Receive Testing Leads',
    description:
      'Get matched with truck owners in your area who need emissions testing.',
  },
  {
    title: 'Get Listed on Our Platform',
    description:
      'Appear as a recommended tester in front of fleet owners searching for compliance help.',
  },
  {
    title: 'Free Business Visibility',
    description:
      'We promote your services at no cost — more customers, zero marketing spend.',
  },
];

export default function CarbTruckTesterPartnershipPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col px-4 pt-20 pb-16">
      {/* ── Hero / Intro ─────────────────────────────────────────────── */}
      <header className="mx-auto mb-12 max-w-3xl space-y-4 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Join the Carb Cert Tester Network
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-base text-balance md:text-lg">
          We&apos;re onboarding a limited number of certified testers to receive
          customer requests in their area. Complete the form below to get
          started.
        </p>
      </header>

      {/* ── Benefits ─────────────────────────────────────────────────── */}
      <section
        aria-label="Benefits of joining"
        className="mx-auto mb-12 grid w-full max-w-3xl gap-4 sm:grid-cols-3"
      >
        {benefits.map(benefit => (
          <div
            key={benefit.title}
            className="bg-card rounded-lg border p-5 text-center"
          >
            <h2 className="mb-1 text-sm font-semibold">{benefit.title}</h2>
            <p className="text-muted-foreground text-sm">
              {benefit.description}
            </p>
          </div>
        ))}
      </section>

      {/* ── Form ─────────────────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-3xl">
        <TesterOnboardingForm />
      </div>
    </div>
  );
}
