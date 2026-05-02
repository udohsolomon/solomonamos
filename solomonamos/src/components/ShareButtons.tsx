'use client';

import { useState } from 'react';
import { Twitter, Linkedin, Check, Share2 } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://solomonamos.com';

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = `${siteUrl}/blog/${slug}`;

  const copyToClipboard = () => {
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex gap-3">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>
      <button
        onClick={copyToClipboard}
        className="w-10 h-10 border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors"
        aria-label={copied ? 'Link copied' : 'Copy link'}
      >
        {copied ? <Check className="w-4 h-4 text-lime" /> : <Share2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
