import React, { useState, useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeSection } from './components/MarqueeSection';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { ServicesSection } from './components/ServicesSection';
import { Projects } from './components/Projects';
import { FAQSection } from './components/FAQSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { LegalModals } from './components/LegalModals';
import { NotFoundModal } from './components/NotFoundModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminLayout } from './components/admin/AdminLayout';
import { ToastContainer } from './components/Toast';

const PortfolioContent: React.FC = () => {
  const { isAdminLoggedIn } = usePortfolio();
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminViewOpen, setIsAdminViewOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [notFoundOpen, setNotFoundOpen] = useState(false);
  const [requested404Route, setRequested404Route] = useState<string>('');

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

  // Check URL hash for 404 trigger
  useEffect(() => {
    const handleHashCheck = () => {
      if (window.location.hash === '#404' || window.location.pathname.startsWith('/404')) {
        setRequested404Route(window.location.hash || window.location.pathname);
        setNotFoundOpen(true);
      }
    };
    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setIsAdminViewOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleOpen404 = () => {
    setRequested404Route('/404-preview');
    setNotFoundOpen(true);
  };

  return (
    <div className="min-h-screen text-[#D7E2EA] font-['Kanit',sans-serif] bg-[#0C0C0C] relative antialiased transition-colors duration-500 overflow-x-clip">
      {/* Floating Navigation Header on Scroll */}
      <Navbar onOpenAdmin={handleOpenAdmin} />

      {/* Main Single-Page Sections in exact unified 3D Creator sequence */}
      <main className="relative bg-[#0C0C0C] overflow-x-clip">
        <Hero onOpenAdmin={handleOpenAdmin} />
        <MarqueeSection />
        <About />
        <Skills />
        <Experience />
        <Education />
        <ServicesSection />
        <Projects />
        <FAQSection />
        <Contact />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={handleOpenAdmin}
        onOpenLegalModal={(type) => setLegalModalType(type)}
        onOpen404={handleOpen404}
      />

      {/* Interactive Modals */}
      <ProjectModal />
      <ResumeModal />
      <LegalModals type={legalModalType} onClose={() => setLegalModalType(null)} />
      <NotFoundModal
        isOpen={notFoundOpen}
        onClose={() => setNotFoundOpen(false)}
        requestedRoute={requested404Route}
      />

      {/* Admin Authentication & CMS Portal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => {
          setIsAdminLoginOpen(false);
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
