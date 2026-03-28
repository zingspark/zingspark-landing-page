import Image from "next/image";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site-config";
import { Icons } from "./icons";

export default function SiteFooter() {
  const t = useTranslations("Footer");

  return (
    <footer className="relative overflow-hidden">
      {/* Brand gradient top divider — replaces border-t */}
      <div
        className="pointer-events-none absolute top-0 right-0 left-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #4893FC 20%, #969DFF 50%, #BD99FE 80%, transparent 100%)",
        }}
      />
      {/* Soft glow beneath the divider line */}
      <div
        className="pointer-events-none absolute top-0 right-0 left-0 h-8 opacity-30 dark:opacity-40"
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, #4893FC40 30%, #969DFF40 50%, #BD99FE40 70%, transparent 90%)",
          filter: "blur(12px)",
        }}
      />

      {/* Subtle decorative dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container relative py-10 md:py-14">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Branding */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            {/* Logo + brand name with hover glow */}
            <div className="group flex items-center gap-3 transition-all duration-200">
              <Image
                src="/images/logo/zingspark_Icon_FullColor.svg"
                alt="Zingspark"
                width={28}
                height={28}
                className="h-7 w-7 transition-[filter] duration-200 group-hover:drop-shadow-[0_0_8px_#4893FC80]"
              />
              <span className="font-semibold text-sm tracking-tight transition-[text-shadow] duration-200 group-hover:[text-shadow:0_0_12px_#4893FC40]">
                {t("company")}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground/70 text-xs">
              <Icons.mapPin className="h-3 w-3" />
              <span>{t("offices")}</span>
            </div>
            {/* Email link with gradient underline on hover */}
            <a
              href={`mailto:${siteConfig.email}`}
              className="group/email relative flex items-center gap-1.5 text-muted-foreground/70 text-xs transition-colors duration-200 hover:text-primary"
            >
              <Icons.mail className="h-3 w-3" />
              <span className="relative">
                {siteConfig.email}
                <span
                  className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-200 group-hover/email:scale-x-100"
                  style={{
                    background: "linear-gradient(90deg, #4893FC, #BD99FE)",
                  }}
                />
              </span>
            </a>
          </div>

          {/* Slogan + Copyright */}
          <div className="flex flex-col items-center gap-3 text-center md:items-end md:text-right">
            <p className="text-muted-foreground/50 text-xs italic">
              {t("slogan")}
            </p>
            <p className="text-muted-foreground/40 text-xs">{t("copyright")}</p>
          </div>
        </div>

        {/* Filing / 备案 */}
        <div className="mt-8 flex flex-col items-center justify-center gap-2 border-border/20 border-t pt-6 text-muted-foreground/40 text-xs sm:flex-row sm:gap-4">
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-muted-foreground"
          >
            {t("icp")}
          </a>
          <span className="hidden sm:inline">·</span>
          <span>{t("police")}</span>
        </div>
      </div>
    </footer>
  );
}
