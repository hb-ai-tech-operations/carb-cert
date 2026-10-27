import type { FormSchema } from '../schemas';
import type { StepNumber } from '../types';
import type { DeepPartial } from 'react-hook-form';

const STORAGE_KEY = 'compliance-form-state';
/**
 * Client secret of the PaymentIntent being confirmed. Kept so an order can
 * still be finished if the page reloads mid-payment (e.g. mobile Safari
 * discarding the tab while the customer approves 3DS in their bank app).
 */
const PENDING_PAYMENT_KEY = 'compliance-form-pending-payment';

export interface PersistedState {
  applicationId?: string;
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
    sessionStorage.removeItem(PENDING_PAYMENT_KEY);
  } catch {
    // Storage unavailable
  }
};

export const savePendingPayment = (clientSecret: string): void => {
  try {
    sessionStorage.setItem(PENDING_PAYMENT_KEY, clientSecret);
  } catch {
    // Storage unavailable
  }
};

export const loadPendingPayment = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    return sessionStorage.getItem(PENDING_PAYMENT_KEY);
  } catch {
    return null;
  }
};
