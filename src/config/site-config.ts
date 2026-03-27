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
  email: "hi@zingspark.tech",
  offices: ["Beijing", "Shanghai", "Shenzhen"],
  links: {
    repositoryUrl: "https://github.com/sylvanding/zingspark-landing-page",
  },
  openGraph: {
    imageUrl: "https://zingspark.tech/images/logo/zingspark_Icon_FullColor.svg",
    imageWidth: 1200,
    imageHeight: 630,
  },
  jobs: [
    {
      key: "agent-dev",
      name: { zh: "AI Agent 开发工程师", en: "AI Agent Developer" },
    },
    { key: "algorithm", name: { zh: "算法工程师", en: "Algorithm Engineer" } },
    { key: "architect", name: { zh: "软件架构师", en: "Software Architect" } },
    { key: "hardware", name: { zh: "硬件负责人", en: "Hardware Lead" } },
    { key: "qa", name: { zh: "测试工程师", en: "QA & Testing Engineer" } },
    { key: "pr", name: { zh: "全球公关", en: "Global PR" } },
    { key: "pm", name: { zh: "AI 产品经理", en: "AI PM" } },
    { key: "hr", name: { zh: "人才招聘", en: "Talent Acquisition" } },
    { key: "design", name: { zh: "UI/UX 设计师", en: "UI/UX Designer" } },
  ],
  universities: [
    {
      name: { zh: "清华大学", en: "Tsinghua University" },
      logo: "/images/universities/tsinghua.svg",
    },
    {
      name: { zh: "北京大学", en: "Peking University" },
      logo: "/images/universities/peking.svg",
    },
    {
      name: { zh: "哈佛大学", en: "Harvard University" },
      logo: "/images/universities/harvard.png",
    },
    {
      name: {
        zh: "新加坡国立大学",
        en: "National University of Singapore",
        abbr: { en: "NUS" },
      },
      logo: "/images/universities/nus.png",
    },
    {
      name: {
        zh: "上海交通大学",
        en: "Shanghai Jiao Tong University",
        abbr: { en: "SJTU" },
      },
      logo: "/images/universities/sjtu.svg",
    },
    {
      name: {
        zh: "华中科技大学",
        en: "Huazhong University of Science & Technology",
        abbr: { en: "HUST" },
      },
      logo: "/images/universities/hust.svg",
    },
    {
      name: {
        zh: "北京理工大学",
        en: "Beijing Institute of Technology",
        abbr: { en: "BIT" },
      },
      logo: "/images/universities/bit.svg",
    },
    {
      name: { zh: "四川大学", en: "Sichuan University" },
      logo: "/images/universities/scu.svg",
    },
    {
      name: {
        zh: "北京邮电大学",
        en: "Beijing University of Posts & Telecommunications",
        abbr: { en: "BUPT" },
      },
      logo: "/images/universities/bupt.svg",
    },
    {
      name: {
        zh: "北京科技大学",
        en: "University of Science & Technology Beijing",
        abbr: { en: "USTB" },
      },
      logo: "/images/universities/ustb.svg",
    },
    {
      name: { zh: "深圳大学", en: "Shenzhen University" },
      logo: "/images/universities/szu.svg",
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
