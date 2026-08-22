export type BlogCategory = 'guide' | 'update';

export interface BlogFrontmatter {
  category?: BlogCategory;
  /** ISO date string (published) */
  date: string;
  description: string;
  keywords?: string[];
  title: string;
  /** ISO date string (last updated) */
  updated?: string;
}

export interface BlogPostMeta extends BlogFrontmatter {
  slug: string;
}

export interface BlogPost extends BlogPostMeta {
  /** MDX source after frontmatter strip */
  body: string;
}
