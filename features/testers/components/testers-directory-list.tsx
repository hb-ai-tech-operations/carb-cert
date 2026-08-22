import Image from 'next/image';
import Link from 'next/link';

import { ArrowRight, BadgeCheck, MapPin } from 'lucide-react';

import {
  getTesterCardPath,
  type TesterProfile,
} from '@/features/testers/data/testers';

const iconStroke = 1.5;

export const TestersDirectoryList = ({
  testers,
}: {
  testers: TesterProfile[];
}) => (
  <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    {testers.map(tester => {
      const badge = 'Certified emissions tester';

      return (
        <li key={tester.slug} className="h-full min-h-0">
          <Link
            href={getTesterCardPath(tester.slug)}
            className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-4xl border border-zinc-200/80 bg-white p-6 text-left shadow-sm transition-all hover:border-emerald-500/30 hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <Image
                src={tester.avatarSrc}
                alt={tester.name}
                width={64}
                height={64}
                className="size-16 shrink-0 rounded-full border-2 border-white object-cover shadow-sm"
                sizes="64px"
              />
              <div className="min-w-0">
                <h2 className="flex items-center gap-1.5 text-lg font-semibold tracking-tight text-zinc-900 transition-colors group-hover:text-emerald-600">
                  <span className="truncate">{tester.name}</span>
                  <BadgeCheck
                    className="size-4.5 shrink-0 text-emerald-500"
                    strokeWidth={iconStroke}
                    aria-hidden
                  />
                </h2>
                <p className="mt-0.5 flex items-center gap-1 text-sm text-zinc-500">
                  <MapPin
                    className="size-3.5 shrink-0"
                    strokeWidth={iconStroke}
                    aria-hidden
                  />
                  <span className="truncate">
                    {tester.location.city},{' '}
                    <span translate="no">{tester.location.region}</span>
                  </span>
                </p>
              </div>
            </div>
            <p className="mt-4 line-clamp-2 grow text-sm leading-relaxed text-zinc-600">
              {tester.tagline}
            </p>
            <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4">
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-600/20 ring-inset">
                {badge}
              </span>
              <span className="flex items-center gap-1 text-sm font-medium text-zinc-900 transition-colors group-hover:text-emerald-600">
                View Profile
                <ArrowRight
                  className="size-5 shrink-0"
                  strokeWidth={iconStroke}
                  aria-hidden
                />
              </span>
            </div>
          </Link>
        </li>
      );
    })}
  </ul>
);
