import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";

export type AuthIntent =
  | "like"
  | "comment"
  | "follow"
  | "save"
  | "share"
  | "message"
  | "create"
  | "bag"
  | "order"
  | "tryon"
  | "profile"
  | "alerts"
  | "chat"
  | "studio"
  | "subscribe"
  | "generic";

export const authCopy: Record<AuthIntent, { title: string; body: string }> = {
  like: { title: "Want to keep this feeling?", body: "Sign in to like and save the looks that inspire you." },
  comment: { title: "Join the conversation.", body: "Sign in to share your thoughts with the Shopitt community." },
  follow: { title: "Find your people.", body: "Sign in to follow creators and build your fashion world." },
  save: { title: "Don't lose this look.", body: "Sign in to save inspiration for later." },
  share: { title: "Share the feeling.", body: "Sign in to share looks with the people who get you." },
  message: { title: "Connect with the people behind the looks.", body: "Sign in to start conversations on Shopitt." },
  create: { title: "Ready to create?", body: "Share your style with the Shopitt community." },
  bag: { title: "Keep your bag with you.", body: "Sign in so your picks stay saved wherever you open Shopitt." },
  order: { title: "Almost yours.", body: "Sign in to place your order and track every drop." },
  tryon: { title: "See it on you.", body: "Sign in to generate, save and share your AI try-ons." },
  profile: { title: "Your style world is waiting.", body: "Sign in to build your profile, save inspiration and follow the people who inspire you." },
  alerts: { title: "Stay in the loop.", body: "Sign in to follow creators, receive reactions and never miss what's happening on Shopitt." },
  chat: { title: "Your conversations live here.", body: "Sign in to connect with creators, sellers and your community." },
  studio: { title: "Build your Shopitt business.", body: "Sign in to open your creator and seller tools." },
  subscribe: { title: "Never miss a drop.", body: "Sign in to subscribe to the creators and sellers you love." },
  generic: { title: "Make Shopitt yours.", body: "Save the looks you love. Follow the people who inspire you. Join the fashion conversation." },
};

type RequireAuthArgs = { action: () => void; context?: AuthIntent };

type AuthContextValue = {
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  requireAuth: (args: RequireAuthArgs) => boolean;
  signOut: () => Promise<void>;
  modal: { open: boolean; context: AuthIntent };
  closeModal: () => void;
  runPending: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; context: AuthIntent }>({ open: false, context: "generic" });
  const pending = useRef<(() => void) | null>(null);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data: d }) => {
      setSession(d.session);
      setLoading(false);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const runPending = useCallback(() => {
    const fn = pending.current;
    pending.current = null;
    setModal((m) => ({ ...m, open: false }));
    if (fn) setTimeout(fn, 0);
  }, []);

  const requireAuth = useCallback(
    ({ action, context = "generic" }: RequireAuthArgs) => {
      if (session) {
        action();
        return true;
      }
      pending.current = action;
      setModal({ open: true, context });
      return false;
    },
    [session],
  );

  const closeModal = useCallback(() => {
    pending.current = null;
    setModal((m) => ({ ...m, open: false }));
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const value = useMemo(
    () => ({
      session,
      loading,
      isAuthenticated: !!session,
      requireAuth,
      signOut,
      modal,
      closeModal,
      runPending,
    }),
    [session, loading, requireAuth, signOut, modal, closeModal, runPending],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

/** Opens the Shopitt auth modal for guests when a whole screen needs an account. */
export function useAuthGate(context: AuthIntent) {
  const { isAuthenticated, loading, requireAuth } = useAuth();
  useEffect(() => {
    if (!loading && !isAuthenticated) requireAuth({ action: () => {}, context });
  }, [loading, isAuthenticated, context, requireAuth]);
  return { isAuthenticated, loading };
}
