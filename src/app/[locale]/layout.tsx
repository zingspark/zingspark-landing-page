import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site-config";
import { JsonLd } from "@/components/json-ld";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh";

  return {
    title: isZh
      ? "星跃智启 Zingspark — 智启未来，跃见无限可能"
      : "Zingspark — Ignite Intelligence. Spark the Future.",
    description: isZh
      ? "星跃智启深耕智能技术的原生研发与场景落地，以 AI 之力，点亮每一次数字跃迁，开启全新的智能纪元。"
      : "Zingspark pioneers native AI R&D and real-world deployment, illuminating every digital leap into a new era of intelligence.",
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: "/",
      languages: { "zh-CN": "/zh", en: "/en" },
    },
    openGraph: {
      type: "website",
      url: siteConfig.url,
      title: isZh ? "星跃智启 Zingspark" : "Zingspark",
      description: isZh
        ? "智启未来，跃见无限可能"
        : "Ignite Intelligence. Spark the Future.",
      siteName: isZh ? "星跃智启" : "Zingspark",
      images: [
        {
          url: siteConfig.openGraph.imageUrl,
          width: siteConfig.openGraph.imageWidth,
          height: siteConfig.openGraph.imageHeight,
          alt: "Zingspark",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isZh ? "星跃智启 Zingspark" : "Zingspark",
      description: isZh
        ? "智启未来，跃见无限可能"
        : "Ignite Intelligence. Spark the Future.",
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
