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
  AnalyticsData,
  MediaItem,
  SEOConfig,
  ActivityLog,
} from '../types';

export const initialHeroData: HeroData = {
  name: 'Zubair Mehmood',
  title: 'Software Engineering Student | Full-Stack Developer | Python Developer | AI Product Engineer',
  headline: 'Building practical software, intelligent products, and experiences that matter.',
  supportingBio: 'Software Engineering student with 2+ years of hands-on development experience. Dedicated to architecting responsive web applications, robust Python backends, and modern AI-driven solutions through project-centric engineering.',
  avatarUrl: '/images/zubair_portrait.jpg',
  availabilityStatus: 'Open to Engineering Roles & High-Impact Projects',
  resumeUrl: '#download-cv',
  socials: {
    github: 'https://github.com/ZubairMehmood059',
    linkedin: 'https://www.linkedin.com/in/zubair-mehmood-513470330',
    email: 'itszayn1379@gmail.com',
    phone: '+92 317 2606406',
  },
};

export const initialAboutData: AboutData = {
  biography: [
    "I am a Software Engineering student at Sir Syed University of Engineering & Technology (SSUET) in Karachi, Pakistan, currently in my 5th semester. With over 2 years of hands-on software development experience, I specialize in bridging intuitive frontend interfaces with reliable backend architecture.",
    "My technical journey is defined by pragmatic, project-focused execution. From creating responsive web applications and full-stack solutions to engineering Python backends, RESTful APIs, and exploring AI/ML product paradigms, I believe in learning through direct building and clean, scalable code craftsmanship."
  ],
  location: 'Karachi, Pakistan',
  institution: 'Sir Syed University of Engineering & Technology',
  degree: 'Bachelor of Science in Software Engineering',
  semester: '5th Semester',
  experienceYears: '2+ Years Hands-on Experience',
  learningFocus: [
    'Python',
    'AI/ML Fundamentals',
    'Backend Development',
    'REST APIs',
    'Software Architecture',
    'AI Voice & Automation'
  ],
  engineeringPhilosophy: {
    title: 'Project-Focused Craftsmanship',
    description: 'Theory solidifies when translated into working, resilient code. I emphasize pragmatic problem-solving, clean code separation, security by design, and shipping experiences that deliver measurable utility to real users.',
    coreValues: [
      'Build to Learn, Refactor to Scale',
      'User Experience & Accessibility First',
      'Maintainable, Modular Codebases',
      'Rigorous Version Control & Git Workflows'
    ]
  }
};

export const initialExperience: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Freelance Web Developer',
    company: 'Independent Contractor',
    period: '2024 – 2026',
    location: 'Pakistan',
    type: 'Freelance / Contract',
    description: 'Delivering modern, responsive web applications and client-facing interfaces for diverse web requirements with end-to-end frontend and client-side logic.',
    responsibilities: [
      'Engineered mobile-first, responsive websites and intuitive frontend user interfaces using modern HTML5, CSS3, and JavaScript.',
      'Developed interactive client-side forms with comprehensive validation, status feedback, and dynamic DOM manipulation.',
      'Implemented responsive grid and flexbox layouts ensuring seamless cross-browser compatibility and device accessibility.',
      'Integrated authentication workflows and client-side security measures for secure user interactions.',
      'Maintained version control and streamlined deployment pipelines using Git, GitHub, and cloud hosting platforms like Netlify.',
      'Collaborated closely with stakeholders to translate UI/UX wireframes into performant, production-ready web solutions.'
    ],
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'React', 'Git', 'GitHub', 'Netlify', 'REST APIs'],
    isPublished: true,
  }
];

export const initialSkills: SkillItem[] = [
  // Programming
  { id: 'sk-py', name: 'Python', category: 'Programming', proficiencyTier: 'Advanced', description: 'Core Python, object-oriented design, scripting, data handling, and backend services.', isPublished: true },
  { id: 'sk-js', name: 'JavaScript', category: 'Programming', proficiencyTier: 'Advanced', description: 'Modern ES6+, asynchronous programming, closures, DOM manipulation, and browser APIs.', isPublished: true },
  { id: 'sk-java', name: 'Java', category: 'Programming', proficiencyTier: 'Proficient', description: 'Object-oriented programming, data structures, and university-level algorithmic foundations.', isPublished: true },
  { id: 'sk-cpp', name: 'C++', category: 'Programming', proficiencyTier: 'Proficient', description: 'Memory management, pointers, object-oriented concepts, and algorithmic problem-solving.', isPublished: true },
  { id: 'sk-html', name: 'HTML5', category: 'Programming', proficiencyTier: 'Advanced', description: 'Semantic structure, accessibility standards (a11y), SEO-friendly markup, and modern forms.', isPublished: true },
  { id: 'sk-css', name: 'CSS3', category: 'Programming', proficiencyTier: 'Advanced', description: 'Modern CSS architecture, Flexbox, Grid, CSS animations, responsive queries, and variables.', isPublished: true },

  // Frontend
  { id: 'sk-react', name: 'React', category: 'Frontend', proficiencyTier: 'Advanced', description: 'Component lifecycle, hooks, state management, SPA architecture, and ecosystem integration.', isPublished: true },
  { id: 'sk-rwd', name: 'Responsive Web Design', category: 'Frontend', proficiencyTier: 'Advanced', description: 'Mobile-first workflows, fluid layouts, media queries, and touch-friendly UI patterns.', isPublished: true },
  { id: 'sk-dom', name: 'DOM / JavaScript', category: 'Frontend', proficiencyTier: 'Advanced', description: 'Dynamic element creation, event delegation, performance-optimized DOM manipulation.', isPublished: true },
  { id: 'sk-flex', name: 'Flexbox', category: 'Frontend', proficiencyTier: 'Advanced', description: 'Complex directional alignment, adaptive containers, and precise component spacing.', isPublished: true },
  { id: 'sk-uiux', name: 'UI/UX Development', category: 'Frontend', proficiencyTier: 'Proficient', description: 'Translating design concepts into intuitive, accessible, and aesthetically refined user interfaces.', isPublished: true },
  { id: 'sk-fe-arch', name: 'Frontend Architecture', category: 'Frontend', proficiencyTier: 'Proficient', description: 'Modular directory organization, reusable component patterns, and scalable frontend state.', isPublished: true },

  // Backend / AI
  { id: 'sk-be-py', name: 'Python Backend Development', category: 'Backend / AI', proficiencyTier: 'Proficient', description: 'Building server-side logic, routing, request parsing, and backend web services in Python.', isPublished: true },
  { id: 'sk-rest', name: 'REST APIs', category: 'Backend / AI', proficiencyTier: 'Proficient', description: 'Designing, consuming, and testing RESTful HTTP endpoints with clean JSON contracts.', isPublished: true },
  { id: 'sk-aiml', name: 'AI/ML Fundamentals', category: 'Backend / AI', proficiencyTier: 'Core', description: 'Foundational machine learning concepts, data preprocessing, model inference, and AI product integration.', isPublished: true },
  { id: 'sk-fb', name: 'Firebase', category: 'Backend / AI', proficiencyTier: 'Proficient', description: 'Real-time databases, Firestore collections, authentication flows, and security rules.', isPublished: true },

  // Tools
  { id: 'sk-git', name: 'Git', category: 'Tools', proficiencyTier: 'Advanced', description: 'Branching strategies, commit hygiene, rebasing, merge conflict resolution, and versioning.', isPublished: true },
  { id: 'sk-gh', name: 'GitHub', category: 'Tools', proficiencyTier: 'Advanced', description: 'Repository management, pull requests, issue tracking, and collaborative development workflows.', isPublished: true },
  { id: 'sk-vscode', name: 'VS Code', category: 'Tools', proficiencyTier: 'Advanced', description: 'Power usage, debugging environments, extensions configuration, and workflow automation.', isPublished: true },
  { id: 'sk-netlify', name: 'Netlify', category: 'Tools', proficiencyTier: 'Proficient', description: 'Continuous deployment, DNS routing, custom domains, and static hosting automation.', isPublished: true },
  { id: 'sk-ms', name: 'Microsoft Office', category: 'Tools', proficiencyTier: 'Proficient', description: 'Technical documentation, engineering reports, presentation decks, and analytical spreadsheets.', isPublished: true },
];

export const initialProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Netflix Clone',
    slug: 'netflix-clone',
    tagline: 'Modern cinematic streaming interface with real-time catalog browsing and video previews.',
    category: 'Frontend',
    imageUrl: '/images/netflix_clone.jpg',
    technologies: ['React', 'JavaScript', 'CSS3', 'REST APIs', 'Firebase', 'Netlify'],
    githubUrl: 'https://github.com/ZubairMehmood059/Netflix_Clone_Project',
    liveUrl: 'https://netflix-clone-zubair.netlify.app',
    isFeatured: true,
    status: 'Completed',
    isPublished: true,
    order: 1,
    caseStudy: {
      overview: 'A high-fidelity recreation of the Netflix web streaming platform, emphasizing cinematic visual hierarchy, fluid movie carousels, responsive video player modals, and clean state synchronization.',
      problem: 'Building a multimedia-dense web application that loads fluidly without stuttering, manages responsive banner states, and handles asynchronous movie data fetches cleanly.',
      approach: 'Constructed an organized React component architecture with segregated hooks for API data retrieval, custom video modal overlays, and CSS media queries optimized for mobile, tablet, and widescreen viewports.',
      keyFeatures: [
        'Dynamic hero banner spotlighting featured movies with instant trailer trigger',
        'Horizontal scrollable movie rows categorized by genres and trending metrics',
        'Interactive preview modal with synopsis, release dates, and rating metrics',
        'Responsive layout scaling flawlessly across desktop, tablet, and mobile screens',
        'Integrated client-side authentication and watchlist bookmarking logic'
      ],
      outcomes: [
        'Demonstrated strong mastery of modern frontend layout principles and asynchronous API handling',
        'Achieved sub-second initial render times with lazy-loaded media assets',
        'Received enthusiastic feedback for visual fidelity and interaction smoothness'
      ],
      galleryImages: ['/images/netflix_clone.jpg']
    }
  },
  {
    id: 'proj-2',
    title: 'TypeNova-X',
    slug: 'typenova-x',
    tagline: 'High-performance interactive speed-typing platform with live WPM calculation and accuracy diagnostics.',
    category: 'Full-Stack',
    imageUrl: '/images/typenovax.jpg',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'DOM Architecture', 'Local Persistence'],
    githubUrl: 'https://github.com/ZubairMehmood059/TypeNova-X',
    liveUrl: 'https://type-novax.netlify.app',
    isFeatured: true,
    status: 'Active',
    isPublished: true,
    order: 2,
    caseStudy: {
      overview: 'TypeNova-X is a dedicated developer-grade typing speed analyzer and accuracy benchmarking tool designed to measure keypress metrics, character accuracy rates, and typing rhythm in real time.',
      problem: 'Typing applications often suffer from input lag or inaccurate WPM calculations when relying on naively throttled listeners or heavy DOM re-rendering on every single keystroke.',
      approach: 'Engineered an ultra-low-latency event processing loop with virtual span tokenization for instant character-by-character validation, accurate time-delta WPM algorithms, and session statistics caching.',
      keyFeatures: [
        'Real-time Words Per Minute (WPM) and Net Accuracy gauge tracking',
        'Immediate visual feedback on correct, missed, and backspaced characters',
        'Multiple difficulty levels, programming syntax modes, and timed test durations',
        'Detailed performance scorecard with error breakdown and keystroke consistency charts',
        'Sleek dark-mode aesthetic with cybernetic accent styling'
      ],
      outcomes: [
        'Zero input delay during high-speed burst typing (>120 WPM tested)',
        'Comprehensive client-side history tracker enabling users to chart long-term progress',
        'Deepened understanding of low-level DOM event loops and high-frequency state updates'
      ],
      galleryImages: ['/images/typenovax.jpg']
    }
  },
  {
    id: 'proj-3',
    title: 'Digital Inheritance System',
    slug: 'digital-inheritance-system',
    tagline: 'Cryptographically protected digital asset and beneficiary succession protocol.',
    category: 'Security & Systems',
    imageUrl: '/images/digital_inheritance.jpg',
    technologies: ['Python', 'Software Architecture', 'REST APIs', 'Security', 'Database'],
    githubUrl: 'https://github.com/ZubairMehmood059/Digital_Inheritance_System',
    liveUrl: '',
    isFeatured: true,
    status: 'In Progress',
    isPublished: true,
    order: 3,
    caseStudy: {
      overview: 'A security-oriented digital estate and inheritance platform allowing individuals to catalog critical digital credentials, encrypted documents, and asset distribution policies for designated heirs upon verified trigger conditions.',
      problem: 'Modern individuals hold immense valuable digital property, access keys, and confidential assets with no safe, automated, or secure protocol to transition them to rightful beneficiaries without compromising custody during their lifetime.',
      approach: 'Architected a multi-layered verification system with inactivity heartbeats, multi-signature confirmations, encrypted payload storage, and designated beneficiary claim workflows.',
      keyFeatures: [
        'Secure asset registration with encrypted metadata storage',
        'Configurable check-in heartbeat triggers and grace period timers',
        'Multi-factor beneficiary verification and authorization pipeline',
        'Audit-logged state transitions and tamper-evident event recording',
        'Python backend services handling verification and automated dispatch triggers'
      ],
      outcomes: [
        'Applied core software engineering principles to a critical real-world problem domain',
        'Designed modular RESTful endpoints and strict access control mechanisms',
        'Formed the foundation for academic research in automated digital asset succession'
      ],
      galleryImages: ['/images/digital_inheritance.jpg']
    }
  },
  {
    id: 'proj-4',
    title: 'Nexa-Homes-Grid',
    slug: 'nexa-homes-grid',
    tagline: 'Modern responsive real estate grid architecture and property discovery platform.',
    category: 'Frontend',
    imageUrl: '/images/web_utilities.jpg',
    technologies: ['React', 'JavaScript', 'HTML5', 'CSS Grid', 'Flexbox', 'Responsive Design'],
    githubUrl: 'https://github.com/ZubairMehmood059/Nexa-Homes-Grid',
    liveUrl: '',
    isFeatured: true,
    status: 'Completed',
    isPublished: true,
    order: 4,
    caseStudy: {
      overview: 'Nexa-Homes-Grid is an architectural real estate browsing and property listing grid engineered with modern CSS Grid layouts, interactive filtering parameters, and fluid property cards designed for seamless discovery.',
      problem: 'Real estate portals frequently struggle with cluttered layouts, rigid grids that break on intermediate screen sizes, and slow filter responses during extensive property browsing.',
      approach: 'Developed a modular, component-driven UI utilizing CSS Grid template areas, responsive media queries, high-contrast typography, and intuitive filter criteria to deliver a fast, frictionless property search experience.',
      keyFeatures: [
        'Dynamic multi-column responsive grid adapting seamlessly to any viewport',
        'Interactive property search and categorized filtering by price, location, and property type',
        'Property feature badges, high-resolution visual cards, and pricing breakdown indicators',
        'Clean modern architectural design language with smooth hover animations',
        'Accessible, keyboard-navigable structure and optimized asset loading'
      ],
      outcomes: [
        'Engineered resilient responsive layouts with 100% adherence to CSS Grid best practices',
        'Delivered an elegant, high-converting property discovery UI with zero visual layout shift',
        'Showcases strong expertise in modern frontend styling and responsive UI architecture'
      ],
      galleryImages: ['/images/web_utilities.jpg']
    }
  }
];

export const initialEducation: EducationItem[] = [
  {
    id: 'edu-1',
    institution: 'Sir Syed University of Engineering & Technology (SSUET)',
    degree: 'Bachelor of Science in Software Engineering',
    period: 'Oct 2024 – Present',
    details: 'Currently in 5th Semester. Core coursework includes Software Architecture, Data Structures & Algorithms, Object-Oriented Software Engineering, Database Systems, Operating Systems, and Web Technologies.',
    isPublished: true,
  },
  {
    id: 'edu-2',
    institution: 'Adamjee Government Science College',
    degree: 'HSC – Pre-Engineering',
    period: '2022 – 2024',
    details: 'Higher Secondary Certificate with focus on Advanced Mathematics, Physics, and Chemistry. Built rigorous analytical and problem-solving foundations.',
    isPublished: true,
  },
  {
    id: 'edu-3',
    institution: 'Rose House School',
    degree: 'SSC – Biology & Science',
    period: '2020 – 2022',
    details: 'Secondary School Certificate. Graduated with academic excellence in Science and General Mathematics.',
    isPublished: true,
  }
];

export const initialCertifications: CertificationItem[] = [
  {
    id: 'cert-1',
    title: 'ACIT (Advanced Certificate in Information Technology)',
    issuer: 'FC Collegiate',
    year: '2023',
    credentialUrl: 'https://fccollegiate.edu.pk/verify',
    imageUrl: '',
    isPublished: true,
  },
  {
    id: 'cert-2',
    title: 'Web Development Certification',
    issuer: 'Al-Khidmah',
    year: '2024',
    credentialUrl: 'https://alkhidmat.org/education',
    imageUrl: '',
    isPublished: true,
  }
];

export const initialFocusNodes: FocusNode[] = [
  { id: 'fn-1', title: 'Full-Stack Applications', category: 'Full-Stack', description: 'Architecting end-to-end web apps combining modern React frontends with resilient APIs.', status: 'In Production', icon: 'Layers' },
  { id: 'fn-2', title: 'Python Ecosystem', category: 'Backend & APIs', description: 'Deepening core Python mechanics, concurrency, object models, and backend performance.', status: 'Deep Dive', icon: 'Terminal' },
  { id: 'fn-3', title: 'Backend Development', category: 'Backend & APIs', description: 'Designing relational database models, authentication flows, and microservice patterns.', status: 'Active Learning', icon: 'Server' },
  { id: 'fn-4', title: 'AI/ML Fundamentals', category: 'AI & ML', description: 'Exploring machine learning pipelines, predictive models, embeddings, and intelligent agents.', status: 'Active Learning', icon: 'Cpu' },
  { id: 'fn-5', title: 'REST APIs', category: 'Backend & APIs', description: 'Standardizing API contracts, status codes, pagination, security rate-limits, and documentation.', status: 'In Production', icon: 'Network' },
  { id: 'fn-6', title: 'Software Architecture', category: 'Architecture', description: 'Studying SOLID principles, clean code structure, domain-driven design, and decoupled systems.', status: 'Deep Dive', icon: 'Compass' },
  { id: 'fn-7', title: 'Scalable Systems', category: 'Architecture', description: 'Understanding caching strategies, load distribution, database indexing, and resilience.', status: 'Active Learning', icon: 'ShieldCheck' },
  { id: 'fn-8', title: 'AI Voice Agent / Automation', category: 'AI & ML', description: 'Experimenting with speech-to-text, real-time conversational agents, and automated workflows.', status: 'Deep Dive', icon: 'Bot' },
];

export const initialMessages: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@techinnovate.io',
    subject: 'Opportunity: Full-Stack Engineer Role',
    message: 'Hi Zubair, I came across your Type-NovaX and Netflix clone projects. Very impressed with your clean code and UI execution. We have an opening for a software engineering position that aligns well with your background. Would love to connect!',
    createdAt: '2026-09-12T14:20:00Z',
    isRead: false,
    isStarred: true,
    isArchived: false,
  },
  {
    id: 'msg-2',
    name: 'Ahmed Tariq',
    email: 'ahmed.tariq@devpk.org',
    subject: 'Collaboration on Digital Inheritance System',
    message: 'Assalam o Alaikum Zubair, I saw your Digital Inheritance System repository on GitHub. Are you planning on making this open-source for community contributions? Would love to help on the cryptography backend.',
    createdAt: '2026-09-10T09:15:00Z',
    isRead: true,
    isStarred: false,
    isArchived: false,
  }
];

export const initialThemeConfig: ThemeConfig = {
  preset: 'midnight-cyan',
  primaryColor: '#06b6d4',
  accentColor: '#3b82f6',
  cardStyle: 'glass',
  borderRadius: 'lg',
  buttonStyle: 'gradient',
};

export const initialAnalytics: AnalyticsData = {
  totalVisits: 1420,
  uniqueVisitors: 980,
  projectViews: {
    'netflix-clone': 580,
    'type-novax': 490,
    'digital-inheritance-system': 310,
    'nexa-homes-grid': 220,
  },
  cvDownloads: 146,
  contactSubmissions: 28,
  referrers: [
    { source: 'GitHub Profile', count: 540 },
    { source: 'LinkedIn Direct', count: 420 },
    { source: 'Direct / Portfolio URL', count: 310 },
    { source: 'Google Search', count: 150 },
  ],
  devices: [
    { type: 'Desktop / Laptop', percentage: 68 },
    { type: 'Mobile Smartphone', percentage: 27 },
    { type: 'Tablet', percentage: 5 },
  ],
  browsers: [
    { name: 'Chrome', percentage: 62 },
    { name: 'Safari', percentage: 19 },
    { name: 'Firefox', percentage: 11 },
    { name: 'Edge', percentage: 8 },
  ],
  recentVisits: [
    { timestamp: 'Just now', page: 'Projects', device: 'Desktop' },
    { timestamp: '4 mins ago', page: 'Hero / Home', device: 'Mobile' },
    { timestamp: '12 mins ago', page: 'Case Study: Type-NovaX', device: 'Desktop' },
    { timestamp: '28 mins ago', page: 'About', device: 'Desktop' },
  ]
};

export const initialMedia: MediaItem[] = [
  { id: 'med-1', name: 'zubair_portrait.jpg', url: '/images/zubair_portrait.jpg', size: '614 KB', uploadedAt: '2026-09-14', type: 'image/jpeg', inUseBy: ['Hero Section', 'About Section'] },
  { id: 'med-2', name: 'netflix_clone.jpg', url: '/images/netflix_clone.jpg', size: '723 KB', uploadedAt: '2026-09-14', type: 'image/jpeg', inUseBy: ['Project: Netflix Clone'] },
  { id: 'med-3', name: 'typenovax.jpg', url: '/images/typenovax.jpg', size: '766 KB', uploadedAt: '2026-09-14', type: 'image/jpeg', inUseBy: ['Project: Type-NovaX'] },
  { id: 'med-4', name: 'digital_inheritance.jpg', url: '/images/digital_inheritance.jpg', size: '626 KB', uploadedAt: '2026-09-14', type: 'image/jpeg', inUseBy: ['Project: Digital_Inheritance_System'] },
  { id: 'med-5', name: 'web_utilities.jpg', url: '/images/web_utilities.jpg', size: '493 KB', uploadedAt: '2026-09-14', type: 'image/jpeg', inUseBy: ['Project: Nexa-Homes-Grid'] },
];

export const initialSEO: SEOConfig = {
  metaTitle: 'Zubair Mehmood | Software Engineering Student & Full-Stack Developer - Zubair.dev',
  metaDescription: 'Official portfolio of Zubair Mehmood — Software Engineering Student, Full-Stack Developer, Python Developer, and AI Product Engineer based in Karachi, Pakistan.',
  keywords: 'Zubair Mehmood, Zubair.dev, Software Engineer, Full-Stack Developer, Python, AI Product Engineer, Karachi, Pakistan, React, SSUET',
  ogTitle: 'Zubair Mehmood | Software Engineering Student & Full-Stack Developer - Zubair.dev',
  ogDescription: 'Building practical software, intelligent products, and experiences that matter. Portfolio of Zubair Mehmood.',
  ogImageUrl: '/images/zubair_portrait.jpg',
  canonicalUrl: 'https://zubair.dev',
  robotsIndexing: true,
};

export const initialActivityLogs: ActivityLog[] = [
  { id: 'log-1', action: 'Published Project Case Study', user: 'Zubair Mehmood (Owner)', timestamp: 'Today at 10:15 AM', details: 'Updated Type-NovaX case study metrics' },
  { id: 'log-2', action: 'Theme Updated', user: 'Zubair Mehmood (Owner)', timestamp: 'Yesterday', details: 'Applied Midnight Cyan theme preset' },
  { id: 'log-3', action: 'Added Certification', user: 'Zubair Mehmood (Owner)', timestamp: '3 days ago', details: 'Verified Web Development certificate by Al-Khidmah' },
  { id: 'log-4', action: 'Resume Updated', user: 'Zubair Mehmood (Owner)', timestamp: '1 week ago', details: 'Synchronized 5th semester education milestones' },
];
