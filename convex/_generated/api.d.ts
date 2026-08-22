/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as complianceApplications from "../complianceApplications.js";
import type * as emailPreferences from "../emailPreferences.js";
import type * as emailSendLogs from "../emailSendLogs.js";
import type * as http from "../http.js";
import type * as lib_dashboardSignInAllowlist from "../lib/dashboardSignInAllowlist.js";
import type * as lib_emailPreferenceToken from "../lib/emailPreferenceToken.js";
import type * as lib_testerPublicSlug from "../lib/testerPublicSlug.js";
import type * as model_complianceApplications from "../model/complianceApplications.js";
import type * as model_testerOnboardingApplications from "../model/testerOnboardingApplications.js";
import type * as orders from "../orders.js";
import type * as testerOnboardingApplications from "../testerOnboardingApplications.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  complianceApplications: typeof complianceApplications;
  emailPreferences: typeof emailPreferences;
  emailSendLogs: typeof emailSendLogs;
  http: typeof http;
  "lib/dashboardSignInAllowlist": typeof lib_dashboardSignInAllowlist;
  "lib/emailPreferenceToken": typeof lib_emailPreferenceToken;
  "lib/testerPublicSlug": typeof lib_testerPublicSlug;
  "model/complianceApplications": typeof model_complianceApplications;
  "model/testerOnboardingApplications": typeof model_testerOnboardingApplications;
  orders: typeof orders;
  testerOnboardingApplications: typeof testerOnboardingApplications;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {
  betterAuth: import("../betterAuth/_generated/component.js").ComponentApi<"betterAuth">;
};
