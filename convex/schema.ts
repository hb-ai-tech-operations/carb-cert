import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  complianceApplications: defineTable({
    // Applicant / Step 1
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
    // Billing / Step 3
    billingAddress: v.string(),
    billingCity: v.string(),
    billingState: v.string(),
    billingZipCode: v.string(),
    billingCountry: v.string(),
    // Scalability
    status: v.optional(v.string()),
  })
    .index('by_status', ['status'])
    .index('by_email', ['emailAddress']),

  applicationVehicles: defineTable({
    applicationId: v.id('complianceApplications'),
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
  })
    .index('by_applicationId', ['applicationId'])
    .index('by_vin', ['vin']),

  emailPreferences: defineTable({
    emailNormalized: v.string(),
    reminderOptOut: v.boolean(),
    updatedAt: v.number(),
  }).index('by_email', ['emailNormalized']),

  testerOnboardingApplications: defineTable({
    // Basic Information
    fullName: v.string(),
    businessName: v.string(),
    publicNamePreference: v.optional(
      v.union(v.literal('full_name'), v.literal('business_name'))
    ),
    phone: v.string(),
    email: v.string(),
    preferredContact: v.string(),
    avatarSrc: v.optional(v.string()),
    // Business Details
    serviceArea: v.string(),
    mobileTestingAvailable: v.string(),
    serviceRadius: v.optional(v.string()),
    // Testing Capability
    testsPerformed: v.array(v.string()),
    vehicleTypes: v.array(v.string()),
    minimumGVWR: v.string(),
    // Certification & Compliance
    carbCredentialed: v.string(),
    // Availability & Operations
    workingDays: v.array(v.string()),
    workingHours: v.string(),
    responseTime: v.string(),
    // Pricing
    averageTestingPrice: v.optional(v.string()),
    // Marketing & Growth
    promoteServices: v.string(),
    listOnWebsite: v.string(),
    // Meta
    status: v.optional(v.string()),
    submittedAt: v.number(),
  })
    .index('by_email', ['email'])
    .index('by_status', ['status']),

  /**
   * Outbound email audit trail: subject, channel, and time only (no body, no recipients).
   * Written from Next.js server actions via `emailSendLogs.append` when `EMAIL_SEND_LOG_SECRET` is set.
   */
  emailSendLogs: defineTable({
    subject: v.string(),
    sentAt: v.number(),
    provider: v.union(v.literal('smtp'), v.literal('resend')),
    /** SMTP Message-ID or Resend message id, when available */
    externalId: v.optional(v.string()),
  }).index('by_sentAt', ['sentAt']),

  payments: defineTable({
    applicationId: v.id('complianceApplications'),
    stripePaymentIntentId: v.string(),
    status: v.string(),
    amount: v.number(),
    currency: v.string(),
    errorCode: v.optional(v.string()),
    declineCode: v.optional(v.string()),
    errorMessage: v.optional(v.string()),
    cardBrand: v.optional(v.string()),
    cardLast4: v.optional(v.string()),
    attemptedAt: v.number(),
  })
    .index('by_applicationId', ['applicationId'])
    .index('by_paymentIntent', ['stripePaymentIntentId'])
    .index('by_status', ['status']),
});
