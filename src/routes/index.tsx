import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "@/components/shopitt/Hero";
import { StoryRail } from "@/components/shopitt/StoryRail";
import { PostCard } from "@/components/shopitt/PostCard";
import { posts } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shopitt — Your fashion universe" },
      { name: "description", content: "Creators, looks, drops and AI try-on. Discover fashion the social way." },
      { property: "og:title", content: "Shopitt — Your fashion universe" },
      { property: "og:description", content: "Creators, looks, drops and AI try-on." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="relative">
      <Hero />
      {/* Spacer keeps the fixed hero visible until the feed layer slides over it */}
      <div className="h-[62svh] md:h-[70svh]" />
      <div className="relative z-10 rounded-t-[28px] bg-background shadow-[0_-24px_60px_-30px_rgba(0,0,0,0.55)]">
        <div className="mx-auto h-1 w-10 translate-y-3 rounded-full bg-border md:hidden" />
        <StoryRail />
        <section className="mx-auto max-w-[1400px] pb-32 md:pb-16">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </section>
      </div>
    </div>
  );
}
