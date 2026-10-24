import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = usePortfolio();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md pointer-events-none font-['Kanit',sans-serif]">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border text-sm backdrop-blur-xl ${
              toast.type === 'error'
                ? 'bg-rose-950/95 border-rose-700/50 text-rose-100'
                : toast.type === 'info'
                ? 'bg-[#141414]/95 border-white/15 text-[#D7E2EA]'
                : 'bg-[#141414]/95 border-[#D7E2EA]/40 text-[#D7E2EA]'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-5 h-5 text-[#D7E2EA] shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            )}
            <span className="flex-1 font-medium">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
