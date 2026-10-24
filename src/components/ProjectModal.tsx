import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Github, CheckCircle, ArrowRight, Layers, Shield, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LiveProjectButton } from './common/MotionComponents';

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
          className="relative w-full max-w-4xl bg-[#0C0C0C] border-2 border-[#D7E2EA] rounded-[32px] sm:rounded-[44px] shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden my-6 max-h-[90vh] flex flex-col font-['Kanit',sans-serif] text-[#D7E2EA]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-5 bg-[#0C0C0C] border-b border-white/10 shrink-0 sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-white/10 text-white border border-white/20">
                {category}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-[#BBCCD7] font-mono border border-white/10">
                Status: {status}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="p-2 rounded-full text-[#D7E2EA] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 sm:p-8 md:p-10 overflow-y-auto space-y-8">
            {/* Title & Tagline */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white hero-heading">
                {title}
              </h2>
              <p className="text-base sm:text-lg text-[#D7E2EA] mt-2 font-light leading-relaxed">
                {tagline}
              </p>
            </div>

            {/* Visual Preview / Hero Image */}
            <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/10 shadow-2xl bg-[#161616]">
              <img
                src={imageUrl}
                alt={`${title} project preview`}
                referrerPolicy="no-referrer"
                className="w-full h-64 sm:h-80 md:h-96 object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-transparent pointer-events-none" />
              
              {/* Quick links & tags */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs rounded-full bg-black/60 backdrop-blur-md text-[#D7E2EA] border border-white/20 font-mono"
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
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/80 hover:bg-black text-white text-xs font-mono uppercase tracking-wider backdrop-blur-md border border-white/30 transition-all cursor-pointer"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center justify-center rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest text-white transition-all hover:scale-105 active:scale-95 outline outline-2 outline-white -outline-offset-[3px] cursor-pointer"
                      style={{
                        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                      }}
                    >
                      Live
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Case Study Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Overview */}
              <div className="p-6 rounded-[24px] bg-[#161616] border border-white/10">
                <div className="flex items-center gap-2 text-white font-bold uppercase text-sm mb-2.5">
                  <Layers className="w-4 h-4 text-[#BBCCD7]" />
                  <h3>Project Overview</h3>
                </div>
                <p className="text-sm text-[#D7E2EA]/80 leading-relaxed font-light">
                  {caseStudy.overview}
                </p>
              </div>

              {/* The Problem */}
              <div className="p-6 rounded-[24px] bg-[#161616] border border-white/10">
                <div className="flex items-center gap-2 text-white font-bold uppercase text-sm mb-2.5">
                  <Shield className="w-4 h-4 text-[#BBCCD7]" />
                  <h3>The Problem</h3>
                </div>
                <p className="text-sm text-[#D7E2EA]/80 leading-relaxed font-light">
                  {caseStudy.problem}
                </p>
              </div>
            </div>

            {/* Engineering Approach */}
            <div className="p-6 rounded-[24px] bg-[#161616] border border-white/10">
              <div className="flex items-center gap-2 text-white font-bold uppercase text-sm mb-2.5">
                <ArrowRight className="w-4 h-4 text-[#BBCCD7]" />
                <h3>Architecture &amp; Engineering Approach</h3>
              </div>
              <p className="text-sm text-[#D7E2EA]/80 leading-relaxed font-light">
                {caseStudy.approach}
              </p>
            </div>

            {/* Key Features */}
            <div>
              <div className="flex items-center gap-2 text-white font-bold uppercase text-sm mb-3">
                <Sparkles className="w-4 h-4 text-[#BBCCD7]" />
                <h3>Key Features &amp; Implementation Highlights</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {caseStudy.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-4 rounded-[20px] bg-[#161616] border border-white/10">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#D7E2EA]/90 leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Outcomes & Impact */}
            {caseStudy.outcomes && caseStudy.outcomes.length > 0 && (
              <div className="p-6 rounded-[24px] bg-[#161616] border border-white/10">
                <h3 className="text-sm font-bold uppercase text-white mb-3">
                  Measurable Outcomes &amp; Technical Learnings
                </h3>
                <ul className="space-y-2">
                  {caseStudy.outcomes.map((outc, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-[#D7E2EA]/80 flex items-start gap-2.5">
                      <span className="text-[#BBCCD7] font-bold">•</span>
                      <span>{outc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-5 bg-[#0C0C0C] border-t border-white/10 shrink-0">
            <span className="text-xs text-[#BBCCD7]/60 font-mono">Zubair.dev Verified Case Study</span>
            <div className="flex items-center gap-3">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[#D7E2EA] hover:text-white bg-white/5 hover:bg-white/10 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}
              {liveUrl && (
                <LiveProjectButton
                  label="Launch"
                  href={liveUrl}
                  className="px-6 py-2 text-xs"
                />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
