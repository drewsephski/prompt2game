import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Terminal from '@/components/Terminal';
import HeroSection from "@/components/ui/hero-section";
import GlowCard from "@/components/ui/glow-card";
import GlowEffect from "@/components/ui/glow-effect";
import Celebration from "@/components/ui/celebration";
import { MessageSquare, Code, Play, Sparkles, ArrowRight, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // Add small delay before starting animations
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Send email to drewsepeczi@gmail.com
      const response = await fetch('https://formspree.io/f/xpwagqpv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          message: `New waitlist signup: ${email}`,
          _replyto: email,
          _subject: 'New Waitlist Signup - Game Creator AI'
        }),
      });

      if (response.ok) {
        setShowCelebration(true);
        setEmail('');
        toast.success('Successfully joined the waitlist!');
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting to waitlist:', error);
      toast.error('Failed to join the waitlist. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-arcade-dark">
      <HeroSection />
      
      <div className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <Header />
        
        <GlowEffect className="w-full" size="lg" intensity={0.2}>
          <div className={`mt-16 mb-12 text-center transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="relative">
                <span className="gradient-text">Create Games With Just a Prompt</span>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#0CF2A0] to-transparent"></span>
              </span>
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Type a prompt, get a playable game instantly. No coding required.
            </motion.p>
          </div>
        </GlowEffect>
        
        <Terminal />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <GlowCard className="p-8 group hover:scale-[1.01] transition-transform duration-300">
            <div className="flex flex-col items-center text-center">
              <motion.div 
                className="mb-6 p-3 rounded-full bg-gradient-to-br from-[#0CF2A0]/20 to-[#00FF9D]/20"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <Mail className="h-8 w-8 text-[#0CF2A0]" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-3">Join Our Waitlist</h3>
              <p className="text-gray-300 mb-6 max-w-md">
                Be the first to know when we launch and get early access to exclusive features.
              </p>
              
              <form onSubmit={handleWaitlistSubmit} className="w-full max-w-md">
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <div className="relative flex-1 group">
                    <GlowEffect 
                      className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      glowClassName="from-[#0CF2A0] to-[#00FF9D]"
                    >
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0CF2A0]/20 to-[#00FF9D]/20 blur-md"></div>
                    </GlowEffect>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="relative w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0CF2A0] focus:border-transparent transition-all duration-200 z-10"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-gradient-to-r from-[#0CF2A0] to-[#00FF9D] hover:from-[#0AE296] hover:to-[#00E68A] text-gray-900 font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Joining...</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="default"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <span>Join Waitlist</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </form>
              
              <p className="text-xs text-gray-500 mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </GlowCard>
        </motion.div>
        
        <Celebration 
          isOpen={showCelebration} 
          onClose={() => setShowCelebration(false)}
          message="You're on the list!"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-16 mb-16 px-4">
          <GlowCard className="group h-full hover:scale-[1.02] transition-transform duration-300">
            <div className="flex flex-col items-center text-center h-full">
              <div className="p-3 mb-4 rounded-lg bg-[#0CF2A0]/10 text-[#0CF2A0] group-hover:bg-[#0CF2A0]/20 transition-colors duration-300">
                <MessageSquare size={28} className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Chat to Create</h3>
              <p className="text-gray-300 text-sm">
                Describe your game idea in natural language and watch it come to life with AI-powered generation.
              </p>
            </div>
          </GlowCard>
          
          <GlowCard className="group h-full hover:scale-[1.02] transition-transform duration-300" glowClassName="from-purple-500 to-pink-500">
            <div className="flex flex-col items-center text-center h-full">
              <div className="p-3 mb-4 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors duration-300">
                <Code size={28} className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Coding Required</h3>
              <p className="text-gray-300 text-sm">
                Create complex games without writing a single line of code. Our AI handles all the technical details.
              </p>
            </div>
          </GlowCard>
          
          <GlowCard className="group h-full hover:scale-[1.02] transition-transform duration-300" glowClassName="from-cyan-400 to-blue-500">
            <div className="flex flex-col items-center text-center h-full">
              <div className="p-3 mb-4 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors duration-300">
                <Play size={28} className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Instantly Playable</h3>
              <p className="text-gray-300 text-sm">
                Get a working game in seconds that you can play, customize, and share with friends immediately.
              </p>
            </div>
          </GlowCard>
        </div>
        
        <div className="max-w-4xl mx-auto mb-16 px-4">
          <GlowCard className="p-8 group hover:scale-[1.01] transition-transform duration-300">
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#0CF2A0]/20 to-[#00FF9D]/20">
                  <Sparkles size={40} className="text-[#0CF2A0]" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Ready to create something amazing?</h3>
                <p className="text-gray-300 mb-4">
                  Join our waiting list to get early access and be the first to experience the future of game creation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <GlowEffect>
                    <button
                      onClick={() => window.location.href = '/waiting-list'}
                      className="group relative px-6 py-2.5 bg-[#0CF2A0] hover:bg-[#0AE296] text-gray-900 font-medium rounded-lg transition-all duration-200 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Join Waitlist
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-[#0CF2A0] to-[#00FF9D] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </button>
                  </GlowEffect>
                  <GlowEffect glowClassName="from-white to-gray-400">
                    <button
                      onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                      className="group relative px-6 py-2.5 border border-gray-700 hover:border-gray-600 text-white font-medium rounded-lg transition-all duration-200 overflow-hidden"
                    >
                      <span className="relative z-10">Learn More</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </button>
                  </GlowEffect>
                </div>
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
};

export default Index;
