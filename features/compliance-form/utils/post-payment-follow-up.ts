import type { Id } from '@/convex/_generated/dataModel';
import type { PaymentResult } from '@/features/compliance-form/hooks/use-payment';
import type { FormSchema } from '@/features/compliance-form/schemas';

import { sendInvoiceEmail } from '@/actions/send-invoice';
import { sendNewOrderNotification } from '@/actions/send-new-order-notification';
import { trackLeadFormPaidConversion } from '@/lib/analytics/google-ads-conversion';

type ApplicationPayload = Omit<
  FormSchema,
  'acceptTerms' | 'consentToMarketingMessages' | 'vehicles'
>;

export async function runPostPaymentFollowUp(params: {
  appId: Id<'complianceApplications'>;
  application: ApplicationPayload;
  cardBrand?: string;
  cardLast4?: string;
  data: FormSchema;
  paymentResult: PaymentResult;
  vehicles: FormSchema['vehicles'];
}): Promise<{ invoiceError?: string; invoiceSent: boolean }> {
  const {
    appId,
    application,
    cardBrand,
    cardLast4,
    data,
    paymentResult,
    vehicles,
  } = params;

  const amountCents = paymentResult.amount ?? 0;
  const valueUsd = amountCents > 0 ? amountCents / 100 : 1;
  trackLeadFormPaidConversion(valueUsd);

  const {
    emailAddress,
    fullName,
    billingAddress: billingAddr,
    billingCity,
    billingState,
    billingZipCode,
    billingCountry,
    phone,
  } = data;

  const vehicleCount = vehicles.length;
  const { ok: invoiceSent, error: invoiceError } = await sendInvoiceEmail({
    to: emailAddress,
    customerName: fullName,
    billingAddress: {
      address: billingAddr,
      city: billingCity,
      state: billingState,
      zip: billingZipCode,
      country: billingCountry,
    },
    vehicleCount,
    paymentIntentId: paymentResult.paymentIntentId,
  });

  await sendNewOrderNotification({
    applicationId: appId,
    applicant: {
      fullName,
      email: emailAddress,
      phone,
    },
    entity: {
      applicationType: application.applicationType as string,
      entityType: application.entityType as string,
      entityName: application.entityName as string,
      doingBusinessAs: application.doingBusinessAs as string,
    },
    physicalAddress: {
      address: application.physicalAddress as string,
      city: application.physicalCity as string,
      state: application.physicalState as string,
      zipCode: application.physicalZipCode as string,
      country: application.physicalCountry as string,
    },
    billingAddress: {
      address: billingAddr as string,
      city: billingCity,
      state: billingState as string,
      zipCode: billingZipCode as string,
      country: billingCountry as string,
    },
    payment: {
      amountCents: paymentResult.amount ?? 0,
      paymentIntentId: paymentResult.paymentIntentId ?? '',
      cardLast4,
      cardBrand,
    },
    vehicles: vehicles.map(
      ({
        vin,
        year,
        make,
        model,
        fuelType,
        licensePlate,
        ownershipType,
        vehicleType,
        address,
        city,
        state,
        zipCode,
        country,
      }) => ({
        vin,
        year,
        make,
        model,
        fuelType: fuelType as string,
        licensePlate,
        ownershipType: ownershipType as string,
        vehicleType: vehicleType as string,
        address: address as string,
        city,
        state: state as string,
        zipCode: zipCode as string,
        country: country as string,
      })
    ),
  });

  return { invoiceError, invoiceSent };
}
