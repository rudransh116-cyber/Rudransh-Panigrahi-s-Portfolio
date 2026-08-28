import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Copy, Check, X, Mail, FileText, Palette, Camera, Activity, ExternalLink } from 'lucide-react';
import { PointerArrowBackground } from './PointerArrowBackground';

interface ContactViewProps {
  onBackToHome: () => void;
  onNavigateToWorks: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  onBackToHome,
  onNavigateToWorks,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeModal, setActiveModal] = useState<'resume' | 'paintings' | 'photography' | 'badminton' | null>(null);

  const EMAIL_ADDRESS = 'rudransh116@gmail.com';
  const RESUME_VIEW_URL = 'https://drive.google.com/file/d/1ox9DyS1aPOIbZ-rMk-j2N2h7ODGmtOZn/view?usp=sharing';
  const RESUME_PREVIEW_EMBED_URL = 'https://drive.google.com/file/d/1ox9DyS1aPOIbZ-rMk-j2N2h7ODGmtOZn/preview';
  const LINKEDIN_URL = 'https://www.linkedin.com/in/rudransh-panigrahi2005/';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL_ADDRESS);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="relative z-10 w-full min-h-[calc(100vh-100px)] flex flex-col justify-between px-6 sm:px-12 md:px-20 lg:px-28 py-8 text-white select-none">
      {/* Dark mode pointer arrow background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <PointerArrowBackground theme="dark" gridSpacing={52} />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col justify-between min-h-[calc(100vh-160px)] space-y-14">
        
        {/* SECTION 1: Interested to learn more? */}
        <div>
          {/* Header matching screenshot Contact - 1.png */}
          <div className="pt-2 pb-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-editorial font-normal tracking-tight text-white">
              Interested to learn more?
            </h1>
          </div>

          {/* Solid White Line Divider matching screenshot Contact - 1.png */}
          <div className="w-full h-[1.5px] bg-white/90 mb-6" />

          {/* Contact Action Items with Dashed Underlines */}
          <div className="space-y-4 sm:space-y-5">
            
            {/* Email ID */}
            <div className="relative group">
              <button
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-between text-left py-1 cursor-pointer transition-colors duration-200"
              >
                <div className="inline-block">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-normal text-white group-hover:text-pink-300 transition-colors tracking-tight">
                    Email ID
                  </span>
                  <div className="w-full border-b border-dashed border-neutral-600 group-hover:border-pink-300/80 transition-colors mt-1" />
                </div>

                <div className="flex items-center gap-3 text-neutral-400 group-hover:text-pink-300">
                  <span className="hidden sm:inline text-xs font-mono">
                    {copiedEmail ? 'Copied to Clipboard!' : EMAIL_ADDRESS}
                  </span>
                  {copiedEmail ? (
                    <Check className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </div>
              </button>
            </div>

            {/* Résumé (Opens Google Drive PDF in Pop-up) */}
            <div className="relative group">
              <button
                onClick={() => setActiveModal('resume')}
                className="w-full flex items-center justify-between text-left py-1 cursor-pointer transition-colors duration-200"
              >
                <div className="inline-block">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-normal text-white group-hover:text-pink-300 transition-colors tracking-tight">
                    Résumé
                  </span>
                  <div className="w-full border-b border-dashed border-neutral-600 group-hover:border-pink-300/80 transition-colors mt-1" />
                </div>

                <span className="text-neutral-500 group-hover:text-pink-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200">
                  <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
              </button>
            </div>

            {/* LinkedIn */}
            <div className="relative group">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between text-left py-1 cursor-pointer transition-colors duration-200"
              >
                <div className="inline-block">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-normal text-white group-hover:text-pink-300 transition-colors tracking-tight">
                    LinkedIn
                  </span>
                  <div className="w-full border-b border-dashed border-neutral-600 group-hover:border-pink-300/80 transition-colors mt-1" />
                </div>

                <span className="text-neutral-500 group-hover:text-pink-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200">
                  <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
              </a>
            </div>

          </div>
        </div>

        {/* SECTION 2: Other Talents... (Really?) */}
        <div className="pt-6 pb-8">
          <div className="pt-2 pb-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-editorial font-normal tracking-tight text-white">
              Other Talents... (Really?)
            </h2>
          </div>

          {/* Solid White Line Divider */}
          <div className="w-full h-[1.5px] bg-white/90 mb-6" />

          {/* Talents List */}
          <div className="space-y-4 sm:space-y-5">
            
            {/* Paintings */}
            <div className="relative group">
              <button
                onClick={() => setActiveModal('paintings')}
                className="w-full flex items-center justify-between text-left py-1 cursor-pointer transition-colors duration-200"
              >
                <div className="inline-block">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-normal text-white group-hover:text-pink-300 transition-colors tracking-tight">
                    Paintings
                  </span>
                  <div className="w-full border-b border-dashed border-neutral-600 group-hover:border-pink-300/80 transition-colors mt-1" />
                </div>

                <span className="text-neutral-500 group-hover:text-pink-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200">
                  <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
              </button>
            </div>

            {/* Photography */}
            <div className="relative group">
              <button
                onClick={() => setActiveModal('photography')}
                className="w-full flex items-center justify-between text-left py-1 cursor-pointer transition-colors duration-200"
              >
                <div className="inline-block">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-normal text-white group-hover:text-pink-300 transition-colors tracking-tight">
                    Photography
                  </span>
                  <div className="w-full border-b border-dashed border-neutral-600 group-hover:border-pink-300/80 transition-colors mt-1" />
                </div>

                <span className="text-neutral-500 group-hover:text-pink-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200">
                  <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
              </button>
            </div>

            {/* Badminton */}
            <div className="relative group">
              <button
                onClick={() => setActiveModal('badminton')}
                className="w-full flex items-center justify-between text-left py-1 cursor-pointer transition-colors duration-200"
              >
                <div className="inline-block">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-normal text-white group-hover:text-pink-300 transition-colors tracking-tight">
                    Badminton
                  </span>
                  <div className="w-full border-b border-dashed border-neutral-600 group-hover:border-pink-300/80 transition-colors mt-1" />
                </div>

                <span className="text-neutral-500 group-hover:text-pink-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200">
                  <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* DETAIL LIGHTBOX MODALS */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative z-10 w-full bg-[#141518] text-white rounded-3xl p-5 sm:p-7 border border-neutral-700 shadow-2xl overflow-hidden ${
                activeModal === 'resume' ? 'max-w-4xl h-[85vh] flex flex-col' : 'max-w-2xl max-h-[85vh] overflow-y-auto'
              }`}
            >
              {/* RESUME PDF POP-UP MODAL (Google Drive Embed & Link) */}
              {activeModal === 'resume' && (
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-800 shrink-0">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-5 h-5 text-pink-400" />
                      <h3 className="text-xl sm:text-2xl font-editorial font-bold text-white">
                        Rudransh Panigrahi — Résumé
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={RESUME_VIEW_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-white transition-colors"
                      >
                        <span>Open in Drive</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => setActiveModal(null)}
                        className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Embedded PDF Viewer */}
                  <div className="flex-1 w-full mt-4 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 relative">
                    <iframe
                      src={RESUME_PREVIEW_EMBED_URL}
                      title="Rudransh Panigrahi Résumé PDF"
                      className="w-full h-full min-h-[400px] border-none rounded-xl"
                      allow="autoplay"
                    />
                  </div>

                  <div className="pt-4 border-t border-neutral-800 flex items-center justify-between shrink-0 mt-3">
                    <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
                      {EMAIL_ADDRESS}
                    </span>
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                      <button
                        onClick={handleCopyEmail}
                        className="px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-white flex items-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>{copiedEmail ? 'Email Copied!' : 'Copy Email'}</span>
                      </button>
                      <a
                        href={RESUME_VIEW_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-xs font-mono text-white flex items-center gap-1.5"
                      >
                        <span>Download PDF</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* PAINTINGS MODAL */}
              {activeModal === 'paintings' && (
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                    <div className="flex items-center gap-2.5">
                      <Palette className="w-5 h-5 text-pink-400" />
                      <h3 className="text-2xl font-editorial font-bold text-white">
                        Canvas Paintings & Form Studies
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveModal(null)}
                      className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-900 border border-neutral-800">
                      <img
                        src="/src/assets/images/photo_painting_1787680574219.jpg"
                        alt="Acrylic painting"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm text-neutral-300 leading-relaxed font-light">
                      “Exploring organic strokes, atmospheric depth, and raw textures on heavy canvas. Painting informs how I think about balance, tension, and visual hierarchy in digital UI.”
                    </p>
                  </div>
                </div>
              )}

              {/* PHOTOGRAPHY MODAL */}
              {activeModal === 'photography' && (
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                    <div className="flex items-center gap-2.5">
                      <Camera className="w-5 h-5 text-pink-400" />
                      <h3 className="text-2xl font-editorial font-bold text-white">
                        Photography & Natural Light
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveModal(null)}
                      className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl overflow-hidden aspect-[4/3] bg-neutral-900">
                        <img
                          src="/src/assets/images/photo_workspace_1787680551895.jpg"
                          alt="Workspace photo"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="rounded-xl overflow-hidden aspect-[4/3] bg-neutral-900">
                        <img
                          src="/src/assets/images/rudransh_portrait_a_1787680059227.jpg"
                          alt="Studio session photo"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-neutral-300 leading-relaxed font-light">
                      Capturing moments of focus, tactile objects, architectural silhouettes, and warm analog shadows.
                    </p>
                  </div>
                </div>
              )}

              {/* BADMINTON MODAL */}
              {activeModal === 'badminton' && (
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                    <div className="flex items-center gap-2.5">
                      <Activity className="w-5 h-5 text-pink-400" />
                      <h3 className="text-2xl font-editorial font-bold text-white">
                        Badminton & High-Speed Play
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveModal(null)}
                      className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-900 border border-neutral-800">
                      <img
                        src="/src/assets/images/photo_badminton_1787680593531.jpg"
                        alt="Badminton court action"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm text-neutral-300 leading-relaxed font-light">
                      Fast-paced court agility, rapid reflex coordination, and competitive drive. Badminton keeps mental focus sharp and stamina high for marathon design sprints.
                    </p>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
