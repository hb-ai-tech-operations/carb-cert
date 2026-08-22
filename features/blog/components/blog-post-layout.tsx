import type { ReactNode } from 'react';

interface BlogPostLayoutProps {
  children: ReactNode;
  date: string;
  description: string;
  title: string;
  updated?: string;
}

const formatDisplayDate = (iso: string) => {
  try {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
};

const BlogPostLayout = ({
  children,
  date,
  description,
  title,
  updated,
}: BlogPostLayoutProps) => (
  <article className="mx-auto max-w-4xl px-4 pb-16 pt-24 md:px-0 md:pt-28">
    <header className="mb-10 space-y-4">
      <p className="text-muted-foreground text-sm font-medium">Carb Cert blog</p>
      <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h1>
      <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
      <p className="text-muted-foreground text-sm italic">
        Published {formatDisplayDate(date)}
        {updated && updated !== date ? (
          <>
            {' '}
            · Updated {formatDisplayDate(updated)}
          </>
        ) : null}
      </p>
    </header>

    <aside
      className="border-border bg-muted/40 mb-10 rounded-lg border p-4 text-sm leading-relaxed"
      role="note"
    >
      <strong className="font-semibold">Disclaimer:</strong> Carb Cert provides
      third-party reporting assistance for California&apos;s Clean Truck Check
      program. We are{' '}
      <span className="font-medium">not affiliated with CARB</span>. Official
      rules and updates are published by the{' '}
      <a
        href="https://ww2.arb.ca.gov/"
        className="text-primary underline underline-offset-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        California Air Resources Board
      </a>
      .
    </aside>

    <div className="blog-mdx text-foreground">{children}</div>
  </article>
);

BlogPostLayout.displayName = 'BlogPostLayout';
export { BlogPostLayout };
