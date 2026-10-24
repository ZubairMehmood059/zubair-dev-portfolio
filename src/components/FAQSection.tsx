import React, { useState } from 'react';
import { FadeIn } from './common/MotionComponents';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Tech Stack' | 'Collaboration' | 'Delivery';
}

const faqData: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Tech Stack',
    question: 'What technologies and frameworks do you specialize in?',
    answer:
      'I specialize in modern TypeScript, React, Next.js, Python, Node.js, Express, Tailwind CSS, PostgreSQL / Firestore, and AI API integrations. I emphasize scalable architecture, type safety, and clean user interfaces.',
  },
  {
    id: 'faq-2',
    category: 'Collaboration',
    question: 'Are you open to full-time roles, contract work, or remote opportunities?',
    answer:
      'Yes! I am actively available for full-time Software Engineer and Full-Stack Developer roles, as well as select technical contract work for high-impact digital products.',
  },
  {
    id: 'faq-3',
    category: 'Delivery',
    question: 'How do you approach software architecture and code quality?',
    answer:
      'I follow a strict minimum necessary complexity rule: modular component design, strict TypeScript typing, WCAG accessibility, tablet & mobile responsiveness, zero dead code, and clean error state handling.',
  },
  {
    id: 'faq-4',
    category: 'Delivery',
    question: 'What is your typical project timeline for freelance or custom applications?',
    answer:
      'Turnaround times depend on scope: focused web applications take 1–2 weeks, whereas full-stack SaaS applications with administrative portals and API integrations take 3–5 weeks.',
  },
  {
    id: 'faq-5',
    category: 'General',
    question: 'How can we schedule a call or start a project together?',
    answer:
      'Fill out the contact form below or reach out directly at zainbromehmoodalam@gmail.com. I review all inquiries and respond within 24 hours.',
  },
];

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative z-10 bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-16 sm:py-20 md:py-24 border-t border-white/10"
    >
      <div className="max-w-4xl mx-auto space-y-10">
        <FadeIn delay={0} y={30} duration={0.8}>
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#BBCCD7]">
              <HelpCircle className="w-3.5 h-3.5 text-[#D7E2EA]" />
              <span>Got Questions?</span>
            </div>
            <h2 className="hero-heading font-black uppercase tracking-tight text-3xl sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-[#BBCCD7]/80 max-w-xl mx-auto font-light">
              Clear answers regarding engineering capabilities, technical stack, delivery workflows, and collaboration models.
            </p>
          </div>
        </FadeIn>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqData.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <FadeIn key={item.id} delay={0.1 * index} y={20} duration={0.6}>
                <div
                  className={`rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-[#141414] border-[#D7E2EA]/50 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
                      : 'bg-[#101010] border-white/10 hover:border-white/25'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(item.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7E2EA]"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#BBCCD7]/60">
                        {item.category}
                      </span>
                      <h3 className="font-bold text-white text-base sm:text-lg leading-snug">
                        {item.question}
                      </h3>
                    </div>
                    <div
                      className={`p-2 rounded-full border border-white/15 bg-black/40 text-[#D7E2EA] transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 bg-white/10 border-white/30' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 border-t border-white/5 text-xs sm:text-sm text-[#D7E2EA]/80 font-light leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Contact kicker */}
        <div className="text-center pt-4">
          <p className="text-xs sm:text-sm text-[#BBCCD7]/70 flex items-center justify-center gap-2">
            <span>Have a specific question not listed here?</span>
            <a
              href="#contact"
              className="text-white font-semibold underline underline-offset-4 hover:text-[#BBCCD7] inline-flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask Directly</span>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
