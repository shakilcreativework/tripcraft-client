"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { FiMail, FiLock, FiEye, FiEyeOff, FiZap, FiAlertCircle } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

// ─── Field validation ─────────────────────────────────────────────────────────

function validate(email: string, password: string): string | null {
  if (!email) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
  if (!password) return "Password is required.";
  if (password.length < 6) return "Password must be at least 6 characters.";
  return null;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const { login, signInWithGoogle, loading, error, clearError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [clientError, setClientError] = useState<string | null>(null);

  // Clear server error when the user starts typing
  useEffect(() => {
    if (error) clearError();
    setClientError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  const displayError = clientError || error;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate(email, password);
    if (err) { setClientError(err); return; }
    await login(email, password);
  };

  const handleDemoLogin = async () => {
    setEmail("demo@tripcraft.com");
    setPassword("Demo@1234");
    await login("demo@tripcraft.com", "Demo@1234");
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-[var(--background)] px-4 py-16">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-[var(--shadow-card-hover)] p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-4">
              <span className="text-3xl font-bold text-[var(--accent)] text-serif">TripCraft</span>
            </Link>
            <h1 className="text-2xl font-bold text-[var(--foreground)] mb-1">Welcome back</h1>
            <p className="text-sm text-[var(--muted)]">Sign in to continue your adventure</p>
          </div>

          {/* Error Banner */}
          {displayError && (
            <div className="flex items-start gap-2 p-3 mb-5 rounded-xl bg-[var(--danger-soft)] border border-[var(--danger)]/20 text-[var(--danger)] text-sm">
              <FiAlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{displayError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">

            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                Email address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--foreground)] placeholder:text-[var(--input-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-shadow text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="login-password" className="block text-sm font-medium text-[var(--foreground)]">
                  Password
                </label>
                <a href="#" className="text-xs text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--foreground)] placeholder:text-[var(--input-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-shadow text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold transition-colors shadow-lg shadow-[var(--accent)]/20 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Demo Login */}
          <button
            id="demo-login"
            onClick={handleDemoLogin}
            disabled={loading}
            className="mt-3 w-full py-3 rounded-xl border-2 border-dashed border-[var(--accent)]/50 text-[var(--accent)] font-semibold hover:bg-[var(--accent-soft)] transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-60"
          >
            <FiZap className="w-4 h-4" />
            Demo Login (auto-fill & submit)
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-grow h-px bg-[var(--border)]" />
            <span className="text-xs text-[var(--muted)]">or continue with</span>
            <div className="flex-grow h-px bg-[var(--border)]" />
          </div>

          {/* Google */}
          <button
            id="google-signin"
            type="button"
            onClick={signInWithGoogle}
            className="w-full py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--foreground)] font-medium transition-colors flex items-center justify-center gap-2.5 text-sm shadow-[var(--shadow-card)]"
          >
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </button>

          {/* Register link */}
          <p className="text-center text-sm text-[var(--muted)] mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[var(--accent)] hover:text-[var(--accent-hover)] font-medium transition-colors">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
