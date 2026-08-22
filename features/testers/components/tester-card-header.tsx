import Image from 'next/image';

import { BadgeCheck, MapPin } from 'lucide-react';

import type { TesterProfile } from '@/features/testers/data/testers';

import { testerCardIconStroke } from '@/features/testers/components/tester-card-primitives';

export const TesterCardHeader = ({ tester }: { tester: TesterProfile; }) => (
  <header className="relative overflow-hidden rounded-4xl border border-zinc-200/80 bg-white p-6 text-center shadow-sm sm:p-10">
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-emerald-50/80 to-transparent"
      aria-hidden
    />
    <div className="relative z-10">
      <Image
        src={tester.avatarSrc}
        alt={`Portrait of ${tester.name}, certified heavy-duty emissions tester`}
        width={112}
        height={112}
        sizes="(max-width: 640px) 96px, 112px"
        priority
        className="mx-auto size-24 rounded-full border-4 border-white object-cover object-center shadow-sm sm:size-28"
      />
      <h1
        id="tester-profile-heading"
        className="mt-6 flex items-center justify-center gap-2 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl"
      >
        {tester.name}
        <BadgeCheck
          className="size-6 shrink-0 text-emerald-500 sm:size-7"
          strokeWidth={testerCardIconStroke}
          aria-hidden
        />
      </h1>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 ring-1 ring-emerald-600/20 ring-inset">
          Certified Emissions Tester
        </span>
        <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-600 ring-1 ring-zinc-500/10 ring-inset">
          Clean Truck Check
        </span>
      </div>
      <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-zinc-600">
        {tester.tagline}
      </p>
      <div className="mt-6 flex items-center justify-center gap-1.5 text-base text-zinc-500">
        <MapPin
          className="size-4 shrink-0"
          strokeWidth={testerCardIconStroke}
          aria-hidden
        />
        <span>
          {tester.location.city},{' '}
          <span translate="no">{tester.location.region}</span>
        </span>
      </div>
    </div>
  </header>
);
