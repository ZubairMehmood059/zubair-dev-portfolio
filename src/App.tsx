import React, { useState, useEffect } from 'react';
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
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminLayout } from './components/admin/AdminLayout';
import { ToastContainer } from './components/Toast';

const PortfolioContent: React.FC = () => {
  const { isAdminLoggedIn } = usePortfolio();
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminViewOpen, setIsAdminViewOpen] = useState(false);

  // Handle hotkey to open admin modal: Alt+A or Ctrl+Shift+A
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
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
      className="min-h-screen text-slate-100 font-sans relative antialiased transition-colors duration-500"
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
    >
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
        <Contact />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={handleOpenAdmin} />

      {/* Interactive Modals */}
      <ProjectModal />
      <ResumeModal />

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
