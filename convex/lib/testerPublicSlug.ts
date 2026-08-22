const SLUG_SUFFIX_LENGTH = 8;
const SLUG_NAME_MAX_LENGTH = 48;

/**
 * URL slug for public tester cards. Stable per document id; suffix keeps names unique.
 */
export function publicTesterSlug(fullName: string, id: string): string {
  const base = slugifySegment(fullName);
  const compact = id.replace(/[^\da-z]/gi, '').toLowerCase();
  const suffix = compact.slice(-SLUG_SUFFIX_LENGTH);
  return `${base}-${suffix}`;
}

function slugifySegment(value: string): string {
  const base = value
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\da-z]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, SLUG_NAME_MAX_LENGTH);
  return base.length > 0 ? base : 'tester';
}
