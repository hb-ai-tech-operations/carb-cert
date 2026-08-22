"use client";

import Link from "next/link";

import { IconArrowLeft } from "@tabler/icons-react";

import {
  AddressBlock,
  DetailField,
  paymentStatusBadgeVariant,
} from "./parts";

import type { OrderApplicationDetailData } from "@/features/dashboard/types/order-application-detail";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatOrderCurrency,
  formatOrderDate,
  orderStatusBadgeVariant,
} from "@/features/dashboard/lib/format-order-display";

const ApplicantCard = ({
  detail,
}: {
  detail: OrderApplicationDetailData;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Applicant</CardTitle>
      <CardDescription>Primary contact for this application.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4 sm:grid-cols-2">
        <DetailField label="Full name" value={detail.fullName} />
        <DetailField label="Email" value={detail.emailAddress} />
        <DetailField label="Phone" value={detail.phone} />
        <DetailField label="Application type" value={detail.applicationType} />
      </div>
    </CardContent>
  </Card>
);

const EntityCard = ({ detail }: { detail: OrderApplicationDetailData }) => (
  <Card>
    <CardHeader>
      <CardTitle>Entity</CardTitle>
      <CardDescription>Business or organization details.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4 sm:grid-cols-2">
        <DetailField label="Entity type" value={detail.entityType} />
        <DetailField label="Entity name" value={detail.entityName} />
        <DetailField label="Doing business as" value={detail.doingBusinessAs} />
      </div>
    </CardContent>
  </Card>
);

const AddressesCard = ({
  detail,
}: {
  detail: OrderApplicationDetailData;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Addresses</CardTitle>
      <CardDescription>Physical and billing locations on file.</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col gap-6">
      <AddressBlock
        city={detail.physicalCity}
        country={detail.physicalCountry}
        line1={detail.physicalAddress}
        postal={detail.physicalZipCode}
        stateRegion={detail.physicalState}
        title="Physical address"
      />
      <Separator />
      <AddressBlock
        city={detail.billingCity}
        country={detail.billingCountry}
        line1={detail.billingAddress}
        postal={detail.billingZipCode}
        stateRegion={detail.billingState}
        title="Billing address"
      />
    </CardContent>
  </Card>
);

const VehiclesSummaryCard = ({
  detail,
}: {
  detail: OrderApplicationDetailData;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Vehicles</CardTitle>
      <CardDescription>
        {detail.vehicles.length === 1
          ? "1 vehicle"
          : `${detail.vehicles.length} vehicles`}
      </CardDescription>
    </CardHeader>
    <CardContent>
      {detail.vehicles.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No vehicles linked to this application.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>VIN</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Make / model</TableHead>
              <TableHead>Plate</TableHead>
              <TableHead>Fuel</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {detail.vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell className="font-mono text-xs">{vehicle.vin}</TableCell>
                <TableCell>{vehicle.year}</TableCell>
                <TableCell>
                  {vehicle.make} {vehicle.model}
                </TableCell>
                <TableCell>{vehicle.licensePlate}</TableCell>
                <TableCell>{vehicle.fuelType}</TableCell>
                <TableCell>{vehicle.vehicleType}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </CardContent>
  </Card>
);

const VehicleLocationsCard = ({
  detail,
}: {
  detail: OrderApplicationDetailData;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Vehicle locations</CardTitle>
      <CardDescription>
        Garaging / location address per vehicle (when provided).
      </CardDescription>
    </CardHeader>
    <CardContent>
      {detail.vehicles.length === 0 ? (
        <p className="text-sm text-muted-foreground">—</p>
      ) : (
        <div className="flex flex-col gap-6">
          {detail.vehicles.map((vehicle) => (
            <div
              key={`loc-${vehicle.id}`}
              className="flex flex-col gap-3 rounded-lg border bg-muted/30 p-4"
            >
              <p className="text-sm font-medium">
                {vehicle.year} {vehicle.make} {vehicle.model}{" "}
                <span className="font-mono text-xs text-muted-foreground">
                  {vehicle.vin}
                </span>
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <DetailField
                  label="Location address"
                  value={vehicle.locationAddress}
                />
                <DetailField label="Address" value={vehicle.address} />
                <DetailField label="City" value={vehicle.city} />
                <DetailField label="State / region" value={vehicle.state} />
                <DetailField label="ZIP" value={vehicle.zipCode} />
                <DetailField label="Country" value={vehicle.country} />
                <DetailField
                  label="Registered state"
                  value={vehicle.registeredState}
                />
                <DetailField
                  label="Registered country"
                  value={vehicle.registeredCountry}
                />
                <DetailField label="Ownership" value={vehicle.ownershipType} />
              </div>
            </div>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
);

const PaymentsCard = ({
  detail,
}: {
  detail: OrderApplicationDetailData;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Payments</CardTitle>
      <CardDescription>Stripe payment attempts, newest first.</CardDescription>
    </CardHeader>
    <CardContent>
      {detail.payments.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No payment attempts recorded.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Card</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {detail.payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="text-muted-foreground">
                  {formatOrderDate(payment.attemptedAt)}
                </TableCell>
                <TableCell>
                  <Badge variant={paymentStatusBadgeVariant(payment.status)}>
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatOrderCurrency(payment.amount, payment.currency)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {payment.cardBrand && payment.cardLast4
                    ? `${payment.cardBrand} ···${payment.cardLast4}`
                    : "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {detail.payments.some((payment) => payment.errorMessage) ? (
        <div className="mt-4 flex flex-col gap-2">
          <span className="text-sm font-medium text-destructive">
            Error details
          </span>
          {detail.payments.map((payment) =>
            payment.errorMessage ? (
              <p
                key={`err-${payment.id}`}
                className="text-sm text-muted-foreground"
              >
                {formatOrderDate(payment.attemptedAt)}: {payment.errorMessage}
              </p>
            ) : null
          )}
        </div>
      ) : null}
    </CardContent>
  </Card>
);

export const ApplicationDetailView = ({
  detail,
}: {
  detail: OrderApplicationDetailData;
}) => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 lg:px-6">
    <div className="flex flex-col gap-4">
      <Button variant="ghost" size="sm" className="w-fit px-2" asChild>
        <Link href="/dashboard/orders">
          <IconArrowLeft data-icon="inline-start" />
          Orders
        </Link>
      </Button>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {detail.fullName}
          </h1>
          <p className="text-sm text-muted-foreground">
            Submitted {formatOrderDate(detail.creationTime)} ·{" "}
            {detail.applicationType}
          </p>
        </div>
        <Badge
          className="w-fit"
          variant={orderStatusBadgeVariant(detail.status)}
        >
          {detail.status}
        </Badge>
      </div>
    </div>

    <ApplicantCard detail={detail} />
    <EntityCard detail={detail} />
    <AddressesCard detail={detail} />
    <VehiclesSummaryCard detail={detail} />
    <VehicleLocationsCard detail={detail} />
    <PaymentsCard detail={detail} />
  </div>
);
