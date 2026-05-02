'use client';

import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { HashLink } from '@/components/HashLink';

const socialLinks = [
  { href: 'https://x.com/laz_inc', icon: Twitter, label: 'Twitter' },
  { href: 'https://www.linkedin.com/in/solomonudoh/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://github.com/udohsolomon', icon: Github, label: 'GitHub' },
  { href: 'mailto:hello@solomonamos.com', icon: Mail, label: 'Email' },
];

const footerLinks = [
  { href: '#about', label: 'About' },
  { href: '#products', label: 'Products' },
  { href: '#writing', label: 'Writing' },
  { href: '#newsletter', label: 'Newsletter' },
  { href: '#contact', label: 'Contact' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="font-mono text-sm mb-4">
              <span className="text-muted">{'// '}</span>
              <span className="text-foreground">Solomon Amos</span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              AI strategist and software engineer helping businesses navigate the future of technology.
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="font-mono text-xs text-accent mb-4">{'// NAV_LINKS'}</div>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <HashLink
                    href={link.href}
                    className="text-sm text-muted hover:text-accent transition-colors font-mono"
                  >
                    <span className="text-muted-dark mr-2">{'>'}</span>
                    {link.label}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <div className="font-mono text-xs text-accent mb-4">{'// CONNECT'}</div>
            <p className="text-sm text-muted leading-relaxed mb-4">
              Find me on the usual platforms. DMs and emails open.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-xs text-muted-dark">
            <span className="text-accent">{'>'}</span> {currentYear} Solomon Amos. All systems operational.
          </div>
          <div className="font-mono text-xs text-muted-dark">
            STATUS: <span className="text-lime">ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
