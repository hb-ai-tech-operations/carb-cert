import { v } from 'convex/values';

import { query } from './_generated/server';

// TODO: Add role-based access control for admin-only queries
export const listOrders = query({
  args: {},
  handler: async (context) => {
    const applications = await context.db
      .query('complianceApplications')
      .order('desc')
      .collect();

    return Promise.all(
      applications.map(async (app) => {
        const vehicles = await context.db
          .query('applicationVehicles')
          .withIndex('by_applicationId', (q) =>
            q.eq('applicationId', app._id)
          )
          .collect();

        const payments = await context.db
          .query('payments')
          .withIndex('by_applicationId', (q) =>
            q.eq('applicationId', app._id)
          )
          .collect();

        const latestPayment = payments.length > 0
          ? payments.reduce((latest, p) =>
              p.attemptedAt > latest.attemptedAt ? p : latest
            )
          : null;

        return {
          id: app._id,
          // eslint-disable-next-line no-underscore-dangle -- Convex document system field
          creationTime: app._creationTime,
          fullName: app.fullName,
          emailAddress: app.emailAddress,
          phone: app.phone,
          applicationType: app.applicationType,
          status: app.status ?? 'pending',
          vehicleCount: vehicles.length,
          paymentStatus: latestPayment?.status ?? null,
          paymentAmount: latestPayment?.amount ?? null,
        };
      })
    );
  },
});

export const getApplicationById = query({
  args: { applicationId: v.id('complianceApplications') },
  handler: async (context, { applicationId }) => {
    const application = await context.db.get(applicationId);
    if (!application) {
      return null;
    }

    const vehicles = await context.db
      .query('applicationVehicles')
      .withIndex('by_applicationId', (q) => q.eq('applicationId', applicationId))
      .collect();

    const paymentRows = await context.db
      .query('payments')
      .withIndex('by_applicationId', (q) => q.eq('applicationId', applicationId))
      .collect();

    const payments = [...paymentRows].sort(
      (first, second) => second.attemptedAt - first.attemptedAt
    );

    return {
      id: application._id,
      // eslint-disable-next-line no-underscore-dangle -- Convex document system field
      creationTime: application._creationTime,
      fullName: application.fullName,
      emailAddress: application.emailAddress,
      phone: application.phone,
      applicationType: application.applicationType,
      entityType: application.entityType,
      entityName: application.entityName ?? null,
      doingBusinessAs: application.doingBusinessAs ?? null,
      physicalAddress: application.physicalAddress,
      physicalCity: application.physicalCity,
      physicalState: application.physicalState,
      physicalZipCode: application.physicalZipCode,
      physicalCountry: application.physicalCountry,
      billingAddress: application.billingAddress ?? null,
      billingCity: application.billingCity ?? null,
      billingState: application.billingState ?? null,
      billingZipCode: application.billingZipCode ?? null,
      billingCountry: application.billingCountry ?? null,
      currentStep: application.currentStep ?? null,
      status: application.status ?? 'pending',
      vehicles: vehicles.map((vehicle) => ({
        id: vehicle._id,
        vin: vehicle.vin,
        year: vehicle.year,
        make: vehicle.make,
        model: vehicle.model,
        fuelType: vehicle.fuelType,
        licensePlate: vehicle.licensePlate,
        registeredCountry: vehicle.registeredCountry,
        registeredState: vehicle.registeredState,
        ownershipType: vehicle.ownershipType,
        vehicleType: vehicle.vehicleType,
        locationAddress: vehicle.locationAddress,
        address: vehicle.address,
        city: vehicle.city,
        state: vehicle.state,
        country: vehicle.country,
        zipCode: vehicle.zipCode,
      })),
      payments: payments.map((payment) => ({
        id: payment._id,
        stripePaymentIntentId: payment.stripePaymentIntentId,
        status: payment.status,
        amount: payment.amount,
        currency: payment.currency,
        attemptedAt: payment.attemptedAt,
        cardBrand: payment.cardBrand ?? null,
        cardLast4: payment.cardLast4 ?? null,
        errorMessage: payment.errorMessage ?? null,
      })),
    };
  },
});
