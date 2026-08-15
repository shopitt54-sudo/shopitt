import { Link } from "@tanstack/react-router";
import {
  Bell,
  Bookmark,
  Download,
  Info,
  LayoutGrid,
  LifeBuoy,
  LogOut,
  Moon,
  Package,
  Repeat,
  Settings,
  Shield,
  Store,
  Sun,
  UserPlus,
  X,
} from "lucide-react";

import { Logo } from "./Logo";
import { useInstall } from "@/lib/install";
import { useTheme } from "@/lib/theme";

const columnA = [
  { label: "Saved", icon: Bookmark },
  { label: "Collections", icon: LayoutGrid },
  { label: "Orders", icon: Package },
  { label: "Subscriptions", icon: Repeat },
];

const columnB = [
  { label: "Settings", icon: Settings },
  { label: "Notifications", icon: Bell },
  { label: "Privacy", icon: Shield },
  { label: "Support", icon: LifeBuoy },
  { label: "Invite friends", icon: UserPlus },
  { label: "About Shopitt", icon: Info },
];

export function MenuSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { theme, setTheme } = useTheme();
  const { canInstall, install, installed } = useInstall();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={onClose}>
      <aside
        onClick={(e) => e.stopPropagation()}
        className="animate-rise flex h-full w-full max-w-[420px] flex-col overflow-y-auto bg-background pt-safe pb-safe"
      >
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-4">
          <Logo className="h-6" />
          <button aria-label="Close menu" onClick={onClose} className="rounded-full p-2 hover:bg-muted">
            <X className="h-5 w-5" strokeWidth={1.6} />
          </button>
        </div>

        <div className="px-5">
          <button
            onClick={install}
            disabled={!canInstall}
            className="brand-gradient-bg flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold disabled:opacity-50"
          >
            <Download className="h-4 w-4" strokeWidth={1.8} />
            {installed ? "App installed" : canInstall ? "Install App" : "Add to Home Screen"}
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-1 px-5">
          <div>
            {columnA.map((i) => (
              <button key={i.label} className="flex w-full items-center gap-3 rounded-xl px-2 py-3 text-sm hover:bg-muted">
                <i.icon className="h-[18px] w-[18px] text-muted-foreground" strokeWidth={1.6} />
                {i.label}
              </button>
            ))}
            <button
              onClick={() => setTheme("dark")}
              className="flex w-full items-center gap-3 rounded-xl px-2 py-3 text-sm hover:bg-muted"
            >
              <Moon className="h-[18px] w-[18px] text-muted-foreground" strokeWidth={1.6} />
              Dark mode
              {theme === "dark" && <span className="ml-auto h-2 w-2 rounded-full bg-[color:var(--pink)]" />}
            </button>
            <button
              onClick={() => setTheme("light")}
              className="flex w-full items-center gap-3 rounded-xl px-2 py-3 text-sm hover:bg-muted"
            >
              <Sun className="h-[18px] w-[18px] text-muted-foreground" strokeWidth={1.6} />
              Light mode
              {theme === "light" && <span className="ml-auto h-2 w-2 rounded-full bg-[color:var(--pink)]" />}
            </button>
          </div>
          <div>
            {columnB.map((i) => (
              <button key={i.label} className="flex w-full items-center gap-3 rounded-xl px-2 py-3 text-sm hover:bg-muted">
                <i.icon className="h-[18px] w-[18px] text-muted-foreground" strokeWidth={1.6} />
                {i.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-1 border-t border-border px-5 pt-5">
          <Link to="/studio" onClick={onClose} className="flex items-center gap-3 rounded-xl px-2 py-3 text-sm hover:bg-muted">
            <LayoutGrid className="h-[18px] w-[18px] text-muted-foreground" strokeWidth={1.6} />
            Creator Studio
          </Link>
          <Link to="/seller" onClick={onClose} className="flex items-center gap-3 rounded-xl px-2 py-3 text-sm hover:bg-muted">
            <Store className="h-[18px] w-[18px] text-muted-foreground" strokeWidth={1.6} />
            Seller Studio
          </Link>
          <button className="flex w-full items-center gap-3 rounded-xl px-2 py-3 text-sm text-destructive hover:bg-muted">
            <LogOut className="h-[18px] w-[18px]" strokeWidth={1.6} />
            Logout
          </button>
        </div>

        <p className="mt-auto px-5 py-6 text-xs text-muted-foreground">
          Shopitt by H&amp;D Creation — Discover. Try. Buy. Share.
        </p>
      </aside>
    </div>
  );
}