import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  LayoutDashboard,
  User,
  Layers,
  FileText,
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
  Menu,
  X,
} from 'lucide-react';
import { AdminDashboard } from './AdminDashboard';
import { Logo } from '../common/Logo';
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
  | 'case-studies'
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
    { id: 'projects', label: 'Projects', icon: <Layers className="w-4 h-4" /> },
    { id: 'case-studies', label: 'Case Studies', icon: <FileText className="w-4 h-4" /> },
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
    <div className="fixed inset-0 z-50 bg-[#0C0C0C] text-[#D7E2EA] flex flex-col overflow-hidden font-['Kanit',sans-serif]">
      {/* Top Bar */}
      <header className="h-16 px-3 sm:px-6 md:px-8 bg-[#0C0C0C] border-b border-white/10 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setMobileNavOpen((prev) => !prev)}
            className="p-2 rounded-full border border-white/10 text-white lg:hidden cursor-pointer hover:bg-white/5"
            aria-label="Toggle Navigation"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-[#D7E2EA]/40 text-[#D7E2EA] hover:border-white hover:text-white hover:bg-white/10 text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </button>

          <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-white/10">
            <Logo size="xs" showWordmark={false} onClick={onClose} />
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Zubair.dev CMS Portal
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Draft preview mode button */}
          <button
            onClick={togglePreviewMode}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-colors cursor-pointer ${
              isPreviewMode
                ? 'bg-[#BBCCD7] border-[#BBCCD7] text-[#0C0C0C] font-bold'
                : 'border-white/10 text-[#D7E2EA]/70 hover:border-white/30 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Preview:</span>
            <span>{isPreviewMode ? 'ON' : 'OFF'}</span>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full border border-rose-500/40 text-rose-300 hover:bg-rose-950/40 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            title="Sign out of Admin CMS"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile backdrop */}
        {mobileNavOpen && (
          <div
            onClick={() => setMobileNavOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-25 lg:hidden"
            aria-hidden="true"
          />
        )}

        {/* Left Sidebar Navigation */}
        <aside
          className={`fixed inset-y-16 left-0 z-30 w-64 bg-[#0C0C0C] border-r border-white/10 p-4 flex flex-col justify-between transition-transform duration-200 lg:static lg:translate-x-0 ${
            mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="space-y-1.5 overflow-y-auto pr-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#BBCCD7]/50 px-3 py-2">
              CMS Navigation
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
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#D7E2EA] text-[#0C0C0C] font-bold shadow-md'
                      : 'text-[#D7E2EA]/70 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#0C0C0C] text-[#D7E2EA] border border-[#D7E2EA]/40">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-white/10 text-[11px] text-[#BBCCD7]/60 px-3 space-y-0.5">
            <div className="text-white font-semibold uppercase">{hero.name}</div>
            <div className="truncate text-xs font-light">SSUET • Software Engineering</div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#0C0C0C] text-[#D7E2EA]">
          <div className="max-w-5xl mx-auto">
            {activeTab === 'overview' && <AdminDashboard onNavigateTab={setActiveTab} />}
            {activeTab === 'hero-about' && <AdminHeroAbout />}
            {activeTab === 'projects' && <AdminProjects initialSubTab="projects" onSelectTab={setActiveTab} />}
            {activeTab === 'case-studies' && <AdminProjects initialSubTab="case-studies" onSelectTab={setActiveTab} />}
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
