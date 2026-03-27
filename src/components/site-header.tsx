"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "./language-toggle";
import { ThemeToggle } from "./theme-toggle";

export default function SiteHeader() {
  const t = useTranslations("Header");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: t("about"), href: "#about" },
    { label: t("vision"), href: "#vision" },
    { label: t("capabilities"), href: "#capabilities" },
    { label: t("team"), href: "#team" },
    { label: t("jobs"), href: "#jobs" },
    { label: t("join"), href: "#join" },
  ];

  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      <div className="container py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between rounded-2xl border border-border/50 bg-background/70 px-4 py-2.5 shadow-black/[0.03] shadow-lg backdrop-blur-xl">
          {/* Logo */}
          <a href="#about" className="flex shrink-0 items-center gap-2.5">
            <Image
              src="/images/logo/zingspark_Icon_FullColor.svg"
              alt="Zingspark"
              width={32}
              height={32}
              className="h-7 w-7"
            />
            <span className="hidden font-semibold text-sm tracking-tight sm:inline">
              Zingspark
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-muted-foreground text-sm transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <LanguageToggle />

            {/* Mobile hamburger */}
            <button
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-secondary md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative h-3 w-4">
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-4 bg-foreground transition-all duration-200",
                    mobileOpen ? "-rotate-45 top-1.5" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-4 bg-foreground transition-all duration-200",
                    mobileOpen ? "top-1.5 rotate-45" : "top-2.5",
                  )}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="mx-auto mt-2 max-w-4xl rounded-2xl border border-border/50 bg-background/95 p-4 shadow-lg backdrop-blur-xl md:hidden">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-4 py-2.5 font-medium text-sm transition-colors hover:bg-secondary"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
