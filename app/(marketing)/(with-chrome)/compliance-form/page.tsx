import type { Metadata } from 'next';

import { FormCard } from '@/features/compliance-form';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'File Clean Truck Check & CTC-VIS Reporting',
  description:
    'Start California Clean Truck Check filing: submit vehicle details and payment for third-party CTC-VIS reporting assistance. Per-vehicle pricing includes the CARB compliance fee. Not affiliated with CARB.',
  canonicalPath: '/compliance-form',
  index: true,
  keywords: [
    'Clean Truck Check filing',
    'CTC-VIS reporting',
    'CARB compliance filing',
    'California carb certificate',
    'Clean Truck Check payment',
    'CARB compliance fee',
  ],
});

const ComplianceFormPage = async () => (
  <div className="mx-auto flex max-w-6xl flex-col px-0 pt-20">
    <header className="mx-auto mb-8 max-w-3xl space-y-3 px-4 text-center md:px-0">
      <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
        Start your Clean Truck Check filing
      </h1>
      <p className="text-muted-foreground text-base text-balance md:text-lg sr-only">
        Complete the steps below to submit your details and pay for third-party
        CTC-VIS reporting assistance. The CARB compliance fee is included in our
        per-vehicle price. Emissions testing must still be completed at a
        CARB-authorized facility—we are an independent service, not CARB.
      </p>
    </header>
    <FormCard />
  </div>
);

export default ComplianceFormPage;
