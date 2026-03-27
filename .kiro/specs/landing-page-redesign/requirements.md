# 需求文档：星跃智启 Landing Page 全面重设计

## 简介

对星跃智启（Zingspark）官方 Landing Page 进行全面重设计与代码重构。公司战略方向已从泛 AI 研发转向"原生 AI Agent 研发与跨领域场景落地"，Landing Page 需要全面反映这一新定位。重设计涵盖视觉设计升级、内容策略更新、页面结构扩展、代码质量优化及部署流程完善。

现有技术栈保持不变：Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Motion + next-intl (zh/en) + next-themes + Biome + Netlify 静态导出 + pnpm。

## 术语表

- **Landing_Page**：星跃智启官方单页面网站，部署于 https://zingspark.tech
- **Hero_Section**：页面首屏展示区，包含品牌标语、公司定位描述及行动号召按钮
- **Vision_Section**：公司愿景展示区段，展示"原生智能，跃迁未来"核心理念
- **Capability_Section**：团队核心能力展示区段，展示框架解构、软硬件协同、全球化三大能力
- **University_Marquee**：创始团队名校 logo 无限滚动展示区段
- **JD_Section**：招聘岗位展示区段，以卡片形式展示当前开放的职位列表
- **Recruitment_Form**：求职者信息收集表单，通过 mailto 协议发送邮件
- **Site_Header**：页面顶部固定导航栏，包含 logo、导航链接、主题切换和语言切换
- **Site_Footer**：页面底部区域，包含公司信息、备案号和联系方式
- **i18n_System**：基于 next-intl 的中英文国际化系统，使用路由前缀 /zh 和 /en，默认语言为英文
- **Lazy_Loading**：基于 React.lazy / next/dynamic 的组件懒加载策略，用于非首屏区段的按需加载
- **Theme_System**：基于 next-themes 的深色/浅色模式切换系统
- **Biome_Linter**：项目使用的代码格式化与静态检查工具
- **Static_Export**：Next.js 的静态导出模式，生成纯静态 HTML/CSS/JS 文件用于 Netlify 部署
- **Agent**：原生 AI Agent，星跃智启的核心产品方向——赋予 AI 视觉、四肢与执行力的智能体

## 需求

### 需求 1：Hero Section 品牌展示重设计

**用户故事：** 作为网站访客，我希望在首屏看到星跃智启全新的 AI Agent 定位和品牌形象，以便快速理解公司的核心价值主张。

#### 验收标准

1. WHEN 用户访问 Landing_Page 时，THE Hero_Section SHALL 展示星跃智启 logo（保留现有 `zingspark_Icon_FullColor.svg`）、全新品牌标语和公司定位描述
2. THE Hero_Section SHALL 将品牌标语更新为体现"原生 AI Agent"定位的文案（中英文双语），替换现有的"智启未来，跃见无限可能"
3. THE Hero_Section SHALL 将公司描述更新为强调"大语言模型只是大脑，Agent 才是赋予 AI 视觉、四肢与执行力的关键"这一核心理念
4. THE Hero_Section SHALL 包含一个行动号召按钮，点击后平滑滚动至 JD_Section 或 Recruitment_Form
5. THE Hero_Section SHALL 保留动态背景动画效果（渐变光效、旋转轨道线、发光球体），并确保动画在移动端和桌面端均流畅运行
6. THE Hero_Section SHALL 包含向下滚动指示器，引导用户继续浏览页面

### 需求 2：公司愿景区段新增

**用户故事：** 作为网站访客，我希望了解星跃智启的愿景和战略定位，以便判断公司的发展方向和技术实力。

#### 验收标准

1. THE Vision_Section SHALL 展示公司愿景"Empowering Paradigm Shifts with Native AI. 原生智能，跃迁未来"
2. THE Vision_Section SHALL 包含对公司定位"Frontier Lab"的描述，阐述星跃智启致力于用通用智能体打破物理与数字边界的使命
3. THE Vision_Section SHALL 使用视觉动画效果（如滚动触发的渐入动画）增强内容呈现
4. THE Vision_Section SHALL 在 Hero_Section 之后、Capability_Section 之前展示

### 需求 3：团队核心能力展示区段新增

**用户故事：** 作为潜在合作伙伴或求职者，我希望了解星跃智启团队的核心技术能力，以便评估合作或加入的价值。

#### 验收标准

1. THE Capability_Section SHALL 以卡片或分栏形式展示三大核心能力：深度框架解构能力、软硬件协同开发能力、全球化能力
2. WHEN 展示"深度框架解构能力"时，THE Capability_Section SHALL 提及团队对 OpenClaw、MetaGPT、CrawlAI 等主流多智能体框架的深度解构经验，以及作为顶级 Agent 开源项目活跃贡献者的身份
3. WHEN 展示"软硬件协同开发能力"时，THE Capability_Section SHALL 说明团队具备从数字系统走向实体硬件生态的 Agent 开发潜力
4. WHEN 展示"全球化能力"时，THE Capability_Section SHALL 强调团队的英文专业沟通能力和与国际前沿实时同步的技术栈
5. THE Capability_Section SHALL 使用滚动触发的交错动画效果，使三张能力卡片依次渐入展示
6. THE Capability_Section SHALL 在 Vision_Section 之后、University_Marquee 之前展示

### 需求 4：University Marquee 优化

**用户故事：** 作为网站访客，我希望看到创始团队的学术背景展示，以便了解团队的学术实力。

#### 验收标准

1. THE University_Marquee SHALL 以无限滚动走马灯形式展示 11 所高校的 logo 和名称（清华、北大、哈佛、新加坡国立、上交、华科、北理、川大、北邮、北科、深大）
2. THE University_Marquee SHALL 将标题更新为体现"一群极客，和全球最顶尖的大脑"这一团队描述
3. THE University_Marquee SHALL 在走马灯两侧使用渐变遮罩实现平滑的淡入淡出视觉效果
4. THE University_Marquee SHALL 根据当前语言环境（zh/en）展示对应语言的高校名称
5. THE University_Marquee SHALL 在 Capability_Section 之后、JD_Section 之前展示

### 需求 5：招聘岗位展示区段新增

**用户故事：** 作为求职者，我希望看到星跃智启当前开放的岗位列表，以便找到适合自己的职位。

#### 验收标准

1. THE JD_Section SHALL 以卡片网格形式展示以下 9 个岗位：AI Agent Developer、Algorithm Engineer、Software Architect、Hardware Lead、QA & Testing Engineer、Global PR、AI PM、Talent Acquisition、UI/UX Designer
2. WHEN 用户点击某个岗位卡片时，THE JD_Section SHALL 高亮该卡片并将岗位名称自动填入 Recruitment_Form 的"感兴趣方向"字段
3. THE JD_Section SHALL 为每个岗位卡片提供中英文双语的岗位名称
4. THE JD_Section SHALL 使用滚动触发的动画效果展示岗位卡片
5. THE JD_Section SHALL 在 University_Marquee 之后、Recruitment_Form 之前展示

### 需求 6：招聘表单更新

**用户故事：** 作为求职者，我希望通过表单提交个人信息和求职意向，以便申请加入星跃智启。

#### 验收标准

1. THE Recruitment_Form SHALL 收集以下字段：姓名（必填）、邮箱（必填）、手机号（选填）、学校/机构（选填）、学历（下拉选择：本科/硕士/博士/其他）、感兴趣方向（文本输入）、留言（选填）
2. WHEN 用户提交表单时，THE Recruitment_Form SHALL 通过 mailto 协议组装邮件内容并发送至 hi@zingspark.tech（替换现有的 zingsparktech@gmail.com）
3. THE Recruitment_Form SHALL 在邮件主题中包含申请者姓名和学校信息，格式为 `[Zingspark Application] {姓名} — {学校}`
4. THE Recruitment_Form SHALL 为所有表单字段提供中英文双语的标签和占位符文本
5. IF 用户未填写必填字段（姓名或邮箱），THEN THE Recruitment_Form SHALL 通过浏览器原生表单验证阻止提交并提示用户
6. THE Recruitment_Form SHALL 展示"硕士/博士优先"的标注信息

### 需求 7：导航栏更新

**用户故事：** 作为网站访客，我希望通过导航栏快速跳转到页面各区段，以便高效浏览内容。

#### 验收标准

1. THE Site_Header SHALL 包含以下导航链接：关于我们（#about）、愿景（#vision）、能力（#capabilities）、团队（#team）、岗位（#jobs）、加入我们（#join）
2. THE Site_Header SHALL 在页面顶部固定显示，使用半透明背景和模糊效果
3. THE Site_Header SHALL 在移动端提供汉堡菜单，点击后展开导航链接列表
4. THE Site_Header SHALL 包含主题切换按钮（深色/浅色/系统）和语言切换按钮（中文/English）
5. THE Site_Header SHALL 保留现有 Zingspark logo 和品牌名称展示

### 需求 8：页脚更新

**用户故事：** 作为网站访客，我希望在页脚看到公司的联系方式和法律信息，以便获取更多信息。

#### 验收标准

1. THE Site_Footer SHALL 展示公司全称"星跃智启（上海）科技有限公司 / Zingspark (Shanghai) Tech Co., Ltd."
2. THE Site_Footer SHALL 展示办公地点"北京 · 上海 · 深圳"
3. THE Site_Footer SHALL 展示联系邮箱 hi@zingspark.tech（替换现有的 zingsparktech@gmail.com），邮箱以可点击的 mailto 链接形式呈现
4. THE Site_Footer SHALL 展示 ICP 备案号（链接至 https://beian.miit.gov.cn/）和公安备案号
5. THE Site_Footer SHALL 展示版权信息"© 2026 星跃智启 版权所有"

### 需求 9：国际化内容全面更新与默认语言切换

**用户故事：** 作为中文或英文用户，我希望看到与新公司战略一致的本地化内容，并且首次访问时直接看到英文页面内容而非语言选择中间页。

#### 验收标准

1. THE i18n_System SHALL 将默认语言从中文（zh）切换为英文（en），更新 `src/i18n/routing.ts` 中的 `defaultLocale` 配置
2. THE i18n_System SHALL 移除根路径（`/`）的语言选择中间页（当前 `src/app/page.tsx` 中的重定向页面），改为直接将根路径重定向至 `/en` 英文页面
3. THE i18n_System SHALL 为所有新增和修改的页面内容提供中文（zh）和英文（en）两套完整的翻译文本
4. THE i18n_System SHALL 将 messages/zh.json 和 messages/en.json 中的所有文案更新为体现 AI Agent 新定位的内容
5. THE i18n_System SHALL 为新增的 Vision_Section、Capability_Section、JD_Section 添加对应的翻译键值
6. WHEN 用户切换语言时，THE i18n_System SHALL 在不刷新页面的情况下切换所有可见文本内容至目标语言
7. THE i18n_System SHALL 确保中英文内容在语义上一致，而非逐字翻译
8. THE i18n_System SHALL 更新根布局 `src/app/layout.tsx` 中的 `lang` 属性为 `"en"`

### 需求 10：站点配置与 SEO 全面优化

**用户故事：** 作为网站运营者，我希望站点具备完善的 SEO 配置，确保搜索引擎能正确索引、展示和排名网站内容。

#### 验收标准

1. THE Landing_Page SHALL 将 site-config.ts 中的邮箱从 `zingsparktech@gmail.com` 更新为 `hi@zingspark.tech`
2. THE Landing_Page SHALL 更新 HTML meta 标签（title、description、keywords）和 Open Graph 标签以反映 AI Agent 新定位
3. THE Landing_Page SHALL 更新 JSON-LD 结构化数据以包含最新的公司描述、联系信息和组织类型（Organization schema）
4. THE Landing_Page SHALL 保持 sitemap.xml 的正确配置，确保包含 /en 和 /zh 两个语言版本的 URL
5. THE Landing_Page SHALL 确保 robots.txt 正确配置，允许搜索引擎爬取所有公开页面并引用 sitemap 地址
6. THE Landing_Page SHALL 为新增的页面区段添加语义化的 HTML section 标签和对应的 id 属性
7. THE Landing_Page SHALL 为中英文页面配置正确的 `hreflang` 替代链接标签，帮助搜索引擎识别语言版本关系
8. THE Landing_Page SHALL 确保所有页面的 canonical URL 正确指向对应的语言版本
9. THE Landing_Page SHALL 为 Open Graph 和 Twitter Card 配置完整的社交分享元数据（标题、描述、图片、站点名称）

### 需求 11：响应式设计、视觉优化与懒加载

**用户故事：** 作为使用不同设备的访客，我希望页面加载快速、在各设备上均有良好的视觉体验，非首屏内容按需加载以提升首屏性能。

#### 验收标准

1. THE Landing_Page SHALL 在移动端（宽度 < 768px）、平板端（768px - 1024px）和桌面端（> 1024px）均正确展示所有区段内容
2. THE Landing_Page SHALL 在深色模式和浅色模式下均保持良好的对比度和可读性
3. THE Landing_Page SHALL 对所有滚动触发的动画使用 `viewport: { once: true }` 配置，确保动画仅在首次进入视口时触发
4. THE Landing_Page SHALL 确保所有图片使用 Next.js Image 组件进行优化加载
5. THE Landing_Page SHALL 确保页面在各区段之间的滚动过渡平滑自然
6. THE Landing_Page SHALL 对非首屏区段组件（Vision_Section、Capability_Section、University_Marquee、JD_Section、Recruitment_Form、Site_Footer）使用 `next/dynamic` 进行懒加载，仅在用户滚动至视口附近时加载对应组件代码
7. THE Landing_Page SHALL 确保 Hero_Section 和 Site_Header 作为首屏关键内容不使用懒加载，保证首屏渲染速度

### 需求 12：代码质量与仓库规范

**用户故事：** 作为开发者，我希望代码库结构清晰、格式规范，以便后续维护和迭代。

#### 验收标准

1. THE Landing_Page SHALL 确保所有源代码通过 Biome_Linter 的检查（`pnpm lint` 无错误）
2. THE Landing_Page SHALL 将组件文件按功能模块组织在 `src/components/` 目录下
3. THE Landing_Page SHALL 确保所有 TypeScript 文件通过类型检查（`pnpm typecheck` 无错误）
4. THE Landing_Page SHALL 移除所有未使用的代码、组件和依赖
5. THE Landing_Page SHALL 确保 site-config.ts 中集中管理所有可配置的公司信息（名称、邮箱、办公地点、岗位列表等）

### 需求 13：构建与部署

**用户故事：** 作为网站运营者，我希望网站能正确构建并部署到 Netlify，以便用户通过 https://zingspark.tech 访问。

#### 验收标准

1. THE Landing_Page SHALL 通过 `pnpm build` 成功构建为静态导出（Static_Export）
2. THE Landing_Page SHALL 通过 Netlify 部署至 https://zingspark.tech，使用现有的 netlify.toml 配置
3. THE Landing_Page SHALL 在构建产物中为 /zh 和 /en 两个语言路径各生成独立的 HTML 文件
4. IF 构建过程中出现 TypeScript 类型错误或 lint 错误，THEN THE Landing_Page SHALL 在构建前修复所有错误以确保构建成功
5. THE Landing_Page SHALL 通过 Git 推送至 GitHub 仓库（github.com/sylvanding/zingspark-landing-page），直接推送至 main 分支
6. THE Landing_Page SHALL 确保 Netlify 部署后根路径（`/`）自动重定向至 `/en`，无中间语言选择页面
