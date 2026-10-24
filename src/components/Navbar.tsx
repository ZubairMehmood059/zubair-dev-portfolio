import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Menu,
  X,
  Download,
  Shield,
  Send,
  Terminal,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeMode } from '../types';

interface NavbarProps {
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const {
    activeSection,
    setActiveSection,
    theme,
    setIsResumeModalOpen,
    isAdminLoggedIn,
    isPreviewMode,
    togglePreviewMode,
  } = usePortfolio();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll for sticky shadow & active link
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Detect active section
      const sections = [
        'home',
        'about',
        'experience',
        'skills',
        'projects',
        'education',
        'certifications',
        'focus',
        'faq',
        'contact',
      ];
      const scrollPos = window.scrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certs' },
    { id: 'focus', label: 'Focus' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Draft Preview Bar if Preview Mode is active */}
      {isPreviewMode && (
        <div className="fixed top-0 inset-x-0 z-50 bg-amber-500 text-slate-950 px-4 py-1.5 text-xs font-semibold flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
            <span>PREVIEW MODE: Viewing unpublished draft changes</span>
          </div>
          <button
            onClick={togglePreviewMode}
            className="px-2.5 py-0.5 rounded bg-slate-950 text-amber-400 text-xs hover:bg-slate-800 transition-colors"
          >
            Exit Preview
          </button>
        </div>
      )}

      <header
        style={{
          backgroundColor: isScrolled ? 'rgba(11, 13, 18, 0.85)' : 'transparent',
          borderColor: isScrolled ? 'var(--border-color)' : 'transparent',
        }}
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          isPreviewMode ? 'top-8' : 'top-0'
        } ${
          isScrolled
            ? 'backdrop-blur-xl border-b shadow-2xl shadow-black/50 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand */}
          <button
            onClick={() => scrollTo('home')}
            className="group flex items-center gap-3 text-left focus:outline-none"
            aria-label="Go to Home"
          >
            <div
              style={{
                background: 'var(--accent-gradient)',
                color: 'var(--accent-text-contrast, #ffffff)',
                boxShadow: '0 4px 16px var(--accent-glow)',
              }}
              className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm group-hover:scale-105 transition-transform"
            >
              ZM
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1 font-heading">
                Zubair<span className="text-blue-400">.dev</span>
              </span>
              <span className="block text-[10px] text-slate-400 font-mono tracking-wider">
                Full-Stack &amp; AI Engineer
              </span>
            </div>
          </button>

          {/* Desktop Nav Links with animated sliding indicator */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/70 p-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    isActive ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-blue-600/30 border border-blue-400/40 shadow-[0_0_12px_rgba(79,140,255,0.3)] -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Download CV */}
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-all hover:scale-[1.02] shadow-sm active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Resume</span>
            </button>

            {/* Contact CTA */}
            <button
              onClick={() => scrollTo('contact')}
              style={{
                background: 'var(--accent-gradient)',
                color: 'var(--accent-text-contrast, #ffffff)',
                boxShadow: '0 4px 16px var(--accent-glow)',
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-[1.03] active:scale-[0.98] hover:brightness-110 shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Get In Touch</span>
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={onOpenAdmin}
              className={`p-2 rounded-xl border transition-colors ${
                isAdminLoggedIn
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/60'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
              title={isAdminLoggedIn ? 'Open Admin CMS (Logged In)' : 'Admin Login'}
              aria-label="Admin Control Panel"
            >
              <Shield className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
              aria-label="Resume"
            >
              <Download className="w-4 h-4 text-blue-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="sm:hidden px-4 pt-3 pb-6 bg-[#0b0d12]/98 border-b border-slate-800 backdrop-blur-2xl overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-2 mb-4">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => scrollTo(link.id)}
                      className={`px-3 py-2 rounded-lg text-left text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-950/80 text-blue-300 font-semibold border border-blue-800/50'
                          : 'text-slate-300 hover:bg-slate-900'
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col gap-2.5 pt-3 border-t border-slate-800/80">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollTo('contact');
                  }}
                  style={{
                    background: 'var(--accent-gradient)',
                    color: 'var(--accent-text-contrast, #ffffff)',
                    boxShadow: '0 4px 16px var(--accent-glow)',
                  }}
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-center transition-all hover:brightness-110"
                >
                  Get In Touch
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full py-2 rounded-xl text-xs font-medium bg-slate-900 text-slate-300 border border-slate-800 flex items-center justify-center gap-2"
                >
                  <Shield className="w-3.5 h-3.5 text-blue-400" />
                  <span>Admin CMS Dashboard</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
