import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Code,
  Layout,
  Server,
  Wrench,
  Search,
  Sparkles,
  Info,
  CheckCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SkillItem } from '../types';

export const Skills: React.FC = () => {
  const { skills, isPreviewMode } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);

  const categories = ['All', 'Programming', 'Frontend', 'Backend / AI', 'Tools'];

  // Filter skills
  const filteredSkills = useMemo(() => {
    return skills.filter((s) => {
      if (!isPreviewMode && !s.isPublished) return false;
      const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [skills, selectedCategory, searchQuery, isPreviewMode]);

  const getTierBadge = (tier: SkillItem['proficiencyTier']) => {
    switch (tier) {
      case 'Advanced':
        return {
          label: 'Advanced',
          bg: 'bg-cyan-950/80 text-cyan-300 border-cyan-800/60',
          indicator: 'w-full bg-cyan-400',
        };
      case 'Proficient':
        return {
          label: 'Proficient',
          bg: 'bg-blue-950/80 text-blue-300 border-blue-800/60',
          indicator: 'w-3/4 bg-blue-400',
        };
      case 'Core':
        return {
          label: 'Core Foundation',
          bg: 'bg-slate-800 text-slate-300 border-slate-700',
          indicator: 'w-2/4 bg-slate-400',
        };
      case 'Exploring':
        return {
          label: 'Active Learning',
          bg: 'bg-indigo-950/80 text-indigo-300 border-indigo-800/60',
          indicator: 'w-1/3 bg-indigo-400',
        };
      default:
        return {
          label: 'Active',
          bg: 'bg-slate-800 text-slate-300 border-slate-700',
          indicator: 'w-1/2 bg-slate-400',
        };
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Programming':
        return <Code className="w-4 h-4 text-cyan-400" />;
      case 'Frontend':
        return <Layout className="w-4 h-4 text-blue-400" />;
      case 'Backend / AI':
        return <Server className="w-4 h-4 text-purple-400" />;
      case 'Tools':
        return <Wrench className="w-4 h-4 text-emerald-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Technical Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
              Skills &amp; Technologies
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Pragmatic tools and languages honed across academic coursework, personal engineering projects, and freelance client work.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-800 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {getCategoryIcon(cat)}
              <span>{cat}</span>
              <span className="text-[10px] font-mono opacity-80">
                ({cat === 'All' ? skills.length : skills.filter((s) => s.category === cat).length})
              </span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredSkills.map((skill) => {
              const tier = getTierBadge(skill.proficiencyTier);
              return (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="group relative glass-panel p-5 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-cyan-500/30 text-cyan-400 transition-colors">
                          {getCategoryIcon(skill.category)}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-100 text-sm group-hover:text-cyan-300 transition-colors">
                            {skill.name}
                          </h3>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {skill.category}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${tier.bg}`}
                      >
                        {tier.label}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>

                  {/* Skill level indicator bar (representing tier without fake percentages) */}
                  <div className="mt-4 pt-3 border-t border-slate-800/60">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1.5">
                      <span>Proficiency Level</span>
                      <span className="text-slate-400">{skill.proficiencyTier}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${tier.indicator}`} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty Search State */}
        {filteredSkills.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800">
            <Info className="w-8 h-8 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-300 font-semibold text-sm">No skills found matching &ldquo;{searchQuery}&rdquo;</p>
            <p className="text-xs text-slate-500 mt-1">Try clearing your search query or selecting &ldquo;All&rdquo; categories.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs hover:bg-cyan-500/30 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
