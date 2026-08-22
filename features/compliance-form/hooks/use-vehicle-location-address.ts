'use client';

import { useCallback } from 'react';

import type { Country } from '../constants';
import type { VehicleSchema } from '../schemas';
import type { UseFormReturn } from 'react-hook-form';

export interface PhysicalAddressFields {
  physicalAddress?: string;
  physicalCity?: string;
  physicalCountry?: Country | undefined;
  physicalState?: string;
  physicalZipCode?: string;
}

/**
 * Handles "same as physical address" logic for the vehicle dialog:
 * when location is same-as-physical, copies physical address into vehicle address fields;
 * otherwise clears vehicle address fields.
 */
export function useVehicleLocationAddress(
  form: UseFormReturn<VehicleSchema>,
  physical: PhysicalAddressFields
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- form.watch typed via UseFormReturn<VehicleSchema>
  const locationAddress = form.watch(
    'locationAddress'
  ) as VehicleSchema['locationAddress'];
  const showNewAddressFields =
    locationAddress !== 'same-as-physical-address' &&
    locationAddress !== undefined;

  const handleLocationAddressChange = useCallback(() => {
    const setAddressFields = (fields: {
      address: string;
      city: string;
      country: Country | undefined;
      state: string;
      zipCode: string;
    }): void => {
      form.setValue('address', fields.address, { shouldValidate: true });
      form.setValue('city', fields.city, { shouldValidate: true });
      form.setValue('country', fields.country ?? ('United States' as Country), {
        shouldValidate: true,
      });
      form.setValue('state', fields.state, { shouldValidate: true });
      form.setValue('zipCode', fields.zipCode, { shouldValidate: true });
    };

    if (form.getValues('locationAddress') !== 'same-as-physical-address') {
      form.setValue('address', '', { shouldValidate: false });
      form.setValue('city', '', { shouldValidate: false });
      form.setValue('state', '', { shouldValidate: false });
      form.setValue('zipCode', '', { shouldValidate: false });
      form.setValue('country', undefined as Country | undefined, {
        shouldValidate: false,
      });
      return;
    }

    setAddressFields({
      address: physical.physicalAddress ?? '',
      city: physical.physicalCity ?? '',
      state: physical.physicalState ?? '',
      zipCode: physical.physicalZipCode ?? '',
      country: physical.physicalCountry,
    });
  }, [
    form,
    physical.physicalAddress,
    physical.physicalCity,
    physical.physicalState,
    physical.physicalZipCode,
    physical.physicalCountry,
  ]);

  return { handleLocationAddressChange, showNewAddressFields };
}
