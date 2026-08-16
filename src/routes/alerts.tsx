import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { alerts } from "@/lib/data";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Alerts — Shopitt" },
      { name: "description", content: "Likes, comments, follows and drop updates from your Shopitt world." },
      { property: "og:title", content: "Alerts — Shopitt" },
      { property: "og:description", content: "Socially meaningful notifications." },
    ],
  }),
  component: Alerts,
});

const tabs = ["All", "Likes", "Comments", "Mentions"] as const;

function Alerts() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const list = tab === "All" ? alerts : alerts.filter((a) => a.type === tab);

  return (
    <div className="mx-auto max-w-3xl px-4 pb-32 pt-4 md:pb-16">
      <h1 className="text-3xl font-bold">Alerts</h1>
      <div className="mt-4 flex gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium ${
              t === tab ? "brand-gradient-bg" : "border border-border text-muted-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <p className="mt-8 text-[11px] uppercase tracking-widest text-muted-foreground">Recent</p>
      <ul className="mt-2 divide-y divide-border">
        {list.map((a) => (
          <li key={a.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-4">
            <img src={a.image} alt="" loading="lazy" className="h-11 w-11 rounded-full object-cover" />
            <p className="min-w-0 text-sm">{a.text}</p>
            <span className="shrink-0 text-xs text-muted-foreground">{a.time}</span>
          </li>
        ))}
        {list.length === 0 && <li className="py-10 text-center text-sm text-muted-foreground">Nothing here yet.</li>}
      </ul>
    </div>
  );
}
