import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { FileText, Lock, Menu, X } from 'lucide-react';
import { Logo } from './common/Logo';

interface NavbarProps {
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const {
    activeSection,
    setActiveSection,
    setIsResumeModalOpen,
    isAdminLoggedIn,
    isPreviewMode,
    togglePreviewMode,
  } = usePortfolio();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const drawerLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = [
        'home',
        'about',
        'skills',
        'experience',
        'education',
        'services',
        'projects',
        'contact',
      ];
      const scrollPos = window.scrollY + 200;

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

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Draft Preview Bar if Preview Mode is active */}
      {isPreviewMode && (
        <div className="fixed top-0 inset-x-0 z-50 bg-[#BBCCD7] text-[#0C0C0C] px-4 py-1.5 text-xs font-mono font-bold flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0C0C0C] animate-ping" />
            <span>PREVIEW MODE: Viewing unpublished drafts</span>
          </div>
          <button
            type="button"
            onClick={togglePreviewMode}
            className="px-2.5 py-0.5 rounded-full bg-[#0C0C0C] text-white text-xs hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Exit Preview
          </button>
        </div>
      )}

      {/* Unified Navigation Header: transparent at top, frosted glass when scrolled */}
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          isPreviewMode ? 'top-8' : 'top-0'
        } ${
          isScrolled
            ? 'backdrop-blur-xl bg-[#0C0C0C]/90 border-b border-white/10 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.6)]'
            : 'bg-transparent border-b border-transparent py-4 sm:py-5 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between">
          {/* Brand Logo */}
          <Logo
            size="sm"
            showDot
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />

          {/* Desktop & Laptop Nav Links (All 8 links) */}
          <nav className="hidden lg:flex items-center gap-2.5 lg:gap-3.5 xl:gap-5 shrink-0">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  className={`text-[11px] xl:text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer py-1 whitespace-nowrap ${
                    isActive
                      ? 'text-white border-b-2 border-[#D7E2EA]'
                      : 'text-[#D7E2EA]/70 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Medium screen Nav Links (Compact subset) */}
          <nav className="hidden md:flex lg:hidden items-center gap-2 shrink-0">
            {navLinks
              .filter((l) => ['home', 'about', 'skills', 'projects', 'contact'].includes(l.id))
              .map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    className={`text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer py-1 whitespace-nowrap ${
                      isActive ? 'text-white border-b-2 border-[#D7E2EA]' : 'text-[#D7E2EA]/70 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsResumeModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border border-[#D7E2EA]/40 text-[#D7E2EA] hover:border-white hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>CV</span>
            </button>

            <button
              type="button"
              onClick={onOpenAdmin}
              className={`p-2 rounded-full border transition-colors cursor-pointer ${
                isAdminLoggedIn
                  ? 'border-emerald-500/60 text-emerald-400 bg-emerald-950/40'
                  : 'border-white/10 text-white/50 hover:text-white hover:border-white/30'
              }`}
              title={isAdminLoggedIn ? 'Admin CMS (Logged In)' : 'Admin Portal'}
              aria-label="Admin Control"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setIsResumeModalOpen(true)}
              className="px-3 py-1 rounded-full text-xs font-mono border border-white/20 text-[#D7E2EA] cursor-pointer"
            >
              CV
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-full bg-white/5 text-white cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden px-6 pt-4 pb-6 bg-[#0C0C0C]/98 border-b border-white/10 backdrop-blur-2xl">
            <div className="flex flex-col gap-2.5">
              {drawerLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-sm font-medium uppercase tracking-wider text-[#D7E2EA] hover:text-white py-1.5 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  {activeSection === link.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D7E2EA]" />
                  )}
                </button>
              ))}
              <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="text-xs font-mono uppercase text-white/60 hover:text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
