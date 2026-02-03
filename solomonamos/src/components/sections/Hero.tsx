'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TerminalBlock, TerminalLine } from '@/components/ui/TerminalBlock';

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden grid-bg">
      {/* Gradient orb */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-lime/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-border text-xs font-mono text-muted">
              <Sparkles className="w-3 h-3 text-accent" />
              <span>AI & Technology Consultant</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-medium leading-tight">
              Building the future,
              <br />
              <span className="text-gradient">one system at a time.</span>
            </h1>
            
            <p className="text-lg text-muted max-w-lg leading-relaxed">
              I help businesses leverage AI and emerging technologies to build 
              intelligent systems that scale. From strategy to implementation.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background font-mono text-sm hover:bg-accent-hover transition-colors"
              >
                Book a Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-muted font-mono text-sm hover:border-accent hover:text-accent transition-colors"
              >
                View Services
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-2xl font-mono text-foreground">50+</div>
                <div className="text-xs text-muted font-mono">Projects Delivered</div>
              </div>
              <div>
                <div className="text-2xl font-mono text-foreground">8+</div>
                <div className="text-xs text-muted font-mono">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl font-mono text-foreground">100%</div>
                <div className="text-xs text-muted font-mono">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right: Terminal */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
              <TerminalBlock title="solomon@system ~ " className="animate-fade-in" animated={true}>
                <div className="space-y-3">
                  <TerminalLine prefix="$" delay={100}>
                    whoami
                  </TerminalLine>
                  <TerminalLine prefix=" " delay={300}>
                    <span className="text-foreground font-medium">Solomon Amos</span> - AI Strategist & Engineer
                  </TerminalLine>
                  <TerminalLine prefix="$" delay={500}>
                    cat skills.txt
                  </TerminalLine>
                  <TerminalLine prefix=" " delay={700}>
                    <span className="text-accent">{'['}</span> AI/ML Systems <span className="text-accent">{']'}</span>
                  </TerminalLine>
                  <TerminalLine prefix=" " delay={800}>
                    <span className="text-accent">{'['}</span> Full-Stack Development <span className="text-accent">{']'}</span>
                  </TerminalLine>
                  <TerminalLine prefix=" " delay={900}>
                    <span className="text-accent">{'['}</span> Cloud Architecture <span className="text-accent">{']'}</span>
                  </TerminalLine>
                  <TerminalLine prefix=" " delay={1000}>
                    <span className="text-accent">{'['}</span> Automation & Integration <span className="text-accent">{']'}</span>
                  </TerminalLine>
                  <TerminalLine prefix="$" delay={1200}>
                    ./start_collaboration.sh
                  </TerminalLine>
                  <TerminalLine prefix=" " delay={1400}>
                    <span className="text-lime">Ready to build something amazing...</span>
                    <span className="animate-blink">|</span>
                  </TerminalLine>
                </div>
              </TerminalBlock>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse">
        <span className="text-xs font-mono text-muted">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted to-transparent" />
      </div>
    </section>
  );
}
