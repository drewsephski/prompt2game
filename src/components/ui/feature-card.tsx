"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

export function FeatureCard({ title, description, icon, className }: FeatureCardProps) {
  return (
    <motion.div 
      className={cn(
        "group relative p-6 rounded-xl bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 overflow-hidden",
        "transition-all duration-300 hover:border-[#0CF2A0]/30 hover:shadow-lg hover:shadow-[#0CF2A0]/10",
        className
      )}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="relative z-10">
        <div className="w-12 h-12 bg-[#0CF2A0]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#0CF2A0]/20 transition-colors duration-300">
          {React.cloneElement(icon as React.ReactElement, {
            className: "w-6 h-6 text-[#0CF2A0]"
          })}
        </div>
        <h4 className="font-semibold text-white mb-2 text-lg">{title}</h4>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0CF2A0]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  );
}
