import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Github, Linkedin, Mail, Shield, Heart, ArrowUp, Lock } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { hero, isAdminLoggedIn } = usePortfolio();
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderColor: 'var(--border-color)',
        }}
        className="border-t text-slate-400 text-xs relative transition-colors duration-400"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left Branding */}
            <div className="text-center md:text-left space-y-1.5">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="font-extrabold text-white text-base font-heading">
                  {hero.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/40">
                  Zubair.dev
                </span>
              </div>
              <p className="text-slate-400 text-xs max-w-md">
                {hero.title}
              </p>
            </div>

            {/* Middle Socials */}
            <div className="flex items-center gap-3">
              <a
                href={hero.socials.github}
                target="_blank"
                rel="noreferrer noopener"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={hero.socials.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${hero.socials.email}`}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <button
                onClick={scrollToTop}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 transition-colors"
                title="Scroll to top"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>

            {/* Right Meta Links */}
            <div className="flex items-center gap-4 text-slate-400 text-xs">
              <button
                onClick={() => setPrivacyModalOpen(true)}
                className="hover:text-slate-200 transition-colors"
              >
                Privacy Policy
              </button>

              <span className="text-slate-700">•</span>

              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 hover:text-cyan-300 text-slate-400 transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isAdminLoggedIn ? 'Admin CMS' : 'Admin Login'}</span>
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <div>
              &copy; {new Date().getFullYear()} Zubair Mehmood. All rights reserved. Built with precision for production performance.
            </div>
            <div className="font-mono text-slate-500">
              Sir Syed University of Engineering &amp; Technology, Karachi
            </div>
          </div>

        </div>
      </footer>

      {/* Privacy Modal */}
      {privacyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4 text-slate-300 text-xs">
            <h3 className="text-base font-bold text-white font-heading">Privacy &amp; Data Transparency</h3>
            <p>
              This website prioritizes visitor privacy. No invasive tracking cookies, third-party advertising scripts, or marketing pixels are used.
            </p>
            <p>
              Information submitted via the direct contact form is exclusively delivered to Zubair Mehmood&apos;s authenticated administration inbox for professional communication.
            </p>
            <p>
              Aggregated visit metrics (such as device category and referral source) are strictly anonymous and stored client-side for performance benchmarking.
            </p>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setPrivacyModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
