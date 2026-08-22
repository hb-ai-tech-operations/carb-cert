import { stepOneSchema, stepThreeSchema, stepTwoSchema } from '../schemas';

import type { StepDefinition } from './form.types';

export const stepDefinitions: readonly StepDefinition[] = [
  {
    key: 1,
    label: 'Contact Information',
    schema: stepOneSchema,
    fields: [
      'fullName',
      'emailAddress',
      'phone',
      'applicationType',
      'entityType',
      'entityName',
      'doingBusinessAs',
      'physicalAddress',
      'physicalCity',
      'physicalCountry',
      'physicalState',
      'physicalZipCode',
    ],
  },
  {
    key: 2,
    label: 'Vehicle Information',
    schema: stepTwoSchema,
    fields: ['vehicles'],
  },
  {
    key: 3,
    label: 'Payment',
    schema: stepThreeSchema,
    fields: [
      'billingAddress',
      'billingCity',
      'billingState',
      'billingZipCode',
      'billingCountry',
      'acceptTerms',
      'consentToMarketingMessages',
    ],
  },
] as const;
