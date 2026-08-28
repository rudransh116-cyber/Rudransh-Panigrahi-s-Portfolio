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
  const [activeTab, setActiveTab] = useState<ViewTab>('home');

  const handleTabSelect = (tab: ViewTab) => {
    setActiveTab(tab);
  };

  const handleResetToCRT = () => {
    setHasCompletedLoading(false);
    setActiveTab('home');
  };

  const isDarkMode = activeTab === 'works' || activeTab === 'contact';

  return (
    <div
      className={`relative min-h-screen w-full transition-colors duration-500 overflow-x-hidden ${
        isDarkMode ? 'bg-[#0e0f12] text-white' : 'bg-[#ffffff] text-[#111111]'
      }`}
    >
      {/* 1. CRT Loading Screen */}
      <AnimatePresence mode="wait">
        {!hasCompletedLoading && (
          <LoadingScreen
            onComplete={() => setHasCompletedLoading(true)}
          />
        )}
      </AnimatePresence>

      {/* 2. Main Portfolio Layout */}
      {hasCompletedLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative min-h-screen w-full flex flex-col justify-between"
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
      )}
    </div>
  );
}

