import { type Country } from './enums';
import {
  CANADIAN_PROVINCES_TERRITORIES_OPTIONS,
  MEXICO_PROVINCES_TERRITORIES_OPTIONS,
  US_STATES_TERRITORIES_OPTIONS,
} from './form-options';

interface StateSelectOption {
  label: string;
  value: string;
}

interface StateFieldConfig {
  label: string;
  options: readonly StateSelectOption[];
  selectPlaceholder: string;
  textPlaceholder: string;
}

const DEFAULT_COUNTRY: Country = 'United States';

const STATE_FIELD_CONFIG: Record<Country, StateFieldConfig> = {
  'United States': {
    options: US_STATES_TERRITORIES_OPTIONS,
    label: 'State',
    selectPlaceholder: 'Select your state',
    textPlaceholder: 'Enter your state',
  },
  Canada: {
    options: CANADIAN_PROVINCES_TERRITORIES_OPTIONS,
    label: 'Province/Territory',
    selectPlaceholder: 'Select your state',
    textPlaceholder: 'Enter your state',
  },
  Mexico: {
    options: MEXICO_PROVINCES_TERRITORIES_OPTIONS,
    label: 'State',
    selectPlaceholder: 'Select your state',
    textPlaceholder: 'Enter your state',
  },
};

const getStateFieldConfig = (country?: Country): StateFieldConfig =>
  STATE_FIELD_CONFIG[country ?? DEFAULT_COUNTRY];

export { getStateFieldConfig };
export type { StateFieldConfig };
