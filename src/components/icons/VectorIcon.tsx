import React from 'react';

interface VectorIconProps {
  className?: string;
  size?: number;
}

export const VectorIcon: React.FC<VectorIconProps> = ({ className = 'w-4 h-4', size = 18 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <path
        d="M21.5 2.5L10.5 13.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.5 2.5L14.5 21.5L10.5 13.5L2.5 9.5L21.5 2.5Z"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};
