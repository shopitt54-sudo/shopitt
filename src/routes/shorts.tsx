import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Bookmark, Heart, MessageCircle, Send, Sparkles } from "lucide-react";
import { useState } from "react";

import { shorts } from "@/lib/data";
import { Logo } from "@/components/shopitt/Logo";

export const Route = createFileRoute("/shorts")({
  head: () => ({
    meta: [
      { title: "Shorts — Shopitt" },
      { name: "description", content: "Fashion entertainment: vertical style videos from Shopitt creators." },
      { property: "og:title", content: "Shorts — Shopitt" },
      { property: "og:description", content: "Watch, feel, discover, try, share." },
    ],
  }),
  component: Shorts,
});

function ShortItem({ item }: { item: (typeof shorts)[number] }) {
  const [liked, setLiked] = useState(false);
  return (
    <section className="relative h-[100svh] w-full shrink-0 snap-start snap-always overflow-hidden bg-black">
      <img src={item.image} alt={item.caption} className="h-full w-full object-cover opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />

      <div className="absolute bottom-28 right-3 z-20 flex flex-col items-center gap-5 text-white md:bottom-10">
        <button onClick={() => setLiked(!liked)} className="flex flex-col items-center gap-1 text-[11px]">
          <Heart className={`h-7 w-7 ${liked ? "fill-[color:var(--pink)] text-[color:var(--pink)]" : ""}`} strokeWidth={1.6} />
          {item.likes}
        </button>
        <button className="flex flex-col items-center gap-1 text-[11px]">
          <MessageCircle className="h-7 w-7" strokeWidth={1.6} />
          {item.comments}
        </button>
        <button className="flex flex-col items-center gap-1 text-[11px]">
          <Send className="h-7 w-7" strokeWidth={1.6} />
          {item.shares}
        </button>
        <button className="flex flex-col items-center gap-1 text-[11px]">
          <Bookmark className="h-7 w-7" strokeWidth={1.6} />
          Save
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-24 z-20 px-4 text-white md:bottom-8">
        <div className="flex items-center gap-2">
          <img src={item.creator.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
          <span className="text-sm font-semibold">{item.creator.handle}</span>
          <button className="rounded-full border border-white/60 px-3 py-1 text-[11px]">Follow</button>
        </div>
        <p className="mt-2 max-w-[32ch] text-sm">{item.caption}</p>
        <Link to="/tryon" className="brand-gradient-bg mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold">
          <Sparkles className="h-4 w-4" strokeWidth={1.8} /> Try this look
        </Link>
      </div>
    </section>
  );
}

function Shorts() {
  return (
    <div className="relative">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 pt-safe">
        <div className="pointer-events-auto flex items-center gap-2 py-3">
          <Link to="/" aria-label="Back" className="rounded-full bg-black/40 p-2 text-white">
            <ArrowLeft className="h-5 w-5" strokeWidth={1.6} />
          </Link>
          <Logo className="h-6 invert" />
          <span className="text-sm font-semibold text-white">Shorts</span>
        </div>
      </div>
      <div className="no-scrollbar h-[100svh] snap-y snap-mandatory overflow-y-auto">
        {shorts.map((s) => (
          <ShortItem key={s.id} item={s} />
        ))}
      </div>
    </div>
  );
}
