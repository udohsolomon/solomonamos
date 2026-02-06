import { getAllPosts, getAllTags } from '@/lib/posts';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { BlogSearch } from '@/components/BlogSearch';
import { Tag } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Blog | Solomon Amos',
  description: 'Thoughts on AI, technology, and building software that matters.',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const allTags = getAllTags();

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <SectionHeader
          label="BLOG"
          title="Writing"
          description="Thoughts on AI, technology, and building software that matters."
        />

        {/* Tags filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-muted mr-4">
            <Tag className="w-3 h-3" />
            Topics:
          </div>
          {allTags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${tag.toLowerCase()}`}
              className="px-3 py-1 border border-border text-xs font-mono text-muted hover:border-accent hover:text-accent transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>

        {/* Search + Posts */}
        <BlogSearch posts={posts} />
      </div>
    </div>
  );
}
