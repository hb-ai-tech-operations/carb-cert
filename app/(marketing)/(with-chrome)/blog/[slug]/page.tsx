import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';

import remarkGfm from 'remark-gfm';

import type { Metadata } from 'next';

import {
  blogMdxComponents,
  BlogPostLayout,
} from '@/features/blog/components';
import { getBlogSlugs, getPostBySlug } from '@/lib/blog/posts';
import { buildBlogPostingJsonLdHtml } from '@/lib/seo/blog-posting-jsonld';
import { buildPageMetadata } from '@/lib/seo/metadata';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export const generateStaticParams = () =>
  getBlogSlugs().map(slug => ({ slug }));

export const generateMetadata = async ({
  params,
}: BlogPostPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {};
  }

  return buildPageMetadata({
    title: post.title,
    description: post.description,
    canonicalPath: `/blog/${slug}`,
    keywords: post.keywords,
  });
};

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const jsonLd = buildBlogPostingJsonLdHtml({
    dateModified: post.updated,
    datePublished: post.date,
    description: post.description,
    slug: post.slug,
    title: post.title,
  });

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- JSON-LD requires raw script content
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <BlogPostLayout
        date={post.date}
        description={post.description}
        title={post.title}
        updated={post.updated}
      >
        <MDXRemote
          source={post.body}
          components={blogMdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </BlogPostLayout>
    </>
  );
};

export default BlogPostPage;
