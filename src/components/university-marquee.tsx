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
    <section id="team" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

      <div className="container relative z-10">
        <h2 className="mb-12 text-center font-semibold text-2xl tracking-tight md:mb-16 md:text-3xl">
          {t("title")}
        </h2>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="absolute top-0 bottom-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent md:w-40" />
        <div className="absolute top-0 right-0 bottom-0 z-10 w-24 bg-gradient-to-l from-background to-transparent md:w-40" />

        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-[marquee_40s_linear_infinite] items-center gap-8 md:gap-12">
            {doubled.map((uni, index) => (
              <div
                key={`${uni.name.en}-${index}`}
                className="group flex flex-col items-center gap-3 px-4 md:px-6"
              >
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-border/50 bg-card p-3 transition-all group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/5 md:h-20 md:w-20">
                  <Image
                    src={uni.logo}
                    alt={uni.name[locale]}
                    width={48}
                    height={48}
                    className="h-10 w-10 object-contain md:h-12 md:w-12 dark:brightness-90 dark:contrast-110"
                  />
                </div>
                <span className="whitespace-nowrap font-medium text-muted-foreground text-xs">
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
