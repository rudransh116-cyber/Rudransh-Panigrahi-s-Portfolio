import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ArrowRight, X } from 'lucide-react';
import { PointerArrowBackground } from './PointerArrowBackground';

interface WorksViewProps {
  onBackToHome: () => void;
  onNavigateToContact: () => void;
}

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  links: { label: string; url: string }[];
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'akiko-pay',
    title: 'Akiko Pay',
    description:
      'Designing secure, rapid transactions and transparent prepaid card management for the next generation of users.',
    image: '/src/assets/images/akiko_mockup_1787681280596.jpg',
    links: [
      { label: 'Case Study', url: 'https://www.behance.net/rudranshpanigrahi' },
      { label: 'Play Store', url: 'https://play.google.com' },
    ],
  },
  {
    id: 'axis-bank-csc-kbs',
    title: 'Axis Bank CSC KBS',
    description:
      'Unified banking knowledge base and service workflow terminal empowering 50,000+ rural correspondents across India.',
    image: '/src/assets/images/axis_kbs_mockup_1787681300454.jpg',
    links: [
      { label: 'Case Study', url: 'https://www.behance.net/rudranshpanigrahi' },
      { label: 'Design System', url: 'https://figma.com' },
    ],
  },
  {
    id: 'upi-soundbox',
    title: 'UPI Soundbox Portal',
    description:
      'Merchant audio payment confirmation portal and hardware telemetry fleet manager for 150,000+ retail IoT devices.',
    image: '/src/assets/images/soundbox_mockup_1787681313190.jpg',
    links: [
      { label: 'Case Study', url: 'https://www.behance.net/rudranshpanigrahi' },
      { label: 'Audio Earcons', url: 'https://upisoundbox.example.com' },
    ],
  },
  {
    id: 'chamberly',
    title: 'Chamberly',
    description:
      'Peer-to-peer mental wellness companion, guided mood reflections, and supportive anonymous audio pods.',
    image: '/src/assets/images/chamberly_mockup_1787681326014.jpg',
    links: [
      { label: 'Case Study', url: 'https://www.behance.net/rudranshpanigrahi' },
      { label: 'App Store', url: 'https://apps.apple.com' },
    ],
  },
  {
    id: 'coming-soon',
    title: 'Coming Soon...',
    description:
      'Autonomous multi-modal workflow orchestrator bridging design systems directly with agentic code synthesis.',
    image: '/src/assets/images/photo_workspace_1787680551895.jpg',
    links: [
      { label: 'Request Access', url: 'mailto:rudransh116@gmail.com' },
    ],
  },
];

const SKILLS_LIST = [
  'Figma',
  'Adobe Suite',
  'Stitch AI, Figma Make, Claude + MCP, Manus AI',
  'Wireframing & Prototype',
];

const SOCIALS_LIST = [
  { name: 'Behance', url: 'https://www.behance.net/rudranshpanigrahi' },
  { name: 'Medium', url: 'https://rudranshpanigrahi.medium.com/' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/rudransh-panigrahi2005/' },
];

export const WorksView: React.FC<WorksViewProps> = ({
  onBackToHome,
  onNavigateToContact,
}) => {
  // Active selected project
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(PROJECTS_DATA[0]);

  const handleSelectProject = (project: ProjectItem) => {
    if (activeProject?.id === project.id) {
      // Allow clicking same item to toggle or stay active
      setActiveProject(project);
    } else {
      setActiveProject(project);
    }
  };

  const handleCloseProject = () => {
    setActiveProject(null);
  };

  return (
    <div className="relative z-10 w-full min-h-[calc(100vh-100px)] flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-24 py-8 text-white select-none">
      {/* Dark mode pointer arrow background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <PointerArrowBackground theme="dark" gridSpacing={52} />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col justify-between min-h-[calc(100vh-160px)] space-y-12">
        
        {/* TOP SECTION: Projects Header & Interactive Inline Showcase */}
        <div>
          {/* Projects Title Header */}
          <div className="flex items-baseline justify-between pt-2 pb-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-editorial font-normal tracking-tight text-white">
              Projects
            </h1>
            <span className="text-3xl sm:text-4xl font-editorial text-white font-normal">
              (5+)
            </span>
          </div>

          {/* Solid White Line Divider */}
          <div className="w-full h-[1.5px] bg-white/95 mb-6" />

          {/* Main Projects Section */}
          {/* DESKTOP LAYOUT (lg:): Side-by-Side as in Projects - 2.png */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
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
                          className={`text-2xl sm:text-3xl tracking-tight transition-colors ${
                            isActive
                              ? 'font-bold text-white'
                              : 'font-normal text-neutral-300 group-hover:text-white'
                          }`}
                        >
                          {project.title}
                        </span>

                        {/* Arrow when active per screenshot Projects - 2.png */}
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
                  {/* Mockup Card */}
                  <div className="md:col-span-6 rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-900 border border-neutral-800 shadow-2xl relative">
                    <img
                      src={activeProject.image}
                      alt={activeProject.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Description & Links */}
                  <div className="md:col-span-6 flex flex-col justify-between min-h-[220px] space-y-6">
                    <div>
                      <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                        {activeProject.description}
                      </p>
                    </div>

                    <div className="space-y-4">
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

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={handleCloseProject}
                        className="text-red-500 hover:text-red-400 text-sm font-medium underline underline-offset-4 cursor-pointer transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RESPONSIVE LAYOUT (<lg): Accordion Style Directly Below Clicked Project */}
          <div className="lg:hidden space-y-5">
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
                        className={`text-2xl sm:text-3xl tracking-tight transition-colors ${
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
                        <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-300" />
                      )}
                    </div>

                    {/* Underline: Solid if active, Dashed if inactive */}
                    {isActive ? (
                      <div className="w-full h-[1.5px] bg-white mt-1.5" />
                    ) : (
                      <div className="w-full border-b border-dashed border-neutral-600 group-hover:border-neutral-400 transition-colors mt-1.5" />
                    )}
                  </button>

                  {/* Nested Details directly underneath this specific project item */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden pt-4 pb-2 space-y-4"
                      >
                        {/* Mockup Image */}
                        <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-900 border border-neutral-800 shadow-xl">
                          <img
                            src={project.image}
                            alt={project.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Description */}
                        <p className="text-sm text-neutral-300 leading-relaxed font-light">
                          {project.description}
                        </p>

                        {/* Action Links */}
                        <div className="space-y-3 pt-1">
                          {project.links.map((link, idx) => (
                            <div key={idx} className="relative group inline-block w-full">
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between py-0.5 text-base text-white hover:text-pink-300 transition-colors"
                              >
                                <span>{link.label}</span>
                                <ArrowUpRight className="w-4 h-4 text-white" />
                              </a>
                              <div className="w-full h-[1px] bg-white/80 mt-0.5" />
                            </div>
                          ))}
                        </div>

                        {/* Close button for accordion */}
                        <div className="flex justify-end pt-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCloseProject();
                            }}
                            className="text-red-500 hover:text-red-400 text-xs font-medium underline underline-offset-4 cursor-pointer"
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

        {/* BOTTOM SECTION: Skills & Socials Columns */}
        <div className="pt-8 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            
            {/* Skills Column */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-white mb-3">
                Skills
              </h2>
              <div className="w-full h-[1.5px] bg-white/95 mb-4" />
              
              <div className="space-y-3 sm:space-y-4">
                {SKILLS_LIST.map((skill, i) => (
                  <div key={i} className="relative py-1">
                    <span className="text-base sm:text-lg text-white font-normal tracking-tight">
                      {skill}
                    </span>
                    <div className="w-full border-b border-dashed border-neutral-600 mt-1.5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Socials Column */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-white mb-3">
                Socials
              </h2>
              <div className="w-full h-[1.5px] bg-white/95 mb-4" />

              <div className="space-y-3 sm:space-y-4">
                {SOCIALS_LIST.map((social, i) => (
                  <div key={i} className="relative py-1 group">
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-base sm:text-lg text-white group-hover:text-pink-300 transition-colors cursor-pointer"
                    >
                      <span>{social.name}</span>
                      <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-pink-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <div className="w-full border-b border-dashed border-neutral-600 group-hover:border-pink-300/80 transition-colors mt-1.5" />
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
