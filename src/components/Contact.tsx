import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Copy,
  Clock,
  Sparkles,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { FadeIn, ContactButton } from './common/MotionComponents';

export const Contact: React.FC = () => {
  const { hero, about, submitContactMessage, showToast } = usePortfolio();

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Honeypot anti-spam field & rate limiting
  const [honeypotWebsite, setHoneypotWebsite] = useState('');
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

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

    // Honeypot spam trap
    if (honeypotWebsite.trim().length > 0) {
      // Quietly reject bot
      setStatus('success');
      showToast('Your message has been processed.');
      return;
    }

    // Rate limiting: 20-second cooldown between submissions
    const now = Date.now();
    if (now - lastSubmitTime < 20000) {
      setErrorMessage('Please wait 20 seconds before sending another message.');
      setStatus('error');
      return;
    }

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

    // Anti-spam math check
    if (parseInt(challengeAnswer.trim(), 10) !== mathQuestion.ans) {
      setErrorMessage('Anti-spam security verification incorrect. Please try again.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setLastSubmitTime(now);

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
      setErrorMessage('Network exception occurred. Please email directly.');
    }
  };

  return (
    <section
      id="contact"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <FadeIn delay={0} y={40} duration={0.8}>
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-6 sm:mb-8"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Contact
          </h2>
          <p className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] mx-auto mb-16 sm:mb-20 text-sm sm:text-base md:text-lg">
            Have a project in mind, an engineering collaboration, or an opportunity to build together? Drop a line below or reach out directly.
          </p>
        </FadeIn>

        {/* Outer Signature Card Container */}
        <FadeIn delay={0.2} y={30} duration={0.8}>
          <div className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:p-10 md:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Direct Coordinates (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="border-b border-white/10 pb-4 mb-6">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#BBCCD7]/70">
                    Direct Coordinates
                  </span>
                  <h3 className="text-2xl font-bold uppercase text-white tracking-tight mt-1">
                    Let&apos;s Connect
                  </h3>
                </div>

                {/* Email Card */}
                <div className="p-5 rounded-[24px] bg-[#161616] border border-white/10 flex items-start justify-between gap-4 transition-all hover:border-white/30">
                  <div className="flex items-start gap-3.5">
                    <div className="p-3 rounded-2xl bg-white/5 text-[#D7E2EA] mt-0.5">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#BBCCD7]/70 uppercase font-mono tracking-wider">
                        Email Address
                      </div>
                      <a
                        href={`mailto:${hero.socials.email}`}
                        className="font-medium text-white hover:text-[#BBCCD7] text-sm sm:text-base mt-0.5 block break-all"
                      >
                        {hero.socials.email}
                      </a>
                      <span className="text-[11px] text-[#BBCCD7]/50 font-mono mt-0.5 block">
                        Fast response within 24 hours
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(hero.socials.email, 'Email')}
                    className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[#D7E2EA] transition-colors cursor-pointer"
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
                <div className="p-5 rounded-[24px] bg-[#161616] border border-white/10 flex items-start justify-between gap-4 transition-all hover:border-white/30">
                  <div className="flex items-start gap-3.5">
                    <div className="p-3 rounded-2xl bg-white/5 text-[#D7E2EA] mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#BBCCD7]/70 uppercase font-mono tracking-wider">
                        Telephone / WhatsApp
                      </div>
                      <a
                        href={`tel:${hero.socials.phone}`}
                        className="font-medium text-white hover:text-[#BBCCD7] text-sm sm:text-base mt-0.5 block font-mono"
                      >
                        {hero.socials.phone}
                      </a>
                      <span className="text-[11px] text-[#BBCCD7]/50 font-mono mt-0.5 block">
                        Available for calls &amp; inquiries
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(hero.socials.phone || '', 'Phone')}
                    className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[#D7E2EA] transition-colors cursor-pointer"
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
                <div className="p-5 rounded-[24px] bg-[#161616] border border-white/10 flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl bg-white/5 text-[#D7E2EA] mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#BBCCD7]/70 uppercase font-mono tracking-wider">
                      Location &amp; Timezone
                    </div>
                    <div className="font-medium text-white text-sm sm:text-base mt-0.5">
                      {about.location}
                    </div>
                    <span className="text-[11px] text-[#BBCCD7]/50 font-mono mt-0.5 block flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#BBCCD7]" /> Pakistan Standard Time (PKT, UTC+5)
                    </span>
                  </div>
                </div>

                {/* Verified Transmission Notice */}
                <div className="p-4 rounded-[20px] bg-white/[0.03] border border-white/10 text-xs text-[#BBCCD7]/80 leading-relaxed flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#D7E2EA] shrink-0" />
                  <span>Submissions are encrypted and dispatched directly to Zubair&apos;s verified inbox.</span>
                </div>
              </div>

              {/* Right Column: Transmission Form (7 cols) */}
              <div className="lg:col-span-7">
                {status === 'success' ? (
                  <div className="py-12 px-6 rounded-[32px] bg-[#161616] border border-white/10 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-white/10 border border-[#D7E2EA] text-[#D7E2EA] flex items-center justify-center mx-auto shadow-xl">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold uppercase text-white tracking-tight">
                      Message Dispatched!
                    </h3>
                    <p className="text-sm text-[#D7E2EA]/80 max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out. Your transmission has been safely logged. I will respond to your inquiry shortly.
                    </p>
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => setStatus('idle')}
                        className="inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Hidden Honeypot Anti-Bot Field */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="website-trap">Do not fill this field</label>
                      <input
                        id="website-trap"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypotWebsite}
                        onChange={(e) => setHoneypotWebsite(e.target.value)}
                      />
                    </div>
                    {status === 'error' && (
                      <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs sm:text-sm flex items-center gap-2.5">
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1.5 text-left">
                        <label htmlFor="contact-name" className="text-xs uppercase tracking-wider font-mono text-[#BBCCD7]">
                          Your Name <span className="text-rose-400">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          placeholder="e.g. Alex Henderson"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-5 py-3.5 rounded-2xl bg-[#161616] border border-white/10 text-sm text-[#D7E2EA] placeholder-white/30 focus:outline-none focus:border-[#D7E2EA] transition-all"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5 text-left">
                        <label htmlFor="contact-email" className="text-xs uppercase tracking-wider font-mono text-[#BBCCD7]">
                          Your Email <span className="text-rose-400">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          placeholder="alex@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-5 py-3.5 rounded-2xl bg-[#161616] border border-white/10 text-sm text-[#D7E2EA] placeholder-white/30 focus:outline-none focus:border-[#D7E2EA] transition-all"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="contact-subject" className="text-xs uppercase tracking-wider font-mono text-[#BBCCD7]">
                        Subject
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        placeholder="Project Inquiry / Technical Collaboration"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-5 py-3.5 rounded-2xl bg-[#161616] border border-white/10 text-sm text-[#D7E2EA] placeholder-white/30 focus:outline-none focus:border-[#D7E2EA] transition-all"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="contact-message" className="text-xs uppercase tracking-wider font-mono text-[#BBCCD7]">
                        Message Details <span className="text-rose-400">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={4}
                        placeholder="Describe your project, timeline, or inquiry..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-5 py-3.5 rounded-2xl bg-[#161616] border border-white/10 text-sm text-[#D7E2EA] placeholder-white/30 focus:outline-none focus:border-[#D7E2EA] transition-all resize-y"
                      />
                    </div>

                    {/* Anti-Spam Security Challenge */}
                    <div className="p-4 rounded-2xl bg-[#161616] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
                      <div className="flex items-center gap-2 text-[#BBCCD7]">
                        <ShieldCheck className="w-4 h-4 text-[#D7E2EA] shrink-0" />
                        <span>Security Challenge: Solve <strong>{mathQuestion.q} = ?</strong></span>
                      </div>

                      <input
                        type="text"
                        required
                        placeholder="Answer"
                        value={challengeAnswer}
                        onChange={(e) => setChallengeAnswer(e.target.value)}
                        className="w-24 px-4 py-2 rounded-xl bg-[#0C0C0C] border border-white/20 text-center text-sm font-mono text-white focus:outline-none focus:border-[#D7E2EA]"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full inline-flex items-center justify-center rounded-full px-8 py-4 text-sm sm:text-base font-medium uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.02] active:scale-98 outline outline-2 outline-white -outline-offset-[3px] select-none cursor-pointer disabled:opacity-50"
                        style={{
                          background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                          boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                        }}
                      >
                        {status === 'loading' ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Transmitting...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            <span>Dispatch Message</span>
                          </div>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
