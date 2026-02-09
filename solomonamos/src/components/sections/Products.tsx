import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { ArrowUpRight, Workflow, Target, Home, Building2, Brain, Layers, Database } from 'lucide-react';
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
    title: 'VibeGTM',
    description: 'AI-powered lead generation and outreach platform. Users describe their ideal customer in natural language, the system searches and qualifies prospects, then launches personalised multi-channel outreach with campaign analytics.',
    features: ['Natural Language Prospecting', 'Signal-Based Enrichment', 'Multi-Channel Outreach', 'CRM Integration', 'Campaign Analytics'],
    tag: 'LEAD GEN',
    icon: Target,
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
];

const trackRecord = [
  {
    company: 'EliseAI',
    role: 'LeasingAI & ResidentAI',
    description: 'Helped design leasing and resident operations platforms now powering 1 in 8 US apartments. Complex lifecycle flows, RBAC, PMS integrations, and ops observability.',
    icon: Building2,
  },
  {
    company: 'Accenture',
    role: 'Technical Architect',
    description: 'Leading discovery and system design for enterprise ops platforms, workflow engines, admin systems, and integration layers across finance, operations, HR, and back-office systems.',
    icon: Layers,
  },
  {
    company: 'Stack AI',
    role: 'Enterprise Agent Infrastructure',
    description: 'Worked on enterprise agent deployment infrastructure including admin panels, workflow configuration, and integration layers for document-heavy operations.',
    icon: Brain,
  },
  {
    company: 'Sana Labs',
    role: 'Enterprise Knowledge Systems',
    description: 'Contributed to enterprise knowledge systems requiring careful permission modelling and auditability for compliance.',
    icon: Database,
  },
];

export function Products() {
  return (
    <section id="products" className="py-24 border-t border-border bg-muted-darker/20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          label="02"
          title="Products & Solutions"
          description="AI and automation platforms I have designed and built."
        />

        {/* Featured Products */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.title} className="group relative overflow-hidden">
              {/* Tag */}
              <div className="absolute top-6 right-6 font-mono text-[10px] text-accent">
                {product.tag}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 border border-accent/30 flex items-center justify-center mb-6 group-hover:border-accent transition-colors">
                <product.icon className="w-6 h-6 text-accent" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-medium text-foreground mb-3">
                {product.title}
              </h3>
              <p className="text-sm text-muted mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
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
                className="group p-5 border border-border hover:border-accent/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-accent/30 flex items-center justify-center flex-shrink-0 group-hover:border-accent transition-colors">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{item.company}</h4>
                    <div className="text-xs font-mono text-accent mb-2">{item.role}</div>
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
      </div>
    </section>
  );
}
