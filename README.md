# Zingspark Landing Page

**星跃智启（上海）科技有限公司** 官方 Landing Page

[https://zingspark.tech](https://zingspark.tech)

[English](./README.en.md) | 中文

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| [Next.js](https://nextjs.org) | 16 | React 全栈框架（App Router，静态导出） |
| [React](https://react.dev) | 19 | UI 库 |
| [Tailwind CSS](https://tailwindcss.com) | v4 | 原子化 CSS |
| [Motion](https://motion.dev) (Framer Motion) | 12 | 动画引擎 |
| [next-intl](https://next-intl.dev) | 4 | 国际化（中/英双语） |
| [next-themes](https://github.com/pacocoursey/next-themes) | 0.4 | 深色/浅色模式切换 |
| [TypeScript](https://www.typescriptlang.org) | 5.9 | 类型安全 |
| [Biome](https://biomejs.dev) | 2 | 代码格式化与 Lint |
| [Vitest](https://vitest.dev) | 4 | 单元测试与属性测试 |
| [fast-check](https://fast-check.dev) | 4 | 属性测试（Property-Based Testing） |
| [pnpm](https://pnpm.io) | 9+ | 包管理器 |

## 功能特性

- **六大核心区段**：Hero 展示、公司愿景（Vision）、核心能力（Capabilities）、创始人名校走马灯（University Marquee）、招聘岗位（JD）、申请表单（Recruitment Form）
- **中英文双语**：基于 `next-intl` 的路由级 i18n，`/zh` 和 `/en` 独立 URL，SEO 友好
- **深色/浅色模式**：默认深色，支持一键切换，跟随系统偏好；OKLCH 色彩空间统一管理主题变量
- **响应式设计**：适配移动端和桌面端
- **SEO 优化**：Meta tags、Open Graph、Twitter Card、JSON-LD 结构化数据、Sitemap、robots.txt
- **Mailto 表单**：招聘表单自动组装邮件模板并通过 `mailto:` 发送到公司邮箱；岗位卡片点击自动填充感兴趣方向
- **高级动画**：Motion 驱动的 Hero 背景动画（轨道环、光晕脉冲）、视差滚动、入场动画、无限滚动走马灯、极光渐变背景
- **性能优化**：`next/dynamic` 懒加载非首屏区段（Vision、Capabilities、University、JD、Recruitment、Footer），减少首屏 JS 体积
- **品牌色系统**：全站渐变色统一使用品牌色板，属性测试保障一致性
- **无障碍**：装饰元素 `pointer-events-none` + `aria-hidden`，`prefers-reduced-motion` 媒体查询禁用纯装饰动画

## 项目结构

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # 语言环境布局（i18n、主题 Provider、SEO Metadata）
│   │   └── page.tsx            # 主页面（Hero + LazySections）
│   ├── globals.css             # 全局样式（Tailwind v4 + OKLCH 主题变量 + 动画）
│   ├── layout.tsx              # 根布局（Inter 字体）
│   ├── page.tsx                # 根路径重定向至 /en
│   └── sitemap.ts              # 自动生成 Sitemap
├── components/
│   ├── hero-section.tsx        # Hero 区（轨道环动画、渐变背景、CTA）
│   ├── vision-section.tsx      # 公司愿景区（极光背景、浮动粒子、几何装饰）
│   ├── capability-section.tsx  # 核心能力卡片（三列网格、悬浮交互、连接线）
│   ├── university-marquee.tsx  # 创始人名校无限滚动走马灯
│   ├── jd-section.tsx          # 招聘岗位卡片网格（点击联动表单）
│   ├── recruitment-section.tsx # 招聘申请表单（mailto 提交）
│   ├── lazy-sections.tsx       # 懒加载包装器（next/dynamic SSR=false）
│   ├── site-header.tsx         # 顶部导航栏
│   ├── site-footer.tsx         # 页脚（品牌信息、备案号）
│   ├── theme-toggle.tsx        # 主题切换按钮
│   ├── language-toggle.tsx     # 语言切换按钮
│   ├── icons.tsx               # SVG 图标组件库（岗位图标、通用图标）
│   └── json-ld.tsx             # SEO 结构化数据
├── config/
│   └── site-config.ts          # 网站配置（公司信息、岗位列表、大学列表）
├── i18n/
│   ├── routing.ts              # next-intl 路由配置
│   └── request.ts              # next-intl 请求配置
├── lib/
│   └── utils.ts                # 工具函数（cn）
└── __tests__/
    ├── oklch-consistency.test.ts        # OKLCH 色彩空间一致性属性测试
    ├── wcag-contrast.test.ts            # WCAG AA 对比度属性测试
    ├── dark-mode-invariance.test.ts     # 深色模式样式不变性属性测试
    └── visual-polish-properties.test.tsx # 视觉一致性属性测试（图标、动画、品牌色）

messages/
├── en.json                     # 英文翻译
└── zh.json                     # 中文翻译

scripts/
├── copy-out-to-docs.mjs        # 构建产物复制到 docs/ 目录
└── validate-copy-upgrade.mjs   # 文案升级验证脚本

public/images/
├── logo/                       # Zingspark Logo
└── universities/               # 创始人高校 Logo（SVG/PNG）
```

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本（静态导出）
pnpm build

# 构建并复制到 docs/
pnpm build:docs

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint

# 代码检查并自动修复
pnpm lint:write

# 类型检查
pnpm typecheck
```

## 测试

项目使用 Vitest + fast-check 进行属性测试（Property-Based Testing），验证设计系统的正确性：

```bash
# 运行所有测试
pnpm vitest --run
```

测试覆盖：
- OKLCH 色彩空间一致性：所有 CSS 主题变量均使用 `oklch()` 格式
- WCAG AA 对比度：辅助文字与背景色对比度 ≥ 4.5:1
- 深色模式不变性：浅色模式优化不影响深色模式样式
- 视觉一致性：岗位图标类型、GPU 加速动画属性、品牌渐变色、装饰元素不阻塞交互

## 部署

项目配置为静态导出（`output: "export"`），部署到 [Netlify](https://www.netlify.com/)。

- 部署配置：`netlify.toml`
- 构建命令：`pnpm build`
- 发布目录：`out`
- 根路径 `/` 302 重定向至 `/en/`

## 品牌配色

基于 Zingspark Logo 提取的核心品牌色：

| 色值 | 用途 |
|------|------|
| `#4893FC` | 品牌蓝（Primary） |
| `#969DFF` | 品牌紫蓝（渐变中段） |
| `#BD99FE` | 品牌紫（渐变终点） |
| `#7B93FF` | 中间过渡蓝紫 |
| `#00B95C` | 品牌绿（硬件/能力卡片） |
| `#FC413D` | 品牌红（强调色） |

## License

[MIT](./LICENSE) © 2026 Zingspark (Shanghai) Tech Co., Ltd.
