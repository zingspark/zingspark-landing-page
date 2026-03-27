"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icons } from "./icons";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-8 w-8" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Icons.sun className="h-4 w-4" />
      ) : (
        <Icons.moon className="h-4 w-4" />
      )}
    </button>
  );
}
