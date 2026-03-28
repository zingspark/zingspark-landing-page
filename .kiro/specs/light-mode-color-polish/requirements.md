# 需求文档：亮色模式颜色优化与 Hero Section 按钮精简

## 简介

对星跃智启（Zingspark）Landing Page 进行两项优化：（1）删除 Hero Section 中的 "Scroll to explore" 按钮（即 `href="#vision"` 的辅助导航按钮），精简首屏 CTA 区域；（2）全面优化亮色模式下的颜色体系，提升整体视觉精致度，解决当前亮色模式下颜色偏淡、对比度不足、视觉层次感弱的问题。

现有技术栈保持不变：Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + tw-animate-css + Motion (Framer Motion v12) + next-intl (zh/en) + next-themes + Biome + Netlify 静态导出。

## 术语表

- **Landing_Page**：星跃智启官方单页面网站，部署于 https://zingspark.tech
- **Hero_Section**：页面首屏展示区（hero-section.tsx），包含品牌标语、轨道线动画、CTA 按钮
- **Scroll_Button**：Hero_Section 中 `href="#vision"` 的辅助按钮，显示 "Scroll to explore" 文本和 chevron down 图标
- **Light_Mode**：亮色模式，由 `:root` 选择器下的 CSS 自定义属性（globals.css）控制
- **Dark_Mode**：深色模式，由 `.dark` 选择器下的 CSS 自定义属性控制
- **CSS_Variable**：CSS 自定义属性，如 `--background`、`--foreground`、`--muted-foreground` 等，定义在 globals.css 中
- **Vision_Section**：公司愿景展示区段（vision-section.tsx）
- **Capability_Section**：核心能力展示区段（capability-section.tsx）
- **University_Marquee**：名校 logo 走马灯区段（university-marquee.tsx）
- **JD_Section**：招聘岗位卡片展示区段（jd-section.tsx）
- **Recruitment_Form**：求职表单区段（recruitment-section.tsx）
- **Site_Header**：固定顶部导航栏（site-header.tsx）
- **Site_Footer**：页面底部区域（site-footer.tsx）
- **Glass_Card**：毛玻璃卡片效果，通过 backdrop-blur 和半透明背景实现，定义在 globals.css 中的 `.glass-card` 和 `.glass-card-enhanced` 类
- **Section_Divider**：区段分隔线，定义在 globals.css 中的 `.section-divider` 类
- **Brand_Gradient**：品牌渐变色系（#4893FC → #969DFF → #BD99FE）

## 需求

### 需求 1：删除 Hero Section 的 Scroll to explore 按钮

**用户故事：** 作为网站访客，我希望首屏 CTA 区域简洁有力，只保留核心的 "加入我们" 按钮，避免辅助按钮分散注意力。

#### 验收标准

1. THE Hero_Section SHALL 移除 Scroll_Button（即 `href="#vision"` 的 `<a>` 元素，包含 scrollDown 文本和 chevron down 图标）
2. THE Hero_Section SHALL 在移除 Scroll_Button 后保持 CTA 区域的居中对齐和视觉平衡
3. THE Hero_Section SHALL 保留底部的滚动指示器动画（scroll indicator，即带有上下弹跳动画的圆角矩形元素），作为唯一的向下滚动视觉提示
4. THE Landing_Page SHALL 确保中文和英文语言包中的 `Hero.scrollDown` 键值可保留不删除（避免破坏 i18n 结构），仅移除组件中对该键值的引用

### 需求 2：亮色模式全局 CSS 变量颜色优化

**用户故事：** 作为网站访客，我希望在亮色模式下浏览时，页面颜色层次分明、对比度适中，而非整体偏白偏淡导致内容难以区分。

#### 验收标准

1. THE Light_Mode SHALL 优化 `:root` 下的 `--background` CSS_Variable，使页面背景从纯白偏移至带有微妙蓝紫色调的暖灰白色，增加视觉深度
2. THE Light_Mode SHALL 优化 `:root` 下的 `--card` CSS_Variable，使卡片背景与页面背景之间有可感知的层次差异（卡片略亮于背景或带有不同色调）
3. THE Light_Mode SHALL 优化 `:root` 下的 `--muted-foreground` CSS_Variable，提升辅助文字的可读性，确保与背景的对比度满足 WCAG AA 标准（对比度 >= 4.5:1）
4. THE Light_Mode SHALL 优化 `:root` 下的 `--border` CSS_Variable，使边框在亮色模式下更加清晰可辨，避免边框几乎不可见的问题
5. THE Light_Mode SHALL 优化 `:root` 下的 `--secondary` 和 `--muted` CSS_Variable，使次要背景区域有更明显的视觉区分度
6. THE Light_Mode SHALL 确保所有 CSS_Variable 调整后，深色模式（`.dark` 选择器）的颜色值保持不变

### 需求 3：亮色模式下装饰元素与光效可见度优化

**用户故事：** 作为网站访客，我希望在亮色模式下也能看到精致的装饰元素和光效，而非这些元素因透明度过低而几乎不可见。

#### 验收标准

1. THE Light_Mode SHALL 提升 Hero_Section 中发光球体（glow orbs）的亮色模式透明度，使其从当前的 `opacity-[0.04]` 提升至可感知但不喧宾夺主的水平
2. THE Light_Mode SHALL 提升 Hero_Section 中轨道环线（orbital rings）的亮色模式边框透明度，使其从当前的 `border-primary/[0.07]` 提升至清晰可辨的水平
3. THE Light_Mode SHALL 提升 Vision_Section 中 aurora 背景动画的亮色模式透明度，使渐变色彩流动效果在亮色模式下可感知
4. THE Light_Mode SHALL 提升 Vision_Section 中浮动粒子（floating particles）的亮色模式透明度，使其在亮色背景下可见
5. THE Light_Mode SHALL 提升 Section_Divider 中渐变线条和发光圆点的亮色模式透明度，使区段分隔在亮色模式下清晰可见
6. THE Light_Mode SHALL 确保所有透明度调整仅影响亮色模式，深色模式下的透明度值保持不变

### 需求 4：亮色模式下卡片与表单组件视觉优化

**用户故事：** 作为网站访客，我希望在亮色模式下，卡片和表单组件有清晰的边界和精致的视觉效果，而非与背景融为一体难以区分。

#### 验收标准

1. THE Light_Mode SHALL 优化 `.glass-card-enhanced` 类的亮色模式样式，增加卡片的边框可见度和阴影深度，使卡片在亮色背景上有明确的视觉边界
2. THE Light_Mode SHALL 优化 Capability_Section 中能力卡片的亮色模式边框和背景样式，使卡片在亮色模式下有清晰的层次感
3. THE Light_Mode SHALL 优化 University_Marquee 中大学 logo 卡片的亮色模式阴影效果，使卡片在亮色背景上有适当的浮起感
4. THE Light_Mode SHALL 优化 JD_Section 中岗位卡片的亮色模式边框和 hover 效果，确保卡片边界在亮色模式下清晰可辨
5. THE Light_Mode SHALL 优化 Recruitment_Form 中输入框的亮色模式边框和背景样式，确保输入框在亮色背景上有明确的视觉边界
6. THE Light_Mode SHALL 确保所有卡片组件的亮色模式优化不影响深色模式下的现有样式

### 需求 5：亮色模式下导航栏与页脚视觉优化

**用户故事：** 作为网站访客，我希望在亮色模式下，导航栏和页脚区域有清晰的视觉层次和精致的细节，与整体优化后的亮色模式风格保持一致。

#### 验收标准

1. THE Site_Header SHALL 优化亮色模式下导航栏的背景透明度和毛玻璃效果，确保导航栏在亮色背景上有足够的视觉区分度
2. THE Site_Header SHALL 优化亮色模式下导航栏边框的可见度，使导航栏边界在亮色模式下清晰可辨
3. THE Site_Footer SHALL 优化亮色模式下页脚顶部渐变分隔线的可见度，确保分隔线在亮色背景上清晰可见
4. THE Site_Footer SHALL 优化亮色模式下页脚文字的颜色层次，确保公司名称、地址、版权信息之间有清晰的视觉权重差异
5. THE Landing_Page SHALL 确保导航栏和页脚的亮色模式优化不影响深色模式下的现有样式

### 需求 6：亮色模式下渐变与品牌色适配

**用户故事：** 作为网站访客，我希望在亮色模式下，品牌渐变色和强调色在浅色背景上依然鲜明有力，而非因背景过亮而显得暗淡。

#### 验收标准

1. THE Light_Mode SHALL 优化 Hero_Section 中标题渐变文字的亮色模式 drop-shadow 效果，使渐变文字在亮色背景上有适当的光晕衬托
2. THE Light_Mode SHALL 优化 Vision_Section 中标语渐变文字的亮色模式 filter drop-shadow 效果，增强渐变文字在亮色背景上的视觉冲击力
3. THE Light_Mode SHALL 优化 `.gradient-mesh` 类的亮色模式渐变透明度，使 Hero 背景的渐变色彩在亮色模式下更加丰富可见
4. THE Light_Mode SHALL 优化 CTA 按钮（"加入我们"）的亮色模式阴影效果，使按钮在亮色背景上有更强的视觉突出度
5. THE Light_Mode SHALL 确保所有渐变和品牌色调整仅影响亮色模式，深色模式下的渐变效果保持不变

### 需求 7：代码质量与兼容性保障

**用户故事：** 作为开发者，我希望亮色模式优化不会引入代码质量问题或破坏现有功能，确保网站的稳定性和可维护性。

#### 验收标准

1. THE Landing_Page SHALL 确保所有源代码通过 Biome 检查（`pnpm lint` 无错误）
2. THE Landing_Page SHALL 确保所有 TypeScript 文件通过类型检查（`pnpm typecheck` 无错误）
3. THE Landing_Page SHALL 确保 `pnpm build` 静态导出成功，构建产物中 /zh 和 /en 两个语言路径各生成独立的 HTML 文件
4. THE Landing_Page SHALL 确保深色模式下的所有视觉效果与优化前保持一致，亮色模式优化不引入深色模式的视觉回归
5. THE Landing_Page SHALL 确保所有颜色修改使用 oklch 色彩空间，与现有 CSS_Variable 的色彩空间保持一致
