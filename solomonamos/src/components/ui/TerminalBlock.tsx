'use client';

import { cn } from '@/lib/utils';

interface TerminalBlockProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  animated?: boolean;
}

export function TerminalBlock({ children, title = 'terminal', className, animated = true }: TerminalBlockProps) {
  return (
    <div className={cn('relative', animated && 'glow-border-terminal', className)}>
      {/* Inner container that sits above the ::after background */}
      <div className="relative z-[5] m-[2px] bg-background">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-accent/20 bg-muted-darker/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="font-mono text-xs text-muted ml-2">{title}</span>
        </div>
        {/* Terminal Content */}
        <div className="p-5 font-mono text-sm">
          {children}
        </div>
      </div>
    </div>
  );
}

interface TerminalLineProps {
  prefix?: string;
  children: React.ReactNode;
  delay?: number;
}

export function TerminalLine({ prefix = '>', children, delay = 0 }: TerminalLineProps) {
  return (
    <div 
      className="flex items-start gap-2 animate-terminal-line opacity-0"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <span className="text-accent flex-shrink-0">{prefix}</span>
      <span className="text-muted">{children}</span>
    </div>
  );
}
