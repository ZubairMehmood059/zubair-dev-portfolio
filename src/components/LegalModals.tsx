import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-['Kanit',sans-serif]">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-[#0C0C0C] border-2 border-[#D7E2EA] rounded-[32px] sm:rounded-[40px] shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-6 sm:p-8 flex flex-col overflow-hidden text-[#D7E2EA]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full border border-white/20 bg-white/5 text-[#D7E2EA]">
              {type === 'privacy' ? <ShieldCheck className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight hero-heading">
                {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h2>
              <p className="text-xs text-[#BBCCD7]/70 font-mono">
                Zubair.dev • Effective Date: October 2026
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#D7E2EA]/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-6 pr-2 space-y-4 text-xs sm:text-sm text-[#D7E2EA]/85 font-light leading-relaxed">
          {type === 'privacy' ? (
            <>
              <section className="space-y-2">
                <h3 className="font-bold text-white uppercase tracking-wider text-sm font-mono text-[#D7E2EA]">
                  1. Information Collection
                </h3>
                <p>
                  When you submit inquiries through the contact form on Zubair.dev, we collect the name, email address, message subject, and message content you provide. This information is stored securely for the sole purpose of communicating with you regarding potential software engineering collaborations or professional opportunities.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-white uppercase tracking-wider text-sm font-mono text-[#D7E2EA]">
                  2. Use of Information
                </h3>
                <p>
                  Your information is strictly used to reply to your direct messages, evaluate technical requirements, and deliver requested services. We never sell, rent, share, or monetize your contact details with third-party marketers or advertisers.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-white uppercase tracking-wider text-sm font-mono text-[#D7E2EA]">
                  3. Analytics &amp; Local Persistence
                </h3>
                <p>
                  This portfolio platform uses anonymous performance telemetry and local browser storage (`localStorage` &amp; `sessionStorage`) to remember user preferences (such as theme configurations and administrative session states). No cross-site tracking or identity fingerprinting cookies are placed.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-white uppercase tracking-wider text-sm font-mono text-[#D7E2EA]">
                  4. Data Protection &amp; Security
                </h3>
                <p>
                  We implement anti-spam verification challenges and HTTPS encryption to protect all transmitted messages. You may request deletion of your stored contact message at any time by emailing zainbromehmoodalam@gmail.com.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-2">
                <h3 className="font-bold text-white uppercase tracking-wider text-sm font-mono text-[#D7E2EA]">
                  1. Acceptance of Terms
                </h3>
                <p>
                  By accessing and navigating Zubair.dev (&quot;Platform&quot;), you agree to comply with and be bound by these Terms of Service. If you do not agree with these terms, please refrain from using the Platform.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-white uppercase tracking-wider text-sm font-mono text-[#D7E2EA]">
                  2. Intellectual Property Rights
                </h3>
                <p>
                  All project case studies, source code demonstrations, architectural diagrams, visual graphics, and written content published on this Platform are the intellectual property of Zubair Mehmood unless otherwise credited to client organizations or open-source repositories.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-white uppercase tracking-wider text-sm font-mono text-[#D7E2EA]">
                  3. Acceptable Use
                </h3>
                <p>
                  You agree not to engage in unauthorized scraping, automated vulnerability scanning, brute-forcing administrative interfaces, or attempting to compromise Platform security.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-white uppercase tracking-wider text-sm font-mono text-[#D7E2EA]">
                  4. Disclaimer of Warranties
                </h3>
                <p>
                  This Platform and its demonstration web applications are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind.
                </p>
              </section>
            </>
          )}
        </div>

        {/* Footer button */}
        <div className="pt-4 border-t border-white/10 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#D7E2EA] hover:bg-white text-[#0C0C0C] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
