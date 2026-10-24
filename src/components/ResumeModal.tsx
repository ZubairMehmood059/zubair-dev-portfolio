import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Download, Printer, ExternalLink, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const ResumeModal: React.FC = () => {
  const { isResumeModalOpen, setIsResumeModalOpen, hero, about, experience, education, skills, certifications, projects, recordCvDownload, showToast, triggerConfetti } = usePortfolio();

  if (!isResumeModalOpen) return null;

  const handleDownload = () => {
    recordCvDownload();
    triggerConfetti();
    showToast('Resume downloaded successfully!');
    
    // Create printable window or simulated download of formatted resume
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-4xl bg-[#0e1420] border border-slate-700/70 rounded-2xl shadow-2xl overflow-hidden my-8"
      >
        {/* Modal Top Action Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#07090e]/95 border-b border-slate-800 sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-semibold text-slate-200 font-heading">Official Curriculum Vitae</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-950/80 text-blue-300 border border-blue-800/40">Verified Resume</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              style={{
                background: 'var(--accent-gradient)',
                color: 'var(--accent-text-contrast, #ffffff)',
                boxShadow: '0 4px 14px var(--accent-glow)',
              }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-semibold text-xs transition-all shadow-md hover:brightness-110 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download / Print PDF
            </button>
            <button
              onClick={() => setIsResumeModalOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable/Viewable Resume Sheet */}
        <div className="p-6 sm:p-10 bg-[#0e1420] text-slate-200 space-y-8 max-h-[80vh] overflow-y-auto print:max-h-none print:p-0 print:bg-white print:text-black">
          {/* Header */}
          <div className="border-b border-slate-800 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight font-heading">{hero.name}</h1>
                <p className="text-blue-400 font-medium text-sm mt-1">{hero.title}</p>
              </div>
              <div className="text-xs text-slate-400 space-y-1 sm:text-right">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <a href={`mailto:${hero.socials.email}`} className="hover:text-blue-300">{hero.socials.email}</a>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span>{hero.socials.phone}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>{about.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 font-mono">Professional Summary</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{hero.supportingBio}</p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3 font-mono">Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between font-semibold text-slate-100">
                    <span>{edu.institution}</span>
                    <span className="text-xs font-normal text-slate-400">{edu.period}</span>
                  </div>
                  <div className="text-blue-300 text-xs font-medium mt-0.5">{edu.degree}</div>
                  {edu.details && <p className="text-xs text-slate-400 mt-1 leading-relaxed">{edu.details}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3 font-mono">Professional Experience</h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between font-semibold text-slate-100">
                    <span>{exp.role} – {exp.company}</span>
                    <span className="text-xs font-normal text-slate-400">{exp.period} | {exp.location}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{exp.description}</p>
                  <ul className="mt-2 space-y-1">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">•</span>
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3 font-mono">Key Projects</h2>
            <div className="space-y-4">
              {projects.filter((proj) => proj.isPublished).map((proj) => (
                <div key={proj.id} className="text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between font-semibold text-slate-100">
                    <div className="flex items-center gap-2">
                      <span>{proj.title}</span>
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 text-xs font-normal transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                    <span className="text-xs font-normal text-slate-400">{proj.technologies.slice(0, 4).join(', ')}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{proj.tagline}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3 font-mono">Technical Skills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-semibold text-slate-200">Programming Languages:</span>
                <p className="text-slate-400 mt-0.5">Python, JavaScript (ES6+), Java, C++, HTML5, CSS3</p>
              </div>
              <div>
                <span className="font-semibold text-slate-200">Frontend &amp; UI:</span>
                <p className="text-slate-400 mt-0.5">React, Responsive Web Design, DOM APIs, Flexbox, UI/UX Architecture</p>
              </div>
              <div>
                <span className="font-semibold text-slate-200">Backend &amp; Cloud:</span>
                <p className="text-slate-400 mt-0.5">Python Backend, REST APIs, AI/ML Fundamentals, Firebase</p>
              </div>
              <div>
                <span className="font-semibold text-slate-200">Developer Tools:</span>
                <p className="text-slate-400 mt-0.5">Git, GitHub, VS Code, Netlify, Microsoft Office Suite</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3 font-mono">Certifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {certifications.map((cert) => (
                <div key={cert.id} className="p-3 rounded-xl bg-[#0b0d12]/60 border border-slate-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-200">{cert.title}</div>
                    <div className="text-slate-400 text-[11px]">{cert.issuer} • {cert.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 bg-[#07090e]/95 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <span>Authoritative Source: Zubair Mehmood Official Resume (SSUET, Karachi)</span>
          <button
            onClick={() => setIsResumeModalOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
