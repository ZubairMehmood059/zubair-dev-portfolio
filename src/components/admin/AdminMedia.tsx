import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Image, Copy, CheckCircle2, ExternalLink, Plus, RefreshCw } from 'lucide-react';

export const AdminMedia: React.FC = () => {
  const { hero, projects, updateHero, showToast } = usePortfolio();
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [newImageUrl, setNewImageUrl] = useState('');

  // Collect all project and avatar assets
  const mediaList = [
    { title: 'Zubair Mehmood Professional Portrait', url: hero.avatarUrl, type: 'Profile' },
    ...projects.map((p) => ({ title: `${p.title} Preview`, url: p.imageUrl, type: 'Project' })),
  ];

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    showToast('Asset path copied!');
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const handleSetAvatar = (url: string) => {
    updateHero({ avatarUrl: url });
    showToast('Updated main profile avatar!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">Asset &amp; Media Library</h2>
          <p className="text-xs text-slate-400">
            Preview, manage, and configure visual assets across the portfolio interface.
          </p>
        </div>
      </div>

      {/* Grid of current assets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mediaList.map((item, idx) => (
          <div
            key={idx}
            className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between group"
          >
            <div>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-950 border border-slate-800">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-slate-700">
                  {item.type}
                </span>
              </div>
              <h3 className="text-xs font-bold text-slate-200 mt-2 line-clamp-1">{item.title}</h3>
              <p className="text-[11px] text-slate-400 font-mono truncate">{item.url}</p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <button
                onClick={() => handleCopy(item.url)}
                className="flex items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors"
              >
                {copiedUrl === item.url ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedUrl === item.url ? 'Copied' : 'Copy Path'}</span>
              </button>

              {item.type !== 'Profile' && (
                <button
                  onClick={() => handleSetAvatar(item.url)}
                  className="text-[11px] text-cyan-400 hover:underline"
                >
                  Set as Avatar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick custom URL input */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
          <Image className="w-4 h-4 text-cyan-400" />
          <span>Set Custom Main Portrait URL</span>
        </h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Paste external or local image path e.g. /images/zubair_portrait.jpg"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
          />
          <button
            onClick={() => {
              if (newImageUrl.trim()) {
                updateHero({ avatarUrl: newImageUrl.trim() });
                showToast('Updated main avatar with new image URL!');
                setNewImageUrl('');
              }
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
