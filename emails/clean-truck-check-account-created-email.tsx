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

/** Default Tableau public viz for CARB credentialed testers (override per send if needed). */
export const DEFAULT_TESTERS_SEARCH_URL =
  'https://public.tableau.com/shared/TKCPYM9FN?:display_count=n&:origin=viz_share_link';

export interface CleanTruckCheckAccountCreatedEmailProps {
  /** Customer / recipient display name */
  customerName: string;
  /** Full Entity ID as shown to the customer, e.g. `E255921` */
  entityId: string;
  /** URL to search for CARB credentialed testers */
  testersSearchUrl?: string;
  /** Recommended testing type label, e.g. `OVI (Opacity & Visual Inspection)` */
  testingType: string;
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

export default function CleanTruckCheckAccountCreatedEmail({
  customerName,
  entityId,
  testersSearchUrl = DEFAULT_TESTERS_SEARCH_URL,
  testingType,
  vin,
}: CleanTruckCheckAccountCreatedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Your Clean Truck Check account is ready — Entity ID {entityId}, next
        steps for testing.
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
              Hello {customerName},
            </Text>

            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              This is a confirmation that your Clean Truck Check account has
              been successfully created. Your Entity ID is{' '}
              <strong className="text-gray-900">{entityId}</strong>.
            </Text>

            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              To proceed with receiving the certificate, your vehicle must
              undergo testing. The recommended testing type for VIN{' '}
              <strong className="font-mono text-xs text-gray-900">{vin}</strong>{' '}
              is <strong className="text-gray-900">{testingType}</strong>.
            </Text>

            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              Use the link below to search for CARB Credentialed Testers nearest
              to you (you may also attach a tester contact list when sending).
            </Text>

            <Section className="my-6 text-center">
              <Button
                className="bg-blue-600 px-5 py-3 text-center text-sm font-medium text-white rounded-md"
                href={testersSearchUrl}
              >
                Search for testers near you
              </Button>
            </Section>

            <Text className="m-0 text-xs leading-5 text-gray-500">
              <Link href={testersSearchUrl} className="text-blue-600">
                {testersSearchUrl}
              </Link>
            </Text>

            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              After your vehicle is tested, it will take 1–5 business days to
              issue your certificate. Kindly inform us once testing is complete so
              we can ensure your certificate is sent within that timeframe.
            </Text>

            <Section className="mt-6 border-l-4 border-amber-500 bg-amber-50 py-3 pl-4 pr-3">
              <Text className="m-0 text-sm font-semibold leading-6 text-gray-900">
                Important
              </Text>
              <Text className="m-0 mt-2 text-sm leading-6 text-gray-800">
                DMV will <strong>not</strong> automatically complete registration
                or send your tags. We recommend handling registration in person
                with the DMV.
              </Text>
            </Section>

            <Text className="m-0 mt-6 text-sm leading-6 text-gray-800">
              It was a pleasure assisting you. If you need anything, please
              don&apos;t hesitate to reach out.
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
              <Link
                href="mailto:support@carbcert.com"
                className="text-blue-600"
              >
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

CleanTruckCheckAccountCreatedEmail.PreviewProps = {
  customerName: 'Alex',
  entityId: 'E255921',
  testersSearchUrl: DEFAULT_TESTERS_SEARCH_URL,
  testingType: 'OVI (Opacity & Visual Inspection)',
  vin: '1RF120314Y1009012',
} satisfies CleanTruckCheckAccountCreatedEmailProps;
