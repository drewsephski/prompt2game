
import { SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, User, Lock } from 'lucide-react';

export function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Gamepad2 className="h-12 w-12 text-[#0CF2A0]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Prompt2Game</h1>
          <p className="text-gray-400">
            {isSignUp ? 'Create your account to start building games' : 'Sign in to continue creating games'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="flex bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setIsSignUp(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  !isSignUp
                    ? 'bg-[#0CF2A0] text-gray-900'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Lock className="h-4 w-4" />
                Sign In
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  isSignUp
                    ? 'bg-[#0CF2A0] text-gray-900'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <User className="h-4 w-4" />
                Sign Up
              </button>
            </div>
          </div>

          <div className="clerk-auth-container">
            {isSignUp ? (
              <SignUp
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "bg-transparent shadow-none border-0",
                    headerTitle: "text-white text-xl font-bold",
                    headerSubtitle: "text-gray-400",
                    socialButtonsBlockButton: "bg-gray-800 border-gray-700 text-white hover:bg-gray-700",
                    formButtonPrimary: "bg-[#0CF2A0] hover:bg-[#0AE296] text-gray-900 font-medium",
                    formFieldInput: "bg-gray-800 border-gray-700 text-white placeholder-gray-500",
                    formFieldLabel: "text-gray-300",
                    footerActionLink: "text-[#0CF2A0] hover:text-[#0AE296]",
                    identityPreviewText: "text-white",
                    formResendCodeLink: "text-[#0CF2A0] hover:text-[#0AE296]",
                    otpCodeFieldInput: "bg-gray-800 border-gray-700 text-white",
                  }
                }}
                fallbackRedirectUrl="/"
                forceRedirectUrl="/"
              />
            ) : (
              <SignIn
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "bg-transparent shadow-none border-0",
                    headerTitle: "text-white text-xl font-bold",
                    headerSubtitle: "text-gray-400",
                    socialButtonsBlockButton: "bg-gray-800 border-gray-700 text-white hover:bg-gray-700",
                    formButtonPrimary: "bg-[#0CF2A0] hover:bg-[#0AE296] text-gray-900 font-medium",
                    formFieldInput: "bg-gray-800 border-gray-700 text-white placeholder-gray-500",
                    formFieldLabel: "text-gray-300",
                    footerActionLink: "text-[#0CF2A0] hover:text-[#0AE296]",
                    identityPreviewText: "text-white",
                    formResendCodeLink: "text-[#0CF2A0] hover:text-[#0AE296]",
                    otpCodeFieldInput: "bg-gray-800 border-gray-700 text-white",
                  }
                }}
                fallbackRedirectUrl="/"
                forceRedirectUrl="/"
              />
            )}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-sm text-gray-500 mt-6"
        >
          By continuing, you agree to our Terms of Service and Privacy Policy
        </motion.p>
      </div>
    </div>
  );
}
