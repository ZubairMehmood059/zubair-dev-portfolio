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
  Sparkles,
  CheckCircle2,
  Copy,
  ChevronRight,
  Cpu,
  Layers,
  MapPin,
  ExternalLink,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Hero: React.FC = () => {
  const { hero, setIsResumeModalOpen, showToast } = usePortfolio();
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'stack' | 'ai'>('profile');

  // Interactive code representations with syntax tokens
  const codeTabs = {
    profile: {
      filename: 'zubair.config.ts',
      language: 'TypeScript',
      code: `// Zubair Mehmood — Engineer Identity
export const engineer = {
  name: "Zubair Mehmood",
  role: "Full-Stack Developer | AI/ML in Progress",
  institution: "Sir Syed University of Eng. & Tech (SSUET)",
  academicStage: "5th Semester (BS Software Engineering)",
  location: "Karachi, Pakistan (UTC+5)",
  experience: "2+ Years Project-Centric Engineering",
  passion: "Full-Stack Web Architectures & Intelligent Products",
  status: "Available for High-Impact Roles"
};`,
    },
    stack: {
      filename: 'active_stack.json',
      language: 'JSON',
      code: `{
  "languages": ["Python", "TypeScript", "JavaScript", "SQL", "HTML5/CSS3"],
  "frontend": ["React", "Next.js", "Tailwind CSS", "Vite", "Motion"],
  "backend": ["Python (Flask)", "Node.js", "REST APIs", "FastAPI"],
  "databases": ["PostgreSQL", "MongoDB", "Firebase Firestore"],
  "ai_toolkit": ["PyTorch Basics", "Data Preprocessing", "LLM Integration"]
}`,
    },
    ai: {
      filename: 'ai_manifesto.py',
      language: 'Python',
      code: `class DeveloperPersona:
    def __init__(self):
        self.focus = "Software Engineering & Applied AI"
        self.ethos = "Clean architecture meets intelligent automation"

    def solve_problems(self):
        return [
            "Architect robust full-stack web applications",
            "Integrate predictive models & generative AI tools",
            "Deliver responsive, high-performance user experiences"
        ]`,
    },
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeTabs[activeTab].code);
    setCopiedCode(true);
    showToast(`Copied ${codeTabs[activeTab].filename} to clipboard!`);
    setTimeout(() => setCopiedCode(false), 2200);
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
      className="relative min-h-[96vh] flex items-center justify-center pt-28 pb-16 md:py-24 overflow-hidden tech-grid-pattern"
    >
      {/* Cinematic Ambient Atmosphere Glows (Electric Blue + Luminous Violet) */}
      <div
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(79, 140, 255, 0.22) 0%, rgba(139, 92, 246, 0.16) 35%, rgba(11, 13, 18, 0) 75%)',
        }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[650px] blur-3xl pointer-events-none -z-10"
      />
      <div
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, rgba(121, 178, 255, 0.08) 50%, rgba(11, 13, 18, 0) 70%)',
        }}
        className="absolute -top-24 right-[-10%] w-[550px] h-[550px] rounded-full blur-3xl pointer-events-none -z-10 animate-float-slow"
      />
      <div
        style={{
          background: 'radial-gradient(circle, rgba(79, 140, 255, 0.14) 0%, rgba(167, 139, 250, 0.1) 45%, rgba(11, 13, 18, 0) 70%)',
        }}
        className="absolute bottom-10 left-[-5%] w-[480px] h-[480px] rounded-full blur-3xl pointer-events-none -z-10 animate-float-reverse"
      />

      {/* Subtle Top Spotlight Line with Violet & Blue Hairline */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 via-violet-500/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-12 items-center">
          
          {/* ========================================================= */}
          {/* LEFT / EDITORIAL HEADLINE & VALUE PROPOSITION (7 COLS)   */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Status Pills */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-3"
            >
              {/* Availability Pulse Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#111722]/90 border border-slate-700/80 shadow-lg shadow-black/40 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs font-medium text-slate-200">
                  {hero.availabilityStatus}
                </span>
              </div>

              {/* University & Degree Chip */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-950/60 to-purple-950/50 border border-blue-500/30 text-blue-300 text-xs font-mono shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                <span>SSUET • 5th Semester BS SE</span>
              </div>
            </motion.div>

            {/* Main Header / Editorial Typography with Animated Zubair Mehmood Effect */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="space-y-3"
            >
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.22em] text-blue-400 font-semibold">
                <span className="w-8 h-[2px] bg-gradient-to-r from-blue-500 via-violet-500 to-transparent inline-block" />
                <span>Full-Stack Developer &amp; AI Engineer</span>
              </div>

              {/* Animated Zubair Mehmood Name Heading */}
              <div className="relative inline-block">
                {/* Behind-name Ambient Luminous Violet/Blue Halo */}
                <div
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.42) 0%, rgba(79, 140, 255, 0.22) 45%, transparent 72%)',
                  }}
                  className="absolute -inset-x-8 -inset-y-4 blur-2xl pointer-events-none -z-10 name-aura-glow"
                />

                <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] font-heading select-none">
                  <span className="name-hologram-text">
                    {hero.name.split(' ').map((word, wordIdx) => (
                      <span key={wordIdx} className="inline-block whitespace-nowrap mr-3 sm:mr-4">
                        {word.split('').map((char, charIdx) => (
                          <motion.span
                            key={charIdx}
                            className="inline-block cursor-default transition-all duration-200"
                            initial={{ opacity: 0, y: 22, rotateX: -35 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{
                              duration: 0.45,
                              delay: 0.1 + (wordIdx * 7 + charIdx) * 0.032,
                              ease: [0.215, 0.61, 0.355, 1],
                            }}
                            whileHover={{
                              y: -9,
                              scale: 1.16,
                              color: '#c084fc',
                              transition: { duration: 0.15 },
                            }}
                          >
                            {char}
                          </motion.span>
                        ))}
                      </span>
                    ))}
                  </span>
                </h1>
              </div>

              <div className="pt-1">
                <span
                  style={{
                    backgroundImage: 'var(--accent-gradient, linear-gradient(135deg, #4f8cff 0%, #8b5cf6 50%, #38bdf8 100%))',
                  }}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-transparent bg-clip-text font-heading"
                >
                  Building Scalable Web Apps &amp; Intelligent AI Systems
                </span>
              </div>
            </motion.div>

            {/* Headline Quote / Philosophy Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="relative p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#161D29]/90 to-[#111722]/80 border border-slate-700/60 shadow-xl backdrop-blur-md overflow-hidden"
            >
              <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-400 to-blue-600" />
              <p className="text-base sm:text-lg font-medium text-slate-100 leading-snug pl-2">
                “{hero.headline}”
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 pl-2 leading-relaxed">
                {hero.supportingBio}
              </p>
            </motion.div>

            {/* Action Hub / CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="flex flex-wrap items-center gap-3.5 pt-1"
            >
              {/* Primary CTA: Explore Projects */}
              <button
                onClick={() => scrollTo('projects')}
                style={{
                  background: 'var(--accent-gradient)',
                  boxShadow: '0 8px 30px var(--accent-glow, rgba(79, 140, 255, 0.35))',
                }}
                className="shimmer-sweep-fx group flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:scale-[1.03] active:scale-[0.98] hover:brightness-110 cursor-pointer shadow-lg"
              >
                <span>Explore Featured Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>

              {/* Secondary CTA: Interactive Resume */}
              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-[#161D29]/90 hover:bg-[#1f2937] text-slate-200 border border-slate-700/80 hover:border-blue-400/50 font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md cursor-pointer"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>View CV &amp; Credentials</span>
              </button>

              {/* Tertiary CTA: Contact */}
              <button
                onClick={() => scrollTo('contact')}
                className="flex items-center gap-2 px-4.5 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 hover:text-white border border-slate-800 font-medium text-sm transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Get In Touch</span>
              </button>
            </motion.div>

            {/* Quick Metrics Coordinates Dock */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left"
            >
              <div className="p-3.5 rounded-xl bg-[#111722]/80 border border-slate-800/80 hover:border-slate-700 transition-colors shadow-sm">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Experience</div>
                <div className="text-lg font-bold text-white font-heading mt-0.5">2+ Years</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Hands-on Code</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#111722]/80 border border-slate-800/80 hover:border-slate-700 transition-colors shadow-sm">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Degree &amp; Univ</div>
                <div className="text-lg font-bold text-blue-400 font-heading mt-0.5">BS SE</div>
                <div className="text-[10px] text-slate-400 mt-0.5">SSUET Karachi</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#111722]/80 border border-slate-800/80 hover:border-slate-700 transition-colors shadow-sm">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Academic Standing</div>
                <div className="text-lg font-bold text-white font-heading mt-0.5">5th Sem</div>
                <div className="text-[10px] text-slate-400 mt-0.5">In Progress</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#111722]/80 border border-slate-800/80 hover:border-slate-700 transition-colors shadow-sm">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Primary Focus</div>
                <div className="text-lg font-bold text-emerald-400 font-heading mt-0.5">Full-Stack</div>
                <div className="text-[10px] text-slate-400 mt-0.5">+ Applied AI/ML</div>
              </div>
            </motion.div>

            {/* Social Links & Connect Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-3 pt-1 text-sm text-slate-400"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
                Direct Links:
              </span>
              <a
                href={hero.socials.github}
                target="_blank"
                rel="noreferrer noopener"
                className="p-2.5 rounded-xl bg-[#111722] hover:bg-blue-600/20 text-slate-300 hover:text-blue-300 border border-slate-800 hover:border-blue-500/40 transition-all hover:scale-105 shadow-sm"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={hero.socials.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="p-2.5 rounded-xl bg-[#111722] hover:bg-blue-600/20 text-slate-300 hover:text-blue-300 border border-slate-800 hover:border-blue-500/40 transition-all hover:scale-105 shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${hero.socials.email}`}
                className="p-2.5 rounded-xl bg-[#111722] hover:bg-blue-600/20 text-slate-300 hover:text-blue-300 border border-slate-800 hover:border-blue-500/40 transition-all hover:scale-105 shadow-sm"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <span className="hidden sm:inline-block text-xs font-mono text-slate-400 ml-2">
                {hero.socials.email}
              </span>
            </motion.div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT / AESTHETIC DEVELOPER SHOWCASE & CODE TERMINAL (5)  */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="relative w-full max-w-md lg:max-w-none space-y-4"
            >
              {/* Backlight Ambient Glow Ring */}
              <div
                style={{
                  background: 'radial-gradient(circle, rgba(79, 140, 255, 0.25) 0%, rgba(121, 178, 255, 0.08) 50%, transparent 75%)',
                }}
                className="absolute -inset-4 rounded-3xl blur-2xl opacity-60 pointer-events-none -z-10"
              />

              {/* Top Showcase: Luxury Holographic Portrait Frame */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#161D29] to-[#0B0D12] border border-slate-700/80 shadow-2xl group">
                
                {/* Photo Presentation with Gradient Masks */}
                <div className="relative aspect-[16/11] sm:aspect-[16/10] overflow-hidden bg-[#0d131d]">
                  <img
                    src={hero.avatarUrl}
                    alt={`${hero.name} — Full-Stack Developer & AI/ML Engineer Portrait`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.02] transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle Cinematic Vignette & Bottom Blending */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-[#0B0D12]/40 to-transparent" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />

                  {/* Top Floating Glass Chip: University / Location */}
                  <div className="absolute top-3.5 right-3.5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-blue-500/40 text-blue-300 text-xs font-mono shadow-xl">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    <span>Karachi, PK • SSUET</span>
                  </div>

                  {/* Top Left Floating Indicator: Developer Badge */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-slate-200 text-xs font-mono shadow-xl">
                    <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
                    <span>SE Student</span>
                  </div>

                  {/* Bottom Integrated Identity Strip */}
                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-between p-2.5 rounded-2xl bg-[#111722]/90 backdrop-blur-md border border-slate-700/70 shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-mono font-semibold text-white">Zubair Mehmood</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {['Python', 'React', 'AI'].map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-blue-950/60 text-blue-300 border border-blue-800/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Showcase: Interactive Multi-Tab Developer Console */}
              <div className="rounded-2xl bg-[#0e1420]/95 border border-slate-700/70 shadow-2xl overflow-hidden backdrop-blur-xl">
                
                {/* Console Header with Interactive Tabs */}
                <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#111722] border-b border-slate-800/90 text-xs">
                  
                  {/* Window Controls & Tabs */}
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>

                    {/* Tab Switchers */}
                    <div className="flex items-center gap-1">
                      {(['profile', 'stack', 'ai'] as const).map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer ${
                              isActive
                                ? 'bg-[#161D29] text-blue-300 border border-blue-500/30 font-semibold shadow-inner'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                            }`}
                          >
                            {codeTabs[tab].filename}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] text-slate-300 hover:text-blue-300 bg-slate-800/60 hover:bg-slate-800 font-mono transition-colors border border-slate-700/60 cursor-pointer"
                    title="Copy snippet"
                  >
                    {copiedCode ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Code Window with Syntax Highlighting Look */}
                <div className="p-4 font-mono text-[11.5px] leading-relaxed overflow-x-auto whitespace-pre bg-[#0B0D12]/90 text-slate-300 min-h-[175px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18 }}
                    >
                      {codeTabs[activeTab].code}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Console Footer Status Strip */}
                <div className="px-3.5 py-2 bg-[#090c12] border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-slate-300">compiler: ready</span>
                    <span className="text-slate-600">|</span>
                    <span className="text-blue-400">{codeTabs[activeTab].language}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <span>UTF-8</span>
                    <span className="text-slate-600">•</span>
                    <span>Tab Size: 2</span>
                  </div>
                </div>

              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
