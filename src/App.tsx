import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "@/components/layout";
import Index from "@/pages/Index";
import CreateGame from "@/pages/CreateGame";
import GameWorkspace from "@/pages/GameWorkspace";
import NotFound from "@/pages/NotFound";
import WaitingList from "@/pages/WaitingList";
import Features from "@/pages/Features";
import HowItWorks from "@/pages/HowItWorks";
import Pricing from "@/pages/Pricing";
import Docs from "@/pages/Docs";
import { AuthPage } from "@/components/auth/auth-page";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

// Animated route component
const AnimatedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    }
  }, [isFirstRender]);

  if (isFirstRender) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.3,
        }}
        className="min-h-[calc(100vh-4rem)]"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Wrapper component to apply the main layout and animations to specific routes
const withLayout = (Component: React.ComponentType) => {
  return (
    <Layout>
      <AnimatedRoute>
        <Component />
      </AnimatedRoute>
    </Layout>
  );
};

// Wrapper component to apply the protected layout and animations to specific routes
const withProtectedLayout = (Component: React.ComponentType) => {
  return (
    <Layout>
      <AnimatedRoute>
        <ProtectedRoute>
          <Component />
        </ProtectedRoute>
      </AnimatedRoute>
    </Layout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={withLayout(Index)} />
          <Route path="/index" element={withLayout(Index)} />
          <Route path="/features" element={withLayout(Features)} />
          <Route path="/how-it-works" element={withLayout(HowItWorks)} />
          <Route path="/pricing" element={withLayout(Pricing)} />
          <Route path="/docs" element={withLayout(Docs)} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/create-game" element={withProtectedLayout(CreateGame)} />
          <Route path="/workspace" element={withProtectedLayout(GameWorkspace)} />
          <Route path="/waiting-list" element={withLayout(WaitingList)} />
          <Route path="*" element={withLayout(NotFound)} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
