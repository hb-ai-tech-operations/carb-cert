import type { Id } from '../_generated/dataModel';
import type { MutationCtx as MutationContext } from '../_generated/server';

interface TesterOnboardingData {
  // Pricing
  averageTestingPrice?: string;
  // Basic Information
  businessName: string;
  // Certification & Compliance
  carbCredentialed: string;
  email: string;
  fullName: string;
  // Marketing & Growth
  listOnWebsite: string;
  // Testing Capability
  minimumGVWR: string;
  // Business Details
  mobileTestingAvailable: string;
  phone: string;
  preferredContact: string;
  promoteServices: string;
  publicNamePreference: 'full_name' | 'business_name';
  // Availability & Operations
  responseTime: string;
  serviceArea: string;
  serviceRadius?: string;
  testsPerformed: string[];
  vehicleTypes: string[];
  workingDays: string[];
  workingHours: string;
}

export async function saveTesterOnboarding(
  context: MutationContext,
  data: TesterOnboardingData
): Promise<Id<'testerOnboardingApplications'>> {
  return await context.db.insert('testerOnboardingApplications', {
    ...data,
    status: 'pending',
    submittedAt: Date.now(),
  });
}
