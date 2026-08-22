import matter from 'gray-matter';
import fs from 'node:fs';
import path from 'node:path';

import type { BlogFrontmatter, BlogPost, BlogPostMeta } from '@/lib/blog/types';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

const SLUG_PATTERN = /^[\da-z]+(?:-[\da-z]+)*$/;

function assertValidSlug(slug: string): void {
  if (!SLUG_PATTERN.test(slug) || slug.includes('..') || slug.includes('/')) {
    throw new Error(`Invalid blog slug: ${slug}`);
  }
}

function parseFrontmatter(data: Record<string, unknown>): BlogFrontmatter {
  const { category, date, description, keywords, title, updated } = data;

  if (typeof title !== 'string' || !title.trim()) {
    throw new Error('Blog frontmatter requires string "title"');
  }
  if (typeof description !== 'string' || !description.trim()) {
    throw new Error('Blog frontmatter requires string "description"');
  }
  if (typeof date !== 'string' || !date.trim()) {
    throw new Error('Blog frontmatter requires string "date"');
  }

  return {
    title: title.trim(),
    description: description.trim(),
    date: date.trim(),
    ...(Array.isArray(keywords) &&
      keywords.every((k): k is string => typeof k === 'string') && {
        keywords,
      }),
    ...(category === 'guide' || category === 'update' ? { category } : {}),
    ...(typeof updated === 'string' && updated.trim()
      ? { updated: updated.trim() }
      : {}),
  };
}

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter(file => file.endsWith('.mdx'))
    .map(file => path.basename(file, '.mdx'))
    .filter(slug => SLUG_PATTERN.test(slug));
}

export function getPostBySlug(slug: string): BlogPost | null {
  assertValidSlug(slug);

  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(raw);
  const frontmatter = parseFrontmatter(data as Record<string, unknown>);

  return {
    slug,
    ...frontmatter,
    body: content.trimStart(),
  };
}

export function getAllPostsMeta(): BlogPostMeta[] {
  const metas: BlogPostMeta[] = [];

  for (const slug of getBlogSlugs()) {
    const post = getPostBySlug(slug);
    if (post) {
      const { body: _b, ...meta } = post;
      metas.push(meta);
    }
  }

  return metas.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
