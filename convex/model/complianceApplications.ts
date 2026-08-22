import type { Id } from '../_generated/dataModel';
import type { MutationCtx as MutationContext } from '../_generated/server';

interface ApplicationData {
  applicationType: string;
  billingAddress: string;
  billingCity: string;
  billingCountry: string;
  billingState: string;
  billingZipCode: string;
  doingBusinessAs?: string;
  emailAddress: string;
  entityName?: string;
  entityType: string;
  fullName: string;
  phone: string;
  physicalAddress: string;
  physicalCity: string;
  physicalCountry: string;
  physicalState: string;
  physicalZipCode: string;
}

interface VehicleData {
  address: string;
  city: string;
  clientId?: string;
  country: string;
  fuelType: string;
  licensePlate: string;
  locationAddress: string;
  make: string;
  model: string;
  ownershipType: string;
  registeredCountry: string;
  registeredState: string;
  state: string;
  vehicleType: string;
  vin: string;
  year: string;
  zipCode: string;
}

interface PaymentData {
  amount: number;
  cardBrand?: string;
  cardLast4?: string;
  currency: string;
  declineCode?: string;
  errorCode?: string;
  errorMessage?: string;
  status: string;
  stripePaymentIntentId: string;
}

export async function saveApplication(
  context: MutationContext,
  args: {
    application: ApplicationData;
    applicationId?: Id<'complianceApplications'>;
    vehicles: VehicleData[];
  }
): Promise<Id<'complianceApplications'>> {
  const { applicationId, application, vehicles } = args;

  let appId: Id<'complianceApplications'>;

  if (applicationId) {
    await context.db.patch(applicationId, application);
    appId = applicationId;

    const existing = await context.db
      .query('applicationVehicles')
      .withIndex('by_applicationId', q => q.eq('applicationId', applicationId))
      .collect();

    await Promise.all(existing.map(v => context.db.delete(v._id)));
  } else {
    appId = await context.db.insert('complianceApplications', {
      ...application,
      status: 'pending',
    });
  }

  await Promise.all(
    vehicles.map(vehicle =>
      context.db.insert('applicationVehicles', {
        applicationId: appId,
        ...vehicle,
      })
    )
  );

  return appId;
}

export async function recordPayment(
  context: MutationContext,
  args: {
    applicationId: Id<'complianceApplications'>;
    payment: PaymentData;
  }
) {
  const { applicationId, payment } = args;

  await context.db.insert('payments', {
    applicationId,
    ...payment,
    attemptedAt: Date.now(),
  });

  if (payment.status === 'succeeded') {
    await context.db.patch(applicationId, { status: 'paid' });
  }
}
