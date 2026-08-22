import Link from 'next/link';

import type { TesterProfile } from '@/features/testers/data/testers';

import { TesterCardActions } from '@/features/testers/components/tester-card-actions';
import { TesterCardHeader } from '@/features/testers/components/tester-card-header';
import {
  DEFAULT_VISIT_CHECKLIST,
  TesterCardSections,
} from '@/features/testers/components/tester-card-sections';
import { buildTesterJsonLd } from '@/features/testers/lib/tester-seo';

interface TesterDigitalCardProps {
  tester: TesterProfile;
}

export const TesterDigitalCard = ({ tester }: TesterDigitalCardProps) => {
  const jsonLd = buildTesterJsonLd(tester);
  const checklist = tester.visitChecklist ?? [...DEFAULT_VISIT_CHECKLIST];
  const hoursBlurb =
    tester.hoursAreaBlurb ??
    `${tester.location.city} area — ask about fleet routes and window appointments.`;

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- JSON-LD requires raw script content
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex min-h-full flex-1 flex-col bg-zinc-50 pb-16 text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900">
        <section
          aria-labelledby="tester-profile-heading"
          className="mx-auto w-full max-w-3xl px-4 pt-12 sm:px-6 lg:px-8"
        >
          <TesterCardHeader tester={tester} />
          <TesterCardActions tester={tester} />
          <TesterCardSections
            tester={tester}
            checklist={checklist}
            hoursBlurb={hoursBlurb}
          />
          <footer className="mt-12 text-center">
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-400">
              Powered by <Link href="https://carbcert.com" className="text-emerald-500 hover:text-emerald-600">CARB Cert</Link>
            </p>
          </footer>
        </section>
      </div>
    </>
  );
};
