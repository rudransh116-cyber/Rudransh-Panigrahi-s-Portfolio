import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Copy, Check, X, Mail, FileText, ExternalLink } from 'lucide-react';
import { PointerArrowBackground } from './PointerArrowBackground';

interface ContactViewProps {
  onBackToHome: () => void;
  onNavigateToWorks: () => void;
}

interface SocialItem {
  name: string;
  handle: string;
  url: string;
}

const SOCIALS_DATA: SocialItem[] = [
  {
    name: 'LinkedIn',
    handle: 'in/rudransh-panigrahi2005',
    url: 'https://www.linkedin.com/in/rudransh-panigrahi2005/',
  },
  {
    name: 'Behance',
    handle: 'behance.net/rudranshpanigrahi',
    url: 'https://www.behance.net/rudranshpanigrahi',
  },
  {
    name: 'Medium',
    handle: 'rudranshpanigrahi.medium.com',
    url: 'https://rudranshpanigrahi.medium.com/',
  },
  {
    name: 'Figma Community',
    handle: 'rudransh.figma.site',
    url: 'https://rudransh.figma.site',
  },
];

export const ContactView: React.FC<ContactViewProps> = ({
  onBackToHome,
  onNavigateToWorks,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const EMAIL_ADDRESS = 'rudransh116@gmail.com';
  const RESUME_VIEW_URL = 'https://drive.google.com/file/d/1ox9DyS1aPOIbZ-rMk-j2N2h7ODGmtOZn/view?usp=sharing';
  const RESUME_PREVIEW_EMBED_URL = 'https://drive.google.com/file/d/1ox9DyS1aPOIbZ-rMk-j2N2h7ODGmtOZn/preview';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL_ADDRESS);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="relative z-10 w-full min-h-[calc(100vh-100px)] flex flex-col justify-between px-4 sm:px-10 md:px-16 lg:px-24 py-6 sm:py-8 text-white select-none">
      {/* Dark mode pointer arrow background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <PointerArrowBackground theme="dark" gridSpacing={52} />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col justify-between space-y-12 sm:space-y-14">
        
        {/* SECTION 1: Interested to learn more? */}
        <div>
          {/* Header */}
          <div className="pt-2 pb-2 sm:pb-3">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-editorial font-normal tracking-tight text-white">
              Interested to learn more?
            </h1>
          </div>

          {/* Solid White Line Divider */}
          <div className="w-full h-[1.5px] bg-white/90 mb-5 sm:mb-6" />

          {/* Contact Action Items with Dashed Underlines */}
          <div className="space-y-4 sm:space-y-5">
            
            {/* Email ID */}
            <div className="relative group">
              <button
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-between text-left py-1 cursor-pointer transition-colors duration-200"
              >
                <div className="inline-block">
                  <span className="text-xl sm:text-3xl md:text-4xl font-normal text-white group-hover:text-pink-300 transition-colors tracking-tight">
                    Email ID
                  </span>
                  <div className="w-full border-b border-dashed border-neutral-600 group-hover:border-pink-300/80 transition-colors mt-1" />
                </div>

                <div className="flex items-center gap-2 sm:gap-3 text-neutral-400 group-hover:text-pink-300">
                  <span className="text-xs sm:text-sm font-mono">
                    {copiedEmail ? 'Copied!' : EMAIL_ADDRESS}
                  </span>
                  {copiedEmail ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </div>
              </button>
            </div>

            {/* Résumé (Opens Google Drive PDF in Pop-up Modal) */}
            <div className="relative group">
              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="w-full flex items-center justify-between text-left py-1 cursor-pointer transition-colors duration-200"
              >
                <div className="inline-block">
                  <span className="text-xl sm:text-3xl md:text-4xl font-normal text-white group-hover:text-pink-300 transition-colors tracking-tight">
                    Résumé
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

        {/* SECTION 2: Socials (Replaces Talents across all screen sizes) */}
        <div className="pt-2 sm:pt-4 pb-6">
          <div className="pt-2 pb-2 sm:pb-3">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-editorial font-normal tracking-tight text-white">
              Socials
            </h2>
          </div>

          {/* Solid White Line Divider */}
          <div className="w-full h-[1.5px] bg-white/90 mb-5 sm:mb-6" />

          {/* Socials List matching typography */}
          <div className="space-y-4 sm:space-y-5">
            {SOCIALS_DATA.map((social, idx) => (
              <div key={idx} className="relative group">
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between text-left py-1 cursor-pointer transition-colors duration-200"
                >
                  <div className="inline-block">
                    <span className="text-xl sm:text-3xl md:text-4xl font-normal text-white group-hover:text-pink-300 transition-colors tracking-tight">
                      {social.name}
                    </span>
                    <div className="w-full border-b border-dashed border-neutral-600 group-hover:border-pink-300/80 transition-colors mt-1" />
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 text-neutral-400 group-hover:text-pink-300">
                    <span className="hidden sm:inline text-xs sm:text-sm font-mono text-neutral-400 group-hover:text-pink-300 transition-colors">
                      {social.handle}
                    </span>
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-500 group-hover:text-pink-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200" />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* RESUME PDF LIGHTBOX MODAL */}
      <AnimatePresence>
        {isResumeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsResumeModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-4xl h-[85vh] bg-[#141518] text-white rounded-3xl p-4 sm:p-6 border border-neutral-700 shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 shrink-0">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
                  <h3 className="text-lg sm:text-2xl font-editorial font-bold text-white">
                    Rudransh Panigrahi — Résumé
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={RESUME_VIEW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-white transition-colors"
                  >
                    <span>Open in Drive</span>
                    <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </a>
                  <button
                    onClick={() => setIsResumeModalOpen(false)}
                    className="p-1.5 sm:p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Embedded PDF Viewer */}
              <div className="flex-1 w-full mt-3 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 relative">
                <iframe
                  src={RESUME_PREVIEW_EMBED_URL}
                  title="Rudransh Panigrahi Résumé PDF"
                  className="w-full h-full min-h-[350px] border-none rounded-xl"
                  allow="autoplay"
                />
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between shrink-0 mt-2">
                <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
                  {EMAIL_ADDRESS}
                </span>
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
                  <button
                    onClick={handleCopyEmail}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{copiedEmail ? 'Email Copied!' : 'Copy Email'}</span>
                  </button>
                  <a
                    href={RESUME_VIEW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-xs font-mono text-white flex items-center gap-1.5"
                  >
                    <span>Download PDF</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
