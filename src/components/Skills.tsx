import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { FadeIn } from './common/MotionComponents';
import { CheckCircle2, Sparkles, Terminal, Code2, Layers, Cpu } from 'lucide-react';
import { SkillItem } from '../types';

export const Skills: React.FC = () => {
  const { skills, isPreviewMode } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);

  const categories = ['All', 'Programming', 'Frontend', 'Backend / AI', 'Tools'];

  // Categorized skill buckets for structured visual presentation
  const categorizedBuckets = [
    {
      number: '01',
      category: 'Programming',
      title: 'Core Programming & Foundations',
      description: 'Foundational algorithmic problem solving, object-oriented architecture, and scripting languages.',
      skills: skills.filter((s) => s.category === 'Programming' && (isPreviewMode || s.isPublished)),
    },
    {
      number: '02',
      category: 'Frontend',
      title: 'Frontend & UI Architecture',
      description: 'Component-driven user interfaces, responsive mobile-first layouts, and modern web application state.',
      skills: skills.filter((s) => s.category === 'Frontend' && (isPreviewMode || s.isPublished)),
    },
    {
      number: '03',
      category: 'Backend / AI',
      title: 'Backend Systems & AI Engineering',
      description: 'Server-side API contracts, relational/document storage, and intelligent automated product workflows.',
      skills: skills.filter((s) => s.category === 'Backend / AI' && (isPreviewMode || s.isPublished)),
    },
    {
      number: '04',
      category: 'Tools',
      title: 'Engineering Tools & DevOps',
      description: 'Version control workflows, continuous integration, production deployment, and development environments.',
      skills: skills.filter((s) => s.category === 'Tools' && (isPreviewMode || s.isPublished)),
    },
  ];

  const visibleBuckets = useMemo(() => {
    if (selectedCategory === 'All') return categorizedBuckets;
    return categorizedBuckets.filter((b) => b.category === selectedCategory);
  }, [selectedCategory, categorizedBuckets]);

  return (
    <section
      id="skills"
      className="bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10 select-none overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <FadeIn delay={0} y={40} duration={0.8}>
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-4 sm:mb-6"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Skills
          </h2>
          <p className="text-center text-[#D7E2EA]/70 font-light max-w-2xl mx-auto uppercase tracking-wide text-xs sm:text-sm md:text-base mb-12 sm:mb-16">
            Authentic software engineering capabilities, programming languages, system architecture, and modern developer workflows.
          </p>
        </FadeIn>

        {/* Category Filter Pills in 3D Creator Style */}
        <FadeIn delay={0.15} y={20} duration={0.7}>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-14 sm:mb-18">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 sm:px-7 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#D7E2EA] text-[#0C0C0C] shadow-[0_0_20px_rgba(215,226,234,0.3)] scale-105'
                      : 'border-2 border-[#D7E2EA]/40 text-[#D7E2EA] hover:border-white hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Structured 3D Creator Skill Cards */}
        <div className="flex flex-col gap-8 sm:gap-12">
          {visibleBuckets.map((bucket, bIndex) => (
            <FadeIn key={bucket.number} delay={bIndex * 0.12} y={30} duration={0.8}>
              <div className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:border-white transition-all duration-300">
                {/* Header Row: Big Number + Category Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4 mb-6">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span
                      className="font-black text-[#D7E2EA] leading-none shrink-0"
                      style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
                    >
                      {bucket.number}
                    </span>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-[#BBCCD7]/70">
                        {bucket.category}
                      </span>
                      <h3
                        className="font-bold uppercase text-white tracking-tight"
                        style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)' }}
                      >
                        {bucket.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-3.5 py-1.5 rounded-full border border-white/15 text-[#BBCCD7] self-start sm:self-auto uppercase tracking-wider">
                    {bucket.skills.length} Technologies
                  </span>
                </div>

                {/* Subtitle / Description */}
                <p className="text-xs sm:text-sm text-[#D7E2EA]/70 font-light mb-8 max-w-3xl leading-relaxed">
                  {bucket.description}
                </p>

                {/* Skills Grid with Pills & Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bucket.skills.map((skill) => (
                    <div
                      key={skill.id}
                      onClick={() => setActiveSkill(activeSkill?.id === skill.id ? null : skill)}
                      className={`group p-4 sm:p-5 rounded-[24px] sm:rounded-[28px] border transition-all duration-200 cursor-pointer ${
                        activeSkill?.id === skill.id
                          ? 'border-[#D7E2EA] bg-white/10 shadow-lg'
                          : 'border-white/10 bg-[#121212]/80 hover:border-[#D7E2EA]/50 hover:bg-[#161616]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-white uppercase tracking-wider text-sm sm:text-base group-hover:text-[#D7E2EA] transition-colors">
                          {skill.name}
                        </span>
                        <span
                          className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${
                            skill.proficiencyTier === 'Advanced'
                              ? 'border-emerald-500/40 text-emerald-300 bg-emerald-950/30'
                              : skill.proficiencyTier === 'Proficient'
                              ? 'border-[#D7E2EA]/40 text-[#D7E2EA] bg-white/5'
                              : 'border-white/20 text-[#BBCCD7] bg-white/5'
                          }`}
                        >
                          {skill.proficiencyTier}
                        </span>
                      </div>
                      <p className="text-xs text-[#D7E2EA]/70 font-light leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
