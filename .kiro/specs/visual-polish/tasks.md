# 实施计划：星跃智启 Landing Page 视觉美化与极致优化

## 概述

按照从基础（globals.css 工具类）到各组件逐一优化的顺序，实施全面视觉美化升级。所有改动均为样式层面，不改变组件的数据流、状态管理或业务逻辑。

## 任务

- [x] 1. globals.css 新增可复用工具类与动画关键帧
  - [x] 1.1 新增区段分隔器工具类（section-divider、section-divider-glow）
    - 在 `src/app/globals.css` 中添加 `.section-divider` 和 `.section-divider-glow` 类，使用渐变线 + 光点装饰实现区段间视觉过渡
    - _需求: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_
  - [x] 1.2 新增增强型玻璃卡片工具类（glass-card-enhanced）
    - 在 `src/app/globals.css` 中添加 `.glass-card-enhanced` 类，实现更精致的毛玻璃 + 内发光效果，同时适配深色/浅色模式
    - _需求: 6.1, 9.3, 9.5_
  - [x] 1.3 新增渐变边框焦点工具类（gradient-border-focus）
    - 在 `src/app/globals.css` 中添加 `.gradient-border-focus` 类，实现输入框焦点状态的渐变边框动画
    - _需求: 6.2, 6.5_
  - [x] 1.4 新增浮动粒子与脉冲光效动画关键帧
    - 添加 `@keyframes float-particle` 浮动粒子动画和 `@keyframes pulse-glow` 脉冲光效动画
    - 所有动画仅使用 `transform` 和 `opacity` 属性，确保 GPU 加速
    - _需求: 2.1, 5.4, 7.6, 10.1_
  - [x] 1.5 新增 prefers-reduced-motion 全局处理
    - 添加 `@media (prefers-reduced-motion: reduce)` 媒体查询，将所有动画和过渡时长设为 0.01ms
    - _需求: 7.5_

- [x] 2. 检查点 — 确保 globals.css 无语法错误
  - 确保所有新增 CSS 类语法正确，运行 `pnpm lint` 和 `pnpm typecheck` 无错误，如有问题请询问用户。

- [x] 3. Hero Section 底部过渡效果
  - 在 `src/components/hero-section.tsx` 的 section 底部添加渐变过渡伪元素或 div，使背景色从 Hero 深色调自然过渡到 Vision 的 aurora 背景
  - 使用纯 CSS 实现（`::after` 伪元素或 Tailwind 类），不增加 JS 运行时开销
  - 过渡元素添加 `pointer-events-none` 确保不阻塞交互
  - _需求: 1.1, 1.5, 1.6, 10.2_

- [x] 4. Vision Section 视觉丰富度提升
  - [x] 4.1 添加浮动粒子装饰元素
    - 在 `src/components/vision-section.tsx` 中添加多个浮动粒子 `<div>` 元素，使用 `float-particle` 动画
    - 所有粒子元素添加 `pointer-events-none`，移动端使用 `hidden md:block` 隐藏
    - _需求: 2.1, 2.5, 2.6, 10.2_
  - [x] 4.2 增强文字渐变效果与光晕
    - 为愿景标语 h2 添加 `text-shadow` 光晕效果，增强渐变文字的视觉冲击力
    - _需求: 2.2_
  - [x] 4.3 优化间距与添加装饰性几何线条
    - 调整上下内边距减少空旷感，在内容区域周围添加装饰性光弧/几何线条元素
    - _需求: 2.3, 2.4_
  - [x] 4.4 添加 Vision → Capability 区段过渡分隔
    - 在 Vision Section 底部添加装饰性分隔元素（渐变线条 + 光点）
    - _需求: 1.2, 1.5_

- [x] 5. Capability Section 卡片视觉升级
  - [x] 5.1 添加卡片顶部渐变强调色条
    - 为每张能力卡片添加顶部渐变色条，使用对应能力的主题色（framework: #4893FC, hardware: #00B95C, global: #BD99FE）
    - _需求: 3.1_
  - [x] 5.2 增强卡片 hover 状态
    - 增强 hover 视觉反馈：更明显的边框发光、`translateY(-8px)` 上浮、阴影加深
    - 确保过渡时长在 150ms-300ms 范围内
    - _需求: 3.2, 7.1_
  - [x] 5.3 添加图标背景光晕与卡片连接元素
    - 为卡片图标添加背景光晕动画，在卡片之间添加视觉连接元素（虚线或渐变连接线）
    - 深色模式下添加适当的内发光或边缘高光效果
    - _需求: 3.3, 3.4, 3.5, 3.6_
  - [x] 5.4 添加 Capability → University 区段过渡
    - 在 Capability Section 底部添加渐变淡出过渡带
    - _需求: 1.3, 1.5_

- [x] 6. University Marquee 视觉增强
  - [x] 6.1 添加 logo 卡片悬浮光晕效果
    - 为每个大学 logo 卡片添加微妙的悬浮光晕，hover 时光晕增强并显示品牌色调
    - 深色模式下添加适当的背景发光效果
    - _需求: 4.1, 4.4_
  - [x] 6.2 优化渐变遮罩与标题装饰
    - 优化走马灯两侧渐变遮罩效果（更宽范围、更柔和过渡）
    - 为区段标题添加两侧装饰性渐变线条
    - _需求: 4.2, 4.3_

- [x] 7. 检查点 — 确保中间进度正常
  - 确保所有已修改组件通过 `pnpm lint` 和 `pnpm typecheck`，如有问题请询问用户。

- [x] 8. JD Section 岗位卡片科技感提升
  - [x] 8.1 新增 SVG 线条图标组件
    - 在 `src/components/icons.tsx` 中新增 JD Section 所需的 SVG 线条图标（AgentIcon、BrainIcon、ArchitectIcon、ChipIcon、SearchIcon、GlobeIcon、ClipboardIcon、UsersIcon、PaletteIcon）
    - _需求: 5.1, 5.6_
  - [x] 8.2 替换 emoji 为 SVG 图标并添加渐变角标
    - 在 `src/components/jd-section.tsx` 中将 `jobIcons` 从 `Record<string, string>` 改为 `Record<string, React.ReactNode>`，使用新增的 SVG 图标组件
    - 为每张岗位卡片添加独特的渐变强调色或角标装饰
    - _需求: 5.1, 5.2_
  - [x] 8.3 增强卡片 hover 与选中状态
    - 增强 hover 微交互（边框渐变动画、图标微动画、背景光效变化）
    - 为选中状态添加脉冲光效（使用 `pulse-glow` 动画）和渐变边框动画
    - 优化卡片网格布局间距
    - _需求: 5.3, 5.4, 5.5_
  - [x] 8.4 添加 JD → Recruitment 视觉引导
    - 在 JD Section 底部添加视觉引导元素（渐变连接线或箭头），暗示"选择岗位→提交申请"的操作流程
    - _需求: 1.4, 1.5_

- [x] 9. Recruitment Form 表单精致度提升
  - [x] 9.1 增强表单卡片玻璃拟态效果
    - 在 `src/components/recruitment-section.tsx` 中应用 `glass-card-enhanced` 工具类，添加更精致的边框光效和内部渐变装饰
    - _需求: 6.1_
  - [x] 9.2 输入框渐变焦点边框与按钮 hover 增强
    - 应用 `gradient-border-focus` 工具类替代当前的单色 focus ring
    - 为提交按钮添加更丰富的 hover 微交互（渐变流动效果、图标微动画）
    - 确保所有交互动画过渡时长在 150ms-300ms 之间
    - _需求: 6.2, 6.3, 6.5_
  - [x] 9.3 添加表单区域装饰性背景元素
    - 添加微妙的网格线或光点装饰背景，丰富视觉层次
    - 添加 Recruitment → Footer 渐变分隔线
    - _需求: 6.4, 1.5_

- [x] 10. Site Header 滚动效果与导航指示器
  - [x] 10.1 添加滚动透明度渐变效果
    - 在 `src/components/site-header.tsx` 中使用滚动监听实现滚动时背景透明度渐变（顶部更透明，滚动后逐渐加深）
    - _需求: 7.3_
  - [x] 10.2 添加活跃导航链接视觉指示器
    - 为当前活跃的导航链接添加底部渐变线条（品牌色系 #4893FC → #969DFF → #BD99FE）
    - _需求: 7.4_

- [x] 11. Site Footer 视觉精致度提升
  - 在 `src/components/site-footer.tsx` 中：
  - 替换顶部 `border-t` 为品牌色系渐变分隔线（#4893FC → #BD99FE）
  - 为公司 logo 和品牌名称添加微妙的 hover 光效
  - 为联系邮箱链接添加 hover 渐变下划线动画
  - 在背景中添加微妙的装饰元素（极低透明度的网格或光点）
  - 确保深色/浅色模式下均协调一致
  - _需求: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 12. 全局视觉一致性审查与统一
  - [x] 12.1 统一 section badge 样式
    - 审查所有区段的 section badge，确保使用统一的视觉样式（`rounded-full border border-border/50 bg-card/40 px-4 py-1.5 backdrop-blur-sm`、`text-xs uppercase tracking-widest`）
    - _需求: 9.1_
  - [x] 12.2 统一标题字体层级与卡片圆角
    - 确保所有 h2 使用统一的 `text-4xl md:text-6xl` 层级和 tracking 值
    - 确保所有卡片组件使用统一的圆角半径（`rounded-2xl` 或 `rounded-xl`）、边框样式和背景透明度
    - _需求: 9.2, 9.3_
  - [x] 12.3 验证品牌渐变色一致性
    - 检查所有使用渐变的地方，确保品牌色（#4893FC → #969DFF → #BD99FE）保持一致
    - _需求: 9.4_

- [x] 13. 最终检查点 — 构建验证与质量保障
  - 运行 `pnpm lint` 确保 Biome 检查通过
  - 运行 `pnpm typecheck` 确保 TypeScript 类型检查通过
  - 运行 `pnpm build` 确保静态导出成功，/zh 和 /en 各生成独立 HTML
  - 确保所有装饰元素使用 `pointer-events: none`
  - 确保所有动画仅使用 `transform` 和 `opacity`
  - 如有问题请询问用户。
  - _需求: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

- [x] 14. 属性测试 — 岗位图标类型一致性
  - **Property 1: 岗位图标类型一致性**
  - **验证: 需求 5.1**
  - 安装 `fast-check` 开发依赖，编写属性测试验证所有 `siteConfig.jobs` 中的岗位 key 在 `jobIcons` 映射中返回 React 元素而非字符串

- [x] 15. 属性测试 — 装饰元素与动画属性验证
  - [x] 15.1 编写属性测试：装饰元素不阻塞交互
    - **Property 5: 装饰元素不阻塞交互**
    - **验证: 需求 10.2**
    - 扫描组件中的装饰性元素，验证包含 `pointer-events-none`
  - [x] 15.2 编写属性测试：动画仅使用 GPU 加速属性
    - **Property 4: 动画仅使用 GPU 加速属性**
    - **验证: 需求 7.6, 10.1**
    - 解析 globals.css 中的 `@keyframes` 定义，验证仅使用 `transform`/`opacity`
  - [x] 15.3 编写属性测试：品牌渐变色一致性
    - **Property 7: 品牌渐变色一致性**
    - **验证: 需求 9.4**
    - 扫描所有渐变声明，验证颜色值属于品牌色系

## 备注

- 标记 `*` 的任务为可选任务，可跳过以加速 MVP
- 每个任务引用了具体的需求编号以确保可追溯性
- 检查点任务确保增量验证
- 属性测试验证通用正确性属性
- 所有改动均为视觉层面，不改变组件的数据流或业务逻辑
