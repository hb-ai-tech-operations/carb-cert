'use client';

import { type UseFormReturn } from 'react-hook-form';

import { VehicleAddressFields } from './vehicle-address-fields';

import type { VehicleSchema } from '@/features/compliance-form/schemas';

import { InputSelect, InputText } from '@/components/form';
import {
  COUNTRIES_OPTIONS,
  VEHICLE_FUEL_TYPE_OPTIONS,
  VEHICLE_LOCATION_ADDRESS_OPTIONS,
  VEHICLE_OWNERSHIP_TYPE_OPTIONS,
  VEHICLE_TYPE_OPTIONS,
} from '@/features/compliance-form/constants';

interface VehicleDialogFormBodyProps {
  form: UseFormReturn<VehicleSchema>;
  isPending: boolean;
  onFuelTypeChange: (value: string) => void;
  onLocationAddressChange: () => void;
  onRegisteredCountryChange: () => void;
  onVinChange: (value: string) => void;
  registeredStateLabel: string;
  registeredStateOptions: ReadonlyArray<{ label: string; value: string; }>;
  registeredStateSelectPlaceholder: string;
  showNewAddressFields: boolean;
}

interface VehicleDialogFieldsProps {
  form: UseFormReturn<VehicleSchema>;
  isPending: boolean;
  onFuelTypeChange: (value: string) => void;
  onLocationAddressChange: () => void;
  onRegisteredCountryChange: () => void;
  onVinChange: (value: string) => void;
  registeredStateLabel: string;
  registeredStateOptions: ReadonlyArray<{ label: string; value: string; }>;
  registeredStateSelectPlaceholder: string;
  showNewAddressFields: boolean;
}

const VehicleDialogFields = ({
  form,
  isPending,
  onFuelTypeChange,
  onLocationAddressChange,
  onRegisteredCountryChange,
  onVinChange,
  registeredStateLabel,
  registeredStateOptions,
  registeredStateSelectPlaceholder,
  showNewAddressFields,
}: VehicleDialogFieldsProps) => (
  <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-4 items-baseline">
    <div className="relative w-full col-span-full sm:col-span-2">
      <InputText
        control={form.control}
        name="vin"
        label="Vehicle VIN"
        placeholder="Enter your VIN"
        inputClassName="font-mono uppercase"
        onChange={onVinChange}
        required
        disabled={isPending}
        maxLength={17}
      />
      {isPending ? (
        <div className="absolute top-1/2 right-2 translate-y-1/2">
          <div className="size-4 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
        </div>
      ) : null}
    </div>

    <InputText
      control={form.control}
      name="year"
      label="Vehicle Year"
      placeholder="Enter your vehicle year"
      required
      disabled={isPending}
      maxLength={4}
    />

    <InputText
      control={form.control}
      name="make"
      label="Vehicle Make"
      placeholder="Enter your vehicle make"
      required
      disabled={isPending}
      maxLength={50}
    />

    <InputText
      control={form.control}
      name="model"
      label="Vehicle Model"
      placeholder="Enter your vehicle model"
      required
      disabled={isPending}
      maxLength={50}
    />

    <InputSelect
      control={form.control}
      name="fuelType"
      label="Fuel Type"
      placeholder="Select fuel type"
      disabled={isPending}
      options={VEHICLE_FUEL_TYPE_OPTIONS}
      onValueChange={onFuelTypeChange}
      required
    />

    <InputText
      control={form.control}
      name="licensePlate"
      label="License Plate"
      placeholder="Enter your license plate"
      required
      inputClassName="uppercase"
      maxLength={10}
    />

    <InputSelect
      control={form.control}
      name="ownershipType"
      label="Ownership Type"
      placeholder="Select ownership type"
      options={VEHICLE_OWNERSHIP_TYPE_OPTIONS}
      required
    />

    <InputSelect
      control={form.control}
      name="vehicleType"
      label="Vehicle Type"
      placeholder="Select vehicle type"
      options={VEHICLE_TYPE_OPTIONS}
      required
    />

    <InputSelect
      control={form.control}
      name="registeredCountry"
      label="Registered Country"
      placeholder="Select country"
      options={COUNTRIES_OPTIONS}
      onValueChange={onRegisteredCountryChange}
      required
    />

    <InputSelect
      control={form.control}
      name="registeredState"
      options={registeredStateOptions}
      label={registeredStateLabel}
      formItemClassName="col-span-full sm:col-span-1"
      placeholder={registeredStateSelectPlaceholder}
      required
    />

    <InputSelect
      control={form.control}
      name="locationAddress"
      label="Location Address"
      placeholder="Select location address"
      options={VEHICLE_LOCATION_ADDRESS_OPTIONS}
      required
      onValueChange={onLocationAddressChange}
    />

    {showNewAddressFields ? (
      <VehicleAddressFields form={form} />
    ) : null}
  </div>
);

export const VehicleDialogFormBody = ({
  form,
  isPending,
  onFuelTypeChange,
  onLocationAddressChange,
  onRegisteredCountryChange,
  onVinChange,
  registeredStateLabel,
  registeredStateOptions,
  registeredStateSelectPlaceholder,
  showNewAddressFields,
}: VehicleDialogFormBodyProps) => (
  <VehicleDialogFields
    form={form}
    isPending={isPending}
    onFuelTypeChange={onFuelTypeChange}
    onLocationAddressChange={onLocationAddressChange}
    onRegisteredCountryChange={onRegisteredCountryChange}
    onVinChange={onVinChange}
    registeredStateLabel={registeredStateLabel}
    registeredStateOptions={registeredStateOptions}
    registeredStateSelectPlaceholder={registeredStateSelectPlaceholder}
    showNewAddressFields={showNewAddressFields}
  />
);

VehicleDialogFormBody.displayName = 'VehicleDialogFormBody';
