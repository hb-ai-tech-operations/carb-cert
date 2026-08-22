import {
  Activity,
  ClipboardCheck,
  Clock,
  FileCheck2,
  Mail,
  Map,
  MapPin,
  Phone,
  Truck,
} from "lucide-react";

import type { TesterProfile } from "@/features/testers/data/testers";

import { CtcFaq } from "@/features/testers/components/ctc-faq";
import {
  CarbResourceRow,
  InlineCarbLink,
  ProfileSection,
  testerCardIconStroke,
} from "@/features/testers/components/tester-card-primitives";
import {
  CARB_FAQ_URL,
  CARB_OWNER_URL,
  CARB_PROGRAM_URL,
} from "@/features/testers/constants/carb-urls";

export const DEFAULT_VISIT_CHECKLIST = [
  "Current vehicle registration and unit identification (VIN visible).",
  "Prior Clean Truck Check or related compliance paperwork, if any.",
  "Note recent engine, aftertreatment, or emissions-related repairs.",
  "Vehicle warmed up when safe and practical for valid readings.",
] as const;

// eslint-disable-next-line max-lines-per-function -- long component
export const TesterCardSections = ({
  tester,
  checklist,
  hoursBlurb,
}: {
  checklist: string[];
  hoursBlurb: string;
  tester: TesterProfile;
}) => (
  <>
    <ProfileSection
      id="program"
      title="About Clean Truck Check"
      description="California’s program for heavy-duty truck and bus emissions compliance. Rules and deadlines are set by CARB—we help you meet them at the testing lane."
      first
    >
      <div className="mt-6 border-t border-zinc-100 pt-6">
        <p className="text-base leading-relaxed text-zinc-600">
          The{" "}
          <span translate="no" className="font-medium text-zinc-900">
            Clean Truck Check
          </span>{" "}
          program (part of CARB’s heavy-duty inspection & maintenance framework)
          applies to many diesel and alternative-fuel vehicles over{" "}
          <span translate="no">14,000</span> lb <span translate="no">GVWR</span>{" "}
          operating in California. Testing type and frequency depend on vehicle
          category and CARB phase-in schedules—always confirm current
          requirements on{" "}
          <InlineCarbLink href={CARB_OWNER_URL}>
            CARB’s official vehicle-owner page
          </InlineCarbLink>
          .
        </p>
      </div>
    </ProfileSection>

    <ProfileSection
      id="services"
      title="Testing & services"
      description="Structured inspections and scans aligned with CARB-recognized methods—so you know what was checked and what to do next."
    >
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200/60 bg-zinc-50/50 p-6">
          <div className="mb-4 flex size-10 items-center justify-center rounded-xl border border-zinc-200/60 bg-white shadow-sm">
            <Activity
              className="size-5 text-emerald-600"
              strokeWidth={testerCardIconStroke}
              aria-hidden
            />
          </div>
          <h3 className="text-lg font-medium text-zinc-900">
            <span translate="no">OBD</span> data testing
          </h3>
          <p className="mt-2 text-base leading-relaxed text-zinc-600">
            Validated equipment and disciplined procedures for onboard
            diagnostics where applicable.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/60 bg-zinc-50/50 p-6">
          <div className="mb-4 flex size-10 items-center justify-center rounded-xl border border-zinc-200/60 bg-white shadow-sm">
            <Truck
              className="size-5 text-emerald-600"
              strokeWidth={testerCardIconStroke}
              aria-hidden
            />
          </div>
          <h3 className="text-lg font-medium text-zinc-900">
            Opacity & visual inspection
          </h3>
          <p className="mt-2 text-base leading-relaxed text-zinc-600">
            Smoke opacity and visual checks for configurations that require
            non-<span translate="no">OBD</span> pathways.
          </p>
        </div>
        <div className="flex flex-col items-start gap-5 rounded-2xl border border-zinc-200/60 bg-zinc-50/50 p-6 sm:col-span-2 sm:flex-row sm:items-center">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200/60 bg-white shadow-sm">
            <ClipboardCheck
              className="size-5 text-emerald-600"
              strokeWidth={testerCardIconStroke}
              aria-hidden
            />
          </div>
          <div>
            <h3 className="text-lg font-medium text-zinc-900">
              Compliance guidance
            </h3>
            <p className="mt-1 text-base leading-relaxed text-zinc-600">
              Walkthrough of results, documentation expectations, and how to
              align with CARB reporting—without substituting for official CARB
              determinations.
            </p>
          </div>
        </div>
      </div>
    </ProfileSection>

    <ProfileSection
      id="compliance"
      title="Compliance snapshot"
      description="High-level reference only. Requirements change—verify deadlines, fees, and exemptions on CARB before you operate or renew."
    >
      <ul className="mt-8 space-y-4">
        <li className="flex items-start gap-3">
          <div
            className="mt-2.5 size-1.5 shrink-0 rounded-full bg-emerald-500"
            aria-hidden
          />
          <p className="text-base leading-relaxed text-zinc-600">
            Applies broadly to heavy-duty vehicles operating in{" "}
            <span translate="no">CA</span>, including many out-of-state plates.
          </p>
        </li>
        <li className="flex items-start gap-3">
          <div
            className="mt-2.5 size-1.5 shrink-0 rounded-full bg-emerald-500"
            aria-hidden
          />
          <p className="text-base leading-relaxed text-zinc-600">
            Testing intervals and methods depend on vehicle type, fuel, and
            equipment—see CARB’s published schedule for your unit.
          </p>
        </li>
        <li className="flex items-start gap-3">
          <div
            className="mt-2.5 size-1.5 shrink-0 rounded-full bg-emerald-500"
            aria-hidden
          />
          <p className="text-base leading-relaxed text-zinc-600">
            Passing results are typically reported through CARB’s systems; keep
            copies for your fleet records.
          </p>
        </li>
      </ul>
      <p className="mt-8 border-t border-zinc-100 pt-5 text-sm leading-relaxed text-zinc-400">
        Not legal advice. This card summarizes public program themes only; the
        authoritative source is <span translate="no">CARB</span>.
      </p>
    </ProfileSection>

    <ProfileSection
      id="checklist"
      title="Before your visit"
      description="Bring what you need so we can complete testing without delays."
    >
      <ul className="mt-8 space-y-4">
        {checklist.map((line) => (
          <li key={line} className="flex items-start gap-3">
            <FileCheck2
              className="mt-0.5 size-5 shrink-0 text-emerald-500"
              strokeWidth={testerCardIconStroke}
              aria-hidden
            />
            <p className="text-base text-zinc-600">{line}</p>
          </li>
        ))}
      </ul>
    </ProfileSection>

    <ProfileSection
      id="pricing"
      title="Service pricing"
      description="Transparent line items—confirm the exact package for your vehicle class when you book."
    >
      <div className="mt-8 flex flex-col divide-y divide-zinc-100">
        {tester.pricingRows.map((row) => (
          <div
            key={row.label}
            className="flex flex-wrap items-center justify-between gap-4 py-4"
          >
            <span className="text-base font-medium text-zinc-900">
              {row.label}
            </span>
            <span className="text-base text-zinc-500">{row.value}</span>
          </div>
        ))}
      </div>
    </ProfileSection>

    <ProfileSection
      id="hours"
      title="Hours & service area"
      description={hoursBlurb}
    >
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6">
        <div className="flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-zinc-200/60 bg-zinc-50">
            <Clock
              className="size-5 text-zinc-600"
              strokeWidth={testerCardIconStroke}
              aria-hidden
            />
          </div>
          <div>
            <h3 className="text-base font-medium text-zinc-900">Shop hours</h3>
            <div className="mt-1 flex flex-col gap-1 text-base text-zinc-600">
              {tester.hours.lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-zinc-200/60 bg-zinc-50">
            <Map
              className="size-5 text-zinc-600"
              strokeWidth={testerCardIconStroke}
              aria-hidden
            />
          </div>
          <div>
            <h3 className="text-base font-medium text-zinc-900">Coverage</h3>
            <p className="mt-1 text-base leading-relaxed text-zinc-600">
              {tester.coverageDescription}
            </p>
          </div>
        </div>
      </div>
    </ProfileSection>

    <ProfileSection
      id="resources"
      title="Official CARB resources"
      description="Primary references for program rules, enforcement data, and owner obligations."
    >
      <div className="mt-6 flex flex-col">
        <CarbResourceRow href={CARB_PROGRAM_URL}>
          Heavy-duty inspection & maintenance (Clean Truck Check) program
          overview
        </CarbResourceRow>
        <CarbResourceRow href={CARB_OWNER_URL}>
          Vehicle owners: emissions compliance testing requirements
        </CarbResourceRow>
        <CarbResourceRow href={CARB_FAQ_URL}>
          Clean Truck Check <span translate="no">FAQ</span> (fact sheet)
        </CarbResourceRow>
      </div>
    </ProfileSection>

    <ProfileSection
      id="faq"
      title="Frequently asked questions"
      description="Straight answers about how we work with the program—then confirm specifics on CARB."
    >
      <div className="mt-6">
        <CtcFaq />
      </div>
    </ProfileSection>

    <ProfileSection
      id="contact"
      title="Contact"
      description="Direct lines for fleets, owner-operators, and dispatch."
    >
      <div className="mt-8 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-zinc-200/60 bg-zinc-50">
            <MapPin
              className="size-4 text-zinc-500"
              strokeWidth={testerCardIconStroke}
              aria-hidden
            />
          </div>
          <span className="text-base text-zinc-800">
            {tester.location.city}, <span translate="no">{tester.location.region}</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-zinc-200/60 bg-zinc-50">
            <Phone
              className="size-4 text-zinc-500"
              strokeWidth={testerCardIconStroke}
              aria-hidden
            />
          </div>
          <a
            href={`tel:${tester.phoneTel}`}
            className="text-base text-zinc-800 transition-colors hover:text-emerald-700 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2"
          >
            {tester.phoneDisplay}
          </a>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-zinc-200/60 bg-zinc-50">
            <Mail
              className="size-4 text-zinc-500"
              strokeWidth={testerCardIconStroke}
              aria-hidden
            />
          </div>
          <a
            href={`mailto:${tester.email}`}
            className="break-all text-base text-zinc-800 transition-colors hover:text-emerald-700 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2"
          >
            {tester.email}
          </a>
        </div>
      </div>
    </ProfileSection>
  </>
);
