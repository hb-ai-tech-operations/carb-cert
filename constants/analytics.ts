/** Google Analytics 4 measurement ID. */
export const GA_MEASUREMENT_ID = 'G-KZEGZF7FEV' as const;

/** Google Ads tag ID — loaded sitewide via gtag.js in the root layout. */
export const GOOGLE_ADS_TAG_ID = 'AW-18036832686' as const;

export const GOOGLE_TAG_MANAGER_ID = 'GTM-KDCMQST8' as const;

/** Google Ads — "Submit lead form" conversion `send_to` (Google tag + label). */
export const GOOGLE_ADS_LEAD_FORM_CONVERSION_SEND_TO =
  `${GOOGLE_ADS_TAG_ID}/sPbRCL3ms44cEK7z0JhD` as const;

/** Microsoft Ads (Bing) UET tag ID — loaded on marketing pages via bat.js. */
export const MICROSOFT_ADS_UET_TAG_ID = '97248594' as const;
