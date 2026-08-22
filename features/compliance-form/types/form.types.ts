import type { FormSchema } from '../schemas';
import type { ZodTypeAny } from 'zod';

export interface StepDefinition {
  fields: ReadonlyArray<keyof FormSchema>;
  key: 1 | 2 | 3;
  label: string;
  schema: ZodTypeAny;
}

export type StepNumber = 1 | 2 | 3;
