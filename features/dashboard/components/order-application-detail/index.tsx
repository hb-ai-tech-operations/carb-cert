"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { IconArrowLeft } from "@tabler/icons-react";
import { useQuery } from "convex/react";

import { ApplicationDetailView } from "./application-detail-view";
import { ApplicationDetailSkeleton } from "./parts";

import type { Id } from "@/convex/_generated/dataModel";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";

export const OrderApplicationDetail = () => {
  const params = useParams();
  const rawId = params?.applicationId;
  const applicationId =
    typeof rawId === "string"
      ? (rawId as Id<"complianceApplications">)
      : null;

  const detail = useQuery(
    api.orders.getApplicationById,
    applicationId ? { applicationId } : "skip"
  );

  if (!applicationId) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-6 lg:px-6">
        <Alert variant="destructive">
          <AlertTitle>Invalid link</AlertTitle>
          <AlertDescription>
            This URL is missing a valid application id.{" "}
            <Link
              href="/dashboard/orders"
              className="font-medium underline underline-offset-4"
            >
              Back to orders
            </Link>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (detail === undefined) {
    return <ApplicationDetailSkeleton />;
  }

  if (detail === null) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-6 lg:px-6">
        <Alert>
          <AlertTitle>Application not found</AlertTitle>
          <AlertDescription className="flex flex-col gap-3">
            <span>
              We could not find an application with this id. It may have been
              removed.
            </span>
            <Button variant="outline" size="sm" className="w-fit" asChild>
              <Link href="/dashboard/orders">
                <IconArrowLeft data-icon="inline-start" />
                All orders
              </Link>
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <ApplicationDetailView detail={detail} />;
};
