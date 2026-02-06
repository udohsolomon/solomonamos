import { getAllPosts } from '@/lib/posts';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { ArrowRight, Clock, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function Writing() {
  const posts = getAllPosts();
  const featuredPosts = posts.filter((p) => p.featured).slice(0, 2);
  const otherPosts = posts.filter((p) => !p.featured).slice(0, 2);

  return (
    <section id="writing" className="py-24 border-t border-border bg-muted-darker/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <SectionHeader
            label="03"
            title="Writing"
            description="Thoughts on AI, technology, and building software."
            className="mb-0"
          />
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-sm font-mono text-accent hover:gap-3 transition-all"
          >
            View all posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12 border border-border">
            <p className="text-muted font-mono">Posts coming soon...</p>
          </div>
        ) : (
          <>
            {/* Featured Posts */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {featuredPosts.map((post) => (
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
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-medium text-foreground mb-3 group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>

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

            {/* Other Posts */}
            {otherPosts.length > 0 && (
              <div className="space-y-4">
                {otherPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <div className="group p-4 border border-border hover:border-accent/50 transition-colors flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <span className="text-xs font-mono text-muted-dark hidden sm:block">
                          {formatDate(post.date)}
                        </span>
                        <h3 className="font-medium text-foreground group-hover:text-accent transition-colors">
                          {post.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-mono text-muted hidden sm:flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}

        {/* Mobile CTA */}
        <Link
          href="/blog"
          className="md:hidden mt-8 flex items-center justify-center gap-2 text-sm font-mono text-accent"
        >
          View all posts
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
