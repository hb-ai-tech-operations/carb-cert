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

export interface TesterAppointmentRequestEmailProps {
  address: string;
  appointmentDate: string;
  appointmentTime: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  testerName: string;
  testType?: 'obd' | 'ovi';
}

function AppointmentInfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Text className="m-0 mt-3 text-sm leading-6 text-gray-800">
      <strong>{label}:</strong> {value}
    </Text>
  );
}

export default function TesterAppointmentRequestEmail({
  testerName,
  fullName,
  email,
  phoneNumber,
  appointmentDate,
  appointmentTime,
  testType,
  address,
}: TesterAppointmentRequestEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        New appointment request from {fullName} for {appointmentDate} at{' '}
        {appointmentTime}.
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
              Hi {testerName},
            </Text>
            <Text className="m-0 mt-4 text-sm leading-6 text-gray-800">
              You received a new appointment request from Carb Cert.
            </Text>

            <Hr className="my-6 border-gray-200" />

            <Heading as="h2" className="m-0 text-base font-semibold text-gray-900">
              Customer details
            </Heading>
            <AppointmentInfoRow label="Full name" value={fullName} />
            <AppointmentInfoRow
              label="Email"
              value={email}
            />
            <AppointmentInfoRow label="Phone number" value={phoneNumber} />
            <AppointmentInfoRow label="Address" value={address} />

            <Hr className="my-6 border-gray-200" />

            <Heading as="h2" className="m-0 text-base font-semibold text-gray-900">
              Appointment details
            </Heading>
            <AppointmentInfoRow label="Preferred date" value={appointmentDate} />
            <AppointmentInfoRow label="Preferred time" value={appointmentTime} />
            <AppointmentInfoRow
              label="Test type"
              value={testType ? testType.toUpperCase() : 'Not specified'}
            />

            <Text className="m-0 mt-6 text-sm leading-6 text-gray-800">
              Please follow up directly with the customer to confirm availability.
            </Text>

            <Text className="m-0 mt-6 text-sm leading-6 text-gray-800">
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
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

TesterAppointmentRequestEmail.PreviewProps = {
  testerName: 'Alex',
  fullName: 'John Doe',
  email: 'john@example.com',
  phoneNumber: '(555) 123-4567',
  appointmentDate: '04/15/2026',
  appointmentTime: '10:30 AM',
  testType: 'obd',
  address: '123 Main St, Los Angeles, CA 90001',
} satisfies TesterAppointmentRequestEmailProps;
