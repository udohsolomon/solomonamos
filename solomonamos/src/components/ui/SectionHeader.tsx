import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({ label, title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12', className)}>
      <div className="font-mono text-xs text-accent mb-2 tracking-wider">
        {'[ '}{label.toUpperCase()}{' ]'}
      </div>
      <h2 className="text-3xl md:text-4xl font-sans font-medium text-foreground mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-muted max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
