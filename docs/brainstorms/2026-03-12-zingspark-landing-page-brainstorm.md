---
date: 2026-03-12
topic: zingspark-landing-page
---

# Zingspark 星跃智启 Landing Page 重构

## 我们要构建什么

将现有的 AI SEO 模板项目渐进式改造为 **星跃智启（Zingspark）** 的官方 Landing Page。最终产出一个单页面网站，包含三大核心区段：

1. **公司展示区（Hero）**：炫酷的科技未来感设计，展示公司 logo、品牌标语、核心理念
2. **创始人名校走马灯（Logo Marquee）**：以无限滚动的方式展示创始人来自的顶尖高校 logo
3. **招聘表单区（Recruitment）**：收集求职者信息，通过 mailto 自动组成邮件发送到公司邮箱

全站支持中英文双语（next-intl + 路由前缀）、深色/浅色模式切换、响应式设计（移动端 + 桌面端）。

## 为什么选择渐进式改造

考虑了三种方案：

- **方案 A 全面重建**：代码最干净但工作量最大
- **方案 B 渐进式改造（✅ 选定）**：保留现有骨架的动画和布局逻辑，逐步替换内容、样式和组件，降低风险并加快交付
- **方案 C 组件库优先**：单页面场景下过度工程化

选择方案 B 的原因：现有项目已有良好的 Next.js + Tailwind + Motion 基础设施，hero-section、logo-ticker 等组件骨架可以复用和改造，避免从零开始。

## 关键决策

### 公司信息

| 项目 | 内容 |
|------|------|
| 中文全称 | 星跃智启（上海）科技有限公司 |
| 英文全称 | Zingspark (Shanghai) Tech Co., Ltd. |
| 中文简称 | 星跃智启 |
| 英文简称 | Zingspark / Zingspark.tech |
| 网址 | https://zingspark.tech |
| 工作城市 | 北京 / 上海 / 深圳 |
| 邮箱 | zingsparktech@gmail.com |

### 设计风格

- **科技未来感**：深色背景 + 渐变光效 + 动态粒子效果（对标 OpenAI / DeepMind）
- 深色模式为主视觉，浅色模式作为可选切换
- 向下翻页的浮动指示标志

### 技术栈

| 技术 | 选择 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| 样式 | Tailwind CSS v4 |
| 动画 | Motion (Framer Motion) |
| UI 组件 | shadcn/ui + Radix UI |
| 国际化 | next-intl（路由前缀 /en, /zh） |
| 暗色模式 | next-themes |
| 包管理 | pnpm |
| 代码规范 | Biome |
| 部署 | Netlify（静态导出） |

### 页面结构（三大区段）

#### 1. Hero Section — 公司展示

- Zingspark logo（来自 statics/logo/zingspark_Icon_FullColor.svg）
- 品牌标语（slogan），需要对标顶尖科技公司水准
- 公司简介和核心理念
- 动态背景效果（粒子/渐变/光效）
- 向下滚动指示器

#### 2. Logo Marquee — 创始人名校展示

- 走马灯/无限滚动效果
- 展示创始人来自的高校 logo
- 中国高校（SVG）：清华、北大、上海交大、华中科大、北理工、川大、北邮、北科大、深大
- 国际高校（PNG）：哈佛、新加坡国立大学
- 简短说明文字："创始团队来自全球顶尖学府"

#### 3. Recruitment Section — 招聘表单

- 招聘 slogan："我们想和一群很酷的人做很酷的事"（待优化）
- 表单字段：
  - 姓名（Name）
  - 邮箱（Email）
  - 手机（Phone）
  - 学校（School）
  - 学历（Education）— 下拉选择：本科/硕士/博士/其他
  - 感兴趣方向（Interest）— 多选或文本
  - 留言（Message）
- 提交方式：mailto 链接，自动组装邮件模板发送到 zingsparktech@gmail.com
- 硕士博士优先的标注

### Slogan 方向（待最终确定）

需要对标 Apple / OpenAI / DeepMind 等顶尖科技公司的文案风格：

- **主标语方向**：简洁、有力、富有想象力
- **示例方向**：
  - "Ignite Intelligence. Spark the Future."（点燃智能，激发未来）
  - "Where AI Leaps Forward."（AI 跃迁之所）
  - "智启未来，跃见可能"

### SEO 策略

- 中英文双语页面各有独立 URL（/zh, /en）
- 完善的 meta tags、Open Graph、Twitter Card
- 结构化数据（JSON-LD）
- 语义化 HTML
- 图片优化（Next.js Image + WebP）
- Sitemap + robots.txt

### 资产整理

- 将 `statics/logo/` → `public/images/logo/`
- 将 `university_logo/` → `public/images/universities/`
- 删除 `src/assets/brands/`（模板品牌 logo）
- 删除缺失的资产引用（stars.png、grid-lines.png、product-image.png、avatars）

### 需要删除/改造的组件

| 组件 | 操作 |
|------|------|
| site-header | 改造：简化导航，添加语言/主题切换 |
| hero-section | 改造：替换内容和视觉效果 |
| logo-ticker | 改造：替换为大学 logo 走马灯 |
| features | 删除：不需要 |
| testimonials | 删除：不需要 |
| call-to-action | 改造为招聘表单区 |
| site-footer | 改造：更新公司信息 |
| icons | 改造：更新 logo 和社交图标 |
| action-button | 保留/改造样式 |

### 部署与运维

- Netlify 部署（配置 netlify.toml）
- 自定义域名 zingspark.tech
- Git 仓库：git@github.com:sylvanding/zingspark-landing-page.git

## 开放问题

（已全部确认，无开放问题）

## 下一步

→ 进入实施规划阶段，制定详细的实施步骤和文件变更计划
