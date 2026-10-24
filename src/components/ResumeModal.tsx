import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Download, ExternalLink, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const ResumeModal: React.FC = () => {
  const {
    isResumeModalOpen,
    setIsResumeModalOpen,
    hero,
    about,
    experience,
    education,
    skills,
    certifications,
    projects,
    recordCvDownload,
    showToast,
    triggerConfetti,
  } = usePortfolio();

  if (!isResumeModalOpen) return null;

  const handleDownload = () => {
    recordCvDownload();
    triggerConfetti();
    showToast('Resume ready for printing / download!');
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-4xl bg-[#0C0C0C] border-2 border-[#D7E2EA] rounded-[32px] sm:rounded-[44px] shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden my-8 font-['Kanit',sans-serif] text-[#D7E2EA]"
      >
        {/* Modal Top Action Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 bg-[#0C0C0C] border-b border-white/10 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-wider text-white">
              Curriculum Vitae
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-[#BBCCD7] font-mono border border-white/20">
              Verified
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest text-white transition-all hover:scale-105 active:scale-95 outline outline-2 outline-white -outline-offset-[3px] cursor-pointer"
              style={{
                background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
              }}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={() => setIsResumeModalOpen(false)}
              className="p-2 rounded-full text-[#D7E2EA] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable/Viewable Resume Sheet */}
        <div className="p-6 sm:p-10 md:p-12 bg-[#0C0C0C] text-[#D7E2EA] space-y-8 max-h-[80vh] overflow-y-auto print:max-h-none print:p-0 print:bg-white print:text-black">
          {/* Header */}
          <div className="border-b border-white/10 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight hero-heading">
                  {hero.name}
                </h1>
                <p className="text-[#BBCCD7] font-medium text-base uppercase tracking-wider mt-1">
                  {hero.title}
                </p>
              </div>
              <div className="text-xs font-mono text-[#BBCCD7]/70 space-y-1 sm:text-right">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#D7E2EA]" />
                  <a href={`mailto:${hero.socials.email}`} className="hover:text-white">
                    {hero.socials.email}
                  </a>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#D7E2EA]" />
                  <span>{hero.socials.phone}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D7E2EA]" />
                  <span>{about.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest font-mono text-[#BBCCD7] mb-2">
              Professional Summary
            </h2>
            <p className="text-sm sm:text-base text-[#D7E2EA]/90 leading-relaxed font-light">
              {hero.supportingBio}
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest font-mono text-[#BBCCD7] mb-3">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="p-4 rounded-[20px] bg-[#161616] border border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between font-bold text-white uppercase">
                    <span>{edu.institution}</span>
                    <span className="text-xs font-mono font-normal text-[#BBCCD7]/70">{edu.period}</span>
                  </div>
                  <div className="text-[#BBCCD7] text-xs sm:text-sm font-medium mt-0.5">
                    {edu.degree}
                  </div>
                  {edu.details && (
                    <p className="text-xs text-[#D7E2EA]/70 mt-1 leading-relaxed font-light">
                      {edu.details}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest font-mono text-[#BBCCD7] mb-3">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="p-4 rounded-[20px] bg-[#161616] border border-white/10 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between font-bold text-white uppercase">
                    <span>{exp.role} – {exp.company}</span>
                    <span className="text-xs font-mono font-normal text-[#BBCCD7]/70">
                      {exp.period} | {exp.location}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#D7E2EA]/80 font-light">
                    {exp.description}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="text-xs text-[#D7E2EA]/70 flex items-start gap-2">
                        <span className="text-[#BBCCD7] mt-0.5">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest font-mono text-[#BBCCD7] mb-3">
              Key Projects
            </h2>
            <div className="space-y-3">
              {projects.filter((p) => p.isPublished).map((proj) => (
                <div key={proj.id} className="p-4 rounded-[20px] bg-[#161616] border border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between font-bold text-white uppercase">
                    <div className="flex items-center gap-2">
                      <span>{proj.title}</span>
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-[#BBCCD7] hover:text-white inline-flex items-center gap-1 text-xs font-mono transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                    <span className="text-xs font-mono font-normal text-[#BBCCD7]/70">
                      {proj.technologies.slice(0, 4).join(', ')}
                    </span>
                  </div>
                  <p className="text-xs text-[#D7E2EA]/70 mt-1 leading-relaxed font-light">
                    {proj.tagline}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest font-mono text-[#BBCCD7] mb-3">
              Technical Skill Matrix
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-[20px] bg-[#161616] border border-white/10">
                <span className="font-bold uppercase text-white">Languages &amp; Core:</span>
                <p className="text-[#D7E2EA]/70 mt-1 font-light">Python, JavaScript (ES6+), TypeScript, Java, C++, HTML5, CSS3</p>
              </div>
              <div className="p-4 rounded-[20px] bg-[#161616] border border-white/10">
                <span className="font-bold uppercase text-white">Frontend Architecture:</span>
                <p className="text-[#D7E2EA]/70 mt-1 font-light">React, Next.js, Tailwind CSS, Framer Motion, Responsive UI</p>
              </div>
              <div className="p-4 rounded-[20px] bg-[#161616] border border-white/10">
                <span className="font-bold uppercase text-white">Backend &amp; Cloud:</span>
                <p className="text-[#D7E2EA]/70 mt-1 font-light">REST APIs, Python Backend, AI/ML Integrations, Firebase</p>
              </div>
              <div className="p-4 rounded-[20px] bg-[#161616] border border-white/10">
                <span className="font-bold uppercase text-white">Developer Workflow:</span>
                <p className="text-[#D7E2EA]/70 mt-1 font-light">Git, GitHub, VS Code, Vite, Netlify, Linux</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest font-mono text-[#BBCCD7] mb-3">
              Certifications &amp; Credentials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {certifications.map((cert) => (
                <div key={cert.id} className="p-3.5 rounded-[20px] bg-[#161616] border border-white/10 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold uppercase text-white">{cert.title}</div>
                    <div className="text-[#BBCCD7]/70 text-[11px] font-mono">{cert.issuer} • {cert.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-5 bg-[#0C0C0C] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#BBCCD7]/60 gap-3">
          <span className="font-mono">Authoritative Source: Zubair Mehmood Official Resume (SSUET, Karachi)</span>
          <button
            type="button"
            onClick={() => setIsResumeModalOpen(false)}
            className="px-6 py-2 rounded-full border border-white/20 text-[#D7E2EA] hover:text-white hover:bg-white/10 uppercase tracking-wider font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
