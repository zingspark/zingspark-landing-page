"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { siteConfig } from "@/config/site-config";

export function UniversityMarquee() {
  const t = useTranslations("Universities");
  const locale = useLocale() as "zh" | "en";
  const universities = siteConfig.universities;
  const doubled = [...universities, ...universities];

  return (
    <section id="team" className="relative overflow-hidden py-24 md:py-32">
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      </div>

      <div className="container relative z-10">
        <div className="mb-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/40 px-4 py-1.5 backdrop-blur-sm">
            <div className="h-1 w-1 rounded-full bg-[#FFE432]" />
            <span className="font-medium text-muted-foreground text-xs uppercase tracking-widest">
              Our Team
            </span>
          </div>
        </div>
        <div className="mb-14 flex items-center justify-center gap-4 md:mb-20 md:gap-6">
          <div className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent md:block" />
          <h2 className="text-center font-bold text-3xl tracking-tighter md:text-4xl">
            {t("title")}
          </h2>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent md:block" />
        </div>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Gradient masks - wider range and softer transition */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-40 bg-gradient-to-r from-background via-background/60 to-transparent md:w-64" />
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-40 bg-gradient-to-l from-background via-background/60 to-transparent md:w-64" />

        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-[marquee_45s_linear_infinite] items-center gap-10 md:gap-14">
            {doubled.map((uni, index) => (
              <div
                key={`${uni.name.en}-${index}`}
                className="group flex flex-col items-center gap-3 px-3 md:px-5"
              >
                <div className="relative flex h-18 w-18 items-center justify-center rounded-2xl border border-border/50 bg-card/60 p-3.5 shadow-[0_0_8px_rgba(150,157,255,0.06)] backdrop-blur-sm transition-all duration-200 group-hover:border-[#969DFF]/30 group-hover:bg-card/90 group-hover:shadow-[0_0_20px_rgba(150,157,255,0.15)] md:h-22 md:w-22 md:p-4 dark:shadow-[0_0_12px_rgba(150,157,255,0.1)] dark:group-hover:shadow-[0_0_24px_rgba(150,157,255,0.25)]">
                  <Image
                    src={uni.logo}
                    alt={uni.name[locale]}
                    width={52}
                    height={52}
                    className="h-11 w-11 object-contain transition-transform duration-200 group-hover:scale-110 md:h-13 md:w-13 dark:brightness-90 dark:contrast-110"
                  />
                </div>
                <span className="whitespace-nowrap font-medium text-muted-foreground/70 text-xs transition-colors duration-200 group-hover:text-muted-foreground">
                  {(uni.name as { abbr?: Record<string, string> }).abbr?.[
                    locale
                  ] ?? uni.name[locale]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
