'use server';

import type {
  AddressSearchParams,
  AutosuggestNode,
} from '@/types/address-search';

const REQUEST_TIMEOUT_MS = 10_000;

export type SearchAddressResult =
  | { error: string; success: false }
  | { success: true; suggestions: AutosuggestNode[] };

interface SearchApiResponse {
  suggestions: AutosuggestNode[];
}

function isSearchApiResponse(data: unknown): data is SearchApiResponse {
  if (typeof data !== 'object' || data === null || !('suggestions' in data)) {
    return false;
  }

  return Array.isArray((data as SearchApiResponse).suggestions);
}

/**
 * Searches for address suggestions via the address search API.
 *
 * @param params - Search parameters including query string and optional coordinates
 * @returns Result object with either suggestions array or error message
 *
 * @example
 * ```ts
 * const result = await searchAddress({ query: '123 Main St' });
 * if (result.success) {
 *   console.log(result.suggestions);
 * } else {
 *   console.error(result.error);
 * }
 * ```
 */
export async function searchAddress(
  params: AddressSearchParams
): Promise<SearchAddressResult> {
  const trimmedQuery = params.query?.trim() ?? '';
  if (trimmedQuery.length === 0) {
    return { error: 'Search query is required', success: false };
  }

  const endpoint = process.env.ADDRESS_SEARCH_URL;
  const secret = process.env.ADDRESS_SEARCH_SECRET;
  if (!endpoint || !secret) {
    return { error: 'Address search is not configured', success: false };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify({
        query: trimmedQuery,
        coordinates: params.coordinates,
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      return {
        error: `Failed to fetch suggestions: ${response.statusText}`,
        success: false,
      };
    }

    const data: unknown = await response.json();
    if (!isSearchApiResponse(data)) {
      return { error: 'Invalid response from API', success: false };
    }

    return {
      success: true,
      suggestions: data.suggestions,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown error occurred';

    return {
      error: `Failed to search address: ${message}`,
      success: false,
    };
  }
}
