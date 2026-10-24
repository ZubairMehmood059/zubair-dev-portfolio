import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProjectItem } from '../../types';
import {
  Plus,
  Trash2,
  Edit2,
  Star,
  Eye,
  EyeOff,
  X,
  ExternalLink,
  Github,
  Layers,
  FileText,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface AdminProjectsProps {
  initialSubTab?: 'projects' | 'case-studies';
  onSelectTab?: (tab: any) => void;
}

export const AdminProjects: React.FC<AdminProjectsProps> = ({ initialSubTab = 'projects' }) => {
  const { projects, updateProject, addProject, deleteProject, showToast } = usePortfolio();

  const [activeSubTab, setActiveSubTab] = useState<'projects' | 'case-studies'>(initialSubTab);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditingCaseStudyOnly, setIsEditingCaseStudyOnly] = useState(false);

  // Sync when initialSubTab changes from admin navigation
  useEffect(() => {
    setActiveSubTab(initialSubTab);
  }, [initialSubTab]);

  // Form state
  const [formData, setFormData] = useState<Partial<ProjectItem>>({});

  const handleEdit = (project: ProjectItem, caseStudyOnly = false) => {
    setIsCreating(false);
    setIsEditingCaseStudyOnly(caseStudyOnly);
    setEditingProject(project);
    setFormData({ ...project });
  };

  const handleCreateNew = () => {
    setIsCreating(true);
    setIsEditingCaseStudyOnly(false);
    setEditingProject(null);
    setFormData({
      id: `proj-${Date.now()}`,
      slug: 'new-project',
      title: 'New Engineering Project',
      category: 'Full-Stack',
      tagline: 'Engineering description of the application.',
      imageUrl: '/assets/images/netflix_clone_preview_1789409715949.jpg',
      technologies: ['React', 'Python', 'Tailwind CSS'],
      githubUrl: 'https://github.com/ZubairMehmood059',
      liveUrl: '',
      isFeatured: false,
      isPublished: true,
      order: projects.length + 1,
      status: 'In Progress',
      caseStudy: {
        overview: 'Comprehensive system architecture overview.',
        problem: 'Identified problem definition and engineering requirements.',
        approach: 'Architectural methodology, patterns, and framework selections.',
        keyFeatures: ['High-throughput data synchronization', 'Secure authentication flow'],
        outcomes: ['Sub-100ms response latency benchmark'],
      },
    });
  };

  const handleSave = () => {
    if (!formData.title || !formData.slug) {
      showToast('Project title and slug are required.', 'error');
      return;
    }

    if (isCreating) {
      addProject(formData as ProjectItem);
      showToast('Project created successfully!');
      setIsCreating(false);
      setFormData({});
    } else if (editingProject) {
      updateProject(editingProject.id, formData);
      showToast(isEditingCaseStudyOnly ? 'Case study updated successfully!' : 'Project updated successfully!');
      setEditingProject(null);
      setIsEditingCaseStudyOnly(false);
      setFormData({});
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove "${title}"?`)) {
      deleteProject(id);
      showToast(`Removed "${title}".`);
      if (editingProject?.id === id) {
        setEditingProject(null);
      }
    }
  };

  return (
    <div className="space-y-6 font-['Kanit',sans-serif] text-[#D7E2EA]">
      {/* Top Header & Sub-Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight hero-heading">
            {activeSubTab === 'projects' ? 'Project Portfolio Directory' : 'Engineering Case Studies'}
          </h2>
          <p className="text-xs sm:text-sm text-[#BBCCD7]/70 font-light mt-1">
            {activeSubTab === 'projects'
              ? 'Manage public showcase projects, live deployment links, and spotlight status.'
              : 'Detailed architectural write-ups, problem statements, tech approaches, and performance metrics.'}
          </p>
        </div>

        {/* Tab switch pills */}
        <div className="flex items-center gap-2 p-1 rounded-full bg-[#141414] border border-white/10 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => {
              setActiveSubTab('projects');
              setEditingProject(null);
              setIsCreating(false);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              activeSubTab === 'projects'
                ? 'bg-[#D7E2EA] text-[#0C0C0C] font-bold shadow-sm'
                : 'text-[#D7E2EA]/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Projects ({projects.length})</span>
          </button>
          <button
            onClick={() => {
              setActiveSubTab('case-studies');
              setEditingProject(null);
              setIsCreating(false);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              activeSubTab === 'case-studies'
                ? 'bg-[#D7E2EA] text-[#0C0C0C] font-bold shadow-sm'
                : 'text-[#D7E2EA]/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Case Studies</span>
          </button>
        </div>
      </div>

      {/* Action button row */}
      {activeSubTab === 'projects' && !editingProject && !isCreating && (
        <div className="flex justify-end">
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#D7E2EA] hover:bg-white text-[#0C0C0C] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </button>
        </div>
      )}

      {/* Editor Modal / Inline Form */}
      {(editingProject || isCreating) && (
        <div className="p-6 rounded-[32px] border border-white/20 space-y-4 bg-[#141414] shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-bold text-white text-sm uppercase tracking-wide flex items-center gap-2">
              {isEditingCaseStudyOnly ? (
                <FileText className="w-4 h-4 text-[#D7E2EA]" />
              ) : (
                <Layers className="w-4 h-4 text-[#D7E2EA]" />
              )}
              <span>
                {isCreating
                  ? 'Create New Project Record'
                  : isEditingCaseStudyOnly
                  ? `Edit Case Study: "${editingProject?.title}"`
                  : `Edit Project: "${editingProject?.title}"`}
              </span>
            </h3>
            <button
              onClick={() => {
                setEditingProject(null);
                setIsCreating(false);
                setIsEditingCaseStudyOnly(false);
              }}
              className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* If NOT editing case study only, show main project fields */}
          {!isEditingCaseStudyOnly && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Project Title
                </label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
                />
              </div>

              <div>
                <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={formData.slug || ''}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA] font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Tagline / Summary
                </label>
                <input
                  type="text"
                  value={formData.tagline || ''}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
                />
              </div>

              <div>
                <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Category
                </label>
                <select
                  value={formData.category || 'Full-Stack'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
                >
                  <option value="Full-Stack">Full-Stack</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Security & Systems">Security &amp; Systems</option>
                  <option value="Utilities">Utilities</option>
                </select>
              </div>

              <div>
                <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Status
                </label>
                <select
                  value={formData.status || 'Active'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
                >
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                </select>
              </div>

              <div>
                <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  GitHub Repository URL
                </label>
                <input
                  type="text"
                  value={formData.githubUrl || ''}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA] font-mono"
                />
              </div>

              <div>
                <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Live Deployment URL
                </label>
                <input
                  type="text"
                  value={formData.liveUrl || ''}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA] font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Tech Stack (Comma-separated)
                </label>
                <input
                  type="text"
                  value={Array.isArray(formData.technologies) ? formData.technologies.join(', ') : ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA] font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Project Image URL
                </label>
                <input
                  type="text"
                  value={formData.imageUrl || ''}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA] font-mono"
                />
              </div>
            </div>
          )}

          {/* Case Study Details Section */}
          <div className="pt-2 border-t border-white/10 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white uppercase tracking-wider text-xs font-mono flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#D7E2EA]" />
                <span>In-Depth Case Study Documentation</span>
              </h4>
              <span className="text-[10px] text-[#BBCCD7]/60 font-mono">
                Used in public modal &amp; case study views
              </span>
            </div>

            <div>
              <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                Case Study: Overview
              </label>
              <textarea
                rows={2}
                value={formData.caseStudy?.overview || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    caseStudy: { ...(formData.caseStudy as any), overview: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
              />
            </div>

            <div>
              <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                Case Study: Problem Addressed
              </label>
              <textarea
                rows={2}
                value={formData.caseStudy?.problem || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    caseStudy: { ...(formData.caseStudy as any), problem: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
              />
            </div>

            <div>
              <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                Case Study: Engineering Architecture &amp; Approach
              </label>
              <textarea
                rows={3}
                value={formData.caseStudy?.approach || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    caseStudy: { ...(formData.caseStudy as any), approach: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Key Features (One per line)
                </label>
                <textarea
                  rows={3}
                  value={
                    Array.isArray(formData.caseStudy?.keyFeatures)
                      ? formData.caseStudy.keyFeatures.join('\n')
                      : ''
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      caseStudy: {
                        ...(formData.caseStudy as any),
                        keyFeatures: e.target.value.split('\n').filter(Boolean),
                      },
                    })
                  }
                  placeholder="Feature 1&#10;Feature 2"
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA] font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Measurable Outcomes / Metrics (One per line)
                </label>
                <textarea
                  rows={3}
                  value={
                    Array.isArray(formData.caseStudy?.outcomes)
                      ? formData.caseStudy.outcomes.join('\n')
                      : ''
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      caseStudy: {
                        ...(formData.caseStudy as any),
                        outcomes: e.target.value.split('\n').filter(Boolean),
                      },
                    })
                  }
                  placeholder="99.9% uptime&#10;50% faster latency"
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA] font-mono text-[11px]"
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured || false}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="rounded border-white/20 bg-black text-[#D7E2EA] focus:ring-[#D7E2EA]"
                />
                <span className="text-[#D7E2EA] text-xs uppercase tracking-wide">Featured Spotlight</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPublished ?? true}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="rounded border-white/20 bg-black text-[#D7E2EA] focus:ring-[#D7E2EA]"
                />
                <span className="text-[#D7E2EA] text-xs uppercase tracking-wide">Published to Public Site</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
            <button
              onClick={() => {
                setEditingProject(null);
                setIsCreating(false);
                setIsEditingCaseStudyOnly(false);
              }}
              className="px-4 py-2 rounded-full border border-white/20 text-[#D7E2EA] text-xs font-semibold hover:bg-white/10 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-full bg-[#D7E2EA] hover:bg-white text-[#0C0C0C] text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
            >
              {isEditingCaseStudyOnly ? 'Save Case Study' : 'Save Project Record'}
            </button>
          </div>
        </div>
      )}

      {/* VIEW 1: Projects Directory */}
      {activeSubTab === 'projects' && (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-4 rounded-[24px] bg-[#121212] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-4">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-16 h-12 object-cover rounded-xl bg-black border border-white/10 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm uppercase">{project.title}</span>
                    {project.isFeatured && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/70 text-amber-300 border border-amber-800 flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-amber-400" />
                        Featured
                      </span>
                    )}
                    {!project.isPublished && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white/50">
                        Draft
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#BBCCD7]/70 mt-0.5 flex flex-wrap items-center gap-2">
                    <span>{project.category}</span>
                    <span>•</span>
                    <span className="font-mono text-[11px] text-[#BBCCD7]">
                      {project.technologies.slice(0, 3).join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  onClick={() => updateProject(project.id, { isFeatured: !project.isFeatured })}
                  className={`p-2 rounded-full border transition-colors cursor-pointer ${
                    project.isFeatured
                      ? 'bg-amber-950/60 border-amber-600/40 text-amber-300'
                      : 'bg-black/40 border-white/10 text-white/40 hover:text-white'
                  }`}
                  title="Toggle featured state"
                >
                  <Star className={`w-3.5 h-3.5 ${project.isFeatured ? 'fill-amber-300' : ''}`} />
                </button>

                <button
                  onClick={() => updateProject(project.id, { isPublished: !project.isPublished })}
                  className={`p-2 rounded-full border transition-colors cursor-pointer ${
                    project.isPublished
                      ? 'bg-emerald-950/60 border-emerald-600/40 text-emerald-300'
                      : 'bg-black/40 border-white/10 text-white/40'
                  }`}
                  title="Toggle publish status"
                >
                  {project.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 rounded-full bg-black/40 border border-white/10 text-white/70 hover:text-white hover:border-[#D7E2EA] transition-colors cursor-pointer"
                  title="Edit full project details"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleDelete(project.id, project.title)}
                  className="p-2 rounded-full bg-black/40 border border-white/10 text-white/40 hover:text-rose-400 hover:border-rose-500/40 transition-colors cursor-pointer"
                  title="Delete project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 2: Case Studies Directory */}
      {activeSubTab === 'case-studies' && (
        <div className="space-y-4">
          {projects.map((project) => {
            const cs = project.caseStudy;
            return (
              <div
                key={project.id}
                className="p-5 sm:p-6 rounded-[28px] bg-[#121212] border border-white/10 hover:border-white/20 transition-all space-y-4"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-12 h-10 object-cover rounded-lg bg-black border border-white/10 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white text-base uppercase">{project.title}</h3>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#BBCCD7]">
                          {project.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#BBCCD7]/70 font-light">{project.tagline}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleEdit(project, true)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D7E2EA] hover:bg-white text-[#0C0C0C] text-xs font-bold uppercase tracking-wider transition-all self-start sm:self-auto cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit Case Study</span>
                  </button>
                </div>

                {/* Case Study Grid Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Overview & Problem */}
                  <div className="space-y-3 md:col-span-1">
                    <div>
                      <span className="font-mono text-[10px] uppercase text-[#BBCCD7]/60 block mb-1">
                        Architecture Overview
                      </span>
                      <p className="text-white/80 line-clamp-3 leading-relaxed">
                        {cs?.overview || 'No overview documented yet.'}
                      </p>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] uppercase text-[#BBCCD7]/60 block mb-1">
                        Problem Statement
                      </span>
                      <p className="text-white/80 line-clamp-3 leading-relaxed">
                        {cs?.problem || 'No problem statement documented yet.'}
                      </p>
                    </div>
                  </div>

                  {/* Approach & Features */}
                  <div className="space-y-3 md:col-span-1">
                    <div>
                      <span className="font-mono text-[10px] uppercase text-[#BBCCD7]/60 block mb-1">
                        Technical Approach
                      </span>
                      <p className="text-white/80 line-clamp-3 leading-relaxed">
                        {cs?.approach || 'No engineering approach documented yet.'}
                      </p>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] uppercase text-[#BBCCD7]/60 block mb-1">
                        Key Features
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {cs?.keyFeatures && cs.keyFeatures.length > 0 ? (
                          cs.keyFeatures.map((kf, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-[#D7E2EA] border border-white/10"
                            >
                              {kf}
                            </span>
                          ))
                        ) : (
                          <span className="text-white/40 italic">None specified</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Outcomes & Metrics */}
                  <div className="space-y-3 md:col-span-1">
                    <div>
                      <span className="font-mono text-[10px] uppercase text-[#BBCCD7]/60 block mb-1">
                        Measurable Outcomes &amp; Benchmarks
                      </span>
                      <div className="space-y-1">
                        {cs?.outcomes && cs.outcomes.length > 0 ? (
                          cs.outcomes.map((outcome, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-emerald-300">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                              <span className="text-[11px] font-mono">{outcome}</span>
                            </div>
                          ))
                        ) : (
                          <span className="text-white/40 italic">None specified</span>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-[11px] font-mono text-[#D7E2EA]/70 hover:text-white"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-[11px] font-mono text-[#D7E2EA]/70 hover:text-white"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live App</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
