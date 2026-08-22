import type { Metadata } from 'next';

import { FormCard } from '@/features/compliance-form';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'CARB Clean Truck Check Program & CTC-VIS Rules',
  description:
    'California’s Clean Truck Check (CARB): rules for heavy-duty trucks over 14,000 lbs GVWR, periodic emissions testing, compliance fees, and CTC-VIS. Testing is only at CARB-authorized facilities—we offer third-party reporting help and are not affiliated with CARB.',
  canonicalPath: '/clean-truck-check',
  index: true,
  keywords: [
    'Clean Truck Check',
    'CARB Clean Truck Check',
    'california carb clean truck check',
    'CTC-VIS',
    'California heavy-duty truck compliance',
    'CARB truck regulations',
    'Clean Truck Check requirements',
  ],
});

const CleanTruckCheckPage = async () => (
  <div className="mx-auto flex max-w-6xl flex-col px-0 pt-20">
    <header className="mx-auto mb-8 max-w-3xl space-y-3 px-4 text-center md:px-0">
      <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
        California Clean Truck Check program (CARB)
      </h1>
      <p className="text-muted-foreground text-base text-balance md:text-lg sr-only">
        Learn how Clean Truck Check applies to heavy-duty vehicles, what CTC-VIS
        registration means for your fleet, and how emissions testing works at
        CARB-authorized labs. When you are ready, use the form below for
        third-party reporting assistance—we are not CARB and do not perform
        tests.
      </p>
    </header>
    <FormCard />
  </div>
);

export default CleanTruckCheckPage;
