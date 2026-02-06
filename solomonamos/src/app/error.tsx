'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-lg w-full">
        <div className="border border-border p-8">
          {/* Terminal header */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs font-mono text-muted">error</span>
          </div>

          {/* Content */}
          <div className="font-mono space-y-4">
            <div className="text-red-500 text-sm">$ process crashed</div>
            <div className="text-2xl font-bold text-foreground">Something went wrong</div>
            <div className="text-muted text-sm">
              An unexpected error occurred. The process has been logged.
            </div>
            <div className="text-muted-dark text-xs">
              SIGTERM received - attempting recovery...
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8">
            <button
              onClick={reset}
              className="px-4 py-2 border border-accent text-accent text-sm font-mono hover:bg-accent hover:text-background transition-colors"
            >
              retry process
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
