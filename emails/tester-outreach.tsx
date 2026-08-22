import {
  Body, Button, Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text
} from '@react-email/components';

export interface TesterOutreachEmailProps {
  /** Tester / recipient display name */
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

export default function TesterOutreachEmail({ name }: TesterOutreachEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Partner with Carb Cert — connect with truck owners who need emissions
        testing in your area.
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
              I&apos;m reaching out from Carb Cert — we help truck owners
              complete their CARB compliance and registration. Many of our
              customers require emissions testing, and we are currently
              connecting them with certified testers in their local area.
            </Text>

            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              If you&apos;re interested, fill out a short form and we&apos;ll
              get you set up:
            </Text>

            <Section className="mt-4 text-center">
              <Button
                href="https://www.carbcert.com/carb-truck-tester-partnership"
                className="rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white"
              >
                Join the Tester Network
              </Button>
            </Section>

            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              We&apos;re onboarding a small number of testers to:
            </Text>
            <Text className="m-0 mt-2 text-sm leading-6 text-gray-800">
              • Receive customers who are actively looking for testing
              <br />
              • Get listed on our platform at no cost
              <br />• Reduce scheduling back-and-forth with a direct booking
              flow
            </Text>

            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              There is no upfront cost — we simply connect you with customers
              who need your service.
            </Text>

            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              You can also reply directly to this email if you have any
              questions — happy to chat.
            </Text>

            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              Looking forward to working together.
            </Text>

            <Text className="m-0 mt-6 text-sm leading-6 text-gray-800">
              Best regards,
              <br />
              Carb Cert
              <br />
              Phone:{' '}
              <Link href="tel:+18882828755" className="text-blue-600">
                (888) 282-8755
              </Link>
              <br />
              Website:{' '}
              <Link href="https://www.carbcert.com" className="text-blue-600">
                https://www.carbcert.com
              </Link>
            </Text>

            <EmailFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

TesterOutreachEmail.PreviewProps = {
  name: 'Alex',
} satisfies TesterOutreachEmailProps;
