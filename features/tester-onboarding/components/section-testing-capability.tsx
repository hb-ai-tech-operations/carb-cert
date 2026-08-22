import {
  TESTER_GVWR_MAX,
  TESTS_PERFORMED_OPTIONS,
  VEHICLE_TYPE_OPTIONS,
} from '../constants';
import { SectionHeading } from './section-heading';

import type { TesterApplicationFieldsValues } from '../schema';
import type { Control } from 'react-hook-form';

import { InputCheckboxGroup, InputText } from '@/components/form';

interface SectionTestingCapabilityProps {
  control: Control<TesterApplicationFieldsValues>;
}

export const SectionTestingCapability = ({
  control,
}: SectionTestingCapabilityProps) => (
  <fieldset className="flex flex-col gap-4">
    <SectionHeading title="Testing Capability" />

    <InputCheckboxGroup
      control={control}
      name="testsPerformed"
      label="Which tests do you perform?"
      options={TESTS_PERFORMED_OPTIONS}
      required
    />

    <InputCheckboxGroup
      control={control}
      name="vehicleTypes"
      label="Vehicle Types You Handle"
      options={VEHICLE_TYPE_OPTIONS}
      required
    />

    <InputText
      control={control}
      name="minimumGVWR"
      label="Minimum GVWR You Support"
      placeholder="e.g., 14,000 lbs"
      required
      maxLength={TESTER_GVWR_MAX}
    />
  </fieldset>
);
