'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { type Control, type FieldPath, type FieldValues, type UseFormSetValue, useWatch } from 'react-hook-form';

import { FormFieldController } from './form-field';
import { type InputIconType } from './input-icon';
import { useAddressSearch } from './use-address-search';

import type { AutosuggestNode, GeoPointInput } from '@/types/address-search';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// ============================================================================
// Types
// ============================================================================

interface AddressFields {
  address?: string;
  city?: string;
  country?: string;
  state?: string;
  zipCode?: string;
}

interface RelatedFieldsConfig<T extends FieldValues> {
  city?: FieldPath<T>;
  country?: FieldPath<T>;
  state?: FieldPath<T>;
  zipCode?: FieldPath<T>;
}

interface InputAddressSearchProps<
  T extends FieldValues = FieldValues,
  N extends FieldPath<T> = FieldPath<T>,
> {
  control: Control<T>;
  coordinates?: GeoPointInput;
  description?: string;
  disabled?: boolean;
  formItemClassName?: string;
  icon?: InputIconType;
  iconPosition?: 'left' | 'right';
  iconSize?: 'sm' | 'md' | 'lg';
  inputClassName?: string;
  label?: string;
  maxLength?: number;
  messageClassName?: string;
  name: N;
  onAddressSelect?: (address: AutosuggestNode) => void;
  placeholder?: string;
  relatedFields?: RelatedFieldsConfig<T>;
  required?: boolean;
  setValue?: UseFormSetValue<T>;
  valueMode?: 'street' | 'full';
}

// ============================================================================
// Constants
// ============================================================================

const COUNTRY_CODE_MAP: Record<string, string> = {
  CA: 'Canada',
  CAN: 'Canada',
  MX: 'Mexico',
  MEX: 'Mexico',
  US: 'United States',
  USA: 'United States',
};

const US_STATE_ZIP_REGEX = /^([a-z]{2})\s+(\d{5}(?:-\d{4})?)$/i;
const CA_PROVINCE_POSTAL_REGEX = /^([a-z]{2})\s+([a-z]\d[a-z]\s?\d[a-z]\d)$/i;
const MX_STATE_POSTAL_REGEX = /^([a-z]{2,3})\s+(\d{5})$/i;

// ============================================================================
// Helper Functions
// ============================================================================

function mapCountryCode(code: string): string | undefined {
  return COUNTRY_CODE_MAP[code.toUpperCase().trim()];
}

function parseStateAndPostal(part: string): { postalCode: string; state: string; } | null {
  const usMatch = part.match(US_STATE_ZIP_REGEX);
  if (usMatch?.[1] && usMatch[2]) {
    const finalZipCode = usMatch[2].match(/^\d{5}/)?.[0];
    return { postalCode: finalZipCode ?? usMatch[2], state: usMatch[1].toUpperCase() };
  }

  const caMatch = part.match(CA_PROVINCE_POSTAL_REGEX);
  if (caMatch?.[1] && caMatch[2]) {
    return { postalCode: caMatch[2].toUpperCase(), state: caMatch[1].toUpperCase() };
  }

  const mxMatch = part.match(MX_STATE_POSTAL_REGEX);
  if (mxMatch?.[1] && mxMatch[2]) {
    return { postalCode: mxMatch[2], state: mxMatch[1].toUpperCase() };
  }

  return null;
}

function parseAddressComponents(formatted: string): AddressFields {
  const parts = formatted.split(',').map(p => p.trim());

  if (parts.length >= 3) {
    const lastPart = parts[parts.length - 1];
    const secondLastPart = parts[parts.length - 2];
    const statePostal = secondLastPart ? parseStateAndPostal(secondLastPart) : null;

    return {
      address: parts[0],
      city: parts.length > 3 ? parts[1] : undefined,
      country: lastPart ? mapCountryCode(lastPart) : undefined,
      state: statePostal?.state,
      zipCode: statePostal?.postalCode,
    };
  }

  return { address: formatted };
}

function getStreetAddress(suggestion: AutosuggestNode): string {
  const formatted = suggestion.location?.formatted;
  if (typeof formatted === 'string' && formatted.length > 0) {
    return formatted.split(',')[0]?.trim() ?? suggestion.name;
  }
  return suggestion.name;
}

/** Sets a form field value with validation */
function setFormFieldValue<T extends FieldValues>(
  setValue: UseFormSetValue<T>,
  field: FieldPath<T> | undefined,
  value: string | undefined
): void {
  if (!field || !value) {
    return;
  }
  (setValue as (name: string, value: unknown, options?: { shouldValidate?: boolean; }) => void)(field, value, { shouldValidate: true });
}

// ============================================================================
// Suggestion Item Component
// ============================================================================

interface SuggestionItemProps {
  onSelect: () => void;
  suggestion: AutosuggestNode;
}

const SuggestionItem = ({ suggestion, onSelect }: SuggestionItemProps) => {
  const { name, location } = suggestion;
  const formatted = location?.formatted;
  const hasFormatted = typeof formatted === 'string' && formatted.length > 0;

  return (
    <li
      role="option"
      aria-selected={false}
      className={cn(
        'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm',
        'outline-none hover:bg-accent hover:text-accent-foreground',
        'focus:bg-accent focus:text-accent-foreground'
      )}
      onClick={onSelect}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect();
        }
      }}
      tabIndex={0}
    >
      <div className="flex flex-col">
        <span className="font-medium">{name}</span>
        {hasFormatted ? (
          <span className="text-xs text-muted-foreground">{formatted}</span>
        ) : null}
      </div>
    </li>
  );
};

// ============================================================================
// Suggestions List Component
// ============================================================================

interface SuggestionsListProps {
  id: string;
  onSelect: (suggestion: AutosuggestNode) => void;
  suggestions: AutosuggestNode[];
}

const SuggestionsList = ({ id, suggestions, onSelect }: SuggestionsListProps) => (
  <ul
    id={id}
    role="listbox"
    className={cn(
      'absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md',
      'border bg-popover p-1 shadow-md',
      'animate-in fade-in-0 zoom-in-95'
    )}
  >
    {suggestions.map(suggestion => (
      <SuggestionItem
        key={suggestion.id}
        suggestion={suggestion}
        onSelect={() => onSelect(suggestion)}
      />
    ))}
  </ul>
);

// ============================================================================
// Loading Spinner Component
// ============================================================================

const LoadingSpinner = () => (
  <div className="absolute right-3 top-1/2 -translate-y-1/2">
    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
  </div>
);

// ============================================================================
// Main Component
// ============================================================================

const InputAddressSearch = <
  T extends FieldValues = FieldValues,
  N extends FieldPath<T> = FieldPath<T>,
>(
  props: InputAddressSearchProps<T, N>
) => {
  const {
    control,
    name,
    label,
    placeholder = 'Search for an address...',
    description,
    required = false,
    disabled = false,
    maxLength,
    icon,
    iconPosition = 'left',
    iconSize = 'md',
    inputClassName,
    formItemClassName,
    messageClassName,
    coordinates,
    onAddressSelect,
    relatedFields,
    setValue,
    valueMode = 'street',
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const watchedValue = useWatch({ control, name });
  const [localValue, setLocalValue] = useState('');

  useEffect(() => {
    setLocalValue(typeof watchedValue === 'string' ? watchedValue : '');
  }, [watchedValue]);

  const fillRelatedFields = useCallback(
    (suggestion: AutosuggestNode) => {
      const formatted = suggestion.location?.formatted;
      if (!setValue || !relatedFields || typeof formatted !== 'string') {
        return;
      }

      const parsed = parseAddressComponents(formatted);

      setFormFieldValue(setValue, relatedFields.country, parsed.country);
      setFormFieldValue(setValue, relatedFields.city, parsed.city);
      setFormFieldValue(setValue, relatedFields.zipCode, parsed.zipCode);
      setTimeout(() => {
        setFormFieldValue(setValue, relatedFields.state, parsed.state);
      }, 100);
    },
    [relatedFields, setValue]
  );

  const handleSuggestionSelect = useCallback(
    (suggestion: AutosuggestNode) => {
      onAddressSelect?.(suggestion);
      fillRelatedFields(suggestion);
    },
    [onAddressSelect, fillRelatedFields]
  );

  const { suggestions, isLoading, isOpen, setIsOpen, setQuery, selectSuggestion } =
    useAddressSearch({ coordinates, onSelect: handleSuggestionSelect });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen]);

  const handleSelect = useCallback(
    (suggestion: AutosuggestNode) => {
      const value =
        valueMode === 'full'
          ? suggestion.location?.formatted ?? suggestion.name
          : getStreetAddress(suggestion);
      setLocalValue(value);
      selectSuggestion(suggestion);
    },
    [selectSuggestion, valueMode]
  );

  return (
    <FormFieldController
      control={control}
      name={name}
      label={label}
      description={description}
      required={required}
      disabled={disabled}
      icon={icon}
      iconPosition={iconPosition}
      iconSize={iconSize}
      messageClassName={messageClassName}
      formItemClassName={formItemClassName}
    >
      {field => (
        <div ref={containerRef} className="relative w-full">
          <Input
            id={field.id}
            type="text"
            value={localValue.length > 0 ? localValue : ((field.value as string) ?? '')}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            autoComplete="off"
            aria-invalid={!!field.error}
            aria-describedby={description ? field.form_description_id : undefined}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-autocomplete="list"
            aria-controls={isOpen ? listboxId : undefined}
            role="combobox"
            className={cn(
              icon && iconPosition === 'left' && 'pl-8',
              icon && iconPosition === 'right' && 'pr-8',
              'input-carb-cert',
              inputClassName
            )}
            onChange={event => {
              const { value } = event.target;
              setLocalValue(value);
              setQuery(value);
              field.onChange(value);
            }}
            onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          />
          {isLoading ? <LoadingSpinner /> : null}
          {isOpen && suggestions.length > 0 ? (
            <SuggestionsList
              id={listboxId}
              suggestions={suggestions}
              onSelect={suggestion => {
                handleSelect(suggestion);
                field.onChange(
                  valueMode === 'full'
                    ? suggestion.location?.formatted ?? suggestion.name
                    : getStreetAddress(suggestion)
                );
              }}
            />
          ) : null}
        </div>
      )}
    </FormFieldController>
  );
};

InputAddressSearch.displayName = 'InputAddressSearch';

export { InputAddressSearch };
export type { AddressFields, InputAddressSearchProps };
