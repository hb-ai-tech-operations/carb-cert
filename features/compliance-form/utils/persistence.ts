import type { FormSchema } from '../schemas';
import type { StepNumber } from '../types';
import type { DeepPartial } from 'react-hook-form';

const STORAGE_KEY = 'compliance-form-state';

export interface PersistedState {
  step: StepNumber;
  values: DeepPartial<FormSchema>;
}

export const loadPersistedState = (): PersistedState | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as PersistedState) : null;
  } catch {
    return null;
  }
};

export const savePersistedState = (state: PersistedState): void => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage quota exceeded or unavailable
  }
};

export const clearPersistedState = (): void => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage unavailable
  }
};
