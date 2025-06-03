import React, { useEffect, useState } from 'react';
import GlowEffect from "@/components/ui/glow-effect";
import GlowCard from "@/components/ui/glow-card";
import { motion } from 'framer-motion';
import { Code, Sparkles, Zap, Layout, GitBranch, Shield, Share2 } from 'lucide-react';

const Features = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Code className="w-8 h-8 text-[#0CF2A0]" />,
      title: "AI-Powered Game Creation",
      description: "Generate complete games with just a text prompt. Our advanced AI handles the coding, design, and logic so you can focus on your creative vision.",
      delay: 0.1
    },
    {
      icon: <Sparkles className="w-8 h-8 text-[#0CF2A0]" />,
      title: "Smart Suggestions",
      description: "Get intelligent suggestions for game mechanics, characters, and levels based on your initial concept. Perfect for when you need inspiration.",
      delay: 0.2
    },
    {
      icon: <Zap className="w-8 h-8 text-[#0CF2A0]" />,
      title: "Rapid Prototyping",
      description: "Quickly iterate on game ideas with instant previews. See your game come to life in seconds, not weeks.",
      delay: 0.3
    },
    {
      icon: <Layout className="w-8 h-8 text-[#0CF2A0]" />,
      title: "Customizable Templates",
      description: "Start with professionally designed templates and customize them to fit your unique game concept. Perfect for beginners and experts alike.",
      delay: 0.4
    },
    {
      icon: <GitBranch className="w-8 h-8 text-[#0CF2A0]" />,
      title: "Version Control",
      description: "Easily track changes and revert to previous versions of your game. Collaborate with team members seamlessly.",
      delay: 0.5
    },
    {
      icon: <Shield className="w-8 h-8 text-[#0CF2A0]" />,
      title: "Secure & Private",
      description: "Your game ideas and assets are protected with enterprise-grade security. You own everything you create.",
      delay: 0.6
    }
  ];

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
            <span className="gradient-text">Powerful Features</span> for Game Creators
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to bring your game ideas to life, powered by AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
            >
              <GlowCard className="h-full p-6 bg-gray-900/50 hover:bg-gray-800/50 transition-colors duration-300">
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gray-800/50 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <GlowEffect className="inline-block">
            <button className="px-8 py-3 bg-gradient-to-r from-[#0CF2A0] to-[#00FF9D] text-gray-900 font-semibold rounded-lg hover:shadow-lg hover:shadow-[#0CF2A0]/20 transition-all duration-300 hover:scale-105">
              Start Creating for Free
            </button>
          </GlowEffect>
          <p className="mt-4 text-gray-400">No credit card required. Cancel anytime.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
