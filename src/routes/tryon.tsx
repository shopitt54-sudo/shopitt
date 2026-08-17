import { createFileRoute } from "@tanstack/react-router";
import { Camera, Share2, Sparkles, Download } from "lucide-react";
import { useState } from "react";

import { GuestGate } from "@/components/shopitt/GuestGate";
import { media, posts } from "@/lib/data";
import { useAuthGate } from "@/lib/auth";

export const Route = createFileRoute("/tryon")({
  head: () => ({
    meta: [
      { title: "AI Try-On — Shopitt" },
      { name: "description", content: "See the look on you. Generate, save and share your Shopitt AI try-ons." },
      { property: "og:title", content: "AI Try-On — Shopitt" },
      { property: "og:description", content: "Try the look before it's yours." },
    ],
  }),
  component: TryOn,
});

function TryOn() {
  const { isAuthenticated, loading } = useAuthGate("tryon");
  const [generated, setGenerated] = useState(false);
  const [busy, setBusy] = useState(false);
  const [outfit, setOutfit] = useState(0);

  if (loading || !isAuthenticated) return <GuestGate context="tryon" />;

  const looks = Object.values(media);

  const generate = () => {
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setGenerated(true);
    }, 1400);
  };

  return (
    <div className="mx-auto max-w-[1100px] px-4 pb-32 pt-4 md:px-8 md:pb-16">
      <h1 className="text-3xl font-bold">AI Try-On</h1>
      <p className="mt-1 text-sm text-muted-foreground">Upload a photo, pick a look, see it on you.</p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Your photo</p>
          <label className="mt-2 flex aspect-[4/5] cursor-pointer items-center justify-center border border-dashed border-border text-sm text-muted-foreground">
            <input type="file" accept="image/*" className="hidden" />
            <span className="flex flex-col items-center gap-2">
              <Camera className="h-6 w-6" strokeWidth={1.6} />
              Upload or take a photo
            </span>
          </label>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
            {generated ? "After" : "The look"}
          </p>
          <div className="relative mt-2 aspect-[4/5] overflow-hidden">
            <img src={looks[outfit]} alt="Selected look" className="h-full w-full object-cover" />
            {busy && (
              <div className="glass absolute inset-0 flex items-center justify-center text-sm font-medium">
                <Sparkles className="mr-2 h-4 w-4 animate-pulse text-[color:var(--pink)]" strokeWidth={1.8} />
                Styling you…
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="mt-8 text-[11px] uppercase tracking-widest text-muted-foreground">Choose an outfit</p>
      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
        {looks.map((src, i) => (
          <button key={src} onClick={() => setOutfit(i)} className="shrink-0">
            <img
              src={src}
              alt=""
              loading="lazy"
              className={`h-24 w-20 object-cover ${i === outfit ? "ring-2 ring-[color:var(--pink)]" : "opacity-70"}`}
            />
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={generate} className="brand-gradient-bg rounded-full px-6 py-3 text-sm font-semibold">
          {generated ? "Generate again" : "Generate try-on"}
        </button>
        {generated && (
          <>
            <button className="flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium">
              <Download className="h-4 w-4" strokeWidth={1.6} /> Save
            </button>
            <button className="flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium">
              <Share2 className="h-4 w-4" strokeWidth={1.6} /> Share
            </button>
          </>
        )}
      </div>

      <p className="mt-10 text-[11px] uppercase tracking-widest text-muted-foreground">Inspired by</p>
      <p className="mt-2 max-w-[60ch] text-sm text-muted-foreground">{posts[0]?.caption}</p>
    </div>
  );
}
