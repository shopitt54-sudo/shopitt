import { ArrowRight } from "lucide-react";

import { creators } from "@/lib/data";

export function StoryRail() {
  return (
    <section className="pt-5">
      <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 md:px-8">
        <h2 className="truncate text-base font-semibold">Creators you follow</h2>
        <button className="flex shrink-0 items-center gap-1 text-xs font-medium text-[color:var(--pink)]">
          See all <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} />
        </button>
      </div>
      <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 pb-4 md:px-8">
        {creators.map((c) => (
          <button key={c.id} className="flex w-[68px] shrink-0 flex-col items-center gap-1.5">
            <span
              className={`relative grid h-[66px] w-[66px] place-items-center rounded-full p-[2.5px] ${
                c.newStory ? "brand-gradient-bg" : "bg-border"
              }`}
            >
              <img
                src={c.avatar}
                alt={c.name}
                loading="lazy"
                className="h-full w-full rounded-full border-2 border-background object-cover"
              />
              {c.live && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-[color:var(--pink)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                  Live
                </span>
              )}
              {!c.live && c.verified && (
                <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-background bg-emerald-500" />
              )}
            </span>
            <span className="w-full truncate text-center text-[11px] text-muted-foreground">{c.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}