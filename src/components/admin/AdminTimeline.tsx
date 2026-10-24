import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ExperienceItem } from '../../types';
import { Edit2, X, Briefcase, GraduationCap, Award } from 'lucide-react';

export const AdminTimeline: React.FC = () => {
  const { experience, education, certifications, updateExperience, showToast } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'certs'>('experience');
  const [editingExp, setEditingExp] = useState<ExperienceItem | null>(null);
  const [expForm, setExpForm] = useState<Partial<ExperienceItem>>({});

  const handleEditExp = (exp: ExperienceItem) => {
    setEditingExp(exp);
    setExpForm({ ...exp });
  };

  const handleSaveExp = () => {
    if (editingExp) {
      updateExperience(editingExp.id, expForm);
      showToast('Experience record updated!');
      setEditingExp(null);
    }
  };

  return (
    <div className="space-y-6 font-['Kanit',sans-serif] text-[#D7E2EA]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight hero-heading">
            Timeline &amp; Credentials Manager
          </h2>
          <p className="text-xs sm:text-sm text-[#BBCCD7]/70 font-light mt-1">
            Maintain documented work experience, academic milestones, and accredited certifications.
          </p>
        </div>

        {/* Sub tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#121212] border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'experience'
                ? 'bg-[#D7E2EA] text-[#0C0C0C] font-bold shadow-sm'
                : 'text-[#BBCCD7]/70 hover:text-white'
            }`}
          >
            Experience
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'education'
                ? 'bg-[#D7E2EA] text-[#0C0C0C] font-bold shadow-sm'
                : 'text-[#BBCCD7]/70 hover:text-white'
            }`}
          >
            Education
          </button>
          <button
            onClick={() => setActiveTab('certs')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'certs'
                ? 'bg-[#D7E2EA] text-[#0C0C0C] font-bold shadow-sm'
                : 'text-[#BBCCD7]/70 hover:text-white'
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
            <div className="p-6 rounded-[28px] border border-white/20 space-y-4 bg-[#141414] shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#D7E2EA]" />
                  <span>Edit Experience: {editingExp.role}</span>
                </h3>
                <button
                  onClick={() => setEditingExp(null)}
                  className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Role Title
                  </label>
                  <input
                    type="text"
                    value={expForm.role || ''}
                    onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
                  />
                </div>
                <div>
                  <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={expForm.company || ''}
                    onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
                  />
                </div>
                <div>
                  <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Period
                  </label>
                  <input
                    type="text"
                    value={expForm.period || ''}
                    onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
                  />
                </div>
                <div>
                  <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Location
                  </label>
                  <input
                    type="text"
                    value={expForm.location || ''}
                    onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={expForm.description || ''}
                    onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
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
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  onClick={() => setEditingExp(null)}
                  className="px-4 py-2 rounded-full border border-white/20 text-[#D7E2EA] text-xs font-semibold hover:bg-white/10 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveExp}
                  className="px-5 py-2 rounded-full bg-[#D7E2EA] hover:bg-white text-[#0C0C0C] font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer"
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
                className="p-5 rounded-[24px] bg-[#121212] border border-white/10 flex items-center justify-between hover:border-white/20 transition-colors"
              >
                <div>
                  <div className="font-bold text-white text-sm uppercase">
                    {exp.role} – <span className="text-[#BBCCD7]">{exp.company}</span>
                  </div>
                  <div className="text-xs text-[#BBCCD7]/60 font-mono mt-1">
                    {exp.period} • {exp.location}
                  </div>
                  <div className="text-xs text-[#D7E2EA]/70 mt-2 font-light">
                    {exp.responsibilities.length} verified engineering achievements documented
                  </div>
                </div>
                <button
                  onClick={() => handleEditExp(exp)}
                  className="p-2 rounded-full bg-black/40 border border-white/10 text-white/60 hover:text-white hover:border-[#D7E2EA] transition-colors cursor-pointer"
                  title="Edit record"
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
              className="p-5 rounded-[24px] bg-[#121212] border border-white/10 flex items-center justify-between hover:border-white/20 transition-colors"
            >
              <div>
                <div className="font-bold text-white text-sm uppercase">{edu.institution}</div>
                <div className="text-xs text-[#BBCCD7] font-medium mt-0.5">{edu.degree}</div>
                <div className="text-xs text-[#BBCCD7]/60 font-mono mt-1">{edu.period}</div>
                {edu.details && <p className="text-xs text-[#D7E2EA]/70 mt-1.5 font-light">{edu.details}</p>}
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-black/50 border border-white/15 text-[#D7E2EA] font-mono">
                Academic Verified
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
              className="p-5 rounded-[24px] bg-[#121212] border border-white/10 flex items-center justify-between hover:border-white/20 transition-colors"
            >
              <div>
                <div className="font-bold text-white text-sm uppercase">{cert.title}</div>
                <div className="text-xs text-[#BBCCD7] font-medium mt-0.5">Issuer: {cert.issuer}</div>
                <div className="text-xs text-[#BBCCD7]/60 font-mono mt-1">Awarded: {cert.year}</div>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-950/70 text-emerald-400 border border-emerald-800/40 font-mono">
                Active Credential
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
