"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "./language-toggle";
import { ThemeToggle } from "./theme-toggle";

export default function SiteHeader() {
  const t = useTranslations("Header");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = [
      "about",
      "vision",
      "capabilities",
      "team",
      "jobs",
      "join",
    ];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

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
        <div
          className={cn(
            "mx-auto flex max-w-4xl items-center justify-between rounded-2xl border border-border/30 px-4 py-2.5 shadow-lg backdrop-blur-2xl transition-colors duration-300",
            scrolled
              ? "bg-background/80 shadow-black/[0.06] dark:bg-background/70 dark:shadow-black/[0.15]"
              : "bg-background/60 shadow-black/[0.03] dark:bg-background/40 dark:shadow-black/[0.1]",
          )}
        >
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
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-lg px-3 py-1.5 text-sm transition-all duration-200",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="pointer-events-none absolute right-1 bottom-0 left-1 h-0.5 rounded-full bg-gradient-to-r from-[#4893FC] via-[#969DFF] to-[#BD99FE]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-1">
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
          <div className="mx-auto mt-2 max-w-4xl overflow-hidden rounded-2xl border border-border/30 bg-background/90 p-3 shadow-xl backdrop-blur-2xl md:hidden dark:bg-background/80">
            <nav className="flex flex-col gap-0.5">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-xl px-4 py-3 font-medium text-sm transition-colors",
                      isActive
                        ? "bg-secondary/60 text-foreground"
                        : "hover:bg-secondary/60",
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
