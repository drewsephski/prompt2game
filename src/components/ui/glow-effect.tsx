"use client";

import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface GlowEffectProps {
  children: React.ReactNode;
  className?: string;
  glowClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  intensity?: number;
}

const GlowEffect: React.FC<GlowEffectProps> = ({
  children,
  className = '',
  glowClassName = 'from-[#0CF2A0] to-[#00FF9D]',
  size = 'lg',
  intensity = 0.3,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const sizeMap = {
    sm: { glow: 400, blur: 120 },
    md: { glow: 800, blur: 250 },
    lg: { glow: 1200, blur: 500 },
  };

  const { glow, blur } = sizeMap[size];

  // Calculate glow size based on container size
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Update container size on mount and resize
  React.useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPosition({ x, y });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div
        className={cn(
          'pointer-events-none absolute -z-10 transition-all duration-300',
          'bg-gradient-to-r',
          glowClassName,
          'rounded-xl',
          'opacity-0 group-hover:opacity-100',
          'scale-0 group-hover:scale-100',
          'transition-all duration-500 ease-out'
        )}
        style={{
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          transform: `translate(
            ${((position.x / (containerSize.width || 1)) * 100 - 50) * 0.2}%,
            ${((position.y / (containerSize.height || 1)) * 100 - 50) * 0.2}%
          )`,
          opacity: opacity * intensity,
          filter: `blur(${blur}px)`,
          maskImage: `radial-gradient(${Math.max(containerSize.width, containerSize.height) * 1.2}px at ${(position.x / (containerSize.width || 1)) * 100}% ${(position.y / (containerSize.height || 1)) * 100}%, white, transparent)`,
          WebkitMaskImage: `radial-gradient(${Math.max(containerSize.width, containerSize.height) * 1.2}px at ${(position.x / (containerSize.width || 1)) * 100}% ${(position.y / (containerSize.height || 1)) * 100}%, white, transparent)`,
          transitionProperty: 'opacity, transform, mask-image, -webkit-mask-image',
          transitionDuration: '0.5s',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </div>
  );
};

export default GlowEffect;
