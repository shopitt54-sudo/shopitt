import { Sparkles } from "lucide-react";

import { authCopy, useAuth, type AuthIntent } from "@/lib/auth";
import { Logo } from "./Logo";

/** Quiet placeholder shown behind the auth modal for account-only screens. */
export function GuestGate({ context }: { context: AuthIntent }) {
  const { requireAuth } = useAuth();
  const copy = authCopy[context];

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6 pb-32 pt-24 text-center md:pb-16">
      <Logo className="h-7" />
      <h1 className="mt-8 text-2xl font-bold tracking-tight">{copy.title}</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy.body}</p>
      <button
        onClick={() => requireAuth({ action: () => {}, context })}
        className="brand-gradient-bg mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
      >
        <Sparkles className="h-4 w-4" strokeWidth={1.8} />
        Continue
      </button>
    </div>
  );
}
