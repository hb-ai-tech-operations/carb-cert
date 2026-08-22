import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

import { formatCurrency } from '@/lib';

export interface InvoiceLineItem {
  item: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceProps {
  billingAddress: {
    address: string;
    city: string;
    country: string;
    state: string;
    zip: string;
  };
  customerName?: string;
  invoiceDate: string;
  invoiceNumber: string;
  orderSummary: InvoiceLineItem[];
  paymentIntentId?: string;
}

function lineTotal(quantity: number, unitPriceCents: number): number {
  return quantity * unitPriceCents;
}

function OrderSummaryTable({
  orderSummary,
  totalCents,
}: {
  orderSummary: InvoiceProps['orderSummary'];
  totalCents: number;
}) {
  return (
    <Section className="border border-gray-200 bg-gray-50 p-4">
      {orderSummary.map((line) => {
        const total = lineTotal(line.quantity, line.unitPrice);
        const desc =
          line.quantity > 1
            ? `${line.item} × ${line.quantity} @ ${formatCurrency(line.unitPrice, true)}`
            : line.item;
        return (
          <Row key={line.item}>
            <Column className="border-b border-gray-100 py-2 text-left text-sm text-gray-700">
              {desc}
            </Column>
            <Column className="border-b border-gray-100 py-2 text-right text-sm font-medium text-gray-900">
              {formatCurrency(total, true)}
            </Column>
          </Row>
        );
      })}
      <Row>
        <Column className="border-t border-gray-200 pt-3 text-left text-base font-semibold text-gray-900">
          Total:
        </Column>
        <Column className="border-t border-gray-200 pt-3 text-right text-base font-semibold text-gray-900">
          {formatCurrency(totalCents, true)}
        </Column>
      </Row>
    </Section>
  );
}

export default function InvoiceEmail({
  invoiceNumber,
  invoiceDate,
  billingAddress,
  orderSummary,
  customerName,
  paymentIntentId,
}: InvoiceProps) {
  const totalCents = orderSummary.reduce(
    (sum, line) => sum + lineTotal(line.quantity, line.unitPrice),
    0
  );

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto bg-gray-100 font-sans text-gray-800 p-2.5">
          <Container className="mx-auto my-8 max-w-xl bg-white p-[20px]">
            <Section className="mb-6">
              <Heading className="m-0 mx-auto w-full text-center text-2xl font-bold text-blue-600">
                <Img src="https://www.carbcert.com/logos/carb-cert-dark.png" alt="Carb Cert Logo" width={112} height={45} className="mx-auto" />
              </Heading>
            </Section>
            <Hr className="my-6 border-gray-200" />
            <Section className="mb-6">
              <Row>
                <Column className="w-1/2 py-0 pr-2 text-sm text-gray-600">
                  <Text className="m-0 text-sm text-gray-600">
                    <span className="font-medium text-gray-800">Invoice # </span>
                    {invoiceNumber}
                  </Text>
                </Column>
                <Column className="w-1/2 py-0 pl-2 text-right text-sm text-gray-600">
                  <Text className="m-0 text-sm text-gray-600">
                    <span className="font-medium text-gray-800">Date </span>
                    {invoiceDate}
                  </Text>
                </Column>
              </Row>
              {paymentIntentId ? (
                <Row>
                  <Column className="w-full py-1 text-sm text-gray-500">
                    <Text className="m-0 text-sm text-gray-500">
                      <span className="font-medium text-gray-700">Payment ref: </span>
                      {paymentIntentId}
                    </Text>
                  </Column>
                </Row>
              ) : null}
            </Section>
            {customerName ? (
              <Section className="mb-4">
                <Heading
                  as="h2"
                  className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500"
                >
                  Bill to
                </Heading>
                <Text className="m-0 text-sm leading-relaxed text-gray-800">
                  {customerName}
                </Text>
              </Section>
            ) : null}
            <Section className="mb-6">
              <Heading
                as="h2"
                className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500"
              >
                Billing address
              </Heading>
              <Text className="m-0 text-sm leading-relaxed text-gray-800">
                {billingAddress.address}
                <br />
                {billingAddress.city}, {billingAddress.state} {billingAddress.zip}
                <br />
                {billingAddress.country}
              </Text>
            </Section>
            <Section className="mb-6">
              <Heading
                as="h2"
                className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500"
              >
                Order summary
              </Heading>
              <OrderSummaryTable orderSummary={orderSummary} totalCents={totalCents} />
            </Section>
            <Hr className="my-6 border-gray-200" />
            <Text className="m-0 text-center text-xs text-gray-400">
              Thank you for your payment. This invoice was generated by Carb Cert
              for emissions certification services.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

InvoiceEmail.PreviewProps = {
  invoiceNumber: '1234567890',
  invoiceDate: '2026-03-21',
  billingAddress: {
    address: '123 Main St',
    city: 'Anytown',
    country: 'USA',
    state: 'CA',
    zip: '12345',
  },
  orderSummary: [
    { item: 'Vehicle 1', quantity: 1, unitPrice: 10000 },
    { item: 'Vehicle 2', quantity: 1, unitPrice: 10000 },
  ],
  customerName: 'John Doe',
  paymentIntentId: '1234567890',
  to: 'test@test.com',
};