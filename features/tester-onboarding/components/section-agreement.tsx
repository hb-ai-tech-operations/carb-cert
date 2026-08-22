import type { TesterOnboardingFormValues } from '../schema';
import type { Control } from 'react-hook-form';

import { InputCheckbox } from '@/components/form';

interface SectionAgreementProps {
  control: Control<TesterOnboardingFormValues>;
}

export const SectionAgreement = ({ control }: SectionAgreementProps) => (
  <fieldset className="flex flex-col gap-4 border-t pt-6">
    <InputCheckbox
      control={control}
      name="agreement"
      label={(
        <span className="text-sm leading-relaxed">
          I confirm that the information provided is accurate and I agree to
          receive customer requests from Carb Cert.
        </span>
      )}
      required
    />
  </fieldset>
);
