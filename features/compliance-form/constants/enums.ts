import { ALL_STATES_TERRITORIES } from '@/constants';

export const APPLICATION_TYPES = [
  'carb_certificate',
  'renew_certificate',
  'add_vehicle',
  'five_day_pass',
  'nst_response',
] as const;
export const ENTITY_TYPES = ['company', 'government', 'individual'] as const;
export const COUNTRIES = ['United States', 'Canada', 'Mexico'] as const;
export const VEHICLE_FUEL_TYPES = [
  'diesel',
  'gasoline',
  'electric',
  'alternative_fuel_hybrid',
  'converted_to_electric',
  'converted_to_gasoline',
  'diesel_hybrid',
  'hydrogen',
  'natural_gas',
  'propane',
  'methanol',
  'ethanol',
] as const;
export const VEHICLE_OWNERSHIP_TYPES = [
  'owned',
  'leased_lessor',
  'leased_lessee',
  'financed',
] as const;
export const VEHICLE_TYPES = [
  'agricultural',
  'motor_home',
  'school_transit_bus',
  'emergency_vehicle_exempt',
  'other',
] as const;
export const VEHICLE_LOCATION_ADDRESSES = [
  'same-as-physical-address',
  'add-new-address',
] as const;

// Type exports for enum values
export type ApplicationType = (typeof APPLICATION_TYPES)[number];
export type EntityType = (typeof ENTITY_TYPES)[number];
export type Country = (typeof COUNTRIES)[number];
export type VehicleFuelType = (typeof VEHICLE_FUEL_TYPES)[number];
export type VehicleOwnershipType = (typeof VEHICLE_OWNERSHIP_TYPES)[number];
export type VehicleType = (typeof VEHICLE_TYPES)[number];
export type VehicleLocationAddress =
  (typeof VEHICLE_LOCATION_ADDRESSES)[number];

export const STATE_ABBREVIATIONS = [
  ...ALL_STATES_TERRITORIES.map(state => state.abbreviation),
] as const satisfies readonly string[];
