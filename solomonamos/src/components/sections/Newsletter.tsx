'use client';

import { useState } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        const data = await response.json();
        console.error('Subscription error:', data.error);
        setStatus('error');
      }
    } catch (error) {
      console.error('Network error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="newsletter" className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <SectionHeader
            label="04"
            title="Join the Newsletter"
            description="Get insights on AI, technology, and building software that matters. No spam, just high-signal content when I have something valuable to share."
            className="text-center"
          />

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-mono text-foreground">1,000+</div>
              <div className="text-xs text-muted font-mono">Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono text-foreground">50%+</div>
              <div className="text-xs text-muted font-mono">Open Rate</div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-accent font-mono text-sm">
                  {'>'}
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-8 pr-4 py-3 bg-background border border-border text-foreground font-mono text-sm placeholder:text-muted-dark focus:outline-none focus:border-accent transition-colors"
                  disabled={status === 'loading' || status === 'success'}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="px-6 py-3 bg-accent text-background font-mono text-sm hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <span className="animate-pulse">Subscribing...</span>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    Subscribe
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Status messages */}
            {status === 'success' && (
              <div className="mt-4 flex items-center justify-center gap-2 text-lime text-sm font-mono">
                <CheckCircle className="w-4 h-4" />
                Welcome! Check your inbox to confirm.
              </div>
            )}
            {status === 'error' && (
              <div className="mt-4 flex items-center justify-center gap-2 text-red-500 text-sm font-mono">
                <AlertCircle className="w-4 h-4" />
                Something went wrong. Please try again.
              </div>
            )}
          </form>

          {/* Trust indicators */}
          <p className="mt-6 text-xs text-muted-dark font-mono">
            Free forever. Unsubscribe anytime. No spam.
          </p>
        </div>

        {/* Featured topics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {['AI & Automation', 'Software Architecture', 'Tech Strategy', 'Building in Public'].map(
            (topic) => (
              <div
                key={topic}
                className="p-4 border border-border text-center font-mono text-xs text-muted hover:border-accent/50 hover:text-accent transition-colors"
              >
                {topic}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
