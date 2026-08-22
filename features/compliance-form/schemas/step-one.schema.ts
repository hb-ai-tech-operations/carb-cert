import { z } from 'zod';

import {
  APPLICATION_TYPES,
  COUNTRIES,
  ENTITY_TYPES,
  STATE_ABBREVIATIONS,
} from '../constants';
import { selectEnum } from './helpers';

const MAX_NAME_LENGTH = 50;
const MAX_PHONE_LENGTH = 15;

export const stepOneSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: 'Full name must be at least 2 characters' })
      .max(MAX_NAME_LENGTH, {
        message: 'Full name must be at most 50 characters',
      })
      .regex(/^[\s'A-Za-z-]+$/, {
        message:
          'Full name can only contain letters, spaces, hyphens, and apostrophes',
      }),
    emailAddress: z
      .email({ message: 'Please enter a valid email address' })
      .max(100, { message: 'Email address must be at most 100 characters' }),
    phone: z
      .string()
      .min(10, { message: 'Phone number must be at least 10 characters' })
      .max(MAX_PHONE_LENGTH, {
        message: 'Phone number must be at most 15 characters',
      })
      .regex(/^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, {
        message: 'Please enter a valid phone number',
      }),
    applicationType: selectEnum(
      APPLICATION_TYPES,
      'Please select an application type'
    ),
    entityType: selectEnum(ENTITY_TYPES, 'Please select an entity type'),
    entityName: z
      .string()
      .max(MAX_NAME_LENGTH, {
        message: 'Entity name must be at most 50 characters',
      })
      .optional(),
    doingBusinessAs: z
      .string()
      .max(MAX_NAME_LENGTH, {
        message: 'Doing business as must be at most 50 characters',
      })
      .optional(),
    physicalAddress: z
      .string()
      .min(2, {
        message: 'Address must be filled out',
      })
      .max(100, {
        message: 'Address must be at most 100 characters',
      }),
    physicalCity: z
      .string()
      .min(2, {
        message: 'City must be filled out',
      })
      .max(100, {
        message: 'City must be at most 100 characters',
      }),
    physicalState: selectEnum(
      STATE_ABBREVIATIONS as readonly [string, ...string[]],
      'Please select a state'
    ),
    physicalZipCode: z
      .string()
      .min(5, {
        message: 'Zip code must be filled out',
      })
      .max(10, {
        message: 'Zip code must be at most 10 characters',
      }),
    physicalCountry: selectEnum(COUNTRIES, 'Please select a country'),
  })
  .superRefine((data, context) => {
    if (data.entityType === 'individual') {
      return;
    }

    const entityName = data.entityName?.trim();

    if (!entityName) {
      context.addIssue({
        code: 'custom',
        message: 'Entity name is required for company and government entities',
        path: ['entityName'],
      });
      return;
    }

    if (entityName.length < 2) {
      context.addIssue({
        code: 'custom',
        message: 'Entity name must be at least 2 characters',
        path: ['entityName'],
      });
      return;
    }

    if (!/^[\s'A-Za-z-]+$/.test(entityName)) {
      context.addIssue({
        code: 'custom',
        message:
          'Entity name can only contain letters, spaces, hyphens, and apostrophes',
        path: ['entityName'],
      });
    }
  });

export type StepOneSchema = z.infer<typeof stepOneSchema>;
