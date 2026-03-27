"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
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
      className="flex h-8 cursor-pointer items-center justify-center gap-1 rounded-lg px-2 font-medium text-muted-foreground text-xs transition-colors hover:bg-secondary hover:text-foreground"
      aria-label="Switch language"
    >
      <Icons.globe className="h-3.5 w-3.5" />
      <span>{locale === "zh" ? "EN" : "中"}</span>
    </button>
  );
}
