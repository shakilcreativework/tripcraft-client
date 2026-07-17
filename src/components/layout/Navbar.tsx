"use client";

import Link from "next/link";
import { FiMenu, FiX, FiCompass, FiInfo, FiLogIn, FiSun, FiMoon, FiLogOut, FiUser, FiGrid } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => { setMounted(true); }, []);

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
            {user && (
              <Link href="/dashboard" className="text-[var(--muted)] hover:text-[var(--accent)] font-medium transition-colors flex items-center gap-1">
                <FiGrid className="w-4 h-4" /> Dashboard
              </Link>
            )}
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

            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] text-sm font-bold flex items-center justify-center uppercase">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-[var(--foreground)] max-w-[100px] truncate">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-[var(--muted)] hover:text-[var(--danger)] hover:bg-[var(--danger-soft)] text-sm font-medium transition-colors"
                >
                  <FiLogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent-soft)] text-[var(--accent-hover)] font-medium hover:bg-[var(--accent)] hover:text-white transition-colors"
              >
                <FiLogIn /> Login
              </Link>
            )}
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
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-[var(--muted)] hover:text-[var(--accent)] font-medium">Home</Link>
            <Link href="/explore" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-[var(--muted)] hover:text-[var(--accent)] font-medium">Explore</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-[var(--muted)] hover:text-[var(--accent)] font-medium">About</Link>
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-[var(--muted)] hover:text-[var(--accent)] font-medium">Dashboard</Link>
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="block w-full text-left px-3 py-2 text-[var(--danger)] font-medium flex items-center gap-2"
                >
                  <FiLogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-[var(--accent)] font-medium">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
