import { type ReactNode, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useIsAdmin } from "@/hooks/use-is-admin";
import { useAuth } from "@/hooks/use-auth";
import { Shield } from "lucide-react";

/**
 * Gate admin pages by role. Redirects unauthenticated users to /login
 * and non-admins to home. No password prompt — role-based only.
 */
export function AdminGate({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading } = useIsAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading || authLoading) return;
    if (!user) {
      navigate({ to: "/login" });
      return;
    }
    if (!isAdmin) navigate({ to: "/" });
  }, [user, isAdmin, loading, authLoading, navigate]);

  if (loading || authLoading || !user || !isAdmin) {
    return (
      <div className="mx-auto flex min-h-[40vh] max-w-md flex-col items-center justify-center px-4 py-10 text-muted-foreground">
        <Shield className="mb-2 h-6 w-6" />
        <p className="text-sm">Checking admin access…</p>
      </div>
    );
  }

  return <>{children}</>;
}

export const AdminGuard = AdminGate;
