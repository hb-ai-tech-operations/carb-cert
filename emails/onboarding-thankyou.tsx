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

export interface OnboardingThankYouEmailProps {
  businessName: string;
  name: string;
}

function EmailFooter() {
  return (
    <>
      <Hr className="my-6 border-gray-200" />
      <Text className="m-0 text-center text-xs leading-5 text-gray-400">
        Carb Cert — California truck compliance support. Reply to this message
        to contact us.
      </Text>
    </>
  );
}

export default function OnboardingThankYouEmail({
  name,
  businessName,
}: OnboardingThankYouEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Welcome to Carb Cert — your application for {businessName} has been
        received.
      </Preview>
      <Tailwind>
        <Body className="mx-auto bg-gray-100 p-2.5 font-sans text-gray-800">
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
              Hi {name},
            </Text>

            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              Thank you for applying to join the Carb Cert tester network. We
              have received the onboarding application for{' '}
              <strong>{businessName}</strong>.
            </Text>

            <Text className="m-0 mt-4 text-sm font-semibold leading-6 text-gray-800">
              What happens next?
            </Text>
            <Text className="m-0 mt-2 text-sm leading-6 text-gray-800">
              • Our team will review your information within 1–2 business days
              <br />
              • Once approved, you will start receiving testing leads in your
              service area
              <br />• We will reach out using your preferred contact method to
              confirm your listing details
            </Text>

            <Text className="m-0 mt-4 text-sm font-semibold leading-6 text-gray-800">
              As a Carb Cert tester, you will:
            </Text>
            <Text className="m-0 mt-2 text-sm leading-6 text-gray-800">
              • Receive customer testing requests directly
              <br />
              • Get listed on our platform as a recommended tester
              <br />• Gain free business visibility at no cost to you
            </Text>

            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              If you have any questions in the meantime, simply reply to this
              email or call us at{' '}
              <Link href="tel:+18882828755" className="text-blue-600">
                (888) 282-8755
              </Link>
              .
            </Text>

            <Text className="m-0 mt-6 text-sm leading-6 text-gray-800">
              Best regards,
              <br />
              The Carb Cert Team
              <br />
              Website:{' '}
              <Link href="https://www.carbcert.com" className="text-blue-600">
                www.carbcert.com
              </Link>
            </Text>

            <EmailFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

OnboardingThankYouEmail.PreviewProps = {
  name: 'Alex',
  businessName: 'Doe Emissions Testing LLC',
} satisfies OnboardingThankYouEmailProps;
