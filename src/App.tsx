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

  const isDarkMode = activeTab === 'works' || activeTab === 'contact';

  return (
    <div
      className={`relative min-h-screen w-full transition-colors duration-500 overflow-x-hidden ${
        !hasCompletedLoading
          ? 'bg-[#090a0f]'
          : isDarkMode
          ? 'bg-[#0e0f12] text-white'
          : 'bg-[#ffffff] text-[#111111]'
      }`}
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

      {/* 2. Main Portfolio Layout - Pushes up from bottom in sync with black curtain exit */}
      <motion.div
        initial={{ y: hasCompletedLoading ? '0%' : '100%' }}
        animate={{ y: isPushingUp || hasCompletedLoading ? '0%' : '100%' }}
        transition={{
          duration: 0.82,
          ease: [0.65, 0, 0.35, 1], // Exactly matched with the black curtain's ease curve
        }}
        className={`relative min-h-screen w-full flex flex-col justify-between ${
          !isDarkMode ? 'bg-[#ffffff]' : 'bg-[#0e0f12]'
        }`}
      >
        {/* Top Navbar */}
        <Navbar
          activeTab={activeTab}
          onSelectTab={handleTabSelect}
          onResetToCRT={handleResetToCRT}
        />

        {/* Active Screen View */}
        <div className="relative flex-1 flex flex-col justify-center">
          {activeTab === 'home' && (
            <>
              {/* Pointer arrow background for Home (light theme) */}
              <PointerArrowBackground theme="light" gridSpacing={52} />
              <HeroSection
                onNavigateToWorks={() => setActiveTab('works')}
              />
            </>
          )}

          {activeTab === 'works' && (
            <WorksView
              onBackToHome={() => setActiveTab('home')}
              onNavigateToContact={() => setActiveTab('contact')}
            />
          )}

          {activeTab === 'contact' && (
            <ContactView
              onBackToHome={() => setActiveTab('home')}
              onNavigateToWorks={() => setActiveTab('works')}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
