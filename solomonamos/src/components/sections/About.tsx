import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/Reveal';
import { Bot, Cloud, Shield, Database, Server } from 'lucide-react';

const specialisations = [
  {
    icon: Bot,
    title: 'Applied AI & Agentic Systems',
    description: 'Production GenAI on Claude — Anthropic SDK, MCP servers, multi-agent orchestration, RAG, tool use, and evaluations.',
  },
  {
    icon: Cloud,
    title: 'Cloud Architecture',
    description: 'AWS, Azure, and multi-cloud migrations, optimisations, and cost management.',
  },
  {
    icon: Server,
    title: 'Enterprise Solutions',
    description: 'Microservices, containerisation (Kubernetes, Docker), DevOps and DevSecOps.',
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'Cloud security frameworks, IAM, Just-in-Time access, and data protection.',
  },
  {
    icon: Database,
    title: 'Data & Analytics',
    description: 'ML/AI pipelines, real-time analytics, and scalable data platforms.',
  },
];

const certifications = [
  'Anthropic Claude Architect (Foundations) - in progress',
  'AWS Certified Solutions Architect - Professional',
  'AWS Certified Machine Learning - Specialty',
  'AWS Certified AI Practitioner',
  'AWS Certified DevOps Engineer - Professional',
  'AWS Certified Advanced Networking - Specialty',
  'AWS Certified Data Analytics - Specialty',
  'AWS Certified Security - Specialty',
];

export function About() {
  return (
    <section id="about" className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16">
          {/* Left: Story */}
          <div>
            <SectionHeader
              label="01"
              title="About Me"
              description="Where strategy meets execution."
            />

            <div className="space-y-6 text-muted leading-relaxed">
              <p>
                I help organisations design and implement secure, scalable, AI-powered
                solutions that accelerate growth and efficiency. With over 8 years of experience
                across Fortune 500 companies, AI-native start-ups, UK Central Government, and
                small businesses worldwide, I bring a rare blend of deep technical expertise
                and strategic thinking.
              </p>
              <p>
                Currently, I serve as Lead Technical Architect &amp; AI Enablement Lead at
                Accenture, delivering AI strategy, transformation, and enablement across
                large-scale public-sector modernisation programmes — highly regulated
                environments where security, ethics, and performance are non-negotiable.
                I am SC Cleared and willing to uplift to DV.
              </p>
              <p>
                Outside Accenture, I am a hands-on builder of production GenAI products on
                Claude — agentic systems, multi-agent orchestration, MCP servers, RAG, and
                evaluations — including driveroutes, ClawStack, ClawCert, Nexus, HomePortfolio,
                and VibeGTM.
              </p>
              <p>
                I also hold a PhD in Engineering with research in machine learning and
                cybersecurity, and lecture in Applied AI and Machine Learning on the Online
                MSc Computer Science programme at the University of York.
              </p>
              <p className="text-foreground font-medium">
                I believe the best technology is invisible - it just works, making organisations
                more efficient and people more productive.
              </p>
            </div>

            {/* Certifications */}
            <div className="mt-8 pt-8 border-t border-border">
              <div className="font-mono text-xs text-accent mb-4">
                {'// CERTIFICATIONS'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {certifications.map((cert) => (
                  <div key={cert} className="flex items-start gap-2 text-sm font-mono text-muted">
                    <span className="text-accent flex-shrink-0">+</span>
                    {cert}
                  </div>
                ))}
              </div>
            </div>

            {/* Signature */}
            <div className="mt-8 pt-8 border-t border-border">
              <div className="font-mono text-sm">
                <span className="text-accent">{'>'}</span> Solomon Amos
              </div>
              <div className="text-xs text-muted-dark mt-1">
                Lead Technical Architect &amp; AI Enablement Lead | PhD, Engineering (ML &amp; Security)
              </div>
            </div>
          </div>

          {/* Right: Specialisations */}
          <div className="space-y-4">
            <div className="font-mono text-xs text-accent mb-4">
              {'// SPECIALISATIONS'}
            </div>
            {specialisations.map((spec, index) => (
              <div
                key={spec.title}
                className="group p-5 border border-border hover:border-accent/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-accent/30 flex items-center justify-center flex-shrink-0 group-hover:border-accent transition-colors">
                    <spec.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted-dark mb-1">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="font-medium text-foreground mb-1">{spec.title}</h3>
                    <p className="text-sm text-muted">{spec.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
