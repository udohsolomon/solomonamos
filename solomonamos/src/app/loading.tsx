export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="font-mono text-sm text-muted flex items-center gap-2">
        <span className="text-accent">$</span>
        <span>loading</span>
        <span className="inline-flex">
          <span className="animate-pulse">.</span>
          <span className="animate-pulse" style={{ animationDelay: '200ms' }}>.</span>
          <span className="animate-pulse" style={{ animationDelay: '400ms' }}>.</span>
        </span>
      </div>
    </div>
  );
}
