import { useTranslations } from "next-intl";
import Image from "next/image";
import { Icons } from "./icons";

export default function SiteFooter() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-border/50 py-8 md:py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Branding */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/logo/zingspark_Icon_FullColor.svg"
                alt="Zingspark"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="font-semibold text-sm">{t("company")}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Icons.mapPin className="w-3 h-3" />
              <span>{t("offices")}</span>
            </div>
          </div>

          {/* Slogan + Copyright */}
          <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
            <p className="text-xs text-muted-foreground/70 italic">
              {t("slogan")}
            </p>
            <p className="text-xs text-muted-foreground/50">{t("copyright")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
