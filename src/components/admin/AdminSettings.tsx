import React, { useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Download, Upload, RotateCcw, ShieldAlert, Layers } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const {
    exportDataJson,
    importDataJson,
    resetToInitialData,
    isPreviewMode,
    togglePreviewMode,
    showToast,
  } = usePortfolio();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const dataStr = exportDataJson();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zubair-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Portfolio configuration exported successfully!');
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const ok = importDataJson(content);
        if (ok) {
          showToast('Portfolio successfully restored from JSON backup!');
        } else {
          showToast('Invalid JSON file format.', 'error');
        }
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleReset = () => {
    if (
      window.confirm(
        'Warning: This will restore all data strictly back to the authoritative resume defaults. Any unexported custom changes will be overwritten. Proceed?'
      )
    ) {
      resetToInitialData();
      showToast('All data reset to authoritative resume state.');
    }
  };

  return (
    <div className="space-y-8 font-['Kanit',sans-serif] text-[#D7E2EA]">
      <div>
        <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight hero-heading">
          Settings &amp; Data Administration
        </h2>
        <p className="text-xs sm:text-sm text-[#BBCCD7]/70 font-light mt-1">
          Manage data portability, export backups, restore snapshots, or reset to original resume specifications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Backup & Portability Card */}
        <div className="p-6 rounded-[28px] bg-[#121212] border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <Download className="w-4 h-4 text-[#D7E2EA]" />
            <span>Data Portability &amp; Backups</span>
          </h3>

          <p className="text-xs text-[#BBCCD7]/80 leading-relaxed font-light">
            Download your full portfolio state (projects, skills, hero, bio, timeline, custom theme tokens, SEO) as a standardized JSON backup.
          </p>

          <div className="space-y-3 pt-2">
            <button
              onClick={handleExport}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#D7E2EA] hover:bg-white text-[#0C0C0C] font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export Full Portfolio JSON</span>
            </button>

            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={handleFileImport}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-black/50 hover:bg-black/70 text-[#D7E2EA] border border-white/15 font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4 text-[#D7E2EA]" />
              <span>Restore from JSON Backup File</span>
            </button>
          </div>
        </div>

        {/* Draft Preview & Publishing Workflow */}
        <div className="p-6 rounded-[28px] bg-[#121212] border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#D7E2EA]" />
            <span>Draft Mode &amp; Preview Engine</span>
          </h3>

          <p className="text-xs text-[#BBCCD7]/80 leading-relaxed font-light">
            Toggle draft preview mode to inspect unpublished projects or hidden items on the live public layout before releasing them.
          </p>

          <div className="p-4 rounded-[20px] bg-black/50 border border-white/10 flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-white block uppercase tracking-wide">Preview Mode Status</span>
              <span className="text-[11px] text-[#BBCCD7]/60">
                {isPreviewMode ? 'Currently showing unpublished draft items' : 'Currently showing live published items only'}
              </span>
            </div>

            <button
              onClick={togglePreviewMode}
              className={`px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider font-mono transition-colors cursor-pointer ${
                isPreviewMode
                  ? 'bg-[#BBCCD7] text-[#0C0C0C]'
                  : 'bg-white/10 text-[#D7E2EA] hover:bg-white/20'
              }`}
            >
              {isPreviewMode ? 'Exit Preview' : 'Enable Preview'}
            </button>
          </div>

          <div className="pt-2 text-[11px] text-[#BBCCD7]/50 font-mono">
            Build Target: Zubair.dev (Production Architecture)
          </div>
        </div>
      </div>

      {/* Danger Zone: Factory Reset */}
      <div className="p-6 rounded-[28px] bg-rose-950/20 border border-rose-800/30 space-y-3">
        <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider font-mono flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>Factory Reset: Authoritative Resume Grounding</span>
        </h3>

        <p className="text-xs text-[#BBCCD7]/80 leading-relaxed font-light">
          Restore all portfolio data to the baseline specifications extracted directly from Zubair Mehmood&apos;s verified CV (Netflix Clone, TypeNova-X, Digital Inheritance System, Nexa-Homes-Grid, SSUET credentials, certifications).
        </p>

        <button
          onClick={handleReset}
          className="px-5 py-2.5 rounded-full bg-rose-950 hover:bg-rose-900 text-rose-200 font-semibold text-xs border border-rose-800/60 transition-colors flex items-center gap-2 uppercase tracking-wider cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Content to Resume Defaults</span>
        </button>
      </div>
    </div>
  );
};
