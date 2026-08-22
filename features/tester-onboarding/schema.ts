import { z } from 'zod';

import {
  TESTER_BUSINESS_NAME_MAX,
  TESTER_EMAIL_MAX,
  TESTER_FULL_NAME_MAX,
  TESTER_GVWR_MAX,
  TESTER_PHONE_MAX,
  TESTER_PRICING_MAX,
  TESTER_SERVICE_AREA_MAX,
  TESTER_SERVICE_RADIUS_MAX,
  TESTER_WORKING_HOURS_MAX,
} from './constants';

export const testerApplicationFieldsSchema = z.object({
  // Section 1: Basic Information
  fullName: z
    .string()
    .trim()
    .min(1, 'Full name is required')
    .max(TESTER_FULL_NAME_MAX),
  businessName: z
    .string()
    .trim()
    .min(1, 'Business name is required')
    .max(TESTER_BUSINESS_NAME_MAX),
  publicNamePreference: z.enum(['full_name', 'business_name'], {
    message: 'Select which name should be shown publicly',
  }),
  phone: z
    .string()
    .trim()
    .min(1, 'Phone number is required')
    .max(TESTER_PHONE_MAX),
  email: z.string().trim().email('Enter a valid email').max(TESTER_EMAIL_MAX),
  preferredContact: z.enum(['call', 'text', 'email', 'both'], {
    message: 'Select a preferred contact method',
  }),

  // Section 2: Business Details
  serviceArea: z
    .string()
    .trim()
    .min(1, 'Service area is required')
    .max(TESTER_SERVICE_AREA_MAX),
  mobileTestingAvailable: z.enum(['yes', 'no'], {
    message: 'Select whether you offer mobile testing',
  }),
  serviceRadius: z.string().trim().max(TESTER_SERVICE_RADIUS_MAX).optional(),

  // Section 3: Testing Capability
  testsPerformed: z
    .array(z.enum(['obd', 'ovi']))
    .min(1, 'Select at least one test type'),
  vehicleTypes: z
    .array(z.enum(['trucks', 'rvs', 'buses', 'all']))
    .min(1, 'Select at least one vehicle type'),
  minimumGVWR: z
    .string()
    .trim()
    .min(1, 'Minimum GVWR is required')
    .max(TESTER_GVWR_MAX),

  // Section 4: Certification & Compliance
  carbCredentialed: z.enum(['yes', 'no'], {
    message: 'Indicate your CARB credential status',
  }),

  // Section 5: Availability & Operations
  workingDays: z
    .array(
      z.enum([
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ])
    )
    .min(1, 'Select at least one working day'),
  workingHours: z
    .string()
    .trim()
    .min(1, 'Working hours are required')
    .max(TESTER_WORKING_HOURS_MAX),
  responseTime: z.enum(['same_day', 'within_24_hours', '2_3_days'], {
    message: 'Select your typical response time',
  }),

  // Section 6: Pricing
  averageTestingPrice: z.string().trim().max(TESTER_PRICING_MAX).optional(),

  // Section 7: Marketing & Growth
  promoteServices: z.enum(['yes', 'no'], {
    message: 'Select a promotion preference',
  }),
  listOnWebsite: z.enum(['yes', 'no'], {
    message: 'Select a listing preference',
  }),
});

export const testerOnboardingFormSchema = testerApplicationFieldsSchema.extend({
  agreement: z.literal(true, {
    message: 'You must agree to the terms to continue',
  }),
});

export type TesterApplicationFieldsValues = z.infer<
  typeof testerApplicationFieldsSchema
>;

export type TesterOnboardingFormValues = z.infer<
  typeof testerOnboardingFormSchema
>;
