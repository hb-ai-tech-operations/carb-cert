import { v } from 'convex/values';

import { mutation } from './_generated/server';
import { recordPayment, saveApplication } from './model/complianceApplications';

const vehicleValidator = v.object({
  clientId: v.optional(v.string()),
  vin: v.string(),
  year: v.string(),
  make: v.string(),
  model: v.string(),
  fuelType: v.string(),
  licensePlate: v.string(),
  registeredCountry: v.string(),
  registeredState: v.string(),
  ownershipType: v.string(),
  vehicleType: v.string(),
  locationAddress: v.string(),
  address: v.string(),
  city: v.string(),
  country: v.string(),
  state: v.string(),
  zipCode: v.string(),
});

const paymentValidator = v.object({
  stripePaymentIntentId: v.string(),
  status: v.string(),
  amount: v.number(),
  currency: v.string(),
  errorCode: v.optional(v.string()),
  declineCode: v.optional(v.string()),
  errorMessage: v.optional(v.string()),
  cardBrand: v.optional(v.string()),
  cardLast4: v.optional(v.string()),
});

const contactFields = {
  fullName: v.string(),
  emailAddress: v.string(),
  phone: v.string(),
  applicationType: v.string(),
  entityType: v.string(),
  entityName: v.optional(v.string()),
  doingBusinessAs: v.optional(v.string()),
  physicalAddress: v.string(),
  physicalCity: v.string(),
  physicalState: v.string(),
  physicalZipCode: v.string(),
  physicalCountry: v.string(),
};

const billingFields = {
  billingAddress: v.string(),
  billingCity: v.string(),
  billingState: v.string(),
  billingZipCode: v.string(),
  billingCountry: v.string(),
};

export const save = mutation({
  args: {
    applicationId: v.optional(v.id('complianceApplications')),
    ...contactFields,
    ...billingFields,
    vehicles: v.array(vehicleValidator),
  },
  handler: async (context, args) => {
    const { applicationId, vehicles, ...application } = args;
    return await saveApplication(context, {
      applicationId,
      application,
      vehicles,
      currentStep: 3,
      status: 'pending',
    });
  },
});

export const saveProgress = mutation({
  args: {
    applicationId: v.optional(v.id('complianceApplications')),
    currentStep: v.number(),
    ...contactFields,
    vehicles: v.optional(v.array(vehicleValidator)),
  },
  handler: async (context, args) => {
    const { applicationId, currentStep, vehicles, ...application } = args;
    return await saveApplication(context, {
      applicationId,
      application,
      vehicles,
      currentStep,
      status: 'draft',
    });
  },
});

export const recordPaymentAttempt = mutation({
  args: {
    applicationId: v.id('complianceApplications'),
    payment: paymentValidator,
  },
  handler: async (context, args) => {
    await recordPayment(context, args);
  },
});
