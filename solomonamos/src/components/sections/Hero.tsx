'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { TerminalBlock, TerminalLine } from '@/components/ui/TerminalBlock';

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden grid-bg">
      {/* Aurora effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Layer 1: Primary cyan band */}
        <div
          className="absolute w-[800px] h-[600px] -top-[100px] left-[10%] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,217,255,0.15) 0%, rgba(0,217,255,0.05) 50%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'aurora 8s ease-in-out infinite',
          }}
        />
        {/* Layer 2: Deep cyan band */}
        <div
          className="absolute w-[600px] h-[500px] top-[5%] right-[5%] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,184,217,0.12) 0%, rgba(8,145,178,0.06) 50%, transparent 70%)',
            filter: 'blur(50px)',
            animation: 'aurora 12s ease-in-out infinite reverse',
          }}
        />
        {/* Layer 3: Green accent */}
        <div
          className="absolute w-[500px] h-[400px] bottom-[10%] left-[30%] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(132,204,22,0.08) 0%, transparent 60%)',
            filter: 'blur(50px)',
            animation: 'aurora 10s ease-in-out infinite',
            animationDelay: '2s',
          }}
        />
      </div>
      
      <div className="max-w-6xl mx-auto px-6 py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-border bg-background/60 backdrop-blur-sm text-xs font-mono text-muted">
              <Sparkles className="w-3 h-3 text-accent" />
              <span>AI & Technology Consultant</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold leading-tight tracking-tight">
              Building the future,
              <br />
              <span className="text-gradient">one system at a time.</span>
            </h1>
            
            <p className="text-lg text-muted max-w-lg leading-relaxed">
              I help organisations design and implement secure, scalable, and
              AI-powered solutions that accelerate growth and efficiency.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background font-mono text-sm hover:bg-accent-hover glow-accent-hover transition-all"
              >
                Book a Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#products"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-muted font-mono text-sm hover:border-accent hover:text-accent transition-colors"
              >
                View Products
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 sm:gap-8 pt-4">
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
          <div className="hidden md:flex items-center justify-center">
            <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
              <TerminalBlock title="solomon@system ~ " className="animate-fade-in" animated={true}>
                <div className="space-y-3">
                  <TerminalLine prefix="$" delay={100}>
                    whoami
                  </TerminalLine>
                  <TerminalLine prefix=" " delay={300}>
                    <span className="text-foreground font-medium">Solomon Amos</span> - Technical Architect
                  </TerminalLine>
                  <TerminalLine prefix="$" delay={500}>
                    cat skills.txt
                  </TerminalLine>
                  <TerminalLine prefix=" " delay={700}>
                    <span className="text-accent">{'['}</span> AI & Automation <span className="text-accent">{']'}</span>
                  </TerminalLine>
                  <TerminalLine prefix=" " delay={800}>
                    <span className="text-accent">{'['}</span> Cloud Architecture <span className="text-accent">{']'}</span>
                  </TerminalLine>
                  <TerminalLine prefix=" " delay={900}>
                    <span className="text-accent">{'['}</span> Security & Compliance <span className="text-accent">{']'}</span>
                  </TerminalLine>
                  <TerminalLine prefix=" " delay={1000}>
                    <span className="text-accent">{'['}</span> Enterprise Solutions <span className="text-accent">{']'}</span>
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
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-muted">scroll</span>
        <ChevronDown className="w-4 h-4 text-accent animate-bounce" />
      </div>
    </section>
  );
}
