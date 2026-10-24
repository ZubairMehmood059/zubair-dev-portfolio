import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { FadeIn } from './common/MotionComponents';
import { GraduationCap, Calendar, Award, CheckCircle2, ExternalLink } from 'lucide-react';

export const Education: React.FC = () => {
  const { education, certifications, isPreviewMode } = usePortfolio();

  const visibleEdu = education.filter((e) => isPreviewMode || e.isPublished);
  const visibleCerts = certifications.filter((c) => isPreviewMode || c.isPublished);

  return (
    <section
      id="education"
      className="bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10 select-none overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <FadeIn delay={0} y={40} duration={0.8}>
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-4 sm:mb-6"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Education
          </h2>
          <p className="text-center text-[#D7E2EA]/70 font-light max-w-2xl mx-auto uppercase tracking-wide text-xs sm:text-sm md:text-base mb-14 sm:mb-20">
            Rigorous software engineering curriculum, academic pre-engineering training, and verified IT qualifications.
          </p>
        </FadeIn>

        {/* Academic Degree Cards */}
        <div className="flex flex-col gap-8 mb-16">
          {visibleEdu.map((edu, idx) => {
            const numberFormatted = `0${idx + 1}`;
            return (
              <FadeIn key={edu.id} delay={idx * 0.12} y={30} duration={0.8}>
                <div className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:border-white transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span
                        className="font-black text-[#D7E2EA] leading-none shrink-0"
                        style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
                      >
                        {numberFormatted}
                      </span>
                      <div>
                        <span className="text-xs font-mono uppercase tracking-widest text-[#BBCCD7]/70">
                          Academic Degree
                        </span>
                        <h3
                          className="font-bold uppercase text-white tracking-tight"
                          style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)' }}
                        >
                          {edu.institution}
                        </h3>
                        <p className="text-sm font-medium uppercase tracking-wider text-[#BBCCD7]">
                          {edu.degree}
                        </p>
                      </div>
                    </div>

                    <div className="self-start sm:self-center">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border border-[#D7E2EA]/40 text-[#D7E2EA] bg-white/5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{edu.period}</span>
                      </span>
                    </div>
                  </div>

                  {edu.details && (
                    <p className="text-xs sm:text-sm text-[#D7E2EA]/80 font-light mt-6 leading-relaxed max-w-4xl">
                      {edu.details}
                    </p>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Technical Certifications Card */}
        {visibleCerts.length > 0 && (
          <FadeIn delay={0.3} y={30} duration={0.8}>
            <div className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-[#D7E2EA] flex items-center justify-center text-[#D7E2EA]">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#BBCCD7]/70">
                      Verified Credentials
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
                      Professional Certifications
                    </h3>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visibleCerts.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-5 rounded-[24px] bg-[#141414] border border-white/10 flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#BBCCD7]/70 uppercase tracking-wider">
                          {cert.issuer}
                        </span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded-full border border-white/10 text-white/70">
                          {cert.year}
                        </span>
                      </div>
                      <h4 className="text-base font-semibold text-white uppercase tracking-wide mt-1.5">
                        {cert.title}
                      </h4>
                    </div>

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D7E2EA] hover:text-white uppercase tracking-wider self-start pt-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Verified Credential</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
};
