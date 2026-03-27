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
      ? "星跃智启是一家前沿实验室，致力于原生 AI Agent 研发与跨领域场景落地，构建打破物理与数字世界边界的通用智能体。"
      : "Zingspark is a Frontier Lab dedicated to native AI Agent R&D and cross-domain deployment, building universal agents that break the boundaries between the physical and digital worlds.",
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
