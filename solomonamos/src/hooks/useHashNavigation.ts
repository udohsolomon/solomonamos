'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useCallback } from 'react';

export function useHashNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  // Handle scroll to hash after navigation
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && pathname === '/') {
      // Small delay to ensure DOM is ready after navigation
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [pathname]);

  const navigateToSection = useCallback(
    (sectionId: string) => {
      const id = sectionId.replace('#', '');

      if (pathname === '/') {
        // On homepage, just scroll
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        // Update URL without full navigation
        window.history.pushState(null, '', `#${id}`);
      } else {
        // Not on homepage, navigate with hash
        router.push(`/#${id}`);
      }
    },
    [pathname, router]
  );

  return { navigateToSection, isHomepage: pathname === '/' };
}
