import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Sparkles, Layers, ShieldCheck, Activity } from 'lucide-react';
import { Project } from '../types';

interface WorksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Nova FinTech Design System',
    category: 'Design Systems & Component Architecture',
    description: 'Comprehensive multi-brand design tokens, accessible React components, and responsive banking layout guidelines utilized across 4 mobile apps and web platforms.',
    metrics: 'Used by 320,000+ daily active users with 99.8% design token compliance.',
    tags: ['Figma Tokens', 'React', 'Tailwind', 'Accessibility WCAG AA'],
  },
  {
    id: '2',
    title: 'Pulse Healthcare Intelligence',
    category: 'AI-Powered Diagnostics & Clinical Workflows',
    description: 'Zero-latency clinician workflow cockpit with automated patient triage summaries, biometric telemetry visualizations, and voice-assisted diagnostic note ingestion.',
    metrics: 'Reduced charting time by 42% across 180+ partner clinics.',
    tags: ['AI Workflows', 'Healthcare UX', 'Data Viz', 'TypeScript'],
  },
  {
    id: '3',
    title: 'Aura Wealth & Portfolio Engine',
    category: 'FinTech Experience & Investment Analytics',
    description: 'Interactive wealth management interface with predictive rebalancing simulations, tax-loss harvesting wizard, and real-time asset performance metrics.',
    metrics: '$1.4B+ in simulated assets tracked across global markets.',
    tags: ['FinTech', 'Motion UI', 'Design Strategy', 'Next.js'],
  },
];

export const WorksDrawer: React.FC<WorksDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="relative z-10 w-full max-w-xl h-full bg-white shadow-2xl p-6 sm:p-10 flex flex-col justify-between overflow-y-auto"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">Selected Works</h2>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5">FinTech, Healthcare & AI Systems</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Projects List */}
              <div className="mt-8 space-y-8">
                {SAMPLE_PROJECTS.map((project, idx) => (
                  <div
                    key={project.id}
                    className="p-6 rounded-2xl border border-neutral-100 bg-neutral-50/50 hover:bg-neutral-50 hover:border-neutral-200 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-pink-500 uppercase tracking-wider">
                        0{idx + 1} • {project.category}
                      </span>
                      <Sparkles className="w-4 h-4 text-neutral-300 group-hover:text-pink-400 transition-colors" />
                    </div>

                    <h3 className="text-lg font-bold text-neutral-900 mt-2">
                      {project.title}
                    </h3>

                    <p className="text-sm text-neutral-600 leading-relaxed mt-2">
                      {project.description}
                    </p>

                    <div className="mt-3.5 p-2.5 rounded-lg bg-white border border-neutral-100 text-xs font-medium text-neutral-700 flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{project.metrics}</span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-md bg-white border border-neutral-200/70 text-[11px] font-mono text-neutral-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-8 border-t border-neutral-100 mt-8 text-center text-xs text-neutral-400 font-mono">
              Rudransh Panigrahi • Detailed Case Studies available on request
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
