import {
  Body,
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

export interface NonCompliantVinFollowupEmailProps {
  /** From `signEmailPreferenceToken(email)` so the link is tied to the recipient */
  preferencesToken?: string;
  recipientName: string;
  /** Vehicle identification number checked in CARB (typically 17 characters) */
  vin: string;
}

function NonCompliantVinFollowupFooter({
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

export default function NonCompliantVinFollowupEmail({
  preferencesToken,
  recipientName,
  vin,
}: NonCompliantVinFollowupEmailProps) {
  const preferencesHref = preferencesToken
    ? `${PREFERENCES_URL}?token=${encodeURIComponent(preferencesToken)}`
    : PREFERENCES_URL;
  return (
    <Html>
      <Head />
      <Preview>
        We checked VIN {vin} in the CARB system; your vehicle currently shows as
        non-compliant.
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
              We checked your vehicle in the CARB system using VIN{' '}
              <span className="font-mono text-sm font-medium tracking-wide text-gray-900">
                {vin}
              </span>
              . It currently shows as non-compliant.
            </Text>
            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              This usually means one or more steps are pending, such as:
            </Text>
            <Text className="m-0 mt-2 text-sm leading-6 text-gray-800">
              • Reporting not completed correctly
              <br />
              • Compliance fee not processed
              <br />• Emissions test still required
            </Text>
            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              Operating with a non-compliant status can lead to penalties or
              issues.
            </Text>
            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              We can help you fix this quickly.
            </Text>
            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              Reply to this message with the word YES and we will guide you
              step-by-step.
            </Text>
            <Text className="m-0 mt-3 text-sm leading-6 text-gray-800">
              Or visit{' '}
              <Link
                href="https://www.carbcert.com"
                className="text-blue-600 "
              >
                carbcert.com
              </Link>{' '}
              to get started.
            </Text>
            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              If easier, you can also call us at{' '}
              <Link
                href="tel:+18882828755"
                aria-label="Call Carb Cert"
                className="text-blue-600 "
              >
                (888) 282-8755
              </Link>
              .
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
            <NonCompliantVinFollowupFooter preferencesHref={preferencesHref} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

NonCompliantVinFollowupEmail.PreviewProps = {
  recipientName: 'John Doe',
  vin: '1HGBH41JXMN109186',
} satisfies NonCompliantVinFollowupEmailProps;
