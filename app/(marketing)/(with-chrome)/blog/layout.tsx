import type { ReactNode } from 'react';

interface BlogLayoutProps {
  children: ReactNode;
}

const BlogLayout = ({ children }: BlogLayoutProps) => (
  <div className="w-full">{children}</div>
);

export default BlogLayout;
