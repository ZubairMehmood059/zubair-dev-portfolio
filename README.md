# Zubair.dev — Software Engineer Portfolio & Admin CMS

A high-performance, dark-mode-first developer portfolio and full-featured headless CMS created for **Zubair Mehmood** (Software Engineering Student, Full-Stack Developer, Python Developer, and AI Product Engineer).

Built with **React 19, TypeScript, Vite, and Tailwind CSS 4**, featuring a dynamic CSS variable-based multi-theme engine, persistent client-side state with export/import capabilities, and a password-protected Admin CMS dashboard for complete control over all content, projects, experience, skills, and visual themes.

---

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Folder Structure](#folder-structure)
- [Prerequisites & Node Version](#prerequisites--node-version)
- [Installation & Quick Start](#installation--quick-start)
- [Available Scripts](#available-scripts)
- [Environment Variables Setup](#environment-variables-setup)
- [Admin Authentication & First Login](#admin-authentication--first-login)
- [Theme Engine & Appearance Customization](#theme-engine--appearance-customization)
- [Content Management & Local Persistence](#content-management--local-persistence)
- [Building for Production & Deployment](#building-for-production--deployment)
- [License](#license)

---

## Features

### 🌐 Public Portfolio
- **Modern Dark UI**: Engineered with custom Syne display typography, Plus Jakarta Sans body font, and Fira Code mono accents.
- **Hero & Interactive Badges**: Quick stats counters, active status indicator, and direct CTAs.
- **Dynamic Projects Showcase**: Live search filtering, categorized tags (Full-Stack, Python, AI/ML, Mobile), "Featured Only" toggle, and interactive Project Details modal with screenshots and GitHub/Demo links.
- **Experience & Education Timeline**: Chronological journey featuring SSUET degree, tech stacks, and career milestones.
- **Interactive Skills Grid**: Categorized proficiencies with interactive level meters and years of experience.
- **Certifications & Accreditations**: Verified credentials with issuing authority and credential verification links.
- **Interactive Resume Modal**: Print or download a clean developer resume directly in the browser.
- **Contact Portal & Message Transmitter**: Responsive contact form with input validation, success feedback, and fallback persistence directly to the CMS inbox.

### 🛡️ Admin CMS Panel (`/admin`)
- **Protected Access**: Role-based access control (Owner & Editor roles) with password authentication.
- **Full CRUD Management**: Edit Hero data, About section, Projects, Experience milestones, Education items, Certifications, and Skills.
- **Message Inbox**: View and manage all contact form inquiries submitted through the website.
- **Theme & Appearance Engine**: Centrally switch global themes or set custom hex colors and card border-radius tokens.
- **Live Preview Mode**: Test changes in a draft mode before publishing.
- **Data Export & Import**: Backup the entire portfolio database to JSON and restore anytime.

---

## Technology Stack

- **Framework**: React 19 (Functional Components, Custom Hooks, React Context API)
- **Language**: TypeScript 5.8 (Strict type safety)
- **Build Tool**: Vite 6 (Ultra-fast HMR and optimized production bundling)
- **Styling**: Tailwind CSS 4 (via `@tailwindcss/vite`) + Custom CSS Variables
- **Icons**: `lucide-react`
- **Animations**: `motion` (framer-motion v12) + `canvas-confetti`
- **Fonts**: Syne, Plus Jakarta Sans, Fira Code (Google Fonts)

---

## Folder Structure

```
.
├── index.html                   # Entry HTML file with SEO & OpenGraph meta tags
├── metadata.json                # Project identity and platform configuration
├── package.json                 # Project dependencies and script declarations
├── vite.config.ts               # Vite configuration with Tailwind CSS plugin
├── tsconfig.json                # TypeScript compiler configuration
├── .env.example                 # Environment variables template
├── README.md                    # Project documentation
├── public/                      # Static assets served at root
│   └── images/                  # Portfolio avatars, project previews, & diagrams
│       ├── zubair_portrait.jpg
│       ├── project_ai_tutor.png
│       ├── project_rag_search.png
│       ├── project_ecommerce.png
│       ├── project_devmatch.png
│       ├── architecture_diagram.png
│       └── ssuet_campus.png
└── src/
    ├── main.tsx                 # Application entry point
    ├── App.tsx                  # Root layout, section orchestrator, & Admin switch
    ├── index.css                # Global styles, Tailwind imports, & CSS Theme variables
    ├── types.ts                 # Central TypeScript interfaces, types, & theme definitions
    ├── context/
    │   └── PortfolioContext.tsx # Central CMS state manager, local persistence, & theme provider
    ├── components/              # Public portfolio components
    │   ├── Navbar.tsx           # Sticky navigation with mobile drawer & admin trigger
    │   ├── Hero.tsx             # Hero section with headline, CTAs, & live metrics
    │   ├── About.tsx            # Engineering philosophy, story, & personal background
    │   ├── Experience.tsx       # Career trajectory timeline & milestone achievements
    │   ├── Skills.tsx           # Skill categorization with proficiency indicators
    │   ├── Projects.tsx         # Filterable project gallery with live search
    │   ├── ProjectModal.tsx     # Deep-dive modal with screenshots & repository links
    │   ├── Education.tsx        # Degree, university information, & coursework
    │   ├── Certifications.tsx   # Verified professional certificates
    │   ├── CurrentFocus.tsx     # Current research & learning pursuits
    │   ├── Contact.tsx          # Interactive message form & direct social links
    │   ├── Footer.tsx           # Brand signoff, social shortcuts, & quick navigation
    │   └── ResumeModal.tsx      # Printable & downloadable developer CV modal
    └── components/admin/        # Protected Admin CMS components
        ├── AdminLayout.tsx      # Admin header, sidebar tabs, session status, & logout
        ├── AdminLoginModal.tsx  # Password authentication dialog
        ├── AdminDashboard.tsx   # High-level overview, analytics, & quick actions
        ├── AdminHero.tsx        # CMS editor for Hero section & social links
        ├── AdminAbout.tsx       # CMS editor for Bio, highlights, and status
        ├── AdminProjects.tsx    # Add, edit, delete, and reorder projects
        ├── AdminExperience.tsx  # Manage work history and internship entries
        ├── AdminSkills.tsx      # Manage technical skill categories and proficiencies
        ├── AdminEducation.tsx   # Manage university degrees and academic achievements
        ├── AdminCertifications.tsx # Manage verified industry certifications
        ├── AdminMessages.tsx    # Review, mark as read, or delete contact submissions
        ├── AdminThemes.tsx      # Global theme selector & custom color calibration
        └── AdminSettings.tsx    # Password changer, JSON database export/import, & reset
```

---

## Prerequisites & Node Version

- **Node.js**: `v18.0.0` or higher (`v20.x` or `v22.x` recommended)
- **Package Manager**: `npm` (v9 or higher), `pnpm`, or `yarn`

---

## Installation & Quick Start

1. **Clone or Extract the Source Code**:
   ```bash
   # Extract the provided ZIP archive and navigate to the project directory
   unzip zubair-portfolio-complete.zip -d zubair-portfolio
   cd zubair-portfolio
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   ```bash
   cp .env.example .env
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Available Scripts

In the project root, you can run:

- `npm run dev` — Runs the application in development mode on port 3000.
- `npm run build` — Compiles TypeScript and creates an optimized static build in the `dist/` directory.
- `npm run preview` — Serves the production build locally for testing.
- `npm run lint` — Validates TypeScript types across the entire project (`tsc --noEmit`).
- `npm run clean` — Removes `dist/` artifacts.

---

## Environment Variables Setup

Create a `.env` file in the project root based on `.env.example`:

```env
# Application Base URL
VITE_APP_URL="http://localhost:3000"

# Admin Authentication
# Default password used for the Admin Portal login
VITE_ADMIN_DEFAULT_PASSWORD="zubair2026"

# Contact Form Integration (Optional)
# Optional webhook or API endpoint to receive submitted messages
VITE_CONTACT_API_ENDPOINT=""
VITE_CONTACT_RECEIVER_EMAIL="zubair.dev@example.com"
```

---

## Admin Authentication & First Login

The portfolio includes an integrated headless Admin CMS that enables you to update every section of the website without editing code.

### How to Access the Admin Panel:
1. Click the **Shield icon** located in the top navigation bar (or press `Ctrl + Shift + A` / scroll to footer and click the Admin Portal link).
2. The authentication modal will prompt for your administrator password.

### Default Credentials:
- **Default Password**: `zubair2026` (or `admin123`)
- **Default Role**: `Owner`

### How to Change the Admin Password:
1. Log into the Admin CMS.
2. In the Admin sidebar, navigate to **Settings**.
3. Under **Security & Password Management**, enter your new password and click **Save Password**.
4. The new password will immediately take effect and persist in your browser's persistent storage.

---

## Theme Engine & Appearance Customization

The theme selector has been intentionally moved out of the public navbar to provide a consistent, cohesive brand identity for visitors. **Theme switching is controlled exclusively inside the Admin Panel**.

### Changing Themes:
1. Open the Admin Panel (`/admin`).
2. Select **Theme Engine** (`/admin/themes`) in the sidebar.
3. Choose from **6 distinct theme presets**:
   - **Midnight Cyan (Default)** — Navy graphite canvas with electric cyan and sky blue glows.
   - **Graphite Indigo** — Dark slate with indigo and purple accents.
   - **Soft Arctic** — Arctic charcoal with sky blue and mint accents.
   - **Emerald Matrix** — Cyber forest noir with neon emerald tones.
   - **Amber Solar** — Obsidian bronze with solar amber and warm sunset orange rays.
   - **Crimson Cyber** — High-contrast stealth noir with crimson rose highlights.
4. **Custom Color Calibration**:
   - You can also specify custom primary, secondary, and border colors using the color picker or hex input fields.
   - Adjust container border radius from `sm` to `2xl`.
5. When a theme is selected, it immediately updates the CSS variables on `document.documentElement` (`--bg-primary`, `--accent-primary`, `--accent-gradient`, `--accent-text-contrast`, etc.) and persists automatically.

---

## Content Management & Local Persistence

The portfolio utilizes a client-side architecture backed by `localStorage` with initial fallback data:
- **Zero-Config Deployment**: No SQL database or cloud account setup required to run immediately.
- **Offline Capable**: All edits you make in the Admin CMS are saved automatically.
- **Database Backup & Migration**: Under **Admin > Settings**, you can click **Export Database (JSON)** at any time to download a complete backup of all portfolio data. To migrate to another machine, simply click **Import Database** and upload the JSON file.

---

## Building for Production & Deployment

### Build the Static Site:
```bash
npm run build
```
This generates an optimized, minified production bundle inside the `dist/` directory.

### Deploying:
The output in `dist/` is a standard Single Page Application (SPA) compatible with any static hosting platform:
- **Vercel**: Deploy with zero configuration. Set build command `npm run build` and output directory `dist`.
- **Netlify**: Set build command `npm run build` and publish directory `dist`.
- **Cloudflare Pages / GitHub Pages**: Deploy the `dist` folder.
- **Docker / Cloud Run**: Can be served using Nginx, Caddy, or standard Node static file servers.

---

## Verification Checklist

- [x] Public portfolio loads with zero console errors
- [x] Navbar navigation smoothly scrolls to all sections
- [x] Projects filter by category, search term, and featured status
- [x] Project and Resume modals open, render, and close seamlessly
- [x] Contact form submits and persists message to Admin Inbox
- [x] Admin login authenticates with `zubair2026`
- [x] Protected admin routes and editing tabs function properly
- [x] Theme switching inside `/admin/themes` instantly updates the entire website
- [x] Build script (`npm run build`) runs cleanly with zero TypeScript errors

---

© 2026 Zubair Mehmood — [Zubair.dev](https://zubair.dev). All rights reserved.
