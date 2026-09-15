import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Briefcase,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ExternalLink,
  Code2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Experience: React.FC = () => {
  const { experience, isPreviewMode } = usePortfolio();
  const [expandedId, setExpandedId] = useState<string | null>('exp-1');

  // Filter published unless in preview mode
  const visibleExp = experience.filter((exp) => isPreviewMode || exp.isPublished);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="experience" className="py-20 relative bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Career &amp; Practical Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            Work Experience
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl">
            Contract and freelance client delivery specializing in responsive frontend interfaces, user logic, and dependable deployments.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 space-y-8">
          {visibleExp.map((exp, index) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div key={exp.id} className="relative pl-6 sm:pl-8 group">
                
                {/* Timeline node icon */}
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-500 flex items-center justify-center text-cyan-400 shadow-md shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-4 h-4" />
                </div>

                {/* Content Card */}
                <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-slate-800 transition-all hover:border-slate-700">
                  
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
                          {exp.role}
                        </h3>
                        {!exp.isPublished && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950 text-amber-300 border border-amber-800">
                            Draft
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-semibold text-cyan-400 mt-0.5">
                        {exp.company}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                      <span className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {exp.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-slate-900 text-slate-300 border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Expand Toggle */}
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => toggleExpand(exp.id)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                      aria-expanded={isExpanded}
                    >
                      <span>{isExpanded ? 'Hide Key Responsibilities' : 'View Key Responsibilities & Highlights'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    <span className="text-[11px] text-slate-500 font-mono">{exp.type}</span>
                  </div>

                  {/* Expandable Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-2 space-y-2.5 border-t border-slate-800/40">
                          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                            Resume-Documented Scope:
                          </h4>
                          <ul className="space-y-2">
                            {exp.responsibilities.map((resp, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
