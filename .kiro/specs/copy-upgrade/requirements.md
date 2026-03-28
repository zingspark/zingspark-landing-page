# 需求文档：文案升级（Copy Upgrade）

## 简介

Zingspark（星跃智启）官网当前文案风格偏直白、缺乏品牌质感，用户反馈"太土"。本次需求旨在对 `messages/en.json` 和 `messages/zh.json` 中的所有宣传性文案进行全面升级，使其更具格调、更有品味、更符合一家前沿 AI 实验室的品牌调性。

升级范围覆盖：Meta 信息、Hero 区域、Vision 区域、Capabilities 区域、Universities 区域、Jobs 区域、Recruitment 区域、Footer 区域的所有面向用户的宣传文案。

技术约束：仅修改 JSON 翻译文件中的值，不改变任何键名，不改变组件代码结构。

## 术语表

- **翻译文件（Translation_Files）**：`messages/en.json` 和 `messages/zh.json`，存储网站所有中英文文案
- **翻译键（Translation_Key）**：JSON 文件中的键名路径，如 `Hero.line1`、`Vision.tagline`
- **宣传文案（Marketing_Copy）**：面向访客的品牌宣传性文字，不包括表单标签、按钮文字等功能性文案
- **功能文案（Functional_Copy）**：表单字段标签、下拉选项、占位符等 UI 功能性文字
- **品牌调性（Brand_Tone）**：克制、精炼、有未来感、技术自信但不浮夸的文案风格
- **EARS 模式**：需求书写规范（Ubiquitous / Event-driven / State-driven / Unwanted / Optional / Complex）

## 需求

### 需求 1：Hero 区域文案升级

**用户故事：** 作为网站访客，我希望首屏文案简洁有力、富有品牌张力，以便在第一时间感受到 Zingspark 的技术格调与愿景高度。

#### 验收标准

1. THE Translation_Files SHALL contain upgraded `Hero.line1` values that are concise (no more than 5 words in English, no more than 10 个汉字 in Chinese) and convey a sense of frontier technology ambition.
2. THE Translation_Files SHALL contain upgraded `Hero.line2` values that complement `Hero.line1` and together form a compelling two-line headline with rhythmic cadence.
3. THE Translation_Files SHALL contain an upgraded `Hero.description` value that avoids cliché metaphors (e.g., "eyes, limbs") and instead articulates the Agent paradigm with precision and elegance.
4. THE Translation_Files SHALL preserve the existing `Hero.cta` and `Hero.scrollDown` values unchanged, as these are Functional_Copy.
5. THE Translation_Files SHALL ensure the Chinese and English Hero copy are semantically aligned but each reads naturally in its own language, rather than being literal translations.

### 需求 2：Vision 区域文案升级

**用户故事：** 作为网站访客，我希望愿景区域的文案传达出清晰的技术哲学与长远视野，以便理解 Zingspark 的核心信念。

#### 验收标准

1. THE Translation_Files SHALL contain an upgraded `Vision.tagline` value that is a single impactful phrase (no more than 8 words in English, no more than 12 个汉字 in Chinese) expressing the lab's core thesis.
2. THE Translation_Files SHALL contain an upgraded `Vision.subtitle` value that expands on the tagline with a forward-looking statement.
3. THE Translation_Files SHALL contain an upgraded `Vision.description` value that articulates the lab's mission without using generic phrases like "break the boundaries" or "打破边界".
4. THE Translation_Files SHALL ensure all Vision copy maintains the Brand_Tone: restrained, precise, and future-oriented.

### 需求 3：Capabilities 区域文案升级

**用户故事：** 作为网站访客，我希望核心能力区域的文案专业而不晦涩，以便快速理解 Zingspark 的技术优势。

#### 验收标准

1. THE Translation_Files SHALL contain an upgraded `Capabilities.title` value that sounds more refined than the current generic "Core Competencies" / "核心能力".
2. THE Translation_Files SHALL contain upgraded `Capabilities.items.framework.title` and `Capabilities.items.framework.description` values that convey deep technical expertise without listing specific framework names that may become outdated.
3. THE Translation_Files SHALL contain upgraded `Capabilities.items.hardware.title` and `Capabilities.items.hardware.description` values that express the digital-to-physical capability with sophistication.
4. THE Translation_Files SHALL contain upgraded `Capabilities.items.global.title` and `Capabilities.items.global.description` values that convey international orientation without reducing it to "English communication skills".
5. THE Translation_Files SHALL ensure each capability description is between 15 and 40 words in English (or 20 to 60 个汉字 in Chinese) to maintain conciseness.

### 需求 4：Universities 区域文案升级

**用户故事：** 作为网站访客，我希望团队背景区域的标题传达出学术底蕴与精英气质，以便对团队产生信任感。

#### 验收标准

1. THE Translation_Files SHALL contain an upgraded `Universities.title` value that replaces the current colloquial tone ("一群极客" / "A Group of Geeks") with a more refined expression that still conveys intellectual caliber.
2. THE Translation_Files SHALL ensure the Universities title is no longer than 12 words in English or 16 个汉字 in Chinese.

### 需求 5：Jobs 区域文案升级

**用户故事：** 作为潜在求职者，我希望岗位区域的文案有吸引力且不落俗套，以便激发我的申请意愿。

#### 验收标准

1. THE Translation_Files SHALL contain an upgraded `Jobs.title` value that is more engaging than the current plain "Open Positions" / "开放岗位".
2. THE Translation_Files SHALL contain an upgraded `Jobs.subtitle` value that inspires action without using cliché phrases like "shaping the future" / "塑造未来".
3. THE Translation_Files SHALL preserve the existing `Jobs.clickHint` value unchanged, as it is Functional_Copy.

### 需求 6：Recruitment 区域文案升级

**用户故事：** 作为潜在求职者，我希望招聘区域的标题和副标题有品牌感召力，以便感受到加入这个团队的价值。

#### 验收标准

1. THE Translation_Files SHALL contain an upgraded `Recruitment.title` value that conveys a sense of invitation and shared mission.
2. THE Translation_Files SHALL contain an upgraded `Recruitment.subtitle` value that is aspirational yet grounded, avoiding vague adjectives like "cool" / "酷".
3. THE Translation_Files SHALL preserve all Recruitment form-related Functional_Copy (`name`, `email`, `phone`, `school`, `education`, `educationOptions`, `interest`, `interestPlaceholder`, `message`, `messagePlaceholder`, `submit`, `sending`, `selectDegree`, `note`) unchanged.

### 需求 7：Meta 信息与 Footer 文案升级

**用户故事：** 作为搜索引擎用户或网站访客，我希望 Meta 信息和页脚文案精炼且有品牌辨识度，以便在搜索结果和页面底部都能感受到一致的品牌调性。

#### 验收标准

1. THE Translation_Files SHALL contain an upgraded `Meta.title` value that is concise (no more than 60 characters in English, no more than 30 个汉字 in Chinese) and SEO-friendly.
2. THE Translation_Files SHALL contain an upgraded `Meta.description` value that is between 120 and 160 characters in English (or 60 to 80 个汉字 in Chinese) and accurately represents the brand.
3. THE Translation_Files SHALL contain an upgraded `Footer.slogan` value that serves as a memorable brand sign-off, consistent with the upgraded Hero and Vision copy.
4. THE Translation_Files SHALL preserve all Footer operational information (`company`, `offices`, `copyright`, `email`, `icp`, `police`) unchanged.

### 需求 8：整体文案一致性与质量

**用户故事：** 作为品牌负责人，我希望全站文案在风格、用词和调性上保持高度一致，以便传达统一的品牌形象。

#### 验收标准

1. THE Translation_Files SHALL ensure all upgraded Marketing_Copy adheres to the Brand_Tone: restrained, precise, future-oriented, and technically confident without being boastful.
2. THE Translation_Files SHALL ensure no upgraded copy contains vague buzzwords such as "revolutionary", "game-changing", "disruptive", "颠覆性", "革命性", or "划时代".
3. THE Translation_Files SHALL ensure the Chinese copy reads as native Chinese prose, not as translated-from-English text.
4. THE Translation_Files SHALL ensure the English copy reads as native English prose, not as translated-from-Chinese text.
5. THE Translation_Files SHALL maintain valid JSON syntax after all modifications.
6. THE Translation_Files SHALL preserve all existing Translation_Key paths exactly as they are, modifying only the string values.

### 需求 9：不可修改范围

**用户故事：** 作为开发者，我希望文案升级不影响任何功能性文案和 UI 结构，以便升级过程零风险。

#### 验收标准

1. THE Translation_Files SHALL preserve all `Header` section values unchanged.
2. THE Translation_Files SHALL preserve all `Theme` section values unchanged.
3. THE Translation_Files SHALL preserve all `Language` section values unchanged.
4. THE Translation_Files SHALL preserve all Recruitment form field labels and options unchanged (as specified in 需求 6 验收标准 3).
5. THE Translation_Files SHALL NOT add or remove any Translation_Key.
6. THE Translation_Files SHALL NOT modify any component source code files.
