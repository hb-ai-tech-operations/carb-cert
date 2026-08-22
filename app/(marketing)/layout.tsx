import Script from 'next/script';

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

import { MicrosoftUET } from '@/components/analytics/microsoft-uet';
import { GA_MEASUREMENT_ID, GOOGLE_ADS_TAG_ID, GOOGLE_TAG_MANAGER_ID } from '@/constants/analytics';
import { buildSiteJsonLdGraphHtml } from '@/lib/seo/jsonld';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- JSON-LD requires raw script content
        dangerouslySetInnerHTML={{ __html: buildSiteJsonLdGraphHtml() }}
      />
      {children}
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      <GoogleTagManager gtmId={GOOGLE_TAG_MANAGER_ID} />
      <Script
        id="google-ads-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `gtag('config', '${GOOGLE_ADS_TAG_ID}');`,
        }}
      />
      <MicrosoftUET />
    </>
  );
}
