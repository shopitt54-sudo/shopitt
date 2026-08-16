import { createFileRoute } from "@tanstack/react-router";
import { Hash, ImagePlus, MapPin, Sparkles, Tag, Video } from "lucide-react";
import { useState } from "react";

import { media } from "@/lib/data";

export const Route = createFileRoute("/create")({
  head: () => ({
    meta: [
      { title: "Create — Shopitt" },
      { name: "description", content: "Create inspiration posts, product drops and shorts. Add shop tags to your looks." },
      { property: "og:title", content: "Create — Shopitt" },
      { property: "og:description", content: "Share a look, tag the pieces, publish a drop." },
    ],
  }),
  component: Create,
});

type Kind = "Inspiration" | "Product" | "Short";

function Create() {
  const [kind, setKind] = useState<Kind>("Inspiration");
  const [tags, setTags] = useState<{ x: number; y: number; label: string }[]>([]);
  const [tagging, setTagging] = useState(false);

  return (
    <div className="mx-auto max-w-[1100px] px-4 pb-32 pt-4 md:px-8 md:pb-16">
      <h1 className="text-3xl font-bold">Create</h1>
      <p className="mt-1 text-sm text-muted-foreground">Post a look, a mood, or a drop.</p>

      <div className="mt-5 flex gap-2">
        {(["Inspiration", "Product", "Short"] as Kind[]).map((k) => (
          <button
            key={k}
            onClick={() => setKind(k)}
            className={`rounded-full px-4 py-2 text-xs font-medium ${
              k === kind ? "brand-gradient-bg" : "border border-border text-muted-foreground"
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <div
            className="relative overflow-hidden border border-border"
            onClick={(e) => {
              if (!tagging) return;
              const r = e.currentTarget.getBoundingClientRect();
              setTags([
                ...tags,
                {
                  x: ((e.clientX - r.left) / r.width) * 100,
                  y: ((e.clientY - r.top) / r.height) * 100,
                  label: "New tag",
                },
              ]);
              setTagging(false);
            }}
          >
            <img src={media.post1} alt="Selected media preview" className="aspect-[4/5] w-full object-cover" />
            {tags.map((t, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setTags(tags.filter((_, j) => j !== i));
                }}
                className="glass absolute -translate-x-1/2 rounded-full border border-white/40 px-2.5 py-1 text-[11px]"
                style={{ left: `${t.x}%`, top: `${t.y}%` }}
              >
                <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--pink)] align-middle" />
                {t.label}
              </button>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border py-2 text-xs">
              <ImagePlus className="h-4 w-4" strokeWidth={1.6} /> Photos
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border py-2 text-xs">
              <Video className="h-4 w-4" strokeWidth={1.6} /> Video
            </button>
            <button
              onClick={() => setTagging(true)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full py-2 text-xs ${
                tagging ? "brand-gradient-bg" : "border border-border"
              }`}
            >
              <Tag className="h-4 w-4" strokeWidth={1.6} /> {tagging ? "Tap image" : "Tag products"}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {kind !== "Inspiration" && (
            <input placeholder="Drop title" className="w-full border-b border-border bg-transparent py-3 text-lg font-semibold outline-none" />
          )}
          <textarea
            rows={4}
            placeholder="Tell the story behind this look..."
            className="w-full resize-none border-b border-border bg-transparent py-3 text-sm outline-none"
          />
          <div className="flex items-center gap-2 border-b border-border py-3 text-sm">
            <Hash className="h-4 w-4 text-muted-foreground" strokeWidth={1.6} />
            <input placeholder="Hashtags" className="min-w-0 flex-1 bg-transparent outline-none" />
          </div>
          <div className="flex items-center gap-2 border-b border-border py-3 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" strokeWidth={1.6} />
            <input placeholder="Add location" className="min-w-0 flex-1 bg-transparent outline-none" />
          </div>

          {kind === "Product" && (
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Price (K)" className="border-b border-border bg-transparent py-3 text-sm outline-none" />
              <input placeholder="Quantity" className="border-b border-border bg-transparent py-3 text-sm outline-none" />
              <input placeholder="Sizes" className="border-b border-border bg-transparent py-3 text-sm outline-none" />
              <input placeholder="Colours" className="border-b border-border bg-transparent py-3 text-sm outline-none" />
            </div>
          )}

          <button className="flex w-full items-center justify-center gap-2 rounded-full border border-border py-2.5 text-xs font-medium">
            <Sparkles className="h-4 w-4 text-[color:var(--pink)]" strokeWidth={1.6} /> Generate caption with AI
          </button>

          <div className="flex gap-3 pt-2">
            <button className="flex-1 rounded-full border border-border py-3 text-sm font-medium">Preview</button>
            <button className="brand-gradient-bg flex-1 rounded-full py-3 text-sm font-semibold">Publish</button>
          </div>
        </div>
      </div>
    </div>
  );
}
