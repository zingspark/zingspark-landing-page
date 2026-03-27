import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/config/site-config";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  const title = t("title");
  const description = t("description");
  const ogLocale = locale === "zh" ? "zh_CN" : "en_US";
  const siteName = locale === "zh" ? siteConfig.name.zh : siteConfig.name.en;

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: `/${locale}`,
      languages: { "zh-CN": "/zh", en: "/en" },
    },
    openGraph: {
      type: "website",
      url: `${siteConfig.url}/${locale}`,
      title,
      description,
      siteName,
      locale: ogLocale,
      images: [
        {
          url: siteConfig.openGraph.imageUrl,
          width: siteConfig.openGraph.imageWidth,
          height: siteConfig.openGraph.imageHeight,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.openGraph.imageUrl],
    },
    robots: { index: true, follow: true },
    icons: { icon: "/images/logo/zingspark_Icon_FullColor.svg" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <>
      <JsonLd locale={locale} />
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <NextIntlClientProvider messages={messages}>
          <main className="flex min-h-screen flex-col">{children}</main>
        </NextIntlClientProvider>
      </ThemeProvider>
    </>
  );
}
