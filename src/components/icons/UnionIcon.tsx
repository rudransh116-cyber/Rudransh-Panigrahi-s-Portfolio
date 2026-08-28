import React from 'react';

interface UnionIconProps {
  className?: string;
  size?: number;
}

export const UnionIcon: React.FC<UnionIconProps> = ({ className = 'w-6 h-6', size = 32 }) => {
  // Generate points for the 10-loop rosette epitrochoid curve:
  // x(t) = 50 + 28*cos(t) + 13*cos(9*t)
  // y(t) = 50 + 28*sin(t) - 13*sin(9*t)
  const numPoints = 240;
  const points: string[] = [];

  for (let i = 0; i <= numPoints; i++) {
    const t = (i / numPoints) * 2 * Math.PI;
    const x = 50 + 28 * Math.cos(t) + 13.5 * Math.cos(9 * t);
    const y = 50 + 28 * Math.sin(t) - 13.5 * Math.sin(9 * t);
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }

  const pathData = `M ${points.join(' L ')} Z`;

  const uniqueId = React.useId().replace(/:/g, '');

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <linearGradient id={`union-grad-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="35%" stopColor="#fb923c" />
          <stop offset="70%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
      </defs>
      <path
        d={pathData}
        stroke={`url(#union-grad-${uniqueId})`}
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};
