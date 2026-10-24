import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Award, CheckCircle2, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const Certifications: React.FC = () => {
  const { certifications, isPreviewMode } = usePortfolio();

  const visibleCerts = certifications.filter((c) => isPreviewMode || c.isPublished);

  return (
    <section id="certifications" className="py-24 relative bg-[#090c13]/60 overflow-hidden">
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
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            Certifications &amp; Training
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
            Industry training programs and information technology certifications completed as part of continuous technical enrichment.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleCerts.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800/90 hover:border-blue-500/50 transition-all flex flex-col justify-between group shadow-xl bg-[#0e1420]/80"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="p-3.5 rounded-xl bg-blue-950/80 text-blue-400 border border-blue-800/50 group-hover:scale-105 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono bg-[#111722] text-slate-300 border border-slate-800 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    {cert.year}
                  </span>
                </div>

                <div className="mt-5">
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors font-heading">
                    {cert.title}
                  </h3>
                  <div className="text-sm font-semibold text-slate-300 mt-1.5 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Issued by {cert.issuer}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified Credential</span>
                </span>

                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>Verification Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs text-slate-500 font-mono">Academic Record</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
