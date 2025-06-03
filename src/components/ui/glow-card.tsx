"use client";

import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowClassName?: string;
  disableHoverEffect?: boolean;
}

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowClassName = 'from-[#0CF2A0] to-[#00FF9D]',
  disableHoverEffect = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || disableHoverEffect) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    if (disableHoverEffect) return;
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative rounded-xl border border-gray-800 border-solid bg-gray-900/50 p-6',
        'transition-all duration-300 hover:border-gray-700',
        'overflow-hidden',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect */}
      <div
        className={cn(
          'pointer-events-none absolute -inset-px opacity-0 transition-all duration-300',
          'bg-gradient-to-r',
          glowClassName,
          'rounded-full',
          'blur-[80px]', // Increased blur for softer glow
          'scale-150', // Larger initial size
          {
            'opacity-30': opacity > 0, // Reduced opacity for subtlety
          }
        )}
        style={{
          maskImage: 'radial-gradient(300px at 50% 50%, white, transparent)',
          WebkitMaskImage: 'radial-gradient(300px at 50% 50%, white, transparent)',
          left: position.x - 150, // Adjusted for larger size
          top: position.y - 150,  // Adjusted for larger size
          width: '300px',         // Larger glow area
          height: '300px',        // Larger glow area
          position: 'absolute',
          zIndex: -1,
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      />

      {/* Card content */}
      <div className="relative z-10 h-full">
        {children}
      </div>

      {/* Enhanced background glow */}
      <div
        className={cn(
          'absolute inset-0 -z-10 rounded-xl',
          'transition-all duration-300',
          'bg-gradient-to-br from-gray-900/60 to-gray-800/40',
          'backdrop-blur-sm',
          'group-hover:from-gray-800/50 group-hover:to-gray-700/30',
          'border border-gray-800/30 border-solid group-hover:border-gray-700/50',
          'shadow-[0_0_60px_-15px_rgba(12,242,160,0.1)] group-hover:shadow-[0_0_80px_-10px_rgba(12,242,160,0.2)]',
          {
            'opacity-0 group-hover:opacity-100': !disableHoverEffect,
          }
        )}
      />
    </div>
  );
};

export default GlowCard;
