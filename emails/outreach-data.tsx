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

export interface OutreachDataEmailProps {
  last4VIN: string;
  name: string;
}

function OutreachDataFooter() {
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

export default function OutreachDataEmail({
  name,
  last4VIN,
}: OutreachDataEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Your vehicle may need a quick CARB compliance verification.
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
              Your vehicle (VIN ending{' '}
              <span className="font-mono text-sm font-medium tracking-wide text-gray-900">
                {last4VIN}
              </span>
              ) came up during a CARB data review and may require a quick
              verification.
            </Text>

            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              We&apos;ve seen several cases where trucks were unknowingly marked
              non-compliant or pending, which later caused penalties or
              registration delays.
            </Text>

            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              👉 Feel free to call or text me directly at{' '}
              <Link href="tel:+18882828755" className="text-blue-600">
                888-282-8755
              </Link>{' '}
              — I can quickly check the status and walk you through it.
            </Text>

            <Section className="mt-5 text-center">
              <Button
                href="https://www.carbcert.com"
                className="rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white"
              >
                Visit Carb Cert
              </Button>
            </Section>

            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              Takes just a couple of minutes.
            </Text>

            <Text className="m-0 mt-6 text-sm leading-6 text-gray-800">
              Best regards,
              <br />
              Dave
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

            <OutreachDataFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

OutreachDataEmail.PreviewProps = {
  name: 'Alex',
  last4VIN: '9186',
} satisfies OutreachDataEmailProps;
