"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    id: "what-is-ctc",
    q: "What is Clean Truck Check?",
    a: (
      <p>
        Clean Truck Check is a California Air Resources Board (CARB) program
        for heavy-duty vehicles. It focuses on emissions compliance for trucks
        and buses operating in California. Official program details, deadlines,
        and fees are published on{" "}
        <a
          href="https://ww2.arb.ca.gov/our-work/programs/heavy-duty-inspection-and-maintenance-program"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-emerald-700 underline decoration-emerald-600/30 underline-offset-4 hover:text-emerald-800"
        >
          CARB's Heavy-Duty I/M program page
        </a>
        .
      </p>
    ),
  },
  {
    id: "who-needs-testing",
    q: "Who needs emissions compliance testing?",
    a: (
      <p>
        Most diesel and alternative-fuel heavy-duty vehicles over{" "}
        <span translate="no">14,000</span> lb <span translate="no">GVWR</span>{" "}
        that operate in California are subject to program requirements,
        including many out-of-state vehicles. Exemptions and schedules vary by
        vehicle type and model year - confirm your situation on CARB's{" "}
        <a
          href="https://ww2.arb.ca.gov/vehicle-owners-emissions-compliance-testing-requirements-clean-truck-check"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-emerald-700 underline decoration-emerald-600/30 underline-offset-4 hover:text-emerald-800"
        >
          vehicle owner testing requirements
        </a>{" "}
        page.
      </p>
    ),
  },
  {
    id: "obd-vs-smoke",
    q: "OBD scan vs. smoke opacity - what's the difference?",
    a: (
      <p>
        Many vehicles use an onboard diagnostics (<span translate="no">OBD</span>
        ) scan with CARB-validated equipment. Others may require smoke opacity
        testing and visual inspection. The right method depends on your vehicle
        configuration; we help you understand what applies before your visit.
      </p>
    ),
  },
  {
    id: "how-to-prepare",
    q: "How should I prepare for my appointment?",
    a: (
      <p>
        Bring current vehicle registration, any prior compliance documents, and
        note known engine or emissions-related repairs. Arrive with the vehicle
        at operating temperature when possible so testing can run smoothly.
      </p>
    ),
  },
  {
    id: "not-carb",
    q: "Are you CARB staff?",
    a: (
      <p>
        No. This card represents an independent certified testing provider.
        CARB sets the rules; we perform testing and help you navigate
        compliance steps. For enforcement, registration, and official
        interpretations, use CARB resources directly.
      </p>
    ),
  },
];

export const CtcFaq = () => (
  <Accordion
    type="single"
    collapsible
    className="flex w-full flex-col divide-y divide-zinc-100"
  >
    {items.map((item) => (
      <AccordionItem key={item.id} value={item.id} className="border-0">
        <AccordionTrigger className="py-4 text-left text-base font-medium text-zinc-900 hover:text-emerald-600 hover:no-underline data-[state=open]:text-emerald-600">
          {item.q}
        </AccordionTrigger>
        <AccordionContent className="text-base leading-relaxed text-zinc-600 [&_a]:font-medium [&_a]:text-emerald-700 [&_a]:underline [&_a]:decoration-emerald-600/30 [&_a]:underline-offset-4 [&_a]:hover:text-emerald-800">
          {item.a}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);
