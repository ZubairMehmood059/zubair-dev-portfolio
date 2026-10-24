import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Palette, Check, RotateCcw } from 'lucide-react';
import { ThemeMode } from '../../types';

export const AdminThemes: React.FC = () => {
  const { theme, setThemePreset, updateThemeCustom, showToast } = usePortfolio();

  const presets: { id: ThemeMode; name: string; desc: string; colors: string[] }[] = [
    {
      id: 'chrome-noir',
      name: 'Chrome Noir (Default)',
      desc: 'Authentic 3D Creator dark canvas (#0C0C0C) with signature metallic chrome accents.',
      colors: ['#0C0C0C', '#D7E2EA', '#BBCCD7'],
    },
    {
      id: 'titanium-luxury',
      name: 'Titanium Luxury',
      desc: 'Deep titanium charcoal with brushed platinum and soft metallic highlights.',
      colors: ['#0E0E0E', '#E5E7EB', '#9CA3AF'],
    },
    {
      id: 'pure-monochrome',
      name: 'Pure Monochrome',
      desc: 'High-contrast studio dark palette with pure optical whites and zinc tones.',
      colors: ['#080808', '#FFFFFF', '#A1A1AA'],
    },
    {
      id: 'emerald-matrix',
      name: 'Emerald Matrix',
      desc: 'Deep cyber noir canvas with sharp emerald and mint terminal highlights.',
      colors: ['#040e09', '#10b981', '#14b8a6'],
    },
    {
      id: 'amber-solar',
      name: 'Amber Solar',
      desc: 'Obsidian bronze canvas energized by refined solar amber and bronze accents.',
      colors: ['#100b05', '#f59e0b', '#f97316'],
    },
    {
      id: 'crimson-cyber',
      name: 'Crimson Cyber',
      desc: 'Noir stealth canvas illuminated by high-impact crimson rose highlights.',
      colors: ['#100508', '#f43f5e', '#e11d48'],
    },
  ];

  return (
    <div className="space-y-8 font-['Kanit',sans-serif] text-[#D7E2EA]">
      <div>
        <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight hero-heading">
          Theme &amp; Visual Design Engine
        </h2>
        <p className="text-xs sm:text-sm text-[#BBCCD7]/70 font-light mt-1">
          Calibrate the portfolio appearance with restrained metallic chrome tones and custom tokens.
        </p>
      </div>

      {/* Preset Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {presets.map((p) => {
          const isActive = theme.preset === p.id;
          return (
            <div
              key={p.id}
              onClick={() => {
                setThemePreset(p.id);
                showToast(`Switched theme to ${p.name}`);
              }}
              className={`p-5 rounded-[24px] border cursor-pointer transition-all ${
                isActive
                  ? 'bg-[#18181B] border-[#D7E2EA] shadow-[0_10px_30px_rgba(215,226,234,0.12)]'
                  : 'bg-[#121212] border-white/10 hover:bg-[#18181B] hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-sm uppercase tracking-wide">{p.name}</h3>
                {isActive && (
                  <span className="w-5 h-5 rounded-full bg-[#D7E2EA] text-[#0C0C0C] flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>

              <p className="text-xs text-[#BBCCD7]/70 mt-2 leading-relaxed font-light">{p.desc}</p>

              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
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
      <div className="p-6 rounded-[28px] border border-white/10 bg-[#121212] space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono flex items-center gap-2">
          <Palette className="w-4 h-4 text-[#D7E2EA]" />
          <span>Advanced Design Token Calibration</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
              Primary Color (Hex)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.customColors?.primary || '#D7E2EA'}
                onChange={(e) =>
                  updateThemeCustom({
                    customColors: { ...theme.customColors, primary: e.target.value } as any,
                  })
                }
                className="w-9 h-9 rounded-xl border border-white/20 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={theme.customColors?.primary || '#D7E2EA'}
                onChange={(e) =>
                  updateThemeCustom({
                    customColors: { ...theme.customColors, primary: e.target.value } as any,
                  })
                }
                className="flex-1 px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white font-mono uppercase focus:outline-none focus:border-[#D7E2EA]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
              Accent Secondary (Hex)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.customColors?.accent || '#BBCCD7'}
                onChange={(e) =>
                  updateThemeCustom({
                    customColors: { ...theme.customColors, accent: e.target.value } as any,
                  })
                }
                className="w-9 h-9 rounded-xl border border-white/20 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={theme.customColors?.accent || '#BBCCD7'}
                onChange={(e) =>
                  updateThemeCustom({
                    customColors: { ...theme.customColors, accent: e.target.value } as any,
                  })
                }
                className="flex-1 px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white font-mono uppercase focus:outline-none focus:border-[#D7E2EA]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#BBCCD7] font-semibold mb-1 uppercase tracking-wider text-[11px]">
              Corner Radius
            </label>
            <select
              value={theme.borderRadius || 'rounded-2xl'}
              onChange={(e) => updateThemeCustom({ borderRadius: e.target.value as any })}
              className="w-full px-3 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white focus:outline-none focus:border-[#D7E2EA] text-xs font-mono"
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
              setThemePreset('chrome-noir');
              showToast('Reset theme to Chrome Noir defaults.');
            }}
            className="text-xs text-[#BBCCD7]/70 hover:text-white transition-colors inline-flex items-center gap-1.5 uppercase tracking-wider font-mono cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Theme Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
};
