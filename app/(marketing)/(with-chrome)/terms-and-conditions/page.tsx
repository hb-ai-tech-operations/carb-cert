import Link from 'next/link';

import type { Metadata } from 'next';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CARB_COMPLIANCE_FEE_FORMATTED, CONTACT_EMAIL, CONTACT_NAME, CONTACT_PHONE, CONTACT_PHONE_WITHOUT_FORMAT, LEGAL_EFFECTIVE_DATE, PRICE_BASE_FORMATTED, WEBSITE_URL } from '@/constants/app';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Terms and Conditions',
  description: `Terms and Conditions for ${CONTACT_NAME} third-party Clean Truck Check reporting assistance.`,
  canonicalPath: '/terms-and-conditions',
});

interface TermsSection {
  contactLines?: string[];
  items?: string[];
  paragraphs?: string[];
  title: string;
}

const termsSections: TermsSection[] = [
  {
    title: '1. Acceptance of Terms and Conditions',
    paragraphs: [
      `These Terms and Conditions ("Terms") govern your use of ${WEBSITE_URL} (the "Website"), which is operated under the ${CONTACT_NAME} brand.`,
      'By accessing or using this Website and our services, you confirm that you have read, understood, and agree to be bound by these Terms and Conditions at all times.',
      'If you do not agree with these Terms and Conditions, you should not use this Website or our services.',
    ],
  },
  {
    title: '2. Independent Service Provider Disclaimer',
    paragraphs: [
      `${CONTACT_NAME} is a private third-party service provider.`,
      'We are not affiliated with, endorsed by, or operated by the California Air Resources Board (CARB), the California Department of Motor Vehicles (DMV), or any government agency.',
      'Our services are limited to third-party reporting assistance for CARB compliance through the Clean Truck Check Vehicle Inspection System (CTC-VIS).',
      'Important information:',
      'Our role is limited to assisting with reporting and submission of compliance information.',
    ],
    items: [
      `The ${CARB_COMPLIANCE_FEE_FORMATTED} CARB compliance fee required by the state is included in our total service fee of ${PRICE_BASE_FORMATTED} per vehicle.`,
      `${CONTACT_NAME} does not perform emissions testing.`,
      'Emissions testing must be completed at CARB-authorized testing facilities.',
    ],
  },
  {
    title: '3. Intellectual Property',
    paragraphs: [
      `All content published and made available on this Website is the property of ${CONTACT_NAME} and its licensors. This includes but is not limited to:`,
      'You may not reproduce, distribute, modify, or use any content from this Website without written permission.',
    ],
    items: [
      'Website design',
      'Text',
      'Logos',
      'Graphics',
      'Images',
      'Documents',
      'Downloadable files',
      'Software',
      'Layout and structure',
    ],
  },
  {
    title: '4. Acceptable Use',
    paragraphs: [
      'By using this Website, you agree to use it only for lawful purposes.',
      'You agree not to:',
      'We reserve the right to suspend or terminate access to our Website if we believe a user has violated these Terms.',
    ],
    items: [
      'Use the Website for illegal purposes',
      'Submit false or misleading information',
      'Attempt to interfere with the operation of the Website',
      'Attempt to gain unauthorized access to our systems',
      'Engage in fraudulent activity',
      'Harass, abuse, or harm other users',
    ],
  },
  {
    title: '5. Customer Information',
    paragraphs: [
      'When submitting information through our Website, you agree that:',
      'Providing incorrect or misleading information may delay processing or result in rejection of submissions.',
    ],
    items: [
      'All information you provide is accurate and complete',
      'You are authorized to submit the vehicle and compliance information provided',
      'You will update information if it changes',
    ],
  },
  {
    title: '6. Services Provided',
    paragraphs: [
      `${CONTACT_NAME} provides third-party assistance services, including but not limited to:`,
      `${CONTACT_NAME} does not guarantee approval or compliance status, as final determinations are made by CARB and related regulatory systems.`,
    ],
    items: [
      'Clean Truck Check reporting assistance',
      'CARB compliance reporting support',
      'CTC-VIS reporting submissions',
      'Registration and compliance updates',
    ],
  },
  {
    title: '7. Service Fees',
    paragraphs: [
      `Our service fee is ${PRICE_BASE_FORMATTED} per vehicle submission, which includes:`,
      'All fees are displayed on the Website before purchase.',
      'Prices may change at any time without notice.',
    ],
    items: [
      `${CARB_COMPLIANCE_FEE_FORMATTED} CARB compliance fee`,
      'Service and processing fee for submission assistance',
    ],
  },
  {
    title: '8. Payments',
    paragraphs: [
      'We accept the following payment methods:',
      `By providing payment information, you authorize ${CONTACT_NAME} to charge the payment method for the total amount due.`,
      'If we suspect fraudulent or unauthorized payment activity, we reserve the right to cancel the transaction.',
    ],
    items: ['Credit Cards', 'Debit Cards'],
  },
  {
    title: '9. Order Processing',
    paragraphs: [
      'Once an order is submitted:',
      'Processing times may vary depending on system availability and the accuracy of the information provided.',
    ],
    items: [
      'Your information will be reviewed',
      'The reporting process may begin',
      'Submission may be made to the CARB reporting system',
    ],
  },
  {
    title: '10. Cancellation and Refund Policy',
    paragraphs: [
      'Orders cannot be canceled or refunded once processing has begun or the submission has been assigned to our processing team.',
      'Refunds may only be considered in limited situations, such as:',
      'Refund requests must be submitted by contacting our support team.',
    ],
    items: ['Duplicate orders', 'Technical errors', 'Payment processing mistakes'],
  },
  {
    title: '11. Limitation of Liability',
    paragraphs: [
      `To the maximum extent permitted by law, ${CONTACT_NAME} and its owners, employees, contractors, affiliates, and partners will not be liable for any damages, including but not limited to:`,
      'Our services are provided "as is" without warranties of any kind.',
    ],
    items: [
      'Loss of business',
      'Loss of profits',
      'Regulatory penalties',
      'Compliance delays',
      'Errors resulting from incorrect information provided by the user',
      'Website interruptions',
    ],
  },
  {
    title: '12. Indemnification',
    paragraphs: [
      `By using this Website, you agree to indemnify and hold harmless ${CONTACT_NAME}, including its owners, employees, contractors, affiliates, and agents from any claims, damages, liabilities, costs, or expenses arising from:`,
    ],
    items: [
      'Your use of the Website',
      'Your violation of these Terms',
      'Submission of inaccurate or unauthorized information',
      'Misuse of our services',
    ],
  },
  {
    title: '13. Third-Party Systems',
    paragraphs: [
      'Our services may interact with third-party government or regulatory systems, including the CARB Clean Truck Check Vehicle Inspection System (CTC-VIS).',
      'We do not control these systems and are not responsible for outages, delays, or changes in government processes.',
    ],
  },
  {
    title: '14. Consumer Protection',
    paragraphs: [
      'Nothing in these Terms limits rights you may have under applicable consumer protection laws, including California law.',
      'Where required by law, these Terms will be interpreted in compliance with those legal protections.',
    ],
  },
  {
    title: '15. Applicable Law',
    paragraphs: [
      'These Terms are governed by and interpreted according to the laws of the State of California, without regard to conflict of law principles.',
    ],
  },
  {
    title: '16. Severability',
    paragraphs: [
      'If any provision of these Terms is determined to be invalid or unenforceable, the remaining provisions will remain in full force and effect.',
    ],
  },
  {
    title: '17. Changes to These Terms',
    paragraphs: [
      `${CONTACT_NAME} may update these Terms and Conditions at any time.`,
      'Changes will be posted on this page and will become effective immediately upon publication.',
      'Your continued use of the Website after updates constitutes acceptance of the revised Terms.',
    ],
  },
  {
    title: '18. Contact Information',
    paragraphs: ['If you have questions about these Terms, please contact us:'],
    contactLines: [
      `${CONTACT_NAME}`,
      `Website: ${WEBSITE_URL}`,
      `Email: ${CONTACT_EMAIL}`,
      `Phone: ${CONTACT_PHONE}`,
    ],
  },
];

function renderContactLine(line: string) {
  if (line.startsWith('Email:')) {
    return (
      <p>
        Email:{' '}
        <Link className="underline font-semibold font-anek-latin tracking-tight text-blue-400 hover:text-blue-600" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </Link>
      </p>
    );
  }
  if (line.startsWith('Phone:')) {
    return (
      <p>
        Phone:{' '}
        <Link className="underline font-semibold font-anek-latin tracking-tight text-blue-400 hover:text-blue-600" href={`tel:${CONTACT_PHONE_WITHOUT_FORMAT}`}>
          {CONTACT_PHONE}
        </Link>
      </p>
    );
  }

  if (line.startsWith('Website:')) {
    return (
      <p>
        Website:{' '}
        <Link className="underline font-semibold font-anek-latin tracking-tight text-blue-400 hover:text-blue-600" href="/">
          {WEBSITE_URL}
        </Link>
      </p>
    );
  }

  return <p>{line}</p>;
}

function TermsAndConditionsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pt-28">
      <article className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Terms and Conditions
          </h1>
          <p className="text-lg font-medium tracking-tight font-anek-latin">Effective Date: {LEGAL_EFFECTIVE_DATE}</p>
          <p className="text-lg font-medium tracking-tight font-anek-latin">
            Website:{' '}
            <Link className="underline font-semibold font-anek-latin tracking-tight text-blue-400 hover:text-blue-600" href="/">
              {WEBSITE_URL}
            </Link>
          </p>
        </header>

        <Alert className="border border-amber-500/20 bg-amber-500/10 text-sm text-amber-900">
          <AlertTitle className="text-base font-medium md:text-lg">Important Service Disclaimer</AlertTitle>
          <AlertDescription className="text-base font-medium md:text-lg">
            {CONTACT_NAME} is a private third-party service provider and is not
            affiliated with CARB, DMV, or any government agency. The {CARB_COMPLIANCE_FEE_FORMATTED} CARB fee is included in our {PRICE_BASE_FORMATTED} total service fee per vehicle.
          </AlertDescription>
        </Alert>

        {termsSections.map((section) => (
          <section key={section.title} className="space-y-3">
            <h2 className="text-2xl font-semibold">{section.title}</h2>

            {section.paragraphs?.map((paragraph) => (
              <p className='text-lg font-medium tracking-tight font-anek-latin' key={paragraph}>{paragraph}</p>
            ))}

            {section.items ? (
              <ul className="list-disc space-y-1 pl-6 text-lg font-medium tracking-tight font-anek-latin">
                {section.items.map((item) => (
                  <li className="text-lg font-medium tracking-tight font-anek-latin" key={item}>{item}</li>
                ))}
              </ul>
            ) : null}

            {section.contactLines ? (
              <address className="not-italic space-y-1 text-lg font-medium tracking-tight font-anek-latin">
                {section.contactLines.map((line) => (
                  <div className="text-lg font-medium tracking-tight font-anek-latin" key={line}>{renderContactLine(line)}</div>
                ))}
              </address>
            ) : null}
          </section>
        ))}
      </article>
    </main>
  );
}

export default TermsAndConditionsPage;