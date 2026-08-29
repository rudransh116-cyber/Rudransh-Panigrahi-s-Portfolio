import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Greeting } from '../types';
import { GeminiChatField } from './GeminiChatField';

interface HeroSectionProps {
  onNavigateToWorks: () => void;
}

const MULTILINGUAL_GREETINGS: Greeting[] = [
  { greeting: 'Hi,', name: "I’m Rudransh", language: 'English' },
  { greeting: 'नमस्ते,', name: "मैं रुद्रांश हूँ", language: 'Hindi' },
  { greeting: 'Bonjour,', name: "Je suis Rudransh", language: 'French' },
  { greeting: 'Hola,', name: "Soy Rudransh", language: 'Spanish' },
  { greeting: 'こんにちは,', name: "私はルドラクシュです", language: 'Japanese' },
  { greeting: 'Ciao,', name: "Sono Rudransh", language: 'Italian' },
  { greeting: 'Hallo,', name: "Ich bin Rudransh", language: 'German' },
  { greeting: 'Olá,', name: "Eu sou o Rudransh", language: 'Portuguese' },
  { greeting: '안녕하세요,', name: "저는 루드란쉬입니다", language: 'Korean' },
  { greeting: '你好,', name: "我是鲁德兰什", language: 'Mandarin' },
  { greeting: 'வணக்கம்,', name: "நான் ருத்ரான்ஷ்", language: 'Tamil' },
  { greeting: 'ନମସ୍କାର,', name: "ମୁଁ ରୁଦ୍ରାଂଶ", language: 'Odia' },
  { greeting: 'สวัสดี,', name: "ผมชื่อรุทรันช์", language: 'Thai' },
  { greeting: 'Hej,', name: "Jag är Rudransh", language: 'Swedish' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateToWorks }) => {
  // Multilingual hover & auto-cycling state
  const [isGreetingHovered, setIsGreetingHovered] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Figma Cat Comment Bubble state
  const [isCommentHovered, setIsCommentHovered] = useState(false);
  const [isCommentPinned, setIsCommentPinned] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  // Detect mobile screen for autoplay & responsive behavior
  useEffect(() => {
    const checkIsMobile = () => {
      const isMobile = window.innerWidth < 640 || window.matchMedia('(hover: none)').matches;
      setIsMobileScreen(isMobile);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Handle language switching:
  // - On Mobile: Auto-cycles on its own with a 1-second gap and smooth transition
  // - On Desktop: Fast cycling on hover (500ms gap)
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isMobileScreen) {
      // Auto cycle on mobile with 1 second gap
      intervalRef.current = setInterval(() => {
        setGreetingIndex((prev) => (prev + 1) % MULTILINGUAL_GREETINGS.length);
      }, 1000);
    } else if (isGreetingHovered) {
      // Instant first change on hover entry
      setGreetingIndex((prev) => (prev + 1) % MULTILINGUAL_GREETINGS.length);

      intervalRef.current = setInterval(() => {
        setGreetingIndex((prev) => (prev + 1) % MULTILINGUAL_GREETINGS.length);
      }, 500);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isMobileScreen, isGreetingHovered]);

  const currentGreeting = MULTILINGUAL_GREETINGS[greetingIndex];

  // Comment is active/expanded if hovered OR pinned by click
  const isCommentExpanded = isCommentHovered || isCommentPinned;

  const handleCommentClick = () => {
    setHasBeenOpened(true);
    setIsCommentPinned((prev) => !prev);
  };

  // Color theme: Unread = Figma Teal (#1da1a5), Opened/Read = Figma Gray (#6b7280)
  const bubbleBgColor = hasBeenOpened ? '#6b7280' : '#1da1a5';
  const bubbleShadow = hasBeenOpened
    ? '0 4px 14px rgba(107, 114, 128, 0.32)'
    : '0 4px 16px rgba(29, 161, 165, 0.35)';

  return (
    <main
      className="relative z-10 w-full min-h-[calc(100vh-130px)] flex flex-col justify-between items-center px-4 sm:px-10 md:px-14 lg:px-20 py-4 sm:py-6 select-none max-w-6xl mx-auto"
    >
      {/* 1. TOP SECTION: Multilingual Heading with Fixed Height Container (2 lines on mobile, 32px font size; center-aligned on mobile) */}
      <div className="w-full pt-1 sm:pt-2 flex justify-center sm:justify-start">
        <div
          id="multilingual-greeting-container"
          onMouseEnter={() => setIsGreetingHovered(true)}
          onMouseLeave={() => setIsGreetingHovered(false)}
          className="cursor-pointer select-none w-full text-center sm:text-left"
        >
          {/* Fixed height container ensures absolutely zero height jitter across languages on both mobile and desktop */}
          <div className="h-[84px] sm:h-[105px] md:h-[125px] lg:h-[145px] flex items-center justify-center sm:justify-start overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`greeting-${greetingIndex}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: isMobileScreen ? 0.32 : 0.15, ease: 'easeOut' }}
                className="text-[32px] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#111111] leading-[1.12] sm:leading-none"
              >
                {/* 2 lines on mobile, single continuous line on sm+ desktop */}
                <div className="sm:hidden flex flex-col items-center">
                  <span>{currentGreeting.greeting}</span>
                  <span>{currentGreeting.name}</span>
                </div>
                <div className="hidden sm:block whitespace-nowrap">
                  <span>{currentGreeting.greeting} </span>
                  <span>{currentGreeting.name}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 2. MIDDLE SECTION: Designer Brief (16px font size on mobile, center-aligned on mobile; comment bubble hidden on mobile) */}
      <div className="w-full my-4 sm:my-8 md:my-10 relative flex flex-col items-center sm:items-start text-center sm:text-left">
        {/* Comment Box positioned over the brief on desktop/tablet, hidden completely on mobile */}
        <div className="hidden sm:flex w-full justify-end mb-3 sm:mb-4 pr-1 sm:pr-4">
          <div
            id="figma-cat-comment-bubble"
            onClick={handleCommentClick}
            onMouseEnter={() => {
              setIsCommentHovered(true);
              setHasBeenOpened(true);
            }}
            onMouseLeave={() => setIsCommentHovered(false)}
            className="relative cursor-pointer select-none inline-block filter transition-all active:scale-[0.98] z-20"
            title="Click to pin or view comment"
          >
            {/* Figma Multiplayer Speech Bubble Container */}
            <motion.div
              animate={{
                backgroundColor: bubbleBgColor,
                boxShadow: bubbleShadow,
                borderRadius: isCommentExpanded ? '16px 16px 16px 4px' : '22px 22px 22px 4px',
              }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative flex items-center overflow-visible p-1.5 pr-3 transition-colors"
              style={{
                minWidth: isCommentExpanded ? '195px' : '40px',
                minHeight: '40px',
              }}
            >
              {/* Cat Avatar Circle Image */}
              <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-xs">
                <img
                  src="/src/assets/images/cat_comment_avatar_1787680043876.jpg"
                  alt="Cat avatar"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>

              {/* Expanded Comment Content */}
              <AnimatePresence>
                {isCommentExpanded && (
                  <motion.div
                    initial={{ opacity: 0, x: -6, width: 0 }}
                    animate={{ opacity: 1, x: 0, width: 'auto' }}
                    exit={{ opacity: 0, x: -6, width: 0 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="ml-2 flex flex-col justify-center text-left whitespace-nowrap overflow-hidden pointer-events-none"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-white tracking-tight">
                        Rudransh Panigrahi
                      </span>
                      <span className={`text-[9px] font-normal ${hasBeenOpened ? 'text-neutral-200' : 'text-teal-100/90'}`}>
                        a month ago
                      </span>
                    </div>
                    <p className={`text-[11px] font-medium mt-0.5 ${hasBeenOpened ? 'text-neutral-100' : 'text-teal-50'}`}>
                      Meoww.. ig..?
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Figma Speech Bubble Tail */}
              <svg
                className="absolute -bottom-2 left-0 w-3 h-3 pointer-events-none transition-colors"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M 0,0 C 0,8 1,12 12,0 Z"
                  fill={bubbleBgColor}
                />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Bio Text: 16px on mobile, scaled on larger devices, center-aligned on mobile */}
        <div className="w-full text-center sm:text-left flex justify-center sm:justify-start">
          <p className="text-[16px] sm:text-xl md:text-2xl lg:text-[27px] font-normal leading-[1.55] sm:leading-[1.45] text-[#111111] tracking-tight max-w-4xl">
            UI/UX Designer & Product Engineer blending design with AI-powered workflows. I build scalable design systems & high-impact digital experiences for FinTech and Healthcare, shipping production ready products used by over 500,000 users.
          </p>
        </div>
      </div>

      {/* 3. BOTTOM SECTION: Refined AI Chat Field (Centered) */}
      <div className="w-full flex justify-center pb-2 sm:pb-4">
        <GeminiChatField />
      </div>
    </main>
  );
};
