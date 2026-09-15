import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SkillItem } from '../../types';
import { Plus, Trash2, Edit2, Check, X, Code2 } from 'lucide-react';

export const AdminSkills: React.FC = () => {
  const { skills, addSkill, updateSkill, deleteSkill, showToast } = usePortfolio();

  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<SkillItem>>({});

  const handleEdit = (skill: SkillItem) => {
    setIsCreating(false);
    setEditingSkill(skill);
    setFormData({ ...skill });
  };

  const handleCreateNew = () => {
    setIsCreating(true);
    setEditingSkill(null);
    setFormData({
      id: `skill-${Date.now()}`,
      name: '',
      category: 'Programming',
      proficiencyTier: 'Proficient',
      description: '',
      isPublished: true,
      order: skills.length + 1,
    });
  };

  const handleSave = () => {
    if (!formData.name || !formData.description) {
      showToast('Skill name and description are required.', 'error');
      return;
    }

    if (isCreating) {
      addSkill(formData as SkillItem);
      showToast('Skill added successfully!');
      setIsCreating(false);
      setFormData({});
    } else if (editingSkill) {
      updateSkill(editingSkill.id, formData);
      showToast('Skill updated!');
      setEditingSkill(null);
      setFormData({});
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete skill "${name}"?`)) {
      deleteSkill(id);
      showToast(`Deleted "${name}".`);
      if (editingSkill?.id === id) setEditingSkill(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">Skills &amp; Ecosystem Manager</h2>
          <p className="text-xs text-slate-400">
            Maintain technical competencies, categorization, and documented proficiency tiers.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Inline Form */}
      {(editingSkill || isCreating) && (
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/40 space-y-4 bg-slate-900/95">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-sm">
              {isCreating ? 'Add New Skill Entry' : `Edit "${editingSkill?.name}"`}
            </h3>
            <button
              onClick={() => {
                setEditingSkill(null);
                setIsCreating(false);
              }}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Skill Name</label>
              <input
                type="text"
                placeholder="e.g. Next.js, Docker"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Category</label>
              <select
                value={formData.category || 'Programming'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Programming">Programming</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend / AI">Backend / AI</option>
                <option value="Tools">Tools</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Proficiency Tier</label>
              <select
                value={formData.proficiencyTier || 'Proficient'}
                onChange={(e) => setFormData({ ...formData, proficiencyTier: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Advanced">Advanced</option>
                <option value="Proficient">Proficient</option>
                <option value="Core">Core</option>
                <option value="Exploring">Exploring</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-slate-400 font-semibold mb-1">Application Description</label>
              <input
                type="text"
                placeholder="Practical context or experience application..."
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                setEditingSkill(null);
                setIsCreating(false);
              }}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md"
            >
              Save Skill
            </button>
          </div>
        </div>
      )}

      {/* Grid of existing skills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs hover:border-slate-700"
          >
            <div>
              <div className="font-bold text-white flex items-center gap-2">
                <span>{skill.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                  {skill.proficiencyTier}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                {skill.category}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => handleEdit(skill)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800"
                title="Edit skill"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(skill.id, skill.name)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800"
                title="Delete skill"
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
