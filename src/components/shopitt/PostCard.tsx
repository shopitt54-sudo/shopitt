import { Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  Bookmark,
  ChevronUp,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
  Sparkles,
} from "lucide-react";
import { useRef, useState } from "react";

import type { Post, ShopTag } from "@/lib/data";

function ShopTagPin({ tag }: { tag: ShopTag }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="absolute z-20" style={{ left: `${tag.x}%`, top: `${tag.y}%` }}>
      {open ? (
        <div className="glass w-52 -translate-x-1/2 rounded-xl border border-white/25 p-3 text-left shadow-[var(--shadow-lift)]">
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{tag.label}</p>
          <p className="text-base font-semibold">{tag.price}</p>
          <p className="text-xs text-muted-foreground">{tag.seller}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Sizes {tag.sizes.join(" · ")}</p>
          <div className="mt-3 flex gap-2">
            <Link
              to="/tryon"
              className="brand-gradient-bg flex-1 rounded-full py-1.5 text-center text-[11px] font-semibold"
            >
              Try on
            </Link>
            <Link
              to="/product/$productId"
              params={{ productId: tag.id }}
              className="flex-1 rounded-full border border-border py-1.5 text-center text-[11px] font-medium"
            >
              View
            </Link>
          </div>
          <button onClick={() => setOpen(false)} className="mt-2 w-full text-[11px] text-muted-foreground">
            Close
          </button>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="glass -translate-x-1/2 whitespace-nowrap rounded-full border border-white/40 px-2.5 py-1 text-[11px] font-medium shadow-sm"
        >
          <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--pink)] align-middle" />
          {tag.label}
        </button>
      )}
    </div>
  );
}

export function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [index, setIndex] = useState(0);
  const lastTap = useRef(0);

  const onTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) setLiked(true);
    lastTap.current = now;
  };

  return (
    <article className="border-b border-border/70 pb-4">
      <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 md:px-8">
        <img src={post.creator.avatar} alt="" loading="lazy" className="h-9 w-9 shrink-0 rounded-full object-cover" />
        <div className="min-w-0">
          <p className="flex items-center gap-1 truncate text-sm font-semibold">
            {post.creator.name}
            {post.creator.verified && <BadgeCheck className="h-4 w-4 shrink-0 text-[color:var(--pink)]" strokeWidth={1.8} />}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {post.creator.handle} · {post.time}
          </p>
        </div>
        <button aria-label="More" className="shrink-0 rounded-full p-2 hover:bg-muted">
          <MoreHorizontal className="h-5 w-5" strokeWidth={1.6} />
        </button>
      </header>

      <div className="relative" onClick={onTap}>
        <div className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto">
          {post.images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={post.caption}
              loading="lazy"
              width={1024}
              height={1280}
              onLoad={() => setIndex(i === 0 ? 0 : index)}
              className="aspect-[4/5] w-full shrink-0 snap-center object-cover md:aspect-[16/10]"
            />
          ))}
        </div>

        {post.dropTitle && (
          <span className="glass absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-medium">
            {post.dropTitle}
          </span>
        )}

        {post.images.length > 1 && (
          <span className="glass absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px]">
            1 / {post.images.length}
          </span>
        )}

        {post.tags?.map((t) => <ShopTagPin key={t.id} tag={t} />)}

        {post.kind === "product" && (
          <div className="absolute bottom-3 left-3 z-20">
            {expanded ? (
              <div className="glass w-60 rounded-2xl border border-white/25 p-3">
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{post.dropTitle}</p>
                <p className="text-xl font-semibold">{post.price}</p>
                {post.left != null && <p className="text-xs text-muted-foreground">Only {post.left} left</p>}
                <div className="mt-3 flex gap-2">
                  <Link to="/bag" className="brand-gradient-bg flex-1 rounded-full py-2 text-center text-xs font-semibold">
                    Continue
                  </Link>
                  <Link to="/tryon" className="flex-1 rounded-full border border-white/40 py-2 text-center text-xs font-medium">
                    Try on
                  </Link>
                </div>
                <button onClick={() => setExpanded(false)} className="mt-2 w-full text-[11px] text-muted-foreground">
                  Hide
                </button>
              </div>
            ) : (
              <button
                onClick={() => setExpanded(true)}
                className="glass flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium"
              >
                {post.price}
                <ChevronUp className="h-3.5 w-3.5" strokeWidth={1.8} />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="px-4 pt-3 md:px-8">
        <p className="text-sm leading-relaxed">{post.caption}</p>
        <p className="mt-1 text-xs text-[color:var(--pink)]">{post.hashtags.join("  ")}</p>

        <div className="mt-3 flex items-center gap-5 text-muted-foreground">
          <button onClick={() => setLiked(!liked)} className="flex items-center gap-1.5 text-xs">
            <Heart
              className={`h-[22px] w-[22px] ${liked ? "fill-[color:var(--pink)] text-[color:var(--pink)]" : ""}`}
              strokeWidth={1.6}
            />
            {(post.likes + (liked ? 1 : 0)).toLocaleString()}
          </button>
          <button className="flex items-center gap-1.5 text-xs">
            <MessageCircle className="h-[22px] w-[22px]" strokeWidth={1.6} />
            {post.comments}
          </button>
          <button className="flex items-center gap-1.5 text-xs">
            <Send className="h-[22px] w-[22px]" strokeWidth={1.6} />
          </button>
          <button onClick={() => setSaved(!saved)} className="ml-auto">
            <Bookmark className={`h-[22px] w-[22px] ${saved ? "fill-current text-foreground" : ""}`} strokeWidth={1.6} />
          </button>
          {post.kind === "product" && (
            <Link to="/tryon" className="flex items-center gap-1.5 text-xs font-medium text-foreground">
              <Sparkles className="h-[20px] w-[20px] text-[color:var(--pink)]" strokeWidth={1.6} />
              Try on
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}