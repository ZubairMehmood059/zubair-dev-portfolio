import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, ExternalLink, Github, CheckCircle, ArrowRight, Layers, Shield, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProjectModal: React.FC = () => {
  const { selectedProject, setSelectedProject } = usePortfolio();

  if (!selectedProject) return null;

  const { title, category, tagline, imageUrl, technologies, githubUrl, liveUrl, status, caseStudy } = selectedProject;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-[#0e1420] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#07090e]/95 border-b border-slate-800 shrink-0 sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-950/80 text-blue-300 border border-blue-800/40">
                {category}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium border border-slate-700">
                Status: {status}
              </span>
            </div>

            <button
              onClick={() => setSelectedProject(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
            {/* Title & Tagline */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">{title}</h2>
              <p className="text-base text-slate-300 mt-2 font-normal leading-relaxed">{tagline}</p>
            </div>

            {/* Visual Preview / Hero Image */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950">
              <img
                src={imageUrl}
                alt={`${title} project preview`}
                referrerPolicy="no-referrer"
                className="w-full h-64 sm:h-80 object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1420] via-transparent to-transparent pointer-events-none" />
              
              {/* Quick links banner */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs rounded-lg bg-[#0b0d12]/90 backdrop-blur-md text-slate-200 border border-slate-700/60 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/95 hover:bg-slate-700 text-white text-xs font-semibold backdrop-blur-md border border-slate-600 transition-all shadow"
                    >
                      <Github className="w-3.5 h-3.5" />
                      View Code
                    </a>
                  )}
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      style={{
                        background: 'var(--accent-gradient)',
                        color: 'var(--accent-text-contrast, #ffffff)',
                        boxShadow: '0 4px 14px var(--accent-glow)',
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all shadow hover:brightness-110"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Case Study Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Overview */}
              <div className="p-5 rounded-xl bg-[#0b0d12]/60 border border-slate-800/80">
                <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm mb-2">
                  <Layers className="w-4 h-4" />
                  <h3>Project Overview</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{caseStudy.overview}</p>
              </div>

              {/* The Problem */}
              <div className="p-5 rounded-xl bg-[#0b0d12]/60 border border-slate-800/80">
                <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm mb-2">
                  <Shield className="w-4 h-4" />
                  <h3>The Problem</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{caseStudy.problem}</p>
              </div>
            </div>

            {/* Engineering Approach */}
            <div className="p-5 rounded-xl bg-[#0b0d12]/60 border border-slate-800/80">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm mb-2">
                <ArrowRight className="w-4 h-4" />
                <h3>Engineering Approach &amp; Architecture</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{caseStudy.approach}</p>
            </div>

            {/* Key Features */}
            <div>
              <div className="flex items-center gap-2 text-slate-200 font-bold text-sm mb-3">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <h3>Key Features &amp; Implementation Highlights</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {caseStudy.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#0b0d12]/50 border border-slate-800/60">
                    <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300 leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Outcomes & Impact if available */}
            {caseStudy.outcomes && caseStudy.outcomes.length > 0 && (
              <div className="p-5 rounded-xl bg-blue-950/20 border border-blue-800/30">
                <h3 className="text-sm font-semibold text-blue-300 mb-2 font-heading">Measurable Outcomes &amp; Technical Learnings</h3>
                <ul className="space-y-1.5">
                  {caseStudy.outcomes.map((outc, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>{outc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#07090e]/95 border-t border-slate-800 shrink-0">
            <span className="text-xs text-slate-500 font-mono">Source: Official Zubair.dev Case Study</span>
            <div className="flex items-center gap-3">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 text-xs font-medium transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Repository
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  style={{
                    background: 'var(--accent-gradient)',
                    color: 'var(--accent-text-contrast, #ffffff)',
                    boxShadow: '0 4px 14px var(--accent-glow)',
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-md hover:brightness-110"
                >
                  <ExternalLink className="w-4 h-4" />
                  Launch Project
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
