import { RESPONSE_TIME_OPTIONS, WORKING_DAY_OPTIONS } from '../constants';
import { SectionHeading } from './section-heading';
import { WorkingHoursRangeField } from './working-hours-range-field';

import type { TesterApplicationFieldsValues } from '../schema';
import type { Control } from 'react-hook-form';

import { InputCheckboxGroup, InputSelect } from '@/components/form';

interface SectionAvailabilityProps {
  control: Control<TesterApplicationFieldsValues>;
}

export const SectionAvailability = ({ control }: SectionAvailabilityProps) => (
  <fieldset className="flex flex-col gap-4">
    <SectionHeading
      title="Availability & Operations"
      description="Let us know when you're available to serve customers."
    />

    <InputCheckboxGroup
      control={control}
      name="workingDays"
      label="Working Days"
      options={WORKING_DAY_OPTIONS}
      required
    />

    <div className="grid gap-4 sm:grid-cols-1">
      <WorkingHoursRangeField<TesterApplicationFieldsValues>
        control={control}
        name="workingHours"
      />
      <InputSelect
        control={control}
        name="responseTime"
        label="How quickly can you handle a new request?"
        placeholder="Select response time"
        options={RESPONSE_TIME_OPTIONS}
        required
      />
    </div>
  </fieldset>
);
