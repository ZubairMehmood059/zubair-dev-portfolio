import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Github, Linkedin, Mail, ArrowUp, Lock, FileText, ShieldCheck, HelpCircle } from 'lucide-react';
import { Logo } from './common/Logo';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenLegalModal: (type: 'privacy' | 'terms') => void;
  onOpen404: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenLegalModal, onOpen404 }) => {
  const { hero, isAdminLoggedIn } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0C0C0C] border-t border-white/10 text-[#D7E2EA] font-['Kanit',sans-serif] relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 sm:py-14">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Branding */}
          <div className="flex flex-col items-center lg:items-start space-y-2 text-center lg:text-left">
            <Logo size="md" showDot onClick={scrollToTop} />
            <p className="text-[#BBCCD7]/70 text-xs sm:text-sm font-light max-w-md">
              Full-Stack &amp; AI Developer • Sir Syed University of Engineering &amp; Technology
            </p>
          </div>

          {/* Middle Socials */}
          <div className="flex items-center gap-3">
            <a
              href={hero.socials.github}
              target="_blank"
              rel="noreferrer noopener"
              className="p-3 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] hover:border-white hover:text-white hover:bg-white/10 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={hero.socials.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="p-3 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] hover:border-white hover:text-white hover:bg-white/10 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${hero.socials.email}`}
              className="p-3 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] hover:border-white hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Direct Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-3 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] hover:border-white hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Scroll to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

          {/* Right Meta & Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 text-xs font-mono uppercase tracking-wider text-[#BBCCD7]/70">
            <a href="#faq" className="hover:text-white transition-colors flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FAQ</span>
            </a>

            <span className="text-white/20">•</span>

            <button
              type="button"
              onClick={() => onOpenLegalModal('privacy')}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Privacy</span>
            </button>

            <span className="text-white/20">•</span>

            <button
              type="button"
              onClick={() => onOpenLegalModal('terms')}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Terms</span>
            </button>

            <span className="text-white/20">•</span>

            <button
              type="button"
              onClick={onOpen404}
              className="hover:text-rose-300 transition-colors cursor-pointer text-white/50"
              title="Test 404 Error Handler"
            >
              404
            </button>

            <span className="text-white/20">•</span>

            <button
              type="button"
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-[#D7E2EA]"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isAdminLoggedIn ? 'Admin CMS' : 'Admin'}</span>
            </button>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-light text-[#BBCCD7]/50 gap-2 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} Zubair Mehmood. All rights reserved. Built for high performance &amp; production reliability.
          </div>
          <div className="font-mono">
            Karachi, Pakistan (PKT, UTC+5)
          </div>
        </div>
      </div>
    </footer>
  );
};
