# 需求文档：星跃智启 Landing Page 视觉美化与极致优化

## 简介

对星跃智启（Zingspark）Landing Page 进行全面的视觉美化升级，在保持现有功能和页面结构不变的前提下，将视觉品质提升至顶级 AI 公司官网水准。优化涵盖区段间视觉过渡、微交互动画细节、视觉层次感、科技感装饰元素、以及整体设计一致性。

现有技术栈保持不变：Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + tw-animate-css + Motion (Framer Motion v12) + next-intl (zh/en) + next-themes + Biome + Netlify 静态导出。

## 术语表

- **Landing_Page**：星跃智启官方单页面网站，部署于 https://zingspark.tech
- **Hero_Section**：页面首屏展示区，包含品牌标语、轨道线动画、发光球体和 CTA 按钮
- **Vision_Section**：公司愿景展示区段，包含 aurora 背景动画和渐变文字
- **Capability_Section**：核心能力展示区段，包含三张能力卡片
- **University_Marquee**：名校 logo 无限滚动走马灯区段
- **JD_Section**：招聘岗位卡片网格展示区段
- **Recruitment_Form**：求职表单区段，包含玻璃卡片效果
- **Site_Header**：固定顶部导航栏，包含毛玻璃效果
- **Site_Footer**：页面底部区域
- **Section_Divider**：区段之间的视觉过渡元素，用于创造流畅的视觉连接
- **Micro_Interaction**：细微的交互反馈动画，如 hover 效果、焦点状态、点击反馈等
- **Glow_Effect**：发光效果，通过 CSS box-shadow、blur 和渐变实现的光晕装饰
- **Particle_Element**：粒子装饰元素，通过 CSS 或 SVG 实现的浮动光点
- **Glass_Morphism**：毛玻璃/玻璃拟态效果，通过 backdrop-blur 和半透明背景实现
- **Gradient_Accent**：渐变强调色，使用品牌色系（#4893FC → #969DFF → #BD99FE）的渐变装饰
- **Motion_Library**：项目使用的 Framer Motion v12 动画库（import from "motion/react"）
- **Theme_System**：基于 next-themes 的深色/浅色模式切换系统

## 需求

### 需求 1：区段间视觉过渡与分隔优化

**用户故事：** 作为网站访客，我希望在滚动浏览页面时，各区段之间有流畅自然的视觉过渡，而非生硬的断裂感，以获得沉浸式的浏览体验。

#### 验收标准

1. THE Landing_Page SHALL 在 Hero_Section 与 Vision_Section 之间添加渐变过渡效果，使背景色从 Hero 的深色调自然过渡到 Vision 的 aurora 背景
2. THE Landing_Page SHALL 在 Vision_Section 与 Capability_Section 之间添加装饰性分隔元素（如渐变线条、光点或微妙的几何图形），创造视觉连接感
3. THE Landing_Page SHALL 在 Capability_Section 与 University_Marquee 之间添加过渡效果，避免两个区段之间的视觉断裂
4. THE Landing_Page SHALL 在 JD_Section 与 Recruitment_Form 之间添加视觉引导元素，暗示用户从"选择岗位"到"提交申请"的操作流程
5. THE Landing_Page SHALL 确保所有区段过渡效果在深色模式和浅色模式下均视觉协调
6. THE Landing_Page SHALL 确保区段过渡元素使用纯 CSS 实现（渐变、伪元素），避免增加额外的 JavaScript 运行时开销

### 需求 2：Vision Section 视觉丰富度提升

**用户故事：** 作为网站访客，我希望愿景区段有更丰富的视觉层次和装饰元素，而非大面积留白，以感受到公司的技术实力和前瞻性。

#### 验收标准

1. THE Vision_Section SHALL 增加浮动粒子或光点装饰元素，在 aurora 背景上营造深邃的科技感氛围
2. THE Vision_Section SHALL 为愿景标语文字添加更精致的渐变效果和微妙的文字光晕（text-shadow），增强视觉冲击力
3. THE Vision_Section SHALL 优化上下内边距和内容间距，减少空旷感，使内容区域更加紧凑有力
4. THE Vision_Section SHALL 在内容区域周围添加装饰性几何线条或光弧元素，丰富视觉层次
5. THE Vision_Section SHALL 确保所有新增装饰元素使用 CSS 动画或 Motion_Library 实现平滑的缓动效果
6. THE Vision_Section SHALL 确保新增视觉元素在移动端适当缩减或隐藏，避免影响内容可读性

### 需求 3：Capability Section 卡片视觉升级

**用户故事：** 作为网站访客，我希望能力卡片有更精致的视觉设计和交互反馈，以便更好地理解和记住每项核心能力。

#### 验收标准

1. THE Capability_Section SHALL 为每张能力卡片添加顶部或侧边的渐变强调色条，使用对应能力的主题色（framework: #4893FC, hardware: #00B95C, global: #BD99FE）
2. THE Capability_Section SHALL 增强卡片 hover 状态的视觉反馈，包括更明显的边框发光效果、卡片微微上浮（translateY）和阴影加深
3. THE Capability_Section SHALL 为卡片图标添加背景光晕动画效果，使图标区域更具视觉吸引力
4. THE Capability_Section SHALL 在卡片之间添加视觉连接元素（如虚线或渐变连接线），暗示三大能力的协同关系
5. THE Capability_Section SHALL 优化卡片内部的排版层次，增加图标与标题之间的视觉权重对比
6. THE Capability_Section SHALL 确保卡片在深色模式下有适当的内发光或边缘高光效果，增强立体感

### 需求 4：University Marquee 视觉亮点增强

**用户故事：** 作为网站访客，我希望名校走马灯区段有更精致的视觉呈现，以感受到团队的学术实力和国际化背景。

#### 验收标准

1. THE University_Marquee SHALL 为每个大学 logo 卡片添加微妙的悬浮光晕效果，hover 时光晕增强并显示品牌色调
2. THE University_Marquee SHALL 优化走马灯两侧的渐变遮罩效果，使用更宽的渐变范围和更柔和的过渡
3. THE University_Marquee SHALL 为区段标题添加装饰性元素（如两侧的渐变线条或光点），增强标题的视觉重量
4. THE University_Marquee SHALL 确保 logo 卡片在深色模式下有适当的背景发光效果，使 logo 更加突出
5. THE University_Marquee SHALL 确保走马灯滚动速度平滑均匀，无卡顿或跳帧现象

### 需求 5：JD Section 岗位卡片差异化与科技感提升

**用户故事：** 作为求职者，我希望岗位卡片有更具科技感的视觉设计和差异化呈现，以便快速识别和选择感兴趣的岗位。

#### 验收标准

1. THE JD_Section SHALL 将岗位卡片中的 emoji 图标替换为统一风格的 SVG 线条图标或渐变图标，与整体设计语言保持一致
2. THE JD_Section SHALL 为每张岗位卡片添加独特的渐变强调色或角标装饰，实现卡片之间的视觉差异化
3. THE JD_Section SHALL 增强卡片 hover 状态的微交互效果，包括边框渐变动画、图标微动画和背景光效变化
4. THE JD_Section SHALL 为选中状态的卡片添加更明显的视觉反馈（如脉冲光效、渐变边框动画），使选中状态一目了然
5. THE JD_Section SHALL 优化卡片网格的整体布局间距和对齐方式，确保在不同屏幕尺寸下均匀美观
6. THE JD_Section SHALL 确保所有新增图标和装饰元素在深色模式和浅色模式下均清晰可辨

### 需求 6：Recruitment Form 表单精致度提升

**用户故事：** 作为求职者，我希望申请表单有更精致的视觉设计和交互体验，以感受到公司对细节的重视。

#### 验收标准

1. THE Recruitment_Form SHALL 增强表单卡片的玻璃拟态效果，添加更精致的边框光效和内部渐变装饰
2. THE Recruitment_Form SHALL 为输入框添加焦点状态的渐变边框动画效果，替代当前的单色 focus ring
3. THE Recruitment_Form SHALL 为提交按钮添加更丰富的 hover 微交互（如渐变流动效果、图标微动画），增强点击欲望
4. THE Recruitment_Form SHALL 为表单区域添加装饰性背景元素（如微妙的网格线或光点），丰富视觉层次
5. THE Recruitment_Form SHALL 确保所有表单交互动画流畅自然，过渡时长在 150ms 至 300ms 之间

### 需求 7：全局微交互与动画细节优化

**用户故事：** 作为网站访客，我希望页面中的每一个交互都有精致的动画反馈，以获得流畅、高品质的浏览体验。

#### 验收标准

1. THE Landing_Page SHALL 为所有可点击元素（导航链接、按钮、卡片）添加统一的 hover 过渡效果，过渡时长在 150ms 至 300ms 之间
2. THE Landing_Page SHALL 为页面滚动触发的区段入场动画添加更精致的缓动曲线，使用 easeOut 或自定义 cubic-bezier 曲线
3. THE Landing_Page SHALL 为 Site_Header 添加滚动时的背景透明度渐变效果，使导航栏在页面顶部时更透明，滚动后逐渐加深
4. THE Site_Header SHALL 为当前活跃的导航链接添加视觉指示器（如底部渐变线条或背景高亮），帮助用户识别当前浏览位置
5. THE Landing_Page SHALL 确保所有动画效果尊重用户的 `prefers-reduced-motion` 系统设置，在用户偏好减少动画时禁用非必要动画
6. THE Landing_Page SHALL 确保所有新增动画使用 CSS transform 和 opacity 属性实现，避免触发布局重排（layout thrashing）

### 需求 8：Site Footer 视觉精致度提升

**用户故事：** 作为网站访客，我希望页脚区域有与页面整体风格一致的精致设计，而非简单的信息罗列，以获得完整的视觉体验。

#### 验收标准

1. THE Site_Footer SHALL 添加顶部装饰性渐变分隔线，使用品牌色系渐变（#4893FC → #BD99FE），替代当前的单色 border-t
2. THE Site_Footer SHALL 为公司 logo 和品牌名称添加微妙的 hover 光效
3. THE Site_Footer SHALL 为联系邮箱链接添加 hover 时的渐变下划线动画效果
4. THE Site_Footer SHALL 在背景中添加微妙的装饰元素（如极低透明度的网格或光点），增加视觉深度
5. THE Site_Footer SHALL 确保所有新增视觉效果在深色模式和浅色模式下均协调一致

### 需求 9：全局视觉一致性与设计系统优化

**用户故事：** 作为网站访客，我希望整个页面的视觉风格高度统一，每个区段都像是同一个精心设计的整体的一部分。

#### 验收标准

1. THE Landing_Page SHALL 确保所有区段的 section badge（如 "Frontier AI Lab"、"Our Vision"、"What We Do" 等标签）使用统一的视觉样式（圆角、边框、背景、字体大小、字间距）
2. THE Landing_Page SHALL 确保所有区段标题使用统一的字体大小层级（h2: text-4xl md:text-6xl）和 tracking 值
3. THE Landing_Page SHALL 确保所有卡片组件（能力卡片、大学卡片、岗位卡片、表单卡片）使用统一的圆角半径、边框样式和背景透明度
4. THE Landing_Page SHALL 确保品牌渐变色（#4893FC → #969DFF → #BD99FE）在所有使用渐变的地方保持一致
5. THE Landing_Page SHALL 将所有可复用的视觉效果样式（如 glass-card、glow 效果、渐变线条）提取为 CSS 工具类或 Tailwind 自定义类，定义在 globals.css 中
6. THE Landing_Page SHALL 确保深色模式和浅色模式下的所有颜色对比度满足 WCAG AA 标准（正文文字对比度 >= 4.5:1，大文字对比度 >= 3:1）

### 需求 10：性能与代码质量保障

**用户故事：** 作为开发者，我希望视觉优化不会引入性能退化或代码质量问题，以确保网站的加载速度和可维护性。

#### 验收标准

1. THE Landing_Page SHALL 确保所有新增 CSS 动画使用 GPU 加速属性（transform、opacity），避免使用会触发重排的属性（width、height、top、left）
2. THE Landing_Page SHALL 确保所有新增装饰元素使用 `pointer-events: none`，避免干扰用户的正常交互
3. THE Landing_Page SHALL 确保所有源代码通过 Biome 检查（`pnpm lint` 无错误）
4. THE Landing_Page SHALL 确保所有 TypeScript 文件通过类型检查（`pnpm typecheck` 无错误）
5. THE Landing_Page SHALL 确保 `pnpm build` 静态导出成功，构建产物中 /zh 和 /en 两个语言路径各生成独立的 HTML 文件
6. THE Landing_Page SHALL 确保新增的 CSS 动画和装饰元素不会导致页面首屏加载时间（LCP）增加超过 100ms
