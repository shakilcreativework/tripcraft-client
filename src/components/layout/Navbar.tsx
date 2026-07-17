"use client";

import Link from "next/link";
import { FiMenu, FiX, FiCompass, FiInfo, FiLogIn, FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full bg-[var(--surface)]/90 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[var(--accent)] text-serif">TripCraft</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-[var(--muted)] hover:text-[var(--accent)] font-medium transition-colors">
              Home
            </Link>
            <Link href="/explore" className="text-[var(--muted)] hover:text-[var(--accent)] font-medium transition-colors flex items-center gap-1">
              <FiCompass className="w-4 h-4" /> Explore
            </Link>
            <Link href="/about" className="text-[var(--muted)] hover:text-[var(--accent)] font-medium transition-colors flex items-center gap-1">
              <FiInfo className="w-4 h-4" /> About
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors rounded-full hover:bg-[var(--surface-hover)]"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </button>
            )}
            
            <Link 
              href="/login" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent-soft)] text-[var(--accent-hover)] font-medium hover:bg-[var(--accent)] hover:text-white transition-colors"
            >
              <FiLogIn /> Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[var(--foreground)] hover:text-[var(--accent)] focus:outline-none p-2"
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[var(--surface)] border-b border-[var(--border)]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 text-[var(--muted)] hover:text-[var(--accent)] font-medium">Home</Link>
            <Link href="/explore" className="block px-3 py-2 text-[var(--muted)] hover:text-[var(--accent)] font-medium">Explore</Link>
            <Link href="/about" className="block px-3 py-2 text-[var(--muted)] hover:text-[var(--accent)] font-medium">About</Link>
            <Link href="/login" className="block px-3 py-2 text-[var(--accent)] font-medium">Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
