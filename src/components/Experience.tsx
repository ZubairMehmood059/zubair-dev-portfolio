import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { FadeIn } from './common/MotionComponents';
import { Calendar, MapPin, Briefcase, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export const Experience: React.FC = () => {
  const { experience, isPreviewMode } = usePortfolio();
  const [expandedId, setExpandedId] = useState<string | null>('exp-1');

  const visibleExp = experience.filter((exp) => isPreviewMode || exp.isPublished);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="experience"
      className="bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10 select-none overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <FadeIn delay={0} y={40} duration={0.8}>
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-4 sm:mb-6"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Experience
          </h2>
          <p className="text-center text-[#D7E2EA]/70 font-light max-w-2xl mx-auto uppercase tracking-wide text-xs sm:text-sm md:text-base mb-14 sm:mb-20">
            Professional software development track record, client contracts, responsive frontend engineering, and deployment delivery.
          </p>
        </FadeIn>

        {/* Experience Cards */}
        <div className="flex flex-col gap-10">
          {visibleExp.map((exp, index) => {
            const isExpanded = expandedId === exp.id;
            const numberFormatted = `0${index + 1}`;

            return (
              <FadeIn key={exp.id} delay={index * 0.15} y={30} duration={0.8}>
                <div className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:p-10 md:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.9)] hover:border-white transition-all duration-300">
                  {/* Top Bar: Huge number, role, company, period */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span
                        className="font-black text-[#D7E2EA] leading-none shrink-0"
                        style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
                      >
                        {numberFormatted}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono uppercase tracking-widest text-[#BBCCD7]/70">
                            {exp.type}
                          </span>
                          <span className="text-white/20">•</span>
                          <span className="text-xs font-mono text-[#BBCCD7]/70 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#D7E2EA]" />
                            {exp.location}
                          </span>
                        </div>
                        <h3
                          className="font-bold uppercase text-white tracking-tight"
                          style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2rem)' }}
                        >
                          {exp.role}
                        </h3>
                        <p className="text-sm font-medium uppercase tracking-wider text-[#BBCCD7]">
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-start sm:self-center">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border border-[#D7E2EA]/40 text-[#D7E2EA] bg-white/5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.period}</span>
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm sm:text-base text-[#D7E2EA]/80 font-light mt-6 mb-8 leading-relaxed max-w-4xl">
                    {exp.description}
                  </p>

                  {/* Verified Engineering Responsibilities */}
                  <div className="space-y-3 mb-8">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[#BBCCD7]/70 mb-3">
                      Key Engineering Responsibilities:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <div
                          key={rIdx}
                          className="p-3.5 rounded-[20px] bg-[#141414] border border-white/10 flex items-start gap-3"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#D7E2EA] shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-[#D7E2EA]/90 font-light leading-relaxed">
                            {resp}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies Stack */}
                  <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#BBCCD7]/60 mr-2">
                      Stack:
                    </span>
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider border border-[#D7E2EA]/30 text-[#D7E2EA] bg-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
