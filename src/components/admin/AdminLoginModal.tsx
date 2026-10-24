import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Lock, KeyRound, AlertCircle, X, Eye, EyeOff } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const { adminLogin, showToast } = usePortfolio();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (attempts >= 5) {
      setError('Too many failed attempts. Temporary security lockout active.');
      return;
    }

    const success = adminLogin(password);
    if (success) {
      showToast('Admin access authorized. Welcome back, Zubair!');
      onClose();
      setPassword('');
      setAttempts(0);
    } else {
      setAttempts((prev) => prev + 1);
      setError(`Invalid administrative password. (${4 - attempts} attempts remaining)`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-['Kanit',sans-serif]">
      <div className="relative w-full max-w-md bg-[#0C0C0C] border-2 border-[#D7E2EA] rounded-[36px] sm:rounded-[44px] shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-6 sm:p-8 space-y-6 text-[#D7E2EA]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#D7E2EA]/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-14 h-14 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] flex items-center justify-center mx-auto shadow-lg shadow-black/50">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black uppercase text-white tracking-tight hero-heading">
            Admin CMS Portal
          </h2>
          <p className="text-xs text-[#BBCCD7]/70 font-light max-w-xs mx-auto">
            Authorized administrative dashboard for managing Zubair.dev portfolio content.
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-800/60 text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5 text-left">
            <label htmlFor="admin-password" className="text-xs font-medium uppercase tracking-wider text-[#BBCCD7]">
              Administrative Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-[#D7E2EA]/50 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                autoFocus
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-11 py-3 rounded-2xl bg-[#141414] border border-[#D7E2EA]/30 text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D7E2EA] font-mono transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D7E2EA]/50 hover:text-white cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full text-xs sm:text-sm font-medium uppercase tracking-widest text-[#0C0C0C] bg-[#D7E2EA] hover:bg-white transition-all shadow-[0_0_20px_rgba(215,226,234,0.3)] hover:scale-[1.02] active:scale-[0.98] font-['Kanit',sans-serif] cursor-pointer"
          >
            Authorize Access
          </button>
        </form>
      </div>
    </div>
  );
};
