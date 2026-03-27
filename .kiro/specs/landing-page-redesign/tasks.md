# 实施计划：星跃智启 Landing Page 全面重设计

## 概述

按照从基础配置到组件实现、再到页面组装和部署的顺序，逐步完成 Landing Page 的全面重设计。所有代码使用 TypeScript，遵循现有 Next.js 16 + Tailwind CSS v4 + Motion + next-intl 技术栈。

## 任务

- [x] 1. 基础配置与路由变更
  - [x] 1.1 更新 `src/i18n/routing.ts`：将 `defaultLocale` 从 `"zh"` 改为 `"en"`
    - _需求: 9.1_
  - [x] 1.2 更新 `src/app/layout.tsx`：将 `<html lang="zh">` 改为 `<html lang="en">`
    - _需求: 9.8_
  - [x] 1.3 更新 `src/app/page.tsx`：将根路径重定向从 `/zh` 改为 `/en`，更新提示文案为 "Redirecting..."
    - _需求: 9.2_
  - [x] 1.4 更新 `src/config/site-config.ts`：将 `email` 从 `"zingsparktech@gmail.com"` 改为 `"hi@zingspark.tech"`，新增 `jobs` 数组（9 个岗位，每个包含 `key`、`name.zh`、`name.en`）
    - _需求: 10.1, 12.5, 5.3_

- [x] 2. 国际化文案全面更新
  - [x] 2.1 更新 `messages/en.json`：新增 Vision、Capabilities、Jobs 命名空间；更新 Header 导航项为 6 个（about/vision/capabilities/team/jobs/join）；更新 Hero 文案为 AI Agent 新定位；更新 Universities 标题；新增 Footer 邮箱字段
    - _需求: 9.3, 9.4, 9.5, 1.2, 1.3, 4.2, 8.3_
  - [x] 2.2 更新 `messages/zh.json`：与 en.json 对应，新增 Vision、Capabilities、Jobs 命名空间；更新 Header 导航项为 6 个；更新 Hero 文案为 AI Agent 新定位；更新 Universities 标题；新增 Footer 邮箱字段
    - _需求: 9.3, 9.4, 9.5, 9.7_

- [x] 3. 检查点 - 确认配置与文案
  - 确保所有配置变更和 i18n 文案更新完成且一致，有问题请询问用户。

- [x] 4. 新增组件：VisionSection
  - [x] 4.1 创建 `src/components/vision-section.tsx`
    - 使用 `"use client"` 指令
    - HTML 锚点 `id="vision"`
    - 使用 `useTranslations("Vision")` 获取翻译文本
    - 展示愿景标语 + "Frontier Lab" 定位描述
    - 使用 Motion 的 `whileInView` 实现滚动触发渐入动画，配置 `viewport: { once: true }`
    - 导出命名导出 `VisionSection`
    - _需求: 2.1, 2.2, 2.3, 2.4, 11.3_

- [x] 5. 新增组件：CapabilitySection
  - [x] 5.1 创建 `src/components/capability-section.tsx`
    - 使用 `"use client"` 指令
    - HTML 锚点 `id="capabilities"`
    - 使用 `useTranslations("Capabilities")` 获取翻译文本
    - 以三张卡片展示核心能力（框架解构、软硬件协同、全球化）
    - 使用 Motion 的 `staggerChildren` 实现交错渐入动画，配置 `viewport: { once: true }`
    - 导出命名导出 `CapabilitySection`
    - _需求: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 11.3_

- [x] 6. 新增组件：JDSection
  - [x] 6.1 创建 `src/components/jd-section.tsx`
    - 使用 `"use client"` 指令
    - HTML 锚点 `id="jobs"`
    - 使用 `useTranslations("Jobs")` 和 `useLocale()` 获取翻译文本和当前语言
    - 从 `siteConfig.jobs` 读取岗位数据，以卡片网格展示 9 个岗位
    - 点击卡片时：高亮卡片、dispatch `CustomEvent("job-selected", { detail: { jobTitle } })`、平滑滚动至 `#join`
    - 使用 Motion 滚动触发动画，配置 `viewport: { once: true }`
    - 导出命名导出 `JDSection`
    - _需求: 5.1, 5.2, 5.3, 5.4, 5.5, 11.3_

- [x] 7. 检查点 - 确认新组件
  - 确保三个新组件创建完成且无类型错误，有问题请询问用户。

- [x] 8. 更新现有组件
  - [x] 8.1 更新 `src/components/hero-section.tsx`
    - 滚动指示器 href 从 `#team` 改为 `#vision`
    - 文案更新通过 i18n messages 实现（已在任务 2 中完成），无需修改组件代码中的硬编码文案
    - _需求: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_
  - [x] 8.2 更新 `src/components/site-header.tsx`
    - 导航链接从 3 个扩展为 6 个：about、vision、capabilities、team、jobs、join
    - 使用 `t("vision")`、`t("capabilities")`、`t("jobs")` 获取新增导航项文案
    - 移动端汉堡菜单适配新增导航项
    - _需求: 7.1, 7.2, 7.3, 7.4, 7.5_
  - [x] 8.3 更新 `src/components/site-footer.tsx`
    - 新增联系邮箱展示：从 `siteConfig.email` 读取，渲染为 `mailto:` 链接
    - 导入 `siteConfig`
    - _需求: 8.1, 8.2, 8.3, 8.4, 8.5_
  - [x] 8.4 更新 `src/components/recruitment-section.tsx`
    - mailto 目标邮箱从硬编码 `zingsparktech@gmail.com` 改为从 `siteConfig.email` 读取
    - 新增 `useEffect` 监听 `job-selected` CustomEvent，更新 `interest` 字段
    - _需求: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_
  - [x] 8.5 更新 `src/components/json-ld.tsx`
    - 更新 Organization schema 的 description 为 AI Agent 新定位
    - 确保 email 从 `siteConfig.email` 读取（已自动更新为 `hi@zingspark.tech`）
    - _需求: 10.3_

- [x] 9. 页面组装与懒加载
  - [x] 9.1 更新 `src/app/[locale]/page.tsx`
    - 使用 `next/dynamic` 懒加载非首屏组件（VisionSection、CapabilitySection、UniversityMarquee、JDSection、RecruitmentSection、SiteFooter），配置 `ssr: false`
    - SiteHeader 和 HeroSection 保持直接 import
    - 按设计文档顺序组装所有区段：Header → Hero → Vision → Capability → UniversityMarquee → JD → Recruitment → Footer
    - _需求: 11.6, 11.7_

- [x] 10. 检查点 - 确认页面组装
  - 确保所有组件正确组装，懒加载配置正确，有问题请询问用户。

- [x] 11. SEO 优化
  - [x] 11.1 更新 `src/app/[locale]/layout.tsx` 中的 `generateMetadata`
    - 更新 title 和 description 为 AI Agent 新定位文案
    - 确保 Open Graph、Twitter Card 元数据完整
    - 确保 hreflang 替代链接和 canonical URL 正确
    - _需求: 10.2, 10.7, 10.8, 10.9_

- [x] 12. 代码质量检查
  - [x] 12.1 运行 `pnpm lint` 修复所有 Biome 错误和警告
    - _需求: 12.1_
  - [x] 12.2 运行 `pnpm typecheck` 修复所有 TypeScript 类型错误
    - _需求: 12.3_
  - [x] 12.3 移除所有未使用的代码和导入
    - _需求: 12.4_

- [-] 13. 构建验证与部署
  - [x] 13.1 运行 `pnpm build` 确保静态导出成功，验证 /zh 和 /en 两个语言路径各生成独立的 HTML 文件
    - _需求: 13.1, 13.3, 13.4_
  - [x] 13.2 通过 Chrome 截图审查页面视觉效果，确认所有区段在桌面端和移动端正确展示
    - _需求: 11.1, 11.2_
  - [-] 13.3 推送代码至 GitHub main 分支，触发 Netlify 自动部署至 https://zingspark.tech
    - _需求: 13.2, 13.5, 13.6_

- [~] 14. 最终检查点
  - 确保所有任务完成，网站在 https://zingspark.tech 正常访问，有问题请询问用户。

## 备注

- 每个任务引用了具体的需求编号以确保可追溯性
- 检查点任务用于阶段性验证，确保增量进展
- 首屏组件（Header + Hero）不使用懒加载，保证首屏渲染速度
- JDSection 与 RecruitmentSection 通过 CustomEvent 通信，避免引入全局状态管理
