import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ShieldCheck, Key, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';

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
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white font-heading">Security &amp; Administrative Authentication</h2>
        <p className="text-xs text-slate-400">
          Update the master administrative passcode protecting the CMS control panel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Password Form */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <Key className="w-4 h-4 text-cyan-400" />
            <span>Change Master Password</span>
          </h3>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800/60 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800/60 text-emerald-200 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Current Password</label>
              <input
                type="password"
                required
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">New Password (min 6 chars)</label>
              <input
                type="password"
                required
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
            >
              Update Master Passcode
            </button>
          </form>
        </div>

        {/* Session Info & Protection State */}
        <div className="space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3 text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Authentication Status</span>
            </h3>

            <div className="space-y-2 text-slate-300">
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Current Session State:</span>
                <span className="text-emerald-400 font-bold font-mono">AUTHORIZED (ACTIVE)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Security Storage:</span>
                <span className="text-slate-200 font-mono">sessionStorage Encrypted</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Contact Form Anti-Bot:</span>
                <span className="text-emerald-400 font-mono">Active (Math Challenge)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Data Persistence:</span>
                <span className="text-cyan-400 font-mono">Local Storage Sandbox</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={adminLogout}
                className="w-full py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-200 font-semibold text-xs transition-colors"
              >
                Terminate Active Session &amp; Lock CMS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
