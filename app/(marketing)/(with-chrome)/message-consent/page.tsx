import Link from 'next/link';

import type { Metadata } from 'next';

import { Button } from '@/components/ui/button';
import { CONTACT_NAME, ROUTES } from '@/constants/app';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'SMS message consent & opt out',
  description:
    'Carb Cert SMS consent details, including message frequency, HELP instructions, and STOP opt-out. Consent is not required to use our filing service.',
  canonicalPath: ROUTES.MESSAGE_CONSENT,
  index: true,
});

export default function MessageConsentPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-24 md:pt-28">
      <div className="space-y-8">
        <header className="space-y-3">
          <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Optional SMS message consent
          </h1>
          <p className="text-muted-foreground text-pretty text-base md:text-lg">
            This page explains how {CONTACT_NAME} handles optional SMS text
            messages. You do not need to agree to receive SMS messages to use
            {CONTACT_NAME} or to complete your Clean Truck Check filing and
            payment.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Business identity</h2>
          <p className="text-muted-foreground text-pretty leading-relaxed">
            SMS messages are sent by or on behalf of {CONTACT_NAME} for the
            message types described on this page.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Standalone SMS consent</h2>
          <p className="text-muted-foreground text-pretty leading-relaxed">
            On the last step of the{' '}
            <Link
              href={ROUTES.COMPLIANCE_FORM}
              className="text-primary font-medium underline underline-offset-4 hover:no-underline"
            >
              compliance form
            </Link>
            , you may optionally agree to receive SMS text messages from{' '}
            {CONTACT_NAME} about your application, filing reminders, and related
            updates. This SMS consent is separate from the required Terms and
            Conditions checkbox. Leaving it unchecked does not affect your
            ability to pay or submit.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Message details</h2>
          <p className="text-muted-foreground text-pretty leading-relaxed">
            Message frequency varies based on your application status and
            filing activity. Message and data rates may apply. For help, reply
            HELP to any SMS message from {CONTACT_NAME}.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Opt out</h2>
          <p className="text-muted-foreground text-pretty leading-relaxed">
            You can opt out of optional SMS messages at any time by replying
            STOP to any SMS message from {CONTACT_NAME}. After you send STOP,
            we may send one final confirmation message to confirm that you have
            been unsubscribed.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Privacy and terms</h2>
          <p className="text-muted-foreground text-pretty leading-relaxed">
            SMS consent is used only for the message types described above. For
            more information, review our{' '}
            <Link
              href="/privacy-policy"
              className="text-primary font-medium underline underline-offset-4 hover:no-underline"
            >
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link
              href="/terms-and-conditions"
              className="text-primary font-medium underline underline-offset-4 hover:no-underline"
            >
              Terms and Conditions
            </Link>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Transactional messages</h2>
          <p className="text-muted-foreground text-pretty leading-relaxed">
            We may still send essential communications about your order or
            account, such as payment receipts or support replies.
          </p>
        </section>

        <div className="pt-2">
          <Button asChild>
            <Link href={ROUTES.COMPLIANCE_FORM}>Go to compliance form</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
