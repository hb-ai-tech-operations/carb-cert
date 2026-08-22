'use client';

import type { FormSchema } from '@/features/compliance-form/schemas';
import type { UseFormReturn } from 'react-hook-form';

import {
  InputAddressSearch,
  InputEmail,
  InputSelect,
  InputTel,
  InputText,
} from '@/components/form';
import {
  APPLICATION_TYPE_OPTIONS,
  COUNTRIES_OPTIONS,
  ENTITY_TYPE_OPTIONS,
  type EntityType,
} from '@/features/compliance-form/constants';
import { useStateFieldConfig } from '@/features/compliance-form/hooks/use-state-field-config';
import { cn } from '@/lib';

interface FormStepOneProps {
  form: UseFormReturn<FormSchema>;
}

const FormStepOne = ({ form }: FormStepOneProps) => {
  const entityType = form.watch('entityType') as EntityType | undefined;
  const showEntityFields =
    entityType === 'company' || entityType === 'government';

  const {
    handleCountryChange,
    label: stateLabel,
    options: stateOptions,
    selectPlaceholder: statePlaceholder,
  } = useStateFieldConfig(form, 'physicalCountry', 'physicalState');

  return (
    <div className="grid gap-x-4 gap-y-2 grid-cols-1 sm:grid-cols-2 items-baseline">
      <h2 className="text-xl font-semibold col-span-full">Entity Owner Information</h2>
      <InputText
        control={form.control}
        name="fullName"
        label="Full Name"
        placeholder="Enter your full name"
        required
        maxLength={50}
      />

      <InputEmail
        control={form.control}
        name="emailAddress"
        label="Email Address"
        placeholder="Enter your email address"
        required
        maxLength={100}
      />

      <InputTel
        control={form.control}
        name="phone"
        label="Phone Number"
        placeholder="Enter your phone number"
        required
        maxLength={14}
      />

      <InputSelect
        control={form.control}
        name="applicationType"
        label="Application Type"
        placeholder="Select application type"
        options={APPLICATION_TYPE_OPTIONS}
        required
      />
      <div className="grid grid-cols-1 items-baseline  gap-y-2 sm:gap-4 col-span-full sm:grid-cols-5 w-full">
        <InputSelect
          control={form.control}
          name="entityType"
          label="Entity Type"
          placeholder="Select entity type"
          options={ENTITY_TYPE_OPTIONS}
          required
          formItemClassName={cn('col-span-1 transition-all duration-300 w-full', !showEntityFields && 'col-span-2')}
        />

        {showEntityFields ? (
          <>
            <InputText
              control={form.control}
              name="entityName"
              label="Entity Name"
              placeholder="Enter entity name"
              maxLength={50}
              required
              formItemClassName="col-span-2"
            />

            <InputText
              control={form.control}
              name="doingBusinessAs"
              label="Doing Business As (DBA)"
              placeholder="Enter DBA name (optional)"
              maxLength={50}
              formItemClassName="col-span-2"
            />
          </>
        ) : null}
      </div>
      <span className='h-4 block col-span-full' />
      <h2 className="text-xl font-semibold col-span-full">Physical Address</h2>
      <div className="grid grid-cols-1 items-baseline gap-4 col-span-full sm:grid-cols-3">
        <InputAddressSearch
          control={form.control}
          setValue={form.setValue}
          formItemClassName="col-span-full sm:col-span-2"
          name="physicalAddress"
          label="Physical Address"
          placeholder="Search for your address..."
          required
          maxLength={100}
          relatedFields={{
            city: 'physicalCity',
            country: 'physicalCountry',
            state: 'physicalState',
            zipCode: 'physicalZipCode',
          }}
        />
        <InputText
          control={form.control}
          name="physicalCity"
          label="City"
          placeholder="Enter your city"
          required
          maxLength={50}
        />
        <InputSelect
          control={form.control}
          name="physicalCountry"
          label="Country"
          placeholder="Select your country"
          options={COUNTRIES_OPTIONS}
          required
          onValueChange={handleCountryChange}
        />
        <InputSelect
          control={form.control}
          name="physicalState"
          label={stateLabel}
          placeholder={statePlaceholder}
          options={stateOptions}
          required
        />
        <InputText
          control={form.control}
          name="physicalZipCode"
          label="Zip Code"
          placeholder="Enter your zip code"
          required
          maxLength={10}
        />
      </div>
    </div>
  );
};

FormStepOne.displayName = 'FormStepOne';

export { FormStepOne };
