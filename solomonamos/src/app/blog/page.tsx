import { getAllPosts, getAllTags } from '@/lib/posts';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Clock, ArrowUpRight, Tag } from 'lucide-react';
import Link from 'next/link';

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

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
        <div className="flex flex-wrap gap-2 mb-12">
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

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted font-mono">No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full group cursor-pointer">
                  <div className="flex flex-col h-full">
                    {/* Tags */}
                    <div className="flex gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 border border-border text-[10px] font-mono text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.featured && (
                        <span className="px-2 py-1 bg-accent/10 border border-accent/30 text-[10px] font-mono text-accent">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-medium text-foreground mb-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-muted leading-relaxed flex-1">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                      <div className="flex items-center gap-4 text-xs font-mono text-muted-dark">
                        <span>{formatDate(post.date)}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
