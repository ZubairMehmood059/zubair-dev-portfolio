import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Users,
  Eye,
  Download,
  Mail,
  CheckCircle2,
  TrendingUp,
  Layers,
  FileText,
  ArrowUpRight,
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateTab: (tab: any) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateTab }) => {
  const { analytics, messages, projects, hero } = usePortfolio();

  const unreadMessagesCount = messages.filter((m) => !m.isRead).length;

  const stats = [
    {
      title: 'Total Portfolio Visits',
      value: analytics.totalVisits.toLocaleString(),
      change: '+18% this week',
      icon: <Users className="w-5 h-5 text-[#D7E2EA]" />,
    },
    {
      title: 'Resume CV Downloads',
      value: analytics.cvDownloads.toLocaleString(),
      change: 'Verified Recruiter Clicks',
      icon: <Download className="w-5 h-5 text-emerald-400" />,
    },
    {
      title: 'Active Projects',
      value: projects.length.toString(),
      change: `${projects.filter((p) => p.isFeatured).length} Featured`,
      icon: <Layers className="w-5 h-5 text-[#D7E2EA]" />,
    },
    {
      title: 'Inbound Inquiries',
      value: messages.length.toString(),
      change: `${unreadMessagesCount} Unread`,
      icon: <Mail className="w-5 h-5 text-[#D7E2EA]" />,
    },
  ];

  return (
    <div className="space-y-8 font-['Kanit',sans-serif] text-[#D7E2EA]">
      {/* Welcome banner */}
      <div className="p-6 sm:p-8 rounded-[32px] border-2 border-[#D7E2EA] bg-[#0C0C0C] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#BBCCD7]/70 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Zubair.dev Control Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight hero-heading">
            Welcome, {hero.name}
          </h2>
          <p className="text-xs sm:text-sm text-[#D7E2EA]/70 mt-1 max-w-xl font-light">
            All content on Zubair.dev is dynamic, editable, and saved with durable client-side local persistence.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onNavigateTab('messages')}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-[#D7E2EA] hover:bg-white/10 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Inbox ({unreadMessagesCount} new)</span>
          </button>
          <button
            onClick={() => onNavigateTab('projects')}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#D7E2EA] text-[#0C0C0C] text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-md cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            <span>Manage Projects</span>
          </button>
          <button
            onClick={() => onNavigateTab('case-studies')}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-[#D7E2EA] hover:bg-white/10 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Case Studies</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-5 rounded-[28px] border border-white/10 bg-[#121212] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-[#BBCCD7]/70">
                {stat.title}
              </span>
              <div className="p-2 rounded-full border border-white/10 bg-black/40">{stat.icon}</div>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">{stat.value}</div>
              <div className="text-[11px] text-[#BBCCD7]/60 mt-1 flex items-center gap-1 font-mono">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                <span>{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="p-6 rounded-[32px] border border-white/10 bg-[#121212] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#D7E2EA]" />
              <span>Recent Inquiries</span>
            </h3>
            <button
              onClick={() => onNavigateTab('messages')}
              className="text-xs text-[#D7E2EA] hover:underline flex items-center gap-1 uppercase tracking-wider font-mono cursor-pointer"
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
                className={`p-4 rounded-[20px] border text-xs cursor-pointer transition-colors ${
                  !msg.isRead
                    ? 'bg-white/10 border-[#D7E2EA] text-white'
                    : 'bg-black/40 border-white/10 text-[#D7E2EA]/70 hover:bg-black/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white uppercase">{msg.name}</span>
                  <span className="text-[10px] text-[#BBCCD7]/50 font-mono">
                    {new Date(msg.createdAt || Date.now()).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-[#D7E2EA] font-medium mt-1">{msg.subject}</div>
                <p className="text-[#BBCCD7]/60 line-clamp-1 mt-1 font-light">{msg.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Project Metrics & Top Viewed */}
        <div className="p-6 rounded-[32px] border border-white/10 bg-[#121212] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#D7E2EA]" />
              <span>Project Engagement</span>
            </h3>
            <button
              onClick={() => onNavigateTab('analytics')}
              className="text-xs text-[#D7E2EA] hover:underline flex items-center gap-1 uppercase tracking-wider font-mono cursor-pointer"
            >
              <span>Analytics</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {projects.map((proj) => {
              const views = analytics.projectViews[proj.slug] || 0;
              return (
                <div
                  key={proj.id}
                  className="p-3.5 rounded-[20px] bg-black/40 border border-white/10 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-semibold text-white block uppercase tracking-wide">
                      {proj.title}
                    </span>
                    <span className="text-[11px] text-[#BBCCD7]/50 font-mono uppercase">
                      {proj.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-[#D7E2EA]">{views}</span>
                    <span className="text-[10px] text-[#BBCCD7]/50 block font-mono">views</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Verified Checklist */}
      <div className="p-6 rounded-[32px] border border-white/10 bg-[#121212]">
        <h3 className="text-xs font-mono uppercase tracking-widest text-[#BBCCD7]/70 mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Resume-Grounded System Status</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono uppercase tracking-wider">
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-black/40 border border-white/10 text-white/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>4 Authentic Projects</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-black/40 border border-white/10 text-white/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Freelance Experience</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-black/40 border border-white/10 text-white/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>SSUET 5th Semester</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-black/40 border border-white/10 text-white/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>ACIT &amp; Web Certs</span>
          </div>
        </div>
      </div>
    </div>
  );
};
