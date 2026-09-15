import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ExperienceItem, EducationItem, CertificationItem } from '../../types';
import { Briefcase, GraduationCap, Award, Plus, Trash2, Edit2, Check, X } from 'lucide-react';

export const AdminTimeline: React.FC = () => {
  const {
    experience,
    education,
    certifications,
    updateExperience,
    addExperience,
    deleteExperience,
    updateEducation,
    addEducation,
    deleteEducation,
    updateCertification,
    addCertification,
    deleteCertification,
    showToast,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'certs'>('experience');

  // Experience state
  const [editingExp, setEditingExp] = useState<ExperienceItem | null>(null);
  const [expForm, setExpForm] = useState<Partial<ExperienceItem>>({});

  const handleEditExp = (exp: ExperienceItem) => {
    setEditingExp(exp);
    setExpForm({ ...exp });
  };

  const handleSaveExp = () => {
    if (!expForm.role || !expForm.company) {
      showToast('Role and company are required.', 'error');
      return;
    }
    if (editingExp) {
      updateExperience(editingExp.id, expForm);
      showToast('Experience updated!');
      setEditingExp(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">Timeline &amp; Credentials Manager</h2>
          <p className="text-xs text-slate-400">
            Maintain documented work experience, academic milestones, and accredited certifications.
          </p>
        </div>

        {/* Sub tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'experience'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Experience
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'education'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Education
          </button>
          <button
            onClick={() => setActiveTab('certs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'certs'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Certifications
          </button>
        </div>
      </div>

      {/* Experience Sub-view */}
      {activeTab === 'experience' && (
        <div className="space-y-4">
          {editingExp && (
            <div className="glass-panel p-6 rounded-2xl border border-cyan-500/40 space-y-4 bg-slate-900/95">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="text-sm font-bold text-white">Edit Experience: {editingExp.role}</h3>
                <button onClick={() => setEditingExp(null)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Role Title</label>
                  <input
                    type="text"
                    value={expForm.role || ''}
                    onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Company / Client Type</label>
                  <input
                    type="text"
                    value={expForm.company || ''}
                    onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Period</label>
                  <input
                    type="text"
                    value={expForm.period || ''}
                    onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={expForm.location || ''}
                    onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-slate-400 font-semibold mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={expForm.description || ''}
                    onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-slate-400 font-semibold mb-1">
                    Responsibilities (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={expForm.responsibilities?.join('\n') || ''}
                    onChange={(e) =>
                      setExpForm({
                        ...expForm,
                        responsibilities: e.target.value.split('\n').filter(Boolean),
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => setEditingExp(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveExp}
                  className="px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs shadow-md"
                >
                  Save Experience
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {experience.map((exp) => (
              <div
                key={exp.id}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-white text-sm">{exp.role} – <span className="text-cyan-400">{exp.company}</span></div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">{exp.period} • {exp.location}</div>
                  <div className="text-xs text-slate-300 mt-2">{exp.responsibilities.length} responsibilities documented</div>
                </div>
                <button
                  onClick={() => handleEditExp(exp)}
                  className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-cyan-400"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Sub-view */}
      {activeTab === 'education' && (
        <div className="space-y-3">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-white text-sm">{edu.institution}</div>
                <div className="text-xs text-cyan-400 font-medium mt-0.5">{edu.degree}</div>
                <div className="text-xs text-slate-400 font-mono mt-1">{edu.period}</div>
                {edu.details && <p className="text-xs text-slate-400 mt-1">{edu.details}</p>}
              </div>
              <span className="text-xs px-2 py-1 rounded bg-slate-950 border border-slate-800 text-slate-400 font-mono">
                Verified
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Certifications Sub-view */}
      {activeTab === 'certs' && (
        <div className="space-y-3">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-white text-sm">{cert.title}</div>
                <div className="text-xs text-cyan-400 font-medium mt-0.5">Issuer: {cert.issuer}</div>
                <div className="text-xs text-slate-400 font-mono mt-1">Awarded: {cert.year}</div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/40 font-mono">
                Active Credential
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
