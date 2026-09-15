import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Palette, Check, RotateCcw } from 'lucide-react';
import { ThemeMode } from '../../types';

export const AdminThemes: React.FC = () => {
  const { theme, setThemePreset, updateThemeCustom, showToast } = usePortfolio();

  const presets: { id: ThemeMode; name: string; desc: string; colors: string[] }[] = [
    {
      id: 'midnight-cyan',
      name: 'Midnight Cyan (Default)',
      desc: 'Deep navy graphite canvas with electric cyan, sky blue, and subtle violet glows.',
      colors: ['#070b13', '#06b6d4', '#3b82f6'],
    },
    {
      id: 'graphite-indigo',
      name: 'Graphite Indigo',
      desc: 'Sleek dark graphite slate with rich indigo and violet highlights.',
      colors: ['#090a14', '#818cf8', '#c084fc'],
    },
    {
      id: 'soft-arctic',
      name: 'Soft Arctic Dark',
      desc: 'Crisp cold charcoal with high-contrast arctic teal and ice accents.',
      colors: ['#050d18', '#38bdf8', '#2dd4bf'],
    },
    {
      id: 'emerald-matrix',
      name: 'Emerald Matrix',
      desc: 'Deep cyber forest noir canvas with vivid emerald matrix and mint neon accents.',
      colors: ['#040e09', '#10b981', '#14b8a6'],
    },
    {
      id: 'amber-solar',
      name: 'Amber Solar',
      desc: 'Obsidian bronze canvas energized by solar amber and warm sunset orange rays.',
      colors: ['#100b05', '#f59e0b', '#f97316'],
    },
    {
      id: 'crimson-cyber',
      name: 'Crimson Cyber',
      desc: 'Noir stealth canvas illuminated by high-impact crimson rose and ruby highlights.',
      colors: ['#100508', '#f43f5e', '#e11d48'],
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white font-heading">Theme &amp; Visual Design Engine</h2>
        <p className="text-xs text-slate-400">
          Seamlessly toggle global appearance presets or calibrate precise design tokens and CSS variables.
        </p>
      </div>

      {/* Preset Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {presets.map((p) => {
          const isActive = theme.preset === p.id;
          return (
            <div
              key={p.id}
              onClick={() => {
                setThemePreset(p.id);
                showToast(`Switched theme to ${p.name}`);
              }}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                isActive
                  ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-950/60 border-slate-800 hover:bg-slate-900/60 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-sm">{p.name}</h3>
                {isActive && (
                  <span className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{p.desc}</p>

              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800/80">
                {p.colors.map((c, idx) => (
                  <span
                    key={idx}
                    className="w-4 h-4 rounded-full border border-white/20"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Color Overrides Form */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono flex items-center gap-2">
          <Palette className="w-4 h-4 text-cyan-400" />
          <span>Advanced Design Token Calibration</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Primary Color (Hex)</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.customColors?.primary || '#06b6d4'}
                onChange={(e) =>
                  updateThemeCustom({
                    customColors: { ...theme.customColors, primary: e.target.value } as any,
                  })
                }
                className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={theme.customColors?.primary || '#06b6d4'}
                onChange={(e) =>
                  updateThemeCustom({
                    customColors: { ...theme.customColors, primary: e.target.value } as any,
                  })
                }
                className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono uppercase"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Accent Glow (Hex)</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.customColors?.accent || '#3b82f6'}
                onChange={(e) =>
                  updateThemeCustom({
                    customColors: { ...theme.customColors, accent: e.target.value } as any,
                  })
                }
                className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={theme.customColors?.accent || '#3b82f6'}
                onChange={(e) =>
                  updateThemeCustom({
                    customColors: { ...theme.customColors, accent: e.target.value } as any,
                  })
                }
                className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono uppercase"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Corner Radius</label>
            <select
              value={theme.borderRadius || 'rounded-2xl'}
              onChange={(e) => updateThemeCustom({ borderRadius: e.target.value as any })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="rounded-lg">Compact (8px)</option>
              <option value="rounded-xl">Standard (12px)</option>
              <option value="rounded-2xl">Modern Soft (16px)</option>
            </select>
          </div>
        </div>

        <div className="pt-2 text-right">
          <button
            onClick={() => {
              setThemePreset('midnight-cyan');
              showToast('Reset theme to defaults.');
            }}
            className="text-xs text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1 ml-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Theme Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
};
