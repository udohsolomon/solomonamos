import { SectionHeader } from '@/components/ui/SectionHeader';
import { Cpu, Code, Lightbulb, Zap } from 'lucide-react';

const values = [
  {
    icon: Lightbulb,
    title: 'Strategic Thinking',
    description: 'Every project starts with understanding the bigger picture and aligning technology with business goals.',
  },
  {
    icon: Code,
    title: 'Technical Excellence',
    description: 'Clean, maintainable code and robust architectures that stand the test of time and scale.',
  },
  {
    icon: Cpu,
    title: 'AI-First Approach',
    description: 'Leveraging the latest in AI and machine learning to build intelligent, adaptive systems.',
  },
  {
    icon: Zap,
    title: 'Rapid Execution',
    description: 'Moving fast without breaking things. Delivering value early and iterating based on feedback.',
  },
];

export function About() {
  return (
    <section id="about" className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Story */}
          <div>
            <SectionHeader
              label="01"
              title="About Me"
              description="The intersection of strategy and execution."
            />
            
            <div className="space-y-6 text-muted leading-relaxed">
              <p>
                I am Solomon Amos, an AI strategist and software engineer with over 8 years 
                of experience building technology solutions for businesses across industries.
              </p>
              <p>
                My journey started in traditional software development, but I quickly became 
                fascinated by the potential of AI and machine learning to transform how we 
                build and interact with software.
              </p>
              <p>
                Today, I help companies navigate the rapidly evolving AI landscape - from 
                developing custom AI solutions to building automated workflows that save 
                thousands of hours.
              </p>
              <p className="text-foreground font-medium">
I believe the best technology is invisible - it just works, making lives
                easier and businesses more efficient.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-8 pt-8 border-t border-border">
              <div className="font-mono text-sm">
                <span className="text-accent">{'>'}</span> Solomon Amos
              </div>
              <div className="text-xs text-muted-dark mt-1">
                AI & Technology Consultant
              </div>
            </div>
          </div>

          {/* Right: Values */}
          <div className="space-y-6">
            <div className="font-mono text-xs text-accent mb-4">
              {'// CORE_VALUES'}
            </div>
            {values.map((value, index) => (
              <div
                key={value.title}
                className="group p-6 border border-border hover:border-accent/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-accent/30 flex items-center justify-center flex-shrink-0 group-hover:border-accent transition-colors">
                    <value.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted-dark mb-1">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="font-medium text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
