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

export interface RegistrationCertificateSentEmailProps {
  /** Customer / recipient display name */
  name: string;
  /** Vehicle identification number */
  vin: string;
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

export default function RegistrationCertificateSentEmail({
  name,
  vin,
}: RegistrationCertificateSentEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Your Clean Truck Check certificate for VIN {vin} has been processed and
        sent.
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
              Hello {name},
            </Text>

            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              Your <strong className="text-gray-900">Clean Truck Check</strong>{' '}
              certificate for VIN{' '}
              <strong className="font-mono text-xs text-gray-900">{vin}</strong>{' '}
              has been successfully processed and sent to your email.
            </Text>

            <Section className="mt-6 border-l-4 border-amber-500 bg-amber-50 py-3 pl-4 pr-3">
              <Text className="m-0 text-sm font-semibold leading-6 text-gray-900">
                Important - Next Step Required
              </Text>
              <Text className="m-0 mt-2 text-sm leading-6 text-gray-800">
                Please note that the DMV will <strong>not</strong> automatically
                complete your registration or mail your tags. To finalize the
                process and receive your tags, we recommend visiting your local
                DMV office in person at your earliest convenience.
              </Text>
            </Section>

            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              What you should do:
            </Text>
            <Text className="m-0 mt-2 text-sm leading-6 text-gray-800">
              • Locate the certificate in your email
              <br />• Bring it with you to the DMV
              <br />• Complete the registration process to obtain your tags
            </Text>

            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              If you have any questions or need assistance at any point, feel
              free to reply to this email - our team is always happy to help.
            </Text>

            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              Thank you for choosing us. We appreciate the opportunity to assist
              you.
            </Text>

            <Text className="m-0 mt-6 text-sm leading-6 text-gray-800">
              Thank you,
              <br />
              Carb Cert
              <br />
              Phone:{' '}
              <Link href="tel:+18882828755" className="text-blue-600">
                (888) 282-8755
              </Link>
              <br />
              Email:{' '}
              <Link href="mailto:support@carbcert.com" className="text-blue-600">
                support@carbcert.com
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

RegistrationCertificateSentEmail.PreviewProps = {
  name: 'Alex',
  vin: '1RF120314Y1009012',
} satisfies RegistrationCertificateSentEmailProps;
