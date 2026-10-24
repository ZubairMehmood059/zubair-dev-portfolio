import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Award, CheckCircle2, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';

export const Certifications: React.FC = () => {
  const { certifications, isPreviewMode } = usePortfolio();

  const visibleCerts = certifications.filter((c) => isPreviewMode || c.isPublished);

  return (
    <section id="certifications" className="py-20 relative bg-[#0C0C0C] font-['Kanit',sans-serif] text-[#D7E2EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left mb-12">
          <div className="inline-flex items-center gap-2 text-[#BBCCD7] text-xs font-mono font-semibold uppercase tracking-widest mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight hero-heading">
            Certifications &amp; Training
          </h2>
          <p className="text-sm text-[#BBCCD7]/70 mt-2 max-w-xl font-light">
            Industry training programs and information technology certifications completed as part of continuous technical enrichment.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleCerts.map((cert) => (
            <div
              key={cert.id}
              className="p-6 sm:p-7 rounded-[32px] border border-white/10 bg-[#121212] hover:border-[#D7E2EA]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="p-3.5 rounded-2xl bg-black/60 text-[#D7E2EA] border border-white/15 group-hover:scale-105 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono bg-black/50 text-[#D7E2EA] border border-white/10 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#BBCCD7]" />
                    {cert.year}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wide group-hover:text-[#D7E2EA] transition-colors">
                    {cert.title}
                  </h3>
                  <div className="text-sm font-semibold text-[#BBCCD7] mt-1.5 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Issued by {cert.issuer}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified Credential</span>
                </span>

                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D7E2EA] hover:text-white transition-colors uppercase tracking-wider font-mono"
                  >
                    <span>Verification Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs text-[#BBCCD7]/50 font-mono">Academic Record</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
