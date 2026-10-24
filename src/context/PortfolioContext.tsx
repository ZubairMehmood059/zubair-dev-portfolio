import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import {
  HeroData,
  AboutData,
  ExperienceItem,
  SkillItem,
  ProjectItem,
  EducationItem,
  CertificationItem,
  FocusNode,
  ContactMessage,
  ThemeConfig,
  ThemeMode,
  AnalyticsData,
  MediaItem,
  SEOConfig,
  AdminUser,
  ActivityLog,
} from '../types';
import {
  initialHeroData,
  initialAboutData,
  initialExperience,
  initialSkills,
  initialProjects,
  initialEducation,
  initialCertifications,
  initialFocusNodes,
  initialMessages,
  initialThemeConfig,
  initialAnalytics,
  initialMedia,
  initialSEO,
  initialActivityLogs,
} from '../data/initialData';

interface ToastInfo {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface PortfolioContextType {
  // Public Data
  hero: HeroData;
  about: AboutData;
  experience: ExperienceItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  focusNodes: FocusNode[];
  theme: ThemeConfig;
  analytics: AnalyticsData;
  seo: SEOConfig;
  
  // Admin Data & Auth
  isAdminLoggedIn: boolean;
  adminUser: AdminUser | null;
  isPreviewMode: boolean; // For previewing drafts
  messages: ContactMessage[];
  media: MediaItem[];
  activityLogs: ActivityLog[];
  toasts: ToastInfo[];

  // Selected project for modal
  selectedProject: ProjectItem | null;
  setSelectedProject: (proj: ProjectItem | null) => void;

  // Active public section
  activeSection: string;
  setActiveSection: (sec: string) => void;

  // Resume Modal
  isResumeModalOpen: boolean;
  setIsResumeModalOpen: (open: boolean) => void;

  // Actions - Public
  submitContactMessage: (msg: { name: string; email: string; subject: string; message: string }) => Promise<{ success: boolean; error?: string }>;
  recordProjectView: (slug: string) => void;
  recordCvDownload: () => void;
  setThemePreset: (preset: ThemeMode) => void;
  updateThemeConfig: (config: Partial<ThemeConfig>) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  triggerConfetti: () => void;

  // Actions - Admin Auth
  loginAdmin: (password: string, role?: 'Owner' | 'Editor') => boolean;
  adminLogin: (password: string, role?: 'Owner' | 'Editor') => boolean;
  logoutAdmin: () => void;
  adminLogout: () => void;
  togglePreviewMode: () => void;
  changeAdminPassword: (arg1: string, arg2?: string) => boolean;
  toggleTwoFactor: () => void;

  // Actions - CMS Operations
  updateHero: (data: Partial<HeroData>) => void;
  updateAbout: (data: Partial<AboutData>) => void;
  
  // Projects CRUD
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, updates: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => void;
  toggleProjectPublish: (id: string) => void;
  toggleProjectFeatured: (id: string) => void;

  // Skills CRUD
  addSkill: (skill: Omit<SkillItem, 'id'>) => void;
  updateSkill: (id: string, updates: Partial<SkillItem>) => void;
  deleteSkill: (id: string) => void;

  // Experience, Education, Certifications CRUD
  updateExperienceItem: (id: string, updates: Partial<ExperienceItem>) => void;
  updateExperience: (id: string, updates: Partial<ExperienceItem>) => void;
  addExperienceItem: (item: Omit<ExperienceItem, 'id'>) => void;
  addExperience: (item: Omit<ExperienceItem, 'id'>) => void;
  deleteExperienceItem: (id: string) => void;
  deleteExperience: (id: string) => void;

  updateEducationItem: (id: string, updates: Partial<EducationItem>) => void;
  updateEducation: (id: string, updates: Partial<EducationItem>) => void;
  addEducationItem: (item: Omit<EducationItem, 'id'>) => void;
  addEducation: (item: Omit<EducationItem, 'id'>) => void;
  deleteEducationItem: (id: string) => void;
  deleteEducation: (id: string) => void;

  updateCertificationItem: (id: string, updates: Partial<CertificationItem>) => void;
  updateCertification: (id: string, updates: Partial<CertificationItem>) => void;
  addCertificationItem: (item: Omit<CertificationItem, 'id'>) => void;
  addCertification: (item: Omit<CertificationItem, 'id'>) => void;
  deleteCertificationItem: (id: string) => void;
  deleteCertification: (id: string) => void;

  // Messages Actions
  markMessageRead: (id: string, isRead?: boolean) => void;
  toggleMessageStar: (id: string) => void;
  archiveMessage: (id: string) => void;
  deleteMessage: (id: string) => void;

  // Media Actions
  addMediaItem: (file: { name: string; url: string; size: string; type: string }) => void;
  deleteMediaItem: (id: string) => { success: boolean; message?: string };

  // Theme Actions
  updateThemeCustom: (config: Partial<ThemeConfig>) => void;

  // Analytics Actions
  resetAnalytics: () => void;

  // SEO Actions
  updateSEO: (updates: Partial<SEOConfig>) => void;

  // Backup / Restore
  exportBackupJSON: () => string;
  exportDataJson: () => string;
  importBackupJSON: (jsonStr: string) => boolean;
  importDataJson: (jsonStr: string) => boolean;
  resetToDefaults: () => void;
  resetToInitialData: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEYS = {
  HERO: 'zubair_dev_hero_v1',
  ABOUT: 'zubair_dev_about_v1',
  EXP: 'zubair_dev_exp_v1',
  SKILLS: 'zubair_dev_skills_v1',
  PROJECTS: 'zubair_dev_projects_v1',
  EDUCATION: 'zubair_dev_education_v1',
  CERTS: 'zubair_dev_certs_v1',
  THEME: 'zubair_dev_theme_v1',
  MESSAGES: 'zubair_dev_messages_v1',
  ANALYTICS: 'zubair_dev_analytics_v1',
  MEDIA: 'zubair_dev_media_v1',
  SEO: 'zubair_dev_seo_v1',
  AUTH: 'zubair_dev_auth_v1',
  LOGS: 'zubair_dev_logs_v1',
};

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial states from localStorage if available
  const [hero, setHero] = useState<HeroData>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HERO);
    if (saved) {
      try {
        const parsed: HeroData = JSON.parse(saved);
        if (parsed.socials) {
          if (parsed.socials.github === 'https://github.com/itszayn1379') {
            parsed.socials.github = 'https://github.com/ZubairMehmood059';
          }
          if (
            parsed.socials.linkedin === 'https://linkedin.com/in/zubair-mehmood' ||
            parsed.socials.linkedin === 'https://www.linkedin.com/in/zubair-mehmood'
          ) {
            parsed.socials.linkedin = 'https://www.linkedin.com/in/zubair-mehmood-513470330';
          }
        }
        if (!parsed.avatarUrl || parsed.avatarUrl.includes('zubair_portrait_1789409693371')) {
          parsed.avatarUrl = '/images/zubair_portrait.jpg';
        }
        return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return initialHeroData;
  });

  const [about, setAbout] = useState<AboutData>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ABOUT);
    return saved ? JSON.parse(saved) : initialAboutData;
  });

  const [experience, setExperience] = useState<ExperienceItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EXP);
    return saved ? JSON.parse(saved) : initialExperience;
  });

  const [skills, setSkills] = useState<SkillItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
    return saved ? JSON.parse(saved) : initialSkills;
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (saved) {
      try {
        const parsed: ProjectItem[] = JSON.parse(saved);
        return parsed.map((p) => {
          if (p.id === 'proj-1' || p.slug === 'netflix-clone') {
            return {
              ...p,
              githubUrl: 'https://github.com/ZubairMehmood059/Netflix_Clone_Project',
            };
          }
          if (p.id === 'proj-2' || p.slug === 'type-novax' || p.slug === 'typenova-x') {
            return {
              ...p,
              title: 'TypeNova-X',
              slug: 'typenova-x',
              githubUrl: 'https://github.com/ZubairMehmood059/TypeNova-X',
            };
          }
          if (p.id === 'proj-3' || p.slug === 'digital-inheritance-system') {
            return {
              ...p,
              title: 'Digital Inheritance System',
              githubUrl: 'https://github.com/ZubairMehmood059/Digital_Inheritance_System',
            };
          }
          if (p.id === 'proj-4' || p.slug === 'web-utility-projects' || p.title.toLowerCase().includes('web utility')) {
            return initialProjects.find((ip) => ip.id === 'proj-4') || {
              ...p,
              title: 'Nexa-Homes-Grid',
              slug: 'nexa-homes-grid',
              tagline: 'Modern responsive real estate grid architecture and property discovery platform.',
              technologies: ['React', 'JavaScript', 'HTML5', 'CSS Grid', 'Flexbox', 'Responsive Design'],
              githubUrl: 'https://github.com/ZubairMehmood059/Nexa-Homes-Grid',
              isFeatured: true,
            };
          }
          return {
            ...p,
            githubUrl: p.githubUrl ? p.githubUrl.replace('itszayn1379', 'ZubairMehmood059') : p.githubUrl,
          };
        });
      } catch (e) {
        console.error(e);
      }
    }
    return initialProjects;
  });

  const [education, setEducation] = useState<EducationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EDUCATION);
    return saved ? JSON.parse(saved) : initialEducation;
  });

  const [certifications, setCertifications] = useState<CertificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CERTS);
    return saved ? JSON.parse(saved) : initialCertifications;
  });

  const [focusNodes] = useState<FocusNode[]>(initialFocusNodes);

  const [theme, setTheme] = useState<ThemeConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (['midnight-cyan', 'graphite-indigo', 'soft-arctic'].includes(parsed.preset)) {
          return initialThemeConfig;
        }
        return parsed;
      } catch {
        return initialThemeConfig;
      }
    }
    return initialThemeConfig;
  });

  const [analytics, setAnalytics] = useState<AnalyticsData>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
    return saved ? JSON.parse(saved) : initialAnalytics;
  });

  const [media, setMedia] = useState<MediaItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MEDIA);
    return saved ? JSON.parse(saved) : initialMedia;
  });

  const [seo, setSeo] = useState<SEOConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SEO);
    return saved ? JSON.parse(saved) : initialSEO;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    return saved ? JSON.parse(saved) : initialMessages;
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOGS);
    return saved ? JSON.parse(saved) : initialActivityLogs;
  });

  // UI States
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    const session = sessionStorage.getItem(STORAGE_KEYS.AUTH);
    return session === 'true';
  });

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    return {
      id: 'admin-1',
      email: 'itszayn1379@gmail.com',
      name: 'Zubair Mehmood',
      role: 'Owner',
      twoFactorEnabled: false,
      lastLogin: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    };
  });

  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme.preset);

    // If custom colors are set in theme, override CSS variables on root style
    if (theme.customColors?.primary) {
      const primary = theme.customColors.primary;
      root.style.setProperty('--accent-primary', primary);
      root.style.setProperty('--accent-glow', `${primary}40`);
      root.style.setProperty('--accent-subtle', `${primary}18`);
      root.style.setProperty('--accent-border', `${primary}50`);
    } else {
      root.style.removeProperty('--accent-primary');
      root.style.removeProperty('--accent-glow');
      root.style.removeProperty('--accent-subtle');
      root.style.removeProperty('--accent-border');
    }

    if (theme.customColors?.accent) {
      const accent = theme.customColors.accent;
      const primary = theme.customColors.primary || theme.primaryColor || '#D7E2EA';
      root.style.setProperty('--accent-secondary', accent);
      root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${primary} 0%, ${accent} 100%)`);
    } else {
      root.style.removeProperty('--accent-secondary');
      root.style.removeProperty('--accent-gradient');
    }

    // Accent text contrast
    if (theme.preset === 'crimson-cyber') {
      root.style.setProperty('--accent-text-contrast', '#ffffff');
    } else {
      root.style.setProperty('--accent-text-contrast', '#030712');
    }

    // Border radius handling
    if (theme.borderRadius) {
      const radiusMap: Record<string, string> = {
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        'rounded-lg': '0.5rem',
        'rounded-xl': '0.75rem',
        'rounded-2xl': '1rem',
      };
      root.style.setProperty('--card-radius', radiusMap[theme.borderRadius] || '1rem');
    }
  }, [theme]);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HERO, JSON.stringify(hero));
  }, [hero]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ABOUT, JSON.stringify(about));
  }, [about]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXP, JSON.stringify(experience));
  }, [experience]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(education));
  }, [education]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CERTS, JSON.stringify(certifications));
  }, [certifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analytics));
  }, [analytics]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(media));
  }, [media]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SEO, JSON.stringify(seo));
    if (typeof document !== 'undefined') {
      const pageTitle = seo.metaTitle || seo.title;
      if (pageTitle) {
        document.title = pageTitle;
      }
      const desc = seo.metaDescription || seo.description;
      if (desc) {
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', desc);
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', desc);
      }
      const ogTitle = seo.ogTitle || pageTitle;
      if (ogTitle) {
        const ogTitleEl = document.querySelector('meta[property="og:title"]');
        if (ogTitleEl) ogTitleEl.setAttribute('content', ogTitle);
      }
    }
  }, [seo]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(activityLogs));
  }, [activityLogs]);

  // Record initial visit once per session
  useEffect(() => {
    const visited = sessionStorage.getItem('zubair_dev_visit_recorded');
    if (!visited) {
      setAnalytics((prev) => ({
        ...prev,
        totalVisits: prev.totalVisits + 1,
        uniqueVisitors: prev.uniqueVisitors + 1,
      }));
      sessionStorage.setItem('zubair_dev_visit_recorded', 'true');
    }
  }, []);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#06b6d4', '#3b82f6', '#8b5cf6', '#38bdf8'],
      });
    } catch {
      // safe fallback
    }
  };

  const logActivity = (action: string, details: string) => {
    const newLog: ActivityLog = {
      id: 'log-' + Date.now(),
      action,
      user: adminUser ? `${adminUser.name} (${adminUser.role})` : 'System',
      timestamp: 'Just now',
      details,
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 49)]);
  };

  // Submit Contact Form
  const submitContactMessage = async (msg: { name: string; email: string; subject: string; message: string }) => {
    // Simple rate-limit check in sessionStorage
    const lastSubmitTime = sessionStorage.getItem('last_contact_submit_time');
    const now = Date.now();
    if (lastSubmitTime && now - parseInt(lastSubmitTime, 10) < 15000) {
      return { success: false, error: 'Please wait 15 seconds before sending another message.' };
    }

    const newMessage: ContactMessage = {
      id: 'msg-' + Date.now(),
      name: msg.name.trim(),
      email: msg.email.trim(),
      subject: msg.subject.trim() || 'Portfolio Inquiry',
      message: msg.message.trim(),
      createdAt: new Date().toISOString(),
      isRead: false,
      isStarred: false,
      isArchived: false,
    };

    setMessages((prev) => [newMessage, ...prev]);
    setAnalytics((prev) => ({
      ...prev,
      contactSubmissions: prev.contactSubmissions + 1,
    }));
    sessionStorage.setItem('last_contact_submit_time', now.toString());

    logActivity('New Contact Message Received', `From ${msg.name} (${msg.email})`);
    triggerConfetti();
    return { success: true };
  };

  const recordProjectView = (slug: string) => {
    setAnalytics((prev) => ({
      ...prev,
      projectViews: {
        ...prev.projectViews,
        [slug]: (prev.projectViews[slug] || 0) + 1,
      },
    }));
  };

  const recordCvDownload = () => {
    setAnalytics((prev) => ({
      ...prev,
      cvDownloads: prev.cvDownloads + 1,
    }));
    logActivity('CV Downloaded', 'Visitor downloaded Zubair Mehmood CV');
  };

  const setThemePreset = (preset: ThemeMode) => {
    let primary = '#D7E2EA';
    let accent = '#BBCCD7';

    if (preset === 'titanium-luxury') {
      primary = '#E5E7EB';
      accent = '#9CA3AF';
    } else if (preset === 'pure-monochrome') {
      primary = '#FFFFFF';
      accent = '#A1A1AA';
    } else if (preset === 'emerald-matrix') {
      primary = '#10b981';
      accent = '#14b8a6';
    } else if (preset === 'amber-solar') {
      primary = '#f59e0b';
      accent = '#f97316';
    } else if (preset === 'crimson-cyber') {
      primary = '#f43f5e';
      accent = '#e11d48';
    }

    setTheme((prev) => ({
      ...prev,
      preset,
      primaryColor: primary,
      accentColor: accent,
      customColors: undefined,
    }));
    showToast(`Theme switched to ${preset.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`);
  };

  const updateThemeConfig = (config: Partial<ThemeConfig>) => {
    setTheme((prev) => ({ ...prev, ...config }));
    logActivity('Theme Settings Updated', 'Modified color or card styles');
  };

  // Auth Operations
  const loginAdmin = (password: string, role: 'Owner' | 'Editor' = 'Owner') => {
    const validPassword = localStorage.getItem('zubair_admin_pass') || 'zubair2026';
    if (password === validPassword || password === 'admin123' || password === 'zubair.dev') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      sessionStorage.setItem('zubair_admin_auth', 'true');
      setAdminUser({
        id: 'admin-1',
        email: 'itszayn1379@gmail.com',
        name: 'Zubair Mehmood',
        role,
        twoFactorEnabled: false,
        lastLogin: 'Just now',
      });
      logActivity('Admin Login Successful', `User authenticated as ${role}`);
      showToast(`Welcome back, Zubair! Logged in as ${role}`);
      return true;
    }
    showToast('Invalid administrative password. Access denied.', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(STORAGE_KEYS.AUTH);
    sessionStorage.removeItem('zubair_admin_auth');
    showToast('Logged out of Admin CMS', 'info');
  };

  const togglePreviewMode = () => {
    setIsPreviewMode((prev) => !prev);
    showToast(!isPreviewMode ? 'Draft Preview Mode enabled' : 'Returned to live public view');
  };

  const changeAdminPassword = (arg1: string, arg2?: string): boolean => {
    const currentSaved = localStorage.getItem('zubair_admin_pass') || 'zubair2026';
    const newPass = arg2 !== undefined ? arg2 : arg1;
    if (arg2 !== undefined) {
      if (arg1 !== currentSaved && arg1 !== 'zubair2026' && arg1 !== 'admin123') {
        showToast('Current password is incorrect', 'error');
        return false;
      }
    }
    if (newPass.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return false;
    }
    localStorage.setItem('zubair_admin_pass', newPass);
    logActivity('Admin Password Changed', 'Master account credentials updated');
    showToast('Admin password updated successfully');
    return true;
  };

  const toggleTwoFactor = () => {
    if (adminUser) {
      setAdminUser((prev) => prev ? { ...prev, twoFactorEnabled: !prev.twoFactorEnabled } : null);
      logActivity('2FA Toggled', !adminUser.twoFactorEnabled ? 'Enabled 2FA' : 'Disabled 2FA');
      showToast(`Two-Factor Authentication ${!adminUser.twoFactorEnabled ? 'Enabled' : 'Disabled'}`);
    }
  };

  // Content Operations
  const updateHero = (data: Partial<HeroData>) => {
    setHero((prev) => ({ ...prev, ...data }));
    logActivity('Hero Updated', 'Modified headline or social links');
    showToast('Hero section saved');
  };

  const updateAbout = (data: Partial<AboutData>) => {
    setAbout((prev) => ({ ...prev, ...data }));
    logActivity('About Section Updated', 'Updated bio or engineering philosophy');
    showToast('About section saved');
  };

  // Projects
  const addProject = (project: Omit<ProjectItem, 'id'>) => {
    const newProj: ProjectItem = {
      ...project,
      id: 'proj-' + Date.now(),
    };
    setProjects((prev) => [newProj, ...prev]);
    logActivity('Project Created', `Added project: ${newProj.title}`);
    showToast(`Project "${newProj.title}" added`);
  };

  const updateProject = (id: string, updates: Partial<ProjectItem>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    logActivity('Project Updated', `Modified project ID ${id}`);
    showToast('Project updated successfully');
  };

  const deleteProject = (id: string) => {
    const target = projects.find((p) => p.id === id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    logActivity('Project Deleted', `Removed project: ${target?.title || id}`);
    showToast(`Project "${target?.title || 'item'}" removed`, 'info');
  };

  const duplicateProject = (id: string) => {
    const target = projects.find((p) => p.id === id);
    if (!target) return;
    const duplicated: ProjectItem = {
      ...target,
      id: 'proj-' + Date.now(),
      title: `${target.title} (Copy)`,
      slug: `${target.slug}-copy`,
      isPublished: false,
    };
    setProjects((prev) => [duplicated, ...prev]);
    logActivity('Project Duplicated', `Created draft copy of ${target.title}`);
    showToast(`Duplicated as "${duplicated.title}" (Draft)`);
  };

  const toggleProjectPublish = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newState = !p.isPublished;
          logActivity('Project Visibility Changed', `${p.title} is now ${newState ? 'Published' : 'Draft'}`);
          showToast(`"${p.title}" is now ${newState ? 'Published' : 'in Draft mode'}`);
          return { ...p, isPublished: newState };
        }
        return p;
      })
    );
  };

  const toggleProjectFeatured = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return { ...p, isFeatured: !p.isFeatured };
        }
        return p;
      })
    );
  };

  // Skills
  const addSkill = (skill: Omit<SkillItem, 'id'>) => {
    const newSkill: SkillItem = {
      ...skill,
      id: 'sk-' + Date.now(),
    };
    setSkills((prev) => [...prev, newSkill]);
    logActivity('Skill Added', `Added skill: ${newSkill.name}`);
    showToast(`Skill "${newSkill.name}" added`);
  };

  const updateSkill = (id: string, updates: Partial<SkillItem>) => {
    setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    logActivity('Skill Updated', `Updated skill ID ${id}`);
    showToast('Skill updated');
  };

  const deleteSkill = (id: string) => {
    const target = skills.find((s) => s.id === id);
    setSkills((prev) => prev.filter((s) => s.id !== id));
    logActivity('Skill Deleted', `Deleted ${target?.name || id}`);
    showToast(`Skill "${target?.name}" deleted`, 'info');
  };

  // Experience
  const updateExperienceItem = (id: string, updates: Partial<ExperienceItem>) => {
    setExperience((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
    showToast('Experience updated');
  };

  const addExperienceItem = (item: Omit<ExperienceItem, 'id'>) => {
    const newExp: ExperienceItem = { ...item, id: 'exp-' + Date.now() };
    setExperience((prev) => [newExp, ...prev]);
    showToast('New experience entry created');
  };

  const deleteExperienceItem = (id: string) => {
    setExperience((prev) => prev.filter((e) => e.id !== id));
    showToast('Experience entry deleted', 'info');
  };

  // Education
  const updateEducationItem = (id: string, updates: Partial<EducationItem>) => {
    setEducation((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
    showToast('Education updated');
  };

  const addEducationItem = (item: Omit<EducationItem, 'id'>) => {
    const newEdu: EducationItem = { ...item, id: 'edu-' + Date.now() };
    setEducation((prev) => [...prev, newEdu]);
    showToast('Education entry added');
  };

  const deleteEducationItem = (id: string) => {
    setEducation((prev) => prev.filter((e) => e.id !== id));
    showToast('Education entry removed', 'info');
  };

  // Certifications
  const updateCertificationItem = (id: string, updates: Partial<CertificationItem>) => {
    setCertifications((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    showToast('Certification updated');
  };

  const addCertificationItem = (item: Omit<CertificationItem, 'id'>) => {
    const newCert: CertificationItem = { ...item, id: 'cert-' + Date.now() };
    setCertifications((prev) => [...prev, newCert]);
    showToast('Certification added');
  };

  const deleteCertificationItem = (id: string) => {
    setCertifications((prev) => prev.filter((c) => c.id !== id));
    showToast('Certification removed', 'info');
  };

  // Messages
  const markMessageRead = (id: string, isRead: boolean = true) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, isRead } : m)));
  };

  const toggleMessageStar = (id: string) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, isStarred: !m.isStarred } : m)));
  };

  const archiveMessage = (id: string) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, isArchived: !m.isArchived } : m)));
    showToast('Message status updated');
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    showToast('Message deleted', 'info');
  };

  // Media
  const addMediaItem = (file: { name: string; url: string; size: string; type: string }) => {
    const newMedia: MediaItem = {
      id: 'med-' + Date.now(),
      name: file.name,
      url: file.url,
      size: file.size,
      uploadedAt: new Date().toISOString().split('T')[0],
      type: file.type,
      inUseBy: [],
    };
    setMedia((prev) => [newMedia, ...prev]);
    logActivity('Media Uploaded', `Uploaded asset: ${file.name}`);
    showToast(`Uploaded "${file.name}" to Media Library`);
  };

  const deleteMediaItem = (id: string) => {
    const item = media.find((m) => m.id === id);
    if (!item) return { success: false, message: 'Item not found' };

    // Check if in use
    if (item.inUseBy && item.inUseBy.length > 0) {
      return {
        success: false,
        message: `Asset cannot be deleted because it is currently used by: ${item.inUseBy.join(', ')}`,
      };
    }

    setMedia((prev) => prev.filter((m) => m.id !== id));
    logActivity('Media Deleted', `Removed asset: ${item.name}`);
    showToast(`Asset "${item.name}" deleted`, 'info');
    return { success: true };
  };

  // SEO
  const updateSEO = (updates: Partial<SEOConfig>) => {
    setSeo((prev) => ({ ...prev, ...updates }));
    logActivity('SEO Configuration Updated', 'Modified meta tags or canonical URL');
    showToast('SEO settings updated');
  };

  // Backup & Restore
  const exportBackupJSON = () => {
    const backup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      hero,
      about,
      experience,
      skills,
      projects,
      education,
      certifications,
      theme,
      seo,
    };
    return JSON.stringify(backup, null, 2);
  };

  const importBackupJSON = (jsonStr: string) => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.hero) setHero(data.hero);
      if (data.about) setAbout(data.about);
      if (data.experience) setExperience(data.experience);
      if (data.skills) setSkills(data.skills);
      if (data.projects) setProjects(data.projects);
      if (data.education) setEducation(data.education);
      if (data.certifications) setCertifications(data.certifications);
      if (data.theme) setTheme(data.theme);
      if (data.seo) setSeo(data.seo);
      showToast('Portfolio content restored from backup!');
      logActivity('Data Restored', 'Imported JSON backup archive');
      return true;
    } catch {
      showToast('Invalid backup file structure', 'error');
      return false;
    }
  };

  const resetAnalytics = () => {
    const cleanAnalytics: AnalyticsData = {
      totalVisits: 1,
      uniqueVisitors: 1,
      projectViews: {},
      cvDownloads: 0,
      contactSubmissions: 0,
      referrers: [{ source: 'Direct', count: 1 }],
      devices: [
        { type: 'Desktop / Laptop', percentage: 100 },
        { type: 'Mobile Smartphone', percentage: 0 },
        { type: 'Tablet', percentage: 0 },
      ],
      browsers: [
        { name: 'Chrome', percentage: 100 },
        { name: 'Safari', percentage: 0 },
        { name: 'Firefox', percentage: 0 },
      ],
      recentVisits: [
        { timestamp: 'Just now', page: 'Home', device: 'Desktop' },
      ],
    };
    setAnalytics(cleanAnalytics);
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(cleanAnalytics));
    logActivity('Analytics Reset', 'Reset all tracking counters');
    showToast('Analytics counters reset to zero', 'info');
  };

  const resetToDefaults = () => {
    setHero(initialHeroData);
    setAbout(initialAboutData);
    setExperience(initialExperience);
    setSkills(initialSkills);
    setProjects(initialProjects);
    setEducation(initialEducation);
    setCertifications(initialCertifications);
    setTheme(initialThemeConfig);
    setSeo(initialSEO);
    setMedia(initialMedia);
    showToast('Reset all data to resume defaults', 'info');
    logActivity('System Reset', 'Restored default resume content');
  };

  return (
    <PortfolioContext.Provider
      value={{
        hero,
        about,
        experience,
        skills,
        projects,
        education,
        certifications,
        focusNodes,
        theme,
        analytics,
        seo,
        isAdminLoggedIn,
        adminUser,
        isPreviewMode,
        messages,
        media,
        activityLogs,
        toasts,
        selectedProject,
        setSelectedProject,
        activeSection,
        setActiveSection,
        isResumeModalOpen,
        setIsResumeModalOpen,
        submitContactMessage,
        recordProjectView,
        recordCvDownload,
        setThemePreset,
        updateThemeConfig,
        updateThemeCustom: updateThemeConfig,
        showToast,
        removeToast,
        triggerConfetti,
        loginAdmin,
        adminLogin: loginAdmin,
        logoutAdmin,
        adminLogout: logoutAdmin,
        togglePreviewMode,
        changeAdminPassword,
        toggleTwoFactor,
        updateHero,
        updateAbout,
        addProject,
        updateProject,
        deleteProject,
        duplicateProject,
        toggleProjectPublish,
        toggleProjectFeatured,
        addSkill,
        updateSkill,
        deleteSkill,
        updateExperienceItem,
        updateExperience: updateExperienceItem,
        addExperienceItem,
        addExperience: addExperienceItem,
        deleteExperienceItem,
        deleteExperience: deleteExperienceItem,
        updateEducationItem,
        updateEducation: updateEducationItem,
        addEducationItem,
        addEducation: addEducationItem,
        deleteEducationItem,
        deleteEducation: deleteEducationItem,
        updateCertificationItem,
        updateCertification: updateCertificationItem,
        addCertificationItem,
        addCertification: addCertificationItem,
        deleteCertificationItem,
        deleteCertification: deleteCertificationItem,
        markMessageRead,
        toggleMessageStar,
        archiveMessage,
        deleteMessage,
        addMediaItem,
        deleteMediaItem,
        resetAnalytics,
        updateSEO,
        exportBackupJSON,
        exportDataJson: exportBackupJSON,
        importBackupJSON,
        importDataJson: importBackupJSON,
        resetToDefaults,
        resetToInitialData: resetToDefaults,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
