import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/Reveal';
import { ArrowUpRight, Workflow, Target, Home, Layers, Map, Network, GraduationCap, Cloud, BookOpen } from 'lucide-react';
import Link from 'next/link';

const products = [
  {
    title: 'Nexus',
    description: 'Enterprise AI workflow automation platform with 35+ integrations, multi-step automation with conditional logic, human approval gates, and role-based access. Per-client project structures with knowledge retention across engagements.',
    features: ['35+ Integrations', 'Multi-Step Automation', 'LLM Actions', 'Human Approval Gates', 'Role-Based Access'],
    tag: 'PLATFORM',
    icon: Workflow,
    link: 'https://usenexuslab.com',
    highlight: true,
  },
  {
    title: 'HomePortfolio',
    description: 'Autonomous intelligence platform that turns 30 million UK property records into decisions. One question triggers autonomous specialised agents querying fifteen authoritative sources simultaneously, validating findings, and synthesising a professional investment memo in under thirty seconds.',
    features: ['Autonomous Specialised Agents', '15 Authoritative Sources', '30M+ Property Records', 'Portfolio Memory', 'Investment Memo Generation'],
    tag: 'PROPTECH',
    icon: Home,
    link: 'https://homeportfolio.com',
    highlight: true,
  },
  {
    title: 'VibeGTM',
    description: 'AI-powered lead generation and outreach platform built on the Anthropic SDK with MCP-server integration. Users describe their ideal customer in natural language; the system searches and qualifies prospects, then launches personalised multi-channel outreach with campaign analytics.',
    features: ['Anthropic SDK + MCP', 'Natural Language Prospecting', 'Signal-Based Enrichment', 'Multi-Channel Outreach', 'Campaign Analytics'],
    tag: 'LEAD GEN',
    icon: Target,
    highlight: true,
  },
  {
    title: 'driveroutes',
    description: 'AI-first iOS and Android app helping UK learner drivers prepare for the practical driving test. Anthropic Claude tool-use loop with SSE streaming and pgvector RAG over route metadata and the DVSA Highway Code, on a self-hosted FastAPI / Postgres+PostGIS / Valhalla routing stack.',
    features: ['Claude Tool-Use Loop', 'pgvector RAG', 'DVSA Highway Code', 'React Native + Expo', 'Self-Hosted Stack'],
    tag: 'MOBILE AI',
    icon: Map,
    link: 'https://driveroutes.app',
    highlight: true,
  },
  {
    title: 'ClawStack',
    description: 'Multi-agent deployment and orchestration platform. Pick a model, pick a channel, sign in with Google, and your personal AI assistant is live across WhatsApp, Telegram, Discord or Slack. Sub-agent spawning with depth and budget controls, a tools-and-skills marketplace, and automated VPS provisioning behind the scenes.',
    features: ['Multi-Agent Orchestration', 'Sub-Agent Spawning', 'Multi-Channel Routing', 'Tools / Skills Marketplace', 'Multi-Tenant SaaS'],
    tag: 'AGENTS',
    icon: Network,
    highlight: true,
  },
  {
    title: 'ClawCert',
    description: 'Adaptive learning platform for the Anthropic Claude Certified Architect (Foundations) certification. Three layers: a 175-node knowledge-graph DAG mapping the five exam domains, a Bayesian Knowledge Tracing + spaced-repetition adaptive engine, and Archie — a Claude-powered Socratic tutor with graduated hints and misconception detection.',
    features: ['Knowledge Graph DAG', 'Bayesian Knowledge Tracing', 'SM-2 Spaced Repetition', 'Claude Socratic Tutor', 'Adaptive Sequencing'],
    tag: 'EDU AI',
    icon: GraduationCap,
    highlight: true,
  },
];

const trackRecord = [
  {
    company: 'Accenture UK',
    role: 'Lead Technical Architect & AI Enablement Lead',
    description: 'Lead architect on UK Central Government modernisation engagements. AI strategy, transformation, and enablement across regulated public-sector programmes — alongside legacy modernisation and customer-service transformation. SC Cleared, willing to uplift to DV.',
    icon: Layers,
  },
  {
    company: 'Synoptek',
    role: 'Cloud Architect Consultant',
    description: 'Customer-facing technical advisor to enterprise clients. Led discovery, design, and execution of large-scale AWS migration and modernisation programmes; partnered with C-suite and senior IT stakeholders on technology strategy and 12–24 month roadmaps.',
    icon: Cloud,
  },
  {
    company: 'University of York',
    role: 'Lecturer, Applied AI & Machine Learning (2020–2023)',
    description: 'Taught MSc-level postgraduate students on the Online Computer Science programme. Modules: Applied AI, Big Data Analytics & Machine Learning, Algorithms & Data Structures, Computer Networks & Security.',
    icon: BookOpen,
  },
];

export function Products() {
  return (
    <section id="products" className="relative py-32 border-t border-border bg-background overflow-hidden">
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(38, 38, 38, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(38, 38, 38, 0.3) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Glow orb */}
      <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[150px]" />

      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <Reveal>
        <SectionHeader
          label="02"
          title="Products & Solutions"
          description="AI and automation platforms I have designed and built."
          className="mb-12 md:mb-16"
        />

        {/* Featured Products */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <Card key={product.title} className="group relative overflow-hidden">
              {/* Tag */}
              <div className="absolute top-6 right-6 font-mono text-[10px] text-accent">
                {product.tag}
              </div>

              {/* Icon */}
              <div className="w-10 h-10 border border-accent/30 flex items-center justify-center mb-4 group-hover:border-accent transition-colors">
                <product.icon className="w-5 h-5 text-accent" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-medium text-foreground mb-2">
                {product.title}
              </h3>
              <p className="text-sm text-muted mb-4 leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              <ul className="space-y-1.5 mb-4">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-xs font-mono text-muted">
                    <span className="text-accent">+</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {product.link ? (
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-accent font-mono group-hover:gap-3 transition-all"
                >
                  Visit site
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              ) : (
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm text-accent font-mono group-hover:gap-3 transition-all"
                >
                  Learn more
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              )}

              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Card>
          ))}
        </div>

        {/* Track Record */}
        <div className="mt-16">
          <div className="font-mono text-xs text-accent mb-6">
            {'// TRACK_RECORD'}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {trackRecord.map((item) => (
              <div
                key={item.company}
                className="group p-5 border border-border border-l-2 border-l-accent/40 hover:border-accent/50 hover:border-l-accent transition-colors"
              >
                <div className="flex items-start gap-4">
                  <item.icon className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-foreground">{item.company}</h4>
                    <div className="text-xs font-mono text-muted mb-2 uppercase tracking-wider">{item.role}</div>
                    <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-12 p-8 border border-border bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-medium text-foreground mb-2">
                Need a custom solution?
              </h3>
              <p className="text-muted text-sm">
                Let&apos;s discuss how I can architect and build the right system for your organisation.
              </p>
            </div>
            <Link
              href="#contact"
              className="px-6 py-3 bg-accent text-background font-mono text-sm hover:bg-accent-hover transition-colors whitespace-nowrap"
            >
              Schedule a Call
            </Link>
          </div>
        </div>
        </Reveal>
      </div>

    </section>
  );
}
