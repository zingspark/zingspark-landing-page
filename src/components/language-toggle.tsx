"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { Icons } from "./icons";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const next = locale === "zh" ? "en" : "zh";
    router.replace(pathname, { locale: next });
  };

  return (
    <button
      onClick={switchLocale}
      className="flex items-center justify-center gap-1 h-8 px-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors text-xs font-medium cursor-pointer"
      aria-label="Switch language"
    >
      <Icons.globe className="w-3.5 h-3.5" />
      <span>{locale === "zh" ? "EN" : "中"}</span>
    </button>
  );
}
