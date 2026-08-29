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

  return (
    <main
      className="relative z-10 w-full min-h-[calc(100vh-130px)] flex flex-col justify-between items-center px-4 sm:px-10 md:px-14 lg:px-20 py-4 sm:py-6 select-none max-w-5xl mx-auto text-center"
    >
      {/* 1. TOP SECTION: Multilingual Heading (Center-aligned across all screen sizes) */}
      <div className="w-full pt-1 sm:pt-2 flex justify-center items-center">
        <div
          id="multilingual-greeting-container"
          onMouseEnter={() => setIsGreetingHovered(true)}
          onMouseLeave={() => setIsGreetingHovered(false)}
          className="cursor-pointer select-none w-full text-center flex flex-col items-center justify-center"
        >
          {/* Fixed height container ensures zero height jitter */}
          <div className="h-[84px] sm:h-[105px] md:h-[125px] lg:h-[145px] flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`greeting-${greetingIndex}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: isMobileScreen ? 0.32 : 0.15, ease: 'easeOut' }}
                className="text-[32px] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#111111] leading-[1.12] sm:leading-none text-center"
              >
                {/* 2 lines on mobile, single continuous line on sm+ desktop */}
                <div className="sm:hidden flex flex-col items-center text-center">
                  <span>{currentGreeting.greeting}</span>
                  <span>{currentGreeting.name}</span>
                </div>
                <div className="hidden sm:block whitespace-nowrap text-center">
                  <span>{currentGreeting.greeting} </span>
                  <span>{currentGreeting.name}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 2. MIDDLE SECTION: Designer Brief (Center-aligned across all screens; Figma bubble completely removed) */}
      <div className="w-full my-4 sm:my-8 md:my-10 flex flex-col items-center justify-center text-center">
        <div className="w-full flex justify-center text-center max-w-4xl">
          <p className="text-[16px] sm:text-xl md:text-2xl lg:text-[26px] font-normal leading-[1.55] sm:leading-[1.5] text-[#111111] tracking-tight text-center">
            UI/UX Designer & Product Engineer blending design with AI-powered workflows. I build scalable design systems & high-impact digital experiences for FinTech and Healthcare, shipping production ready products used by over 500,000 users.
          </p>
        </div>
      </div>

      {/* 3. BOTTOM SECTION: Refined AI Chat Field (Centered) */}
      <div className="w-full flex justify-center items-center pb-2 sm:pb-4">
        <GeminiChatField />
      </div>
    </main>
  );
};
