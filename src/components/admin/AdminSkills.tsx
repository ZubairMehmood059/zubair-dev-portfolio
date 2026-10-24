import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SkillItem } from '../../types';
import { Plus, Trash2, Edit2, X, Code2 } from 'lucide-react';

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
      order: skills.length + 1,
    });
  };

  const handleSave = () => {
    if (!formData.name) {
      showToast('Skill name is required.', 'error');
      return;
    }

    if (isCreating) {
      addSkill(formData as SkillItem);
      showToast(`Added ${formData.name}!`);
      setIsCreating(false);
      setFormData({});
    } else if (editingSkill) {
      updateSkill(editingSkill.id, formData);
      showToast(`Updated ${formData.name}!`);
      setEditingSkill(null);
      setFormData({});
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete skill "${name}"?`)) {
      deleteSkill(id);
      showToast(`Deleted ${name}.`);
      if (editingSkill?.id === id) {
        setEditingSkill(null);
      }
    }
  };

  return (
    <div className="space-y-6 font-['Kanit',sans-serif] text-[#D7E2EA]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight hero-heading">
            Skills &amp; Technical Capabilities
          </h2>
          <p className="text-xs sm:text-sm text-[#BBCCD7]/70 font-light mt-1">
            Maintain technical competencies, categorization, and proficiency tiers.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#D7E2EA] hover:bg-white text-[#0C0C0C] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Inline Form */}
      {(editingSkill || isCreating) && (
        <div className="p-6 rounded-[28px] border border-white/20 space-y-4 bg-[#141414] shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-bold text-white text-sm uppercase tracking-wide flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#D7E2EA]" />
              <span>{isCreating ? 'Add New Skill Entry' : `Edit "${editingSkill?.name}"`}</span>
            </h3>
            <button
              onClick={() => {
                setEditingSkill(null);
                setIsCreating(false);
              }}
              className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                Skill Name
              </label>
              <input
                type="text"
                placeholder="e.g. Next.js, Docker"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
              />
            </div>

            <div>
              <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                Category
              </label>
              <select
                value={formData.category || 'Programming'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
              >
                <option value="Programming">Programming</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend / AI">Backend / AI</option>
                <option value="Tools">Tools</option>
              </select>
            </div>

            <div>
              <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                Proficiency Tier
              </label>
              <select
                value={formData.proficiencyTier || 'Proficient'}
                onChange={(e) => setFormData({ ...formData, proficiencyTier: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
              >
                <option value="Advanced">Advanced</option>
                <option value="Proficient">Proficient</option>
                <option value="Core">Core</option>
                <option value="Exploring">Exploring</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                Application Description
              </label>
              <input
                type="text"
                placeholder="Practical context or experience application..."
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
            <button
              onClick={() => {
                setEditingSkill(null);
                setIsCreating(false);
              }}
              className="px-4 py-2 rounded-full border border-white/20 text-[#D7E2EA] text-xs font-semibold hover:bg-white/10 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-full bg-[#D7E2EA] hover:bg-white text-[#0C0C0C] text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
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
            className="p-4 rounded-[20px] bg-[#121212] border border-white/10 flex items-center justify-between text-xs hover:border-white/20 transition-colors"
          >
            <div>
              <div className="font-bold text-white flex items-center gap-2">
                <span className="uppercase">{skill.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-[#D7E2EA] border border-white/10">
                  {skill.proficiencyTier}
                </span>
              </div>
              <div className="text-[11px] text-[#BBCCD7]/60 font-mono mt-0.5">
                {skill.category}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => handleEdit(skill)}
                className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Edit skill"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(skill.id, skill.name)}
                className="p-1.5 rounded-full text-white/40 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
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
