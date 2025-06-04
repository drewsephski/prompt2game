
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Please enter your email",
        variant: "destructive",
      });
      return;
    }

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
        toast({
          title: "Success!",
          description: "You've been added to the waitlist.",
        });
        setEmail('');
        navigate('/create-game');
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting to waitlist:', error);
      toast({
        title: "Error",
        description: "Failed to join the waitlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="w-full max-w-md mx-auto mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center text-white">Get Early Access</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <motion.input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="px-4 py-3 rounded-md bg-arcade-gray/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-arcade-purple transition-all"
          disabled={isSubmitting}
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        />
        
        <motion.button 
          type="submit" 
          className="flex items-center justify-center py-3 px-4 bg-arcade-purple hover:bg-opacity-90 text-white rounded-md transition-all duration-300 disabled:opacity-70"
          disabled={isSubmitting}
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
                <span>Join the Waitlist</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </form>
    </motion.div>
  );
};

export default EmailForm;
