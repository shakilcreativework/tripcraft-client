"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute — wraps any page that requires authentication.
 *
 * Usage (in a Next.js App Router layout or page):
 *   <ProtectedRoute><DashboardPage /></ProtectedRoute>
 *
 * On mount:
 *  - If the user is not logged in, the current path is saved to sessionStorage
 *    and the user is redirected to /login.
 *  - After a successful login, AuthContext reads sessionStorage and redirects
 *    back here automatically.
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      // Save the attempted path so login can redirect back
      sessionStorage.setItem("redirect_after_login", pathname);
      router.replace("/login");
    }
  }, [user, loading, pathname, router]);

  // While checking auth, show a spinner so there's no layout flash
  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[var(--muted)]">Checking authentication…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
