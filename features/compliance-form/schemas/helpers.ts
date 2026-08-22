import { z } from 'zod';

/**
 * Creates a Zod schema for validating enum/select values with custom error message.
 * Handles empty string, undefined, and invalid value cases.
 *
 * @param values - Readonly tuple of allowed enum values
 * @param message - Error message to display when validation fails
 * @returns Zod schema that validates against the provided enum values
 */
export const selectEnum = <T extends readonly [string, ...string[]]>(
  values: T,
  message: string
) =>
  z.preprocess(
    v => (v === '' ? undefined : v),
    z.any().superRefine((v, context) => {
      if (typeof v !== 'string' || !values.includes(v as T[number])) {
        context.addIssue({
          code: 'custom',
          message,
          path: [],
        });
      }
    })
  );
