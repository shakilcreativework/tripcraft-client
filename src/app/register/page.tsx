"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle, FiCheck } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

// ─── Validation ───────────────────────────────────────────────────────────────

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

function validate(name: string, email: string, password: string, confirmPassword: string): FormErrors {
  const errors: FormErrors = {};
  if (!name.trim()) errors.name = "Full name is required.";
  else if (name.trim().length < 2) errors.name = "Name must be at least 2 characters.";

  if (!email) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email.";

  if (!password) errors.password = "Password is required.";
  else if (password.length < 8) errors.password = "Password must be at least 8 characters.";
  else if (!/[A-Z]/.test(password)) errors.password = "Must include at least one uppercase letter.";
  else if (!/[0-9]/.test(password)) errors.password = "Must include at least one number.";

  if (!confirmPassword) errors.confirmPassword = "Please confirm your password.";
  else if (confirmPassword !== password) errors.confirmPassword = "Passwords do not match.";

  return errors;
}

// ─── Password strength ────────────────────────────────────────────────────────

function getStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: "Weak", color: "bg-red-400" };
  if (score === 2) return { score, label: "Fair", color: "bg-yellow-400" };
  if (score === 3) return { score, label: "Good", color: "bg-blue-400" };
  return { score, label: "Strong", color: "bg-green-500" };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RegisterPage() {
  const { register, signInWithGoogle, loading, error, clearError } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const strength = getStrength(password);

  // Clear server error when user edits fields
  useEffect(() => {
    if (error) clearError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, email, password, confirmPassword]);

  const handleBlur = (field: string) => setTouched((t) => ({ ...t, [field]: true }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Touch all fields for final validation display
    setTouched({ name: true, email: true, password: true, confirmPassword: true });
    const errors = validate(name, email, password, confirmPassword);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    await register(name, email, password);
  };

  // Inline validation on blur
  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      setFieldErrors(validate(name, email, password, confirmPassword));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, email, password, confirmPassword]);

  return (
    <div className="flex-grow flex items-center justify-center bg-[var(--background)] px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-[var(--shadow-card-hover)] p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-4">
              <span className="text-3xl font-bold text-[var(--accent)] text-serif">TripCraft</span>
            </Link>
            <h1 className="text-2xl font-bold text-[var(--foreground)] mb-1">Create your account</h1>
            <p className="text-sm text-[var(--muted)]">Start planning your dream trips today</p>
          </div>

          {/* Server Error Banner */}
          {error && (
            <div className="flex items-start gap-2 p-3 mb-5 rounded-xl bg-[var(--danger-soft)] border border-[var(--danger)]/20 text-[var(--danger)] text-sm">
              <FiAlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">

            {/* Full Name */}
            <div>
              <label htmlFor="reg-name" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                <input
                  id="reg-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => handleBlur("name")}
                  placeholder="Jane Smith"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                    touched.name && fieldErrors.name
                      ? "border-[var(--danger)] focus:ring-[var(--danger)]"
                      : "border-[var(--input-border)] focus:ring-[var(--accent)]"
                  } bg-[var(--input-bg)] text-[var(--foreground)] placeholder:text-[var(--input-placeholder)] focus:outline-none focus:ring-2 focus:border-transparent transition-shadow text-sm`}
                />
              </div>
              {touched.name && fieldErrors.name && (
                <p className="mt-1 text-xs text-[var(--danger)]">{fieldErrors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="reg-email" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                Email address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                <input
                  id="reg-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur("email")}
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                    touched.email && fieldErrors.email
                      ? "border-[var(--danger)] focus:ring-[var(--danger)]"
                      : "border-[var(--input-border)] focus:ring-[var(--accent)]"
                  } bg-[var(--input-bg)] text-[var(--foreground)] placeholder:text-[var(--input-placeholder)] focus:outline-none focus:ring-2 focus:border-transparent transition-shadow text-sm`}
                />
              </div>
              {touched.email && fieldErrors.email && (
                <p className="mt-1 text-xs text-[var(--danger)]">{fieldErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="reg-password" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur("password")}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl border ${
                    touched.password && fieldErrors.password
                      ? "border-[var(--danger)] focus:ring-[var(--danger)]"
                      : "border-[var(--input-border)] focus:ring-[var(--accent)]"
                  } bg-[var(--input-bg)] text-[var(--foreground)] placeholder:text-[var(--input-placeholder)] focus:outline-none focus:ring-2 focus:border-transparent transition-shadow text-sm`}
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
              {touched.password && fieldErrors.password && (
                <p className="mt-1 text-xs text-[var(--danger)]">{fieldErrors.password}</p>
              )}

              {/* Password Strength Bar */}
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i <= strength.score ? strength.color : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-[var(--muted)]">
                    Strength: <span className="font-medium text-[var(--foreground)]">{strength.label}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="reg-confirm" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                <input
                  id="reg-confirm"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => handleBlur("confirmPassword")}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl border ${
                    touched.confirmPassword && fieldErrors.confirmPassword
                      ? "border-[var(--danger)] focus:ring-[var(--danger)]"
                      : confirmPassword && confirmPassword === password
                      ? "border-green-500 focus:ring-green-500"
                      : "border-[var(--input-border)] focus:ring-[var(--accent)]"
                  } bg-[var(--input-bg)] text-[var(--foreground)] placeholder:text-[var(--input-placeholder)] focus:outline-none focus:ring-2 focus:border-transparent transition-shadow text-sm`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                  aria-label={showConfirm ? "Hide" : "Show"}
                >
                  {confirmPassword && confirmPassword === password ? (
                    <FiCheck className="w-4 h-4 text-green-500" />
                  ) : showConfirm ? (
                    <FiEyeOff className="w-4 h-4" />
                  ) : (
                    <FiEye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {touched.confirmPassword && fieldErrors.confirmPassword && (
                <p className="mt-1 text-xs text-[var(--danger)]">{fieldErrors.confirmPassword}</p>
              )}
            </div>

            {/* Submit */}
            <button
              id="register-submit"
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold transition-colors shadow-lg shadow-[var(--accent)]/20 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                  Creating account…
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-grow h-px bg-[var(--border)]" />
            <span className="text-xs text-[var(--muted)]">or sign up with</span>
            <div className="flex-grow h-px bg-[var(--border)]" />
          </div>

          {/* Google */}
          <button
            id="google-register"
            type="button"
            onClick={signInWithGoogle}
            className="w-full py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--foreground)] font-medium transition-colors flex items-center justify-center gap-2.5 text-sm shadow-[var(--shadow-card)]"
          >
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </button>

          {/* Login link */}
          <p className="text-center text-sm text-[var(--muted)] mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--accent)] hover:text-[var(--accent-hover)] font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
