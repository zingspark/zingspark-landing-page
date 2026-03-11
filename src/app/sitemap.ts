import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zingspark.tech";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          "zh-CN": `${baseUrl}/zh`,
          en: `${baseUrl}/en`,
        },
      },
    },
  ];
}
