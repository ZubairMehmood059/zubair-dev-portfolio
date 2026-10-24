import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, Search } from 'lucide-react';

export const AdminSEO: React.FC = () => {
  const { seo, updateSEO, showToast } = usePortfolio();

  const getKeywordsString = (kw: unknown): string => {
    if (Array.isArray(kw)) return kw.join(', ');
    if (typeof kw === 'string') return kw;
    return '';
  };

  const [form, setForm] = useState({
    title: seo?.metaTitle || seo?.title || '',
    description: seo?.metaDescription || seo?.description || '',
    keywordsString: getKeywordsString(seo?.keywords),
    ogTitle: seo?.ogTitle || seo?.metaTitle || seo?.title || '',
    ogDescription: seo?.ogDescription || seo?.metaDescription || seo?.description || '',
    ogImage: seo?.ogImageUrl || seo?.ogImage || '',
    author: seo?.author || 'Zubair Mehmood',
    canonicalUrl: seo?.canonicalUrl || 'https://zubair.dev',
    robotsIndexing: seo?.robotsIndexing ?? true,
  });

  const handleSave = () => {
    updateSEO({
      metaTitle: form.title,
      title: form.title,
      metaDescription: form.description,
      description: form.description,
      keywords: form.keywordsString,
      ogTitle: form.ogTitle,
      ogDescription: form.ogDescription,
      ogImageUrl: form.ogImage,
      ogImage: form.ogImage,
      author: form.author,
      canonicalUrl: form.canonicalUrl,
      robotsIndexing: form.robotsIndexing,
    });
    showToast('SEO & Social Share Metadata saved!');
  };

  return (
    <div className="space-y-6 font-['Kanit',sans-serif] text-[#D7E2EA]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight hero-heading">
            SEO &amp; OpenGraph Social Metadata
          </h2>
          <p className="text-xs sm:text-sm text-[#BBCCD7]/70 font-light mt-1">
            Configure how Zubair.dev appears on Google Search engines and social preview cards on LinkedIn and Twitter/X.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#D7E2EA] hover:bg-white text-[#0C0C0C] font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Metadata</span>
        </button>
      </div>

      {/* Google Search Result Preview */}
      <div className="p-6 rounded-[28px] bg-[#121212] border border-white/10 space-y-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#BBCCD7]/70 flex items-center gap-2">
          <Search className="w-4 h-4 text-[#D7E2EA]" />
          <span>Search Engine Snippet Simulator</span>
        </h3>

        <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-1.5">
          <div className="text-xs text-[#BBCCD7]/50 truncate font-mono">
            https://zubair.dev
          </div>
          <div className="text-base font-semibold text-white hover:underline cursor-pointer truncate">
            {form.title}
          </div>
          <div className="text-xs text-[#BBCCD7]/80 leading-relaxed line-clamp-2 font-light">
            {form.description}
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="p-6 rounded-[28px] bg-[#121212] border border-white/10 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="sm:col-span-2">
            <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
              Document Title Tag (&lt;title&gt;)
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
              Meta Description Tag
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA] font-light"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
              Meta Keywords (comma-separated)
            </label>
            <input
              type="text"
              value={form.keywordsString}
              onChange={(e) => setForm({ ...form, keywordsString: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA] font-mono"
            />
          </div>

          <div>
            <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
              OpenGraph Title
            </label>
            <input
              type="text"
              value={form.ogTitle}
              onChange={(e) => setForm({ ...form, ogTitle: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
            />
          </div>

          <div>
            <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
              OpenGraph Image URL
            </label>
            <input
              type="text"
              value={form.ogImage}
              onChange={(e) => setForm({ ...form, ogImage: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA] font-mono"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
              Author Name
            </label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA]"
            />
          </div>
        </div>

        <div className="flex justify-end pt-3">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-full bg-[#D7E2EA] hover:bg-white text-[#0C0C0C] font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer"
          >
            Apply SEO Metadata
          </button>
        </div>
      </div>
    </div>
  );
};
