import { sendGAEvent } from '@next/third-parties/google';

import { GOOGLE_ADS_LEAD_FORM_CONVERSION_SEND_TO } from '@/constants/analytics';

/**
 * Fires the Google Ads “Submit lead form” conversion after a successful payment.
 * Equivalent to gtag('event', 'conversion', { send_to, value, currency }).
 */
export function trackLeadFormPaidConversion(valueUsd: number): void {
  sendGAEvent('event', 'conversion', {
    send_to: GOOGLE_ADS_LEAD_FORM_CONVERSION_SEND_TO,
    value: valueUsd,
    currency: 'USD',
  });
}
