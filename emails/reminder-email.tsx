import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

const PREFERENCES_URL = 'https://www.carbcert.com/email/preferences';
const SITE_URL = 'https://www.carbcert.com';

export interface ReminderEmailProps {
  /** From `signEmailPreferenceToken(email)` so the link is tied to the recipient */
  preferencesToken?: string;
  recipientName: string;
}

function ReminderFooter({ preferencesHref }: { preferencesHref: string; }) {
  return (
    <>
      <Hr className="my-6 border-gray-200" />
      <Text className="m-0 text-center text-xs leading-5 text-gray-400">
        Carb Cert — California truck compliance support. Reply to this message
        to contact us.
      </Text>
      <Text className="m-0 mt-3 text-center text-xs leading-5 text-gray-400">
        <Link className="text-gray-500 underline" href={preferencesHref}>
          Unsubscribe from reminder emails
        </Link>
      </Text>
    </>
  );
}

export default function ReminderEmail({
  preferencesToken,
  recipientName,
}: ReminderEmailProps) {
  const preferencesHref = preferencesToken
    ? `${PREFERENCES_URL}?token=${encodeURIComponent(preferencesToken)}`
    : PREFERENCES_URL;
  return (
    <Html>
      <Head />
      <Preview>
        Reminder: California Clean Truck Check (CTC) reporting is due this month.
      </Preview>
      <Tailwind>
        <Body className="mx-auto bg-gray-100 font-sans text-gray-800 p-2.5">
          <Container className="mx-auto my-8 max-w-xl bg-white p-6">
            <Section className="mb-6">
              <Heading className="m-0 mx-auto w-full text-center text-2xl font-bold text-blue-600">
                <Img
                  src="https://www.carbcert.com/logos/carb-cert-dark.png"
                  alt="Carb Cert"
                  width={112}
                  height={45}
                  className="mx-auto"
                />
              </Heading>
            </Section>
            <Hr className="my-6 border-gray-200" />
            <Text className="m-0 text-sm leading-6 text-gray-800">
              Hi {recipientName},
            </Text>
            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              Thank you again for your time earlier.
            </Text>
            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              This is a reminder that your California Clean Truck Check (CTC)
              compliance is due this month. Under CARB requirements, vehicles need
              to be reported correctly, fees paid, and any required emissions
              testing completed in the CTC-VIS system.
            </Text>
            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              We support reporting through the official CTC-VIS platform:
            </Text>
            <Text className="m-0 mt-2 text-sm leading-6 text-gray-800">
              • Vehicle information entered accurately in CTC-VIS
              <br />
              • Compliance fee handling (CARB fee included)
              <br />
              • Help with required steps and deadlines
              <br />• Written confirmation after your submission is complete
            </Text>
            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              Emissions testing, when required, must be done separately at a
              CARB-authorized testing facility.
            </Text>
            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              If you would like help, reply with your vehicle VIN and details,
              <br /> or call us at{' '}
              <Link
                href="tel:+18882828755"
                aria-label="Call Us"
                className="text-blue-600 "
              >
                (888) 282-8755
              </Link>
              .
            </Text>
            <Section className="mt-4 text-center">
              <Button
                href={SITE_URL}
                className="rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white"
              >
                Get started on Carb Cert
              </Button>
            </Section>
            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              If you have questions, we are happy to walk through the steps so
              everything is submitted correctly.
            </Text>
            <Text className="m-0 mt-6 text-sm leading-6 text-gray-800">
              Thank you,
              <br />
              Dave
              <br />
              Carb Cert
              <br />
              Phone:{' '}
              <Link
                href="tel:+18882828755"
                className="text-blue-600 "
              >
                (888) 282-8755
              </Link>
              <br />
              Email:{' '}
              <Link
                href="mailto:support@carbcert.com"
                className="text-blue-600 "
              >
                support@carbcert.com
              </Link>
              <br />
              Website:{' '}
              <Link
                href="https://www.carbcert.com"
                className="text-blue-600"
              >
                https://www.carbcert.com
              </Link>
            </Text>
            <ReminderFooter preferencesHref={preferencesHref} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

ReminderEmail.PreviewProps = {
  recipientName: 'John Doe',
} satisfies ReminderEmailProps;
