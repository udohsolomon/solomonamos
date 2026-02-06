'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Check, Copy } from 'lucide-react';

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-1.5 border border-border text-muted hover:text-accent hover:border-accent transition-colors bg-background/80 backdrop-blur-sm"
      aria-label={copied ? 'Copied' : 'Copy code'}
    >
      {copied ? <Check className="w-3.5 h-3.5 text-lime" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

function extractTextContent(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (!node) return '';
  if (Array.isArray(node)) return node.map(extractTextContent).join('');
  if (typeof node === 'object' && 'props' in node) {
    return extractTextContent((node as React.ReactElement).props.children);
  }
  return '';
}

function generateHeadingId(children: React.ReactNode): string {
  const text = extractTextContent(children);
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

const components = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = generateHeadingId(children);
    return <h1 id={id} className="text-3xl font-medium text-foreground mt-10 mb-4 scroll-mt-24" {...props}>{children}</h1>;
  },
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = generateHeadingId(children);
    return (
      <h2 id={id} className="text-2xl font-medium text-foreground mt-10 mb-4 scroll-mt-24 group" {...props}>
        <a href={`#${id}`} className="no-underline hover:text-accent transition-colors">
          {children}
        </a>
      </h2>
    );
  },
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = generateHeadingId(children);
    return (
      <h3 id={id} className="text-xl font-medium text-foreground mt-8 mb-3 scroll-mt-24" {...props}>
        <a href={`#${id}`} className="no-underline hover:text-accent transition-colors">
          {children}
        </a>
      </h3>
    );
  },
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-muted leading-relaxed mb-4" {...props}>{children}</p>
  ),
  a: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href || '#'} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside text-muted mb-4 space-y-2 ml-4" {...props}>{children}</ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside text-muted mb-4 space-y-2 ml-4" {...props}>{children}</ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-muted" {...props}>{children}</li>
  ),
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-2 border-accent pl-4 italic text-muted my-6" {...props}>{children}</blockquote>
  ),
  code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="px-1.5 py-0.5 bg-muted-darker text-accent font-mono text-sm rounded" {...props}>
          {children}
        </code>
      );
    }
    return <code className={className} {...props}>{children}</code>;
  },
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    const codeText = extractTextContent(children);
    return (
      <div className="relative group my-6">
        <pre className="p-4 bg-muted-darker border border-border font-mono text-sm overflow-x-auto rounded" {...props}>
          {children}
        </pre>
        <CopyButton code={codeText} />
      </div>
    );
  },
  hr: () => <hr className="border-border my-8" />,
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="text-foreground font-medium" {...props}>{children}</strong>
  ),
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border border-border" {...props}>{children}</table>
    </div>
  ),
  thead: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead {...props}>{children}</thead>
  ),
  tbody: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody {...props}>{children}</tbody>
  ),
  tr: ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr {...props}>{children}</tr>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="border border-border px-4 py-2 text-left text-foreground font-medium bg-muted-darker" {...props}>{children}</th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-border px-4 py-2 text-muted" {...props}>{children}</td>
  ),
};

interface MDXContentProps {
  content: string;
}

export function MDXContent({ content }: MDXContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={components as any}
    >
      {content}
    </ReactMarkdown>
  );
}
