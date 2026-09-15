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
    <section id="projects" className="py-20 relative bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Engineering Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
              Featured Projects &amp; Systems
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
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
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="glass-panel p-4 rounded-2xl mb-8 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Categories */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={
                    selectedCategory === cat
                      ? {
                          background: 'var(--accent-gradient)',
                          color: 'var(--accent-text-contrast, #020617)',
                          boxShadow: '0 2px 10px var(--accent-glow)',
                        }
                      : undefined
                  }
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'shadow-sm hover:brightness-110'
                      : 'bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
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
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  onlyFeatured
                    ? 'bg-amber-950/80 border-amber-600/60 text-amber-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
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
                  className="bg-slate-900 border border-slate-800 text-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-cyan-500"
                >
                  <option value="featured">Featured First</option>
                  <option value="newest">Newest First</option>
                  <option value="alphabetical">A to Z</option>
                </select>
              </div>
            </div>

          </div>

          {/* Technology filter pills */}
          <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Tech:
            </span>
            {allTechnologies.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                  selectedTech === tech
                    ? 'bg-slate-700 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => {
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="group relative rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300"
                >
                  <div>
                    {/* Project Image Banner */}
                    <div className="relative aspect-video overflow-hidden bg-slate-950">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-transparent opacity-90" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-950/80 backdrop-blur-md text-cyan-400 border border-cyan-800/40">
                          {project.category}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {project.isFeatured && (
                            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/90 text-amber-300 border border-amber-700/50 backdrop-blur-md">
                              <Star className="w-3 h-3 fill-amber-300" />
                              Featured
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-900/90 text-slate-300 border border-slate-700 backdrop-blur-md">
                            {project.status}
                          </span>
                        </div>
                      </div>

                      {/* Quick Case Study trigger hover button over image */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                        <button
                          onClick={() => handleOpenModal(project)}
                          className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/30 hover:scale-105 transition-transform"
                        >
                          <span>Explore Case Study</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                      <h3
                        onClick={() => handleOpenModal(project)}
                        className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer font-heading flex items-center gap-2"
                      >
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                      </h3>

                      <p className="text-sm text-slate-300 mt-2 leading-relaxed line-clamp-2">
                        {project.tagline}
                      </p>

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {project.technologies.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-950 text-slate-300 border border-slate-800"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="px-6 py-4 bg-slate-950/70 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => handleOpenModal(project)}
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                    >
                      <span>Read Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                          title="View source code"
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
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-medium transition-colors"
                          title="Open live preview"
                          aria-label={`${project.title} Live Demo`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live</span>
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
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold border transition-all hover:brightness-125"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
