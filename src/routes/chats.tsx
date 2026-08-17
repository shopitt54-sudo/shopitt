import { createFileRoute } from "@tanstack/react-router";
import { Image as ImageIcon, Send } from "lucide-react";
import { useState } from "react";

import { GuestGate } from "@/components/shopitt/GuestGate";
import { creators, media } from "@/lib/data";
import { useAuthGate } from "@/lib/auth";

export const Route = createFileRoute("/chats")({
  head: () => ({
    meta: [
      { title: "Chats — Shopitt" },
      { name: "description", content: "Message creators and friends, share looks, products and shop tags." },
      { property: "og:title", content: "Chats — Shopitt" },
      { property: "og:description", content: "Fashion conversations that keep their context." },
    ],
  }),
  component: Chats,
});

const thread = [
  { id: "m1", me: false, text: "That varsity set is unreal 😍 where's it from?" },
  { id: "m2", me: true, text: "HypeHaus drop — only 3 left." },
  { id: "m3", me: true, product: true },
  { id: "m4", me: false, text: "Okay I'm getting the forest one.", seen: true },
];

function Chats() {
  const { isAuthenticated, loading } = useAuthGate("chat");
  const [active, setActive] = useState(creators[0]!.id);
  const [draft, setDraft] = useState("");

  if (loading || !isAuthenticated) return <GuestGate context="chat" />;

  const person = creators.find((c) => c.id === active) ?? creators[0]!;

  return (
    <div className="mx-auto grid max-w-[1100px] gap-0 px-0 pb-32 pt-0 md:grid-cols-[280px_minmax(0,1fr)] md:px-8 md:pb-16 md:pt-4">
      <aside className="border-b border-border md:border-b-0 md:border-r">
        <p className="px-4 pt-4 text-[11px] uppercase tracking-widest text-muted-foreground">Messages</p>
        <ul className="no-scrollbar flex gap-2 overflow-x-auto p-3 md:block md:space-y-1 md:overflow-visible md:p-2">
          {creators.map((c) => (
            <li key={c.id} className="shrink-0 md:w-full">
              <button
                onClick={() => setActive(c.id)}
                className={`flex w-full items-center gap-3 rounded-full px-2 py-2 md:rounded-xl md:px-3 ${
                  c.id === active ? "bg-muted" : ""
                }`}
              >
                <img src={c.avatar} alt="" loading="lazy" className="h-10 w-10 rounded-full object-cover" />
                <span className="hidden min-w-0 text-left md:block">
                  <span className="block truncate text-sm font-medium">{c.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">{c.handle}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section className="flex min-h-[70vh] flex-col">
        <header className="flex items-center gap-3 border-b border-border px-4 py-3">
          <img src={person.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{person.name}</p>
            <p className="truncate text-xs text-muted-foreground">typing…</p>
          </div>
        </header>

        <div className="flex-1 space-y-3 px-4 py-4">
          {thread.map((m) => (
            <div key={m.id} className={m.me ? "flex justify-end" : "flex justify-start"}>
              {m.product ? (
                <div className="w-52 overflow-hidden border border-border">
                  <img src={media.post1} alt="Shared look" loading="lazy" className="aspect-[4/5] w-full object-cover" />
                  <div className="p-3">
                    <p className="text-xs font-semibold">Forest Varsity Set</p>
                    <p className="text-xs text-muted-foreground">HypeHaus · K899</p>
                  </div>
                </div>
              ) : (
                <p
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.me ? "brand-gradient-bg" : "bg-muted"
                  }`}
                >
                  {m.text}
                  {m.seen && <span className="ml-2 text-[10px] opacity-70">Seen</span>}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="sticky bottom-16 flex items-center gap-2 border-t border-border bg-background px-4 py-3 md:bottom-0">
          <button aria-label="Send image" className="rounded-full p-2 text-muted-foreground hover:bg-muted">
            <ImageIcon className="h-5 w-5" strokeWidth={1.6} />
          </button>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Message…"
            className="min-w-0 flex-1 rounded-full border border-border bg-transparent px-4 py-2.5 text-sm outline-none"
          />
          <button aria-label="Send" onClick={() => setDraft("")} className="brand-gradient-bg rounded-full p-2.5">
            <Send className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>
      </section>
    </div>
  );
}
