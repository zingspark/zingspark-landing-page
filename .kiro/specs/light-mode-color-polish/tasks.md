# 实施计划：亮色模式颜色优化与 Hero Section 按钮精简

## 概述

基于需求文档和设计文档，将修改分为 6 个主要阶段：Hero Section 精简、全局 CSS 变量优化、装饰元素透明度提升、卡片与表单组件优化、导航栏与页脚优化、代码质量验证。每个阶段按增量方式推进，确保每步修改可独立验证。

## 任务

- [x] 1. Hero Section 精简：移除 Scroll to explore 按钮
  - [x] 1.1 移除 hero-section.tsx 中的 Scroll Button 元素
    - 删除 `<a href="#vision">` 元素及其包含的 `t("scrollDown")` 文本和 `Icons.chevronDown` 图标
    - CTA 区域从 `flex-col` + `sm:flex-row sm:justify-center` 简化为单按钮居中布局（移除 flex-col/sm:flex-row，改为 flex justify-center）
    - 保留底部滚动指示器动画（scroll indicator）不变
    - 保留 i18n 语言包中 `Hero.scrollDown` 键值不删除
    - _需求: 1.1, 1.2, 1.3, 1.4_

- [x] 2. 全局 CSS 变量优化（globals.css :root）
  - [x] 2.1 调整 :root 下的亮色模式 CSS 自定义属性
    - `--background`: `oklch(0.985 0.002 247)` → `oklch(0.975 0.006 260)`
    - `--card`: `oklch(0.97 0.004 247)` → `oklch(0.99 0.003 260)`
    - `--muted-foreground`: `oklch(0.55 0.02 261)` → `oklch(0.45 0.03 261)`
    - `--border`: `oklch(0 0 0 / 8%)` → `oklch(0 0 0 / 15%)`
    - `--input`: `oklch(0 0 0 / 12%)` → `oklch(0 0 0 / 18%)`
    - `--secondary`: `oklch(0.94 0.01 255)` → `oklch(0.92 0.015 260)`
    - `--muted`: `oklch(0.94 0.01 255)` → `oklch(0.92 0.015 260)`
    - 确保 `.dark` 块内所有变量值保持不变
    - _需求: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

  - [x] 2.2 调整 globals.css 中亮色模式 CSS 类样式
    - `.gradient-mesh` 亮色模式渐变透明度提升（0.15→0.22, 0.12→0.18, 0.1→0.15）
    - `.aurora-bg` 亮色模式透明度提升（0.06→0.12）
    - `.glass-card` 亮色模式边框不透明度提升（0.06→0.12）并增加阴影
    - `.glass-card-enhanced` 亮色模式边框不透明度提升（0.08→0.14）并增加阴影深度
    - `.section-divider::before` 亮色模式 opacity 提升（0.5→0.7）
    - `.section-divider-glow::after` 亮色模式 opacity 提升（0.8→1.0）
    - 确保所有 `.dark` 选择器下的对应样式保持不变
    - _需求: 3.3, 3.5, 4.1, 6.3_

- [x] 3. 检查点 - 确保 CSS 变量和全局样式修改正确
  - 确保所有修改通过 lint 和 typecheck，如有问题请询问用户。

- [x] 4. 装饰元素与光效透明度提升
  - [x] 4.1 优化 hero-section.tsx 中装饰元素的亮色模式透明度
    - 发光球体：`opacity-[0.04]` → `opacity-[0.10]`（亮色模式），`dark:opacity-[0.08]` 不变
    - 绿色发光球体：`opacity-[0.03]` → `opacity-[0.08]`，`dark:opacity-[0.06]` 不变
    - 红色发光球体：`opacity-[0.02]` → `opacity-[0.06]`，`dark:opacity-[0.04]` 不变
    - 轨道环线外圈：`border-primary/[0.07]` → `border-primary/[0.15]`，`dark:border-primary/[0.15]` 不变
    - 轨道环线中圈：`border-primary/[0.05]` → `border-primary/[0.12]`，`dark:border-primary/[0.1]` 不变
    - 轨道环线内圈：`border-primary/[0.03]` → `border-primary/[0.08]`，`dark:border-primary/[0.08]` 不变
    - 反向旋转环线：`border-[#BD99FE]/[0.04]` → `border-[#BD99FE]/[0.10]`，`dark:border-[#BD99FE]/[0.08]` 不变
    - 标题渐变 drop-shadow 增强亮色模式强度
    - _需求: 3.1, 3.2, 3.6, 6.1_

  - [x] 4.2 优化 vision-section.tsx 中装饰元素的亮色模式透明度
    - 背景光球：`bg-primary/[0.03]` → `bg-primary/[0.08]`，`dark:bg-primary/[0.06]` 不变
    - 紫色光球：`bg-[#BD99FE]/[0.03]` → `bg-[#BD99FE]/[0.08]`，`dark:bg-[#BD99FE]/[0.06]` 不变
    - 几何弧线（主色）：`border-primary/[0.08]` → `border-primary/[0.15]`，`dark:border-primary/[0.12]` 不变
    - 几何弧线（紫色）：`border-[#BD99FE]/[0.08]` → `border-[#BD99FE]/[0.15]`，`dark:border-[#BD99FE]/[0.12]` 不变
    - 小弧线：`border-[#969DFF]/[0.06]` → `border-[#969DFF]/[0.12]`，`dark:border-[#969DFF]/[0.10]` 不变
    - 对角线条：`via-[#969DFF]/15` → `via-[#969DFF]/25`，`via-primary/15` → `via-primary/25`
    - 标语 drop-shadow 增强亮色模式 filter 强度
    - _需求: 3.3, 3.4, 3.6, 6.2_

- [x] 5. 卡片与表单组件亮色模式优化
  - [x] 5.1 优化 capability-section.tsx 中能力卡片的亮色模式样式
    - 增加亮色模式下卡片的基础阴影（如 `shadow-sm`）
    - 提升边框可见度（`border-border/50` 可考虑在亮色模式下提升）
    - 确保 `dark:` 前缀样式不变
    - _需求: 4.2, 4.6_

  - [x] 5.2 优化 university-marquee.tsx 中大学 logo 卡片的亮色模式样式
    - 提升亮色模式下卡片阴影效果，增加浮起感
    - 确保 `dark:` 前缀样式不变
    - _需求: 4.3, 4.6_

  - [x] 5.3 优化 jd-section.tsx 中岗位卡片的亮色模式样式
    - 提升亮色模式下卡片边框可见度
    - 优化 hover 效果在亮色模式下的表现
    - 确保 `dark:` 前缀样式不变
    - _需求: 4.4, 4.6_

  - [x] 5.4 优化 recruitment-section.tsx 中输入框的亮色模式样式
    - 提升输入框边框在亮色模式下的可见度
    - 优化输入框背景在亮色模式下的对比度
    - 确保 `dark:` 前缀样式不变
    - _需求: 4.5, 4.6_

- [x] 6. 导航栏与页脚亮色模式优化
  - [x] 6.1 优化 site-header.tsx 中导航栏的亮色模式样式
    - 提升亮色模式背景不透明度：`bg-background/80` → `bg-background/90`（scrolled 状态）
    - 提升边框可见度：`border-border/30` → `border-border/50`
    - 确保 `dark:` 前缀样式不变
    - _需求: 5.1, 5.2, 5.5_

  - [x] 6.2 优化 site-footer.tsx 中页脚的亮色模式样式
    - 提升顶部渐变分隔线的亮色模式可见度（glow 层 opacity 从 0.30 提升）
    - 优化文字颜色层次：地址/邮箱从 `/70` 提升至 `/80`
    - 优化 slogan 和 copyright 的文字透明度层次
    - 确保 `dark:` 前缀样式不变
    - _需求: 5.3, 5.4, 5.5_

- [x] 7. 渐变与品牌色亮色模式适配
  - [x] 7.1 优化 CTA 按钮的亮色模式阴影效果
    - 提升 hero-section.tsx 中 CTA 按钮的 `shadow-primary/25` 在亮色模式下的视觉突出度
    - 提升 recruitment-section.tsx 中提交按钮的 `shadow-primary/20` 在亮色模式下的视觉突出度
    - _需求: 6.4, 6.5_

- [x] 8. 检查点 - 确保所有组件修改正确
  - 确保所有修改通过 lint 和 typecheck，如有问题请询问用户。

- [x] 9. 代码质量验证
  - [x] 9.1 运行 Biome lint 检查
    - 执行 `pnpm lint`，确保无错误
    - _需求: 7.1_

  - [x] 9.2 运行 TypeScript 类型检查
    - 执行 `pnpm typecheck`，确保无错误
    - _需求: 7.2_

  - [x] 9.3 运行构建验证
    - 执行 `pnpm build`，确保静态导出成功
    - 验证 /zh 和 /en 两个语言路径各生成独立的 HTML 文件
    - _需求: 7.3_

  - [x] 9.4 编写属性测试验证深色模式不变性（Property 1）
    - **Property 1: 深色模式样式不变性**
    - 解析 globals.css 中 `.dark` 块的所有 CSS 变量，与预存基线快照对比
    - 对于组件文件，提取所有 `dark:` 前缀的类名，验证与基线一致
    - **验证: 需求 2.6, 3.6, 4.6, 5.5, 6.5, 7.4**

  - [x] 9.5 编写属性测试验证 WCAG AA 对比度（Property 2）
    - **Property 2: 辅助文字 WCAG AA 对比度**
    - 验证 `--muted-foreground` 与 `--background` 的 WCAG 对比度 >= 4.5:1
    - **验证: 需求 2.3**

  - [x] 9.6 编写属性测试验证 oklch 色彩空间一致性（Property 3）
    - **Property 3: oklch 色彩空间一致性**
    - 解析 CSS 文件，验证所有颜色变量值使用 oklch 格式
    - **验证: 需求 7.5**

- [x] 10. 最终检查点 - 确保所有测试通过
  - 确保所有测试通过，如有问题请询问用户。

## 备注

- 标记 `*` 的任务为可选任务，可跳过以加速 MVP 交付
- 每个任务引用了具体的需求编号以确保可追溯性
- 检查点确保增量验证
- 属性测试验证设计文档中定义的正确性属性
- 所有修改遵循 "dark: 变体隔离策略"，确保深色模式不受影响
