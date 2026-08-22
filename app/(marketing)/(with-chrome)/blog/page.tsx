import type { Metadata } from 'next';

import { PostCard } from '@/features/blog/components';
import { getAllPostsMeta } from '@/lib/blog/posts';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Blog — Clean Truck Check & CARB Compliance Guides',
  description:
    'Practical guides on California Clean Truck Check, CTC-VIS, and CARB heavy-duty compliance. Third-party perspective—not official CARB content.',
  canonicalPath: '/blog',
  keywords: [
    'Clean Truck Check',
    'CARB compliance blog',
    'CTC-VIS',
    'California truck compliance',
  ],
});

const BlogIndexPage = () => {
  const posts = getAllPostsMeta();

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-24 md:px-0 md:pt-28">
      <header className="mx-auto mb-12 max-w-3xl text-center">
        <h1 className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl">
          Blog
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Guides for fleets and owner-operators navigating California&apos;s Clean
          Truck Check program and CTC-VIS. We are a third-party service—not CARB.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted-foreground text-center text-sm">
          No articles yet. Check back soon.
        </p>
      ) : (
        <ul className="mx-auto grid max-w-4xl list-none gap-6 p-0">
          {posts.map(post => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogIndexPage;
