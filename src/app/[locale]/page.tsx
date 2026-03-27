import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/hero-section";
import SiteHeader from "@/components/site-header";
import { LazySections } from "@/components/lazy-sections";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SiteHeader />
      <HeroSection />
      <LazySections />
    </>
  );
}
