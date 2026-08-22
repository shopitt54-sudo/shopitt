import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, Heart, Plus, TrendingUp, Users } from "lucide-react";

import { GuestGate } from "@/components/shopitt/GuestGate";
import { useAuthGate } from "@/lib/auth";
import { media } from "@/lib/data";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Creator Studio — Shopitt" },
      { name: "description", content: "Your content, your audience, your culture. Track how your looks travel across Shopitt." },
      { property: "og:title", content: "Creator Studio — Shopitt" },
      { property: "og:description", content: "Content, audience and performance for Shopitt creators." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Studio,
});

const stats = [
  { label: "Views", value: "—", icon: Eye },
  { label: "Followers", value: "—", icon: Users },
  { label: "Reactions", value: "—", icon: Heart },
  { label: "Growth", value: "—", icon: TrendingUp },
];

function Studio() {
  const { isAuthenticated, loading } = useAuthGate("studio");
  if (loading || !isAuthenticated) return <GuestGate context="studio" />;

  return (
    <div className="mx-auto max-w-[1100px] px-4 pb-32 pt-6 md:px-8 md:pb-16">
      <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Creator Studio</p>
      <h1 className="mt-1 text-3xl font-bold">Your culture, measured quietly.</h1>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="border border-border p-4">
            <s.icon className="h-[18px] w-[18px] text-[color:var(--pink)]" strokeWidth={1.6} />
            <p className="mt-3 text-2xl font-semibold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-[11px] uppercase tracking-widest text-muted-foreground">Your posts</p>
      <div className="mt-3 border border-dashed border-border p-10 text-center">
        <p className="text-sm font-medium">Nothing published yet.</p>
        <p className="mt-1 text-sm text-muted-foreground">Your first look sets the tone for everything after it.</p>
        <Link to="/create" className="brand-gradient-bg mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold">
          <Plus className="h-4 w-4" strokeWidth={2} />
          Create a post
        </Link>
      </div>

      <p className="mt-10 text-[11px] uppercase tracking-widest text-muted-foreground">Inspiration from Shopitt</p>
      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
        {Object.values(media).map((src) => (
          <img key={src} src={src} alt="" loading="lazy" className="h-48 w-36 shrink-0 object-cover" />
        ))}
      </div>
    </div>
  );
}
