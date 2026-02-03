import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { ArrowUpRight, Bot, Code2, LineChart, Workflow } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: Bot,
    title: 'AI Strategy & Implementation',
    description: 'From identifying AI opportunities to deploying production systems. I help you navigate the AI landscape and build solutions that deliver real business value.',
    features: ['AI/ML Solution Architecture', 'Custom LLM Applications', 'AI Integration Strategy', 'Model Selection & Fine-tuning'],
    tag: 'STRATEGY',
  },
  {
    icon: Code2,
    title: 'Software Development',
    description: 'Full-stack development with modern technologies. Building scalable, maintainable applications that grow with your business.',
    features: ['Web Applications', 'API Development', 'Cloud Infrastructure', 'Database Design'],
    tag: 'DEVELOPMENT',
  },
  {
    icon: Workflow,
    title: 'Automation & Integration',
    description: 'Connecting your tools and automating repetitive tasks. Save hours every week with intelligent workflows.',
    features: ['Workflow Automation', 'System Integration', 'Data Pipelines', 'Custom Tooling'],
    tag: 'AUTOMATION',
  },
  {
    icon: LineChart,
    title: 'Technical Consulting',
    description: 'Expert guidance for your technology decisions. Architecture reviews, tech stack selection, and strategic planning.',
    features: ['Architecture Review', 'Tech Stack Advisory', 'Performance Optimization', 'Security Assessment'],
    tag: 'CONSULTING',
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 border-t border-border bg-muted-darker/20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          label="02"
          title="Services"
          description="End-to-end solutions for businesses ready to leverage technology for growth."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <Card key={service.title} className="group relative overflow-hidden">
              {/* Tag */}
              <div className="absolute top-6 right-6 font-mono text-[10px] text-accent">
                {service.tag}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 border border-accent/30 flex items-center justify-center mb-6 group-hover:border-accent transition-colors">
                <service.icon className="w-6 h-6 text-accent" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-medium text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-muted mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-xs font-mono text-muted">
                    <span className="text-accent">+</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 text-sm text-accent font-mono group-hover:gap-3 transition-all"
              >
                Learn more
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Card>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-12 p-8 border border-border bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-medium text-foreground mb-2">
                Have a project in mind?
              </h3>
              <p className="text-muted text-sm">
                Let&apos;s discuss how I can help bring your vision to life.
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
