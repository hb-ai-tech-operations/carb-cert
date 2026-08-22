import {
  LIST_ON_WEBSITE_OPTIONS,
  PROMOTE_SERVICES_OPTIONS,
} from '../constants';
import { SectionHeading } from './section-heading';

import type { TesterApplicationFieldsValues } from '../schema';
import type { Control } from 'react-hook-form';

import { InputSelect } from '@/components/form';

interface SectionMarketingProps {
  control: Control<TesterApplicationFieldsValues>;
}

export const SectionMarketing = ({ control }: SectionMarketingProps) => (
  <fieldset className="flex flex-col gap-4">
    <SectionHeading
      title="Marketing & Growth"
      description="Get free visibility — let us promote your services to local truck owners."
    />

    <div className="grid gap-4 sm:grid-cols-2">
      <InputSelect
        control={control}
        name="promoteServices"
        label="Promote your services to local customers?"
        placeholder="Select"
        options={PROMOTE_SERVICES_OPTIONS}
        required
      />
      <InputSelect
        control={control}
        name="listOnWebsite"
        label="Listed on our website as a recommended tester?"
        placeholder="Select"
        options={LIST_ON_WEBSITE_OPTIONS}
        required
      />
    </div>
  </fieldset>
);
