import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Clock,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { hero, about, submitContactMessage, showToast } = usePortfolio();

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Anti-spam math challenge
  const [challengeAnswer, setChallengeAnswer] = useState('');
  const [mathQuestion] = useState(() => {
    const num1 = Math.floor(Math.random() * 5) + 3;
    const num2 = Math.floor(Math.random() * 4) + 2;
    return { q: `${num1} + ${num2}`, ans: num1 + num2 };
  });

  // States
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    showToast(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Form Validation
    if (!name.trim()) {
      setErrorMessage('Please provide your name.');
      setStatus('error');
      return;
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please provide a valid email address.');
      setStatus('error');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setErrorMessage('Please write a message with at least 10 characters.');
      setStatus('error');
      return;
    }

    // Anti-spam check
    if (parseInt(challengeAnswer.trim(), 10) !== mathQuestion.ans) {
      setErrorMessage('Anti-spam security challenge answer is incorrect. Please try again.');
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const res = await submitContactMessage({
        name,
        email,
        subject: subject || 'Portfolio Inquiry',
        message,
      });

      if (res.success) {
        setStatus('success');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setChallengeAnswer('');
        showToast('Your message has been sent to Zubair and recorded in the inbox!');
      } else {
        setStatus('error');
        setErrorMessage(res.error || 'Failed to submit message.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network or server exception occurred. Please email directly.');
    }
  };

  return (
    <section id="contact" className="py-20 relative bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Initiate Direct Dialogue</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            Get In Touch
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl">
            Whether inquiring about software roles, technical collaborations, or engineering projects, drop a note below or reach out directly.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Coordinates & Details (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Direct Email Card */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">Email Address</div>
                  <a
                    href={`mailto:${hero.socials.email}`}
                    className="font-bold text-white hover:text-cyan-300 text-sm mt-0.5 block break-all"
                  >
                    {hero.socials.email}
                  </a>
                  <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">
                    Fast response within 24 hours
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleCopy(hero.socials.email, 'Email')}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Copy email address"
              >
                {copiedField === 'Email' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Phone Card */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-indigo-950 text-indigo-400 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">Telephone / WhatsApp</div>
                  <a
                    href={`tel:${hero.socials.phone}`}
                    className="font-bold text-white hover:text-cyan-300 text-sm mt-0.5 block font-mono"
                  >
                    {hero.socials.phone}
                  </a>
                  <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">
                    Available for professional calls
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleCopy(hero.socials.phone || '', 'Phone')}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Copy phone number"
              >
                {copiedField === 'Phone' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Location Card */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-950 text-emerald-400 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-mono">Location &amp; Timezone</div>
                <div className="font-bold text-white text-sm mt-0.5">{about.location}</div>
                <span className="text-[11px] text-slate-400 font-mono mt-0.5 block flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" /> Pakistan Standard Time (PKT, UTC+5)
                </span>
              </div>
            </div>

            {/* Quick Note Card */}
            <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-800/30 text-xs text-slate-300 leading-relaxed space-y-2">
              <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Admin Inbox Enabled</span>
              </div>
              <p>
                Messages sent via this form persist instantly into my private, authenticated Admin Inbox dashboard with full sender metadata.
              </p>
            </div>

          </div>

          {/* Right: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800">
              
              {status === 'success' ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-heading">
                    Message Dispatched Successfully!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. Your transmission has been logged to Zubair&apos;s admin inbox. You will receive a response shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === 'error' && (
                    <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800/60 text-rose-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="contact-name" className="text-xs font-semibold text-slate-300">
                        Your Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="e.g. Alex Henderson"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="contact-email" className="text-xs font-semibold text-slate-300">
                        Your Email <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="contact-subject" className="text-xs font-semibold text-slate-300">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder="Project Opportunity / Technical Collaboration"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="contact-message" className="text-xs font-semibold text-slate-300">
                      Message Content <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      placeholder="Describe your project, question, or role in detail..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-y"
                    />
                  </div>

                  {/* Anti-Spam Math Challenge */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Security Verification: Solve <strong>{mathQuestion.q} = ?</strong></span>
                    </div>

                    <input
                      type="text"
                      required
                      placeholder="Answer"
                      value={challengeAnswer}
                      onChange={(e) => setChallengeAnswer(e.target.value)}
                      className="w-24 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-center text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    style={{
                      background: 'var(--accent-gradient)',
                      color: 'var(--accent-text-contrast, #020617)',
                      boxShadow: '0 6px 20px var(--accent-glow)',
                    }}
                    className="w-full py-3 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] hover:brightness-110 disabled:opacity-50 cursor-pointer"
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
