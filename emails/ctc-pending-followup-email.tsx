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

export interface CtcPendingFollowupEmailProps {
  /** From `signEmailPreferenceToken(email)` so the link is tied to the recipient */
  preferencesToken?: string;
  recipientName: string;
}

function CtcPendingFollowupFooter({
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

export default function CtcPendingFollowupEmail({
  preferencesToken,
  recipientName,
}: CtcPendingFollowupEmailProps) {
  const preferencesHref = preferencesToken
    ? `${PREFERENCES_URL}?token=${encodeURIComponent(preferencesToken)}`
    : PREFERENCES_URL;

  return (
    <Html>
      <Head />
      <Preview>
        Your California Clean Truck Check (CTC) compliance may still be pending.
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
              Our records indicate your California Clean Truck Check (CTC)
              compliance may still be pending.
            </Text>
            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              To avoid possible delays, penalties, or reporting issues, please
              complete your CTC-VIS submission as soon as possible.
            </Text>
            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              We can assist with:
            </Text>
            <Text className="m-0 mt-2 text-sm leading-6 text-gray-800">
              • CTC-VIS reporting
              <br />
              • CARB fee processing
              <br />• Compliance guidance
            </Text>
            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              Reply with your VIN and vehicle details or call us at{' '}
              <Link
                href="tel:+18882828755"
                aria-label="Call Carb Cert"
                className="text-blue-600 "
              >
                (888) 282-8755
              </Link>
              .
            </Text>
            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              Start here:
            </Text>
            <Section className="mt-4 text-center">
              <Button
                href={SITE_URL}
                className="rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white"
              >
                Get started on Carb Cert
              </Button>
            </Section>
            <Text className="m-0 mt-6 text-sm leading-6 text-gray-800">
              Thank you,
              <br />
              Carb Cert
              <br />
              <Link
                href="mailto:support@carbcert.com"
                className="text-blue-600 "
              >
                support@carbcert.com
              </Link>
            </Text>
            <CtcPendingFollowupFooter preferencesHref={preferencesHref} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

CtcPendingFollowupEmail.PreviewProps = {
  recipientName: 'John Doe',
} satisfies CtcPendingFollowupEmailProps;
