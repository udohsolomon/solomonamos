'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { Calendar, Mail, ExternalLink } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <div>
            <SectionHeader
              label="05"
              title="Let's Work Together"
              description="Have a project in mind? I'd love to hear about it. Book a call or send me a message."
            />

            <div className="space-y-6">
              {/* Calendly CTA */}
              <div className="p-6 border border-accent bg-accent/5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border border-accent flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-2">Schedule a Discovery Call</h3>
                    <p className="text-sm text-muted mb-4">
                      30-minute call to discuss your project, explore solutions, and see if we&apos;re a good fit.
                    </p>
                    <a
                      href="https://calendly.com/solomonamos/discovery"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-background font-mono text-sm hover:bg-accent-hover transition-colors"
                    >
                      Book a Call
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Alternative contact */}
              <div className="p-6 border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border border-border flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-muted" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-2">Send an Email</h3>
                    <p className="text-sm text-muted mb-2">
                      Prefer email? Send me a message directly.
                    </p>
                    <a
                      href="mailto:hello@solomonamos.com"
                      className="font-mono text-sm text-accent hover:underline"
                    >
                      hello@solomonamos.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Calendly Embed */}
          <div className="relative">
            <div className="font-mono text-xs text-accent mb-4">
              {'// BOOK_MEETING'}
            </div>

            {/* Calendly Inline Widget */}
            <div className="border border-border overflow-hidden">
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/solomonamos/discovery?hide_event_type_details=1&hide_gdpr_banner=1&background_color=0a0a0a&text_color=fafafa&primary_color=00d9ff"
                style={{ minWidth: '320px', height: '630px' }}
                title="Schedule a consultation with Solomon Amos"
              />
            </div>

            {/* Status indicator */}
            <div className="mt-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-lime rounded-full animate-pulse" />
              <span className="text-xs font-mono text-muted">
                Typically responds within 24 hours
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
