import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Compass,
  Home,
  Menu as MenuIcon,
  MessageCircle,
  PlayCircle,
  Plus,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { Logo } from "./Logo";
import { MenuSheet } from "./MenuSheet";
import { InstallPrompt } from "./InstallPrompt";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/discover", label: "Discover", icon: Compass },
  { to: "/shorts", label: "Shorts", icon: PlayCircle },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/profile", label: "Profile", icon: User },
] as const;

function useHideOnScroll() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 120 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return hidden;
}

export function AppShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const hidden = useHideOnScroll();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const immersive = pathname.startsWith("/shorts");

  return (
    <div className="min-h-screen">
      {/* Mobile app bar */}
      {!immersive && (
        <header className="fixed inset-x-0 top-0 z-40 pt-safe glass border-b border-border/60 md:hidden">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-2.5">
            <Link to="/" className="min-w-0">
              <Logo className="h-6" />
            </Link>
            <div className="flex shrink-0 items-center gap-1">
              <Link to="/search" aria-label="Search" className="rounded-full p-2 hover:bg-muted">
                <Search className="h-5 w-5" strokeWidth={1.6} />
              </Link>
              <Link to="/chats" aria-label="Chats" className="rounded-full p-2 hover:bg-muted">
                <MessageCircle className="h-5 w-5" strokeWidth={1.6} />
              </Link>
              <button
                aria-label="Menu"
                onClick={() => setMenuOpen(true)}
                className="rounded-full p-2 hover:bg-muted"
              >
                <MenuIcon className="h-5 w-5" strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Desktop nav */}
      <header className="fixed inset-x-0 top-0 z-40 hidden border-b border-border/60 glass md:block">
        <div className="mx-auto flex max-w-[1400px] items-center gap-8 px-8 py-3">
          <Link to="/" className="shrink-0">
            <Logo className="h-7" />
          </Link>
          <nav className="flex min-w-0 items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground [&.active]:bg-muted [&.active]:text-foreground"
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <Link
              to="/search"
              className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:bg-muted"
            >
              <Search className="h-4 w-4" strokeWidth={1.6} />
              Search looks, people, styles...
            </Link>
            <Link to="/create" className="brand-gradient-bg flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
              <Plus className="h-4 w-4" strokeWidth={2} />
              Create
            </Link>
            <Link to="/chats" aria-label="Chats" className="rounded-full p-2 hover:bg-muted">
              <MessageCircle className="h-5 w-5" strokeWidth={1.6} />
            </Link>
            <Link to="/bag" aria-label="Bag" className="rounded-full p-2 hover:bg-muted">
              <ShoppingBag className="h-5 w-5" strokeWidth={1.6} />
            </Link>
            <button aria-label="Menu" onClick={() => setMenuOpen(true)} className="rounded-full p-2 hover:bg-muted">
              <MenuIcon className="h-5 w-5" strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </header>

      <main className={immersive ? "" : "pt-[52px] md:pt-[64px]"}>{children}</main>

      {/* Floating create — mobile */}
      {!immersive && (
        <Link
          to="/create"
          aria-label="Create"
          className="brand-gradient-bg fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-[var(--shadow-lift)] transition-transform active:scale-95 md:hidden"
        >
          <Plus className="h-6 w-6" strokeWidth={2} />
        </Link>
      )}

      {/* Bottom nav — mobile */}
      <nav
        className={`fixed inset-x-0 bottom-0 z-40 pb-safe glass border-t border-border/60 transition-transform duration-300 md:hidden ${
          hidden ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <ul className="flex items-stretch justify-between px-2">
          {navItems.map((item) => (
            <li key={item.to} className="flex-1">
              <Link
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="group flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium text-muted-foreground [&.active]:text-foreground"
              >
                <item.icon
                  className="h-[22px] w-[22px] group-[.active]:text-[color:var(--pink)]"
                  strokeWidth={1.6}
                />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <MenuSheet open={menuOpen} onClose={() => setMenuOpen(false)} />
      <InstallPrompt />
    </div>
  );
}