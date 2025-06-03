"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { GameOnboarding } from "./game-onboarding";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import GlowEffect from "./glow-effect";

interface Dot {
  x: number;
  y: number;
  baseColor: string;
  targetOpacity: number;
  currentOpacity: number;
  opacitySpeed: number;
  baseRadius: number;
  currentRadius: number;
}

const InteractiveHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const [isGameOnboardingOpen, setIsGameOnboardingOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  const dotsRef = useRef<Dot[]>([]);
  const gridRef = useRef<Record<string, number[]>>({});
  const canvasSizeRef = useRef<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const mousePositionRef = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

  const DOT_SPACING = 25;
  const BASE_OPACITY_MIN = 0.4;
  const BASE_OPACITY_MAX = 0.5;
  const BASE_RADIUS = 1;
  const INTERACTION_RADIUS = 150;
  const INTERACTION_RADIUS_SQ = INTERACTION_RADIUS * INTERACTION_RADIUS;
  const OPACITY_BOOST = 0.6;
  const RADIUS_BOOST = 2.5;
  const GRID_CELL_SIZE = Math.max(50, Math.floor(INTERACTION_RADIUS / 1.5));

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      mousePositionRef.current = { x: null, y: null };
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const canvasX = event.clientX - rect.left;
    const canvasY = event.clientY - rect.top;
    mousePositionRef.current = { x: canvasX, y: canvasY };
  }, []);

  const createDots = useCallback(() => {
    const { width, height } = canvasSizeRef.current;
    if (width === 0 || height === 0) return;

    const newDots: Dot[] = [];
    const newGrid: Record<string, number[]> = {};
    const cols = Math.ceil(width / DOT_SPACING);
    const rows = Math.ceil(height / DOT_SPACING);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * DOT_SPACING + DOT_SPACING / 2;
        const y = j * DOT_SPACING + DOT_SPACING / 2;
        const cellX = Math.floor(x / GRID_CELL_SIZE);
        const cellY = Math.floor(y / GRID_CELL_SIZE);
        const cellKey = `${cellX}_${cellY}`;

        if (!newGrid[cellKey]) {
          newGrid[cellKey] = [];
        }

        const dotIndex = newDots.length;
        newGrid[cellKey].push(dotIndex);

        const baseOpacity =
          Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) +
          BASE_OPACITY_MIN;
        newDots.push({
          x,
          y,
          baseColor: `rgba(87, 220, 205, ${BASE_OPACITY_MAX})`,
          targetOpacity: baseOpacity,
          currentOpacity: baseOpacity,
          opacitySpeed: Math.random() * 0.005 + 0.002,
          baseRadius: BASE_RADIUS,
          currentRadius: BASE_RADIUS,
        });
      }
    }
    dotsRef.current = newDots;
    gridRef.current = newGrid;
  }, [DOT_SPACING, GRID_CELL_SIZE, BASE_OPACITY_MIN, BASE_OPACITY_MAX]);

  const animateDots = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvasSizeRef.current;
    ctx.clearRect(0, 0, width, height);

    const { x: mouseX, y: mouseY } = mousePositionRef.current;
    const mouseCellX = mouseX !== null ? Math.floor(mouseX / GRID_CELL_SIZE) : null;
    const mouseCellY = mouseY !== null ? Math.floor(mouseY / GRID_CELL_SIZE) : null;

    const activeDotIndices = new Set<number>();

    if (mouseCellX !== null && mouseCellY !== null) {
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          const cellKey = `${mouseCellX + x}_${mouseCellY + y}`;
          const dotIndices = gridRef.current[cellKey] || [];
          dotIndices.forEach(index => activeDotIndices.add(index));
        }
      }
    }

    dotsRef.current.forEach((dot, index) => {
      // Update opacity animation
      if (dot.currentOpacity < dot.targetOpacity) {
        dot.currentOpacity = Math.min(
          dot.currentOpacity + dot.opacitySpeed,
          dot.targetOpacity
        );
      } else if (dot.currentOpacity > dot.targetOpacity) {
        dot.currentOpacity = Math.max(
          dot.currentOpacity - dot.opacitySpeed,
          dot.targetOpacity
        );
      }

      // Randomly change target opacity for subtle animation
      if (Math.random() < 0.01) {
        dot.targetOpacity =
          Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) +
          BASE_OPACITY_MIN;
      }

      let interactionFactor = 0;
      dot.currentRadius = dot.baseRadius;

      if (mouseX !== null && mouseY !== null && activeDotIndices.has(index)) {
        const dx = dot.x - mouseX;
        const dy = dot.y - mouseY;
        const distSq = dx * dx + dy * dy;

        if (distSq < INTERACTION_RADIUS_SQ) {
          const distance = Math.sqrt(distSq);
          interactionFactor = Math.max(0, 1 - distance / INTERACTION_RADIUS);
          interactionFactor = interactionFactor * interactionFactor;
        }
      }

      const finalOpacity = Math.min(
        1,
        dot.currentOpacity + interactionFactor * OPACITY_BOOST
      );
      dot.currentRadius = dot.baseRadius + interactionFactor * RADIUS_BOOST;

      const colorMatch = dot.baseColor.match(
        /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
      );
      const r = colorMatch ? colorMatch[1] : "87";
      const g = colorMatch ? colorMatch[2] : "220";
      const b = colorMatch ? colorMatch[3] : "205";

      ctx.beginPath();
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity.toFixed(3)})`;
      ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
      ctx.fill();
    });

    animationFrameId.current = requestAnimationFrame(animateDots);
  }, [
    GRID_CELL_SIZE,
    INTERACTION_RADIUS,
    INTERACTION_RADIUS_SQ,
    OPACITY_BOOST,
    RADIUS_BOOST,
    BASE_OPACITY_MIN,
    BASE_OPACITY_MAX,
  ]);

  const handleResize = useCallback(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current.parentElement;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    canvasRef.current.width = width;
    canvasRef.current.height = height;
    canvasSizeRef.current = { width, height };

    createDots();
  }, [createDots]);

  // Setup and cleanup
  useEffect(() => {
    handleResize();

    const handleMouseLeave = () => {
      mousePositionRef.current = { x: null, y: null };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    animationFrameId.current = requestAnimationFrame(animateDots);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [handleResize, handleMouseMove, animateDots]);

  // Animation variants
  const contentDelay = 0.3;
  const itemDelayIncrement = 0.1;

  const bannerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: contentDelay } },
  };

  const headlineVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: contentDelay + itemDelayIncrement } },
  };

  const subHeadlineVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: contentDelay + itemDelayIncrement * 2 } },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: contentDelay + itemDelayIncrement * 3 } },
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full pointer-events-none"
      />

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={bannerVariants}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-[#0CF2A0] bg-[#0CF2A0]/10 rounded-full mb-4">
              Beta Now Available
            </span>
          </motion.div>

          <motion.h1
            variants={headlineVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Create Games with
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0CF2A0] to-[#00FF9D]">
              Natural Language
            </span>
          </motion.h1>

          <motion.p
            variants={subHeadlineVariants}
            initial="hidden"
            animate="visible"
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8"
          >
            Turn your game ideas into reality with AI-powered game creation. No coding required.
            Just describe your game, and we'll handle the rest.
          </motion.p>

          <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-row flex-wrap gap-4 justify-center max-w-md mx-auto"
          >
            <GlowEffect>
              <button
                onClick={() => setIsGameOnboardingOpen(true)}
                className="group relative px-8 py-4 bg-gradient-to-r from-[#0CF2A0] to-[#00FF9D] text-gray-900 font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#0CF2A0]/20 hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Start Creating</span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#0CF2A0] to-[#00FF9D] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </GlowEffect>

            <GlowEffect glowClassName="from-white to-gray-400">
              <a
                href="/waiting-list"
                className="group relative px-8 py-4 bg-transparent border-2 border-gray-700 border-solid text-white font-medium rounded-lg overflow-hidden transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-white/5 hover:to-gray-400/5 inline-flex items-center justify-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
                  <span>Join Waitlist</span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
            </GlowEffect>
          </motion.div>
        </div>
      </div>
      <GameOnboarding
        isOpen={isGameOnboardingOpen}
        onClose={() => setIsGameOnboardingOpen(false)}
      />
    </div>
  );
};

export default InteractiveHero;
