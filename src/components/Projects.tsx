import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { LiveProjectButton, FadeIn } from './common/MotionComponents';
import { Github, Info } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectStackData {
  number: string;
  category: string;
  title: string;
  description: string;
  liveUrl?: string;
  githubUrl?: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
  originalProject?: ProjectItem;
}

const ProjectCard: React.FC<{
  project: ProjectStackData;
  index: number;
  totalCards: number;
  onOpenDetails: (item?: ProjectItem) => void;
}> = ({ project, index, totalCards, onOpenDetails }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] flex items-center justify-center sticky top-20 sm:top-24 md:top-32 mb-12 sm:mb-16 select-none"
    >
      <motion.div
        style={{
          scale,
          top: `${index * 28}px`,
        }}
        className="w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between gap-4 sm:gap-6 relative z-10 transition-shadow duration-300"
      >
        {/* Top Row: Number, category label, project name, and action buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 sm:pb-6">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Huge Number */}
            <span
              className="font-black text-[#D7E2EA] leading-none shrink-0"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#BBCCD7]/70">
                {project.category}
              </span>
              <h3
                className="font-bold uppercase text-white tracking-tight"
                style={{ fontSize: 'clamp(1.2rem, 3vw, 2.4rem)' }}
              >
                {project.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {project.originalProject && (
              <button
                onClick={() => onOpenDetails(project.originalProject)}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 text-[#D7E2EA] text-xs font-mono uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
                title="View Technical Details & Specs"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Specs</span>
              </button>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="p-2 sm:p-2.5 rounded-full border border-[#D7E2EA]/40 text-[#D7E2EA] hover:border-white hover:text-white hover:bg-white/10 transition-colors"
                title="GitHub Code"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            <LiveProjectButton
              label="Live Project"
              href={project.liveUrl || project.githubUrl}
              onClick={
                !project.liveUrl && !project.githubUrl
                  ? () => onOpenDetails(project.originalProject)
                  : undefined
              }
            />
          </div>
        </div>

        {/* Bottom Row: Two-column image grid (40% left, 60% right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-6 items-stretch">
          {/* Left Column (40% width / 5 cols) has 2 stacked images */}
          <div className="md:col-span-5 flex flex-col gap-3 sm:gap-4">
            <div
              className="w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden bg-[#161616] border border-white/10 shadow-lg relative group"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            >
              <img
                src={project.col1Image1}
                alt={`${project.title} Preview Top`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div
              className="w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden bg-[#161616] border border-white/10 shadow-lg relative group"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            >
              <img
                src={project.col1Image2}
                alt={`${project.title} Preview Bottom`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right Column (60% width / 7 cols) has 1 tall image */}
          <div className="md:col-span-7 h-[280px] sm:h-[350px] md:h-full min-h-[280px] sm:min-h-[350px] md:min-h-[460px] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden bg-[#161616] border border-white/10 shadow-lg relative group">
            <img
              src={project.col2Image}
              alt={`${project.title} Full Showcase`}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Projects: React.FC = () => {
  const { projects, setSelectedProject, recordProjectView } = usePortfolio();

  // Map Zubair's verified projects to the 3D Creator high-contrast stacked visual matrix
  const stackProjects: ProjectStackData[] = [
    {
      number: '01',
      category: 'Full-Stack Streaming',
      title: 'Netflix Clone',
      description: 'Cinematic streaming platform with responsive catalog browsing and video previews.',
      githubUrl: 'https://github.com/ZubairMehmood059/Netflix_Clone_Project',
      liveUrl: 'https://github.com/ZubairMehmood059/Netflix_Clone_Project',
      col1Image1:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      col1Image2: '/images/netflix_clone.jpg',
      col2Image:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
      originalProject: projects.find((p) => p.id === 'proj-1' || p.slug === 'netflix-clone'),
    },
    {
      number: '02',
      category: 'Interactive Benchmark',
      title: 'TypeNova-X',
      description: 'High-performance interactive speed-typing platform with real-time WPM calculation.',
      githubUrl: 'https://github.com/ZubairMehmood059/TypeNova-X',
      liveUrl: 'https://github.com/ZubairMehmood059/TypeNova-X',
      col1Image1:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      col1Image2: '/images/typenovax.jpg',
      col2Image:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
      originalProject: projects.find((p) => p.id === 'proj-2' || p.slug === 'typenova-x'),
    },
    {
      number: '03',
      category: 'Cryptographic Protocol',
      title: 'Digital Inheritance System',
      description: 'Decentralized succession and digital estate planning protocol.',
      githubUrl: 'https://github.com/ZubairMehmood059/Digital_Inheritance_System',
      liveUrl: 'https://github.com/ZubairMehmood059/Digital_Inheritance_System',
      col1Image1:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      col1Image2: '/images/digital_inheritance.jpg',
      col2Image:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
      originalProject: projects.find((p) => p.id === 'proj-3' || p.slug === 'digital-inheritance-system'),
    },
    {
      number: '04',
      category: 'CSS Grid Architecture',
      title: 'Nexa-Homes-Grid',
      description: 'Modern responsive real estate grid architecture and property discovery platform.',
      githubUrl: 'https://github.com/ZubairMehmood059/Nexa-Homes-Grid',
      liveUrl: 'https://github.com/ZubairMehmood059/Nexa-Homes-Grid',
      col1Image1:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      col1Image2: '/images/web_utilities.jpg',
      col2Image:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      originalProject: projects.find((p) => p.id === 'proj-4' || p.slug === 'nexa-homes-grid'),
    },
  ];

  const handleOpenDetails = (item?: ProjectItem) => {
    if (item) {
      setSelectedProject(item);
      recordProjectView(item.id);
    }
  };

  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <FadeIn delay={0} y={40} duration={0.8}>
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-24"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Project
          </h2>
        </FadeIn>

        {/* Sticky-Stacking Project Cards Container */}
        <div className="flex flex-col relative">
          {stackProjects.map((proj, idx) => (
            <ProjectCard
              key={proj.number}
              project={proj}
              index={idx}
              totalCards={stackProjects.length}
              onOpenDetails={handleOpenDetails}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
