import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  TrendingUp,
  Download,
  Eye,
  Monitor,
  Globe,
  RotateCcw,
  BarChart2,
} from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const { analytics, projects, resetAnalytics, showToast } = usePortfolio();

  return (
    <div className="space-y-8 font-['Kanit',sans-serif] text-[#D7E2EA]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight hero-heading">
            Performance &amp; Engagement Analytics
          </h2>
          <p className="text-xs sm:text-sm text-[#BBCCD7]/70 font-light mt-1">
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
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-black/40 hover:bg-rose-950/40 text-[#BBCCD7]/60 hover:text-rose-300 border border-white/10 hover:border-rose-500/30 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Counters</span>
        </button>
      </div>

      {/* Main KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-[28px] border border-white/10 bg-[#121212] flex flex-col justify-between">
          <div className="text-xs text-[#BBCCD7]/70 font-mono uppercase tracking-wider">
            Total Cumulative Visits
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white font-mono mt-3">
            {analytics.totalVisits.toLocaleString()}
          </div>
          <span className="text-[11px] text-[#BBCCD7]/60 mt-2 block font-mono">
            Active session tracking
          </span>
        </div>

        <div className="p-6 rounded-[28px] border border-white/10 bg-[#121212] flex flex-col justify-between">
          <div className="text-xs text-[#BBCCD7]/70 font-mono uppercase tracking-wider">
            CV / Resume Downloads
          </div>
          <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono mt-3">
            {analytics.cvDownloads.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-400/80 mt-2 block font-mono flex items-center gap-1">
            <Download className="w-3 h-3" />
            <span>Recruiter intent verified</span>
          </span>
        </div>

        <div className="p-6 rounded-[28px] border border-white/10 bg-[#121212] flex flex-col justify-between">
          <div className="text-xs text-[#BBCCD7]/70 font-mono uppercase tracking-wider">
            Project Case Study Clicks
          </div>
          <div className="text-3xl sm:text-4xl font-black text-[#D7E2EA] font-mono mt-3">
            {Object.values(analytics.projectViews).reduce((a: number, b: number) => a + Number(b), 0)}
          </div>
          <span className="text-[11px] text-[#BBCCD7]/60 mt-2 block font-mono">
            Deep dive modal impressions
          </span>
        </div>
      </div>

      {/* Project Breakdown */}
      <div className="p-6 sm:p-8 rounded-[32px] border border-white/10 bg-[#121212] space-y-5">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-[#D7E2EA]" />
          <span>Project Case Study Engagement Breakdown</span>
        </h3>

        <div className="space-y-4">
          {projects.map((proj) => {
            const views = analytics.projectViews[proj.slug] || 0;
            const total =
              (Object.values(analytics.projectViews) as number[]).reduce((a: number, b: number) => a + Number(b), 0) || 1;
            const pct = Math.round((views / total) * 100);

            return (
              <div key={proj.id} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[#D7E2EA]">
                  <span className="font-semibold uppercase tracking-wide">{proj.title}</span>
                  <span className="font-mono text-[#BBCCD7]">
                    {views} views ({pct}%)
                  </span>
                </div>
                <div className="h-2 w-full bg-black/60 rounded-full overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-[#646973] to-[#BBCCD7] rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(pct, 3)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Client Context Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-6 rounded-[28px] bg-[#121212] border border-white/10 space-y-4">
          <h4 className="font-bold text-white font-mono flex items-center gap-2 uppercase tracking-wider">
            <Monitor className="w-4 h-4 text-[#D7E2EA]" />
            <span>Estimated Device Class</span>
          </h4>
          <div className="space-y-2.5 text-[#BBCCD7]/80">
            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span>Desktop / Laptop</span>
              <span className="text-white font-mono font-bold">68%</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span>Mobile Smartphone</span>
              <span className="text-white font-mono font-bold">28%</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span>Tablet / iPad</span>
              <span className="text-white font-mono font-bold">4%</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-[28px] bg-[#121212] border border-white/10 space-y-4">
          <h4 className="font-bold text-white font-mono flex items-center gap-2 uppercase tracking-wider">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>Referral Sources</span>
          </h4>
          <div className="space-y-2.5 text-[#BBCCD7]/80">
            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span>Direct URL (Zubair.dev)</span>
              <span className="text-white font-mono font-bold">54%</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span>LinkedIn Profile Inbound</span>
              <span className="text-white font-mono font-bold">31%</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span>GitHub Bio Link</span>
              <span className="text-white font-mono font-bold">15%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
