import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import { media } from "@/lib/data";

export const Route = createFileRoute("/bag")({
  head: () => ({
    meta: [
      { title: "Bag — Shopitt" },
      { name: "description", content: "Your Shopitt bag: the moment discovery becomes something you can hold." },
      { property: "og:title", content: "Bag — Shopitt" },
      { property: "og:description", content: "From digital discovery to physical emotion." },
    ],
  }),
  component: Bag,
});

const initial = [
  { id: "b1", title: "Forest Varsity Set", seller: "HypeHaus", size: "M", price: 899, qty: 1, image: media.post1 },
  { id: "b2", title: "Violet Sole 02", seller: "Sole Diary", size: "42", price: 650, qty: 1, image: media.post3 },
];

function Bag() {
  const [items, setItems] = useState(initial);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="mx-auto max-w-[1100px] px-4 pb-32 pt-4 md:px-8 md:pb-16">
      <h1 className="text-3xl font-bold">Your bag</h1>
      <p className="mt-1 text-sm text-muted-foreground">Chosen from Shopitt, packed like a gift.</p>

      {items.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-sm text-muted-foreground">Your bag is quiet right now.</p>
          <Link to="/discover" className="brand-gradient-bg mt-4 inline-block rounded-full px-6 py-2.5 text-sm font-semibold">
            Discover looks
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-8 md:grid-cols-[minmax(0,1fr)_320px]">
          <ul className="divide-y divide-border">
            {items.map((i) => (
              <li key={i.id} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 py-4">
                <img src={i.image} alt="" loading="lazy" className="h-28 w-24 object-cover" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{i.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{i.seller} · Size {i.size}</p>
                  <p className="mt-1 text-sm font-semibold">K{i.price}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center gap-3 rounded-full border border-border px-3 py-1">
                      <button
                        aria-label="Decrease"
                        onClick={() => setItems(items.map((x) => (x.id === i.id ? { ...x, qty: Math.max(1, x.qty - 1) } : x)))}
                      >
                        <Minus className="h-3.5 w-3.5" strokeWidth={1.8} />
                      </button>
                      <span className="text-xs">{i.qty}</span>
                      <button
                        aria-label="Increase"
                        onClick={() => setItems(items.map((x) => (x.id === i.id ? { ...x, qty: x.qty + 1 } : x)))}
                      >
                        <Plus className="h-3.5 w-3.5" strokeWidth={1.8} />
                      </button>
                    </div>
                    <button
                      aria-label="Remove"
                      onClick={() => setItems(items.filter((x) => x.id !== i.id))}
                      className="text-muted-foreground"
                    >
                      <Trash2 className="h-4 w-4" strokeWidth={1.6} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit border border-border p-5">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Summary</p>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>K{subtotal}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>K60</span></div>
              <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
                <span>Total</span><span>K{subtotal + 60}</span>
              </div>
            </div>
            <button className="brand-gradient-bg mt-5 w-full rounded-full py-3 text-sm font-semibold">Checkout</button>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Arrives in a premium Shopitt box with hang tags and a handwritten thank-you card.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
