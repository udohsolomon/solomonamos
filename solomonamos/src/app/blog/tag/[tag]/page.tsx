import { getPostsByTag, getAllTags } from '@/lib/posts';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Clock, ArrowUpRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag: tag.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const formattedTag = tag.charAt(0).toUpperCase() + tag.slice(1);
  
  return {
    title: `${formattedTag} Articles | Solomon Amos`,
    description: `Articles about ${formattedTag} - AI, technology, and software development insights.`,
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  const allTags = getAllTags();
  
  // Check if tag exists
  const tagExists = allTags.some(t => t.toLowerCase() === tag.toLowerCase());
  if (!tagExists) {
    notFound();
  }

  const formattedTag = tag.charAt(0).toUpperCase() + tag.slice(1);

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-mono text-muted hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          All Posts
        </Link>

        <SectionHeader
          label={`TAG: ${formattedTag.toUpperCase()}`}
          title={`${formattedTag} Articles`}
          description={`${posts.length} article${posts.length !== 1 ? 's' : ''} tagged with "${formattedTag}"`}
        />

        {/* Other tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {allTags.map((t) => (
            <Link
              key={t}
              href={`/blog/tag/${t.toLowerCase()}`}
              className={`px-3 py-1 border text-xs font-mono transition-colors ${
                t.toLowerCase() === tag.toLowerCase()
                  ? 'border-accent text-accent bg-accent/10'
                  : 'border-border text-muted hover:border-accent hover:text-accent'
              }`}
            >
              {t}
            </Link>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full group cursor-pointer">
                <div className="flex flex-col h-full">
                  {/* Tags */}
                  <div className="flex gap-2 mb-4">
                    {post.tags.map((postTag) => (
                      <span
                        key={postTag}
                        className={`px-2 py-1 border text-[10px] font-mono ${
                          postTag.toLowerCase() === tag.toLowerCase()
                            ? 'border-accent/50 text-accent'
                            : 'border-border text-muted'
                        }`}
                      >
                        {postTag}
                      </span>
                    ))}
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
      </div>
    </div>
  );
}
