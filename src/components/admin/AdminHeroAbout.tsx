import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, User, BookOpen, Link2 } from 'lucide-react';

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
    <div className="space-y-8 font-['Kanit',sans-serif] text-[#D7E2EA]">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight hero-heading">
            Hero &amp; Profile Editor
          </h2>
          <p className="text-xs sm:text-sm text-[#BBCCD7]/70 font-light mt-1">
            Customize typography, headline copy, professional titles, social handles, and personal narrative.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#D7E2EA] hover:bg-white text-[#0C0C0C] font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Profile Changes</span>
        </button>
      </div>

      {/* Hero Section Form */}
      <div className="p-6 rounded-[28px] border border-white/10 bg-[#121212] space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
          <User className="w-4 h-4 text-[#D7E2EA]" />
          <span>Hero Identification &amp; Positioning</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
              Full Name
            </label>
            <input
              type="text"
              value={heroForm.name}
              onChange={(e) => setHeroForm({ ...heroForm, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
            />
          </div>

          <div>
            <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
              Availability Status
            </label>
            <input
              type="text"
              value={heroForm.availabilityStatus}
              onChange={(e) => setHeroForm({ ...heroForm, availabilityStatus: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
              Professional Title Line
            </label>
            <input
              type="text"
              value={heroForm.title}
              onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
              Headline Statement
            </label>
            <input
              type="text"
              value={heroForm.headline}
              onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
              Supporting Bio Paragraph
            </label>
            <textarea
              rows={3}
              value={heroForm.supportingBio}
              onChange={(e) => setHeroForm({ ...heroForm, supportingBio: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
              Portrait Avatar Image URL
            </label>
            <input
              type="text"
              value={heroForm.avatarUrl}
              onChange={(e) => setHeroForm({ ...heroForm, avatarUrl: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA] font-mono"
            />
          </div>
        </div>

        {/* Social Handles */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Link2 className="w-3.5 h-3.5 text-[#D7E2EA]" />
            <span>Contact &amp; Social Links</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                Email Address
              </label>
              <input
                type="email"
                value={heroForm.socials.email}
                onChange={(e) =>
                  setHeroForm({
                    ...heroForm,
                    socials: { ...heroForm.socials, email: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
              />
            </div>

            <div>
              <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                Phone Number
              </label>
              <input
                type="text"
                value={heroForm.socials.phone || ''}
                onChange={(e) =>
                  setHeroForm({
                    ...heroForm,
                    socials: { ...heroForm.socials, phone: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
              />
            </div>

            <div>
              <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                GitHub Profile URL
              </label>
              <input
                type="text"
                value={heroForm.socials.github}
                onChange={(e) =>
                  setHeroForm({
                    ...heroForm,
                    socials: { ...heroForm.socials, github: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA] font-mono"
              />
            </div>

            <div>
              <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                LinkedIn Profile URL
              </label>
              <input
                type="text"
                value={heroForm.socials.linkedin}
                onChange={(e) =>
                  setHeroForm({
                    ...heroForm,
                    socials: { ...heroForm.socials, linkedin: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA] font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* About Section Form */}
      <div className="p-6 rounded-[28px] border border-white/10 bg-[#121212] space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#D7E2EA]" />
          <span>About &amp; Biography Narrative</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
              Location
            </label>
            <input
              type="text"
              value={aboutForm.location}
              onChange={(e) => setAboutForm({ ...aboutForm, location: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
            />
          </div>

          <div>
            <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
              Experience Span
            </label>
            <input
              type="text"
              value={aboutForm.experienceYears}
              onChange={(e) => setAboutForm({ ...aboutForm, experienceYears: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
              Biography Paragraphs (Separate paragraphs with double Enter)
            </label>
            <textarea
              rows={6}
              value={aboutForm.bioString}
              onChange={(e) => setAboutForm({ ...aboutForm, bioString: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA] leading-relaxed"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
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
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
              Philosophy Core Values (comma-separated)
            </label>
            <input
              type="text"
              value={aboutForm.philosophyValues}
              onChange={(e) => setAboutForm({ ...aboutForm, philosophyValues: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
            />
          </div>
        </div>

        <div className="flex justify-end pt-3">
          <button
            onClick={handleSaveAll}
            className="px-5 py-2.5 rounded-full bg-[#D7E2EA] hover:bg-white text-[#0C0C0C] font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer"
          >
            Save All Hero &amp; About Changes
          </button>
        </div>
      </div>
    </div>
  );
};
