'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Menu, X, Terminal } from 'lucide-react';
import { HashLink } from '@/components/HashLink';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#writing', label: 'Writing' },
  { href: '#newsletter', label: 'Newsletter' },
  { href: '#contact', label: 'Contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || isMobileMenuOpen
          ? 'bg-background/95 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 border border-accent flex items-center justify-center group-hover:bg-accent/10 transition-colors">
              <Terminal className="w-4 h-4 text-accent" />
            </div>
            <span className="font-mono text-sm text-muted group-hover:text-foreground transition-colors">
              solomon<span className="text-accent">.</span>amos
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <HashLink
                key={link.href}
                href={link.href}
                className="font-mono text-sm text-muted hover:text-accent transition-colors relative group"
              >
                <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity mr-1">
                  {'//'}
                </span>
                {link.label}
              </HashLink>
            ))}
            <HashLink
              href="#contact"
              className="glow-border-btn font-mono text-sm relative group"
            >
              <span className="relative z-10 block px-4 py-2 text-accent group-hover:text-background transition-colors duration-300">
                Book a Call
              </span>
            </HashLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted hover:text-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <HashLink
                  key={link.href}
                  href={link.href}
                  className="font-mono text-sm text-muted hover:text-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-accent mr-2">{'>'}</span>
                  {link.label}
                </HashLink>
              ))}
              <HashLink
                href="#contact"
                className="font-mono text-sm px-4 py-2 border border-accent text-accent hover:bg-accent hover:text-background transition-all text-center mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book a Call
              </HashLink>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
