"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "user" | "admin";
}

export interface AuthContextValue {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  signInWithGoogle: () => Promise<void>;
  clearError: () => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Storage helpers ─────────────────────────────────────────────────────────
// PRODUCTION NOTE: Replace localStorage with httpOnly cookies set by the
// server. For now, localStorage is used as a placeholder during development.
// httpOnly cookies prevent XSS token theft entirely.

const TOKEN_KEY = "tripcraft_token";
const USER_KEY = "tripcraft_user";

function saveSession(token: string, user: User) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

function readSession(): { token: string | null; user: User | null } {
  if (typeof window === "undefined") return { token: null, user: null };
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const rawUser = localStorage.getItem(USER_KEY);
    const user = rawUser ? (JSON.parse(rawUser) as User) : null;
    return { token, user };
  } catch {
    return { token: null, user: null };
  }
}

// ─── Provider ─────────────────────────────────────────────────────────────────

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Rehydrate auth state on mount
  useEffect(() => {
    const { user: savedUser } = readSession();
    if (savedUser) setUser(savedUser);
    setLoading(false);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  // ── Login ──────────────────────────────────────────────────────────────────
  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed. Please try again.");

      saveSession(data.token, data.user);
      setUser(data.user);

      // Redirect to saved location or "/"
      const redirect = sessionStorage.getItem("redirect_after_login") || "/";
      sessionStorage.removeItem("redirect_after_login");
      router.push(redirect);
    } catch (err) {
      // Stub: in dev without a real backend, accept demo credentials locally
      if (
        email === "demo@tripcraft.com" &&
        password === "Demo@1234"
      ) {
        const demoUser: User = {
          id: "demo-001",
          name: "Demo User",
          email: "demo@tripcraft.com",
          role: "user",
        };
        const fakeToken = "demo_token_local";
        saveSession(fakeToken, demoUser);
        setUser(demoUser);
        const redirect = sessionStorage.getItem("redirect_after_login") || "/";
        sessionStorage.removeItem("redirect_after_login");
        router.push(redirect);
      } else {
        setError(err instanceof Error ? err.message : "Login failed.");
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  // ── Register ───────────────────────────────────────────────────────────────
  const register = useCallback(async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed. Please try again.");

      saveSession(data.token, data.user);
      setUser(data.user);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  // ── Google Sign-In (stub) ──────────────────────────────────────────────────
  const signInWithGoogle = useCallback(async () => {
    setError(null);
    // TODO: Integrate Google OAuth. Wire up NEXT_PUBLIC_GOOGLE_CLIENT_ID and
    //       handle the callback at /api/auth/google on the server.
    alert("Google Sign-In is not yet configured. Please use email/password.");
  }, []);

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    clearSession();
    setUser(null);
    router.push("/");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, signInWithGoogle, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
