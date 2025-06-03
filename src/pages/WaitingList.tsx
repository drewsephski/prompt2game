"use client";
import React, { useState } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FeatureCard } from "@/components/ui/feature-card";
import { Sparkles, Zap, Bell, MessageSquare, Star } from "lucide-react";
import GlowEffect from "@/components/ui/glow-effect";

export default function WaitingList() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/waiting-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setEmail("");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <BackgroundBeams className="opacity-80" />
      <div className="relative z-10 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Join the <span className="text-[#0CF2A0]">Waitlist</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                Be among the first to experience the future of AI-powered game creation.
                Sign up now for early access and exclusive updates.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md mx-auto"
          >
            {isSubmitted ? (
              <div className="bg-green-500/30 border border-green-500/30 border-solid rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-400 mb-2">You're on the list! 🎉</h3>
                <p className="text-green-200">
                  Thank you for joining our waitlist. We'll be in touch soon with updates!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-blue-950/10 border-gray-700 border-[1px] border-solid text-white placeholder-gray-400 focus:ring-2 focus:ring-[#0CF2A0] focus:border-transparent"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#0CF2A0] hover:bg-[#0CF2A0]/90 text-gray-900 font-semibold px-8 py-6 text-base transition-all duration-200 transform hover:scale-105"
                  >
                    {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                  </Button>
                </div>
                <p className="text-sm text-gray-400">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            )}
          </motion.div>

          <div className="mt-24 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Join Our Waitlist?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Be part of the future of game creation with exclusive benefits</p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <FeatureCard
                title="Early Access"
                description="Be among the first to explore and test new features before anyone else."
                icon={<Zap className="w-6 h-6" />}
              />
              <FeatureCard
                title="Exclusive Updates"
                description="Get insider news, development progress, and behind-the-scenes content."
                icon={<Bell className="w-6 h-6" />}
              />
              <FeatureCard
                title="Special Offers"
                description="Enjoy launch discounts and special pricing as an early supporter."
                icon={<Star className="w-6 h-6" />}
              />
              <FeatureCard
                title="Direct Influence"
                description="Shape the future of our platform with your feedback and suggestions."
                icon={<MessageSquare className="w-6 h-6" />}
              />
            </motion.div>
          </div>

          <motion.div 
            className="mt-20 max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <GlowEffect>
              <div className="p-1 rounded-xl bg-gradient-to-r from-[#0CF2A0]/20 to-[#00FF9D]/20">
                <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl">
                  <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
                  <p className="text-gray-300 mb-6">Join our waitlist now and be the first to experience the future of game creation.</p>
                  <Button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="bg-gradient-to-r from-[#0CF2A0] to-[#00FF9D] hover:from-[#0AE296] hover:to-[#00E68A] text-gray-900 font-semibold px-8 py-3 text-base transition-all duration-200 transform hover:scale-105 flex items-center gap-2 mx-auto"
                  >
                    <span>Join Waitlist</span>
                    <Sparkles className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </GlowEffect>
          </motion.div>
        </div>
      </div>
      <BackgroundBeams className="opacity-40" />
    </div>
  );
}
