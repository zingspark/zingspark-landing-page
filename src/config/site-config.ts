export const siteConfig = {
  name: {
    zh: "星跃智启",
    en: "Zingspark",
  },
  fullName: {
    zh: "星跃智启（上海）科技有限公司",
    en: "Zingspark (Shanghai) Tech Co., Ltd.",
  },
  url: "https://zingspark.tech",
  email: "zingsparktech@gmail.com",
  offices: ["Beijing", "Shanghai", "Shenzhen"],
  links: {
    repositoryUrl: "https://github.com/sylvanding/zingspark-landing-page",
  },
  openGraph: {
    imageUrl: "https://zingspark.tech/images/logo/zingspark_Icon_FullColor.svg",
    imageWidth: 1200,
    imageHeight: 630,
  },
  universities: [
    { name: { zh: "清华大学", en: "Tsinghua University" }, logo: "/images/universities/tsinghua.svg" },
    { name: { zh: "北京大学", en: "Peking University" }, logo: "/images/universities/peking.svg" },
    { name: { zh: "哈佛大学", en: "Harvard University" }, logo: "/images/universities/harvard.png" },
    { name: { zh: "新加坡国立大学", en: "National University of Singapore" }, logo: "/images/universities/nus.png" },
    { name: { zh: "上海交通大学", en: "Shanghai Jiao Tong University" }, logo: "/images/universities/sjtu.svg" },
    { name: { zh: "华中科技大学", en: "Huazhong University of Science & Technology" }, logo: "/images/universities/hust.svg" },
    { name: { zh: "北京理工大学", en: "Beijing Institute of Technology" }, logo: "/images/universities/bit.svg" },
    { name: { zh: "四川大学", en: "Sichuan University" }, logo: "/images/universities/scu.svg" },
    { name: { zh: "北京邮电大学", en: "Beijing University of Posts & Telecommunications" }, logo: "/images/universities/bupt.svg" },
    { name: { zh: "北京科技大学", en: "University of Science & Technology Beijing" }, logo: "/images/universities/ustb.svg" },
    { name: { zh: "深圳大学", en: "Shenzhen University" }, logo: "/images/universities/szu.svg" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
