import { ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";

export const testerCardIconStroke = 1.5;

export const secondaryActionClass =
  "flex w-full items-center justify-center gap-2 rounded-2xl border border-zinc-200/80 bg-white px-4 py-3.5 text-base font-medium text-zinc-700 shadow-sm transition-all hover:border-zinc-300 hover:bg-zinc-50";

export const ProfileSection = ({
  id,
  title,
  description,
  children,
  className,
  first,
}: {
  children: React.ReactNode;
  className?: string;
  description?: string;
  first?: boolean;
  id: string;
  title: string;
}) => (
  <section
    id={id}
    aria-labelledby={`${id}-heading`}
    className={cn(
      "scroll-mt-24 rounded-4xl border border-zinc-200/80 bg-white p-6 shadow-sm sm:p-10",
      first ? "mt-8" : "mt-6",
      className,
    )}
  >
    <h2
      id={`${id}-heading`}
      className="text-2xl font-semibold tracking-tight text-zinc-900"
    >
      {title}
    </h2>
    {description ? (
      <p className="mt-3 text-base leading-relaxed text-zinc-600">
        {description}
      </p>
    ) : null}
    {children}
  </section>
);

export const InlineCarbLink = ({
  href,
  children,
}: {
  children: React.ReactNode;
  href: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 font-medium text-emerald-600 underline decoration-emerald-600/30 underline-offset-4 transition-colors hover:text-emerald-700"
  >
    {children}
    <ExternalLink
      className="size-3.5 shrink-0"
      strokeWidth={testerCardIconStroke}
      aria-hidden
    />
  </a>
);

export const CarbResourceRow = ({
  href,
  children,
}: {
  children: React.ReactNode;
  href: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group -mx-4 flex items-start justify-between gap-4 rounded-xl border-b border-zinc-100 px-4 py-4 transition-colors last:border-0 hover:bg-zinc-50 sm:items-center"
  >
    <span className="text-base font-medium text-emerald-700 transition-colors group-hover:text-emerald-800">
      {children}
    </span>
    <ExternalLink
      className="mt-1 size-4 shrink-0 text-emerald-500 sm:mt-0"
      strokeWidth={testerCardIconStroke}
      aria-hidden
    />
  </a>
);
