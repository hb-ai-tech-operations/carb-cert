/** Digits-only zip fragment for matching (up to 5). */
function normalizeZipQuery(query: string): string {
  return query.replace(/\D/g, '').slice(0, 5);
}

/**
 * Returns true when `serviceArea` text contains a ZIP that matches the query.
 * Matches full or partial ZIP (e.g. "900" matches 90001 in the service area).
 */
export function serviceAreaMatchesZip(
  serviceArea: string,
  zipQuery: string
): boolean {
  const normalized = normalizeZipQuery(zipQuery);
  if (!normalized) {
    return true;
  }

  const zipTokens =
    serviceArea.match(/\b\d{5}(?:-\d{4})?\b/g)?.map(token => token.slice(0, 5)) ??
    [];

  if (zipTokens.some(zip => zip.startsWith(normalized))) {
    return true;
  }

  return serviceArea.replace(/\D/g, '').includes(normalized);
}

export function filterTestersByZip<T extends { serviceArea: string }>(
  testers: T[],
  zipQuery: string
): T[] {
  const normalized = normalizeZipQuery(zipQuery);
  if (!normalized) {
    return testers;
  }
  return testers.filter(tester =>
    serviceAreaMatchesZip(tester.serviceArea, normalized)
  );
}
