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
const TESTERS_URL = 'https://www.carbcert.com/testers';

export interface VehicleTestingReminderEmailProps {
  /** From `signEmailPreferenceToken(email)` so the link is tied to the recipient */
  preferencesToken?: string;
  recipientName: string;
}

function VehicleTestingReminderFooter({
  preferencesHref,
}: {
  preferencesHref: string;
}) {
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

export default function VehicleTestingReminderEmail({
  preferencesToken,
  recipientName,
}: VehicleTestingReminderEmailProps) {
  const preferencesHref = preferencesToken
    ? `${PREFERENCES_URL}?token=${encodeURIComponent(preferencesToken)}`
    : PREFERENCES_URL;

  return (
    <Html>
      <Head />
      <Preview>
        Reminder: vehicle testing is still required to complete your registration
        process.
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
              This is a friendly reminder that your vehicle registration process
              is still pending because the required vehicle testing has not been
              completed yet.
            </Text>
            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              To avoid compliance issues or possible penalties, please schedule
              and complete the test as soon as possible.
            </Text>
            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              Once testing is done, please reply to this email with the test
              confirmation or certificate so we can help you complete the process
              quickly.
            </Text>
            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              If you need help finding a tester near your location, browse our
              certified testers directory or contact us.
            </Text>
            <Section className="mt-6 text-center">
              <Button
                href={TESTERS_URL}
                className="rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white"
              >
                Find a certified tester
              </Button>
            </Section>
            <Section className="mt-3 text-center">
              <Button
                href={SITE_URL}
                className="rounded-md bg-white px-6 py-3 text-sm font-medium text-blue-600 ring-1 ring-blue-600"
              >
                Visit www.carbcert.com
              </Button>
            </Section>
            <Text className="m-0 mt-4 text-center text-sm leading-6 text-gray-800">
              Questions? Call{' '}
              <Link
                href="tel:+18882828755"
                aria-label="Call Carb Cert"
                className="text-blue-600 "
              >
                (888) 282-8755
              </Link>{' '}
              or email{' '}
              <Link
                href="mailto:support@carbcert.com"
                className="text-blue-600 "
              >
                support@carbcert.com
              </Link>
              .
            </Text>
            <Text className="m-0 mt-6 text-sm leading-6 text-gray-800">
              Thank you,
              <br />
              CarbCert Support Team
              <br />
              <Link href={SITE_URL} className="text-blue-600 ">
                www.carbcert.com
              </Link>
            </Text>
            <VehicleTestingReminderFooter preferencesHref={preferencesHref} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

VehicleTestingReminderEmail.PreviewProps = {
  recipientName: 'John Doe',
} satisfies VehicleTestingReminderEmailProps;
