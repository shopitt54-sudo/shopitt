import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

import { discoverTiles, posts, creators } from "@/lib/data";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover — Shopitt" },
      { name: "description", content: "A visual fashion universe: streetwear, sneakers, luxury, African fashion and campus fits." },
      { property: "og:title", content: "Discover — Shopitt" },
      { property: "og:description", content: "Explore looks, creators and fashion culture." },
    ],
  }),
  component: Discover,
});

const chips = ["For you", "Campus Fits", "Streetwear", "Sneakers", "African Fashion", "Luxury", "Beauty", "Editorial"];

function Discover() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-32 pt-4 md:px-8 md:pb-16">
      <h1 className="text-3xl font-bold md:text-5xl">What should you discover today?</h1>
      <p className="mt-2 text-sm text-muted-foreground">Not a catalogue. A universe of looks, people and culture.</p>

      <div className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
        {chips.map((c, i) => (
          <button
            key={c}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium ${
              i === 0 ? "brand-gradient-bg" : "border border-border text-muted-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
        {discoverTiles.map((t, i) => (
          <Link
            key={t.title}
            to="/search"
            className={`group relative overflow-hidden ${i % 5 === 0 ? "row-span-2 aspect-[3/5]" : "aspect-[3/4]"}`}
          >
            <img src={t.image} alt={t.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-sm font-semibold text-white">
              {t.title}
            </span>
          </Link>
        ))}
      </div>

      <h2 className="mt-10 text-xl font-semibold">Creators to follow</h2>
      <div className="no-scrollbar -mx-4 mt-4 flex gap-3 overflow-x-auto px-4 md:mx-0 md:px-0">
        {creators.map((c) => (
          <Link key={c.id} to="/profile" className="w-40 shrink-0 border border-border p-3">
            <img src={c.avatar} alt={c.name} loading="lazy" className="h-16 w-16 rounded-full object-cover" />
            <p className="mt-2 truncate text-sm font-semibold">{c.name}</p>
            <p className="truncate text-xs text-muted-foreground">{c.handle}</p>
            <span className="brand-gradient-bg mt-3 block rounded-full py-1.5 text-center text-[11px] font-semibold">Follow</span>
          </Link>
        ))}
      </div>

      <h2 className="mt-10 flex items-center gap-2 text-xl font-semibold">
        <Sparkles className="h-5 w-5 text-[color:var(--pink)]" strokeWidth={1.6} /> Editorial today
      </h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {posts.slice(0, 2).map((p) => (
          <article key={p.id} className="relative overflow-hidden">
            <img src={p.images[0]} alt={p.caption} loading="lazy" className="aspect-[16/10] w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-sm text-white/80">{p.creator.name}</p>
              <p className="max-w-[40ch] text-base font-semibold text-white">{p.caption}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
