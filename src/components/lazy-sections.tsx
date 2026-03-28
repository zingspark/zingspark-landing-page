"use client";

import dynamic from "next/dynamic";

const VisionSection = dynamic(
  () => import("@/components/vision-section").then((m) => m.VisionSection),
  { ssr: false },
);
const CapabilitySection = dynamic(
  () =>
    import("@/components/capability-section").then((m) => m.CapabilitySection),
  { ssr: false },
);
const UniversityMarquee = dynamic(
  () =>
    import("@/components/university-marquee").then((m) => m.UniversityMarquee),
  { ssr: false },
);
const JDSection = dynamic(
  () => import("@/components/jd-section").then((m) => m.JDSection),
  { ssr: false },
);
const RecruitmentSection = dynamic(
  () =>
    import("@/components/recruitment-section").then(
      (m) => m.RecruitmentSection,
    ),
  { ssr: false },
);
const SiteFooter = dynamic(() => import("@/components/site-footer"), {
  ssr: false,
});

export function LazySections() {
  return (
    <>
      <VisionSection />
      <CapabilitySection />
      <UniversityMarquee />
      <JDSection />
      <RecruitmentSection />
      <SiteFooter />
    </>
  );
}
