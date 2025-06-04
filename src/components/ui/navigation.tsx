"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser, UserButton, SignInButton } from "@clerk/clerk-react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  hasDropdown?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  isActive?: boolean;
}

const NavLink = ({
  href = "#",
  children,
  hasDropdown = false,
  className = "",
  onClick,
  onMouseEnter,
  onMouseLeave,
  isActive = false,
}: NavLinkProps) => {
  const pathname = useLocation().pathname;
  const isActiveLink = isActive || pathname === href;

  return (
    <Link
      to={href}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "relative group text-sm font-medium transition-colors duration-200 flex items-center py-1",
        isActiveLink
          ? "text-[#0CF2A0]"
          : "text-gray-300 hover:text-white",
        className
      )}
    >
      <motion.span
        className="inline-block"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
        {hasDropdown && (
          <ChevronDown className="ml-1 h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
        )}
      </motion.span>
      {!hasDropdown && (
        <motion.div
          className="absolute bottom-[-2px] left-0 right-0 h-[1px] bg-[#0CF2A0]"
          variants={{
            initial: { scaleX: 0, originX: 0.5 },
            hover: { scaleX: 1, originX: 0.5 },
          }}
          initial="initial"
          whileHover="hover"
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}
    </Link>
  );
};

const DropdownMenu = ({
  children,
  isOpen,
  onMouseEnter,
  onMouseLeave,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{
          opacity: 0,
          y: 10,
          scale: 0.95,
          transition: { duration: 0.15 },
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-56 origin-top z-40"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="bg-[#111111] border border-gray-700/50 border-solid rounded-md shadow-xl p-2">
          {children}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const DropdownItem = ({
  href = "#",
  children,
  icon,
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) => (
  <Link
    to={href}
    onClick={onClick}
    className="group flex items-center justify-between w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/30 hover:text-white rounded-md transition-colors duration-150"
  >
    <span>{children}</span>
    {icon && (
      <span className="ml-1 opacity-70 group-hover:opacity-100 transition-opacity">
        {icon}
      </span>
    )}
  </Link>
);

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout>();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setOpenDropdown(null);
    }
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center" onClick={closeAllMenus}>
              <span className="text-white text-xl font-bold">Prompt2Game</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <NavLink href="/" isActive={pathname === "/"}>
              Home
            </NavLink>
            <NavLink href="/features" isActive={pathname === "/features"}>
              Features
            </NavLink>
            <NavLink href="/how-it-works" isActive={pathname === "/how-it-works"}>
              How It Works
            </NavLink>
            <NavLink href="/pricing" isActive={pathname === "/pricing"}>
              Pricing
            </NavLink>
            <NavLink href="/docs" isActive={pathname === "/docs"}>
              Docs
            </NavLink>
            {isSignedIn && (
              <NavLink href="/create-game" isActive={pathname === "/create-game"}>
                Create Game
              </NavLink>
            )}
            
            {/* Authentication Section */}
            {isSignedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-300">
                  Welcome, {user?.firstName || user?.username}!
                </span>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                      userButtonPopoverCard: "bg-gray-900 border border-gray-700",
                      userButtonPopoverActions: "bg-gray-900",
                      userButtonPopoverActionButton: "text-gray-300 hover:text-white hover:bg-gray-800",
                      userButtonPopoverActionButtonText: "text-gray-300",
                      userButtonPopoverFooter: "bg-gray-900 border-t border-gray-700",
                    }
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <SignInButton fallbackRedirectUrl="/" forceRedirectUrl="/">
                  <button className="text-gray-300 hover:text-white transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <button
                  onClick={() => navigate('/waiting-list')}
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gradient-to-r from-[#0CF2A0] to-[#00FF9D] hover:from-[#0AE296] hover:to-[#00E68A] transition-all duration-200 rounded-lg shadow-sm hover:shadow-lg hover:shadow-[#0CF2A0]/20 transform hover:scale-105"
                >
                  Join Waitlist
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">
                {isMobileMenuOpen ? "Close menu" : "Open menu"}
              </span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black/95 backdrop-blur-sm overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium"
                onClick={closeAllMenus}
                isActive={pathname === "/"}
              >
                Home
              </NavLink>
              <NavLink
                href="/features"
                className="block px-3 py-2 rounded-md text-base font-medium"
                onClick={closeAllMenus}
                isActive={pathname === "/features"}
              >
                Features
              </NavLink>
              <NavLink
                href="/how-it-works"
                className="block px-3 py-2 rounded-md text-base font-medium"
                onClick={closeAllMenus}
                isActive={pathname === "/how-it-works"}
              >
                How It Works
              </NavLink>
              <NavLink
                href="/pricing"
                className="block px-3 py-2 rounded-md text-base font-medium"
                onClick={closeAllMenus}
                isActive={pathname === "/pricing"}
              >
                Pricing
              </NavLink>
              <NavLink
                href="/docs"
                className="block px-3 py-2 rounded-md text-base font-medium"
                onClick={closeAllMenus}
                isActive={pathname === "/docs"}
              >
                Docs
              </NavLink>
              {isSignedIn && (
                <NavLink
                  href="/create-game"
                  className="block px-3 py-2 rounded-md text-base font-medium"
                  onClick={closeAllMenus}
                  isActive={pathname === "/create-game"}
                >
                  Create Game
                </NavLink>
              )}
              
              {/* Mobile Auth Section */}
              {isSignedIn ? (
                <div className="px-3 py-2 border-t border-gray-700 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">
                      {user?.firstName || user?.username}
                    </span>
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8",
                        }
                      }}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <SignInButton fallbackRedirectUrl="/" forceRedirectUrl="/">
                    <button
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                      onClick={closeAllMenus}
                    >
                      Sign In
                    </button>
                  </SignInButton>
                  <a
                    href="/waiting-list"
                    className="block w-full text-center mt-4 px-4 py-2 rounded-md text-base font-bold text-black bg-[#0CF2A0] hover:bg-[#0AE296] transition-colors duration-200"
                    onClick={closeAllMenus}
                  >
                    Join Waitlist
                  </a>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navigation;
