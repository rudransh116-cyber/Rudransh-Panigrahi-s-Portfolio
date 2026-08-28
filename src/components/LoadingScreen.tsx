import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

// Colors sequence: vibrant palette emerging sequentially, with pure Black as the final layer
const COLOR_PANELS = [
  { id: 'c1', color: '#1e3a8a', name: 'Deep Navy' },
  { id: 'c2', color: '#2563eb', name: 'Royal Blue' },
  { id: 'c3', color: '#e11d48', name: 'Crimson Coral' },
  { id: 'c4', color: '#f59e0b', name: 'Vibrant Amber' },
  { id: 'c5', color: '#059669', name: 'Emerald' },
  { id: 'c6', color: '#090a0f', name: 'Pure Black' }, // The last layer
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  const enterDuration = 0.45;
  const enterStagger = 0.13;
  const lastIndex = COLOR_PANELS.length - 1;
  const enterFinishTime = lastIndex * enterStagger + enterDuration; // ~1.10s
  const holdTime = 0.12;
  const exitDuration = 0.65;
  const exitStartTime = enterFinishTime + holdTime;
  const totalTime = exitStartTime + exitDuration;

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, exitStartTime * 1000);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, totalTime * 1000 + 40);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, exitStartTime, totalTime]);

  return (
    <div
      id="color-curtain-loading-screen"
      className="fixed inset-0 z-50 overflow-hidden select-none pointer-events-none bg-transparent"
    >
      {COLOR_PANELS.map((panel, index) => {
        const isLast = index === lastIndex;
        const enterDelay = index * enterStagger;

        return (
          <motion.div
            key={panel.id}
            initial={{ x: '-100%', y: '0%' }}
            animate={
              isExiting
                ? isLast
                  ? { x: '0%', y: '-100%' } // Black panel slides smoothly up to reveal homescreen from bottom to top
                  : { opacity: 0 } // Hide previous layers so homescreen underneath is revealed cleanly
                : { x: '0%', y: '0%', opacity: 1 }
            }
            transition={{
              duration: isExiting ? exitDuration : enterDuration,
              delay: isExiting ? 0 : enterDelay,
              ease: [0.76, 0, 0.24, 1], // Smooth editorial cubic-bezier
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
