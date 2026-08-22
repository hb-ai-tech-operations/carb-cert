import Link from 'next/link';

import type { BlogPostMeta } from '@/lib/blog/types';

interface PostCardProps {
  post: BlogPostMeta;
}

const formatDisplayDate = (iso: string) => {
  try {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
};

const PostCard = ({ post }: PostCardProps) => (
  <Link
    href={`/blog/${post.slug}`}
    prefetch
    className="border-border bg-card hover:border-primary/40 group block rounded-xl border p-6 transition-colors"
  >
    <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
      {formatDisplayDate(post.date)}
      {post.category === 'update' ? ' · Update' : null}
    </p>
    <h2 className="group-hover:text-green-500 mb-2 text-2xl font-semibold tracking-tight transition-colors">
      {post.title}
    </h2>
    <p className="text-muted-foreground line-clamp-3 text-lg leading-relaxed">
      {post.description}
    </p>
  </Link>
);

PostCard.displayName = 'PostCard';
export { PostCard };
