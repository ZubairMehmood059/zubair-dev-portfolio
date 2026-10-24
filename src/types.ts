export type ThemeMode =
  | 'chrome-noir'
  | 'titanium-luxury'
  | 'pure-monochrome'
  | 'emerald-matrix'
  | 'amber-solar'
  | 'crimson-cyber';

export interface ThemeConfig {
  preset: ThemeMode;
  primaryColor: string;
  accentColor: string;
  cardStyle: 'glass' | 'solid' | 'bordered';
  borderRadius: string;
  buttonStyle: 'gradient' | 'glow' | 'minimal';
  customColors?: {
    primary?: string;
    accent?: string;
  };
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  phone?: string;
  twitter?: string;
}

export interface HeroData {
  name: string;
  title: string;
  headline: string;
  supportingBio: string;
  avatarUrl: string;
  availabilityStatus: string;
  resumeUrl: string;
  socials: SocialLinks;
}

export interface AboutData {
  biography: string[];
  location: string;
  institution: string;
  degree: string;
  semester: string;
  experienceYears: string;
  learningFocus: string[];
  engineeringPhilosophy: {
    title: string;
    description: string;
    coreValues: string[];
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  isPublished: boolean;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Programming' | 'Frontend' | 'Backend / AI' | 'Tools';
  proficiencyTier: 'Core' | 'Proficient' | 'Advanced' | 'Exploring';
  description: string;
  iconName?: string;
  isPublished: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  category: 'Full-Stack' | 'Frontend' | 'Security & Systems' | 'Utilities';
  imageUrl: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  isFeatured: boolean;
  status: 'Completed' | 'In Progress' | 'Active';
  isPublished: boolean;
  order: number;
  caseStudy: {
    overview: string;
    problem: string;
    approach: string;
    keyFeatures: string[];
    outcomes?: string[];
    galleryImages?: string[];
  };
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  details?: string;
  isPublished: boolean;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
  imageUrl?: string;
  isPublished: boolean;
}

export interface FocusNode {
  id: string;
  title: string;
  category: 'Architecture' | 'AI & ML' | 'Full-Stack' | 'Backend & APIs';
  description: string;
  status: 'Active Learning' | 'In Production' | 'Deep Dive';
  icon: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  isStarred: boolean;
  isArchived: boolean;
}

export interface AnalyticsData {
  totalVisits: number;
  uniqueVisitors: number;
  projectViews: Record<string, number>;
  cvDownloads: number;
  contactSubmissions: number;
  referrers: { source: string; count: number }[];
  devices: { type: string; percentage: number }[];
  browsers: { name: string; percentage: number }[];
  recentVisits: { timestamp: string; page: string; device: string }[];
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: string;
  uploadedAt: string;
  type: string;
  inUseBy?: string[];
}

export interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string | string[];
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
  canonicalUrl: string;
  robotsIndexing: boolean;
  author?: string;
  title?: string;
  description?: string;
  ogImage?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'Owner' | 'Editor';
  name: string;
  twoFactorEnabled: boolean;
  lastLogin: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  timestamp: string;
  user: string;
  details: string;
}
