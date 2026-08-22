import type { TesterApplicationFieldsValues } from '@/features/tester-onboarding/schema';

interface TesterApplicationDetail {
  averageTestingPrice: string | null;
  businessName: string;
  carbCredentialed: string;
  email: string;
  fullName: string;
  listOnWebsite: string;
  minimumGVWR: string;
  mobileTestingAvailable: string;
  phone: string;
  preferredContact: string;
  promoteServices: string;
  publicNamePreference: 'full_name' | 'business_name';
  responseTime: string;
  serviceArea: string;
  serviceRadius: string | null;
  testsPerformed: string[];
  vehicleTypes: string[];
  workingDays: string[];
  workingHours: string;
}

export function mapTesterDetailToFormValues(
  detail: TesterApplicationDetail
): TesterApplicationFieldsValues {
  return {
    fullName: detail.fullName,
    businessName: detail.businessName,
    publicNamePreference: detail.publicNamePreference,
    phone: detail.phone,
    email: detail.email,
    preferredContact: detail.preferredContact as TesterApplicationFieldsValues['preferredContact'],
    serviceArea: detail.serviceArea,
    mobileTestingAvailable: detail.mobileTestingAvailable as TesterApplicationFieldsValues['mobileTestingAvailable'],
    serviceRadius: detail.serviceRadius ?? '',
    testsPerformed: detail.testsPerformed as TesterApplicationFieldsValues['testsPerformed'],
    vehicleTypes: detail.vehicleTypes as TesterApplicationFieldsValues['vehicleTypes'],
    minimumGVWR: detail.minimumGVWR,
    carbCredentialed: detail.carbCredentialed as TesterApplicationFieldsValues['carbCredentialed'],
    workingDays: detail.workingDays as TesterApplicationFieldsValues['workingDays'],
    workingHours: detail.workingHours,
    responseTime: detail.responseTime as TesterApplicationFieldsValues['responseTime'],
    averageTestingPrice: detail.averageTestingPrice ?? '',
    promoteServices: detail.promoteServices as TesterApplicationFieldsValues['promoteServices'],
    listOnWebsite: detail.listOnWebsite as TesterApplicationFieldsValues['listOnWebsite'],
  };
}
