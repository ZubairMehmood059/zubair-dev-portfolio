import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  LayoutDashboard,
  User,
  Layers,
  Code2,
  Briefcase,
  Image,
  Mail,
  Palette,
  BarChart3,
  Globe,
  Lock,
  Settings,
  ArrowLeft,
  LogOut,
  Eye,
  CheckCircle,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { AdminDashboard } from './AdminDashboard';
import { AdminHeroAbout } from './AdminHeroAbout';
import { AdminProjects } from './AdminProjects';
import { AdminSkills } from './AdminSkills';
import { AdminTimeline } from './AdminTimeline';
import { AdminMedia } from './AdminMedia';
import { AdminMessages } from './AdminMessages';
import { AdminThemes } from './AdminThemes';
import { AdminAnalytics } from './AdminAnalytics';
import { AdminSEO } from './AdminSEO';
import { AdminSecurity } from './AdminSecurity';
import { AdminSettings } from './AdminSettings';

interface AdminLayoutProps {
  onClose: () => void;
}

type AdminTab =
  | 'overview'
  | 'hero-about'
  | 'projects'
  | 'skills'
  | 'timeline'
  | 'media'
  | 'messages'
  | 'theme'
  | 'analytics'
  | 'seo'
  | 'security'
  | 'settings';

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onClose }) => {
  const {
    hero,
    messages,
    adminLogout,
    isPreviewMode,
    togglePreviewMode,
    showToast,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const unreadMessagesCount = messages.filter((m) => !m.isRead).length;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'hero-about', label: 'Hero & Profile', icon: <User className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects & Case Studies', icon: <Layers className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills & Tech', icon: <Code2 className="w-4 h-4" /> },
    { id: 'timeline', label: 'Timeline & Certs', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'media', label: 'Media Library', icon: <Image className="w-4 h-4" /> },
    {
      id: 'messages',
      label: 'Inbox Inquiries',
      icon: <Mail className="w-4 h-4" />,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
    },
    { id: 'theme', label: 'Theme & Styling', icon: <Palette className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'seo', label: 'SEO & Social Meta', icon: <Globe className="w-4 h-4" /> },
    { id: 'security', label: 'Security & Auth', icon: <Lock className="w-4 h-4" /> },
    { id: 'settings', label: 'Backup & Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleLogout = () => {
    adminLogout();
    showToast('Logged out of Admin CMS.');
    onClose();
  };

  return (
    <div
      style={{ backgroundColor: 'var(--bg-primary)' }}
      className="fixed inset-0 z-50 text-slate-100 flex flex-col overflow-hidden font-sans transition-colors duration-400"
    >
      
      {/* Top Bar */}
      <header className="h-16 px-4 sm:px-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileNavOpen((prev) => !prev)}
            className="p-2 rounded-lg text-slate-400 hover:text-white lg:hidden"
            aria-label="Toggle Navigation"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>View Public Website</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-200">Zubair.dev CMS Portal</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Draft preview mode button */}
          <button
            onClick={togglePreviewMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              isPreviewMode
                ? 'bg-amber-950/80 border-amber-600/60 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Preview Mode:</span>
            <span>{isPreviewMode ? 'ON' : 'OFF'}</span>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 text-xs font-medium transition-colors"
            title="Sign out of Admin CMS"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Sidebar Navigation */}
        <aside
          className={`fixed inset-y-16 left-0 z-30 w-64 bg-slate-950/95 lg:bg-slate-950 border-r border-slate-800 p-4 flex flex-col justify-between transition-transform duration-200 lg:static lg:translate-x-0 ${
            mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="space-y-1 overflow-y-auto pr-1">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 py-2">
              Configuration Modules
            </div>

            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as AdminTab);
                    setMobileNavOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-950/80 text-cyan-300 font-semibold border border-cyan-800/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500 text-slate-950">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 px-2 space-y-1">
            <div className="text-slate-400 font-semibold">{hero.name}</div>
            <div className="truncate">SSUET • Software Engineering</div>
          </div>
        </aside>

        {/* Content Area */}
        <main
          style={{ backgroundColor: 'var(--bg-primary)' }}
          className="flex-1 overflow-y-auto p-4 sm:p-8 transition-colors duration-400"
        >
          <div className="max-w-5xl mx-auto">
            {activeTab === 'overview' && <AdminDashboard onNavigateTab={setActiveTab} />}
            {activeTab === 'hero-about' && <AdminHeroAbout />}
            {activeTab === 'projects' && <AdminProjects />}
            {activeTab === 'skills' && <AdminSkills />}
            {activeTab === 'timeline' && <AdminTimeline />}
            {activeTab === 'media' && <AdminMedia />}
            {activeTab === 'messages' && <AdminMessages />}
            {activeTab === 'theme' && <AdminThemes />}
            {activeTab === 'analytics' && <AdminAnalytics />}
            {activeTab === 'seo' && <AdminSEO />}
            {activeTab === 'security' && <AdminSecurity />}
            {activeTab === 'settings' && <AdminSettings />}
          </div>
        </main>

      </div>
    </div>
  );
};
