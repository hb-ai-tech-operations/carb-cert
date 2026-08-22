import { v } from 'convex/values';

import { mutation, query } from './_generated/server';
import { publicTesterSlug } from './lib/testerPublicSlug';
import { saveTesterOnboarding } from './model/testerOnboardingApplications';

import type { Doc as Document_ } from './_generated/dataModel';

const applicationStatus = v.union(
  v.literal('pending'),
  v.literal('approved'),
  v.literal('rejected')
);

type PublicNamePreference = 'full_name' | 'business_name';
type TesterApplicationDocument = Document_<'testerOnboardingApplications'> & {
  publicNamePreference?: PublicNamePreference;
};

function resolvePublicNamePreference(
  app: Document_<'testerOnboardingApplications'>
): PublicNamePreference {
  const { publicNamePreference } = app as TesterApplicationDocument;
  return publicNamePreference === 'business_name'
    ? 'business_name'
    : 'full_name';
}

function isListedApproved(
  app: Document_<'testerOnboardingApplications'>
): boolean {
  return (
    (app.status ?? 'pending') === 'approved' && app.listOnWebsite === 'yes'
  );
}

function toPublicListedTester(app: Document_<'testerOnboardingApplications'>) {
  const slug = publicTesterSlug(app.fullName, app._id);
  return {
    slug,
    id: app._id,
    // eslint-disable-next-line no-underscore-dangle -- Convex document system field
    creationTime: app._creationTime,
    fullName: app.fullName,
    businessName: app.businessName,
    publicNamePreference: resolvePublicNamePreference(app),
    email: app.email,
    phone: app.phone,
    preferredContact: app.preferredContact,
    avatarSrc: app.avatarSrc ?? null,
    serviceArea: app.serviceArea,
    mobileTestingAvailable: app.mobileTestingAvailable,
    serviceRadius: app.serviceRadius ?? null,
    testsPerformed: app.testsPerformed,
    vehicleTypes: app.vehicleTypes,
    minimumGVWR: app.minimumGVWR,
    carbCredentialed: app.carbCredentialed,
    workingDays: app.workingDays,
    workingHours: app.workingHours,
    responseTime: app.responseTime,
    averageTestingPrice: app.averageTestingPrice ?? null,
    promoteServices: app.promoteServices,
    listOnWebsite: app.listOnWebsite,
    submittedAt: app.submittedAt,
  };
}

export const save = mutation({
  args: {
    // Basic Information
    fullName: v.string(),
    businessName: v.string(),
    publicNamePreference: v.union(
      v.literal('full_name'),
      v.literal('business_name')
    ),
    phone: v.string(),
    email: v.string(),
    preferredContact: v.string(),
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
  },
  handler: async (context, args) => await saveTesterOnboarding(context, args),
});

export const list = query({
  args: {},
  handler: async context => {
    const applications = await context.db
      .query('testerOnboardingApplications')
      .order('desc')
      .collect();

    return applications.map(app => ({
      id: app._id,
      // eslint-disable-next-line no-underscore-dangle -- Convex document system field
      creationTime: app._creationTime,
      fullName: app.fullName,
      businessName: app.businessName,
      publicNamePreference: resolvePublicNamePreference(app),
      email: app.email,
      phone: app.phone,
      preferredContact: app.preferredContact,
      carbCredentialed: app.carbCredentialed,
      status: app.status ?? 'pending',
      submittedAt: app.submittedAt,
    }));
  },
});

export const setApplicationStatus = mutation({
  args: {
    applicationId: v.id('testerOnboardingApplications'),
    status: applicationStatus,
  },
  handler: async (context, { applicationId, status }) => {
    const existing = await context.db.get(applicationId);
    if (!existing) {
      throw new Error('Application not found');
    }

    await context.db.patch(applicationId, { status });

    const updated = await context.db.get(applicationId);
    if (!updated) {
      return { publicListingPath: null };
    }

    const publicListingPath =
      status === 'approved' && updated.listOnWebsite === 'yes'
        ? `/testers/${publicTesterSlug(updated.fullName, updated._id)}`
        : null;

    return { publicListingPath };
  },
});

export const getById = query({
  args: { applicationId: v.id('testerOnboardingApplications') },
  handler: async (context, { applicationId }) => {
    const app = await context.db.get(applicationId);
    if (!app) {
      return null;
    }

    return {
      id: app._id,
      // eslint-disable-next-line no-underscore-dangle -- Convex document system field
      creationTime: app._creationTime,
      // Basic Information
      fullName: app.fullName,
      businessName: app.businessName,
      publicNamePreference: resolvePublicNamePreference(app),
      email: app.email,
      phone: app.phone,
      preferredContact: app.preferredContact,
      avatarSrc: app.avatarSrc ?? null,
      // Business Details
      serviceArea: app.serviceArea,
      mobileTestingAvailable: app.mobileTestingAvailable,
      serviceRadius: app.serviceRadius ?? null,
      // Testing Capability
      testsPerformed: app.testsPerformed,
      vehicleTypes: app.vehicleTypes,
      minimumGVWR: app.minimumGVWR,
      // Certification & Compliance
      carbCredentialed: app.carbCredentialed,
      // Availability & Operations
      workingDays: app.workingDays,
      workingHours: app.workingHours,
      responseTime: app.responseTime,
      // Pricing
      averageTestingPrice: app.averageTestingPrice ?? null,
      // Marketing & Growth
      promoteServices: app.promoteServices,
      listOnWebsite: app.listOnWebsite,
      // Meta
      status: app.status ?? 'pending',
      submittedAt: app.submittedAt,
    };
  },
});

/** Public directory: approved applications that opted in to be listed on the marketing site. */
export const listApprovedPublic = query({
  args: {},
  handler: async context => {
    const applications = await context.db
      .query('testerOnboardingApplications')
      .withIndex('by_status', q => q.eq('status', 'approved'))
      .collect();

    return applications
      .filter(isListedApproved)
      .map(toPublicListedTester)
      .sort((a, b) => b.submittedAt - a.submittedAt);
  },
});

const applicationFieldsArgs = {
  fullName: v.string(),
  businessName: v.string(),
  publicNamePreference: v.union(
    v.literal('full_name'),
    v.literal('business_name')
  ),
  phone: v.string(),
  email: v.string(),
  preferredContact: v.string(),
  serviceArea: v.string(),
  mobileTestingAvailable: v.string(),
  serviceRadius: v.optional(v.string()),
  testsPerformed: v.array(v.string()),
  vehicleTypes: v.array(v.string()),
  minimumGVWR: v.string(),
  carbCredentialed: v.string(),
  workingDays: v.array(v.string()),
  workingHours: v.string(),
  responseTime: v.string(),
  averageTestingPrice: v.optional(v.string()),
  promoteServices: v.string(),
  listOnWebsite: v.string(),
};

export const updateApplication = mutation({
  args: {
    applicationId: v.id('testerOnboardingApplications'),
    ...applicationFieldsArgs,
  },
  handler: async (context, { applicationId, ...fields }) => {
    const existing = await context.db.get(applicationId);
    if (!existing) {
      throw new Error('Application not found');
    }

    await context.db.patch(applicationId, {
      ...fields,
      serviceRadius: fields.serviceRadius?.trim() ?? undefined,
      averageTestingPrice: fields.averageTestingPrice?.trim() ?? undefined,
    });

    const updated = await context.db.get(applicationId);
    if (!updated) {
      return { publicListingPath: null };
    }

    const publicListingPath =
      (updated.status ?? 'pending') === 'approved' &&
      updated.listOnWebsite === 'yes'
        ? `/testers/${publicTesterSlug(updated.fullName, updated._id)}`
        : null;

    return { publicListingPath };
  },
});

export const setAvatarSource = mutation({
  args: {
    applicationId: v.id('testerOnboardingApplications'),
    avatarSrc: v.string(),
  },
  handler: async (context, { applicationId, avatarSrc }) => {
    const existing = await context.db.get(applicationId);
    if (!existing) {
      throw new Error('Application not found');
    }
    await context.db.patch(applicationId, { avatarSrc });
  },
});

export const getApprovedPublicBySlug = query({
  args: { slug: v.string() },
  handler: async (context, { slug }) => {
    const applications = await context.db
      .query('testerOnboardingApplications')
      .withIndex('by_status', q => q.eq('status', 'approved'))
      .collect();

    const match = applications.find(
      app =>
        isListedApproved(app) &&
        publicTesterSlug(app.fullName, app._id) === slug
    );

    return match ? toPublicListedTester(match) : null;
  },
});
