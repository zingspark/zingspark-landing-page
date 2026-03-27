import Image from "next/image";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site-config";
import { Icons } from "./icons";

export default function SiteFooter() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-border/50 border-t py-8 md:py-12">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Branding */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/logo/zingspark_Icon_FullColor.svg"
                alt="Zingspark"
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <span className="font-semibold text-sm">{t("company")}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
              <Icons.mapPin className="h-3 w-3" />
              <span>{t("offices")}</span>
            </div>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-muted-foreground text-xs transition-colors hover:text-foreground"
            >
              {siteConfig.email}
            </a>
          </div>

          {/* Slogan + Copyright */}
          <div className="flex flex-col items-center gap-2 text-center md:items-end md:text-right">
            <p className="text-muted-foreground/70 text-xs italic">
              {t("slogan")}
            </p>
            <p className="text-muted-foreground/50 text-xs">{t("copyright")}</p>
          </div>
        </div>

        {/* Filing / 备案 */}
        <div className="mt-6 flex flex-col items-center justify-center gap-2 text-muted-foreground/50 text-xs sm:flex-row sm:gap-4">
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-muted-foreground"
          >
            {t("icp")}
          </a>
          <span className="hidden sm:inline">|</span>
          <span>{t("police")}</span>
        </div>
      </div>
    </footer>
  );
}
