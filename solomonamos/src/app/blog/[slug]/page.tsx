import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';
import { MDXContent } from '@/components/MDXContent';
import { ShareButtons } from '@/components/ShareButtons';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
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
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return { title: 'Post Not Found | Solomon Amos' };
  }

  return {
    title: `${post.title} | Solomon Amos`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen pt-24">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-mono text-muted hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag.toLowerCase()}`}
                className="px-2 py-1 border border-border text-[10px] font-mono text-muted hover:border-accent hover:text-accent transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-medium text-foreground mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-6 text-sm font-mono text-muted-dark">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <MDXContent content={post.content} />
        </div>

        {/* Share */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-mono text-muted">Share this article</span>
            <ShareButtons title={post.title} slug={slug} />
          </div>
        </div>

        {/* Author */}
        <div className="mt-8 p-6 border border-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border border-accent flex items-center justify-center font-mono text-accent">
              SA
            </div>
            <div>
              <div className="font-medium text-foreground">Solomon Amos</div>
              <div className="text-sm text-muted">AI & Technology Consultant</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
