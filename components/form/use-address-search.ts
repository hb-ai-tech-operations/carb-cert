'use client';

import { useCallback, useEffect, useRef, useState, useTransition } from 'react';

import type { AutosuggestNode, GeoPointInput } from '@/types/address-search';

import { searchAddress } from '@/actions/address-search';

// ============================================================================
// Constants
// ============================================================================

const DEBOUNCE_DELAY_MS = 300;
const MIN_QUERY_LENGTH = 3;

/** Allowed country codes - only show results from these countries */
const ALLOWED_COUNTRY_CODES = new Set(['US', 'USA', 'CA', 'CAN', 'MX', 'MEX']);

// ============================================================================
// Types
// ============================================================================

interface UseAddressSearchOptions {
  /** Coordinates to bias search results */
  coordinates?: GeoPointInput;
  /** Debounce delay in milliseconds */
  debounceMs?: number;
  /** Minimum characters before triggering search */
  minQueryLength?: number;
  /** Callback when a suggestion is selected */
  onSelect?: (suggestion: AutosuggestNode) => void;
}

interface UseAddressSearchReturn {
  /** Clear the search state */
  clear: () => void;
  /** Error message if search failed */
  error: string | null;
  /** Loading state */
  isLoading: boolean;
  /** Whether the dropdown should be open */
  isOpen: boolean;
  /** Current search query */
  query: string;
  /** Handle suggestion selection */
  selectSuggestion: (suggestion: AutosuggestNode) => void;
  /** Set dropdown open state */
  setIsOpen: (open: boolean) => void;
  /** Set the search query */
  setQuery: (query: string) => void;
  /** Search suggestions */
  suggestions: AutosuggestNode[];
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Extracts country code from formatted address.
 * Format: "123 Main St, City, State ZIP, US"
 */
function extractCountryCode(
  formatted: string | null | undefined
): string | null {
  if (typeof formatted !== 'string' || formatted.length === 0) {
    return null;
  }
  const parts = formatted.split(',');
  const lastPart = parts[parts.length - 1]?.trim().toUpperCase();
  return lastPart ?? null;
}

/**
 * Filters suggestions to only include addresses from allowed countries.
 */
function filterByAllowedCountries(
  suggestions: AutosuggestNode[]
): AutosuggestNode[] {
  return suggestions.filter(suggestion => {
    const countryCode = extractCountryCode(suggestion.location?.formatted);
    return countryCode !== null && ALLOWED_COUNTRY_CODES.has(countryCode);
  });
}

// ============================================================================
// Hook Implementation
// ============================================================================

export function useAddressSearch(
  options: UseAddressSearchOptions = {}
): UseAddressSearchReturn {
  const {
    coordinates,
    minQueryLength = MIN_QUERY_LENGTH,
    debounceMs = DEBOUNCE_DELAY_MS,
    onSelect,
  } = options;

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<AutosuggestNode[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Cleanup on unmount
  useEffect(
    () => () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      abortControllerRef.current?.abort();
    },
    []
  );

  const performSearch = useCallback(
    async (searchQuery: string) => {
      // Cancel previous request
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      startTransition(async () => {
        const result = await searchAddress({
          query: searchQuery,
          coordinates,
        });

        if (result.success) {
          // Filter to only show US, Canada, and Mexico addresses
          const filteredSuggestions = filterByAllowedCountries(
            result.suggestions
          );
          setSuggestions(filteredSuggestions);
          setError(null);
          setIsOpen(filteredSuggestions.length > 0);
        } else {
          setError(result.error);
          setSuggestions([]);
        }
      });
    },
    [coordinates]
  );

  const handleQueryChange = useCallback(
    (newQuery: string) => {
      setQuery(newQuery);
      setError(null);

      // Clear previous timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Clear suggestions if query is too short
      if (newQuery.trim().length < minQueryLength) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }

      // Debounce the search
      debounceTimerRef.current = setTimeout(() => {
        void performSearch(newQuery);
      }, debounceMs);
    },
    [minQueryLength, debounceMs, performSearch]
  );

  const selectSuggestion = useCallback(
    (suggestion: AutosuggestNode) => {
      const { name, location } = suggestion;
      const formatted = location?.formatted;
      const displayValue = name.length > 0 ? name : (formatted ?? '');
      setQuery(displayValue);
      setSuggestions([]);
      setIsOpen(false);
      onSelect?.(suggestion);
    },
    [onSelect]
  );

  const clear = useCallback(() => {
    setQuery('');
    setSuggestions([]);
    setError(null);
    setIsOpen(false);
  }, []);

  return {
    query,
    setQuery: handleQueryChange,
    suggestions,
    isLoading: isPending,
    error,
    isOpen,
    setIsOpen,
    selectSuggestion,
    clear,
  };
}
