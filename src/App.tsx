import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LoadingScreen } from './components/LoadingScreen';
import { PointerArrowBackground } from './components/PointerArrowBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WorksView } from './components/WorksView';
import { ContactView } from './components/ContactView';
import { ViewTab } from './types';

export default function App() {
  const [hasCompletedLoading, setHasCompletedLoading] = useState(false);
  const [isPushingUp, setIsPushingUp] = useState(false);
  const [activeTab, setActiveTab] = useState<ViewTab>('home');

  const handleTabSelect = (tab: ViewTab) => {
    setActiveTab(tab);
  };

  const handleResetToCRT = () => {
    setHasCompletedLoading(false);
    setIsPushingUp(false);
    setActiveTab('home');
  };

  return (
    <div
      className="relative min-h-screen w-full bg-[#ffffff] text-[#111111] overflow-hidden select-none"
    >
      {/* 1. Color Curtain Loading Screen */}
      <AnimatePresence>
        {!hasCompletedLoading && (
          <LoadingScreen
            onExitStart={() => setIsPushingUp(true)}
            onComplete={() => setHasCompletedLoading(true)}
          />
        )}
      </AnimatePresence>

      {/* 2. Main Portfolio Base (Home remains static and fixed underneath) */}
      <motion.div
        initial={{ y: hasCompletedLoading ? '0%' : '100%' }}
        animate={{ y: isPushingUp || hasCompletedLoading ? '0%' : '100%' }}
        transition={{
          duration: 0.82,
          ease: [0.65, 0, 0.35, 1],
        }}
        className="relative min-h-screen w-full flex flex-col justify-between bg-[#ffffff]"
      >
        {/* Top Navbar */}
        <Navbar
          activeTab={activeTab}
          onSelectTab={handleTabSelect}
          onResetToCRT={handleResetToCRT}
        />

        {/* Static, Fixed Home Content */}
        <div className="relative flex-1 flex flex-col justify-center">
          <PointerArrowBackground theme="light" gridSpacing={52} />
          <HeroSection onNavigateToWorks={() => setActiveTab('works')} />
        </div>
      </motion.div>

      {/* 3. Smooth Overlay Pages (Works & Contact) with Full Internal Scrolling */}
      <AnimatePresence>
        {activeTab === 'works' && (
          <motion.div
            key="works-overlay"
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{
              duration: 0.52,
              ease: [0.32, 0.72, 0, 1], // Smooth, natural opening & symmetric closing
            }}
            className="fixed inset-0 z-40 bg-[#0e0f12] text-white flex flex-col overflow-y-auto overflow-x-hidden [overscroll-behavior:contain]"
          >
            {/* Top Navbar on Overlay (Sticky so it stays accessible when scrolling) */}
            <div className="sticky top-0 z-50 bg-[#0e0f12]/90 backdrop-blur-md">
              <Navbar
                activeTab={activeTab}
                onSelectTab={handleTabSelect}
                onResetToCRT={handleResetToCRT}
              />
            </div>

            {/* Works Content view with natural scroll support */}
            <div className="flex-1 w-full relative">
              <WorksView
                onBackToHome={() => setActiveTab('home')}
                onNavigateToContact={() => setActiveTab('contact')}
              />
            </div>
          </motion.div>
        )}

        {activeTab === 'contact' && (
          <motion.div
            key="contact-overlay"
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{
              duration: 0.52,
              ease: [0.32, 0.72, 0, 1], // Smooth, natural opening & symmetric closing
            }}
            className="fixed inset-0 z-40 bg-[#0e0f12] text-white flex flex-col overflow-y-auto overflow-x-hidden [overscroll-behavior:contain]"
          >
            {/* Top Navbar on Overlay (Sticky so it stays accessible when scrolling) */}
            <div className="sticky top-0 z-50 bg-[#0e0f12]/90 backdrop-blur-md">
              <Navbar
                activeTab={activeTab}
                onSelectTab={handleTabSelect}
                onResetToCRT={handleResetToCRT}
              />
            </div>

            {/* Contact Content view with natural scroll support */}
            <div className="flex-1 w-full relative">
              <ContactView
                onBackToHome={() => setActiveTab('home')}
                onNavigateToWorks={() => setActiveTab('works')}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
