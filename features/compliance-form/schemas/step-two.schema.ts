import { z } from 'zod';

import { normalizeVin } from '../utils/vin';
import { vehicleSchema } from './vehicle.schema';

export const stepTwoSchema = z.object({
  vehicles: z
    .array(vehicleSchema)
    .min(1, { message: 'At least one vehicle is required' }),
}).superRefine(({ vehicles }, context) => {
  const seenVins = new Set<string>();
  let hasDuplicate = false;

  vehicles.forEach(vehicle => {
    const normalizedVin = normalizeVin(vehicle.vin);
    if (seenVins.has(normalizedVin)) {
      hasDuplicate = true;
      return;
    }
    seenVins.add(normalizedVin);
  });

  if (hasDuplicate) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Each vehicle must have a unique VIN.',
      path: ['vehicles'],
    });
  }
});

export type StepTwoSchema = z.infer<typeof stepTwoSchema>;
