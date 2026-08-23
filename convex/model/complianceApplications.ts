import type { Id } from '../_generated/dataModel';
import type { MutationCtx as MutationContext } from '../_generated/server';

interface ApplicationData {
  applicationType: string;
  billingAddress?: string;
  billingCity?: string;
  billingCountry?: string;
  billingState?: string;
  billingZipCode?: string;
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

function omitUndefined<T extends Record<string, unknown>>(value: T): T {
  return Object.fromEntries(
    Object.entries(value).filter(([, field]) => field !== undefined)
  ) as T;
}

function resolveStatus(
  existingStatus: string | undefined,
  requestedStatus: string
): string {
  if (existingStatus === 'paid' || requestedStatus === 'paid') {
    return 'paid';
  }
  if (existingStatus === 'pending' && requestedStatus === 'draft') {
    return 'pending';
  }
  return requestedStatus;
}

async function replaceVehicles(
  context: MutationContext,
  applicationId: Id<'complianceApplications'>,
  vehicles: VehicleData[]
) {
  const existing = await context.db
    .query('applicationVehicles')
    .withIndex('by_applicationId', q => q.eq('applicationId', applicationId))
    .collect();

  await Promise.all(existing.map(vehicle => context.db.delete(vehicle._id)));
  await Promise.all(
    vehicles.map(vehicle =>
      context.db.insert('applicationVehicles', {
        applicationId,
        ...vehicle,
      })
    )
  );
}

export async function saveApplication(
  context: MutationContext,
  args: {
    application: ApplicationData;
    applicationId?: Id<'complianceApplications'>;
    currentStep?: number;
    status?: string;
    vehicles?: VehicleData[];
  }
): Promise<Id<'complianceApplications'>> {
  const {
    applicationId,
    application,
    currentStep,
    status: requestedStatus = 'pending',
    vehicles,
  } = args;
  const now = Date.now();
  const fields = omitUndefined({
    ...application,
    currentStep,
    updatedAt: now,
  });

  let appId: Id<'complianceApplications'>;
  const existing = applicationId ? await context.db.get(applicationId) : null;

  if (existing && existing.status !== 'paid') {
    appId = existing._id;
    await context.db.patch(appId, {
      ...fields,
      status: resolveStatus(existing.status, requestedStatus),
    });
  } else {
    appId = await context.db.insert('complianceApplications', {
      ...fields,
      status: requestedStatus === 'paid' ? 'paid' : requestedStatus,
    });
  }

  if (vehicles) {
    await replaceVehicles(context, appId, vehicles);
  }

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
    await context.db.patch(applicationId, {
      status: 'paid',
      updatedAt: Date.now(),
    });
  }
}
