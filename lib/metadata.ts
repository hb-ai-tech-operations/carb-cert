// Backwards-compatible entrypoint for metadata helpers.
// New code should import from `@/lib/seo/metadata` and `@/lib/seo/jsonld`.
export {
  buildOrganizationJsonLd,
  buildWebPageJsonLd,
  sanitizeJsonLd,
} from './seo/jsonld';
export {
  buildPageMetadata,
  buildRootMetadata,
  buildViewport,
} from './seo/metadata';
