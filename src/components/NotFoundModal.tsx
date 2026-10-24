import React from 'react';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';

interface NotFoundProps {
  isOpen: boolean;
  onClose: () => void;
  requestedRoute?: string;
}

export const NotFoundModal: React.FC<NotFoundProps> = ({ isOpen, onClose, requestedRoute }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg font-['Kanit',sans-serif]">
      <div className="relative w-full max-w-lg bg-[#0C0C0C] border-2 border-rose-500/50 rounded-[36px] shadow-[0_25px_70px_rgba(244,63,94,0.15)] p-6 sm:p-8 text-center space-y-6 text-[#D7E2EA]">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full border-2 border-rose-500/60 bg-rose-950/40 text-rose-400 flex items-center justify-center mx-auto shadow-lg">
          <AlertTriangle className="w-8 h-8" />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-400">
            HTTP 404 — Resource Not Found
          </span>
          <h2 className="text-3xl font-black uppercase text-white tracking-tight hero-heading">
            Page Off-Grid
          </h2>
          <p className="text-xs sm:text-sm text-[#BBCCD7]/80 font-light max-w-xs mx-auto leading-relaxed">
            The target endpoint or project slug {requestedRoute ? <code className="text-rose-300 font-mono font-bold">&quot;{requestedRoute}&quot;</code> : 'you requested'} does not exist in the Zubair.dev portfolio index.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#D7E2EA] hover:bg-white text-[#0C0C0C] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </button>
          <button
            onClick={() => {
              window.history.back();
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-full border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};
