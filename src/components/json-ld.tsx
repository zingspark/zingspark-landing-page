import { siteConfig } from "@/config/site-config";

export function JsonLd({ locale }: { locale: string }) {
  const isZh = locale === "zh";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: isZh ? siteConfig.name.zh : siteConfig.name.en,
    legalName: isZh ? siteConfig.fullName.zh : siteConfig.fullName.en,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo/zingspark_Icon_FullColor.svg`,
    description: isZh
      ? "深耕智能技术的原生研发与场景落地，以 AI 之力，点亮每一次数字跃迁。"
      : "Pioneering native AI R&D and real-world deployment, illuminating every digital leap into a new era of intelligence.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Shanghai",
      addressCountry: "CN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.email,
      contactType: "recruitment",
    },
    sameAs: [siteConfig.url],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
