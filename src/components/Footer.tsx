import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Github, Linkedin, Mail, Shield, Heart, ArrowUp, Lock, FileText, Globe } from 'lucide-react';
import { LegalModal } from './LegalModal';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenNotFound?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenNotFound }) => {
  const { hero, isAdminLoggedIn } = usePortfolio();
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms' | 'cookies'>('privacy');

  const openLegal = (tab: 'privacy' | 'terms' | 'cookies') => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer
        style={{
          backgroundColor: '#07090e',
          borderColor: 'var(--border-color)',
        }}
        className="border-t text-slate-400 text-xs relative transition-colors duration-400"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left Branding */}
            <div className="text-center md:text-left space-y-1.5">
              <div className="flex items-center justify-center md:justify-start gap-2.5">
                <span className="font-extrabold text-white text-base font-heading">
                  {hero.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-950/80 text-blue-400 border border-blue-800/40 font-semibold">
                  Zubair.dev
                </span>
              </div>
              <p className="text-slate-400 text-xs max-w-md">
                Full-Stack Web Architectures &amp; Applied AI Systems • SSUET Karachi
              </p>
            </div>

            {/* Middle Socials */}
            <div className="flex items-center gap-3">
              <a
                href={hero.socials.github}
                target="_blank"
                rel="noreferrer noopener"
                className="p-2.5 rounded-xl bg-[#0e1420] hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all hover:scale-105"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={hero.socials.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="p-2.5 rounded-xl bg-[#0e1420] hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all hover:scale-105"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${hero.socials.email}`}
                className="p-2.5 rounded-xl bg-[#0e1420] hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all hover:scale-105"
                aria-label="Send Direct Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <button
                onClick={scrollToTop}
                className="p-2.5 rounded-xl bg-[#0e1420] hover:bg-slate-800 text-slate-400 hover:text-blue-400 border border-slate-800 transition-all hover:scale-105 cursor-pointer"
                title="Scroll to top"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>

            {/* Right Meta Links */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-3.5 text-slate-400 text-xs">
              <button
                onClick={() => openLegal('privacy')}
                className="hover:text-blue-300 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>

              <span className="text-slate-700">•</span>

              <button
                onClick={() => openLegal('terms')}
                className="hover:text-blue-300 transition-colors cursor-pointer"
              >
                Terms of Service
              </button>

              <span className="text-slate-700">•</span>

              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-slate-200 transition-colors"
              >
                Sitemap
              </a>

              <span className="text-slate-700">•</span>

              {onOpenNotFound && (
                <>
                  <button
                    onClick={onOpenNotFound}
                    className="hover:text-amber-400 transition-colors cursor-pointer font-mono text-[11px]"
                  >
                    404 Page
                  </button>
                  <span className="text-slate-700">•</span>
                </>
              )}

              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 hover:text-blue-300 text-slate-400 transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isAdminLoggedIn ? 'Admin CMS' : 'Admin Login'}</span>
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <div>
              &copy; {new Date().getFullYear()} Zubair Mehmood. All rights reserved. Zero tracking cookies • Production Grade.
            </div>
            <div className="font-mono text-slate-500">
              Sir Syed University of Engineering &amp; Technology, Karachi
            </div>
          </div>

        </div>
      </footer>

      {/* Comprehensive Legal & Transparency Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        initialTab={legalTab}
        onClose={() => setLegalModalOpen(false)}
      />
    </>
  );
};
