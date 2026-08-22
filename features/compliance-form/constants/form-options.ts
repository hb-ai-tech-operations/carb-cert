import {
  CANADIAN_PROVINCES_TERRITORIES,
  MEXICO_PROVINCES_TERRITORIES,
  US_STATES_TERRITORIES,
} from '@/constants';
import {
  type APPLICATION_TYPES,
  type COUNTRIES,
  type ENTITY_TYPES,
  type VEHICLE_FUEL_TYPES,
  type VEHICLE_LOCATION_ADDRESSES,
  type VEHICLE_OWNERSHIP_TYPES,
  type VEHICLE_TYPES,
  type VehicleFuelType,
} from '@/features/compliance-form/constants/enums';

export const APPLICATION_TYPE_OPTIONS = [
  { label: 'Apply for a CARB certificate', value: 'carb_certificate' },
  { label: 'Renew Certificate', value: 'renew_certificate' },
  { label: 'Add/Register Vehicle', value: 'add_vehicle' },
  { label: '5-Day Pass (Temporary)', value: 'five_day_pass' },
  { label: 'Notice to Submit to Testing (NST)', value: 'nst_response' },
] as const satisfies ReadonlyArray<{
  label: string;
  value: (typeof APPLICATION_TYPES)[number];
}>;

export const ENTITY_TYPE_OPTIONS = [
  { label: 'Company', value: 'company' },
  { label: 'Government', value: 'government' },
  { label: 'Individual', value: 'individual' },
] as const satisfies ReadonlyArray<{
  label: string;
  value: (typeof ENTITY_TYPES)[number];
}>;

export const COUNTRIES_OPTIONS = [
  { label: 'United States', value: 'United States' },
  { label: 'Canada', value: 'Canada' },
  { label: 'Mexico', value: 'Mexico' },
] as const satisfies ReadonlyArray<{
  label: string;
  value: (typeof COUNTRIES)[number];
}>;

export const VEHICLE_FUEL_TYPE_OPTIONS = [
  { label: 'Diesel', value: 'diesel' },
  {
    label: 'Gasoline',
    value: 'gasoline',
    message:
      'Gasoline vehicles are exempt from Clean Truck Check. No reporting is required. If this vehicle is already in your account, please deactivate it to avoid compliance errors.',
  },
  {
    label: 'Electric',
    value: 'electric',
    message:
      'Zero-emission electric vehicles are exempt from Clean Truck Check. No reporting is required. If this vehicle is already in your account, please deactivate it.',
  },
  { label: 'Alternative Fuel Hybrid', value: 'alternative_fuel_hybrid' },
  {
    label: 'Converted to Electric',
    value: 'converted_to_electric',
    message:
      'Vehicles converted to electric power are exempt from Clean Truck Check. No reporting is required. If this vehicle is already in your account, please deactivate it.',
  },
  {
    label: 'Converted to Gasoline',
    value: 'converted_to_gasoline',
    message:
      'Vehicles converted to gasoline are exempt from Clean Truck Check. No reporting is required. If this vehicle is already in your account, please deactivate it.',
  },
  { label: 'Diesel Hybrid', value: 'diesel_hybrid' },
  { label: 'Ethanol', value: 'ethanol' },
  {
    label: 'Hydrogen',
    value: 'hydrogen',
    message:
      'Hydrogen fuel cell vehicles are exempt from Clean Truck Check. No reporting is required. If this vehicle is already in your account, please deactivate it.',
  },
  { label: 'Methanol', value: 'methanol' },
  { label: 'Natural Gas (CNG/LNG)', value: 'natural_gas' },
  { label: 'Propane (LPG)', value: 'propane' },
] as const satisfies ReadonlyArray<{
  label: string;
  message?: string | undefined;
  value: (typeof VEHICLE_FUEL_TYPES)[number];
}>;

/** Shown when adding a vehicle whose fuel type is not eligible for Clean Truck Check reporting. */
export const INELIGIBLE_VEHICLE_FUEL_TYPE_FOR_CARB_MESSAGE =
  'Please add a vehicle that is compatible with CARB Clean Truck Check reporting. Vehicles with this fuel type are not eligible for this program.';

export function isVehicleFuelIneligibleForCarbReporting(
  fuelType: VehicleFuelType
): boolean {
  return VEHICLE_FUEL_TYPE_OPTIONS.some(
    option =>
      option.value === fuelType &&
      'message' in option &&
      typeof option.message === 'string' &&
      option.message.length > 0
  );
}

export const VEHICLE_OWNERSHIP_TYPE_OPTIONS = [
  { label: 'Owned', value: 'owned' },
  { label: 'Leased (Lessor)', value: 'leased_lessor' },
  { label: 'Leased (Lessee)', value: 'leased_lessee' },
  { label: 'Financed', value: 'financed' },
] as const satisfies ReadonlyArray<{
  label: string;
  value: (typeof VEHICLE_OWNERSHIP_TYPES)[number];
}>;

export const VEHICLE_TYPE_OPTIONS = [
  { label: 'Agriculture (Annual Test)', value: 'agricultural' },
  { label: 'Motor Home (CA Registered)', value: 'motor_home' },
  { label: 'School / Transit Bus', value: 'school_transit_bus' },
  { label: 'Emergency Vehicle (Exempt)', value: 'emergency_vehicle_exempt' },
  { label: 'Other', value: 'other' },
] as const satisfies ReadonlyArray<{
  label: string;
  value: (typeof VEHICLE_TYPES)[number];
}>;

export const VEHICLE_LOCATION_ADDRESS_OPTIONS = [
  { label: 'Same as Physical Address', value: 'same-as-physical-address' },
  { label: 'Add New Address', value: 'add-new-address' },
] as const satisfies ReadonlyArray<{
  label: string;
  value: (typeof VEHICLE_LOCATION_ADDRESSES)[number];
}>;

export const CANADIAN_PROVINCES_TERRITORIES_OPTIONS =
  CANADIAN_PROVINCES_TERRITORIES.map(territory => ({
    label: territory.name,
    value: territory.abbreviation,
  }));

export const MEXICO_PROVINCES_TERRITORIES_OPTIONS =
  MEXICO_PROVINCES_TERRITORIES.map(territory => ({
    label: territory.name,
    value: territory.abbreviation,
  }));

export const US_STATES_TERRITORIES_OPTIONS = US_STATES_TERRITORIES.map(
  territory => ({
    label: territory.name,
    value: territory.abbreviation,
  })
);
