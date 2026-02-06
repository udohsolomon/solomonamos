import { getPostBySlug, getAllPostSlugs, getAllPosts } from '@/lib/posts';
import { MDXContent } from '@/components/MDXContent';
import { ShareButtons } from '@/components/ShareButtons';
import { ReadingProgress } from '@/components/ReadingProgress';
import { ArrowLeft, Clock, Calendar, ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://solomonamos.com';

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

  const postUrl = `${siteUrl}/blog/${slug}`;

  return {
    title: `${post.title} | Solomon Amos`,
    description: post.excerpt,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Solomon Amos'],
      tags: post.tags,
      url: postUrl,
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [`${siteUrl}/og-image.png`],
    },
  };
}

function getAdjacentPosts(slug: string) {
  const posts = getAllPosts();
  const currentIndex = posts.findIndex((p) => p.slug === slug);
  return {
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
  };
}

function getRelatedPosts(slug: string, tags: string[], limit: number = 3) {
  const posts = getAllPosts().filter((p) => p.slug !== slug);
  const scored = posts.map((post) => {
    const sharedTags = post.tags.filter((t) =>
      tags.map((tag) => tag.toLowerCase()).includes(t.toLowerCase())
    );
    return { post, score: sharedTags.length };
  });
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post);
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { prev, next } = getAdjacentPosts(slug);
  const related = getRelatedPosts(slug, post.tags);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: 'Solomon Amos',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Person',
      name: 'Solomon Amos',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${slug}`,
    },
    keywords: post.tags.join(', '),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${siteUrl}/blog/${slug}`,
      },
    ],
  };

  return (
    <article className="min-h-screen pt-24">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm font-mono text-muted">
            <li>
              <Link href="/" className="hover:text-accent transition-colors">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3 h-3" />
            </li>
            <li>
              <Link href="/blog" className="hover:text-accent transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3 h-3" />
            </li>
            <li className="text-muted-dark truncate max-w-[200px]" aria-current="page">
              {post.title}
            </li>
          </ol>
        </nav>

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

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-medium text-foreground mb-6 font-mono">
              <span className="text-accent">$</span> Related Posts
            </h2>
            <div className="grid gap-4">
              {related.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                  <div className="group p-4 border border-border hover:border-accent/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground group-hover:text-accent transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-xs font-mono text-muted-dark mt-1">
                          {formatDate(relatedPost.date)} / {relatedPost.readTime}
                        </p>
                      </div>
                      <ArrowLeft className="w-4 h-4 text-muted group-hover:text-accent transition-colors rotate-180" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Previous / Next Navigation */}
        {(prev || next) && (
          <div className="mt-12 grid grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="group p-4 border border-border hover:border-accent/50 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-muted mb-2">
                  <ChevronLeft className="w-3 h-3" />
                  Previous
                </div>
                <div className="text-sm font-medium text-foreground group-hover:text-accent transition-colors line-clamp-2">
                  {prev.title}
                </div>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="group p-4 border border-border hover:border-accent/50 transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-2 text-xs font-mono text-muted mb-2">
                  Next
                  <ChevronRight className="w-3 h-3" />
                </div>
                <div className="text-sm font-medium text-foreground group-hover:text-accent transition-colors line-clamp-2">
                  {next.title}
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        )}
      </div>
    </article>
  );
}
