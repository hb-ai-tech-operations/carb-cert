"use client";

import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { ConvexReactClient } from "convex/react";

import { authClient } from "@/lib/auth-client";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? '');

export const ConvexClientProvider = ({
  children,
  initialToken,
}: {
  children: React.ReactNode;
  initialToken?: string | null;
}) => (
  <ConvexBetterAuthProvider
    client={convex}
    authClient={authClient}
    initialToken={initialToken}
  >
    {children}
  </ConvexBetterAuthProvider>
);