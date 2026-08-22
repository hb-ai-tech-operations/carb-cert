import type { Id } from '@/convex/_generated/dataModel';

/**
 * Shape returned by `testerOnboardingApplications.listApprovedPublic` and
 * `getApprovedPublicBySlug` (approved + listOnWebsite === "yes" only).
 */
export interface PublicListedTesterApplication {
  avatarSrc: string | null;
  averageTestingPrice: string | null;
  businessName: string;
  carbCredentialed: string;
  creationTime: number;
  email: string;
  fullName: string;
  id: Id<'testerOnboardingApplications'>;
  listOnWebsite: string;
  mobileTestingAvailable: string;
  phone: string;
  preferredContact: string;
  promoteServices: string;
  publicNamePreference: 'full_name' | 'business_name';
  responseTime: string;
  serviceArea: string;
  serviceRadius: string | null;
  slug: string;
  submittedAt: number;
  testsPerformed: string[];
  vehicleTypes: string[];
  workingDays: string[];
  workingHours: string;
}
