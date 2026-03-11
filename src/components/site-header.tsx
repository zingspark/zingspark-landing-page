"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";

export default function SiteHeader() {
  const t = useTranslations("Header");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: t("about"), href: "#about" },
    { label: t("team"), href: "#team" },
    { label: t("join"), href: "#join" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between rounded-2xl border border-border/50 bg-background/70 backdrop-blur-xl px-4 py-2.5 shadow-lg shadow-black/[0.03]">
          {/* Logo */}
          <a href="#about" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/images/logo/zingspark_Icon_FullColor.svg"
              alt="Zingspark"
              width={32}
              height={32}
              className="w-7 h-7"
            />
            <span className="font-semibold text-sm tracking-tight hidden sm:inline">
              Zingspark
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
              className="flex md:hidden items-center justify-center w-8 h-8 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-4 h-3">
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-4 bg-foreground transition-all duration-200",
                    mobileOpen ? "top-1.5 -rotate-45" : "top-0",
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
          <div className="mx-auto max-w-4xl mt-2 rounded-2xl border border-border/50 bg-background/95 backdrop-blur-xl p-4 shadow-lg md:hidden">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-secondary transition-colors"
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
