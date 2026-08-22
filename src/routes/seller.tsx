import { createFileRoute, Link } from "@tanstack/react-router";
import { Boxes, Package, Plus, Users, Wallet } from "lucide-react";

import { GuestGate } from "@/components/shopitt/GuestGate";
import { useAuthGate } from "@/lib/auth";

export const Route = createFileRoute("/seller")({
  head: () => ({
    meta: [
      { title: "Seller Studio — Shopitt" },
      { name: "description", content: "Orders, inventory, customers and revenue — sell through content on Shopitt." },
      { property: "og:title", content: "Seller Studio — Shopitt" },
      { property: "og:description", content: "Run your Shopitt shop without leaving the social experience." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Seller,
});

const panels = [
  { label: "Orders", icon: Package, note: "No orders yet." },
  { label: "Products", icon: Boxes, note: "No listings yet." },
  { label: "Customers", icon: Users, note: "No customers yet." },
  { label: "Revenue", icon: Wallet, note: "Nothing earned yet." },
];

function Seller() {
  const { isAuthenticated, loading } = useAuthGate("studio");
  if (loading || !isAuthenticated) return <GuestGate context="studio" />;

  return (
    <div className="mx-auto max-w-[1100px] px-4 pb-32 pt-6 md:px-8 md:pb-16">
      <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Seller Studio</p>
      <h1 className="mt-1 text-3xl font-bold">Sell the way people discover.</h1>
      <p className="mt-2 max-w-[52ch] text-sm text-muted-foreground">
        Your shop lives inside your content. Post the look, tag the product, let discovery do the rest.
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {panels.map((p) => (
          <div key={p.label} className="border border-border p-5">
            <div className="flex items-center gap-2">
              <p.icon className="h-[18px] w-[18px] text-[color:var(--pink)]" strokeWidth={1.6} />
              <p className="text-sm font-semibold">{p.label}</p>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">{p.note}</p>
          </div>
        ))}
      </div>

      <Link to="/create" className="brand-gradient-bg mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold">
        <Plus className="h-4 w-4" strokeWidth={2} />
        Post a product look
      </Link>
    </div>
  );
}
