import { Download, X } from "lucide-react";
import { useEffect, useState } from "react";

import { LogoMark } from "./Logo";
import { useInstall } from "@/lib/install";

export function InstallPrompt() {
  const { canInstall, install, installed, iosHint } = useInstall();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setDismissed(localStorage.getItem("shopitt-install-dismissed") === "1");
  }, []);

  if (installed || dismissed || (!canInstall && !iosHint)) return null;

  const close = () => {
    localStorage.setItem("shopitt-install-dismissed", "1");
    setDismissed(true);
  };

  return (
    <div className="animate-rise fixed inset-x-3 bottom-24 z-50 md:inset-x-auto md:right-6 md:bottom-6 md:w-[380px]">
      <div className="glass flex items-center gap-3 rounded-2xl border border-border p-3 shadow-[var(--shadow-lift)]">
        <LogoMark className="h-11 w-11 shrink-0 rounded-xl" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">Install Shopitt</p>
          <p className="truncate text-xs text-muted-foreground">
            {iosHint ? "Share → Add to Home Screen" : "Full screen, on your home screen."}
          </p>
        </div>
        {!iosHint && (
          <button
            onClick={install}
            className="brand-gradient-bg flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold"
          >
            <Download className="h-4 w-4" strokeWidth={1.8} />
            Install
          </button>
        )}
        <button aria-label="Dismiss" onClick={close} className="shrink-0 rounded-full p-1.5 hover:bg-muted">
          <X className="h-4 w-4" strokeWidth={1.6} />
        </button>
      </div>
    </div>
  );
}