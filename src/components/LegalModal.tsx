import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, FileText, CheckCircle2, Lock, X, ExternalLink, Globe } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: 'privacy' | 'terms' | 'cookies';
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab = 'privacy',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'cookies'>(initialTab);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl rounded-3xl bg-[#0e1420] border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col max-h-[88vh] text-left"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#111722] border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="text-base font-bold text-white font-heading">
                  Legal &amp; Privacy Transparency
                </h3>
                <p className="text-[11px] text-slate-400">
                  Zubair.dev • Developer Portfolio of Zubair Mehmood
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close Legal Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 px-6 pt-3 bg-[#0d121c] border-b border-slate-800 text-xs font-mono">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-4 py-2 rounded-t-xl transition-all cursor-pointer ${
                activeTab === 'privacy'
                  ? 'bg-[#0e1420] text-blue-400 font-bold border-t-2 border-blue-500'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`px-4 py-2 rounded-t-xl transition-all cursor-pointer ${
                activeTab === 'terms'
                  ? 'bg-[#0e1420] text-blue-400 font-bold border-t-2 border-blue-500'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Terms of Service
            </button>
            <button
              onClick={() => setActiveTab('cookies')}
              className={`px-4 py-2 rounded-t-xl transition-all cursor-pointer ${
                activeTab === 'cookies'
                  ? 'bg-[#0e1420] text-blue-400 font-bold border-t-2 border-blue-500'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Cookie &amp; Telemetry Policy
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed custom-scrollbar">
            {activeTab === 'privacy' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/40 text-blue-200 text-xs">
                  <strong>Commitment to Privacy:</strong> This website does not monetize, sell, or distribute visitor information. We do not use third-party ad pixels or tracking beacons.
                </div>

                <h4 className="text-base font-bold text-white font-heading pt-2">
                  1. Information Collected
                </h4>
                <p>
                  When you submit the contact form on Zubair.dev, we collect your name, email address, inquiry subject, and message content. This data is exclusively used to communicate with you regarding engineering opportunities and technical collaboration.
                </p>

                <h4 className="text-base font-bold text-white font-heading pt-2">
                  2. Storage &amp; Data Security
                </h4>
                <p>
                  Inquiries are logged directly into Zubair Mehmood’s authenticated local administrative workspace. No message content is passed to external marketing lists or automated newsletters.
                </p>

                <h4 className="text-base font-bold text-white font-heading pt-2">
                  3. Your Rights
                </h4>
                <p>
                  You may request the deletion of your contact transmission at any time by emailing{' '}
                  <a href="mailto:itszayn1379@gmail.com" className="text-blue-400 underline">
                    itszayn1379@gmail.com
                  </a>.
                </p>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className="space-y-4">
                <h4 className="text-base font-bold text-white font-heading">
                  1. Intellectual Property &amp; Code Usage
                </h4>
                <p>
                  All project case studies, system designs, and code repositories displayed on this website represent the original work of Zubair Mehmood unless explicitly noted (such as third-party open-source libraries or educational reference materials).
                </p>
                <p>
                  Open-source projects linked through GitHub are governed by their respective repository licenses (e.g., MIT License).
                </p>

                <h4 className="text-base font-bold text-white font-heading pt-2">
                  2. Disclaimer of Warranty
                </h4>
                <p>
                  This portfolio and its hosted demonstration environments are provided &quot;as is&quot; for professional demonstration and evaluation purposes. While high availability is maintained, no guarantee of uninterrupted live demo uptime is expressed.
                </p>

                <h4 className="text-base font-bold text-white font-heading pt-2">
                  3. Professional Representation
                </h4>
                <p>
                  Academic credentials reflect current enrollment at Sir Syed University of Engineering and Technology (SSUET), Karachi, Pakistan.
                </p>
              </div>
            )}

            {activeTab === 'cookies' && (
              <div className="space-y-4">
                <h4 className="text-base font-bold text-white font-heading">
                  1. Cookie-Free Architecture
                </h4>
                <p>
                  Zubair.dev utilizes modern browser LocalStorage instead of tracking cookies to persist your theme preference, admin authentication token, and contact rate-limiting timestamps.
                </p>

                <h4 className="text-base font-bold text-white font-heading pt-2">
                  2. Aggregated Anonymous Telemetry
                </h4>
                <p>
                  To monitor site performance and popular projects, client-side counters calculate anonymous metrics (e.g. general device category like desktop/mobile and case study view counts). No personally identifiable IP tracking is recorded.
                </p>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-4 bg-[#111722] border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-500">
              Last Updated: October 2026 • Zubair Mehmood
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
