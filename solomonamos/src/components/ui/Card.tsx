import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'border border-border bg-background/80 p-6',
        hover && 'hover:border-accent/50 transition-colors duration-300',
        className
      )}
    >
      {children}
    </div>
  );
}
