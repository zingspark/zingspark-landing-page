# Zingspark Landing Page

**星跃智启（上海）科技有限公司** 官方 Landing Page

[https://zingspark.tech](https://zingspark.tech)

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| [Next.js](https://nextjs.org) | 16 | React 全栈框架（App Router） |
| [React](https://react.dev) | 19 | UI 库 |
| [Tailwind CSS](https://tailwindcss.com) | v4 | 原子化 CSS |
| [Motion](https://motion.dev) (Framer Motion) | 12 | 动画引擎 |
| [next-intl](https://next-intl.dev) | 4 | 国际化（中/英双语） |
| [next-themes](https://github.com/pacocoursey/next-themes) | 0.4 | 深色/浅色模式切换 |
| [TypeScript](https://www.typescriptlang.org) | 5.9 | 类型安全 |
| [Biome](https://biomejs.dev) | 2 | 代码格式化与 Lint |
| [pnpm](https://pnpm.io) | 9+ | 包管理器 |

## 功能特性

- **三大核心区段**：公司展示（Hero）、创始人名校走马灯（University Marquee）、招聘表单（Recruitment Form）
- **中英文双语**：基于 `next-intl` 的路由级 i18n，`/zh` 和 `/en` 独立 URL，SEO 友好
- **深色/浅色模式**：默认深色，支持一键切换，跟随系统偏好
- **响应式设计**：适配移动端和桌面端
- **SEO 优化**：Meta tags、Open Graph、Twitter Card、JSON-LD 结构化数据、Sitemap、robots.txt
- **Mailto 表单**：招聘表单自动组装邮件模板并通过 `mailto:` 发送到公司邮箱
- **高级动画**：Motion 驱动的 Hero 背景动画、视差滚动、入场动画、无限滚动走马灯

## 项目结构

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # 语言环境布局（含 i18n、主题 Provider）
│   │   └── page.tsx            # 主页面
│   ├── globals.css             # 全局样式（Tailwind + 主题变量）
│   ├── layout.tsx              # 根布局
│   └── sitemap.ts              # 自动生成 Sitemap
├── components/
│   ├── hero-section.tsx        # 公司展示 Hero 区
│   ├── university-marquee.tsx  # 创始人名校走马灯
│   ├── recruitment-section.tsx # 招聘表单
│   ├── site-header.tsx         # 顶部导航栏
│   ├── site-footer.tsx         # 页脚
│   ├── theme-toggle.tsx        # 主题切换按钮
│   ├── language-toggle.tsx     # 语言切换按钮
│   ├── icons.tsx               # SVG 图标组件
│   └── json-ld.tsx             # SEO 结构化数据
├── config/
│   └── site-config.ts          # 网站配置（公司信息、大学列表等）
├── i18n/
│   ├── routing.ts              # next-intl 路由配置
│   └── request.ts              # next-intl 请求配置
├── lib/
│   └── utils.ts                # 工具函数
└── proxy.ts                    # Next.js 16 i18n 代理（路由中间件）

messages/
├── en.json                     # 英文翻译
└── zh.json                     # 中文翻译

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

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint

# 类型检查
pnpm typecheck
```

## 部署

项目配置为自动部署到 [Netlify](https://www.netlify.com/)。

- 部署配置：`netlify.toml`
- 构建命令：`pnpm build`
- 发布目录：`.next`
- 使用 `@netlify/plugin-nextjs` 插件支持 Next.js SSR

## 品牌配色

基于 Zingspark Logo 提取的核心品牌色：

| 色值 | 用途 |
|------|------|
| `#4893FC` | 品牌蓝（Primary） |
| `#969DFF` | 品牌紫蓝（渐变中段） |
| `#BD99FE` | 品牌紫（渐变终点） |

## License

[MIT](./LICENSE) © 2026 Zingspark (Shanghai) Tech Co., Ltd.
