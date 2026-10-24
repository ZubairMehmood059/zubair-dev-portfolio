import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ShieldCheck, Key, AlertCircle, CheckCircle2 } from 'lucide-react';

export const AdminSecurity: React.FC = () => {
  const { changeAdminPassword, adminLogout, showToast } = usePortfolio();

  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPass.length < 6) {
      setError('New password must contain at least 6 characters.');
      return;
    }

    if (newPass !== confirmPass) {
      setError('Confirmation password does not match.');
      return;
    }

    const ok = changeAdminPassword(currentPass, newPass);
    if (ok) {
      setSuccess('Administrative password has been successfully updated.');
      showToast('Master password updated!');
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
    } else {
      setError('Current password is incorrect.');
    }
  };

  return (
    <div className="space-y-6 font-['Kanit',sans-serif] text-[#D7E2EA]">
      <div>
        <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight hero-heading">
          Security &amp; Administrative Authentication
        </h2>
        <p className="text-xs sm:text-sm text-[#BBCCD7]/70 font-light mt-1">
          Update the master administrative passcode protecting the CMS control panel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Password Form */}
        <div className="p-6 rounded-[28px] bg-[#121212] border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <Key className="w-4 h-4 text-[#D7E2EA]" />
            <span>Change Master Password</span>
          </h3>

          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-800/60 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 text-emerald-200 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA] font-mono"
              />
            </div>

            <div>
              <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                New Password (min 6 chars)
              </label>
              <input
                type="password"
                required
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA] font-mono"
              />
            </div>

            <div>
              <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA] font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 rounded-full bg-[#D7E2EA] hover:bg-white text-[#0C0C0C] font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              Update Master Passcode
            </button>
          </form>
        </div>

        {/* Session Info & Protection State */}
        <div className="space-y-4">
          <div className="p-6 rounded-[28px] bg-[#121212] border border-white/10 space-y-3 text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Authentication Status</span>
            </h3>

            <div className="space-y-2 text-[#BBCCD7]/80">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-[#BBCCD7]/60">Current Session State:</span>
                <span className="text-emerald-400 font-bold font-mono">AUTHORIZED (ACTIVE)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-[#BBCCD7]/60">Security Storage:</span>
                <span className="text-white font-mono">sessionStorage Encrypted</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-[#BBCCD7]/60">Contact Form Anti-Bot:</span>
                <span className="text-emerald-400 font-mono">Active (Math Challenge)</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#BBCCD7]/60">Data Persistence:</span>
                <span className="text-[#D7E2EA] font-mono">Local Storage Sandbox</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={adminLogout}
                className="w-full py-2.5 rounded-full bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/40 text-rose-200 font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Sign Out of Admin CMS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
