import { createClient } from '@convex-dev/better-auth';
import { convex } from '@convex-dev/better-auth/plugins';
import { betterAuth, type BetterAuthOptions } from 'better-auth';

import { components } from '../_generated/api';
import authConfig from '../auth.config';
import { dashboardSignInAllowlistPlugin } from './dashboardSignInAllowlistPlugin';
import schema from './schema';

import type { DataModel } from '../_generated/dataModel';
import type { GenericCtx } from '@convex-dev/better-auth/utils';

// Better Auth Component
export const authComponent = createClient<DataModel, typeof schema>(
  components.betterAuth,
  {
    local: { schema },
    verbose: false,
  }
);

// Better Auth Options
export const createAuthOptions = (context: GenericCtx<DataModel>) =>
  ({
    appName: 'Carb Cert',
    baseURL: process.env.SITE_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    database: authComponent.adapter(context),
    emailAndPassword: {
      enabled: true,
      /** Users are provisioned in the database; public self-registration is disabled. */
      disableSignUp: true,
    },
    plugins: [dashboardSignInAllowlistPlugin(), convex({ authConfig })],
  }) satisfies BetterAuthOptions;

// For `auth` CLI
export const options = createAuthOptions({} as GenericCtx<DataModel>);

// Better Auth Instance
export const createAuth = (context: GenericCtx<DataModel>) =>
  betterAuth(createAuthOptions(context));
