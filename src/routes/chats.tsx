import { createFileRoute } from "@tanstack/react-router";
import { Send, Smile } from "lucide-react";
import { useState } from "react";

import { creators, media } from "@/lib/data";

export const Route = createFileRoute("/chats")({
  head: () => ({
    meta: [
      { title: "Chats — Shopitt" },
      { name: "description", content: "Message creators and friends, share looks, products and shop tags." },
      { property: "og:title", content: "Chats — Shopitt" },
      { property: "og:description", content: "Fashion conversations that keep their context." },
    ],
  }),
  component: Chats;
});

function Chats() {
  return null;
}
