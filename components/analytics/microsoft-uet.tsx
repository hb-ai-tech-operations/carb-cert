import Script from 'next/script';

import { MICROSOFT_ADS_UET_TAG_ID } from '@/constants/analytics';

const UET_BOOTSTRAP = `(function(w,d,t,u,o){w[u]=w[u]||[];o.ts=(new Date).getTime();var n=d.createElement(t);n.src="https://bat.bing.net/bat.js?ti="+o.ti+("uetq"!=u?"&q="+u:"");n.async=1;n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&"loaded"!==s&&"complete"!==s||(o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad"),n.onload=n.onreadystatechange=null)};var i=d.getElementsByTagName(t)[0];i.parentNode.insertBefore(n,i);})(window,document,"script","uetq",{ti:"${MICROSOFT_ADS_UET_TAG_ID}",enableAutoSpaTracking:true});`;

export const MicrosoftUET = () => (
    <Script
      id="microsoft-uet"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: UET_BOOTSTRAP }}
    />
  )
