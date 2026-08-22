import { APIError, createAuthMiddleware } from 'better-auth/api';

import { isAllowedDashboardSignInEmail } from '../lib/dashboardSignInAllowlist';

import type { BetterAuthPlugin } from 'better-auth';

/**
 * Rejects /sign-in/email before credential lookup so disallowed addresses never hit the adapter.
 */
export function dashboardSignInAllowlistPlugin(): BetterAuthPlugin {
  return {
    id: 'dashboard-sign-in-allowlist',
    hooks: {
      before: [
        {
          matcher(context) {
            return context.path === '/sign-in/email';
          },
          handler: createAuthMiddleware(async (context) => {
            const body = context.body as { email?: unknown };
            const email = typeof body.email === 'string' ? body.email : '';
            if (!isAllowedDashboardSignInEmail(email)) {
              throw APIError.from('UNAUTHORIZED', {
                code: 'UNAUTHORIZED',
                message: 'Unauthorized',
              });
            }
          }),
        },
      ],
    },
  };
}
