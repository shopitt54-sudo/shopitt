import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { BadgeCheck, Heart, Share2, Sparkles } from "lucide-react";
import { useState } from "react";

import { creators, media, posts } from "@/lib/data";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/product/$productId")({
  head: () => ({
    meta: [
      { title: "Product — Shopitt" },
      { name: "description", content: "Discovered inside a look: sizes, colours, seller and AI try-on." },
      { property: "og:title", content: "Product — Shopitt" },
      { property: "og:description", content: "You discovered this. Now make it yours." },
    ],
  }),
  component: Product,
});

function Product() {
  const { productId } = useParams({ from: "/product/$productId" });
  const { requireAuth } = useAuth();
  const gallery = Object.values(media);
  const [active, setActive] = useState(0);
  const [size, setSize] = useState("M");
  const [saved, setSaved] = useState(false);
  const seller = creators[1]!;
  const post = posts[0];

  return (
    <div className="pb-32 md:pb-16">
      <div className="mx-auto grid max-w-[1200px] gap-8 md:grid-cols-2 md:px-8 md:pt-6">
        <div className="relative">
          <img src={gallery[active]} alt="Product" className="aspect-[4/5] w-full object-cover" />
          <div className="no-scrollbar absolute bottom-3 left-3 flex gap-2 overflow-x-auto">
            {gallery.slice(0, 4).map((src, i) => (
              <button key={src} onClick={() => setActive(i)} className="shrink-0">
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className={`h-14 w-12 object-cover ${i === active ? "ring-2 ring-[color:var(--pink)]" : "opacity-70"}`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 md:px-0">
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Drop · {productId}</p>
          <h1 className="mt-1 text-3xl font-bold">Forest Varsity Set</h1>
          <p className="mt-2 text-2xl font-semibold">K899</p>

          <div className="mt-4 flex items-center gap-3">
            <img src={seller.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
            <div className="min-w-0">
              <p className="flex items-center gap-1 text-sm font-semibold">
                {seller.name}
                <BadgeCheck className="h-4 w-4 text-[color:var(--pink)]" strokeWidth={1.8} />
              </p>
              <p className="text-xs text-muted-foreground">{seller.handle}</p>
            </div>
            <button
              onClick={() => requireAuth({ action: () => {}, context: "follow" })}
              className="ml-auto rounded-full border border-border px-4 py-1.5 text-xs font-medium"
            >
              Follow
            </button>
          </div>

          <p className="mt-5 max-w-[52ch] text-sm leading-relaxed text-muted-foreground">{post?.caption}</p>

          <p className="mt-6 text-[11px] uppercase tracking-widest text-muted-foreground">Size</p>
          <div className="mt-2 flex gap-2">
            {["S", "M", "L", "XL"].map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`h-10 w-12 border text-sm ${s === size ? "border-foreground font-semibold" : "border-border text-muted-foreground"}`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() => requireAuth({ action: () => {}, context: "bag" })}
              className="brand-gradient-bg flex-1 rounded-full px-6 py-3 text-sm font-semibold md:max-w-52"
            >
              Add to bag
            </button>
            <Link
              to="/discover"
              className="flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium"
            >
              <Sparkles className="h-4 w-4 text-[color:var(--pink)]" strokeWidth={1.6} /> More like this
            </Link>
            <button
              aria-label="Save"
              onClick={() => requireAuth({ action: () => setSaved(!saved), context: "save" })}
              className="rounded-full border border-border p-3"
            >
              <Heart className={`h-4 w-4 ${saved ? "fill-[color:var(--pink)] text-[color:var(--pink)]" : ""}`} strokeWidth={1.6} />
            </button>
            <button
              aria-label="Share"
              onClick={() => requireAuth({ action: () => {}, context: "share" })}
              className="rounded-full border border-border p-3"
            >
              <Share2 className="h-4 w-4" strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[1200px] px-4 md:px-8">
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground">You may also discover</p>
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          {gallery.map((src) => (
            <img key={src} src={src} alt="" loading="lazy" className="h-52 w-40 shrink-0 object-cover" />
          ))}
        </div>
      </div>
    </div>
  );
}
