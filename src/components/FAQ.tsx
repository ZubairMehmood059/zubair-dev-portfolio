import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HelpCircle,
  ChevronDown,
  Sparkles,
  Code2,
  Cpu,
  Clock,
  Layers,
  Search,
  MessageSquare,
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'Full-Stack' | 'AI & Architecture' | 'Availability & Work';
  question: string;
  answer: string;
  highlightTag?: string;
}

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      category: 'Full-Stack',
      question: 'What is your primary technology stack for web development?',
      answer:
        'My core full-stack stack centers on React, Next.js, and TypeScript on the frontend, paired with Python (Flask/FastAPI) and Node.js on the backend. For styling and motion, I leverage Tailwind CSS with Framer Motion. Databases include PostgreSQL, MongoDB, and Firebase Firestore depending on whether the project is relational or document-based.',
      highlightTag: 'React • Next.js • Python',
    },
    {
      id: 'faq-2',
      category: 'Availability & Work',
      question: 'Are you available for freelance, contract, or full-time roles?',
      answer:
        'Yes. I am currently open to high-impact software engineering roles, contract development, and technical collaboration. Having completed multiple end-to-end full-stack projects, I can contribute immediately to frontend interface design, backend API architecture, and prototype acceleration.',
      highlightTag: 'Open for Opportunities',
    },
    {
      id: 'faq-3',
      category: 'AI & Architecture',
      question: 'How do you integrate Artificial Intelligence and Machine Learning into products?',
      answer:
        'Rather than treating AI as a buzzword, I focus on pragmatic integration: combining modern web architectures with RESTful model APIs, data preprocessing pipelines, and intelligent interfaces. My current focus includes PyTorch fundamentals, generative AI SDKs, and building automated data-handling features directly into full-stack web applications.',
      highlightTag: 'Pragmatic AI Products',
    },
    {
      id: 'faq-4',
      category: 'Availability & Work',
      question: 'Can you work effectively across international time zones?',
      answer:
        'Yes. I am based in Karachi, Pakistan (UTC+5), which provides convenient overlap with European (CET/GMT), Middle Eastern (GST), and North American morning hours. I am accustomed to asynchronous development workflows, clean Git version control, transparent pull requests, and structured documentation.',
      highlightTag: 'UTC+5 • Remote Ready',
    },
    {
      id: 'faq-5',
      category: 'Full-Stack',
      question: 'What is your current academic timeline at SSUET?',
      answer:
        'I am actively enrolled in the 5th Semester of Bachelor of Science in Software Engineering at Sir Syed University of Engineering and Technology (SSUET) in Karachi. My academic focus directly aligns with my hands-on project work: algorithms, database systems, software design patterns, and distributed architectures.',
      highlightTag: 'SSUET • 5th Semester',
    },
    {
      id: 'faq-6',
      category: 'AI & Architecture',
      question: 'How do you ensure code quality, performance, and security?',
      answer:
        'I follow strict software engineering hygiene: strict TypeScript typing, modular component architecture, automated input validation with anti-spam protections, secure API routing, and performance optimization (lazy-loading, lightweight bundle splitting, and zero layout shift). Every project is built for production reliability rather than minimal prototypes.',
      highlightTag: 'Production Standards',
    },
  ];

  const categories = ['All', 'Full-Stack', 'AI & Architecture', 'Availability & Work'];

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [faqs, selectedCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="faq" className="py-24 relative bg-[#0b0d12]/90 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(79,140,255,0.06) 40%, transparent 70%)',
        }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[450px] rounded-full blur-3xl pointer-events-none -z-10"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111722] border border-blue-500/30 text-blue-400 text-xs font-mono">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-heading">
            Everything You Need To Know
          </h2>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Clear, transparent answers regarding my technical engineering stack, availability, AI integration approach, and academic background.
          </p>

          {/* Filter Bar & Search */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-2xl bg-[#111722] border border-slate-800">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#111722] border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-400 rounded-2xl bg-[#111722]/60 border border-slate-800">
              No matching questions found for &quot;{searchQuery}&quot;. Have a specific inquiry?
              <button
                onClick={scrollToContact}
                className="ml-2 text-blue-400 underline font-medium cursor-pointer"
              >
                Ask directly in the contact section
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className={`rounded-2xl transition-all border overflow-hidden ${
                    isOpen
                      ? 'bg-[#161D29]/90 border-blue-500/40 shadow-xl shadow-blue-500/5'
                      : 'bg-[#111722]/80 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full px-5 sm:px-6 py-4.5 flex items-center justify-between gap-4 text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-blue-400 shrink-0">
                        0{idx + 1}.
                      </span>
                      <span className="text-sm sm:text-base font-bold text-white font-heading">
                        {faq.question}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {faq.highlightTag && (
                        <span className="hidden md:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-blue-950/60 text-blue-300 border border-blue-800/40">
                          {faq.highlightTag}
                        </span>
                      )}
                      <div
                        className={`p-1.5 rounded-lg bg-slate-800/80 text-slate-300 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-blue-400 bg-blue-950' : ''
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Bottom CTA for Unanswered Questions */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-[#161D29] to-[#111722] border border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Have a project, role, or technical question?</h4>
              <p className="text-xs text-slate-400">Let’s discuss architectures, requirements, or timelines directly.</p>
            </div>
          </div>

          <button
            onClick={scrollToContact}
            style={{
              background: 'var(--accent-gradient)',
              boxShadow: '0 4px 16px var(--accent-glow)',
            }}
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-white hover:scale-105 transition-transform cursor-pointer shrink-0"
          >
            Start a Conversation
          </button>
        </div>

      </div>
    </section>
  );
};
