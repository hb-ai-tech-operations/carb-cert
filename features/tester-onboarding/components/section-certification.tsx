import { CARB_CREDENTIALED_OPTIONS } from '../constants';
import { SectionHeading } from './section-heading';

import type { TesterApplicationFieldsValues } from '../schema';
import type { Control } from 'react-hook-form';

import { InputSelect } from '@/components/form';

interface SectionCertificationProps {
  control: Control<TesterApplicationFieldsValues>;
}

export const SectionCertification = ({
  control,
}: SectionCertificationProps) => (
  <fieldset className="flex flex-col gap-4">
    <SectionHeading title="Certification & Compliance" />

    <InputSelect
      control={control}
      name="carbCredentialed"
      label="Are you a CARB Credentialed Tester?"
      placeholder="Select"
      options={CARB_CREDENTIALED_OPTIONS}
      required
    />
  </fieldset>
);
