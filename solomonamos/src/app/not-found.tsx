import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-lg w-full">
        <div className="border border-border p-8">
          {/* Terminal header */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs font-mono text-muted">not-found</span>
          </div>

          {/* Content */}
          <div className="font-mono space-y-4">
            <div className="text-accent text-sm">$ find /page</div>
            <div className="text-6xl font-bold text-foreground">404</div>
            <div className="text-muted text-sm">
              Error: The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </div>
            <div className="text-muted-dark text-xs mt-2">
              Process exited with code 1
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="px-4 py-2 border border-accent text-accent text-sm font-mono hover:bg-accent hover:text-background transition-colors text-center"
            >
              cd /home
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 border border-border text-muted text-sm font-mono hover:border-accent hover:text-accent transition-colors text-center"
            >
              cd /blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
