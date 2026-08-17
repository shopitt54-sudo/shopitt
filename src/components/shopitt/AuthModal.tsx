import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { lovable } from "@/integrations/lovable/index";
import { authCopy, useAuth } from "@/lib/auth";
import { Logo } from "./Logo";

function GoogleMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden focusable="false">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 3-2.26 5.54-4.78 7.25l7.73 6c4.51-4.18 7.09-10.36 7.09-17.72z" />
      <path fill="#FBBC05" d="M10.53 28.59A14.5 14.5 0 0 1 9.77 24c0-1.6.28-3.14.76-4.59l-7.98-6.19A23.94 23.94 0 0 0 0 24c0 3.88.93 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
      <path fill="none" d="M0 0h48v48H0z" />
    </svg>
  );
}

export function AuthModal() {
  const { modal, closeModal, isAuthenticated, runPending } = useAuth();
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  // Successful sign-in: replay the action the guest originally attempted.
  useEffect(() => {
    if (isAuthenticated && modal.open) runPending();
  }, [isAuthenticated, modal.open, runPending]);

  useEffect(() => {
    if (!modal.open) {
      setBusy(false);
      setFailed(false);
      return;
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal.open, closeModal]);

  if (!modal.open) return null;

  const copy = authCopy[modal.context];

  const onGoogle = async () => {
    setBusy(true);
    setFailed(false);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        setFailed(true);
        setBusy(false);
        return;
      }
      if (result.redirected) return;
    } catch {
      setFailed(true);
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true">
      <button
        aria-label="Close"
        onClick={closeModal}
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px] animate-in fade-in duration-200"
      />
      <div className="relative w-full max-w-md animate-in slide-in-from-bottom-6 fade-in duration-300 sm:zoom-in-95 sm:slide-in-from-bottom-0">
        <div className="mx-0 border border-border/70 bg-background px-6 pb-8 pt-7 shadow-[var(--shadow-lift)] rounded-t-3xl sm:mx-4 sm:rounded-3xl">
          <button
            aria-label="Close"
            onClick={closeModal}
            className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted sm:right-8"
          >
            <X className="h-4.5 w-4.5" strokeWidth={1.6} />
          </button>

          <Logo className="h-7" />

          <h2 className="mt-6 text-2xl font-bold leading-tight tracking-tight">
            {failed ? "Something went wrong." : "Make Shopitt yours."}
          </h2>
          <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-muted-foreground">
            {failed ? "Let's try that again." : copy.body}
          </p>
          {!failed && modal.context !== "generic" && (
            <p className="mt-3 text-sm font-medium text-[color:var(--pink)]">{copy.title}</p>
          )}

          <button
            onClick={onGoogle}
            disabled={busy}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-full border border-border bg-card px-5 py-3.5 text-[15px] font-semibold transition-colors hover:bg-muted disabled:opacity-60"
          >
            <GoogleMark />
            {busy ? "Connecting…" : "Continue with Google"}
          </button>

          <button
            onClick={closeModal}
            className="mt-3 w-full rounded-full py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
