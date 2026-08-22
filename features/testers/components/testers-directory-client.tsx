'use client';

import { useMemo, useState } from 'react';

import { Search } from 'lucide-react';

import type { TesterProfile } from '@/features/testers/data/testers';

import { Input } from '@/components/ui/input';
import { TestersDirectoryList } from '@/features/testers/components/testers-directory-list';
import { filterTestersByZip } from '@/features/testers/lib/filter-testers-by-zip';

const iconStroke = 1.5;

export const TestersDirectoryClient = ({
  testers,
}: {
  testers: TesterProfile[];
}) => {
  const [zipQuery, setZipQuery] = useState('');

  const filteredTesters = useMemo(
    () => filterTestersByZip(testers, zipQuery),
    [testers, zipQuery]
  );

  const zipDigits = zipQuery.replace(/\D/g, '');
  const hasZipFilter = zipDigits.length > 0;

  return (
    <>
      <div className="mb-6" aria-label="Search testers by ZIP code">
        <label
          htmlFor="testers-zip-search"
          className="text-sm font-medium text-zinc-700"
        >
          Search by ZIP code
        </label>
        <div className="relative mt-2">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400"
            strokeWidth={iconStroke}
            aria-hidden
          />
          <Input
            id="testers-zip-search"
            type="search"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="e.g. 90001"
            value={zipQuery}
            onChange={event => setZipQuery(event.target.value)}
            className="h-11 rounded-full border-zinc-200 bg-white pl-10 text-base shadow-sm focus-visible:ring-emerald-500/30"
            aria-describedby="testers-zip-search-hint"
          />
        </div>
        <p
          id="testers-zip-search-hint"
          className="mt-2 text-sm text-zinc-500"
        >
          Find testers who listed your ZIP in their service area.
        </p>
      </div>

      {hasZipFilter && filteredTesters.length === 0 ? (
        <div
          className="rounded-4xl border border-dashed border-zinc-200 bg-white p-10 text-center shadow-sm"
          role="status"
        >
          <p className="text-base font-medium text-zinc-900">
            No testers match ZIP {zipDigits}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            Try another ZIP or clear the search to browse all certified testers.
          </p>
        </div>
      ) : (
        <TestersDirectoryList testers={filteredTesters} />
      )}
    </>
  );
};
