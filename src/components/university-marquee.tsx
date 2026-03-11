"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Image from "next/image";
import { siteConfig } from "@/config/site-config";

export function UniversityMarquee() {
  const t = useTranslations("Universities");
  const locale = useLocale() as "zh" | "en";
  const universities = siteConfig.universities;
  const doubled = [...universities, ...universities];

  return (
    <section id="team" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

      <div className="container relative z-10">
        <h2 className="text-center text-2xl md:text-3xl font-semibold tracking-tight mb-12 md:mb-16">
          {t("title")}
        </h2>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex overflow-hidden">
          <div className="flex shrink-0 gap-8 md:gap-12 animate-[marquee_40s_linear_infinite] items-center">
            {doubled.map((uni, index) => (
              <div
                key={`${uni.name.en}-${index}`}
                className="flex flex-col items-center gap-3 px-4 md:px-6 group"
              >
                <div className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-card border border-border/50 p-3 transition-all group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/5">
                  <Image
                    src={uni.logo}
                    alt={uni.name[locale]}
                    width={48}
                    height={48}
                    className="w-10 h-10 md:w-12 md:h-12 object-contain dark:brightness-90 dark:contrast-110"
                  />
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap font-medium">
                  {uni.name[locale]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
