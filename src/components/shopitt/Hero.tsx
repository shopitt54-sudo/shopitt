import { useEffect, useState } from "react";

import day from "@/assets/mascot-day.png.asset.json";
import night from "@/assets/mascot-night.png.asset.json";
import { inspirationLines } from "@/lib/data";

export function Hero({ name = "Happy" }: { name?: string }) {
  const [hour, setHour] = useState(9);
  const [line, setLine] = useState(0);

  useEffect(() => {
    setHour(new Date().getHours());
    const id = setInterval(() => setLine((n) => (n + 1) % inspirationLines.length), 4200);
    return () => clearInterval(id);
  }, []);

  const evening = hour >= 17 || hour < 5;
  const greeting = hour < 12 ? "Good Morning," : hour < 17 ? "Good Afternoon," : "Good Evening,";
  const mascot = evening ? night.url : day.url;

  return (
    <section
      className="fixed inset-x-0 top-0 z-0 h-[78svh] overflow-hidden md:h-[86svh]"
      style={{ background: "var(--gradient-hero)" }}
      aria-label="Shopitt hero"
    >
      <img
        src={mascot}
        alt="Shopitt mascot"
        className="absolute inset-y-0 right-0 h-full w-[68%] object-cover object-center opacity-95 md:w-[52%]"
        style={{ maskImage: "linear-gradient(to right, transparent, black 22%)", WebkitMaskImage: "linear-gradient(to right, transparent, black 22%)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-6 pt-20 md:px-10">
        <p className="text-2xl font-medium md:text-4xl">{greeting}</p>
        <h1 className="brand-gradient-text text-6xl font-extrabold leading-[0.95] md:text-8xl">{name}</h1>
        <p key={line} className="animate-rise mt-4 max-w-[15ch] text-sm text-muted-foreground md:max-w-none md:text-lg">
          {inspirationLines[line]}
        </p>
        <span className="mt-6 block h-[3px] w-10 rounded-full brand-gradient-bg" />
      </div>
    </section>
  );
}