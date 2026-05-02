'use client';

import { useHashNavigation } from '@/hooks/useHashNavigation';
import { ReactNode } from 'react';

interface HashLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function HashLink({ href, children, className, onClick }: HashLinkProps) {
  const { navigateToSection } = useHashNavigation();

  const handleClick = (e: React.MouseEvent) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      navigateToSection(href);
    }
    onClick?.();
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
