import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface LoadingScreenProps {
  onExitStart?: () => void;
  onComplete: () => void;
}

// Crisp palette without any green: Navy -> Royal Blue -> Crimson -> Amber -> Pure Black
const COLOR_PANELS = [
  { id: 'c1', color: '#1e3a8a', name: 'Deep Navy' },
  { id: 'c2', color: '#2563eb', name: 'Royal Blue' },
  { id: 'c3', color: '#e11d48', name: 'Crimson Coral' },
  { id: 'c4', color: '#f59e0b', name: 'Vibrant Amber' },
  { id: 'c5', color: '#090a0f', name: 'Pure Black' }, // Final layer that gets pushed away
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onExitStart, onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [blackCovered, setBlackCovered] = useState(false);

  const enterDuration = 0.38;
  const enterStagger = 0.12;
  const lastIndex = COLOR_PANELS.length - 1;
  const blackEnterTime = lastIndex * enterStagger + enterDuration; // ~0.86s
  const holdTime = 0.12;
  const exitDuration = 0.82;
  const exitStartTime = blackEnterTime + holdTime; // ~0.98s
  const totalTime = exitStartTime + exitDuration; // ~1.80s

  useEffect(() => {
    // When black finishes sliding in, mark blackCovered to hide lower panels
    const coveredTimer = setTimeout(() => {
      setBlackCovered(true);
    }, blackEnterTime * 1000);

    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      if (onExitStart) {
        onExitStart();
      }
    }, exitStartTime * 1000);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, totalTime * 1000 + 30);

    return () => {
      clearTimeout(coveredTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onExitStart, onComplete, blackEnterTime, exitStartTime, totalTime]);

  return (
    <div
      id="color-curtain-loading-screen"
      className="fixed inset-0 z-50 overflow-hidden select-none pointer-events-none"
    >
      {COLOR_PANELS.map((panel, index) => {
        const isLast = index === lastIndex;
        const enterDelay = index * enterStagger;

        // If black has covered and this is not the last panel, completely hide it
        if (blackCovered && !isLast) {
          return null;
        }

        return (
          <motion.div
            key={panel.id}
            initial={{ x: '-100%', y: '0%' }}
            animate={
              isExiting && isLast
                ? { x: '0%', y: '-100%' } // Black panel cleanly slides upwards off-screen
                : { x: '0%', y: '0%' }
            }
            transition={{
              duration: isExiting && isLast ? exitDuration : enterDuration,
              delay: isExiting ? 0 : enterDelay,
              ease: isExiting && isLast ? [0.65, 0, 0.35, 1] : [0.25, 1, 0.5, 1],
            }}
            style={{
              backgroundColor: panel.color,
              zIndex: 10 + index,
            }}
            className="absolute inset-0 w-full h-full"
          />
        );
      })}
    </div>
  );
};
