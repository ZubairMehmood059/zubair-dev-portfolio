import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Globe, Save, Search, Share2 } from 'lucide-react';

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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">SEO &amp; OpenGraph Social Metadata</h2>
          <p className="text-xs text-slate-400">
            Configure how Zubair.dev appears on Google Search engines and social preview cards on LinkedIn and Twitter/X.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20"
        >
          <Save className="w-4 h-4" />
          <span>Save Metadata</span>
        </button>
      </div>

      {/* Google Search Result Preview */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Search className="w-4 h-4 text-cyan-400" />
          <span>Search Engine Snippet Simulator</span>
        </h3>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 truncate">
            https://zubair.dev
          </div>
          <div className="text-base font-semibold text-cyan-400 hover:underline cursor-pointer truncate">
            {form.title}
          </div>
          <div className="text-xs text-slate-300 leading-relaxed line-clamp-2">
            {form.description}
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="sm:col-span-2">
            <label className="block text-slate-400 font-semibold mb-1">
              Document Title Tag (&lt;title&gt;)
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-slate-400 font-semibold mb-1">
              Meta Description Tag
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-slate-400 font-semibold mb-1">
              Meta Keywords (comma-separated)
            </label>
            <input
              type="text"
              value={form.keywordsString}
              onChange={(e) => setForm({ ...form, keywordsString: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">OpenGraph Title</label>
            <input
              type="text"
              value={form.ogTitle}
              onChange={(e) => setForm({ ...form, ogTitle: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">OpenGraph Image URL</label>
            <input
              type="text"
              value={form.ogImage}
              onChange={(e) => setForm({ ...form, ogImage: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-slate-400 font-semibold mb-1">Author Name</label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-3">
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20"
          >
            Apply SEO Metadata
          </button>
        </div>
      </div>
    </div>
  );
};
