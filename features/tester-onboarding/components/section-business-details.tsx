import {
  MOBILE_TESTING_OPTIONS,
  TESTER_SERVICE_AREA_MAX,
  TESTER_SERVICE_RADIUS_MAX,
} from '../constants';
import { SectionHeading } from './section-heading';

import type { TesterApplicationFieldsValues } from '../schema';
import type { Control } from 'react-hook-form';

import { InputSelect, InputText, InputTextarea } from '@/components/form';

interface SectionBusinessDetailsProps {
  control: Control<TesterApplicationFieldsValues>;
}

export const SectionBusinessDetails = ({
  control,
}: SectionBusinessDetailsProps) => (
  <fieldset className="flex flex-col gap-4">
    <SectionHeading
      title="Business Details"
      description="Tell us where you operate so we can route the right leads to you."
    />

    <InputTextarea
      control={control}
      name="serviceArea"
      label="Business Address / Service Area"
      placeholder="e.g., Los Angeles, CA — ZIP codes 90001, 90002, 90003"
      required
      maxLength={TESTER_SERVICE_AREA_MAX}
      rows={3}
    />

    <div className="grid gap-4 sm:grid-cols-2 items-baseline">
      <InputSelect
        control={control}
        name="mobileTestingAvailable"
        label="Do you provide mobile testing?"
        placeholder="Select"
        options={MOBILE_TESTING_OPTIONS}
        required
      />
      <InputText
        control={control}
        name="serviceRadius"
        label="Service Radius (if mobile)"
        placeholder="e.g., 50 miles"
        maxLength={TESTER_SERVICE_RADIUS_MAX}
        description="Leave blank if not applicable"
      />
    </div>
  </fieldset>
);
