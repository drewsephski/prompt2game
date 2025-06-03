"use client";

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, PartyPopper, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CelebrationProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  className?: string;
}

const Celebration: React.FC<CelebrationProps> = ({
  isOpen,
  onClose,
  message = "You're on the list!",
  className = "",
}) => {
  const confettiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    // Create confetti effect
    const createConfetti = () => {
      if (!confettiRef.current) return;
      
      const colors = [
        '#0CF2A0', '#00FF9D', '#18CCFC', '#6344F5', '#AE48FF', '#FF6B6B', '#4ECDC4'
      ];
      
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.cssText = `
          position: fixed;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          opacity: ${Math.random() * 0.8 + 0.2};
          border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
          top: -10px;
          left: ${Math.random() * window.innerWidth}px;
          transform: rotate(${Math.random() * 360}deg);
          animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
          z-index: 1000;
        `;
        
        confettiRef.current.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
          confetti.remove();
        }, 5000);
      }
    };
    
    // Add confetti animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes confetti-fall {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    createConfetti();
    
    return () => {
      clearTimeout(timer);
      document.head.removeChild(style);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={cn(
              'bg-gray-900/90 backdrop-blur-lg border border-gray-800 rounded-2xl p-6 shadow-2xl',
              'max-w-md w-full pointer-events-auto',
              className
            )}
          >
            <div className="relative">
              <div className="absolute -top-16 left-1/2 -translate-x-1/2">
                <div className="relative">
                  <CheckCircle className="h-16 w-16 text-[#0CF2A0]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PartyPopper className="h-8 w-8 text-yellow-400 animate-bounce" />
                  </div>
                </div>
              </div>
              
              <div className="pt-12 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {message}
                </h3>
                <p className="text-gray-300 mb-6">
                  Thank you for joining our waitlist! We'll be in touch soon.
                </p>
                
                <div className="flex justify-center">
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-[#0CF2A0] hover:bg-[#0AE296] text-gray-900 font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
                  >
                    <span>Got it!</span>
                    <Sparkles className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Confetti container */}
              <div ref={confettiRef} className="fixed inset-0 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Celebration;
