import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { CurrentFocus } from './components/CurrentFocus';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { NotFoundModal } from './components/NotFoundModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminLayout } from './components/admin/AdminLayout';
import { ToastContainer } from './components/Toast';

const PortfolioContent: React.FC = () => {
  const { isAdminLoggedIn } = usePortfolio();
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminViewOpen, setIsAdminViewOpen] = useState(false);
  const [isNotFoundOpen, setIsNotFoundOpen] = useState(false);

  // Smooth scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Handle hotkey to open admin modal and route hash detection (e.g. #404)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'a') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        if (isAdminLoggedIn) {
          setIsAdminViewOpen((prev) => !prev);
        } else {
          setIsAdminLoginOpen(true);
        }
      }
    };

    const handleHashCheck = () => {
      if (window.location.hash.toLowerCase() === '#404') {
        setIsNotFoundOpen(true);
      }
    };

    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHashCheck);
    };
  }, [isAdminLoggedIn]);

  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setIsAdminViewOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  return (
    <div
      className="min-h-screen text-slate-100 font-sans relative antialiased transition-colors duration-500 selection:bg-blue-500/20 selection:text-blue-300"
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
    >
      {/* Global Architectural Cyber-Grid Across Entire Application */}
      <div className="global-architectural-grid" />

      {/* Global Ambient Aurora Orbs (Electric Blue + Luminous Violet) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top Center Horizon Glow */}
        <div
          style={{
            background: 'radial-gradient(circle at 50% -10%, rgba(79, 140, 255, 0.16) 0%, rgba(139, 92, 246, 0.12) 35%, transparent 70%)',
          }}
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1200px] h-[650px] blur-3xl"
        />
        {/* Mid-Page Right Violet Aurora */}
        <div
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(79, 140, 255, 0.04) 40%, transparent 70%)',
          }}
          className="absolute top-[35%] -right-48 w-[650px] h-[650px] rounded-full blur-[130px]"
        />
        {/* Lower Left Blue-Sapphire Aurora */}
        <div
          style={{
            background: 'radial-gradient(circle, rgba(79, 140, 255, 0.07) 0%, rgba(167, 139, 250, 0.05) 40%, transparent 70%)',
          }}
          className="absolute top-[70%] -left-48 w-[650px] h-[650px] rounded-full blur-[130px]"
        />
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] origin-left pointer-events-none shadow-[0_0_14px_rgba(139,92,246,0.85)]"
        style={{
          scaleX,
          background: 'var(--accent-gradient)',
        }}
      />

      {/* Navigation Header */}
      <Navbar onOpenAdmin={handleOpenAdmin} />

      {/* Main Single-Page Sections */}
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <CurrentFocus />
        <FAQ />
        <Contact />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={handleOpenAdmin}
        onOpenNotFound={() => setIsNotFoundOpen(true)}
      />

      {/* Interactive Modals */}
      <ProjectModal />
      <ResumeModal />
      <NotFoundModal
        isOpen={isNotFoundOpen}
        onClose={() => setIsNotFoundOpen(false)}
      />

      {/* Admin Authentication & CMS Portal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => {
          setIsAdminLoginOpen(false);
          // If just logged in, open the CMS
          if (sessionStorage.getItem('zubair_admin_auth') === 'true') {
            setIsAdminViewOpen(true);
          }
        }}
      />

      {isAdminLoggedIn && isAdminViewOpen && (
        <AdminLayout onClose={() => setIsAdminViewOpen(false)} />
      )}

      {/* Toast Notification Layer */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}
