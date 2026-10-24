import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Image, Copy, CheckCircle2, Plus } from 'lucide-react';

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
    <div className="space-y-6 font-['Kanit',sans-serif] text-[#D7E2EA]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight hero-heading">
            Asset &amp; Media Library
          </h2>
          <p className="text-xs sm:text-sm text-[#BBCCD7]/70 font-light mt-1">
            Preview, manage, and configure visual assets across the portfolio interface.
          </p>
        </div>
      </div>

      {/* Grid of current assets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mediaList.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-[24px] bg-[#121212] border border-white/10 space-y-3 flex flex-col justify-between group hover:border-white/20 transition-colors"
          >
            <div>
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-black/80 backdrop-blur-md text-[#D7E2EA] border border-white/20">
                  {item.type}
                </span>
              </div>
              <h3 className="text-xs font-bold text-white mt-2.5 line-clamp-1 uppercase tracking-wide">
                {item.title}
              </h3>
              <p className="text-[11px] text-[#BBCCD7]/60 font-mono truncate">{item.url}</p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <button
                onClick={() => handleCopy(item.url)}
                className="flex items-center gap-1.5 text-[#BBCCD7] hover:text-white transition-colors cursor-pointer"
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
                  className="text-[11px] text-[#D7E2EA] hover:underline uppercase tracking-wide cursor-pointer font-mono"
                >
                  Set as Avatar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick custom URL input */}
      <div className="p-6 rounded-[28px] bg-[#121212] border border-white/10 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono flex items-center gap-2">
          <Image className="w-4 h-4 text-[#D7E2EA]" />
          <span>Set Custom Main Portrait URL</span>
        </h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Paste external or local image path e.g. /images/zubair_portrait.jpg"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-full bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D7E2EA] font-mono"
          />
          <button
            onClick={() => {
              if (newImageUrl.trim()) {
                updateHero({ avatarUrl: newImageUrl.trim() });
                showToast('Updated main avatar with new image URL!');
                setNewImageUrl('');
              }
            }}
            className="px-6 py-2.5 rounded-full bg-[#D7E2EA] hover:bg-white text-[#0C0C0C] font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer shrink-0"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
