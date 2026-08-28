import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Sparkles, Terminal } from 'lucide-react';
import { playTerminalTick, playCrtFlashSound } from '../utils/audio';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<number>(0);
  const [isExplodingHaze, setIsExplodingHaze] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Phases:
  // 0: "Loading."
  // 1: "Loading.."
  // 2: "Loading..."
  // 3: "Ready to Launch"
  // 4: "Tap to Start"

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Progression timing
    timers.push(
      setTimeout(() => {
        setPhase(1); // Loading..
        if (audioEnabled) playTerminalTick();
      }, 900)
    );

    timers.push(
      setTimeout(() => {
        setPhase(2); // Loading...
        if (audioEnabled) playTerminalTick();
      }, 1800)
    );

    timers.push(
      setTimeout(() => {
        setPhase(3); // Ready to Launch
        if (audioEnabled) playTerminalTick();
      }, 2700)
    );

    timers.push(
      setTimeout(() => {
        setPhase(4); // Tap to Start
        if (audioEnabled) playTerminalTick();
      }, 3800)
    );

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [audioEnabled]);

  const handleStart = () => {
    if (audioEnabled) {
      playCrtFlashSound();
    }
    setIsExplodingHaze(true);
    // After white haze blooms and fills screen, notify parent to reveal home
    setTimeout(() => {
      onComplete();
    }, 1100);
  };

  const getDisplayText = () => {
    switch (phase) {
      case 0:
        return 'Loading.';
      case 1:
        return 'Loading..';
      case 2:
        return 'Loading...';
      case 3:
        return 'Ready to Launch';
      case 4:
        return 'Tap to Start';
      default:
        return 'Loading.';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#181a1b] overflow-hidden select-none">
      {/* Background Room Atmosphere with Vintage Wallpaper & Lighting */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter brightness-[0.75] contrast-[1.05]"
        style={{
          backgroundImage: `url(/src/assets/images/retro_crt_desk_1787680020916.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
      </div>

      {/* Top Floating Controls */}
      <div className="absolute top-6 right-6 z-30 flex items-center gap-3">
        <button
          id="toggle-audio-btn"
          onClick={() => setAudioEnabled(!audioEnabled)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/80 text-white/80 hover:text-white border border-white/10 backdrop-blur-md text-xs font-mono transition-colors"
          title="Toggle retro audio effects"
        >
          {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>{audioEnabled ? 'SOUND ON' : 'MUTED'}</span>
        </button>

        <button
          id="skip-intro-btn"
          onClick={handleStart}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 border border-white/20 backdrop-blur-md text-xs font-mono transition-all hover:scale-105 active:scale-95"
        >
          <span>SKIP INTRO</span>
          <Sparkles className="w-3 h-3 text-pink-300" />
        </button>
      </div>

      {/* CRT Monitor Unit & Screen */}
      <div className="relative z-10 w-full max-w-xl mx-4 flex flex-col items-center">
        {/* Retro Monitor Bezel */}
        <div className="relative w-full aspect-[4/3] max-h-[460px] bg-[#d9d2c2] rounded-2xl p-5 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_0_2px_#aba290,inset_0_2px_4px_rgba(255,255,255,0.4)] border-b-8 border-[#b8b09e]">
          {/* Top vents */}
          <div className="flex justify-center gap-1.5 mb-2 opacity-30">
            {[...Array(14)].map((_, idx) => (
              <div key={idx} className="w-4 h-1 bg-[#8c826e] rounded-full" />
            ))}
          </div>

          {/* CRT Screen Tube Housing */}
          <div className="relative w-full h-[85%] rounded-xl overflow-hidden crt-screen p-1 border-4 border-[#2b2d30] shadow-[inset_0_0_30px_rgba(0,0,0,0.95)] flex items-center justify-center">
            {/* Scanlines & RGB Mask Overlay */}
            <div className="absolute inset-0 pointer-events-none crt-scanlines z-10 opacity-70" />
            
            {/* CRT Tube Curvature Vignette */}
            <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_60px_rgba(0,0,0,0.85)]" />

            {/* Phosphor Glow Light Beam */}
            <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60 pointer-events-none z-10" />

            {/* CRT Terminal Screen Content */}
            <div className="relative z-20 w-full h-full flex flex-col items-center justify-center p-6 text-center animate-crt-flicker">
              {/* Terminal Header */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono text-white/30 tracking-widest uppercase">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-pink-400" />
                  RP-OS V1.04
                </span>
                <span className="text-emerald-400/70">640 KB OK</span>
              </div>

              {/* Central Dynamic Text */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={phase}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center"
                >
                  <div className={`font-pixel tracking-wider select-none ${
                    phase === 4
                      ? 'text-4xl sm:text-5xl text-[#ffffff] crt-glow'
                      : phase === 3
                      ? 'text-3xl sm:text-4xl text-[#ffffff] crt-glow'
                      : 'text-3xl sm:text-4xl text-[#f3f4f6] crt-glow'
                  }`}>
                    {getDisplayText()}
                  </div>

                  {phase === 4 && (
                    <motion.button
                      id="crt-tap-to-start-btn"
                      onClick={handleStart}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 px-6 py-2.5 rounded-lg bg-white/15 hover:bg-white/25 active:bg-white/35 border border-white/40 text-white font-pixel text-2xl tracking-widest uppercase shadow-[0_0_20px_rgba(255,255,255,0.4)] cursor-pointer transition-all"
                    >
                      [ CLICK HERE ]
                    </motion.button>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Bottom Screen Status Bar */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono text-white/40">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  SYSTEM ONLINE
                </span>
                <span>BAUD: 9600</span>
              </div>
            </div>
          </div>

          {/* Bottom Monitor Control Panel */}
          <div className="w-full mt-2.5 flex items-center justify-between px-2 text-[#736c5c]">
            {/* Vintage IBM / Brand Badge */}
            <div className="flex items-center gap-2">
              <div className="px-2 py-0.5 bg-[#eae5d8] border border-[#a89f8c] rounded text-[9px] font-mono font-bold tracking-widest text-[#443e33]">
                RP-88
              </div>
              <span className="text-[10px] font-mono opacity-70">COLOR DISPLAY</span>
            </div>

            {/* Dials & Power LED */}
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#3d382e] border border-[#a89f8c]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#3d382e] border border-[#a89f8c]" />
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981] animate-pulse" />
                <span className="text-[9px] font-mono uppercase">PWR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vintage Desk Shadow */}
        <div className="w-3/4 h-5 bg-black/60 blur-xl rounded-full mt-1" />
      </div>

      {/* WHITE HAZE EXPANSION OVERLAY: Old Monitor Degauss & Phosphor Flash */}
      <AnimatePresence>
        {isExplodingHaze && (
          <motion.div
            id="crt-white-haze-overlay"
            initial={{ opacity: 0, scale: 0.1, filter: 'blur(0px)' }}
            animate={{
              opacity: [0, 1, 1, 0.95],
              scale: [0.1, 1.8, 3.5, 4.0],
              filter: ['blur(0px)', 'blur(20px)', 'blur(40px)', 'blur(10px)'],
            }}
            transition={{
              duration: 1.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed inset-0 z-50 bg-[#ffffff] pointer-events-none flex items-center justify-center"
          >
            {/* Radial Phosphor Blast Core */}
            <div className="w-[120vw] h-[120vh] rounded-full bg-radial from-white via-white to-pink-100/90 shadow-[0_0_200px_100px_white]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
