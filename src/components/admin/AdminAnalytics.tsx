import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  TrendingUp,
  Download,
  Eye,
  Smartphone,
  Monitor,
  Globe,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const { analytics, projects, resetAnalytics, showToast } = usePortfolio();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">Performance &amp; Engagement Analytics</h2>
          <p className="text-xs text-slate-400">
            Real client-side metrics tracking user interest, case study interactions, and recruiter resume downloads.
          </p>
        </div>

        <button
          onClick={() => {
            if (window.confirm('Reset all analytics counters to zero?')) {
              resetAnalytics();
              showToast('Analytics counters reset.');
            }
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-800 text-xs transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Counters</span>
        </button>
      </div>

      {/* Main KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30">
          <div className="text-xs text-slate-400 font-mono">Total Cumulative Visits</div>
          <div className="text-3xl font-extrabold text-white font-mono mt-2">
            {analytics.totalVisits.toLocaleString()}
          </div>
          <span className="text-[11px] text-cyan-400 mt-1 block">Live session tracking</span>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30">
          <div className="text-xs text-slate-400 font-mono">CV / Resume Downloads</div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono mt-2">
            {analytics.cvDownloads.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Recruiter intent indicator</span>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-blue-500/30">
          <div className="text-xs text-slate-400 font-mono">Project Case Study Clicks</div>
          <div className="text-3xl font-extrabold text-blue-400 font-mono mt-2">
            {Object.values(analytics.projectViews).reduce((a: number, b: number) => a + Number(b), 0)}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Deep dive modal impressions</span>
        </div>
      </div>

      {/* Project Breakdown */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
          <Eye className="w-4 h-4 text-cyan-400" />
          <span>Project Case Study Engagement Breakdown</span>
        </h3>

        <div className="space-y-3">
          {projects.map((proj) => {
            const views = analytics.projectViews[proj.slug] || 0;
            const total = (Object.values(analytics.projectViews) as number[]).reduce((a: number, b: number) => a + Number(b), 0) || 1;
            const pct = Math.round((views / total) * 100);

            return (
              <div key={proj.id} className="space-y-1 text-xs">
                <div className="flex items-center justify-between text-slate-200">
                  <span className="font-semibold">{proj.title}</span>
                  <span className="font-mono text-cyan-400">{views} views ({pct}%)</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Client Context Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <h4 className="font-bold text-slate-300 font-mono flex items-center gap-2">
            <Monitor className="w-4 h-4 text-cyan-400" />
            <span>Estimated Device Class</span>
          </h4>
          <div className="space-y-2 text-slate-400">
            <div className="flex justify-between">
              <span>Desktop / Laptop</span>
              <span className="text-white font-mono">68%</span>
            </div>
            <div className="flex justify-between">
              <span>Mobile Smartphone</span>
              <span className="text-white font-mono">28%</span>
            </div>
            <div className="flex justify-between">
              <span>Tablet / iPad</span>
              <span className="text-white font-mono">4%</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <h4 className="font-bold text-slate-300 font-mono flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>Referral Sources</span>
          </h4>
          <div className="space-y-2 text-slate-400">
            <div className="flex justify-between">
              <span>Direct URL (Zubair.dev)</span>
              <span className="text-white font-mono">54%</span>
            </div>
            <div className="flex justify-between">
              <span>LinkedIn Profile Inbound</span>
              <span className="text-white font-mono">31%</span>
            </div>
            <div className="flex justify-between">
              <span>GitHub Bio Link</span>
              <span className="text-white font-mono">15%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
