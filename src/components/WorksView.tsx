import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { PointerArrowBackground } from './PointerArrowBackground';

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  links: { label: string; url: string }[];
}

interface ExperienceItem {
  role: string;
  company: string;
  timeline: string;
  summary: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'akiko-pay',
    title: 'Akiko Pay',
    description:
      'Payment Application for Web & Android serving 10+ banking partnerships, achieving 95% task success rate on core transactions and reducing user error rates by 22% via AI-driven audits.',
    image: '/src/assets/images/akiko_mockup_1787681280596.jpg',
    links: [
      { label: 'Case Study', url: 'https://www.behance.net/rudranshpanigrahi' },
      { label: 'Play Store', url: 'https://play.google.com' },
    ],
  },
  {
    id: 'upi-soundbox',
    title: 'UPI Soundbox Management System',
    description:
      'White-label management web portal engineered for 15+ national banks (Bank of Baroda, IDBI, PNB) managing 250,000+ UPI Soundbox hardware lifecycles and automated settlement.',
    image: '/src/assets/images/soundbox_mockup_1787681313190.jpg',
    links: [
      { label: 'Case Study', url: 'https://www.behance.net/rudranshpanigrahi' },
      { label: 'Figma Preview', url: 'https://rudransh.figma.site' },
    ],
  },
  {
    id: 'axis-bank-csc-kbs',
    title: 'Axis Bank CSC KBS',
    description:
      'Unified banking knowledge base and service workflow terminal empowering 50,000+ rural correspondents across India with centralized design system.',
    image: '/src/assets/images/axis_kbs_mockup_1787681300454.jpg',
    links: [
      { label: 'Case Study', url: 'https://www.behance.net/rudranshpanigrahi' },
      { label: 'Design System', url: 'https://rudransh.figma.site' },
    ],
  },
  {
    id: 'chamberly',
    title: 'Chamberly',
    description:
      'Mental health platform serving 5,000+ users. Shipped 20+ interface improvements increasing Daily Active Users (DAU) by 15% and improving 30-day user retention by 10%.',
    image: '/src/assets/images/chamberly_mockup_1787681326014.jpg',
    links: [
      { label: 'Case Study', url: 'https://www.behance.net/rudranshpanigrahi' },
      { label: 'App Store', url: 'https://apps.apple.com' },
    ],
  },
  {
    id: 'autonomous-agents',
    title: 'Autonomous Design-to-Code',
    description:
      'Multi-platform automated tokens and design handoff pipelines bridging Figma MCP, Claude, Lovable, and Bolt.new for 3x design-to-code velocity.',
    image: '/src/assets/images/photo_workspace_1787680551895.jpg',
    links: [
      { label: 'Request Access', url: 'mailto:rudransh116@gmail.com' },
    ],
  },
];

const SKILLS_LIST = [
  'UI/UX Design & Product Engineering (Design Systems, WCAG 2.1)',
  'Prototyping & Visual (Figma, Axure, Whimsical, Adobe Creative Suite)',
  'AI Product Engineering (Figma MCP + Claude, Lovable, Framer, Bolt.new)',
  'Data-Driven UX Audits, User Research & Usability Testing',
];

const EXPERIENCE_LIST: ExperienceItem[] = [
  {
    role: 'UIUX Designer & Product Engineer',
    company: 'iServeU',
    timeline: 'December 2023 – August 2026',
    summary:
      'Spearheaded multi-platform financial applications across 10+ banking partnerships serving 100,000+ users across India. Redesigned 20+ legacy projects with a centralized Design System, cutting hand-off time by 40% and accelerating design-to-code velocity by 3x.',
  },
  {
    role: 'UIUX Designer (Part-time)',
    company: 'Chamberly AB',
    timeline: 'May 2024 – July 2024',
    summary:
      'Led UI/UX design initiatives for mental health platform serving 5,000+ users. Shipped 20+ interface improvements that increased DAU by 15% and boosted 30-day retention by 10% through optimized onboarding flows.',
  },
];

interface WorksViewProps {
  onBackToHome: () => void;
  onNavigateToContact: () => void;
}

export const WorksView: React.FC<WorksViewProps> = ({
  onBackToHome,
  onNavigateToContact,
}) => {
  // Active selected project (default first on desktop)
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(PROJECTS_DATA[0]);

  const handleSelectProject = (project: ProjectItem) => {
    if (activeProject?.id === project.id) {
      setActiveProject(project);
    } else {
      setActiveProject(project);
    }
  };

  const handleCloseProject = () => {
    setActiveProject(null);
  };

  return (
    <div className="relative z-10 w-full min-h-[calc(100vh-100px)] flex flex-col justify-between px-4 sm:px-10 md:px-16 lg:px-24 py-6 sm:py-8 text-white select-none">
      {/* Dark mode pointer arrow background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <PointerArrowBackground theme="dark" gridSpacing={52} />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col justify-between space-y-12 sm:space-y-14 text-center">
        
        {/* TOP SECTION: Projects Header & Interactive Showcase */}
        <div className="w-full flex flex-col items-center">
          {/* Projects Title Header (Centered) */}
          <div className="flex items-baseline justify-center gap-3 pt-2 pb-2 sm:pb-3 w-full">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-editorial font-normal tracking-tight text-white">
              Projects
            </h1>
            <span className="text-2xl sm:text-3xl md:text-4xl font-editorial text-white/90 font-normal">
              (5+)
            </span>
          </div>

          {/* Solid White Line Divider */}
          <div className="w-full h-[1.5px] bg-white/95 mb-6 sm:mb-8" />

          {/* DESKTOP LAYOUT (lg:): Side-by-Side Showcase */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start w-full text-left">
            {/* Left Column: Project List */}
            <div className={`${activeProject ? 'lg:col-span-4' : 'lg:col-span-12'} space-y-4 transition-all duration-300`}>
              {PROJECTS_DATA.map((project) => {
                const isActive = activeProject?.id === project.id;
                return (
                  <div key={project.id} className="relative">
                    <button
                      onClick={() => handleSelectProject(project)}
                      className="w-full text-left py-1 cursor-pointer transition-colors duration-200 group block"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xl sm:text-2xl tracking-tight transition-colors ${
                            isActive
                              ? 'font-bold text-white'
                              : 'font-normal text-neutral-300 group-hover:text-white'
                          }`}
                        >
                          {project.title}
                        </span>

                        {isActive ? (
                          <ArrowRight className="w-5 h-5 text-white" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>

                      {/* Underline: Solid if active, Dashed if inactive */}
                      {isActive ? (
                        <div className="w-full h-[1.5px] bg-white mt-1.5" />
                      ) : (
                        <div className="w-full border-b border-dashed border-neutral-600 group-hover:border-neutral-400 transition-colors mt-1.5" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Active Project Details & Mockup */}
            <AnimatePresence mode="wait">
              {activeProject && (
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-1"
                >
                  {/* Mockup Card (Desktop) */}
                  <div className="md:col-span-6 rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-900 border border-neutral-800 shadow-2xl relative">
                    <img
                      src={activeProject.image}
                      alt={activeProject.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Description & Links */}
                  <div className="md:col-span-6 flex flex-col justify-between min-h-[220px] space-y-6 text-left">
                    <div>
                      <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                        {activeProject.description}
                      </p>
                    </div>

                    <div className="space-y-3.5">
                      {activeProject.links.map((link, idx) => (
                        <div key={idx} className="relative group inline-block w-full">
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between py-0.5 text-base sm:text-lg text-white hover:text-pink-300 transition-colors cursor-pointer"
                          >
                            <span>{link.label}</span>
                            <ArrowUpRight className="w-4 h-4 text-white group-hover:text-pink-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                          <div className="w-full h-[1px] bg-white/80 group-hover:bg-pink-300 transition-colors mt-0.5" />
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={handleCloseProject}
                        className="text-xs sm:text-sm font-medium text-rose-500 hover:text-rose-400 transition-colors cursor-pointer underline-offset-4 hover:underline px-1 py-0.5"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RESPONSIVE ACCORDION (<lg) - Centered structure, images hidden on mobile */}
          <div className="lg:hidden space-y-4 w-full text-left">
            {PROJECTS_DATA.map((project) => {
              const isActive = activeProject?.id === project.id;
              return (
                <div key={project.id} className="relative">
                  <button
                    onClick={() => {
                      if (isActive) {
                        handleCloseProject();
                      } else {
                        handleSelectProject(project);
                      }
                    }}
                    className="w-full text-left py-1 cursor-pointer transition-colors duration-200 group block"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xl sm:text-2xl tracking-tight transition-colors ${
                          isActive
                            ? 'font-bold text-white'
                            : 'font-normal text-neutral-300 group-hover:text-white'
                        }`}
                      >
                        {project.title}
                      </span>

                      {isActive ? (
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      ) : (
                        <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-600 group-hover:text-neutral-300" />
                      )}
                    </div>

                    {/* Underline: Solid if active, Dashed if inactive */}
                    {isActive ? (
                      <div className="w-full h-[1.5px] bg-white mt-1.5" />
                    ) : (
                      <div className="w-full border-b border-dashed border-neutral-600 group-hover:border-neutral-400 transition-colors mt-1.5" />
                    )}
                  </button>

                  {/* Nested Details directly underneath project item (Images hidden on mobile) */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pt-3 pb-2 space-y-3"
                      >
                        {/* Mockup Image - Shown on tablet (sm:), hidden on mobile phone (<sm) */}
                        <div className="hidden sm:block rounded-xl overflow-hidden aspect-[16/10] bg-neutral-900 border border-neutral-800 shadow-xl">
                          <img
                            src={project.image}
                            alt={project.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light text-left">
                          {project.description}
                        </p>

                        {/* Action Link Buttons (e.g. Case Study, Play Store) */}
                        <div className="space-y-2.5 pt-1">
                          {project.links.map((link, idx) => (
                            <div key={idx} className="relative group inline-block w-full">
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between py-0.5 text-sm sm:text-base text-white hover:text-pink-300 transition-colors"
                              >
                                <span>{link.label}</span>
                                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                              </a>
                              <div className="w-full h-[1px] bg-white/80 mt-0.5" />
                            </div>
                          ))}
                        </div>

                        {/* Close button matching AI chatbox style */}
                        <div className="flex justify-end pt-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCloseProject();
                            }}
                            className="text-xs sm:text-sm font-medium text-rose-500 hover:text-rose-400 transition-colors cursor-pointer underline-offset-4 hover:underline px-1 py-0.5"
                          >
                            Close
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

        {/* BOTTOM SECTION: Skills & Experience Columns (Center-aligned headers & layouts) */}
        <div className="pt-6 sm:pt-8 pb-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 text-left">
            
            {/* Skills Column */}
            <div className="flex flex-col">
              <div className="flex justify-center md:justify-start w-full">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-editorial font-normal text-white mb-2 sm:mb-3">
                  Skills
                </h2>
              </div>
              <div className="w-full h-[1.5px] bg-white/95 mb-4" />
              
              <div className="space-y-3 sm:space-y-4">
                {SKILLS_LIST.map((skill, i) => (
                  <div key={i} className="relative py-1">
                    <span className="text-sm sm:text-base md:text-lg text-white font-normal tracking-tight leading-relaxed block">
                      {skill}
                    </span>
                    <div className="w-full border-b border-dashed border-neutral-600 mt-1.5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Column (iServeU updated to August 2026) */}
            <div className="flex flex-col">
              <div className="flex justify-center md:justify-start w-full">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-editorial font-normal text-white mb-2 sm:mb-3">
                  Experience
                </h2>
              </div>
              <div className="w-full h-[1.5px] bg-white/95 mb-4" />

              <div className="space-y-4 sm:space-y-5">
                {EXPERIENCE_LIST.map((exp, i) => (
                  <div key={i} className="relative py-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div>
                        <span className="text-sm sm:text-base md:text-lg text-white font-medium tracking-tight">
                          {exp.role}
                        </span>
                        <span className="text-xs sm:text-sm text-pink-300 font-normal ml-1 sm:ml-1.5">
                          @ {exp.company}
                        </span>
                      </div>
                      <span className="text-[11px] sm:text-xs text-neutral-400 font-mono tracking-tight shrink-0">
                        {exp.timeline}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-300/90 font-light mt-1.5 leading-relaxed">
                      {exp.summary}
                    </p>
                    <div className="w-full border-b border-dashed border-neutral-600 mt-2.5" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
