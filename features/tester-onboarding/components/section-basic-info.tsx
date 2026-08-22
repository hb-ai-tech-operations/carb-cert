import {
  PREFERRED_CONTACT_OPTIONS,
  PUBLIC_NAME_PREFERENCE_OPTIONS,
  TESTER_BUSINESS_NAME_MAX,
  TESTER_EMAIL_MAX,
  TESTER_FULL_NAME_MAX,
  TESTER_PHONE_MAX,
} from '../constants';
import { SectionHeading } from './section-heading';

import type { TesterApplicationFieldsValues } from '../schema';
import type { Control } from 'react-hook-form';

import {
  InputEmail,
  InputSelect,
  InputTel,
  InputText,
} from '@/components/form';

interface SectionBasicInfoProps {
  control: Control<TesterApplicationFieldsValues>;
}

export const SectionBasicInfo = ({ control }: SectionBasicInfoProps) => (
  <fieldset className="flex flex-col gap-4">
    <SectionHeading title="Basic Information" />

    <div className="grid gap-4 sm:grid-cols-2 items-baseline">
      <InputText
        control={control}
        name="fullName"
        label="Full Name"
        placeholder="John Doe"
        required
        maxLength={TESTER_FULL_NAME_MAX}
      />
      <InputText
        control={control}
        name="businessName"
        label="Business Name"
        placeholder="Doe Emissions Testing LLC"
        required
        maxLength={TESTER_BUSINESS_NAME_MAX}
      />
    </div>

    <InputSelect
      control={control}
      name="publicNamePreference"
      label="Public Display Name"
      placeholder="Select display name"
      options={PUBLIC_NAME_PREFERENCE_OPTIONS}
      required
    />

    <div className="grid gap-4 sm:grid-cols-2 items-baseline">
      <InputTel
        control={control}
        name="phone"
        label="Phone Number"
        placeholder="(555) 123-4567"
        required
        maxLength={TESTER_PHONE_MAX}
      />
      <InputEmail
        control={control}
        name="email"
        label="Email Address"
        placeholder="you@business.com"
        required
        maxLength={TESTER_EMAIL_MAX}
      />
    </div>

    <InputSelect
      control={control}
      name="preferredContact"
      label="Preferred Contact Method"
      placeholder="Select contact method"
      options={PREFERRED_CONTACT_OPTIONS}
      required
    />
  </fieldset>
);
