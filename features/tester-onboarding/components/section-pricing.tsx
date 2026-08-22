import { TESTER_PRICING_MAX } from '../constants';
import { SectionHeading } from './section-heading';

import type { TesterApplicationFieldsValues } from '../schema';
import type { Control } from 'react-hook-form';

import { InputText } from '@/components/form';

interface SectionPricingProps {
  control: Control<TesterApplicationFieldsValues>;
}

export const SectionPricing = ({ control }: SectionPricingProps) => (
  <fieldset className="flex flex-col gap-4">
    <SectionHeading
      title="Pricing"
      description="Optional — sharing your pricing helps us qualify leads before they reach you."
    />

    <InputText
      control={control}
      name="averageTestingPrice"
      label="Average Price for Testing"
      placeholder="e.g., $150 per vehicle"
      maxLength={TESTER_PRICING_MAX}
    />
  </fieldset>
);
