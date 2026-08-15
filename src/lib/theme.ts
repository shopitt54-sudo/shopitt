import { useCallback, useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("shopitt-theme");
    const next = stored === "dark" || stored === "light" ? stored : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }, []);

  const apply = useCallback((next: "light" | "dark") => {
    setTheme(next);
    localStorage.setItem("shopitt-theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }, []);

  return { theme, setTheme: apply };
}