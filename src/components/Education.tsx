import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { GraduationCap, Calendar, BookOpen, Award, CheckCircle } from 'lucide-react';

export const Education: React.FC = () => {
  const { education, isPreviewMode } = usePortfolio();

  const visibleEdu = education.filter((e) => isPreviewMode || e.isPublished);

  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Academic Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            Education Timeline
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl">
            Formal engineering foundations and secondary education achievements documented strictly from my academic records.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 space-y-8">
          {visibleEdu.map((edu, idx) => (
            <div key={edu.id} className="relative pl-6 sm:pl-8 group">
              
              {/* Timeline marker */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-slate-900 border-2 border-indigo-500 flex items-center justify-center text-indigo-400 shadow-md shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-4 h-4" />
              </div>

              {/* Education Card */}
              <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-slate-800 hover:border-indigo-500/30 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
                      {edu.institution}
                    </h3>
                    <div className="text-sm font-semibold text-cyan-400 mt-0.5">
                      {edu.degree}
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    {edu.period}
                  </span>
                </div>

                {edu.details && (
                  <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                    {edu.details}
                  </p>
                )}

                {/* SSUET Highlight Tag */}
                {edu.institution.includes('Sir Syed') && (
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-950 text-emerald-300 border border-emerald-800/50">
                      Currently Active: 5th Semester
                    </span>
                    <span className="text-xs text-slate-400">Bachelor of Science in Software Engineering</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
