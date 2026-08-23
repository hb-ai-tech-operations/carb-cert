"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const paymentStatusBadgeVariant = (
  status: string
): "default" | "secondary" | "destructive" | "outline" => {
  const normalized = status.toLowerCase();
  if (normalized === "succeeded") {
    return "default";
  }
  if (normalized === "pending" || normalized === "processing") {
    return "secondary";
  }
  if (normalized === "failed" || normalized === "canceled") {
    return "destructive";
  }
  return "outline";
};

export const DetailField = ({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) => {
  const display =
    value === null || value === undefined || value === "" ? "—" : value;
  const isEmpty = display === "—";

  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={
          isEmpty
            ? "text-muted-foreground"
            : "break-words font-medium text-foreground"
        }
      >
        {display}
      </span>
    </div>
  );
};

export const AddressBlock = ({
  city,
  country,
  line1,
  postal,
  stateRegion,
  title,
}: {
  city?: string | null;
  country?: string | null;
  line1?: string | null;
  postal?: string | null;
  stateRegion?: string | null;
  title: string;
}) => {
  const hasAddress = [line1, city, stateRegion, postal, country].some(Boolean);

  if (!hasAddress) {
    return (
      <div className="flex flex-col gap-1">
        <span className="text-sm text-muted-foreground">{title}</span>
        <p className="text-muted-foreground">—</p>
      </div>
    );
  }

  const lines = [line1, [city, stateRegion, postal].filter(Boolean).join(", ")]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-muted-foreground">{title}</span>
      <address className="not-italic break-words font-medium text-foreground">
        {lines}
        {country ? (
          <>
            <br />
            {country}
          </>
        ) : null}
      </address>
    </div>
  );
};

export const ApplicationDetailSkeleton = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 lg:px-6">
    <Skeleton className="h-9 w-48" />
    <div className="flex flex-col gap-2">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-5 w-40" />
    </div>
    {Array.from({ length: 3 }, (_placeholder, index) => (
      <Card key={`sk-card-${index}`}>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-full max-w-md" />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    ))}
  </div>
);
