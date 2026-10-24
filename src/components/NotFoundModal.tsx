import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Home, ArrowLeft, RefreshCw, Layers, Sparkles, X } from 'lucide-react';

interface NotFoundModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotFoundModal: React.FC<NotFoundModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleReturnHome = () => {
    window.location.hash = '#home';
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-xl rounded-3xl bg-[#0e1420] border border-blue-500/30 shadow-2xl shadow-blue-500/10 overflow-hidden text-left"
        >
          {/* Top Decorative Terminal Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-[#111722] border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-xs font-mono text-slate-400 ml-2">
                error://404_matrix_coordinates_not_found
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close Error Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Big 404 Glitch Style Display */}
            <div className="flex items-baseline gap-3">
              <span className="text-6xl sm:text-7xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-300">
                404
              </span>
              <div className="space-y-1">
                <div className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold">
                  Route Coordinate Error
                </div>
                <div className="text-sm font-semibold text-white">
                  Target Resource Does Not Exist
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              The matrix node or section you requested is not mapped within this developer portfolio. 
              The system is functioning normally; please return to the primary coordinates below.
            </p>

            {/* Terminal Diagnostic Box */}
            <div className="p-4 rounded-xl bg-[#07090e] border border-slate-800 font-mono text-[11px] text-slate-400 space-y-1.5">
              <div className="text-emerald-400">&gt; HTTP/2.0 404 Not Found</div>
              <div>&gt; Host: zubair.dev (Karachi, PK)</div>
              <div>&gt; Engine: Vite 6.2 + React 19 + TypeScript</div>
              <div className="text-violet-400">&gt; Status: All core projects &amp; APIs remain operational</div>
            </div>

            {/* Quick Navigation Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleReturnHome}
                style={{
                  background: 'var(--accent-gradient)',
                  boxShadow: '0 4px 18px var(--accent-glow)',
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white hover:scale-[1.02] transition-transform cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Return to Home Orbit</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  const el = document.getElementById('projects');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                <Layers className="w-4 h-4 text-blue-400" />
                <span>Jump to Projects</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-800 font-medium text-xs transition-colors cursor-pointer"
              >
                <span>Report Broken Link</span>
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
