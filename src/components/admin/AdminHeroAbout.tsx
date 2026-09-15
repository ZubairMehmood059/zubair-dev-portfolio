import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, RefreshCw, User, BookOpen, Compass, Link2 } from 'lucide-react';

export const AdminHeroAbout: React.FC = () => {
  const { hero, about, updateHero, updateAbout, showToast } = usePortfolio();

  const [heroForm, setHeroForm] = useState({ ...hero });
  const [aboutForm, setAboutForm] = useState({
    ...about,
    bioString: Array.isArray(about.biography) ? about.biography.join('\n\n') : (about.biography || ''),
    philosophyValues: Array.isArray(about.engineeringPhilosophy?.coreValues)
      ? about.engineeringPhilosophy.coreValues.join(', ')
      : (about.engineeringPhilosophy?.coreValues || ''),
  });

  const handleSaveAll = () => {
    updateHero(heroForm);
    updateAbout({
      ...aboutForm,
      biography: aboutForm.bioString.split('\n\n').filter(Boolean),
      engineeringPhilosophy: {
        ...aboutForm.engineeringPhilosophy,
        coreValues: aboutForm.philosophyValues.split(',').map((v) => v.trim()).filter(Boolean),
      },
    });
    showToast('Hero & About content updated successfully!');
  };

  return (
    <div className="space-y-8">
      {/* Top action header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">Hero &amp; Profile Editor</h2>
          <p className="text-xs text-slate-400">
            Customize typography, headline copy, professional titles, social handles, and personal narrative.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Save Profile Changes</span>
        </button>
      </div>

      {/* Hero Section Form */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
          <User className="w-4 h-4 text-cyan-400" />
          <span>Hero Identification &amp; Positioning</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Full Name</label>
            <input
              type="text"
              value={heroForm.name}
              onChange={(e) => setHeroForm({ ...heroForm, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Availability Status</label>
            <input
              type="text"
              value={heroForm.availabilityStatus}
              onChange={(e) => setHeroForm({ ...heroForm, availabilityStatus: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-slate-400 font-semibold mb-1">Professional Title Line</label>
            <input
              type="text"
              value={heroForm.title}
              onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-slate-400 font-semibold mb-1">Headline Statement</label>
            <input
              type="text"
              value={heroForm.headline}
              onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-slate-400 font-semibold mb-1">Supporting Bio Paragraph</label>
            <textarea
              rows={3}
              value={heroForm.supportingBio}
              onChange={(e) => setHeroForm({ ...heroForm, supportingBio: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-slate-400 font-semibold mb-1">Portrait Avatar Image URL</label>
            <input
              type="text"
              value={heroForm.avatarUrl}
              onChange={(e) => setHeroForm({ ...heroForm, avatarUrl: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>
        </div>

        {/* Social Handles */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-300 font-mono flex items-center gap-1.5">
            <Link2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Contact &amp; Social Links</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Email Address</label>
              <input
                type="email"
                value={heroForm.socials.email}
                onChange={(e) =>
                  setHeroForm({
                    ...heroForm,
                    socials: { ...heroForm.socials, email: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Phone Number</label>
              <input
                type="text"
                value={heroForm.socials.phone || ''}
                onChange={(e) =>
                  setHeroForm({
                    ...heroForm,
                    socials: { ...heroForm.socials, phone: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">GitHub Profile URL</label>
              <input
                type="text"
                value={heroForm.socials.github}
                onChange={(e) =>
                  setHeroForm({
                    ...heroForm,
                    socials: { ...heroForm.socials, github: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">LinkedIn Profile URL</label>
              <input
                type="text"
                value={heroForm.socials.linkedin}
                onChange={(e) =>
                  setHeroForm({
                    ...heroForm,
                    socials: { ...heroForm.socials, linkedin: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* About Section Form */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>About &amp; Biography Narrative</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Location</label>
            <input
              type="text"
              value={aboutForm.location}
              onChange={(e) => setAboutForm({ ...aboutForm, location: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Experience Span</label>
            <input
              type="text"
              value={aboutForm.experienceYears}
              onChange={(e) => setAboutForm({ ...aboutForm, experienceYears: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-slate-400 font-semibold mb-1">
              Biography Paragraphs (Separate paragraphs with double Enter)
            </label>
            <textarea
              rows={6}
              value={aboutForm.bioString}
              onChange={(e) => setAboutForm({ ...aboutForm, bioString: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 leading-relaxed"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-slate-400 font-semibold mb-1">
              Engineering Philosophy Summary
            </label>
            <textarea
              rows={2}
              value={aboutForm.engineeringPhilosophy.description}
              onChange={(e) =>
                setAboutForm({
                  ...aboutForm,
                  engineeringPhilosophy: {
                    ...aboutForm.engineeringPhilosophy,
                    description: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-slate-400 font-semibold mb-1">
              Philosophy Core Values (comma-separated)
            </label>
            <input
              type="text"
              value={aboutForm.philosophyValues}
              onChange={(e) => setAboutForm({ ...aboutForm, philosophyValues: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-3">
          <button
            onClick={handleSaveAll}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20"
          >
            Save All Hero &amp; About Changes
          </button>
        </div>
      </div>
    </div>
  );
};
