import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

import { formatCurrency } from '@/lib';

export interface NewOrderVehicle {
  address: string;
  city: string;
  country: string;
  fuelType: string;
  licensePlate: string;
  make: string;
  model: string;
  ownershipType: string;
  state: string;
  vehicleType: string;
  vin: string;
  year: string;
  zipCode: string;
}

export interface NewOrderProps {
  applicant: {
    email: string;
    fullName: string;
    phone: string;
  };
  applicationId: string;
  billingAddress: {
    address: string;
    city: string;
    country: string;
    state: string;
    zipCode: string;
  };
  entity: {
    applicationType: string;
    doingBusinessAs?: string;
    entityName?: string;
    entityType: string;
  };
  payment: {
    amountCents: number;
    cardBrand?: string;
    cardLast4?: string;
    paymentIntentId: string;
  };
  physicalAddress: {
    address: string;
    city: string;
    country: string;
    state: string;
    zipCode: string;
  };
  vehicles: NewOrderVehicle[];
}

function AddressBlock({
  address,
  city,
  country,
  state,
  zipCode,
}: {
  address: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
}) {
  return (
    <Text className="m-0 text-sm text-gray-800">
      {address}
      <br />
      {city}, {state} {zipCode}
      <br />
      {country}
    </Text>
  );
}

function VehicleList({ vehicles }: { vehicles: NewOrderVehicle[]; }) {
  return (
    <>
      {vehicles.map((v, index) => (
        <Section
          key={v.vin}
          className="mb-4 border border-gray-200 bg-gray-50 p-3 text-sm"
        >
          <Text className="m-0 font-medium text-gray-900">
            #{index + 1} — {v.year} {v.make} {v.model}
          </Text>
          <Text className="m-0 mt-1 text-gray-700">
            VIN: {v.vin} · Plate: {v.licensePlate}
            <br />
            Fuel: {v.fuelType} · Type: {v.vehicleType} · Ownership: {v.ownershipType}
            <br />
            Location: {v.address}, {v.city}, {v.state} {v.zipCode}, {v.country}
          </Text>
        </Section>
      ))}
    </>
  );
}

export default function NewOrderEmail(props: NewOrderProps) {
  const {
    applicationId,
    applicant,
    billingAddress,
    entity,
    payment,
    physicalAddress,
    vehicles,
  } = props;

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto bg-gray-100 font-sans text-gray-800 p-2.5">
          <Container className="mx-auto my-8 max-w-xl bg-white p-6">
            <Section className="mb-6">
              <Heading className="m-0 mx-auto w-full text-center text-2xl font-bold text-blue-600">
                <Img src="https://www.carbcert.com/logos/carb-cert-dark.png" alt="Carb Cert Logo" width={112} height={45} className="mx-auto" />
              </Heading>
            </Section>
            <Hr className="my-6 border-gray-200" />
            <Text className="m-0 mt-2 text-start text-sm text-gray-500">
              <span className="font-medium text-gray-800">Application ID: </span> {applicationId}
            </Text>
            <Section className="mb-6">
              <Heading
                as="h2"
                className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500"
              >
                Applicant
              </Heading>
              <Text className="m-0 text-sm text-gray-800">
                {applicant.fullName}
                <br />
                {applicant.email}
                <br />
                {applicant.phone}
              </Text>
            </Section>
            <Section className="mb-6">
              <Heading
                as="h2"
                className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500"
              >
                Entity
              </Heading>
              <Text className="m-0 text-sm text-gray-800">
                Type: {entity.entityType} · Application: {entity.applicationType}
                {entity.entityName ? (
                  <>
                    <br />
                    Entity name: {entity.entityName}
                  </>
                ) : null}
                {entity.doingBusinessAs ? (
                  <>
                    <br />
                    DBA: {entity.doingBusinessAs}
                  </>
                ) : null}
              </Text>
            </Section>
            <Section className="mb-6">
              <Heading
                as="h2"
                className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500"
              >
                Physical address
              </Heading>
              <AddressBlock {...physicalAddress} />
            </Section>
            <Section className="mb-6">
              <Heading
                as="h2"
                className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500"
              >
                Billing address
              </Heading>
              <AddressBlock {...billingAddress} />
            </Section>
            <Section className="mb-6">
              <Heading
                as="h2"
                className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500"
              >
                Payment
              </Heading>
              <Text className="m-0 text-sm text-gray-800">
                Amount: {formatCurrency(payment.amountCents, true)}
                <br />
                Payment ID: {payment.paymentIntentId}
                {payment.cardLast4 ? (
                  <>
                    <br />
                    Card: {payment.cardBrand ?? 'Card'} •••• {payment.cardLast4}
                  </>
                ) : null}
              </Text>
            </Section>
            <Section className="mb-6">
              <Heading
                as="h2"
                className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500"
              >
                Vehicles ({vehicles.length})
              </Heading>
              <VehicleList vehicles={vehicles} />
            </Section>
            <Hr className="my-6 border-gray-200" />
            <Text className="m-0 text-center text-xs text-gray-400">
              This is an internal notification. New order submitted via Carb Cert compliance
              form.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

NewOrderEmail.PreviewProps = {
  applicationId: '1234567890',
  applicant: {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
  },
  entity: {
    entityType: 'Individual',
    applicationType: 'New Order',
  },
  physicalAddress: {
    address: '123 Main St',
    city: 'Anytown',
    country: 'USA',
    state: 'CA',
    zipCode: '12345',
  },
  billingAddress: {
    address: '123 Main St',
    city: 'Anytown',
    country: 'USA',
    state: 'CA',
    zipCode: '12345',
  },
  payment: {
    amountCents: 10000,
    paymentIntentId: '1234567890',
    cardBrand: 'Visa',
    cardLast4: '1234',
  },
  vehicles: [
    {
      vin: '1234567890',
      year: '2026',
      make: 'Ford',
      model: 'F-150',
      licensePlate: 'ABC123',
      fuelType: 'Gasoline',
      vehicleType: 'Home Motor',
      ownershipType: 'Owner',
      address: '123 California St',
      city: 'California',
      state: 'CA',
      zipCode: '12345',
      country: 'USA',
    },
  ],
};