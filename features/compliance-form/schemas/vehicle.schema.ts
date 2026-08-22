import { z } from 'zod';

import {
  COUNTRIES,
  STATE_ABBREVIATIONS,
  VEHICLE_FUEL_TYPES,
  VEHICLE_LOCATION_ADDRESSES,
  VEHICLE_OWNERSHIP_TYPES,
  VEHICLE_TYPES,
} from '../constants';
import {
  INVALID_VIN_FORMAT_MESSAGE,
  isValidVinFormat,
  normalizeVin,
  VIN_LENGTH,
} from '../utils/vin';
import { selectEnum } from './helpers';

const MAX_VEHICLE_YEAR_LENGTH = 4;
const MAX_VEHICLE_MAKE_LENGTH = 50;
const MAX_VEHICLE_MODEL_LENGTH = 50;

export const vehicleSchema = z.object({
  id: z.uuid(),
  vin: z
    .string()
    .trim()
    .transform(normalizeVin)
    .pipe(
      z
        .string()
        .length(VIN_LENGTH, { message: 'VIN must be exactly 17 characters' })
        .refine(isValidVinFormat, { message: INVALID_VIN_FORMAT_MESSAGE })
    ),
  year: z
    .string()
    .min(MAX_VEHICLE_YEAR_LENGTH, {
      message: 'Vehicle year must be at least 4 characters',
    })
    .max(4, { message: 'Vehicle year must be exactly 4 characters' })
    .regex(/^\d{4}$/, { message: 'Invalid vehicle year format' }),
  make: z
    .string()
    .min(2, { message: 'Vehicle make must be at least 2 characters' })
    .max(MAX_VEHICLE_MAKE_LENGTH, {
      message: 'Vehicle make must be at most 50 characters',
    })
    .regex(/^[\s'A-Za-z-]+$/, { message: 'Invalid vehicle make format' }),
  model: z
    .string()
    .min(2, { message: 'Vehicle model must be at least 2 characters' })
    .max(MAX_VEHICLE_MODEL_LENGTH, {
      message: 'Vehicle model must be at most 50 characters',
    }),
  fuelType: selectEnum(VEHICLE_FUEL_TYPES, 'Please select a fuel type'),
  licensePlate: z
    .string()
    .min(2, { message: 'License plate must be at least 2 characters' })
    .max(10, { message: 'License plate must be at most 10 characters' })
    .regex(/^[\d\sa-z-]+$/i, { message: 'Invalid license plate format' }),
  registeredCountry: z.preprocess(
    (v: unknown) => (v === '' ? undefined : v),
    z.enum(COUNTRIES, {
      message: 'Please select a country',
    })
  ),
  registeredState: z
    .string()
    .min(2, { message: 'State must be at least 2 characters' })
    .max(10, { message: 'State must be at most 10 characters' })
    .regex(/^[A-Za-z]+$/, { message: 'Invalid state format' }),
  ownershipType: selectEnum(
    VEHICLE_OWNERSHIP_TYPES,
    'Please select a vehicle ownership type'
  ),
  vehicleType: selectEnum(VEHICLE_TYPES, 'Please select a vehicle type'),
  locationAddress: selectEnum(
    VEHICLE_LOCATION_ADDRESSES,
    'Please select a location address'
  ),
  address: z
    .string()
    .min(2, { message: 'Address must be at least 2 characters' })
    .max(100, { message: 'Address must be at most 100 characters' }),
  city: z
    .string()
    .min(2, { message: 'City must be at least 2 characters' })
    .max(100, { message: 'City must be at most 100 characters' }),
  country: selectEnum(COUNTRIES, 'Please select a country'),
  state: selectEnum(
    STATE_ABBREVIATIONS as readonly [string, ...string[]],
    'Please select a state'
  ),
  zipCode: z
    .string()
    .min(5, { message: 'Zip code must be at least 5 characters' })
    .max(10, { message: 'Zip code must be at most 10 characters' }),
});

export type VehicleSchema = z.infer<typeof vehicleSchema>;
