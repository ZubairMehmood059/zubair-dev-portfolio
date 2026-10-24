import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  MapPin,
  GraduationCap,
  Clock,
  BookOpen,
  Sparkles,
  Compass,
  CheckCircle,
  Lightbulb,
  Cpu,
  Shield,
  Layers,
  Terminal,
} from 'lucide-react';
import { motion } from 'motion/react';

export const About: React.FC = () => {
  const { about } = usePortfolio();

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Subtle ambient light backdrop */}
      <div
        style={{ background: 'radial-gradient(circle, rgba(79,140,255,0.1) 0%, rgba(11,13,18,0) 70%)' }}
        className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-left mb-14"
        >
          <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>Developer Background &amp; Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            Engineering with Intent &amp; Curiosity
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
            A software engineering student's journey translating theory into resilient, production-grade applications.
          </p>
        </motion.div>

        {/* Bento Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Professional Biography & Philosophy (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Biography Glass Panel */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4 border border-slate-800/90 shadow-xl">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-950/80 text-blue-400 border border-blue-800/40">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span>Professional Biography</span>
              </h3>
              
              {about.biography.map((paragraph, idx) => (
                <p key={idx} className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <div className="pt-5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0e1420]/80 border border-slate-800/80">
                  <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">Target Focus</div>
                  <div className="text-sm font-bold text-slate-100 mt-1">Full-Stack / Python / AI Products</div>
                </div>
                <div className="p-4 rounded-xl bg-[#0e1420]/80 border border-slate-800/80">
                  <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">Academic Standing</div>
                  <div className="text-sm font-bold text-blue-400 mt-1">5th Semester, BS Software Eng.</div>
                </div>
              </div>
            </div>

            {/* Engineering Philosophy Bento Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border-blue-500/20 relative overflow-hidden shadow-xl bg-gradient-to-br from-[#111722] to-[#0b0d12]">
              <div className="flex items-center gap-2.5 text-blue-400 font-bold text-base mb-3">
                <div className="p-2 rounded-lg bg-blue-950/90 text-blue-400 border border-blue-800/50">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-heading text-white">{about.engineeringPhilosophy.title}</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-5">
                {about.engineeringPhilosophy.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {about.engineeringPhilosophy.coreValues.map((val, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#0e1420]/80 border border-slate-800 text-xs text-slate-200 font-medium hover:border-slate-700 transition-colors"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Key Milestones & Learning Frontiers (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Quick Profile Cards */}
            <div className="glass-panel p-6 sm:p-7 rounded-2xl space-y-4 border border-slate-800/90 shadow-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                Key Coordinates &amp; Milestones
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#0e1420]/90 border border-slate-800/90 hover:border-slate-700 transition-colors">
                  <div className="p-2.5 rounded-xl bg-blue-950 text-blue-400 border border-blue-900/50">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-mono">Location</div>
                    <div className="font-semibold text-slate-100">{about.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#0e1420]/90 border border-slate-800/90 hover:border-slate-700 transition-colors">
                  <div className="p-2.5 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-900/50">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-mono">Degree &amp; Institution</div>
                    <div className="font-semibold text-slate-100">{about.degree}</div>
                    <div className="text-xs text-blue-400 font-medium mt-0.5">{about.institution}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#0e1420]/90 border border-slate-800/90 hover:border-slate-700 transition-colors">
                  <div className="p-2.5 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-900/50">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-mono">Hands-on Experience</div>
                    <div className="font-semibold text-slate-100">{about.experienceYears}</div>
                    <div className="text-xs text-emerald-400 font-medium">Freelance, Academic &amp; Project Builds</div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#0e1420]/90 border border-slate-800/90 hover:border-slate-700 transition-colors">
                  <div className="p-2.5 rounded-xl bg-blue-950 text-blue-300 border border-blue-900/50">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-mono">Current Status</div>
                    <div className="font-semibold text-slate-100">{about.semester} Active</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Currently Learning Interactive Pills */}
            <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-slate-800/90 shadow-xl">
              <div className="flex items-center gap-2.5 text-blue-300 font-bold text-sm mb-4">
                <div className="p-2 rounded-lg bg-blue-950/80 text-blue-400 border border-blue-900/40">
                  <Cpu className="w-4 h-4" />
                </div>
                <h3 className="font-heading text-white text-base">Current Learning Frontiers</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {about.learningFocus.map((focusItem, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-2 rounded-xl text-xs font-mono bg-[#0e1420] text-slate-200 border border-slate-800 hover:border-blue-500/40 hover:text-blue-300 transition-all shadow-sm"
                  >
                    {focusItem}
                  </span>
                ))}
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
