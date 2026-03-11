import { setRequestLocale } from "next-intl/server";
import SiteHeader from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { UniversityMarquee } from "@/components/university-marquee";
import { RecruitmentSection } from "@/components/recruitment-section";
import SiteFooter from "@/components/site-footer";

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
      <UniversityMarquee />
      <RecruitmentSection />
      <SiteFooter />
    </>
  );
}
