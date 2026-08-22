'use client';

import { useCallback } from 'react';

import { getStateFieldConfig } from '../constants/state-field-config';

import type { Country } from '../constants';
import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

interface UseStateFieldConfigReturn {
  handleCountryChange: () => void;
  label: string;
  options: ReadonlyArray<{ label: string; value: string }>;
  selectPlaceholder: string;
  textPlaceholder: string;
}

/**
 * Shared hook for country + state/province field config and clearing state on country change.
 * Use in FormStepOne, VehicleAddressFields, and FormDialogVehicle.
 */
function useStateFieldConfig<TFieldValues extends FieldValues>(
  form: UseFormReturn<TFieldValues>,
  countryFieldName: FieldPath<TFieldValues>,
  stateFieldName: FieldPath<TFieldValues>
): UseStateFieldConfigReturn {
  const country = form.watch(countryFieldName) as Country | undefined;
  const config = getStateFieldConfig(country);

  const handleCountryChange = useCallback(() => {
    if (country) {
      form.setValue(stateFieldName, '' as never, { shouldValidate: false });
    }
  }, [form, country, stateFieldName]);

  return {
    handleCountryChange,
    label: config.label,
    options: config.options,
    selectPlaceholder: config.selectPlaceholder,
    textPlaceholder: config.textPlaceholder,
  };
}

export { useStateFieldConfig };
