import Link from 'next/link';

import type { Metadata } from 'next';

import { CARB_COMPLIANCE_FEE_FORMATTED, CONTACT_EMAIL, CONTACT_NAME, CONTACT_PHONE, CONTACT_PHONE_WITHOUT_FORMAT, LEGAL_EFFECTIVE_DATE, PRICE_BASE_FORMATTED, WEBSITE_URL } from '@/constants/app';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Privacy Policy',
  description: `Privacy Policy for ${CONTACT_NAME} Clean Truck Check reporting assistance services.`,
  canonicalPath: '/privacy-policy',
});

interface PolicySubsection {
  description?: string;
  items?: string[];
  title: string;
}

interface PolicySection {
  addressLines?: string[];
  items?: string[];
  paragraphs?: string[];
  subsections?: PolicySubsection[];
  title: string;
}

const policySections: PolicySection[] = [
  {
    title: '1. Introduction',
    paragraphs: [
      `${CONTACT_NAME} operates the website ${WEBSITE_URL} ("${CONTACT_NAME}," "we," "us," or "our") and provides assistance services related to vehicle compliance reporting requirements under the California Air Resources Board (CARB) Clean Truck Check program.`,
      'This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website or use our services.',
      'By using our website or submitting your information, you agree to the practices described in this Privacy Policy.',
    ],
  },
  {
    title: '2. Independent Service Disclaimer',
    paragraphs: [
      `${CONTACT_NAME} is a private third-party service provider that assists customers with reporting and compliance support.`,
      'We are not affiliated with, endorsed by, or operated by the California Air Resources Board (CARB), the California Department of Motor Vehicles (DMV), or any government agency.',
      'Our services are limited to third-party reporting assistance through the Clean Truck Check - Vehicle Inspection System (CTC-VIS) used for CARB compliance reporting.',
      `The ${CARB_COMPLIANCE_FEE_FORMATTED} CARB compliance fee required by the state is included in our total service price of ${PRICE_BASE_FORMATTED} per vehicle.`,
      'Please note:',
    ],
    items: [
      `${CONTACT_NAME} does not perform emissions testing.`,
      'Emissions tests must be completed at CARB-authorized testing facilities.',
    ],
  },
  {
    title: '3. Information We Collect',
    subsections: [
      {
        title: 'Personal Information',
        items: [
          'Full name',
          'Business or company name',
          'Email address',
          'Phone number',
          'Mailing address',
          'Physical address',
          'Billing information',
          'Authorized representative or responsible official information',
        ],
      },
      {
        title: 'Vehicle and Compliance Information',
        description:
          'To prepare CARB filings or reports, we may collect vehicle information including:',
        items: [
          'Vehicle Identification Number (VIN)',
          'License plate number',
          'State of registration',
          'Vehicle make',
          'Vehicle model',
          'Model year',
          'Engine fuel type',
          'Vehicle location',
          'Fleet or ownership information',
          'Registered owner information',
          'Any additional data required for CARB compliance reporting',
        ],
      },
      {
        title: 'Automatically Collected Information',
        description: 'When you visit our website we may automatically collect:',
        items: [
          'Internet Protocol (IP) address',
          'Browser type and version',
          'Device type',
          'Pages visited',
          'Date and time of visit',
          'Time spent on pages',
          'Website interaction data',
        ],
      },
    ],
    paragraphs: [
      'To provide reporting and compliance assistance, we may collect the following information.',
      'This information helps us improve our website and services.',
    ],
  },
  {
    title: '4. Cookies',
    paragraphs: [
      'Cookies are small data files stored on your device that help improve website functionality and performance.',
      'We may use cookies to:',
      'You may disable cookies in your browser settings. However, some website features may not function properly without them.',
    ],
    items: [
      'Improve user experience',
      'Analyze website traffic',
      'Maintain security',
      'Remember user preferences',
    ],
  },
  {
    title: '5. How We Use Your Information',
    paragraphs: ['We use collected information to:'],
    items: [
      'Provide CARB reporting assistance services',
      'Prepare and submit compliance reports',
      'Communicate with customers',
      'Process orders and transactions',
      'Provide customer support',
      'Improve website functionality',
      'Prevent fraud or misuse',
      'Maintain internal records',
      'Comply with legal obligations',
    ],
  },
  {
    title: '6. Information Sharing',
    paragraphs: [
      'We do not sell personal information.',
      'We may share your information only when necessary with:',
      'All third-party providers are expected to protect your information and use it only for the services they perform.',
    ],
    items: [
      'CARB systems such as CTC-VIS for reporting submissions',
      'Service providers assisting with website hosting, payments, customer support, or analytics',
      'Contractors or agents performing services on our behalf',
      'Legal authorities when required by law',
      'Professional advisors such as legal or accounting professionals',
    ],
  },
  {
    title: '7. Data Security',
    paragraphs: [
      'We take reasonable technical and administrative measures to protect your personal information.',
      'However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute protection.',
    ],
  },
  {
    title: '8. Data Retention',
    paragraphs: ['We retain information only as long as necessary to:'],
    items: [
      'Provide requested services',
      'Maintain records of submissions',
      'Meet legal and regulatory obligations',
      'Resolve disputes or enforce agreements',
    ],
  },
  {
    title: '9. California Privacy Rights',
    paragraphs: [
      'California residents may have certain privacy rights under the California Consumer Privacy Act (CCPA/CPRA), which may include:',
      'To submit a privacy request, contact us at:',
      'We may verify your identity before processing requests.',
    ],
    items: [
      'Requesting access to personal information',
      'Requesting correction of inaccurate information',
      'Requesting deletion of personal information',
      'Limiting certain uses of personal data',
    ],
    addressLines: [
      `Email: ${CONTACT_EMAIL}`,
      `Phone: ${CONTACT_PHONE}`,
    ],
  },
  {
    title: '10. Third-Party Links',
    paragraphs: [
      'Our website may contain links to third-party websites. We are not responsible for the privacy practices or policies of those external sites.',
    ],
  },
  {
    title: "11. Children's Privacy",
    paragraphs: [
      'Our services are not intended for individuals under the age of 13, and we do not knowingly collect personal information from children.',
    ],
  },
  {
    title: '12. Changes to This Privacy Policy',
    paragraphs: [
      'We may update this Privacy Policy periodically. Any changes will be posted on this page and will take effect immediately upon publication.',
    ],
  },
  {
    title: '13. Contact Us',
    paragraphs: ['If you have questions about this Privacy Policy, please contact:'],
    addressLines: [
      `${CONTACT_NAME}`,
      `Website: ${WEBSITE_URL}`,
      `Email: ${CONTACT_EMAIL}`,
      `Phone: ${CONTACT_PHONE}`,
    ],
  },
];

const PrivacyPolicyPage = () => {
  const renderAddressLine = (line: string) => {
    if (line.includes('Email:')) {
      return (
        <p className="text-lg font-medium tracking-tight font-anek-latin">
          Email:{' '}
          <Link className="underline font-semibold font-anek-latin tracking-tight text-blue-400 hover:text-blue-600" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </Link>
        </p>
      );
    }
    if (line.includes('Phone:')) {
      return (
        <p className="text-lg font-medium tracking-tight font-anek-latin">
          Phone:{' '}
          <Link className="underline font-semibold font-anek-latin tracking-tight text-blue-400 hover:text-blue-600" href={`tel:${CONTACT_PHONE_WITHOUT_FORMAT}`}>
            {CONTACT_PHONE}
          </Link>
        </p>
      );
    }

    if (line.includes('Website:')) {
      return (
        <p className="text-lg font-medium tracking-tight font-anek-latin">
          Website:{' '}
          <Link className="underline font-semibold font-anek-latin tracking-tight text-blue-400 hover:text-blue-600" href="/">
            {WEBSITE_URL}
          </Link>
        </p>
      );
    }

    return <p className="text-lg font-medium tracking-tight font-anek-latin">{line}</p>;
  };

  return (
    <article className="space-y-8 mx-auto max-w-6xl px-4 pt-28">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Privacy Policy
        </h1>
        <p className="text-lg font-medium tracking-tight font-anek-latin">{CONTACT_NAME}</p>
        <p className="text-lg font-medium tracking-tight font-anek-latin">
          Website:{' '}
          <Link className="underline font-semibold font-anek-latin tracking-tight text-blue-400 hover:text-blue-600" href="/">
            {WEBSITE_URL}
          </Link>
        </p>
        <p className="text-lg font-medium tracking-tight font-anek-latin">Effective Date: {LEGAL_EFFECTIVE_DATE}</p>
      </header>

      {policySections.map((section) => (
        <section key={section.title} className="space-y-3">
          <h2 className="text-2xl font-semibold">{section.title}</h2>

          {section.paragraphs?.map((paragraph) => (
            <p className="text-lg font-medium tracking-tight font-anek-latin" key={paragraph}>{paragraph}</p>
          ))}

          {section.items ? (
            <ul className="list-disc space-y-1 pl-6 text-lg font-medium tracking-tight font-anek-latin">
              {section.items.map((item) => (
                <li className="text-lg font-medium tracking-tight font-anek-latin" key={item}>{item}</li>
              ))}
            </ul>
          ) : null}

          {section.subsections?.map((subsection) => (
            <div key={subsection.title} className="space-y-3">
              <h3 className="text-xl font-medium">{subsection.title}</h3>
              {subsection.description ? <p className="text-lg font-medium tracking-tight font-anek-latin">{subsection.description}</p> : null}
              {subsection.items ? (
                <ul className="list-disc space-y-1 pl-6 text-lg font-medium tracking-tight font-anek-latin">
                  {subsection.items.map((item) => (
                    <li className="text-lg font-medium tracking-tight font-anek-latin" key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}

          {section.addressLines ? (
            <address className="not-italic space-y-1 text-lg font-medium tracking-tight font-anek-latin">
              {section.addressLines.map((line) => (
                <div className="text-lg font-medium tracking-tight font-anek-latin" key={line}>{renderAddressLine(line)}</div>
              ))}
            </address>
          ) : null}
        </section>
      ))}
    </article>
  );
};

export default PrivacyPolicyPage;