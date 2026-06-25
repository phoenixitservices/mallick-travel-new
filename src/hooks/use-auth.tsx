import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { logAudit } from "@/lib/audit";

export type AppRole = "admin" | "hr_manager" | "manager" | "employee";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  roles: AppRole[];
  loading: boolean;
  signOut: () => Promise<void>;
  hasRole: (r: AppRole | AppRole[]) => boolean;
  isAdmin: boolean;
  isHR: boolean;
  isManager: boolean;
  refreshRoles: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  const loadRoles = async (uid: string) => {
    const { data } = await supabase.from("user_roles").select("role").eq("user_id", uid);
    setRoles((data ?? []).map((r) => r.role as AppRole));
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) {
        setTimeout(() => loadRoles(sess.user.id), 0);
      } else {
        setRoles([]);
      }
      if (_event === "SIGNED_OUT") {
        queryClient.clear();
      } else if (_event === "SIGNED_IN") {
        queryClient.invalidateQueries();
        if (sess?.user) void logAudit({ action: "sign_in", entity_type: "auth", entity_id: sess.user.id, description: `Signed in as ${sess.user.email}` });
      } else if (_event === "USER_UPDATED") {
        queryClient.invalidateQueries();
      }
    });

    supabase.auth.getSession().then(({ data: { session: sess } }) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) loadRoles(sess.user.id).finally(() => setLoading(false));
      else setLoading(false);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasRole = (r: AppRole | AppRole[]) => {
    const arr = Array.isArray(r) ? r : [r];
    return arr.some((x) => roles.includes(x));
  };

  const value: AuthContextValue = {
    user,
    session,
    roles,
    loading,
    signOut: async () => {
      if (user) await logAudit({ action: "sign_out", entity_type: "auth", entity_id: user.id, description: `Signed out ${user.email}` });
      await supabase.auth.signOut();
    },
    hasRole,
    isAdmin: roles.includes("admin"),
    isHR: roles.includes("admin") || roles.includes("hr_manager"),
    isManager: roles.includes("manager") || roles.includes("admin") || roles.includes("hr_manager"),
    refreshRoles: async () => { if (user) await loadRoles(user.id); },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
