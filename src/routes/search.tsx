import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Search as SearchIcon } from "lucide-react";
import { useState } from "react";

import { creators, discoverTiles, posts } from "@/lib/data";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search — Shopitt" },
      { name: "description", content: "Search looks, people, styles and moods. Natural-language fashion discovery." },
      { property: "og:title", content: "Search — Shopitt" },
      { property: "og:description", content: "Find a feeling, not just a product." },
    ],
  }),
  component: SearchPage,
});

const suggestions = [
  "Something for Friday night",
  "Campus outfits",
  "Something that feels expensive",
  "Streetwear in Lusaka",
  "Black oversized tee",
];
const filters = ["All", "Looks", "Creators", "Shorts", "Drops", "Collections"] as const;

function SearchPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-32 pt-4 md:px-8 md:pb-16">
      <div className="flex items-center gap-2 rounded-full border border-border px-4 py-3">
        <SearchIcon className="h-5 w-5 shrink-0 text-muted-foreground" strokeWidth={1.6} />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search looks, people, styles..."
          className="min-w-0 flex-1 bg-transparent text-sm outline-none"
        />
        <button aria-label="Visual search" className="shrink-0 rounded-full p-1 text-[color:var(--pink)]">
          <Camera className="h-5 w-5" strokeWidth={1.6} />
        </button>
      </div>

      <div className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium ${
              f === filter ? "brand-gradient-bg" : "border border-border text-muted-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {!q && (
        <>
          <p className="mt-8 text-[11px] uppercase tracking-widest text-muted-foreground">Try asking</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button key={s} onClick={() => setQ(s)} className="rounded-full border border-border px-3 py-1.5 text-xs">
                {s}
              </button>
            ))}
          </div>
        </>
      )}

      {(filter === "All" || filter === "Creators") && (
        <>
          <p className="mt-8 text-[11px] uppercase tracking-widest text-muted-foreground">People</p>
          <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto">
            {creators.map((c) => (
              <Link key={c.id} to="/profile" className="flex w-16 shrink-0 flex-col items-center gap-1">
                <img src={c.avatar} alt={c.name} loading="lazy" className="h-14 w-14 rounded-full object-cover" />
                <span className="w-full truncate text-center text-[10px] text-muted-foreground">{c.name}</span>
              </Link>
            ))}
          </div>
        </>
      )}

      <p className="mt-8 text-[11px] uppercase tracking-widest text-muted-foreground">
        {q ? `Results for “${q}”` : "Looks you might love"}
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
        {discoverTiles.map((t) => (
          <div key={t.title} className="relative overflow-hidden">
            <img src={t.image} alt={t.title} loading="lazy" className="aspect-[3/4] w-full object-cover" />
            <span className="absolute bottom-2 left-2 glass rounded-full px-2 py-0.5 text-[10px]">{t.title}</span>
          </div>
        ))}
      </div>

      <p className="mt-8 text-[11px] uppercase tracking-widest text-muted-foreground">Drops</p>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {posts.filter((p) => p.kind === "product").map((p) => (
          <Link key={p.id} to="/product/$productId" params={{ productId: p.id }} className="flex gap-3 border border-border p-3">
            <img src={p.images[0]} alt="" loading="lazy" className="h-20 w-16 shrink-0 object-cover" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{p.dropTitle}</p>
              <p className="truncate text-xs text-muted-foreground">{p.creator.name}</p>
              <p className="mt-1 text-sm font-semibold">{p.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
