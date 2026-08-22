'use client';

import type { VehicleSchema } from '@/features/compliance-form/schemas';
import type { UseFormReturn } from 'react-hook-form';

import { InputAddressSearch, InputSelect, InputText } from '@/components/form';
import { COUNTRIES_OPTIONS } from '@/features/compliance-form/constants';
import { useStateFieldConfig } from '@/features/compliance-form/hooks/use-state-field-config';

interface VehicleAddressFieldsProps {
  form: UseFormReturn<VehicleSchema>;
}

const VehicleAddressFields = ({ form }: VehicleAddressFieldsProps) => {
  const {
    handleCountryChange,
    label: stateLabel,
    options: stateOptions,
    textPlaceholder: statePlaceholder,
  } = useStateFieldConfig(form, 'country', 'state');

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-6 items-baseline col-span-full">
      <h3 className="text-xl font-semibold col-span-full">New Address</h3>
      <InputAddressSearch
        formItemClassName="col-span-full sm:col-span-3"
        control={form.control}
        setValue={form.setValue}
        name="address"
        label="Address"
        placeholder="Search for an address..."
        required
        maxLength={100}
        relatedFields={{
          city: 'city',
          state: 'state',
          zipCode: 'zipCode',
          country: 'country',
        }}
      />
      <InputText
        control={form.control}
        name="city"
        formItemClassName="col-span-full sm:col-span-3"
        label="City"
        placeholder="Enter your city"
        required
        maxLength={100}
      />
      <InputSelect
        control={form.control}
        name="country"
        formItemClassName="col-span-full sm:col-span-2"
        options={COUNTRIES_OPTIONS}
        label="Country"
        placeholder="Select your country"
        required
        onValueChange={handleCountryChange}
      />
      <InputSelect
        control={form.control}
        name="state"
        formItemClassName="col-span-full sm:col-span-2"
        options={stateOptions}
        label={stateLabel}
        placeholder={statePlaceholder}
        required
      />
      <InputText
        control={form.control}
        name="zipCode"
        formItemClassName="col-span-full sm:col-span-2"
        label="Zip Code"
        placeholder="Enter your zip code"
        required
        maxLength={10}
      />
    </div>
  );
};

VehicleAddressFields.displayName = 'VehicleAddressFields';

export { VehicleAddressFields };
