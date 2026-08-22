import { memo } from 'react';

import type { FormSchema } from '@/features/compliance-form/schemas';
import type { UseFormReturn } from 'react-hook-form';

import { InputAddressSearch, InputSelect, InputText } from '@/components/form';
import { COUNTRIES_OPTIONS } from '@/features/compliance-form/constants';

interface BillingAddressFieldsProps {
  form: UseFormReturn<FormSchema>;
}

const BillingAddressFields = memo(({ form }: BillingAddressFieldsProps) => (
  <div className="space-y-2">
    <h3 className="text-xl font-semibold">Billing Address</h3>
    <div className="grid grid-cols-1 items-baseline gap-x-4 gap-y-2 sm:grid-cols-3">
      <InputAddressSearch
        formItemClassName="col-span-full sm:col-span-2"
        control={form.control}
        setValue={form.setValue}
        name="billingAddress"
        label="Address"
        placeholder="Search for an address..."
        required
        maxLength={100}
        relatedFields={{
          city: 'billingCity',
          state: 'billingState',
          zipCode: 'billingZipCode',
          country: 'billingCountry',
        }}
      />
      <InputText
        control={form.control}
        name="billingCity"
        label="City"
        placeholder="City"
        required
        maxLength={100}
      />
      <InputSelect
        control={form.control}
        name="billingCountry"
        label="Country"
        placeholder="Select country"
        options={COUNTRIES_OPTIONS}
        required
      />
      <InputText
        control={form.control}
        name="billingState"
        label="State"
        placeholder="State"
        required
        maxLength={100}
      />
      <InputText
        control={form.control}
        name="billingZipCode"
        label="Zip Code"
        placeholder="Zip code"
        required
        maxLength={10}
      />
    </div>
  </div>
));

BillingAddressFields.displayName = 'BillingAddressFields';
export { BillingAddressFields };