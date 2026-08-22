import Link from 'next/link';

import type { MDXComponents } from 'mdx/types';

import { LeadFormCta } from '@/features/blog/components/lead-form-cta';

const linkClass =
  'text-blue-500 font-medium underline underline-offset-2 hover:opacity-90';

export const blogMdxComponents = {
  h2: ({ children, ...props }) => (
    <h2
      className="mt-10 mb-3 scroll-mt-24 text-3xl font-semibold tracking-tight first:mt-0"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mt-8 mb-2 scroll-mt-24 text-2xl font-semibold tracking-tight"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="mt-6 mb-2 text-xl font-semibold" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p className="mb-4 text-lg leading-relaxed" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mb-4 text-lg list-disc space-y-1.5 pl-6" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-4 text-lg list-decimal space-y-1.5 pl-6" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-green-500/40 text-muted-foreground my-6 border-l-4 py-1 pl-4 italic"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-border my-10" />,
  strong: ({ children, ...props }) => (
    <strong className="font-semibold" {...props}>
      {children}
    </strong>
  ),
  a: ({ children, href, ...props }) => {
    if (typeof href === 'string' && href.startsWith('/')) {
      return (
        <Link className={linkClass} href={href} prefetch {...props}>
          {children}
        </Link>
      );
    }
    const externalHref = typeof href === 'string' ? href : undefined;
    return (
      <a
        className={linkClass}
        href={externalHref}
        rel="noopener noreferrer"
        target="_blank"
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, className, ...props }) => {
    const isBlock = typeof className === 'string' && className.includes('language-');
    if (isBlock) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="bg-muted rounded px-1.5 py-0.5 font-mono text-[0.9em]"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }) => (
    <pre
      className="bg-muted mb-4 overflow-x-auto rounded-lg p-4 text-sm leading-relaxed"
      {...props}
    >
      {children}
    </pre>
  ),
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border-border bg-muted/60 border px-3 py-2 font-semibold"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border-border border px-3 py-2" {...props}>
      {children}
    </td>
  ),
  LeadFormCta,
} satisfies MDXComponents;
