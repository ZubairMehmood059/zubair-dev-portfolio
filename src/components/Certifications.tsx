import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Award, CheckCircle2, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';

export const Certifications: React.FC = () => {
  const { certifications, isPreviewMode, showToast } = usePortfolio();
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  const visibleCerts = certifications.filter((c) => isPreviewMode || c.isPublished);

  return (
    <section id="certifications" className="py-20 relative bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            Certifications &amp; Training
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl">
            Industry training programs and information technology certifications completed as part of continuous technical enrichment.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleCerts.map((cert) => (
            <div
              key={cert.id}
              className="glass-panel p-6 sm:p-7 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="p-3 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-800/40 group-hover:scale-105 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-slate-300 border border-slate-800 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    {cert.year}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h3>
                  <div className="text-sm font-semibold text-slate-300 mt-1 flex items-center gap-2">
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
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>Verification Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs text-slate-500 font-mono">Academic Record</span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
