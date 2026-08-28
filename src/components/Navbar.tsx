import React from 'react';
import { ViewTab } from '../types';
import { RotateCcw } from 'lucide-react';

interface NavbarProps {
  activeTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  onResetToCRT: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onResetToCRT,
}) => {
  const isDark = activeTab === 'works' || activeTab === 'contact';

  return (
    <header
      className={`relative z-30 w-full px-6 sm:px-12 md:px-16 pt-8 pb-4 flex items-center justify-between text-base font-bold tracking-tight select-none transition-colors duration-500 ${
        isDark ? 'text-white' : 'text-[#111111]'
      }`}
    >
      {/* Left Section: Works */}
      <div className="flex-1 flex justify-start items-center">
        <button
          id="nav-works-btn"
          onClick={() => onSelectTab('works')}
          className={`flex items-center gap-2.5 text-lg sm:text-xl font-bold transition-all duration-200 cursor-pointer group py-1 ${
            isDark
              ? activeTab === 'works'
                ? 'text-white'
                : 'text-neutral-400 hover:text-white'
              : activeTab === 'works'
              ? 'text-black'
              : 'text-[#111111] hover:text-black'
          }`}
        >
          {/* Active indicator dot when on Works page (per screenshot) */}
          <span className="relative flex h-2.5 w-2.5 items-center justify-center">
            {activeTab === 'works' && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
            )}
            <span
              className={`relative inline-flex rounded-full h-2 w-2 border ${
                activeTab === 'works'
                  ? isDark
                    ? 'border-white bg-white'
                    : 'border-black bg-black'
                  : 'border-transparent bg-transparent'
              }`}
            />
          </span>
          <span>Works</span>
        </button>
      </div>

      {/* Middle Section: Rudransh Panigrahi on Home, or Red Close button on Works/Contact */}
      <div className="flex-1 flex justify-center items-center">
        {isDark ? (
          <button
            id="nav-close-btn"
            onClick={() => onSelectTab('home')}
            className="text-red-500 hover:text-red-400 text-lg sm:text-xl font-normal underline underline-offset-4 cursor-pointer transition-colors active:opacity-80"
            title="Close and return to Home"
          >
            Close
          </button>
        ) : (
          <button
            id="nav-home-btn"
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2.5 text-lg sm:text-xl font-bold transition-colors cursor-pointer group text-[#111111] hover:text-black"
          >
            {/* Active Screen Indicator Dot on Home page */}
            <span className="relative flex h-2.5 w-2.5 items-center justify-center">
              {activeTab === 'home' && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-60" />
              )}
              <span
                className={`relative inline-flex rounded-full h-2 w-2 border ${
                  activeTab === 'home'
                    ? 'border-black bg-black'
                    : 'border-transparent bg-transparent'
                }`}
              />
            </span>
            <span>Rudransh Panigrahi</span>
          </button>
        )}
      </div>

      {/* Right Section: Contact */}
      <div className="flex-1 flex justify-end items-center">
        <button
          id="nav-contact-btn"
          onClick={() => onSelectTab('contact')}
          className={`flex items-center gap-2 text-lg sm:text-xl font-bold transition-all duration-200 cursor-pointer group py-1 ${
            isDark
              ? activeTab === 'contact'
                ? 'text-white'
                : 'text-neutral-400 hover:text-white'
              : activeTab === 'contact'
              ? 'text-black'
              : 'text-[#111111] hover:text-black'
          }`}
        >
          {/* Active indicator dot on Contact page */}
          <span className="relative flex h-2.5 w-2.5 items-center justify-center">
            {activeTab === 'contact' && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
            )}
            <span
              className={`relative inline-flex rounded-full h-2 w-2 border ${
                activeTab === 'contact'
                  ? isDark
                    ? 'border-white bg-white'
                    : 'border-black bg-black'
                  : 'border-transparent bg-transparent'
              }`}
            />
          </span>
          <span>Contact</span>
        </button>
      </div>
    </header>
  );
};
