import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/hero-section";
import { LazySections } from "@/components/lazy-sections";
import SiteHeader from "@/components/site-header";

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
