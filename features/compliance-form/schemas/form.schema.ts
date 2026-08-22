import { type StepOneSchema, stepOneSchema } from './step-one.schema';
import { type StepThreeSchema, stepThreeSchema } from './step-three.schema';
import { type StepTwoSchema, stepTwoSchema } from './step-two.schema';

import type { z } from 'zod';

export const formSchema = stepOneSchema.and(stepTwoSchema).and(stepThreeSchema);

export type FormSchema = z.infer<typeof formSchema>;
export type FormSchemaInput = z.input<typeof formSchema>;
export type StepUnion = StepOneSchema | StepTwoSchema | StepThreeSchema;
