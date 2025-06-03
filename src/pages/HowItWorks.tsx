import React, { useEffect, useState } from 'react';
import GlowEffect from "@/components/ui/glow-effect";
import GlowCard from "@/components/ui/glow-card";
import { motion } from 'framer-motion';
import { Sparkles, Code, Play, Zap, Upload, Gamepad2, Share2 } from 'lucide-react';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Describe Your Game",
      description: "Start by typing a description of the game you want to create. Be as detailed as you can about the gameplay, mechanics, and style.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "AI Generates Code",
      description: "Our advanced AI analyzes your description and generates clean, efficient code for your game, handling everything from physics to graphics.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Play className="w-6 h-6" />,
      title: "Preview Instantly",
      description: "See your game come to life in real-time with our built-in preview. Test it out and see how it feels to play.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Upload className="w-6 h-6" />,
      title: "Customize & Refine",
      description: "Tweak the game parameters, adjust the visuals, and fine-tune the gameplay until it's exactly how you want it.",
      color: "from-yellow-500 to-amber-500"
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      title: "Export & Share",
      description: "Download your game or publish it directly to our platform. Share it with friends or the world with just a few clicks.",
      color: "from-red-500 to-pink-500"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearTimeout(timer);
  }, [activeStep, steps.length]);

  return (
    <div className="min-h-screen bg-arcade-dark text-white pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">How It Works</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Turn your game ideas into reality in just a few simple steps
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Progress line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700">
              <motion.div 
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#0CF2A0] to-[#00FF9D]"
                initial={{ height: 0 }}
                animate={{ 
                  height: `${(activeStep / (steps.length - 1)) * 100}%` 
                }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Steps */}
            <div className="space-y-12">
              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  className="relative pl-16"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: index <= activeStep ? 1 : 0.5,
                    x: 0,
                  }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`absolute left-0 flex items-center justify-center w-10 h-10 rounded-full ${
                    index <= activeStep 
                      ? 'bg-gradient-to-br from-[#0CF2A0] to-[#00FF9D] text-gray-900'
                      : 'bg-gray-800 text-gray-400'
                  }`}>
                    {step.icon}
                  </div>
                  <GlowCard className={`p-6 transition-all duration-300 ${
                    index <= activeStep 
                      ? 'opacity-100' 
                      : 'opacity-50 hover:opacity-75'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-2 ${
                      index <= activeStep ? 'text-white' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-gray-300">{step.description}</p>
                    
                    {index === activeStep && (
                      <motion.div 
                        className="mt-4 h-1 bg-gradient-to-r from-[#0CF2A0] to-[#00FF9D] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 3 }}
                      />
                    )}
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <GlowEffect className="inline-block">
              <button className="px-8 py-3 bg-gradient-to-r from-[#0CF2A0] to-[#00FF9D] text-gray-900 font-semibold rounded-lg hover:shadow-lg hover:shadow-[#0CF2A0]/20 transition-all duration-300 hover:scale-105">
                Start Creating for Free
              </button>
            </GlowEffect>
            <p className="mt-4 text-gray-400">No coding skills required. Start building in seconds.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
