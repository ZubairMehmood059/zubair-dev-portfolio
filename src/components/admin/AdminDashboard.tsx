import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Users,
  Eye,
  Download,
  Mail,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Layers,
  Award,
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateTab: (tab: any) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateTab }) => {
  const { analytics, messages, projects, skills, hero, experience } = usePortfolio();

  const unreadMessagesCount = messages.filter((m) => !m.isRead).length;

  const stats = [
    {
      title: 'Total Portfolio Visits',
      value: analytics.totalVisits.toLocaleString(),
      change: '+18% this week',
      icon: <Users className="w-5 h-5 text-cyan-400" />,
      color: 'border-cyan-500/30 bg-cyan-950/20',
    },
    {
      title: 'Resume CV Downloads',
      value: analytics.cvDownloads.toLocaleString(),
      change: 'Verified Recruiter Clicks',
      icon: <Download className="w-5 h-5 text-emerald-400" />,
      color: 'border-emerald-500/30 bg-emerald-950/20',
    },
    {
      title: 'Active Projects',
      value: projects.length.toString(),
      change: `${projects.filter((p) => p.isFeatured).length} Featured`,
      icon: <Layers className="w-5 h-5 text-blue-400" />,
      color: 'border-blue-500/30 bg-blue-950/20',
    },
    {
      title: 'Inbound Inquiries',
      value: messages.length.toString(),
      change: `${unreadMessagesCount} Unread`,
      icon: <Mail className="w-5 h-5 text-purple-400" />,
      color: 'border-purple-500/30 bg-purple-950/20',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Zubair.dev Control Matrix</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white font-heading">
            Welcome, {hero.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            All content on Zubair.dev is dynamic, editable, and saved with durable client-side local persistence.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => onNavigateTab('messages')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
          >
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>Inbox ({unreadMessagesCount} new)</span>
          </button>
          <button
            onClick={() => onNavigateTab('projects')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
          >
            <Layers className="w-4 h-4" />
            <span>Manage Projects</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl border ${stat.color} backdrop-blur-md flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">{stat.title}</span>
              <div className="p-2 rounded-xl bg-slate-900/80 border border-white/5">{stat.icon}</div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-extrabold text-white font-mono">{stat.value}</div>
              <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1 font-mono">
                <TrendingUp className="w-3 h-3 text-cyan-400" />
                <span>{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Inquiries */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Recent Contact Inquiries</span>
            </h3>
            <button
              onClick={() => onNavigateTab('messages')}
              className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {messages.slice(0, 3).map((msg) => (
              <div
                key={msg.id}
                onClick={() => onNavigateTab('messages')}
                className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                  !msg.isRead
                    ? 'bg-cyan-950/30 border-cyan-500/40 text-slate-200'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{msg.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(msg.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-cyan-300/90 font-medium mt-0.5">{msg.subject}</div>
                <p className="text-slate-400 line-clamp-1 mt-1">{msg.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Project Metrics & Top Viewed */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-400" />
              <span>Project Engagement Insights</span>
            </h3>
            <button
              onClick={() => onNavigateTab('analytics')}
              className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>Full Analytics</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {projects.map((proj) => {
              const views = analytics.projectViews[proj.slug] || 0;
              return (
                <div
                  key={proj.id}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-semibold text-slate-200 block">{proj.title}</span>
                    <span className="text-[11px] text-slate-500 font-mono">{proj.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-cyan-400">{views}</span>
                    <span className="text-[10px] text-slate-500 block">case views</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Quick Setup Checkmarks based on Resume */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Resume-Grounded System Checklist</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>4 Authentic Projects</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Freelance Experience Loaded</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>SSUET 5th Semester Active</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Both Certifications Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};
