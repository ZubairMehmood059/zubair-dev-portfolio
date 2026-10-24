import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Search,
  ExternalLink,
  Github,
  Star,
  Layers,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Sparkles,
  SlidersHorizontal,
  Eye,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem } from '../types';

export const Projects: React.FC = () => {
  const { projects, setSelectedProject, recordProjectView, isPreviewMode } = usePortfolio();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [onlyFeatured, setOnlyFeatured] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'alphabetical'>('featured');

  // Extract unique technologies across projects
  const allTechnologies = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.technologies.forEach((t) => set.add(t)));
    return ['All', ...Array.from(set)];
  }, [projects]);

  const categories = ['All', 'Full-Stack', 'Frontend', 'Security & Systems', 'Utilities'];

  // Filter & Sort Projects
  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) => {
        if (!isPreviewMode && !p.isPublished) return false;
        if (onlyFeatured && !p.isFeatured) return false;
        if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
        if (selectedTech !== 'All' && !p.technologies.includes(selectedTech)) return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchDesc = p.tagline.toLowerCase().includes(q);
          const matchTech = p.technologies.some((t) => t.toLowerCase().includes(q));
          return matchTitle || matchDesc || matchTech;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return a.order - b.order;
        }
        if (sortBy === 'newest') {
          return b.order - a.order;
        }
        if (sortBy === 'alphabetical') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [projects, searchQuery, selectedCategory, selectedTech, onlyFeatured, sortBy, isPreviewMode]);

  const handleOpenModal = (project: ProjectItem) => {
    recordProjectView(project.slug);
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="py-24 relative bg-[#090c13]/80 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        style={{ background: 'radial-gradient(circle, rgba(79,140,255,0.12) 0%, rgba(11,13,18,0) 70%)' }}
        className="absolute bottom-0 right-1/4 w-[600px] h-[500px] rounded-full blur-3xl pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Engineering Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
              Featured Projects &amp; Systems
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
              Authentic software projects reflecting hands-on architecture, real-time metrics, cybersecurity concepts, and responsive client design.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, tech, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0e1420] border border-slate-700/80 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
            />
          </div>
        </motion.div>

        {/* Filter Controls Bar */}
        <div className="glass-panel p-4 sm:p-5 rounded-2xl mb-10 space-y-4 border border-slate-800/90 shadow-xl bg-[#0e1420]/70">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Categories */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={
                    selectedCategory === cat
                      ? {
                          background: 'var(--accent-gradient)',
                          color: 'var(--accent-text-contrast, #ffffff)',
                          boxShadow: '0 4px 14px var(--accent-glow)',
                        }
                      : undefined
                  }
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'shadow-sm hover:brightness-110 scale-[1.02]'
                      : 'bg-[#111722] text-slate-300 hover:text-white hover:bg-slate-800/90 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quick Toggles: Featured & Sort */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setOnlyFeatured((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                  onlyFeatured
                    ? 'bg-amber-950/80 border-amber-600/60 text-amber-300'
                    : 'bg-[#111722] border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${onlyFeatured ? 'fill-amber-400 text-amber-400' : ''}`} />
                <span>Featured Only</span>
              </button>

              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <span>Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#111722] border border-slate-800 text-slate-200 rounded-xl px-2.5 py-1 text-xs focus:outline-none focus:border-blue-500"
                >
                  <option value="featured">Featured First</option>
                  <option value="newest">Newest First</option>
                  <option value="alphabetical">A to Z</option>
                </select>
              </div>
            </div>

          </div>

          {/* Technology filter pills */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono text-slate-400 mr-1.5 flex items-center gap-1">
              <Filter className="w-3 h-3 text-blue-400" /> Stack:
            </span>
            {allTechnologies.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer ${
                  selectedTech === tech
                    ? 'bg-blue-600/30 text-blue-300 font-semibold border border-blue-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-transparent'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid with Staggered Visual Presentation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="group relative rounded-2xl bg-[#0e1420]/95 border border-slate-800 hover:border-blue-500/50 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden flex flex-col justify-between transition-all duration-300"
                >
                  <div>
                    {/* Project Image Banner */}
                    <div className="relative aspect-video overflow-hidden bg-[#07090e]">
                      <img
                        src={project.imageUrl}
                        alt={`${project.title} - ${project.category} Web Application Interface Preview`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e1420] via-transparent to-transparent opacity-95" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#0b0d12]/85 backdrop-blur-md text-blue-300 border border-blue-500/30">
                          {project.category}
                        </span>

                        <div className="flex items-center gap-2">
                          {project.isFeatured && (
                            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-950/90 text-amber-300 border border-amber-600/50 backdrop-blur-md">
                              <Star className="w-3 h-3 fill-amber-300" />
                              Featured
                            </span>
                          )}
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-slate-900/90 text-slate-300 border border-slate-700 backdrop-blur-md">
                            {project.status}
                          </span>
                        </div>
                      </div>

                      {/* Case Study trigger hover button over image */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-[2px]">
                        <button
                          onClick={() => handleOpenModal(project)}
                          className="px-5 py-2.5 rounded-xl bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-xl shadow-blue-500/40 hover:scale-105 transition-transform cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Inspect Architecture &amp; Case Study</span>
                        </button>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                      <h3
                        onClick={() => handleOpenModal(project)}
                        className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors cursor-pointer font-heading flex items-center gap-2"
                      >
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                      </h3>

                      <p className="text-sm text-slate-300 mt-2.5 leading-relaxed line-clamp-2">
                        {project.tagline}
                      </p>

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 mt-5">
                        {project.technologies.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-[#111722] text-slate-300 border border-slate-800"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="px-6 py-4 bg-[#0a0e17] border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => handleOpenModal(project)}
                      className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Read Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2.5">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="p-2.5 rounded-xl bg-[#111722] hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all hover:scale-105"
                          title="View source code on GitHub"
                          aria-label={`${project.title} GitHub repository`}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-500/40 text-xs font-semibold transition-all hover:scale-105"
                          title="Open live interactive demo"
                          aria-label={`${project.title} Live Demo`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty Search Result */}
        {filteredProjects.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800">
            <Layers className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-slate-200 font-bold text-base">No matching projects found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              We couldn't find any projects matching your current filter criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedTech('All');
                setOnlyFeatured(false);
              }}
              style={{
                backgroundColor: 'var(--accent-subtle)',
                color: 'var(--accent-primary)',
                borderColor: 'var(--accent-border)',
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold border transition-all hover:brightness-125 cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
