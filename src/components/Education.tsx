import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { GraduationCap, Calendar, BookOpen, Award, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const Education: React.FC = () => {
  const { education, isPreviewMode } = usePortfolio();

  const visibleEdu = education.filter((e) => isPreviewMode || e.isPublished);

  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-left mb-14"
        >
          <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>Academic Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            Education Timeline
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
            Formal engineering foundations and secondary education achievements documented strictly from my academic records.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative border-l-2 border-slate-800/90 ml-4 sm:ml-8 space-y-8">
          {visibleEdu.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-6 sm:pl-8 group"
            >
              
              {/* Timeline marker */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#0b0d12] border-2 border-indigo-500 flex items-center justify-center text-indigo-400 shadow-md shadow-indigo-500/30 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-3.5 h-3.5" />
              </div>

              {/* Education Card */}
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800/90 hover:border-indigo-500/40 transition-all shadow-xl bg-[#0e1420]/80">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
                      {edu.institution}
                    </h3>
                    <div className="text-sm font-semibold text-blue-400 mt-0.5">
                      {edu.degree}
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3.5 py-1 rounded-xl text-xs font-mono bg-[#111722] border border-slate-800 text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    {edu.period}
                  </span>
                </div>

                {edu.details && (
                  <p className="text-sm text-slate-300 mt-3.5 leading-relaxed">
                    {edu.details}
                  </p>
                )}

                {/* SSUET Highlight Tag */}
                {edu.institution.includes('Sir Syed') && (
                  <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-800/50">
                      Currently Active: 5th Semester
                    </span>
                    <span className="text-xs text-slate-400">Bachelor of Science in Software Engineering</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
