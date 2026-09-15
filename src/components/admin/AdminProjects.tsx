import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProjectItem } from '../../types';
import {
  Plus,
  Trash2,
  Edit2,
  Star,
  Eye,
  EyeOff,
  Check,
  X,
  ExternalLink,
  Github,
  Layers,
} from 'lucide-react';

export const AdminProjects: React.FC = () => {
  const { projects, updateProject, addProject, deleteProject, showToast } = usePortfolio();

  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Partial<ProjectItem>>({});

  const handleEdit = (project: ProjectItem) => {
    setIsCreating(false);
    setEditingProject(project);
    setFormData({ ...project });
  };

  const handleCreateNew = () => {
    setIsCreating(true);
    setEditingProject(null);
    setFormData({
      id: `proj-${Date.now()}`,
      slug: 'new-project',
      title: 'New Engineering Project',
      category: 'Full-Stack',
      tagline: 'Engineering description of the application.',
      imageUrl: '/images/netflix_preview.jpg',
      technologies: ['React', 'Python', 'Tailwind CSS'],
      githubUrl: 'https://github.com/ZubairMehmood059',
      liveUrl: '',
      isFeatured: false,
      isPublished: true,
      order: projects.length + 1,
      status: 'In Progress',
      caseStudy: {
        overview: 'Comprehensive system overview.',
        problem: 'Identified problem definition.',
        approach: 'Architectural methodology.',
        keyFeatures: ['Feature 1', 'Feature 2'],
        outcomes: ['Performance benchmark'],
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
      showToast('Project updated successfully!');
      setEditingProject(null);
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">Project Portfolio Manager</h2>
          <p className="text-xs text-slate-400">
            Publish, modify case studies, change tech stacks, and toggle featured spotlight projects.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Editor Modal / Inline Form */}
      {(editingProject || isCreating) && (
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/40 space-y-4 bg-slate-900/95">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>{isCreating ? 'Create New Project Record' : `Edit "${editingProject?.title}"`}</span>
            </h3>
            <button
              onClick={() => {
                setEditingProject(null);
                setIsCreating(false);
              }}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Project Title</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">URL Slug</label>
              <input
                type="text"
                value={formData.slug || ''}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Category</label>
              <select
                value={formData.category || 'Full-Stack'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Full-Stack">Full-Stack</option>
                <option value="Frontend">Frontend</option>
                <option value="Security & Systems">Security & Systems</option>
                <option value="Utilities">Utilities</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Status</label>
              <input
                type="text"
                value={formData.status || 'Completed'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-400 font-semibold mb-1">Tagline / Short Summary</label>
              <input
                type="text"
                value={formData.tagline || ''}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-400 font-semibold mb-1">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                value={formData.technologies?.join(', ') || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                  })
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">GitHub URL</label>
              <input
                type="text"
                value={formData.githubUrl || ''}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Live Demo URL</label>
              <input
                type="text"
                value={formData.liveUrl || ''}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-400 font-semibold mb-1">Project Image URL</label>
              <input
                type="text"
                value={formData.imageUrl || ''}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            {/* Case Study Details */}
            <div className="sm:col-span-2 pt-2 border-t border-slate-800 space-y-3">
              <h4 className="font-bold text-cyan-400">Case Study Documentation</h4>
              
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Case Study: Overview</label>
                <textarea
                  rows={2}
                  value={formData.caseStudy?.overview || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      caseStudy: { ...(formData.caseStudy as any), overview: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Case Study: Problem Addressed</label>
                <textarea
                  rows={2}
                  value={formData.caseStudy?.problem || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      caseStudy: { ...(formData.caseStudy as any), problem: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Case Study: Engineering Approach</label>
                <textarea
                  rows={2}
                  value={formData.caseStudy?.approach || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      caseStudy: { ...(formData.caseStudy as any), approach: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="sm:col-span-2 flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured || false}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500"
                />
                <span className="text-slate-200">Featured Spotlight</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPublished ?? true}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500"
                />
                <span className="text-slate-200">Published to Public Site</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                setEditingProject(null);
                setIsCreating(false);
              }}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20"
            >
              Save Project Record
            </button>
          </div>
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center gap-4">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-16 h-12 object-cover rounded-lg bg-slate-950 border border-slate-800 shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{project.title}</span>
                  {project.isFeatured && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800 flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-amber-400" />
                      Featured
                    </span>
                  )}
                  {!project.isPublished && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-800 text-slate-400">
                      Draft
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-400 mt-0.5 flex flex-wrap items-center gap-2">
                  <span>{project.category}</span>
                  <span>•</span>
                  <span className="font-mono text-[11px] text-cyan-400">{project.technologies.slice(0, 3).join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                onClick={() => updateProject(project.id, { isFeatured: !project.isFeatured })}
                className={`p-2 rounded-lg border transition-colors ${
                  project.isFeatured
                    ? 'bg-amber-950/60 border-amber-600/40 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
                title="Toggle featured state"
              >
                <Star className={`w-3.5 h-3.5 ${project.isFeatured ? 'fill-amber-300' : ''}`} />
              </button>

              <button
                onClick={() => updateProject(project.id, { isPublished: !project.isPublished })}
                className={`p-2 rounded-lg border transition-colors ${
                  project.isPublished
                    ? 'bg-emerald-950/60 border-emerald-600/40 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
                title="Toggle publish status"
              >
                {project.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => handleEdit(project)}
                className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                title="Edit project details"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleDelete(project.id, project.title)}
                className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-500 hover:text-rose-400 hover:border-rose-500/40 transition-colors"
                title="Delete project"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
