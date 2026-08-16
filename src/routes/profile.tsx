import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Settings } from "lucide-react";
import { useState } from "react";

import { creators, media, posts } from "@/lib/data";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Shopitt" },
      { name: "description", content: "Your style identity on Shopitt: looks, collections and saved inspiration." },
      { property: "og:title", content: "Profile — Shopitt" },
      { property: "og:description", content: "Who you are, what you love, how your style feels." },
    ],
  }),
  component: Profile,
});

const tabs = ["Looks", "Collections", "Saved", "Shorts"] as const;

function Profile() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Looks");
  const grid = Object.values(media);

  return (
    <div className="pb-32 md:pb-16">
      <div className="relative h-40 md:h-56" style={{ background: "var(--gradient-hero)" }} />
      <div className="mx-auto max-w-[1100px] px-4 md:px-8">
        <div className="-mt-12 flex items-end gap-4">
          <img src={media.post4} alt="" className="h-24 w-24 rounded-full border-4 border-background object-cover" />
          <div className="min-w-0 pb-2">
            <h1 className="flex items-center gap-1 truncate text-2xl font-bold">
              Happy <BadgeCheck className="h-5 w-5 text-[color:var(--pink)]" strokeWidth={1.8} />
            </h1>
            <p className="truncate text-sm text-muted-foreground">@happy · Lusaka</p>
          </div>
          <button aria-label="Settings" className="ml-auto rounded-full p-2 hover:bg-muted">
            <Settings className="h-5 w-5" strokeWidth={1.6} />
          </button>
        </div>

        <p className="mt-4 max-w-[52ch] text-sm">
          Soft tailoring, loud sneakers. Building a wardrobe that feels like a mood board.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Minimal", "Streetwear", "African print", "Golden hour"].map((s) => (
            <span key={s} className="rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-5 flex gap-8 text-sm">
          <span><b>128</b> <span className="text-muted-foreground">looks</span></span>
          <span><b>4.2K</b> <span className="text-muted-foreground">followers</span></span>
          <span><b>310</b> <span className="text-muted-foreground">following</span></span>
        </div>

        <div className="mt-6 flex gap-3">
          <button className="brand-gradient-bg flex-1 rounded-full py-2.5 text-sm font-semibold md:max-w-40">Edit profile</button>
          <button className="flex-1 rounded-full border border-border py-2.5 text-sm font-medium md:max-w-40">Share</button>
        </div>

        <p className="mt-8 text-[11px] uppercase tracking-widest text-muted-foreground">Connections</p>
        <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto">
          {creators.map((c) => (
            <div key={c.id} className="flex w-16 shrink-0 flex-col items-center gap-1">
              <img src={c.avatar} alt={c.name} loading="lazy" className="h-14 w-14 rounded-full object-cover" />
              <span className="w-full truncate text-center text-[10px] text-muted-foreground">{c.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-2 border-b border-border">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-3 text-sm ${t === tab ? "border-b-2 border-[color:var(--pink)] font-semibold" : "text-muted-foreground"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-1 grid grid-cols-3 gap-[2px]">
        {(tab === "Saved" ? grid.slice().reverse() : grid).map((src, i) => (
          <img key={`${tab}-${i}`} src={src} alt="" loading="lazy" className="aspect-square w-full object-cover" />
        ))}
      </div>

      <div className="mx-auto mt-8 max-w-[1100px] px-4 md:px-8">
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Recent story</p>
        <p className="mt-2 max-w-[60ch] text-sm text-muted-foreground">{posts[1]?.caption}</p>
      </div>
    </div>
  );
}
