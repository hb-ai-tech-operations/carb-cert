'use client';

import Script from 'next/script';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { PlusIcon } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

const faq = [
  {
    question: 'What is Clean Truck Check?',
    answer:
      "Clean Truck Check is the California Air Resources Board (CARB) program requiring heavy-duty vehicles over 14,000 lbs GVWR to complete periodic emissions testing and pay an annual compliance fee. Testing is done at CARB-authorized facilities; we provide third-party reporting assistance through the CTC-VIS system and are not affiliated with CARB.",
  },
  {
    question: 'When does testing start?',
    answer:
      'Semi-annual testing began January 1, 2025. Quarterly testing starts October 2027 for OBD-equipped vehicles. For the latest dates and rules, visit the official CARB site at ww2.arb.ca.gov.',
  },
  {
    question: 'Do out-of-state trucks need to comply?',
    answer:
      'Yes. If you enter California with a heavy-duty vehicle, you must register in CTC-VIS and test on schedule.',
  },
  {
    question: 'What happens if I don’t comply?',
    answer:
      'Non-compliance can result in DMV registration holds, roadside fines, denied access to ports, and other enforcement actions by CARB.',
  },
  {
    question: 'Are electric vehicles exempt?',
    answer:
      "Yes. Zero-emission vehicles (battery-electric and hydrogen fuel cell) are fully exempt from Clean Truck Check. California is moving toward 100% zero-emission new car sales by 2035 (per CARB's Drive Forward initiative).",
  },
];

const buildFaqJsonLd = (items: typeof faq) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  })),
});

const FAQSection = () => (
  <section
    id="faq"
    aria-labelledby="faq-heading"
    className="mx-auto h-fit w-full max-w-6xl space-y-10 px-2 md:space-y-12 md:px-0"
  >
    {/* SEO: FAQPage structured data */}
    <Script
      id="faq-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(faq)) }}
    />

    <header className="space-y-3 text-center">
      <h2
        id="faq-heading"
        className="text-3xl leading-tight! font-semibold tracking-tight text-balance md:text-4xl"
      >
        Frequently Asked Questions (FAQ)
      </h2>
      <p className="text-muted-foreground text-lg md:text-xl">
        Answers to common questions about California Clean Truck Check (CTC-VIS), compliance fees, and third-party
        reporting. For official program info, see{' '}
        <a
          href="https://ww2.arb.ca.gov/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          ww2.arb.ca.gov
        </a>
        .
      </p>
    </header>

    <Accordion
      type="single"
      collapsible
      defaultValue="question-0"
      className="space-y-3"
    >
      {faq.map(({ question, answer }, index) => (
        <AccordionItem
          key={question}
          value={`question-${index}`}
          className={cn(
            'border-border bg-accent/40 rounded-xl border',
            'transition-transform duration-300 ease-in-out hover:scale-[1.01] motion-reduce:hover:scale-100',
            'focus-within:ring-ring/40 focus-within:ring-2'
          )}
        >
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
              className={cn(
                'flex w-full items-center justify-between gap-3 px-4 py-4 text-left',
                'text-lg font-semibold tracking-tight outline-none',
                'focus-visible:ring-ring/60 focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2',
                '[&[data-state=open]>svg]:rotate-45'
              )}
            >
              <span className="text-lg text-balance md:text-xl">
                {question}
              </span>
              <PlusIcon
                aria-hidden="true"
                className="text-muted-foreground h-5 w-5 shrink-0 transition-transform duration-200"
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>

          <AccordionContent className="px-4 pt-0 pb-4">
            <p className="text-base leading-relaxed text-pretty md:text-lg">
              {answer}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
);

FAQSection.displayName = 'FAQSection';
export { FAQSection };
