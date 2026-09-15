import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  ArrowRight,
  Download,
  Mail,
  Github,
  Linkedin,
  Terminal,
  Code2,
  Cpu,
  Sparkles,
  CheckCircle2,
  Copy,
  Layers,
} from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const { hero, setIsResumeModalOpen, showToast } = usePortfolio();
  const [copiedCode, setCopiedCode] = useState(false);

  const codeSnippet = `// Zubair Mehmood — Developer Profile
const engineer = {
  name: "Zubair Mehmood",
  status: "Software Engineering Student @ SSUET",
  semester: "5th Semester",
  stack: ["Python", "React", "REST APIs", "AI/ML"],
  focus: "Full-Stack & Intelligent Products",
  philosophy: "Building software that matters"
};`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    showToast('Developer profile snippet copied!');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden tech-grid-pattern"
    >
      {/* Subtle Radial Glows in Background */}
      <div
        style={{ background: 'var(--accent-glow)' }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-3xl pointer-events-none -z-10 transition-colors duration-700"
      />
      <div
        style={{ background: 'var(--accent-subtle)' }}
        className="absolute top-1/3 right-10 w-[400px] h-[300px] rounded-full blur-3xl pointer-events-none -z-10 transition-colors duration-700"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left / Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Availability Pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/70 shadow-sm backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-slate-300">
                {hero.availabilityStatus}
              </span>
            </motion.div>

            {/* Name & Title */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
                {hero.name}
              </h1>
              <p
                style={{ backgroundImage: 'var(--accent-gradient)' }}
                className="text-sm sm:text-base font-semibold text-transparent bg-clip-text"
              >
                {hero.title}
              </p>
            </motion.div>

            {/* Headline */}
            <motion.blockquote
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ borderColor: 'var(--accent-primary)' }}
              className="text-xl sm:text-2xl font-medium text-slate-100 border-l-2 pl-4 py-0.5 leading-snug"
            >
              “{hero.headline}”
            </motion.blockquote>

            {/* Supporting Copy strictly from resume */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl"
            >
              {hero.supportingBio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <button
                onClick={() => scrollTo('projects')}
                style={{
                  background: 'var(--accent-gradient)',
                  color: 'var(--accent-text-contrast, #020617)',
                  boxShadow: '0 6px 20px var(--accent-glow)',
                }}
                className="group flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] hover:brightness-110"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-sm transition-all hover:border-slate-600"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download CV</span>
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/50 hover:bg-slate-800/70 text-slate-300 hover:text-white border border-slate-800 font-medium text-sm transition-all"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Contact Me</span>
              </button>
            </motion.div>

            {/* Social Links & Quick Contact info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-4 pt-4 border-t border-slate-800/80 text-sm text-slate-400"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
                Connect:
              </span>
              <a
                href={hero.socials.github}
                target="_blank"
                rel="noreferrer noopener"
                className="p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={hero.socials.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${hero.socials.email}`}
                className="p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <span className="hidden sm:inline-block text-xs font-mono text-slate-500 ml-2">
                {hero.socials.email}
              </span>
            </motion.div>
          </div>

          {/* Right / Portrait & Interactive Developer Visual (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Portrait Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-sm sm:max-w-md group"
            >
              {/* Outer decorative ambient glow */}
              <div
                style={{ background: 'var(--accent-gradient)' }}
                className="absolute -inset-1.5 rounded-3xl blur-xl opacity-50 group-hover:opacity-85 transition duration-700"
              />

              {/* Card Container */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-700/80 shadow-2xl">
                
                {/* Photo with sophisticated framing and smooth gradients */}
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-900">
                  <img
                    src={hero.avatarUrl}
                    alt={hero.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle inner shadow and bottom gradient integration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
                </div>

                {/* Floating Micro-Badge Top Right */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-lg">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>5th Sem SSUET</span>
                </div>

                {/* Floating Technology Badges Over Image Bottom */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5 z-10">
                  {['Python', 'Full-Stack', 'React', 'AI Products', 'APIs'].map((badge, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-slate-900/85 backdrop-blur-md text-slate-200 border border-slate-700/60 shadow"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interactive Terminal Micro-Widget Beneath Portrait */}
              <div className="mt-4 w-full rounded-xl bg-slate-950/90 border border-slate-800 shadow-xl overflow-hidden backdrop-blur-md">
                <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900/90 border-b border-slate-800/80 text-[11px]">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-slate-400 font-mono text-[10px]">zubair@portfolio:~$</span>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-cyan-300 font-mono transition-colors"
                    title="Copy snippet"
                  >
                    {copiedCode ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-3 font-mono text-[11px] text-cyan-300/90 leading-relaxed overflow-x-auto whitespace-pre">
                  {codeSnippet}
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
