'use client';

import { useState, useMemo } from 'react';
import { Search, Clock, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import type { PostMeta } from '@/lib/posts';

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

interface BlogSearchProps {
  posts: PostMeta[];
}

export function BlogSearch({ posts }: BlogSearchProps) {
  const [query, setQuery] = useState('');

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return posts;
    const lower = query.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lower) ||
        post.excerpt.toLowerCase().includes(lower) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lower))
    );
  }, [posts, query]);

  return (
    <>
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="search"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-background border border-border text-foreground font-mono text-sm placeholder:text-muted-dark focus:outline-none focus:border-accent transition-colors"
          aria-label="Search blog posts"
        />
      </div>
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted font-mono">No posts found.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
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
    </>
  );
}
