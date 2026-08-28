import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Greeting } from '../types';

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
  { greeting: 'নমস্কার,', name: "আমি রুদ্রাংশ", language: 'Bengali' },
  { greeting: 'مرحبا,', name: "أنا رودرانش", language: 'Arabic' },
  { greeting: 'Hej,', name: "Jag är Rudransh", language: 'Swedish' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateToWorks }) => {
  // Multilingual hover state
  const [isGreetingHovered, setIsGreetingHovered] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Middle Circle hover state
  const [isCircleHovered, setIsCircleHovered] = useState(false);

  // Figma Cat Comment Bubble state
  const [isCommentHovered, setIsCommentHovered] = useState(false);
  const [isCommentPinned, setIsCommentPinned] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  // Handle language switching on hover
  useEffect(() => {
    if (isGreetingHovered) {
      // Instant first language change on hover entry
      setGreetingIndex((prev) => (prev + 1) % MULTILINGUAL_GREETINGS.length);

      // 500ms gap among subsequent languages
      intervalRef.current = setInterval(() => {
        setGreetingIndex((prev) => (prev + 1) % MULTILINGUAL_GREETINGS.length);
      }, 500);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      // Retain the current language where the user stopped hovering
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isGreetingHovered]);

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
    ? '0 6px 20px rgba(107, 114, 128, 0.35)'
    : '0 6px 20px rgba(29, 161, 165, 0.38)';

  return (
    <main className="relative z-10 w-full min-h-[calc(100vh-140px)] flex flex-col justify-center items-center px-6 sm:px-12 md:px-16 lg:px-20 py-8 select-none">
      {/* 3-Column Grid Layout matching screenshot */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center">
        
        {/* LEFT COLUMN: Multilingual Reactive Heading */}
        <div className="flex flex-col justify-center items-start">
          <div
            id="multilingual-greeting-container"
            onMouseEnter={() => setIsGreetingHovered(true)}
            onMouseLeave={() => setIsGreetingHovered(false)}
            className="cursor-pointer py-2 inline-block select-none"
          >
            <div className="flex flex-col text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`greeting-${greetingIndex}`}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                  className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#111111] leading-[1.08]"
                >
                  <div>{currentGreeting.greeting}</div>
                  <div>{currentGreeting.name}</div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* MIDDLE COLUMN: Compact Glowing Pink Circle with smooth Black Transition on Hover */}
        <div className="flex flex-col justify-center items-center">
          <div className="relative">
            {/* Outer Pink Ambient Glow Halo */}
            <motion.div
              animate={{
                scale: isCircleHovered ? [1, 1.08, 1.04] : [1, 1.03, 1],
                opacity: isCircleHovered ? 0.95 : 0.65,
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -inset-6 rounded-full bg-gradient-to-r from-pink-300/35 via-rose-200/45 to-pink-400/35 blur-2xl pointer-events-none"
            />

            {/* Main Interactive Circle (Decreased size & ultra smooth animation) */}
            <button
              id="interactive-pink-circle"
              onClick={onNavigateToWorks}
              onMouseEnter={() => setIsCircleHovered(true)}
              onMouseLeave={() => setIsCircleHovered(false)}
              className={`relative w-56 h-56 sm:w-60 sm:h-60 md:w-64 md:h-64 rounded-full cursor-pointer overflow-hidden flex flex-col items-center justify-center border transition-all duration-400 ease-out active:scale-95 ${
                isCircleHovered
                  ? 'bg-[#111111] text-white border-black pink-soft-glow-hover scale-[1.02]'
                  : 'bg-white text-neutral-700 border-pink-100/80 pink-soft-glow scale-100'
              }`}
            >
              <AnimatePresence mode="wait">
                {!isCircleHovered ? (
                  <motion.div
                    key="circle-default"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="flex flex-col items-center justify-center text-center p-4"
                  >
                    <p className="text-base sm:text-lg font-medium text-neutral-600 tracking-tight">
                      Hover on me!
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="circle-hovered"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="flex flex-col items-center justify-center text-center p-4"
                  >
                    <p className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      Now Click!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Figma Cat Comment Bubble & Designer Bio */}
        <div className="flex flex-col justify-center items-start max-w-md">
          
          {/* FIGMA MULTIPLAYER COMMENT PIN WITH CAT AVATAR */}
          <div className="relative mb-6">
            <div
              id="figma-cat-comment-bubble"
              onClick={handleCommentClick}
              onMouseEnter={() => {
                setIsCommentHovered(true);
                setHasBeenOpened(true);
              }}
              onMouseLeave={() => setIsCommentHovered(false)}
              className="relative cursor-pointer select-none inline-block filter transition-all active:scale-95"
              title={isCommentPinned ? "Click to unpin comment" : "Click to pin comment"}
            >
              {/* Expanding Figma Multiplayer Speech Bubble Container */}
              <motion.div
                animate={{
                  backgroundColor: bubbleBgColor,
                  boxShadow: bubbleShadow,
                  borderRadius: isCommentExpanded ? '18px 18px 18px 4px' : '24px 24px 24px 4px',
                }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="relative flex items-center overflow-visible p-1.5 pr-3 transition-colors"
                style={{
                  minWidth: isCommentExpanded ? '210px' : '44px',
                  minHeight: '44px',
                }}
              >
                {/* Cat Avatar Circle Image */}
                <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
                  <img
                    src="/src/assets/images/cat_comment_avatar_1787680043876.jpg"
                    alt="Cat avatar"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Expanded Comment Content */}
                <AnimatePresence>
                  {isCommentExpanded && (
                    <motion.div
                      initial={{ opacity: 0, x: -8, width: 0 }}
                      animate={{ opacity: 1, x: 0, width: 'auto' }}
                      exit={{ opacity: 0, x: -8, width: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="ml-2.5 flex flex-col justify-center text-left whitespace-nowrap overflow-hidden"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white tracking-tight">
                          Rudransh Panigrahi
                        </span>
                        <span className={`text-[10px] font-normal ${hasBeenOpened ? 'text-neutral-200' : 'text-teal-100/90'}`}>
                          a month ago
                        </span>
                      </div>
                      <p className={`text-xs font-medium mt-0.5 ${hasBeenOpened ? 'text-neutral-100' : 'text-teal-50'}`}>
                        Meoww.. ig..?
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Figma Speech Bubble Tail (Bottom-Left Pointer Beak) */}
                <svg
                  className="absolute -bottom-2 left-0 w-3.5 h-3.5 pointer-events-none transition-colors"
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

          {/* BIO TEXT */}
          <div className="text-left">
            <p className="text-base sm:text-lg md:text-xl font-normal leading-[1.65] text-[#111111] tracking-tight">
              UI/UX Designer & Product Engineer blending design with AI-powered workflows. I build scalable design systems & high-impact digital experiences for FinTech and Healthcare, shipping production ready products used by over 500,000 users.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
};
