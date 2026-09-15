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
} from 'lucide-react';
import { motion } from 'motion/react';

export const About: React.FC = () => {
  const { about } = usePortfolio();

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Personal Profile &amp; Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            Engineering with Intent &amp; Curiosity
          </h2>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Professional Biography (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span>Professional Biography</span>
              </h3>
              
              {about.biography.map((paragraph, idx) => (
                <p key={idx} className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs text-slate-400">Target Role</div>
                  <div className="text-sm font-bold text-slate-100 mt-0.5">Full-Stack / Python / AI Product</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs text-slate-400">Academic Standing</div>
                  <div className="text-sm font-bold text-cyan-400 mt-0.5">5th Semester, BS Software Eng.</div>
                </div>
              </div>
            </div>

            {/* Compact Engineering Philosophy Area */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border-cyan-500/20 relative overflow-hidden">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base mb-2">
                <Compass className="w-5 h-5" />
                <h3>Engineering Philosophy</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {about.engineeringPhilosophy.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {about.engineeringPhilosophy.coreValues.map((val, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-200 font-medium"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Interactive Profile Information (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Quick Profile Cards */}
            <div className="glass-panel p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono">
                Key Coordinates &amp; Milestones
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Location</div>
                    <div className="font-semibold text-slate-100">{about.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="p-2 rounded-lg bg-indigo-950 text-indigo-400">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Current Program</div>
                    <div className="font-semibold text-slate-100">{about.degree}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{about.institution}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Experience</div>
                    <div className="font-semibold text-slate-100">{about.experienceYears}</div>
                    <div className="text-xs text-emerald-400 font-medium">Freelance &amp; University Projects</div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="p-2 rounded-lg bg-amber-950 text-amber-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Academic Semester</div>
                    <div className="font-semibold text-slate-100">{about.semester}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Currently Learning Interactive Pills */}
            <div className="glass-panel p-6 rounded-2xl">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm mb-3">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <h3>Currently Learning &amp; Deepening</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {about.learningFocus.map((focusItem, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900/90 text-slate-200 border border-slate-700/60 shadow-sm"
                  >
                    {focusItem}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
